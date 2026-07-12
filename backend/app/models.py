import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import (
    Column,
    String,
    DateTime,
    ForeignKey,
    Boolean,
    Integer,
    UniqueConstraint,
    Enum,
    Text,
    Index,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


def utcnow():
    """Return timezone-aware current UTC timestamp."""
    return datetime.now(timezone.utc)


class RelationType(str, enum.Enum):
    """Supported biomedical ontology relationship predicates."""
    is_a = "is_a"
    part_of = "part_of"
    regulates = "regulates"
    positively_regulates = "positively_regulates"
    negatively_regulates = "negatively_regulates"
    has_role = "has_role"
    other = "other"


class Ontology(Base):
    """A registered biomedical ontology source (e.g., DOID, HPO, GO, MONDO)."""
    __tablename__ = "ontologies"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    code = Column(String(32), unique=True, nullable=False, index=True)  # e.g., "DOID"
    name = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow, nullable=False)

    versions = relationship("OntologyVersion", back_populates="ontology", cascade="all, delete-orphan")


class OntologyVersion(Base):
    """A point-in-time versioned release of an ontology."""
    __tablename__ = "ontology_versions"
    __table_args__ = (
        UniqueConstraint("ontology_id", "version", name="uq_ontology_version"),
        Index("idx_ont_ver_current", "ontology_id", "is_current"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ontology_id = Column(UUID(as_uuid=True), ForeignKey("ontologies.id", ondelete="CASCADE"), nullable=False)
    version = Column(String(64), nullable=False)  # e.g., "2026-03-01"
    is_current = Column(Boolean, default=False, nullable=False)
    source_url = Column(String(1024), nullable=True)
    loaded_at = Column(DateTime(timezone=True), default=utcnow, nullable=False)
    term_count = Column(Integer, default=0, nullable=False)
    edge_count = Column(Integer, default=0, nullable=False)

    ontology = relationship("Ontology", back_populates="versions")
    terms = relationship("OntologyTerm", back_populates="ontology_version", cascade="all, delete-orphan")
    edges = relationship("OntologyEdge", back_populates="ontology_version", cascade="all, delete-orphan")


class OntologyTerm(Base):
    """A semantic concept node within a versioned ontology."""
    __tablename__ = "ontology_terms"
    __table_args__ = (
        UniqueConstraint("ontology_version_id", "curie", name="uq_term_version_curie"),
        Index("idx_term_curie", "curie"),
        Index("idx_term_name", "name"),
        Index("idx_term_is_obsolete", "ontology_version_id", "is_obsolete"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ontology_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ontology_versions.id", ondelete="CASCADE"),
        nullable=False,
    )
    curie = Column(String(64), nullable=False)  # e.g., "DOID:4"
    name = Column(String(512), nullable=False)
    definition = Column(Text, nullable=True)
    is_obsolete = Column(Boolean, default=False, nullable=False)

    ontology_version = relationship("OntologyVersion", back_populates="terms")

    outgoing_edges = relationship(
        "OntologyEdge",
        foreign_keys="OntologyEdge.subject_id",
        back_populates="subject",
        cascade="all, delete-orphan",
    )
    incoming_edges = relationship(
        "OntologyEdge",
        foreign_keys="OntologyEdge.object_id",
        back_populates="object",
        cascade="all, delete-orphan",
    )


class OntologyEdge(Base):
    """A directed topological edge (relationship) between two ontology terms."""
    __tablename__ = "ontology_edges"
    __table_args__ = (
        UniqueConstraint(
            "ontology_version_id",
            "subject_id",
            "predicate",
            "object_id",
            name="uq_edge_triple",
        ),
        # Forward traversal index: get all parents/superclasses of a term
        Index("idx_edge_subject_predicate", "ontology_version_id", "subject_id", "predicate"),
        # Reverse traversal index: get all children/subclasses of a term
        Index("idx_edge_object_predicate", "ontology_version_id", "object_id", "predicate"),
    )

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    ontology_version_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ontology_versions.id", ondelete="CASCADE"),
        nullable=False,
    )
    subject_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ontology_terms.id", ondelete="CASCADE"),
        nullable=False,
    )
    object_id = Column(
        UUID(as_uuid=True),
        ForeignKey("ontology_terms.id", ondelete="CASCADE"),
        nullable=False,
    )
    predicate = Column(
        Enum(RelationType, name="relation_type_enum", create_type=False),
        nullable=False,
    )

    ontology_version = relationship("OntologyVersion", back_populates="edges")
    subject = relationship("OntologyTerm", foreign_keys=[subject_id], back_populates="outgoing_edges")
    object = relationship("OntologyTerm", foreign_keys=[object_id], back_populates="incoming_edges")
