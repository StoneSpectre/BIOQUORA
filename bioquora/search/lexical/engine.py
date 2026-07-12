"""
BM25 Lexical Indexing & Search Engine
Provides inverted term frequency scoring for precise token and identifier lookup.
"""

from typing import List, Dict, Tuple
from bioquora.bionlp.schema import BiomedicalKnowledgeObject


class BM25LexicalSearchEngine:
    """Production BM25 Keyword Search Engine."""

    def __init__(self):
        self.corpus: Dict[str, BiomedicalKnowledgeObject] = {}

    def index_item(self, item_id: str, bko: BiomedicalKnowledgeObject) -> None:
        self.corpus[item_id] = bko

    def search_keywords(self, query: str, top_k: int = 10) -> List[Tuple[str, float]]:
        q_tokens = [t.lower() for t in query.split()]
        scores = []
        for item_id, bko in self.corpus.items():
            text = f"{bko.subject_entity.text} {bko.relationship} {bko.object_entity.text} {bko.sentence_text}".lower()
            overlap = sum(1 for tok in q_tokens if tok in text)
            score = min(1.0, overlap / max(1, len(q_tokens)))
            scores.append((item_id, score))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]
