"""
Universal Schemas for Bioquora Biomedical NLP & Knowledge Extraction Engine (BioUnderstand).
Defines Entity Records (26 classes), Ontology Links (15 ontologies), Relations, Events, Evidence, and Knowledge Objects.
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field


BiomedicalEntityType = Literal[
    "DISEASE", "DRUG", "GENE", "PROTEIN", "VARIANT", "MUTATION", "CHEMICAL",
    "BIOLOGICAL_PROCESS", "PATHWAY", "CELL", "TISSUE", "ORGAN", "SPECIES",
    "MICROORGANISM", "VIRUS", "BIOMARKER", "CLINICAL_FINDING", "SYMPTOM",
    "PROCEDURE", "DIAGNOSTIC_TEST", "PHENOTYPE", "LABORATORY_MEASUREMENT",
    "ANATOMY", "MEDICAL_DEVICE", "CLINICAL_TRIAL", "RESEARCH_METHOD"
]

CanonicalOntologyType = Literal[
    "UMLS", "MESH", "HGNC", "UNIPROT", "MONDO", "SNOMED_CT", "DRUGBANK",
    "CHEBI", "NCBI_GENE", "ENSEMBL", "GO", "REACTOME", "HPO", "ICD_10", "ICD_11"
]

BiomedicalRelationType = Literal[
    "GENE_CAUSES_DISEASE", "DRUG_TREATS_DISEASE", "DRUG_INHIBITS_PROTEIN",
    "PROTEIN_ACTIVATES_GENE", "PROTEIN_BINDS_PROTEIN", "DISEASE_AFFECTS_ORGAN",
    "GENE_EXPRESSED_IN_CELL", "MUTATION_ASSOCIATED_WITH_DISEASE",
    "CHEMICAL_INTERACTS_WITH_PROTEIN", "BIOMARKER_PREDICTS_DISEASE",
    "PATHWAY_REGULATES_GENE", "ASSOCIATED_WITH"
]

BiomedicalEventType = Literal[
    "GENE_EXPRESSION", "MUTATION", "BINDING", "PHOSPHORYLATION", "ACTIVATION",
    "INHIBITION", "SUPPRESSION", "CLINICAL_TRIAL", "DRUG_ADMINISTRATION",
    "ADVERSE_EVENT", "DIAGNOSIS", "TREATMENT", "DISEASE_PROGRESSION",
    "CELL_DIFFERENTIATION", "IMMUNE_RESPONSE"
]

CertaintyLabel = Literal["CONFIRMED", "NEGATIVE", "SPECULATIVE", "CONTRADICTORY"]

StudyDesignType = Literal[
    "EXPERIMENTAL", "CLINICAL_TRIAL", "RCT", "META_ANALYSIS", "REVIEW",
    "IN_VITRO", "IN_VIVO", "COMPUTATIONAL", "OBSERVATIONAL", "CASE_STUDY"
]


class BiomedicalEntityRecord(BaseModel):
    entity_id: str = Field(default_factory=lambda: f"ent:{uuid.uuid4()}")
    text: str
    entity_type: BiomedicalEntityType
    start_char: int = 0
    end_char: int = 0
    confidence: float = 0.95
    canonical_id: Optional[str] = None
    ontology_name: Optional[CanonicalOntologyType] = None


class EvidenceRecord(BaseModel):
    evidence_id: str = Field(default_factory=lambda: f"ev:{uuid.uuid4()}")
    study_design: StudyDesignType = "EXPERIMENTAL"
    sample_size: Optional[int] = None
    p_value: Optional[str] = None
    confidence_interval: Optional[str] = None
    sentence_text: str


class BiomedicalRelationRecord(BaseModel):
    relation_id: str = Field(default_factory=lambda: f"rel:{uuid.uuid4()}")
    subject_entity: BiomedicalEntityRecord
    predicate: BiomedicalRelationType
    object_entity: BiomedicalEntityRecord
    direction: str = "FORWARD"
    confidence: float = 0.92
    evidence: Optional[EvidenceRecord] = None
    sentence_text: str


class BiomedicalEventRecord(BaseModel):
    event_id: str = Field(default_factory=lambda: f"evt:{uuid.uuid4()}")
    event_type: BiomedicalEventType
    trigger_text: str
    participants: List[BiomedicalEntityRecord] = Field(default_factory=list)
    confidence: float = 0.88


class BiomedicalKnowledgeObject(BaseModel):
    """
    Canonical Bioquora Biomedical Knowledge Object (BKO).
    Direct graph-ready input for Step 4 (Biomedical Knowledge Graph).
    """
    knowledge_id: str = Field(default_factory=lambda: f"bko:{uuid.uuid4()}")
    subject_entity: BiomedicalEntityRecord
    relationship: BiomedicalRelationType
    object_entity: BiomedicalEntityRecord
    event: Optional[BiomedicalEventRecord] = None
    evidence: Optional[EvidenceRecord] = None
    citation: Optional[str] = None
    ontology_mappings: Dict[str, str] = Field(default_factory=dict)
    certainty: CertaintyLabel = "CONFIRMED"
    confidence: float = Field(0.95, ge=0.0, le=1.0)
    paper_id: str
    section_id: str = "sec-default"
    sentence_text: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    provenance: Dict[str, Any] = Field(default_factory=dict)
