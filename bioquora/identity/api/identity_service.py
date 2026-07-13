"""
BIOQUORA - Identity API & Service Layer
Implements Module 12 for Step 4 Stage 3 (BioIdentity v1.0).
Exposes 7 Canonical Identity APIs: Lookup, Resolution, Alias Search, Mapping, Duplicate Detection, Merge/Split, History.
"""

from typing import Dict, Any, Optional, List
from bioquora.identity.registry.canonical_identity import get_identity_registry
from bioquora.identity.identifier_mapping.id_resolver import IdentifierResolutionEngine
from bioquora.identity.synonyms.synonym_engine import SynonymKnowledgeBase

class BioIdentityAPIService:
    def __init__(self):
        self.registry = get_identity_registry()
        self.resolver = IdentifierResolutionEngine(self.registry)
        self.synonyms = SynonymKnowledgeBase()

    def lookup_bioq_id(self, bioq_id: str) -> Dict[str, Any]:
        """API 1: BIOQ-ID Lookup API"""
        rec = self.registry.get_entity_by_id(bioq_id)
        if rec:
            return {"status": "FOUND", "record": rec.dict()}
        return {"status": "NOT_FOUND", "bioq_id": bioq_id}

    def resolve_external_identifier(self, ext_id: str) -> Dict[str, Any]:
        """API 2: Entity Resolution API"""
        return self.resolver.resolve(ext_id)

    def search_alias(self, alias_str: str) -> List[str]:
        """API 3: Alias Search API"""
        return self.synonyms.resolve_to_bioq_ids(alias_str)

def get_identity_api_service() -> BioIdentityAPIService:
    return BioIdentityAPIService()
