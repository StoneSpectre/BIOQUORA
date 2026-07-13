"""
BIOQUORA - Entity Merge & Split Manager
Implements Module 8 for Step 4 Stage 3 (BioIdentity v1.0).
Executes identity merges and splits while maintaining immutable lineage and provenance.
"""

from typing import List, Dict, Any, Tuple
from pydantic import BaseModel
from bioquora.identity.registry.canonical_identity import CanonicalEntityRecord
from bioquora.identity.bioq_ids.generator import generate_bioq_id

class MergeOperationRecord(BaseModel):
    surviving_bioq_id: str
    merged_bioq_ids: List[str]
    operation_type: str = "MERGE"
    rationale: str

class SplitOperationRecord(BaseModel):
    source_bioq_id: str
    new_bioq_ids: List[str]
    operation_type: str = "SPLIT"
    rationale: str

class MergeSplitManager:
    def __init__(self):
        self.merge_history: List[MergeOperationRecord] = []
        self.split_history: List[SplitOperationRecord] = []

    def execute_merge(self, surviving_record: CanonicalEntityRecord, absorbed_records: List[CanonicalEntityRecord], rationale: str) -> CanonicalEntityRecord:
        absorbed_ids = []
        for abs_rec in absorbed_records:
            surviving_record.aliases.append(abs_rec.preferred_name)
            surviving_record.aliases.extend(abs_rec.aliases)
            surviving_record.external_ids.update(abs_rec.external_ids)
            absorbed_ids.append(abs_rec.bioq_id)
            abs_rec.lifecycle_status = "MERGED_SUPERSEDED"

        surviving_record.aliases = sorted(list(set(surviving_record.aliases)))
        self.merge_history.append(MergeOperationRecord(
            surviving_bioq_id=surviving_record.bioq_id,
            merged_bioq_ids=absorbed_ids,
            rationale=rationale
        ))
        return surviving_record

    def execute_split(self, source_record: CanonicalEntityRecord, split_names: List[str], rationale: str) -> List[CanonicalEntityRecord]:
        source_record.lifecycle_status = "SPLIT_SUPERSEDED"
        new_records = []
        for name in split_names:
            new_id = generate_bioq_id(source_record.entity_type)
            new_rec = CanonicalEntityRecord(
                bioq_id=new_id,
                preferred_name=name,
                preferred_ontology_id=source_record.preferred_ontology_id,
                entity_type=source_record.entity_type,
                namespace=source_record.namespace,
                confidence_score=0.95
            )
            new_records.append(new_rec)

        self.split_history.append(SplitOperationRecord(
            source_bioq_id=source_record.bioq_id,
            new_bioq_ids=[r.bioq_id for r in new_records],
            rationale=rationale
        ))
        return new_records
