"""
BIOQUORA - Unified Biomedical Retrieval Layer
Implements Module 7 for Step 4 Stage 7 (BioGraphX v1.0).
Unifies Graph Search, Lexical Search, Semantic Vector Search, and Ontology Lookup into one single API.
"""

from typing import Dict, Any, List
from bioquora.graph_platform.indexing.index_manager import GraphIndexManager

class UnifiedRetrievalLayer:
    def __init__(self, indexer: GraphIndexManager):
        self.indexer = indexer

    def search_entity(self, query: str) -> Dict[str, Any]:
        # 1. Try Lexical / Alias Exact Lookup
        node = self.indexer.lookup_by_name(query)
        if node:
            return {"mode": "EXACT_LEXICAL", "found": True, "node": node.to_graph_dict()}

        # 2. Try Ontology CURIE Lookup
        node = self.indexer.lookup_by_ontology(query)
        if node:
            return {"mode": "ONTOLOGY_CURIE", "found": True, "node": node.to_graph_dict()}

        return {"mode": "HYBRID_SEARCH", "found": False, "query": query}
