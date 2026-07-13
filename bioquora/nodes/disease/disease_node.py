"""
BIOQUORA - Disease Node Framework
Implements Module 3 for Step 4 Stage 4 (BioNodes v1.0).
Specialized node schema for diseases, syndromes, and clinical conditions.
"""

from typing import List, Optional
from pydantic import Field
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class DiseaseGraphNode(UniversalBiomedicalNode):
    entity_type: str = "DISEASE"
    mondo_id: Optional[str] = None
    doid_id: Optional[str] = None
    icd_code: Optional[str] = None
    snomed_id: Optional[str] = None
    mesh_id: Optional[str] = None
    disease_category: str = "GENERAL_DISEASE"
    symptoms: List[str] = Field(default_factory=list)
    prevalence: Optional[str] = None
    severity: Optional[str] = None
