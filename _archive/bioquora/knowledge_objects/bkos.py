"""
Module 2: Biomedical Knowledge Object Standard (BKOS) Canonical Specification
Canonical schema used by all Step 3 systems and consumed directly by Step 4 (Biomedical Knowledge Graph).
"""

import uuid
from datetime import datetime, timezone
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field


class BiomedicalKnowledgeObjectStandard(BaseModel):
    """
    Canonical Bioquora Biomedical Knowledge Object Standard (BKOS v1.0).
    Guarantees that Step 4 never has to resolve raw literature problems.
    """

    knowledge_object_id: str = Field(default_factory=lambda: f"bkos:{uuid.uuid4()}")
    entity_1: str
    entity_1_id: str
    entity_2: str
    entity_2_id: str
    relation: str
    event: Optional[str] = None
    ontology: str
    evidence: str
    confidence: float = 0.96
    provenance: str
    paper: str
    doi: Optional[str] = None
    pmid: Optional[str] = None
    citation: str = "Canonical literature citation"
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    version: str = "1.0.0"
    quality_score: float = 0.98

    def to_dict(self) -> Dict[str, Any]:
        d = self.model_dump()
        d["timestamp"] = self.timestamp.isoformat()
        return d
