"""
BIOQUORA - Canonical Identity Model & Registry
Implements Module 1 for Step 4 Stage 3 (BioIdentity v1.0).
Defines the canonical entity record and central identity registry.
"""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field
from bioquora.identity.bioq_ids.generator import EntityCategory, generate_bioq_id

class CanonicalEntityRecord(BaseModel):
    bioq_id: str
    preferred_name: str
    preferred_ontology_id: str
    entity_type: EntityCategory
    namespace: str
    synonyms: List[str] = Field(default_factory=list)
    aliases: List[str] = Field(default_factory=list)
    external_ids: Dict[str, str] = Field(default_factory=dict)
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    lifecycle_status: str = "ACTIVE"
    version: str = "1.0"

class CanonicalIdentityRegistry:
    def __init__(self):
        # bioq_id -> CanonicalEntityRecord
        self._entities: Dict[str, CanonicalEntityRecord] = {}
        # ext_id -> bioq_id
        self._external_index: Dict[str, str] = {}

    def register_entity(
        self,
        preferred_name: str,
        preferred_ontology_id: str,
        entity_type: EntityCategory,
        namespace: str,
        synonyms: Optional[List[str]] = None,
        external_ids: Optional[Dict[str, str]] = None,
        confidence_score: float = 0.99
    ) -> CanonicalEntityRecord:
        bioq_id = generate_bioq_id(entity_type)
        record = CanonicalEntityRecord(
            bioq_id=bioq_id,
            preferred_name=preferred_name,
            preferred_ontology_id=preferred_ontology_id,
            entity_type=entity_type,
            namespace=namespace,
            synonyms=synonyms or [],
            external_ids=external_ids or {},
            confidence_score=confidence_score
        )
        self._entities[bioq_id] = record
        self._external_index[preferred_ontology_id] = bioq_id
        for ext_source, ext_id in (external_ids or {}).items():
            self._external_index[ext_id] = bioq_id
            self._external_index[f"{ext_source}:{ext_id}"] = bioq_id
        return record

    def get_entity_by_id(self, bioq_id: str) -> Optional[CanonicalEntityRecord]:
        return self._entities.get(bioq_id)

    def resolve_external_id(self, ext_id: str) -> Optional[CanonicalEntityRecord]:
        bioq_id = self._external_index.get(ext_id)
        return self._entities.get(bioq_id) if bioq_id else None

def get_identity_registry() -> CanonicalIdentityRegistry:
    return CanonicalIdentityRegistry()
