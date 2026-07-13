"""
BIOQUORA - Multi-Signal Entity Matching Engine
Implements Module 6 for Step 4 Stage 3 (BioIdentity v1.0).
Computes Match Score -> Confidence Score -> Equivalence Decision (MATCH / NO_MATCH / REVIEW_REQUIRED).
"""

from enum import Enum
from typing import Dict, Any
from pydantic import BaseModel
from bioquora.identity.registry.canonical_identity import CanonicalEntityRecord

class MatchDecision(str, Enum):
    MATCH = "MATCH"
    NO_MATCH = "NO_MATCH"
    REVIEW_REQUIRED = "REVIEW_REQUIRED"

class EntityMatchResult(BaseModel):
    bioq_id_a: str
    bioq_id_b: str
    match_score: float
    confidence_score: float
    decision: MatchDecision
    signals: Dict[str, float]

class EntityMatchingEngine:
    @staticmethod
    def match_entities(rec_a: CanonicalEntityRecord, rec_b: CanonicalEntityRecord) -> EntityMatchResult:
        name_exact = 1.0 if rec_a.preferred_name.lower() == rec_b.preferred_name.lower() else 0.0
        curie_exact = 1.0 if rec_a.preferred_ontology_id == rec_b.preferred_ontology_id else 0.0

        set_a = set(rec_a.external_ids.values())
        set_b = set(rec_b.external_ids.values())
        overlap = len(set_a.intersection(set_b))
        id_score = 1.0 if overlap > 0 else 0.0

        match_score = (name_exact * 0.4) + (curie_exact * 0.4) + (id_score * 0.2)
        confidence = match_score

        if match_score >= 0.85:
            decision = MatchDecision.MATCH
        elif match_score >= 0.60:
            decision = MatchDecision.REVIEW_REQUIRED
        else:
            decision = MatchDecision.NO_MATCH

        return EntityMatchResult(
            bioq_id_a=rec_a.bioq_id,
            bioq_id_b=rec_b.bioq_id,
            match_score=round(match_score, 4),
            confidence_score=round(confidence, 4),
            decision=decision,
            signals={"name_exact": name_exact, "curie_exact": curie_exact, "id_overlap": id_score}
        )
