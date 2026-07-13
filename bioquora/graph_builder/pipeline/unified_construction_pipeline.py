"""
BIOQUORA - Unified Biomedical Graph Construction Pipeline
Implements Module 1 & Module 17 for Step 4 Stage 6 (BioBuilder v1.0).
Coordinates Stage 3 (Canonical Identity) -> Stage 4 (Node Factory) -> Stage 6 (Edge Builder + Merge + Validate + Publish).
"""

from typing import List, Dict, Any, Tuple
from bioquora.graph_identity.stage2_identity_integration import GraphNodeCandidateEnvelope
from bioquora.nodes.factory.node_factory import BiomedicalNodeFactory
from bioquora.graph_builder.edge_builder.edge_builder_engine import EdgeBuilderEngine
from bioquora.graph_builder.repository.graph_repository import get_graph_repository
from bioquora.graph_builder.merge_engine.graph_merge import GraphMergeEngine, MergeStrategy
from bioquora.graph_builder.validation.graph_validator import GraphValidationPlatform
from bioquora.graph_builder.versioning.graph_version_manager import GraphVersionManager

class UnifiedGraphConstructionPipeline:
    def __init__(self):
        self.repo = get_graph_repository()
        self.version_manager = GraphVersionManager()

    def build_and_publish_graph(
        self,
        node_candidates: List[GraphNodeCandidateEnvelope],
        edge_triples: List[Tuple[str, str, str, float]],
        version_tag: str = "v1.0.0"
    ) -> Dict[str, Any]:
        """Runs full construction pipeline from identity candidates to published version."""
        built_nodes = []
        for cand in node_candidates:
            n = BiomedicalNodeFactory.create_node_from_identity_candidate(cand)
            built_nodes.append(n)

        built_edges = []
        for src, tgt, pred, conf in edge_triples:
            e = EdgeBuilderEngine.build_edge(src, tgt, pred, confidence=conf)
            built_edges.append(e)

        merge_res = GraphMergeEngine.merge_subgraph(
            self.repo.dump_nodes_dict(),
            self.repo.dump_edges_dict(),
            built_nodes,
            built_edges,
            MergeStrategy.MERGE
        )

        val_report = GraphValidationPlatform.validate_graph(
            self.repo.dump_nodes_dict(),
            self.repo.dump_edges_dict()
        )
        if not val_report["validation_passed"]:
            raise ValueError(f"Constructed graph failed validation: {val_report}")

        rel = self.version_manager.register_release(
            tag=version_tag,
            release_type="MAJOR",
            nodes=self.repo.get_node_count(),
            edges=self.repo.get_edge_count(),
            summary=f"Automated pipeline build of {len(built_nodes)} nodes and {len(built_edges)} edges."
        )

        return {
            "version": rel.version_tag,
            "node_count": self.repo.get_node_count(),
            "edge_count": self.repo.get_edge_count(),
            "merge_summary": merge_res,
            "validation_status": val_report["overall_status"],
            "status": "CONSTRUCTION_SUCCESS"
        }
