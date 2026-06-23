from pydantic import BaseModel, Field
from typing import Literal
from uuid import UUID
from datetime import datetime

class InteractionEvent(BaseModel):
    paper_id: UUID
    event_type: Literal["read", "dwell", "share", "save", "cite", "downvote"]
    metadata: dict | None = None

class PaperRecRequest(BaseModel):
    user_id: UUID
    seed_paper_ids: list[UUID] = Field(default_factory=list)
    seed_query: str | None = None
    limit: int = Field(default=20, le=100)
    evidence_filter: list[str] | None = None
    recency_weight: float = Field(default=0.3, ge=0.0, le=1.0)
    maturity: Literal["new", "active", "senior"] = "active"
    diversity: bool = True
    explain: bool = True

class DatasetRecRequest(BaseModel):
    user_id: UUID
    research_context: str
    entity_ids: list[str] = Field(default_factory=list)
    data_types: list[Literal["genomic", "clinical", "imaging", "omics"]] | None = None
    min_sample_size: int | None = None
    license_filter: list[str] | None = None
    limit: int = 10

class TopicRecRequest(BaseModel):
    user_id: UUID
    limit: int = 10
    horizon_months: int = Field(default=24)

class PaperRecommendation(BaseModel):
    paper_id: UUID
    title: str
    authors: list[str]
    year: int
    doi: str | None
    abstract_snippet: str
    final_score: float
    content_score: float
    collab_score: float
    graph_score: float
    rrf_score: float
    confidence: float
    evidence_tier: str
    explanation: dict
    source_signals: list[str]

class DatasetRecommendation(BaseModel):
    dataset_id: str
    name: str
    repository: str
    description: str
    sample_size: int | None
    data_type: str
    diseases: list[str]
    genes: list[str]
    last_updated: datetime | None
    quality_score: float
    relevance_score: float
    citation_count: int
    license: str
    bundle_companions: list[str]
    explanation: str

class TopicRecommendation(BaseModel):
    topic_id: str
    label: str
    citation_velocity: float
    gap_score: float
    alignment_score: float
    funding_signal: float
    composite_score: float
    key_papers: list[str]
    key_researchers: list[str]
    open_questions: list[str]
    explanation: str
