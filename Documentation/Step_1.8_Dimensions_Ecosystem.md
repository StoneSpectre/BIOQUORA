# BIOQUORA FOUNDER BIBLE

## STEP 1.8 — Dimensions Ecosystem (God Mode Deep Implementation)

> **Note**: Unlike PubMed, OpenAlex, and Europe PMC, Dimensions is a commercial platform (Digital Science). Much of its metadata is accessible through institutional subscriptions, and some datasets are available through Google BigQuery under specific terms. Integrate it only if you have appropriate access or licensing.

---

### 1. Overview
Dimensions is one of the world's largest interconnected research intelligence platforms. Unlike PubMed or OpenAlex, it connects Publications, Grants, Clinical Trials, Patents, Policy Documents, Datasets, Researchers, Organizations, Altmetric Attention, and Research Funding into a single interconnected graph.

### 2. Official Resources
* **Main Website**: [dimensions.ai](https://www.dimensions.ai)
* **Developer Portal**: [docs.dimensions.ai](https://docs.dimensions.ai)
* **API Documentation**: [docs.dimensions.ai/dsl](https://docs.dimensions.ai/dsl)
* **DSL Language (Dimensions Search Language)**: [docs.dimensions.ai/dsl](https://docs.dimensions.ai/dsl)
* **Google BigQuery**: [docs.dimensions.ai/bigquery](https://docs.dimensions.ai/bigquery)
* **Publications Portal**: [app.dimensions.ai](https://app.dimensions.ai)

---

### 3. Complete Database
Bioquora should collect:

**Publications**
Journal Articles, Conference Papers, Reviews, Books, Book Chapters, Preprints.

**Grants**
Grant ID, Grant Amount, Funding Organization, Principal Investigator, Institution, Country, Duration, Publications.

**Clinical Trials**
Trial ID, Disease, Drug, Phase, Sponsor, Status, Publications.

**Patents**
Patent Number, Patent Family, Inventors, Assignees, Linked Publications.

**Datasets**
Dataset DOI, Repository, Authors, Institution, Related Papers.

**Policy Documents**
*One of Dimensions' unique features.*
Collect: WHO Reports, Government Reports, Health Policies, Guidelines, White Papers.

---

### 4. Metadata
For every publication:

**IDs**
DOI, PMID, PMCID, Dimensions ID

**Authors**
ORCID, Affiliations, Countries

**Citation**
References, Citation Count, Relative Citation Ratio

**Research Categories**
Fields, FOR Codes, SDGs, Concepts

**Altmetric**
News, Twitter/X, Blogs, Wikipedia, Reddit, Policy mentions

**Funding**
Grant, Agency, Amount, PI

---

### 5. DSL Queries
Supports:
Publication Search, Grant Search, Patent Search, Clinical Trial Search, Dataset Search, Policy Search, Researcher Search, Organization Search.

---

### 6. APIs
Implement:
Publication API, Grant API, Clinical Trial API, Patent API, Dataset API, Researcher API, Organization API, Policy API.

---

### 7. Citation Intelligence
Dimensions provides:
Forward Citations, Backward Citations, Field Citation Ratio, Relative Citation Ratio, Citation Timeline, Highly Cited Papers.

---

### 8. Research Intelligence
Bioquora should compute:
Top Institutions, Top Authors, Top Journals, Top Diseases, Funding Trends, Drug Discovery Trends, Emerging Topics, Clinical Trial Landscape.

---

### 9. Knowledge Graph
**Nodes**:
`Publication` → `Grant` → `Clinical Trial` → `Patent` → `Policy` → `Dataset` → `Institution` → `Author` → `Funder` → `Disease` → `Drug`

**Relations**:
funded_by, cites, mentions, linked_to_trial, linked_to_patent, used_dataset, published_by.

---

### 10. AI Applications
Dimensions powers:
Grant Recommendation, Funding Analysis, Research Landscape, Citation Analytics, Drug Discovery, Policy Impact, Research Intelligence, Clinical Trial Intelligence.

---

### 11. Research Papers
* **Dimensions platform overview**: [dimensions.ai/resources](https://www.dimensions.ai/resources)
* **Research Intelligence**: [digitalscience.figshare.com](https://digitalscience.figshare.com)
* **Altmetric**: [altmetric.com](https://www.altmetric.com)

---

### 12. GitHub
* **Dimensions API Examples**: [github.com/digital-science](https://github.com/digital-science)
* **Python SDK**: [github.com/digital-science/dsl](https://github.com/digital-science/dsl)

---

### 13. Integration Pipeline
`Dimensions API` → `Publication Metadata` → `Grant Metadata` → `Clinical Trials` → `Patents` → `Policy Documents` → `Knowledge Graph` → `Embeddings` → `Funding Intelligence` → `Bioquora Research Engine`

---

### 14. Bioquora Advantages
Dimensions uniquely enables Bioquora to answer questions such as:
* Which grants funded this biomedical discovery?
* Which clinical trials resulted from this paper?
* Which patents cite this research?
* Which government policy references this publication?
* Which institutions collaborate most on Alzheimer's research?
* Which diseases receive the highest funding globally?
* Which drug targets are emerging based on grants, publications, and patents?

*This creates a research intelligence layer that complements literature databases by connecting scientific outputs to funding, innovation, and real-world policy impact.*

---

### 15. Cross-linking Strategy
Dimensions should be linked with:
* **PubMed** → PMID mapping
* **PMC** → Full text
* **Europe PMC** → Grants & annotations
* **OpenAlex** → Authors & institutions
* **Crossref** → DOI metadata
* **Semantic Scholar** → AI embeddings & recommendations
* **Lens.org** → Patent intelligence

*This makes Dimensions the research intelligence hub within Bioquora's literature ecosystem.*

---

### STEP 1.8 Status
✅ **Dimensions Ecosystem: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1 — PubMed
* ✅ Step 1.2 — PubMed Central (PMC)
* ✅ Step 1.3 — Europe PMC
* ✅ Step 1.4 — OpenAlex
* ✅ Step 1.5 — Crossref
* ✅ Step 1.6 — Semantic Scholar
* ✅ Step 1.7 — Lens.org
* ✅ Step 1.8 — Dimensions

*Next: Step 1.9 — Scopus Ecosystem, where we'll deeply implement Elsevier's abstract and citation database, APIs, author profiles, affiliations, citation metrics, subject classifications, and institutional analytics, along with licensing considerations and integration into Bioquora.*
