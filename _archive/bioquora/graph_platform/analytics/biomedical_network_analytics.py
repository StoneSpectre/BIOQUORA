"""
BIOQUORA - Biomedical Network Analytics Engine
Implements Module 9 for Step 4 Stage 7 (BioGraphX v1.0).
Analyzes specialized sub-networks across Gene, Protein, Drug, Disease, and Pathway interactions.
"""

from typing import Dict, Any, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class BiomedicalNetworkAnalyticsEngine:
    @staticmethod
    def analyze_subnetwork(storage: BioGraphStorageEngine, entity_types: List[str]) -> Dict[str, Any]:
        allowed_types = {t.upper() for t in entity_types}
        nodes = {nid: n for nid, n in storage.get_all_nodes().items() if n.entity_type.upper() in allowed_types}
        edges = [
            e for e in storage.get_all_edges().values()
            if e.source_bioq_id in nodes and e.target_bioq_id in nodes
        ]

        return {
            "target_entity_types": list(allowed_types),
            "subnetwork_node_count": len(nodes),
            "subnetwork_edge_count": len(edges),
            "subnetwork_density": round(len(edges) / max(1, len(nodes) * max(1, len(nodes) - 1)), 6),
            "status": "SUBNETWORK_ANALYZED"
        }
