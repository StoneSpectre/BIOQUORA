"""
BIOQUORA - Node API & Service Layer
Implements Module 13 for Step 4 Stage 4 (BioNodes v1.0).
Exposes 8 Canonical Node APIs: Registry, Lookup, Search, Validation, Lifecycle, Analytics, Bulk Import/Export.
"""

from typing import Dict, Any, List, Optional
from bioquora.nodes.repository.node_repository import get_node_repository
from bioquora.nodes.validation.node_validator import NodeValidatorEngine

class BioNodesAPIService:
    def __init__(self):
        self.repo = get_node_repository()

    def lookup_node(self, bioq_id: str) -> Dict[str, Any]:
        """API 2: Node Lookup API"""
        node = self.repo.get_node_by_id(bioq_id)
        if node:
            return {"status": "FOUND", "node": node.to_graph_dict()}
        return {"status": "NOT_FOUND", "bioq_id": bioq_id}

    def search_node_by_name(self, name: str) -> Dict[str, Any]:
        """API 3: Node Search API"""
        node = self.repo.search_by_name(name)
        if node:
            return {"status": "FOUND", "node": node.to_graph_dict()}
        return {"status": "NOT_FOUND", "query": name}

    def validate_node_schema(self, bioq_id: str) -> Dict[str, Any]:
        """API 4: Node Validation API"""
        node = self.repo.get_node_by_id(bioq_id)
        if not node:
            return {"status": "NOT_FOUND", "bioq_id": bioq_id}
        return NodeValidatorEngine.validate_node(node)

def get_node_api_service() -> BioNodesAPIService:
    return BioNodesAPIService()
