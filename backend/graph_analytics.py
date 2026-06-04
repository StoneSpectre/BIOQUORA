"""
MEDINEX — STEP 6: GRAPH ANALYTICS
===================================
Runs deep network analysis on the biomedical knowledge graph
built in Step 5, producing actionable intelligence.

Analyses implemented:
  ├─ Centrality Analysis     (degree, betweenness, eigenvector, PageRank)
  ├─ Community Detection     (Louvain / greedy modularity)
  ├─ Network Topology        (density, diameter, clustering, small-world)
  ├─ Disease Network         (disease–disease similarity via shared genes/drugs)
  ├─ Drug Network            (drug–drug similarity via shared targets/diseases)
  ├─ Gene Network            (gene–gene co-association landscape)
  ├─ Drug Repurposing        (find drugs for diseases via shared gene targets)
  ├─ Knowledge Gaps          (diseases with no drugs / genes with no drugs)
  └─ Export                  (CSV reports + GraphML for Gephi/Cytoscape)
"""

import json
import math
import sqlite3
import warnings
import numpy as np
import pandas as pd
import networkx as nx
from pathlib import Path
from collections import defaultdict, Counter
from typing import Optional

warnings.filterwarnings("ignore")

DATA_DIR  = Path(__file__).parent.parent / "data"
GRAPH_DIR = DATA_DIR / "graph"
NLP_DIR   = DATA_DIR / "nlp"
GRAPH_DIR.mkdir(parents=True, exist_ok=True)


# ══════════════════════════════════════════════════════════════════
# 6A.  GRAPH LOADER — reconstruct MedinexGraph from saved JSON
# ══════════════════════════════════════════════════════════════════

def load_graph(path: Optional[Path] = None) -> nx.MultiDiGraph:
    """Load saved knowledge graph from JSON."""
    path = path or GRAPH_DIR / "medinex_graph.json"
    with open(path) as f:
        data = json.load(f)

    G = nx.MultiDiGraph()
    for node in data["nodes"]:
        nid = node.pop("id")
        G.add_node(nid, **node)
    for edge in data["edges"]:
        src = edge.pop("src")
        dst = edge.pop("dst")
        G.add_edge(src, dst, **edge)
    print(f"  ✓ Graph loaded: {G.number_of_nodes()} nodes, {G.number_of_edges()} edges")
    return G


# ══════════════════════════════════════════════════════════════════
# 6B.  CENTRALITY ANALYSIS
#      Identifies the most important nodes in the biomedical network
# ══════════════════════════════════════════════════════════════════

class CentralityAnalyzer:
    """
    Compute multiple centrality measures on the knowledge graph.

    Centrality interpretation in biomedical context:
      Degree       → how many direct connections (hub entities)
      Betweenness  → information flow bottlenecks (bridge entities)
      Eigenvector  → connected to well-connected neighbors (influential)
      PageRank     → importance via link structure (like citation rank)
      Closeness    → average shortest path to all nodes (integrator)
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G
        # For most centrality measures, use undirected simple graph
        self.G_simple = nx.Graph(G)
        self._results: dict = {}

    def compute_all(self) -> pd.DataFrame:
        """Compute all centrality measures and return combined DataFrame."""
        print("  Computing centrality measures...")

        n = self.G_simple.number_of_nodes()

        # Degree centrality
        deg = nx.degree_centrality(self.G_simple)

        # In/out degree (directed)
        in_deg  = dict(self.G.in_degree())
        out_deg = dict(self.G.out_degree())

        # Betweenness (expensive — use k-sample approximation for large graphs)
        k = min(n, 50)
        between = nx.betweenness_centrality(self.G_simple, k=k, normalized=True)

        # PageRank on directed graph
        try:
            pagerank = nx.pagerank(self.G, alpha=0.85, max_iter=100)
        except nx.exception.PowerIterationFailedConvergence:
            pagerank = nx.pagerank(self.G, alpha=0.85, max_iter=500, tol=1e-4)

        # Eigenvector centrality (undirected)
        try:
            eigen = nx.eigenvector_centrality(self.G_simple, max_iter=500)
        except nx.exception.PowerIterationFailedConvergence:
            eigen = {n: 0.0 for n in self.G_simple.nodes()}

        # Closeness
        close = nx.closeness_centrality(self.G_simple)

        # Build DataFrame
        rows = []
        for node in self.G.nodes():
            attrs = self.G.nodes[node]
            rows.append({
                "node":           node,
                "name":           attrs.get("name", node),
                "type":           attrs.get("type", "?"),
                "degree":         in_deg.get(node, 0) + out_deg.get(node, 0),
                "in_degree":      in_deg.get(node, 0),
                "out_degree":     out_deg.get(node, 0),
                "degree_centrality":      round(deg.get(node, 0), 5),
                "betweenness_centrality": round(between.get(node, 0), 5),
                "pagerank":               round(pagerank.get(node, 0), 6),
                "eigenvector_centrality": round(eigen.get(node, 0), 5),
                "closeness_centrality":   round(close.get(node, 0), 5),
            })

        df = pd.DataFrame(rows).sort_values("pagerank", ascending=False)
        self._results["centrality"] = df
        return df

    def top_nodes_per_type(self, df: pd.DataFrame, top_k: int = 5) -> dict:
        """Get top-k nodes per entity type by PageRank."""
        result = {}
        for ntype in df["type"].unique():
            subset = df[df["type"] == ntype].head(top_k)
            result[ntype] = subset[["name", "pagerank", "betweenness_centrality",
                                     "degree"]].to_dict("records")
        return result

    def find_hub_nodes(self, df: pd.DataFrame, threshold: float = 0.8) -> list:
        """
        Identify hub nodes: top threshold-percentile by degree.
        Hubs = entities with disproportionate connectivity.
        """
        cutoff = df["degree"].quantile(threshold)
        hubs = df[df["degree"] >= cutoff].sort_values("degree", ascending=False)
        return hubs[["name", "type", "degree", "betweenness_centrality"]].to_dict("records")

    def save(self, df: pd.DataFrame) -> Path:
        path = GRAPH_DIR / "centrality.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Centrality saved → {path}")
        return path


# ══════════════════════════════════════════════════════════════════
# 6C.  COMMUNITY DETECTION
#      Finds clusters of tightly-connected biomedical concepts
# ══════════════════════════════════════════════════════════════════

class CommunityDetector:
    """
    Detect communities (modules) in the biomedical knowledge graph.

    Communities represent:
      - Disease clusters (comorbidity groups)
      - Drug-target-disease pathways
      - Gene regulatory modules
      - Biological process communities

    Algorithm: Greedy modularity maximization
    (In production: Louvain via python-louvain or neo4j GDS)
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G_undirected = nx.Graph(G)
        self._communities: list[frozenset] = []
        self._node_to_community: dict[str, int] = {}

    def detect(self) -> list[dict]:
        """Run community detection and return labeled communities."""
        print("  Running community detection...")

        # Remove isolated nodes for cleaner communities
        G_connected = self.G_undirected.copy()
        isolates = list(nx.isolates(G_connected))
        G_connected.remove_nodes_from(isolates)

        if G_connected.number_of_nodes() < 3:
            print("  ⚠ Not enough connected nodes for community detection")
            return []

        communities = list(nx.community.greedy_modularity_communities(G_connected))
        self._communities = communities

        # Label each community
        labeled = []
        for idx, comm in enumerate(sorted(communities, key=len, reverse=True)):
            members = list(comm)
            # Get node types in this community
            type_counts = Counter(
                self.G_undirected.nodes[n].get("type", "?")
                for n in members if self.G_undirected.has_node(n)
            )
            # Auto-label by dominant types
            dominant_types = [t for t, _ in type_counts.most_common(2)]
            label = f"Community {idx+1}: {'+'.join(dominant_types)}"

            # Score community coherence
            subgraph = self.G_undirected.subgraph(members)
            density = nx.density(subgraph)

            labeled.append({
                "community_id":   idx + 1,
                "label":          label,
                "size":           len(members),
                "density":        round(density, 4),
                "dominant_types": dominant_types,
                "type_breakdown": dict(type_counts),
                "members":        members[:10],  # top 10 shown
                "all_members":    members,
            })

            for m in members:
                self._node_to_community[m] = idx + 1

        print(f"  ✓ Found {len(labeled)} communities  "
              f"(modularity score: {nx.community.modularity(G_connected, communities):.4f})")
        return labeled

    def get_node_community(self, node: str) -> int:
        return self._node_to_community.get(node.lower(), -1)

    def community_summary_df(self, communities: list[dict]) -> pd.DataFrame:
        rows = []
        for c in communities:
            rows.append({
                "community_id":   c["community_id"],
                "label":          c["label"],
                "size":           c["size"],
                "density":        c["density"],
                "dominant_types": ", ".join(c["dominant_types"]),
                "sample_members": ", ".join(c["members"][:5]),
            })
        return pd.DataFrame(rows)

    def save(self, communities: list[dict]) -> Path:
        path = GRAPH_DIR / "communities.json"
        # Serialize frozensets
        serializable = [{k: list(v) if isinstance(v, (set, frozenset)) else v
                         for k, v in c.items() if k != "all_members"}
                        for c in communities]
        with open(path, "w") as f:
            json.dump(serializable, f, indent=2)
        print(f"  ✓ Communities saved → {path}")
        return path


# ══════════════════════════════════════════════════════════════════
# 6D.  NETWORK TOPOLOGY ANALYSIS
# ══════════════════════════════════════════════════════════════════

class TopologyAnalyzer:
    """
    Characterize the global structure of the biomedical knowledge graph.
    Determines if it is scale-free, small-world, or random.
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G
        self.G_simple = nx.Graph(G)

    def analyze(self) -> dict:
        n = self.G_simple.number_of_nodes()
        e = self.G_simple.number_of_edges()

        # Basic
        density      = nx.density(self.G_simple)
        avg_degree   = sum(d for _, d in self.G_simple.degree()) / n if n else 0
        clustering   = nx.average_clustering(self.G_simple)

        # Degree distribution — check for power law (scale-free)
        degrees = [d for _, d in self.G_simple.degree()]
        degree_counts = Counter(degrees)
        max_degree = max(degrees) if degrees else 0
        min_degree = min(degrees) if degrees else 0

        # Connectivity
        components = list(nx.connected_components(self.G_simple))
        largest_cc = max(components, key=len) if components else set()
        G_lcc = self.G_simple.subgraph(largest_cc)

        # Small-world: avg path length and clustering in LCC
        if len(largest_cc) > 1:
            try:
                avg_path = nx.average_shortest_path_length(G_lcc)
            except Exception:
                # Sample for large graphs
                avg_path = nx.average_shortest_path_length(G_lcc) if len(largest_cc) < 100 else -1
        else:
            avg_path = -1

        # Assortativity (do high-degree nodes connect to high-degree nodes?)
        try:
            assort = nx.degree_assortativity_coefficient(self.G_simple)
        except Exception:
            assort = 0.0

        return {
            "nodes":              n,
            "edges":              e,
            "density":            round(density, 5),
            "avg_degree":         round(avg_degree, 2),
            "max_degree":         max_degree,
            "min_degree":         min_degree,
            "avg_clustering":     round(clustering, 4),
            "avg_path_length":    round(avg_path, 3) if avg_path > 0 else "N/A",
            "n_components":       len(components),
            "largest_component":  len(largest_cc),
            "assortativity":      round(assort, 4),
            "is_scale_free_hint": max_degree > 5 * avg_degree,  # rough check
            "is_small_world":     clustering > 0.3 and (avg_path < math.log(n) + 1 if avg_path > 0 else False),
        }


# ══════════════════════════════════════════════════════════════════
# 6E.  DISEASE NETWORK
#      Diseases connected by shared genetic associations / drugs
# ══════════════════════════════════════════════════════════════════

class DiseaseNetwork:
    """
    Build a Disease–Disease similarity network where edge weight
    = number of shared genes or drugs between two diseases.
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G
        self.disease_network: nx.Graph = nx.Graph()

    def build(self) -> nx.Graph:
        """Construct disease similarity graph."""
        print("  Building disease similarity network...")

        # Get all disease nodes
        diseases = [n for n, d in self.G.nodes(data=True) if d.get("type") == "Disease"]

        # For each disease, get its upstream genes + drugs
        disease_genes = defaultdict(set)
        disease_drugs = defaultdict(set)

        for u, v, data in self.G.edges(data=True):
            rel = data.get("relation", "")
            u_type = self.G.nodes[u].get("type", "")
            v_type = self.G.nodes[v].get("type", "")

            if rel in ("ASSOCIATED_WITH", "CAUSES") and v_type == "Disease":
                if u_type == "Gene":
                    disease_genes[v].add(u)
            if rel == "TREATS" and v_type == "Disease":
                if u_type == "Drug":
                    disease_drugs[v].add(u)

        # Build disease–disease edges
        for i, d1 in enumerate(diseases):
            for d2 in diseases[i+1:]:
                shared_genes = disease_genes[d1] & disease_genes[d2]
                shared_drugs = disease_drugs[d1] & disease_drugs[d2]
                weight = len(shared_genes) * 2 + len(shared_drugs)
                if weight > 0:
                    self.disease_network.add_edge(d1, d2,
                        weight=weight,
                        shared_genes=list(shared_genes),
                        shared_drugs=list(shared_drugs),
                    )

        # Add all disease nodes even if isolated
        for d in diseases:
            self.disease_network.add_node(d,
                gene_count=len(disease_genes[d]),
                drug_count=len(disease_drugs[d]),
            )

        print(f"  ✓ Disease network: {self.disease_network.number_of_nodes()} diseases, "
              f"{self.disease_network.number_of_edges()} connections")
        return self.disease_network

    def most_similar_pairs(self, top_k: int = 10) -> list[dict]:
        """Return top-k most similar disease pairs."""
        edges = [(u, v, d["weight"], d.get("shared_genes", []), d.get("shared_drugs", []))
                 for u, v, d in self.disease_network.edges(data=True)]
        edges.sort(key=lambda x: -x[2])
        return [
            {
                "disease1": u, "disease2": v, "similarity": w,
                "shared_genes": genes[:3], "shared_drugs": drugs[:3],
            }
            for u, v, w, genes, drugs in edges[:top_k]
        ]

    def save(self) -> Path:
        rows = [{"d1": u, "d2": v, **d}
                for u, v, d in self.disease_network.edges(data=True)]
        df = pd.DataFrame(rows)
        for col in ["shared_genes", "shared_drugs"]:
            if col in df.columns:
                df[col] = df[col].apply(lambda x: ", ".join(x) if isinstance(x, list) else x)
        path = GRAPH_DIR / "disease_network.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Disease network → {path}")
        return path


# ══════════════════════════════════════════════════════════════════
# 6F.  DRUG NETWORK
#      Drugs connected by shared targets or treated diseases
# ══════════════════════════════════════════════════════════════════

class DrugNetwork:
    """Drug–Drug similarity via shared gene targets and diseases."""

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G
        self.drug_network: nx.Graph = nx.Graph()

    def build(self) -> nx.Graph:
        print("  Building drug similarity network...")
        drugs = [n for n, d in self.G.nodes(data=True) if d.get("type") == "Drug"]

        drug_targets  = defaultdict(set)
        drug_diseases = defaultdict(set)

        for u, v, data in self.G.edges(data=True):
            rel    = data.get("relation", "")
            u_type = self.G.nodes[u].get("type", "")
            v_type = self.G.nodes[v].get("type", "")

            if rel == "INHIBITS" and u_type == "Drug":
                drug_targets[u].add(v)
            if rel == "TREATS" and u_type == "Drug" and v_type == "Disease":
                drug_diseases[u].add(v)

        for i, d1 in enumerate(drugs):
            for d2 in drugs[i+1:]:
                shared_targets  = drug_targets[d1]  & drug_targets[d2]
                shared_diseases = drug_diseases[d1] & drug_diseases[d2]
                weight = len(shared_targets) * 3 + len(shared_diseases)
                if weight > 0:
                    self.drug_network.add_edge(d1, d2,
                        weight=weight,
                        shared_targets=list(shared_targets),
                        shared_diseases=list(shared_diseases),
                    )

        for d in drugs:
            self.drug_network.add_node(d,
                n_targets=len(drug_targets[d]),
                n_diseases=len(drug_diseases[d]),
            )

        print(f"  ✓ Drug network: {self.drug_network.number_of_nodes()} drugs, "
              f"{self.drug_network.number_of_edges()} connections")
        return self.drug_network

    def most_similar_pairs(self, top_k: int = 8) -> list[dict]:
        edges = [(u, v, d["weight"], d.get("shared_targets", []), d.get("shared_diseases", []))
                 for u, v, d in self.drug_network.edges(data=True)]
        edges.sort(key=lambda x: -x[2])
        return [{"drug1": u, "drug2": v, "similarity": w,
                 "shared_targets": t[:3], "shared_diseases": dis[:3]}
                for u, v, w, t, dis in edges[:top_k]]

    def save(self) -> Path:
        rows = [{"d1": u, "d2": v, **d}
                for u, v, d in self.drug_network.edges(data=True)]
        df = pd.DataFrame(rows)
        for col in ["shared_targets", "shared_diseases"]:
            if col in df.columns:
                df[col] = df[col].apply(lambda x: ", ".join(x) if isinstance(x, list) else x)
        path = GRAPH_DIR / "drug_network.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Drug network   → {path}")
        return path


# ══════════════════════════════════════════════════════════════════
# 6G.  GENE NETWORK
#      Genes connected by shared disease associations
# ══════════════════════════════════════════════════════════════════

class GeneNetwork:
    """Gene co-association network via shared disease or drug links."""

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G
        self.gene_network: nx.Graph = nx.Graph()

    def build(self) -> nx.Graph:
        print("  Building gene co-association network...")
        genes = [n for n, d in self.G.nodes(data=True) if d.get("type") == "Gene"]

        gene_diseases = defaultdict(set)
        gene_drugs    = defaultdict(set)

        for u, v, data in self.G.edges(data=True):
            rel    = data.get("relation", "")
            u_type = self.G.nodes[u].get("type", "")
            v_type = self.G.nodes[v].get("type", "")

            if rel in ("ASSOCIATED_WITH", "CAUSES") and u_type == "Gene":
                gene_diseases[u].add(v)
            if rel in ("INHIBITS", "TARGETED_BY"):
                if u_type == "Drug" and v_type == "Gene":
                    gene_drugs[v].add(u)
                elif u_type == "Gene" and v_type == "Drug":
                    gene_drugs[u].add(v)

        for i, g1 in enumerate(genes):
            for g2 in genes[i+1:]:
                shared_diseases = gene_diseases[g1] & gene_diseases[g2]
                shared_drugs    = gene_drugs[g1] & gene_drugs[g2]
                weight = len(shared_diseases) * 2 + len(shared_drugs)
                if weight > 0:
                    self.gene_network.add_edge(g1, g2,
                        weight=weight,
                        shared_diseases=list(shared_diseases),
                        shared_drugs=list(shared_drugs),
                    )

        for g in genes:
            self.gene_network.add_node(g,
                n_diseases=len(gene_diseases[g]),
                n_drugs=len(gene_drugs[g]),
            )

        print(f"  ✓ Gene network: {self.gene_network.number_of_nodes()} genes, "
              f"{self.gene_network.number_of_edges()} connections")
        return self.gene_network

    def most_connected_genes(self, top_k: int = 8) -> list[dict]:
        return sorted(
            [{"gene": n, "connections": self.gene_network.degree(n),
              "n_diseases": self.gene_network.nodes[n].get("n_diseases", 0),
              "n_drugs":    self.gene_network.nodes[n].get("n_drugs", 0)}
             for n in self.gene_network.nodes()],
            key=lambda x: -x["connections"]
        )[:top_k]

    def save(self) -> Path:
        rows = [{"g1": u, "g2": v, **d}
                for u, v, d in self.gene_network.edges(data=True)]
        df = pd.DataFrame(rows)
        for col in ["shared_diseases", "shared_drugs"]:
            if col in df.columns:
                df[col] = df[col].apply(lambda x: ", ".join(x) if isinstance(x, list) else x)
        path = GRAPH_DIR / "gene_network.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Gene network   → {path}")
        return path


# ══════════════════════════════════════════════════════════════════
# 6H.  DRUG REPURPOSING ENGINE
#      Find new disease indications for existing drugs via gene overlap
# ══════════════════════════════════════════════════════════════════

class DrugRepurposingEngine:
    """
    Predict novel drug–disease indications by reasoning:
    If Drug D inhibits Gene G, and Gene G is associated with Disease X,
    then Drug D is a CANDIDATE for treating Disease X.

    This is the core logic behind computational drug repurposing.
    Example: Metformin → cancer (via AMPK/mTOR pathway)
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G

    def find_candidates(self, min_confidence: float = 0.6) -> list[dict]:
        """
        Find drug repurposing candidates not already in the TREATS edges.
        Returns ranked list of (drug, disease, confidence, path).
        """
        # Build existing drug→disease TREATS edges
        existing_treats = set()
        for u, v, data in self.G.edges(data=True):
            if data.get("relation") == "TREATS":
                existing_treats.add((u, v))

        # Find drug → gene (INHIBITS) → disease (ASSOCIATED_WITH) paths
        candidates = []
        for drug_node, _, drug_data in self.G.out_edges(data=True):
            if self.G.nodes[drug_node].get("type") != "Drug":
                continue
            if drug_data.get("relation") != "INHIBITS":
                continue

            gene_node = _
            gene_data = self.G.nodes.get(gene_node, {})
            if gene_data.get("type") not in ("Gene", "Protein"):
                continue

            drug_gene_conf = drug_data.get("confidence", 0.5)

            # Now find diseases this gene is associated with
            for _, disease_node, rel_data in self.G.out_edges(gene_node, data=True):
                rel = rel_data.get("relation", "")
                if rel not in ("ASSOCIATED_WITH", "CAUSES"):
                    continue
                if self.G.nodes[disease_node].get("type") != "Disease":
                    continue

                gene_disease_conf = rel_data.get("confidence", 0.5)

                # Skip if already treating
                if (drug_node, disease_node) in existing_treats:
                    continue

                # Compute path confidence
                path_conf = round(drug_gene_conf * gene_disease_conf, 4)
                if path_conf < min_confidence:
                    continue

                candidates.append({
                    "drug":            self.G.nodes[drug_node].get("name", drug_node),
                    "drug_mechanism":  self.G.nodes[drug_node].get("mechanism", ""),
                    "via_gene":        self.G.nodes[gene_node].get("name", gene_node),
                    "disease":         self.G.nodes[disease_node].get("name", disease_node),
                    "gene_relation":   rel,
                    "path_confidence": path_conf,
                    "reasoning":       f"{drug_node} inhibits {gene_node} → {gene_node} {rel} {disease_node}",
                })

        candidates.sort(key=lambda x: -x["path_confidence"])
        return candidates

    def save(self, candidates: list[dict]) -> Path:
        df = pd.DataFrame(candidates)
        path = GRAPH_DIR / "drug_repurposing_candidates.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Drug repurposing → {path}  ({len(df)} candidates)")
        return path


# ══════════════════════════════════════════════════════════════════
# 6I.  KNOWLEDGE GAP DETECTOR
#      Find under-researched areas in the biomedical graph
# ══════════════════════════════════════════════════════════════════

class KnowledgeGapDetector:
    """
    Identify gaps in the biomedical knowledge graph:
      - Diseases with no drug treatments
      - Genes with no associated drugs (undrugged targets)
      - Diseases with few genetic associations (poorly understood)
      - Isolated nodes (entities with no connections)
    """

    def __init__(self, G: nx.MultiDiGraph):
        self.G = G

    def analyze(self) -> dict:
        diseases = {n for n, d in self.G.nodes(data=True) if d.get("type") == "Disease"}
        genes    = {n for n, d in self.G.nodes(data=True) if d.get("type") == "Gene"}
        drugs    = {n for n, d in self.G.nodes(data=True) if d.get("type") == "Drug"}

        # Diseases with TREATS edges pointing to them
        treated_diseases = set()
        drugged_genes    = set()
        disease_gene_counts = defaultdict(int)

        for u, v, data in self.G.edges(data=True):
            rel    = data.get("relation", "")
            u_type = self.G.nodes[u].get("type", "")
            v_type = self.G.nodes[v].get("type", "")

            if rel == "TREATS" and v_type == "Disease":
                treated_diseases.add(v)
            if rel == "INHIBITS" and v_type in ("Gene", "Protein"):
                drugged_genes.add(v)
            if rel in ("ASSOCIATED_WITH", "CAUSES") and u_type == "Gene":
                disease_gene_counts[v] += 1

        untreated   = diseases - treated_diseases
        undrugged   = genes - drugged_genes
        understudied= {d for d in diseases if disease_gene_counts[d] < 2}

        # Isolated nodes
        G_simple = nx.Graph(self.G)
        isolates = set(nx.isolates(G_simple))

        return {
            "untreated_diseases": [self.G.nodes[n].get("name", n) for n in untreated],
            "undrugged_genes":    [self.G.nodes[n].get("name", n) for n in undrugged],
            "understudied_diseases": [self.G.nodes[n].get("name", n) for n in understudied],
            "isolated_nodes":     [self.G.nodes[n].get("name", n) for n in isolates],
            "n_untreated":        len(untreated),
            "n_undrugged":        len(undrugged),
            "n_understudied":     len(understudied),
            "n_isolated":         len(isolates),
            "coverage_disease":   round(len(treated_diseases) / len(diseases), 3) if diseases else 0,
            "coverage_gene":      round(len(drugged_genes) / len(genes), 3) if genes else 0,
        }


# ══════════════════════════════════════════════════════════════════
# DEMO — Run Step 6
# ══════════════════════════════════════════════════════════════════

def print_section(title: str):
    print("\n" + "═" * 70)
    print(f"  STEP 6 — {title}")
    print("═" * 70)


if __name__ == "__main__":
    print("\n  MEDINEX PHASE 0 · STEP 6: GRAPH ANALYTICS")
    print("  " + "─" * 55)

    # Load graph from Step 5
    G = load_graph()

    # ── 6A: Centrality ────────────────────────────────────────────
    print_section("CENTRALITY ANALYSIS")
    ca = CentralityAnalyzer(G)
    cent_df = ca.compute_all()

    print("\n  Top 10 nodes by PageRank (most important in the network):")
    print(f"  {'Node':<25} {'Type':<15} {'PageRank':>9} {'Betweenness':>12} {'Degree':>7}")
    print("  " + "─" * 72)
    for _, row in cent_df.head(10).iterrows():
        print(f"  {row['name']:<25} {row['type']:<15} "
              f"{row['pagerank']:>9.5f} {row['betweenness_centrality']:>12.5f} "
              f"{int(row['degree']):>7}")

    print("\n  Top nodes per entity type (PageRank):")
    top_per_type = ca.top_nodes_per_type(cent_df, top_k=3)
    for ntype, nodes in top_per_type.items():
        if not nodes:
            continue
        names = " | ".join(n["name"] for n in nodes)
        print(f"  {ntype:<20} → {names}")

    print("\n  Hub nodes (top 20% by degree):")
    hubs = ca.find_hub_nodes(cent_df, threshold=0.80)
    for h in hubs[:6]:
        print(f"  {h['name']:<25} [{h['type']}]  degree={h['degree']}  "
              f"betweenness={h['betweenness_centrality']:.4f}")

    ca.save(cent_df)

    # ── 6B: Community Detection ───────────────────────────────────
    print_section("COMMUNITY DETECTION")
    cd = CommunityDetector(G)
    communities = cd.detect()

    print("\n  Communities discovered:")
    comm_df = cd.community_summary_df(communities)
    for _, row in comm_df.iterrows():
        print(f"\n  Community {row['community_id']}  [{row['dominant_types']}]  "
              f"size={row['size']}  density={row['density']:.3f}")
        print(f"    Members: {row['sample_members']}")

    cd.save(communities)

    # ── 6C: Network Topology ──────────────────────────────────────
    print_section("NETWORK TOPOLOGY")
    ta = TopologyAnalyzer(G)
    topo = ta.analyze()

    metrics = [
        ("Nodes",                 topo["nodes"]),
        ("Edges",                 topo["edges"]),
        ("Density",               f"{topo['density']:.5f}"),
        ("Avg degree",            f"{topo['avg_degree']:.2f}"),
        ("Max degree",            topo["max_degree"]),
        ("Avg clustering coeff",  f"{topo['avg_clustering']:.4f}"),
        ("Avg path length",       topo["avg_path_length"]),
        ("Connected components",  topo["n_components"]),
        ("Largest component",     f"{topo['largest_component']} nodes"),
        ("Degree assortativity",  f"{topo['assortativity']:.4f}"),
        ("Scale-free hint",       "✓ YES" if topo["is_scale_free_hint"] else "✗ NO"),
        ("Small-world hint",      "✓ YES" if topo["is_small_world"] else "✗ NO"),
    ]
    for label, value in metrics:
        print(f"  {label:<30} {value}")

    # Save topology
    with open(GRAPH_DIR / "topology.json", "w") as f:
        json.dump(topo, f, indent=2, default=str)
    print(f"\n  ✓ Topology saved → {GRAPH_DIR / 'topology.json'}")

    # ── 6D: Disease Network ───────────────────────────────────────
    print_section("DISEASE NETWORK")
    dn = DiseaseNetwork(G)
    disease_net = dn.build()

    pairs = dn.most_similar_pairs(top_k=8)
    print("\n  Most similar disease pairs (by shared genes + drugs):")
    print(f"  {'Disease 1':<35} {'Disease 2':<35} {'Sim':>4}  Shared")
    print("  " + "─" * 90)
    for p in pairs:
        shared = p["shared_genes"][:2] + p["shared_drugs"][:2]
        print(f"  {p['disease1']:<35} {p['disease2']:<35} "
              f"{p['similarity']:>4}  [{', '.join(shared)}]")
    dn.save()

    # ── 6E: Drug Network ──────────────────────────────────────────
    print_section("DRUG NETWORK")
    drug_net = DrugNetwork(G)
    drug_net.build()
    pairs = drug_net.most_similar_pairs(top_k=6)
    print("\n  Most similar drug pairs (by shared targets + diseases):")
    print(f"  {'Drug 1':<25} {'Drug 2':<25} {'Sim':>4}  Shared diseases")
    print("  " + "─" * 75)
    for p in pairs:
        print(f"  {p['drug1']:<25} {p['drug2']:<25} {p['similarity']:>4}  "
              f"{p['shared_diseases'][:2]}")
    drug_net.save()

    # ── 6F: Gene Network ──────────────────────────────────────────
    print_section("GENE NETWORK")
    gene_net = GeneNetwork(G)
    gene_net.build()
    top_genes = gene_net.most_connected_genes(top_k=8)
    print("\n  Most connected genes in the biomedical network:")
    print(f"  {'Gene':<15} {'Connections':>12} {'Diseases':>9} {'Drugs':>6}")
    print("  " + "─" * 45)
    for g in top_genes:
        print(f"  {g['gene']:<15} {g['connections']:>12} {g['n_diseases']:>9} {g['n_drugs']:>6}")
    gene_net.save()

    # ── 6G: Drug Repurposing ──────────────────────────────────────
    print_section("DRUG REPURPOSING ENGINE")
    dre = DrugRepurposingEngine(G)
    candidates = dre.find_candidates(min_confidence=0.5)
    print(f"\n  Found {len(candidates)} novel drug-disease candidates\n")
    print(f"  {'Drug':<20} {'Via Gene':<12} {'Disease':<35} {'Confidence':>10}")
    print("  " + "─" * 82)
    for c in candidates[:10]:
        print(f"  {c['drug']:<20} {c['via_gene']:<12} {c['disease']:<35} "
              f"{c['path_confidence']:>10.4f}")
    if candidates:
        dre.save(candidates)
    else:
        print("  (No high-confidence candidates — add more INHIBITS edges)")

    # ── 6H: Knowledge Gaps ───────────────────────────────────────
    print_section("KNOWLEDGE GAP ANALYSIS")
    kgd = KnowledgeGapDetector(G)
    gaps = kgd.analyze()

    print(f"\n  Disease coverage  (have ≥1 drug treatment) : {gaps['coverage_disease']*100:.1f}%")
    print(f"  Gene coverage    (targeted by ≥1 drug)     : {gaps['coverage_gene']*100:.1f}%")
    print(f"\n  Untreated diseases  ({gaps['n_untreated']})  : "
          f"{', '.join(gaps['untreated_diseases'][:5])}")
    print(f"  Undrugged genes     ({gaps['n_undrugged']})  : "
          f"{', '.join(gaps['undrugged_genes'][:5])}")
    print(f"  Understudied diseases({gaps['n_understudied']}): "
          f"{', '.join(gaps['understudied_diseases'][:5])}")
    with open(GRAPH_DIR / "knowledge_gaps.json", "w") as f:
        json.dump(gaps, f, indent=2)
    print(f"\n  ✓ Knowledge gaps → {GRAPH_DIR / 'knowledge_gaps.json'}")

    # ── Final summary ─────────────────────────────────────────────
    print("\n" + "═" * 70)
    print("  STEP 6 OUTPUTS")
    print("═" * 70)
    outputs = [
        "centrality.csv          — node importance scores",
        "communities.json        — detected network communities",
        "topology.json           — global network structure metrics",
        "disease_network.csv     — disease-disease similarity graph",
        "drug_network.csv        — drug-drug similarity graph",
        "gene_network.csv        — gene co-association graph",
        "drug_repurposing_candidates.csv — novel drug-disease predictions",
        "knowledge_gaps.json     — under-researched areas",
    ]
    for o in outputs:
        print(f"  ✓ {o}")

    print("\n  ✅ STEP 6 COMPLETE — Knowledge Discovery Engine operational.\n")
    print("  ─" * 35)
    print("  NEXT → Step 7: FAISS semantic search over embeddings")
    print("       → Step 8: LlamaIndex + LangChain RAG pipelines")
    print("       → Step 9: GraphRAG multi-hop reasoning\n")
