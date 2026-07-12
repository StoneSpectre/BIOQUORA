"""
Bioquora Founder Bible — Volume IX (Step 9)
ResearchOS, Scientific Agents & Autonomous Biomedical Research Platform (Codename: BioResearchOS)

Implements:
  1. Automated Mechanistic Hypothesis Formulation from BioKG
  2. Statistical Experiment Protocol Design & Power Analysis
  3. FAIR RO-Crate SHA-256 Provenance Snapshotting
"""

import uuid
import hashlib
import json
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from app.knowledge_graph_engine import BioquoraKnowledgeGraphEngine


LifecycleStage = Literal[
    "QUESTION", "LITERATURE_REVIEW", "KG_EXPLORATION", "HYPOTHESIS_GENERATION",
    "EXPERIMENT_DESIGN", "DATASET_DISCOVERY", "ANALYSIS", "VISUALIZATION",
    "MANUSCRIPT_AUTHORING", "PUBLICATION", "KG_UPDATE"
]


class HypothesisCandidate(BaseModel):
    """Testable mechanistic hypothesis formulated by BioResearchOS."""
    hypothesis_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    title: str
    rationale_summary: str
    target_subject_urn: str
    predicted_predicate: str
    target_object_urn: str
    supporting_subgraph_hops: int
    novelty_score: float = Field(..., ge=0.0, le=1.0)
    confidence_score: float = Field(..., ge=0.0, le=1.0)


class ExperimentProtocol(BaseModel):
    """Power-analyzed experimental study design for a hypothesis."""
    protocol_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    hypothesis_id: uuid.UUID
    study_design_type: Literal["IN_VITRO_CELL_ASSAY", "IN_VIVO_MURINE", "CLINICAL_COHORT", "IN_SILICO_MULTIOMICS"]
    target_sample_size_n: int
    alpha_significance: float = 0.05
    statistical_power_beta: float = 0.80
    control_group_definition: str
    experimental_steps: List[str]


class ResearchProjectSnapshot(BaseModel):
    """Immutable FAIR RO-Crate snapshot of an active BioResearchOS project."""
    project_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    project_title: str
    current_stage: LifecycleStage
    hypotheses: List[HypothesisCandidate] = Field(default_factory=list)
    protocols: List[ExperimentProtocol] = Field(default_factory=list)
    ro_crate_provenance_sha256: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioResearchOSEngine:
    """
    Production BioResearchOS Engine:
      - Formulates grounded hypotheses from BioKG
      - Generates power-analyzed experiment protocols
      - Emits FAIR RO-Crate cryptographic snapshots
    """

    @staticmethod
    def formulate_hypothesis(
        source_urn: str,
        target_urn: str,
        predicted_predicate: str,
        kg_engine: BioquoraKnowledgeGraphEngine,
    ) -> HypothesisCandidate:
        """Formulate a testable hypothesis linking source_urn to target_urn via BioKG topology."""
        paths = kg_engine.find_mechanistic_paths(source_urn, target_urn, max_hops=4)
        hops = paths[0].total_hop_count if paths else 0
        conf = paths[0].aggregate_path_confidence if paths else 0.50
        novelty = 0.90 if hops > 1 else 0.40

        s_label = kg_engine.nodes[source_urn].label if source_urn in kg_engine.nodes else source_urn
        t_label = kg_engine.nodes[target_urn].label if target_urn in kg_engine.nodes else target_urn

        return HypothesisCandidate(
            title=f"Hypothesis: {s_label} {predicted_predicate} {t_label}",
            rationale_summary=f"BioKG multi-hop exploration identified a {hops}-hop pathway (Confidence: {conf:.3f}). Proposing direct or secondary intervention mechanism.",
            target_subject_urn=source_urn,
            predicted_predicate=predicted_predicate,
            target_object_urn=target_urn,
            supporting_subgraph_hops=hops,
            novelty_score=novelty,
            confidence_score=round(conf, 4),
        )

    @staticmethod
    def generate_experiment_protocol(
        hypothesis: HypothesisCandidate,
        study_design_type: Literal["IN_VITRO_CELL_ASSAY", "IN_VIVO_MURINE", "CLINICAL_COHORT", "IN_SILICO_MULTIOMICS"] = "IN_VITRO_CELL_ASSAY",
        effect_size_d: float = 0.5,
    ) -> ExperimentProtocol:
        """Generate a reproducible experimental study protocol with sample size power estimate."""
        # Simple Cohen's d sample size estimate approximation for 80% power, alpha=0.05
        # N per group approx 16 / d^2
        sample_n = max(6, int(32 / (effect_size_d ** 2)))

        steps = [
            f"Step 1: Baseline characterization of {hypothesis.target_subject_urn} and {hypothesis.target_object_urn}.",
            f"Step 2: Apply intervention to treatment cohort (N={sample_n}) vs vehicle control (N={sample_n}).",
            f"Step 3: Quantify {hypothesis.predicted_predicate} modulation at 24h/48h via multi-omics or assay readouts.",
            "Step 4: Statistical hypothesis test (two-tailed Welch t-test, alpha=0.05).",
            "Step 5: Emit RO-Crate empirical verification record to BioKG.",
        ]

        return ExperimentProtocol(
            hypothesis_id=hypothesis.hypothesis_id,
            study_design_type=study_design_type,
            target_sample_size_n=sample_n * 2,
            alpha_significance=0.05,
            statistical_power_beta=0.80,
            control_group_definition="Vehicle/Isotype matched control group",
            experimental_steps=steps,
        )

    @staticmethod
    def create_ro_crate_snapshot(
        project_title: str,
        current_stage: LifecycleStage,
        hypotheses: List[HypothesisCandidate],
        protocols: List[ExperimentProtocol],
    ) -> ResearchProjectSnapshot:
        """Create an immutable FAIR RO-Crate snapshot with SHA-256 provenance."""
        payload = {
            "title": project_title,
            "stage": current_stage,
            "hypotheses": [h.model_dump_json() for h in hypotheses],
            "protocols": [p.model_dump_json() for p in protocols],
        }
        sha = hashlib.sha256(json.dumps(payload, sort_keys=True).encode("utf-8")).hexdigest()

        return ResearchProjectSnapshot(
            project_title=project_title,
            current_stage=current_stage,
            hypotheses=hypotheses,
            protocols=protocols,
            ro_crate_provenance_sha256=sha,
        )
