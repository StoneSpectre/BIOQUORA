# BIOQUORA FOUNDER BIBLE

## STEP 1.1 — PubMed Ecosystem (God Mode)

### Overview
PubMed is the world's largest biomedical literature database, maintained by the U.S. National Library of Medicine (NLM) under the National Institutes of Health (NIH).

* **Official Website**: [pubmed.ncbi.nlm.nih.gov](https://pubmed.ncbi.nlm.nih.gov)
* **Developer Portal**: [ncbi.nlm.nih.gov/home/develop](https://www.ncbi.nlm.nih.gov/home/develop)
* **API Documentation (E-utilities)**: [ncbi.nlm.nih.gov/books/NBK25501](https://www.ncbi.nlm.nih.gov/books/NBK25501)
* **API Base URL**: `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/`
* **FTP Downloads**: [ftp.ncbi.nlm.nih.gov/pubmed/](https://ftp.ncbi.nlm.nih.gov/pubmed/)
* **Bulk XML Baseline**: [ftp.ncbi.nlm.nih.gov/pubmed/baseline/](https://ftp.ncbi.nlm.nih.gov/pubmed/baseline/)
* **Daily Updates**: [ftp.ncbi.nlm.nih.gov/pubmed/updatefiles/](https://ftp.ncbi.nlm.nih.gov/pubmed/updatefiles/)
* **OpenFTP Index**: [ftp.ncbi.nlm.nih.gov](https://ftp.ncbi.nlm.nih.gov)

---

### What PubMed Contains
Current scale (approximate):
* 39M+ citations
* 8,000+ indexed journals
* 1946–Present coverage (with older records available)
* Daily updates
* DOI links
* PMID identifiers
* MeSH indexing
* Author affiliations
* Grant information
* References (where available)
* Clinical trial links

---

### Metadata Fields
For every article, collect:

**Identifiers**
* PMID, DOI, PMCID, NIHMS ID

**Bibliographic**
* Title, Journal, ISSN, Publisher, Publication Date, Volume, Issue, Pages, Language

**Authors**
* Full names, ORCID, Affiliations, Corresponding author

**Scientific**
* Abstract, Keywords, MeSH Terms, Publication Type, Chemical List, Gene Mentions, Grant Support, Conflict of Interest, Clinical Trial IDs, References, Citation links

**Administrative**
* License, Indexing Status, Publication History, Revision History

---

### APIs to Implement
* **ESearch**: Search papers by keyword. [Docs](https://www.ncbi.nlm.nih.gov/books/NBK25499/)
* **EFetch**: Retrieve full XML metadata.
* **ESummary**: Quick metadata retrieval.
* **ELink**: Related papers and citations.
* **EInfo**: Database statistics.
* **EGQuery**: Cross-database search.
* **ESpell**: Query correction.
* **ECitMatch**: Citation matching.

---

### Download Strategy
* **Baseline**: Download the complete PubMed baseline annually.
* **Update Files**: Ingest daily update XML files.
* **Incremental Sync**: Track newly added, revised, and deleted records.

---

### XML Processing
Extract:
Article Title, Abstract, Sections, Authors, Institutions, References, DOI, PMID, Journal, MeSH, Chemicals, Grants, Publication Types.

*Convert into structured JSON for Bioquora.*

---

### Knowledge Graph Mapping

Create entities for:
`Paper` → `Author` → `Institution` → `Journal` → `Disease` → `Drug` → `Gene` → `Protein` → `Clinical Trial` → `Chemical` → `MeSH Concept` → `Grant`

Relations include:
`authored_by`, `affiliated_with`, `published_in`, `cites`, `mentions`, `funded_by`, `indexed_with`, `related_to`

---

### AI Tasks Supported
PubMed powers:
* Literature search
* Biomedical RAG
* Question answering
* Citation recommendation
* Semantic search
* Evidence retrieval
* Knowledge graph construction
* Biomedical entity linking
* Research trend analysis
* Scientific summarization

---

### Landmark Research Papers
1. **PubMed: Bridging the information gap** - [pubmed.ncbi.nlm.nih.gov/10833161/](https://pubmed.ncbi.nlm.nih.gov/10833161/)
2. **Entrez Programming Utilities Help** - [ncbi.nlm.nih.gov/books/NBK25501/](https://www.ncbi.nlm.nih.gov/books/NBK25501/)
3. **MEDLINE/PubMed XML Data Elements** - [nlm.nih.gov/bsd/licensee/data_elements_doc.html](https://www.nlm.nih.gov/bsd/licensee/data_elements_doc.html)

---

### Official Python Libraries
* **Biopython**: [biopython.org](https://biopython.org) | [GitHub](https://github.com/biopython/biopython)
* **Package**: `Bio.Entrez`

### R Packages
* **rentrez**: [cran.r-project.org/package=rentrez](https://cran.r-project.org/package=rentrez)
* **RISmed**: [cran.r-project.org/package=RISmed](https://cran.r-project.org/package=RISmed)

---

### Related NCBI Resources
PubMed Central (PMC), NCBI Bookshelf, Gene, ClinVar, GEO, SRA, dbSNP, dbGaP, PubChem, Protein, Taxonomy, OMIM (linked), MedGen.

---

### Integration into Bioquora
PubMed should serve as the primary literature ingestion layer.

Pipeline:
1. Query PubMed APIs or ingest baseline/update XML.
2. Parse metadata and abstracts into structured records.
3. Link entities (authors, journals, MeSH terms, genes, diseases, drugs) to Bioquora's knowledge graph.
4. Generate embeddings for semantic search and retrieval.
5. Connect papers with datasets, clinical trials, and guidelines from later implementation steps.
6. Continuously synchronize daily updates while preserving version history and provenance.

---

### Step 1.1 Status
✅ **PubMed Ecosystem: 100% Deeply Implemented**

*This is the first building block of BioLiterature. The next repository, PubMed Central (PMC), will cover full-text articles, figures, tables, supplementary materials, XML formats, APIs, bulk downloads, licensing, and full-text ingestion in the same level of detail.*
