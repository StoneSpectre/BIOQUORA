"""
BIOQUORA - Identifier Resolution Engine
Implements Module 4 for Step 4 Stage 3 (BioIdentity v1.0).
Resolves external identifiers across HGNC, NCBI Gene, Ensembl, UniProt, DrugBank, ChEBI, MONDO, HPO, GO, MeSH, UMLS to canonical BIOQ-IDs.
"""

from typing import Optional, Dict, Any
from bioquora.identity.registry.canonical_identity import CanonicalIdentityRegistry, CanonicalEntityRecord

SUPPORTED_NAMESPACES = {
    "HGNC", "NCBIGene", "Ensembl", "UniProt", "DrugBank", "ChEBI",
    "MONDO", "HPO", "GO", "MeSH", "UMLS", "Reactome"
}

class IdentifierResolutionEngine:
    def __init__(self, registry: CanonicalIdentityRegistry):
        self.registry = registry

    def resolve(self, external_id: str) -> Dict[str, Any]:
        """
        Executes pipeline: External ID -> Validation -> Namespace Detection -> BIOQ-ID Mapping -> Result
        """
        ns = external_id.split(":", 1)[0] if ":" in external_id else "UNKNOWN"
        is_supported = ns in SUPPORTED_NAMESPACES

        record = self.registry.resolve_external_id(external_id)
        if record:
            return {
                "status": "RESOLVED_EXACT",
                "bioq_id": record.bioq_id,
                "preferred_name": record.preferred_name,
                "namespace": ns
            }

        return {
            "status": "UNRESOLVED_NEW_CANDIDATE",
            "bioq_id": None,
            "namespace_supported": is_supported,
            "external_id": external_id
        }
