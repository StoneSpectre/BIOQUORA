# BIOQUORA FOUNDER BIBLE

## STEP 2.2 — NCBI Sequence Read Archive (SRA) (God Mode Resource Vault)

> **Importance**: The Sequence Read Archive (SRA) is the world's largest public repository of raw next-generation sequencing (NGS) data, hosting petabytes of sequencing data from genomics, transcriptomics, metagenomics, epigenomics, single-cell, long-read sequencing, and clinical research. It is tightly integrated with BioProject, BioSample, GEO, and dbGaP, making it the foundation of Bioquora's genomics infrastructure.

---

### 1. Official Infrastructure
* **Official SRA Portal**: [ncbi.nlm.nih.gov/sra](https://www.ncbi.nlm.nih.gov/sra)
* **Documentation**: [ncbi.nlm.nih.gov/sra](https://www.ncbi.nlm.nih.gov/sra) (SRA Documentation & Getting Started)
* **SRA Toolkit**: [github.com/ncbi/sra-tools](https://github.com/ncbi/sra-tools)
* **Toolkit Wiki**: [github.com/ncbi/sra-tools/wiki](https://github.com/ncbi/sra-tools/wiki/01.-Downloading-SRA-Toolkit)
* **Download Guide**: [ncbi.nlm.nih.gov/sra/docs/sradownload/](https://www.ncbi.nlm.nih.gov/sra/docs/sradownload/)

---

### 2. SRA Accession Hierarchy (Harvest ALL)
Bioquora should ingest every accession type.
* **SRP (Study / Project)**: Examples include Cancer genomics, Human microbiome, COVID-19 sequencing, Alzheimer's sequencing, Rare disease cohorts.
* **SRX (Experiment)**: Contains Library strategy, Sequencing protocol, Instrument, Library preparation.
* **SRS (Sample)**: Contains Tissue, Cell type, Organism, Disease, Phenotype, Sex, Age, Treatment.
* **SRR (Run)**: Raw sequencing files (FASTQ, SRA, CRAM, BAM, Aligned Reads, Signal Files).

---

### 3. Sequencing Technologies
Harvest every platform.
* **Illumina**: NovaSeq, HiSeq, MiSeq, NextSeq, iSeq
* **Oxford Nanopore**: MinION, GridION, PromethION
* **PacBio**: Sequel, Sequel II, Revio
* **Other Platforms**: Ion Torrent, BGI/MGI, Complete Genomics, SOLiD, Helicos, Geneus, Salus

---

### 4. Library Strategies
Collect:
WGS, WXS, RNA-Seq, scRNA-Seq, ATAC-Seq, ChIP-Seq, Hi-C, CITE-seq, CUT&RUN, CUT&Tag, Bisulfite-Seq, miRNA-Seq, Ribo-Seq, CLIP-Seq, Amplicon Sequencing, Metagenomics, Metatranscriptomics, CRISPR Screens, Spatial Transcriptomics.

---

### 5. Disease Collections
Create dedicated collections.
* **Oncology**: TCGA-related runs, Pediatric cancers, Leukemia, Glioblastoma, Melanoma
* **Neurology**: Alzheimer's, Parkinson's, ALS, Huntington's, Epilepsy
* **Infectious Disease**: SARS-CoV-2, Influenza, HIV, TB, Dengue, Malaria
* **Precision Medicine**: Rare diseases, Pharmacogenomics, Cancer genomics, Population genomics

---

### 6. Metadata (Collect EVERYTHING)
Bioquora should store:
SRP, SRX, SRS, SRR, BioProject, BioSample, GEO accession, dbGaP accession, PMID, PMCID, DOI, Library strategy, Library source, Library selection, Instrument, Read length, Paired-end/single-end, Sequencing center, Organism, Tissue, Cell type, Disease, Phenotype, Sex, Age, Treatment, Collection date, Geographic location, File size, Read count, Base count.

---

### 7. File Formats
Support all formats.
* **Raw**: FASTQ, SRA
* **Aligned**: BAM, CRAM
* **Derived**: VCF, GVCF, BED, BigWig, BigBed
* **Metadata**: XML, JSON, TSV, CSV

---

### 8. Bulk Downloads
Implement:
HTTPS downloads, Cloud access (AWS/GCP), SRA Toolkit (prefetch, fasterq-dump), Entrez search export, Run Selector, Accession lists.

---

### 9. APIs
Implement:
Entrez E-utilities, SRA Run Selector, NCBI Datasets, Cloud access APIs, FTP/HTTPS endpoints, Programmatic metadata retrieval.

---

### 10. GitHub Ecosystem (Must Integrate)
**Official**:
* [NCBI SRA Toolkit](https://github.com/ncbi/sra-tools)

**Major projects**:
SRA Toolkit, NCBI-VDB SDK, pysradb, GEOparse, Biopython, scverse, Scanpy, nf-core, Nextflow, Snakemake, SeqKit, fastp, MultiQC, FastQC, Salmon, STAR, HISAT2, minimap2, BWA, SAMtools, BCFtools.

---

### 11. Python / R Ecosystem
* **Python**: pysradb, Biopython, scanpy, anndata, pandas, polars, pysam.
* **R**: SRAdb, GEOquery, DESeq2, edgeR, limma, Seurat.

---

### 12. Landmark Research Papers
Continuously index:
Original SRA database paper, Major SRA update papers, SRA Toolkit documentation, Petabyte-scale sequence search papers, Cloud-native SRA access papers.

---

### 13. Knowledge Graph
**Nodes**:
`Study (SRP)` → `Experiment (SRX)` → `Sample (SRS)` → `Run (SRR)` → `BioSample` → `BioProject` → `Publication` → `Disease` → `Gene` → `Variant`

**Relations**:
contains, sequenced_on, derived_from, linked_to, published_in, associated_with.

---

### 14. Bioquora ETL Pipeline
`SRA` → `Entrez Search` → `Run Selector` → `SRA Toolkit` → `FASTQ / BAM / CRAM` → `Metadata Extraction` → `QC` → `Knowledge Graph` → `Embeddings` → `Bioquora Genomics Engine`

---

### 15. Cross-Link Every SRA Record
Automatically connect with:
BioProject, BioSample, GEO, dbGaP, PubMed, PubMed Central, ClinVar, dbSNP, RefSeq, Gene, GTEx, TCGA, ENCODE, Human Cell Atlas, PRIDE, ArrayExpress, OpenAlex, Crossref, ORCID, ROR.

---

### 16. High-Value Collections
Continuously prioritize:
Cancer sequencing, Human pangenome, Single-cell atlases, COVID-19 sequencing, Rare diseases, Long-read sequencing, Spatial transcriptomics, Metagenomics, Microbiome, CRISPR screens, Cell Atlas projects, Population genomics.

---

### 17. Continuous Harvest Strategy
**Hourly**:
Newly released sequencing runs.

**Daily**:
Metadata synchronization, BioProject updates, BioSample updates.

**Weekly**:
GEO linkage, PubMed synchronization, Cloud mirror validation.

**Monthly**:
Full accession graph rebuild, Duplicate detection, Metadata normalization.

---

### 18. Bioquora Applications
Raw sequencing explorer, Single-cell search, Variant discovery engine, Population genomics atlas, AI-ready genomics corpus, Multi-omics integration, Clinical genomics explorer, Precision medicine search, Sequencing workflow recommendation, Biomedical knowledge graph enrichment.

---

### STEP 2.2 Status
✅ **NCBI SRA Ecosystem — God Mode Implementation Complete**

**Official Resources**
* [NCBI SRA Home](https://www.ncbi.nlm.nih.gov/sra)
* [SRA Toolkit GitHub](https://github.com/ncbi/sra-tools)
* [Toolkit Wiki](https://github.com/ncbi/sra-tools/wiki/01.-Downloading-SRA-Toolkit)
* [Download Guide](https://www.ncbi.nlm.nih.gov/sra/docs/sradownload/)

*The SRA Toolkit supports cloud-native access, prefetch, fasterq-dump, and direct retrieval of public and authorized datasets, making it the recommended download mechanism instead of generic file downloads.*

---

*Next (STEP 2.3): NCBI BioProject.*
