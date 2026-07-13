"""
BIOQUORA - Biomedical Entity Taxonomy
Implements Module 2 for Step 4 Stage 4 (BioNodes v1.0).
Defines the complete entity classification hierarchy for all nodes in BioGraph.
"""

from enum import Enum
from typing import List, Dict, Set

class BiomedicalNodeClass(str, Enum):
    BIOMEDICAL_ENTITY = "BIOMEDICAL_ENTITY"
    LIVING_SYSTEM = "LIVING_SYSTEM"
    DISEASE = "DISEASE"
    DRUG = "DRUG"
    GENE = "GENE"
    PROTEIN = "PROTEIN"
    CHEMICAL = "CHEMICAL"
    VARIANT = "VARIANT"
    PHENOTYPE = "PHENOTYPE"
    PATHWAY = "PATHWAY"
    BIOLOGICAL_PROCESS = "BIOLOGICAL_PROCESS"
    CLINICAL_ENTITY = "CLINICAL_ENTITY"
    RESEARCH_ENTITY = "RESEARCH_ENTITY"
    PUBLICATION = "PUBLICATION"
    DATASET = "DATASET"
    INSTITUTION = "INSTITUTION"
    RESEARCHER = "RESEARCHER"
    PROTOCOL = "PROTOCOL"

TAXONOMY_HIERARCHY: Dict[BiomedicalNodeClass, BiomedicalNodeClass] = {
    BiomedicalNodeClass.LIVING_SYSTEM: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.DISEASE: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.DRUG: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.GENE: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.PROTEIN: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.CHEMICAL: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.VARIANT: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.PHENOTYPE: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.PATHWAY: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.BIOLOGICAL_PROCESS: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.CLINICAL_ENTITY: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.RESEARCH_ENTITY: BiomedicalNodeClass.BIOMEDICAL_ENTITY,
    BiomedicalNodeClass.PUBLICATION: BiomedicalNodeClass.RESEARCH_ENTITY,
    BiomedicalNodeClass.DATASET: BiomedicalNodeClass.RESEARCH_ENTITY,
    BiomedicalNodeClass.INSTITUTION: BiomedicalNodeClass.RESEARCH_ENTITY,
    BiomedicalNodeClass.RESEARCHER: BiomedicalNodeClass.RESEARCH_ENTITY,
    BiomedicalNodeClass.PROTOCOL: BiomedicalNodeClass.RESEARCH_ENTITY
}

class BioGraphTaxonomyEngine:
    @staticmethod
    def get_lineage(node_class: BiomedicalNodeClass) -> List[BiomedicalNodeClass]:
        lineage = [node_class]
        curr = node_class
        while curr in TAXONOMY_HIERARCHY:
            parent = TAXONOMY_HIERARCHY[curr]
            lineage.append(parent)
            curr = parent
        return lineage
