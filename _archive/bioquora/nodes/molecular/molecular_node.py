"""
BIOQUORA - Molecular Node Framework
Implements Module 4 for Step 4 Stage 4 (BioNodes v1.0).
Specialized node schema for Gene, Protein, Variant, RNA, Transcript, and Protein Complex entities.
"""

from typing import Optional, List
from pydantic import Field
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class MolecularGraphNode(UniversalBiomedicalNode):
    hgnc_id: Optional[str] = None
    uniprot_id: Optional[str] = None
    ensembl_id: Optional[str] = None
    sequence: Optional[str] = None
    organism: str = "Homo sapiens"
    chromosome_location: Optional[str] = None
    molecular_function: List[str] = Field(default_factory=list)
