"""
schemas/research_events.py
Pydantic v2 schemas for Step 8 event tracking.
"""
from __future__ import annotations
from datetime import datetime
from typing import Any, Literal, Optional
from uuid import UUID

from pydantic import BaseModel, Field


EventType = Literal[
    "search",
    "paper_view",
    "paper_saved",
    "paper_removed",
    "collection_created",
    "collection_view",
    "review_generated",
    "time_on_paper",
    "note_created",
    "note_updated",
    "comment_added",
    "paper_assigned",
]


class TrackEventRequest(BaseModel):
    """Posted by the frontend to /events/track"""
    event_type: EventType
    entity_type: Optional[str] = None
    entity_id: Optional[UUID] = None
    project_id: Optional[UUID] = None
    session_id: Optional[str] = Field(None, max_length=64)
    metadata: dict[str, Any] = {}


class TrackEventResponse(BaseModel):
    recorded: bool
    event_id: UUID


# ── Analytics response models ─────────────────────────────────────────────────

class TopicStat(BaseModel):
    topic: str
    search_count: int
    view_count: int
    save_count: int
    period_date: datetime


class PaperStat(BaseModel):
    pmid: str
    view_count: int
    save_count: int
    review_count: int
    avg_time_on_paper_seconds: Optional[int] = None
    period_date: datetime


class TrendStat(BaseModel):
    topic: str
    velocity_score: float
    baseline_count: Optional[int] = None
    recent_count: Optional[int] = None
    period_date: datetime


class AnalyticsDashboard(BaseModel):
    popular_topics: list[TopicStat]
    popular_papers: list[PaperStat]
    emerging_topics: list[TrendStat]
    generated_at: datetime


# ── Co-Save recommendation ────────────────────────────────────────────────────

class RelatedPaper(BaseModel):
    pmid: str
    co_save_count: int
    title: Optional[str] = None


class CoSaveRecommendations(BaseModel):
    source_pmid: str
    related: list[RelatedPaper]
