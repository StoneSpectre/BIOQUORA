"""
8.17 Graph Intelligence -- topological analysis, centrality, community
detection, and structural similarity over the biological knowledge graph.
"""

from __future__ import annotations

import networkx as nx

from .graph import KnowledgeGraph


def hub_entities(kg: KnowledgeGraph, top_k: int = 5) -> list[tuple[str, float]]:
    """Degree centrality -- identifies highly-connected 'hub' entities,
    e.g. proteins that sit at the intersection of many pathways."""
    if not kg.nodes:
        return []
    centrality = nx.degree_centrality(kg.g)
    ranked = sorted(centrality.items(), key=lambda kv: kv[1], reverse=True)
    return [(kg.nodes[n].name, round(score, 4)) for n, score in ranked[:top_k] if n in kg.nodes]


def bridge_entities(kg: KnowledgeGraph, top_k: int = 5) -> list[tuple[str, float]]:
    """Betweenness centrality -- entities that bridge otherwise disconnected
    parts of the graph (candidate mechanistic 'missing links')."""
    if not kg.nodes:
        return []
    undirected = kg.g.to_undirected()
    centrality = nx.betweenness_centrality(undirected)
    ranked = sorted(centrality.items(), key=lambda kv: kv[1], reverse=True)
    return [(kg.nodes[n].name, round(score, 4)) for n, score in ranked[:top_k] if n in kg.nodes]


def detect_communities(kg: KnowledgeGraph) -> list[list[str]]:
    """Community detection over the undirected projection -- surfaces
    clusters of biologically related entities / emerging research themes."""
    if not kg.nodes:
        return []
    undirected = kg.g.to_undirected()
    if len(undirected.nodes) == 0:
        return []
    try:
        communities = nx.algorithms.community.greedy_modularity_communities(undirected)
        return [[kg.nodes[n].name for n in comm if n in kg.nodes] for comm in communities]
    except Exception:
        return [[kg.nodes[n].name for n in undirected.nodes if n in kg.nodes]]


def similarity(kg: KnowledgeGraph, node_a: str, node_b: str) -> float:
    """Simple structural similarity: Jaccard overlap of neighbor sets.
    (An embedding-based version lives in platform/services.py::EmbeddingService.)"""
    if node_a not in kg.g or node_b not in kg.g:
        return 0.0
    na = set(kg.g.successors(node_a)) | set(kg.g.predecessors(node_a))
    nb = set(kg.g.successors(node_b)) | set(kg.g.predecessors(node_b))
    if not na or not nb:
        return 0.0
    return round(len(na & nb) / len(na | nb), 4)
