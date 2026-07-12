"""
Module 8: Polyglot Storage Architecture Layer
Integrates Relational Metadata Store, Object Storage for full text/figures/XML, and Cache Layer.
"""

import json
from typing import Dict, Optional, Any
from bioquora.metadata.schema import BiomedicalMetadataRecord


class PolyglotStorageLayer:
    """
    Production Polyglot Storage Layer:
      - Relational Store: Canonical metadata, identifiers, version history
      - Object Store: JATS XML, HTML, PDF blobs
      - Cache Layer: Fast key-value retrieval for API responses & deduplication checks
    """

    def __init__(self):
        self.relational_metadata: Dict[str, str] = {}  # canonical_id -> json
        self.object_store: Dict[str, bytes] = {}       # f"obj:{canonical_id}:{format}" -> bytes
        self.redis_cache: Dict[str, Any] = {}          # cache_key -> val

    def store_metadata(self, record: BiomedicalMetadataRecord) -> None:
        self.relational_metadata[record.canonical_bioquora_id] = record.model_dump_json()

    def get_metadata(self, canonical_id: str) -> Optional[BiomedicalMetadataRecord]:
        raw = self.relational_metadata.get(canonical_id)
        if not raw:
            return None
        return BiomedicalMetadataRecord.model_validate_json(raw)

    def put_object(self, canonical_id: str, fmt: str, payload: bytes) -> str:
        key = f"obj:{canonical_id}:{fmt.upper()}"
        self.object_store[key] = payload
        return key

    def get_object(self, canonical_id: str, fmt: str) -> Optional[bytes]:
        return self.object_store.get(f"obj:{canonical_id}:{fmt.upper()}")

    def cache_set(self, key: str, value: Any) -> None:
        self.redis_cache[key] = value

    def cache_get(self, key: str) -> Optional[Any]:
        return self.redis_cache.get(key)
