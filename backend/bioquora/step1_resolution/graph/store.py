"""
Bioquora Knowledge Graph Store
==============================
Provides persistence and retrieval operations for the Bioquora canonical entity graph,
ontology memberships, and typed relationships.
"""

from __future__ import annotations
import enum
from sqlalchemy import select
from sqlalchemy.orm import Session

try:
    from ..models import (
        CanonicalEntity,
        ExternalIdentifier,
        OntologyMembership,
        Relationship,
        RelationshipAssertion,
        RelationType,
        SourceDatabase,
    )
except ImportError:
    from models import (
        CanonicalEntity,
        ExternalIdentifier,
        OntologyMembership,
        Relationship,
        RelationshipAssertion,
        RelationType,
        SourceDatabase,
    )


class KnowledgeGraphStore:
    def __init__(self, session: Session):
        self.session = session

    def resolve_ontology_concept(self, ontology_name: str, native_id: str) -> str | None:
        """
        Resolves an (ontology, native_id) pair to a canonical Bioquora entity ID (bq_id).
        Checks OntologyMembership first, then falls back to ExternalIdentifier.
        """
        # 1. Check OntologyMembership
        membership = self.session.execute(
            select(OntologyMembership).where(
                OntologyMembership.ontology_name == ontology_name,
                OntologyMembership.ontology_term_id == native_id,
            )
        ).scalar_one_or_none()
        if membership:
            return membership.entity_id

        # 2. Check ExternalIdentifier
        try:
            src_enum = SourceDatabase(ontology_name)
            ext = self.session.execute(
                select(ExternalIdentifier).where(
                    ExternalIdentifier.source_database == src_enum,
                    ExternalIdentifier.external_id == native_id,
                )
            ).scalar_one_or_none()
            if ext:
                return ext.entity_id
        except ValueError:
            # Check by string match if not a valid enum
            exts = self.session.execute(
                select(ExternalIdentifier).where(
                    ExternalIdentifier.external_id == native_id
                )
            ).scalars().all()
            for ext in exts:
                src_val = ext.source_database.value if isinstance(ext.source_database, enum.Enum) else str(ext.source_database)
                if src_val.lower() == ontology_name.lower():
                    return ext.entity_id

        return None

    def get_entity(self, bq_id: str) -> CanonicalEntity | None:
        """
        Retrieves a canonical entity by its bq_id.
        """
        return self.session.get(CanonicalEntity, bq_id)

    def upsert_entity(self, entity: CanonicalEntity) -> None:
        """
        Persists a canonical entity and its associated relationships/provenance to the store.
        """
        if entity not in self.session:
            self.session.add(entity)
        self.session.flush()

    def map_ontology_concept(self, ontology_name: str, native_id: str, bq_id: str) -> None:
        """
        Registers a mapping between an ontology concept and a Bioquora entity ID.
        """
        existing = self.session.execute(
            select(OntologyMembership).where(
                OntologyMembership.entity_id == bq_id,
                OntologyMembership.ontology_name == ontology_name,
                OntologyMembership.ontology_term_id == native_id,
            )
        ).scalar_one_or_none()

        if not existing:
            membership = OntologyMembership(
                entity_id=bq_id,
                ontology_name=ontology_name,
                ontology_term_id=native_id,
                is_primary=True,
            )
            self.session.add(membership)
            self.session.flush()

    def add_relationship(self, rel: RelationshipAssertion) -> None:
        """
        Adds a typed relationship assertion between two canonical entities.
        """
        # Convert string predicate to RelationType enum if possible
        pred_enum = None
        if isinstance(rel.predicate, RelationType):
            pred_enum = rel.predicate
        elif isinstance(rel.predicate, str):
            pred_upper = rel.predicate.upper().replace("-", "_").replace(" ", "_")
            for rt in RelationType:
                if rt.value == pred_upper or rt.name == pred_upper:
                    pred_enum = rt
                    break
            if not pred_enum:
                if pred_upper == "IS_A" or pred_upper == "ISA":
                    pred_enum = RelationType.IS_A
                elif pred_upper == "PART_OF" or pred_upper == "PARTOF":
                    pred_enum = RelationType.PART_OF
                else:
                    pred_enum = RelationType.OTHER
        else:
            pred_enum = RelationType.OTHER

        # Check for existing relationship to avoid duplicates
        existing = self.session.execute(
            select(Relationship).where(
                Relationship.subject_id == rel.subject_bq_id,
                Relationship.predicate == pred_enum,
                Relationship.object_id == rel.object_bq_id,
            )
        ).scalar_one_or_none()

        if not existing:
            new_rel = Relationship(
                subject_id=rel.subject_bq_id,
                predicate=pred_enum,
                object_id=rel.object_bq_id,
                source=rel.source,
                version=1,
                confidence=rel.confidence,
            )
            self.session.add(new_rel)
            self.session.flush()
