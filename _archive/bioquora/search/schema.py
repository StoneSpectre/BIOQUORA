"""
Universal Schemas for Bioquora Step 3 Stage 4 Literature Intelligence & Biomedical Search Platform (BioSearch).
Defines Queries, Results, GraphRAG Context, QA Responses, Citation Metrics, and Evaluation Reports.
"""

import uuid
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field
from bioquora.bionlp.schema import BiomedicalKnowledgeObject, EvidenceRecord


SearchModeType = Literal[
    "KEYWORD", "CONCEPT", "QUESTION", "DISEASE", "DRUG", "GENE",
    "PROTEIN", "CLINICAL_TRIAL", "AUTHOR", "JOURNAL"
]


class BiomedicalSearchQuery(BaseModel):
    query_id: str = Field(default_factory=lambda: f"qry:{uuid.uuid4()}")
    raw_query: str
    search_mode: SearchModeType = "CONCEPT"
    filters: Dict[str, Any] = Field(default_factory=dict)
    top_k: int = 10


class BiomedicalSearchResult(BaseModel):
    result_id: str = Field(default_factory=lambda: f"res:{uuid.uuid4()}")
    knowledge_object: BiomedicalKnowledgeObject
    paper_id: str
    snippet: str
    lexical_score: float = 0.0
    semantic_score: float = 0.0
    combined_score: float = 0.0
    rerank_score: float = 0.0
    evidence: Optional[EvidenceRecord] = None


class GraphRAGContext(BaseModel):
    context_id: str = Field(default_factory=lambda: f"ctx:{uuid.uuid4()}")
    query: str
    retrieved_triples: List[Dict[str, str]] = Field(default_factory=list)
    supporting_papers: List[str] = Field(default_factory=list)
    evidence_summary: str
    grounding_confidence: float = 0.96


class BiomedicalQAResponse(BaseModel):
    answer_text: str
    confidence: float = 0.95
    supporting_evidence: List[str] = Field(default_factory=list)
    citations: List[str] = Field(default_factory=list)
    graph_paths: List[str] = Field(default_factory=list)


class CitationMetricsRecord(BaseModel):
    paper_id: str
    citation_count: int = 42
    influence_score: float = 0.89
    evidence_score: float = 0.94
    impact_trend: str = "RISING"


class Stage4ExitReport(BaseModel):
    total_queries_evaluated: int
    precision_at_10: float
    recall_at_10: float
    average_latency_ms: float
    grounding_accuracy: float
    meets_stage4_exit_criteria: bool
