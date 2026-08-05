"""
BIOQUORA FOUNDER BIBLE — STEP 3: STAGE 4
LITERATURE INTELLIGENCE & BIOMEDICAL SEARCH PLATFORM (Codename: BioSearch)

Production master orchestrator integrating all 12 Modules and exposing the 9 core APIs:
  1. Search API
  2. Semantic Retrieval API
  3. Hybrid Search API
  4. GraphRAG API
  5. Citation API
  6. Recommendation API
  7. QA API
  8. Analytics API
  9. Workspace API
"""

import time
from typing import List, Dict, Any
from bioquora.bionlp.schema import BiomedicalKnowledgeObject
from bioquora.search.schema import (
    BiomedicalSearchResult,
    GraphRAGContext,
    BiomedicalQAResponse,
    CitationMetricsRecord,
    Stage4ExitReport,
)
from bioquora.embeddings.engine import BiomedicalEmbeddingEngine
from bioquora.vectors.store import VectorDatabaseStore
from bioquora.rerankers.engine import CrossEncoderRerankingEngine
from bioquora.search.lexical.engine import BM25LexicalSearchEngine
from bioquora.search.semantic.engine import DenseSemanticSearchEngine
from bioquora.search.hybrid.engine import HybridBiomedicalSearchEngine
from bioquora.search.citation.engine import CitationIntelligenceEngine
from bioquora.search.recommendation.engine import ResearchRecommendationEngine
from bioquora.search.graphrag.engine import BiomedicalGraphRAGEngine
from bioquora.search.qa.engine import BiomedicalQuestionAnsweringEngine
from bioquora.search.analytics.engine import ResearchAnalyticsDiscoveryEngine
from bioquora.search.workspace.engine import PersonalResearchWorkspaceEngine
from bioquora.search.evaluation.engine import SearchEvaluationEngine
from bioquora.search.api.endpoints import BiomedicalSearchAPIRouter


class BioSearchPlatform:
    """
    Bioquora Step 3 Stage 4 Master Literature Intelligence & Biomedical Search Platform (BioSearch).
    Enables researchers and AI agents to discover, explore, reason over, and question
    ontology-aligned biomedical knowledge objects.
    """

    def __init__(self):
        self.embedder = BiomedicalEmbeddingEngine()
        self.vstore = VectorDatabaseStore()
        self.lexical = BM25LexicalSearchEngine()
        self.semantic = DenseSemanticSearchEngine(self.embedder, self.vstore)
        self.reranker = CrossEncoderRerankingEngine()
        self.hybrid = HybridBiomedicalSearchEngine(self.lexical, self.semantic, self.reranker)
        self.citation_engine = CitationIntelligenceEngine()
        self.recommender = ResearchRecommendationEngine()
        self.graphrag = BiomedicalGraphRAGEngine()
        self.qa = BiomedicalQuestionAnsweringEngine()
        self.analytics = ResearchAnalyticsDiscoveryEngine()
        self.workspace = PersonalResearchWorkspaceEngine()
        self.evaluator = SearchEvaluationEngine()
        self.api_router = BiomedicalSearchAPIRouter(self)

    def index_knowledge_object(self, bko: BiomedicalKnowledgeObject) -> None:
        """Index a BiomedicalKnowledgeObject into both lexical BM25 and dense vector indexes."""
        item_id = bko.knowledge_id
        index_text = f"{bko.subject_entity.text} {bko.relationship} {bko.object_entity.text} {bko.sentence_text}"
        self.lexical.index_item(item_id, bko)
        self.semantic.index_item(item_id, index_text, bko)

    # ==========================================
    # API 1: Search API (Keyword)
    # ==========================================
    def search_keyword(self, query: str, top_k: int = 10) -> List[Dict[str, Any]]:
        lex_res = self.lexical.search_keywords(query, top_k=top_k)
        return [{"knowledge_id": k, "lexical_score": s} for k, s in lex_res]

    # ==========================================
    # API 2: Semantic Retrieval API
    # ==========================================
    def search_semantic(self, query: str, top_k: int = 10) -> List[Dict[str, Any]]:
        sem_res = self.semantic.search_dense(query, top_k=top_k)
        return [{"knowledge_id": k, "cosine_score": s} for k, s in sem_res]

    # ==========================================
    # API 3: Hybrid Search API
    # ==========================================
    def search_hybrid(self, query: str, top_k: int = 10) -> List[BiomedicalSearchResult]:
        """Perform RRF hybrid search combining BM25 and dense vectors + cross-encoder reranking."""
        return self.hybrid.search(query, top_k=top_k)

    # ==========================================
    # API 4: GraphRAG API
    # ==========================================
    def get_graphrag_context(self, query: str, top_k: int = 5) -> GraphRAGContext:
        """Retrieve multi-hop evidence triples and assemble structured GraphRAG context."""
        results = self.search_hybrid(query, top_k=top_k)
        return self.graphrag.build_context(query, results)

    # ==========================================
    # API 5: Citation API
    # ==========================================
    def analyze_citations(self, paper_id: str, count: int = 42) -> CitationMetricsRecord:
        """Compute citation count, influence score, and impact trend."""
        return self.citation_engine.compute_metrics(paper_id, raw_citation_count=count)

    # ==========================================
    # API 6: Recommendation API
    # ==========================================
    def get_recommendations(self, seed_result: BiomedicalSearchResult, top_k: int = 5) -> List[Dict[str, Any]]:
        """Recommend related research papers based on graph and content similarity."""
        return self.recommender.recommend(seed_result, top_k=top_k)

    # ==========================================
    # API 7: QA API
    # ==========================================
    def answer_question(self, query: str) -> BiomedicalQAResponse:
        """Answer natural language biomedical questions grounded in retrieved evidence."""
        ctx = self.get_graphrag_context(query, top_k=5)
        return self.qa.answer_question(ctx)

    # ==========================================
    # API 8: Analytics API
    # ==========================================
    def get_analytics_dashboard(self) -> Dict[str, Any]:
        """Return large-scale literature analytics and discovery dashboard report."""
        return self.analytics.generate_dashboard_report()

    # ==========================================
    # API 9: Workspace API
    # ==========================================
    def manage_workspace(self, action: str, paper_id: str, note: str = "") -> Dict[str, Any]:
        """Personal researcher workspace operations (bookmarks, annotations)."""
        if action == "bookmark":
            self.workspace.bookmark_paper(paper_id)
        elif action == "annotate":
            self.workspace.annotate(paper_id, note)
        return self.workspace.get_workspace_summary()

    # ==========================================
    # Stage 4 Exit Criteria Evaluation
    # ==========================================
    def evaluate_search_platform(self, test_query: str) -> Stage4ExitReport:
        """Evaluate hybrid retrieval latency, precision@10, recall@10, and assert Stage 4 Exit Criteria."""
        start_t = time.time()
        results = self.search_hybrid(test_query, top_k=10)
        latency_ms = (time.time() - start_t) * 1000.0
        return self.evaluator.evaluate_retrieval(results, latency_ms)
