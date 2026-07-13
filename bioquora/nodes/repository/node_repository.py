"""
BIOQUORA - Production Graph Node Repository
Implements Module 12 for Step 4 Stage 4 (BioNodes v1.0).
Provides authoritative CRUD storage and indexed lookups for all graph nodes.
"""

from typing import Dict, List, Optional
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class ProductionNodeRepository:
    def __init__(self):
        self._nodes: Dict[str, UniversalBiomedicalNode] = {}
        self._name_index: Dict[str, str] = {}

    def store_node(self, node: UniversalBiomedicalNode) -> UniversalBiomedicalNode:
        self._nodes[node.bioq_id] = node
        self._name_index[node.preferred_name.lower()] = node.bioq_id
        for alias in node.aliases:
            self._name_index[alias.lower()] = node.bioq_id
        return node

    def get_node_by_id(self, bioq_id: str) -> Optional[UniversalBiomedicalNode]:
        return self._nodes.get(bioq_id)

    def search_by_name(self, query: str) -> Optional[UniversalBiomedicalNode]:
        bioq_id = self._name_index.get(query.lower())
        return self._nodes.get(bioq_id) if bioq_id else None

    def list_all(self) -> List[UniversalBiomedicalNode]:
        return list(self._nodes.values())

def get_node_repository() -> ProductionNodeRepository:
    return ProductionNodeRepository()
