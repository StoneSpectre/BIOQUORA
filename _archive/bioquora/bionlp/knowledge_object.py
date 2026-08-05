"""
Module 10: Knowledge Object Generator
Synthesizes entities, relations, events, evidence, and ontology alignments into canonical BKO units.
"""

from typing import List, Optional
from bioquora.bionlp.schema import (
    BiomedicalKnowledgeObject,
    BiomedicalRelationRecord,
    BiomedicalEventRecord,
    EvidenceRecord,
    CertaintyLabel,
)
from bioquora.bionlp.ontology.aligner import OntologyAlignmentEngine


class KnowledgeObjectGenerator:
    """Production Knowledge Object Synthesizer."""

    def __init__(self):
        self.aligner = OntologyAlignmentEngine()

    def generate_from_relation(
        self,
        paper_id: str,
        section_id: str,
        relation: BiomedicalRelationRecord,
        event: Optional[BiomedicalEventRecord],
        evidence: Optional[EvidenceRecord],
        certainty: CertaintyLabel,
        citation: Optional[str] = None,
    ) -> BiomedicalKnowledgeObject:
        subj_map = self.aligner.align_entity_to_framework(relation.subject_entity)
        obj_map = self.aligner.align_entity_to_framework(relation.object_entity)

        combined_map = {**subj_map, **obj_map}

        return BiomedicalKnowledgeObject(
            subject_entity=relation.subject_entity,
            relationship=relation.predicate,
            object_entity=relation.object_entity,
            event=event,
            evidence=evidence or relation.evidence,
            citation=citation,
            ontology_mappings=combined_map,
            certainty=certainty,
            confidence=relation.confidence,
            paper_id=paper_id,
            section_id=section_id,
            sentence_text=relation.sentence_text,
            provenance={
                "generator": "biounderstand-1.0.0-PROD",
                "evidence_attached": evidence is not None,
                "certainty_label": certainty,
            },
        )
