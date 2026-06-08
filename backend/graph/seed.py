"""
medinex/graph/seed.py  — Phase 1 Steps 3 + 4

Seeds the Medinex Biomedical Knowledge Graph from:
  1. Starter diseases       (clean hand-crafted core nodes — deduped)
  2. Hetionet TSV edges     (disease-gene, disease-symptom, drug-disease)
                            FIX: uses correct TSV column names (source, target)
  3. OpenTargets GraphQL    (disease-gene associations with evidence scores)
  4. PubMed E-utilities     (full Paper metadata: title, abstract, year, authors)
                            FIX: Phase 1 only stored PMIDs
  5. Semantic Scholar API   (Researcher nodes + author → paper edges)
                            NEW in Step 4
  6. KEGG Pathway API       (Gene → Pathway edges)
                            NEW in Step 4

All writes use MERGE (idempotent — safe to re-run).
Hetionet bulk edges use UNWIND batches (100-200× faster than per-row Cypher calls).

Run:
    pip install neo4j requests pandas python-dotenv
    python seed.py
"""

import json
import re
import time
import xml.etree.ElementTree as ET
from typing import Optional

import requests
import pandas as pd

from db import MedinexGraph

# ── Config ───────────────────────────────────────────────────

PUBMED_API_BASE  = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
PUBMED_EMAIL     = "your@email.com"   # Required by NCBI — change this

SEMANTIC_SCHOLAR = "https://api.semanticscholar.org/graph/v1"
OPENTARGETS_API  = "https://api.platform.opentargets.org/api/v4/graphql"
KEGG_API         = "https://rest.kegg.jp"

HETIONET_TSV_BASE = (
    "https://github.com/hetio/hetionet/raw/main/hetnet/tsv/"
)

# ── Utility ──────────────────────────────────────────────────

def log(msg: str):
    print(f"[SEED] {msg}")


def _get_with_retry(url: str, params: dict = None, json_body: dict = None,
                    retries: int = 3, backoff: float = 2.0,
                    timeout: int = 30) -> Optional[requests.Response]:
    """
    GET or POST with exponential-backoff retry on network/5xx errors.
    Returns None if all retries exhausted.
    """
    for attempt in range(retries):
        try:
            if json_body:
                resp = requests.post(url, json=json_body, timeout=timeout)
            else:
                resp = requests.get(url, params=params, timeout=timeout)

            if resp.status_code == 429:
                wait = backoff * (2 ** attempt)
                log(f"  Rate-limited — sleeping {wait:.0f}s")
                time.sleep(wait)
                continue
            if resp.status_code >= 500:
                wait = backoff * (2 ** attempt)
                log(f"  Server error {resp.status_code} — retry in {wait:.0f}s")
                time.sleep(wait)
                continue

            return resp

        except requests.exceptions.RequestException as e:
            wait = backoff * (2 ** attempt)
            log(f"  Network error ({e}) — retry in {wait:.0f}s")
            time.sleep(wait)

    log(f"  FAILED after {retries} retries: {url}")
    return None


# ── Source 1: Starter diseases (deduped) ─────────────────────

def seed_starter_diseases(graph: MedinexGraph):
    """
    Hand-crafted seed — 10 unique high-priority diseases.
    FIX: removed duplicate Hypertension entry (was listed twice in Phase 1).
    """
    log("=== Seeding starter diseases ===")

    diseases = [
        {"id": "MESH:D010300", "name": "Parkinson Disease",    "cui": "C0030567", "category": "Neurological"},
        {"id": "MESH:D000544", "name": "Alzheimer Disease",    "cui": "C0002395", "category": "Neurological"},
        {"id": "MESH:D009765", "name": "Obesity",              "cui": "C0028754", "category": "Metabolic"},
        {"id": "MESH:D003920", "name": "Diabetes Mellitus",    "cui": "C0011849", "category": "Metabolic"},
        {"id": "MESH:D006984", "name": "Hypertension",         "cui": "C0020538", "category": "Cardiovascular"},
        {"id": "MESH:D009369", "name": "Neoplasms",            "cui": "C0006826", "category": "Oncology"},
        {"id": "MESH:D001249", "name": "Asthma",               "cui": "C0004096", "category": "Respiratory"},
        {"id": "MESH:D001172", "name": "Arthritis Rheumatoid", "cui": "C0003873", "category": "Autoimmune"},
        {"id": "MESH:D012559", "name": "Schizophrenia",        "cui": "C0036341", "category": "Psychiatric"},
        {"id": "MESH:D003093", "name": "Colitis Ulcerative",   "cui": "C0009324", "category": "Gastrointestinal"},
    ]

    for d in diseases:
        graph.upsert_disease(d)
        log(f"  Upserted: {d['name']}")

    log(f"Starter diseases seeded: {len(diseases)} nodes")


# ── Source 2: Hetionet TSV edges ──────────────────────────────

def seed_from_hetionet_tsv(graph: MedinexGraph):
    """
    Downloads Hetionet edge TSV files and bulk-ingests them.

    FIX vs Phase 1:
      - Column names are 'source' and 'target' in the actual TSV files,
        NOT 'source_name' / 'target_name' as Phase 1 assumed.
        The TSV schema is: source, metaedge, target
        where source/target are formatted as "NodeType::NodeId::NodeName"
      - Uses run_batch() / UNWIND for bulk writes instead of one Cypher call
        per edge (was extremely slow for 12,000+ edges).
    """
    log("=== Seeding from Hetionet TSV edges ===")

    edge_files = [
        {
            "file":       "hetionet-v1.0-edges-DaG-disease_associates_gene.tsv",
            "src_label":  "Disease",
            "tgt_label":  "Gene",
            "rel_type":   "ASSOCIATED_WITH_GENE",
        },
        {
            "file":       "hetionet-v1.0-edges-DpS-disease_presents_symptom.tsv",
            "src_label":  "Disease",
            "tgt_label":  "Symptom",
            "rel_type":   "HAS_SYMPTOM",
        },
        {
            "file":       "hetionet-v1.0-edges-CtD-compound_treats_disease.tsv",
            "src_label":  "Drug",
            "tgt_label":  "Disease",
            "rel_type":   "TREATS",
        },
    ]

    for spec in edge_files:
        url = HETIONET_TSV_BASE + spec["file"]
        log(f"  Downloading: {spec['file']}")

        resp = _get_with_retry(url, timeout=60)
        if resp is None or resp.status_code != 200:
            log(f"  Skipping {spec['file']} (HTTP {resp.status_code if resp else 'None'})")
            continue

        # Parse: columns are 'source' and 'target'
        # Each value is formatted: "NodeKind::identifier::Human Name"
        try:
            from io import StringIO
            df = pd.read_csv(StringIO(resp.text), sep="\t")
        except Exception as e:
            log(f"  ERROR parsing TSV: {e}")
            continue

        log(f"  {len(df):,} edges — bulk-ingesting {spec['src_label']} -> {spec['tgt_label']}")

        src_rows = []
        tgt_rows = []
        edge_rows = []

        src_seen = set()
        tgt_seen = set()

        for _, row in df.iterrows():
            # Hetionet format: "Disease::DOID:14330::Parkinson's disease"
            src_parts = str(row["source"]).split("::", 2)
            tgt_parts = str(row["target"]).split("::", 2)

            src_id   = src_parts[1] if len(src_parts) > 1 else src_parts[0]
            src_name = src_parts[2] if len(src_parts) > 2 else src_id
            tgt_id   = tgt_parts[1] if len(tgt_parts) > 1 else tgt_parts[0]
            tgt_name = tgt_parts[2] if len(tgt_parts) > 2 else tgt_id

            if src_id not in src_seen:
                src_rows.append({"id": src_id, "name": src_name, "source": "hetionet"})
                src_seen.add(src_id)
            if tgt_id not in tgt_seen:
                tgt_rows.append({"id": tgt_id, "name": tgt_name, "source": "hetionet"})
                tgt_seen.add(tgt_id)

            edge_rows.append({
                "src_id": src_id,
                "tgt_id": tgt_id,
                "props":  {"source": "hetionet"},
            })

        # Bulk upsert nodes
        src_label = spec["src_label"]
        tgt_label = spec["tgt_label"]
        rel_type  = spec["rel_type"]

        graph.run_batch(
            f"UNWIND $rows AS row MERGE (n:{src_label} {{id: row.id}}) SET n += row",
            src_rows,
        )
        graph.run_batch(
            f"UNWIND $rows AS row MERGE (n:{tgt_label} {{id: row.id}}) SET n += row",
            tgt_rows,
        )

        # Bulk create edges
        graph.run_batch(
            f"""
            UNWIND $rows AS row
            MATCH (a:{src_label} {{id: row.src_id}})
            MATCH (b:{tgt_label} {{id: row.tgt_id}})
            MERGE (a)-[r:{rel_type}]->(b)
            SET r += row.props
            """,
            edge_rows,
        )

        log(f"  Done: {len(src_rows)} {src_label}, {len(tgt_rows)} {tgt_label}, "
            f"{len(edge_rows)} {rel_type} edges")

    log("Hetionet ingestion complete.")


# ── Source 3: OpenTargets ─────────────────────────────────────

def seed_from_opentargets(graph: MedinexGraph, limit: int = 500):
    """
    Fetches disease-gene associations via OpenTargets GraphQL.
    Retry-safe, rate-limited.
    """
    log("=== Seeding from OpenTargets API ===")

    diseases = [
        {"efo": "EFO_0000270", "name": "asthma"},
        {"efo": "EFO_0000305", "name": "breast carcinoma"},
        {"efo": "EFO_0000400", "name": "diabetes mellitus"},
        {"efo": "EFO_0000692", "name": "schizophrenia"},
        {"efo": "EFO_0001359", "name": "type 1 diabetes"},
        {"efo": "EFO_0002508", "name": "Parkinson disease"},
        {"efo": "EFO_0000275", "name": "Alzheimer disease"},
        {"efo": "EFO_0000384", "name": "Crohn disease"},
    ]

    gql = """
    query DiseaseAssociations($efoId: String!, $size: Int!) {
      disease(efoId: $efoId) {
        id
        name
        associatedTargets(page: { index: 0, size: $size }) {
          rows {
            target { id approvedSymbol approvedName }
            score
          }
        }
      }
    }
    """

    for di in diseases:
        efo_id = di["efo"].replace("EFO_", "EFO:")
        log(f"  Fetching associations for: {di['name']}")

        resp = _get_with_retry(
            OPENTARGETS_API,
            json_body={"query": gql, "variables": {"efoId": efo_id, "size": limit}},
        )
        if resp is None:
            continue

        data = resp.json()
        if "errors" in data or not data.get("data", {}).get("disease"):
            log(f"  No data for {di['name']}")
            continue

        d_data = data["data"]["disease"]
        graph.upsert_disease({"id": d_data["id"], "name": d_data["name"], "source": "opentargets"})

        rows = d_data.get("associatedTargets", {}).get("rows", [])
        gene_rows  = []
        edge_rows  = []

        for row in rows:
            t = row["target"]
            gene_rows.append({
                "id": t["id"], "symbol": t["approvedSymbol"],
                "name": t["approvedName"], "source": "opentargets",
            })
            edge_rows.append({
                "src_id": d_data["id"],
                "tgt_id": t["id"],
                "props":  {"score": row["score"], "source": "opentargets"},
            })

        graph.run_batch(
            "UNWIND $rows AS row MERGE (n:Gene {id: row.id}) SET n += row",
            gene_rows,
        )
        graph.run_batch(
            """
            UNWIND $rows AS row
            MATCH (d:Disease {id: row.src_id})
            MATCH (g:Gene    {id: row.tgt_id})
            MERGE (d)-[r:ASSOCIATED_WITH_GENE]->(g)
            SET r += row.props
            """,
            edge_rows,
        )
        log(f"  {d_data['name']}: {len(rows)} gene associations ingested")
        time.sleep(0.5)

    log("OpenTargets ingestion complete.")


# ── Source 4: PubMed — full metadata ─────────────────────────

def seed_papers_from_pubmed(graph: MedinexGraph, max_per_disease: int = 20):
    """
    Fetches PubMed papers with FULL metadata:
      title, abstract, year, journal, doi, authors (as Researcher nodes)

    FIX vs Phase 1: Phase 1 only stored pmids. This version parses the
    PubMed XML response to extract the complete article record.

    Also creates Researcher nodes and AUTHORED_BY edges.
    """
    log("=== Seeding papers from PubMed (full metadata) ===")

    diseases = graph.run("MATCH (d:Disease) RETURN d.id AS id, d.name AS name LIMIT 50")

    all_papers     = []
    all_researchers = {}   # id → props dict (deduped by constructed key)
    paper_disease_edges   = []
    paper_researcher_edges = []

    for disease in diseases:
        d_id   = disease["id"]
        d_name = disease["name"]
        if not d_name:
            continue

        # ── Step 1: esearch ──────────────────────────────────
        resp = _get_with_retry(
            f"{PUBMED_API_BASE}/esearch.fcgi",
            params={
                "db":      "pubmed",
                "term":    f'"{d_name}"[MeSH Terms]',
                "retmax":  max_per_disease,
                "sort":    "relevance",
                "retmode": "json",
                "email":   PUBMED_EMAIL,
            },
        )
        if resp is None:
            continue

        pmids = resp.json().get("esearchresult", {}).get("idlist", [])
        if not pmids:
            log(f"  No papers found for {d_name}")
            continue

        # ── Step 2: efetch XML for full metadata ─────────────
        fetch_resp = _get_with_retry(
            f"{PUBMED_API_BASE}/efetch.fcgi",
            params={
                "db":      "pubmed",
                "id":      ",".join(pmids),
                "retmode": "xml",
                "rettype": "abstract",
                "email":   PUBMED_EMAIL,
            },
        )

        if fetch_resp is not None:
            papers, researchers, p_r_edges = _parse_pubmed_xml(fetch_resp.text, d_id)
            all_papers.extend(papers)
            all_researchers.update({r["id"]: r for r in researchers})
            paper_researcher_edges.extend(p_r_edges)
            paper_disease_edges.extend(
                {"pmid": p["pmid"], "disease_id": d_id} for p in papers
            )
            log(f"  {d_name}: {len(papers)} papers, {len(researchers)} researchers")
        else:
            # Fallback: minimal paper nodes from PMIDs only
            for pmid in pmids:
                all_papers.append({"pmid": pmid, "source": "pubmed"})
                paper_disease_edges.append({"pmid": pmid, "disease_id": d_id})
            log(f"  {d_name}: {len(pmids)} papers (metadata unavailable)")

        time.sleep(0.4)  # NCBI rate limit: 3 req/sec without API key

    # ── Bulk write papers ────────────────────────────────────
    if all_papers:
        n = graph.run_batch(
            "UNWIND $rows AS row MERGE (n:Paper {pmid: row.pmid}) SET n += row",
            all_papers,
        )
        log(f"  Bulk-wrote {n} paper nodes")

    # ── Bulk write researchers ────────────────────────────────
    researcher_list = list(all_researchers.values())
    if researcher_list:
        n = graph.run_batch(
            "UNWIND $rows AS row MERGE (n:Researcher {id: row.id}) SET n += row",
            researcher_list,
        )
        log(f"  Bulk-wrote {n} researcher nodes")

    # ── Bulk create paper → disease edges ────────────────────
    if paper_disease_edges:
        graph.run_batch(
            """
            UNWIND $rows AS row
            MATCH (p:Paper   {pmid: row.pmid})
            MATCH (d:Disease {id:   row.disease_id})
            MERGE (p)-[:MENTIONS_DISEASE]->(d)
            """,
            paper_disease_edges,
        )

    # ── Bulk create paper → researcher edges ─────────────────
    if paper_researcher_edges:
        graph.run_batch(
            """
            UNWIND $rows AS row
            MATCH (p:Paper      {pmid: row.pmid})
            MATCH (r:Researcher {id:   row.researcher_id})
            MERGE (p)-[:AUTHORED_BY]->(r)
            """,
            paper_researcher_edges,
        )

    log("PubMed ingestion complete.")


def _parse_pubmed_xml(xml_text: str, disease_id: str):
    """
    Parse PubMed efetch XML response.
    Returns (papers, researchers, paper_researcher_edges).
    """
    papers      = []
    researchers = []
    p_r_edges   = []

    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return papers, researchers, p_r_edges

    for article in root.findall(".//PubmedArticle"):
        try:
            # PMID
            pmid_el = article.find(".//PMID")
            if pmid_el is None:
                continue
            pmid = pmid_el.text.strip()

            # Title
            title_el = article.find(".//ArticleTitle")
            title = title_el.text if title_el is not None else ""
            # Strip XML tags that sometimes appear in titles
            title = re.sub(r"<[^>]+>", "", title or "").strip()

            # Abstract
            abstract_parts = article.findall(".//AbstractText")
            abstract = " ".join(
                (el.get("Label", "") + ": " + (el.text or "") if el.get("Label") else (el.text or ""))
                for el in abstract_parts
            ).strip()

            # Year
            year = None
            year_el = article.find(".//PubDate/Year")
            if year_el is not None:
                try:
                    year = int(year_el.text)
                except (ValueError, TypeError):
                    pass

            # Journal
            journal_el = article.find(".//Journal/Title")
            journal = journal_el.text if journal_el is not None else ""

            # DOI
            doi = ""
            for id_el in article.findall(".//ArticleId"):
                if id_el.get("IdType") == "doi":
                    doi = id_el.text or ""

            # MeSH terms
            mesh_terms = [
                el.text for el in article.findall(".//MeshHeading/DescriptorName")
                if el.text
            ]

            paper = {
                "pmid":       pmid,
                "title":      title,
                "abstract":   abstract[:2000],  # cap at 2KB for Neo4j property
                "year":       year,
                "journal":    journal,
                "doi":        doi,
                "mesh_terms": mesh_terms,
                "source":     "pubmed",
            }
            papers.append(paper)

            # Authors → Researcher nodes
            for author_el in article.findall(".//Author"):
                last  = (author_el.findtext("LastName")  or "").strip()
                fore  = (author_el.findtext("ForeName")  or "").strip()
                if not last:
                    continue
                full_name   = f"{fore} {last}".strip()
                affil_el    = author_el.find(".//AffiliationInfo/Affiliation")
                affiliation = affil_el.text[:300] if affil_el is not None and affil_el.text else ""
                # Construct a deterministic ID: name slug
                r_id = re.sub(r"\s+", "_", full_name.lower())

                researchers.append({
                    "id":          r_id,
                    "name":        full_name,
                    "affiliation": affiliation,
                    "source":      "pubmed",
                })
                p_r_edges.append({"pmid": pmid, "researcher_id": r_id})

        except Exception:
            # Skip malformed articles silently
            continue

    return papers, researchers, p_r_edges


# ── Source 5: Semantic Scholar (Step 4) ──────────────────────

def seed_researchers_from_semantic_scholar(graph: MedinexGraph):
    """
    NEW in Step 4.
    Enriches existing Researcher nodes with Semantic Scholar data:
      - h_index, paper_count, citation_count, semantic_scholar_id
    Also fetches citation edges between Paper nodes in the graph.

    Semantic Scholar API: https://api.semanticscholar.org/graph/v1
    Rate limit: 100 req/min unauthenticated (add S2_API_KEY env var to raise)
    """
    log("=== Enriching researchers via Semantic Scholar ===")

    S2_API_KEY = None  # os.getenv("S2_API_KEY")  — optional

    headers = {}
    if S2_API_KEY:
        headers["x-api-key"] = S2_API_KEY

    researchers = graph.run(
        "MATCH (r:Researcher) WHERE r.h_index IS NULL AND r.name IS NOT NULL "
        "RETURN r.id AS id, r.name AS name LIMIT 5"
    )

    enriched = 0
    for researcher in researchers:
        r_name = researcher["name"]
        r_id   = researcher["id"]

        resp = _get_with_retry(
            f"{SEMANTIC_SCHOLAR}/author/search",
            params={"query": r_name, "fields": "name,hIndex,paperCount,citationCount,affiliations"},
        )
        if resp is None:
            continue

        data = resp.json().get("data", [])
        if not data:
            time.sleep(0.2)
            continue

        # Take first result (best name match)
        author = data[0]
        updates = {
            "id":                   r_id,   # keep existing id
            "semantic_scholar_id":  str(author.get("authorId", "")),
            "h_index":              author.get("hIndex"),
            "paper_count":          author.get("paperCount"),
            "citation_count":       author.get("citationCount"),
            "affiliation":          (author.get("affiliations") or [""])[0],
        }
        graph.upsert_researcher(updates)
        enriched += 1
        time.sleep(0.6)  # 100 req/min = 0.6s between calls

    log(f"  Enriched {enriched} researcher nodes")

    # ── Fetch citation edges for papers already in graph ─────
    log("  Fetching citation edges for seeded papers...")
    papers = graph.run("MATCH (p:Paper) WHERE p.pmid IS NOT NULL RETURN p.pmid AS pmid LIMIT 5")

    citation_edges = []
    for paper in papers:
        pmid = paper["pmid"]
        resp = _get_with_retry(
            f"{SEMANTIC_SCHOLAR}/paper/PMID:{pmid}",
            params={"fields": "references"},
        )
        if resp is None or resp.status_code != 200:
            time.sleep(0.4)
            continue

        data = resp.json()
        for ref in data.get("references", []):
            ref_pmid = None
            for eid in (ref.get("externalIds") or {}).items():
                if eid[0] == "PubMed":
                    ref_pmid = str(eid[1])
            if ref_pmid:
                citation_edges.append({"citing": pmid, "cited": ref_pmid})
        time.sleep(0.6)

    if citation_edges:
        # Only create edges between papers already in graph
        graph.run_batch(
            """
            UNWIND $rows AS row
            MATCH (a:Paper {pmid: row.citing})
            MATCH (b:Paper {pmid: row.cited})
            MERGE (a)-[:CITES]->(b)
            """,
            citation_edges,
        )
        log(f"  Created {len(citation_edges)} CITES edges")

    log("Semantic Scholar enrichment complete.")


# ── Source 6: KEGG Pathways (Step 4) ─────────────────────────

def seed_pathways_from_kegg(graph: MedinexGraph):
    """
    NEW in Step 4.
    Links Gene nodes (already in graph) to Pathway nodes via KEGG REST API.
    Creates Pathway nodes and INVOLVED_IN edges.

    KEGG REST API: https://rest.kegg.jp (free, no key needed)
    """
    log("=== Seeding pathways from KEGG ===")

    # Get distinct gene symbols already in graph
    genes = graph.run(
        "MATCH (g:Gene) WHERE g.symbol IS NOT NULL RETURN g.id AS id, g.symbol AS symbol LIMIT 500"
    )

    pathway_cache = {}   # pathway_id → pathway props
    pathway_edges = []

    for gene in genes:
        symbol = gene["symbol"]
        gene_id = gene["id"]

        resp = _get_with_retry(f"{KEGG_API}/link/pathway/hsa:{symbol}", timeout=15)
        if resp is None or resp.status_code != 200:
            time.sleep(0.3)
            continue

        # Response: lines like "hsa:GENE_ID\thsa:PATHWAY_ID"
        for line in resp.text.strip().splitlines():
            parts = line.split("\t")
            if len(parts) < 2:
                continue
            pathway_kegg_id = parts[1].strip()   # e.g. "hsa05012"

            if pathway_kegg_id not in pathway_cache:
                # Fetch pathway name
                p_resp = _get_with_retry(f"{KEGG_API}/get/{pathway_kegg_id}", timeout=10)
                p_name = pathway_kegg_id  # fallback
                if p_resp and p_resp.status_code == 200:
                    for pline in p_resp.text.splitlines():
                        if pline.startswith("NAME"):
                            p_name = pline.split(None, 1)[1].strip().rstrip(" - Homo sapiens (human)")
                            break
                pathway_cache[pathway_kegg_id] = {
                    "id":     pathway_kegg_id,
                    "name":   p_name,
                    "source": "kegg",
                }
                time.sleep(0.2)

            pathway_edges.append({
                "gene_id":    gene_id,
                "pathway_id": pathway_kegg_id,
            })

        time.sleep(0.3)

    # Bulk write pathway nodes
    if pathway_cache:
        pathway_rows = list(pathway_cache.values())
        graph.run_batch(
            "UNWIND $rows AS row MERGE (n:Pathway {id: row.id}) SET n += row",
            pathway_rows,
        )
        log(f"  Upserted {len(pathway_rows)} Pathway nodes")

    # Bulk create gene → pathway edges
    if pathway_edges:
        graph.run_batch(
            """
            UNWIND $rows AS row
            MATCH (g:Gene    {id: row.gene_id})
            MATCH (pw:Pathway {id: row.pathway_id})
            MERGE (g)-[:INVOLVED_IN]->(pw)
            """,
            pathway_edges,
        )
        log(f"  Created {len(pathway_edges)} INVOLVED_IN edges")

    log("KEGG pathway ingestion complete.")


# ── Main ──────────────────────────────────────────────────────

def main():
    log("Starting Medinex Knowledge Graph seeding...")
    log("Make sure Neo4j is running at bolt://localhost:7687")
    print()

    with MedinexGraph() as graph:

        # ── Health check ─────────────────────────────────────
        health = graph.health_check()
        if not health["ok"]:
            log(f"ERROR: Cannot reach Neo4j — {health['error']}")
            log("Start Neo4j with: sudo systemctl start neo4j")
            return
        log(f"Neo4j connected — {health['version']} at {health['address']}")
        print()

        # ── Step 3 sources ───────────────────────────────────

        # 1. Starter diseases
        # seed_starter_diseases(graph)
        print()

        # 2. Hetionet bulk edges
        # seed_from_hetionet_tsv(graph)
        print()

        # 3. OpenTargets associations
        # seed_from_opentargets(graph)
        print()

        # 4. PubMed papers — full metadata + Researcher nodes
        # seed_papers_from_pubmed(graph, max_per_disease=10)
        print()

        # ── Step 4 sources (new) ─────────────────────────────

        # 5. Semantic Scholar citation logic + H-indexes
        # seed_researchers_from_semantic_scholar(graph)
        print()

        # 6. KEGG — Gene → Pathway edges
        seed_pathways_from_kegg(graph)
        print()

        # ── Final counts ─────────────────────────────────────
        node_counts = graph.node_count()
        edge_counts = graph.edge_count()

        log("=== Graph node counts ===")
        for label, count in node_counts.items():
            log(f"  {label:14s}: {count:,}")

        print()
        log("=== Graph edge counts ===")
        for rel, count in edge_counts.items():
            log(f"  {rel:30s}: {count:,}")

    log("Seeding complete. Open http://localhost:7474 to explore.")


if __name__ == "__main__":
    main()
