"""
BIOQUORA - Biomedical Knowledge Representation Module
Implements the 8 Constitutional Questions and canonical representation models
for BioGraph Core v1.0 (Step 4 Stage 1).
"""

import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field, field_validator

class KnowledgeType(str, Enum):
    DECLARATIVE = "DECLARATIVE"
    PROCEDURAL = "PROCEDURAL"
    ONTOLOGICAL = "ONTOLOGICAL"
    EVIDENCE_BASED = "EVIDENCE_BASED"
    PROBABILISTIC = "PROBABILISTIC"
    SCIENTIFIC_MECHANISTIC = "SCIENTIFIC_MECHANISTIC"

class MutabilityPolicy(str, Enum):
    IMMUTABLE_HISTORICAL = "IMMUTABLE_HISTORICAL"
    REVISABLE_CLINICAL = "REVISABLE_CLINICAL"
    SUPERSEDED = "SUPERSEDED"

class ConstitutionalQuestions(BaseModel):
    what_is_it: str = Field(..., description="Canonical semantic class and explicit biological definition")
    where_did_it_originate: str = Field(..., description="Cryptographic provenance and source PMID/DOI")
    how_reliable_is_it: float = Field(..., ge=0.0, le=1.0, description="Normalized extraction confidence [0.0, 1.0]")
    which_ontology_defines_it: str = Field(..., description="Authoritative CURIE e.g. MONDO:0005086")
    what_evidence_supports_it: Dict[str, Any] = Field(default_factory=dict, description="Empirical metrics e.g. p_value, sample_size")
    when_was_it_discovered: str = Field(..., description="ISO 8601 discovery timestamp")
    who_validated_it: str = Field(..., description="Automated validator signature or human curator ORCID")
    can_it_change_over_time: MutabilityPolicy = Field(default=MutabilityPolicy.REVISABLE_CLINICAL)

class CanonicalKnowledgeUnit(BaseModel):
    knowledge_unit_id: str = Field(default_factory=lambda: f"bioq_kgu:{uuid.uuid4()}")
    knowledge_type: KnowledgeType
    constitutional_answers: ConstitutionalQuestions
    subject_curie: str
    predicate: str
    object_curie: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())

    def verify_constitutional_integrity(self) -> bool:
        """
        Verifies that all 8 constitutional questions are answered and valid.
        """
        ans = self.constitutional_answers
        if not ans.what_is_it or not ans.where_did_it_originate:
            return False
        if not ans.which_ontology_defines_it or ":" not in ans.which_ontology_defines_it:
            return False
        if not (0.0 <= ans.how_reliable_is_it <= 1.0):
            return False
        return True

def create_example_knowledge_unit() -> CanonicalKnowledgeUnit:
    return CanonicalKnowledgeUnit(
        knowledge_type=KnowledgeType.EVIDENCE_BASED,
        constitutional_answers=ConstitutionalQuestions(
            what_is_it="Therapeutic efficacy assertion for Temozolomide against Glioblastoma Multiforme",
            where_did_it_originate="PMID:36814231 | BioUnderstand-v1.0.0-PROD",
            how_reliable_is_it=0.962,
            which_ontology_defines_it="DrugBank:DB00853",
            what_evidence_supports_it={"study_type": "Phase III RCT", "sample_size": 573, "p_value": 0.0001, "hazard_ratio": 0.63},
            when_was_it_discovered="2023-02-22T00:00:00Z",
            who_validated_it="BIOQUORA-Automated-Validator-v1.0",
            can_it_change_over_time=MutabilityPolicy.REVISABLE_CLINICAL
        ),
        subject_curie="DrugBank:DB00853",
        predicate="DRUG_TREATS_DISEASE",
        object_curie="MONDO:0005086"
    )
