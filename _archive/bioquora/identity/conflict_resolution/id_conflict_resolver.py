"""
BIOQUORA - Identity Conflict Resolution Engine
Implements Module 7 for Step 4 Stage 3 (BioIdentity v1.0).
Resolves same-name/different-entities, multi-ID conflicts, and cross-database disagreements.
"""

from typing import List, Dict, Any
from pydantic import BaseModel
from bioquora.identity.registry.canonical_identity import CanonicalEntityRecord

class ResolutionDecision(BaseModel):
    selected_bioq_id: str
    rationale: str
    merged_external_ids: Dict[str, str]

class IdentityConflictResolver:
    @staticmethod
    def resolve_conflicting_records(records: List[CanonicalEntityRecord]) -> ResolutionDecision:
        if not records:
            raise ValueError("No records provided to resolve")
        if len(records) == 1:
            return ResolutionDecision(
                selected_bioq_id=records[0].bioq_id,
                rationale="Single record provided; no conflict.",
                merged_external_ids=records[0].external_ids
            )

        # Authority ranking: select highest confidence score or oldest permanent BIOQ-ID
        sorted_recs = sorted(records, key=lambda x: (x.confidence_score, x.bioq_id), reverse=True)
        primary = sorted_recs[0]

        combined_ids = {}
        for r in records:
            combined_ids.update(r.external_ids)

        return ResolutionDecision(
            selected_bioq_id=primary.bioq_id,
            rationale=f"Selected authoritative record {primary.bioq_id} out of {len(records)} candidates via precedence rules.",
            merged_external_ids=combined_ids
        )
