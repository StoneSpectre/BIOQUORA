"""
Bioquora Entity Resolution — Preprocessing
==========================================
Text normalization, formatting variant removal, and folding for matching.
"""

from __future__ import annotations
import re


def normalize_text(text: str) -> str:
    """
    Chapter 3 Stage 1: Normalize Text.
    Case folding (lowercase), punctuation stripping, whitespace collapsing.
    """
    if not text:
        return ""
    cleaned = text.lower()
    # Strip common trademark/copyright symbols and noise
    cleaned = re.sub(r"[™®©•\*\#]", "", cleaned)
    # Replace punctuation and separation characters with space
    cleaned = re.sub(r"[\-_/,\(\)\.:;\[\]\{\}]", " ", cleaned)
    # Collapse multiple whitespaces
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def strip_formatting_variants(text: str) -> str:
    """
    Chapter 3 Stage 2: Remove Formatting Variants.
    Removes common formatting variants (Greek letters, Roman numerals, generic suffixes).
    """
    norm = normalize_text(text)
    # Remove common Greek letter spellings when looking for base concept matching
    norm = re.sub(r"\b(alpha|beta|gamma|delta|epsilon|kappa|lambda|sigma|tau|omega)\b", "", norm)
    # Remove generic biomedical classifiers/suffixes
    norm = re.sub(r"\b(type|grade|stage|class|group|deficiency|syndrome|disease|disorder)\b", "", norm)
    norm = re.sub(r"\s+", " ", norm).strip()
    return norm


def fold_for_matching(text: str) -> str:
    """
    Standard text folding for candidate identifier lookup, synonym matching,
    and text similarity comparisons.
    """
    return normalize_text(text)
