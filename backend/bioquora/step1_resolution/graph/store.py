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
        Synonym,
        EntityStatus,
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
        Synonym,
        EntityStatus,
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

    # -- Ch.5 §5.14-§5.19 Graph Store Methods -------------------------------

    def find_by_native_id(self, ontology: str, native_id: str) -> str | None:
        """Finds a canonical BQ ID by its native ontology identifier."""
        return self.resolve_ontology_concept(ontology, native_id)

    def find_by_synonym_text(self, text_norm: str) -> list[str]:
        """Returns all entity IDs matching a normalized synonym string."""
        norm = text_norm.strip().lower()
        syns = self.session.execute(
            select(Synonym.entity_id).where(Synonym.normalized_term == norm)
        ).scalars().all()
        return list(set(syns))

    def all_synonym_index(self) -> list[tuple[str, str, str]]:
        """(bq_id, text, text_norm) for every synonym — used by the
        similarity matcher to build its candidate space."""
        syns = self.session.execute(
            select(Synonym.entity_id, Synonym.term, Synonym.normalized_term)
        ).all()
        return [(r[0], r[1], r[2]) for r in syns]

    def all_active_entities(self) -> list[str]:
        """Returns BQ IDs for all active entities."""
        entities = self.session.execute(
            select(CanonicalEntity.bq_id).where(
                CanonicalEntity.status.in_([EntityStatus.ACTIVE, EntityStatus.PENDING_REVIEW])
            )
        ).scalars().all()
        return list(entities)

    def get_relationships(self, subject_bq_id: str) -> list[dict]:
        """Returns all relationships where the subject is subject_bq_id."""
        rels = self.session.execute(
            select(Relationship).where(Relationship.subject_id == subject_bq_id)
        ).scalars().all()
        out = []
        for r in rels:
            out.append({
                "subject": r.subject_id,
                "predicate": r.predicate.value if hasattr(r.predicate, "value") else str(r.predicate),
                "object": r.object_id,
                "source": r.source or "",
                "source_version": str(r.version),
                "confidence": r.confidence,
                "asserted_at": r.created_at.isoformat() if hasattr(r, "created_at") and r.created_at else "",
                "evidence": [],
            })
        return out

    def conflicting_assertions(self, subject_bq_id: str, predicate: str) -> list[dict]:
        """All sources' assertions for the same (subject, predicate) —
        i.e. everywhere sources disagree about the object."""
        rels = self.get_relationships(subject_bq_id)
        return [r for r in rels if r["predicate"].lower() == predicate.lower()]

    def record_merge(self, surviving_bq_id: str, absorbed_bq_id: str, reason: str, when: str) -> None:
        """Records an entity merge audit event in the graph store."""
        absorbed = self.get_entity(absorbed_bq_id)
        if absorbed:
            absorbed.status = EntityStatus.MERGED
            absorbed.merged_into_id = surviving_bq_id
            if not hasattr(absorbed, "_merge_history_list"):
                absorbed._merge_history_list = []
            absorbed._merge_history_list.append({
                "surviving": surviving_bq_id,
                "absorbed": absorbed_bq_id,
                "reason": reason,
                "merged_at": when
            })
            self.session.flush()

    def merge_history(self, bq_id: str) -> list[dict]:
        """Retrieves merge audit history for a given BQ ID."""
        entity = self.get_entity(bq_id)
        if entity and hasattr(entity, "_merge_history_list"):
            return entity._merge_history_list
        return []

