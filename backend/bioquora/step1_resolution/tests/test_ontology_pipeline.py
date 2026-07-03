"""
Tests for the Chapter 4 Ontology Integration Pipeline
"""

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from bioquora.step1_resolution.models import Base, EntityType, CanonicalEntity, Relationship, OntologyMembership
from bioquora.step1_resolution.graph.store import KnowledgeGraphStore
from bioquora.step1_resolution.ontology.registry import OntologyRegistry
from bioquora.step1_resolution.ontology.parser import parse_obo, extract_relationships
from bioquora.step1_resolution.ontology.pipeline import OntologyIntegrationPipeline


SAMPLE_OBO = """
format-version: 1.2
ontology: mondo

[Term]
id: MONDO:0000001
name: disease or disorder
def: "An abnormal condition of an organism." [PMID:12345]
synonym: "disorder" EXACT []
synonym: "medical condition" BROAD []
xref: DOID:4
xref: MeSH:D004194

[Term]
id: MONDO:0007254
name: breast cancer
def: "A malignant neoplasm of the breast." [PMID:67890]
synonym: "mammary cancer" EXACT []
synonym: "breast tumor" BROAD []
xref: DOID:1612
xref: MeSH:D001943
is_a: MONDO:0000001 ! disease or disorder
relationship: PART_OF MONDO:0000001 ! anatomical entity

[Term]
id: MONDO:9999999
name: obsolete disease
def: "An obsolete concept." []
is_obsolete: true
"""


@pytest.fixture
def db_session():
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def test_obo_parser():
    concepts = parse_obo(SAMPLE_OBO, "MONDO", EntityType.DISEASE, "2024-01-01")
    # Obsolete concept should be skipped
    assert len(concepts) == 2
    
    c1 = concepts[0]
    assert c1.native_id == "MONDO:0000001"
    assert c1.label == "disease or disorder"
    assert len(c1.synonyms) == 2
    assert len(c1.xrefs) == 2
    assert c1.xrefs[0].ontology == "DOID"
    assert c1.xrefs[0].id == "DOID:4"

    c2 = concepts[1]
    assert c2.native_id == "MONDO:0007254"
    assert c2.label == "breast cancer"
    assert c2.definition == "A malignant neoplasm of the breast."

    rels = extract_relationships(SAMPLE_OBO)
    assert len(rels) == 2
    assert ("MONDO:0007254", "IS_A", "MONDO:0000001") in rels
    assert ("MONDO:0007254", "PART_OF", "MONDO:0000001") in rels


def test_ontology_registry():
    reg = OntologyRegistry()
    meta = reg.get("MONDO")
    assert meta is not None
    assert meta.full_name == "Mondo Disease Ontology"
    
    reg.mark_imported("MONDO", concepts=100, relationships=50, coverage=95.5)
    meta = reg.get("MONDO")
    assert meta.imported_concepts == 100
    assert meta.imported_relationships == 50
    assert meta.coverage == 95.5
    assert meta.status == "IMPORTED"


def test_ontology_integration_pipeline_lifecycle(db_session):
    store = KnowledgeGraphStore(db_session)
    registry = OntologyRegistry(db_session)
    pipeline = OntologyIntegrationPipeline(store, registry)

    # First integration run: should create new entities and relationships
    result = pipeline.integrate(SAMPLE_OBO, "MONDO", EntityType.DISEASE, "2024-01-01")
    db_session.commit()

    assert result["status"] == "SUCCESS"
    assert result["concepts_processed"] == 2
    assert result["entities_created"] == 2
    assert result["entities_resolved_to_existing"] == 0
    assert result["relationships_asserted"] == 2
    assert result["graph_coverage_pct"] == 0.0

    # Verify entities in store
    bq1 = store.resolve_ontology_concept("MONDO", "MONDO:0000001")
    bq2 = store.resolve_ontology_concept("MONDO", "MONDO:0007254")
    assert bq1 is not None and bq1.startswith("BQ:DIS")
    assert bq2 is not None and bq2.startswith("BQ:DIS")

    entity1 = store.get_entity(bq1)
    entity2 = store.get_entity(bq2)
    assert entity1.preferred_label == "Disease Or Disorder"
    assert entity2.preferred_label == "Breast Cancer"

    # Verify external ID proxy and setdefault behavior
    assert entity2.external_ids["MONDO"] == "MONDO:0007254"
    assert entity2.external_ids["DOID"] == "DOID:1612"

    # Verify provenance record
    assert len(entity2.provenance) == 1
    assert entity2.provenance[0].mapped_from_database == "MONDO"
    assert entity2.provenance[0].original_identifier == "MONDO:0007254"

    # Verify relationships in DB
    rels = db_session.query(Relationship).all()
    assert len(rels) == 2
    subjects = [r.subject_id for r in rels]
    assert bq2 in subjects

    # Second integration run: should resolve to existing entities without duplicating
    result2 = pipeline.integrate(SAMPLE_OBO, "MONDO", EntityType.DISEASE, "2024-01-01")
    db_session.commit()

    assert result2["entities_created"] == 0
    assert result2["entities_resolved_to_existing"] == 2
    assert result2["graph_coverage_pct"] == 100.0
    
    # Total entity count in DB should remain 2
    all_entities = db_session.query(CanonicalEntity).all()
    assert len(all_entities) == 2
