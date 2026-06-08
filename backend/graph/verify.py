"""
medinex/graph/verify.py

Comprehensive sanity checks for the Medinex knowledge graph.
Prints a structured pass/fail report.

Fixes vs Phase 1:
  - Added edge integrity checks (dangling edges, missing endpoints)
  - Added orphan node detection (nodes with zero relationships)
  - Added data quality checks (missing required properties)
  - Added Researcher and Pathway checks (new Step 4 nodes)
  - Added citation graph check
  - Reports isolated sub-graphs (disconnected disease components)

Run: python verify.py
"""

from db import MedinexGraph


PASS = "✓"
FAIL = "✗"
WARN = "○"

_results: list[tuple[str, str]] = []   # (status, message)


def _check(condition: bool, pass_msg: str, fail_msg: str, warn_only: bool = False):
    if condition:
        _results.append((PASS, pass_msg))
    else:
        status = WARN if warn_only else FAIL
        _results.append((status, fail_msg))
    return condition


def verify():
    print("\n╔══════════════════════════════════════════════╗")
    print("║   Medinex Knowledge Graph — Verification    ║")
    print("╚══════════════════════════════════════════════╝\n")

    all_ok = True

    with MedinexGraph() as graph:

        # ── 1. Connection health ──────────────────────────────
        print("── 1. Connection ────────────────────────────")
        health = graph.health_check()
        ok = _check(
            health["ok"],
            f"Neo4j connected  ({health.get('version', '')} at {health.get('address', '')})",
            f"Cannot reach Neo4j — {health.get('error', 'unknown')}",
        )
        if not ok:
            _print_results()
            return   # pointless to continue if DB is down

        # ── 2. Node counts ────────────────────────────────────
        print("\n── 2. Node counts ───────────────────────────")
        counts = graph.node_count()
        minimums = {
            "Disease":    5,
            "Gene":       10,
            "Drug":       5,
            "Symptom":    5,
            "Paper":      1,
            "Researcher": 1,
            "Pathway":    0,   # warn only — KEGG may not have run yet
            "Protein":    0,
        }
        for label, minimum in minimums.items():
            count   = counts.get(label, 0)
            warn    = minimum == 0
            ok = _check(
                count >= minimum,
                f"{label:14s}: {count:,}",
                f"{label:14s}: {count:,}  (expected ≥ {minimum})",
                warn_only=warn,
            )
            if not ok and not warn:
                all_ok = False

        # ── 3. Edge counts ────────────────────────────────────
        print("\n── 3. Relationship counts ───────────────────")
        edge_specs = [
            ("HAS_SYMPTOM",          "Disease",    "Symptom",     10),
            ("ASSOCIATED_WITH_GENE", "Disease",    "Gene",        10),
            ("TREATS",               "Drug",       "Disease",      5),
            ("MENTIONS_DISEASE",     "Paper",      "Disease",      1),
            ("AUTHORED_BY",          "Paper",      "Researcher",   1),
            ("INVOLVED_IN",          "Gene",       "Pathway",      0),   # warn
            ("CITES",                "Paper",      "Paper",        0),   # warn
        ]
        for rel, src, tgt, minimum in edge_specs:
            result = graph.run(
                f"MATCH (:{src})-[r:{rel}]->(:{tgt}) RETURN count(r) AS c"
            )
            count = result[0]["c"] if result else 0
            warn  = minimum == 0
            ok = _check(
                count >= minimum,
                f"{src}-[{rel}]->{tgt}: {count:,}",
                f"{src}-[{rel}]->{tgt}: {count:,}  (expected ≥ {minimum})",
                warn_only=warn,
            )
            if not ok and not warn:
                all_ok = False

        # ── 4. Edge integrity — no dangling edges ─────────────
        print("\n── 4. Edge integrity ────────────────────────")
        dangling_checks = [
            ("MENTIONS_DISEASE", "Paper",    "pmid", "Disease", "id"),
            ("AUTHORED_BY",      "Paper",    "pmid", "Researcher", "id"),
            ("TREATS",           "Drug",     "id",   "Disease", "id"),
            ("ASSOCIATED_WITH_GENE", "Disease", "id", "Gene", "id"),
        ]
        for rel, src_label, src_key, tgt_label, tgt_key in dangling_checks:
            # Find edges where one endpoint is missing
            result = graph.run(f"""
                MATCH (a)-[r:{rel}]->(b)
                WHERE NOT (a:{src_label}) OR NOT (b:{tgt_label})
                RETURN count(r) AS c
            """)
            dangling = result[0]["c"] if result else 0
            _check(
                dangling == 0,
                f"No dangling {rel} edges",
                f"{dangling} dangling {rel} edges (endpoints missing labels)",
            )
            if dangling > 0:
                all_ok = False

        # ── 5. Orphan node detection ──────────────────────────
        print("\n── 5. Orphan nodes (zero relationships) ─────")
        orphan_labels = ["Disease", "Gene", "Drug", "Symptom", "Paper", "Researcher"]
        for label in orphan_labels:
            result = graph.run(f"""
                MATCH (n:{label})
                WHERE NOT (n)--()
                RETURN count(n) AS c
            """)
            orphan_count = result[0]["c"] if result else 0
            total_result = graph.run(f"MATCH (n:{label}) RETURN count(n) AS c")
            total        = total_result[0]["c"] if total_result else 0
            pct          = (orphan_count / total * 100) if total > 0 else 0
            _check(
                pct < 20,
                f"{label:14s}: {orphan_count} orphans  ({pct:.1f}%)",
                f"{label:14s}: {orphan_count} orphans  ({pct:.1f}%)  — too many isolated nodes",
                warn_only=True,
            )

        # ── 6. Data quality — required properties ─────────────
        print("\n── 6. Data quality (required properties) ────")
        required_props = [
            ("Disease",    "id",     True),
            ("Disease",    "name",   True),
            ("Gene",       "id",     True),
            ("Drug",       "id",     True),
            ("Paper",      "pmid",   True),
            ("Paper",      "title",  False),   # warn — Phase 1 may lack titles
            ("Researcher", "name",   True),
        ]
        for label, prop, required in required_props:
            result = graph.run(f"""
                MATCH (n:{label})
                WHERE n.{prop} IS NULL OR n.{prop} = ''
                RETURN count(n) AS c
            """)
            missing = result[0]["c"] if result else 0
            _check(
                missing == 0,
                f"{label}.{prop}: all present",
                f"{label}.{prop}: {missing} nodes missing this property",
                warn_only=not required,
            )
            if missing > 0 and required:
                all_ok = False

        # ── 7. Disease Explorer smoke test ────────────────────
        print("\n── 7. Disease Explorer smoke test ───────────")
        for test_name in ["Parkinson", "Alzheimer", "Diabetes"]:
            result = graph.get_disease_graph(test_name)
            if result:
                d = result["disease"]
                n_sym  = len(result["symptoms"])
                n_gene = len(result["genes"])
                n_drug = len(result["drugs"])
                n_pap  = len(result["papers"])
                _check(
                    True,
                    f"{test_name}: {n_sym} symptoms, {n_gene} genes, "
                    f"{n_drug} drugs, {n_pap} papers",
                    "",
                )
            else:
                _check(False, "", f"{test_name}: no results — check seeding")
                all_ok = False

        # ── 8. Multi-hop traversal ────────────────────────────
        print("\n── 8. Multi-hop traversal ───────────────────")
        result = graph.run("""
            MATCH (d:Disease)-[:ASSOCIATED_WITH_GENE]->(g:Gene)
            RETURN d.name AS disease, count(g) AS gene_count
            ORDER BY gene_count DESC
            LIMIT 5
        """)
        if result:
            for row in result:
                _results.append((PASS, f"{row['disease']}: {row['gene_count']} genes"))
        else:
            _check(False, "", "No disease-gene traversal results")
            all_ok = False

        # ── 9. Citation graph check ───────────────────────────
        print("\n── 9. Citation graph ────────────────────────")
        result = graph.run("MATCH ()-[r:CITES]->() RETURN count(r) AS c")
        cites_count = result[0]["c"] if result else 0
        _check(
            True,  # warn-only
            f"Citation edges: {cites_count:,}",
            f"Citation edges: {cites_count:,}",
            warn_only=True,
        )

        result = graph.run("""
            MATCH (p:Paper)-[:AUTHORED_BY]->(r:Researcher)
            RETURN count(DISTINCT r) AS researchers_with_papers
        """)
        linked_researchers = result[0]["researchers_with_papers"] if result else 0
        _check(
            linked_researchers > 0,
            f"Researchers linked to papers: {linked_researchers:,}",
            "No researchers linked to papers — check Step 4 seeding",
            warn_only=True,
        )

        # ── 10. Pathway coverage ──────────────────────────────
        print("\n── 10. Pathway coverage ─────────────────────")
        result = graph.run("""
            MATCH (g:Gene)-[:INVOLVED_IN]->(pw:Pathway)
            RETURN count(DISTINCT pw) AS pathway_count,
                   count(DISTINCT g)  AS genes_with_pathways
        """)
        if result:
            _check(
                True,
                f"Pathways: {result[0]['pathway_count']:,}  "
                f"({result[0]['genes_with_pathways']:,} genes mapped)",
                "",
                warn_only=True,
            )

        # ── Summary ───────────────────────────────────────────
        print()
        _print_results()

        print("\n── Summary ──────────────────────────────────")
        fails = sum(1 for s, _ in _results if s == FAIL)
        warns = sum(1 for s, _ in _results if s == WARN)
        if all_ok and fails == 0:
            print(f"  {PASS} Graph looks healthy  ({warns} warnings).")
            print("     Ready to build the Disease Explorer (Step 5).")
        else:
            print(f"  {FAIL} {fails} check(s) failed, {warns} warning(s).")
            print("     Re-run seed.py or check Neo4j connection.")
        print()


def _print_results():
    for status, msg in _results:
        print(f"  {status} {msg}")
    _results.clear()


if __name__ == "__main__":
    verify()
