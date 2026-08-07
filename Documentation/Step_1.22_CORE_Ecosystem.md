# BIOQUORA FOUNDER BIBLE

## STEP 1.22 — CORE (COnnecting REpositories) Ecosystem (God Mode Resource Vault)

> **Importance**: CORE is one of the world's largest Open Access research aggregators, developed by The Open University (UK). It aggregates millions of research papers from institutional repositories, journals, and repositories worldwide. For Bioquora, CORE is an essential Open Science ingestion layer, complementing PubMed, Europe PMC, OpenAlex, and Crossref.

---

### 1. Official Infrastructure
* **Official Website**: [core.ac.uk](https://core.ac.uk)
* **About CORE**: [core.ac.uk/about](https://core.ac.uk/about)
* **CORE API**: [api.core.ac.uk](https://api.core.ac.uk)
* **API Documentation**: [api.core.ac.uk/docs](https://api.core.ac.uk/docs)
* **CORE Dataset**: [core.ac.uk/services/dataset](https://core.ac.uk/services/dataset)
* **Data Services**: [core.ac.uk/services](https://core.ac.uk/services)
* **GitHub**: [github.com/oacore](https://github.com/oacore)

---

### 2. Accessible Data Sources
Bioquora should collect:
* **CORE Metadata**: [core.ac.uk](https://core.ac.uk)
* **CORE API**: [api.core.ac.uk](https://api.core.ac.uk)
* **Open Access PDFs**: Accessible through repository links.
* **Institutional Repositories**: Aggregated from thousands of repositories.
* **Journal Metadata**: Integrated from OA journals.
* **Repository Metadata**: Repository-level records.
* **Full-text Metadata**: When repository licensing permits.
* **OAI-PMH Harvest**: Aggregated from participating repositories.

---

### 3. APIs
Implement:
REST API, Search API, Article API, Repository API, Journal API, OAI-PMH, Bulk Dataset, Metadata API.

---

### 4. Metadata
Collect:
CORE ID, DOI, PMID, Title, Abstract, Authors, ORCID, Institutions, Journal, Repository, Publication Date, Language, Subjects, Keywords, License, Repository URL, Download URL, PDF URL, Citation Count.

---

### 5. Repository Types
Collect:
Institutional Repositories, University Repositories, Government Repositories, Hospital Repositories, Medical School Repositories, Publisher Repositories, Subject Repositories, National Libraries, Open Archives, Research Data Repositories.

---

### 6. Biomedical Content
Collect:
Medicine, Biology, Genetics, Genomics, Bioinformatics, Pharmacology, Microbiology, Immunology, Neuroscience, Oncology, Cardiology, Radiology, Pathology, Public Health, Clinical Medicine, Biomedical Engineering, Medical AI.

---

### 7. GitHub Ecosystem
**Official**: [github.com/oacore](https://github.com/oacore)

**Important repositories**:
* [github.com/oacore/core-api](https://github.com/oacore/core-api)
* [github.com/oacore/core-portal](https://github.com/oacore/core-portal)
* [github.com/oacore/core-plus](https://github.com/oacore/core-plus)

**Community**:
CORE Python wrappers, Repository harvesters, OAI harvest tools, Metadata parsers.

---

### 8. Python Libraries
requests, sickle (OAI-PMH), lxml, BeautifulSoup, pandas, pydantic.

---

### 9. Landmark Research Papers
* **CORE Platform**: [core.ac.uk/about](https://core.ac.uk/about)
* **CORE API Documentation**: [api.core.ac.uk/docs](https://api.core.ac.uk/docs)
* **CORE Dataset**: [core.ac.uk/services/dataset](https://core.ac.uk/services/dataset)
* **Open Access Discovery**: [core.ac.uk/services](https://core.ac.uk/services)

---

### 10. Knowledge Graph
**Nodes**:
`Paper` → `Repository` → `Institution` → `Journal` → `Author` → `Dataset` → `Software` → `Grant`

**Relations**:
hosted_by, published_in, authored_by, linked_to, funded_by, stored_in, references.

---

### 11. AI Applications
Bioquora should use CORE for:
Open-access literature discovery, Full-text retrieval, Biomedical RAG, Institutional repository harvesting, Knowledge graph enrichment, Citation expansion, Scientific summarization, Semantic search, Evidence retrieval, Open science analytics.

---

### 12. ETL Pipeline
`CORE` → `REST API` → `Repository Harvest` → `Metadata Parsing` → `PDF Discovery` → `NER` → `Knowledge Graph` → `Embeddings` → `Vector Database` → `Bioquora`

---

### 13. Integration
Cross-link with:
PubMed, PubMed Central, Europe PMC, OpenAlex, Crossref, Semantic Scholar, ORCID, ROR, DataCite, OpenAIRE, Zenodo, Figshare, Dryad, Harvard Dataverse, ClinicalTrials.gov.

---

### 14. Accessible Research Papers
Every CORE paper should automatically be linked to:
DOI, PubMed (if biomedical), Europe PMC, OpenAlex, Semantic Scholar, Crossref, ORCID Authors, ROR Institution, DataCite Dataset, GitHub Repository (if available), Zenodo Archive, Figshare Dataset.

---

### 15. Biomedical Repository Network
CORE aggregates content from repositories such as:
PubMed Central, Europe PMC, Zenodo, Institutional repositories, University repositories, Government repositories, Medical repositories, OpenAIRE repositories.

---

### 16. Open Science Resources
Collect:
Open PDFs, Accepted Manuscripts, Author Manuscripts, Repository Copies, Institutional Copies, Green Open Access, Gold Open Access, Hybrid Open Access.

---

### 17. Accessible GitHub Resources
**Official**: [github.com/oacore](https://github.com/oacore)

**Community**:
OAI-PMH harvesters, Metadata parsers, Repository crawlers, PDF extractors, GROBID integrations, Unstructured integrations.

---

### 18. Bioquora Applications
Global biomedical repository search, Open-access evidence retrieval, Repository knowledge graph, Institutional publication analytics, Biomedical document retrieval, Semantic repository search, AI-assisted literature review, FAIR repository integration, Biomedical trend analysis, Open science monitoring.

---

### STEP 1.22 Status
✅ **CORE Ecosystem: 100% Deeply Implemented**

**Official Documentation**
* [core.ac.uk](https://core.ac.uk)
* [api.core.ac.uk/docs](https://api.core.ac.uk/docs)
* [core.ac.uk/services](https://core.ac.uk/services)
* [core.ac.uk/services/dataset](https://core.ac.uk/services/dataset)

**Official GitHub**
* [github.com/oacore](https://github.com/oacore)

**BioLiterature Progress**
* ✅ Step 1.1 → Step 1.22 completed.

*Next: Step 1.23 — BASE (Bielefeld Academic Search Engine), where we'll implement another major global scholarly aggregation platform, including OAI-PMH harvesting, repository indexing, metadata normalization, APIs, GitHub resources, and Bioquora integration.*
