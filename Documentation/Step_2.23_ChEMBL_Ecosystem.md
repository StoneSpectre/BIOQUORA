# BIOQUORA FOUNDER BIBLE

## STEP 2.23 — ChEMBL (God Mode Resource Vault)

> **Importance**: ChEMBL, maintained by EMBL-EBI, is the world's premier manually curated bioactivity database, containing millions of bioactivity measurements linking small molecules → biological targets → assays → pharmacological effects → diseases → drugs → clinical development. Unlike PubChem, which focuses on chemical information broadly, ChEMBL specializes in quantitative pharmacology (IC₅₀, EC₅₀, Kᵢ, Kd, potency, efficacy, selectivity). For Bioquora, ChEMBL becomes the Pharmacology Intelligence Layer.

---

### 1. Official Infrastructure
* **ChEMBL Portal**: [ebi.ac.uk/chembl](https://www.ebi.ac.uk/chembl)
* **ChEMBL Database**: [ebi.ac.uk/chembl/db](https://www.ebi.ac.uk/chembl/db)
* **REST API**: [ebi.ac.uk/chembl/api/data](https://www.ebi.ac.uk/chembl/api/data)
* **API Documentation**: [ebi.ac.uk/chembl/api/data/docs](https://www.ebi.ac.uk/chembl/api/data/docs)
* **Downloads**: [ftp.ebi.ac.uk/pub/databases/chembl](https://ftp.ebi.ac.uk/pub/databases/chembl)
* **SQL Dumps**: [ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb](https://ftp.ebi.ac.uk/pub/databases/chembl/ChEMBLdb)
* **Web Services**: [ebi.ac.uk/chembl/ws](https://www.ebi.ac.uk/chembl/ws)
* **GitHub**: [github.com/chembl](https://github.com/chembl)

---

### 2. Core Databases (Harvest EVERYTHING)
* **Molecules**: Drug-like molecules, Natural products, Synthetic compounds, Peptides, Biologics.
* **Targets**: Proteins, Protein complexes, Protein families, Protein-protein interactions, RNA targets, DNA targets, Cell lines, Tissues, Organisms.
* **Assays**: Binding assays, Functional assays, ADMET assays, Cell-based assays, Biochemical assays, Phenotypic assays, Toxicology assays.
* **Activities**: IC₅₀, EC₅₀, Kᵢ, Kd, Potency, Selectivity, MIC, GI₅₀, AC₅₀, Percent inhibition.
* **Documents**: Scientific papers, Patents, Clinical reports, Supporting literature.
* **Drugs**: Approved drugs, Clinical candidates, Withdrawn drugs, Investigational drugs.
* **Mechanisms**: Mechanism of action, Target engagement, Drug-target relationships.
* **Indications**: Disease indications, Clinical use, Drug repurposing.

---

### 3. Metadata (Collect EVERYTHING)
ChEMBL ID, Molecule ID, Target ID, Assay ID, Activity ID, Document ID, Drug ID, Mechanism ID, Indication ID, Molecule Name, Synonyms, SMILES, InChI, InChIKey, Formula, Exact Mass, Molecular Weight, LogP, TPSA, Lipinski Properties, Ro5 Violations, Target Name, Target Type, Protein Family, Gene Symbol, Species, Assay Type, Bioactivity Value, Units, Standard Type, Confidence Score, Document DOI, PMID, Clinical Phase, ATC Code, Cross References, Release Version, Update Date.

---

### 4. Bioactivity Measurements
Harvest:
IC₅₀, EC₅₀, Kᵢ, Kd, MIC, AC₅₀, ED₅₀, LD₅₀, Percent inhibition, Binding affinity, Selectivity index, Therapeutic index, ADMET parameters.

---

### 5. Cross-Link Databases
Automatically connect:
PubChem → DrugBank → ChEBI → BindingDB → UniProt → NCBI Gene → Reactome → KEGG → Open Targets → Guide to PHARMACOLOGY → ClinVar → GTEx → TCGA → PDB → AlphaFold → PubMed → Europe PMC → OpenAlex.

---

### 6. APIs
Implement:
ChEMBL REST API, Molecule API, Target API, Assay API, Activity API, Mechanism API, Drug API, Document API, Similarity Search, Substructure Search, Image API, JSON, XML.

---

### 7. Bulk Downloads
Harvest:
SQLite database, PostgreSQL dumps, MySQL dumps, SDF, FASTA, CSV, TSV, JSON, Entire ChEMBL release, Release notes.

---

### 8. GitHub Ecosystem
**Official**: [github.com/chembl](https://github.com/chembl)

**Essential Repositories**:
* [github.com/chembl/ChEMBL_Structure_Pipeline](https://github.com/chembl/ChEMBL_Structure_Pipeline)
* [github.com/chembl/chembl_webresource_client](https://github.com/chembl/chembl_webresource_client)
* [github.com/rdkit/rdkit](https://github.com/rdkit/rdkit)
* [github.com/deepchem/deepchem](https://github.com/deepchem/deepchem)
* [github.com/datamol-io/datamol](https://github.com/datamol-io/datamol)
* [github.com/openbabel/openbabel](https://github.com/openbabel/openbabel)
* [github.com/pyg-team/pytorch_geometric](https://github.com/pyg-team/pytorch_geometric)
* [github.com/dglai/dgl](https://github.com/dglai/dgl)
* [github.com/huggingface/transformers](https://github.com/huggingface/transformers)
* [github.com/choderalab/openmm](https://github.com/choderalab/openmm)

---

### 9. Python Ecosystem
Implement:
chembl_webresource_client, RDKit, DeepChem, Open Babel, Datamol, Mordred, PyTorch Geometric, DGL, PyTorch, Pandas, Polars, NumPy, SciPy.

---

### 10. Landmark Research Papers
Automatically index:
* **ChEMBL**: Original ChEMBL publication, Annual ChEMBL database updates, Nucleic Acids Research Database Issue papers.
* **Pharmacology**: Drug-target interaction prediction, QSAR, Virtual screening, Structure-activity relationship (SAR), Polypharmacology, Drug repurposing.

---

### 11. Knowledge Graph
**Nodes**:
`Drug` → `Molecule` → `Target` → `Protein` → `Assay` → `Bioactivity` → `Disease` → `Publication`

**Relations**:
binds_to, inhibits, activates, tested_in, associated_with, treats, has_mechanism, reported_in.

---

### 12. AI Applications
Bioquora should implement:
Drug-target prediction, Bioactivity prediction, QSAR modeling, Virtual screening, Drug repurposing, ADMET prediction, Polypharmacology explorer, Pharmacology GraphRAG, Molecular embeddings, AI medicinal chemistry assistant.

---

### 13. ETL Pipeline
`ChEMBL` → `REST API` → `Molecules + Targets + Activities` → `Bioactivity Normalization` → `Knowledge Graph` → `Molecular Embeddings` → `Bioquora Pharmacology Intelligence`

---

### 14. High-Value Collections
Synchronize continuously:
Approved drugs, Clinical candidates, Kinase inhibitors, GPCR ligands, Ion channel modulators, Nuclear receptor ligands, Anticancer compounds, Antimicrobials, Antivirals, CNS drugs.

---

### 15. Bioquora Applications
Drug explorer, Target explorer, Bioactivity dashboard, Structure-activity relationship (SAR) explorer, Virtual screening workspace, AI medicinal chemistry assistant, Drug repurposing engine, Precision pharmacology dashboard, Molecular GraphRAG, Drug discovery knowledge graph.

---

### 16. Continuous Harvest Strategy
**Daily**:
New ChEMBL releases, Bioactivity updates, Assay updates.

**Weekly**:
DrugBank reconciliation, UniProt reconciliation, PubChem synchronization.

**Monthly**:
Full pharmacology graph rebuild, Activity normalization, Molecular embedding regeneration.

---

### 17. Essential Accessible Resources
**Official**:
* [ebi.ac.uk/chembl](https://www.ebi.ac.uk/chembl)
* [ebi.ac.uk/chembl/api/data](https://www.ebi.ac.uk/chembl/api/data)
* [ebi.ac.uk/chembl/api/data/docs](https://www.ebi.ac.uk/chembl/api/data/docs)
* [ftp.ebi.ac.uk/pub/databases/chembl](https://ftp.ebi.ac.uk/pub/databases/chembl)
* [github.com/chembl](https://github.com/chembl)

**Related Databases**:
[go.drugbank.com](https://go.drugbank.com), [bindingdb.org](https://www.bindingdb.org), [pubchem.ncbi.nlm.nih.gov](https://pubchem.ncbi.nlm.nih.gov), [ebi.ac.uk/chebi](https://www.ebi.ac.uk/chebi), [guidetopharmacology.org](https://www.guidetopharmacology.org), [platform.opentargets.org](https://platform.opentargets.org).

**GitHub**:
[github.com/chembl](https://github.com/chembl), [github.com/chembl/chembl_webresource_client](https://github.com/chembl/chembl_webresource_client), [github.com/chembl/ChEMBL_Structure_Pipeline](https://github.com/chembl/ChEMBL_Structure_Pipeline), [github.com/rdkit/rdkit](https://github.com/rdkit/rdkit), [github.com/deepchem/deepchem](https://github.com/deepchem/deepchem), [github.com/openbabel/openbabel](https://github.com/openbabel/openbabel), [github.com/datamol-io/datamol](https://github.com/datamol-io/datamol), [github.com/pyg-team/pytorch_geometric](https://github.com/pyg-team/pytorch_geometric).

---

### 18. Advanced AI & Foundation Models
Integrate:
* **Molecular Models**: ChemBERTa, MolFormer, MegaMolBART, Uni-Mol, GROVER, MolMIM.
* **Drug Discovery Models**: DeepChem, TorchDrug, Graphormer, GraphMVP, MoleculeSTM.
* **Benchmarks**: MoleculeNet, Therapeutics Data Commons (TDC), Open Graph Benchmark (MOL), ChEMBL Benchmark Suite, DrugOOD, ADMET Benchmark Group.

---

### 19. Bioquora Integration Blueprint
`ChEMBL` → `Molecules` → `Targets` → `Bioactivities` → `Mechanisms` → `Diseases` → `Knowledge Graph` → `Drug Foundation Models` → `LLM + GraphRAG` → `Bioquora Pharmacology Intelligence Platform`

---

### 20. Additional High-Impact Resources (Must Integrate)
**Drug Discovery**:
* **Open Targets Platform**: [platform.opentargets.org](https://platform.opentargets.org)
* **Guide to PHARMACOLOGY**: [guidetopharmacology.org](https://www.guidetopharmacology.org)
* **BindingDB**: [bindingdb.org](https://www.bindingdb.org)
* **DrugBank**: [go.drugbank.com](https://go.drugbank.com)
* **DrugCentral**: [drugcentral.org](https://drugcentral.org)

**AI Drug Discovery**:
* **Therapeutics Data Commons**: [tdcommons.ai](https://tdcommons.ai)
* **MoleculeNet**: [moleculenet.org](https://moleculenet.org)
* **TorchDrug**: [torchdrug.ai](https://torchdrug.ai)
* **DeepChem**: [deepchem.io](https://deepchem.io)

**Clinical Resources**:
* **ClinicalTrials.gov**: [clinicaltrials.gov](https://clinicaltrials.gov)
* **FDA Drugs**: [accessdata.fda.gov/scripts/cder/daf](https://www.accessdata.fda.gov/scripts/cder/daf)
* **EMA Medicines**: [ema.europa.eu](https://www.ema.europa.eu)

---

### 21. Research Papers to Mirror
Continuously index:
* **ChEMBL Consortium**: Original ChEMBL publication, Annual ChEMBL database updates, Nucleic Acids Research database issues.
* **Drug Discovery AI**: QSAR modeling, Drug-target interaction prediction, Polypharmacology, Virtual screening with deep learning, ADMET prediction, Graph neural networks for drug discovery, Foundation models for medicinal chemistry.

---

### STEP 2.23 Status
✅ **ChEMBL Ecosystem — God Mode Implementation Complete**

This establishes Bioquora's pharmacology and drug discovery intelligence layer, integrating bioactive molecules, assays, quantitative activity measurements, mechanisms of action, targets, diseases, and state-of-the-art AI models into a unified biomedical knowledge graph.

---

*Next (STEP 2.24): DrugBank.*
