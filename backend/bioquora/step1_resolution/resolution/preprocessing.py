"""
Bioquora Entity Resolution — Stage 1: Preprocessing
=====================================================
Ch.5 §5.4 "Normalize everything before comparison."
    * Unicode normalization
    * Case folding
    * Whitespace cleanup
    * Punctuation handling
    * Greek letter normalization
    * HTML removal
    * Encoding normalization
    * Scientific notation cleanup
"""

from __future__ import annotations
import re
import unicodedata

_GREEK_MAP = {
    "α": "alpha", "β": "beta", "γ": "gamma", "δ": "delta", "ε": "epsilon",
    "ζ": "zeta", "η": "eta", "θ": "theta", "κ": "kappa", "λ": "lambda",
    "μ": "mu", "ν": "nu", "ξ": "xi", "π": "pi", "ρ": "rho", "σ": "sigma",
    "τ": "tau", "φ": "phi", "χ": "chi", "ψ": "psi", "ω": "omega",
}

_HTML_TAG_RE = re.compile(r"<[^>]+>")
_WS_RE = re.compile(r"\s+")
_SCI_NOTATION_RE = re.compile(r"(\d)\s*[xX×]\s*10\s*\^?\s*-?\s*(\d+)")


def strip_html(text: str) -> str:
    if not text:
        return ""
    return _HTML_TAG_RE.sub(" ", text)


def normalize_greek(text: str) -> str:
    if not text:
        return ""
    for greek, latin in _GREEK_MAP.items():
        text = text.replace(greek, f"-{latin}-")
    return text


def normalize_punctuation(text: str) -> str:
    if not text:
        return ""
    # unify hyphen/underscore variants to a single space-hyphen convention
    text = text.replace("_", "-")
    text = re.sub(r"[\u2010-\u2015]", "-", text)  # unicode dash variants -> "-"
    text = re.sub(r"[^\w\s\-\.\+]", " ", text)
    return text


def normalize_whitespace(text: str) -> str:
    if not text:
        return ""
    return _WS_RE.sub(" ", text).strip()


def normalize_scientific_notation(text: str) -> str:
    if not text:
        return ""
    return _SCI_NOTATION_RE.sub(lambda m: f"{m.group(1)}e-{m.group(2)}", text)


def normalize_text(text: str, *, title_case: bool = False) -> str:
    """Full Stage-1 normalization pipeline (Ch.5 §5.4)."""
    if not text:
        return ""
    text = unicodedata.normalize("NFKC", text)
    text = strip_html(text)
    text = normalize_greek(text)
    text = normalize_scientific_notation(text)
    text = normalize_punctuation(text)
    text = normalize_whitespace(text)
    if title_case:
        # gentle title-casing that doesn't mangle acronyms (all-caps tokens
        # are left alone, e.g. "HER2", "BRCA1")
        text = " ".join(w if w.isupper() else w.capitalize() for w in text.split(" "))
    return text


def strip_formatting_variants(text: str) -> str:
    """
    Chapter 3 Stage 2: Remove Formatting Variants.
    Removes common formatting variants (Greek letters, Roman numerals, generic suffixes).
    """
    if not text:
        return ""
    norm = normalize_text(text)
    norm = re.sub(r"\b(alpha|beta|gamma|delta|epsilon|kappa|lambda|sigma|tau|omega)\b", "", norm)
    norm = re.sub(r"\b(type|grade|stage|class|group|deficiency|syndrome|disease|disorder)\b", "", norm)
    return normalize_whitespace(norm)


def fold_for_matching(text: str) -> str:
    """Aggressive normalization used purely as a matching key — case folded,
    punctuation-stripped, whitespace-collapsed. Not for display."""
    if not text:
        return ""
    t = normalize_text(text)
    return normalize_whitespace(t.lower().replace("-", " "))
