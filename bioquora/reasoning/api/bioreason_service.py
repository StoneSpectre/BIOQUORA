"""
BIOQUORA - BioReason Platform Service Layer (10 Canonical Reasoning APIs)
Implements Module 18 & Module 1 for Step 4 Stage 8 (BioReason v1.0).
Exposes 10 Canonical Reasoning APIs covering Path Inference, Link Prediction, Drug Repurposing, MoA,
Toxicity Prediction, Hypothesis Generation, GraphRAG, Diagnostic Reasoning, Explainability, and Optimizer Stats.
"""

from typing import Dict, Any, List
from bioquora.reasoning.core.path_reasoner import PathBasedReasoningEngine
from bioquora.reasoning.core.symbolic_rules import SymbolicRuleEngine
from bioquora.reasoning.prediction.link_predictor import GNNLinkPredictionEngine
from bioquora.reasoning.core.subgraph_extractor import SubgraphExtractionEngine
from bioquora.reasoning.mechanistic.moa_engine import MechanisticMoAEngine
from bioquora.reasoning.discovery.drug_repurposing import DrugRepurposingEngine
from bioquora.reasoning.prediction.toxicity_predictor import ToxicityPredictionEngine
from bioquora.reasoning.graphrag.graphrag_bridge import GraphRAGBridge
from bioquora.reasoning.discovery.hypothesis_generator import ScientificHypothesisGenerator
from bioquora.reasoning.causal.causal_engine import CausalReasoningEngine
from bioquora.reasoning.core.contradiction_resolver import ContradictionResolutionEngine
from bioquora.reasoning.clinical.diagnostic_engine import DiagnosticReasoningEngine
from bioquora.reasoning.discovery.biomarker_engine import BiomarkerDiscoveryEngine
from bioquora.reasoning.explainability.explainability_engine import ReasoningExplainabilityEngine
from bioquora.reasoning.optimization.reasoning_optimizer import ReasoningPerformanceOptimizer
from bioquora.reasoning.security.reasoning_guardrails import ReasoningSafetyGuardrails

class BioReasonPlatformService:
    def __init__(self):
        self.path_engine = PathBasedReasoningEngine()
        self.symbolic_engine = SymbolicRuleEngine()
        self.optimizer = ReasoningPerformanceOptimizer()

    # API 1: Infer Paths API
    def infer_paths_api(self, source_id: str, target_id: str) -> Dict[str, Any]:
        return self.path_engine.infer_multi_hop_paths(source_id, target_id)

    # API 2: Predict Links API
    def predict_links_api(self, entity_id: str, predicate: str) -> Dict[str, Any]:
        return GNNLinkPredictionEngine.predict_links(entity_id, predicate)

    # API 3: Repurpose Drug API
    def repurpose_drug_api(self, disease_id: str) -> Dict[str, Any]:
        return DrugRepurposingEngine.discover_repurposing_candidates(disease_id)

    # API 4: Reconstruct MoA API
    def reconstruct_moa_api(self, drug_id: str, disease_id: str) -> Dict[str, Any]:
        return MechanisticMoAEngine.reconstruct_moa(drug_id, disease_id)

    # API 5: Predict Toxicity API
    def predict_toxicity_api(self, drug_id: str) -> Dict[str, Any]:
        return ToxicityPredictionEngine.predict_toxicity(drug_id)

    # API 6: Generate Hypothesis API
    def generate_hypothesis_api(self, topic: str) -> Dict[str, Any]:
        return ScientificHypothesisGenerator.generate_hypothesis(topic)

    # API 7: GraphRAG Query API
    def graphrag_query_api(self, query_str: str) -> Dict[str, Any]:
        return GraphRAGBridge.execute_graphrag_query(query_str)

    # API 8: Diagnose Phenotype API
    def diagnose_phenotype_api(self, hpo_ids: List[str]) -> Dict[str, Any]:
        return DiagnosticReasoningEngine.diagnose_from_phenotypes(hpo_ids)

    # API 9: Explain Inference API
    def explain_inference_api(self, inference_id: str) -> Dict[str, Any]:
        return ReasoningExplainabilityEngine.explain_inference(inference_id)

    # API 10: Get Reasoning Stats API
    def get_reasoning_stats_api(self) -> Dict[str, Any]:
        return self.optimizer.get_stats()

def get_bioreason_service() -> BioReasonPlatformService:
    return BioReasonPlatformService()
