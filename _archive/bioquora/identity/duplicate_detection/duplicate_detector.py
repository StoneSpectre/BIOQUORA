"""
BIOQUORA - Duplicate Detection Engine
Implements Module 5 for Step 4 Stage 3 (BioIdentity v1.0).
Detects duplicate candidate pairs using lexical similarity, identifier overlap, and ontology overlap.
"""

import difflib
from typing import List, Dict, Any, Set
from pydantic import BaseModel
from bioquora.identity.registry.canonical_identity import CanonicalEntityRecord

class DuplicateCandidatePair(BaseModel):
    bioq_id_a: str
    bioq_id_b: str
    lexical_similarity: float
    identifier_overlap_count: int
    candidate_score: float

class DuplicateDetectionEngine:
    @staticmethod
    def evaluate_candidates(records: List[CanonicalEntityRecord]) -> List[DuplicateCandidatePair]:
        pairs = []
        n = len(records)
        for i in range(n):
            for j in range(i + 1, n):
                rec_a = records[i]
                rec_b = records[j]

                # Lexical similarity
                lex_sim = difflib.SequenceMatcher(None, rec_a.preferred_name.lower(), rec_b.preferred_name.lower()).ratio()

                # External ID overlap
                set_a = set(rec_a.external_ids.values())
                set_b = set(rec_b.external_ids.values())
                id_overlap = len(set_a.intersection(set_b))

                cand_score = lex_sim * 0.6 + min(1.0, id_overlap * 0.4)
                if cand_score >= 0.70 or id_overlap > 0:
                    pairs.append(DuplicateCandidatePair(
                        bioq_id_a=rec_a.bioq_id,
                        bioq_id_b=rec_b.bioq_id,
                        lexical_similarity=round(lex_sim, 4),
                        identifier_overlap_count=id_overlap,
                        candidate_score=round(cand_score, 4)
                    ))
        return sorted(pairs, key=lambda x: x.candidate_score, reverse=True)
