"""
Module 11: Biomedical Search Developer APIs
Defines programmatic endpoints for Search, Semantic Retrieval, GraphRAG, Citation, Recommendation, QA, and Workspace APIs.
"""

from typing import Dict, Any


class BiomedicalSearchAPIRouter:
    """Production Developer Search API Router."""

    def __init__(self, platform_ref: Any):
        self.platform = platform_ref

    def handle_search_request(self, query: str, top_k: int = 10) -> Dict[str, Any]:
        results = self.platform.search_hybrid(query, top_k=top_k)
        return {
            "status": "success",
            "query": query,
            "results_count": len(results),
            "results": [
                {
                    "paper_id": r.paper_id,
                    "subject": r.knowledge_object.subject_entity.text,
                    "predicate": r.knowledge_object.relationship,
                    "object": r.knowledge_object.object_entity.text,
                    "combined_score": r.combined_score,
                }
                for r in results
            ],
        }
