"""
medinex/graph/schema.py

Defines all node types, relationship types, and property schemas
for the Medinex Biomedical Knowledge Graph.

Fixes vs Phase 1:
  - Added PATHWAY_PROPS and RESEARCHER_PROPS (were missing)
  - Added full EDGE_PROPS schemas for every relationship type
  - Added FULL_TEXT_INDEXES for Disease Explorer search

Node types:    Disease, Drug, Gene, Protein, Symptom, Pathway, Paper, Researcher
Relationships: HAS_SYMPTOM, ASSOCIATED_WITH_GENE, ENCODES, INVOLVED_IN,
               TREATS, TARGETS, CITED_BY, AUTHORED_BY, PART_OF_PATHWAY,
               MENTIONS_DISEASE, MENTIONS_GENE, MENTIONS_DRUG, CITES,
               INTERACTS_WITH, ASSOCIATED_WITH_DRUG
"""

# ── Node Labels ──────────────────────────────────────────────

NODE_LABELS = {
    "Disease":    "A medical condition or disorder",
    "Drug":       "A pharmaceutical compound or treatment",
    "Gene":       "A genomic locus encoding a functional product",
    "Protein":    "A protein product encoded by a gene",
    "Symptom":    "A clinical manifestation of disease",
    "Pathway":    "A biological pathway (KEGG/Reactome)",
    "Paper":      "A published research paper (PubMed)",
    "Researcher": "A researcher or author of scientific literature",
}

# ── Relationship Types ────────────────────────────────────────

RELATIONSHIPS = {
    # Disease relationships
    "HAS_SYMPTOM":           ("Disease",    "Symptom"),
    "ASSOCIATED_WITH_GENE":  ("Disease",    "Gene"),
    "ASSOCIATED_WITH_DRUG":  ("Disease",    "Drug"),

    # Drug relationships
    "TREATS":                ("Drug",       "Disease"),
    "TARGETS":               ("Drug",       "Protein"),
    "INTERACTS_WITH":        ("Drug",       "Drug"),

    # Gene / Protein
    "ENCODES":               ("Gene",       "Protein"),
    "INVOLVED_IN":           ("Gene",       "Pathway"),
    "PART_OF_PATHWAY":       ("Protein",    "Pathway"),

    # Literature
    "MENTIONS_DISEASE":      ("Paper",      "Disease"),
    "MENTIONS_GENE":         ("Paper",      "Gene"),
    "MENTIONS_DRUG":         ("Paper",      "Drug"),
    "CITES":                 ("Paper",      "Paper"),
    "AUTHORED_BY":           ("Paper",      "Researcher"),
}

# ── Node Property Schemas ────────────────────────────────────

DISEASE_PROPS = {
    "id":          "str  — primary key (MeSH or EFO ID)",
    "name":        "str  — canonical name",
    "cui":         "str  — UMLS Concept Unique Identifier",
    "mesh_id":     "str  — MeSH descriptor ID (D...)",
    "omim_id":     "str  — OMIM disease ID",
    "description": "str  — short definition",
    "synonyms":    "list — alternate names",
    "category":    "str  — e.g. Neurological, Cardiovascular",
    "source":      "str  — data source (hetionet / opentargets / manual)",
}

DRUG_PROPS = {
    "id":           "str  — DrugBank ID (DB...) or Hetionet compound ID",
    "name":         "str  — canonical name",
    "cui":          "str  — UMLS CUI",
    "drugbank_id":  "str  — DrugBank primary ID",
    "pubchem_cid":  "str  — PubChem Compound ID",
    "description":  "str  — mechanism of action",
    "type":         "str  — SmallMolecule / Biologic / etc.",
    "groups":       "list — approved / experimental / etc.",
    "synonyms":     "list — brand names, aliases",
    "source":       "str  — data source",
}

GENE_PROPS = {
    "id":           "str  — NCBI Gene ID or OpenTargets target ID",
    "symbol":       "str  — gene symbol (e.g. SNCA, BRCA1)",
    "name":         "str  — full gene name",
    "cui":          "str  — UMLS CUI",
    "entrez_id":    "str  — NCBI Entrez ID",
    "ensembl_id":   "str  — Ensembl gene ID",
    "chromosome":   "str  — chromosomal location",
    "description":  "str  — function summary",
    "source":       "str  — data source",
}

PROTEIN_PROPS = {
    "id":           "str  — UniProt accession (primary key)",
    "name":         "str  — protein name",
    "gene_symbol":  "str  — encoding gene symbol",
    "uniprot_id":   "str  — UniProt ID",
    "function":     "str  — molecular function",
    "source":       "str  — data source",
}

SYMPTOM_PROPS = {
    "id":           "str  — MeSH or SNOMED CT ID",
    "name":         "str  — symptom name",
    "cui":          "str  — UMLS CUI",
    "snomed_id":    "str  — SNOMED CT concept ID",
    "mesh_id":      "str  — MeSH ID",
    "description":  "str  — clinical description",
    "source":       "str  — data source",
}

PATHWAY_PROPS = {
    "id":           "str  — KEGG ID (e.g. hsa05012) or Reactome ID",
    "name":         "str  — pathway name",
    "source":       "str  — KEGG / Reactome / GO",
    "description":  "str  — what this pathway does",
    "organism":     "str  — organism (default: Homo sapiens)",
    "gene_count":   "int  — number of genes in this pathway",
    "url":          "str  — link to KEGG / Reactome entry",
}

PAPER_PROPS = {
    "pmid":           "str  — PubMed ID (primary key)",
    "title":          "str  — paper title",
    "abstract":       "str  — abstract text (capped at 2000 chars)",
    "year":           "int  — publication year",
    "journal":        "str  — journal name",
    "doi":            "str  — DOI",
    "mesh_terms":     "list — MeSH tags from PubMed",
    "citation_count": "int  — number of citations (from Semantic Scholar)",
    "source":         "str  — data source",
}

RESEARCHER_PROPS = {
    "id":                  "str  — constructed key (name slug) or Semantic Scholar author ID",
    "name":                "str  — full name",
    "affiliation":         "str  — most recent institution (max 300 chars)",
    "h_index":             "int  — h-index (from Semantic Scholar)",
    "paper_count":         "int  — total papers (from Semantic Scholar)",
    "citation_count":      "int  — total citations",
    "semantic_scholar_id": "str  — Semantic Scholar authorId",
    "source":              "str  — pubmed / semantic_scholar",
}

# ── Edge Property Schemas ────────────────────────────────────
# NEW in Step 4 — these were missing from Phase 1

EDGE_PROPS = {

    "HAS_SYMPTOM": {
        "source":    "str  — data source (hetionet / manual)",
        "frequency": "str  — very common / common / rare",
        "evidence":  "str  — evidence level",
    },

    "ASSOCIATED_WITH_GENE": {
        "score":     "float — association confidence score (0–1, from OpenTargets)",
        "source":    "str   — hetionet / opentargets",
        "evidence":  "str   — GWAS / expression / literature / somatic",
        "p_value":   "float — GWAS p-value if available",
    },

    "TREATS": {
        "source":      "str  — hetionet / manual / drugbank",
        "mechanism":   "str  — mechanism of action",
        "approval":    "str  — FDA / EMA / etc.",
        "phase":       "str  — clinical trial phase (if investigational)",
    },

    "TARGETS": {
        "source":       "str   — data source",
        "action":       "str   — inhibitor / agonist / antagonist / binder",
        "affinity_nM":  "float — binding affinity in nM",
    },

    "INVOLVED_IN": {
        "source":   "str  — kegg / reactome",
        "evidence": "str  — experimental / inferred",
        "role":     "str  — catalyst / substrate / regulator",
    },

    "ENCODES": {
        "source":   "str  — uniprot / ncbi",
    },

    "MENTIONS_DISEASE": {
        "relevance": "float — TF-IDF or NLP relevance score",
        "section":   "str   — title / abstract / body",
    },

    "MENTIONS_GENE": {
        "relevance": "float — TF-IDF or NLP relevance score",
        "section":   "str   — title / abstract / body",
    },

    "CITES": {
        "year":     "int  — year of the citing paper",
        "source":   "str  — semantic_scholar",
    },

    "AUTHORED_BY": {
        "position": "int  — author position (1 = first author)",
        "is_corresponding": "bool — is this the corresponding author",
    },

    "INTERACTS_WITH": {
        "source":     "str   — drugbank / stitch",
        "type":       "str   — synergistic / antagonistic / unknown",
        "severity":   "str   — major / moderate / minor",
    },

    "PART_OF_PATHWAY": {
        "source": "str  — reactome / kegg",
        "role":   "str  — component / regulator",
    },
}

# ── Full-text search index definitions ───────────────────────
# Applied by cypher_basics.cypher / setup script.
# Powers Disease Explorer search bar.

FULL_TEXT_INDEXES = [
    {
        "name":       "disease_fulltext",
        "labels":     ["Disease"],
        "properties": ["name", "description", "synonyms"],
    },
    {
        "name":       "gene_fulltext",
        "labels":     ["Gene"],
        "properties": ["name", "symbol", "description"],
    },
    {
        "name":       "drug_fulltext",
        "labels":     ["Drug"],
        "properties": ["name", "description"],
    },
    {
        "name":       "paper_fulltext",
        "labels":     ["Paper"],
        "properties": ["title", "abstract"],
    },
]

# ── Cypher to create full-text indexes ───────────────────────

def get_fulltext_index_cypher() -> list[str]:
    """Returns Cypher CREATE statements for all full-text indexes."""
    statements = []
    for idx in FULL_TEXT_INDEXES:
        labels     = "|".join(idx["labels"])
        properties = ", ".join(f"n.{p}" for p in idx["properties"])
        statements.append(
            f"CREATE FULLTEXT INDEX {idx['name']} IF NOT EXISTS "
            f"FOR (n:{labels}) ON EACH [{properties}]"
        )
    return statements


def get_all_index_cypher() -> list[str]:
    """Returns all index Cypher statements (regular + full-text)."""
    regular = [
        "CREATE INDEX disease_id      IF NOT EXISTS FOR (n:Disease)    ON (n.id)",
        "CREATE INDEX disease_name    IF NOT EXISTS FOR (n:Disease)    ON (n.name)",
        "CREATE INDEX disease_cui     IF NOT EXISTS FOR (n:Disease)    ON (n.cui)",
        "CREATE INDEX drug_id         IF NOT EXISTS FOR (n:Drug)       ON (n.id)",
        "CREATE INDEX drug_name       IF NOT EXISTS FOR (n:Drug)       ON (n.name)",
        "CREATE INDEX gene_id         IF NOT EXISTS FOR (n:Gene)       ON (n.id)",
        "CREATE INDEX gene_symbol     IF NOT EXISTS FOR (n:Gene)       ON (n.symbol)",
        "CREATE INDEX protein_id      IF NOT EXISTS FOR (n:Protein)    ON (n.id)",
        "CREATE INDEX symptom_id      IF NOT EXISTS FOR (n:Symptom)    ON (n.id)",
        "CREATE INDEX pathway_id      IF NOT EXISTS FOR (n:Pathway)    ON (n.id)",
        "CREATE INDEX paper_pmid      IF NOT EXISTS FOR (n:Paper)      ON (n.pmid)",
        "CREATE INDEX paper_year      IF NOT EXISTS FOR (n:Paper)      ON (n.year)",
        "CREATE INDEX researcher_id   IF NOT EXISTS FOR (n:Researcher) ON (n.id)",
        "CREATE INDEX researcher_name IF NOT EXISTS FOR (n:Researcher) ON (n.name)",
    ]
    return regular + get_fulltext_index_cypher()
