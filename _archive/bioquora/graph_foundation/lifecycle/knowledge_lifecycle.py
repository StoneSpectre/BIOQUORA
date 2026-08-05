"""
BIOQUORA - Knowledge Lifecycle State Machine
Implements Module 9 (Knowledge Lifecycle Model) for BioGraph Core v1.0.
Enforces legal state transitions across the 10-stage lifecycle.
"""

from enum import Enum
from typing import Set, Dict, Tuple

class LifecycleState(str, Enum):
    DISCOVERY = "DISCOVERY"
    EXTRACTION = "EXTRACTION"
    VALIDATION = "VALIDATION"
    ONTOLOGY_MAPPING = "ONTOLOGY_MAPPING"
    GRAPH_INTEGRATION = "GRAPH_INTEGRATION"
    PUBLICATION = "PUBLICATION"
    UPDATE = "UPDATE"
    DEPRECATION = "DEPRECATION"
    ARCHIVE = "ARCHIVE"

ALLOWED_TRANSITIONS: Dict[LifecycleState, Set[LifecycleState]] = {
    LifecycleState.DISCOVERY: {LifecycleState.EXTRACTION},
    LifecycleState.EXTRACTION: {LifecycleState.VALIDATION},
    LifecycleState.VALIDATION: {LifecycleState.ONTOLOGY_MAPPING, LifecycleState.DEPRECATION},
    LifecycleState.ONTOLOGY_MAPPING: {LifecycleState.GRAPH_INTEGRATION, LifecycleState.DEPRECATION},
    LifecycleState.GRAPH_INTEGRATION: {LifecycleState.PUBLICATION},
    LifecycleState.PUBLICATION: {LifecycleState.UPDATE, LifecycleState.DEPRECATION},
    LifecycleState.UPDATE: {LifecycleState.VALIDATION, LifecycleState.PUBLICATION},
    LifecycleState.DEPRECATION: {LifecycleState.ARCHIVE},
    LifecycleState.ARCHIVE: set()
}

class KnowledgeLifecycleEngine:
    @staticmethod
    def can_transition(current_state: LifecycleState, next_state: LifecycleState) -> bool:
        return next_state in ALLOWED_TRANSITIONS.get(current_state, set())

    @staticmethod
    def execute_transition(current_state: LifecycleState, next_state: LifecycleState) -> Tuple[bool, str]:
        if KnowledgeLifecycleEngine.can_transition(current_state, next_state):
            return True, f"Successfully transitioned from {current_state.value} -> {next_state.value}"
        return False, f"Illegal lifecycle transition attempted: {current_state.value} -> {next_state.value}"
