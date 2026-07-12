import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.database import get_db

router = APIRouter(tags=["BioDOS Phase 1 - Ontologies"])


def _get_ontology_or_404(db: Session, code: str) -> models.Ontology:
    """Helper to fetch an ontology by code or raise a 404 exception."""
    ontology = crud.get_ontology_by_code(db, code)
    if ontology is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Ontology with code '{code}' not found",
        )
    return ontology


def _get_version_or_404(db: Session, ontology_id: uuid.UUID, version: Optional[str]) -> models.OntologyVersion:
    """Helper to fetch an ontology version (or current version if none specified)."""
    if version:
        ver_obj = crud.get_version_by_name(db, ontology_id, version)
        if not ver_obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Version '{version}' not found for ontology",
            )
        return ver_obj
    else:
        ver_obj = crud.get_current_version(db, ontology_id)
        if not ver_obj:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No active current version found for ontology",
            )
        return ver_obj


@router.post("/ontologies", response_model=schemas.OntologyOut, status_code=status.HTTP_201_CREATED)
def create_ontology(payload: schemas.OntologyCreate, db: Session = Depends(get_db)):
    """Register a new biomedical ontology source (e.g., DOID, HPO, GO)."""
    if crud.get_ontology_by_code(db, payload.code):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Ontology '{payload.code}' is already registered",
        )
    return crud.create_ontology(db, payload)


@router.get("/ontologies", response_model=List[schemas.OntologyOut])
def list_ontologies(db: Session = Depends(get_db)):
    """List all registered biomedical ontologies."""
    return crud.list_ontologies(db)


@router.get("/ontologies/{code}", response_model=schemas.OntologyOut)
def get_ontology(code: str, db: Session = Depends(get_db)):
    """Retrieve metadata for a specific ontology by its unique code."""
    return _get_ontology_or_404(db, code)


@router.post("/ontologies/{code}/versions", response_model=schemas.OntologyVersionOut, status_code=status.HTTP_201_CREATED)
def create_version(
    code: str,
    version: str = Query(..., description="Version string (e.g., 2026-03-01)"),
    source_url: Optional[str] = Query(None, description="Download URL for OBO/OWL source file"),
    db: Session = Depends(get_db),
):
    """Create a new point-in-time version release for an ontology and set it as current."""
    ontology = _get_ontology_or_404(db, code)
    if crud.get_version_by_name(db, ontology.id, version):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Version '{version}' already exists for ontology '{code}'",
        )
    return crud.create_version(db, ontology.id, version, source_url)


@router.get("/ontologies/{code}/versions/current", response_model=schemas.OntologyVersionOut)
def get_current_version(code: str, db: Session = Depends(get_db)):
    """Retrieve the currently active version of an ontology."""
    ontology = _get_ontology_or_404(db, code)
    return _get_version_or_404(db, ontology.id, None)


@router.post("/ontologies/{code}/ingest", status_code=status.HTTP_200_OK)
def ingest_obo(
    code: str,
    file_path: str = Query(..., description="Absolute path to local OBO file on server"),
    version: Optional[str] = Query(None, description="Target version (defaults to current)"),
    batch_size: int = Query(5000, ge=100, le=50000, description="Batch size for multi-row database inserts"),
    db: Session = Depends(get_db),
):
    """Trigger batched streaming ingestion of an OBO file into an ontology version."""
    ontology = _get_ontology_or_404(db, code)
    ver_obj = _get_version_or_404(db, ontology.id, version)

    try:
        results = crud.ingest_obo_file(db, ver_obj.id, file_path, batch_size=batch_size)
        return {
            "status": "success",
            "ontology": code,
            "version": ver_obj.version,
            "metrics": results,
        }
    except FileNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"OBO file not found at path: {file_path}")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Ingestion failed: {str(e)}")


@router.get("/ontologies/{code}/terms/{curie}", response_model=schemas.OntologyTermOut)
def get_term(
    code: str,
    curie: str,
    version: Optional[str] = Query(None, description="Version string (defaults to current)"),
    db: Session = Depends(get_db),
):
    """Lookup an ontology term by its CURIE (e.g., DOID:4) within a specific version."""
    ontology = _get_ontology_or_404(db, code)
    ver_obj = _get_version_or_404(db, ontology.id, version)

    term = crud.get_term_by_curie(db, ver_obj.id, curie)
    if not term:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Term '{curie}' not found in ontology '{code}' (version '{ver_obj.version}')",
        )
    return term


@router.get("/ontologies/{code}/terms/{curie}/parents", response_model=List[schemas.OntologyTermOut])
def get_term_parents(
    code: str,
    curie: str,
    version: Optional[str] = Query(None, description="Version string (defaults to current)"),
    db: Session = Depends(get_db),
):
    """Retrieve all immediate parent superclasses (is_a relationships) for a term."""
    ontology = _get_ontology_or_404(db, code)
    ver_obj = _get_version_or_404(db, ontology.id, version)

    term = crud.get_term_by_curie(db, ver_obj.id, curie)
    if not term:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Term '{curie}' not found in ontology '{code}'",
        )
    return crud.get_parents(db, term.id)


@router.get("/ontologies/{code}/terms/{curie}/children", response_model=List[schemas.OntologyTermOut])
def get_term_children(
    code: str,
    curie: str,
    version: Optional[str] = Query(None, description="Version string (defaults to current)"),
    db: Session = Depends(get_db),
):
    """Retrieve all immediate child subclasses (is_a relationships) for a term."""
    ontology = _get_ontology_or_404(db, code)
    ver_obj = _get_version_or_404(db, ontology.id, version)

    term = crud.get_term_by_curie(db, ver_obj.id, curie)
    if not term:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Term '{curie}' not found in ontology '{code}'",
        )
    return crud.get_children(db, term.id)
