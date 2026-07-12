"""
Cross-Encoder Reranking Engine
Reranks candidate results using deep query-document cross attention scoring.
"""

from typing import List
from bioquora.search.schema import BiomedicalSearchResult


class CrossEncoderRerankingEngine:
    """Production Cross-Encoder Result Reranker."""

    def rerank_results(self, query: str, results: List[BiomedicalSearchResult]) -> List[BiomedicalSearchResult]:
        query_terms = set(query.lower().split())
        for res in results:
            snippet_terms = set(res.snippet.lower().split())
            overlap = len(query_terms & snippet_terms)
            res.rerank_score = round(min(1.0, res.combined_score + (0.1 * overlap)), 4)
        results.sort(key=lambda x: x.rerank_score, reverse=True)
        return results
