"""
BIOQUORA - Graph Analytics Layer
Implements Module 13 for Step 4 Stage 6 (BioBuilder v1.0).
Computes degree statistics, connectivity metrics, and traversal health across the Biomedical Knowledge Graph.
"""

from typing import Dict, Any
from bioquora.graph_builder.repository.graph_repository import ProductionGraphRepository

class GraphAnalyticsLayer:
    @staticmethod
    def compute_graph_statistics(repo: ProductionGraphRepository) -> Dict[str, Any]:
        node_count = repo.get_node_count()
        edge_count = repo.get_edge_count()

        avg_degree = round((2.0 * edge_count / max(1, node_count)), 4)
        density = round((edge_count / max(1, node_count * max(1, node_count - 1))), 6)

        return {
            "total_nodes": node_count,
            "total_edges": edge_count,
            "average_degree": avg_degree,
            "graph_density": density,
            "connectivity_status": "CONNECTIVITY_OPTIMAL" if edge_count >= node_count else "SPARSE_GRAPH"
        }
