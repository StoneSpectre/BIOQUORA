"""
BIOQUORA - BioGraphX Operational Platform & Developer Graph APIs
Implements Module 16 & Module 19 for Step 4 Stage 7 (BioGraphX v1.0).
Integrates Stage 6 constructed graph output into distributed storage and exposes 9 Developer Graph APIs.
"""

from typing import Dict, Any, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine, get_storage_engine
from bioquora.graph_platform.storage.schema_registry import GraphSchemaRegistry
from bioquora.graph_platform.indexing.index_manager import GraphIndexManager
from bioquora.graph_platform.caching.cache_layer import GraphCacheLayer
from bioquora.graph_platform.query.query_engine import BioGraphQueryEngine
from bioquora.graph_platform.traversal.traversal_engine import BiomedicalTraversalEngine
from bioquora.graph_platform.query.unified_retrieval import UnifiedRetrievalLayer
from bioquora.graph_platform.analytics.graph_analytics import GraphAnalyticsPlatform
from bioquora.graph_platform.embeddings.embedding_service import GraphEmbeddingService
from bioquora.graph_platform.visualization.graph_visualization import GraphVisualizationEngine
from bioquora.graph_platform.analytics.graph_statistics import GraphStatisticsDashboard
from bioquora.graph_platform.benchmarking.benchmark_runner import GraphBenchmarkRunner

class BioGraphXPlatformService:
    def __init__(self):
        self.storage = get_storage_engine()
        self.schema = GraphSchemaRegistry()
        self.indexer = GraphIndexManager()
        self.cache = GraphCacheLayer()
        self.query_engine = BioGraphQueryEngine(self.storage, self.indexer)
        self.traversal = BiomedicalTraversalEngine(self.storage)
        self.search = UnifiedRetrievalLayer(self.indexer)
        self.embedding_service = GraphEmbeddingService(self.storage)

    def load_graph_from_stage6(self, nodes_dict: Dict[str, Any], edges_dict: Dict[str, Any]) -> int:
        for n in nodes_dict.values():
            self.storage.insert_node(n)
            self.indexer.index_node(n)
        for e in edges_dict.values():
            self.storage.insert_edge(e)
            self.indexer.index_edge(e)
        return len(nodes_dict)

    # API 1: Query API
    def execute_query_api(self, name: str) -> Dict[str, Any]:
        return self.query_engine.execute_lookup_by_name(name)

    # API 2: Traversal API
    def execute_traversal_api(self, start_id: str, end_id: str) -> Dict[str, Any]:
        return self.traversal.shortest_path(start_id, end_id)

    # API 3: Analytics API
    def execute_analytics_api(self) -> Dict[str, Any]:
        return {
            "pagerank": GraphAnalyticsPlatform.compute_pagerank(self.storage, iterations=3),
            "degree_centrality": GraphAnalyticsPlatform.compute_degree_centrality(self.storage)
        }

    # API 4: Embedding API
    def get_embeddings_api(self) -> Dict[str, Any]:
        return self.embedding_service.compute_all_embeddings()

    # API 5: Visualization API
    def get_visualization_api(self) -> Dict[str, Any]:
        return GraphVisualizationEngine.generate_force_directed_layout(self.storage)

    # API 6: Statistics API
    def get_statistics_api(self) -> Dict[str, Any]:
        return GraphStatisticsDashboard.get_dashboard_summary(self.storage)

    # API 7: Performance API
    def get_performance_api(self) -> Dict[str, Any]:
        return GraphBenchmarkRunner.run_production_benchmarks(self.storage, self.indexer)

    # API 8: Search API
    def search_api(self, query: str) -> Dict[str, Any]:
        return self.search.search_entity(query)

    # API 9: Graph Export API
    def export_graph_api(self) -> Dict[str, Any]:
        return {
            "node_count": len(self.storage.get_all_nodes()),
            "edge_count": len(self.storage.get_all_edges()),
            "export_status": "EXPORT_READY"
        }

def get_biographx_service() -> BioGraphXPlatformService:
    return BioGraphXPlatformService()
