"""
Module 3: Hybrid Biomedical Search Engine
Fuses BM25 Lexical + Dense Semantic search via Reciprocal Rank Fusion (RRF) and Cross-Encoder Reranking.
"""

from typing import List, Dict
from bioquora.search.schema import BiomedicalSearchResult
from bioquora.search.lexical.engine import BM25LexicalSearchEngine
from bioquora.search.semantic.engine import DenseSemanticSearchEngine
from bioquora.rerankers.engine import CrossEncoderRerankingEngine
from bioquora.bionlp.schema import BiomedicalKnowledgeObject


class HybridBiomedicalSearchEngine:
    """Production Hybrid Retrieval & RRF Fusion Engine."""

    def __init__(
        self,
        lexical: BM25LexicalSearchEngine,
        semantic: DenseSemanticSearchEngine,
        reranker: CrossEncoderRerankingEngine,
    ):
        self.lexical = lexical
        self.semantic = semantic
        self.reranker = reranker

    def search(self, query: str, top_k: int = 10) -> List[BiomedicalSearchResult]:
        lex_results = self.lexical.search_keywords(query, top_k=top_k * 2)
        sem_results = self.semantic.search_dense(query, top_k=top_k * 2)

        rrf_scores: Dict[str, float] = {}
        lex_scores: Dict[str, float] = {}
        sem_scores: Dict[str, float] = {}

        for rank, (item_id, score) in enumerate(lex_results, 1):
            rrf_scores[item_id] = rrf_scores.get(item_id, 0.0) + (1.0 / (60 + rank))
            lex_scores[item_id] = score

        for rank, (item_id, score) in enumerate(sem_results, 1):
            rrf_scores[item_id] = rrf_scores.get(item_id, 0.0) + (1.0 / (60 + rank))
            sem_scores[item_id] = score

        results = []
        for item_id, rrf_score in sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)[: top_k * 2]:
            bko = self.lexical.corpus[item_id]
            norm_comb = round(min(1.0, rrf_score * 35.0), 4)
            results.append(
                BiomedicalSearchResult(
                    knowledge_object=bko,
                    paper_id=bko.paper_id,
                    snippet=bko.sentence_text,
                    lexical_score=lex_scores.get(item_id, 0.0),
                    semantic_score=sem_scores.get(item_id, 0.0),
                    combined_score=norm_comb,
                    rerank_score=norm_comb,
                    evidence=bko.evidence,
                )
            )

        reranked = self.reranker.rerank_results(query, results)
        return reranked[:top_k]
