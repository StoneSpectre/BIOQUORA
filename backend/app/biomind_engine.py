"""
Bioquora Founder Bible — Volume VI (Step 6)
Biomedical AI & Scientific Reasoning Platform (Codename: BioMind)

Implements:
  1. Multi-Agent Reasoning Supervisor (Literature, Ontology, Molecular, Safety Guardian)
  2. Grounded GraphRAG Context Synthesis & Hallucination Inspection
  3. Explainable Response Packet Emission
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from app.knowledge_graph_engine import BioquoraKnowledgeGraphEngine, MechanisticSubgraphPath


class AgentReasoningStep(BaseModel):
    """Immutable log of a specialist agent's deduction during query resolution."""
    step_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    agent_role: Literal[
        "LITERATURE_AGENT", "ONTOLOGY_AGENT", "MOLECULAR_AGENT",
        "CLINICAL_AGENT", "STATISTICAL_AGENT", "SAFETY_GUARDIAN"
    ]
    deduction_summary: str
    supporting_urns: List[str] = Field(default_factory=list)
    confidence: float = Field(1.0, ge=0.0, le=1.0)


class BioMindReasoningPacket(BaseModel):
    """Transparent, explainable response packet emitted by BioMind."""
    packet_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    query: str
    final_conclusion: str
    is_contradicted_in_literature: bool = False
    evidence_score: float = Field(..., ge=0.0, le=1.0)
    reasoning_trace: List[AgentReasoningStep]
    graphrag_proof_text: str
    generated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BioMindScientificOrchestrator:
    """
    Production BioMind Orchestrator:
      - Coordinates specialist reasoning agents
      - Inspects multi-hop subgraphs from BioKG
      - Emits transparent, fully citation-grounded BioMindReasoningPacket
    """

    def __init__(self, kg_engine: BioquoraKnowledgeGraphEngine):
        self.kg = kg_engine

    def reason_over_query(
        self,
        query: str,
        source_urn: str,
        target_urn: str,
    ) -> BioMindReasoningPacket:
        trace: List[AgentReasoningStep] = []

        # Step 1: Ontology Agent verifies canonical URN existence
        if source_urn not in self.kg.nodes or target_urn not in self.kg.nodes:
            raise KeyError(f"Ontology Agent error: URNs '{source_urn}' or '{target_urn}' not in BioKG")

        s_node = self.kg.nodes[source_urn]
        t_node = self.kg.nodes[target_urn]

        trace.append(
            AgentReasoningStep(
                agent_role="ONTOLOGY_AGENT",
                deduction_summary=f"Resolved query entities to canonical URNs: '{s_node.label}' ({s_node.entity_type}) and '{t_node.label}' ({t_node.entity_type}).",
                supporting_urns=[source_urn, target_urn],
                confidence=1.0,
            )
        )

        # Step 2: Molecular Agent traverses mechanistic subgraph
        paths = self.kg.find_mechanistic_paths(source_urn, target_urn, max_hops=4)
        if not paths:
            trace.append(
                AgentReasoningStep(
                    agent_role="SAFETY_GUARDIAN",
                    deduction_summary="No validated mechanistic subgraph found. Preventing ungrounded LLM generation.",
                    confidence=1.0,
                )
            )
            return BioMindReasoningPacket(
                query=query,
                final_conclusion="No grounded biomedical evidence supports a mechanistic link between these entities.",
                is_contradicted_in_literature=False,
                evidence_score=0.0,
                reasoning_trace=trace,
                graphrag_proof_text="No causal subgraph discovered.",
            )

        best_path = paths[0]
        proof_text = self.kg.format_graphrag_context(best_path)

        trace.append(
            AgentReasoningStep(
                agent_role="MOLECULAR_AGENT",
                deduction_summary=f"Discovered {len(paths)} mechanistic subgraphs. Selected highest-confidence {best_path.total_hop_count}-hop pathway.",
                supporting_urns=[n.bioid_urn for n in best_path.nodes],
                confidence=best_path.aggregate_path_confidence,
            )
        )

        # Step 3: Safety Guardian checks for epistemic contradictions
        has_contra = best_path.has_epistemic_contradictions
        if has_contra:
            trace.append(
                AgentReasoningStep(
                    agent_role="SAFETY_GUARDIAN",
                    deduction_summary="Alert: Epistemic contradiction or refutation detected along the mechanistic pathway. Flagging dual-evidence state.",
                    confidence=0.85,
                )
            )

        conclusion = (
            f"Mechanistic evidence supports a {best_path.total_hop_count}-hop connection between {s_node.label} and {t_node.label} with confidence {best_path.aggregate_path_confidence:.3f}."
        )
        if has_contra:
            conclusion += " CAUTION: Recent empirical refutations exist along this pathway."

        return BioMindReasoningPacket(
            query=query,
            final_conclusion=conclusion,
            is_contradicted_in_literature=has_contra,
            evidence_score=round(best_path.aggregate_path_confidence, 4),
            reasoning_trace=trace,
            graphrag_proof_text=proof_text,
        )
