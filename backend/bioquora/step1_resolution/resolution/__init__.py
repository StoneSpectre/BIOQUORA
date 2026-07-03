"""
Bioquora Entity Resolution Package
==================================
Modular implementation of Chapter 3 & Chapter 5 resolution stages.
"""

from .preprocessing import (
    strip_html,
    normalize_greek,
    normalize_punctuation,
    normalize_whitespace,
    normalize_scientific_notation,
    normalize_text,
    strip_formatting_variants,
    fold_for_matching,
)
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
    "strip_html",
    "normalize_greek",
    "normalize_punctuation",
    "normalize_whitespace",
    "normalize_scientific_notation",
    "normalize_text",
    "strip_formatting_variants",
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
