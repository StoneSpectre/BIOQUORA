"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
Entity Resolution Pipeline package.
"""

from .models import (
    BioquoraEntity,
    ConfidenceSignal,
    ConfidenceSignalType,
    ENTITY_TAXONOMY,
    EntityNamespace,
    EntityStatus,
    EntityVersion,
    ChangeType,
    EvidenceLevel,
    EvidenceRecord,
    ExternalIdentifier,
    OntologyMembership,
    ProvenanceRecord,
    SourceDatabase,
    Synonym,
    SynonymType,
    BQIdCounter,
)
from .id_generator import BQIdGenerator, BQIdGenerationError, ID_WIDTH
from .resolution_pipeline import (
    EntityResolutionPipeline,
    IncomingRecord,
    ConfidenceBreakdown,
    ResolutionResult,
    ConflictError,
    SIGNAL_WEIGHTS,
    EVIDENCE_LEVEL_WEIGHT,
    SOURCE_AUTHORITY_TIER,
)

__all__ = [
    "BioquoraEntity",
    "ConfidenceSignal",
    "ConfidenceSignalType",
    "ENTITY_TAXONOMY",
    "EntityNamespace",
    "EntityStatus",
    "EntityVersion",
    "ChangeType",
    "EvidenceLevel",
    "EvidenceRecord",
    "ExternalIdentifier",
    "OntologyMembership",
    "ProvenanceRecord",
    "SourceDatabase",
    "Synonym",
    "SynonymType",
    "BQIdCounter",
    "BQIdGenerator",
    "BQIdGenerationError",
    "ID_WIDTH",
    "EntityResolutionPipeline",
    "IncomingRecord",
    "ConfidenceBreakdown",
    "ResolutionResult",
    "ConflictError",
    "SIGNAL_WEIGHTS",
    "EVIDENCE_LEVEL_WEIGHT",
    "SOURCE_AUTHORITY_TIER",
]
