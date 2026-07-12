import uuid
from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict
from app.models import RelationType


class OntologyCreate(BaseModel):
    code: str = Field(..., max_length=32, description="Unique ontology identifier code (e.g., DOID)")
    name: str = Field(..., max_length=255, description="Full human-readable ontology name")
    description: Optional[str] = Field(None, description="Detailed description of the ontology domain")


class OntologyOut(BaseModel):
    id: uuid.UUID
    code: str
    name: str
    description: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class OntologyVersionOut(BaseModel):
    id: uuid.UUID
    ontology_id: uuid.UUID
    version: str
    is_current: bool
    source_url: Optional[str] = None
    loaded_at: datetime
    term_count: int
    edge_count: int

    model_config = ConfigDict(from_attributes=True)


class OntologyTermOut(BaseModel):
    id: uuid.UUID
    curie: str
    name: str
    definition: Optional[str] = None
    is_obsolete: bool

    model_config = ConfigDict(from_attributes=True)


class OntologyEdgeOut(BaseModel):
    id: uuid.UUID
    subject_curie: str
    predicate: RelationType
    object_curie: str

    model_config = ConfigDict(from_attributes=True)
