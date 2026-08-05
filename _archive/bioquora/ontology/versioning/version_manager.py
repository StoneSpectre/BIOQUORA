"""
BIOQUORA - Ontology Version & Migration Manager
Implements Module 8 for Step 4 Stage 2 (BioSemantics v1.0).
Tracks new terms, deprecated terms, merged concepts, split concepts, and migration paths across releases.
"""

from typing import Dict, Any, List, Optional
from pydantic import BaseModel

class ConceptMigrationRecord(BaseModel):
    deprecated_curie: str
    replacement_curie: str
    migration_reason: str
    release_version: str

class OntologyVersionManager:
    def __init__(self):
        self.migrations: Dict[str, ConceptMigrationRecord] = {}

    def register_migration(self, old_curie: str, new_curie: str, reason: str, version: str) -> None:
        self.migrations[old_curie] = ConceptMigrationRecord(
            deprecated_curie=old_curie,
            replacement_curie=new_curie,
            migration_reason=reason,
            release_version=version
        )

    def resolve_latest_curie(self, curie: str) -> str:
        curr = curie
        visited = set()
        while curr in self.migrations and curr not in visited:
            visited.add(curr)
            curr = self.migrations[curr].replacement_curie
        return curr
