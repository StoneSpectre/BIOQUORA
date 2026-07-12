"""
Module 3: Knowledge Graph Export Engine
Converts Canonical BKOS objects into JSON Triples, Neo4j CSV Nodes/Edges, RDF/Turtle, and GraphML for Step 4 ingestion.
"""

from typing import List, Dict, Any
from bioquora.knowledge_objects.bkos import BiomedicalKnowledgeObjectStandard


class KnowledgeGraphExportEngine:
    """Production Multi-Format Graph Exporter for Step 4 Knowledge Graph."""

    def export_json_triples(self, bkos_list: List[BiomedicalKnowledgeObjectStandard]) -> List[Dict[str, Any]]:
        return [
            {
                "subject": b.entity_1,
                "subject_id": b.entity_1_id,
                "predicate": b.relation,
                "object": b.entity_2,
                "object_id": b.entity_2_id,
                "evidence": b.evidence,
                "confidence": b.confidence,
                "paper": b.paper,
                "ontology": b.ontology,
            }
            for b in bkos_list
        ]

    def export_neo4j_csv(self, bkos_list: List[BiomedicalKnowledgeObjectStandard]) -> Dict[str, str]:
        nodes_csv = "id:ID,name,ontology\n"
        edges_csv = ":START_ID,:END_ID,relation,evidence,confidence\n"

        seen_nodes = set()
        for b in bkos_list:
            if b.entity_1_id not in seen_nodes:
                nodes_csv += f"{b.entity_1_id},{b.entity_1},{b.ontology.split('->')[0]}\n"
                seen_nodes.add(b.entity_1_id)
            if b.entity_2_id not in seen_nodes:
                nodes_csv += f"{b.entity_2_id},{b.entity_2},{b.ontology.split('->')[-1]}\n"
                seen_nodes.add(b.entity_2_id)

            edges_csv += f"{b.entity_1_id},{b.entity_2_id},{b.relation},\"{b.evidence}\",{b.confidence}\n"

        return {"nodes_csv": nodes_csv, "edges_csv": edges_csv}

    def export_rdf_turtle(self, bkos_list: List[BiomedicalKnowledgeObjectStandard]) -> str:
        ttl = "@prefix bkos: <http://bioquora.org/ontology/bkos#> .\n"
        ttl += "@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .\n\n"

        for b in bkos_list:
            subj_clean = b.entity_1_id.replace(":", "_")
            obj_clean = b.entity_2_id.replace(":", "_")
            ttl += f"bkos:{subj_clean} bkos:{b.relation} bkos:{obj_clean} .\n"
            ttl += f"bkos:{subj_clean} rdfs:label \"{b.entity_1}\" .\n"
            ttl += f"bkos:{obj_clean} rdfs:label \"{b.entity_2}\" .\n\n"

        return ttl
