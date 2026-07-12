"""
Bioquora - Core Data Models
============================
Implements the "Canonical Knowledge Object" (Ch.5 §5.18) and the supporting
structures referenced throughout Part 3 (Ontology Layer) and Part 4
(Entity Resolution Engine).

Every object here maps directly onto a section of the technical bible:
    OntologyConcept   -> Ch.4 "Concepts / Properties / Relationships"
    Synonym           -> Ch.5 §5.8 Synonym Categories
    CrossReference    -> Ch.4 "Extract Cross References"
    Relationship       -> Ch.4 semantic network edges
    Evidence          -> Ch.5 §5.10-5.11 Evidence Fusion / Evidence Model
    Provenance        -> Ch.5 §5.16 Provenance Graph
    CanonicalEntity   -> Ch.5 §5.18 Canonical Knowledge Object
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from enum import Enum
from typing import Optional
import json


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


# ---------------------------------------------------------------------------
# Enumerations (Ch.4 / Ch.5 controlled vocabularies)
# ---------------------------------------------------------------------------

class EntityType(str, Enum):
    """Semantic types Bioquora validates entities against (Ch.4 'Semantic Types')."""
    DISEASE = "Disease"
    PHENOTYPE = "Phenotype"
    GENE = "Gene"
    PROTEIN = "Protein"
    DRUG = "Drug"
    CHEMICAL = "Chemical"
    ANATOMY = "Anatomy"
    CELL = "Cell"
    PATHWAY = "Pathway"
    CLINICAL = "Clinical"
    PUBLICATION = "Publication"
    VARIANT = "Variant"
    CLINICAL_TRIAL = "ClinicalTrial"
    ORGANISM = "Organism"


class SynonymType(str, Enum):
    """Ch.5 §5.8 — 'Not all synonyms should be treated equally.'"""
    PREFERRED = "Preferred"
    EXACT = "Exact"
    BROAD = "Broad"
    NARROW = "Narrow"
    HISTORICAL = "Historical"
    ABBREVIATION = "Abbreviation"
    LAYPERSON = "Layperson"
    INTERNATIONAL = "International"
    RELATED = "Related"


class MatchStage(str, Enum):
    """Ch.5 §5.3 resolution pipeline stages, used to record *how* a record
    was resolved (needed for audit / confidence transparency, §5.12)."""
    IDENTIFIER = "IdentifierMatch"
    ONTOLOGY = "OntologyMatch"
    SYNONYM = "SynonymMatch"
    SEMANTIC = "SemanticSimilarity"
    NO_MATCH = "NoMatch"
    NEW_ENTITY = "NewEntityCreated"


# ---------------------------------------------------------------------------
# Ontology-layer objects (Part 3)
# ---------------------------------------------------------------------------

@dataclass
class Synonym:
    text: str
    type: SynonymType = SynonymType.EXACT

    def to_dict(self):
        return {"text": self.text, "type": self.type.value}


@dataclass
class CrossReference:
    ontology: str          # e.g. "MeSH", "ICD11", "UMLS"
    id: str                # e.g. "D001943"

    def to_dict(self):
        return {"ontology": self.ontology, "id": self.id}


@dataclass
class OntologyConcept:
    """A single concept as parsed straight out of a source ontology file,
    *before* it is fused into a canonical Bioquora entity (Ch.4 pipeline:
    Parse -> Extract Concepts -> Extract Hierarchy -> ... )."""
    ontology: str                     # source ontology short name, e.g. "MONDO"
    native_id: str                    # e.g. "MONDO:0007254"
    label: str
    entity_type: EntityType
    definition: str = ""
    synonyms: list[Synonym] = field(default_factory=list)
    xrefs: list[CrossReference] = field(default_factory=list)
    parents: list[str] = field(default_factory=list)   # native_ids of is_a parents
    version: str = "unknown"

    def to_dict(self):
        d = asdict(self)
        d["entity_type"] = self.entity_type.value
        d["synonyms"] = [s.to_dict() for s in self.synonyms]
        d["xrefs"] = [x.to_dict() for x in self.xrefs]
        return d


# ---------------------------------------------------------------------------
# Resolution-layer / graph objects (Part 4)
# ---------------------------------------------------------------------------

@dataclass
class Provenance:
    """Ch.5 §5.16 — 'Who / Imported What / When / From / Which Version /
    Using Which Algorithm / Validated By / Confidence'"""
    source: str
    imported_what: str
    imported_when: str = field(default_factory=now_iso)
    source_version: str = "unknown"
    algorithm: str = "unspecified"
    validated_by: str = "system"
    confidence: float = 1.0

    def to_dict(self):
        return asdict(self)


@dataclass
class Evidence:
    """Ch.5 §5.11 Evidence Model — attached to relationships, not entities."""
    source_db: str
    pmids: list[str] = field(default_factory=list)
    doi: Optional[str] = None
    clinical_trial: Optional[str] = None
    guideline: Optional[str] = None
    review_paper: bool = False
    evidence_score: float = 0.5

    def to_dict(self):
        return asdict(self)


@dataclass
class RelationshipAssertion:
    """A single (possibly conflicting) assertion about an edge, from one
    source. Ch.5 §5.17 — Bioquora 'does not overwrite. Stores both.'"""
    subject_bq_id: str
    predicate: str                 # Biolink-style predicate, e.g. "treats"
    object_bq_id: str
    source: str
    source_version: str = "unknown"
    confidence: float = 0.5
    evidence: list[Evidence] = field(default_factory=list)
    asserted_at: str = field(default_factory=now_iso)

    def key(self):
        return (self.subject_bq_id, self.predicate, self.object_bq_id, self.source)

    def to_dict(self):
        d = asdict(self)
        return d


@dataclass
class CanonicalEntity:
    """Ch.5 §5.18 Canonical Knowledge Object — the unit of truth in Bioquora.
    'One real-world biomedical concept = One Bioquora Entity.'"""
    bq_id: str
    entity_type: EntityType
    preferred_name: str
    synonyms: list[Synonym] = field(default_factory=list)
    external_ids: dict[str, str] = field(default_factory=dict)   # ontology -> native id
    description: str = ""
    confidence: float = 1.0
    version: int = 1
    provenance: list[Provenance] = field(default_factory=list)
    metadata: dict = field(default_factory=dict)
    merged_from: list[str] = field(default_factory=list)   # audit trail of merges
    active: bool = True

    def add_synonym(self, text: str, type: SynonymType = SynonymType.EXACT):
        norm = text.strip().lower()
        if norm and not any(s.text.strip().lower() == norm for s in self.synonyms):
            self.synonyms.append(Synonym(text=text, type=type))

    def all_labels(self) -> list[str]:
        return [self.preferred_name] + [s.text for s in self.synonyms]

    def to_dict(self):
        return {
            "bq_id": self.bq_id,
            "entity_type": self.entity_type.value,
            "preferred_name": self.preferred_name,
            "synonyms": [s.to_dict() for s in self.synonyms],
            "external_ids": self.external_ids,
            "description": self.description,
            "confidence": self.confidence,
            "version": self.version,
            "provenance": [p.to_dict() for p in self.provenance],
            "metadata": self.metadata,
            "merged_from": self.merged_from,
            "active": self.active,
        }

    @staticmethod
    def from_dict(d: dict) -> "CanonicalEntity":
        return CanonicalEntity(
            bq_id=d["bq_id"],
            entity_type=EntityType(d["entity_type"]),
            preferred_name=d["preferred_name"],
            synonyms=[Synonym(s["text"], SynonymType(s["type"])) for s in d.get("synonyms", [])],
            external_ids=d.get("external_ids", {}),
            description=d.get("description", ""),
            confidence=d.get("confidence", 1.0),
            version=d.get("version", 1),
            provenance=[Provenance(**p) for p in d.get("provenance", [])],
            metadata=d.get("metadata", {}),
            merged_from=d.get("merged_from", []),
            active=d.get("active", True),
        )


@dataclass
class IncomingRecord:
    """A raw mention of a biomedical entity coming from some source dataset
    (PubMed, DrugBank, ClinVar, ...) before resolution — the input to the
    Entity Resolution Engine (Ch.5 §5.3)."""
    source: str
    raw_label: str
    entity_type: EntityType
    native_ids: dict[str, str] = field(default_factory=dict)  # ontology -> id, if known
    context: str = ""            # surrounding sentence, for disambiguation (§5.9)
    source_version: str = "unknown"

    def to_dict(self):
        d = asdict(self)
        d["entity_type"] = self.entity_type.value
        return d


@dataclass
class ResolutionResult:
    record: IncomingRecord
    bq_id: str
    stage_matched: MatchStage
    confidence: float
    signal_breakdown: dict[str, float] = field(default_factory=dict)
    candidates_considered: list[tuple[str, float]] = field(default_factory=list)

    def to_dict(self):
        return {
            "source": self.record.source,
            "raw_label": self.record.raw_label,
            "resolved_to": self.bq_id,
            "stage": self.stage_matched.value,
            "confidence": round(self.confidence, 3),
            "signal_breakdown": {k: round(v, 3) for k, v in self.signal_breakdown.items()},
            "candidates_considered": [(bq, round(s, 3)) for bq, s in self.candidates_considered],
        }
