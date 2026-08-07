# BIOQUORA FOUNDER BIBLE

## STEP 1.4 — OpenAlex Ecosystem (God Mode Deep Implementation)

### 1. Overview
OpenAlex is the world's largest open scholarly knowledge graph, created by OurResearch as the successor to the Microsoft Academic Graph (MAG). It connects scholarly works, authors, institutions, publishers, funders, topics, and citations into a single graph with hundreds of millions of entities and billions of relationships. It is available through a REST API and downloadable snapshots.

### 2. Official Resources
* **Main Website**: [openalex.org](https://openalex.org)
* **Developer Documentation**: [developers.openalex.org](https://developers.openalex.org)
* **API Documentation**: [developers.openalex.org/api-reference/introduction](https://developers.openalex.org/api-reference/introduction)
* **Data Download**: [developers.openalex.org/download/overview](https://developers.openalex.org/download/overview)
* **Snapshot Documentation**: [developers.openalex.org/download/snapshot-format](https://developers.openalex.org/download/snapshot-format)
* **Help Center**: [help.openalex.org](https://help.openalex.org)
* **API Keys**: [openalex.org/settings/api](https://openalex.org/settings/api)

---

### 3. Data Scale
Current OpenAlex contains approximately:
* 286M+ scholarly works
* 100M+ authors
* 100k+ institutions
* 100k+ publishers
* 100k+ sources (journals, repositories, conferences)
* Funders
* Topics
* Fields
* Domains
* Billions of citation relationships

*It is one of the largest openly available scholarly graphs.*

---

### 4. Entity Types
Bioquora should ingest every entity.

**Works**
Includes: Journal Articles, Books, Book Chapters, Datasets, Theses, Reports, Conference Papers, Preprints.

**Authors**
Collect: OpenAlex ID, ORCID, Display Name, Works, Institutions, h-index, Citation Count.

**Institutions**
Collect: ROR ID, GRID (legacy), Country, City, Homepage, Works, Researchers.

**Sources**
Collect: Journal, Repository, Conference, Publisher, ISSN, Open Access Status.

**Publishers**
Examples: Springer Nature, Elsevier, Wiley, PLOS, IEEE, ACM, Oxford University Press.

**Funders**
Examples: NIH, Wellcome Trust, European Commission, Gates Foundation.

**Topics**
Collect: Topic hierarchy, Related topics, Domain, Field, Subfield.
*(OpenAlex has moved from the older Concepts taxonomy to a newer Topics/Fields/Domains structure.)*

---

### 5. API Endpoints
* **Works**: `/works`
* **Authors**: `/authors`
* **Institutions**: `/institutions`
* **Sources**: `/sources`
* **Publishers**: `/publishers`
* **Funders**: `/funders`
* **Topics**: `/topics`
* **Domains**: `/domains`
* **Fields**: `/fields`
* **Subfields**: `/subfields`

*OpenAlex provides filtering, search, grouping, pagination, sampling, and lookup by DOI, PMID, ORCID, and ROR.*

---

### 6. Metadata to Extract

For every work collect:

**Identifiers**
* DOI, PMID, PMCID, OpenAlex ID

**Bibliographic**
* Title, Abstract, Publication Date, Language, Type

**Authorship**
* Authors, ORCID, Institutions, Countries

**Citation**
* Referenced Works, Cited By Count, Citation Graph

**Open Access**
* OA Status, License, Repository Copy, PDF URL (when available)

**Topics**
* Domain, Field, Subfield, Topic

*The API also exposes OA metadata such as license, OA locations, and repository copies.*

---

### 7. Snapshot
OpenAlex provides complete database snapshots.
* **Contains**: Works, Authors, Institutions, Topics, Publishers, Funders.
* **Format**: Stored as gzip-compressed JSON Lines in an Amazon S3 bucket.
* **Approximate size**: 330 GB compressed, 1.6 TB decompressed.
* **Updates**: Snapshots are updated quarterly for the public version.

---

### 8. Knowledge Graph
**Nodes**:
Work, Author, Institution, Publisher, Funder, Topic, Journal.

**Edges**:
authored_by, affiliated_with, cites, funded_by, published_in, belongs_to_topic.

---

### 9. AI Applications
OpenAlex is ideal for:
* Literature discovery
* Citation analysis
* Research trend detection
* Institutional rankings
* Collaboration networks
* Author recommendation
* Biomedical RAG
* Funding intelligence
* Scientific analytics
* Knowledge graph enrichment

---

### 10. Landmark Papers
* **OpenAlex (Foundational Paper)**: [arxiv.org/abs/2205.01833](https://arxiv.org/abs/2205.01833)
* **Reference Coverage Analysis**: [arxiv.org/abs/2401.16359](https://arxiv.org/abs/2401.16359)
* **Publication Type Analysis**: [arxiv.org/abs/2406.15154](https://arxiv.org/abs/2406.15154)

*These papers describe OpenAlex's design, coverage, and comparisons with Scopus, Web of Science, and PubMed.*

---

### 11. Integration into Bioquora
**Pipeline**:
`OpenAlex API` → `Metadata` → `Works` → `Authors` → `Institutions` → `Topics` → `Citation Graph` → `Knowledge Graph` → `Vector Embeddings` → `Research Analytics` → `Bioquora Intelligence Engine`

---

### 12. Why OpenAlex Matters
Unlike PubMed, which is biomedical-focused, OpenAlex provides a cross-disciplinary scholarly graph. For Bioquora, it enables:
* Linking biomedical papers to authors, institutions, and funders.
* Building collaboration and citation networks.
* Tracking research trends across medicine, biology, AI, chemistry, engineering, and public health.
* Enriching PubMed and Europe PMC records with open citation and institutional metadata.

---

### STEP 1.4 Status
✅ **OpenAlex: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ Step 1.1 — PubMed
* ✅ Step 1.2 — PubMed Central (PMC)
* ✅ Step 1.3 — Europe PMC
* ✅ Step 1.4 — OpenAlex

*Next: Step 1.5 — Crossref Ecosystem, where we'll deeply implement DOI infrastructure, Crossref REST API, Crossmark, Event Data, funding metadata, reference linking, similarity search, citation matching, and large-scale DOI graph construction.*
