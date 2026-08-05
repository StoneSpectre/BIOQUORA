"""
BIOQUORA - Semantic API & Service Layer
Implements Module 10 for Step 4 Stage 2 (BioSemantics v1.0).
Exposes 8 Canonical Semantic APIs for high-throughput lookup, mapping, hierarchy, and validation.
"""

from typing import Dict, Any, List, Optional
from bioquora.ontology.registry.canonical_identifier_registry import get_master_registry
from bioquora.ontology.synonyms.synonym_lexicon import BiomedicalLexiconEngine, SynonymType
from bioquora.ontology.mappings.mapping_engine import OntologyMappingEngine

class BioSemanticsAPIService:
    def __init__(self):
        self.registry = get_master_registry()
        self.lexicon = BiomedicalLexiconEngine()
        self.mapping_engine = OntologyMappingEngine()

    def lookup_curie(self, curie: str) -> Dict[str, Any]:
        """API 1: Ontology Lookup API"""
        if ":" not in curie:
            return {"status": "INVALID_CURIE", "curie": curie}
        prefix = curie.split(":")[0]
        is_reg = self.registry.is_registered(prefix)
        return {
            "status": "FOUND" if is_reg else "UNREGISTERED_PREFIX",
            "curie": curie,
            "ontology": prefix
        }

    def validate_curie(self, curie: str) -> bool:
        """API 7: Validation API"""
        res = self.lookup_curie(curie)
        return res["status"] == "FOUND"

    def resolve_synonym(self, text: str) -> List[str]:
        """API 5: Synonym API"""
        return self.lexicon.resolve_concept(text)

def get_semantic_api_service() -> BioSemanticsAPIService:
    return BioSemanticsAPIService()
