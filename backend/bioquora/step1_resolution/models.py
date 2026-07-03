"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
Models for Entity Resolution Pipeline.
"""

from __future__ import annotations

import enum
from datetime import datetime, timezone
from typing import List, Optional
from sqlalchemy import (
    Column,
    String,
    Integer,
    Float,
    Boolean,
    DateTime,
    ForeignKey,
    Enum as SQLEnum,
    Index,
)
from sqlalchemy.orm import relationship, declarative_base

try:
    from api.core.database import Base
except ImportError:
    Base = declarative_base()


def utcnow() -> datetime:
    return datetime.now(timezone.utc)


# ---------------------------------------------------------------------------
# Enums
# ---------------------------------------------------------------------------

class EntityNamespace(str, enum.Enum):
    DIS = "DIS"
    GEN = "GEN"
    PRO = "PRO"
    DRG = "DRG"
    CHE = "CHE"
    VAR = "VAR"
    TRL = "TRL"
    PUB = "PUB"
    CEL = "CEL"
    ORG = "ORG"
    PTH = "PTH"
    ANAT = "ANAT"
    PHEN = "PHEN"
    MISC = "MISC"


class EntityStatus(str, enum.Enum):
    PENDING_REVIEW = "pending_review"
    ACTIVE = "active"
    MERGED = "merged"
    DEPRECATED = "deprecated"


class ChangeType(str, enum.Enum):
    CREATE = "create"
    SOURCE_UPDATE = "source_update"
    MERGE = "merge"
    MANUAL_EDIT = "manual_edit"


class EvidenceLevel(str, enum.Enum):
    CLINICAL_GUIDELINE = "clinical_guideline"
    META_ANALYSIS = "meta_analysis"
    RCT = "rct"
    OBSERVATIONAL_STUDY = "observational_study"
    CASE_REPORT = "case_report"
    PRECLINICAL_STUDY = "preclinical_study"
    EXPERT_OPINION = "expert_opinion"


class ConfidenceSignalType(str, enum.Enum):
    EXACT_IDENTIFIER_MATCH = "exact_identifier_match"
    EXACT_LABEL_MATCH = "exact_label_match"
    ONTOLOGY_CROSS_REFERENCE = "ontology_cross_reference"
    SYNONYM_MATCH = "synonym_match"
    SEMANTIC_SIMILARITY = "semantic_similarity"
    CONTEXTUAL_EVIDENCE = "contextual_evidence"
    SOURCE_AUTHORITY = "source_authority"
    PUBLICATION_SUPPORT = "publication_support"


class SourceDatabase(str, enum.Enum):
    MONDO = "MONDO"
    DOID = "DOID"
    MESH = "MESH"
    ICD11 = "ICD11"
    SNOMEDCT = "SNOMEDCT"
    NCIT = "NCIT"
    OMIM = "OMIM"
    HGNC = "HGNC"
    NCBI_GENE = "NCBI_GENE"
    ENSEMBL = "ENSEMBL"
    ENTREZ = "ENTREZ"
    UNIPROT = "UNIPROT"
    REFSEQ_PROTEIN = "REFSEQ_PROTEIN"
    PDB = "PDB"
    ALPHAFOLD = "ALPHAFOLD"
    INTERPRO = "INTERPRO"
    DRUGBANK = "DRUGBANK"
    RXNORM = "RXNORM"
    DRUGCENTRAL = "DRUGCENTRAL"
    ATC = "ATC"
    CHEMBL = "CHEMBL"
    CHEBI = "CHEBI"
    PUBCHEM = "PUBCHEM"
    CHEMSPIDER = "CHEMSPIDER"
    CAS = "CAS"
    KEGG = "KEGG"
    CLINVAR = "CLINVAR"
    DBSNP = "DBSNP"
    GNOMAD = "GNOMAD"
    COSMIC = "COSMIC"
    CLINICALTRIALS_GOV = "CLINICALTRIALS_GOV"
    WHO_ICTRP = "WHO_ICTRP"
    EU_CTR = "EU_CTR"
    PMID = "PMID"
    PMCID = "PMCID"
    DOI = "DOI"
    OPENALEX = "OPENALEX"
    CROSSREF = "CROSSREF"


class SynonymType(str, enum.Enum):
    EXACT = "exact"
    BROADER = "broader"
    NARROWER = "narrower"
    RELATED = "related"
    ABBREVIATION = "abbreviation"
    TRADE_NAME = "trade_name"


# ---------------------------------------------------------------------------
# Taxonomy Constants
# ---------------------------------------------------------------------------

ENTITY_TAXONOMY: dict[str, dict[str, EntityNamespace]] = {
    "Disease": {"Disease": EntityNamespace.DIS, "Syndrome": EntityNamespace.DIS, "Disorder": EntityNamespace.DIS},
    "Gene": {"Gene": EntityNamespace.GEN, "Transcript": EntityNamespace.GEN},
    "Protein": {"Protein": EntityNamespace.PRO, "Enzyme": EntityNamespace.PRO, "Receptor": EntityNamespace.PRO},
    "Drug": {"Drug": EntityNamespace.DRG, "Biologic": EntityNamespace.DRG, "SmallMolecule": EntityNamespace.DRG},
    "Chemical": {"Chemical": EntityNamespace.CHE, "Metabolite": EntityNamespace.CHE, "Compound": EntityNamespace.CHE},
    "Variant": {"Variant": EntityNamespace.VAR, "SNP": EntityNamespace.VAR, "StructuralVariant": EntityNamespace.VAR},
    "Clinical Trial": {"Clinical Trial": EntityNamespace.TRL, "Observational Study": EntityNamespace.TRL},
    "Publication": {"Publication": EntityNamespace.PUB, "Preprint": EntityNamespace.PUB, "Review": EntityNamespace.PUB},
    "Cell Type": {"Cell Type": EntityNamespace.CEL},
    "Organism": {"Organism": EntityNamespace.ORG},
    "Pathway": {"Pathway": EntityNamespace.PTH},
    "Anatomy": {"Anatomy": EntityNamespace.ANAT},
    "Phenotype": {"Phenotype": EntityNamespace.PHEN},
}


# ---------------------------------------------------------------------------
# SQLAlchemy Models
# ---------------------------------------------------------------------------

class BioquoraEntity(Base):
    __tablename__ = "bioquora_entities"

    bq_id = Column(String, primary_key=True, index=True)
    namespace = Column(SQLEnum(EntityNamespace), nullable=False)
    entity_type = Column(String, nullable=False)
    preferred_label = Column(String, nullable=False, index=True)
    status = Column(SQLEnum(EntityStatus), default=EntityStatus.PENDING_REVIEW, nullable=False)
    quality_score = Column(Float, default=0.0, nullable=False)
    confidence_score = Column(Float, default=0.0, nullable=False)
    version = Column(Integer, default=1, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    ontology_memberships = relationship("OntologyMembership", backref="entity", cascade="all, delete-orphan")
    synonyms = relationship("Synonym", backref="entity", cascade="all, delete-orphan")
    external_identifiers = relationship("ExternalIdentifier", backref="entity", cascade="all, delete-orphan")
    versions = relationship("EntityVersion", backref="entity", cascade="all, delete-orphan")
    evidence_records = relationship("EvidenceRecord", backref="entity", cascade="all, delete-orphan")
    provenance_records = relationship("ProvenanceRecord", backref="entity", cascade="all, delete-orphan")


class Synonym(Base):
    __tablename__ = "bioquora_synonyms"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    term = Column(String, nullable=False)
    normalized_term = Column(String, nullable=False, index=True)
    synonym_type = Column(SQLEnum(SynonymType), default=SynonymType.RELATED, nullable=False)
    source = Column(SQLEnum(SourceDatabase), nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)


class ExternalIdentifier(Base):
    __tablename__ = "bioquora_external_identifiers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    source_database = Column(SQLEnum(SourceDatabase), nullable=False, index=True)
    external_id = Column(String, nullable=False, index=True)
    is_primary = Column(Boolean, default=True, nullable=False)
    mapping_confidence = Column(Float, nullable=False)
    mapping_algorithm = Column(String, nullable=False)
    import_version = Column(String, nullable=True)
    reviewer = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)

    confidence_signals = relationship("ConfidenceSignal", backref="external_identifier", cascade="all, delete-orphan")


class ConfidenceSignal(Base):
    __tablename__ = "bioquora_confidence_signals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    mapping_id = Column(Integer, ForeignKey("bioquora_external_identifiers.id"), nullable=False, index=True)
    signal_type = Column(SQLEnum(ConfidenceSignalType), nullable=False)
    weight = Column(Float, nullable=False)
    value = Column(Float, nullable=False)


class OntologyMembership(Base):
    __tablename__ = "bioquora_ontology_memberships"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    ontology_name = Column(String, nullable=False, index=True)
    ontology_term_id = Column(String, nullable=False, index=True)
    relationship_type = Column(String, default="exactMatch", nullable=False)


class EvidenceRecord(Base):
    __tablename__ = "bioquora_evidence_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    pmid = Column(String, nullable=False, index=True)
    evidence_level = Column(SQLEnum(EvidenceLevel), nullable=True)
    support_score = Column(Float, default=1.0, nullable=False)


class ProvenanceRecord(Base):
    __tablename__ = "bioquora_provenance_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    source_database = Column(SQLEnum(SourceDatabase), nullable=False)
    import_version = Column(String, nullable=True)
    imported_by = Column(String, nullable=True)
    imported_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)


class EntityVersion(Base):
    __tablename__ = "bioquora_entity_versions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    entity_id = Column(String, ForeignKey("bioquora_entities.bq_id"), nullable=False, index=True)
    version_number = Column(Integer, nullable=False)
    change_type = Column(SQLEnum(ChangeType), nullable=False)
    change_summary = Column(String, nullable=False)
    changed_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
