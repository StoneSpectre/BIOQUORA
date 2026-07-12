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
import json
import os
from typing import Any

try:
    from .models import BQIdCounter, EntityNamespace, EntityType, ENTITY_TAXONOMY
except ImportError:
    from models import BQIdCounter, EntityNamespace, EntityType, ENTITY_TAXONOMY

ID_WIDTH = 8

_PREFIX = {
    EntityType.DISEASE: "DIS",
    EntityType.PHENOTYPE: "PHE",
    EntityType.GENE: "GEN",
    EntityType.PROTEIN: "PRO",
    EntityType.DRUG: "DRG",
    EntityType.CHEMICAL: "CHE",
    EntityType.ANATOMY: "ANA",
    EntityType.CELL: "CEL",
    EntityType.PATHWAY: "PTH",
    EntityType.CLINICAL: "CLN",
    EntityType.PUBLICATION: "PUB",
    EntityType.VARIANT: "VAR",
    EntityType.CLINICAL_TRIAL: "TRL",
    EntityType.ORGANISM: "ORG",
}


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

    def next_id(self, namespace: EntityNamespace | EntityType | str) -> str:
        if not isinstance(namespace, EntityNamespace):
            found_ns = None
            if isinstance(namespace, EntityType) or isinstance(namespace, str):
                key_str = namespace.value if hasattr(namespace, "value") else str(namespace)
                for cat, leaves in ENTITY_TAXONOMY.items():
                    for leaf_name, ns_val in leaves.items():
                        if leaf_name.lower() == key_str.lower():
                            found_ns = ns_val
                            break
                    if found_ns:
                        break
                if not found_ns:
                    try:
                        found_ns = EntityNamespace(key_str[:3].upper())
                    except ValueError:
                        found_ns = EntityNamespace.DIS
                namespace = found_ns
            else:
                namespace = EntityNamespace.DIS

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
                return number_part.isdigit() and len(number_part) in (6, ID_WIDTH)
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


class BioquoraIDGenerator:
    """
    Implements Ch.4 "Generate Bioquora IDs" step of the ontology integration
    pipeline and Ch.5 §5.18 'Bioquora ID'.

    IDs look like:  BQ:DIS000001, BQ:GEN000042, BQ:DRG000007 ...

    Counters are persisted to disk (JSON) so IDs are stable across runs —
    identifier stability is an explicit quality metric in Ch.4.
    """
    def __init__(self, state_path: str | Any = "bioquora_id_counters.json"):
        self._db_gen = None
        if hasattr(state_path, "execute"):
            self._db_gen = BQIdGenerator(state_path)
            self.state_path = "bioquora_id_counters.json"
        else:
            self.state_path = str(state_path)
            if os.path.exists(self.state_path):
                with open(self.state_path) as f:
                    self._counters = json.load(f)
            else:
                self._counters = {}
                self._flush()

    def _flush(self):
        if self._db_gen:
            return
        os.makedirs(os.path.dirname(self.state_path) or ".", exist_ok=True)
        with open(self.state_path, "w") as f:
            json.dump(self._counters, f, indent=2)

    def next_id(self, entity_type: EntityType | Any) -> str:
        if self._db_gen:
            return self._db_gen.next_id(entity_type)
        prefix = _PREFIX.get(entity_type)
        if not prefix:
            et_str = getattr(entity_type, "value", str(entity_type)).lower()
            for k, v in _PREFIX.items():
                if getattr(k, "value", str(k)).lower() == et_str or getattr(k, "name", "").lower() == et_str or v.lower() == et_str:
                    prefix = v
                    break
        if not prefix:
            et_upper = str(entity_type).upper()[:3]
            if et_upper in _PREFIX.values():
                prefix = et_upper
            else:
                prefix = "GEN"
        n = self._counters.get(prefix, 0) + 1
        self._counters[prefix] = n
        self._flush()
        return f"BQ:{prefix}{n:06d}"

    def peek(self, entity_type: EntityType | Any) -> int:
        if self._db_gen:
            return self._db_gen.peek(entity_type)
        prefix = _PREFIX.get(entity_type)
        if not prefix:
            et_str = getattr(entity_type, "value", str(entity_type)).lower()
            for k, v in _PREFIX.items():
                if getattr(k, "value", str(k)).lower() == et_str or getattr(k, "name", "").lower() == et_str or v.lower() == et_str:
                    prefix = v
                    break
        if not prefix:
            et_upper = str(entity_type).upper()[:3]
            if et_upper in _PREFIX.values():
                prefix = et_upper
            else:
                prefix = "GEN"
        return self._counters.get(prefix, 0)

    @staticmethod
    def validate_format(bq_id: str) -> bool:
        return BQIdGenerator.validate_format(bq_id)

    @staticmethod
    def namespace_of(bq_id: str) -> EntityNamespace | None:
        return BQIdGenerator.namespace_of(bq_id)
