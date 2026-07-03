"""
Bioquora Entity Resolution Pipeline — Backward Compatibility Wrapper
Re-exports the modular resolution pipeline and stages from `.resolution`.
"""

from .resolution import (
    fold_for_matching,
    match_by_identifier,
    match_by_ontology,
    match_by_synonym,
    apply_context_disambiguation,
    match_by_similarity,
    EntityResolutionPipeline,
)
from .resolution.pipeline import (
    ConflictError,
    ConfidenceBreakdown,
    ResolutionResult,
    SIGNAL_WEIGHTS,
    EVIDENCE_LEVEL_WEIGHT,
    SOURCE_AUTHORITY_TIER,
)
from .models import IncomingRecord

__all__ = [
    "fold_for_matching",
    "match_by_identifier",
    "match_by_ontology",
    "match_by_synonym",
    "apply_context_disambiguation",
    "match_by_similarity",
    "EntityResolutionPipeline",
    "ConflictError",
    "ConfidenceBreakdown",
    "ResolutionResult",
    "SIGNAL_WEIGHTS",
    "EVIDENCE_LEVEL_WEIGHT",
    "SOURCE_AUTHORITY_TIER",
    "IncomingRecord",
]
