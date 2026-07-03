"""
Bioquora Entity Resolution — Stages 3-6
==========================================
Ch.5 §5.6 Identifier Matching       (confidence 1.00, highest priority)
Ch.5 §5.7 Ontology Matching
Ch.5 §5.8 Synonym Resolution        (weighted by SynonymType)
Ch.5 §5.9 Contextual Semantic Matching (disambiguation, e.g. EGFR gene vs protein)
Ch.5 §5.19 Semantic Similarity Engine (text / embedding similarity fallback)

Ch.5 §5.6 "Identifier Priority": Official Identifier > Ontology Identifier
> Cross Reference > External Mapping > Text Similarity. This ordering is
implemented directly as the stage order in resolution/pipeline.py.
"""

from __future__ import annotations

try:
    from rapidfuzz import fuzz
except ImportError:
    import difflib
    class _FuzzFallback:
        @staticmethod
        def token_sort_ratio(a: str, b: str) -> float:
            tokens_a = " ".join(sorted(a.split()))
            tokens_b = " ".join(sorted(b.split()))
            return difflib.SequenceMatcher(None, tokens_a, tokens_b).ratio() * 100.0
    fuzz = _FuzzFallback()

from ..models import IncomingRecord, SynonymType
from .preprocessing import fold_for_matching

# Ch.5 §5.8 — "Not all synonyms should be treated equally."
_SYNONYM_TYPE_WEIGHT = {
    SynonymType.PREFERRED: 1.00,
    SynonymType.EXACT: 0.95,
    SynonymType.INTERNATIONAL: 0.90,
    SynonymType.ABBREVIATION: 0.85,
    SynonymType.BROAD: 0.75,
    SynonymType.NARROW: 0.75,
    SynonymType.LAYPERSON: 0.70,
    SynonymType.RELATED: 0.60,
    SynonymType.HISTORICAL: 0.55,
}

# Ch.5 §5.9 — simple disambiguation cue lexicon: words in context that
# push a record toward one entity_type over another for polysemous labels
# like "EGFR" (gene vs protein vs drug target).
_CONTEXT_CUES = {
    "gene": ["mutation", "allele", "expression", "genotype", "locus", "variant"],
    "protein": ["binds", "receptor", "kinase activity", "phosphorylation", "domain"],
    "drug": ["dose", "administered", "treatment with", "mg", "therapy"],
}


def match_by_identifier(record: IncomingRecord, store) -> tuple[str | None, float]:
    """Ch.5 §5.6 — highest confidence step: exact native ID already known."""
    for ontology, native_id in record.native_ids.items():
        bq_id = store.find_by_native_id(ontology, native_id)
        if bq_id:
            return bq_id, 1.00
    return None, 0.0


def match_by_ontology(record: IncomingRecord, store) -> tuple[str | None, float]:
    """Ch.5 §5.7 — resolve via the ontology_concept_map (populated by the
    ontology integration pipeline) for any native id the record carries."""
    for ontology, native_id in record.native_ids.items():
        bq_id = store.resolve_ontology_concept(ontology, native_id)
        if bq_id:
            return bq_id, 0.98
    return None, 0.0


def match_by_synonym(record: IncomingRecord, store) -> tuple[str | None, float]:
    """Ch.5 §5.8 — exact synonym-graph lookup, weighted by synonym type."""
    norm = fold_for_matching(record.raw_label)
    candidates = store.find_by_synonym_text(norm)
    if not candidates:
        return None, 0.0
    # if multiple entities share this exact synonym text, that's itself a
    # signal of ambiguity -- pick the first but report low-ish confidence
    # unless there's exactly one.
    if len(candidates) == 1:
        return candidates[0], 0.90
    return candidates[0], 0.55  # ambiguous synonym across multiple entities


def apply_context_disambiguation(record: IncomingRecord, candidate_types: list[str]) -> str | None:
    """Ch.5 §5.9 — given a context sentence and multiple plausible entity
    types for an ambiguous label (e.g. 'EGFR'), pick the one whose cue
    words appear in the context."""
    ctx = (record.context or "").lower()
    if not ctx:
        return None
    scores = {}
    for etype in candidate_types:
        cues = _CONTEXT_CUES.get(etype.lower(), [])
        scores[etype] = sum(1 for cue in cues if cue in ctx)
    if not scores or max(scores.values()) == 0:
        return None
    return max(scores, key=scores.get)


def match_by_similarity(record: IncomingRecord, store, top_k: int = 5,
                         threshold: float = 0.55) -> list[tuple[str, float]]:
    """Ch.5 §5.19 Semantic Similarity Engine — text-similarity fallback
    (rapidfuzz token-set ratio, normalized to 0-1) over the full synonym
    index. Stands in for an embedding/vector-similarity search; swapping in
    a real embedding model only requires replacing the scoring function
    below, the pipeline contract stays the same."""
    norm_query = fold_for_matching(record.raw_label)
    scored: dict[str, float] = {}
    for bq_id, text, text_norm in store.all_synonym_index():
        score = fuzz.token_sort_ratio(norm_query, text_norm) / 100.0
        if score > scored.get(bq_id, 0.0):
            scored[bq_id] = score
    ranked = sorted(scored.items(), key=lambda kv: kv[1], reverse=True)
    return [(bq, s) for bq, s in ranked[:top_k] if s >= threshold]
