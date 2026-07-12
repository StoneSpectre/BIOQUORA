import uuid
from typing import List, Optional, Dict
from sqlalchemy import select
from sqlalchemy.orm import Session
from app import models, schemas
from app.obo_parser import parse_obo_stream, OboTerm


# ---------- Ontology CRUD ----------

def get_ontology_by_code(db: Session, code: str) -> Optional[models.Ontology]:
    return db.execute(select(models.Ontology).where(models.Ontology.code == code)).scalar_one_or_none()


def create_ontology(db: Session, data: schemas.OntologyCreate) -> models.Ontology:
    ontology = models.Ontology(**data.model_dump())
    db.add(ontology)
    db.commit()
    db.refresh(ontology)
    return ontology


def list_ontologies(db: Session) -> List[models.Ontology]:
    return list(db.execute(select(models.Ontology)).scalars())


# ---------- Version CRUD ----------

def get_current_version(db: Session, ontology_id: uuid.UUID) -> Optional[models.OntologyVersion]:
    return db.execute(
        select(models.OntologyVersion).where(
            models.OntologyVersion.ontology_id == ontology_id,
            models.OntologyVersion.is_current == True,
        )
    ).scalar_one_or_none()


def get_version_by_name(db: Session, ontology_id: uuid.UUID, version: str) -> Optional[models.OntologyVersion]:
    return db.execute(
        select(models.OntologyVersion).where(
            models.OntologyVersion.ontology_id == ontology_id,
            models.OntologyVersion.version == version,
        )
    ).scalar_one_or_none()


def create_version(
    db: Session, ontology_id: uuid.UUID, version: str, source_url: Optional[str] = None
) -> models.OntologyVersion:
    # Unset existing current versions
    db.query(models.OntologyVersion).filter(
        models.OntologyVersion.ontology_id == ontology_id,
        models.OntologyVersion.is_current == True,
    ).update({"is_current": False})

    new_version = models.OntologyVersion(
        ontology_id=ontology_id,
        version=version,
        is_current=True,
        source_url=source_url,
    )
    db.add(new_version)
    db.commit()
    db.refresh(new_version)
    return new_version


# ---------- Batched High-Performance Ingestion ----------

def ingest_obo_file(
    db: Session, ontology_version_id: uuid.UUID, obo_path: str, batch_size: int = 5000
) -> Dict[str, int]:
    """Ingest an OBO file using batched multi-row inserts to eliminate N+1 latency."""
    version = db.get(models.OntologyVersion, ontology_version_id)
    if not version:
        raise ValueError(f"Ontology version {ontology_version_id} not found")

    term_map: Dict[str, models.OntologyTerm] = {}
    parsed_terms: List[OboTerm] = []

    # Phase 1: Batched Term Insertion
    for obo_term in parse_obo_stream(obo_path):
        parsed_terms.append(obo_term)
        term_obj = models.OntologyTerm(
            ontology_version_id=ontology_version_id,
            curie=obo_term.id,
            name=obo_term.name,
            definition=obo_term.def_,
            is_obsolete=obo_term.is_obsolete,
        )
        term_map[obo_term.id] = term_obj

        if len(term_map) >= batch_size:
            db.add_all(term_map.values())
            db.flush()

    if term_map:
        db.add_all(term_map.values())
        db.flush()

    # Refresh term mapping IDs from DB
    all_terms = db.execute(
        select(models.OntologyTerm).where(
            models.OntologyTerm.ontology_version_id == ontology_version_id
        )
    ).scalars()
    curie_to_id = {t.curie: t.id for t in all_terms}

    # Phase 2: Batched Edge Insertion
    edges_to_insert = []
    seen_edges = set()

    for obo_term in parsed_terms:
        subj_id = curie_to_id.get(obo_term.id)
        if not subj_id:
            continue

        # Process is_a edges
        for target_curie in obo_term.is_a:
            obj_id = curie_to_id.get(target_curie)
            if obj_id and (subj_id, models.RelationType.is_a, obj_id) not in seen_edges:
                seen_edges.add((subj_id, models.RelationType.is_a, obj_id))
                edges_to_insert.append(
                    models.OntologyEdge(
                        ontology_version_id=ontology_version_id,
                        subject_id=subj_id,
                        object_id=obj_id,
                        predicate=models.RelationType.is_a,
                    )
                )

        # Process relationship edges
        for rel in obo_term.relationships:
            obj_id = curie_to_id.get(rel.target)
            if obj_id and (subj_id, rel.predicate, obj_id) not in seen_edges:
                seen_edges.add((subj_id, rel.predicate, obj_id))
                edges_to_insert.append(
                    models.OntologyEdge(
                        ontology_version_id=ontology_version_id,
                        subject_id=subj_id,
                        object_id=obj_id,
                        predicate=rel.predicate,
                    )
                )

        if len(edges_to_insert) >= batch_size:
            db.add_all(edges_to_insert)
            db.flush()
            edges_to_insert.clear()

    if edges_to_insert:
        db.add_all(edges_to_insert)
        db.flush()

    # Update counts on version metadata
    term_count = len(curie_to_id)
    edge_count = len(seen_edges)
    version.term_count = term_count
    version.edge_count = edge_count
    db.commit()

    return {"terms_ingested": term_count, "edges_ingested": edge_count}


# ---------- DAG Traversal Queries ----------

def get_term_by_curie(db: Session, ontology_version_id: uuid.UUID, curie: str) -> Optional[models.OntologyTerm]:
    return db.execute(
        select(models.OntologyTerm).where(
            models.OntologyTerm.ontology_version_id == ontology_version_id,
            models.OntologyTerm.curie == curie,
        )
    ).scalar_one_or_none()


def get_parents(db: Session, term_id: uuid.UUID) -> List[models.OntologyTerm]:
    return list(
        db.execute(
            select(models.OntologyTerm)
            .join(models.OntologyEdge, models.OntologyEdge.object_id == models.OntologyTerm.id)
            .where(
                models.OntologyEdge.subject_id == term_id,
                models.OntologyEdge.predicate == models.RelationType.is_a,
            )
        ).scalars()
    )


def get_children(db: Session, term_id: uuid.UUID) -> List[models.OntologyTerm]:
    return list(
        db.execute(
            select(models.OntologyTerm)
            .join(models.OntologyEdge, models.OntologyEdge.subject_id == models.OntologyTerm.id)
            .where(
                models.OntologyEdge.object_id == term_id,
                models.OntologyEdge.predicate == models.RelationType.is_a,
            )
        ).scalars()
    )
