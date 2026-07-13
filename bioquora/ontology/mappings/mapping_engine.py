"""
BIOQUORA - Cross-Ontology Mapping Engine
Implements Module 5 for Step 4 Stage 2 (BioSemantics v1.0).
Supports Exact, Broad, Narrow, and Related mapping across UMLS / MeSH / MONDO / DOID / SNOMED / ICD.
"""

from enum import Enum
from typing import List, Dict, Optional
from pydantic import BaseModel, Field

class MappingRelation(str, Enum):
    EXACT_MATCH = "EXACT_MATCH"
    BROAD_MATCH = "BROAD_MATCH"
    NARROW_MATCH = "NARROW_MATCH"
    RELATED_MATCH = "RELATED_MATCH"

class CrossOntologyMapping(BaseModel):
    source_curie: str
    target_curie: str
    relation: MappingRelation
    confidence: float = Field(..., ge=0.0, le=1.0)
    mapping_source: str = "UMLS-2026AA"
    is_deprecated: bool = False

class OntologyMappingEngine:
    def __init__(self):
        self.mappings: List[CrossOntologyMapping] = []

    def add_mapping(self, mapping: CrossOntologyMapping) -> None:
        self.mappings.append(mapping)

    def find_equivalent_curies(self, curie: str, min_confidence: float = 0.85) -> List[str]:
        results = set()
        for m in self.mappings:
            if m.is_deprecated:
                continue
            if m.confidence < min_confidence:
                continue
            if m.relation == MappingRelation.EXACT_MATCH:
                if m.source_curie == curie:
                    results.add(m.target_curie)
                elif m.target_curie == curie:
                    results.add(m.source_curie)
        return sorted(list(results))
