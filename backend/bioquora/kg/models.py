from __future__ import annotations
from dataclasses import dataclass, field
from enum import Enum
from typing import Any, Optional
import datetime

try:
    from bioquora.step1_resolution.core_models import (
        EntityType,
        Provenance as BaseProvenance,
        Evidence as BaseEvidence,
    )
except ImportError:
    class EntityType(str, Enum):
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
        TISSUE = "Tissue"
        ORGAN = "Organ"
        OTHER = "Other"


class Predicate(str, Enum):
    """Semantic graph relation predicates."""
    CAUSES = "CAUSES"
    TREATS = "TREATS"
    INHIBITS = "INHIBITS"
    STIMULATES = "STIMULATES"
    INTERACTS_WITH = "INTERACTS_WITH"
    IS_A = "IS_A"
    PART_OF = "PART_OF"
    EXPRESSES = "EXPRESSES"
    ASSOCIATED_WITH = "ASSOCIATED_WITH"
    CONTRADICTS = "CONTRADICTS"
    SUPPORTS = "SUPPORTS"
    MENTIONS = "MENTIONS"
    REGULATES = "REGULATES"
    BINDS = "BINDS"
    HAS_PHENOTYPE = "HAS_PHENOTYPE"
    CO_OCCURS_WITH = "CO_OCCURS_WITH"
    OTHER = "OTHER"


class EvidenceType(str, Enum):
    """Types of evidence supporting knowledge graph assertions."""
    PUBLICATION = "Publication"
    CLINICAL_TRIAL = "ClinicalTrial"
    CURATED_DATABASE = "CuratedDatabase"
    EXPERIMENTAL = "Experimental"
    COMPUTATIONAL_PREDICTION = "ComputationalPrediction"
    EXPERT_CONSENSUS = "ExpertConsensus"
    TEXT_MINING = "TextMining"
    OTHER = "Other"


@dataclass
class Confidence:
    """Quantitative and qualitative confidence score for an assertion or entity."""
    value: float = 1.0
    level: str = "HIGH"  # HIGH | MEDIUM | LOW | UNVERIFIED
    evidence_count: int = 1
    metadata: dict[str, Any] = field(default_factory=dict)

    @property
    def score(self) -> float:
        return self.value

    def __getitem__(self, key: str) -> Any:
        if key in ("score", "value"):
            return self.value
        elif hasattr(self, key):
            return getattr(self, key)
        elif key in self.metadata:
            return self.metadata[key]
        raise KeyError(key)

    def get(self, key: str, default: Any = None) -> Any:
        try:
            return self[key]
        except KeyError:
            return default

    def __contains__(self, key: str) -> bool:
        return key in ("score", "value", "level", "evidence_count", "metadata") or key in self.metadata


@dataclass
class Provenance:
    """Provenance tracking for nodes and edges per Ch.5 §5.16."""
    created_by: str = "system"
    created_at: str = field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc).isoformat())
    source: str = "Bioquora"
    version: str | None = "1.0"
    audit_trail: list[str] = field(default_factory=list)

    def __getitem__(self, key: str) -> Any:
        if hasattr(self, key):
            return getattr(self, key)
        raise KeyError(key)

    def get(self, key: str, default: Any = None) -> Any:
        try:
            return self[key]
        except KeyError:
            return default


@dataclass
class Evidence:
    """Evidence supporting a graph assertion or relationship per Ch.5 §5.10-5.11."""
    id: str
    evidence_type: EvidenceType = EvidenceType.CURATED_DATABASE
    source: str = "Unknown"
    snippet: str | None = None
    confidence: Confidence = field(default_factory=Confidence)
    url: str | None = None
    pmid: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)

    @property
    def evidence_level(self) -> Any:
        return self.metadata.get("evidence_level")

    def __getitem__(self, key: str) -> Any:
        if key == "evidence_level":
            return self.evidence_level
        elif hasattr(self, key):
            return getattr(self, key)
        elif key in self.metadata:
            return self.metadata[key]
        raise KeyError(key)

    def get(self, key: str, default: Any = None) -> Any:
        try:
            return self[key]
        except KeyError:
            return default



@dataclass
class Node:
    """A canonical knowledge node in the Bioquora Knowledge Graph."""
    id: str
    entity_type: EntityType | str
    name: str
    description: str | None = None
    synonyms: list[str] = field(default_factory=list)
    external_ids: dict[str, str] = field(default_factory=dict)
    confidence: Confidence = field(default_factory=Confidence)
    provenance: Provenance = field(default_factory=Provenance)
    properties: dict[str, Any] = field(default_factory=dict)
    active: bool = True

    @property
    def preferred_label(self) -> str:
        return self.name

    @property
    def bioquora_id(self) -> str:
        return self.id

    @property
    def ontology_ids(self) -> dict[str, str]:
        return self.external_ids

    def __getitem__(self, key: str) -> Any:
        if key in ("preferred_label", "name"):
            return self.name
        elif key in ("bioquora_id", "id"):
            return self.id
        elif key in ("ontology_ids", "external_ids"):
            return self.external_ids
        elif hasattr(self, key):
            return getattr(self, key)
        elif key in self.properties:
            return self.properties[key]
        raise KeyError(key)

    def get(self, key: str, default: Any = None) -> Any:
        try:
            return self[key]
        except KeyError:
            return default

    def __contains__(self, key: str) -> bool:
        return key in ("preferred_label", "name", "bioquora_id", "id", "ontology_ids", "external_ids", "entity_type", "description", "synonyms", "confidence", "provenance", "properties", "active") or key in self.properties


@dataclass
class Edge:
    """A typed semantic relationship between two nodes in the Bioquora Knowledge Graph."""
    source_id: str
    target_id: str
    predicate: Predicate | str
    id: str | None = None
    confidence: Confidence = field(default_factory=Confidence)
    evidence: list[Evidence] = field(default_factory=list)
    provenance: Provenance = field(default_factory=Provenance)
    properties: dict[str, Any] = field(default_factory=dict)

    def __getitem__(self, key: str) -> Any:
        if hasattr(self, key):
            return getattr(self, key)
        elif key in self.properties:
            return self.properties[key]
        raise KeyError(key)

    def get(self, key: str, default: Any = None) -> Any:
        try:
            return self[key]
        except KeyError:
            return default

