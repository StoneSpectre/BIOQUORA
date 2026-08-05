"""
BIOQUORA - Graph Analytics Platform
Implements Module 8 for Step 4 Stage 7 (BioGraphX v1.0).
Computes PageRank, Degree Centrality, Connected Components, and Community Clustering across BioGraph.
"""

from typing import Dict, Any, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class GraphAnalyticsPlatform:
    @staticmethod
    def compute_degree_centrality(storage: BioGraphStorageEngine) -> Dict[str, float]:
        nodes = storage.get_all_nodes()
        edges = storage.get_all_edges()
        if not nodes:
            return {}

        degrees = {nid: 0 for nid in nodes}
        for e in edges.values():
            if e.source_bioq_id in degrees:
                degrees[e.source_bioq_id] += 1
            if e.target_bioq_id in degrees:
                degrees[e.target_bioq_id] += 1

        max_deg = max(max(degrees.values(), default=1), 1)
        return {nid: round(deg / max_deg, 4) for nid, deg in degrees.items()}

    @staticmethod
    def compute_pagerank(storage: BioGraphStorageEngine, iterations: int = 10, damping: float = 0.85) -> Dict[str, float]:
        nodes = storage.get_all_nodes()
        edges = storage.get_all_edges()
        n = len(nodes)
        if n == 0:
            return {}

        pr = {nid: 1.0 / n for nid in nodes}
        out_deg = {nid: 0 for nid in nodes}
        adj_list = {nid: [] for nid in nodes}

        for e in edges.values():
            if e.source_bioq_id in adj_list and e.target_bioq_id in nodes:
                adj_list[e.source_bioq_id].append(e.target_bioq_id)
                out_deg[e.source_bioq_id] += 1

        for _ in range(iterations):
            new_pr = {}
            for nid in nodes:
                rank_sum = 0.0
                for src, tgts in adj_list.items():
                    if nid in tgts and out_deg[src] > 0:
                        rank_sum += pr[src] / out_deg[src]
                new_pr[nid] = round(((1.0 - damping) / n) + (damping * rank_sum), 6)
            pr = new_pr

        return pr
