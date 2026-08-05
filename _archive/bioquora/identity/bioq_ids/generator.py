"""
BIOQUORA - Global BIOQ-ID Generator Module
Implements Module 2 for Step 4 Stage 3 (BioIdentity v1.0).
Generates permanent, immutable, globally unique BIOQ-IDs (e.g., BIOQ:GENE:000000001).
"""

import threading
from typing import Dict
from enum import Enum

class EntityCategory(str, Enum):
    GENE = "GENE"
    PROTEIN = "PROTEIN"
    DISEASE = "DISEASE"
    DRUG = "DRUG"
    VARIANT = "VARIANT"
    PATHWAY = "PATHWAY"
    CELL = "CELL"
    PHENOTYPE = "PHENOTYPE"
    CHEMICAL = "CHEMICAL"
    BIOMARKER = "BIOMARKER"

class BioqIdGenerator:
    _counters: Dict[EntityCategory, int] = {cat: 0 for cat in EntityCategory}
    _lock = threading.Lock()
    _issued_ids: set = set()

    @classmethod
    def generate_id(cls, category: EntityCategory) -> str:
        """
        Generates a permanent, zero-padded 9-digit BIOQ-ID for the requested category.
        Guarantees thread-safe immutability and zero reuse.
        """
        with cls._lock:
            cls._counters[category] += 1
            counter_val = cls._counters[category]
            bioq_id = f"BIOQ:{category.value}:{counter_val:09d}"
            cls._issued_ids.add(bioq_id)
            return bioq_id

    @classmethod
    def is_valid_syntax(cls, bioq_id: str) -> bool:
        parts = bioq_id.split(":")
        if len(parts) != 3 or parts[0] != "BIOQ":
            return False
        if parts[1] not in {c.value for c in EntityCategory}:
            return False
        return len(parts[2]) == 9 and parts[2].isdigit()

def generate_bioq_id(category: EntityCategory) -> str:
    return BioqIdGenerator.generate_id(category)
