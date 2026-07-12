"""
8.18 Temporal Reasoning -- knowledge evolves; Bioquora must be able to
answer "what was known as of date X?" and support historical reproducibility.
"""

from __future__ import annotations

from datetime import date
from .graph import KnowledgeGraph
from .models import GraphEdge


def snapshot_as_of(kg: KnowledgeGraph, as_of: date) -> list[GraphEdge]:
    """Return the set of edges that were known (discovered and not yet
    deprecated) as of a given date."""
    return [
        e for e in kg.edges.values()
        if e.discovered_date and e.discovered_date <= as_of and not e.deprecated
    ]


def timeline(kg: KnowledgeGraph, subject_id: str, object_id: str) -> list[GraphEdge]:
    """All historical edges between two entities, ordered by discovery date
    -- lets a user see how the evidence base for a relationship evolved."""
    matches = [
        e for e in kg.edges.values()
        if ((e.subject_id == subject_id and e.object_id == object_id) or (e.subject_id == object_id and e.object_id == subject_id)) and e.discovered_date
    ]
    return sorted(matches, key=lambda e: e.discovered_date)
