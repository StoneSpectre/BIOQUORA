"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
BQIdGenerator — Canonical Identifier Generator
"""

from __future__ import annotations

import re
from sqlalchemy import select, func
from sqlalchemy.orm import Session
from .models import BioquoraEntity, EntityNamespace


class BQIdGenerator:
    """
    Generates sequential canonical Bioquora IDs in the format:
        BQ-{namespace}-{sequence:06d}
    Example: BQ-DIS-000001
    """
    def __init__(self, session: Session):
        self.session = session
        self._pattern = re.compile(r"^BQ-([A-Z]+)-(\d+)$")

    def next_id(self, namespace: EntityNamespace) -> str:
        stmt = (
            select(BioquoraEntity.bq_id)
            .where(BioquoraEntity.namespace == namespace)
            .order_by(BioquoraEntity.bq_id.desc())
            .limit(100)
        )
        recent_ids = self.session.execute(stmt).scalars().all()
        max_seq = 0
        for bq_id in recent_ids:
            match = self._pattern.match(bq_id)
            if match and match.group(1) == namespace.value:
                seq = int(match.group(2))
                if seq > max_seq:
                    max_seq = seq

        next_seq = max_seq + 1
        return f"BQ-{namespace.value}-{next_seq:06d}"
