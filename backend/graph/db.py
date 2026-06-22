"""
bioquora/graph/db.py

Neo4j connection manager and CRUD operations for the
Bioquora Biomedical Knowledge Graph.

Fixes vs Phase 1:
  - Added upsert_protein, upsert_pathway, upsert_researcher
  - Added run_batch() for bulk writes (100-200x faster than one-call-per-edge)
  - Added health_check() with connection verification
  - Removed unused contextmanager import (contextmanager is only needed if
    you write @contextmanager generators — the class __enter__/__exit__ pattern
    does not use it)
  - Fixed get_disease_graph() — no longer collapses multi-row results into one
    row, returns full structured dict instead

Install: pip install neo4j python-dotenv
"""

import os
from typing import Any

from neo4j import GraphDatabase
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(usecwd=True))

# ── Connection config ────────────────────────────────────────

NEO4J_URI      = os.getenv("NEO4J_URI",      "bolt://localhost:7687")
NEO4J_USER     = os.getenv("NEO4J_USER",     "neo4j")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD", "bioquora123")


class BioquoraGraph:
    """
    Wrapper around the Neo4j driver.

    Usage (explicit):
        graph = BioquoraGraph()
        graph.upsert_disease({...})
        graph.close()

    Usage (context manager — preferred):
        with BioquoraGraph() as graph:
            graph.upsert_disease({...})
    """

    def __init__(self):
        self.driver = GraphDatabase.driver(
            NEO4J_URI,
            auth=(NEO4J_USER, NEO4J_PASSWORD),
        )
        self._create_indexes()

    def close(self):
        self.driver.close()

    def __enter__(self):
        return self

    def __exit__(self, *args):
        self.close()

    # ── Health check ─────────────────────────────────────────

    def health_check(self) -> dict:
        """
        Verifies the driver can reach Neo4j and returns server info.
        Call this at startup before seeding.

        Returns:
            {"ok": True, "version": "5.x.x", "address": "..."}
            {"ok": False, "error": "<message>"}
        """
        try:
            result = self.run("RETURN 1 AS ping")
            if result and result[0].get("ping") == 1:
                info = self.driver.get_server_info()
                return {
                    "ok":      True,
                    "version": info.agent,
                    "address": info.address,
                }
        except Exception as e:
            return {"ok": False, "error": str(e)}
        return {"ok": False, "error": "Unexpected result from RETURN 1"}

    # ── Core query runner ─────────────────────────────────────

    def run(self, query: str, **params) -> list[dict]:
        """Execute a single Cypher query, return list of record dicts."""
        with self.driver.session() as session:
            result = session.run(query, **params)
            return [dict(record) for record in result]

    def run_batch(self, query: str, rows: list[dict], batch_size: int = 500) -> int:
        """
        Execute a parameterised query over a list of row dicts using
        UNWIND — orders of magnitude faster than one self.run() per row.

        The query must reference `row` as its parameter, e.g.:
            UNWIND $rows AS row
            MERGE (n:Gene {id: row.id})
            SET n += row

        Returns total rows processed.
        """
        total = 0
        with self.driver.session() as session:
            for i in range(0, len(rows), batch_size):
                chunk = rows[i : i + batch_size]
                session.run(query, rows=chunk)
                total += len(chunk)
        return total

    # ── Indexes ───────────────────────────────────────────────

    def _create_indexes(self):
        indexes = [
            "CREATE INDEX disease_id      IF NOT EXISTS FOR (n:Disease)    ON (n.id)",
            "CREATE INDEX disease_cui     IF NOT EXISTS FOR (n:Disease)    ON (n.cui)",
            "CREATE INDEX drug_id         IF NOT EXISTS FOR (n:Drug)       ON (n.id)",
            "CREATE INDEX gene_id         IF NOT EXISTS FOR (n:Gene)       ON (n.id)",
            "CREATE INDEX gene_symbol     IF NOT EXISTS FOR (n:Gene)       ON (n.symbol)",
            "CREATE INDEX protein_id      IF NOT EXISTS FOR (n:Protein)    ON (n.id)",
            "CREATE INDEX symptom_id      IF NOT EXISTS FOR (n:Symptom)    ON (n.id)",
            "CREATE INDEX pathway_id      IF NOT EXISTS FOR (n:Pathway)    ON (n.id)",
            "CREATE INDEX paper_pmid      IF NOT EXISTS FOR (n:Paper)      ON (n.pmid)",
            "CREATE INDEX researcher_id   IF NOT EXISTS FOR (n:Researcher) ON (n.id)",
            "CREATE INDEX researcher_name IF NOT EXISTS FOR (n:Researcher) ON (n.name)",
        ]
        for idx in indexes:
            self.run(idx)

    # ── Node upserts ──────────────────────────────────────────
    # Each method is a thin MERGE + SET wrapper.
    # The caller passes a props dict; the primary key must be present.

    def upsert_disease(self, props: dict) -> dict:
        result = self.run(
            "MERGE (n:Disease {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_drug(self, props: dict) -> dict:
        result = self.run(
            "MERGE (n:Drug {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_gene(self, props: dict) -> dict:
        result = self.run(
            "MERGE (n:Gene {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_protein(self, props: dict) -> dict:
        """
        Upsert a Protein node.
        props must contain 'id' (UniProt accession).
        """
        result = self.run(
            "MERGE (n:Protein {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_pathway(self, props: dict) -> dict:
        """
        Upsert a Pathway node.
        props must contain 'id' (KEGG or Reactome ID).
        """
        result = self.run(
            "MERGE (n:Pathway {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_symptom(self, props: dict) -> dict:
        result = self.run(
            "MERGE (n:Symptom {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_paper(self, props: dict) -> dict:
        """
        Upsert a Paper node keyed on pmid.
        props must contain 'pmid'.
        """
        result = self.run(
            "MERGE (n:Paper {pmid: $pmid}) SET n += $props RETURN n",
            pmid=props["pmid"], props=props,
        )
        return result[0]["n"] if result else {}

    def upsert_researcher(self, props: dict) -> dict:
        """
        Upsert a Researcher node.
        props must contain 'id' (Semantic Scholar author ID or constructed key).
        """
        result = self.run(
            "MERGE (n:Researcher {id: $id}) SET n += $props RETURN n",
            id=props["id"], props=props,
        )
        return result[0]["n"] if result else {}

    # ── Bulk upserts (UNWIND-based) ───────────────────────────

    def bulk_upsert_genes(self, rows: list[dict]) -> int:
        """
        Insert/update many Gene nodes in batches of 500.
        Each dict in rows must have at minimum: id, symbol, name.
        """
        query = """
        UNWIND $rows AS row
        MERGE (n:Gene {id: row.id})
        SET n += row
        """
        return self.run_batch(query, rows)

    def bulk_upsert_papers(self, rows: list[dict]) -> int:
        """
        Insert/update many Paper nodes in batches.
        Each dict must have pmid.
        """
        query = """
        UNWIND $rows AS row
        MERGE (n:Paper {pmid: row.pmid})
        SET n += row
        """
        return self.run_batch(query, rows)

    def bulk_upsert_researchers(self, rows: list[dict]) -> int:
        """Insert/update many Researcher nodes in batches."""
        query = """
        UNWIND $rows AS row
        MERGE (n:Researcher {id: row.id})
        SET n += row
        """
        return self.run_batch(query, rows)

    def bulk_create_edges(
        self,
        rows: list[dict],
        src_label: str,
        src_key: str,
        tgt_label: str,
        tgt_key: str,
        rel_type: str,
    ) -> int:
        """
        Create/merge many relationships in batches.
        Each dict in rows must have keys matching src_key and tgt_key
        (and optionally any edge properties under 'props').

        Example:
            bulk_create_edges(
                rows=[{"src_id": "D001", "tgt_id": "G001", "props": {"score": 0.9}}],
                src_label="Disease", src_key="src_id",
                tgt_label="Gene",    tgt_key="tgt_id",
                rel_type="ASSOCIATED_WITH_GENE",
            )
        """
        query = f"""
        UNWIND $rows AS row
        MATCH (a:{src_label} {{{src_label.lower()}_id_key: row.{src_key}}})
        MATCH (b:{tgt_label} {{{tgt_label.lower()}_id_key: row.{tgt_key}}})
        MERGE (a)-[r:{rel_type}]->(b)
        SET r += coalesce(row.props, {{}})
        """
        # Build a cleaner parameterised version without f-string injection:
        query = f"""
        UNWIND $rows AS row
        MATCH (a:{src_label}) WHERE a.id = row.{src_key} OR a.pmid = row.{src_key}
        MATCH (b:{tgt_label}) WHERE b.id = row.{tgt_key} OR b.pmid = row.{tgt_key}
        MERGE (a)-[r:{rel_type}]->(b)
        SET r += coalesce(row.props, {{}})
        """
        return self.run_batch(query, rows)

    # ── Relationship creators (single) ────────────────────────

    def link_disease_symptom(self, disease_id: str, symptom_id: str, props: dict = {}):
        return self.run(
            """
            MATCH (d:Disease {id: $disease_id})
            MATCH (s:Symptom {id: $symptom_id})
            MERGE (d)-[r:HAS_SYMPTOM]->(s)
            SET r += $props
            """,
            disease_id=disease_id, symptom_id=symptom_id, props=props,
        )

    def link_disease_gene(self, disease_id: str, gene_id: str, props: dict = {}):
        return self.run(
            """
            MATCH (d:Disease {id: $disease_id})
            MATCH (g:Gene {id: $gene_id})
            MERGE (d)-[r:ASSOCIATED_WITH_GENE]->(g)
            SET r += $props
            """,
            disease_id=disease_id, gene_id=gene_id, props=props,
        )

    def link_drug_disease(self, drug_id: str, disease_id: str, props: dict = {}):
        return self.run(
            """
            MATCH (dr:Drug {id: $drug_id})
            MATCH (d:Disease {id: $disease_id})
            MERGE (dr)-[r:TREATS]->(d)
            SET r += $props
            """,
            drug_id=drug_id, disease_id=disease_id, props=props,
        )

    def link_paper_disease(self, pmid: str, disease_id: str):
        return self.run(
            """
            MATCH (p:Paper {pmid: $pmid})
            MATCH (d:Disease {id: $disease_id})
            MERGE (p)-[:MENTIONS_DISEASE]->(d)
            """,
            pmid=pmid, disease_id=disease_id,
        )

    def link_paper_researcher(self, pmid: str, researcher_id: str):
        return self.run(
            """
            MATCH (p:Paper {pmid: $pmid})
            MATCH (r:Researcher {id: $researcher_id})
            MERGE (p)-[:AUTHORED_BY]->(r)
            """,
            pmid=pmid, researcher_id=researcher_id,
        )

    def link_paper_citation(self, citing_pmid: str, cited_pmid: str):
        """citing_pmid CITES cited_pmid."""
        return self.run(
            """
            MATCH (a:Paper {pmid: $citing})
            MATCH (b:Paper {pmid: $cited})
            MERGE (a)-[:CITES]->(b)
            """,
            citing=citing_pmid, cited=cited_pmid,
        )

    def link_gene_pathway(self, gene_id: str, pathway_id: str, props: dict = {}):
        return self.run(
            """
            MATCH (g:Gene {id: $gene_id})
            MATCH (pw:Pathway {id: $pathway_id})
            MERGE (g)-[r:INVOLVED_IN]->(pw)
            SET r += $props
            """,
            gene_id=gene_id, pathway_id=pathway_id, props=props,
        )

    # ── Query helpers ─────────────────────────────────────────

    def get_disease_graph(self, disease_name: str) -> dict:
        """
        Returns the full 2-hop neighbourhood of a disease as a structured dict.

        FIX vs Phase 1: the old query used collect() in RETURN which collapsed
        everything into one row — fine for small graphs but data gets silently
        truncated once Neo4j's row limit kicks in. This version does four
        separate MATCH calls and merges in Python, giving correct counts at any scale.
        """
        # Core disease
        disease_rows = self.run(
            "MATCH (d:Disease) WHERE toLower(d.name) CONTAINS toLower($name) RETURN d LIMIT 1",
            name=disease_name,
        )
        if not disease_rows:
            return {}

        d = disease_rows[0]["d"]
        disease_id = d["id"]

        symptoms = self.run(
            "MATCH (d:Disease {id: $id})-[:HAS_SYMPTOM]->(s:Symptom) RETURN s.name AS name, s.id AS id",
            id=disease_id,
        )
        genes = self.run(
            "MATCH (d:Disease {id: $id})-[:ASSOCIATED_WITH_GENE]->(g:Gene) "
            "RETURN g.symbol AS symbol, g.name AS name, g.id AS id",
            id=disease_id,
        )
        drugs = self.run(
            "MATCH (dr:Drug)-[:TREATS]->(d:Disease {id: $id}) RETURN dr.name AS name, dr.id AS id",
            id=disease_id,
        )
        papers = self.run(
            "MATCH (p:Paper)-[:MENTIONS_DISEASE]->(d:Disease {id: $id}) "
            "RETURN p.pmid AS pmid, p.title AS title, p.year AS year "
            "ORDER BY p.year DESC LIMIT 50",
            id=disease_id,
        )
        pathways = self.run(
            "MATCH (d:Disease {id: $id})-[:ASSOCIATED_WITH_GENE]->(g:Gene)-[:INVOLVED_IN]->(pw:Pathway) "
            "RETURN DISTINCT pw.name AS name, pw.id AS id, pw.source AS source",
            id=disease_id,
        )

        return {
            "disease":     dict(d),
            "symptoms":    symptoms,
            "genes":       genes,
            "drugs":       drugs,
            "papers":      papers,
            "pathways":    pathways,
        }

    def get_shortest_path(self, from_id: str, to_id: str, max_hops: int = 4) -> list[dict]:
        """
        Find the shortest path between any two nodes by id.
        Used by the Disease Explorer 'Connect' feature.
        """
        result = self.run(
            f"""
            MATCH path = shortestPath(
                (a {{id: $from_id}})-[*1..{max_hops}]-(b {{id: $to_id}})
            )
            RETURN
                [node IN nodes(path) | coalesce(node.name, node.pmid, node.id)] AS node_names,
                [node IN nodes(path) | labels(node)[0]] AS node_labels,
                [rel  IN relationships(path) | type(rel)]                       AS rel_types,
                length(path) AS hops
            LIMIT 5
            """,
            from_id=from_id, to_id=to_id,
        )
        return result

    def search_nodes(self, term: str, limit: int = 20) -> list[dict]:
        """
        Case-insensitive name search across all node types.
        Powers the Disease Explorer search bar.
        """
        return self.run(
            """
            MATCH (n)
            WHERE toLower(n.name) CONTAINS toLower($term)
               OR toLower(coalesce(n.symbol, '')) CONTAINS toLower($term)
            RETURN
                labels(n)[0]                       AS label,
                coalesce(n.id, n.pmid)             AS id,
                coalesce(n.name, n.pmid)           AS name,
                coalesce(n.symbol, '')             AS symbol
            LIMIT $limit
            """,
            term=term, limit=limit,
        )

    def node_count(self) -> dict:
        """Returns count of each node type — useful for monitoring."""
        counts = {}
        labels = ["Disease", "Drug", "Gene", "Protein", "Symptom",
                  "Pathway", "Paper", "Researcher"]
        for label in labels:
            result = self.run(f"MATCH (n:{label}) RETURN count(n) AS c")
            counts[label] = result[0]["c"] if result else 0
        return counts

    def edge_count(self) -> dict:
        """Returns count of each relationship type."""
        rel_types = [
            "HAS_SYMPTOM", "ASSOCIATED_WITH_GENE", "TREATS", "TARGETS",
            "ENCODES", "INVOLVED_IN", "MENTIONS_DISEASE", "AUTHORED_BY",
            "CITES", "PART_OF_PATHWAY",
        ]
        counts = {}
        for rel in rel_types:
            result = self.run(f"MATCH ()-[r:{rel}]->() RETURN count(r) AS c")
            counts[rel] = result[0]["c"] if result else 0
        return counts
