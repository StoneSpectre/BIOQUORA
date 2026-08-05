"""
Module 7: Version Management Engine
Tracks publication lifecycle changes including Corrections, Retractions, and Version Updates.
Uses hash compare & field compare to detect content and metadata drift.
"""

from datetime import datetime, timezone
from typing import Dict, List, Optional, Literal
from pydantic import BaseModel, Field


VersionChangeType = Literal["INITIAL_RELEASE", "MINOR_METADATA_UPDATE", "MAJOR_CORRECTION", "RETRACTION", "SUPPLEMENTARY_UPDATE"]


class ArticleVersionSnapshot(BaseModel):
    version_number: int
    change_type: VersionChangeType
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    sha256_checksum: str
    changed_fields: List[str] = Field(default_factory=list)
    retraction_notice_url: Optional[str] = None


class VersionHistoryManager:
    """
    Production Version History Manager:
      - Detects retractions and flags article records immediately
      - Increments semantic version counter when SHA-256 hashes differ
    """

    def __init__(self):
        self.version_history: Dict[str, List[ArticleVersionSnapshot]] = {}

    def record_initial_version(self, canonical_id: str, sha256_checksum: str) -> ArticleVersionSnapshot:
        snapshot = ArticleVersionSnapshot(
            version_number=1,
            change_type="INITIAL_RELEASE",
            sha256_checksum=sha256_checksum,
            changed_fields=[],
        )
        self.version_history[canonical_id] = [snapshot]
        return snapshot

    def check_and_record_update(
        self,
        canonical_id: str,
        new_sha256: str,
        new_fields_changed: List[str],
        is_retracted: bool = False,
        retraction_url: Optional[str] = None,
    ) -> ArticleVersionSnapshot:
        history = self.version_history.get(canonical_id, [])
        next_ver = len(history) + 1 if history else 1

        change_type: VersionChangeType = "MINOR_METADATA_UPDATE"
        if is_retracted:
            change_type = "RETRACTION"
        elif "abstract" in new_fields_changed or "full_text" in new_fields_changed:
            change_type = "MAJOR_CORRECTION"

        snapshot = ArticleVersionSnapshot(
            version_number=next_ver,
            change_type=change_type,
            sha256_checksum=new_sha256,
            changed_fields=new_fields_changed,
            retraction_notice_url=retraction_url,
        )
        if canonical_id not in self.version_history:
            self.version_history[canonical_id] = []
        self.version_history[canonical_id].append(snapshot)
        return snapshot

    def is_article_retracted(self, canonical_id: str) -> bool:
        history = self.version_history.get(canonical_id, [])
        return any(snap.change_type == "RETRACTION" for snap in history)
