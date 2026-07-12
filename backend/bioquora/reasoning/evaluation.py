"""
8.21 Evaluation Metrics -- automated checks that can run in CI, to be
supplemented with expert review / biomedical benchmarks (not automatable here).
"""

from __future__ import annotations

from .graph import KnowledgeGraph
from .models import Explanation, ReasoningPath


def path_validity_rate(kg: KnowledgeGraph, paths: list[ReasoningPath]) -> float:
    """Fraction of returned paths whose every edge is a rule-valid,
    non-deprecated relationship."""
    if not paths:
        return 1.0
    valid = 0
    for p in paths:
        if not hasattr(p, "edge_ids"):
            continue
        ok = all(eid in kg.edges and not kg.edges[eid].deprecated for eid in p.edge_ids)
        valid += int(ok)
    return round(valid / len(paths), 4)


def citation_correctness(kg: KnowledgeGraph, explanation: Explanation) -> float:
    """Every cited source in an explanation must trace back to real
    evidence objects attached to real edges in the path -- this is the
    'hallucination rate' check for the explanation layer."""
    cited_evidence_ids = set()
    if explanation.reasoning_path and hasattr(explanation.reasoning_path, "edge_ids"):
        for eid in explanation.reasoning_path.edge_ids:
            if eid in kg.edges:
                cited_evidence_ids.update(kg.edges[eid].evidence_ids)
    if not cited_evidence_ids:
        return 1.0 if not explanation.supporting_sources else 0.0
    real = sum(1 for e in cited_evidence_ids if e in kg.evidence)
    return round(real / len(cited_evidence_ids), 4)


def evidence_completeness(kg: KnowledgeGraph, path: ReasoningPath) -> float:
    """Fraction of edges on the path that have at least one attached
    evidence record (vs. bare/unsupported assertions)."""
    if not path or not hasattr(path, "edge_ids") or not path.edge_ids:
        return 0.0
    with_evidence = sum(1 for eid in path.edge_ids if eid in kg.edges and kg.edges[eid].evidence_ids)
    return round(with_evidence / len(path.edge_ids), 4)


def multi_hop_accuracy(found_paths: list[ReasoningPath], expected_end_nodes: set[str]) -> float:
    """Recall-style check: of the expected end nodes, how many were reached
    by at least one returned path."""
    if not expected_end_nodes:
        return 1.0
    reached = {p.node_ids[-1] for p in found_paths if hasattr(p, "node_ids") and p.node_ids}
    return round(len(reached & expected_end_nodes) / len(expected_end_nodes), 4)
