# BIOQUORA FOUNDER BIBLE

## STEP 1.5 — Crossref Ecosystem (God Mode Deep Implementation)

### 1. Overview
Crossref is the world's largest DOI Registration Agency for scholarly publications. It provides persistent identifiers (DOIs) and rich metadata for journal articles, books, conference proceedings, datasets, reports, preprints, and more. It is one of the core infrastructure services underpinning scholarly publishing.

### 2. Official Resources
* **Main Website**: [Crossref](https://crossref.org/)
* **REST API**: [Crossref REST API](https://api.crossref.org/)
* **REST Documentation**: [REST API Documentation](https://support.crossref.org/hc/en-us/articles/214320426-REST-API)
* **API Explorer (Swagger)**: [Swagger API Explorer](https://api.crossref.org/)
* **Event Data**: [Crossref Event Data](https://www.eventdata.crossref.org/guide/service/query-api/)
* **Access & Authentication**: [API Authentication Guide](https://crossref.org/documentation/retrieve-metadata/rest-api/access-and-authentication/)

---

### 3. What Crossref Contains
Crossref metadata includes:
Journal articles, Books, Book chapters, Conference proceedings, Datasets, Reports, Standards, Preprints, Peer reviews, Components, Grants (linked through deposited metadata), Licenses, References, ORCID IDs, ROR identifiers, Retraction information, Publisher metadata.

*It aggregates metadata deposited directly by publishers and trusted sources.*

---

### 4. Core Metadata Fields
For every DOI, Bioquora should extract:

**Identifiers**
* DOI, URL, ISSN, ISBN, Publisher ID

**Publication**
* Title, Subtitle, Abstract (when available), Journal, Publisher, Volume, Issue, Pages, Publication Date, Type

**Authors**
* Full Name, ORCID, Affiliations, Sequence (first/additional)

**Licensing**
* License URL, License Start Date, Open Access information

**Funding**
* Funder Name, Funder DOI, Grant Number

**References**
* Full reference list, DOI links, Citation count (where available)

**Additional**
* Clinical Trial links, Update history, Retractions, Corrections, Similar works

---

### 5. REST API Endpoints
* **Works**: `/works` (Search publications)
* **Single DOI**: `/works/{doi}` (Retrieve complete metadata for one publication)
* **Journals**: `/journals`
* **Members**: `/members` (Publishers and organizations)
* **Funders**: `/funders` (Funding organizations)
* **Prefixes**: `/prefixes` (DOI owner prefixes)
* **Licenses**: `/licenses`
* **Types**: `/types` (Document types)

*The REST API supports filtering, field-specific queries, sorting, cursor-based pagination for large result sets, and facets.*

---

### 6. Search Features
Support searching by:
DOI, Author, ORCID, Title, Journal, Publisher, ISSN, ISBN, Funder, License, Publication Date, Subject, Award Number.

---

### 7. Crossmark
Crossmark provides update information for publications.

**Track**:
Corrections, Errata, Retractions, Expression of concern, Updated versions.

*This allows Bioquora to surface the current status of scientific literature instead of relying on static records.*

---

### 8. Crossref Event Data
One of Crossref's most valuable services.
* **Official**: [Crossref Event Data Guide](https://www.eventdata.crossref.org/guide/service/query-api/)

**Collect events such as**:
Wikipedia citations, Data repository links, Blog mentions, News mentions, Scholix links, Social media events, DOI relationships.

*Supports filters by DOI, date, source, and relation type.*

---

### 9. Citation Graph
**Construct**:
`Paper A` → `Cites` → `Paper B`

**Also generate**:
* Citation graph
* Co-citation graph
* Bibliographic coupling
* DOI network
* Journal citation network

*For expanded open DOI-to-DOI citation relationships, integrate COCI (OpenCitations Index of Crossref open citations).*

---

### 10. Knowledge Graph
**Nodes**:
DOI, Paper, Journal, Publisher, Author, Institution, Funder, Grant, License.

**Relations**:
cites, funded_by, published_by, has_license, updated_by, references, authored_by.

---

### 11. AI Applications
Crossref should support:
* DOI resolution
* Citation intelligence
* Literature deduplication
* Publisher analytics
* Funding analysis
* Open-access detection
* Knowledge graph enrichment
* Research impact analysis
* Semantic search
* Bibliometric analytics

---

### 12. Landmark Resources
* **REST API**: [Crossref REST API Documentation](https://support.crossref.org/hc/en-us/articles/214320426-REST-API)
* **Swagger Explorer**: [API Explorer](https://api.crossref.org/)
* **Event Data**: [Event Data User Guide](https://www.eventdata.crossref.org/guide/service/query-api/)
* **Open Citation Graph**: COCI (OpenCitations Index of Crossref DOI-to-DOI citations)

---

### 13. Open Source & Libraries
**Useful libraries**:
* **Python**: `habanero` (Crossref client), `crossrefapi`
* **R**: `rcrossref`

*These libraries wrap the REST API and simplify metadata retrieval.*

---

### 14. Integration into Bioquora
**Pipeline**:
`Crossref REST API` → `DOI Resolution` → `Metadata Normalization` → `Reference Parsing` → `Citation Graph` → `Funding Graph` → `Publisher Graph` → `Knowledge Graph` → `Embeddings` → `Hybrid Biomedical Search`

---

### 15. Why Crossref is Critical
Crossref acts as Bioquora's DOI backbone. It enables:
* Persistent identification of publications.
* High-quality publisher metadata.
* Linking publications with funders, licenses, and ORCID profiles.
* Tracking corrections, retractions, and updates.
* Building a global citation and publisher graph.
* Connecting PubMed, Europe PMC, OpenAlex, DataCite, and other scholarly ecosystems through shared DOI infrastructure.

---

### STEP 1.5 Status
✅ **Crossref Ecosystem: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1 — PubMed
* ✅ Step 1.2 — PubMed Central (PMC)
* ✅ Step 1.3 — Europe PMC
* ✅ Step 1.4 — OpenAlex
* ✅ Step 1.5 — Crossref

*Next: Step 1.6 — Semantic Scholar, covering the Semantic Scholar Academic Graph (S2AG), APIs, embeddings, citation intelligence, influential citation metrics, author graph, recommendations, and AI-powered scholarly discovery.*
