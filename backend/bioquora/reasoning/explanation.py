"""
8.14 Explanation Engine
8.16 Uncertainty Handling
8.19 Explainable AI Layer
8.20 Human-in-the-Loop
"""

from __future__ import annotations

from typing import Any
from .graph import KnowledgeGraph
from .models import (
    Evidence,
    EvidenceSummary,
    Explanation,
    Hypothesis,
    HypothesisStatus,
    ReasoningPath,
)


def build_explanation(kg: KnowledgeGraph, query: str, path: Any) -> Explanation:
    """8.14/8.19: every answer must expose its evidence chain, supporting
    databases/publications, confidence, reasoning path, and limitations --
    so a user can always inspect *why* a conclusion was reached."""
    if isinstance(path, list):
        node_ids = path
        edge_ids = []
        for i in range(len(node_ids) - 1):
            u, v = node_ids[i], node_ids[i + 1]
            for edge in kg.edges.values():
                if (edge.source_id == u and edge.target_id == v) or (edge.source_id == v and edge.target_id == u):
                    edge_ids.append(edge.id)
                    break
        path = ReasoningPath(node_ids=node_ids, edge_ids=edge_ids)

    summary = kg.aggregate_evidence(path.edge_ids)

    chain = " -> ".join(kg.nodes[n].name if n in kg.nodes else n for n in path.node_ids)
    sources = set()
    for eid in path.edge_ids:
        if eid in kg.edges:
            for ev_id in kg.edges[eid].evidence_ids:
                if ev_id in kg.evidence:
                    sources.add(kg.evidence[ev_id].source.value)

    limitations = []
    if summary.contradiction_count:
        limitations.append(f"{summary.contradiction_count} piece(s) of evidence contradict this conclusion.")
    if summary.support_count < 3:
        limitations.append("Limited independent evidence; treat with caution.")
    if any(kg.edges[eid].inferred for eid in path.edge_ids if eid in kg.edges):
        limitations.append("Path includes at least one inferred (not directly evidenced) relationship.")

    mode_str = f" [Mode: {path.mode}]" if getattr(path, "mode", None) else ""
    answer = (
        f"{chain}{mode_str}. Overall evidence confidence: {summary.confidence_label} "
        f"({summary.overall_confidence})." if chain else "No path found."
    )

    return Explanation(
        query=query,
        answer=answer,
        reasoning_path=path,
        evidence_summary=summary,
        supporting_sources=sorted(sources),
        limitations=limitations,
    )


def uncertainty_report(summary: EvidenceSummary) -> str:
    """8.16: never force false certainty -- surface confidence, evidence
    counts, and an explicit recommendation."""
    recommendation = (
        "Sufficiently well-supported for downstream use."
        if summary.confidence_label == "High"
        else "Further validation recommended before relying on this conclusion."
    )
    return (
        f"Confidence: {summary.confidence_label}\n"
        f"Supporting evidence: {summary.support_count}\n"
        f"Contradicting evidence: {summary.contradiction_count}\n"
        f"Evidence quality (weighted support): {summary.weighted_support}\n"
        f"Recommendation: {recommendation}"
    )


class HumanReviewQueue:
    """8.20 Human-in-the-Loop -- AI-generated hypotheses / inferred edges
    are queued for expert review before being written into the canonical
    knowledge graph."""

    def __init__(self) -> None:
        self.queue: dict[str, Hypothesis] = {}
        self.decisions: list[dict] = []

    def submit(self, hypothesis: Hypothesis) -> None:
        hypothesis.status = HypothesisStatus.UNDER_REVIEW
        self.queue[hypothesis.id] = hypothesis

    def review(self, hypothesis_id: str, accept: bool, reviewer: str, notes: str = "") -> Hypothesis:
        hyp = self.queue[hypothesis_id]
        hyp.status = HypothesisStatus.ACCEPTED if accept else HypothesisStatus.REJECTED
        self.decisions.append(
            {"hypothesis_id": hypothesis_id, "accept": accept, "reviewer": reviewer, "notes": notes}
        )
        return hyp

    def accepted(self) -> list[Hypothesis]:
        return [h for h in self.queue.values() if h.status == HypothesisStatus.ACCEPTED]
