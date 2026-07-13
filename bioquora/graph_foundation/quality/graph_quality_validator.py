"""
BIOQUORA - Graph Quality Assurance & Verification Engine
Measures candidate nodes/edges against the 9 Constitutional Quality Metrics.
"""

from typing import List, Dict, Any, Tuple
from bioquora.graph_foundation.modeling.node_edge_taxonomy import NodeMetadataEnvelope, GraphEdgeSpecification
from bioquora.graph_foundation.architecture.semantic_layer import SemanticLayerEngine

class GraphQualityValidator:
    @staticmethod
    def evaluate_batch(nodes: List[NodeMetadataEnvelope], edges: List[GraphEdgeSpecification]) -> Dict[str, Any]:
        node_ids = {n.bioq_id for n in nodes}
        preferred_ids = set()
        duplicates = 0
        ontology_passed = 0
        node_integrity = 0

        for n in nodes:
            if n.bioq_id and n.preferred_id and n.name:
                node_integrity += 1
            if n.preferred_id in preferred_ids:
                duplicates += 1
            else:
                preferred_ids.add(n.preferred_id)
            ok, _ = SemanticLayerEngine.verify_node(n)
            if ok:
                ontology_passed += 1

        dangling_edges = 0
        evidence_passed = 0
        edge_integrity = 0

        for e in edges:
            if e.source_bioq_id in node_ids and e.target_bioq_id in node_ids:
                pass
            else:
                dangling_edges += 1

            ok, _ = SemanticLayerEngine.verify_edge(e)
            if ok:
                evidence_passed += 1
            if e.edge_id and e.predicate:
                edge_integrity += 1

        n_count = max(1, len(nodes))
        e_count = max(1, len(edges))

        metrics = {
            "graph_consistency": 1.0 if dangling_edges == 0 else 0.0,
            "ontology_compliance": ontology_passed / n_count,
            "duplicate_rate": duplicates / n_count,
            "evidence_completeness": evidence_passed / e_count,
            "node_integrity": node_integrity / n_count,
            "edge_integrity": edge_integrity / e_count,
            "overall_quality_score": round((
                (ontology_passed / n_count) + (evidence_passed / e_count) +
                (node_integrity / n_count) + (edge_integrity / e_count)
            ) / 4.0, 4)
        }
        return metrics
