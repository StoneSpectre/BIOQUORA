"""
BIOQUORA - Canonical Identifier & Ontology Registry Module
Implements Module 1 (Ontology Landscape) and Module 4 (Canonical Identifier Platform)
for Step 4 Stage 2 (BioSemantics v1.0).
"""

import json
import os
import uuid
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class CanonicalOntologyConcept(BaseModel):
    bioq_id: str = Field(default_factory=lambda: f"bioq_sem_{uuid.uuid4().hex[:12]}")
    preferred_identifier: str = Field(..., description="Canonical CURIE e.g. MONDO:0005086")
    ontology: str = Field(..., description="Ontology Key e.g. MONDO")
    namespace: str = Field(..., description="URI Namespace")
    external_ids: Dict[str, str] = Field(default_factory=dict)
    aliases: List[str] = Field(default_factory=list)
    preferred_label: str = Field(..., description="Primary display label")
    status: str = "ACTIVE"
    version: str = "1.0"

class MasterOntologyRegistry:
    def __init__(self, registry_path: Optional[str] = None):
        if not registry_path:
            registry_path = os.path.join(os.path.dirname(__file__), "master_ontology_registry.json")
        with open(registry_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        self.ontologies: Dict[str, Dict[str, Any]] = data.get("ontologies", {})

    def get_registered_count(self) -> int:
        return len(self.ontologies)

    def is_registered(self, ontology_key: str) -> bool:
        return ontology_key in self.ontologies

    def create_canonical_concept(
        self,
        curie: str,
        preferred_label: str,
        aliases: Optional[List[str]] = None,
        external_ids: Optional[Dict[str, str]] = None
    ) -> CanonicalOntologyConcept:
        if ":" not in curie:
            raise ValueError(f"Invalid CURIE format: {curie}")
        prefix, _ = curie.split(":", 1)
        if not self.is_registered(prefix):
            # Allow common aliases or fallback
            pass
        
        ns_info = self.ontologies.get(prefix, {"uri_prefix": f"https://bioquora.org/ontology/{prefix}/"})
        return CanonicalOntologyConcept(
            preferred_identifier=curie,
            ontology=prefix,
            namespace=ns_info.get("uri_prefix", ""),
            preferred_label=preferred_label,
            aliases=aliases or [],
            external_ids=external_ids or {}
        )

def get_master_registry() -> MasterOntologyRegistry:
    return MasterOntologyRegistry()
