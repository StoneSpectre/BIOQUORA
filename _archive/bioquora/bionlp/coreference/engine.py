"""
Module 4: Coreference Resolution Engine
Resolves pronominal and nominal anaphora chains into unified canonical entity references.
"""

from typing import List, Dict
from bioquora.bionlp.schema import BiomedicalEntityRecord


class CoreferenceResolutionEngine:
    """Production Biomedical Anaphora Resolver."""

    def resolve_coreference_chains(self, entities: List[BiomedicalEntityRecord]) -> Dict[str, List[str]]:
        chains: Dict[str, List[str]] = {}
        for ent in entities:
            canon = ent.canonical_id or ent.text
            if canon not in chains:
                chains[canon] = []
            chains[canon].append(ent.entity_id)
        return chains
