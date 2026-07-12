"""
BIOQUORA FOUNDER BIBLE — STEP 3: STAGE 3
BIOMEDICAL NLP & KNOWLEDGE EXTRACTION ENGINE (Codename: BioUnderstand)

Production master orchestrator integrating all 12 Modules and exposing the 8 core APIs:
  1. BioNER API
  2. Entity Linking API
  3. Relation Extraction API
  4. Event Extraction API
  5. Evidence API
  6. Ontology Mapping API
  7. Knowledge Object API
  8. Validation API
"""

from typing import List, Dict, Optional, Any
from bioquora.bsdo.schema import BioquoraScientificDocumentObject
from bioquora.bionlp.schema import (
    BiomedicalEntityRecord,
    BiomedicalRelationRecord,
    BiomedicalEventRecord,
    EvidenceRecord,
    BiomedicalKnowledgeObject,
)
from bioquora.bionlp.preprocessing.engine import BiomedicalTextPreprocessingEngine
from bioquora.bionlp.ner.engine import BioNEREngine
from bioquora.bionlp.linking.engine import EntityLinkingEngine
from bioquora.bionlp.coreference.engine import CoreferenceResolutionEngine
from bioquora.bionlp.relations.engine import BiomedicalRelationExtractionEngine
from bioquora.bionlp.events.engine import BiomedicalEventExtractionEngine
from bioquora.bionlp.negation.engine import NegationSpeculationDetectionEngine
from bioquora.bionlp.evidence.engine import EvidenceIntelligenceEngine
from bioquora.bionlp.ontology.aligner import OntologyAlignmentEngine
from bioquora.bionlp.knowledge_object import KnowledgeObjectGenerator
from bioquora.bionlp.validation.validator import KnowledgeValidationEngine, Stage3ExitReport
from bioquora.bionlp.repository.store import BiomedicalKnowledgeRepository


class BioUnderstandPlatform:
    """
    Bioquora Step 3 Stage 3 Master Biomedical NLP & Knowledge Extraction Platform (BioUnderstand).
    Converts BSDO documents into semantically enriched, ontology-aligned, evidence-backed
    biomedical knowledge objects ready for Step 4 (Biomedical Knowledge Graph).
    """

    def __init__(self):
        self.preprocessor = BiomedicalTextPreprocessingEngine()
        self.ner = BioNEREngine()
        self.linker = EntityLinkingEngine()
        self.coref = CoreferenceResolutionEngine()
        self.rel_extractor = BiomedicalRelationExtractionEngine()
        self.event_extractor = BiomedicalEventExtractionEngine()
        self.certainty_detector = NegationSpeculationDetectionEngine()
        self.evidence_extractor = EvidenceIntelligenceEngine()
        self.ont_aligner = OntologyAlignmentEngine()
        self.bko_generator = KnowledgeObjectGenerator()
        self.validator = KnowledgeValidationEngine()
        self.repository = BiomedicalKnowledgeRepository()

    # ==========================================
    # API 1: BioNER API
    # ==========================================
    def extract_entities(self, text: str) -> List[BiomedicalEntityRecord]:
        """Recognize 26 biomedical entity classes."""
        return self.ner.extract_entities(text)

    # ==========================================
    # API 2: Entity Linking API
    # ==========================================
    def link_entities(self, entities: List[BiomedicalEntityRecord]) -> List[BiomedicalEntityRecord]:
        """Link recognized entities to 15 canonical biomedical ontologies."""
        return self.linker.link_entities(entities)

    # ==========================================
    # API 3: Relation Extraction API
    # ==========================================
    def extract_relations(self, entities: List[BiomedicalEntityRecord], sentence_text: str) -> List[BiomedicalRelationRecord]:
        """Extract typed causal and mechanistic relationships."""
        return self.rel_extractor.extract_relations(entities, sentence_text)

    # ==========================================
    # API 4: Event Extraction API
    # ==========================================
    def extract_events(self, sentence_text: str, entities: List[BiomedicalEntityRecord]) -> List[BiomedicalEventRecord]:
        """Extract biological events and participant entities."""
        return self.event_extractor.extract_events(sentence_text, entities)

    # ==========================================
    # API 5: Evidence API
    # ==========================================
    def extract_evidence(self, sentence_text: str) -> Optional[EvidenceRecord]:
        """Extract study design, sample size, p-value, and confidence interval evidence."""
        return self.evidence_extractor.extract_evidence(sentence_text)

    # ==========================================
    # API 6: Ontology Mapping API
    # ==========================================
    def align_ontology(self, entity: BiomedicalEntityRecord) -> Dict[str, str]:
        """Align entities into canonical Bioquora semantic framework."""
        return self.ont_aligner.align_entity_to_framework(entity)

    # ==========================================
    # API 7: Knowledge Object API
    # ==========================================
    def process_bsdo_to_knowledge(self, bsdo: BioquoraScientificDocumentObject) -> List[BiomedicalKnowledgeObject]:
        """
        Master extraction pipeline transforming a full BSDO into canonical BKO units.
        """
        generated_bkos: List[BiomedicalKnowledgeObject] = []

        for sec in bsdo.sections:
            for para in sec.paragraphs:
                sentences = self.preprocessor.normalize_and_segment(para.text)
                for sent in sentences:
                    raw_ents = self.extract_entities(sent)
                    linked_ents = self.link_entities(raw_ents)
                    relations = self.extract_relations(linked_ents, sent)
                    events = self.extract_events(sent, linked_ents)
                    certainty = self.certainty_detector.analyze_certainty(sent)
                    evidence = self.extract_evidence(sent)

                    evt_obj = events[0] if events else None

                    for rel in relations:
                        bko = self.bko_generator.generate_from_relation(
                            paper_id=bsdo.paper_id,
                            section_id=sec.section_id,
                            relation=rel,
                            event=evt_obj,
                            evidence=evidence,
                            certainty=certainty,
                            citation=f"PMID:{bsdo.metadata.pmid}" if bsdo.metadata.pmid else None,
                        )
                        self.repository.store_knowledge_object(bko)
                        generated_bkos.append(bko)

        return generated_bkos

    # ==========================================
    # API 8: Validation API
    # ==========================================
    def validate_knowledge(self, bkos: List[BiomedicalKnowledgeObject]) -> Stage3ExitReport:
        """Validate extracted knowledge objects and assert Stage 3 Exit Criteria."""
        return self.validator.validate_knowledge_objects(bkos)
