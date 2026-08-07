# BIOQUORA FOUNDER BIBLE

## STEP 1.23 — BASE (Bielefeld Academic Search Engine) Ecosystem (God Mode Resource Vault)

> **Importance**: BASE (Bielefeld Academic Search Engine), operated by Bielefeld University Library (Germany), is one of the world's largest academic search engines for open scholarly content. It harvests metadata from thousands of repositories using OAI-PMH, making it a critical discovery layer for Bioquora.

---

### 1. Official Infrastructure
* **Official Website**: [base-search.net](https://www.base-search.net)
* **About BASE**: [base-search.net/about/en](https://www.base-search.net/about/en)
* **API Information**: [base-search.net/about/en/api](https://www.base-search.net/about/en/api)
* **OAI-PMH Documentation**: [base-search.net/about/en](https://www.base-search.net/about/en)
* **Integration Guide**: [base-search.net/about/en/help.php](https://www.base-search.net/about/en/help.php)
* **GitHub Resources**: Community integrations available (no central official GitHub organization).

---

### 2. Accessible Data Sources
Collect:
* **BASE Metadata**: [base-search.net](https://www.base-search.net)
* **Repository Index**: [base-search.net/about/en](https://www.base-search.net/about/en)
* **OAI-PMH Records**: Harvested from thousands of repositories.
* **Institutional Repositories**: Universities, Hospitals, Research Institutes, Government Repositories, National Libraries.
* **Open Access Publications**: Accessible via repository links.
* **Theses & Dissertations**: Integrated from participating repositories.
* Books
* Conference Papers
* Reports
* Datasets (where indexed)

---

### 3. APIs
Implement:
REST Search API (where available), OAI-PMH Harvesting, Metadata Export, Search Services, Repository Discovery, OpenSearch-compatible endpoints (where supported).

---

### 4. Metadata
Collect:
BASE ID, DOI, PMID, PMCID, Handle, URN, ISBN, ISSN, Title, Abstract, Authors, Institutions, Repository, Language, Subjects, Keywords, Publication Year, Publisher, License, PDF URL, Repository URL, OAI Identifier.

---

### 5. Repository Coverage
BASE indexes content from:
University repositories, Medical repositories, Government repositories, National libraries, Zenodo, OpenAIRE repositories, Institutional repositories, Digital libraries, Research archives, Dissertation repositories.

---

### 6. Biomedical Content
Collect:
Medicine, Biology, Microbiology, Genetics, Genomics, Immunology, Bioinformatics, Drug Discovery, Clinical Medicine, Medical AI, Digital Health, Public Health, Oncology, Radiology, Pathology, Neuroscience.

---

### 7. GitHub Ecosystem
Useful repositories:
* **GROBID**: [github.com/kermitt2/grobid](https://github.com/kermitt2/grobid)
* **Unstructured**: [github.com/Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured)
* **Sickle (OAI-PMH)**: [github.com/mloesch/sickle](https://github.com/mloesch/sickle)
* **OAIHarvester2**: [github.com/ICRAR/oaiharvester2](https://github.com/ICRAR/oaiharvester2)
* **PubMed Parser**: [github.com/titipata/pubmed_parser](https://github.com/titipata/pubmed_parser)

---

### 8. Python Libraries
sickle, requests, BeautifulSoup, lxml, xmltodict, pandas, rapidfuzz.

---

### 9. Landmark Documentation
* **BASE Overview**: [base-search.net/about/en](https://www.base-search.net/about/en)
* **BASE Help**: [base-search.net/about/en/help.php](https://www.base-search.net/about/en/help.php)
* **API Information**: [base-search.net/about/en/api](https://www.base-search.net/about/en/api)
* **OAI-PMH Protocol**: [openarchives.org/pmh](https://www.openarchives.org/pmh)

---

### 10. Knowledge Graph
**Nodes**:
`Paper` → `Repository` → `Institution` → `Author` → `Dataset` → `Book` → `Thesis` → `Conference`

**Relations**:
stored_in, published_by, authored_by, linked_to, harvested_from, references, associated_with.

---

### 11. AI Applications
Bioquora should use BASE for:
Open repository discovery, Biomedical literature retrieval, Institutional repository harvesting, Grey literature search, Thesis discovery, Semantic search, Knowledge graph enrichment, Biomedical RAG, Open science analytics, Repository quality assessment.

---

### 12. ETL Pipeline
`BASE` → `Repository Discovery` → `OAI-PMH Harvest` → `Metadata Normalization` → `Repository Classification` → `NER` → `Knowledge Graph` → `Embeddings` → `Hybrid Search` → `Bioquora`

---

### 13. Integration
Cross-link with:
PubMed, PubMed Central, Europe PMC, OpenAlex, Crossref, Semantic Scholar, CORE, OpenAIRE, DataCite, ORCID, ROR, Zenodo, Figshare, Dryad, Harvard Dataverse, ClinicalTrials.gov.

---

### 14. Accessible Research Papers
Every BASE record should be linked with:
DOI, Crossref metadata, OpenAlex record, Semantic Scholar record, PubMed (if biomedical), Europe PMC, ORCID author, ROR institution, GitHub repository (if available), Dataset DOI (DataCite), Clinical trial (if applicable).

---

### 15. Open Repository Network
BASE harvests from:
University repositories, National libraries, Government repositories, OpenAIRE, Zenodo, Institutional repositories, Medical repositories, Digital libraries, Thesis repositories.
*(This makes it one of the largest discovery services for grey literature and institutional research outputs).*

---

### 16. FAIR & Open Science Resources
Collect:
Green Open Access, Gold Open Access, Repository manuscripts, Accepted manuscripts, Institutional copies, Theses, Technical reports, Conference proceedings.

---

### 17. Bioquora Applications
Global institutional repository search, Grey literature discovery, Biomedical thesis retrieval, Open-access evidence search, Repository knowledge graph, Institutional publication analytics, AI-assisted literature review, FAIR repository integration, Biomedical trend analysis, Long-tail research discovery.

---

### 18. Official & Community Resources
**Official**:
* [base-search.net](https://www.base-search.net)
* [base-search.net/about/en](https://www.base-search.net/about/en)
* [base-search.net/about/en/api](https://www.base-search.net/about/en/api)
* [base-search.net/about/en/help.php](https://www.base-search.net/about/en/help.php)

**Supporting Open-Source Tools**:
* [github.com/mloesch/sickle](https://github.com/mloesch/sickle)
* [github.com/ICRAR/oaiharvester2](https://github.com/ICRAR/oaiharvester2)
* [github.com/kermitt2/grobid](https://github.com/kermitt2/grobid)
* [github.com/Unstructured-IO/unstructured](https://github.com/Unstructured-IO/unstructured)
* [github.com/titipata/pubmed_parser](https://github.com/titipata/pubmed_parser)

---

### STEP 1.23 Status
✅ **BASE Ecosystem: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1 → Step 1.23

*Next (God Mode Resource Vault): DOAJ, OpenCitations, Unpaywall, Zenodo, Figshare, Dryad, Harvard Dataverse, OpenAIRE.*
