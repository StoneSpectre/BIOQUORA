"""
BIOQUORA - Identity Graph Engine
Implements Module 9 for Step 4 Stage 3 (BioIdentity v1.0).
Manages explicit identity relationships: SAME_AS, ALIAS_OF, DEPRECATED_BY, REPLACED_BY, MERGED_INTO, SPLIT_FROM, DERIVED_FROM.
"""

from enum import Enum
from typing import List, Dict, Set
from pydantic import BaseModel

class IdentityRelationPredicate(str, Enum):
    SAME_AS = "SAME_AS"
    ALIAS_OF = "ALIAS_OF"
    DEPRECATED_BY = "DEPRECATED_BY"
    REPLACED_BY = "REPLACED_BY"
    MERGED_INTO = "MERGED_INTO"
    SPLIT_FROM = "SPLIT_FROM"
    DERIVED_FROM = "DERIVED_FROM"

class IdentityEdge(BaseModel):
    source_id: str
    predicate: IdentityRelationPredicate
    target_id: str
    confidence: float = 1.0
    provenance: str = "BioIdentity-Engine"

class IdentityGraphEngine:
    def __init__(self):
        self.edges: List[IdentityEdge] = []

    def add_edge(self, source_id: str, predicate: IdentityRelationPredicate, target_id: str, confidence: float = 1.0) -> None:
        self.edges.append(IdentityEdge(
            source_id=source_id,
            predicate=predicate,
            target_id=target_id,
            confidence=confidence
        ))

    def get_same_as_cluster(self, bioq_id: str) -> Set[str]:
        cluster = {bioq_id}
        changed = True
        while changed:
            changed = False
            for edge in self.edges:
                if edge.predicate == IdentityRelationPredicate.SAME_AS:
                    if edge.source_id in cluster and edge.target_id not in cluster:
                        cluster.add(edge.target_id)
                        changed = True
                    elif edge.target_id in cluster and edge.source_id not in cluster:
                        cluster.add(edge.source_id)
                        changed = True
        return cluster
