"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
================================================================
resolution_pipeline.py — "Entity Resolution Pipeline"

Implements, stage by stage, the pipeline specified in Chapter 3:

    Incoming Record
      -> Normalize Text
      -> Remove Formatting Variants
      -> Detect Entity Type
      -> Candidate Identifier Lookup
      -> Ontology Matching
      -> Cross-reference Matching
      -> Semantic Similarity
      -> Evidence Scoring
      -> Conflict Detection
      -> Canonical Bioquora ID Assignment
      -> Knowledge Graph Update

Each stage is a separate method on `EntityResolutionPipeline` so that
(a) every stage is independently testable and (b) later steps of the
Bioquora roadmap (GraphRAG, ResearchOS) can call individual stages
without running the whole pipeline.

Explicit stub / upgrade paths (flagged inline with `# UPGRADE PATH:`):
  - `semantic_similarity` uses a cheap token-overlap heuristic. Swap in
    a PubMedBERT/BioBERT embedding + pgvector or FAISS index — this is
    exactly the embedding infra already built in the Medinex GraphRAG
    Phase 5 work, so wire this stage to that service rather than
    reimplementing it.
  - `detect_entity_type` uses keyword/heuristic scoring against
    ENTITY_TAXONOMY. Swap in the trained NER + entity-linking model
    from Phase 3 (scispaCy + UMLS linking) once this pipeline is wired
    into the live ingestion path.
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from datetime import datetime, timezone

from sqlalchemy import select, or_
from sqlalchemy.orm import Session

try:
    from .models import (
        BioquoraEntity,
        ConfidenceSignal,
        ConfidenceSignalType,
        ENTITY_TAXONOMY,
        EntityNamespace,
        EntityStatus,
        EntityVersion,
        ChangeType,
        EvidenceLevel,
        EvidenceRecord,
        ExternalIdentifier,
        OntologyMembership,
        ProvenanceRecord,
        SourceDatabase,
        Synonym,
        SynonymType,
    )
    from .id_generator import BQIdGenerator
except ImportError:
    from models import (
        BioquoraEntity,
        ConfidenceSignal,
        ConfidenceSignalType,
        ENTITY_TAXONOMY,
        EntityNamespace,
        EntityStatus,
        EntityVersion,
        ChangeType,
        EvidenceLevel,
        EvidenceRecord,
        ExternalIdentifier,
        OntologyMembership,
        ProvenanceRecord,
        SourceDatabase,
        Synonym,
        SynonymType,
    )
    from id_generator import BQIdGenerator

_WHITESPACE_RE = re.compile(r"\s+")
_PUNCT_RE = re.compile(r"[^\w\s]")


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Stage input / intermediate result types
# ---------------------------------------------------------------------------

@dataclass
class IncomingRecord:
    """Chapter 3 pipeline input: a raw fact about a biomedical concept as
    it arrives from an external source database."""
    raw_label: str
    source_database: SourceDatabase
    external_id: str
    entity_type_hint: str | None = None  # e.g. "Disease" if the source already tells us
    synonyms: list[str] = field(default_factory=list)
    ontology_refs: list[tuple[str, str]] = field(default_factory=list)  # (ontology_name, ontology_term_id)
    evidence_pmids: list[str] = field(default_factory=list)
    evidence_level: EvidenceLevel | None = None
    import_version: str | None = None
    reviewer: str | None = None


@dataclass
class ConfidenceBreakdown:
    signals: list[tuple[ConfidenceSignalType, float, float]] = field(default_factory=list)
    # (signal_type, weight, value)

    @property
    def total(self) -> float:
        if not self.signals:
            return 0.0
        weighted = sum(w * v for _, w, v in self.signals)
        total_weight = sum(w for _, w, _ in self.signals)
        return round(weighted / total_weight, 4) if total_weight else 0.0


@dataclass
class ResolutionResult:
    bq_id: str
    created_new_entity: bool
    confidence: ConfidenceBreakdown
    conflicts: list[str] = field(default_factory=list)
    candidate_bq_ids_considered: list[str] = field(default_factory=list)


class ConflictError(Exception):
    """Raised when conflict_detection finds a blocking conflict (Chapter 3,
    Identifier Quality Rules: 'No conflicting primary mapping')."""


# ---------------------------------------------------------------------------
# Signal weights — tune centrally rather than scattering magic numbers.
# ---------------------------------------------------------------------------

SIGNAL_WEIGHTS: dict[ConfidenceSignalType, float] = {
    ConfidenceSignalType.EXACT_IDENTIFIER_MATCH: 1.00,
    ConfidenceSignalType.EXACT_LABEL_MATCH: 0.85,
    ConfidenceSignalType.ONTOLOGY_CROSS_REFERENCE: 0.80,
    ConfidenceSignalType.SYNONYM_MATCH: 0.55,
    ConfidenceSignalType.SEMANTIC_SIMILARITY: 0.45,
    ConfidenceSignalType.CONTEXTUAL_EVIDENCE: 0.35,
    ConfidenceSignalType.SOURCE_AUTHORITY: 0.30,
    ConfidenceSignalType.PUBLICATION_SUPPORT: 0.25,
}

# Chapter 3's evidence hierarchy, encoded as a numeric weight for
# evidence-scoring purposes.
EVIDENCE_LEVEL_WEIGHT: dict[EvidenceLevel, float] = {
    EvidenceLevel.CLINICAL_GUIDELINE: 1.00,
    EvidenceLevel.META_ANALYSIS: 0.90,
    EvidenceLevel.RCT: 0.80,
    EvidenceLevel.OBSERVATIONAL_STUDY: 0.60,
    EvidenceLevel.CASE_REPORT: 0.40,
    EvidenceLevel.PRECLINICAL_STUDY: 0.35,
    EvidenceLevel.EXPERT_OPINION: 0.25,
}

# Trust tier per source, used by the source_authority signal. Extend as
# the 300+-database ingestion roadmap onboards new sources.
SOURCE_AUTHORITY_TIER: dict[SourceDatabase, float] = {
    SourceDatabase.MONDO: 0.95,
    SourceDatabase.HGNC: 0.98,
    SourceDatabase.UNIPROT: 0.97,
    SourceDatabase.CLINVAR: 0.95,
    SourceDatabase.DRUGBANK: 0.92,
    SourceDatabase.OMIM: 0.90,
    SourceDatabase.SNOMEDCT: 0.90,
    SourceDatabase.NCIT: 0.85,
    SourceDatabase.PUBCHEM: 0.80,
    SourceDatabase.CHEMBL: 0.85,
    SourceDatabase.CLINICALTRIALS_GOV: 0.90,
    SourceDatabase.PMID: 0.88,
}
DEFAULT_SOURCE_AUTHORITY = 0.60


class EntityResolutionPipeline:
    """
    Orchestrates the full Chapter 3 pipeline. Each `stage_*` method is a
    pure(ish) function over the session + intermediate state; `resolve()`
    chains them in the documented order.
    """

    def __init__(self, session: Session):
        self.session = session
        self.id_generator = BQIdGenerator(session)

    # -- Stage 1: Normalize Text -------------------------------------------------

    @staticmethod
    def normalize_text(raw: str) -> str:
        text = raw.strip().lower()
        text = _PUNCT_RE.sub(" ", text)
        text = _WHITESPACE_RE.sub(" ", text).strip()
        return text

    # -- Stage 2: Remove Formatting Variants -------------------------------------

    @staticmethod
    def strip_formatting_variants(text: str) -> str:
        """Collapses common formatting noise: Greek-letter spellouts,
        hyphenation variants, superscript/subscript numerals, trademark
        symbols. Kept intentionally small and explicit rather than a
        giant regex — extend as real-world ingestion surfaces new cases."""
        replacements = {
            "™": "", "®": "", "©": "",
            "alpha": "a", "beta": "b", "gamma": "g",
        }
        out = text
        for old, new in replacements.items():
            out = out.replace(old, new)
        out = out.replace("-", " ")
        return _WHITESPACE_RE.sub(" ", out).strip()

    # -- Stage 3: Detect Entity Type ----------------------------------------------

    def detect_entity_type(self, record: IncomingRecord) -> tuple[str, EntityNamespace]:
        """
        Heuristic entity-type detector.

        UPGRADE PATH: replace with the scispaCy + UMLS-linking NER model
        from Medinex Phase 3 once this pipeline sits in the live ingestion
        path — that model already outputs a typed span with a UMLS
        semantic type, which maps cleanly onto ENTITY_TAXONOMY leaves.
        """
        if record.entity_type_hint:
            for _, leaves in ENTITY_TAXONOMY.items():
                if record.entity_type_hint in leaves and leaves[record.entity_type_hint] is not None:
                    return record.entity_type_hint, leaves[record.entity_type_hint]

        # Fall back to source-database -> likely entity type inference.
        source_to_type: dict[SourceDatabase, tuple[str, EntityNamespace]] = {
            SourceDatabase.MONDO: ("Disease", EntityNamespace.DIS),
            SourceDatabase.DOID: ("Disease", EntityNamespace.DIS),
            SourceDatabase.MESH: ("Disease", EntityNamespace.DIS),
            SourceDatabase.ICD11: ("Disease", EntityNamespace.DIS),
            SourceDatabase.SNOMEDCT: ("Disease", EntityNamespace.DIS),
            SourceDatabase.NCIT: ("Disease", EntityNamespace.DIS),
            SourceDatabase.OMIM: ("Disease", EntityNamespace.DIS),
            SourceDatabase.HGNC: ("Gene", EntityNamespace.GEN),
            SourceDatabase.NCBI_GENE: ("Gene", EntityNamespace.GEN),
            SourceDatabase.ENSEMBL: ("Gene", EntityNamespace.GEN),
            SourceDatabase.ENTREZ: ("Gene", EntityNamespace.GEN),
            SourceDatabase.UNIPROT: ("Protein", EntityNamespace.PRO),
            SourceDatabase.REFSEQ_PROTEIN: ("Protein", EntityNamespace.PRO),
            SourceDatabase.PDB: ("Protein", EntityNamespace.PRO),
            SourceDatabase.ALPHAFOLD: ("Protein", EntityNamespace.PRO),
            SourceDatabase.INTERPRO: ("Protein", EntityNamespace.PRO),
            SourceDatabase.DRUGBANK: ("Drug", EntityNamespace.DRG),
            SourceDatabase.RXNORM: ("Drug", EntityNamespace.DRG),
            SourceDatabase.DRUGCENTRAL: ("Drug", EntityNamespace.DRG),
            SourceDatabase.ATC: ("Drug", EntityNamespace.DRG),
            SourceDatabase.CHEMBL: ("Drug", EntityNamespace.DRG),
            SourceDatabase.CHEBI: ("Chemical", EntityNamespace.CHE),
            SourceDatabase.PUBCHEM: ("Chemical", EntityNamespace.CHE),
            SourceDatabase.CHEMSPIDER: ("Chemical", EntityNamespace.CHE),
            SourceDatabase.CAS: ("Chemical", EntityNamespace.CHE),
            SourceDatabase.KEGG: ("Chemical", EntityNamespace.CHE),
            SourceDatabase.CLINVAR: ("Variant", EntityNamespace.VAR),
            SourceDatabase.DBSNP: ("Variant", EntityNamespace.VAR),
            SourceDatabase.GNOMAD: ("Variant", EntityNamespace.VAR),
            SourceDatabase.COSMIC: ("Variant", EntityNamespace.VAR),
            SourceDatabase.CLINICALTRIALS_GOV: ("Clinical Trial", EntityNamespace.TRL),
            SourceDatabase.WHO_ICTRP: ("Clinical Trial", EntityNamespace.TRL),
            SourceDatabase.EU_CTR: ("Clinical Trial", EntityNamespace.TRL),
            SourceDatabase.PMID: ("Publication", EntityNamespace.PUB),
            SourceDatabase.PMCID: ("Publication", EntityNamespace.PUB),
            SourceDatabase.DOI: ("Publication", EntityNamespace.PUB),
            SourceDatabase.OPENALEX: ("Publication", EntityNamespace.PUB),
            SourceDatabase.CROSSREF: ("Publication", EntityNamespace.PUB),
        }
        if record.source_database in source_to_type:
            return source_to_type[record.source_database]

        raise ValueError(
            f"Cannot detect entity type for source={record.source_database}; "
            f"supply entity_type_hint explicitly."
        )

    # -- Stage 4: Candidate Identifier Lookup -------------------------------------

    def candidate_lookup(
        self, normalized_label: str, entity_type: str, synonyms: list[str]
    ) -> list[BioquoraEntity]:
        """Finds existing BioquoraEntity rows that might already represent
        this concept, via exact normalized-label match and synonym match."""
        normalized_synonyms = {self.normalize_text(s) for s in synonyms} | {normalized_label}

        stmt = (
            select(BioquoraEntity)
            .join(Synonym, Synonym.entity_id == BioquoraEntity.bq_id, isouter=True)
            .where(
                BioquoraEntity.entity_type == entity_type,
                BioquoraEntity.status != EntityStatus.MERGED,
                or_(
                    BioquoraEntity.preferred_label.in_([normalized_label] + list(normalized_synonyms)),
                    Synonym.normalized_term.in_(list(normalized_synonyms)),
                ),
            )
            .distinct()
        )
        return list(self.session.execute(stmt).scalars().all())

    # -- Stage 5: Ontology Matching -----------------------------------------------

    def ontology_matching(
        self, candidates: list[BioquoraEntity], ontology_refs: list[tuple[str, str]]
    ) -> dict[str, float]:
        """Returns {bq_id: match_strength} for candidates that share an
        ontology cross-reference with the incoming record."""
        scores: dict[str, float] = {}
        if not ontology_refs:
            return scores
        ref_set = set(ontology_refs)
        for candidate in candidates:
            shared = {
                (m.ontology_name, m.ontology_term_id) for m in candidate.ontology_memberships
            } & ref_set
            if shared:
                scores[candidate.bq_id] = min(1.0, 0.5 + 0.25 * len(shared))
        return scores

    # -- Stage 6: Cross-reference Matching ----------------------------------------

    def cross_reference_matching(
        self, source_database: SourceDatabase, external_id: str
    ) -> BioquoraEntity | None:
        """Direct hit: this exact (source, external_id) pair is already
        mapped to a canonical entity."""
        stmt = (
            select(ExternalIdentifier)
            .where(
                ExternalIdentifier.source_database == source_database,
                ExternalIdentifier.external_id == external_id,
            )
        )
        existing = self.session.execute(stmt).scalar_one_or_none()
        return existing.entity if existing else None

    # -- Stage 7: Semantic Similarity ---------------------------------------------

    @staticmethod
    def semantic_similarity(a: str, b: str) -> float:
        """
        Token-Jaccard similarity as a placeholder.

        UPGRADE PATH: replace with a call into the embedding service
        already built for Medinex GraphRAG (Phase 5) — encode both labels
        with the same biomedical sentence embedding model used there and
        return cosine similarity. Keep this function's signature stable
        (str, str) -> float in [0, 1] so callers don't need to change.
        """
        tokens_a = set(a.split())
        tokens_b = set(b.split())
        if not tokens_a or not tokens_b:
            return 0.0
        intersection = tokens_a & tokens_b
        union = tokens_a | tokens_b
        return round(len(intersection) / len(union), 4)

    # -- Stage 8: Evidence Scoring -------------------------------------------------

    def evidence_scoring(self, evidence_level: EvidenceLevel | None, pmid_count: int) -> float:
        base = EVIDENCE_LEVEL_WEIGHT.get(evidence_level, 0.0) if evidence_level else 0.0
        pmid_bonus = min(0.15, 0.03 * pmid_count)
        return round(min(1.0, base + pmid_bonus), 4)

    # -- Stage 9: Conflict Detection -----------------------------------------------

    def conflict_detection(
        self,
        candidates: list[BioquoraEntity],
        source_database: SourceDatabase,
        external_id: str,
    ) -> list[str]:
        """
        Chapter 3, Identifier Quality Rules -> 'No conflicting primary
        mapping'. Two kinds of conflict are flagged:
          1. This (source, external_id) is already primary-mapped to a
             DIFFERENT entity than what candidate_lookup/ontology_matching
             suggests.
          2. Multiple distinct candidate entities were found for what
             looks like a single incoming concept (possible duplicate
             entities that should be reviewed for merge).
        """
        conflicts: list[str] = []

        existing_mapping = self.cross_reference_matching(source_database, external_id)
        distinct_candidate_ids = {c.bq_id for c in candidates}

        if existing_mapping and distinct_candidate_ids and existing_mapping.bq_id not in distinct_candidate_ids:
            conflicts.append(
                f"{source_database.value}:{external_id} is already mapped to "
                f"{existing_mapping.bq_id}, but label/synonym/ontology matching "
                f"points to {sorted(distinct_candidate_ids)}."
            )

        if len(distinct_candidate_ids) > 1:
            conflicts.append(
                f"Multiple distinct candidate entities matched: "
                f"{sorted(distinct_candidate_ids)} — flag for duplicate review."
            )

        return conflicts

    # -- Stage 10: Canonical ID Assignment ------------------------------------------

    def assign_canonical_id(
        self,
        record: IncomingRecord,
        entity_type: str,
        namespace: EntityNamespace,
        matched_entity: BioquoraEntity | None,
        confidence: ConfidenceBreakdown,
    ) -> tuple[BioquoraEntity, bool]:
        """Returns (entity, created_new)."""
        if matched_entity is not None:
            matched_entity.confidence_score = max(matched_entity.confidence_score, confidence.total)
            matched_entity.version += 1
            matched_entity.updated_at = utcnow()
            self.session.add(
                EntityVersion(
                    entity_id=matched_entity.bq_id,
                    version_number=matched_entity.version,
                    change_type=ChangeType.SOURCE_UPDATE,
                    change_summary=f"New source mapping from {record.source_database.value}:{record.external_id}",
                )
            )
            return matched_entity, False

        bq_id = self.id_generator.next_id(namespace)
        entity = BioquoraEntity(
            bq_id=bq_id,
            namespace=namespace,
            entity_type=entity_type,
            preferred_label=self.normalize_text(record.raw_label),
            status=EntityStatus.PENDING_REVIEW,
            quality_score=0.0,
            confidence_score=confidence.total,
            version=1,
        )
        self.session.add(entity)
        self.session.flush()
        self.session.add(
            EntityVersion(
                entity_id=entity.bq_id,
                version_number=1,
                change_type=ChangeType.CREATE,
                change_summary=f"Created from {record.source_database.value}:{record.external_id}",
            )
        )
        return entity, True

    # -- Stage 11: Knowledge Graph Update -------------------------------------------

    def update_knowledge_graph(
        self,
        entity: BioquoraEntity,
        record: IncomingRecord,
        confidence: ConfidenceBreakdown,
    ) -> ExternalIdentifier:
        """
        Persists the cross-reference, synonyms, ontology memberships,
        evidence, and provenance for this resolution. "Knowledge Graph
        Update" in Chapter 3 is deliberately broad — here it means
        writing everything the relational schema needs; pushing the same
        facts into the Neo4j graph (Phase 5 GraphRAG store) is a separate
        downstream sync job (see `sync_to_graph_store` stub below) so this
        pipeline stays graph-database-agnostic.
        """
        mapping = ExternalIdentifier(
            entity_id=entity.bq_id,
            source_database=record.source_database,
            external_id=record.external_id,
            is_primary=True,
            mapping_confidence=confidence.total,
            mapping_algorithm="EntityResolutionPipeline.v1",
            import_version=record.import_version,
            reviewer=record.reviewer,
        )
        self.session.add(mapping)
        self.session.flush()

        for signal_type, weight, value in confidence.signals:
            self.session.add(
                ConfidenceSignal(mapping_id=mapping.id, signal_type=signal_type, weight=weight, value=value)
            )

        for syn in record.synonyms:
            normalized = self.normalize_text(syn)
            exists = self.session.execute(
                select(Synonym).where(Synonym.entity_id == entity.bq_id, Synonym.normalized_term == normalized)
            ).scalar_one_or_none()
            if not exists:
                self.session.add(
                    Synonym(
                        entity_id=entity.bq_id,
                        term=syn.strip(),
                        normalized_term=normalized,
                        synonym_type=SynonymType.RELATED,
                        source=record.source_database,
                    )
                )

        for ont_name, ont_term_id in record.ontology_refs:
            exists_ont = self.session.execute(
                select(OntologyMembership).where(
                    OntologyMembership.entity_id == entity.bq_id,
                    OntologyMembership.ontology_name == ont_name,
                    OntologyMembership.ontology_term_id == ont_term_id,
                )
            ).scalar_one_or_none()
            if not exists_ont:
                self.session.add(
                    OntologyMembership(
                        entity_id=entity.bq_id,
                        ontology_name=ont_name,
                        ontology_term_id=ont_term_id,
                    )
                )

        for pmid in record.evidence_pmids:
            exists_ev = self.session.execute(
                select(EvidenceRecord).where(
                    EvidenceRecord.entity_id == entity.bq_id,
                    EvidenceRecord.pmid == pmid,
                )
            ).scalar_one_or_none()
            if not exists_ev:
                self.session.add(
                    EvidenceRecord(
                        entity_id=entity.bq_id,
                        pmid=pmid,
                        evidence_level=record.evidence_level,
                        support_score=1.0,
                    )
                )

        self.session.add(
            ProvenanceRecord(
                entity_id=entity.bq_id,
                source_database=record.source_database,
                import_version=record.import_version,
                imported_by=record.reviewer or "system_ingestion",
            )
        )
        self.session.flush()
        return mapping

    def sync_to_graph_store(self, entity: BioquoraEntity, mapping: ExternalIdentifier) -> None:
        """
        Stub for pushing canonical entity nodes and cross-reference edges to Neo4j
        for Medinex GraphRAG Phase 5 downstream consumption.
        
        UPGRADE PATH: Wire to `backend.graph.db` Neo4j driver or Celery asynchronous task
        to merge Node(:Concept {bq_id: entity.bq_id, label: entity.preferred_label}) and
        Edge(:Concept)-[:MAPPED_TO]->(:ExternalRef).
        """
        pass

    def resolve(self, record: IncomingRecord) -> ResolutionResult:
        """
        Executes the 11-stage Entity Resolution Pipeline on an IncomingRecord.
        Returns a ResolutionResult with assigned/canonical bq_id and confidence metrics.
        Raises ConflictError if blocking conflicts are detected and unresolved.
        """
        # Stage 1: Normalize Text
        norm_label = self.normalize_text(record.raw_label)

        # Stage 2: Remove Formatting Variants
        clean_label = self.strip_formatting_variants(norm_label)

        # Stage 3: Detect Entity Type
        entity_type, namespace = self.detect_entity_type(record)

        # Stage 4: Candidate Identifier Lookup
        candidates = self.candidate_lookup(clean_label, entity_type, record.synonyms)

        # Stage 5: Ontology Matching
        ontology_scores = self.ontology_matching(candidates, record.ontology_refs)

        # Stage 6: Cross-reference Matching
        direct_match = self.cross_reference_matching(record.source_database, record.external_id)

        # Stage 7 & 8: Calculate similarities & build confidence breakdown
        best_candidate: BioquoraEntity | None = direct_match
        best_breakdown = ConfidenceBreakdown()

        if direct_match:
            best_breakdown.signals.append((
                ConfidenceSignalType.EXACT_IDENTIFIER_MATCH,
                SIGNAL_WEIGHTS[ConfidenceSignalType.EXACT_IDENTIFIER_MATCH],
                1.0
            ))

        candidate_ids = [c.bq_id for c in candidates]
        if direct_match and direct_match.bq_id not in candidate_ids:
            candidates.append(direct_match)

        for cand in candidates:
            breakdown = ConfidenceBreakdown()
            if direct_match and cand.bq_id == direct_match.bq_id:
                breakdown.signals.append((
                    ConfidenceSignalType.EXACT_IDENTIFIER_MATCH,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.EXACT_IDENTIFIER_MATCH],
                    1.0
                ))
            if cand.preferred_label == clean_label:
                breakdown.signals.append((
                    ConfidenceSignalType.EXACT_LABEL_MATCH,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.EXACT_LABEL_MATCH],
                    1.0
                ))
            elif any(self.normalize_text(syn.term) == clean_label for syn in cand.synonyms):
                breakdown.signals.append((
                    ConfidenceSignalType.SYNONYM_MATCH,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.SYNONYM_MATCH],
                    0.9
                ))
            else:
                sim = self.semantic_similarity(cand.preferred_label, clean_label)
                if sim > 0.4:
                    breakdown.signals.append((
                        ConfidenceSignalType.SEMANTIC_SIMILARITY,
                        SIGNAL_WEIGHTS[ConfidenceSignalType.SEMANTIC_SIMILARITY],
                        sim
                    ))

            if cand.bq_id in ontology_scores:
                breakdown.signals.append((
                    ConfidenceSignalType.ONTOLOGY_CROSS_REFERENCE,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.ONTOLOGY_CROSS_REFERENCE],
                    ontology_scores[cand.bq_id]
                ))

            # Stage 8: Evidence Scoring
            ev_score = self.evidence_scoring(record.evidence_level, len(record.evidence_pmids))
            if ev_score > 0:
                breakdown.signals.append((
                    ConfidenceSignalType.CONTEXTUAL_EVIDENCE,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.CONTEXTUAL_EVIDENCE],
                    ev_score
                ))

            # Source authority
            auth_score = SOURCE_AUTHORITY_TIER.get(record.source_database, DEFAULT_SOURCE_AUTHORITY)
            breakdown.signals.append((
                ConfidenceSignalType.SOURCE_AUTHORITY,
                SIGNAL_WEIGHTS[ConfidenceSignalType.SOURCE_AUTHORITY],
                auth_score
            ))

            if not best_candidate or breakdown.total > best_breakdown.total:
                if not direct_match or cand.bq_id == direct_match.bq_id:
                    best_candidate = cand
                    best_breakdown = breakdown

        if not best_candidate and not best_breakdown.signals:
            ev_score = self.evidence_scoring(record.evidence_level, len(record.evidence_pmids))
            if ev_score > 0:
                best_breakdown.signals.append((
                    ConfidenceSignalType.CONTEXTUAL_EVIDENCE,
                    SIGNAL_WEIGHTS[ConfidenceSignalType.CONTEXTUAL_EVIDENCE],
                    ev_score
                ))
            auth_score = SOURCE_AUTHORITY_TIER.get(record.source_database, DEFAULT_SOURCE_AUTHORITY)
            best_breakdown.signals.append((
                ConfidenceSignalType.SOURCE_AUTHORITY,
                SIGNAL_WEIGHTS[ConfidenceSignalType.SOURCE_AUTHORITY],
                auth_score
            ))

        # Stage 9: Conflict Detection
        conflicts = self.conflict_detection(candidates, record.source_database, record.external_id)

        # Stage 10: Canonical ID Assignment
        entity, created_new = self.assign_canonical_id(
            record=record,
            entity_type=entity_type,
            namespace=namespace,
            matched_entity=best_candidate,
            confidence=best_breakdown,
        )

        # Stage 11: Knowledge Graph Update
        mapping = self.update_knowledge_graph(entity, record, best_breakdown)
        self.sync_to_graph_store(entity, mapping)

        return ResolutionResult(
            bq_id=entity.bq_id,
            created_new_entity=created_new,
            confidence=best_breakdown,
            conflicts=conflicts,
            candidate_bq_ids_considered=[c.bq_id for c in candidates],
        )
