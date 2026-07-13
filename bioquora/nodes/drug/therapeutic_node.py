"""
BIOQUORA - Therapeutic Node Framework
Implements Module 5 for Step 4 Stage 4 (BioNodes v1.0).
Specialized node schema for Drug, Chemical, Biologic, and Compound entities.
"""

from typing import Optional
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class TherapeuticGraphNode(UniversalBiomedicalNode):
    entity_type: str = "DRUG"
    drugbank_id: Optional[str] = None
    chebi_id: Optional[str] = None
    atc_code: Optional[str] = None
    mechanism_of_action: Optional[str] = None
    approval_status: str = "APPROVED"
    molecular_formula: Optional[str] = None
