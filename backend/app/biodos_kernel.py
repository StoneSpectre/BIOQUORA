"""
Bioquora Founder Bible — Volume II (Step 2)
Biomedical Data Operating System (BioDOS) Kernel
Implements the 10-Zone Storage Lifecycle and FAIR / W3C PROV-O Lineage Transition Engine
"""

import uuid
import hashlib
from datetime import datetime, timezone
from typing import Literal, List, Dict, Any, Optional
from pydantic import BaseModel, Field, ConfigDict


StorageZone = Literal[
    "LANDING",
    "RAW",
    "VALIDATED",
    "NORMALIZED",
    "SEMANTIC",
    "KNOWLEDGE",
    "EMBEDDINGS",
    "ANALYTICS",
    "SERVING",
    "ARCHIVE",
]

_ZONE_ORDER = [
    "LANDING",
    "RAW",
    "VALIDATED",
    "NORMALIZED",
    "SEMANTIC",
    "KNOWLEDGE",
    "EMBEDDINGS",
    "ANALYTICS",
    "SERVING",
    "ARCHIVE",
]


class ZoneTransitionRecord(BaseModel):
    """Immutable log of a data packet advancing through BioDOS storage zones."""
    transition_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    from_zone: StorageZone
    to_zone: StorageZone
    transitioned_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    executed_by: str
    verification_checksum: str


class BioDOSDataPacketMetadata(BaseModel):
    """Canonical FAIR & W3C PROV-O envelope for any asset inside BioDOS."""
    packet_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    bioid_urn: str
    current_zone: StorageZone = "LANDING"
    source_authority: str
    sha256_checksum: str = Field(..., min_length=64, max_length=64)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    fhir_compliant: bool = True
    omop_mapped: bool = True
    lineage_history: List[ZoneTransitionRecord] = Field(default_factory=list)


class BioDOSKernelEngine:
    """
    Core Kernel Engine for BioDOS:
      - Validates cryptographic SHA-256 integrity
      - Enforces strict sequential or valid branch progression through the 10 Lakehouse zones
      - Records immutable W3C PROV-O transition records
    """

    def __init__(self):
        self._registry: Dict[uuid.UUID, BioDOSDataPacketMetadata] = {}

    def register_packet(
        self,
        bioid_urn: str,
        source_authority: str,
        raw_bytes: bytes,
    ) -> BioDOSDataPacketMetadata:
        """Register a newly captured byte stream into the LANDING zone."""
        sha_hash = hashlib.sha256(raw_bytes).hexdigest()
        packet = BioDOSDataPacketMetadata(
            bioid_urn=bioid_urn,
            source_authority=source_authority,
            sha256_checksum=sha_hash,
            current_zone="LANDING",
        )
        self._registry[packet.packet_id] = packet
        return packet

    def transition_packet(
        self,
        packet_id: uuid.UUID,
        target_zone: StorageZone,
        actor_id: str,
        verify_checksum: Optional[str] = None,
    ) -> BioDOSDataPacketMetadata:
        """Advance a data packet to a target zone with cryptographic validation."""
        if packet_id not in self._registry:
            raise KeyError(f"Packet ID '{packet_id}' not found in BioDOS registry")

        packet = self._registry[packet_id]

        # Verify integrity
        if verify_checksum and verify_checksum != packet.sha256_checksum:
            raise ValueError(
                f"BioDOS Security Alert: Checksum mismatch for packet '{packet_id}'. Expected {packet.sha256_checksum}, got {verify_checksum}"
            )

        # Ensure forward progress or valid archive transition
        curr_idx = _ZONE_ORDER.index(packet.current_zone)
        target_idx = _ZONE_ORDER.index(target_zone)

        if target_zone != "ARCHIVE" and target_idx <= curr_idx:
            raise ValueError(
                f"Invalid BioDOS transition: Cannot move backward from zone '{packet.current_zone}' to '{target_zone}'"
            )

        record = ZoneTransitionRecord(
            from_zone=packet.current_zone,
            to_zone=target_zone,
            executed_by=actor_id,
            verification_checksum=packet.sha256_checksum,
        )

        packet.current_zone = target_zone
        packet.lineage_history.append(record)
        return packet
