# BIOGRAPH CORE — KNOWLEDGE MODELING HANDBOOK
**Constitutional Modeling Manual — BIOQUORA Step 4 Stage 1**  
**Document ID:** KMHB-2026-V1.0  
**Status:** FROZEN  

---

## 1. The Knowledge Transformation Pipeline
Every scientific assertion extracted from biomedical literature undergoes a strict 6-step transformation hierarchy before entering the graph:

```
Unstructured Text (PubMed/PMC)
             │
             ▼
     Knowledge Assertion
             │
             ▼
       Entity Mapping
             │
             ▼
     Canonical Node Creation (16 Categories)
             │
             ▼
   Relationship Creation (Edge Predicate + Evidence)
             │
             ▼
      Ontology Grounding (MONDO/DrugBank/UniProt)
             │
             ▼
     Graph Integration (Neo4j LPG + RDF Export)
```

---

## 2. Canonical Node Catalog (16 Classes)

| Category | Primary Ontology | Example CURIE | Description & Rules |
| :--- | :--- | :--- | :--- |
| **Disease** | `MONDO` / `DOID` | `MONDO:0005086` | Human diseases and clinical syndromes. Must resolve to MONDO leaf node where available. |
| **Drug** | `DrugBank` / `ChEMBL` | `DrugBank:DB00853` | Approved or investigational therapeutic agents. |
| **Gene** | `HGNC` / `Ensembl` | `HGNC:3236` | Human genomic loci. |
| **Protein** | `UniProt` | `UniProt:P00533` | Translational proteins and isoforms. |
| **Variant** | `dbSNP` / `ClinVar` | `dbSNP:rs121913529` | Short genetic variations and mutations. |
| **Pathway** | `Reactome` / `KEGG` | `Reactome:R-HSA-162582` | Signaling or metabolic pathways. |
| **Cell** | `CL` (Cell Ontology) | `CL:0000057` | Specific cell lines or primary tissue lineages. |
| **Phenotype** | `HP` (Human Phenotype) | `HP:0002011` | Observable clinical or pathological characteristics. |
| **Publication** | `PMID` / `DOI` | `PMID:36814231` | Scientific research paper or preprint. |
| **ClinicalTrial**| `NCT` | `NCT00006390` | ClinicalTrials.gov registered study. |
| **Dataset** | `GEO` / `ArrayExpress` | `GEO:GSE12345` | Empirical experimental data package. |
| **Author** | `ORCID` | `ORCID:0000-0002-1825-0097`| Scientific investigator. |
| **Institution** | `ROR` | `ROR:04xm1d337` | Academic or biopharma research institution. |
| **Biomarker** | `BIOQ` | `BIOQ:BM-001` | Diagnostic, predictive, or prognostic biomarker. |
| **Chemical** | `ChEBI` / `PubChem` | `CHEBI:49637` | Small molecules and physiological metabolites. |
| **Organism** | `NCBITaxon` | `NCBITaxon:9606` | Biological species (`Homo sapiens = 9606`). |

---

## 3. Canonical Edge Predicates
Every edge in BioGraph Core must belong to the enumerated `EdgePredicate` vocabulary (`DRUG_TREATS_DISEASE`, `DRUG_TARGETS_PROTEIN`, `GENE_ASSOCIATED_WITH_DISEASE`, `PROTEIN_INTERACTS_WITH_PROTEIN`, etc.) and include the immutable `evidence` sub-envelope.
