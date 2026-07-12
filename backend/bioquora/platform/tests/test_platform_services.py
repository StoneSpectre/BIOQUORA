"""
Unit tests for Chapter 9 Semantic Platform Components and Service Responsibilities.
"""

from __future__ import annotations

from bioquora.platform.event_bus import (
    EventBus,
    TOPIC_CONFIDENCE_CHANGED,
    TOPIC_EDGE_ADDED,
    TOPIC_ENTITY_UPDATED,
    TOPIC_ONTOLOGY_VERSION,
    TOPIC_PUBLICATION_IMPORTED,
)
from bioquora.platform.services import (
    AuditService,
    EmbeddingService,
    EntityResolutionService,
    EvidenceService,
    IdentifierService,
    KnowledgeGraphService,
    OntologyService,
    ProvenanceService,
    ReasoningService,
    SearchService,
    VersionService,
)
from bioquora.reasoning.graph import KnowledgeGraph
from bioquora.reasoning.models import EntityType, GraphEdge, GraphNode, Predicate


def test_identifier_service():
    service = IdentifierService()
    id1 = service.mint("HGNC", "1100")
    id2 = service.mint("HGNC", "1100")
    assert id1 == id2  # Duplicate detection returns existing ID
    assert id1.startswith("HGNC:")
    assert service.resolve("HGNC", "1100") == id1


def test_ontology_service_and_event_bus():
    bus = EventBus()
    events_received = []
    bus.subscribe(TOPIC_ONTOLOGY_VERSION, lambda event: events_received.append(event))

    service = OntologyService(bus)
    service.ingest_version("MONDO", "v2026-07")
    assert len(events_received) == 1
    assert events_received[0].payload["ontology"] == "MONDO"
    assert events_received[0].payload["version"] == "v2026-07"

    service.add_relation("Acute Myocardial Infarction", "Myocardial Infarction")
    service.add_relation("Myocardial Infarction", "Heart Disease")
    assert "Heart Disease" in service.ancestors("Acute Myocardial Infarction")
    assert "Myocardial Infarction" in service.descendants("Heart Disease")

    assert service.validate_predicate("DRUG", Predicate.TREATS, "DISEASE") is True
    assert service.validate_predicate("DRUG", Predicate.IS_A, "GENE") is False


def test_entity_resolution_service():
    service = EntityResolutionService()
    service.register_synonym("Heart Attack", "MONDO:0005068")
    service.register_synonym("AMI", "MONDO:0005068_OLD")
    assert service.normalize("heart attack") == "MONDO:0005068"

    service.merge("MONDO:0005068", "MONDO:0005068_OLD", "Duplicate concept merge")
    assert service.normalize("ami") == "MONDO:0005068"
    assert len(service.merge_log) == 1


def test_knowledge_graph_and_evidence_services():
    bus = EventBus()
    events = []
    for topic in [TOPIC_ENTITY_UPDATED, TOPIC_EDGE_ADDED, TOPIC_CONFIDENCE_CHANGED, TOPIC_PUBLICATION_IMPORTED]:
        bus.subscribe(topic, lambda p, t=topic: events.append((t, p)))

    kg = KnowledgeGraph()
    kg_service = KnowledgeGraphService(kg, bus)
    ev_service = EvidenceService(kg, bus)

    n1 = GraphNode(id="DRG:01", name="Aspirin", type=EntityType.DRUG)
    n2 = GraphNode(id="DIS:01", name="Myocardial Infarction", type=EntityType.DISEASE)
    kg_service.upsert_node(n1)
    kg_service.upsert_node(n2)

    edge = GraphEdge(source_id="DRG:01", target_id="DIS:01", predicate=Predicate.TREATS, confidence=0.8)
    kg_service.add_edge(edge)
    kg_service.update_confidence(edge.id, 0.95)

    ev = ev_service.add_publication_evidence(edge.id, "PMID:123456", "Aspirin reduces MI risk.", supports=True)
    supp_ev = ev_service.supporting_publications(edge.id)
    assert len(supp_ev) == 1
    assert supp_ev[0].id == ev.id
    assert len(kg_service.neighbors("DRG:01")) == 1

    topics_seen = {t for t, _ in events}
    assert {TOPIC_ENTITY_UPDATED, TOPIC_EDGE_ADDED, TOPIC_CONFIDENCE_CHANGED, TOPIC_PUBLICATION_IMPORTED}.issubset(topics_seen)

    # Test wildcard (*) subscriber and Event repr
    wildcard_events = []
    bus.subscribe("*", lambda e: wildcard_events.append(e))
    ev_obj = bus.publish("test.topic", {"key": "val"})
    assert len(wildcard_events) == 1
    assert wildcard_events[0].topic == "test.topic"
    assert "<Event test.topic @" in repr(ev_obj)


def test_embedding_and_search_services():
    embed = EmbeddingService()
    vec1 = embed.embed("Breast Cancer")
    vec2 = embed.embed("Breast Cancer")
    assert vec1 == vec2
    assert len(vec1) == EmbeddingService.DIM
    assert embed.cosine(vec1, vec1) == 1.0

    kg = KnowledgeGraph()
    n1 = GraphNode(id="N1", name="Breast Cancer", type=EntityType.DISEASE)
    n2 = GraphNode(id="N2", name="Lung Cancer", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)

    search = SearchService(kg, embed)
    lex_hits = search.lexical("breast")
    assert len(lex_hits) == 1 and lex_hits[0].id == "N1"

    vec_hits = search.vector("Breast Cancer")
    assert vec_hits[0][0].id == "N1"

    hybrid_hits = search.hybrid("Breast Cancer", alpha=0.5)
    assert len(hybrid_hits) == 2
    assert hybrid_hits[0][0].id == "N1"


def test_reasoning_provenance_version_audit_services():
    kg = KnowledgeGraph()
    n1 = GraphNode(id="G:01", name="BRCA1", type=EntityType.GENE)
    n2 = GraphNode(id="D:01", name="Breast Cancer", type=EntityType.DISEASE)
    kg.add_node(n1)
    kg.add_node(n2)
    kg.add_edge(GraphEdge(source_id="G:01", target_id="D:01", predicate=Predicate.ASSOCIATED_WITH))

    reasoning = ReasoningService(kg)
    inferred = reasoning.engine.infer_relationships("G:01", "D:01")
    assert len(inferred) == 1

    prov = ProvenanceService()
    prov.record("G:01", source="HGNC", curator="auto-pipeline")
    assert len(prov.history("G:01")) == 1
    assert prov.history("G:01")[0]["source"] == "HGNC"

    version = VersionService()
    version.bump("ontology", "v1.2.0")
    manifest = version.release_manifest()
    assert manifest["ontology"] == "v1.2.0"
    assert "released_at" in manifest

    audit = AuditService()
    audit.record("curator_1", "MERGE_ENTITY", "MONDO:0005068", {"dropped": "MONDO:OLD"})
    assert len(audit.log) == 1
    assert audit.log[0]["actor"] == "curator_1"
