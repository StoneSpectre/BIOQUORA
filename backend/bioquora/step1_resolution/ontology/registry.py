"""
Bioquora Ontology Registry
==========================
Implements Ch.4 "Ontology Governance":
    Version, Release date, License, Maintainer, Update frequency,
    Import status, Validation report, Mapping coverage, Known issues

And Ch.4 "Ontology Selection Criteria" is used as a checklist when
registering a new source (see `score_selection_criteria`).
"""

from __future__ import annotations
import json
import os
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
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
    update_frequency: str = "unknown"
    import_status: str = "pending"          # pending | imported | failed
    concept_count: int = 0
    relationship_count: int = 0
    mapping_coverage: float = 0.0           # fraction of concepts with >=1 xref
    known_issues: list[str] = field(default_factory=list)
    imported_at: str | None = None

    def to_dict(self):
        return asdict(self)

    # -- Backward compatibility aliases for existing tests/pipeline --
    @property
    def imported_concepts(self) -> int:
        return self.concept_count

    @imported_concepts.setter
    def imported_concepts(self, val: int):
        self.concept_count = val

    @property
    def imported_relationships(self) -> int:
        return self.relationship_count

    @imported_relationships.setter
    def imported_relationships(self, val: int):
        self.relationship_count = val

    @property
    def coverage(self) -> float:
        return self.mapping_coverage

    @coverage.setter
    def coverage(self, val: float):
        self.mapping_coverage = val

    @property
    def status(self) -> str:
        return self.import_status.upper() if self.import_status else "PENDING"

    @status.setter
    def status(self, val: str):
        self.import_status = val.lower() if val else "pending"


class OntologyRegistry:
    def __init__(self, path: str | Session | None = None):
        self.session = path if isinstance(path, Session) else None
        self.path = path if isinstance(path, str) else None
        
        self._entries: dict[str, OntologyMeta] = {}
        if self.path and os.path.exists(self.path):
            with open(self.path) as f:
                raw = json.load(f)
            self._entries = {k: OntologyMeta(**v) for k, v in raw.items()}
        else:
            self._seed_defaults()
            if self.path:
                self._flush()

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
            self._entries[d.short_name.upper()] = d

    def _flush(self):
        if not self.path:
            return
        os.makedirs(os.path.dirname(self.path) or ".", exist_ok=True)
        with open(self.path, "w") as f:
            json.dump({k: v.to_dict() for k, v in self._entries.items()}, f, indent=2)

    def register(self, meta: OntologyMeta):
        self._entries[meta.short_name.upper()] = meta
        self._flush()

    def mark_imported(self, short_name: str,
                      concept_count: int = 0,
                      relationship_count: int = 0,
                      mapping_coverage: float = 0.0,
                      *, concepts: int = None, relationships: int = None, coverage: float = None):
        if concepts is not None:
            concept_count = concepts
        if relationships is not None:
            relationship_count = relationships
        if coverage is not None:
            mapping_coverage = coverage

        m = self._entries.get(short_name.upper())
        if not m:
            return
        m.import_status = "imported"
        m.concept_count = concept_count
        m.relationship_count = relationship_count
        m.mapping_coverage = mapping_coverage
        m.imported_at = datetime.now(timezone.utc).isoformat()
        self._flush()

    def get(self, short_name: str) -> OntologyMeta | None:
        return self._entries.get(short_name.upper())

    def all(self) -> list[OntologyMeta]:
        return list(self._entries.values())


def score_selection_criteria(*, widely_adopted: bool, actively_maintained: bool,
                              stable_ids: bool, machine_readable: bool,
                              clear_licensing: bool, rich_xrefs: bool,
                              community_accepted: bool, has_version_history: bool,
                              public_docs: bool, has_api_or_releases: bool) -> float:
    """Ch.4 'Ontology Selection Criteria' — returns fraction of the 10
    criteria satisfied, used to decide whether an ontology is worth
    integrating."""
    criteria = [widely_adopted, actively_maintained, stable_ids, machine_readable,
                clear_licensing, rich_xrefs, community_accepted, has_version_history,
                public_docs, has_api_or_releases]
    return sum(criteria) / len(criteria)
