"""
BIOQUORA - Entity Lifecycle Management Engine
Implements Module 10 for Step 4 Stage 3 (BioIdentity v1.0).
Tracks state transitions: PROPOSED -> VALIDATED -> ACTIVE -> UPDATED -> DEPRECATED -> ARCHIVED -> SUPERSEDED.
"""

from enum import Enum
from typing import Dict, Set, Tuple

class EntityLifecycleState(str, Enum):
    PROPOSED = "PROPOSED"
    VALIDATED = "VALIDATED"
    ACTIVE = "ACTIVE"
    UPDATED = "UPDATED"
    DEPRECATED = "DEPRECATED"
    ARCHIVED = "ARCHIVED"
    SUPERSEDED = "SUPERSEDED"

LEGAL_IDENTITY_TRANSITIONS: Dict[EntityLifecycleState, Set[EntityLifecycleState]] = {
    EntityLifecycleState.PROPOSED: {EntityLifecycleState.VALIDATED},
    EntityLifecycleState.VALIDATED: {EntityLifecycleState.ACTIVE},
    EntityLifecycleState.ACTIVE: {EntityLifecycleState.UPDATED, EntityLifecycleState.DEPRECATED, EntityLifecycleState.SUPERSEDED},
    EntityLifecycleState.UPDATED: {EntityLifecycleState.ACTIVE},
    EntityLifecycleState.DEPRECATED: {EntityLifecycleState.ARCHIVED},
    EntityLifecycleState.ARCHIVED: set(),
    EntityLifecycleState.SUPERSEDED: {EntityLifecycleState.ARCHIVED}
}

class EntityLifecycleManager:
    @staticmethod
    def transition(current_state: EntityLifecycleState, next_state: EntityLifecycleState) -> Tuple[bool, str]:
        if next_state in LEGAL_IDENTITY_TRANSITIONS.get(current_state, set()):
            return True, f"Successfully transitioned identity state: {current_state.value} -> {next_state.value}"
        return False, f"Illegal identity state transition: {current_state.value} -> {next_state.value}"
