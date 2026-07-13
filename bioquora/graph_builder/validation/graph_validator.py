"""
BIOQUORA - End-to-End Graph Validation Platform
Implements Module 10 for Step 4 Stage 6 (BioBuilder v1.0).
Combines schema compliance, edge semantic constraints, and topological integrity audits.
"""

from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge
from bioquora.graph_builder.validation.graph_constraints import GraphConstraintsEngine
from bioquora.graph_builder.validation.graph_integrity import GraphIntegrityEngine

class GraphValidationPlatform:
    @staticmethod
    def validate_graph(
        nodes: Dict[str, UniversalBiomedicalNode],
        edges: Dict[str, BiomedicalGraphEdge]
    ) -> Dict[str, Any]:
        constraint_violations = []
        for eid, edge in edges.items():
            src_node = nodes.get(edge.source_bioq_id)
            tgt_node = nodes.get(edge.target_bioq_id)
            if src_node and tgt_node:
                ok, msg = GraphConstraintsEngine.validate_semantic_constraint(
                    src_node.entity_type,
                    tgt_node.entity_type,
                    edge.predicate
                )
                if not ok:
                    constraint_violations.append({"edge_id": eid, "error": msg})

        integrity_report = GraphIntegrityEngine.audit_graph_integrity(nodes, edges)

        is_valid = integrity_report["is_graph_consistent"] and len(constraint_violations) == 0

        return {
            "validation_passed": is_valid,
            "constraint_violations": constraint_violations,
            "constraint_violation_count": len(constraint_violations),
            "integrity_report": integrity_report,
            "overall_status": "VALIDATED_PRODUCTION_GRAPH" if is_valid else "VALIDATION_FAILED"
        }
