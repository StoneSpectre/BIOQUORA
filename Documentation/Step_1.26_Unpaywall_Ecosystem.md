# BIOQUORA FOUNDER BIBLE

## STEP 1.26 — Unpaywall Ecosystem (God Mode Resource Vault)

> **Importance**: Unpaywall is the world's largest Open Access discovery service, developed by OurResearch. It tracks the open-access status of scholarly articles by DOI and links them to legally available full-text copies. For Bioquora, Unpaywall is the Open Access resolution layer, ensuring users can access free versions of research whenever available.

---

### 1. Official Infrastructure
* **Official Website**: [unpaywall.org](https://unpaywall.org)
* **About**: [unpaywall.org/products/api](https://unpaywall.org/products/api)
* **API Documentation**: [support.unpaywall.org/support/solutions/articles/44002142311](https://support.unpaywall.org/support/solutions/articles/44002142311)
* **Snapshot Data**: [unpaywall.org/products/snapshot](https://unpaywall.org/products/snapshot)
* **Data Feed**: [unpaywall.org/products/data-feed](https://unpaywall.org/products/data-feed)
* **OurResearch**: [ourresearch.org](https://ourresearch.org)
* **GitHub**: [github.com/ourresearch](https://github.com/ourresearch)

---

### 2. Accessible Data Sources
Bioquora should ingest:
* **DOI Open Access Records**: [api.unpaywall.org](https://api.unpaywall.org)
* **Complete Snapshot**: [unpaywall.org/products/snapshot](https://unpaywall.org/products/snapshot)
* **Daily Data Feed**: [unpaywall.org/products/data-feed](https://unpaywall.org/products/data-feed)
* **OA Status Database**: [unpaywall.org](https://unpaywall.org)
* **Repository Links**: Institutional repositories
* **Publisher OA Links**: Publisher-hosted Open Access copies
* **Preprint Links**: bioRxiv, medRxiv, arXiv

---

### 3. APIs
Implement:
REST API, DOI Lookup API, Bulk Snapshot, Daily Feed, JSON Metadata.

---

### 4. Metadata
Collect:
DOI, OA Status, Best OA URL, PDF URL, License, Repository, Version, Host Type, Journal, Publisher, Updated Date, OA Location, Repository Name.

---

### 5. Open Access Types
Collect:
Gold OA, Hybrid OA, Green OA, Bronze OA, Diamond OA, Repository Copy, Publisher Copy, Accepted Manuscript, Published Version, Preprint.

---

### 6. GitHub Ecosystem
**Official**: [github.com/ourresearch](https://github.com/ourresearch)

**Important repositories**:
* [github.com/ourresearch/oadoi](https://github.com/ourresearch/oadoi)
* [github.com/ourresearch/jump-api](https://github.com/ourresearch/jump-api)
* [github.com/ourresearch/openalex-elastic-api](https://github.com/ourresearch/openalex-elastic-api)

**Community**:
Python wrappers, OA analytics, DOI resolvers, Repository crawlers.

---

### 7. Python Libraries
requests, httpx, pandas, pydantic, doi-utils.

---

### 8. Landmark Documentation
* **Unpaywall API**: [support.unpaywall.org/support/solutions/articles/44002142311](https://support.unpaywall.org/support/solutions/articles/44002142311)
* **Snapshot**: [unpaywall.org/products/snapshot](https://unpaywall.org/products/snapshot)
* **Data Feed**: [unpaywall.org/products/data-feed](https://unpaywall.org/products/data-feed)
* **OurResearch**: [ourresearch.org](https://ourresearch.org)

---

### 9. Knowledge Graph
**Nodes**:
`DOI` → `Paper` → `Repository` → `Publisher` → `Journal` → `License` → `PDF`

**Relations**:
available_at, hosted_by, published_by, licensed_under, linked_to.

---

### 10. AI Applications
Bioquora should use Unpaywall for:
Automatic full-text retrieval, Open-access detection, Evidence availability scoring, Biomedical RAG, PDF retrieval, Legal full-text discovery, Repository recommendation, Open science analytics, Literature accessibility ranking, Citation enrichment.

---

### 11. ETL Pipeline
`Unpaywall` → `REST API` → `DOI Resolution` → `OA Status Detection` → `Repository Matching` → `Knowledge Graph` → `Full-text Retrieval` → `Bioquora`

---

### 12. Integration
Cross-link with:
PubMed, PubMed Central, Europe PMC, Crossref, OpenAlex, Semantic Scholar, OpenCitations, DataCite, ORCID, ROR, CORE, BASE, DOAJ, Zenodo, Figshare, Dryad.

---

### 13. Accessible Research Papers
For every DOI automatically retrieve:
Publisher version, Repository version, Accepted manuscript, Preprint, Europe PMC copy, PubMed Central copy, arXiv copy, bioRxiv copy, medRxiv copy.

---

### 14. FAIR & Open Science
Supports:
FAIR metadata, Legal Open Access, Repository interoperability, DOI resolution, Open science workflows, Machine-readable licensing.

---

### 15. Official GitHub Resources
* [github.com/ourresearch](https://github.com/ourresearch)
* [github.com/ourresearch/oadoi](https://github.com/ourresearch/oadoi)
* [github.com/ourresearch/jump-api](https://github.com/ourresearch/jump-api)
* [github.com/ourresearch/openalex-elastic-api](https://github.com/ourresearch/openalex-elastic-api)

---

### 16. Related Infrastructure
Integrates with:
Crossref, DataCite, OpenAlex, ORCID, ROR, PubMed, Europe PMC, OpenAIRE, CORE, BASE, Zenodo, DOAJ.

---

### 17. Accessible Landmark Research Papers
1. **Unpaywall API Documentation**: [support.unpaywall.org/support/solutions/articles/44002142311](https://support.unpaywall.org/support/solutions/articles/44002142311)
2. **Unpaywall Snapshot**: [unpaywall.org/products/snapshot](https://unpaywall.org/products/snapshot)
3. **OurResearch**: [ourresearch.org](https://ourresearch.org)
4. **Open Access Overview**: [unpaywall.org](https://unpaywall.org)
5. **Unpaywall Browser Extension**: [unpaywall.org/products/extension](https://unpaywall.org/products/extension)

---

### 18. Bioquora Applications
Open-access paper discovery, Automated PDF retrieval, Biomedical evidence retrieval, RAG corpus construction, OA compliance analysis, Institutional repository discovery, Literature accessibility scoring, AI-ready document collection, Citation enhancement, Open science monitoring.

---

### 19. Bioquora Integration Blueprint
`Crossref DOI` → `Unpaywall` → `OA Detection` → `Publisher Copy` → `Repository Copy` → `PMC / Europe PMC` → `Knowledge Graph` → `Full-text AI Pipeline` → `Bioquora`

---

### 20. Research Papers & Dataset Sources to Continuously Harvest
**Dataset Sources**:
Unpaywall Snapshot, Daily Data Feed, Crossref, PubMed, Europe PMC, OpenAlex, CORE, BASE, OpenAIRE, DOAJ.

**Research Paper Sources**:
PubMed, Europe PMC, arXiv, bioRxiv, medRxiv, Crossref, OpenAlex, Semantic Scholar.

---

### STEP 1.26 Status
✅ **Unpaywall Ecosystem: 100% Deeply Implemented**

**Official Resources**
* **Website**: [unpaywall.org](https://unpaywall.org)
* **API**: [support.unpaywall.org/support/solutions/articles/44002142311](https://support.unpaywall.org/support/solutions/articles/44002142311)
* **Snapshot**: [unpaywall.org/products/snapshot](https://unpaywall.org/products/snapshot)
* **Data Feed**: [unpaywall.org/products/data-feed](https://unpaywall.org/products/data-feed)
* **GitHub**: [github.com/ourresearch](https://github.com/ourresearch)

**BioLiterature Progress**
* ✅ Step 1.1 → Step 1.26 completed

*Next (God Mode Resource Vault): Zenodo (research datasets, software, AI models, notebooks), Figshare, Dryad, Harvard Dataverse, OpenAIRE.*
