"""
Chapter 8 / Part 7 -- core data models for the Bioquora Biomedical Reasoning
Engine (BBRE). These are the atomic units that every other reasoning module
(traversal, aggregation, contradiction detection, explanation, hypothesis
generation) operates on.
"""

from __future__ import annotations

import uuid
from datetime import date, datetime
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator


# ---------------------------------------------------------------------------
# 8.2 / 8.9  Evidence & contradiction primitives
# ---------------------------------------------------------------------------

class EvidenceSource(str, Enum):
    PUBLICATION = "publication"
    CLINVAR = "clinvar"
    DRUGBANK = "drugbank"
    GENE_ONTOLOGY = "gene_ontology"
    CLINICAL_GUIDELINE = "clinical_guideline"
    CLINICAL_TRIAL = "clinical_trial"
    # Legacy/extra enum values for existing pipelines
    DATABASE = "database"
    EXPERT_CURATION = "expert_curation"
    EXPERIMENTAL = "experimental"
    INFERENCE = "inference"


class StudyDesign(str, Enum):
    RCT = "randomized_controlled_trial"
    COHORT = "cohort_study"
    CASE_CONTROL = "case_control"
    META_ANALYSIS = "meta_analysis"
    IN_VITRO = "in_vitro"
    OBSERVATIONAL = "observational"
    UNKNOWN = "unknown"
    # Additional designs for existing pipelines
    RETROSPECTIVE = "retrospective"
    CASE_REPORT = "case_report"
    IN_SILICO = "in_silico"
    CLINICAL_TRIAL = "clinical_trial"


class EvidenceQuality(str, Enum):
    HIGH = "high"
    MODERATE = "moderate"
    LOW = "low"


class Evidence(BaseModel):
    """A single piece of evidence attached to a graph edge / assertion."""
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    id: str = Field(default_factory=lambda: f"EV:{uuid.uuid4().hex[:10]}")
    source: EvidenceSource = EvidenceSource.PUBLICATION
    source_id: str = ""  # e.g. PMID, ClinVar accession, DrugBank ID
    statement: str = ""
    supports: bool = True  # False => this evidence contradicts the assertion
    study_design: StudyDesign = StudyDesign.UNKNOWN
    population: Optional[str] = None
    publication_date: Optional[date] = None
    quality: EvidenceQuality = EvidenceQuality.MODERATE
    confidence: float = 1.0  # Optional/legacy compatibility
    snippet: Optional[str] = None
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="before")
    @classmethod
    def _normalize_kwargs(cls, data: Any) -> Any:
        if isinstance(data, dict):
            known_fields = {
                "id", "source", "source_id", "statement", "supports",
                "study_design", "population", "publication_date", "quality",
                "confidence", "snippet", "metadata",
            }
            meta = dict(data.get("metadata") or {})
            for k, v in list(data.items()):
                if k not in known_fields:
                    meta[k] = data.pop(k)
            data["metadata"] = meta
        return data

    @field_validator("source", mode="before")
    @classmethod
    def _normalize_source(cls, v: Any) -> Any:
        if isinstance(v, str):
            val = v.lower()
            for es in EvidenceSource:
                if es.value.lower() == val or es.name.lower() == val:
                    return es.value
            return EvidenceSource.PUBLICATION.value
        elif hasattr(v, "value") and isinstance(v.value, str):
            val = v.value.lower()
            for es in EvidenceSource:
                if es.value.lower() == val or es.name.lower() == val:
                    return es.value
            return EvidenceSource.PUBLICATION.value
        return v

    @field_validator("study_design", mode="before")
    @classmethod
    def _normalize_design(cls, v: Any) -> Any:
        if isinstance(v, str):
            val = v.lower()
            if val == "rct":
                val = "randomized_controlled_trial"
            for sd in StudyDesign:
                if sd.value.lower() == val or sd.name.lower() == val:
                    return sd.value
            return StudyDesign.UNKNOWN.value
        elif hasattr(v, "value") and isinstance(v.value, str):
            val = v.value.lower()
            if val == "rct":
                val = "randomized_controlled_trial"
            for sd in StudyDesign:
                if sd.value.lower() == val or sd.name.lower() == val:
                    return sd.value
            return StudyDesign.UNKNOWN.value
        return v or StudyDesign.UNKNOWN.value

    @field_validator("quality", mode="before")
    @classmethod
    def _normalize_quality(cls, v: Any) -> Any:
        if isinstance(v, str):
            for eq in EvidenceQuality:
                if eq.value.lower() == v.lower() or eq.name.lower() == v.lower():
                    return eq.value
            return EvidenceQuality.MODERATE.value
        elif hasattr(v, "value") and isinstance(v.value, str):
            for eq in EvidenceQuality:
                if eq.value.lower() == v.value.lower() or eq.name.lower() == v.value.lower():
                    return eq.value
            return EvidenceQuality.MODERATE.value
        return v or EvidenceQuality.MODERATE.value

    def quality_weight(self) -> float:
        val = getattr(self.quality, "value", str(self.quality)).lower()
        return {"high": 1.0, "moderate": 0.6, "low": 0.3}.get(val, 0.6)


# ---------------------------------------------------------------------------
# 8.5 / 8.11  Graph primitives & rule engine
# ---------------------------------------------------------------------------

class Predicate(str, Enum):
    ENCODES = "encodes"
    PARTICIPATES_IN = "participates_in"
    TARGETS = "targets"
    ASSOCIATED_WITH = "associated_with"
    CRITICAL_FOR = "critical_for"
    CAUSES = "causes"
    TREATS = "treats"
    INHIBITS = "inhibits"
    INTERACTS_WITH = "interacts_with"
    SIMILAR_TO = "similar_to"
    # inferred-only predicates (8.12) -- never asserted directly from a source
    MAY_BE_CANDIDATE_FOR = "may_be_candidate_for"
    # Additional predicates required by existing Bioquora pipelines
    EXPRESSES = "EXPRESSES"
    CONTRADICTS = "CONTRADICTS"
    IS_A = "IS_A"
    PART_OF = "PART_OF"
    REGULATES = "REGULATES"
    UPREGULATES = "UPREGULATES"
    DOWNREGULATES = "DOWNREGULATES"
    BIOMARKER_FOR = "BIOMARKER_FOR"
    LOCATED_IN = "LOCATED_IN"


class EntityType(str, Enum):
    GENE = "Gene"
    PROTEIN = "Protein"
    PATHWAY = "Pathway"
    DISEASE = "Disease"
    DRUG = "Drug"
    CLINICAL_TRIAL = "ClinicalTrial"
    SYMPTOM = "Symptom"
    # Additional types required across Bioquora
    CHEMICAL = "Chemical"
    CELL_TYPE = "Cell_Type"
    ANATOMY = "Anatomy"
    CONCEPT = "Concept"


class GraphEdge(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    id: str = Field(default_factory=lambda: f"EDGE:{uuid.uuid4().hex[:10]}")
    subject_id: str = ""
    predicate: Predicate = Predicate.ASSOCIATED_WITH
    object_id: str = ""
    evidence_ids: list[str] = Field(default_factory=list)
    confidence: float = 0.5
    inferred: bool = False
    discovered_date: Optional[date] = None
    deprecated: bool = False
    properties: dict[str, Any] = Field(default_factory=dict)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="before")
    @classmethod
    def _normalize_edge(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if "subject_id" not in data and "source_id" in data:
                data["subject_id"] = data["source_id"]
            if "object_id" not in data and "target_id" in data:
                data["object_id"] = data["target_id"]
            if "predicate" in data:
                p = data["predicate"]
                if hasattr(p, "value"):
                    data["predicate"] = p.value
                elif isinstance(p, str):
                    p_lower = p.lower()
                    for pred in Predicate:
                        if pred.value.lower() == p_lower or pred.name.lower() == p_lower:
                            data["predicate"] = pred.value
                            break
            known_fields = {
                "id", "subject_id", "source_id", "predicate", "object_id",
                "target_id", "evidence_ids", "confidence", "inferred",
                "discovered_date", "deprecated", "properties", "metadata",
            }
            props = dict(data.get("properties") or {})
            if "weight" in data:
                w = data["weight"]
                if "confidence" not in data:
                    data["confidence"] = w
                props["weight"] = data.pop("weight")
            for k, v in list(data.items()):
                if k not in known_fields:
                    props[k] = data.pop(k)
            data["properties"] = props
        return data

    @property
    def source_id(self) -> str:
        return self.subject_id

    @source_id.setter
    def source_id(self, val: str) -> None:
        self.subject_id = val

    @property
    def target_id(self) -> str:
        return self.object_id

    @target_id.setter
    def target_id(self, val: str) -> None:
        self.object_id = val

    @property
    def weight(self) -> float:
        return self.properties.get("weight", self.confidence)

    @weight.setter
    def weight(self, val: float) -> None:
        self.confidence = val
        self.properties["weight"] = val


class GraphNode(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    id: str
    type: EntityType = EntityType.CONCEPT
    name: str = ""
    attributes: dict = Field(default_factory=dict)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="before")
    @classmethod
    def _normalize_node(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if "attributes" not in data and "properties" in data:
                data["attributes"] = data["properties"]
            if "type" in data:
                t = data["type"]
                if hasattr(t, "value"):
                    data["type"] = t.value
                elif isinstance(t, str):
                    t_lower = t.lower()
                    for et in EntityType:
                        if et.value.lower() == t_lower or et.name.lower() == t_lower:
                            data["type"] = et.value
                            break
            known_fields = {"id", "type", "name", "attributes", "properties", "metadata"}
            attrs = dict(data.get("attributes") or data.get("properties") or {})
            for k, v in list(data.items()):
                if k not in known_fields:
                    attrs[k] = data.pop(k)
            data["attributes"] = attrs
        return data

    @property
    def properties(self) -> dict:
        return self.attributes


# ---------------------------------------------------------------------------
# 8.6 / 8.7  Reasoning paths
# ---------------------------------------------------------------------------

class ReasoningPath(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    node_ids: list[str] = Field(default_factory=list)
    edge_ids: list[str] = Field(default_factory=list)
    score: float = 0.0
    mode: str = "deductive"  # deductive/inductive/abductive/analogical/causal/counterfactual
    metadata: dict[str, Any] = Field(default_factory=dict)

    @property
    def length(self) -> int:
        return len(self.edge_ids) if self.edge_ids else max(0, len(self.node_ids) - 1)


# ---------------------------------------------------------------------------
# 8.8 / 8.9  Aggregated evidence & contradictions
# ---------------------------------------------------------------------------

class EvidenceSummary(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    support_count: int = 0
    contradiction_count: int = 0
    weighted_support: float = 0.0
    weighted_contradiction: float = 0.0
    overall_confidence: float = 0.0
    confidence_label: str = "Low"
    metadata: dict[str, Any] = Field(default_factory=dict)


class Contradiction(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    subject_id: str = ""
    predicate: Predicate = Predicate.ASSOCIATED_WITH
    object_id: str = ""
    supporting_evidence: list[str] = Field(default_factory=list)
    contradicting_evidence: list[str] = Field(default_factory=list)
    likely_causes: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="before")
    @classmethod
    def _normalize_contra(cls, data: Any) -> Any:
        if isinstance(data, dict) and "predicate" in data:
            p = data["predicate"]
            if hasattr(p, "value"):
                data["predicate"] = p.value
            elif isinstance(p, str):
                p_lower = p.lower()
                for pred in Predicate:
                    if pred.value.lower() == p_lower or pred.name.lower() == p_lower:
                        data["predicate"] = pred.value
                        break
        return data


# ---------------------------------------------------------------------------
# 8.14 / 8.15  Explanations & hypotheses
# ---------------------------------------------------------------------------

class Explanation(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    query: str = ""
    answer: str = ""
    reasoning_path: ReasoningPath = Field(default_factory=lambda: ReasoningPath(node_ids=[], edge_ids=[]))
    evidence_summary: EvidenceSummary = Field(default_factory=EvidenceSummary)
    supporting_sources: list[str] = Field(default_factory=list)
    limitations: list[str] = Field(default_factory=list)
    generated_at: datetime = Field(default_factory=datetime.utcnow)

    # Legacy compatibility attributes
    summary: str = ""
    path: list[str] = Field(default_factory=list)
    score: float = 1.0
    evidence_ids: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="after")
    def _sync_explanation(self) -> Explanation:
        if self.answer and not self.summary:
            self.summary = self.answer
        elif self.summary and not self.answer:
            self.answer = self.summary
        if self.reasoning_path and hasattr(self.reasoning_path, "node_ids") and not self.path:
            self.path = self.reasoning_path.node_ids
        return self


class HypothesisStatus(str, Enum):
    PROPOSED = "proposed"
    UNDER_REVIEW = "under_review"
    ACCEPTED = "accepted"
    REJECTED = "rejected"


class Hypothesis(BaseModel):
    model_config = ConfigDict(extra="allow", arbitrary_types_allowed=True, populate_by_name=True)

    id: str = Field(default_factory=lambda: f"HYP:{uuid.uuid4().hex[:10]}")
    statement: str = ""
    hypothesis_type: str = "topological_inference"  # candidate_gene / drug_repurposing / biomarker / missing_pathway_link
    supporting_path: ReasoningPath = Field(default_factory=lambda: ReasoningPath(node_ids=[], edge_ids=[]))
    confidence: float = 0.5
    status: HypothesisStatus = HypothesisStatus.PROPOSED
    label: str = "Research hypothesis -- not an established fact"

    # Legacy compatibility attributes
    subject_id: str = ""
    target_id: str = ""
    predicate: Any = None
    score: float = 0.0
    rationale: str = ""
    evidence_ids: list[str] = Field(default_factory=list)
    metadata: dict[str, Any] = Field(default_factory=dict)

    @model_validator(mode="before")
    @classmethod
    def _normalize_hyp(cls, data: Any) -> Any:
        if isinstance(data, dict):
            if "statement" not in data and "rationale" in data:
                data["statement"] = data["rationale"]
            if "rationale" not in data and "statement" in data:
                data["rationale"] = data["statement"]
            if "status" in data:
                s = data["status"]
                if hasattr(s, "value"):
                    data["status"] = s.value
                elif isinstance(s, str):
                    s_lower = s.lower()
                    for st in HypothesisStatus:
                        if st.value.lower() == s_lower or st.name.lower() == s_lower:
                            data["status"] = st.value
                            break
            if "score" in data and "confidence" not in data:
                data["confidence"] = data["score"]
            elif "confidence" in data and "score" not in data:
                data["score"] = data["confidence"]
        return data

    @model_validator(mode="after")
    def _sync_hyp(self) -> Hypothesis:
        if not self.score and self.confidence:
            self.score = self.confidence
        elif not self.confidence and self.score:
            self.confidence = self.score
        if not self.statement and self.rationale:
            self.statement = self.rationale
        elif not self.rationale and self.statement:
            self.rationale = self.statement
        if self.supporting_path and hasattr(self.supporting_path, "node_ids") and len(self.supporting_path.node_ids) >= 2:
            if not self.subject_id:
                self.subject_id = self.supporting_path.node_ids[0]
            if not self.target_id:
                self.target_id = self.supporting_path.node_ids[-1]
        return self
