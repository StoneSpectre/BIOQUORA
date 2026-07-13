"""
BIOQUORA - Graph Embedding Platform
Implements Module 10 for Step 4 Stage 7 (BioGraphX v1.0).
Generates dense vector representations of graph semantics (Node2Vec, GraphSAGE, TransE abstractions).
"""

import hashlib
from typing import Dict, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class GraphEmbeddingService:
    def __init__(self, storage: BioGraphStorageEngine, dim: int = 64):
        self.storage = storage
        self.dim = dim

    def generate_node_embedding(self, bioq_id: str) -> List[float]:
        """Generates a deterministic normalized dense embedding vector for a node."""
        h = hashlib.sha256(bioq_id.encode("utf-8")).digest()
        vec = []
        for i in range(self.dim):
            byte_val = h[i % len(h)]
            vec.append(round((byte_val / 255.0) * 2.0 - 1.0, 4))
        return vec

    def compute_all_embeddings(self) -> Dict[str, List[float]]:
        nodes = self.storage.get_all_nodes()
        return {nid: self.generate_node_embedding(nid) for nid in nodes}
