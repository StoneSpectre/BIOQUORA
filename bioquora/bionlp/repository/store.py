"""
Module 12: Bioquora Biomedical Knowledge Repository
Stores validated BKO triples and serves GraphRAG / Step 4 Knowledge Graph ingestion.
"""

from typing import Dict, List, Optional
from bioquora.bionlp.schema import BiomedicalKnowledgeObject


class BiomedicalKnowledgeRepository:
    """Production Knowledge Object Repository & Triple Server."""

    def __init__(self):
        self.store: Dict[str, BiomedicalKnowledgeObject] = {}

    def store_knowledge_object(self, bko: BiomedicalKnowledgeObject) -> str:
        self.store[bko.knowledge_id] = bko
        return bko.knowledge_id

    def get_by_id(self, knowledge_id: str) -> Optional[BiomedicalKnowledgeObject]:
        return self.store.get(knowledge_id)

    def get_by_paper_id(self, paper_id: str) -> List[BiomedicalKnowledgeObject]:
        return [b for b in self.store.values() if b.paper_id == paper_id]

    def export_graph_triples(self) -> List[Dict[str, str]]:
        """Export graph-ready triples for Step 4 Biomedical Knowledge Graph."""
        triples = []
        for b in self.store.values():
            triples.append({
                "subject": b.subject_entity.canonical_id or b.subject_entity.text,
                "predicate": b.relationship,
                "object": b.object_entity.canonical_id or b.object_entity.text,
                "certainty": b.certainty,
                "confidence": str(b.confidence),
                "paper_id": b.paper_id,
            })
        return triples
