"""
Part 6 §7.12 (Hybrid Retrieval) and §7.13 (Evidence Ranking).

Final score = weighted blend of:
  BM25 + Vector Similarity + Ontology Match + Graph Distance
  + Evidence Score + Recency + Citation Quality
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any


DEFAULT_WEIGHTS = {
    "lexical": 0.20,
    "vector": 0.20,
    "ontology": 0.15,
    "graph": 0.15,
    "evidence": 0.20,
    "recency": 0.10,
}


@dataclass
class ScoredResult:
    bioquora_id: str
    node: Any
    components: dict = field(default_factory=dict)
    final_score: float = 0.0
    evidence_summary: dict = field(default_factory=dict)

    @property
    def score(self) -> float:
        return self.final_score

    @property
    def canonical_label(self) -> str:
        return self.node["preferred_label"] if self.node else ""

    @property
    def entity_type(self) -> str:
        return str(self.node["entity_type"]) if self.node else ""

    @property
    def lexical_score(self) -> float:
        return self.components.get("lexical", 0.0)

    @property
    def vector_score(self) -> float:
        return self.components.get("vector", 0.0)

    @property
    def graph_score(self) -> float:
        return self.components.get("graph", 0.0)

    @property
    def ontology_boost(self) -> bool:
        return bool(self.components.get("ontology", 0.0) > 0)


def evidence_score(node: Any, kg: Any) -> float:
    """§7.13 — aggregate evidence quality across all edges touching this node."""
    edges = kg.get_neighbors(node["bioquora_id"], direction="out") + kg.get_neighbors(
        node["bioquora_id"], direction="in"
    )
    if not edges:
        return node.get("confidence", {}).get("score", 0.3)

    level_weight = {
        "Phase III RCT": 1.0,
        "systematic review": 0.95,
        "guideline": 0.9,
        "Phase II RCT": 0.7,
        "observational": 0.5,
        None: 0.4,
    }
    total, count = 0.0, 0
    for item in edges:
        edge = item["edge"]
        for ev in edge.get("evidence", []):
            total += level_weight.get(ev.get("evidence_level"), 0.4)
            count += 1
        total += edge.get("confidence", {}).get("score", 0.3)
        count += 1
    return round(total / max(count, 1), 3)


def recency_score(node: Any) -> float:
    """§7.13 recency signal — newer publication_year / updated_date scores higher."""
    year = node.get("metadata", {}).get("publication_year")
    if year:
        current_year = datetime.now(timezone.utc).year
        age = max(current_year - int(year), 0)
        return round(max(0.0, 1.0 - age / 15), 3)
    return 0.5


class HybridRanker:
    def __init__(self, kg: Any, weights: dict | None = None, **kwargs):
        self.kg = kg
        self.weights = weights or DEFAULT_WEIGHTS

    def rank(
        self,
        lexical_hits: list[tuple[str, float]],
        vector_hits: list[tuple[str, float]],
        graph_hits: list[tuple[str, float]],
        ontology_boost_ids: set[str],
        top_k: int = 10,
    ) -> list[ScoredResult]:
        lex = dict(lexical_hits)
        vec = dict(vector_hits)
        gph = dict(graph_hits)

        def _norm(m: dict[str, float]) -> dict[str, float]:
            if not m:
                return {}
            mx = max(m.values())
            if mx <= 0:
                return {k: 0.0 for k in m}
            return {k: v / mx for k, v in m.items()}

        lex = _norm(lex)
        vec = _norm(vec)
        gph = _norm(gph)

        candidate_ids = set(lex) | set(vec) | set(gph) | ontology_boost_ids
        results = []
        for cid in candidate_ids:
            node = self.kg.get_node(cid)
            if not node:
                continue
            components = {
                "lexical": lex.get(cid, 0.0),
                "vector": vec.get(cid, 0.0),
                "ontology": 1.0 if cid in ontology_boost_ids else 0.0,
                "graph": gph.get(cid, 0.0),
                "evidence": evidence_score(node, self.kg),
                "recency": recency_score(node),
            }
            final = sum(components[k] * self.weights.get(k, 0.0) for k in self.weights)
            results.append(
                ScoredResult(
                    bioquora_id=cid,
                    node=node,
                    components=components,
                    final_score=round(final, 4),
                )
            )
        results.sort(key=lambda r: -r.final_score)
        return results[:top_k]
