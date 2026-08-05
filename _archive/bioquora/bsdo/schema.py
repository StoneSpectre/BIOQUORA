"""
Module 10: Universal Bioquora Scientific Document Object (BSDO) Schema
The canonical structured representation of any biomedical scientific publication.
All downstream stages (Stage 3 Biomedical NLP & Knowledge Extraction) consume BSDO.
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field
from bioquora.metadata.schema import BiomedicalMetadataRecord


SectionType = Literal[
    "ABSTRACT", "INTRODUCTION", "METHODS", "RESULTS",
    "DISCUSSION", "CONCLUSION", "REFERENCES", "SUPPLEMENTARY", "OTHER"
]

FigureClassificationType = Literal[
    "MICROSCOPY_IMAGE", "PATHWAY_DIAGRAM", "HEATMAP", "FOREST_PLOT",
    "KAPLAN_MEIER_CURVE", "BAR_CHART", "SCATTER_PLOT", "FLOWCHART",
    "MOLECULAR_STRUCTURE", "GENERIC_FIGURE"
]


class ParagraphRecord(BaseModel):
    paragraph_id: str = Field(default_factory=lambda: f"para:{uuid.uuid4()}")
    section_id: str
    reading_order_index: int
    text: str
    detected_mentions: List[str] = Field(default_factory=list)


class SectionRecord(BaseModel):
    section_id: str = Field(default_factory=lambda: f"sec:{uuid.uuid4()}")
    section_title: str
    section_type: SectionType
    level: int = 1
    paragraphs: List[ParagraphRecord] = Field(default_factory=list)


class TableCellRecord(BaseModel):
    row_idx: int
    col_idx: int
    content: str
    is_header: bool = False


class TableRecord(BaseModel):
    table_id: str = Field(default_factory=lambda: f"table:{uuid.uuid4()}")
    caption: str
    headers: List[str] = Field(default_factory=list)
    rows: List[List[str]] = Field(default_factory=list)
    units_detected: List[str] = Field(default_factory=list)
    footnotes: List[str] = Field(default_factory=list)
    cells: List[TableCellRecord] = Field(default_factory=list)


class FigureRecord(BaseModel):
    figure_id: str = Field(default_factory=lambda: f"fig:{uuid.uuid4()}")
    figure_type: FigureClassificationType = "GENERIC_FIGURE"
    caption: str
    linked_section_ids: List[str] = Field(default_factory=list)
    mentioned_entities: List[str] = Field(default_factory=list)


class ParsedCitationRecord(BaseModel):
    ref_id: str = Field(default_factory=lambda: f"ref:{uuid.uuid4()}")
    raw_citation_text: str
    doi: Optional[str] = None
    pmid: Optional[str] = None
    pmcid: Optional[str] = None
    authors: List[str] = Field(default_factory=list)
    journal: Optional[str] = None
    year: Optional[int] = None
    is_resolved: bool = True


class SupplementaryItemRecord(BaseModel):
    item_id: str = Field(default_factory=lambda: f"supp:{uuid.uuid4()}")
    filename: str
    format_type: str
    description: str
    parent_paper_id: str


class LayoutBlockRecord(BaseModel):
    block_id: str
    semantic_label: str
    reading_order: int
    bounding_box: Optional[List[float]] = None


class LayoutGraphRecord(BaseModel):
    total_pages: int = 1
    reading_order_blocks: List[LayoutBlockRecord] = Field(default_factory=list)


class DocumentTreeNode(BaseModel):
    node_id: str
    title: str
    section_type: SectionType
    children: List["DocumentTreeNode"] = Field(default_factory=list)


class BioquoraScientificDocumentObject(BaseModel):
    """
    Universal Bioquora Scientific Document Object (BSDO).
    Unified machine-readable schema for any biomedical publication.
    """
    paper_id: str
    metadata: BiomedicalMetadataRecord
    sections: List[SectionRecord] = Field(default_factory=list)
    paragraphs: List[ParagraphRecord] = Field(default_factory=list)
    tables: List[TableRecord] = Field(default_factory=list)
    figures: List[FigureRecord] = Field(default_factory=list)
    references: List[ParsedCitationRecord] = Field(default_factory=list)
    citations: Dict[str, List[str]] = Field(default_factory=dict)
    supplementary: List[SupplementaryItemRecord] = Field(default_factory=list)
    layout: LayoutGraphRecord = Field(default_factory=LayoutGraphRecord)
    document_tree: Optional[DocumentTreeNode] = None
    provenance: Dict[str, Any] = Field(default_factory=dict)
    quality_score: float = Field(1.0, ge=0.0, le=1.0)
    parsed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
