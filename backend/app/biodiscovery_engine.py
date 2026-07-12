"""
Bioquora Founder Bible — Volume VII (Step 7)
Drug Discovery, Translational Medicine & Precision Therapeutics Platform (Codename: BioDiscovery)

Implements:
  1. Target Prioritization Index (TPI) calculation across Genetics, Druggability & ADMET
  2. Mechanistic Drug Repurposing Discovery across BioKG
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal, Dict
from pydantic import BaseModel, Field
from app.knowledge_graph_engine import BioquoraKnowledgeGraphEngine


class ADMETSafetyProfile(BaseModel):
    """Absorption, Distribution, Metabolism, Excretion & Toxicity envelope."""
    hepatotoxicity_risk: Literal["LOW", "MODERATE", "HIGH"] = "LOW"
    cardiotoxicity_hERG_risk: Literal["LOW", "MODERATE", "HIGH"] = "LOW"
    blood_brain_barrier_permeable: bool = False
    oral_bioavailability_score: float = Field(0.85, ge=0.0, le=1.0)


class TargetPrioritizationCandidate(BaseModel):
    """Scored biological target candidate for a clinical indication."""
    candidate_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    target_gene_urn: str
    disease_urn: str
    genetic_evidence_score: float = Field(..., ge=0.0, le=1.0)
    structural_druggability_score: float = Field(..., ge=0.0, le=1.0)
    literature_support_score: float = Field(..., ge=0.0, le=1.0)
    admet_profile: ADMETSafetyProfile
    composite_tpi_score: float = Field(..., ge=0.0, le=1.0)
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class DrugRepurposingHit(BaseModel):
    """Mechanistic repurposing candidate identified via BioKG topology."""
    hit_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    drug_urn: str
    target_gene_urn: str
    disease_urn: str
    mechanistic_hops: int
    path_confidence: float
    admet_safety_flag: Literal["PASS", "WARNING", "BLOCK"]
    recommendation_summary: str


class BioDiscoveryEngine:
    """
    Production BioDiscovery Engine:
      - Calculates composite Target Prioritization Index (TPI)
      - Performs graph-based repurposing screens
      - Applies ADMET safety thresholds
    """

    @staticmethod
    def calculate_tpi(
        target_gene_urn: str,
        disease_urn: str,
        genetic_score: float,
        druggability_score: float,
        literature_score: float,
        toxicity_penalty: float = 0.1,
        admet_profile: Optional[ADMETSafetyProfile] = None,
    ) -> TargetPrioritizationCandidate:
        """Calculate weighted TPI score: w_g*gen + w_d*drug + w_l*lit - w_t*tox"""
        # Weights: Genetics=0.40, Druggability=0.35, Literature=0.25
        tpi = (0.40 * genetic_score) + (0.35 * druggability_score) + (0.25 * literature_score) - toxicity_penalty
        tpi = max(0.0, min(1.0, tpi))

        profile = admet_profile or ADMETSafetyProfile()

        return TargetPrioritizationCandidate(
            target_gene_urn=target_gene_urn,
            disease_urn=disease_urn,
            genetic_evidence_score=genetic_score,
            structural_druggability_score=druggability_score,
            literature_support_score=literature_score,
            admet_profile=profile,
            composite_tpi_score=round(tpi, 4),
        )

    @classmethod
    def discover_repurposing_candidates(
        cls,
        disease_urn: str,
        kg_engine: BioquoraKnowledgeGraphEngine,
        known_drug_admet: Optional[Dict[str, ADMETSafetyProfile]] = None,
    ) -> List[DrugRepurposingHit]:
        """Discover small molecules in BioKG that mechanistically target disease_urn."""
        hits: List[DrugRepurposingHit] = []
        known_admet = known_drug_admet or {}

        # Scan all drug nodes
        for node_urn, node in kg_engine.nodes.items():
            if node.entity_type == "Drug":
                paths = kg_engine.find_mechanistic_paths(node_urn, disease_urn, max_hops=3)
                if paths:
                    best = paths[0]
                    profile = known_admet.get(node_urn, ADMETSafetyProfile())

                    # Determine safety flag
                    flag: Literal["PASS", "WARNING", "BLOCK"] = "PASS"
                    if profile.hepatotoxicity_risk == "HIGH" or profile.cardiotoxicity_hERG_risk == "HIGH":
                        flag = "BLOCK"
                    elif profile.hepatotoxicity_risk == "MODERATE":
                        flag = "WARNING"

                    hit = DrugRepurposingHit(
                        drug_urn=node_urn,
                        target_gene_urn=best.nodes[1].bioid_urn if len(best.nodes) > 1 else node_urn,
                        disease_urn=disease_urn,
                        mechanistic_hops=best.total_hop_count,
                        path_confidence=best.aggregate_path_confidence,
                        admet_safety_flag=flag,
                        recommendation_summary=f"Discovered {best.total_hop_count}-hop pathway connecting {node.label} to target disease. ADMET flag: {flag}.",
                    )
                    hits.append(hit)

        hits.sort(key=lambda h: h.path_confidence, reverse=True)
        return hits
