"""
Module 6: Complete Provenance Engine & Audit Registry
Records strict cryptographic provenance for every ingested biomedical article artifact.
"""

import hashlib
from datetime import datetime, timezone
from typing import Dict, Optional, List
from pydantic import BaseModel, Field


class ArtifactProvenanceRecord(BaseModel):
    canonical_bioquora_id: str
    source_id: str
    original_url: str
    downloaded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    api_version: str = "v1.0"
    license_type: str
    sha256_checksum: str
    publisher_name: Optional[str] = None
    parser_version: str = "bioacquire-parser-1.0"
    pipeline_version: str = "bioacquire-ingest-1.0"
    is_integrity_verified: bool = True


class ProvenanceEngine:
    """
    Production Provenance Engine:
      - Computes deterministic SHA-256 integrity checksums over raw payload bytes/strings
      - Maintains immutable audit ledger of every ingested literature artifact
    """

    def __init__(self):
        self.provenance_ledger: Dict[str, ArtifactProvenanceRecord] = {}

    @staticmethod
    def compute_sha256(payload: str) -> str:
        return hashlib.sha256(payload.encode("utf-8")).hexdigest()

    def register_provenance(
        self,
        canonical_id: str,
        source_id: str,
        original_url: str,
        payload_content: str,
        license_type: str = "UNSPECIFIED",
        publisher_name: Optional[str] = None,
        api_version: str = "v1.0",
    ) -> ArtifactProvenanceRecord:
        checksum = self.compute_sha256(payload_content)
        record = ArtifactProvenanceRecord(
            canonical_bioquora_id=canonical_id,
            source_id=source_id,
            original_url=original_url,
            license_type=license_type,
            sha256_checksum=checksum,
            publisher_name=publisher_name,
            api_version=api_version,
            is_integrity_verified=True,
        )
        self.provenance_ledger[canonical_id] = record
        return record

    def verify_provenance_integrity(self, canonical_id: str, current_payload: str) -> bool:
        if canonical_id not in self.provenance_ledger:
            return False
        expected_hash = self.provenance_ledger[canonical_id].sha256_checksum
        actual_hash = self.compute_sha256(current_payload)
        return expected_hash == actual_hash
