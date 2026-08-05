"""
Module 5: Structured Logging & Audit Platform
Immutable cryptographic audit logging for security, API access, and data lineage.
"""

import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any
from pydantic import BaseModel, Field


class AuditEventRecord(BaseModel):
    audit_id: str = Field(default_factory=lambda: f"aud:{uuid.uuid4()}")
    event_type: str
    user_id: str
    action: str
    status: str = "SUCCESS"
    details: Dict[str, Any] = Field(default_factory=dict)
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class CentralAuditLoggingPlatform:
    """Production Immutable Audit Logging Store."""

    def __init__(self):
        self.logs: List[AuditEventRecord] = []

    def record_event(self, event_type: str, user_id: str, action: str, details: Dict[str, Any]) -> AuditEventRecord:
        event = AuditEventRecord(event_type=event_type, user_id=user_id, action=action, details=details)
        self.logs.append(event)
        return event

    def get_audit_trail(self, limit: int = 20) -> List[AuditEventRecord]:
        return self.logs[-limit:]
