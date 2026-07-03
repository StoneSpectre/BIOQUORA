"""
Bioquora Entity Resolution Package
==================================
Modular implementation of Chapter 3 & Chapter 5 resolution stages.
"""

from .preprocessing import fold_for_matching
from .stages import (
    match_by_identifier,
    match_by_ontology,
    match_by_synonym,
    apply_context_disambiguation,
    match_by_similarity,
)
from .pipeline import EntityResolutionPipeline
from .ner import BiomedicalNER, DictionaryNER, DetectedSpan

__all__ = [
    "fold_for_matching",
    "match_by_identifier",
    "match_by_ontology",
    "match_by_synonym",
    "apply_context_disambiguation",
    "match_by_similarity",
    "EntityResolutionPipeline",
    "BiomedicalNER",
    "DictionaryNER",
    "DetectedSpan",
]
