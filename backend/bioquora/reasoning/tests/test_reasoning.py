"""
Unit tests for Chapter 8 and Chapter 9 Reasoning Layer (KnowledgeGraph, BiomedicalReasoningEngine, models, rules).
"""

from __future__ import annotations

import pytest
from bioquora.reasoning import (
    BBREQuery,
    BiomedicalReasoningEngine,
    EntityType,
    Evidence,
    EvidenceSource,
    Explanation,
    GraphEdge,
    GraphNode,
    HumanReviewQueue,
    Hypothesis,
    HypothesisStatus,
    KnowledgeGraph,
    Predicate,
    QueryIntent,
    ReasoningPath,
    VALID_RULES,
    bridge_entities,
    citation_correctness,
    detect_communities,
    evidence_completeness,
    generate_hypotheses,
    hub_entities,
    infer_candidate_links,
    multi_hop_accuracy,
    path_validity_rate,
    similarity,
    snapshot_as_of,
    timeline,
    uncertainty_report,
)


def test_reasoning_models_and_kwargs():
    ev = Evidence(
        source=EvidenceSource.PUBLICATION,
        source_id="PMID:999",
        statement="Test statement",
        supports=True,
        custom_key="custom_val",
    )
    assert ev.metadata["custom_key"] == "custom_val"
    assert ev.id.startswith("EV:")

    node = GraphNode(id="N1", name="Aspirin", type="DRUG", foo="bar")
    assert node.type == EntityType.DRUG
    assert node.properties["foo"] == "bar"

    edge = GraphEdge(source_id="N1", target_id="N2", predicate="TREATS", weight=0.9)
    assert edge.predicate == Predicate.TREATS
    assert edge.properties["weight"] == 0.9


def test_valid_rules():
    assert ("DRUG", Predicate.TREATS, "DISEASE") in VALID_RULES
    assert ("DRUG", "TREATS", "DISEASE") in VALID_RULES
    assert (EntityType.DRUG, Predicate.TREATS, EntityType.DISEASE) in VALID_RULES
    assert ("GENE", Predicate.EXPRESSES, "PROTEIN") in VALID_RULES
    assert ("INVALID_SUBJ", Predicate.TREATS, "DISEASE") not in VALID_RULES


def test_reasoning_engine_helpers():
    kg = KnowledgeGraph()
    n1 = GraphNode(id="A", name="Gene A", type=EntityType.GENE)
    n2 = GraphNode(id="B", name="Protein B", type=EntityType.PROTEIN)
    n3 = GraphNode(id="C", name="Disease C", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)
    kg.add_node(n3)

    e1 = GraphEdge(source_id="A", target_id="B", predicate=Predicate.EXPRESSES)
    e2 = GraphEdge(source_id="B", target_id="C", predicate=Predicate.ASSOCIATED_WITH)
    e3 = GraphEdge(source_id="A", target_id="C", predicate=Predicate.CONTRADICTS)
    kg.add_edge(e1)
    kg.add_edge(e2)
    kg.add_edge(e3)

    engine = BiomedicalReasoningEngine(kg)
    inferred = engine.infer_relationships("A", "B")
    assert len(inferred) == 1
    assert inferred[0].predicate == Predicate.EXPRESSES

    path = engine.find_path("A", "C")
    assert path in (["A", "C"], ["A", "B", "C"])

    assert engine.check_contradiction("A", "C") is True
    assert engine.check_contradiction("C", "A") is True
    assert engine.check_contradiction("A", "B") is False


def test_bbre_pipeline_mechanism_and_multihop():
    kg = KnowledgeGraph()
    drg = GraphNode(id="DRG:01", name="Aspirin", type=EntityType.DRUG)
    gen = GraphNode(id="GEN:01", name="PTGS1", type=EntityType.GENE)
    dis = GraphNode(id="DIS:01", name="Thrombosis", type=EntityType.DISEASE)
    kg.add_node(drg)
    kg.add_node(gen)
    kg.add_node(dis)

    kg.add_edge(GraphEdge(source_id="DRG:01", target_id="GEN:01", predicate=Predicate.TARGETS, confidence=0.9))
    kg.add_edge(GraphEdge(source_id="GEN:01", target_id="DIS:01", predicate=Predicate.ASSOCIATED_WITH, confidence=0.8))

    engine = BiomedicalReasoningEngine(kg)

    q_mech = BBREQuery(
        text="Why does Aspirin treat Thrombosis?",
        intent=QueryIntent.MECHANISM,
        subject_id="DRG:01",
        end_type="DISEASE",
    )
    exp = engine.run(q_mech)
    assert isinstance(exp, Explanation)
    assert "Aspirin" in exp.summary and "Thrombosis" in exp.summary
    assert len(exp.path) == 3  # DRG:01 -> GEN:01 -> DIS:01

    q_multi = BBREQuery(
        text="Which drugs target genes associated with Thrombosis?",
        intent=QueryIntent.MULTI_HOP,
        subject_id="DRG:01",
        end_type="DISEASE",
    )
    exps = engine.run(q_multi)
    assert isinstance(exps, list)
    assert len(exps) >= 1
    assert isinstance(exps[0], Explanation)


def test_bbre_pipeline_differential_and_counterfactual():
    kg = KnowledgeGraph()
    sym = GraphNode(id="SYM:01", name="Chest Pain", type=EntityType.SYMPTOM)
    dis1 = GraphNode(id="DIS:01", name="Myocardial Infarction", type=EntityType.DISEASE)
    dis2 = GraphNode(id="DIS:02", name="Gastroesophageal Reflux", type=EntityType.DISEASE)
    pth = GraphNode(id="PTH:01", name="Coagulation Cascade", type=EntityType.PATHWAY)
    gen = GraphNode(id="GEN:02", name="F2", type=EntityType.GENE)

    kg.add_node(sym)
    kg.add_node(dis1)
    kg.add_node(dis2)
    kg.add_node(pth)
    kg.add_node(gen)

    kg.add_edge(GraphEdge(source_id="DIS:01", target_id="SYM:01", predicate=Predicate.ASSOCIATED_WITH, confidence=0.9))
    kg.add_edge(GraphEdge(source_id="DIS:02", target_id="SYM:01", predicate=Predicate.ASSOCIATED_WITH, confidence=0.6))
    kg.add_edge(GraphEdge(source_id="PTH:01", target_id="GEN:02", predicate=Predicate.PART_OF, confidence=0.95))

    engine = BiomedicalReasoningEngine(kg)

    q_diff = BBREQuery(text="What causes chest pain?", intent=QueryIntent.DIFFERENTIAL, symptom_ids=["SYM:01"])
    diff_res = engine.run(q_diff)
    assert len(diff_res) == 2
    assert diff_res[0][0] == "DIS:01"  # Higher confidence ranked first

    q_cf = BBREQuery(text="What if coagulation is inhibited?", intent=QueryIntent.COUNTERFACTUAL, pathway_id="PTH:01")
    cf_res = engine.run(q_cf)
    assert cf_res["status"] == "INHIBITED"
    assert "GEN:02" in cf_res["affected_nodes"]


def test_bbre_hypothesis_generation():
    kg = KnowledgeGraph()
    drg = GraphNode(id="DRG:10", name="Drug X", type=EntityType.DRUG)
    dis = GraphNode(id="DIS:10", name="Disease Y", type=EntityType.DISEASE)
    gen = GraphNode(id="GEN:10", name="Gene Z", type=EntityType.GENE)
    kg.add_node(drg)
    kg.add_node(dis)
    kg.add_node(gen)

    kg.add_edge(GraphEdge(source_id="DRG:10", target_id="DIS:10", predicate=Predicate.TREATS, confidence=0.9))
    kg.add_edge(GraphEdge(source_id="GEN:10", target_id="DIS:10", predicate=Predicate.ASSOCIATED_WITH, confidence=0.85))

    engine = BiomedicalReasoningEngine(kg)
    hyps = engine.generate_hypotheses()
    assert len(hyps) >= 1
    assert isinstance(hyps[0], Hypothesis)
    assert hyps[0].subject_id == "DRG:10" and hyps[0].target_id == "GEN:10"
    assert hyps[0].predicate == Predicate.TARGETS


def test_explanation_and_human_review():
    kg = KnowledgeGraph()
    n1 = GraphNode(id="A", name="Gene A", type=EntityType.GENE)
    n2 = GraphNode(id="B", name="Disease B", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)
    e1 = GraphEdge(source_id="A", target_id="B", predicate=Predicate.ASSOCIATED_WITH, confidence=0.85, inferred=True)
    kg.add_edge(e1)

    rpath = ReasoningPath(node_ids=["A", "B"], edge_ids=[e1.id])
    from bioquora.reasoning import build_explanation
    exp = build_explanation(kg, "Why A associated with B?", rpath)
    assert "Gene A -> Disease B" in exp.answer
    assert any("inferred" in lim for lim in exp.limitations)
    assert exp.evidence_summary is not None
    
    rep = uncertainty_report(exp.evidence_summary)
    assert "Recommendation:" in rep

    queue = HumanReviewQueue()
    hyp = Hypothesis(subject_id="A", target_id="B", predicate=Predicate.TARGETS, score=0.8, rationale="Test")
    queue.submit(hyp)
    assert hyp.status == HypothesisStatus.UNDER_REVIEW
    reviewed = queue.review(hyp.id, accept=True, reviewer="Dr. Smith", notes="Looks solid")
    assert reviewed.status == HypothesisStatus.ACCEPTED
    assert len(queue.accepted()) == 1


def test_temporal_reasoning():
    from datetime import date
    kg = KnowledgeGraph()
    n1 = GraphNode(id="X", name="Gene X", type=EntityType.GENE)
    n2 = GraphNode(id="Y", name="Disease Y", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)

    e1 = GraphEdge(source_id="X", target_id="Y", predicate=Predicate.ASSOCIATED_WITH, discovered_date=date(2010, 1, 15))
    e2 = GraphEdge(source_id="X", target_id="Y", predicate=Predicate.ASSOCIATED_WITH, discovered_date=date(2020, 5, 20))
    e3 = GraphEdge(source_id="X", target_id="Y", predicate=Predicate.ASSOCIATED_WITH, discovered_date=date(2005, 3, 10), deprecated=True)
    kg.add_edge(e1)
    kg.add_edge(e2)
    kg.add_edge(e3)

    snap_2015 = snapshot_as_of(kg, date(2015, 1, 1))
    assert len(snap_2015) == 1
    assert snap_2015[0].id == e1.id

    tl = timeline(kg, "X", "Y")
    assert len(tl) == 3
    assert tl[0].discovered_date == date(2005, 3, 10)
    assert tl[1].discovered_date == date(2010, 1, 15)
    assert tl[2].discovered_date == date(2020, 5, 20)


def test_evaluation_metrics():
    kg = KnowledgeGraph()
    n1 = GraphNode(id="N1", name="Node 1", type=EntityType.GENE)
    n2 = GraphNode(id="N2", name="Node 2", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)

    ev = Evidence(id="EV:01", source_id="PMID:12345", statement="Associated", source=EvidenceSource.PUBLICATION, confidence=0.9, snippet="Supporting text")
    kg.add_evidence(ev)

    e1 = GraphEdge(source_id="N1", target_id="N2", predicate=Predicate.ASSOCIATED_WITH, evidence_ids=["EV:01"])
    kg.add_edge(e1)

    rpath = ReasoningPath(node_ids=["N1", "N2"], edge_ids=[e1.id])
    assert path_validity_rate(kg, [rpath]) == 1.0
    assert evidence_completeness(kg, rpath) == 1.0

    from bioquora.reasoning import build_explanation
    exp = build_explanation(kg, "Test query", rpath)
    assert citation_correctness(kg, exp) == 1.0

    assert multi_hop_accuracy([rpath], {"N2"}) == 1.0


def test_graph_intelligence_and_link_prediction():
    kg = KnowledgeGraph()
    d1 = GraphNode(id="DRG:01", name="Drug Aspirin", type=EntityType.DRUG)
    p1 = GraphNode(id="PRT:01", name="Protein COX2", type=EntityType.PROTEIN)
    dis1 = GraphNode(id="DIS:01", name="Disease Inflammation", type=EntityType.DISEASE)
    kg.add_node(d1)
    kg.add_node(p1)
    kg.add_node(dis1)

    e1 = GraphEdge(source_id="DRG:01", target_id="PRT:01", predicate=Predicate.TARGETS, confidence=0.9)
    e2 = GraphEdge(source_id="PRT:01", target_id="DIS:01", predicate=Predicate.CRITICAL_FOR, confidence=0.85)
    kg.add_edge(e1)
    kg.add_edge(e2)

    inferred = infer_candidate_links(kg, min_confidence=0.5)
    assert len(inferred) >= 1
    assert inferred[0].predicate == Predicate.MAY_BE_CANDIDATE_FOR
    assert inferred[0].inferred is True

    hyps = generate_hypotheses(kg, inferred)
    assert len(hyps) >= 1
    assert "drug-repurposing candidate" in hyps[0].statement

    hubs = hub_entities(kg, top_k=2)
    assert len(hubs) > 0

    bridges = bridge_entities(kg, top_k=2)
    assert len(bridges) > 0

    comm = detect_communities(kg)
    assert len(comm) > 0

    sim = similarity(kg, "DRG:01", "DIS:01")
    assert sim >= 0.0


def test_chapter_8_4_reasoning_modes():
    from bioquora.reasoning import deductive, inductive, abductive, analogical, causal, counterfactual
    kg = KnowledgeGraph()
    d1 = GraphNode(id="DRG:100", name="Drug A", type=EntityType.DRUG)
    p1 = GraphNode(id="PRT:100", name="Protein B", type=EntityType.PROTEIN)
    dis1 = GraphNode(id="DIS:100", name="Disease C", type=EntityType.DISEASE)
    sym1 = GraphNode(id="SYM:100", name="Symptom D", type=EntityType.SYMPTOM)
    g1 = GraphNode(id="GEN:100", name="Gene E", type=EntityType.GENE)
    g2 = GraphNode(id="GEN:101", name="Gene F", type=EntityType.GENE)
    pth1 = GraphNode(id="PTH:100", name="Pathway G", type=EntityType.PATHWAY)

    for n in [d1, p1, dis1, sym1, g1, g2, pth1]:
        kg.add_node(n)

    kg.add_edge(GraphEdge(source_id="DRG:100", target_id="PRT:100", predicate=Predicate.TARGETS, confidence=0.9))
    kg.add_edge(GraphEdge(source_id="PRT:100", target_id="DIS:100", predicate=Predicate.CRITICAL_FOR, confidence=0.8))
    kg.add_edge(GraphEdge(source_id="DIS:100", target_id="SYM:100", predicate=Predicate.ASSOCIATED_WITH, confidence=0.85))
    kg.add_edge(GraphEdge(source_id="GEN:100", target_id="GEN:101", predicate=Predicate.SIMILAR_TO, confidence=0.75))
    kg.add_edge(GraphEdge(source_id="GEN:101", target_id="DIS:100", predicate=Predicate.CAUSES, confidence=0.9))
    kg.add_edge(GraphEdge(source_id="PTH:100", target_id="DIS:100", predicate=Predicate.CRITICAL_FOR, confidence=0.95))
    kg.add_edge(GraphEdge(source_id="DRG:100", target_id="DIS:100", predicate=Predicate.TREATS, confidence=0.88))

    # 1. Deductive
    ded_paths = deductive(kg, drug_id="DRG:100", disease_type="DISEASE")
    assert len(ded_paths) > 0
    assert ded_paths[0].mode == "deductive"

    # 2. Inductive
    ind_score = inductive(kg, "DRG:100", Predicate.TARGETS, "PRT:100")
    assert ind_score > 0.0

    # 3. Abductive
    abd_res = abductive(kg, ["SYM:100"])
    assert len(abd_res) > 0
    assert abd_res[0][0] == "DIS:100"

    # 4. Analogical
    ana_res = analogical(kg, "GEN:100")
    assert len(ana_res) > 0
    assert ana_res[0][0] == "DIS:100"

    # 5. Causal
    cau_paths = causal(kg, subject_id="DRG:100", end_type="DISEASE")
    assert len(cau_paths) > 0
    assert cau_paths[0].mode == "causal"

    # 6. Counterfactual
    cf_res = counterfactual(kg, "PTH:100")
    assert "predicted_affected_diseases" in cf_res
    assert "DIS:100" in cf_res["predicted_affected_diseases"]
    assert "existing_drugs_targeting_downstream_disease" in cf_res
    assert "DRG:100" in cf_res["existing_drugs_targeting_downstream_disease"]
