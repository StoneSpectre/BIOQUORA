"""
BIOQUORA - Canonical Node & Edge Taxonomy
Implements Module 4 (Knowledge Modeling Framework) for BioGraph Core v1.0.
Defines all 16 Node Categories and canonical Edge Predicates.
"""

from enum import Enum
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class NodeCategory(str, Enum):
    DISEASE = "Disease"
    DRUG = "Drug"
    GENE = "Gene"
    PROTEIN = "Protein"
    VARIANT = "Variant"
    PATHWAY = "Pathway"
    CELL = "Cell"
    PHENOTYPE = "Phenotype"
    PUBLICATION = "Publication"
    CLINICAL_TRIAL = "ClinicalTrial"
    DATASET = "Dataset"
    AUTHOR = "Author"
    INSTITUTION = "Institution"
    BIOMARKER = "Biomarker"
    CHEMICAL = "Chemical"
    ORGANISM = "Organism"

class EdgePredicate(str, Enum):
    DRUG_TREATS_DISEASE = "DRUG_TREATS_DISEASE"
    DRUG_CONTRAINDICATES_DISEASE = "DRUG_CONTRAINDICATES_DISEASE"
    DRUG_TARGETS_PROTEIN = "DRUG_TARGETS_PROTEIN"
    GENE_ASSOCIATED_WITH_DISEASE = "GENE_ASSOCIATED_WITH_DISEASE"
    GENE_ENCODES_PROTEIN = "GENE_ENCODES_PROTEIN"
    PROTEIN_INTERACTS_WITH_PROTEIN = "PROTEIN_INTERACTS_WITH_PROTEIN"
    PROTEIN_PARTICIPATES_IN_PATHWAY = "PROTEIN_PARTICIPATES_IN_PATHWAY"
    VARIANT_AFFECTS_GENE = "VARIANT_AFFECTS_GENE"
    VARIANT_ASSOCIATED_WITH_PHENOTYPE = "VARIANT_ASSOCIATED_WITH_PHENOTYPE"
    BIOMARKER_INDICATES_DISEASE = "BIOMARKER_INDICATES_DISEASE"
    DISEASE_HAS_PHENOTYPE = "DISEASE_HAS_PHENOTYPE"
    PUBLICATION_EVIDENCES_ASSERTION = "PUBLICATION_EVIDENCES_ASSERTION"
    CLINICAL_TRIAL_EVALUATES_DRUG = "CLINICAL_TRIAL_EVALUATES_DRUG"
    AUTHOR_AFFILIATED_WITH_INSTITUTION = "AUTHOR_AFFILIATED_WITH_INSTITUTION"

class NodeMetadataEnvelope(BaseModel):
    bioq_id: str
    preferred_id: str
    category: NodeCategory
    name: str
    namespace: str
    aliases: List[str] = Field(default_factory=list)
    external_ids: Dict[str, str] = Field(default_factory=dict)
    status: str = "ACTIVE"
    created_at: str
    updated_at: str
    version: str = "1.0"

class EdgeEvidenceEnvelope(BaseModel):
    pmid: Optional[str] = None
    doi: Optional[str] = None
    confidence: float = Field(..., ge=0.0, le=1.0)
    p_value: Optional[float] = None
    sample_size: Optional[int] = None
    study_type: str = "Empirical"
    extraction_pipeline: str = "BioUnderstand-v1.0.0-PROD"

class GraphEdgeSpecification(BaseModel):
    edge_id: str
    source_bioq_id: str
    predicate: EdgePredicate
    target_bioq_id: str
    evidence: EdgeEvidenceEnvelope

CANONICAL_NODE_TAXONOMY: Dict[NodeCategory, Dict[str, Any]] = {
    NodeCategory.DISEASE: {"primary_ontology": "MONDO", "example_curie": "MONDO:0005086", "description": "Human disease or syndrome"},
    NodeCategory.DRUG: {"primary_ontology": "DrugBank", "example_curie": "DrugBank:DB00853", "description": "Approved or investigational therapeutic entity"},
    NodeCategory.GENE: {"primary_ontology": "HGNC", "example_curie": "HGNC:3236", "description": "Human genome gene locus"},
    NodeCategory.PROTEIN: {"primary_ontology": "UniProt", "example_curie": "UniProt:P00533", "description": "Translational protein product"},
    NodeCategory.VARIANT: {"primary_ontology": "dbSNP", "example_curie": "dbSNP:rs121913529", "description": "Genomic sequence variant or SNP"},
    NodeCategory.PATHWAY: {"primary_ontology": "Reactome", "example_curie": "Reactome:R-HSA-162582", "description": "Signaling or metabolic pathway"},
    NodeCategory.CELL: {"primary_ontology": "CL", "example_curie": "CL:0000057", "description": "Cell type or tissue lineage"},
    NodeCategory.PHENOTYPE: {"primary_ontology": "HP", "example_curie": "HP:0002011", "description": "Human phenotypic abnormality"},
    NodeCategory.PUBLICATION: {"primary_ontology": "PMID", "example_curie": "PMID:36814231", "description": "Scientific literature document"},
    NodeCategory.CLINICAL_TRIAL: {"primary_ontology": "NCT", "example_curie": "NCT00006390", "description": "Clinical trial registry entry"},
    NodeCategory.DATASET: {"primary_ontology": "GEO", "example_curie": "GSE12345", "description": "Genomic or experimental dataset"},
    NodeCategory.AUTHOR: {"primary_ontology": "ORCID", "example_curie": "ORCID:0000-0002-1825-0097", "description": "Scientific investigator or researcher"},
    NodeCategory.INSTITUTION: {"primary_ontology": "ROR", "example_curie": "ROR:04xm1d337", "description": "Academic or research institution"},
    NodeCategory.BIOMARKER: {"primary_ontology": "BIOQ", "example_curie": "BIOQ:BM-001", "description": "Diagnostic or prognostic biomarker"},
    NodeCategory.CHEMICAL: {"primary_ontology": "ChEBI", "example_curie": "CHEBI:49637", "description": "Small molecule or metabolite"},
    NodeCategory.ORGANISM: {"primary_ontology": "NCBITaxon", "example_curie": "NCBITaxon:9606", "description": "Biological species or strain"}
}
