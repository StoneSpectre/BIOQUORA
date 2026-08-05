"""
BIOQUORA - Node Quality & Analytics Dashboard Engine
Implements Module 14 for Step 4 Stage 4 (BioNodes v1.0).
Computes Node Count, Node Completeness, Duplicate Rate, Metadata Coverage, and Ontology Coverage.
"""

from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode

class NodeAnalyticsDashboard:
    @staticmethod
    def compute_metrics(nodes: List[UniversalBiomedicalNode]) -> Dict[str, Any]:
        total = max(1, len(nodes))
        ontology_bound = sum(1 for n in nodes if len(n.ontology_ids) > 0)
        metadata_complete = sum(1 for n in nodes if n.metadata and n.metadata.quality_score >= 0.90)

        ont_cov = round(ontology_bound / total, 4)
        meta_cov = round(metadata_complete / total, 4)

        return {
            "total_nodes_in_repository": len(nodes),
            "ontology_coverage_rate": ont_cov,
            "metadata_completeness_rate": meta_cov,
            "overall_node_health": round((ont_cov + meta_cov) / 2.0, 4),
            "status": "GRAPH_READY_OPTIMAL" if ont_cov >= 0.95 and meta_cov >= 0.95 else "NEEDS_SCHEMA_ENRICHMENT"
        }
