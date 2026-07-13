"""
BIOQUORA - Research Knowledge Node Framework
Implements Module 7 for Step 4 Stage 4 (BioNodes v1.0).
Specialized node schema for Publication, Journal, Author, Institution, Dataset, and Clinical Trial entities.
"""

from typing import Optional, List
from pydantic import Field
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class ResearchKnowledgeGraphNode(UniversalBiomedicalNode):
    doi: Optional[str] = None
    pmid: Optional[str] = None
    pmcid: Optional[str] = None
    authors: List[str] = Field(default_factory=list)
    journal_name: Optional[str] = None
    publication_year: Optional[int] = None
