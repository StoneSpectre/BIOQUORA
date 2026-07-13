"""
BIOQUORA - Synonym Intelligence Engine
Implements Module 3 for Step 4 Stage 3 (BioIdentity v1.0).
Captures exact, broad, narrow, acronym, abbreviation, and commercial/historical synonyms.
"""

from enum import Enum
from typing import Dict, List, Optional

class IdentitySynonymRelation(str, Enum):
    EXACT = "EXACT"
    BROAD = "BROAD"
    NARROW = "NARROW"
    ACRONYM = "ACRONYM"
    ABBREVIATION = "ABBREVIATION"
    COMMERCIAL_NAME = "COMMERCIAL_NAME"
    HISTORICAL_NAME = "HISTORICAL_NAME"

class SynonymKnowledgeBase:
    def __init__(self):
        # normalized_text -> [(bioq_id, relation_type)]
        self._index: Dict[str, List[tuple]] = {}

    @staticmethod
    def normalize_str(text: str) -> str:
        return " ".join(text.lower().replace("-", " ").replace(",", "").split())

    def register_synonym(self, bioq_id: str, text: str, relation: IdentitySynonymRelation) -> None:
        norm = self.normalize_str(text)
        if norm not in self._index:
            self._index[norm] = []
        self._index[norm].append((bioq_id, relation))

    def resolve_to_bioq_ids(self, query: str) -> List[str]:
        norm = self.normalize_str(query)
        matches = self._index.get(norm, [])
        # Prioritize EXACT and COMMERCIAL_NAME
        bioq_ids = set()
        for bioq_id, _ in matches:
            bioq_ids.add(bioq_id)
        return sorted(list(bioq_ids))
