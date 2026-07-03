"""
Bioquora Entity Resolution — Stage 2: Biomedical Named Entity Recognition
============================================================================
Ch.5 §5.5 lists production-grade model options (SciSpaCy, BioBERT,
PubMedBERT, BioLinkBERT, GatorTron). Those require large pretrained model
downloads / GPU serving infrastructure that don't belong baked into this
reference implementation.

Instead, this module defines the `BiomedicalNER` interface Bioquora's
pipeline actually depends on, plus a working `DictionaryNER` implementation
that resolves entity type from the growing KG synonym index — good enough
to drive the rest of the pipeline end-to-end, and a drop-in replacement for
a transformer model once one is wired up (just implement `.detect()`).
"""

from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from ..models import EntityType
from .preprocessing import fold_for_matching


@dataclass
class DetectedSpan:
    text: str
    entity_type: EntityType
    confidence: float


class BiomedicalNER(ABC):
    @abstractmethod
    def detect(self, text: str) -> list[DetectedSpan]:
        ...


class DictionaryNER(BiomedicalNER):
    """Looks up whole-string / substring matches against the KG's known
    synonym index to assign an entity type. This is intentionally simple:
    in production this class is swapped for a fine-tuned transformer NER
    model without touching any downstream pipeline code, since both
    implement the same `detect()` contract."""

    def __init__(self, store):
        self.store = store
        self._index: dict[str, EntityType] | None = None

    def _build_index(self):
        idx = {}
        for bq_id, text, text_norm in self.store.all_synonym_index():
            entity = self.store.get_entity(bq_id)
            if entity:
                try:
                    etype = EntityType(entity.entity_type)
                except (ValueError, TypeError):
                    etype = entity.entity_type
                idx[text_norm] = etype
        self._index = idx

    def detect(self, text: str) -> list[DetectedSpan]:
        if self._index is None:
            self._build_index()
        norm = fold_for_matching(text)
        if norm in self._index:
            return [DetectedSpan(text=text, entity_type=self._index[norm], confidence=0.9)]
        # fall back: unknown -> caller must supply entity_type explicitly
        return []

    def invalidate(self):
        """Call after new ontology data lands so the index gets rebuilt."""
        self._index = None
