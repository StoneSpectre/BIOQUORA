"""
BIOQUORA - Canonical Graph API Service Layer
Implements Module 15 for Step 4 Stage 6 (BioBuilder v1.0).
Exposes 9 Canonical Graph APIs: Build, Merge, Update, Publish, Snapshot, Version, Diff, Validation, and Metrics APIs.
"""

from typing import Dict, Any, List
from bioquora.graph_builder.repository.graph_repository import get_graph_repository
from bioquora.graph_builder.monitoring.analytics_layer import GraphAnalyticsLayer
from bioquora.graph_builder.versioning.graph_version_manager import GraphVersionManager
from bioquora.graph_builder.publication.graph_publisher import GraphPublicationPlatform
from bioquora.graph_builder.validation.graph_validator import GraphValidationPlatform

class BioBuilderAPIService:
    def __init__(self):
        self.repo = get_graph_repository()
        self.versions = GraphVersionManager()

    def get_graph_metrics_api(self) -> Dict[str, Any]:
        """API 9: Graph Metrics API"""
        return GraphAnalyticsLayer.compute_graph_statistics(self.repo)

    def validate_graph_api(self) -> Dict[str, Any]:
        """API 8: Graph Validation API"""
        return GraphValidationPlatform.validate_graph(self.repo.dump_nodes_dict(), self.repo.dump_edges_dict())

    def publish_graph_api(self, format_type: str = "JSON") -> Any:
        """API 4: Graph Publish API"""
        nodes = self.repo.dump_nodes_dict()
        edges = self.repo.dump_edges_dict()
        if format_type.upper() == "JSON":
            return GraphPublicationPlatform.export_json(nodes, edges)
        return GraphPublicationPlatform.export_neo4j_cypher(nodes, edges)

    def get_latest_version_api(self) -> Dict[str, Any]:
        """API 6: Graph Version API"""
        v = self.versions.get_latest_version()
        return v.dict()

def get_biobuilder_api_service() -> BioBuilderAPIService:
    return BioBuilderAPIService()
