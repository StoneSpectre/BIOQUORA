"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1
============================================
models.py

Implements, as a physical schema, the conceptual objects defined in:
  - Part 1: Semantic Layer & Biomedical Knowledge Representation
            (Chapter 1 - Vision, Chapter 2 - Entity Taxonomy)
  - Part 2: Biomedical Identifier Systems & Canonical Entity Resolution
            (Chapter 3 - Identifiers, Cross-References, Synonyms,
             Evidence, Provenance, Versioning, Confidence)

Design notes (upgrade paths, called out explicitly per project convention):
  - Uses SQLAlchemy 2.0 declarative mapping with typed columns.
  - JSON columns use SQLAlchemy's generic JSON type so this schema runs
    identically on SQLite (dev/test) and PostgreSQL (prod). In prod, swap
    to `sqlalchemy.dialects.postgresql.JSONB` for indexed JSON querying.
  - No ORM-level cascading deletes on historical/provenance tables —
    Principle 5 ("knowledge changes, nothing is overwritten") means
    provenance and version rows must survive entity merges/deprecation.
  - Vector embeddings for semantic similarity (Chapter 3, Entity
    Resolution Pipeline step "Semantic Similarity") are deliberately
    NOT stored here as native pgvector columns yet — see
    `resolution_pipeline.py::semantic_similarity` for the stub and the
    upgrade path to pgvector / a dedicated vector store.
"""

from __future__ import annotations

import enum
import uuid
from dataclasses import dataclass, field
from datetime import datetime, timezone

from sqlalchemy import (
    Boolean,
    Enum,
    Float,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import (
    DeclarativeBase,
    Mapped,
    mapped_column,
    relationship,
)

try:
    from api.core.database import Base
except ImportError:
    class Base(DeclarativeBase):
        pass


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Chapter 2 / Chapter 3 — Namespace & Entity Type Taxonomy
# ---------------------------------------------------------------------------
# One namespace per BQ:<TYPE> prefix (Chapter 3, "Namespace Design").
# Every namespace maps to exactly one Level-N category from the Chapter 2
# entity hierarchy (Biological / Clinical / Research / Infrastructure).

class EntityNamespace(str, enum.Enum):
    DIS = "DIS"  # Disease
    GEN = "GEN"  # Gene
    PRO = "PRO"  # Protein
    CHE = "CHE"  # Chemical
    DRG = "DRG"  # Drug
    VAR = "VAR"  # Variant
    PTH = "PTH"  # Pathway
    CEL = "CEL"  # Cell / Cell Type
    TIS = "TIS"  # Tissue
    ORG = "ORG"  # Organ
    PUB = "PUB"  # Publication
    AUT = "AUT"  # Author
    INS = "INS"  # Institution
    TRL = "TRL"  # Clinical Trial
    IMG = "IMG"  # Medical Image
    DAT = "DAT"  # Dataset


# Chapter 2 hierarchy — used by seed_taxonomy.py and by the entity-type
# detector in the resolution pipeline. Kept as a plain dict (not a table)
# because it's a fixed taxonomy the platform defines, not user data.
ENTITY_TAXONOMY: dict[str, dict] = {
    "Biological": {
        "Gene": EntityNamespace.GEN,
        "Protein": EntityNamespace.PRO,
        "Variant": EntityNamespace.VAR,
        "Cell": EntityNamespace.CEL,
        "Tissue": EntityNamespace.TIS,
        "Organ": EntityNamespace.ORG,
    },
    "Clinical": {
        "Disease": EntityNamespace.DIS,
        "Symptom": EntityNamespace.DIS,  # phenotype/symptom share the Disease/Phenotype axis
        "Drug": EntityNamespace.DRG,
        "Procedure": EntityNamespace.TRL,  # placeholder namespace until Procedure gets its own
        "Laboratory Test": EntityNamespace.TRL,
        "Clinical Trial": EntityNamespace.TRL,
    },
    "Research": {
        "Publication": EntityNamespace.PUB,
        "Dataset": EntityNamespace.DAT,
        "Model": EntityNamespace.DAT,
        "Benchmark": EntityNamespace.DAT,
    },
    "Infrastructure": {
        "Ontology": None,
        "Identifier System": None,
        "Organization": EntityNamespace.INS,
        "Repository": EntityNamespace.DAT,
    },
}


class EntityStatus(str, enum.Enum):
    ACTIVE = "active"
    MERGED = "merged"          # superseded by another canonical entity
    DEPRECATED = "deprecated"  # withdrawn (e.g. retracted disease concept)
    PENDING_REVIEW = "pending_review"  # awaiting human curator sign-off


class SynonymType(str, enum.Enum):
    """Chapter 3, 'Synonym Resolution' — synonyms are categorized, not
    treated as equally authoritative."""
    PREFERRED = "preferred"
    EXACT = "exact"
    BROAD = "broad"
    NARROW = "narrow"
    ABBREVIATION = "abbreviation"
    HISTORICAL = "historical"
    LAY = "lay"
    LAYPERSON = "layperson"
    INTERNATIONAL = "international"
    RELATED = "related"
    MULTILINGUAL = "multilingual"


class EvidenceLevel(str, enum.Enum):
    """Chapter 1, 'Evidence hierarchy'."""
    CLINICAL_GUIDELINE = "clinical_guideline"
    META_ANALYSIS = "meta_analysis"
    RCT = "rct"
    OBSERVATIONAL_STUDY = "observational_study"
    CASE_REPORT = "case_report"
    PRECLINICAL_STUDY = "preclinical_study"
    EXPERT_OPINION = "expert_opinion"


class ConfidenceSignalType(str, enum.Enum):
    """Chapter 3, 'Confidence Model' — retained as discrete signals so
    mappings can be audited, not a single opaque score."""
    EXACT_IDENTIFIER_MATCH = "exact_identifier_match"
    EXACT_LABEL_MATCH = "exact_label_match"
    ONTOLOGY_CROSS_REFERENCE = "ontology_cross_reference"
    SYNONYM_MATCH = "synonym_match"
    CONTEXTUAL_EVIDENCE = "contextual_evidence"
    SOURCE_AUTHORITY = "source_authority"
    PUBLICATION_SUPPORT = "publication_support"
    SEMANTIC_SIMILARITY = "semantic_similarity"


class ChangeType(str, enum.Enum):
    CREATE = "create"
    UPDATE = "update"
    MERGE = "merge"
    SPLIT = "split"
    SOURCE_UPDATE = "source_update"


def new_uuid() -> str:
    return str(uuid.uuid4())


# ---------------------------------------------------------------------------
# Core entity — the canonical Bioquora object (Chapter 1 "Canonical Entity
# Record" + Chapter 3 "Canonical Bioquora Identifier")
# ---------------------------------------------------------------------------

class BioquoraEntity(Base):
    """
    The canonical, internally-stable record for any biomedical concept.

    Primary key IS the BQ ID itself (format `BQ:<TYPE><ZERO-PADDED NUMBER>`,
    e.g. `BQ:DIS00001234`), generated by `id_generator.BQIdGenerator` —
    never hand-assigned, never reused, never mutated once issued.
    """
    __tablename__ = "bioquora_entities"

    bq_id: Mapped[str] = mapped_column(String(32), primary_key=True)
    namespace: Mapped[EntityNamespace] = mapped_column(Enum(EntityNamespace), nullable=False, index=True)
    entity_type: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    # e.g. "Disease", "Gene" — the Chapter 2 leaf category. Namespace can be
    # shared by multiple entity_type leaves (see ENTITY_TAXONOMY above).

    preferred_label: Mapped[str] = mapped_column(String(512), nullable=False, index=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)

    status: Mapped[EntityStatus] = mapped_column(
        Enum(EntityStatus), nullable=False, default=EntityStatus.PENDING_REVIEW
    )
    merged_into_id: Mapped[str | None] = mapped_column(
        String(32), ForeignKey("bioquora_entities.bq_id"), nullable=True
    )

    quality_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    confidence_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)

    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)
    updated_at: Mapped[datetime] = mapped_column(nullable=False, default=utcnow, onupdate=utcnow)

    # relationships
    external_ids: Mapped[list["ExternalIdentifier"]] = relationship(
        back_populates="entity", cascade="all, delete-orphan", foreign_keys="ExternalIdentifier.entity_id"
    )
    synonyms: Mapped[list["Synonym"]] = relationship(
        back_populates="entity", cascade="all, delete-orphan"
    )
    ontology_memberships: Mapped[list["OntologyMembership"]] = relationship(
        back_populates="entity", cascade="all, delete-orphan"
    )
    provenance_records: Mapped[list["ProvenanceRecord"]] = relationship(
        back_populates="entity"
        # NOTE: intentionally no cascade delete — provenance must outlive
        # the entity if it is merged/deprecated (Chapter 3 "Versioning").
    )
    versions: Mapped[list["EntityVersion"]] = relationship(back_populates="entity")
    evidence_records: Mapped[list["EvidenceRecord"]] = relationship(back_populates="entity")

    __table_args__ = (
        Index("ix_entity_type_label", "entity_type", "preferred_label"),
    )

    @property
    def external_identifiers(self) -> list["ExternalIdentifier"]:
        return self.external_ids

    def __repr__(self) -> str:  # pragma: no cover
        return f"<BioquoraEntity {self.bq_id} '{self.preferred_label}' ({self.entity_type})>"


# ---------------------------------------------------------------------------
# External Identifiers / Cross-References (Chapter 3, "Cross-Reference Engine")
# ---------------------------------------------------------------------------

class SourceDatabase(str, enum.Enum):
    """Extend freely — this is the open set of authoritative sources an
    external identifier can come from. Kept as a string enum rather than a
    lookup table for now; migrate to a `source_databases` table once the
    300+-database ingestion roadmap (steps 3+) starts registering sources
    dynamically with metadata (license, update cadence, trust tier)."""
    MONDO = "MONDO"
    DOID = "DOID"
    MESH = "MeSH"
    ICD11 = "ICD11"
    SNOMEDCT = "SNOMEDCT"
    NCIT = "NCIT"
    OMIM = "OMIM"
    HGNC = "HGNC"
    NCBI_GENE = "NCBI_Gene"
    ENSEMBL = "Ensembl"
    ENTREZ = "Entrez"
    UNIPROT = "UniProt"
    GO = "GO"
    REFSEQ_PROTEIN = "RefSeq_Protein"
    PDB = "PDB"
    ALPHAFOLD = "AlphaFoldDB"
    INTERPRO = "InterPro"
    DRUGBANK = "DrugBank"
    CHEMBL = "ChEMBL"
    RXNORM = "RxNorm"
    DRUGCENTRAL = "DrugCentral"
    PUBCHEM = "PubChem"
    CHEBI = "ChEBI"
    ATC = "ATC"
    CHEMSPIDER = "ChemSpider"
    CAS = "CAS"
    KEGG = "KEGG"
    CLINVAR = "ClinVar"
    DBSNP = "dbSNP"
    GNOMAD = "gnomAD"
    COSMIC = "COSMIC"
    CLINICALTRIALS_GOV = "ClinicalTrials.gov"
    WHO_ICTRP = "WHO_ICTRP"
    EU_CTR = "EU_CTR"
    PMID = "PMID"
    PMCID = "PMCID"
    DOI = "DOI"
    OPENALEX = "OpenAlex"
    CROSSREF = "Crossref"
    OTHER = "OTHER"


class ExternalIdentifier(Base):
    """
    One row = one mapping from a Bioquora entity to a single external
    identifier in a single external database. An entity typically has
    many rows here (Chapter 3 "Identifier Hierarchy" diagram).
    """
    __tablename__ = "external_identifiers"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    source_database: Mapped[SourceDatabase] = mapped_column(Enum(SourceDatabase), nullable=False, index=True)
    external_id: Mapped[str] = mapped_column(String(256), nullable=False, index=True)

    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)
    # "No conflicting primary mapping" (Chapter 3, Identifier Quality Rules)
    # is enforced in code (resolution_pipeline.conflict_detection), not by
    # a DB constraint, because "primary per source" is a business rule that
    # needs a clear conflict report rather than a silent DB rejection.

    mapping_confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    mapping_algorithm: Mapped[str | None] = mapped_column(String(128), nullable=True)
    import_version: Mapped[str | None] = mapped_column(String(64), nullable=True)
    mapped_date: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)
    reviewer: Mapped[str | None] = mapped_column(String(128), nullable=True)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="external_ids", foreign_keys=[entity_id])
    confidence_signals: Mapped[list["ConfidenceSignal"]] = relationship(
        back_populates="mapping", cascade="all, delete-orphan"
    )

    __table_args__ = (
        UniqueConstraint("source_database", "external_id", "entity_id", name="uq_source_external_entity"),
        Index("ix_source_external", "source_database", "external_id"),
    )


class ConfidenceSignal(Base):
    """
    Chapter 3 'Confidence Model' — a single contributing signal behind an
    ExternalIdentifier mapping's aggregate `mapping_confidence`. Storing
    these individually (rather than only the rolled-up score) is what
    makes mappings auditable: a curator can see *why* a mapping scored
    0.94 instead of trusting an opaque number.
    """
    __tablename__ = "confidence_signals"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    mapping_id: Mapped[str] = mapped_column(String(36), ForeignKey("external_identifiers.id"), nullable=False)

    signal_type: Mapped[ConfidenceSignalType] = mapped_column(Enum(ConfidenceSignalType), nullable=False)
    weight: Mapped[float] = mapped_column(Float, nullable=False)
    value: Mapped[float] = mapped_column(Float, nullable=False)  # normalized 0..1 raw signal strength
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)

    mapping: Mapped["ExternalIdentifier"] = relationship(back_populates="confidence_signals")


# ---------------------------------------------------------------------------
# Synonyms (Chapter 3, "Synonym Resolution")
# ---------------------------------------------------------------------------

class Synonym(Base):
    __tablename__ = "synonyms"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    term: Mapped[str] = mapped_column(String(512), nullable=False, index=True)
    normalized_term: Mapped[str] = mapped_column(String(512), nullable=False, index=True)
    # normalized_term = lowercased, punctuation-stripped, whitespace-collapsed
    # version of `term`; this is what candidate lookup actually matches on.

    synonym_type: Mapped[SynonymType] = mapped_column(Enum(SynonymType), nullable=False)
    language: Mapped[str] = mapped_column(String(8), nullable=False, default="en")
    source: Mapped[str | None] = mapped_column(String(128), nullable=True)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="synonyms")

    __table_args__ = (
        UniqueConstraint("entity_id", "normalized_term", "language", name="uq_entity_normalized_term_lang"),
        Index("ix_normalized_term", "normalized_term"),
    )


# ---------------------------------------------------------------------------
# Ontology Membership (Chapter 2 "Entity Design Rules": ontology source)
# ---------------------------------------------------------------------------

class OntologyMembership(Base):
    __tablename__ = "ontology_memberships"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    ontology_name: Mapped[str] = mapped_column(String(128), nullable=False)  # e.g. "MONDO", "Gene Ontology"
    ontology_term_id: Mapped[str] = mapped_column(String(128), nullable=False)  # e.g. "MONDO:0007254"
    is_primary: Mapped[bool] = mapped_column(Boolean, default=False)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="ontology_memberships")

    __table_args__ = (
        UniqueConstraint("entity_id", "ontology_name", "ontology_term_id", name="uq_entity_ontology_term"),
    )


# ---------------------------------------------------------------------------
# Evidence (Chapter 1 "Every statement requires evidence")
# ---------------------------------------------------------------------------

class EvidenceRecord(Base):
    __tablename__ = "evidence_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    # for relationship-level evidence (Drug TREATS Disease, etc.) see
    # `RelationshipEvidence` below, which points at a Relationship row
    # instead of an entity directly.

    evidence_level: Mapped[EvidenceLevel] = mapped_column(Enum(EvidenceLevel), nullable=False)
    source_publication_pmid: Mapped[str | None] = mapped_column(String(32), nullable=True)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    confidence_contribution: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="evidence_records")


# ---------------------------------------------------------------------------
# Provenance (Chapter 3, "Provenance" — full audit trail per mapping)
# ---------------------------------------------------------------------------

class ProvenanceRecord(Base):
    """
    Distinct from ExternalIdentifier: an ExternalIdentifier is the current
    *state* of a cross-reference; a ProvenanceRecord is an immutable
    *event* in that mapping's history. Nothing here is ever updated in
    place — corrections are new rows, per "nothing should be overwritten"
    (Chapter 3, Provenance).
    """
    __tablename__ = "provenance_records"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    mapped_from_database: Mapped[str] = mapped_column(String(128), nullable=False)
    original_identifier: Mapped[str] = mapped_column(String(256), nullable=False)
    import_version: Mapped[str | None] = mapped_column(String(64), nullable=True)
    mapping_algorithm: Mapped[str | None] = mapped_column(String(128), nullable=True)
    mapped_date: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)
    confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    reviewer: Mapped[str | None] = mapped_column(String(128), nullable=True)
    evidence_ref: Mapped[str | None] = mapped_column(String(256), nullable=True)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="provenance_records")


# ---------------------------------------------------------------------------
# Versioning (Chapter 3, "Versioning")
# ---------------------------------------------------------------------------

class EntityVersion(Base):
    __tablename__ = "entity_versions"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    entity_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    version_number: Mapped[int] = mapped_column(Integer, nullable=False)
    change_type: Mapped[ChangeType] = mapped_column(Enum(ChangeType), nullable=False)
    change_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    previous_snapshot: Mapped[dict | None] = mapped_column(JSON, nullable=True)
    changed_at: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)
    changed_by: Mapped[str | None] = mapped_column(String(128), nullable=True)

    entity: Mapped["BioquoraEntity"] = relationship(back_populates="versions")

    __table_args__ = (
        UniqueConstraint("entity_id", "version_number", name="uq_entity_version_number"),
    )


# ---------------------------------------------------------------------------
# Typed Relationships (Chapter 1, Principle 3: "Every relationship is typed")
# ---------------------------------------------------------------------------

class RelationType(str, enum.Enum):
    TREATS = "TREATS"
    CAUSES = "CAUSES"
    ASSOCIATED_WITH = "ASSOCIATED_WITH"
    TARGETS = "TARGETS"
    METABOLIZED_BY = "METABOLIZED_BY"
    ENCODES = "ENCODES"
    OCCURS_IN = "OCCURS_IN"
    FORMS = "FORMS"
    PARTICIPATES_IN = "PARTICIPATES_IN"
    INVOLVED_IN = "INVOLVED_IN"
    PRESENTS_WITH = "PRESENTS_WITH"
    HAS_STAGE = "HAS_STAGE"
    DIAGNOSED_WITH = "DIAGNOSED_WITH"
    MEASURES = "MEASURES"
    EVALUATES = "EVALUATES"
    TRAINED_ON = "TRAINED_ON"
    SUPPORTS = "SUPPORTS"


class Relationship(Base):
    __tablename__ = "relationships"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=new_uuid)
    subject_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    predicate: Mapped[RelationType] = mapped_column(Enum(RelationType), nullable=False)
    object_id: Mapped[str] = mapped_column(String(32), ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)

    confidence: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    source: Mapped[str | None] = mapped_column(String(128), nullable=True)
    version: Mapped[int] = mapped_column(Integer, nullable=False, default=1)
    created_at: Mapped[datetime] = mapped_column(nullable=False, default=utcnow)

    subject: Mapped["BioquoraEntity"] = relationship(foreign_keys=[subject_id])
    object: Mapped["BioquoraEntity"] = relationship(foreign_keys=[object_id])

    __table_args__ = (
        Index("ix_subject_predicate_object", "subject_id", "predicate", "object_id"),
    )


# ---------------------------------------------------------------------------
# BQ ID sequence counters (backs id_generator.BQIdGenerator)
# ---------------------------------------------------------------------------

class BQIdCounter(Base):
    """
    One row per namespace, holding the last-issued sequence number.
    A dedicated table (rather than SQL SEQUENCE objects) keeps ID issuance
    portable across SQLite/Postgres and lets id_generator use a row-level
    lock (`SELECT ... FOR UPDATE` on Postgres) for concurrency safety.
    """
    __tablename__ = "bq_id_counters"

    namespace: Mapped[EntityNamespace] = mapped_column(Enum(EntityNamespace), primary_key=True)
    last_value: Mapped[int] = mapped_column(Integer, nullable=False, default=0)


@dataclass
class IncomingRecord:
    """
    Standardized payload representing an incoming concept or record to be
    resolved against the Bioquora canonical entity graph.
    """
    raw_label: str
    source_database: str | SourceDatabase | None = None
    external_id: str | None = None
    native_ids: dict[str, str] = field(default_factory=dict)
    entity_type_hint: str | None = None
    synonyms: list[str] = field(default_factory=list)
    ontology_refs: list[tuple[str, str]] = field(default_factory=list)
    evidence_pmids: list[str] = field(default_factory=list)
    evidence_level: EvidenceLevel | None = None
    import_version: str | None = None
    reviewer: str | None = None
    context: str | None = None

    def __post_init__(self):
        # Automatically populate native_ids from external_id and ontology_refs if empty
        if not self.native_ids:
            if self.source_database and self.external_id:
                src = self.source_database.value if isinstance(self.source_database, enum.Enum) else str(self.source_database)
                self.native_ids[src] = self.external_id
            for ont, tid in self.ontology_refs:
                self.native_ids[ont] = tid

