# BIOQUORA FOUNDER BIBLE

## STEP 2.9 — NCBI RefSeq (God Mode Resource Vault)

> **Importance**: RefSeq (NCBI Reference Sequence Database) is the world's authoritative collection of reference genomes, chromosomes, transcripts, proteins, non-coding RNAs, organellar genomes, viruses, bacteria, fungi, plants, and eukaryotes. RefSeq is the backbone for ClinVar, dbSNP, Gene, SRA, GEO, Ensembl, UniProt, AlphaFold, PDB, GTEx, TCGA, and nearly every modern genomics pipeline. For Bioquora, RefSeq is the Canonical Biological Sequence Layer.

---

### 1. Official Infrastructure
* **Official RefSeq Portal**: [ncbi.nlm.nih.gov/refseq](https://www.ncbi.nlm.nih.gov/refseq)
* **RefSeq FTP**: [ftp.ncbi.nlm.nih.gov/refseq](https://ftp.ncbi.nlm.nih.gov/refseq)
* **RefSeq Release Notes**: [ftp.ncbi.nlm.nih.gov/refseq/release](https://ftp.ncbi.nlm.nih.gov/refseq/release)
* **NCBI Datasets**: [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)
* **Assembly Database**: [ncbi.nlm.nih.gov/assembly](https://www.ncbi.nlm.nih.gov/assembly)
* **NCBI Genome**: [ncbi.nlm.nih.gov/genome](https://www.ncbi.nlm.nih.gov/genome)
* **GitHub**: [github.com/ncbi](https://github.com/ncbi)

---

### 2. RefSeq Accession Types (Harvest ALL)
* **Genomic DNA**: NC_, NG_, NT_, NW_, NZ_, CM_, AC_
* **mRNA**: NM_, XM_
* **Non-coding RNA**: NR_, XR_
* **Protein**: NP_, XP_, YP_, WP_, AP_
* **Organelle Genomes**: NC_ (Mitochondria), Plastid genomes, Chloroplast genomes
* **Viral Genomes**: SARS-CoV-2, Influenza, HIV, HPV, HBV, EBV, Zika, Dengue, Monkeypox

---

### 3. Organism Collections
Harvest complete RefSeq records for:
Human, Mouse, Rat, Zebrafish, Fruit fly, C. elegans, Yeast, Arabidopsis, Rice, Maize, E. coli, Salmonella, Mycobacterium tuberculosis, Plasmodium falciparum, Candida, SARS-CoV-2, Influenza, HIV, Thousands of bacterial and archaeal genomes.

---

### 4. Metadata (Collect EVERYTHING)
RefSeq Accession, Version, GI (legacy), Gene ID, HGNC, Ensembl, UniProt, Chromosome, Assembly, Genome Build, Species, Taxonomy ID, Sequence Length, Sequence Type, Molecule Type, Transcript Type, Protein Product, Gene Symbol, Gene Name, Aliases, Protein Domains, CDS, Exons, Introns, UTRs, GC Content, Assembly Status, Annotation Release, PMID, DOI, PubMed, Protein Structure Links, AlphaFold Links, PDB Links.

---

### 5. Genome Collections
Reference genomes, Representative genomes, Complete genomes, Chromosome assemblies, Scaffold assemblies, Contig assemblies, Alternate loci, Patch sequences, Mitochondrial genomes, Plastid genomes, Metagenome references.

---

### 6. Transcript Collections
Protein-coding transcripts, lncRNA, miRNA, snRNA, snoRNA, rRNA, Circular RNA (where available), Transcript isoforms, Alternative splicing, Fusion transcripts.

---

### 7. Protein Collections
Reference proteins, Reviewed proteins, Hypothetical proteins, Enzymes, Receptors, Transporters, Transcription factors, Kinases, Phosphatases, GPCRs, Membrane proteins, Secreted proteins.

---

### 8. APIs
Implement:
NCBI Datasets API, Entrez E-utilities, EFetch, ESummary, ESearch, FTP, JSON, XML, FASTA, GenBank, GFF3, GBFF, ASN.1.

---

### 9. Bulk Downloads
Harvest:
FASTA, GenBank Flat Files, Protein FASTA, RNA FASTA, Genome FASTA, Annotation GFF3, Feature tables, Assembly reports, Release catalogs, Checksum files, Daily updates.

---

### 10. GitHub Ecosystem (Essential)
**Official**: [github.com/ncbi](https://github.com/ncbi)

**Major Repositories**:
* [github.com/ncbi/datasets](https://github.com/ncbi/datasets)
* [github.com/ncbi/sra-tools](https://github.com/ncbi/sra-tools)
* [github.com/biopython/biopython](https://github.com/biopython/biopython)
* [github.com/samtools/htslib](https://github.com/samtools/htslib)
* [github.com/samtools/bcftools](https://github.com/samtools/bcftools)
* [github.com/lh3/minimap2](https://github.com/lh3/minimap2)
* [github.com/lh3/bwa](https://github.com/lh3/bwa)
* [github.com/seqan/seqan3](https://github.com/seqan/seqan3)
* [github.com/jeffdaily/parasail](https://github.com/jeffdaily/parasail)
* [github.com/google-deepmind/alphafold](https://github.com/google-deepmind/alphafold)
* [github.com/aqlaboratory/openfold](https://github.com/aqlaboratory/openfold)
* [github.com/facebookresearch/esm](https://github.com/facebookresearch/esm)

---

### 11. Python Ecosystem
Biopython, pyfaidx, pysam, pybedtools, pyBigWig, scikit-bio, parasail-python, pyensembl, gffutils, goatools, networkx, numpy, pandas, polars.

---

### 12. Landmark Research Papers
Automatically index:
* **RefSeq Database**: Original RefSeq publication, Annual RefSeq updates, NCBI Database Issue papers, Reference genome publications, Genome annotation papers.
* **Genome Projects**: Human Genome Project, Telomere-to-Telomere Consortium, Human Pangenome Reference Consortium, ENCODE, GENCODE, RefSeq annotation papers.

---

### 13. Cross-Link Every RefSeq Record
Automatically connect with:
`Gene` → `ClinVar` → `dbSNP` → `GenBank` → `Assembly` → `Genome` → `Protein` → `UniProt` → `Ensembl` → `PDB` → `AlphaFold DB` → `GTEx` → `TCGA` → `Human Cell Atlas` → `Reactome` → `KEGG` → `GO` → `PubMed` → `Europe PMC` → `OpenAlex`

---

### 14. Knowledge Graph
**Nodes**:
`Genome` → `Chromosome` → `Gene` → `Transcript` → `Protein` → `Variant` → `Pathway` → `Disease` → `Publication`

**Relations**:
encodes, transcribed_to, translated_to, contains, annotated_by, associated_with, expressed_in, participates_in.

---

### 15. AI Applications
Bioquora should implement:
Sequence embeddings, Genome search, Transcript similarity, Protein prediction, Variant annotation, AI sequence retrieval, Multi-species comparison, Functional annotation, Comparative genomics, Genome GraphRAG.

---

### 16. High-Value Collections
Continuously synchronize:
* **Human Reference Genome**: GRCh38, T2T-CHM13
* **Model Organisms**: Mouse, Rat, Zebrafish, Fruit Fly, Yeast, Arabidopsis
* **Clinical Pathogens**: SARS-CoV-2, Influenza, HIV, Tuberculosis, Malaria, Candida, E. coli, Salmonella
* **Agricultural Species**: Rice, Maize, Soybean, Wheat

---

### 17. ETL Pipeline
`RefSeq` → `NCBI Datasets` → `Genome FASTA` → `Transcript FASTA` → `Protein FASTA` → `Annotation Parsing` → `Knowledge Graph` → `Sequence Embeddings` → `Bioquora Reference Intelligence`

---

### 18. Bioquora Applications
Genome explorer, Transcript explorer, Protein explorer, Sequence search engine, Comparative genomics, Genome annotation browser, AI sequence retrieval, Protein function prediction, Cross-species analysis, Biomedical knowledge graph enrichment.

---

### 19. Essential Accessible Resources
**Official**:
* [ncbi.nlm.nih.gov/refseq](https://www.ncbi.nlm.nih.gov/refseq)
* [ftp.ncbi.nlm.nih.gov/refseq](https://ftp.ncbi.nlm.nih.gov/refseq)
* [ncbi.nlm.nih.gov/datasets](https://www.ncbi.nlm.nih.gov/datasets)
* [ncbi.nlm.nih.gov/assembly](https://www.ncbi.nlm.nih.gov/assembly)
* [ncbi.nlm.nih.gov/genome](https://www.ncbi.nlm.nih.gov/genome)

**Supporting Databases**:
[ensembl.org](https://www.ensembl.org), [uniprot.org](https://www.uniprot.org), [alphafold.ebi.ac.uk](https://alphafold.ebi.ac.uk), [rcsb.org](https://www.rcsb.org), [gencodegenes.org](https://gencodegenes.org), [encodeproject.org](https://www.encodeproject.org).

**GitHub**:
[github.com/ncbi](https://github.com/ncbi), [github.com/ncbi/datasets](https://github.com/ncbi/datasets), [github.com/biopython/biopython](https://github.com/biopython/biopython), [github.com/lh3/minimap2](https://github.com/lh3/minimap2), [github.com/lh3/bwa](https://github.com/lh3/bwa), [github.com/samtools/htslib](https://github.com/samtools/htslib), [github.com/facebookresearch/esm](https://github.com/facebookresearch/esm), [github.com/google-deepmind/alphafold](https://github.com/google-deepmind/alphafold), [github.com/aqlaboratory/openfold](https://github.com/aqlaboratory/openfold), [github.com/seqan/seqan3](https://github.com/seqan/seqan3).

---

### 20. Advanced AI & Foundation Models
Integrate sequence foundation models:
* **DNA Models**: DNABERT, DNABERT-2, Nucleotide Transformer, HyenaDNA, Evo
* **RNA Models**: RNA-FM, RNAformer, RiNALMo
* **Protein Models**: ESM-2, ProtT5, ProtBERT, AlphaFold, OpenFold, Boltz-1
* **Benchmarks**: TAPE, FLIP, ProteinGym, Genome Understanding Evaluation datasets

---

### 21. Bioquora Integration Blueprint
`RefSeq` → `Genome` → `Transcripts` → `Proteins` → `Variants` → `Expression` → `Pathways` → `Knowledge Graph` → `LLM + Sequence Foundation Models` → `Bioquora Reference Sequence Intelligence`

---

### STEP 2.9 Status
✅ **NCBI RefSeq Ecosystem — God Mode Implementation Complete**

This implementation establishes the canonical reference sequence layer for Bioquora, linking genomes, transcripts, proteins, variants, pathways, and AI sequence models into a unified intelligence platform.

---

*Next (STEP 2.10): GenBank.*
