"""Part 6 §7.10 — Knowledge Graph Retrieval.
Thin adapter that turns BioquoraKnowledgeGraph traversal into a scored
candidate list, so it can be blended by the hybrid ranker (§7.12)."""

from __future__ import annotations

from typing import Optional, Any

from ..graph import BioquoraKnowledgeGraph
from ..models import EntityType, Predicate


class GraphSearchLayer:
    def __init__(self, kg: BioquoraKnowledgeGraph):
        self.kg = kg

    def neighborhood_search(
        self,
        start_id: str,
        max_hops: int = 2,
        predicates: Optional[list[Predicate]] = None,
        entity_types: Optional[list[EntityType]] = None,
    ) -> list[tuple[str, float]]:
        """Score = 1 / (1 + hop_distance), i.e. graph distance (§7.12)."""
        paths = self.kg.traverse(start_id, max_hops=max_hops, predicates=predicates, entity_types=entity_types)
        best_hop: dict[str, int] = {}
        for path in paths:
            end_id = path[-1]["node"]["bioquora_id"]
            hops = len(path)
            if end_id not in best_hop or hops < best_hop[end_id]:
                best_hop[end_id] = hops
        res = [(nid, 1.0 / (1 + hops)) for nid, hops in best_hop.items()]
        res.sort(key=lambda x: -x[1])
        return res
