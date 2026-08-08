# BIOQUORA FOUNDER BIBLE

## STEP 2.4 — NCBI BioSample (God Mode Resource Vault)

> **Importance**: NCBI BioSample is the biological foundation of nearly every experiment in the NCBI ecosystem. Every sequencing run (SRA), gene expression experiment (GEO), genome assembly, variation study, and clinical dataset originates from one or more BioSamples. For Bioquora, BioSample is the biological entity layer, connecting experimental data to real-world specimens.

---

### 1. Official Infrastructure
* **Official BioSample Portal**: [ncbi.nlm.nih.gov/biosample](https://www.ncbi.nlm.nih.gov/biosample)
* **BioSample Documentation**: [ncbi.nlm.nih.gov/biosample/docs](https://www.ncbi.nlm.nih.gov/biosample/docs)
* **BioSample Handbook**: [ncbi.nlm.nih.gov/books/NBK54014](https://www.ncbi.nlm.nih.gov/books/NBK54014)
* **Entrez Programming Utilities**: [ncbi.nlm.nih.gov/books/NBK25501](https://www.ncbi.nlm.nih.gov/books/NBK25501)
* **NCBI Datasets**: [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)
* **FTP Download**: [ftp.ncbi.nlm.nih.gov/biosample](https://ftp.ncbi.nlm.nih.gov/biosample)
* **GitHub**: [github.com/ncbi](https://github.com/ncbi)

---

### 2. BioSample Accessions
Harvest every accession type.
* **SAMN**: NCBI BioSample
* **SAMEA**: EMBL-EBI BioSamples
* **SAMD**: DDBJ BioSamples
* **BioSample IDs**: Human, Animal, Plant, Microbial, Viral, Environmental, Clinical

---

### 3. Sample Categories
Collect:
* **Human Clinical Samples**: Blood, Plasma, Serum, PBMC, Bone marrow, CSF, Saliva, Urine, Stool, Tumor biopsy, Surgical tissue.
* **Healthy Controls**
* **Disease Cohorts**: Cancer, Diabetes, COVID-19, Alzheimer's, Parkinson's, ALS, Autism, Tuberculosis, HIV, Rare diseases.
* **Single-cell Samples**: scRNA-seq, scATAC-seq, Multiome, CITE-seq, Spatial transcriptomics.
* **Model Organisms**: Mouse, Rat, Zebrafish, Fruit fly, C. elegans, Yeast, Arabidopsis.
* **Environmental Samples**: Soil, Ocean, Freshwater, Air, Wastewater, Microbiome.

---

### 4. Metadata (Collect EVERYTHING)
BioSample ID, BioProject, SRA, GEO, Assembly, Organism, NCBI Taxonomy, Tissue, Organ, Cell Type, Cell Line, Disease, Phenotype, Age, Sex, Ethnicity (where available and permitted), Geographic Location, Latitude, Longitude, Collection Date, Isolation Source, Host, Treatment, Drug, Protocol, Storage Conditions, Preservation Method, Sequencing Center, Submitter, Institution, Publication, PMID, PMCID, DOI, Release Date, Update Date.

---

### 5. Controlled Vocabularies & Ontologies
Implement mappings to:
NCBI Taxonomy, Cell Ontology (CL), Uberon, Disease Ontology (DOID), MONDO, MeSH, SNOMED CT, ICD-10, ICD-11, Human Phenotype Ontology (HPO), Experimental Factor Ontology (EFO), Gene Ontology (GO), ChEBI, ENVO (Environment Ontology).

---

### 6. Connected Databases
Automatically resolve:
`BioProject` → `SRA` → `GEO` → `Assembly` → `ClinVar` → `dbGaP` → `GenBank` → `RefSeq` → `Gene` → `Protein` → `PubMed` → `PMC` → `Taxonomy` → `Human Cell Atlas` → `GTEx` → `TCGA` → `ENCODE`

---

### 7. APIs
Implement:
Entrez E-utilities, NCBI Datasets API, BioSample Search, XML Retrieval, JSON Retrieval, FTP Metadata, Bulk Export.

---

### 8. Bulk Downloads
Harvest:
XML metadata, JSON metadata, TSV exports, FTP archives, Entrez export, Linked accession tables.

---

### 9. GitHub Ecosystem
**Official**: [github.com/ncbi](https://github.com/ncbi)

**Major repositories**:
* [github.com/ncbi/datasets](https://github.com/ncbi/datasets)
* [github.com/ncbi/sra-tools](https://github.com/ncbi/sra-tools)
* [github.com/biopython/biopython](https://github.com/biopython/biopython)
* [github.com/saketkc/pysradb](https://github.com/saketkc/pysradb)
* [github.com/guma44/GEOparse](https://github.com/guma44/GEOparse)
* [github.com/scverse/scanpy](https://github.com/scverse/scanpy)
* [github.com/scverse/anndata](https://github.com/scverse/anndata)
* [github.com/scverse/scvi-tools](https://github.com/scverse/scvi-tools)

---

### 10. Python Ecosystem
Biopython, pandas, polars, requests, lxml, xmltodict, pydantic, networkx, rdflib, scanpy, anndata, scvi-tools.

---

### 11. Landmark Research Papers
Automatically index:
BioSample Database papers, NCBI Database Issue papers, BioSample update publications, MIxS specification papers, FAIR metadata papers, Human Cell Atlas metadata publications, Single-cell metadata standards.

---

### 12. Knowledge Graph
**Nodes**:
`BioSample` → `BioProject` → `SRA` → `GEO` → `Patient` → `Disease` → `Tissue` → `Cell Type` → `Publication` → `Institution` → `Geographic Location`

**Relations**:
derived_from, sampled_from, belongs_to, sequenced_in, profiled_in, associated_with, collected_at, published_in.

---

### 13. AI Applications
Bioquora should use BioSample for:
Sample similarity search, Disease cohort construction, Tissue-specific search, Cell-type discovery, Precision medicine, Population genomics, Spatial biology integration, Multi-omics integration, GraphRAG, Biomedical recommendation engine.

---

### 14. ETL Pipeline
`BioSample` → `Entrez API` → `XML / JSON` → `Ontology Mapping` → `Metadata Normalization` → `Knowledge Graph` → `Embeddings` → `Bioquora Sample Intelligence`

---

### 15. Cross-Link Every BioSample
Automatically connect with:
BioProject, SRA, GEO, Assembly, ClinVar, dbGaP, dbSNP, Gene, RefSeq, GenBank, GTEx, TCGA, ENCODE, Human Cell Atlas, PRIDE, MetaboLights, ArrayExpress, OpenAlex, Crossref, ORCID, ROR, Zenodo.

---

### 16. High-Value BioSample Collections
Continuously prioritize:
Human Cell Atlas, GTEx, TCGA, ENCODE, Human Microbiome Project, All of Us Research Program, Human Pangenome Reference Consortium, HuBMAP, Human Biomolecular Atlas, Human Protein Atlas, International Human Epigenome Consortium, Earth Microbiome Project.

---

### 17. Metadata Standards (Implement Completely)
Support:
MIxS (Minimum Information about any Sequence), MIMS, MIGS, MIMARKS, BioSample Attribute Packages, GA4GH Phenopackets, ISA-Tab, FAIR Principles, Dublin Core, DataCite Metadata Schema.

---

### 18. Bioquora Applications
Biological sample explorer, Tissue atlas, Disease cohort explorer, Cell-type navigator, Sample similarity engine, Precision medicine explorer, Multi-omics sample browser, Spatial biology search, Biomedical knowledge graph enrichment, AI-ready biological sample repository.

---

### 19. Continuous Harvest Strategy
**Hourly**:
Newly released BioSamples.

**Daily**:
Metadata updates, Ontology updates, Cross-reference updates.

**Weekly**:
SRA synchronization, GEO synchronization, PubMed synchronization.

**Monthly**:
Full metadata normalization, Ontology reconciliation, Duplicate detection, Knowledge graph rebuild.

---

### 20. Bioquora Integration Blueprint
`BioSample` → `Ontology Mapping` → `BioProject` → `SRA` → `GEO` → `Clinical Metadata` → `Knowledge Graph` → `Embeddings` → `Bioquora Biological Intelligence Layer`

---

### 21. Essential Accessible Resources
**Official**:
* [ncbi.nlm.nih.gov/biosample](https://www.ncbi.nlm.nih.gov/biosample)
* [ncbi.nlm.nih.gov/biosample/docs](https://www.ncbi.nlm.nih.gov/biosample/docs)
* [ftp.ncbi.nlm.nih.gov/biosample](https://ftp.ncbi.nlm.nih.gov/biosample)
* [ncbi.nlm.nih.gov/books/NBK54014](https://www.ncbi.nlm.nih.gov/books/NBK54014)
* [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)

**GitHub**:
* [github.com/ncbi](https://github.com/ncbi)
* [github.com/ncbi/datasets](https://github.com/ncbi/datasets)
* [github.com/ncbi/sra-tools](https://github.com/ncbi/sra-tools)
* [github.com/biopython/biopython](https://github.com/biopython/biopython)
* [github.com/saketkc/pysradb](https://github.com/saketkc/pysradb)
* [github.com/scverse/scanpy](https://github.com/scverse/scanpy)
* [github.com/scverse/anndata](https://github.com/scverse/anndata)
* [github.com/scverse/scvi-tools](https://github.com/scverse/scvi-tools)

**Supporting Standards**:
* [gensc.org/mixs](https://gensc.org/mixs)
* [ga4gh.org](https://www.ga4gh.org)
* [phenopacket-schema.readthedocs.io](https://phenopacket-schema.readthedocs.io)
* [obophenotype.github.io/human-phenotype-ontology](https://obophenotype.github.io/human-phenotype-ontology)
* [uberon.github.io](https://uberon.github.io)
* [cellontology.org](https://cellontology.org)

---

### STEP 2.4 Status
✅ **NCBI BioSample Ecosystem — God Mode Implementation Complete**

This implementation creates the biological specimen layer for Bioquora and serves as the anchor linking experimental data to patients, tissues, cell types, and organisms.

---

*Next (STEP 2.5): ClinVar.*
