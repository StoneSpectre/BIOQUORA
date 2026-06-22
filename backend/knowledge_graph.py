"""
BIOQUORA — STEP 5: KNOWLEDGE GRAPH ENGINEERING
==============================================
Connects all biomedical concepts extracted in Step 4 into a
queryable knowledge graph.

Architecture:
  ┌─────────────────────────────────────────────────────────────────┐
  │  Neo4j (production)  ←→  BioquoraGraph (in-memory fallback)     │
  │                                                                  │
  │  Nodes:   Disease · Drug · Gene · Protein · Paper · Chemical   │
  │  Edges:   TREATS · INHIBITS · ASSOCIATED_WITH · CAUSES ·       │
  │           TARGETED_BY · BIOMARKER_FOR · CO_OCCURS ·            │
  │           MENTIONED_IN · HAS_MESH_TERM                         │
  └─────────────────────────────────────────────────────────────────┘

Bioquora Biomedical Graph schema:
  Disease ──Associated_With──▶ Gene
  Gene    ──Targeted_By──────▶ Drug
  Drug    ──Mentioned_In─────▶ Paper
  Gene    ──Causes───────────▶ Disease
  Drug    ──Treats───────────▶ Disease
  Protein ──Biomarker_For────▶ Disease
"""

import json
import sqlite3
import pandas as pd
import networkx as nx
from pathlib import Path
from collections import defaultdict
from typing import Optional

DATA_DIR  = Path(__file__).parent.parent / "data"
NLP_DIR   = DATA_DIR / "nlp"
GRAPH_DIR = DATA_DIR / "graph"
GRAPH_DIR.mkdir(parents=True, exist_ok=True)


# ══════════════════════════════════════════════════════════════════
# 5A.  NEO4J SCHEMA & CYPHER REFERENCE
#      (Production schema — run these in Neo4j Desktop / AuraDB)
# ══════════════════════════════════════════════════════════════════

NEO4J_SCHEMA = {
    "constraints": [
        "CREATE CONSTRAINT disease_name IF NOT EXISTS FOR (d:Disease) REQUIRE d.name IS UNIQUE",
        "CREATE CONSTRAINT drug_name    IF NOT EXISTS FOR (d:Drug)    REQUIRE d.name IS UNIQUE",
        "CREATE CONSTRAINT gene_name    IF NOT EXISTS FOR (g:Gene)    REQUIRE g.name IS UNIQUE",
        "CREATE CONSTRAINT protein_name IF NOT EXISTS FOR (p:Protein) REQUIRE p.name IS UNIQUE",
        "CREATE CONSTRAINT paper_pmid   IF NOT EXISTS FOR (p:Paper)   REQUIRE p.pmid IS UNIQUE",
    ],
    "indexes": [
        "CREATE INDEX disease_idx IF NOT EXISTS FOR (d:Disease) ON (d.name)",
        "CREATE INDEX drug_idx    IF NOT EXISTS FOR (d:Drug)    ON (d.name)",
        "CREATE INDEX gene_idx    IF NOT EXISTS FOR (g:Gene)    ON (g.name)",
        "CREATE FULLTEXT INDEX biomedical_search IF NOT EXISTS FOR (n:Disease|Drug|Gene|Protein) ON EACH [n.name, n.description]",
    ],
    "node_templates": {
        "Disease": "MERGE (d:Disease {name: $name}) SET d.icd_code=$icd, d.description=$desc, d.updated=timestamp()",
        "Drug":    "MERGE (d:Drug    {name: $name}) SET d.ndc=$ndc, d.mechanism=$mechanism, d.updated=timestamp()",
        "Gene":    "MERGE (g:Gene    {name: $name}) SET g.hgnc_id=$hgnc, g.chromosome=$chr, g.updated=timestamp()",
        "Protein": "MERGE (p:Protein {name: $name}) SET p.uniprot_id=$uniprot, p.updated=timestamp()",
        "Paper":   "MERGE (p:Paper   {pmid: $pmid}) SET p.title=$title, p.journal=$journal, p.year=$year, p.doi=$doi",
        "Chemical":"MERGE (c:Chemical{name: $name}) SET c.chebi_id=$chebi, c.updated=timestamp()",
    },
    "relationship_templates": {
        "TREATS":           "MATCH (d:Drug {name:$drug}), (dis:Disease {name:$disease}) MERGE (d)-[r:TREATS {confidence:$conf, pmid:$pmid}]->(dis)",
        "INHIBITS":         "MATCH (d:Drug {name:$drug}), (g:Gene {name:$target}) MERGE (d)-[r:INHIBITS {confidence:$conf, pmid:$pmid}]->(g)",
        "ASSOCIATED_WITH":  "MATCH (g:Gene {name:$gene}), (d:Disease {name:$disease}) MERGE (g)-[r:ASSOCIATED_WITH {confidence:$conf, pmid:$pmid}]->(d)",
        "CAUSES":           "MATCH (g:Gene {name:$gene}), (d:Disease {name:$disease}) MERGE (g)-[r:CAUSES {confidence:$conf}]->(d)",
        "TARGETED_BY":      "MATCH (g:Gene {name:$gene}), (d:Drug {name:$drug}) MERGE (g)-[r:TARGETED_BY {confidence:$conf}]->(d)",
        "BIOMARKER_FOR":    "MATCH (p:Protein {name:$protein}), (d:Disease {name:$disease}) MERGE (p)-[r:BIOMARKER_FOR {confidence:$conf}]->(d)",
        "MENTIONED_IN":     "MATCH (e {name:$entity}), (p:Paper {pmid:$pmid}) MERGE (e)-[:MENTIONED_IN]->(p)",
        "HAS_MESH_TERM":    "MATCH (p:Paper {pmid:$pmid}), (m:MeSHTerm {name:$term}) MERGE (p)-[:HAS_MESH_TERM]->(m)",
    },
    "example_queries": {
        "All drugs treating Alzheimer's": """
            MATCH (d:Drug)-[:TREATS]->(dis:Disease {name:"alzheimer's disease"})
            RETURN d.name AS drug, d.mechanism AS mechanism
            ORDER BY d.name
        """,
        "Gene → Disease paths (2 hops)": """
            MATCH path = (g:Gene)-[:ASSOCIATED_WITH|CAUSES*1..2]->(dis:Disease)
            WHERE dis.name CONTAINS "alzheimer"
            RETURN path LIMIT 25
        """,
        "Drug targets for a disease (via gene)": """
            MATCH (drug:Drug)-[:INHIBITS|TARGETED_BY]-(g:Gene)-[:ASSOCIATED_WITH]->(dis:Disease)
            WHERE dis.name = $disease_name
            RETURN DISTINCT drug.name AS drug, g.name AS target_gene, dis.name AS disease
            ORDER BY drug.name
        """,
        "GraphRAG multi-hop query": """
            MATCH (dis:Disease {name:"alzheimer's disease"})
            MATCH (dis)<-[:ASSOCIATED_WITH|CAUSES]-(g:Gene)
            MATCH (g)<-[:INHIBITS|TARGETED_BY]-(drug:Drug)
            MATCH (drug)-[:MENTIONED_IN]->(p:Paper)
            RETURN dis.name, g.name, drug.name, p.pmid, p.title
            ORDER BY g.name, drug.name
            LIMIT 50
        """,
        "Most connected diseases": """
            MATCH (dis:Disease)<-[r]-()
            RETURN dis.name AS disease, count(r) AS connections
            ORDER BY connections DESC LIMIT 10
        """,
    }
}


# ══════════════════════════════════════════════════════════════════
# 5B.  NEO4J CONNECTOR (Production — requires running Neo4j instance)
# ══════════════════════════════════════════════════════════════════

class Neo4jConnector:
    """
    Production Neo4j graph database connector.

    Setup:
      1. Install Neo4j Desktop: https://neo4j.com/download/
         OR use AuraDB free tier: https://neo4j.com/cloud/platform/aura-graph-database/
      2. Start database, set password
      3. Pass credentials to constructor

    Usage:
      neo4j = Neo4jConnector("bolt://localhost:7687", "neo4j", "your_password")
      neo4j.setup_schema()
      neo4j.ingest_graph(graph)
    """

    def __init__(self, uri: str = "bolt://localhost:7687",
                 user: str = "neo4j", password: str = "bioquora"):
        from neo4j import GraphDatabase
        self.driver = GraphDatabase.driver(uri, auth=(user, password))
        self._connected = False

    def test_connection(self) -> bool:
        try:
            with self.driver.session() as s:
                s.run("RETURN 1")
            self._connected = True
            return True
        except Exception as e:
            print(f"  ⚠ Neo4j not available: {e}")
            print("  → Using in-memory BioquoraGraph (NetworkX) instead")
            return False

    def setup_schema(self):
        """Create all constraints and indexes."""
        with self.driver.session() as s:
            for stmt in NEO4J_SCHEMA["constraints"] + NEO4J_SCHEMA["indexes"]:
                s.run(stmt)
        print("  ✓ Neo4j schema created")

    def ingest_graph(self, graph: "BioquoraGraph"):
        """Ingest a BioquoraGraph into Neo4j."""
        with self.driver.session() as s:
            # Nodes
            for node_id, attrs in graph.G.nodes(data=True):
                label = attrs.get("type", "Entity")
                query = NEO4J_SCHEMA["node_templates"].get(label,
                    "MERGE (n:Entity {name: $name}) SET n.type=$type")
                s.run(query, name=node_id, **{k: v for k, v in attrs.items()
                                               if k not in ("type",)})
            # Relationships
            for src, dst, attrs in graph.G.edges(data=True):
                rel_type = attrs.get("relation", "RELATED_TO")
                s.run(f"""
                    MATCH (a {{name: $src}}), (b {{name: $dst}})
                    MERGE (a)-[r:{rel_type}]->(b)
                    SET r += $props
                """, src=src, dst=dst,
                     props={k: v for k, v in attrs.items() if k != "relation"})
        print(f"  ✓ Ingested {graph.G.number_of_nodes()} nodes, "
              f"{graph.G.number_of_edges()} edges into Neo4j")

    def run_cypher(self, query: str, params: dict = None) -> list:
        with self.driver.session() as s:
            result = s.run(query, params or {})
            return [dict(r) for r in result]

    def close(self):
        self.driver.close()


# ══════════════════════════════════════════════════════════════════
# 5C.  BIOQUORA IN-MEMORY KNOWLEDGE GRAPH
#      Built on NetworkX — mirrors the Neo4j schema exactly.
#      Every method has a Cypher equivalent comment.
# ══════════════════════════════════════════════════════════════════

class BioquoraGraph:
    """
    In-memory Biomedical Knowledge Graph backed by NetworkX DiGraph.
    Mirrors Neo4j schema — use as development/offline replacement.

    Node types : Disease · Drug · Gene · Protein · Paper · Chemical · MeSHTerm
    Edge types : TREATS · INHIBITS · ASSOCIATED_WITH · CAUSES · TARGETED_BY ·
                 BIOMARKER_FOR · CO_OCCURS · MENTIONED_IN · HAS_MESH_TERM
    """

    # Node type → display color (for visualization)
    NODE_COLORS = {
        "Disease":   "#ff4e4e",
        "Drug":      "#4eaaff",
        "Gene":      "#4eff91",
        "Protein":   "#ffd04e",
        "Paper":     "#c84eff",
        "Chemical":  "#ff8c4e",
        "MeSHTerm":  "#4effd0",
    }

    def __init__(self):
        self.G = nx.MultiDiGraph()  # directed, allows parallel edges
        self._node_registry: dict[str, str] = {}   # name → type
        self._stats = defaultdict(int)

    # ─── Node operations ─────────────────────────────────────────

    def add_node(self, name: str, node_type: str, **attrs) -> str:
        """
        Add or update a node.
        Cypher: MERGE (n:NodeType {name: $name}) SET n += $attrs
        """
        nid = self._normalize(name)
        if not self.G.has_node(nid):
            self.G.add_node(nid, type=node_type, name=name,
                            color=self.NODE_COLORS.get(node_type, "#aaaaaa"),
                            **attrs)
            self._node_registry[nid] = node_type
            self._stats[f"nodes_{node_type}"] += 1
        else:
            self.G.nodes[nid].update(attrs)
        return nid

    def add_disease(self, name: str, icd_code: str = "", **kw): return self.add_node(name, "Disease", icd_code=icd_code, **kw)
    def add_drug(self, name: str, mechanism: str = "", **kw):    return self.add_node(name, "Drug", mechanism=mechanism, **kw)
    def add_gene(self, name: str, chromosome: str = "", **kw):   return self.add_node(name, "Gene", chromosome=chromosome, **kw)
    def add_protein(self, name: str, uniprot: str = "", **kw):   return self.add_node(name, "Protein", uniprot_id=uniprot, **kw)
    def add_paper(self, pmid: str, title: str = "", journal: str = "", year: str = "", doi: str = ""):
        return self.add_node(pmid, "Paper", title=title, journal=journal, year=year, doi=doi)
    def add_chemical(self, name: str, **kw):  return self.add_node(name, "Chemical", **kw)
    def add_mesh_term(self, name: str, **kw): return self.add_node(name, "MeSHTerm", **kw)

    # ─── Edge operations ─────────────────────────────────────────

    def add_edge(self, src: str, dst: str, relation: str,
                 confidence: float = 1.0, pmid: str = "", **attrs):
        """
        Add a typed, weighted directed edge.
        Cypher: MATCH (a {name:$src}),(b {name:$dst}) MERGE (a)-[r:RELATION]->(b)
        """
        s = self._normalize(src)
        d = self._normalize(dst)
        if not self.G.has_node(s) or not self.G.has_node(d):
            return
        self.G.add_edge(s, d, relation=relation,
                        confidence=confidence, pmid=pmid, **attrs)
        self._stats[f"edges_{relation}"] += 1

    def treats(self, drug, disease, **kw):          self.add_edge(drug, disease, "TREATS", **kw)
    def inhibits(self, drug, target, **kw):         self.add_edge(drug, target, "INHIBITS", **kw)
    def associated_with(self, gene, disease, **kw): self.add_edge(gene, disease, "ASSOCIATED_WITH", **kw)
    def causes(self, gene, disease, **kw):          self.add_edge(gene, disease, "CAUSES", **kw)
    def targeted_by(self, gene, drug, **kw):        self.add_edge(gene, drug, "TARGETED_BY", **kw)
    def biomarker_for(self, protein, disease, **kw):self.add_edge(protein, disease, "BIOMARKER_FOR", **kw)
    def co_occurs(self, e1, e2, **kw):              self.add_edge(e1, e2, "CO_OCCURS", **kw)
    def mentioned_in(self, entity, pmid, **kw):     self.add_edge(entity, pmid, "MENTIONED_IN", **kw)
    def has_mesh_term(self, paper, mesh, **kw):     self.add_edge(paper, mesh, "HAS_MESH_TERM", **kw)

    # ─── Query interface ─────────────────────────────────────────

    def get_drugs_for_disease(self, disease: str) -> list[dict]:
        """
        Find drugs that treat a disease.
        Cypher: MATCH (d:Drug)-[:TREATS]->(dis:Disease {name:$disease}) RETURN d
        """
        d = self._normalize(disease)
        results = []
        for node in self.G.predecessors(d):
            for _, _, data in self.G.in_edges(d, data=True):
                if data.get("relation") == "TREATS":
                    results.append({
                        "drug": self.G.nodes[node].get("name", node),
                        "confidence": data.get("confidence", 1.0),
                        "pmid": data.get("pmid", ""),
                    })
        return results

    def get_genes_for_disease(self, disease: str) -> list[dict]:
        """
        Find genes associated with or causing a disease.
        Cypher: MATCH (g:Gene)-[:ASSOCIATED_WITH|CAUSES]->(dis:Disease {name:$n}) RETURN g
        """
        d = self._normalize(disease)
        results = []
        for src, _, data in self.G.in_edges(d, data=True):
            rel = data.get("relation", "")
            if rel in ("ASSOCIATED_WITH", "CAUSES"):
                n = self.G.nodes[src]
                if n.get("type") == "Gene":
                    results.append({
                        "gene": n.get("name", src),
                        "relation": rel,
                        "confidence": data.get("confidence", 1.0),
                    })
        return results

    def get_drug_targets(self, drug: str) -> list[dict]:
        """
        Get all targets (genes/proteins) inhibited by a drug.
        Cypher: MATCH (d:Drug {name:$drug})-[:INHIBITS]->(g:Gene) RETURN g
        """
        d = self._normalize(drug)
        results = []
        for _, dst, data in self.G.out_edges(d, data=True):
            if data.get("relation") == "INHIBITS":
                n = self.G.nodes[dst]
                results.append({
                    "target": n.get("name", dst),
                    "type": n.get("type", "?"),
                    "confidence": data.get("confidence", 1.0),
                })
        return results

    def multihop_query(self, disease: str) -> dict:
        """
        GraphRAG-style multi-hop:
        Disease → Genes → Drugs (via gene targeting)
        Cypher: See NEO4J_SCHEMA["example_queries"]["GraphRAG multi-hop query"]
        """
        d = self._normalize(disease)
        result = {"disease": disease, "genes": [], "drugs_via_gene": []}
        genes = self.get_genes_for_disease(disease)
        result["genes"] = genes
        for g_info in genes:
            gene = g_info["gene"]
            gn = self._normalize(gene)
            # Find drugs targeting this gene
            for _, dst, data in self.G.out_edges(gn, data=True):
                rel = data.get("relation", "")
                if rel in ("TARGETED_BY",):
                    drug_node = self.G.nodes[dst]
                    if drug_node.get("type") == "Drug":
                        result["drugs_via_gene"].append({
                            "gene": gene,
                            "drug": drug_node.get("name", dst),
                            "relation": rel,
                        })
        return result

    def get_papers_mentioning(self, entity: str) -> list[str]:
        """
        Find all papers mentioning an entity.
        Cypher: MATCH (e {name:$entity})-[:MENTIONED_IN]->(p:Paper) RETURN p.pmid
        """
        e = self._normalize(entity)
        pmids = []
        for _, dst, data in self.G.out_edges(e, data=True):
            if data.get("relation") == "MENTIONED_IN":
                pmids.append(self.G.nodes[dst].get("name", dst))
        return pmids

    def node_info(self, name: str) -> dict:
        """Get full node attributes."""
        n = self._normalize(name)
        if self.G.has_node(n):
            return dict(self.G.nodes[n])
        return {}

    def stats(self) -> dict:
        return {
            "total_nodes": self.G.number_of_nodes(),
            "total_edges": self.G.number_of_edges(),
            **dict(self._stats),
        }

    # ─── Persistence ─────────────────────────────────────────────

    def save(self, path: Optional[Path] = None) -> Path:
        """Export graph to JSON (nodes + edges)."""
        path = path or GRAPH_DIR / "bioquora_graph.json"
        data = {
            "nodes": [{"id": n, **dict(self.G.nodes[n])} for n in self.G.nodes],
            "edges": [{"src": u, "dst": v, **dict(d)}
                      for u, v, d in self.G.edges(data=True)],
            "stats": self.stats(),
        }
        with open(path, "w") as f:
            json.dump(data, f, indent=2, default=str)
        print(f"  ✓ Graph saved → {path}  "
              f"({self.G.number_of_nodes()} nodes, {self.G.number_of_edges()} edges)")
        return path

    def save_graphml(self, path: Optional[Path] = None) -> Path:
        """Export to GraphML — importable into Neo4j and Gephi."""
        path = path or GRAPH_DIR / "bioquora_graph.graphml"
        # GraphML doesn't support dict attrs — stringify them
        G_simple = nx.DiGraph()
        for n, d in self.G.nodes(data=True):
            G_simple.add_node(n, **{k: str(v) for k, v in d.items()})
        for u, v, d in self.G.edges(data=True):
            G_simple.add_edge(u, v, **{k: str(v2) for k, v2 in d.items()})
        nx.write_graphml(G_simple, str(path))
        print(f"  ✓ GraphML saved → {path}")
        return path

    def save_node_csv(self) -> Path:
        """Save nodes as CSV (Neo4j import format)."""
        rows = []
        for n, d in self.G.nodes(data=True):
            rows.append({"id": n, **d})
        df = pd.DataFrame(rows)
        path = GRAPH_DIR / "nodes.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Nodes CSV  → {path}  ({len(df)} rows)")
        return path

    def save_edge_csv(self) -> Path:
        """Save edges as CSV (Neo4j import format)."""
        rows = []
        for u, v, d in self.G.edges(data=True):
            rows.append({"src": u, "dst": v, **d})
        df = pd.DataFrame(rows)
        path = GRAPH_DIR / "edges.csv"
        df.to_csv(path, index=False)
        print(f"  ✓ Edges CSV  → {path}  ({len(df)} rows)")
        return path

    @staticmethod
    def _normalize(name: str) -> str:
        return name.lower().strip()


# ══════════════════════════════════════════════════════════════════
# 5D.  GRAPH BUILDER
#      Ingests NLP output (Step 4) + clinical data (Step 3) into graph
# ══════════════════════════════════════════════════════════════════

class GraphBuilder:
    """Builds the BioquoraGraph from all upstream data sources."""

    def __init__(self, graph: BioquoraGraph):
        self.G = graph

    def ingest_nlp_results(self, nlp_results: list[dict],
                            papers: list[dict]) -> "GraphBuilder":
        """Ingest NER entities + relations from Step 4."""
        print(f"  Ingesting NLP results for {len(nlp_results)} papers...")

        # Build paper lookup
        paper_meta = {p["pmid"]: p for p in papers}

        for result in nlp_results:
            pmid  = result.get("pmid", "")
            meta  = paper_meta.get(pmid, {})

            # Add Paper node
            self.G.add_paper(
                pmid,
                title=meta.get("title", ""),
                journal=meta.get("journal", ""),
                year=meta.get("pub_year", ""),
                doi=meta.get("doi", ""),
            )

            # Add entity nodes
            summary = result.get("entity_summary", {})
            for etype, terms in summary.items():
                for term in terms:
                    if etype == "DISEASE":
                        self.G.add_disease(term)
                    elif etype == "DRUG":
                        self.G.add_drug(term)
                    elif etype == "GENE":
                        self.G.add_gene(term)
                    elif etype == "PROTEIN":
                        self.G.add_protein(term)
                    elif etype == "CHEMICAL":
                        self.G.add_chemical(term)
                    elif etype in ("ANATOMICAL_STRUCTURE", "SPECIES"):
                        self.G.add_node(term, etype)
                    # Link entity → paper
                    self.G.mentioned_in(term, pmid)

            # Add MeSH terms
            for mesh in meta.get("mesh_terms", []):
                term = mesh.get("term", "")
                if term:
                    self.G.add_mesh_term(term)
                    self.G.has_mesh_term(pmid, term)

            # Add relations from Step 4
            for rel in result.get("relations", []):
                subj = rel.get("subject", "")
                obj  = rel.get("object", "")
                rtype= rel.get("relation", "CO_OCCURS")
                conf = rel.get("confidence", 0.5)

                if not subj or not obj:
                    continue
                if rtype == "TREATS":
                    self.G.treats(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "INHIBITS":
                    self.G.inhibits(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "ASSOCIATED_WITH":
                    self.G.associated_with(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "CAUSES":
                    self.G.causes(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "TARGETED_BY":
                    self.G.targeted_by(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "BIOMARKER_FOR":
                    self.G.biomarker_for(subj, obj, confidence=conf, pmid=pmid)
                elif rtype == "CO_OCCURS":
                    self.G.co_occurs(subj, obj, confidence=conf, pmid=pmid)

        return self

    def ingest_clinical_data(self, db_path: Path) -> "GraphBuilder":
        """
        Ingest MIMIC-IV clinical data: diagnosis → drug co-prescriptions.
        Adds CLINICAL_COMORBIDITY and PRESCRIBED_WITH edges.
        """
        print("  Ingesting clinical data from MIMIC-IV...")
        try:
            conn = sqlite3.connect(db_path)

            # Top diagnoses → add as Disease nodes with ICD codes
            diag_df = pd.read_sql("""
                SELECT icd_code, COUNT(*) as n
                FROM diagnoses_icd WHERE seq_num=1
                GROUP BY icd_code ORDER BY n DESC LIMIT 20
            """, conn)

            ICD_NAMES = {
                "I50.9": "heart failure", "J18.9": "pneumonia",
                "N17.9": "acute kidney injury", "E11.9": "type 2 diabetes",
                "I21.9": "myocardial infarction", "A41.9": "sepsis",
                "J44.1": "copd", "G35": "multiple sclerosis",
                "C34.10": "lung cancer", "F32.9": "major depressive disorder",
            }

            for _, row in diag_df.iterrows():
                code = row["icd_code"]
                name = ICD_NAMES.get(code, code)
                self.G.add_disease(name, icd_code=code,
                                   clinical_frequency=int(row["n"]))

            # Drug → Disease: PRESCRIBED_FOR (from prescriptions + diagnoses)
            presc_df = pd.read_sql("""
                SELECT p.drug, d.icd_code, COUNT(*) as n
                FROM prescriptions p
                JOIN diagnoses_icd d ON p.hadm_id = d.hadm_id AND d.seq_num=1
                GROUP BY p.drug, d.icd_code
                HAVING n >= 2
                ORDER BY n DESC LIMIT 30
            """, conn)

            for _, row in presc_df.iterrows():
                drug = row["drug"].lower()
                disease = ICD_NAMES.get(row["icd_code"], row["icd_code"]).lower()
                self.G.add_drug(drug)
                self.G.treats(drug, disease,
                              confidence=0.6,
                              source="clinical_mimic",
                              frequency=int(row["n"]))

            # Comorbidities: diagnoses that appear together in same admission
            comorbid_df = pd.read_sql("""
                SELECT a.icd_code as code1, b.icd_code as code2, COUNT(*) as n
                FROM diagnoses_icd a
                JOIN diagnoses_icd b ON a.hadm_id=b.hadm_id
                WHERE a.icd_code < b.icd_code AND a.seq_num<=3 AND b.seq_num<=3
                GROUP BY a.icd_code, b.icd_code
                HAVING n >= 3
                ORDER BY n DESC LIMIT 20
            """, conn)

            for _, row in comorbid_df.iterrows():
                d1 = ICD_NAMES.get(row["code1"], row["code1"]).lower()
                d2 = ICD_NAMES.get(row["code2"], row["code2"]).lower()
                self.G.add_disease(d1)
                self.G.add_disease(d2)
                self.G.add_edge(d1, d2, "CLINICAL_COMORBIDITY",
                                confidence=0.7, frequency=int(row["n"]),
                                source="mimic_iv")

            conn.close()
            print(f"  ✓ Clinical data ingested")
        except Exception as e:
            print(f"  ⚠ Clinical data skipped: {e}")
        return self

    def add_curated_biomedical_facts(self) -> "GraphBuilder":
        """
        Add well-established biomedical facts as high-confidence edges.
        These represent gold-standard knowledge (OMIM, DrugBank, UniProt).
        """
        print("  Adding curated biomedical facts...")

        # ── Disease nodes ─────────────────────────────────────────
        diseases = [
            ("alzheimer's disease",    "G30.9"),
            ("breast cancer",          "C50.9"),
            ("type 2 diabetes",        "E11.9"),
            ("heart failure",          "I50.9"),
            ("lung cancer",            "C34.10"),
            ("multiple myeloma",       "C90.0"),
            ("diffuse large b-cell lymphoma", "C83.3"),
            ("mantle cell lymphoma",   "C83.1"),
            ("sepsis",                 "A41.9"),
            ("parkinson's disease",    "G20"),
        ]
        for name, icd in diseases:
            self.G.add_disease(name, icd_code=icd)

        # ── Gene nodes ────────────────────────────────────────────
        genes = [
            ("brca1", "17q21"),  ("brca2", "13q12"),
            ("app",   "21q21"),  ("psen1", "14q24"),
            ("apoe",  "19q13"),  ("tp53",  "17p13"),
            ("egfr",  "7p12"),   ("kras",  "12p12"),
            ("braf",  "7q34"),   ("her2",  "17q12"),
            ("trem2", "6p21"),   ("cd19",  "16p11"),
            ("bcma",  "16p13"),  ("il6",   "7p21"),
            ("tnf",   "6p21"),
        ]
        for name, chrom in genes:
            self.G.add_gene(name, chromosome=chrom)

        # ── Drug nodes ────────────────────────────────────────────
        drugs = [
            ("lecanemab",    "anti-amyloid monoclonal antibody"),
            ("aducanumab",   "anti-amyloid monoclonal antibody"),
            ("donanemab",    "anti-amyloid monoclonal antibody"),
            ("olaparib",     "PARP1/2 inhibitor"),
            ("pembrolizumab","PD-1 checkpoint inhibitor"),
            ("nivolumab",    "PD-1 checkpoint inhibitor"),
            ("trastuzumab",  "HER2-targeted monoclonal antibody"),
            ("metformin",    "AMPK activator / biguanide"),
            ("rituximab",    "anti-CD20 monoclonal antibody"),
            ("imatinib",     "BCR-ABL tyrosine kinase inhibitor"),
            ("norepinephrine","vasopressor / alpha-1 agonist"),
            ("vancomycin",   "glycopeptide antibiotic"),
        ]
        for name, mech in drugs:
            self.G.add_drug(name, mechanism=mech)

        # ── Proteins ──────────────────────────────────────────────
        proteins = ["amyloid-beta", "tau protein", "pd-1", "pd-l1",
                    "her2", "brca1 protein", "ampk", "c-reactive protein"]
        for p in proteins:
            self.G.add_protein(p)

        # ── Curated Gene → Disease edges ─────────────────────────
        gene_disease = [
            ("brca1", "breast cancer",          "ASSOCIATED_WITH", 0.99),
            ("brca2", "breast cancer",          "ASSOCIATED_WITH", 0.99),
            ("app",   "alzheimer's disease",    "CAUSES",          0.95),
            ("psen1", "alzheimer's disease",    "CAUSES",          0.95),
            ("apoe",  "alzheimer's disease",    "ASSOCIATED_WITH", 0.90),
            ("trem2", "alzheimer's disease",    "ASSOCIATED_WITH", 0.85),
            ("tp53",  "breast cancer",          "ASSOCIATED_WITH", 0.88),
            ("tp53",  "lung cancer",            "ASSOCIATED_WITH", 0.85),
            ("egfr",  "lung cancer",            "ASSOCIATED_WITH", 0.92),
            ("kras",  "lung cancer",            "ASSOCIATED_WITH", 0.80),
            ("her2",  "breast cancer",          "ASSOCIATED_WITH", 0.93),
            ("braf",  "lung cancer",            "ASSOCIATED_WITH", 0.75),
            ("il6",   "sepsis",                 "CAUSES",          0.80),
            ("tnf",   "sepsis",                 "CAUSES",          0.82),
            ("cd19",  "diffuse large b-cell lymphoma", "ASSOCIATED_WITH", 0.90),
            ("bcma",  "multiple myeloma",       "ASSOCIATED_WITH", 0.88),
        ]
        for gene, disease, rel, conf in gene_disease:
            if rel == "CAUSES":
                self.G.causes(gene, disease, confidence=conf, source="curated")
            else:
                self.G.associated_with(gene, disease, confidence=conf, source="curated")

        # ── Drug → Disease TREATS edges ───────────────────────────
        drug_disease = [
            ("lecanemab",    "alzheimer's disease",          0.85),
            ("aducanumab",   "alzheimer's disease",          0.78),
            ("donanemab",    "alzheimer's disease",          0.82),
            ("olaparib",     "breast cancer",                0.93),
            ("trastuzumab",  "breast cancer",                0.95),
            ("pembrolizumab","lung cancer",                  0.90),
            ("nivolumab",    "lung cancer",                  0.88),
            ("rituximab",    "diffuse large b-cell lymphoma",0.95),
            ("rituximab",    "mantle cell lymphoma",         0.90),
            ("metformin",    "type 2 diabetes",              0.98),
            ("norepinephrine","sepsis",                      0.90),
            ("vancomycin",   "sepsis",                       0.80),
            ("imatinib",     "lung cancer",                  0.72),
        ]
        for drug, disease, conf in drug_disease:
            self.G.treats(drug, disease, confidence=conf, source="curated")

        # ── Drug → Gene INHIBITS / TARGETED_BY edges ─────────────
        drug_gene = [
            ("olaparib",     "brca1", "INHIBITS",    0.95),
            ("olaparib",     "brca2", "INHIBITS",    0.95),
            ("trastuzumab",  "her2",  "INHIBITS",    0.97),
            ("pembrolizumab","tp53",  "TARGETED_BY", 0.70),
            ("imatinib",     "kras",  "INHIBITS",    0.80),
            ("lecanemab",    "app",   "INHIBITS",    0.85),
        ]
        for drug, gene, rel, conf in drug_gene:
            if rel == "INHIBITS":
                self.G.inhibits(drug, gene, confidence=conf, source="curated")
            else:
                self.G.targeted_by(gene, drug, confidence=conf, source="curated")

        # ── Protein biomarkers ────────────────────────────────────
        biomarkers = [
            ("amyloid-beta",      "alzheimer's disease", 0.95),
            ("tau protein",       "alzheimer's disease", 0.93),
            ("c-reactive protein","sepsis",              0.88),
            ("her2",              "breast cancer",       0.94),
        ]
        for protein, disease, conf in biomarkers:
            self.G.biomarker_for(protein, disease, confidence=conf, source="curated")

        print(f"  ✓ Curated facts added")
        return self


# ══════════════════════════════════════════════════════════════════
# DEMO — Run Step 5
# ══════════════════════════════════════════════════════════════════

def print_graph_stats(G: BioquoraGraph):
    s = G.stats()
    print("\n" + "═" * 70)
    print("  BIOQUORA KNOWLEDGE GRAPH — STATISTICS")
    print("═" * 70)
    print(f"  Total nodes : {s['total_nodes']}")
    print(f"  Total edges : {s['total_edges']}")
    print()
    node_counts = {k.replace("nodes_","").ljust(20): v
                   for k, v in s.items() if k.startswith("nodes_")}
    edge_counts = {k.replace("edges_","").ljust(22): v
                   for k, v in s.items() if k.startswith("edges_")}
    print("  NODE BREAKDOWN:")
    for t, n in sorted(node_counts.items(), key=lambda x: -x[1]):
        bar = "█" * min(n, 30)
        print(f"    {t} {bar} ({n})")
    print()
    print("  EDGE BREAKDOWN:")
    for t, n in sorted(edge_counts.items(), key=lambda x: -x[1]):
        bar = "█" * min(n, 30)
        print(f"    {t} {bar} ({n})")
    print("═" * 70)


def demo_queries(G: BioquoraGraph):
    print("\n" + "═" * 70)
    print("  KNOWLEDGE GRAPH QUERIES")
    print("═" * 70)

    # Q1: Drugs for Alzheimer's
    print("\n  Q1: Drugs that treat Alzheimer's disease?")
    drugs = G.get_drugs_for_disease("alzheimer's disease")
    for d in drugs:
        print(f"    {d['drug']:<20} conf={d['confidence']:.2f}  pmid={d['pmid']}")

    # Q2: Genes for breast cancer
    print("\n  Q2: Genes associated with breast cancer?")
    genes = G.get_genes_for_disease("breast cancer")
    for g in genes:
        print(f"    {g['gene']:<12} [{g['relation']}]  conf={g['confidence']:.2f}")

    # Q3: Drug targets
    print("\n  Q3: What does olaparib target?")
    targets = G.get_drug_targets("olaparib")
    for t in targets:
        print(f"    {t['target']:<15} [{t['type']}]  conf={t['confidence']:.2f}")

    # Q4: Multi-hop
    print("\n  Q4: GraphRAG multi-hop — Disease → Genes → Drugs:")
    for disease in ["breast cancer", "alzheimer's disease"]:
        result = G.multihop_query(disease)
        print(f"\n    Disease: {disease}")
        print(f"    Genes  : {[g['gene'] for g in result['genes'][:4]]}")
        print(f"    Drugs  : {[d['drug'] for d in result['drugs_via_gene'][:4]]}")

    # Q5: Papers mentioning a gene
    print("\n  Q5: Papers mentioning BRCA1?")
    papers = G.get_papers_mentioning("brca1")
    print(f"    PMIDs: {papers}")

    # Q6: Neo4j schema reference
    print("\n  Q6: Example Cypher queries for Neo4j:")
    for name, cypher in list(NEO4J_SCHEMA["example_queries"].items())[:2]:
        print(f"\n    [{name}]")
        print("    " + cypher.strip().replace("\n", "\n    "))


if __name__ == "__main__":
    import sys
    sys.path.insert(0, str(Path(__file__).parent.parent))
    from sample_data import SAMPLE_PAPERS

    print("\n  BIOQUORA PHASE 0 · STEP 5: KNOWLEDGE GRAPH ENGINEERING")
    print("  " + "─" * 55)

    # Load NLP results from Step 4
    nlp_path = NLP_DIR / "nlp_results.json"
    if nlp_path.exists():
        with open(nlp_path) as f:
            nlp_results = json.load(f)
        print(f"  ✓ Loaded NLP results ({len(nlp_results)} papers)")
    else:
        print("  ⚠ Run step4 first. Using empty NLP results.")
        nlp_results = []

    # Build the graph
    print("\n  Building Bioquora Knowledge Graph...")
    G = BioquoraGraph()
    builder = GraphBuilder(G)

    builder.add_curated_biomedical_facts()
    builder.ingest_nlp_results(nlp_results, SAMPLE_PAPERS)

    db_path = DATA_DIR / "clinical" / "mimic_demo.db"
    if db_path.exists():
        builder.ingest_clinical_data(db_path)

    # Stats
    print_graph_stats(G)

    # Queries
    demo_queries(G)

    # Neo4j connection (optional)
    print("\n  Neo4j Production Connection:")
    print("  ─────────────────────────────────────────────────────────")
    try:
        neo4j = Neo4jConnector()
        if neo4j.test_connection():
            neo4j.setup_schema()
            neo4j.ingest_graph(G)
            print("  ✓ Graph ingested into Neo4j")
        else:
            print("  → Start Neo4j at https://neo4j.com/download/ to enable")
    except Exception:
        print("  → Neo4j not running locally — using in-memory graph ✓")

    # Save everything
    print("\n  Saving graph outputs...")
    G.save()
    G.save_graphml()
    G.save_node_csv()
    G.save_edge_csv()

    print("\n  ✅ STEP 5 COMPLETE — Biomedical Knowledge Graph built.\n")
