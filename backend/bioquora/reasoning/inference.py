"""
8.12 Knowledge Graph Inference / 8.13 Link Prediction
8.15 Hypothesis Generation
"""

from __future__ import annotations

from typing import Any
from .graph import KnowledgeGraph
from .models import GraphEdge, Hypothesis, Predicate, ReasoningPath


def infer_candidate_links(kg: KnowledgeGraph, min_confidence: float = 0.3) -> list[Any]:
    """8.12: Drug -targets-> Protein + Protein -critical_for-> Disease =>
    Drug -may_be_candidate_for-> Disease. All inferred edges are explicitly
    marked inferred=True and are NOT added to the canonical graph until
    reviewed (see 8.20 Human-in-the-Loop). Also supports existing topological rules."""
    inferred: list[Any] = []
    
    # Rule 1: Existing rule (Drug -treats-> Disease + Disease -assoc-> Gene => Drug -targets-> Gene)
    for e1 in kg.edges.values():
        if getattr(e1.predicate, "value", str(e1.predicate)).upper() == "TREATS":
            drug_id = e1.source_id
            disease_id = e1.target_id
            for e2 in kg.edges.values():
                if getattr(e2.predicate, "value", str(e2.predicate)).upper() in ("ASSOCIATED_WITH", "CAUSES"):
                    if e2.target_id == disease_id:
                        gene_id = e2.source_id
                        conf = round(e1.confidence * e2.confidence * 0.8, 4)
                        if conf >= min_confidence:
                            inferred.append({
                                "subject_id": drug_id,
                                "target_id": gene_id,
                                "predicate": Predicate.TARGETS,
                                "score": conf,
                                "confidence": conf,
                                "rationale": f"Inferred because {drug_id} treats {disease_id} which is associated with {gene_id}.",
                            })

    # Rule 2: Chapter 8.12 rule (Drug -targets-> Protein + Protein -critical_for-> Disease => Drug -may_be_candidate_for-> Disease)
    targets = [e for e in kg.edges.values() if e.predicate == Predicate.TARGETS]
    critical = [e for e in kg.edges.values() if e.predicate == Predicate.CRITICAL_FOR]

    for t in targets:
        for c in critical:
            if t.object_id == c.subject_id:  # same protein
                confidence = round(t.confidence * c.confidence, 3)
                if confidence < min_confidence:
                    continue
                edge = GraphEdge(
                    subject_id=t.subject_id,
                    predicate=Predicate.MAY_BE_CANDIDATE_FOR,
                    object_id=c.object_id,
                    evidence_ids=[],  # inferred, not directly evidenced
                    confidence=confidence,
                    inferred=True,
                )
                inferred.append(edge)
    return inferred


def generate_hypotheses(kg: KnowledgeGraph, inferred_edges: list[Any]) -> list[Hypothesis]:
    """8.15: wrap inferred/candidate links as explicit, clearly-labeled
    research hypotheses -- never presented as established fact."""
    hypotheses = []
    for e in inferred_edges:
        if isinstance(e, dict):
            hyp = Hypothesis(
                subject_id=e["subject_id"],
                target_id=e["target_id"],
                predicate=e["predicate"],
                score=e.get("score", 0.5),
                rationale=e.get("rationale", "Topological inference"),
                confidence=e.get("confidence", e.get("score", 0.5)),
                hypothesis_type="topological_inference",
                statement=e.get("rationale", "Topological inference"),
            )
            hypotheses.append(hyp)
        else:
            subj = kg.nodes[e.subject_id].name if e.subject_id in kg.nodes else e.subject_id
            obj = kg.nodes[e.object_id].name if e.object_id in kg.nodes else e.object_id
            path = ReasoningPath(node_ids=[e.subject_id, e.object_id], edge_ids=[e.id], mode="deductive", score=e.confidence)
            if e.predicate == Predicate.MAY_BE_CANDIDATE_FOR:
                stmt = (f"{subj} may be a drug-repurposing candidate for {obj}, "
                        f"via a shared protein target on a disease-critical pathway.")
                htype = "drug_repurposing"
            else:
                stmt = e.properties.get("rationale", f"Inferred relationship between {subj} and {obj} ({e.predicate}).")
                htype = "topological_inference"
            
            hyp = Hypothesis(
                subject_id=e.subject_id,
                target_id=e.object_id,
                predicate=e.predicate,
                score=e.confidence,
                rationale=stmt,
                statement=stmt,
                hypothesis_type=htype,
                supporting_path=path,
                confidence=e.confidence,
            )
            hypotheses.append(hyp)
    return hypotheses
