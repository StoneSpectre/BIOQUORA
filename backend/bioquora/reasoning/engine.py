"""
8.3 Reasoning Architecture / 8.22 Biomedical Reasoning Architecture

Orchestrates the full pipeline:
  Query -> Intent Analysis -> Evidence Retrieval -> Graph Traversal ->
  Ontology Constraints -> Evidence Aggregation -> Inference Engine ->
  Contradiction Detection -> Explanation Generator -> Hypothesis Generator
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum
from typing import Any

from . import inference, modes
from .explanation import build_explanation
from .graph import KnowledgeGraph
from .models import Explanation, GraphEdge, Hypothesis, Predicate


class QueryIntent(str, Enum):
    MECHANISM = "mechanism"          # "Why is X associated with Y?"
    MULTI_HOP = "multi_hop"          # "Which drugs target proteins involved in Y?"
    DIFFERENTIAL = "differential"     # symptom -> disease (abductive)
    COUNTERFACTUAL = "counterfactual"  # "What happens if pathway P is inhibited?"


@dataclass
class BBREQuery:
    text: str
    intent: QueryIntent
    subject_id: str | None = None
    end_type: str | None = None
    symptom_ids: list[str] | None = None
    pathway_id: str | None = None


class BiomedicalReasoningEngine:
    """8.22 -- Knowledge Graph -> Ontology Layer -> Reasoning Rules ->
    Graph Traversal -> Evidence Aggregation -> Inference Engine ->
    Contradiction Detection -> Explanation Generator -> Hypothesis Generator."""

    def __init__(self, kg: KnowledgeGraph):
        self.kg = kg

    # -- 8.1 Intent Analysis (rule-based classifier stand-in) -------------
    @staticmethod
    def analyze_intent(query: BBREQuery) -> QueryIntent:
        return query.intent

    # -- full pipeline for a mechanism-style query -------------------------
    def explain_mechanism(self, query: BBREQuery) -> Explanation | None:
        assert query.subject_id and query.end_type
        paths = modes.causal(self.kg, query.subject_id, query.end_type)
        if not paths:
            return None
        best = paths[0]  # already ranked by modes.causal -> kg.rank_paths
        return build_explanation(self.kg, query.text, best)

    # -- multi-hop query, e.g. "drugs targeting proteins in Alzheimer's" ---
    def multi_hop(self, query: BBREQuery) -> list[Explanation]:
        assert query.subject_id and query.end_type
        paths = self.kg.multi_hop_paths(
            query.subject_id,
            end_type=query.end_type,
            max_depth=5,
            allowed_predicates=[
                Predicate.ASSOCIATED_WITH,
                Predicate.ENCODES,
                Predicate.TARGETS,
                Predicate.CRITICAL_FOR,
                Predicate.TREATS,
            ],
        )
        ranked = self.kg.rank_paths(paths)
        return [build_explanation(self.kg, query.text, p) for p in ranked]

    # -- abductive: symptoms -> ranked candidate diseases -------------------
    def differential(self, query: BBREQuery) -> list[tuple[str, float]]:
        assert query.symptom_ids
        return modes.abductive(self.kg, query.symptom_ids)

    # -- counterfactual: pathway inhibition ---------------------------------
    def counterfactual(self, query: BBREQuery) -> dict:
        assert query.pathway_id
        return modes.counterfactual(self.kg, query.pathway_id)

    # -- hypothesis generation pass (8.15) -----------------------------------
    def generate_hypotheses(self) -> list[Hypothesis]:
        inferred_edges = inference.infer_candidate_links(self.kg)
        return inference.generate_hypotheses(self.kg, inferred_edges)

    def run(self, query: BBREQuery):
        """Single entry point dispatching on intent -- what an API layer
        would call."""
        intent = self.analyze_intent(query)
        if intent == QueryIntent.MECHANISM:
            return self.explain_mechanism(query)
        if intent == QueryIntent.MULTI_HOP:
            return self.multi_hop(query)
        if intent == QueryIntent.DIFFERENTIAL:
            return self.differential(query)
        if intent == QueryIntent.COUNTERFACTUAL:
            return self.counterfactual(query)
        raise ValueError(f"Unhandled intent: {intent}")

    # -- Helper methods for graph reasoning and contradiction checking -------
    def infer_relationships(self, subject_id: str, object_id: str) -> list[GraphEdge]:
        results = []
        for edge in self.kg.edges.values():
            if edge.source_id == subject_id and edge.target_id == object_id:
                results.append(edge)
            elif edge.source_id == object_id and edge.target_id == subject_id and edge.predicate in (
                Predicate.ASSOCIATED_WITH, Predicate.INTERACTS_WITH, Predicate.CONTRADICTS
            ):
                results.append(edge)
        return results

    def find_path(self, start_id: str, end_id: str, max_hops: int = 3) -> list[str]:
        if start_id not in self.kg.nodes or end_id not in self.kg.nodes:
            return []
        queue = [(start_id, [start_id])]
        visited = {start_id}
        while queue:
            curr, path = queue.pop(0)
            if curr == end_id:
                return path
            if len(path) > max_hops:
                continue
            for nbr in self.kg.neighbors(curr):
                if nbr not in visited:
                    visited.add(nbr)
                    queue.append((nbr, path + [nbr]))
        return []

    def check_contradiction(self, node1_id: str, node2_id: str) -> bool:
        for edge in self.kg.edges.values():
            if edge.predicate == Predicate.CONTRADICTS:
                if (edge.source_id == node1_id and edge.target_id == node2_id) or (
                    edge.source_id == node2_id and edge.target_id == node1_id
                ):
                    return True
        return False
