import pytest
from bioquora.kg import (
    EntityType, Predicate, Node, Edge, Evidence, EvidenceType, Provenance, Confidence,
    BioquoraStore, BioquoraKnowledgeGraph, GraphValidationError, BioquoraQueryPipeline, Intent,
)


def test_kg_models():
    conf = Confidence(value=0.95, level="HIGH", evidence_count=3)
    prov = Provenance(created_by="test_pipeline", source="TestBioquora")
    ev = Evidence(id="EV_001", evidence_type=EvidenceType.PUBLICATION, source="PubMed", pmid="12345678", confidence=conf)

    node = Node(
        id="BQ:DIS000001",
        entity_type=EntityType.DISEASE,
        name="Breast Cancer",
        description="Malignant tumor of the breast.",
        synonyms=["breast carcinoma", "mammary carcinoma"],
        external_ids={"MONDO": "0007254", "DOID": "1612"},
        confidence=conf,
        provenance=prov,
    )
    assert node.id == "BQ:DIS000001"
    assert node.entity_type == EntityType.DISEASE
    assert "breast carcinoma" in node.synonyms

    edge = Edge(
        source_id="BQ:GEN000001",
        target_id="BQ:DIS000001",
        predicate=Predicate.ASSOCIATED_WITH,
        confidence=conf,
        evidence=[ev],
        provenance=prov,
    )
    assert edge.source_id == "BQ:GEN000001"
    assert edge.predicate == Predicate.ASSOCIATED_WITH
    assert len(edge.evidence) == 1


def test_bioquora_store_and_graph():
    graph = BioquoraKnowledgeGraph(db_path=":memory:")

    node1 = Node(id="BQ:GEN000100", entity_type=EntityType.GENE, name="BRCA1")
    node2 = Node(id="BQ:DIS000100", entity_type=EntityType.DISEASE, name="Breast Carcinoma")

    assert graph.add_node(node1)
    assert graph.add_node(node2)

    retrieved1 = graph.get_node("BQ:GEN000100")
    assert retrieved1 is not None
    assert retrieved1.name == "BRCA1"

    edge = Edge(source_id="BQ:GEN000100", target_id="BQ:DIS000100", predicate=Predicate.CAUSES)
    assert graph.add_edge(edge)

    edges = graph.get_edges(source_id="BQ:GEN000100")
    assert len(edges) == 1
    assert edges[0].target_id == "BQ:DIS000100"
    assert edges[0].predicate == Predicate.CAUSES.value

    neighbors = graph.get_neighbors("BQ:GEN000100")
    assert len(neighbors) == 1
    assert neighbors[0][1].id == "BQ:DIS000100"

    # Test validation error on self-loops
    self_edge = Edge(source_id="BQ:GEN000100", target_id="BQ:GEN000100", predicate=Predicate.INTERACTS_WITH)
    with pytest.raises(GraphValidationError):
        graph.add_edge(self_edge)


def test_query_pipeline():
    graph = BioquoraKnowledgeGraph(db_path=":memory:")
    pipeline = BioquoraQueryPipeline(graph)

    assert pipeline.classify_intent("Does BRCA1 contradict TP53?") == Intent.CONTRADICTION_SEARCH
    assert pipeline.classify_intent("What is the path between BRCA1 and Breast Cancer?") == Intent.PATH_FINDING
    assert pipeline.classify_intent("What causes breast carcinoma?") == Intent.RELATIONSHIP_TRAVERSAL
    assert pipeline.classify_intent("What is BRCA1?") == Intent.ENTITY_LOOKUP

    res = pipeline.execute("What causes breast cancer?")
    assert res.intent == Intent.RELATIONSHIP_TRAVERSAL
