"""
Bioquora Ontology Registry
==========================
Tracks authoritative biomedical ontologies, versions, licensing, and import metrics.
"""

from __future__ import annotations
from dataclasses import dataclass, field
from sqlalchemy.orm import Session


@dataclass
class OntologyMeta:
    short_name: str
    full_name: str
    version: str
    release_date: str | None = None
    license: str = "CC-BY-4.0"
    maintainer: str | None = None
    source_url: str | None = None
    imported_concepts: int = 0
    imported_relationships: int = 0
    coverage: float = 0.0
    status: str = "REGISTERED"


class OntologyRegistry:
    """
    Manages metadata and state for all integrated biomedical ontologies.
    Currently backed by an in-memory registry with standard OBO Foundry defaults;
    ready for database table migration as dynamic sources scale.
    """
    def __init__(self, session: Session | None = None):
        self.session = session
        self._memory_registry: dict[str, OntologyMeta] = {}
        self._seed_defaults()

    def _seed_defaults(self):
        defaults = [
            OntologyMeta(
                short_name="MONDO",
                full_name="Mondo Disease Ontology",
                version="2024-01-01",
                license="CC-BY-4.0",
                source_url="https://purl.obolibrary.org/obo/mondo.obo",
            ),
            OntologyMeta(
                short_name="DOID",
                full_name="Human Disease Ontology",
                version="2024-01-01",
                license="CC0-1.0",
                source_url="https://purl.obolibrary.org/obo/doid.obo",
            ),
            OntologyMeta(
                short_name="GO",
                full_name="Gene Ontology",
                version="2024-01-01",
                license="CC-BY-4.0",
                source_url="https://purl.obolibrary.org/obo/go.obo",
            ),
            OntologyMeta(
                short_name="HPO",
                full_name="Human Phenotype Ontology",
                version="2024-01-01",
                license="HP-license",
                source_url="https://purl.obolibrary.org/obo/hp.obo",
            ),
            OntologyMeta(
                short_name="SNOMEDCT",
                full_name="SNOMED CT",
                version="2024-01-01",
                license="IHTSDO",
                source_url=None,
            ),
            OntologyMeta(
                short_name="UMLS",
                full_name="Unified Medical Language System",
                version="2024AA",
                license="NLM-UMLS",
                source_url=None,
            ),
        ]
        for d in defaults:
            self._memory_registry[d.short_name.upper()] = d

    def register(self, meta: OntologyMeta) -> None:
        self._memory_registry[meta.short_name.upper()] = meta

    def get(self, short_name: str) -> OntologyMeta | None:
        return self._memory_registry.get(short_name.upper())

    def mark_imported(self, short_name: str, concepts: int, relationships: int, coverage: float) -> None:
        meta = self.get(short_name)
        if meta:
            meta.imported_concepts = concepts
            meta.imported_relationships = relationships
            meta.coverage = coverage
            meta.status = "IMPORTED"
