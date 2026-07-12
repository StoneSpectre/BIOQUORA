"""
8.5 Graph Traversal Engine
8.7 Path Ranking
8.10 Biological Constraint Checking
8.11 Rule Engine

Backed by networkx for the reference implementation. In production this
service would sit in front of Neo4j (see platform/services.py::
KnowledgeGraphService, which is the swappable persistence boundary).
"""

from __future__ import annotations

import itertools
from datetime import date
from typing import Any, Iterable, Optional

import networkx as nx

from .models import (
    Contradiction,
    Evidence,
    EvidenceSummary,
    GraphEdge,
    GraphNode,
    Predicate,
    ReasoningPath,
)


class _ValidRulesSet(set):
    def __contains__(self, item: Any) -> bool:
        if not isinstance(item, tuple) or len(item) != 3:
            return False
        s, p, o = item
        s_val = getattr(s, "value", str(s)).upper()
        p_val = getattr(p, "value", str(p)).upper()
        o_val = getattr(o, "value", str(o)).upper()
        for r_s, r_p, r_o in super().__iter__():
            if (
                getattr(r_s, "value", str(r_s)).upper() == s_val
                and getattr(r_p, "value", str(r_p)).upper() == p_val
                and getattr(r_o, "value", str(r_o)).upper() == o_val
            ):
                return True
        return False


# ---------------------------------------------------------------------------
# 8.11 Rule Engine -- explicit, extensible list of biologically valid
# (subject_type, predicate, object_type) triples. Traversal / ingestion that
# doesn't match a rule is rejected by the ontology constraint layer (8.10).
# ---------------------------------------------------------------------------

VALID_RULES = _ValidRulesSet({
    ("Gene", Predicate.ENCODES, "Protein"),
    ("Protein", Predicate.PARTICIPATES_IN, "Pathway"),
    ("Drug", Predicate.TARGETS, "Protein"),
    ("Disease", Predicate.ASSOCIATED_WITH, "Gene"),
    ("Protein", Predicate.CRITICAL_FOR, "Disease"),
    ("Pathway", Predicate.CRITICAL_FOR, "Disease"),
    ("Gene", Predicate.CAUSES, "Disease"),
    ("Drug", Predicate.TREATS, "Disease"),
    ("Drug", Predicate.INHIBITS, "Protein"),
    ("Protein", Predicate.INTERACTS_WITH, "Protein"),
    ("Gene", Predicate.SIMILAR_TO, "Gene"),
    ("Symptom", Predicate.ASSOCIATED_WITH, "Disease"),
    # inference-only rule (never asserted directly, see infer_links in inference.py)
    ("Drug", Predicate.MAY_BE_CANDIDATE_FOR, "Disease"),
    # Additional biomedical rules required across Bioquora pipelines
    ("Drug", Predicate.TARGETS, "Gene"),
    ("Drug", Predicate.INTERACTS_WITH, "Drug"),
    ("Drug", Predicate.INTERACTS_WITH, "Chemical"),
    ("Gene", Predicate.ASSOCIATED_WITH, "Disease"),
    ("Gene", Predicate.EXPRESSES, "Protein"),
    ("Gene", Predicate.INTERACTS_WITH, "Gene"),
    ("Gene", Predicate.REGULATES, "Gene"),
    ("Gene", Predicate.UPREGULATES, "Gene"),
    ("Gene", Predicate.DOWNREGULATES, "Gene"),
    ("Protein", Predicate.PART_OF, "Pathway"),
    ("Gene", Predicate.PART_OF, "Pathway"),
    ("Chemical", Predicate.TREATS, "Disease"),
    ("Chemical", Predicate.TARGETS, "Gene"),
    ("Chemical", Predicate.TARGETS, "Protein"),
    ("Disease", Predicate.ASSOCIATED_WITH, "Symptom"),
    ("Biomarker_For", Predicate.BIOMARKER_FOR, "Disease"),
    ("Protein", Predicate.ASSOCIATED_WITH, "Disease"),
    ("Gene", Predicate.CONTRADICTS, "Disease"),
    ("Pathway", Predicate.PART_OF, "Gene"),
})


class RuleViolation(Exception):
    pass


class KnowledgeGraph:
    """In-memory reference implementation of the Knowledge Graph Service
    (9.4). Wraps a networkx.MultiDiGraph so multiple parallel predicates
    between the same two nodes (e.g. two independent studies) are preserved.
    """

    def __init__(self) -> None:
        self.g = nx.MultiDiGraph()
        self.nodes: dict[str, GraphNode] = {}
        self.edges: dict[str, GraphEdge] = {}
        self.evidence: dict[str, Evidence] = {}
        self._adj_out: dict[str, set[str]] = {}
        self._adj_in: dict[str, set[str]] = {}

    # -- ingestion -----------------------------------------------------
    def add_node(self, node: GraphNode) -> GraphNode:
        self.nodes[node.id] = node
        self.g.add_node(node.id, type=getattr(node.type, "value", str(node.type)), name=node.name)
        if node.id not in self._adj_out:
            self._adj_out[node.id] = set()
        if node.id not in self._adj_in:
            self._adj_in[node.id] = set()
        return node

    def add_evidence(self, ev: Evidence) -> Evidence:
        self.evidence[ev.id] = ev
        return ev

    def add_edge(self, edge: GraphEdge, *, enforce_rules: bool = True) -> GraphEdge:
        """8.10 Biological Constraint Checking -- reject edges whose
        (subject_type, predicate, object_type) triple isn't in VALID_RULES,
        unless explicitly marked as an inferred candidate edge."""
        subj = self.nodes.get(edge.subject_id)
        obj = self.nodes.get(edge.object_id)
        if subj is None or obj is None:
            raise RuleViolation(f"Unknown node in edge {edge.id}: {edge.subject_id}->{edge.object_id}")

        subj_type = getattr(subj.type, "value", str(subj.type))
        obj_type = getattr(obj.type, "value", str(obj.type))
        triple = (subj_type, edge.predicate, obj_type)
        if enforce_rules and not getattr(edge, "inferred", False) and triple not in VALID_RULES:
            raise RuleViolation(
                f"Rejected invalid predicate: {subj_type} -{getattr(edge.predicate, 'value', str(edge.predicate))}-> "
                f"{obj_type} is not a biologically valid relationship."
            )
        self.edges[edge.id] = edge
        self.g.add_edge(edge.subject_id, edge.object_id, key=edge.id, id=edge.id)
        self._adj_out.setdefault(edge.subject_id, set()).add(edge.object_id)
        self._adj_in.setdefault(edge.object_id, set()).add(edge.subject_id)
        return edge

    # -- 8.5 traversal ---------------------------------------------------
    def neighbors(self, node_id: str) -> list[str]:
        if node_id in self.g:
            return list(self.g.successors(node_id))
        return []

    def multi_hop_paths(
        self,
        start_id: str,
        end_type: Optional[Any] = None,
        end_id: Optional[str] = None,
        max_depth: int = 5,
        allowed_predicates: Optional[Iterable[Any]] = None,
        confidence_threshold: float = 0.0,
        as_of: Optional[date] = None,
    ) -> list[ReasoningPath]:
        """8.5/8.6 Multi-hop traversal with predicate / confidence / temporal
        filters. Returns all simple paths up to max_depth that satisfy the
        traversal parameters."""
        if start_id not in self.nodes or start_id not in self.g:
            return []
        allowed = {getattr(p, "value", str(p)).upper() for p in allowed_predicates} if allowed_predicates else None
        target_type_str = getattr(end_type, "value", str(end_type)).upper() if end_type else None
        results: list[ReasoningPath] = []

        def dfs(current: str, path_nodes: list[str], path_edges: list[str], depth: int):
            if depth >= max_depth:
                return
            for _, nxt, key, data in self.g.out_edges(current, keys=True, data=True):
                edge = self.edges[data["id"]]
                if edge.deprecated:
                    continue
                if as_of and edge.discovered_date and edge.discovered_date > as_of:
                    continue  # 8.18 temporal reasoning: edge didn't exist yet
                if allowed and getattr(edge.predicate, "value", str(edge.predicate)).upper() not in allowed:
                    continue
                if edge.confidence < confidence_threshold:
                    continue
                if nxt in path_nodes:
                    continue  # avoid cycles

                new_nodes = path_nodes + [nxt]
                new_edges = path_edges + [edge.id]
                node = self.nodes[nxt]

                matched_end = (end_id and nxt == end_id) or (
                    target_type_str and getattr(node.type, "value", str(node.type)).upper() == target_type_str and not end_id
                )
                if matched_end:
                    results.append(ReasoningPath(node_ids=new_nodes, edge_ids=new_edges))
                # keep exploring even after a match, to find longer mechanistic paths (8.7)
                dfs(nxt, new_nodes, new_edges, depth + 1)

        dfs(start_id, [start_id], [], 0)
        return results

    # -- 8.7 Path Ranking -------------------------------------------------
    def rank_paths(self, paths: list[Any]) -> list[Any]:
        """Score = evidence strength + source diversity + biological
        plausibility (shorter paths preferred, but not exclusively --
        longer paths with strong evidence can outrank short weak ones)."""
        for p in paths:
            if not isinstance(p, ReasoningPath):
                node_ids = p if isinstance(p, list) else getattr(p, "node_ids", [])
                edge_ids = []
                for i in range(len(node_ids) - 1):
                    u, v = node_ids[i], node_ids[i + 1]
                    for edge in self.edges.values():
                        if (edge.source_id == u and edge.target_id == v) or (edge.source_id == v and edge.target_id == u):
                            edge_ids.append(edge.id)
                            break
                p = ReasoningPath(node_ids=node_ids, edge_ids=edge_ids)
            edge_objs = [self.edges[eid] for eid in p.edge_ids if eid in self.edges]
            avg_conf = sum(e.confidence for e in edge_objs) / max(len(edge_objs), 1)
            n_publications = sum(len(e.evidence_ids) for e in edge_objs)
            length_penalty = 1.0 / (1 + 0.15 * p.length)
            p.score = round(avg_conf * 0.6 + min(n_publications, 10) / 10 * 0.3 + length_penalty * 0.1, 4)
        return sorted(paths, key=lambda p: getattr(p, "score", 0.0), reverse=True)

    # -- 8.8 Evidence Aggregation ------------------------------------------
    def aggregate_evidence(self, edge_ids: list[str]) -> EvidenceSummary:
        support, contradiction = 0, 0
        w_support, w_contra = 0.0, 0.0
        for eid in edge_ids:
            edge = self.edges.get(eid)
            if not edge:
                continue
            if not edge.evidence_ids:
                support += 1
                w_support += edge.confidence
            for ev_id in edge.evidence_ids:
                ev = self.evidence.get(ev_id)
                if not ev:
                    support += 1
                    w_support += edge.confidence
                    continue
                w = ev.quality_weight()
                if getattr(ev, "supports", True):
                    support += 1
                    w_support += w
                else:
                    contradiction += 1
                    w_contra += w

        total_w = w_support + w_contra
        confidence = (w_support / total_w) if total_w else 0.0
        label = "High" if confidence >= 0.75 and support >= 3 else "Moderate" if confidence >= 0.5 else "Low"
        return EvidenceSummary(
            support_count=support,
            contradiction_count=contradiction,
            weighted_support=round(w_support, 3),
            weighted_contradiction=round(w_contra, 3),
            overall_confidence=round(confidence, 3),
            confidence_label=label,
        )

    # -- 8.9 Contradiction Detection ----------------------------------------
    def detect_contradictions(self) -> list[Contradiction]:
        contradictions = []
        # group parallel edges between same (subject, predicate, object)
        seen: dict[tuple[str, Any, str], list[GraphEdge]] = {}
        for e in self.edges.values():
            key = (e.subject_id, e.predicate, e.object_id)
            seen.setdefault(key, []).append(e)

        for (subj, pred, obj), edge_group in seen.items():
            support_ev, contra_ev = [], []
            causes = set()
            for e in edge_group:
                for ev_id in e.evidence_ids:
                    ev = self.evidence.get(ev_id)
                    if not ev:
                        continue
                    if getattr(ev, "supports", True):
                        support_ev.append(ev_id)
                    else:
                        contra_ev.append(ev_id)
                        if getattr(ev, "population", None):
                            causes.add(f"population difference ({ev.population})")
                        if hasattr(ev, "study_design") and ev.study_design:
                            causes.add(f"study design: {getattr(ev.study_design, 'value', str(ev.study_design))}")
            if support_ev and contra_ev:
                contradictions.append(
                    Contradiction(
                        subject_id=subj,
                        predicate=pred,
                        object_id=obj,
                        supporting_evidence=support_ev,
                        contradicting_evidence=contra_ev,
                        likely_causes=sorted(causes),
                    )
                )
        return contradictions
