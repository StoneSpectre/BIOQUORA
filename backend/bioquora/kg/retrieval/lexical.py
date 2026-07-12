"""Part 6 §7.8 — Lexical Search Layer. High precision, exact-terminology
retrieval via BM25 (rank_bm25 stands in for Elasticsearch/OpenSearch)."""

from __future__ import annotations

import math
import re
from typing import Any

from rank_bm25 import BM25Okapi


def _tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


class _LuceneBM25Okapi(BM25Okapi):
    """Elasticsearch/OpenSearch compatible BM25Okapi idf formula per §7.8."""
    def _calc_idf(self, nd: dict) -> None:
        for word, freq in nd.items():
            self.idf[word] = math.log(1.0 + (self.corpus_size - freq + 0.5) / (freq + 0.5))


class LexicalIndex:
    def __init__(self, **kwargs: Any):
        self.ids: list[str] = []
        self._bm25: BM25Okapi | None = None

    @staticmethod
    def _tokenize(text: str) -> list[str]:
        return _tokenize(text)

    def build(self, id_to_text: dict[str, str]) -> None:
        self.ids = list(id_to_text.keys())
        if not self.ids:
            self._bm25 = None
            return
        corpus = [_tokenize(id_to_text[i]) for i in self.ids]
        self._bm25 = _LuceneBM25Okapi(corpus)

    def search(self, query: str, top_k: int = 25) -> list[tuple[str, float]]:
        if self._bm25 is None or not self.ids:
            return []
        scores = self._bm25.get_scores(_tokenize(query))
        ranked = sorted(zip(self.ids, scores), key=lambda x: -x[1])
        # normalize to 0..1 for fair blending with other signals
        max_score = max((s for _, s in ranked), default=0.0) or 1.0
        return [(i, float(s / max_score)) for i, s in ranked[:top_k] if s > 0]
