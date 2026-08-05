"""
BIOQUORA - Incremental Graph Update Engine
Implements Module 5 for Step 4 Stage 6 (BioBuilder v1.0).
Performs selective incremental graph updates without full graph rebuilds.
"""

from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge
from bioquora.graph_builder.merge_engine.graph_merge import GraphMergeEngine, MergeStrategy
from bioquora.graph_builder.validation.graph_validator import GraphValidationPlatform

class IncrementalGraphUpdater:
    @staticmethod
    def execute_incremental_update(
        existing_nodes: Dict[str, UniversalBiomedicalNode],
        existing_edges: Dict[str, BiomedicalGraphEdge],
        delta_nodes: List[UniversalBiomedicalNode],
        delta_edges: List[BiomedicalGraphEdge],
        source_name: str = "PubMed_Literature_Feed"
    ) -> Dict[str, Any]:
        merge_res = GraphMergeEngine.merge_subgraph(
            existing_nodes, existing_edges, delta_nodes, delta_edges, MergeStrategy.MERGE
        )

        validation = GraphValidationPlatform.validate_graph(existing_nodes, existing_edges)
        if not validation["validation_passed"]:
            raise ValueError(f"Incremental update validation failed: {validation}")

        return {
            "source": source_name,
            "merge_result": merge_res,
            "validation_report": validation["overall_status"],
            "status": "INCREMENTAL_UPDATE_COMPLETE"
        }
