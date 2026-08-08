# BIOQUORA FOUNDER BIBLE

## STEP 2.3 — NCBI BioProject (God Mode Resource Vault)

> **Importance**: NCBI BioProject is the master organizational database that connects nearly every major NCBI resource. It links SRA, GEO, BioSample, Assembly, GenBank, ClinVar, dbGaP, RefSeq, Gene, PubMed, and many other resources under a single research project. For Bioquora, BioProject is the root node of the biomedical knowledge graph.

---

### 1. Official Infrastructure
* **Official BioProject Portal**: [ncbi.nlm.nih.gov/bioproject](https://www.ncbi.nlm.nih.gov/bioproject)
* **Documentation**: [ncbi.nlm.nih.gov/bioproject/docs](https://www.ncbi.nlm.nih.gov/bioproject/docs)
* **NCBI Handbook**: [ncbi.nlm.nih.gov/books/NBK54015](https://www.ncbi.nlm.nih.gov/books/NBK54015)
* **Entrez Programming Utilities**: [ncbi.nlm.nih.gov/books/NBK25501](https://www.ncbi.nlm.nih.gov/books/NBK25501)
* **NCBI Datasets**: [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)
* **FTP Download**: [ftp.ncbi.nlm.nih.gov/bioproject](https://ftp.ncbi.nlm.nih.gov/bioproject)
* **GitHub**: [github.com/ncbi](https://github.com/ncbi)

---

### 2. BioProject Record Types
Harvest every project.
* **Research Projects**: Examples include Cancer Genome Atlas, Human Cell Atlas, Human Microbiome Project, ENCODE, GTEx, Earth BioGenome, COVID sequencing.
* **Umbrella Projects**: Large consortium projects (Examples: NIH Consortia, International Cancer Genome Consortium, Human Pangenome).
* **Submission Projects**: Individual laboratory submissions.
* **Consortium Projects**: International collaborations.

---

### 3. Biomedical Domains
Harvest:
Cancer, Genomics, Transcriptomics, Proteomics, Epigenomics, Metabolomics, Microbiome, Single-cell, Spatial Biology, Medical Imaging, Drug Discovery, Clinical Research, Population Genetics, Rare Diseases, Immunology, Virology, Neuroscience, Plant Genomics, Microbial Genomics.

---

### 4. Metadata (Collect EVERYTHING)
Project ID (PRJNA / PRJEB / PRJDB), Title, Description, Organism, Taxonomy, Submitter, Institution, Country, Funding, Project Type, Scope, Target, Publication, PMID, PMCID, DOI, Associated SRA, Associated BioSample, Associated GEO, Associated Assembly, Associated Gene, Associated ClinVar, Associated dbGaP, Associated GenBank, Release Date, Update Date, Consortium, Grant.

---

### 5. Connected Databases
Every BioProject should automatically resolve links to:
`BioSample` → `SRA` → `GEO` → `Assembly` → `GenBank` → `RefSeq` → `Gene` → `ClinVar` → `dbGaP` → `PubMed` → `PMC` → `Taxonomy` → `Protein` → `Genome` → `Protein Structures`

---

### 6. APIs
Implement:
Entrez E-utilities, NCBI Datasets API, FTP Metadata, JSON, XML, ASN.1.

---

### 7. Bulk Downloads
Harvest:
Project metadata, XML, JSON, FTP, Entrez export, Project summaries, Cross-reference tables.

---

### 8. GitHub Ecosystem
**Official**: [github.com/ncbi](https://github.com/ncbi)

**Major repositories**:
* [github.com/ncbi/datasets](https://github.com/ncbi/datasets)
* [github.com/ncbi/sra-tools](https://github.com/ncbi/sra-tools)
* [github.com/ncbi/edirect](https://github.com/ncbi/edirect)
* [github.com/biopython/biopython](https://github.com/biopython/biopython)
* [github.com/saketkc/pysradb](https://github.com/saketkc/pysradb)
* [github.com/guma44/GEOparse](https://github.com/guma44/GEOparse)

---

### 9. Python Ecosystem
Biopython, NCBI Datasets CLI, requests, pandas, polars, lxml, xmltodict, networkx, rdflib, pydantic.

---

### 10. Landmark Research Papers
Automatically index:
BioProject database paper, NCBI database update papers, NCBI Resources papers, Entrez Programming Utilities papers, NCBI Datasets papers, Annual Nucleic Acids Research Database Issue articles.

---

### 11. Knowledge Graph
**Nodes**:
`BioProject` → `BioSample` → `SRA` → `GEO` → `Assembly` → `Gene` → `Protein` → `Publication` → `Institution` → `Grant`

**Relations**:
contains, submitted_by, linked_to, published_as, funded_by, derived_from, studies, hosts.

---

### 12. AI Applications
Bioquora should use BioProject for:
Multi-database discovery, Cross-resource navigation, Biomedical project recommendation, Consortium analysis, Disease project mapping, GraphRAG, Multi-omics integration, Research lineage tracking, Biomedical trend analysis, Project similarity search.

---

### 13. ETL Pipeline
`BioProject` → `Entrez API` → `Project Metadata` → `Cross References` → `SRA / GEO / BioSample` → `Knowledge Graph` → `Embeddings` → `Bioquora Project Intelligence`

---

### 14. Cross-Link Every Project
Automatically connect with:
BioSample, SRA, GEO, Assembly, Gene, RefSeq, GenBank, ClinVar, dbGaP, GTEx, TCGA, ENCODE, Human Cell Atlas, PubMed, PMC, OpenAlex, Crossref, ORCID, ROR, Zenodo.

---

### 15. High-Value BioProjects
Continuously prioritize:
Human Cell Atlas, TCGA, GTEx, ENCODE, Human Microbiome Project, Human Pangenome Reference Consortium, All of Us Research Program, Earth BioGenome Project, Cancer Moonshot, Human Biomolecular Atlas Program (HuBMAP), International Cancer Genome Consortium (ICGC), Human Proteome Project.

---

### 16. Bioquora Applications
Biomedical project explorer, Consortium intelligence dashboard, Cross-database search engine, Multi-omics navigator, Disease project atlas, Biomedical collaboration graph, Funding intelligence, Research impact analysis, AI-ready project corpus, Knowledge graph backbone.

---

### 17. Continuous Harvest Strategy
**Hourly**:
New BioProjects.

**Daily**:
Metadata updates, Linked SRA updates, Linked BioSample updates.

**Weekly**:
GEO synchronization, PubMed synchronization, Assembly synchronization.

**Monthly**:
Full project graph rebuild, Entity normalization, Duplicate detection, Cross-reference validation.

---

### 18. Bioquora Integration Blueprint
`BioProject` → `BioSample` → `SRA` → `GEO` → `Assembly` → `Gene` → `Knowledge Graph` → `Embeddings` → `Bioquora Biomedical Intelligence Platform`

---

### 19. Additional High-Value Resources
**APIs & CLI**:
NCBI Datasets CLI, Entrez Direct (EDirect), Biopython Entrez, NCBI Cloud APIs.

**Supporting Resources**:
Genome Data Viewer, Sequence Viewer, Taxonomy Browser, BLAST, NCBI Gene, NCBI Protein, NCBI Assembly.

---

### 20. Future Linked Resources
Every BioProject should automatically resolve and cache:
Raw sequencing files, Processed expression matrices, Variant files, Protein sequences, Genome assemblies, Clinical annotations, Publications, Supplementary datasets, GitHub repositories mentioned in papers, Zenodo archives, Hugging Face biomedical datasets (when available), Papers with Code implementations (for AI-related projects).

---

### STEP 2.3 Status
✅ **NCBI BioProject Ecosystem — God Mode Implementation Complete**

**Official Resources**
* **Portal**: [ncbi.nlm.nih.gov/bioproject](https://www.ncbi.nlm.nih.gov/bioproject)
* **Documentation**: [ncbi.nlm.nih.gov/bioproject/docs](https://www.ncbi.nlm.nih.gov/bioproject/docs)
* **NCBI Handbook**: [ncbi.nlm.nih.gov/books/NBK54015](https://www.ncbi.nlm.nih.gov/books/NBK54015)
* **Entrez API**: [ncbi.nlm.nih.gov/books/NBK25501](https://www.ncbi.nlm.nih.gov/books/NBK25501)
* **Datasets**: [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)
* **FTP**: [ftp.ncbi.nlm.nih.gov/bioproject](https://ftp.ncbi.nlm.nih.gov/bioproject)

---

*Next (STEP 2.4): NCBI BioSample.*
