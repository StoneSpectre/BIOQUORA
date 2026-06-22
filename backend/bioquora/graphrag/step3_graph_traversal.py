"""
Bioquora GraphRAG — Step 3: Knowledge Graph Traversal
=====================================================
Sub-steps:
  3.1  Graph Schema + Seed Node Generation   (entity → Neo4j node lookup)
  3.2  Cypher Query Generation               (dynamic query from intent + hop depth)
  3.3  Multi-Hop Traversal                   (path collection and node discovery)
  3.4  Graph Embeddings (PyKEEN)             (TransE / RotatE / ComplEx predictions)

Dependencies:
    pip install neo4j pykeen torch
"""

from __future__ import annotations
from dataclasses import dataclass, asdict, field
from typing import List, Dict, Optional, Tuple
import json, hashlib, math, random


# ─────────────────────────────────────────────────────────────
# Data Classes
# ─────────────────────────────────────────────────────────────

@dataclass
class GraphNode:
    node_id: str
    label: str          # Disease | Drug | Gene | Protein | Pathway | Cell | Organ | Study
    name: str
    canonical_id: str   # UMLS / HGNC / ChEMBL ID
    degree: int = 0
    is_seed: bool = False
    properties: Dict = field(default_factory=dict)


@dataclass
class GraphEdge:
    source_id: str
    target_id: str
    relation: str       # TREATS | INHIBITS | ACTIVATES | ASSOCIATED_WITH | EXPRESSED_IN | …
    confidence: float = 1.0
    source_db: str = ""


@dataclass
class TraversalPath:
    nodes: List[str]    # sequence of node names
    edges: List[str]    # sequence of relation labels
    hops: int
    total_confidence: float


@dataclass
class EmbeddingPrediction:
    model: str          # TransE | RotatE | ComplEx | DistMult
    subject: str
    relation: str
    object_predicted: str
    score: float
    is_known_edge: bool = False


@dataclass
class Step3Result:
    seed_nodes: List[GraphNode]
    cypher_query: str
    traversal_paths: List[TraversalPath]
    discovered_nodes: List[GraphNode]
    embedding_predictions: List[EmbeddingPrediction]
    total_nodes_visited: int
    total_edges_traversed: int

    def to_dict(self) -> dict:
        return asdict(self)


# ─────────────────────────────────────────────────────────────
# 3.1  Graph Schema
# ─────────────────────────────────────────────────────────────

NODE_LABELS = ["Disease", "Drug", "Gene", "Protein", "Pathway", "Cell", "Organ", "Study"]

EDGE_TYPES = [
    "TREATS", "CAUSES", "INHIBITS", "ACTIVATES",
    "EXPRESSED_IN", "ASSOCIATED_WITH", "ENCODES",
    "PHOSPHORYLATES", "TARGETS", "SYNTHETIC_LETHAL",
    "INTERACTS_WITH", "PART_OF", "REGULATES",
]

# Stub in-memory graph (production: Neo4j AuraDB or self-hosted)
STUB_GRAPH_NODES: Dict[str, GraphNode] = {
    "n:metformin":           GraphNode("n:metformin",          "Drug",    "Metformin",            "ChEMBL:CHEMBL1431", degree=312, is_seed=False),
    "n:insulin_resistance":  GraphNode("n:insulin_resistance", "Disease", "Insulin Resistance",   "UMLS:C0021655",     degree=187, is_seed=False),
    "n:ampk":                GraphNode("n:ampk",               "Protein", "AMPK",                 "UniProt:Q13131",    degree=147, is_seed=False),
    "n:mtor":                GraphNode("n:mtor",               "Protein", "mTOR",                 "UniProt:P42345",    degree=312, is_seed=False),
    "n:complex_i":           GraphNode("n:complex_i",          "Protein", "Complex I",            "UniProt:Q16718",    degree=88,  is_seed=False),
    "n:glucose_uptake":      GraphNode("n:glucose_uptake",     "Pathway", "Glucose Uptake",       "KEGG:hsa04910",     degree=54,  is_seed=False),
    "n:brca1":               GraphNode("n:brca1",              "Gene",    "BRCA1",                "HGNC:1100",         degree=421, is_seed=False),
    "n:breast_cancer":       GraphNode("n:breast_cancer",      "Disease", "Breast Cancer",        "UMLS:C0006142",     degree=589, is_seed=False),
    "n:olaparib":            GraphNode("n:olaparib",           "Drug",    "Olaparib",             "ChEMBL:CHEMBL2107691",degree=203,is_seed=False),
    "n:parp1":               GraphNode("n:parp1",              "Protein", "PARP1",                "UniProt:P09874",    degree=278, is_seed=False),
    "n:niraparib":           GraphNode("n:niraparib",          "Drug",    "Niraparib",            "ChEMBL:CHEMBL3137317",degree=145,is_seed=False),
    "n:egfr":                GraphNode("n:egfr",               "Protein", "EGFR",                 "UniProt:P00533",    degree=512, is_seed=False),
    "n:pi3k":                GraphNode("n:pi3k",               "Protein", "PI3K",                 "UniProt:P42336",    degree=421, is_seed=False),
    "n:akt":                 GraphNode("n:akt",                "Protein", "AKT",                  "UniProt:P31749",    degree=388, is_seed=False),
    "n:pip3":                GraphNode("n:pip3",               "Metabolite","PIP3",               "CHEBI:16618",       degree=112, is_seed=False),
    "n:alzheimers":          GraphNode("n:alzheimers",         "Disease", "Alzheimer's Disease",  "UMLS:C0002395",     degree=672, is_seed=False),
    "n:apoe":                GraphNode("n:apoe",               "Gene",    "APOE",                 "HGNC:613",          degree=445, is_seed=False),
    "n:app":                 GraphNode("n:app",                "Gene",    "APP",                  "HGNC:620",          degree=312, is_seed=False),
    "n:psen1":               GraphNode("n:psen1",              "Gene",    "PSEN1",                "HGNC:9508",         degree=287, is_seed=False),
    "n:trem2":               GraphNode("n:trem2",              "Gene",    "TREM2",                "HGNC:17761",        degree=198, is_seed=False),
    "n:amyloid_beta":        GraphNode("n:amyloid_beta",       "Protein", "Amyloid-β",            "UniProt:P05067",    degree=341, is_seed=False),
}

STUB_GRAPH_EDGES: List[GraphEdge] = [
    GraphEdge("n:metformin",    "n:complex_i",       "INHIBITS",         0.96, "PharmGKB"),
    GraphEdge("n:metformin",    "n:ampk",            "ACTIVATES",        0.94, "PharmGKB"),
    GraphEdge("n:ampk",         "n:mtor",            "INHIBITS",         0.88, "STRING"),
    GraphEdge("n:metformin",    "n:insulin_resistance","TREATS",         0.91, "DrugBank"),
    GraphEdge("n:insulin_resistance","n:glucose_uptake","IMPAIRS",       0.85, "UMLS"),
    GraphEdge("n:brca1",        "n:breast_cancer",   "ASSOCIATED_WITH",  0.98, "ClinVar"),
    GraphEdge("n:olaparib",     "n:parp1",           "INHIBITS",         0.97, "DrugBank"),
    GraphEdge("n:parp1",        "n:brca1",           "SYNTHETIC_LETHAL", 0.89, "STRING"),
    GraphEdge("n:niraparib",    "n:parp1",           "INHIBITS",         0.95, "DrugBank"),
    GraphEdge("n:olaparib",     "n:breast_cancer",   "TREATS",          0.93, "DrugBank"),
    GraphEdge("n:egfr",         "n:pi3k",            "ACTIVATES",        0.97, "KEGG"),
    GraphEdge("n:pi3k",         "n:pip3",            "GENERATES",        0.95, "Reactome"),
    GraphEdge("n:pip3",         "n:akt",             "RECRUITS",         0.93, "Reactome"),
    GraphEdge("n:akt",          "n:mtor",            "PHOSPHORYLATES",   0.91, "PhosphoSitePlus"),
    GraphEdge("n:alzheimers",   "n:apoe",            "ASSOCIATED_WITH",  0.99, "GWAS Catalog"),
    GraphEdge("n:alzheimers",   "n:app",             "ASSOCIATED_WITH",  0.97, "OMIM"),
    GraphEdge("n:alzheimers",   "n:psen1",           "ASSOCIATED_WITH",  0.96, "OMIM"),
    GraphEdge("n:alzheimers",   "n:trem2",           "ASSOCIATED_WITH",  0.91, "GWAS Catalog"),
    GraphEdge("n:app",          "n:amyloid_beta",    "PRODUCES",         0.97, "UniProt"),
]


# ─────────────────────────────────────────────────────────────
# Adjacency index
# ─────────────────────────────────────────────────────────────

def _build_adjacency() -> Dict[str, List[GraphEdge]]:
    adj: Dict[str, List[GraphEdge]] = {nid: [] for nid in STUB_GRAPH_NODES}
    for edge in STUB_GRAPH_EDGES:
        adj.setdefault(edge.source_id, []).append(edge)
    return adj

ADJ = _build_adjacency()


# ─────────────────────────────────────────────────────────────
# 3.1  Seed Node Generator
# ─────────────────────────────────────────────────────────────

# Maps canonical DB IDs → graph node IDs
CANONICAL_TO_NODE: Dict[str, str] = {
    n.canonical_id: nid for nid, n in STUB_GRAPH_NODES.items()
}
# Also map by lowercase name
NAME_TO_NODE: Dict[str, str] = {
    n.name.lower(): nid for nid, n in STUB_GRAPH_NODES.items()
}


class SeedNodeGenerator:
    def generate(self, linked_entities: List[dict]) -> List[GraphNode]:
        seeds: List[GraphNode] = []
        for ent in linked_entities:
            cid = ent.get("canonical_id", "")
            name = ent.get("canonical_name", "").lower()
            nid = CANONICAL_TO_NODE.get(cid) or NAME_TO_NODE.get(name)
            if nid and nid in STUB_GRAPH_NODES:
                node = STUB_GRAPH_NODES[nid]
                node.is_seed = True
                seeds.append(node)
        return seeds


# ─────────────────────────────────────────────────────────────
# 3.2  Cypher Query Generator
# ─────────────────────────────────────────────────────────────

CYPHER_TEMPLATES: Dict[str, str] = {
    "mechanistic": """MATCH path = (src:{label} {{name: "{name}"}})-[r*1..{hops}]->(tgt)
WHERE tgt:Protein OR tgt:Pathway OR tgt:Gene
RETURN src, tgt, relationships(path) AS rels
ORDER BY length(path) ASC
LIMIT 50""",

    "therapeutic": """MATCH (src:{label} {{name: "{name}"}})-[:ASSOCIATED_WITH]->(d:Disease),
      (drug:Drug)-[:TREATS|TARGETS*1..2]->(src)
WHERE drug.approved = true
RETURN drug.name, drug.approval_year, drug.mechanism
ORDER BY drug.approval_year DESC
LIMIT 20""",

    "genetic": """MATCH (d:Disease {{name: "{name}"}})-[:ASSOCIATED_WITH]->(g:Gene)
OPTIONAL MATCH (g)-[:ENCODES]->(p:Protein)
RETURN g.symbol, g.gwas_pval, p.function, p.structure
ORDER BY g.gwas_pval ASC
LIMIT 25""",

    "diagnostic": """MATCH (d:Disease {{name: "{name}"}})-[:HAS_BIOMARKER]->(b:Biomarker)
OPTIONAL MATCH (b)-[:MEASURED_BY]->(assay:Study)
RETURN d, b, assay
LIMIT 20""",

    "pathway": """MATCH (src:{label} {{name: "{name}"}})-[:ACTIVATES|INHIBITS*1..{hops}]->(pw:Pathway)
MATCH (pw)-[:ACTIVATES|INHIBITS]->(tgt)
RETURN pw, tgt
LIMIT 30""",

    "default": """MATCH path = (src {{name: "{name}"}})-[*1..{hops}]->(tgt)
RETURN src, tgt, relationships(path) AS rels
LIMIT 50""",
}


class CypherQueryGenerator:
    def generate(self, seed_nodes: List[GraphNode], intent: str, hops: int) -> str:
        if not seed_nodes:
            return "// No seed nodes found — check entity linking step"
        node = seed_nodes[0]
        template = CYPHER_TEMPLATES.get(intent, CYPHER_TEMPLATES["default"])
        return template.format(
            label=node.label,
            name=node.name,
            hops=hops,
        )


# ─────────────────────────────────────────────────────────────
# 3.3  Multi-Hop Traversal Engine
# ─────────────────────────────────────────────────────────────

class GraphTraversalEngine:
    """
    Production: execute Cypher against Neo4j.

    from neo4j import GraphDatabase

    class GraphTraversalEngine:
        def __init__(self, uri, user, password):
            self.driver = GraphDatabase.driver(uri, auth=(user, password))

        def traverse(self, cypher: str) -> List[dict]:
            with self.driver.session() as session:
                result = session.run(cypher)
                return [dict(record) for record in result]
    """

    def traverse(self,
                 seed_nodes: List[GraphNode],
                 max_hops: int) -> Tuple[List[TraversalPath], List[GraphNode]]:
        paths: List[TraversalPath] = []
        discovered: Dict[str, GraphNode] = {}

        def dfs(current_id: str, path_nodes: List[str], path_edges: List[str],
                depth: int, visited: set, conf: float):
            # Record the path so far whenever it has grown beyond the seed,
            # not only when max depth is reached — many real paths dead-end
            # before max_hops because a node has no further outgoing edges.
            if len(path_nodes) > 1:
                paths.append(TraversalPath(
                    nodes=list(path_nodes),
                    edges=list(path_edges),
                    hops=len(path_edges),
                    total_confidence=round(conf, 3),
                ))
            if depth == 0:
                return
            for edge in ADJ.get(current_id, []):
                tid = edge.target_id
                if tid in visited:
                    continue
                tnode = STUB_GRAPH_NODES.get(tid)
                if not tnode:
                    continue
                discovered[tid] = tnode
                visited.add(tid)
                path_nodes.append(tnode.name)
                path_edges.append(edge.relation)
                dfs(tid, path_nodes, path_edges, depth - 1, visited, conf * edge.confidence)
                path_nodes.pop()
                path_edges.pop()
                visited.discard(tid)

        for seed in seed_nodes:
            visited = {seed.node_id}
            dfs(seed.node_id, [seed.name], [], max_hops, visited, 1.0)

        # Remove seeds from discovered
        for s in seed_nodes:
            discovered.pop(s.node_id, None)

        # Sort paths by confidence
        paths.sort(key=lambda p: p.total_confidence, reverse=True)
        return paths[:8], list(discovered.values())


# ─────────────────────────────────────────────────────────────
# 3.4  PyKEEN Embedding Predictions
# ─────────────────────────────────────────────────────────────

class PyKEENPredictor:
    """
    Production implementation using PyKEEN:

    from pykeen.pipeline import pipeline as keen_pipeline
    from pykeen.triples import TriplesFactory

    # Train
    result = keen_pipeline(
        model="RotatE",
        dataset="Nations",          # replace with bioquora KG triples
        training_kwargs=dict(num_epochs=200),
    )
    model = result.model

    # Predict tail
    from pykeen.models.predict import predict_target
    df = predict_target(
        model=model,
        head="Metformin",
        relation="TREATS",
        triples_factory=result.training,
    ).df

    Supported models: TransE, RotatE, ComplEx, DistMult, TuckER, RESCAL, ConvE
    """

    MODELS = ["TransE", "RotatE", "ComplEx", "DistMult"]

    # Pre-computed stub predictions per entity combination
    STUB_PREDICTIONS: Dict[str, List[dict]] = {
        "n:metformin": [
            {"model":"TransE",  "rel":"TREATS",        "obj":"Type 2 Diabetes",             "score":0.93},
            {"model":"RotatE",  "rel":"INHIBITS",       "obj":"mTORC1",                      "score":0.87},
            {"model":"ComplEx", "rel":"SUPPRESSES",     "obj":"Hepatic Gluconeogenesis",      "score":0.81},
        ],
        "n:brca1": [
            {"model":"RotatE",  "rel":"CONFERS_SENSITIVITY","obj":"Platinum chemotherapy",   "score":0.88},
            {"model":"TransE",  "rel":"ASSOCIATED_WITH", "obj":"Ovarian Cancer",              "score":0.84},
            {"model":"DistMult","rel":"INTERACTS_WITH",  "obj":"RAD51",                       "score":0.79},
        ],
        "n:egfr": [
            {"model":"ComplEx", "rel":"ACTIVATES",      "obj":"RAS-MAPK pathway",             "score":0.92},
            {"model":"TransE",  "rel":"ASSOCIATED_WITH","obj":"NSCLC resistance",             "score":0.85},
            {"model":"RotatE",  "rel":"INHIBITED_BY",   "obj":"Afatinib",                     "score":0.83},
        ],
        "n:alzheimers": [
            {"model":"TransE",  "rel":"ASSOCIATED_WITH","obj":"Tau hyperphosphorylation",     "score":0.94},
            {"model":"RotatE",  "rel":"ASSOCIATED_WITH","obj":"Neuroinflammation",            "score":0.86},
            {"model":"ComplEx", "rel":"TREATED_BY",     "obj":"Lecanemab",                    "score":0.78},
        ],
    }

    def predict(self, seed_nodes: List[GraphNode],
                discovered_nodes: List[GraphNode]) -> List[EmbeddingPrediction]:
        preds: List[EmbeddingPrediction] = []
        for seed in seed_nodes:
            stub = self.STUB_PREDICTIONS.get(seed.node_id, [])
            for p in stub:
                preds.append(EmbeddingPrediction(
                    model=p["model"],
                    subject=seed.name,
                    relation=p["rel"],
                    object_predicted=p["obj"],
                    score=p["score"],
                    is_known_edge=False,
                ))
        # Also score some discovered edges as known
        for dn in discovered_nodes[:2]:
            preds.append(EmbeddingPrediction(
                model="DistMult",
                subject=seed_nodes[0].name if seed_nodes else "?",
                relation="INTERACTS_WITH",
                object_predicted=dn.name,
                score=round(0.65 + 0.1 * random.random(), 3),
                is_known_edge=True,
            ))
        preds.sort(key=lambda p: p.score, reverse=True)
        return preds


# ─────────────────────────────────────────────────────────────
# Orchestrator
# ─────────────────────────────────────────────────────────────

class GraphTraversal:
    def __init__(self):
        self.seed_gen  = SeedNodeGenerator()
        self.cypher_gen = CypherQueryGenerator()
        self.engine    = GraphTraversalEngine()
        self.pykeen    = PyKEENPredictor()

    def run(self, step1_result: dict) -> dict:
        intent      = step1_result.get("intent", {}).get("intent", "mechanistic")
        linked      = step1_result.get("linked_entities", [])
        hop_depth   = step1_result.get("multi_hop", {}).get("neo4j_traversal_depth", 2)

        print("  [3.1] Generating seed nodes from linked entities…")
        seeds = self.seed_gen.generate(linked)
        if not seeds and STUB_GRAPH_NODES:
            # fallback: use first node
            first = list(STUB_GRAPH_NODES.values())[0]
            first.is_seed = True
            seeds = [first]

        print("  [3.2] Generating Cypher query…")
        cypher = self.cypher_gen.generate(seeds, intent, hop_depth)

        print(f"  [3.3] Traversing graph (max {hop_depth} hops)…")
        paths, discovered = self.engine.traverse(seeds, hop_depth)

        print("  [3.4] PyKEEN embedding predictions…")
        predictions = self.pykeen.predict(seeds, discovered)

        total_edges = sum(len(ADJ.get(n.node_id, [])) for n in seeds + discovered)

        result = Step3Result(
            seed_nodes=seeds,
            cypher_query=cypher,
            traversal_paths=paths,
            discovered_nodes=discovered,
            embedding_predictions=predictions,
            total_nodes_visited=len(seeds) + len(discovered),
            total_edges_traversed=total_edges,
        )
        return result.to_dict()


# ─────────────────────────────────────────────────────────────
# Quick test
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    from step1_question_understanding import QuestionUnderstanding
    qu = QuestionUnderstanding()
    gt = GraphTraversal()
    for q in ["How does Metformin reduce insulin resistance?",
              "What genes are associated with Alzheimer's disease?"]:
        s1 = qu.run(q)
        s3 = gt.run(s1)
        print(json.dumps(s3, indent=2))
        print()
