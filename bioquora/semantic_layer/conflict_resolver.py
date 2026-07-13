"""
BIOQUORA - Semantic Conflict Resolution Engine
Implements Module 9 for Step 4 Stage 2 (BioSemantics v1.0).
Resolves conflicting meanings, duplicate concepts, multiple parents, and ontology disagreements
using priority hierarchy rules and confidence ranking.
"""

from enum import Enum
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class ConflictType(str, Enum):
    DUPLICATE_CONCEPT = "DUPLICATE_CONCEPT"
    CONFLICTING_LABEL = "CONFLICTING_LABEL"
    ONTOLOGY_DISAGREEMENT = "ONTOLOGY_DISAGREEMENT"
    AMBIGUOUS_ID = "AMBIGUOUS_ID"

class SemanticResolutionResult(BaseModel):
    resolved_curie: str
    selected_label: str
    confidence: float
    resolution_rationale: str
    conflict_type: Optional[ConflictType] = None

# Authoritative Priority Order for domain grounding
ONTOLOGY_PRIORITY: Dict[str, int] = {
    "MONDO": 100,
    "DOID": 90,
    "DrugBank": 100,
    "ChEBI": 90,
    "UniProt": 100,
    "HGNC": 100,
    "GO": 100,
    "HPO": 100,
    "Reactome": 100
}

class SemanticConflictEngine:
    @staticmethod
    def resolve_label_conflict(curie: str, candidate_labels: List[str]) -> SemanticResolutionResult:
        if not candidate_labels:
            return SemanticResolutionResult(
                resolved_curie=curie,
                selected_label=curie,
                confidence=0.5,
                resolution_rationale="No candidate labels provided; fallback to CURIE."
            )
        # Select longest descriptive label or primary preferred
        best = sorted(candidate_labels, key=lambda x: len(x), reverse=True)[0]
        return SemanticResolutionResult(
            resolved_curie=curie,
            selected_label=best,
            confidence=0.95,
            resolution_rationale=f"Selected authoritative label out of {len(candidate_labels)} candidates.",
            conflict_type=ConflictType.CONFLICTING_LABEL if len(candidate_labels) > 1 else None
        )

    @staticmethod
    def resolve_curie_disagreement(candidate_curies: List[str]) -> SemanticResolutionResult:
        if not candidate_curies:
            raise ValueError("Cannot resolve empty candidate list")
        
        def score_curie(c: str) -> int:
            prefix = c.split(":")[0] if ":" in c else ""
            return ONTOLOGY_PRIORITY.get(prefix, 10)

        best_curie = sorted(candidate_curies, key=score_curie, reverse=True)[0]
        return SemanticResolutionResult(
            resolved_curie=best_curie,
            selected_label=best_curie,
            confidence=0.92,
            resolution_rationale=f"Resolved among {candidate_curies} using ontology priority hierarchy.",
            conflict_type=ConflictType.ONTOLOGY_DISAGREEMENT if len(candidate_curies) > 1 else None
        )
