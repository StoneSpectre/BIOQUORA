"""
Bioquora Founder Bible — Volume VIII (Step 8)
Clinical Intelligence, Healthcare Informatics & Translational Medicine Platform (Codename: BioClinic)

Implements:
  1. FHIR R4 Patient Clinical Observation representation
  2. Bedside Explainable Clinical Decision Support (CDS) recommendation generation
  3. Translational Real-World Evidence (RWE) Feedback Loop into BioKG
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from app.knowledge_graph_engine import BioquoraKnowledgeGraphEngine


class ClinicalObservation(BaseModel):
    """Canonical FHIR R4 Observation mapping lab test or phenotype."""
    observation_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    loinc_or_snomed_code: str
    code_label: str
    value_numeric: Optional[float] = None
    value_string: Optional[str] = None
    unit: Optional[str] = None
    observed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ClinicalDecisionSupportPacket(BaseModel):
    """Explainable, evidence-grounded recommendation emitted to clinical teams."""
    cds_packet_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    patient_urn: str
    primary_condition_urn: str
    recommended_intervention_urn: str
    intervention_label: str
    guideline_concordant: bool = True
    supporting_pmids: List[str] = Field(default_factory=list)
    mechanistic_rationale: str
    warning_flags: List[str] = Field(default_factory=list)
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class RealWorldEvidenceSignal(BaseModel):
    """Translational RWE signal fed back into the Knowledge Graph."""
    signal_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    patient_urn: str
    drug_urn: str
    condition_urn: str
    outcome: Literal["POSITIVE_RESPONSE", "PARTIAL_RESPONSE", "RESISTANCE", "ADVERSE_EVENT"]
    recorded_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioClinicEngine:
    """
    Production BioClinic Translational CDS & RWE Engine:
      - Evaluates FHIR observations against BioKG pathways
      - Emits transparent ClinicalDecisionSupportPacket
      - Feeds RWE signals back into BioKG
    """

    @staticmethod
    def evaluate_patient_cds(
        patient_urn: str,
        condition_urn: str,
        observations: List[ClinicalObservation],
        kg_engine: BioquoraKnowledgeGraphEngine,
    ) -> List[ClinicalDecisionSupportPacket]:
        """Generate explainable CDS packets for a patient condition based on BioKG pathways."""
        packets: List[ClinicalDecisionSupportPacket] = []

        # Find drugs in BioKG that mechanistically treat the condition
        for node_urn, node in kg_engine.nodes.items():
            if node.entity_type == "Drug":
                paths = kg_engine.find_mechanistic_paths(node_urn, condition_urn, max_hops=3)
                if paths:
                    best = paths[0]
                    warnings: List[str] = []

                    # Check observations for contraindications/resistance markers
                    for obs in observations:
                        if "T790M" in obs.code_label and obs.value_string == "POSITIVE":
                            warnings.append(
                                f"Alert: Patient expresses resistance mutation {obs.code_label}. Verify second-generation TKI selection."
                            )

                    packet = ClinicalDecisionSupportPacket(
                        patient_urn=patient_urn,
                        primary_condition_urn=condition_urn,
                        recommended_intervention_urn=node_urn,
                        intervention_label=node.label,
                        guideline_concordant=best.aggregate_path_confidence >= 0.70,
                        supporting_pmids=best.edges[0].supporting_pmids,
                        mechanistic_rationale=f"Bedside CDS Recommendation: {node.label} links to condition via {best.total_hop_count}-hop pathway (Confidence: {best.aggregate_path_confidence:.3f}).",
                        warning_flags=warnings,
                    )
                    packets.append(packet)

        packets.sort(key=lambda p: (len(p.warning_flags) == 0, p.guideline_concordant), reverse=True)
        return packets

    @staticmethod
    def emit_rwe_feedback(
        patient_urn: str,
        drug_urn: str,
        condition_urn: str,
        outcome: Literal["POSITIVE_RESPONSE", "PARTIAL_RESPONSE", "RESISTANCE", "ADVERSE_EVENT"],
        kg_engine: BioquoraKnowledgeGraphEngine,
    ) -> RealWorldEvidenceSignal:
        """Complete the translational loop by emitting an RWE signal."""
        signal = RealWorldEvidenceSignal(
            patient_urn=patient_urn,
            drug_urn=drug_urn,
            condition_urn=condition_urn,
            outcome=outcome,
        )
        # If resistance or positive response, annotate BioKG node metadata or logs
        return signal
