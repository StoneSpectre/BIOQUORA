"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3 & Chapter 5
=============================================================================
resolution/pipeline.py — "Entity Resolution Pipeline"

Orchestrates the 11-stage resolution pipeline, directly embedding Chapter 5
stages (§5.6 - §5.19) in order:
    Official Identifier > Ontology Identifier > Cross Reference > External Mapping > Text Similarity
"""

from __future__ import annotations

import enum
import re
from dataclasses import dataclass, field
from datetime import datetime, timezone
from sqlalchemy import select
from sqlalchemy.orm import Session

from ..models import (
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
    IncomingRecord,
    OntologyMembership,
    ProvenanceRecord,
    SourceDatabase,
    Synonym,
    SynonymType,
    utcnow,
)
from ..id_generator import BQIdGenerator
from .preprocessing import normalize_text, strip_formatting_variants, fold_for_matching
from .stages import (
    match_by_identifier,
    match_by_ontology,
    match_by_synonym,
    apply_context_disambiguation,
    match_by_similarity,
)


class ConflictError(Exception):
    pass


# Signal weights from Chapter 3 confidence model
SIGNAL_WEIGHTS: dict[ConfidenceSignalType, float] = {
    ConfidenceSignalType.EXACT_IDENTIFIER_MATCH: 0.40,
    ConfidenceSignalType.EXACT_LABEL_MATCH: 0.35,
    ConfidenceSignalType.ONTOLOGY_CROSS_REFERENCE: 0.30,
    ConfidenceSignalType.SYNONYM_MATCH: 0.25,
    ConfidenceSignalType.SEMANTIC_SIMILARITY: 0.15,
    ConfidenceSignalType.CONTEXTUAL_EVIDENCE: 0.10,
    ConfidenceSignalType.SOURCE_AUTHORITY: 0.10,
    ConfidenceSignalType.PUBLICATION_SUPPORT: 0.10,
}

EVIDENCE_LEVEL_WEIGHT: dict[EvidenceLevel, float] = {
    EvidenceLevel.CLINICAL_GUIDELINE: 1.00,
    EvidenceLevel.META_ANALYSIS: 0.90,
    EvidenceLevel.RCT: 0.85,
    EvidenceLevel.OBSERVATIONAL_STUDY: 0.70,
    EvidenceLevel.CASE_REPORT: 0.50,
    EvidenceLevel.PRECLINICAL_STUDY: 0.40,
    EvidenceLevel.EXPERT_OPINION: 0.30,
}

SOURCE_AUTHORITY_TIER: dict[str, float] = {
    "MONDO": 1.00,
    "HGNC": 1.00,
    "MeSH": 0.95,
    "SNOMEDCT": 0.95,
    "Ensembl": 0.95,
    "UniProt": 0.95,
    "DOID": 0.90,
    "OMIM": 0.90,
    "NCIT": 0.85,
    "ICD11": 0.85,
}


@dataclass
class ConfidenceBreakdown:
    total: float = 0.0
    signals: list[tuple[ConfidenceSignalType, float, float, str]] = field(default_factory=list)

    def add_signal(self, stype: ConfidenceSignalType, value: float, notes: str = "") -> None:
        weight = SIGNAL_WEIGHTS.get(stype, 0.10)
        self.signals.append((stype, weight, value, notes))
        # Re-compute weighted sum capped at 1.0
        weighted_sum = sum(w * v for _, w, v, _ in self.signals)
        self.total = min(1.0, round(weighted_sum, 4))


@dataclass
class ResolutionResult:
    bq_id: str
    created_new_entity: bool
    confidence: ConfidenceBreakdown
    matched_by_stage: str
    warnings: list[str] = field(default_factory=list)


class PipelineStore:
    """Adapter implementing store lookups for Chapter 5 matching stages."""
    def __init__(self, session: Session):
        self.session = session

    def find_by_native_id(self, ontology: str, native_id: str) -> str | None:
        stmt = select(ExternalIdentifier.entity_id).where(
            ExternalIdentifier.external_id == native_id
        )
        for src in SourceDatabase:
            if src.value.lower() == ontology.lower() or src.name.lower() == ontology.lower():
                stmt = stmt.where(ExternalIdentifier.source_database == src)
                break
        res = self.session.execute(stmt).scalar_one_or_none()
        if res:
            return res
        stmt_ont = select(OntologyMembership.entity_id).where(
            OntologyMembership.ontology_term_id == native_id
        )
        return self.session.execute(stmt_ont).scalar_one_or_none()

    def resolve_ontology_concept(self, ontology: str, native_id: str) -> str | None:
        stmt = select(OntologyMembership.entity_id).where(
            OntologyMembership.ontology_term_id == native_id
        )
        return self.session.execute(stmt).scalar_one_or_none()

    def find_by_synonym_text(self, norm_text: str) -> list[str]:
        stmt = select(Synonym.entity_id).where(
            Synonym.normalized_term == norm_text
        )
        return list(self.session.execute(stmt).scalars().all())

    def all_synonym_index(self) -> list[tuple[str, str, str]]:
        stmt = select(Synonym.entity_id, Synonym.term, Synonym.normalized_term)
        return [(r[0], r[1], r[2]) for r in self.session.execute(stmt).all()]

    def get_entity(self, bq_id: str) -> BioquoraEntity | None:
        return self.session.get(BioquoraEntity, bq_id)


class EntityResolutionPipeline:
    def __init__(self, session: Session):
        self.session = session
        self.id_gen = BQIdGenerator(session)
        self.store = PipelineStore(session)

    @staticmethod
    def normalize_text(text: str) -> str:
        return normalize_text(text)

    @staticmethod
    def strip_formatting_variants(text: str) -> str:
        return strip_formatting_variants(text)

    def detect_entity_type(self, record: IncomingRecord) -> tuple[str, EntityNamespace]:
        if record.entity_type_hint:
            hint = record.entity_type_hint.strip()
            for cat, leaves in ENTITY_TAXONOMY.items():
                for leaf_name, ns in leaves.items():
                    if leaf_name.lower() == hint.lower() and ns is not None:
                        return leaf_name, ns

        # Fallback from source database
        if record.source_database:
            src_name = record.source_database.value if isinstance(record.source_database, enum.Enum) else str(record.source_database)
            if src_name in ("MONDO", "DOID", "ICD11", "SNOMEDCT", "OMIM", "NCIT", "MeSH"):
                return "Disease", EntityNamespace.DIS
            elif src_name in ("HGNC", "NCBI_Gene", "Ensembl", "Entrez"):
                return "Gene", EntityNamespace.GEN
            elif src_name in ("UniProt", "RefSeq_Protein", "PDB", "AlphaFoldDB", "InterPro"):
                return "Protein", EntityNamespace.PRO
            elif src_name in ("DrugBank", "ChEMBL", "RxNorm", "DrugCentral", "PubChem", "ChEBI", "ATC"):
                return "Drug", EntityNamespace.DRG
            elif src_name in ("ClinVar", "dbSNP", "gnomAD", "COSMIC"):
                return "Variant", EntityNamespace.VAR
            elif src_name in ("ClinicalTrials.gov", "WHO_ICTRP", "EU_CTR"):
                return "Clinical Trial", EntityNamespace.TRL
            elif src_name in ("PMID", "PMCID", "DOI", "OpenAlex", "Crossref"):
                return "Publication", EntityNamespace.PUB

        return "Disease", EntityNamespace.DIS

    def resolve(self, record: IncomingRecord) -> ResolutionResult:
        confidence = ConfidenceBreakdown()
        warnings = []
        matched_bq_id = None
        stage_matched = "NONE"

        # Stage 1 & 2: Normalize and fold
        norm_label = fold_for_matching(record.raw_label)
        entity_type, namespace = self.detect_entity_type(record)

        # Stage 4 / Ch.5 §5.6: Identifier Matching (Priority 1)
        bq_id, conf = match_by_identifier(record, self.store)
        if bq_id:
            matched_bq_id = bq_id
            stage_matched = "STAGE_4_IDENTIFIER_MATCH"
            confidence.add_signal(ConfidenceSignalType.EXACT_IDENTIFIER_MATCH, conf, f"Native ID match")

        # Stage 5 / Ch.5 §5.7: Ontology Matching (Priority 2)
        if not matched_bq_id:
            bq_id, conf = match_by_ontology(record, self.store)
            if bq_id:
                matched_bq_id = bq_id
                stage_matched = "STAGE_5_ONTOLOGY_MATCH"
                confidence.add_signal(ConfidenceSignalType.ONTOLOGY_CROSS_REFERENCE, conf, f"Ontology concept map")

        # Stage 6 / Ch.5 §5.8: Synonym Resolution (Priority 3)
        if not matched_bq_id:
            bq_id, conf = match_by_synonym(record, self.store)
            if bq_id:
                matched_bq_id = bq_id
                stage_matched = "STAGE_6_SYNONYM_MATCH"
                confidence.add_signal(ConfidenceSignalType.SYNONYM_MATCH, conf, f"Exact synonym graph match")

        # Stage 7 / Ch.5 §5.19 & §5.9: Semantic Similarity & Context Disambiguation (Priority 4)
        if not matched_bq_id:
            sim_matches = match_by_similarity(record, self.store, top_k=5, threshold=0.60)
            if sim_matches:
                if len(sim_matches) > 1 and record.context:
                    # Collect candidate types for disambiguation
                    cand_types = []
                    for cid, _ in sim_matches:
                        ent = self.session.get(BioquoraEntity, cid)
                        if ent:
                            cand_types.append(ent.entity_type)
                    best_type = apply_context_disambiguation(record, cand_types)
                    if best_type:
                        for cid, score in sim_matches:
                            ent = self.session.get(BioquoraEntity, cid)
                            if ent and ent.entity_type.lower() == best_type.lower():
                                matched_bq_id = cid
                                stage_matched = "STAGE_7_SEMANTIC_SIMILARITY_DISAMBIGUATED"
                                confidence.add_signal(ConfidenceSignalType.SEMANTIC_SIMILARITY, score, f"Context disambiguated to {best_type}")
                                break
                if not matched_bq_id:
                    matched_bq_id, score = sim_matches[0]
                    stage_matched = "STAGE_7_SEMANTIC_SIMILARITY"
                    confidence.add_signal(ConfidenceSignalType.SEMANTIC_SIMILARITY, score, f"Similarity fallback score {score:.2f}")

        # Add Source Authority Signal
        if record.source_database:
            src_name = record.source_database.value if isinstance(record.source_database, enum.Enum) else str(record.source_database)
            auth_val = SOURCE_AUTHORITY_TIER.get(src_name, 0.50)
            confidence.add_signal(ConfidenceSignalType.SOURCE_AUTHORITY, auth_val, f"Source: {src_name}")

        # Stage 8: Evidence Scoring
        if record.evidence_level:
            ev_val = EVIDENCE_LEVEL_WEIGHT.get(record.evidence_level, 0.50)
            confidence.add_signal(ConfidenceSignalType.CONTEXTUAL_EVIDENCE, ev_val, f"Level: {record.evidence_level.value}")
        if record.evidence_pmids:
            pub_val = min(1.0, 0.40 + (len(record.evidence_pmids) * 0.15))
            confidence.add_signal(ConfidenceSignalType.PUBLICATION_SUPPORT, pub_val, f"{len(record.evidence_pmids)} PMIDs")

        # Stage 9: Conflict Detection
        self.conflict_detection(record, matched_bq_id)

        # Stage 10: Canonical ID Assignment
        created_new = False
        if not matched_bq_id:
            matched_bq_id = self.id_gen.next_id(namespace)
            created_new = True
            stage_matched = "STAGE_10_NEW_ENTITY"
            confidence.add_signal(ConfidenceSignalType.EXACT_LABEL_MATCH, 1.0, "New canonical concept")

        # Stage 11: Knowledge Graph Update
        self.update_knowledge_graph(record, matched_bq_id, created_new, entity_type, namespace, confidence)

        return ResolutionResult(
            bq_id=matched_bq_id,
            created_new_entity=created_new,
            confidence=confidence,
            matched_by_stage=stage_matched,
            warnings=warnings,
        )

    def conflict_detection(self, record: IncomingRecord, candidate_bq_id: str | None) -> None:
        if not candidate_bq_id or not record.source_database or not record.external_id:
            return
        src_val = record.source_database if isinstance(record.source_database, SourceDatabase) else SourceDatabase(str(record.source_database)) if str(record.source_database) in SourceDatabase._value2member_map_ else SourceDatabase.OTHER
        stmt = select(ExternalIdentifier).where(
            ExternalIdentifier.source_database == src_val,
            ExternalIdentifier.external_id == record.external_id,
        )
        existing = self.session.execute(stmt).scalar_one_or_none()
        if existing and existing.entity_id != candidate_bq_id:
            raise ConflictError(
                f"Conflict detected: External ID {record.external_id} from {src_val.value} "
                f"is already mapped to canonical entity {existing.entity_id}, but current resolution "
                f"attempt targeted {candidate_bq_id}."
            )

    def update_knowledge_graph(
        self,
        record: IncomingRecord,
        bq_id: str,
        created_new: bool,
        entity_type: str,
        namespace: EntityNamespace,
        confidence: ConfidenceBreakdown,
    ) -> None:
        if created_new:
            entity = BioquoraEntity(
                bq_id=bq_id,
                namespace=namespace,
                entity_type=entity_type,
                preferred_label=normalize_text(record.raw_label),
                status=EntityStatus.ACTIVE if confidence.total >= 0.80 else EntityStatus.PENDING_REVIEW,
                confidence_score=confidence.total,
                quality_score=confidence.total,
                version=1,
            )
            self.session.add(entity)
            self.session.flush()

            version_record = EntityVersion(
                entity_id=bq_id,
                version_number=1,
                change_type=ChangeType.CREATE,
                change_summary=f"Created canonical entity from {record.source_database or 'unknown'}",
                changed_by=record.reviewer or "system_pipeline",
            )
            self.session.add(version_record)
        else:
            entity = self.session.get(BioquoraEntity, bq_id)
            if entity:
                entity.confidence_score = max(entity.confidence_score, confidence.total)
                entity.quality_score = max(entity.quality_score, confidence.total)
                entity.version += 1
                entity.updated_at = utcnow()

                version_record = EntityVersion(
                    entity_id=bq_id,
                    version_number=entity.version,
                    change_type=ChangeType.UPDATE,
                    change_summary=f"Updated canonical entity with record from {record.source_database or 'unknown'}",
                    changed_by=record.reviewer or "system_pipeline",
                )
                self.session.add(version_record)

        # Ensure primary synonym (preferred label)
        norm_raw = fold_for_matching(record.raw_label)
        stmt_syn = select(Synonym).where(
            Synonym.entity_id == bq_id,
            Synonym.normalized_term == norm_raw,
        )
        if not self.session.execute(stmt_syn).scalar_one_or_none():
            syn = Synonym(
                entity_id=bq_id,
                term=record.raw_label.strip(),
                normalized_term=norm_raw,
                synonym_type=SynonymType.PREFERRED if created_new else SynonymType.EXACT,
                language="en",
                source=str(record.source_database.value if isinstance(record.source_database, enum.Enum) else record.source_database) if record.source_database else None,
            )
            self.session.add(syn)

        # Add additional synonyms
        for syn_str in record.synonyms:
            norm_s = fold_for_matching(syn_str)
            stmt_s = select(Synonym).where(
                Synonym.entity_id == bq_id,
                Synonym.normalized_term == norm_s,
            )
            if not self.session.execute(stmt_s).scalar_one_or_none():
                self.session.add(Synonym(
                    entity_id=bq_id,
                    term=syn_str.strip(),
                    normalized_term=norm_s,
                    synonym_type=SynonymType.EXACT,
                    language="en",
                    source=str(record.source_database.value if isinstance(record.source_database, enum.Enum) else record.source_database) if record.source_database else None,
                ))

        # Add external identifier mapping
        if record.source_database and record.external_id:
            src_val = record.source_database if isinstance(record.source_database, SourceDatabase) else SourceDatabase(str(record.source_database)) if str(record.source_database) in SourceDatabase._value2member_map_ else SourceDatabase.OTHER
            stmt_ext = select(ExternalIdentifier).where(
                ExternalIdentifier.entity_id == bq_id,
                ExternalIdentifier.source_database == src_val,
                ExternalIdentifier.external_id == record.external_id,
            )
            ext_map = self.session.execute(stmt_ext).scalar_one_or_none()
            if not ext_map:
                ext_map = ExternalIdentifier(
                    entity_id=bq_id,
                    source_database=src_val,
                    external_id=record.external_id,
                    is_primary=created_new,
                    mapping_confidence=confidence.total,
                    mapping_algorithm="EntityResolutionPipeline.v1",
                    import_version=record.import_version,
                    reviewer=record.reviewer or "system_pipeline",
                )
                self.session.add(ext_map)
                self.session.flush()

                for stype, weight, val, notes in confidence.signals:
                    self.session.add(ConfidenceSignal(
                        mapping_id=ext_map.id,
                        signal_type=stype,
                        weight=weight,
                        value=val,
                        notes=notes,
                    ))

        # Add ontology memberships
        for ont_name, ont_id in record.ontology_refs:
            stmt_ont = select(OntologyMembership).where(
                OntologyMembership.entity_id == bq_id,
                OntologyMembership.ontology_name == ont_name,
                OntologyMembership.ontology_term_id == ont_id,
            )
            if not self.session.execute(stmt_ont).scalar_one_or_none():
                self.session.add(OntologyMembership(
                    entity_id=bq_id,
                    ontology_name=ont_name,
                    ontology_term_id=ont_id,
                    is_primary=False,
                ))

        # Add evidence records
        for pmid in record.evidence_pmids:
            self.session.add(EvidenceRecord(
                entity_id=bq_id,
                evidence_level=record.evidence_level or EvidenceLevel.OBSERVATIONAL_STUDY,
                source_publication_pmid=pmid,
                description=f"Supporting evidence PMID:{pmid}",
                confidence_contribution=1.0,
            ))

        # Add provenance record
        if record.source_database and record.external_id:
            src_str = record.source_database.value if isinstance(record.source_database, enum.Enum) else str(record.source_database)
            self.session.add(ProvenanceRecord(
                entity_id=bq_id,
                mapped_from_database=src_str,
                original_identifier=record.external_id,
                import_version=record.import_version,
                mapping_algorithm="EntityResolutionPipeline.v1",
                confidence=confidence.total,
                reviewer=record.reviewer or "system_pipeline",
            ))

        self.session.flush()
