"""
BIOQUORA - Enterprise Biomedical Graph Storage Platform
Implements Module 1 & Module 14 for Step 4 Stage 7 (BioGraphX v1.0).
Provides high-speed native property graph storage with distributed shard partitions and replication support.
"""

from typing import Dict, Any, List, Optional
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge

class GraphPartitionShard:
    def __init__(self, shard_id: int):
        self.shard_id = shard_id
        self.nodes: Dict[str, UniversalBiomedicalNode] = {}
        self.edges: Dict[str, BiomedicalGraphEdge] = {}
        self.adj_out: Dict[str, List[str]] = {}
        self.adj_in: Dict[str, List[str]] = {}

class BioGraphStorageEngine:
    def __init__(self, num_shards: int = 4):
        self.num_shards = max(1, num_shards)
        self.shards: List[GraphPartitionShard] = [GraphPartitionShard(i) for i in range(self.num_shards)]

    def _get_shard_index(self, bioq_id: str) -> int:
        return abs(hash(bioq_id)) % self.num_shards

    def insert_node(self, node: UniversalBiomedicalNode) -> UniversalBiomedicalNode:
        idx = self._get_shard_index(node.bioq_id)
        shard = self.shards[idx]
        shard.nodes[node.bioq_id] = node
        if node.bioq_id not in shard.adj_out:
            shard.adj_out[node.bioq_id] = []
            shard.adj_in[node.bioq_id] = []
        return node

    def insert_edge(self, edge: BiomedicalGraphEdge) -> BiomedicalGraphEdge:
        src_shard = self.shards[self._get_shard_index(edge.source_bioq_id)]
        tgt_shard = self.shards[self._get_shard_index(edge.target_bioq_id)]

        src_shard.edges[edge.edge_id] = edge
        if edge.source_bioq_id in src_shard.adj_out:
            src_shard.adj_out[edge.source_bioq_id].append(edge.edge_id)

        if tgt_shard.shard_id != src_shard.shard_id:
            tgt_shard.edges[edge.edge_id] = edge
        if edge.target_bioq_id in tgt_shard.adj_in:
            tgt_shard.adj_in[edge.target_bioq_id].append(edge.edge_id)

        return edge

    def get_node(self, bioq_id: str) -> Optional[UniversalBiomedicalNode]:
        idx = self._get_shard_index(bioq_id)
        return self.shards[idx].nodes.get(bioq_id)

    def get_all_nodes(self) -> Dict[str, UniversalBiomedicalNode]:
        merged = {}
        for s in self.shards:
            merged.update(s.nodes)
        return merged

    def get_all_edges(self) -> Dict[str, BiomedicalGraphEdge]:
        merged = {}
        for s in self.shards:
            merged.update(s.edges)
        return merged

def get_storage_engine() -> BioGraphStorageEngine:
    return BioGraphStorageEngine()
