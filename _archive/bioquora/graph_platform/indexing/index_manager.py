"""
BIOQUORA - Graph Indexing Engine
Implements Module 3 for Step 4 Stage 7 (BioGraphX v1.0).
Provides multi-dimensional B-Tree/Hash indexing over nodes, edges, full-text names, and ontology lookups.
"""

from typing import Dict, List, Set, Optional
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge

class GraphIndexManager:
    def __init__(self):
        self.node_id_index: Dict[str, UniversalBiomedicalNode] = {}
        self.lexical_name_index: Dict[str, str] = {}  # lowered name/alias -> bioq_id
        self.ontology_index: Dict[str, str] = {}  # ontology_curie -> bioq_id
        self.predicate_edge_index: Dict[str, List[BiomedicalGraphEdge]] = {}

    def index_node(self, node: UniversalBiomedicalNode):
        self.node_id_index[node.bioq_id] = node
        self.lexical_name_index[node.preferred_name.lower()] = node.bioq_id
        for alias in node.aliases:
            self.lexical_name_index[alias.lower()] = node.bioq_id
        for curie in node.ontology_ids.values():
            self.ontology_index[curie.upper()] = node.bioq_id

    def index_edge(self, edge: BiomedicalGraphEdge):
        pred = edge.predicate.upper()
        if pred not in self.predicate_edge_index:
            self.predicate_edge_index[pred] = []
        self.predicate_edge_index[pred].append(edge)

    def lookup_by_name(self, name: str) -> Optional[UniversalBiomedicalNode]:
        bioq_id = self.lexical_name_index.get(name.lower())
        return self.node_id_index.get(bioq_id) if bioq_id else None

    def lookup_by_ontology(self, curie: str) -> Optional[UniversalBiomedicalNode]:
        bioq_id = self.ontology_index.get(curie.upper())
        return self.node_id_index.get(bioq_id) if bioq_id else None

    def get_edges_by_predicate(self, predicate: str) -> List[BiomedicalGraphEdge]:
        return self.predicate_edge_index.get(predicate.upper(), [])
