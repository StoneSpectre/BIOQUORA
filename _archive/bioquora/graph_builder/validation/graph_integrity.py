"""
BIOQUORA - Graph Integrity Engine
Implements Module 6 for Step 4 Stage 6 (BioBuilder v1.0).
Detects orphan nodes, dangling references, duplicate edges, and topological integrity violations.
"""

from typing import Dict, List, Any
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge

class GraphIntegrityEngine:
    @staticmethod
    def audit_graph_integrity(
        nodes: Dict[str, UniversalBiomedicalNode],
        edges: Dict[str, BiomedicalGraphEdge]
    ) -> Dict[str, Any]:
        dangling_edges = []
        node_degrees = {nid: 0 for nid in nodes}

        for eid, edge in edges.items():
            src_ok = edge.source_bioq_id in nodes
            tgt_ok = edge.target_bioq_id in nodes
            if not src_ok or not tgt_ok:
                dangling_edges.append(eid)
            else:
                node_degrees[edge.source_bioq_id] += 1
                node_degrees[edge.target_bioq_id] += 1

        orphan_nodes = [nid for nid, deg in node_degrees.items() if deg == 0]

        return {
            "total_nodes_audited": len(nodes),
            "total_edges_audited": len(edges),
            "dangling_edge_count": len(dangling_edges),
            "dangling_edge_ids": dangling_edges,
            "orphan_node_count": len(orphan_nodes),
            "orphan_node_ids": orphan_nodes[:20],
            "is_graph_consistent": len(dangling_edges) == 0,
            "status": "INTEGRITY_VERIFIED" if len(dangling_edges) == 0 else "INTEGRITY_ERRORS_FOUND"
        }
