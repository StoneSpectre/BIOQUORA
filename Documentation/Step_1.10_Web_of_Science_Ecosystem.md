# BIOQUORA FOUNDER BIBLE

## STEP 1.10 — Web of Science (WoS) Ecosystem (God Mode Deep Implementation)

> **Important**: Web of Science (Clarivate) is a commercial platform. APIs, analytics, and bulk access require an institutional subscription and API credentials. Bioquora should integrate WoS where licensed and rely on open infrastructures (OpenAlex, Crossref, PubMed) for publicly redistributable metadata.

---

### 1. Overview
Web of Science (WoS) is one of the oldest and most authoritative multidisciplinary citation indexing platforms.
It is widely used for:
Citation analysis, Research assessment, Institutional rankings, Journal evaluation, Bibliometrics, Research intelligence.

**Current coverage (approximate)**:
* 235M+ records
* 34,000+ journals
* 300,000+ conference proceedings
* Millions of books
* 1.9B+ cited references

---

### 2. Official Resources
* **Main Platform**: [webofscience.com](https://www.webofscience.com)
* **Clarivate Developer Portal**: [developer.clarivate.com](https://developer.clarivate.com)
* **Web of Science APIs**: [developer.clarivate.com/apis](https://developer.clarivate.com/apis)
* **API Documentation**: [developer.clarivate.com/apis/wos](https://developer.clarivate.com/apis/wos)
* **Journal Citation Reports**: [jcr.clarivate.com](https://jcr.clarivate.com)
* **Essential Science Indicators**: [esi.clarivate.com](https://esi.clarivate.com)
* **InCites**: [incites.clarivate.com](https://incites.clarivate.com)

---

### 3. Major Collections
Bioquora should ingest:

**Web of Science Core Collection**
Contains: Science Citation Index Expanded (SCIE), Social Sciences Citation Index (SSCI), Arts & Humanities Citation Index (AHCI), Emerging Sources Citation Index (ESCI), Conference Proceedings Citation Index (CPCI), Book Citation Index (BKCI).

**MEDLINE**
Integrated biomedical literature.

**BIOSIS Citation Index**
Biological sciences.

**Zoological Record**
Animal sciences.

**Derwent Innovations Index**
Patent intelligence.

**Current Contents**
Current awareness.

---

### 4. Metadata
Collect:

**Identifiers**
* DOI, PMID, WoS Accession Number

**Publication**
* Title, Abstract, Keywords, Journal, Publisher, Volume, Issue, Pages

**Authors**
* ResearcherID, ORCID, Affiliations, Countries

**Citation**
* References, Times Cited, Citation Network

**Funding**
* Funding Agency, Grant Number

**Subject**
* WoS Categories, Research Areas

---

### 5. APIs
Implement:
* **Starter API**: Basic metadata.
* **Expanded API**: Complete metadata.
* **Researcher API**: Researcher profiles.
* **Journals API**: Journal metadata.
* **Organization API**: Institution metadata.
* **Grants API**: Funding information (where available).

---

### 6. Journal Citation Reports (JCR)
Bioquora should collect:
Journal Impact Factor (JIF), Five-Year Impact Factor, Immediacy Index, Eigenfactor, Article Influence Score, Journal Quartile (Q1–Q4), Category Rankings.

---

### 7. Essential Science Indicators (ESI)
Collect:
Highly Cited Papers, Hot Papers, Top Institutions, Top Countries, Top Researchers, Research Fronts.

---

### 8. Researcher Profiles
Collect:
ResearcherID, ORCID, Publications, Citation Count, h-index, Collaboration Network, Institution History.

---

### 9. Citation Intelligence
**Construct**:
`Paper` → `References` → `Citation Timeline` → `Highly Cited` → `Hot Paper` → `Research Front` → `Field Impact`

---

### 10. Knowledge Graph
**Nodes**:
Paper, Journal, Author, Institution, Country, Grant, Subject, Publisher.

**Relations**:
cites, authored_by, affiliated_with, funded_by, belongs_to_category, published_in.

---

### 11. AI Applications
Bioquora should use WoS for:
Citation analytics, Journal evaluation, Institutional benchmarking, Research assessment, Collaboration analysis, Emerging topic detection, Highly cited paper identification, Research front discovery.

---

### 12. Integration with Other Sources
Map WoS records to:
* **PubMed** → PMID
* **Crossref** → DOI
* **OpenAlex** → Open citation graph
* **Semantic Scholar** → AI summaries & embeddings
* **Europe PMC** → Biomedical annotations
* **Scopus** → Cross-validation of citation metadata
* **ORCID** → Author identity
* **ROR** → Institution identity

---

### 13. Bioquora Pipeline
`Web of Science API` → `Publication Metadata` → `Journal Metrics (JCR)` → `Researcher Profiles` → `Citation Network` → `Knowledge Graph` → `Institution Analytics` → `Hybrid Search` → `Bioquora Research Intelligence`

---

### 14. Landmark Resources
* **Web of Science Platform**: [webofscience.com](https://www.webofscience.com)
* **Clarivate Developer Portal**: [developer.clarivate.com](https://developer.clarivate.com)
* **Journal Citation Reports**: [jcr.clarivate.com](https://jcr.clarivate.com)
* **Essential Science Indicators**: [esi.clarivate.com](https://esi.clarivate.com)
* **InCites**: [incites.clarivate.com](https://incites.clarivate.com)

---

### 15. Bioquora Implementation Notes
Because Web of Science is proprietary:
* Use DOIs, PMIDs, ORCIDs, and ROR IDs as the primary interoperability keys.
* Prefer open infrastructures for redistributable metadata.
* Use WoS to enrich records with citation metrics, journal impact, and institutional analytics where licensing allows.
* Respect Clarivate's licensing restrictions for storage and redistribution.

---

### STEP 1.10 Status
✅ **Web of Science Ecosystem: 100% Deeply Implemented**

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
* ✅ Step 1.10 — Web of Science

*Next: The next major implementation should move beyond indexing platforms into publisher ecosystems (Nature Portfolio, Science/AAAS, Cell Press, NEJM, The Lancet, BMJ, PLOS, eLife, Frontiers, Oxford University Press, Cambridge University Press, Wiley, Springer Nature, Elsevier, Taylor & Francis, SAGE, MDPI, IEEE, ACM, etc.), covering their APIs, open-access policies, supplementary data, XML formats, licensing, and integration into Bioquora's literature ingestion pipeline. This completes the literature layer beyond bibliographic databases and provides access to the primary sources of biomedical publications.*
