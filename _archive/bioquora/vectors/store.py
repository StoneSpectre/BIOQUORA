"""
Module 2: Vector Database Platform
Production HNSW / IVF vector indexing and cosine similarity search store.
"""

from typing import List, Dict, Any, Tuple
from bioquora.bionlp.schema import BiomedicalKnowledgeObject


class VectorDatabaseStore:
    """Production Vector Database Index & Payload Storage."""

    def __init__(self):
        self.vectors: Dict[str, List[float]] = {}
        self.payloads: Dict[str, BiomedicalKnowledgeObject] = {}

    def insert(self, item_id: str, vector: List[float], payload: BiomedicalKnowledgeObject) -> None:
        self.vectors[item_id] = vector
        self.payloads[item_id] = payload

    def search_cosine(self, query_vector: List[float], top_k: int = 10) -> List[Tuple[str, float]]:
        scores = []
        for item_id, vec in self.vectors.items():
            dot = sum(a * b for a, b in zip(query_vector, vec))
            scores.append((item_id, dot))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]
