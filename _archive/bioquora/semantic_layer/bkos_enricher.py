"""
BIOQUORA - Step 3 BKOS Semantic Enrichment Pipeline
Implements Module 14 for Step 4 Stage 2 (BioSemantics v1.0).
Links raw knowledge objects from Step 3 to canonical ontologies, assigning CURIEs and validation scores.
"""

from typing import Dict, Any, List
from pydantic import BaseModel
from bioquora.ontology.registry.canonical_identifier_registry import get_master_registry

class EnrichedBKOSObject(BaseModel):
    bkos_id: str
    original_entity_text: str
    canonical_curie: str
    ontology_name: str
    semantic_status: str
    confidence_score: float

class BKOSEnrichmentPipeline:
    @staticmethod
    def enrich_entity(entity_text: str, candidate_curie: str, bkos_id: str = "bkos_item_01") -> EnrichedBKOSObject:
        reg = get_master_registry()
        prefix = candidate_curie.split(":")[0] if ":" in candidate_curie else "UNKNOWN"
        is_known = reg.is_registered(prefix)

        return EnrichedBKOSObject(
            bkos_id=bkos_id,
            original_entity_text=entity_text,
            canonical_curie=candidate_curie,
            ontology_name=prefix if is_known else "Custom",
            semantic_status="SEMANTICALLY_GROUNDED" if is_known else "UNRESOLVED_ONTOLOGY",
            confidence_score=0.95 if is_known else 0.50
        )
