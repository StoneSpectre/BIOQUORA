"""
Bioquora Founder Bible — Volume IV (Step 4)
Biomedical Knowledge Graph Platform (BioKG) & Multi-Hop Temporal GraphRAG Engine

Implements:
  1. 17 Canonical Node Types & 15 Canonical Relationship Predicates
  2. Temporal Edge Evidence with Retraction & Contradictory Evidence Tracking
  3. Mechanistic BFS Subgraph Discovery with Epistemic Conflict Detection
"""

import uuid
from datetime import datetime, timezone
from typing import List, Dict, Optional, Tuple, Literal
from pydantic import BaseModel, Field


CanonicalNodeType = Literal[
    "Disease", "Drug", "Gene", "Protein", "Variant", "Pathway",
    "Chemical", "Cell", "Tissue", "Organ", "Organism",
    "Publication", "ClinicalTrial", "Guideline", "Institution",
    "Researcher", "Dataset"
]

CanonicalPredicate = Literal[
    "TREATS", "CAUSES", "ASSOCIATED_WITH", "INTERACTS_WITH", "EXPRESSES",
    "INHIBITS", "ACTIVATES", "PARTICIPATES_IN", "REGULATES", "LOCATED_IN",
    "DERIVED_FROM", "VALIDATED_BY", "CONTRADICTED_BY", "SUPPORTED_BY", "CITED_BY"
]


class KGNode(BaseModel):
    """Canonical node in the Bioquora Knowledge Graph."""
    bioid_urn: str
    entity_type: CanonicalNodeType
    label: str


class KGEdge(BaseModel):
    """Directed temporal relationship between two BioKG nodes."""
    edge_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    source_urn: str
    predicate: CanonicalPredicate
    target_urn: str
    confidence_score: float = Field(1.0, ge=0.0, le=1.0)
    valid_from: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    valid_to: Optional[datetime] = None
    is_retracted: bool = False
    supporting_pmids: List[str] = Field(default_factory=list)
    contradicting_pmids: List[str] = Field(default_factory=list)


class MechanisticSubgraphPath(BaseModel):
    """Multi-hop causal pathway with contradiction status."""
    path_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    nodes: List[KGNode]
    edges: List[KGEdge]
    total_hop_count: int
    aggregate_path_confidence: float
    has_epistemic_contradictions: bool = False


class BioquoraKnowledgeGraphEngine:
    """
    BioKG Temporal & Contradiction-Aware Knowledge Graph Engine:
      - Enforces 17 Node Types & 15 Directed Predicates
      - Tracks historical edge retractions and contradicting PMIDs
      - Computes multi-hop explainable mechanistic subgraphs
    """

    def __init__(self):
        self.nodes: Dict[str, KGNode] = {}
        self.outgoing_edges: Dict[str, List[KGEdge]] = {}

    def add_node(self, bioid_urn: str, entity_type: CanonicalNodeType, label: str) -> KGNode:
        node = KGNode(bioid_urn=bioid_urn, entity_type=entity_type, label=label)
        self.nodes[bioid_urn] = node
        if bioid_urn not in self.outgoing_edges:
            self.outgoing_edges[bioid_urn] = []
        return node

    def add_edge(
        self,
        source_urn: str,
        predicate: CanonicalPredicate,
        target_urn: str,
        confidence_score: float = 1.0,
        supporting_pmids: Optional[List[str]] = None,
        contradicting_pmids: Optional[List[str]] = None,
        is_retracted: bool = False,
    ) -> KGEdge:
        if source_urn not in self.nodes or target_urn not in self.nodes:
            raise KeyError("Both source and target URNs must exist in BioKG before adding an edge")

        edge = KGEdge(
            source_urn=source_urn,
            predicate=predicate,
            target_urn=target_urn,
            confidence_score=confidence_score,
            supporting_pmids=supporting_pmids or [],
            contradicting_pmids=contradicting_pmids or [],
            is_retracted=is_retracted,
        )
        self.outgoing_edges[source_urn].append(edge)
        return edge

    def find_mechanistic_paths(
        self,
        source_urn: str,
        target_urn: str,
        max_hops: int = 4,
        min_confidence: float = 0.5,
        include_retracted: bool = False,
    ) -> List[MechanisticSubgraphPath]:
        """Find non-retracted causal multi-hop paths up to max_hops."""
        if source_urn not in self.nodes or target_urn not in self.nodes:
            return []

        results: List[MechanisticSubgraphPath] = []
        queue: List[Tuple[str, List[KGNode], List[KGEdge], float]] = [
            (source_urn, [self.nodes[source_urn]], [], 1.0)
        ]

        while queue:
            curr_urn, p_nodes, p_edges, agg_conf = queue.pop(0)

            if len(p_edges) >= max_hops:
                continue

            for edge in self.outgoing_edges.get(curr_urn, []):
                if edge.is_retracted and not include_retracted:
                    continue

                new_conf = agg_conf * edge.confidence_score
                if new_conf < min_confidence:
                    continue

                nxt_node = self.nodes[edge.target_urn]
                new_nodes = p_nodes + [nxt_node]
                new_edges = p_edges + [edge]

                if edge.target_urn == target_urn:
                    has_contradiction = any(
                        len(e.contradicting_pmids) > 0 or e.predicate == "CONTRADICTED_BY"
                        for e in new_edges
                    )
                    results.append(
                        MechanisticSubgraphPath(
                            nodes=new_nodes,
                            edges=new_edges,
                            total_hop_count=len(new_edges),
                            aggregate_path_confidence=round(new_conf, 4),
                            has_epistemic_contradictions=has_contradiction,
                        )
                    )
                else:
                    if edge.target_urn not in {n.bioid_urn for n in p_nodes}:
                        queue.append((edge.target_urn, new_nodes, new_edges, new_conf))

        results.sort(key=lambda p: p.aggregate_path_confidence, reverse=True)
        return results

    @staticmethod
    def format_graphrag_context(path: MechanisticSubgraphPath) -> str:
        """Render a mechanistic subgraph path into prompt-ready ASCII GraphRAG proof text."""
        status_tag = " [CONTRADICTION ALERT]" if path.has_epistemic_contradictions else " [CONSISTENT]"
        lines = [
            f"=== BioKG Mechanistic Subgraph Proof (Hops: {path.total_hop_count}, Confidence: {path.aggregate_path_confidence}){status_tag} ==="
        ]
        for idx, edge in enumerate(path.edges):
            s_node = path.nodes[idx]
            o_node = path.nodes[idx + 1]
            pmids_str = ", ".join(edge.supporting_pmids) if edge.supporting_pmids else "Curated"
            contra_str = f" [Refuted by: {', '.join(edge.contradicting_pmids)}]" if edge.contradicting_pmids else ""
            lines.append(
                f"Hop {idx+1}: [{s_node.label} ({s_node.entity_type})] --[{edge.predicate}]--> [{o_node.label} ({o_node.entity_type})] (Supporting: {pmids_str}{contra_str}, Conf: {edge.confidence_score})"
            )
        return "\n".join(lines)
