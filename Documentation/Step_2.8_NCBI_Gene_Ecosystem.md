# BIOQUORA FOUNDER BIBLE

## STEP 2.8 — NCBI Gene (God Mode Resource Vault)

> **Importance**: NCBI Gene is the authoritative database for gene-centric information, integrating gene identifiers, genomic coordinates, RefSeq transcripts, proteins, orthologs, pathways, phenotypes, diseases, expression data, publications, and external databases. It is the central biological entity that connects nearly every genomic, transcriptomic, proteomic, and clinical resource. For Bioquora, NCBI Gene serves as the Core Gene Knowledge Layer.

---

### 1. Official Infrastructure
* **Official Portal**: [ncbi.nlm.nih.gov/gene](https://www.ncbi.nlm.nih.gov/gene)
* **Gene Help**: [ncbi.nlm.nih.gov/books/NBK3841](https://www.ncbi.nlm.nih.gov/books/NBK3841)
* **FTP Downloads**: [ftp.ncbi.nlm.nih.gov/gene](https://ftp.ncbi.nlm.nih.gov/gene)
* **Gene Data**: [ftp.ncbi.nlm.nih.gov/gene/DATA](https://ftp.ncbi.nlm.nih.gov/gene/DATA)
* **Gene Reports**: [ftp.ncbi.nlm.nih.gov/gene/GeneRIF](https://ftp.ncbi.nlm.nih.gov/gene/GeneRIF)
* **NCBI Datasets**: [ncbi.nlm.nih.gov/datasets/gene](https://www.ncbi.nlm.nih.gov/datasets/gene)
* **NCBI GitHub**: [github.com/ncbi](https://github.com/ncbi)

---

### 2. Organisms (Harvest ALL)
Bioquora should index genes from:
* **Human**: Homo sapiens
* **Mouse**: Mus musculus
* **Rat**: Rattus norvegicus
* **Zebrafish**: Danio rerio
* **Fruit Fly**: Drosophila melanogaster
* **Others**: C. elegans, Yeast, Arabidopsis, Rice, E. coli, SARS-CoV-2, Influenza, HIV, Tuberculosis, Malaria Parasite

---

### 3. Metadata (Collect EVERYTHING)
Gene ID, Official Symbol, Official Name, Aliases, Previous Symbols, NCBI Taxonomy ID, Chromosome, Location, Cytoband, Gene Type, Gene Family, Description, Summary, RefSeq, Ensembl ID, HGNC ID, UniProt ID, OMIM ID, Gene Ontology, Protein Products, Transcript Count, Isoforms, Orthologs, Paralogs, Expression, Pathways, Diseases, Phenotypes, Drugs, PMID, PMCID, DOI, GeneRIF, Protein Domains, Protein Structure.

---

### 4. Gene Categories
Collect:
Protein Coding, lncRNA, miRNA, snRNA, snoRNA, rRNA, Pseudogenes, Immunoglobulin Genes, TCR Genes, Mitochondrial Genes, ncRNA, Readthrough Genes, Antisense Genes.

---

### 5. Functional Annotation
Collect:
Biological Process, Molecular Function, Cellular Component, Protein Domains, Motifs, Catalytic Activity, Enzyme Classification, Transcription Factor, Kinase, Phosphatase, Receptor, Transporter, Ion Channel, GPCR, Secreted Protein, Cell Surface Marker.

---

### 6. Disease Associations
Automatically synchronize:
`ClinVar` → `OMIM` → `GeneReviews` → `MedGen` → `DisGeNET` → `Open Targets` → `ClinGen` → `GWAS Catalog` → `Orphanet` → `Human Phenotype Ontology`

---

### 7. Expression Resources
Integrate:
* **GEO**: [ncbi.nlm.nih.gov/geo](https://www.ncbi.nlm.nih.gov/geo)
* **GTEx**: [gtexportal.org](https://gtexportal.org)
* **Human Protein Atlas**: [proteinatlas.org](https://www.proteinatlas.org)
* **Human Cell Atlas**: [humancellatlas.org](https://www.humancellatlas.org)
* **ENCODE**: [encodeproject.org](https://www.encodeproject.org)
* **Expression Atlas**: [ebi.ac.uk/gxa](https://www.ebi.ac.uk/gxa)
* **Single Cell Expression Atlas**: [ebi.ac.uk/gxa/sc](https://www.ebi.ac.uk/gxa/sc)

---

### 8. Pathway Resources
Cross-link:
* **Reactome**: [reactome.org](https://reactome.org)
* **KEGG**: [genome.jp/kegg](https://www.genome.jp/kegg)
* **WikiPathways**: [wikipathways.org](https://www.wikipathways.org)
* **BioCyc**: [biocyc.org](https://biocyc.org)
* **Pathway Commons**: [pathwaycommons.org](https://www.pathwaycommons.org)

---

### 9. APIs
Implement:
Entrez Gene API, NCBI Datasets API, ESearch, EFetch, ESummary, FTP, JSON, XML.

---

### 10. Bulk Downloads
Harvest:
gene_info, gene2pubmed, gene2go, gene2accession, gene2ensembl, gene2refseq, gene_history, GeneRIF, gene_group, gene_neighbors, gene2sts, gene_orthologs, gene2unigene, gene2subcellular_location.

---

### 11. GitHub Ecosystem
**Official**: [github.com/ncbi](https://github.com/ncbi)

**Essential repositories**:
* [github.com/ncbi/datasets](https://github.com/ncbi/datasets)
* [github.com/biopython/biopython](https://github.com/biopython/biopython)
* [github.com/scverse/scanpy](https://github.com/scverse/scanpy)
* [github.com/scverse/anndata](https://github.com/scverse/anndata)
* [github.com/scverse/scvi-tools](https://github.com/scverse/scvi-tools)
* [github.com/Ensembl/ensembl-rest](https://github.com/Ensembl/ensembl-rest)
* [github.com/ebi-gene-expression-group](https://github.com/ebi-gene-expression-group)
* [github.com/reactome](https://github.com/reactome)
* [github.com/wikipathways](https://github.com/wikipathways)

---

### 12. Python Ecosystem
Biopython, requests, pandas, polars, networkx, rdflib, scanpy, anndata, scvi-tools, goatools, gseapy, bioservices, mygene.

---

### 13. Landmark Research Papers
Automatically index:
NCBI Gene database papers, GeneRIF publications, HGNC publications, Gene Ontology Consortium papers, Ensembl papers, GTEx Consortium papers, Human Protein Atlas papers, ENCODE Consortium papers, Human Cell Atlas papers.

---

### 14. Knowledge Graph
**Nodes**:
`Gene` → `Transcript` → `Protein` → `Variant` → `Disease` → `Drug` → `Pathway` → `Publication` → `Expression Profile` → `Cell Type`

**Relations**:
encodes, expressed_in, participates_in, associated_with, regulated_by, interacts_with, causes, targeted_by.

---

### 15. AI Applications
Bioquora should implement:
Gene search engine, Gene embeddings, Gene similarity search, Disease gene prioritization, Drug target discovery, Pathway enrichment, Biomarker recommendation, Gene–gene interaction prediction, Gene GraphRAG, Foundation model integration.

---

### 16. High-Value Gene Collections
Continuously prioritize:
* **Cancer Genes**: TP53, BRCA1, BRCA2, EGFR, KRAS, APC, PIK3CA, PTEN, RB1, BRAF
* **Cardiovascular**: LDLR, APOB, PCSK9, MYH7, MYBPC3
* **Neurology**: APP, PSEN1, PSEN2, MAPT, SNCA, LRRK2
* **Immunology**: HLA, IL6, TNF, IFNG, TLR4
* **Pharmacogenomics**: CYP2D6, CYP2C19, CYP3A5, TPMT, DPYD, SLCO1B1

---

### 17. ETL Pipeline
`NCBI Gene` → `Entrez API` → `Gene Metadata` → `Expression Resources` → `Pathway Mapping` → `Knowledge Graph` → `Gene Embeddings` → `Bioquora Gene Intelligence`

---

### 18. Cross-Link Every Gene
Automatically connect with:
RefSeq, GenBank, ClinVar, dbSNP, dbGaP, GEO, SRA, GTEx, TCGA, ENCODE, Human Cell Atlas, UniProt, PDB, AlphaFold DB, Reactome, KEGG, Gene Ontology, ChEBI, OMIM, GeneReviews, PharmGKB, Open Targets, PubMed, Europe PMC, OpenAlex, ORCID, ROR.

---

### 19. Essential Accessible Resources
**Official**:
* [ncbi.nlm.nih.gov/gene](https://www.ncbi.nlm.nih.gov/gene)
* [ftp.ncbi.nlm.nih.gov/gene](https://ftp.ncbi.nlm.nih.gov/gene)
* [ncbi.nlm.nih.gov/datasets/gene](https://www.ncbi.nlm.nih.gov/datasets/gene)
* [ncbi.nlm.nih.gov/books/NBK3841](https://www.ncbi.nlm.nih.gov/books/NBK3841)

**Major Databases**:
[genenames.org](https://www.genenames.org), [ensembl.org](https://www.ensembl.org), [uniprot.org](https://www.uniprot.org), [reactome.org](https://reactome.org), [genome.jp/kegg](https://www.genome.jp/kegg), [proteinatlas.org](https://www.proteinatlas.org), [encodeproject.org](https://www.encodeproject.org), [gtexportal.org](https://gtexportal.org), [humancellatlas.org](https://www.humancellatlas.org), [ebi.ac.uk/gxa](https://www.ebi.ac.uk/gxa).

**GitHub**:
[github.com/ncbi](https://github.com/ncbi), [github.com/ncbi/datasets](https://github.com/ncbi/datasets), [github.com/biopython/biopython](https://github.com/biopython/biopython), [github.com/scverse/scanpy](https://github.com/scverse/scanpy), [github.com/scverse/anndata](https://github.com/scverse/anndata), [github.com/scverse/scvi-tools](https://github.com/scverse/scvi-tools), [github.com/Ensembl/ensembl-rest](https://github.com/Ensembl/ensembl-rest), [github.com/reactome](https://github.com/reactome), [github.com/wikipathways](https://github.com/wikipathways).

---

### 20. Bioquora Integration Blueprint
`NCBI Gene` → `Gene Metadata` → `RefSeq` → `Expression` → `Variants` → `Diseases` → `Pathways` → `Knowledge Graph` → `LLM + GraphRAG` → `Bioquora Gene Intelligence Platform`

---

### 21. Advanced AI Resources (Must Integrate)
* **Gene Foundation Models**: Geneformer, scGPT, scFoundation, CellPLM, scBERT, GenePT
* **Protein Foundation Models**: ESM-2, ProtT5, ProtBERT, AlphaFold, OpenFold, Boltz
* **Functional Prediction**: DeepGO, NetGO, DeepFRI, STRING functional predictions
* **Benchmark Datasets**: Open Targets Genetics, DepMap, CCLE, LINCS L1000, Human Protein Atlas, GTEx, TCGA, ENCODE

These provide AI-ready annotations and embeddings that can be layered directly onto NCBI Gene records for advanced search, GraphRAG, and clinical interpretation.

---

### STEP 2.8 Status
✅ **NCBI Gene Ecosystem — God Mode Implementation Complete**

This implementation establishes the central gene intelligence layer for Bioquora, connecting genes to transcripts, proteins, variants, expression profiles, pathways, diseases, drugs, publications, and AI foundation models.

---

*Next (STEP 2.9): RefSeq.*
