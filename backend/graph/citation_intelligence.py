"""
bioquora/graph/citation_intelligence.py  — Step 6

Citation Intelligence Layer for Bioquora.

Provides:
  1. run_pagerank()            — compute PageRank on Paper→CITES graph via Neo4j GDS
  2. detect_landmark_papers()  — top papers by PageRank + in-degree
  3. find_competing_theories() — papers on same disease citing different genes
  4. build_citation_paths()    — how knowledge flows between papers
  5. research_evolution()      — papers per year per disease
  6. researcher_influence()    — h_index + network centrality

Requires: Neo4j GDS plugin (Graph Data Science Library)
  Neo4j Desktop: Plugins tab → Graph Data Science Library
  Headless: https://neo4j.com/docs/graph-data-science/current/installation/

Run standalone:
    python citation_intelligence.py

Or import into API:
    from citation_intelligence import CitationIntelligence
    ci = CitationIntelligence(graph)
    landmarks = ci.detect_landmark_papers(top_n=20)
"""

from typing import Optional
from db import BioquoraGraph


class CitationIntelligence:
    """
    All citation-graph analytics in one class.
    Wraps a BioquoraGraph instance.
    """

    def __init__(self, graph: BioquoraGraph):
        self.graph = graph

    # ── 1. PageRank ───────────────────────────────────────────

    def run_pagerank(
        self,
        graph_name:    str   = "citation_graph",
        damping:       float = 0.85,
        max_iterations: int  = 20,
        write_property: str  = "pagerank",
    ) -> dict:
        """
        Projects the Paper→CITES graph into GDS memory and runs PageRank.
        Writes pagerank score to each Paper node.

        Returns a summary dict: {nodes_written, iterations, convergence}.
        Silently drops and re-creates the named graph if it already exists.
        """
        # Drop if exists (idempotent)
        try:
            self.graph.run(
                "CALL gds.graph.drop($name, false) YIELD graphName",
                name=graph_name,
            )
        except Exception:
            pass   # graph didn't exist — fine

        # Check how many Paper nodes have CITES edges
        count = self.graph.run("MATCH ()-[r:CITES]->() RETURN count(r) AS c")
        if not count or count[0]["c"] == 0:
            return {"ok": False, "reason": "No CITES edges in graph. Run seed.py first."}

        # Project graph
        self.graph.run(
            """
            CALL gds.graph.project($name, 'Paper', 'CITES')
            YIELD graphName, nodeCount, relationshipCount
            """,
            name=graph_name,
        )

        # Run PageRank (write mode → stores score on node)
        result = self.graph.run(
            f"""
            CALL gds.pageRank.write($name, {{
                maxIterations:  $max_iter,
                dampingFactor:  $damping,
                writeProperty:  $write_prop
            }})
            YIELD nodePropertiesWritten, ranIterations, didConverge
            """,
            name=graph_name,
            max_iter=max_iterations,
            damping=damping,
            write_prop=write_property,
        )

        # Clean up projected graph
        try:
            self.graph.run("CALL gds.graph.drop($name) YIELD graphName", name=graph_name)
        except Exception:
            pass

        if result:
            r = result[0]
            return {
                "ok":            True,
                "nodes_written": r.get("nodePropertiesWritten", 0),
                "iterations":    r.get("ranIterations", 0),
                "converged":     r.get("didConverge", False),
            }
        return {"ok": False, "reason": "GDS PageRank returned no result"}

    # ── 2. Landmark paper detection ───────────────────────────

    def detect_landmark_papers(
        self,
        top_n:              int   = 20,
        min_pagerank:       float = 0.0,
        use_in_degree_fallback: bool = True,
    ) -> list[dict]:
        """
        Returns top papers ranked by PageRank score.
        Falls back to in-degree (citation count) if PageRank hasn't been run.

        A 'landmark' paper is one that is highly cited within our graph
        and can be assumed to represent a foundational or pivotal finding.
        """
        # Try PageRank first
        result = self.graph.run(
            """
            MATCH (p:Paper)
            WHERE p.pagerank IS NOT NULL AND p.pagerank >= $min_pr
            RETURN p.pmid AS pmid, p.title AS title, p.year AS year,
                   p.journal AS journal, p.pagerank AS pagerank
            ORDER BY pagerank DESC
            LIMIT $top_n
            """,
            min_pr=min_pagerank, top_n=top_n,
        )

        if result:
            # Enrich with in-degree
            for row in result:
                in_deg = self.graph.run(
                    "MATCH (p:Paper {pmid: $pmid})<-[:CITES]-(c) RETURN count(c) AS c",
                    pmid=row["pmid"],
                )
                row["in_degree"]   = in_deg[0]["c"] if in_deg else 0
                row["is_landmark"] = True
            return result

        # Fallback: rank by in-degree when GDS not installed
        if use_in_degree_fallback:
            return self.graph.run(
                """
                MATCH (p:Paper)<-[:CITES]-(citing:Paper)
                RETURN p.pmid AS pmid, p.title AS title, p.year AS year,
                       p.journal AS journal, count(citing) AS in_degree,
                       null AS pagerank, true AS is_landmark
                ORDER BY in_degree DESC
                LIMIT $top_n
                """,
                top_n=top_n,
            )

        return []

    # ── 3. Competing theories ─────────────────────────────────

    def find_competing_theories(
        self,
        disease_id: Optional[str] = None,
        min_papers: int = 2,
        limit: int = 20,
    ) -> list[dict]:
        """
        Identifies pairs of genes that have papers supporting their
        role in the same disease — a proxy for competing mechanistic theories.

        Each result is: disease, gene_A, gene_B, papers_for_A, papers_for_B,
        and a 'tension_score' (how many papers disagree on primary gene).
        """
        base_query = """
            MATCH (p1:Paper)-[:MENTIONS_DISEASE]->(d:Disease)
                  <-[:MENTIONS_DISEASE]-(p2:Paper)
            MATCH (p1)-[:MENTIONS_GENE]->(g1:Gene)
            MATCH (p2)-[:MENTIONS_GENE]->(g2:Gene)
            WHERE g1.id <> g2.id
              AND p1.pmid < p2.pmid
              {disease_filter}
            WITH d, g1, g2,
                 count(DISTINCT p1) AS papers_for_g1,
                 count(DISTINCT p2) AS papers_for_g2
            WHERE papers_for_g1 >= $min_papers AND papers_for_g2 >= $min_papers
            RETURN d.id AS disease_id, d.name AS disease,
                   g1.symbol AS gene_A, g2.symbol AS gene_B,
                   papers_for_g1, papers_for_g2,
                   (papers_for_g1 + papers_for_g2) AS tension_score
            ORDER BY tension_score DESC
            LIMIT $limit
        """

        if disease_id:
            query = base_query.format(disease_filter="AND d.id = $disease_id")
            return self.graph.run(query, disease_id=disease_id,
                                  min_papers=min_papers, limit=limit)
        else:
            query = base_query.format(disease_filter="")
            return self.graph.run(query, min_papers=min_papers, limit=limit)

    # ── 4. Citation paths ─────────────────────────────────────

    def find_citation_path(
        self,
        from_pmid: str,
        to_pmid:   str,
        max_depth: int = 5,
    ) -> list[dict]:
        """
        Finds how knowledge flowed from paper A to paper B via citations.
        Returns the shortest citation path(s).
        """
        results = self.graph.run(
            f"""
            MATCH path = shortestPath(
                (a:Paper {{pmid: $from_pmid}})-[:CITES*1..{max_depth}]->(b:Paper {{pmid: $to_pmid}})
            )
            RETURN
                [n IN nodes(path) | n.pmid]   AS pmids,
                [n IN nodes(path) | n.title]  AS titles,
                [n IN nodes(path) | n.year]   AS years,
                length(path)                  AS depth
            LIMIT 3
            """,
            from_pmid=from_pmid, to_pmid=to_pmid,
        )
        return results

    # ── 5. Research evolution ─────────────────────────────────

    def research_evolution(
        self,
        disease_id: Optional[str] = None,
        start_year: int = 2000,
    ) -> list[dict]:
        """
        Papers per year per disease — shows how research volume has changed.
        If disease_id is None, returns aggregate across all diseases.
        """
        if disease_id:
            return self.graph.run(
                """
                MATCH (p:Paper)-[:MENTIONS_DISEASE]->(d:Disease {id: $disease_id})
                WHERE p.year >= $start_year AND p.year IS NOT NULL
                RETURN p.year AS year, count(p) AS paper_count
                ORDER BY year
                """,
                disease_id=disease_id, start_year=start_year,
            )
        else:
            return self.graph.run(
                """
                MATCH (p:Paper)-[:MENTIONS_DISEASE]->(d:Disease)
                WHERE p.year >= $start_year AND p.year IS NOT NULL
                RETURN d.name AS disease, p.year AS year, count(p) AS paper_count
                ORDER BY d.name, year
                LIMIT 500
                """,
                start_year=start_year,
            )

    # ── 6. Researcher influence ───────────────────────────────

    def researcher_influence(
        self,
        top_n:      int = 20,
        disease_id: Optional[str] = None,
    ) -> list[dict]:
        """
        Ranks researchers by:
          - h_index (from Semantic Scholar)
          - papers in graph
          - diseases their papers cover
          - collaborator count

        Optionally filtered to researchers who published on a specific disease.
        """
        filter_clause = ""
        params: dict = {"top_n": top_n}

        if disease_id:
            filter_clause = "AND (p)-[:MENTIONS_DISEASE]->(:Disease {id: $disease_id})"
            params["disease_id"] = disease_id

        return self.graph.run(
            f"""
            MATCH (r:Researcher)<-[:AUTHORED_BY]-(p:Paper)
            WHERE 1=1 {filter_clause}
            WITH r,
                 count(DISTINCT p)                                              AS papers_in_graph,
                 count(DISTINCT (p)-[:MENTIONS_DISEASE]->(:Disease))            AS diseases_covered,
                 count(DISTINCT (:Researcher)<-[:AUTHORED_BY]-(p))              AS collaborator_count
            RETURN r.id AS id, r.name AS name, r.affiliation AS affiliation,
                   r.h_index AS h_index, r.paper_count AS total_papers,
                   papers_in_graph, diseases_covered, collaborator_count
            ORDER BY r.h_index DESC NULLS LAST, papers_in_graph DESC
            LIMIT $top_n
            """,
            **params,
        )

    # ── 7. Collaboration network ──────────────────────────────

    def collaboration_network(
        self,
        min_shared_papers: int = 2,
        limit: int = 50,
    ) -> list[dict]:
        """
        Returns researcher pairs who co-authored at least `min_shared_papers`
        papers together. Powers a force-directed collaboration graph.
        """
        return self.graph.run(
            """
            MATCH (r1:Researcher)<-[:AUTHORED_BY]-(p:Paper)-[:AUTHORED_BY]->(r2:Researcher)
            WHERE id(r1) < id(r2)
            WITH r1, r2, count(DISTINCT p) AS shared_papers
            WHERE shared_papers >= $min_shared
            RETURN r1.id AS researcher_a, r1.name AS name_a,
                   r2.id AS researcher_b, r2.name AS name_b,
                   shared_papers
            ORDER BY shared_papers DESC
            LIMIT $limit
            """,
            min_shared=min_shared_papers, limit=limit,
        )


# ── CLI runner ────────────────────────────────────────────────

def main():
    print("\n╔══════════════════════════════════════════════╗")
    print("║   Bioquora — Citation Intelligence Report    ║")
    print("╚══════════════════════════════════════════════╝\n")

    with BioquoraGraph() as graph:
        ci = CitationIntelligence(graph)

        # 1. PageRank
        print("── Running PageRank on citation graph ───────")
        pr_result = ci.run_pagerank()
        if pr_result["ok"]:
            print(f"  ✓ Wrote PageRank to {pr_result['nodes_written']} Paper nodes "
                  f"({pr_result['iterations']} iterations, converged={pr_result['converged']})")
        else:
            print(f"  ○ PageRank skipped — {pr_result['reason']}")
            print("    (Install Neo4j GDS plugin to enable)")

        # 2. Landmark papers
        print("\n── Landmark papers (top 10) ──────────────────")
        landmarks = ci.detect_landmark_papers(top_n=10)
        if landmarks:
            for p in landmarks:
                score = f"PR={p['pagerank']:.4f}" if p.get("pagerank") else f"in-degree={p.get('in_degree', 0)}"
                title = (p.get("title") or "Untitled")[:70]
                print(f"  [{p.get('year', '?')}] {title}  ({score})")
        else:
            print("  No citation data yet — run seed.py with Semantic Scholar enrichment")

        # 3. Research evolution (Parkinson)
        print("\n── Research evolution — Parkinson Disease ────")
        timeline = ci.research_evolution("MESH:D010300", start_year=2010)
        if timeline:
            for row in timeline:
                bar = "█" * min(row["paper_count"], 40)
                print(f"  {row['year']}: {bar} {row['paper_count']}")
        else:
            print("  No timeline data — seed PubMed papers first")

        # 4. Competing theories
        print("\n── Competing theories (top 5) ────────────────")
        theories = ci.find_competing_theories(limit=5)
        if theories:
            for t in theories:
                print(f"  {t['disease']}: {t['gene_A']} vs {t['gene_B']} "
                      f"(tension={t['tension_score']})")
        else:
            print("  No competing theory data — requires MENTIONS_GENE edges (Step 7)")

        # 5. Top researchers
        print("\n── Top researchers (by h_index) ──────────────")
        researchers = ci.researcher_influence(top_n=5)
        if researchers:
            for r in researchers:
                h = r.get("h_index") or "?"
                print(f"  {r['name']} (h={h}) — {r['papers_in_graph']} papers in graph")
        else:
            print("  No researcher data — seed PubMed + Semantic Scholar first")

        print()


if __name__ == "__main__":
    main()
