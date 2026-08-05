"""
BIOQUORA - Graph Merge Engine
Implements Module 4 for Step 4 Stage 6 (BioBuilder v1.0).
Merges incoming nodes and edges into an existing graph using Replace, Merge, Ignore, or Archive strategies.
"""

from enum import Enum
from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge

class MergeStrategy(str, Enum):
    REPLACE = "REPLACE"
    MERGE = "MERGE"
    IGNORE = "IGNORE"
    ARCHIVE = "ARCHIVE"

class GraphMergeEngine:
    @staticmethod
    def merge_subgraph(
        existing_nodes: Dict[str, UniversalBiomedicalNode],
        existing_edges: Dict[str, BiomedicalGraphEdge],
        incoming_nodes: List[UniversalBiomedicalNode],
        incoming_edges: List[BiomedicalGraphEdge],
        strategy: MergeStrategy = MergeStrategy.MERGE
    ) -> Dict[str, Any]:
        added_nodes = 0
        updated_nodes = 0
        added_edges = 0
        updated_edges = 0

        for n in incoming_nodes:
            if n.bioq_id not in existing_nodes:
                existing_nodes[n.bioq_id] = n
                added_nodes += 1
            else:
                if strategy == MergeStrategy.REPLACE:
                    existing_nodes[n.bioq_id] = n
                    updated_nodes += 1
                elif strategy == MergeStrategy.MERGE:
                    curr = existing_nodes[n.bioq_id]
                    merged_aliases = list(set(curr.aliases + n.aliases))
                    curr.aliases = merged_aliases
                    curr.ontology_ids.update(n.ontology_ids)
                    updated_nodes += 1

        for e in incoming_edges:
            if e.edge_id not in existing_edges:
                existing_edges[e.edge_id] = e
                added_edges += 1
            else:
                if strategy in {MergeStrategy.MERGE, MergeStrategy.REPLACE}:
                    curr_e = existing_edges[e.edge_id]
                    curr_e.evidence_pmids = list(set(curr_e.evidence_pmids + e.evidence_pmids))
                    curr_e.confidence_score = max(curr_e.confidence_score, e.confidence_score)
                    updated_edges += 1

        return {
            "strategy_used": strategy.value,
            "added_nodes": added_nodes,
            "updated_nodes": updated_nodes,
            "added_edges": added_edges,
            "updated_edges": updated_edges,
            "total_nodes_now": len(existing_nodes),
            "total_edges_now": len(existing_edges),
            "status": "MERGE_SUCCESS"
        }
