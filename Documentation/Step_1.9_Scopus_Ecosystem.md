# BIOQUORA FOUNDER BIBLE

## STEP 1.9 — Scopus Ecosystem (God Mode Deep Implementation)

> **Important**: Scopus is a commercial database owned by Elsevier. Most APIs and bulk metadata require an institutional subscription and an Elsevier Developer API key. Bioquora should integrate Scopus only where licensing permits and complement it with open sources like OpenAlex, PubMed, and Crossref.

---

### 1. Overview
Scopus is one of the world's largest abstract and citation databases for peer-reviewed literature.

**It covers**:
Journal Articles, Conference Proceedings, Books, Book Chapters, Reviews, Editorials, Letters, Data Papers.

**Current scale (approximate)**:
* 96M+ records
* 29,000+ active serial titles
* 7,000+ publishers
* 18,000+ institutions
* 194M+ cited references
* Coverage from 1788 to present (with varying depth)

---

### 2. Official Resources
* **Main Platform**: [scopus.com](https://www.scopus.com)
* **Elsevier Developer Portal**: [dev.elsevier.com](https://dev.elsevier.com)
* **Scopus APIs**: [dev.elsevier.com/api_docs.html](https://dev.elsevier.com/api_docs.html)
* **API Documentation**: [dev.elsevier.com/sc_apis.html](https://dev.elsevier.com/sc_apis.html)
* **API Key Registration**: [dev.elsevier.com/apikey/manage](https://dev.elsevier.com/apikey/manage)

---

### 3. Major Collections
Bioquora should ingest (subject to licensing):

**Publications**
Research Articles, Reviews, Conference Papers, Books, Chapters, Data Papers, Short Surveys, Notes, Letters.

**Authors**
Collect: Scopus Author ID, ORCID, Name, Affiliations, h-index, Publication Count, Citation Count, Co-authors.

**Institutions**
Collect: Affiliation ID, Institution Name, Country, Departments, Publications, Collaboration Network.

**Journals**
Collect: ISSN, eISSN, Publisher, Subject Categories, CiteScore, SNIP, SJR.

---

### 4. Metadata
For every publication extract:

**Identifiers**
* DOI, PMID (if available), Scopus EID, PII

**Bibliographic**
* Title, Abstract, Keywords, Publication Date, Volume, Issue, Pages, Language

**Authors**
* Names, ORCID, Institutions, Countries

**Citation**
* References, Citation Count, Self-citations, Citation History

**Subject Classification**
* ASJC Codes, Subject Areas, Keywords

**Funding**
* Funding Agency, Grant Number, Sponsor

---

### 5. APIs
* **Scopus Search API**: Search publications
* **Abstract Retrieval API**: Retrieve complete publication metadata
* **Author Retrieval API**: Retrieve author profiles
* **Author Search API**: Search authors
* **Affiliation Retrieval API**: Retrieve institution profiles
* **Affiliation Search API**: Institution search
* **Citation Overview API**: Citation timelines
* **Serial Title API**: Journal metadata

---

### 6. Research Metrics
Scopus provides:
* **CiteScore**: Journal impact metric
* **SJR**: SCImago Journal Rank
* **SNIP**: Source Normalized Impact per Paper
* **h-index**: Author productivity metric
* **Citation Count**: Paper influence
* **FWCI**: Field-weighted citation impact (available through some Elsevier products)

---

### 7. Search Capabilities
Search by:
DOI, PMID, Title, Abstract, Keywords, Author, ORCID, Institution, Funding, Grant, Journal, ISSN, Subject Area, Publication Year.

---

### 8. Knowledge Graph
**Nodes**:
Publication, Author, Institution, Journal, Publisher, Grant, Subject, Country.

**Relations**:
authored_by, affiliated_with, cites, funded_by, published_in, belongs_to_subject, collaborates_with.

---

### 9. AI Applications
Bioquora should use Scopus (where licensed) for:
* Citation analytics
* Institution benchmarking
* Collaboration mapping
* Journal analytics
* Subject trend analysis
* Author disambiguation
* Literature discovery
* Research impact analysis

---

### 10. Landmark Documentation
* **Scopus Content Coverage Guide**: [elsevier.com/products/scopus/content](https://www.elsevier.com/products/scopus/content)
* **Elsevier Developer Documentation**: [dev.elsevier.com](https://dev.elsevier.com)
* **Scopus Source List**: [elsevier.com/products/scopus/sources](https://www.elsevier.com/products/scopus/sources)

---

### 11. Integration Pipeline
`Scopus APIs` → `Publication Metadata` → `Author Profiles` → `Institution Profiles` → `Citation Analytics` → `Knowledge Graph` → `Research Metrics` → `Hybrid Search` → `Bioquora Intelligence Layer`

---

### 12. Cross-linking Strategy
Link Scopus records with:
* **PubMed** → PMID mapping
* **Crossref** → DOI verification
* **OpenAlex** → Open citation graph
* **Semantic Scholar** → AI summaries & embeddings
* **Europe PMC** → Biomedical annotations
* **ORCID** → Author identity
* **ROR** → Institution identity

---

### 13. Bioquora Implementation Notes
Because Scopus is proprietary:
* Use DOIs as the primary cross-reference key.
* Prefer OpenAlex, Crossref, and PubMed for openly redistributable metadata.
* Enrich records with Scopus metrics only where your institution or organization has appropriate access.
* Do not redistribute proprietary Scopus metadata outside the terms of your license.

---

### STEP 1.9 Status
✅ **Scopus Ecosystem: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1 — PubMed
* ✅ Step 1.2 — PubMed Central (PMC)
* ✅ Step 1.3 — Europe PMC
* ✅ Step 1.4 — OpenAlex
* ✅ Step 1.5 — Crossref
* ✅ Step 1.6 — Semantic Scholar
* ✅ Step 1.7 — Lens.org
* ✅ Step 1.8 — Dimensions
* ✅ Step 1.9 — Scopus

*Next: Step 1.10 — Web of Science (Clarivate) Ecosystem, covering Web of Science Core Collection, InCites, Journal Citation Reports, Essential Science Indicators, Researcher Profiles, APIs, citation indexing, and integration into Bioquora's literature intelligence layer.*
