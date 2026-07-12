from __future__ import annotations
from typing import Any, Optional
from .models import Node, Edge, EntityType, Predicate, Confidence
from .storage import BioquoraStore


class GraphValidationError(Exception):
    """Raised when knowledge graph operations violate schema or consistency constraints."""
    pass


class BioquoraKnowledgeGraph:
    """
    High-level Bioquora Knowledge Graph interface.
    Manages graph topology, validates conflict-preserving semantics per Ch.5 §5.17,
    and orchestrates entity and edge operations over the BioquoraStore.
    """
    def __init__(self, store: Optional[BioquoraStore] = None, db_path: str = ":memory:"):
        self.store = store or BioquoraStore(db_path=db_path)

    def add_node(self, node: Node) -> bool:
        if not node.id or not node.name:
            raise GraphValidationError("Node must have a valid id and name.")
        return self.store.add_node(node)

    def get_node(self, node_id: str) -> Optional[Node]:
        return self.store.get_node(node_id)

    def add_edge(self, edge: Edge) -> bool:
        if not edge.source_id or not edge.target_id:
            raise GraphValidationError("Edge must specify both source_id and target_id.")
        if edge.source_id == edge.target_id:
            raise GraphValidationError("Self-loops are not permitted in BioquoraKnowledgeGraph.")
        return self.store.add_edge(edge)

    def get_edges(self, source_id: Optional[str] = None, target_id: Optional[str] = None, predicate: Optional[str] = None) -> list[Edge]:
        return self.store.get_edges(source_id=source_id, target_id=target_id, predicate=predicate)

    def get_neighbors(self, node_id: str, predicate: Optional[str] = None, direction: Optional[str] = None) -> list[_NeighborItem]:
        out_edges = self.get_edges(source_id=node_id, predicate=predicate) if direction in (None, "out", "both") else []
        in_edges = self.get_edges(target_id=node_id, predicate=predicate) if direction in (None, "in", "both") else []
        neighbors = []
        for e in out_edges:
            n = self.get_node(e.target_id)
            if n:
                neighbors.append(_NeighborItem(e, n))
        for e in in_edges:
            n = self.get_node(e.source_id)
            if n:
                neighbors.append(_NeighborItem(e, n))
        return neighbors


    def traverse(
        self,
        start_id: str,
        max_hops: int = 2,
        predicates: Optional[list[Any]] = None,
        entity_types: Optional[list[Any]] = None,
    ) -> list[list[_NeighborItem]]:
        """Traverse graph from start_id up to max_hops, returning all paths per Part 6 §7.10."""
        pred_vals = {getattr(p, "value", str(p)) for p in predicates} if predicates is not None else None
        type_vals = {getattr(t, "value", str(t)) for t in entity_types} if entity_types is not None else None

        paths: list[list[_NeighborItem]] = []
        queue = [(start_id, [], {start_id})]
        while queue:
            curr_id, curr_path, visited = queue.pop(0)
            if len(curr_path) >= max_hops:
                continue
            neighbors = self.get_neighbors(curr_id)
            for item in neighbors:
                edge = item.edge
                nb = item.node
                if nb.id in visited:
                    continue
                if pred_vals is not None:
                    e_pred = getattr(edge.predicate, "value", str(edge.predicate))
                    if e_pred not in pred_vals:
                        continue
                if type_vals is not None:
                    n_type = getattr(nb.entity_type, "value", str(nb.entity_type))
                    if n_type not in type_vals:
                        continue
                new_path = list(curr_path) + [item]
                paths.append(new_path)
                queue.append((nb.id, new_path, visited | {nb.id}))
        return paths


    def all_nodes(self) -> list[Node]:

        return self.store.all_nodes()

    def all_edges(self) -> list[Edge]:
        return self.store.all_edges()

    @property
    def _g(self) -> _GraphAdapter:
        return _GraphAdapter(self)

    def close(self):
        self.store.close()


class _GraphAdapter:
    def __init__(self, kg: BioquoraKnowledgeGraph):
        self._kg = kg

    def nodes(self, data: bool = False):
        if data:
            return [(n.id, n) for n in self._kg.all_nodes()]
        return [n.id for n in self._kg.all_nodes()]

    def edges(self, data: bool = False):
        if data:
            return [(e.source_id, e.target_id, e) for e in self._kg.all_edges()]
        return [(e.source_id, e.target_id) for e in self._kg.all_edges()]


class _NeighborItem(tuple):
    def __new__(cls, edge, node):
        return super().__new__(cls, (edge, node))

    @property
    def edge(self):
        return super().__getitem__(0)

    @property
    def node(self):
        return super().__getitem__(1)

    def __getitem__(self, key):
        if key == "edge" or key == 0:
            return super().__getitem__(0)
        elif key == "node" or key == 1:
            return super().__getitem__(1)
        return super().__getitem__(key)

    def get(self, key, default=None):
        try:
            return self[key]
        except (KeyError, IndexError):
            return default



