"""
BIOQUORA TECHNICAL BIBLE — Volume I, Step 1, Part 2, Chapter 3
================================================================
id_generator.py — "Canonical Bioquora Identifier"

    Format:  BQ:<TYPE><NUMBER>          e.g. BQ:DIS00001234

Guarantees enforced here:
  - Independent of external databases (never derived from a source ID).
  - Stable once issued — an entity's bq_id never changes, even across
    merges (the *losing* entity gets `status=MERGED` + `merged_into_id`,
    it does not get renumbered or deleted).
  - Monotonic per namespace, never reused, even if an entity is deleted.
  - Safe under concurrent writers via a row-level counter with
    `SELECT ... FOR UPDATE` (Postgres) / best-effort locking (SQLite).

Padding width is 8 digits (BQ:DIS00001234 has 8 digits after the prefix),
matching the examples in Chapter 3. This supports 10^8 - 1 ≈ 99,999,999
entities per namespace before overflow — reassess if any single namespace
(most likely PUB, given biomedical literature volume) approaches that.
"""

from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.orm import Session

try:
    from .models import BQIdCounter, EntityNamespace
except ImportError:
    from models import BQIdCounter, EntityNamespace

ID_WIDTH = 8


class BQIdGenerationError(Exception):
    pass


class BQIdGenerator:
    """
    Usage:
        gen = BQIdGenerator(session)
        bq_id = gen.next_id(EntityNamespace.DIS)   # -> "BQ:DIS00000001"

    All calls are transactional: `next_id` issues the ID and persists the
    updated counter within the caller's existing session/transaction, so
    it should be called inside the same unit of work that creates the
    BioquoraEntity row (or the increment must be rolled back too).
    """

    def __init__(self, session: Session):
        self.session = session

    def next_id(self, namespace: EntityNamespace) -> str:
        counter = self.session.execute(
            select(BQIdCounter)
            .where(BQIdCounter.namespace == namespace)
            .with_for_update()  # no-op on SQLite, row lock on Postgres
        ).scalar_one_or_none()

        if counter is None:
            counter = BQIdCounter(namespace=namespace, last_value=0)
            self.session.add(counter)
            self.session.flush()

        counter.last_value += 1
        next_value = counter.last_value

        if next_value > 10**ID_WIDTH - 1:
            raise BQIdGenerationError(
                f"Namespace {namespace.value} exhausted its {ID_WIDTH}-digit "
                f"identifier space. Widen ID_WIDTH or introduce a namespace split."
            )

        self.session.flush()
        return f"BQ:{namespace.value}{next_value:0{ID_WIDTH}d}"

    def peek(self, namespace: EntityNamespace) -> int:
        """Read-only: last issued sequence number for a namespace, without
        incrementing. Useful for dashboards/reporting."""
        counter = self.session.execute(
            select(BQIdCounter).where(BQIdCounter.namespace == namespace)
        ).scalar_one_or_none()
        return counter.last_value if counter else 0

    @staticmethod
    def validate_format(bq_id: str) -> bool:
        """Chapter 3, 'Identifier Quality Rules' -> 'Valid identifier syntax'."""
        if not bq_id.startswith("BQ:"):
            return False
        body = bq_id[3:]
        for ns in EntityNamespace:
            prefix = ns.value
            if body.startswith(prefix):
                number_part = body[len(prefix):]
                return number_part.isdigit() and len(number_part) == ID_WIDTH
        return False

    @staticmethod
    def namespace_of(bq_id: str) -> EntityNamespace | None:
        if not BQIdGenerator.validate_format(bq_id):
            return None
        body = bq_id[3:]
        for ns in EntityNamespace:
            if body.startswith(ns.value):
                return ns
        return None
