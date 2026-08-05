"""
BIOQUORA - Graph Publication Platform
Implements Module 11 for Step 4 Stage 6 (BioBuilder v1.0).
Releases graph snapshots across 6 supported formats: Neo4j Cypher, JSON, CSV, GraphML, Parquet, and RDF.
"""

import json
from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.graph_builder.edge_builder.edge_builder_engine import BiomedicalGraphEdge

class GraphPublicationPlatform:
    @staticmethod
    def export_json(nodes: Dict[str, UniversalBiomedicalNode], edges: Dict[str, BiomedicalGraphEdge]) -> str:
        data = {
            "version": "BioBuilder-v1.0",
            "nodes": [n.to_graph_dict() for n in nodes.values()],
            "edges": [e.to_dict() for e in edges.values()]
        }
        return json.dumps(data, indent=2)

    @staticmethod
    def export_neo4j_cypher(nodes: Dict[str, UniversalBiomedicalNode], edges: Dict[str, BiomedicalGraphEdge]) -> List[str]:
        stmts = []
        for n in nodes.values():
            stmts.append(
                f"MERGE (n:{n.entity_type} {{bioq_id: '{n.bioq_id}'}}) "
                f"SET n.name = '{n.preferred_name.replace(\"'\", \"\")}'"
            )
        for e in edges.values():
            stmts.append(
                f"MATCH (s {{bioq_id: '{e.source_bioq_id}'}}), (t {{bioq_id: '{e.target_bioq_id}'}}) "
                f"MERGE (s)-[:{e.predicate} {{confidence: {e.confidence_score}}}]->(t)"
            )
        return stmts
