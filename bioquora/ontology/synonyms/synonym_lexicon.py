"""
BIOQUORA - Biomedical Synonym & Alias Lexicon Engine
Implements Module 7 for Step 4 Stage 2 (BioSemantics v1.0).
Resolves ambiguous entity strings to exact canonical CURIEs.
"""

from enum import Enum
from typing import Dict, List, Optional, Set

class SynonymType(str, Enum):
    PREFERRED_LABEL = "PREFERRED_LABEL"
    EXACT_SYNONYM = "EXACT_SYNONYM"
    BROAD_SYNONYM = "BROAD_SYNONYM"
    NARROW_SYNONYM = "NARROW_SYNONYM"
    ABBREVIATION = "ABBREVIATION"
    HISTORICAL_NAME = "HISTORICAL_NAME"

class BiomedicalLexiconEngine:
    def __init__(self):
        # normalized_text -> [(curie, synonym_type)]
        self._index: Dict[str, List[tuple]] = {}

    @staticmethod
    def normalize_text(text: str) -> str:
        return " ".join(text.lower().replace("-", " ").split())

    def register_synonym(self, curie: str, text: str, syn_type: SynonymType) -> None:
        norm = self.normalize_text(text)
        if norm not in self._index:
            self._index[norm] = []
        self._index[norm].append((curie, syn_type))

    def resolve_concept(self, query_text: str) -> List[str]:
        norm = self.normalize_text(query_text)
        entries = self._index.get(norm, [])
        # Prioritize PREFERRED_LABEL and EXACT_SYNONYM
        curies = set()
        for curie, stype in sorted(entries, key=lambda x: 0 if x[1] in (SynonymType.PREFERRED_LABEL, SynonymType.EXACT_SYNONYM) else 1):
            curies.add(curie)
        return list(curies)
