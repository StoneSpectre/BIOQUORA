# BIOQUORA FOUNDER BIBLE

## STEP 2.1 — NCBI Gene Expression Omnibus (GEO) (God Mode Resource Vault)

> **Importance**: The Gene Expression Omnibus (GEO) is the world's largest public repository for functional genomics experiments, containing hundreds of thousands of studies and millions of biological samples across microarray, bulk RNA-seq, single-cell RNA-seq, ChIP-seq, methylation, ATAC-seq, spatial transcriptomics, and other high-throughput assays. It supports MIAME-compliant submissions, provides bulk downloads, programmatic access, and links to related NCBI resources.

---

### 1. Official Infrastructure (Highest Priority)
* **Official GEO Portal**: [ncbi.nlm.nih.gov/geo/](https://www.ncbi.nlm.nih.gov/geo/)
* **GEO Documentation**: [ncbi.nlm.nih.gov/geo/info/](https://www.ncbi.nlm.nih.gov/geo/info/)
* **Download Guide**: [ncbi.nlm.nih.gov/geo/info/download.html](https://www.ncbi.nlm.nih.gov/geo/info/download.html)
* **Programmatic Access**: [ncbi.nlm.nih.gov/geo/info/geo_paccess.html](https://www.ncbi.nlm.nih.gov/geo/info/geo_paccess.html)
* **GEO DataSets Guide**: [ncbi.nlm.nih.gov/geo/info/datasets.html](https://www.ncbi.nlm.nih.gov/geo/info/datasets.html)

---

### 2. GEO Record Types (Implement ALL)
Bioquora should ingest every GEO object.
* **GSE — GEO Series**: Complete biological studies (Examples: Cancer studies, Alzheimer's, Parkinson's, COVID-19, Diabetes, Cardiovascular diseases)
* **GSM — GEO Samples**: Individual biological samples (Includes: Patient samples, Cell lines, Mouse, Rat, Zebrafish, Human tissues)
* **GPL — Platforms**: Technology metadata (Examples: Affymetrix, Illumina, Agilent, Nanostring, RNA-seq platforms)
* **GDS — Curated GEO DataSets**: Curated gene expression datasets prepared by NCBI.

---

### 3. Experimental Technologies
Harvest every assay type.
* **Transcriptomics**: Bulk RNA-seq, Microarray, Single-cell RNA-seq, Spatial Transcriptomics, Long-read RNA-seq
* **Epigenomics**: ATAC-seq, ChIP-seq, DNase-seq, Histone modification, DNA methylation
* **Regulatory Biology**: CUT&RUN, CUT&Tag, RIP-seq, CLIP-seq, Ribo-seq
* **Multiomics**: Multiome ATAC+RNA, CITE-seq, Perturb-seq, CRISPR screens

---

### 4. Organisms
Harvest all organisms.
**Priority**:
Homo sapiens, Mus musculus, Rattus norvegicus, Danio rerio, Drosophila melanogaster, Caenorhabditis elegans, Arabidopsis thaliana, Saccharomyces cerevisiae, Escherichia coli.

---

### 5. Biomedical Disease Collections
Build disease-specific collections.
* **Oncology**: Breast cancer, Lung cancer, Colon cancer, Prostate cancer, Glioblastoma, Leukemia, Melanoma
* **Neurology**: Alzheimer's disease, Parkinson's disease, ALS, Huntington's disease, Autism
* **Immunology**: Lupus, Rheumatoid arthritis, Crohn's disease, Multiple sclerosis
* **Infectious Diseases**: COVID-19, Influenza, HIV, Tuberculosis, Malaria, Dengue
* **Metabolic Diseases**: Diabetes, Obesity, NAFLD, Metabolic syndrome

---

### 6. Metadata (Collect Everything)
GSE ID, GSM ID, GPL ID, GDS ID, BioProject, BioSample, SRA accession, PMID, PMCID, DOI, Study title, Summary, Organism, Tissue, Disease, Cell type, Treatment, Platform, Protocol, Authors, Institution, Submission date, Release date, Supplementary files.

---

### 7. Bulk Downloads
Harvest:
SOFT, MINiML XML, Series Matrix, Raw supplementary archives, Processed expression matrices, Metadata tables, Platform annotations.
*Official bulk downloads are available through the GEO FTP structure and Entrez utilities.*

---

### 8. APIs
Implement:
NCBI Entrez E-utilities, GEO DataSets search, GEO Profiles, FTP downloads, Programmatic metadata retrieval, NCBI Datasets integration.

---

### 9. Python Ecosystem
**Official / Widely Used Libraries**:
GEOparse, GEOquery (R/Bioconductor), Biopython (Entrez), pysradb, scanpy, anndata, pandas, numpy.

---

### 10. GitHub Repositories
* **GEOparse**: [github.com/guma44/GEOparse](https://github.com/guma44/GEOparse)
* **GEOquery (Bioconductor)**: [bioconductor.org/packages/GEOquery](https://bioconductor.org/packages/GEOquery)
* **Biopython**: [github.com/biopython/biopython](https://github.com/biopython/biopython)
* **Scanpy**: [github.com/scverse/scanpy](https://github.com/scverse/scanpy)
* **AnnData**: [github.com/scverse/anndata](https://github.com/scverse/anndata)
* **scverse ecosystem**: [github.com/scverse](https://github.com/scverse)
* **pysradb**: [github.com/saketkc/pysradb](https://github.com/saketkc/pysradb)

---

### 11. Landmark Research Papers (Must Index)
Bioquora should automatically retrieve and link landmark GEO papers including:
1. Gene Expression Omnibus: NCBI gene expression and hybridization array data repository (2002)
2. Gene Expression Omnibus at NCBI—updates and major enhancements (2007)
3. Gene Expression Omnibus: archive for functional genomics data sets—update (2013)
4. Recent GEO database update papers published by NCBI.
*These papers define the GEO architecture and should be permanently linked within the knowledge graph.*

---

### 12. AI Applications
Bioquora should support:
Differential expression analysis, Biomarker discovery, Disease subtype clustering, Gene signature generation, Cell-type annotation, Pathway enrichment, Drug target discovery, Multi-omics integration, Foundation model training, GraphRAG for genomics.

---

### 13. Knowledge Graph
**Nodes**:
`Study (GSE)`, `Sample (GSM)`, `Platform (GPL)`, `Dataset (GDS)`, `Gene`, `Disease`, `Tissue`, `Cell type`, `Organism`, `Publication`, `BioProject`, `BioSample`, `SRA`

**Relations**:
contains_sample, uses_platform, studies_disease, derived_from, linked_to_publication, linked_to_bioproject, linked_to_sra.

---

### 14. Bioquora ETL Pipeline
`NCBI GEO` → `Entrez API` → `FTP Downloads` → `SOFT / MINiML / Matrix Files` → `Metadata Parsing` → `Expression Matrix Extraction` → `Entity Normalization` → `Knowledge Graph` → `Embeddings` → `Vector Database` → `Bioquora Genomics Engine`

---

### 15. Cross-Link Every GEO Record With
PubMed, PubMed Central, SRA, BioProject, BioSample, Gene, dbSNP, ClinVar, GTEx, TCGA, ENCODE, Human Cell Atlas, ArrayExpress, OpenAlex, Crossref, ORCID, ROR, Zenodo, GitHub.

---

### 16. High-Value GEO Collections to Prioritize
Cancer transcriptomics, Single-cell atlases, COVID-19 datasets, Alzheimer's datasets, Parkinson's datasets, Human immune atlas, Spatial transcriptomics, CRISPR screening datasets, ATAC-seq collections, Epigenomics studies, Multi-omics studies.

---

### 17. Continuous Harvest Strategy
**Hourly**:
Newly released GEO submissions.

**Daily**:
Metadata synchronization, Publication links, Supplementary file updates.

**Weekly**:
PubMed synchronization, SRA synchronization, BioProject/BioSample reconciliation.

**Monthly**:
Full GEO graph rebuild, Duplicate detection, Metadata normalization.

---

### 18. Bioquora Applications
Gene expression search engine, Disease expression atlas, Single-cell explorer, Biomarker discovery portal, Differential expression engine, Multi-omics explorer, AI-ready genomics corpus, Clinical genomics search, Research recommendation engine, Biomedical knowledge graph enrichment.

---

### STEP 2.1 Status
✅ **NCBI GEO Ecosystem: God Mode Implementation Complete**

**Official Resources**
* [NCBI GEO Home](https://www.ncbi.nlm.nih.gov/geo/)
* [GEO Documentation](https://www.ncbi.nlm.nih.gov/geo/info/)
* [Download GEO Data](https://www.ncbi.nlm.nih.gov/geo/info/download.html)
* [Programmatic Access](https://www.ncbi.nlm.nih.gov/geo/info/geo_paccess.html)
* [About GEO DataSets](https://www.ncbi.nlm.nih.gov/geo/info/datasets.html)

**Core GitHub / Tools**
GEOparse, GEOquery, Biopython, Scanpy, AnnData, scverse, pysradb.

---

*Next (STEP 2.2): NCBI Sequence Read Archive (SRA).*
