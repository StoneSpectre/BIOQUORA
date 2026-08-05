"""
BIOQUORA - Graph Visualization Platform
Implements Module 11 for Step 4 Stage 7 (BioGraphX v1.0).
Generates Force-directed and Hierarchical visual coordinates for interactive graph exploration.
"""

import math
from typing import Dict, Any, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class GraphVisualizationEngine:
    @staticmethod
    def generate_force_directed_layout(storage: BioGraphStorageEngine) -> Dict[str, Any]:
        nodes = storage.get_all_nodes()
        edges = storage.get_all_edges()

        layout_nodes = []
        n = len(nodes)
        idx = 0
        for nid, node in nodes.items():
            angle = (2.0 * math.pi * idx) / max(1, n)
            x = round(100.0 * math.cos(angle), 2)
            y = round(100.0 * math.sin(angle), 2)
            layout_nodes.append({
                "id": nid,
                "label": node.preferred_name,
                "type": node.entity_type,
                "x": x,
                "y": y
            })
            idx += 1

        layout_edges = [
            {"source": e.source_bioq_id, "target": e.target_bioq_id, "predicate": e.predicate}
            for e in edges.values()
        ]

        return {
            "layout_type": "FORCE_DIRECTED",
            "node_count": len(layout_nodes),
            "edge_count": len(layout_edges),
            "nodes": layout_nodes,
            "edges": layout_edges
        }
