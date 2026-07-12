"""
8.4 Types of Reasoning -- deductive, inductive, abductive, analogical,
causal, counterfactual. Each function returns ReasoningPath objects tagged
with their mode so the explanation layer can describe *how* Bioquora reached
a conclusion, not just *what* it concluded.
"""

from __future__ import annotations

from typing import Any, Optional
from .graph import KnowledgeGraph
from .models import Predicate, ReasoningPath


def _to_reasoning_paths(kg: KnowledgeGraph, raw_paths: list[Any], mode: str) -> list[ReasoningPath]:
    res = []
    for p in raw_paths:
        if isinstance(p, ReasoningPath):
            p.mode = mode
            res.append(p)
        elif isinstance(p, list):
            e_ids = []
            score_sum = 0.0
            count = 0
            for i in range(len(p) - 1):
                u, v = p[i], p[i + 1]
                for edge in kg.edges.values():
                    if (edge.source_id == u and edge.target_id == v) or (edge.source_id == v and edge.target_id == u):
                        e_ids.append(edge.id)
                        score_sum += edge.confidence
                        count += 1
                        break
            avg_score = round(score_sum / max(1, count), 4) if count > 0 else 0.0
            rpath = ReasoningPath(node_ids=p, edge_ids=e_ids, mode=mode, score=avg_score)
            res.append(rpath)
    return res


def deductive(
    kg: KnowledgeGraph,
    drug_id: Optional[str] = None,
    disease_type: Any = "Disease",
    subject_id: Optional[str] = None,
    end_type: Any = None,
    **kwargs,
) -> list[ReasoningPath]:
    """Drug targets Protein; Protein critical_for Disease => Drug may
    influence Disease. Pure rule application over asserted edges."""
    start = drug_id or subject_id or kwargs.get("subject_id", "")
    target = end_type if end_type is not None else (disease_type if disease_type != "Disease" else kwargs.get("end_type", "Disease"))
    raw_paths = kg.multi_hop_paths(
        start,
        end_type=target,
        max_depth=3,
        allowed_predicates=[Predicate.TARGETS, Predicate.CRITICAL_FOR, Predicate.INHIBITS],
    )
    return _to_reasoning_paths(kg, raw_paths, mode="deductive")


def inductive(kg: KnowledgeGraph, subject_id: str, predicate: Predicate, object_id: str) -> float:
    """Confidence rises as independent, non-redundant evidence accumulates
    supporting the same assertion. Returns an inductive confidence score."""
    matching_edges = [
        e for e in kg.edges.values()
        if e.subject_id == subject_id and e.predicate == predicate and e.object_id == object_id
    ]
    summary = kg.aggregate_evidence([e.id for e in matching_edges])
    return summary.overall_confidence


def abductive(kg: KnowledgeGraph, symptom_ids: list[str], top_k: int = 5) -> list[tuple[str, float]]:
    """Given a set of observed symptoms, find the best explanation: rank
    candidate diseases by how much of the symptom set each explains,
    weighted by edge confidence."""
    disease_scores: dict[str, float] = {}
    disease_hits: dict[str, int] = {}
    for sym_id in symptom_ids:
        for e in kg.edges.values():
            if e.predicate == Predicate.ASSOCIATED_WITH:
                if e.subject_id == sym_id:
                    disease_id = e.object_id
                elif e.object_id == sym_id:
                    disease_id = e.subject_id
                else:
                    continue
                node = kg.nodes.get(disease_id)
                if not node or getattr(node.type, "value", str(node.type)).upper() == "DISEASE":
                    disease_scores[disease_id] = disease_scores.get(disease_id, 0.0) + e.confidence
                    disease_hits[disease_id] = disease_hits.get(disease_id, 0) + 1

    ranked = sorted(
        disease_scores.items(),
        key=lambda kv: (disease_hits.get(kv[0], 0), kv[1]),
        reverse=True,
    )
    return [(cid, round(score, 4)) for cid, score in ranked[:top_k]]


def analogical(kg: KnowledgeGraph, gene_id: str, top_k: int = 5) -> list[tuple[str, float]]:
    """Find genes similar to gene_id (SIMILAR_TO edges) and suggest their
    pathway/disease associations as candidate functions for gene_id."""
    similar = [
        (e.object_id if e.subject_id == gene_id else e.subject_id, e.confidence)
        for e in kg.edges.values()
        if (e.subject_id == gene_id or e.object_id == gene_id) and e.predicate == Predicate.SIMILAR_TO
    ]
    candidate_functions: dict[str, float] = {}
    for similar_gene, sim_conf in similar:
        for e in kg.edges.values():
            if (e.subject_id == similar_gene or e.object_id == similar_gene) and e.predicate in (Predicate.CAUSES, Predicate.ASSOCIATED_WITH, Predicate.PART_OF):
                target = e.object_id if e.subject_id == similar_gene else e.subject_id
                score = sim_conf * e.confidence
                candidate_functions[target] = max(candidate_functions.get(target, 0.0), score)
    ranked = sorted(candidate_functions.items(), key=lambda kv: kv[1], reverse=True)
    return [(func, round(score, 4)) for func, score in ranked[:top_k]]


def causal(
    kg: KnowledgeGraph,
    gene_id: Optional[str] = None,
    disease_type: Any = "Disease",
    subject_id: Optional[str] = None,
    end_type: Any = None,
    **kwargs,
) -> list[ReasoningPath]:
    """Mechanistic chain: Gene -> Protein -> Pathway -> Disease. This is the
    canonical BRCA1-style mechanism chain described in 8.2."""
    start = gene_id or subject_id or kwargs.get("subject_id", "")
    target = end_type if end_type is not None else (disease_type if disease_type != "Disease" else kwargs.get("end_type", "Disease"))
    raw_paths = kg.multi_hop_paths(
        start,
        end_type=target,
        max_depth=5,
        allowed_predicates=[
            Predicate.ENCODES,
            Predicate.PARTICIPATES_IN,
            Predicate.CRITICAL_FOR,
            Predicate.CAUSES,
            Predicate.ASSOCIATED_WITH,
            Predicate.TARGETS,
            Predicate.TREATS,
            Predicate.PART_OF,
            Predicate.EXPRESSES,
            Predicate.REGULATES,
            Predicate.UPREGULATES,
            Predicate.DOWNREGULATES,
            Predicate.INTERACTS_WITH,
        ],
    )
    ranked = kg.rank_paths(raw_paths)
    return _to_reasoning_paths(kg, ranked, mode="causal")


def counterfactual(kg: KnowledgeGraph, pathway_id: str) -> dict[str, Any]:
    """'What happens if this pathway is inhibited?' -- walk forward from the
    pathway to every disease/protein it's critical for, i.e. the set of
    downstream effects that would plausibly change under inhibition."""
    affected_diseases = [
        e.object_id for e in kg.edges.values()
        if e.subject_id == pathway_id and e.predicate == Predicate.CRITICAL_FOR
    ]
    candidate_drugs = [
        e.subject_id for e in kg.edges.values()
        if e.object_id in affected_diseases and e.predicate == Predicate.TREATS
    ]
    affected = []
    for edge in kg.edges.values():
        if edge.source_id == pathway_id or edge.target_id == pathway_id:
            other = edge.target_id if edge.source_id == pathway_id else edge.source_id
            affected.append(other)
    return {
        "pathway": pathway_id,
        "pathway_id": pathway_id,
        "status": "INHIBITED",
        "affected_nodes": sorted(list(set(affected) | set(affected_diseases))),
        "downstream_impact_count": len(set(affected) | set(affected_diseases)),
        "predicted_affected_diseases": affected_diseases,
        "existing_drugs_targeting_downstream_disease": candidate_drugs,
        "note": "Counterfactual projection based on existing graph structure; "
                "not a substitute for wet-lab / simulation validation.",
    }
