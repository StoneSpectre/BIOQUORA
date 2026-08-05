"""
BIOQUORA - Node Lifecycle Management Engine
Implements Module 9 for Step 4 Stage 4 (BioNodes v1.0).
Tracks node lifecycle states: DRAFT -> CANDIDATE -> VALIDATED -> PUBLISHED -> UPDATED -> DEPRECATED -> ARCHIVED -> SUPERSEDED.
"""

from enum import Enum
from typing import Dict, Set, Tuple

class NodeLifecycleState(str, Enum):
    DRAFT = "DRAFT"
    CANDIDATE = "CANDIDATE"
    VALIDATED = "VALIDATED"
    PUBLISHED = "PUBLISHED"
    UPDATED = "UPDATED"
    DEPRECATED = "DEPRECATED"
    ARCHIVED = "ARCHIVED"
    SUPERSEDED = "SUPERSEDED"

LEGAL_NODE_TRANSITIONS: Dict[NodeLifecycleState, Set[NodeLifecycleState]] = {
    NodeLifecycleState.DRAFT: {NodeLifecycleState.CANDIDATE},
    NodeLifecycleState.CANDIDATE: {NodeLifecycleState.VALIDATED, NodeLifecycleState.DRAFT},
    NodeLifecycleState.VALIDATED: {NodeLifecycleState.PUBLISHED},
    NodeLifecycleState.PUBLISHED: {NodeLifecycleState.UPDATED, NodeLifecycleState.DEPRECATED, NodeLifecycleState.SUPERSEDED},
    NodeLifecycleState.UPDATED: {NodeLifecycleState.PUBLISHED},
    NodeLifecycleState.DEPRECATED: {NodeLifecycleState.ARCHIVED},
    NodeLifecycleState.ARCHIVED: set(),
    NodeLifecycleState.SUPERSEDED: {NodeLifecycleState.ARCHIVED}
}

class NodeLifecycleManager:
    @staticmethod
    def transition(current: NodeLifecycleState, target: NodeLifecycleState) -> Tuple[bool, str]:
        if target in LEGAL_NODE_TRANSITIONS.get(current, set()):
            return True, f"Node transition allowed: {current.value} -> {target.value}"
        return False, f"Illegal node lifecycle transition: {current.value} -> {target.value}"
