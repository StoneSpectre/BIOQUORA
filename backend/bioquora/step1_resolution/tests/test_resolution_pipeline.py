"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
Tests for Entity Resolution Pipeline.
"""

import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from bioquora.step1_resolution.models import (
    Base,
    BioquoraEntity,
    EntityNamespace,
    EntityStatus,
    EvidenceLevel,
    SourceDatabase,
    Synonym,
    ExternalIdentifier,
)
from bioquora.step1_resolution.resolution_pipeline import (
    EntityResolutionPipeline,
    IncomingRecord,
    ConflictError,
)
from bioquora.step1_resolution.id_generator import BQIdGenerator


@pytest.fixture
def session():
    engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(engine)
    SessionLocal = sessionmaker(bind=engine)
    sess = SessionLocal()
    try:
        yield sess
        sess.commit()
    finally:
        sess.close()


def test_normalize_and_strip():
    raw = "  Alpha-1   Antitrypsin™ Deficiency®   "
    norm = EntityResolutionPipeline.normalize_text(raw)
    assert norm == "alpha 1 antitrypsin deficiency"

    cleaned = EntityResolutionPipeline.strip_formatting_variants("alpha-1 antitrypsin™ deficiency")
    assert cleaned == "a 1 antitrypsin deficiency" or "1 antitrypsin" in cleaned


def test_detect_entity_type(session):
    pipeline = EntityResolutionPipeline(session)
    
    rec_hint = IncomingRecord(
        raw_label="Diabetes Mellitus",
        source_database=SourceDatabase.MONDO,
        external_id="MONDO:0005015",
        entity_type_hint="Disease",
    )
    etype, ns = pipeline.detect_entity_type(rec_hint)
    assert etype == "Disease"
    assert ns == EntityNamespace.DIS

    rec_no_hint = IncomingRecord(
        raw_label="TP53",
        source_database=SourceDatabase.HGNC,
        external_id="HGNC:11998",
    )
    etype, ns = pipeline.detect_entity_type(rec_no_hint)
    assert etype == "Gene"
    assert ns == EntityNamespace.GEN


def test_pipeline_new_entity(session):
    pipeline = EntityResolutionPipeline(session)
    rec = IncomingRecord(
        raw_label="Essential Hypertension",
        source_database=SourceDatabase.MONDO,
        external_id="MONDO:0005044",
        entity_type_hint="Disease",
        synonyms=["High blood pressure", "HTN"],
        ontology_refs=[("UMLS", "C0020538"), ("DOID", "DOID:10763")],
        evidence_pmids=["12345678", "23456789"],
        evidence_level=EvidenceLevel.CLINICAL_GUIDELINE,
        import_version="2026-07-01",
        reviewer="suryansh_deo",
    )
    
    result = pipeline.resolve(rec)
    assert result.created_new_entity is True
    assert result.bq_id.startswith("BQ:DIS")
    assert BQIdGenerator.validate_format(result.bq_id)
    assert result.confidence.total > 0.0

    entity = session.get(BioquoraEntity, result.bq_id)
    assert entity is not None
    assert entity.preferred_label == "essential hypertension"
    assert len(entity.synonyms) == 2
    assert len(entity.ontology_memberships) == 2
    assert len(entity.evidence_records) == 2
    assert len(entity.external_identifiers) == 1
    assert entity.external_identifiers[0].external_id == "MONDO:0005044"


def test_pipeline_existing_entity_update(session):
    pipeline = EntityResolutionPipeline(session)
    rec1 = IncomingRecord(
        raw_label="Asthma",
        source_database=SourceDatabase.MONDO,
        external_id="MONDO:0004979",
        entity_type_hint="Disease",
        synonyms=["Bronchial asthma"],
    )
    res1 = pipeline.resolve(rec1)
    assert res1.created_new_entity is True

    # Ingest from another source with same concept name / synonym
    rec2 = IncomingRecord(
        raw_label="Bronchial asthma",
        source_database=SourceDatabase.SNOMEDCT,
        external_id="195967001",
        entity_type_hint="Disease",
        synonyms=["Asthma"],
    )
    res2 = pipeline.resolve(rec2)
    assert res2.created_new_entity is False
    assert res2.bq_id == res1.bq_id

    entity = session.get(BioquoraEntity, res1.bq_id)
    assert len(entity.external_identifiers) == 2
    assert entity.version == 2


def test_id_generator(session):
    gen = BQIdGenerator(session)
    assert gen.peek(EntityNamespace.DIS) == 0

    id1 = gen.next_id(EntityNamespace.DIS)
    assert id1 == "BQ:DIS00000001"
    assert gen.peek(EntityNamespace.DIS) == 1
    assert BQIdGenerator.validate_format(id1)
    assert BQIdGenerator.namespace_of(id1) == EntityNamespace.DIS

    id2 = gen.next_id(EntityNamespace.DIS)
    assert id2 == "BQ:DIS00000002"
    assert gen.peek(EntityNamespace.DIS) == 2

    id_gen = gen.next_id(EntityNamespace.GEN)
    assert id_gen == "BQ:GEN00000001"
    assert BQIdGenerator.validate_format("INVALID_ID") is False

