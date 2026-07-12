"""
Dense Semantic Retrieval Engine
Wraps VectorDatabaseStore and BiomedicalEmbeddingEngine for dense vector similarity retrieval.
"""

from typing import List, Tuple
from bioquora.embeddings.engine import BiomedicalEmbeddingEngine
from bioquora.vectors.store import VectorDatabaseStore
from bioquora.bionlp.schema import BiomedicalKnowledgeObject


class DenseSemanticSearchEngine:
    """Production Dense Semantic Vector Retriever."""

    def __init__(self, embedder: BiomedicalEmbeddingEngine, vstore: VectorDatabaseStore):
        self.embedder = embedder
        self.vstore = vstore

    def index_item(self, item_id: str, text: str, payload: BiomedicalKnowledgeObject) -> None:
        vec = self.embedder.embed_text(text)
        self.vstore.insert(item_id, vec, payload)

    def search_dense(self, query: str, top_k: int = 10) -> List[Tuple[str, float]]:
        qvec = self.embedder.embed_text(query)
        return self.vstore.search_cosine(qvec, top_k=top_k)
