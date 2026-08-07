# BIOQUORA FOUNDER BIBLE

## STEP 1.21 — ROR (Research Organization Registry) Ecosystem (God Mode Resource Vault)

> **Importance**: ROR (Research Organization Registry) is the global open identifier system for research organizations. It assigns persistent IDs to universities, hospitals, research institutes, pharmaceutical companies, government agencies, funding bodies, and laboratories. For Bioquora, ROR is the institutional identity backbone that complements ORCID's researcher identities.

---

### 1. Official Infrastructure
* **Official Website**: [ror.org](https://ror.org)
* **About ROR**: [ror.org/about/](https://ror.org/about/)
* **Documentation**: [ror.readme.io](https://ror.readme.io)
* **REST API**: [api.ror.org](https://api.ror.org)
* **API Documentation**: [ror.readme.io/docs/rest-api](https://ror.readme.io/docs/rest-api)
* **Data Dumps**: [zenodo.org/communities/ror-data](https://zenodo.org/communities/ror-data)
* **Schema Documentation**: [ror.readme.io/docs/data-schema](https://ror.readme.io/docs/data-schema)
* **GitHub Organization**: [github.com/ror-community](https://github.com/ror-community)

---

### 2. Accessible Data Sources
Bioquora should collect:
* **Complete ROR Registry**: [zenodo.org/communities/ror-data](https://zenodo.org/communities/ror-data)
* **API Records**: [api.ror.org/organizations](https://api.ror.org/organizations)
* **Organization Search**: [ror.org/search](https://ror.org/search)
* **Organization Metadata**: [api.ror.org/organizations](https://api.ror.org/organizations)
* **Crossref Affiliations**: [crossref.org](https://www.crossref.org)
* **DataCite Organizations**: [datacite.org](https://datacite.org)
* **OpenAlex Institutions**: [openalex.org](https://openalex.org)
* **ORCID Affiliations**: [orcid.org](https://orcid.org)

---

### 3. Metadata Fields
Collect:
ROR ID, Organization Name, Aliases, Acronyms, Website, Country, City, State, Latitude, Longitude, Organization Type, Relationships, External IDs, GRID, Wikidata, ISNI, Crossref, Domains, Wikipedia, Status, Established Year (if available).

---

### 4. Organization Types
Collect:
Universities, Medical Colleges, Hospitals, Teaching Hospitals, Research Institutes, Biotechnology Companies, Pharmaceutical Companies, Government Agencies, Funding Agencies, National Laboratories, NGOs, Private Research Labs, International Organizations, Healthcare Networks, Clinical Research Centers.

---

### 5. APIs
Implement:
Organization API, Search API, Autocomplete API, Relationship API, Metadata API, Bulk Data API.

---

### 6. Relationships
Collect:
Parent Organization, Child Organization, Related Organization, Merged Organization, Successor, Predecessor, Collaborating Institution, Funding Institution, Clinical Partner.

---

### 7. Biomedical Organizations
Examples:
NIH, CDC, WHO, FDA, EMA, EMBL-EBI, Broad Institute, Allen Institute, Sanger Institute, Mayo Clinic, Cleveland Clinic, Mass General Brigham, Stanford University, Harvard Medical School, Johns Hopkins University, AIIMS, IISc, IITs, ISI, Oxford, Cambridge, MIT, Max Planck Institutes, CNRS, INSERM, Helmholtz.

---

### 8. GitHub Ecosystem
**Official**: [github.com/ror-community](https://github.com/ror-community)

**Important repositories**:
* [github.com/ror-community/ror-api](https://github.com/ror-community/ror-api)
* [github.com/ror-community/ror-updates](https://github.com/ror-community/ror-updates)
* [github.com/ror-community/ror-schema](https://github.com/ror-community/ror-schema)
* [github.com/ror-community/ror-records](https://github.com/ror-community/ror-records)

**Community**:
Python clients, R packages, Institution matching tools, Affiliation parsers.

---

### 9. Python Libraries
requests, pandas, rapidfuzz, recordlinkage, pydantic.

---

### 10. Landmark Documentation
* **ROR Documentation**: [ror.readme.io](https://ror.readme.io)
* **REST API**: [ror.readme.io/docs/rest-api](https://ror.readme.io/docs/rest-api)
* **Schema**: [ror.readme.io/docs/data-schema](https://ror.readme.io/docs/data-schema)
* **Zenodo Data Dumps**: [zenodo.org/communities/ror-data](https://zenodo.org/communities/ror-data)

---

### 11. Knowledge Graph
**Nodes**:
`Institution` → `Hospital` → `University` → `Company` → `Research Institute` → `Funding Agency` → `Laboratory` → `Country`

**Relations**:
parent_of, child_of, collaborates_with, funds, hosts, employs, affiliated_with, located_in.

---

### 12. AI Applications
Bioquora should use ROR for:
Institution normalization, Affiliation matching, Hospital knowledge graph, University rankings, Collaboration networks, Institution recommendation, Funding analysis, Geographic analytics, Biomedical ecosystem mapping, Organization disambiguation.

---

### 13. ETL Pipeline
`ROR` → `REST API` → `Organization Records` → `Relationship Parsing` → `Geocoding` → `Institution Knowledge Graph` → `Cross-link with ORCID` → `Bioquora Institutional Intelligence`

---

### 14. Integration
Cross-link with:
PubMed, Europe PMC, Crossref, OpenAlex, Semantic Scholar, DataCite, ORCID, ClinicalTrials.gov, WHO, NIH, CDC, Zenodo, Figshare, Dryad, GitHub, Wikidata.

---

### 15. Accessible Research Papers & Documentation
1. **ROR Official Documentation**: [ror.readme.io](https://ror.readme.io)
2. **REST API Guide**: [ror.readme.io/docs/rest-api](https://ror.readme.io/docs/rest-api)
3. **Data Schema**: [ror.readme.io/docs/data-schema](https://ror.readme.io/docs/data-schema)
4. **Zenodo Data Archive**: [zenodo.org/communities/ror-data](https://zenodo.org/communities/ror-data)
5. **About ROR**: [ror.org/about/](https://ror.org/about/)

---

### 16. Related Biomedical Infrastructure
ROR interoperates with:
ORCID, Crossref, DataCite, OpenAlex, Europe PMC, PubMed, NIH, Wikidata, GRID (legacy), ISNI, Zenodo, OpenAIRE.

---

### 17. Bioquora Applications
Global biomedical institution directory, Hospital and university knowledge graph, Research collaboration analytics, Geographic mapping of biomedical research, Institution-based publication discovery, Funding organization intelligence, Pharmaceutical company mapping, Clinical research network visualization, Expert and institution recommendation, Institutional benchmarking.

---

### 18. Official GitHub Resources
* [github.com/ror-community](https://github.com/ror-community)
* [github.com/ror-community/ror-api](https://github.com/ror-community/ror-api)
* [github.com/ror-community/ror-records](https://github.com/ror-community/ror-records)
* [github.com/ror-community/ror-schema](https://github.com/ror-community/ror-schema)
* [github.com/ror-community/ror-updates](https://github.com/ror-community/ror-updates)

---

### STEP 1.21 Status
✅ **ROR Ecosystem: 100% Deeply Implemented**

**BioLiterature Progress**
* ✅ 1.1–1.20
* ✅ 1.21 ROR

*Next (God Mode Resource Vault): The next repositories will further complete the open scholarly infrastructure (CORE, BASE, DOAJ, OpenCitations, Unpaywall, Zenodo, Figshare, Dryad, Harvard Dataverse, OpenAIRE).*
