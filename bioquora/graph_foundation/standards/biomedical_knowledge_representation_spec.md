# BIOMEDICAL KNOWLEDGE REPRESENTATION SPECIFICATION (BKRS)
**Constitutional Document — BIOQUORA Step 4 Stage 1 (`BioGraph Core v1.0`)**  
**Document ID:** BKRS-2026-V1.0  
**Status:** FROZEN CONSTITUTIONAL SPECIFICATION  

---

## 1. Executive Summary & Philosophy
In the BIOQUORA Biomedical Knowledge Graph (`BioKG`), **knowledge is distinct from raw data or unstructured text**. Unstructured biomedical literature (e.g., PubMed abstracts, PMC full texts, clinical guidelines) contains observations, claims, and statistical patterns. For BIOQUORA to reason accurately without hallucination, every extracted claim must be promoted into an immutable, self-describing **Biomedical Knowledge Object** and subsequently into a **Graph Knowledge Unit (GKU)**.

---

## 2. Taxonomy of Biomedical Knowledge
BIOQUORA explicitly categorizes and represents seven foundational knowledge paradigms:

### 2.1 Declarative Knowledge
* **Definition:** Factual statements asserting an immutable or verifiable biological truth (`Entity - Relation - Entity`).
* **Example:** `Temozolomide (DB00853)` — `TREATS` — `Glioblastoma Multiforme (MONDO:0005086)`.

### 2.2 Procedural Knowledge
* **Definition:** Multi-step clinical protocols, dosing schedules, laboratory assays, and therapeutic pathways.
* **Example:** `Dosing Protocol: 75 mg/m2 daily for 42 days concomitant with focal radiotherapy.`

### 2.3 Ontological Knowledge
* **Definition:** Hierarchical and definitional relationships governing formal biological classification.
* **Example:** `Glioblastoma Multiforme` is a subclass (`rdfs:subClassOf`) of `High-Grade Glioma`.

### 2.4 Evidence-Based Knowledge
* **Definition:** Knowledge grounded in rigorous empirical trial design, sample size, p-values, and hazard ratios.
* **Example:** `Hazard Ratio = 0.63 (95% CI 0.52–0.75, p < 0.001) from Phase III RCT NCT00006390 (n=573).`

### 2.5 Probabilistic Knowledge
* **Definition:** Uncertain or confidence-weighted assertions derived from machine extraction or early observational studies.
* **Example:** `ExtractConfidence = 0.962 | ExperimentalReplicationProbability = 0.89.`

### 2.6 Scientific & Mechanistic Knowledge
* **Definition:** Causal biochemical cascades connecting genetic variants, molecular targets, signaling cascades, and clinical phenotypes.
* **Example:** `EGFR amplification causes PI3K/AKT/mTOR pathway hyperactivation leading to tumor proliferation.`

---

## 3. The 8 Constitutional Knowledge Questions
Every single node, edge, and triple added to the BIOQUORA Knowledge Graph MUST strictly answer the following eight canonical questions:

1. **What is it?**  
   * Canonical semantic class (`NodeCategory` or `RelationshipType`) and explicit biological definition.
2. **Where did it originate?**  
   * Complete cryptographic provenance (`PMID:36814231`, paragraph offset `L114-118`, extraction pipeline `BioUnderstand-v1.0.0-PROD`).
3. **How reliable is it?**  
   * Normalized extraction confidence (`[0.0, 1.0]`) and study design weight (`Meta-Analysis=1.0`, `Phase III RCT=0.9`, `In-vitro=0.4`).
4. **Which ontology defines it?**  
   * Globally authoritative CURIE (`DrugBank:DB00853`, `MONDO:0005086`, `UniProt:P00533`, `HGNC:3236`).
5. **What evidence supports it?**  
   * Structured empirical metrics (`p_value`, `sample_size`, `effect_size`, `study_type`).
6. **When was it discovered?**  
   * Publication timestamp, ingestion timestamp, and semantic assertion timestamp.
7. **Who validated it?**  
   * Automated readiness validator signature OR human curator ORCID identifier.
8. **Can it change over time?**  
   * Explicit temporal mutability and deprecation policy (`IMMUTABLE_HISTORICAL`, `REVISABLE_CLINICAL`, `SUPERSEDED`).

---

## 4. Formal JSON Schema Specification for Knowledge Representation
Every Knowledge Assertion entering BioGraph Core conforms to the `CanonicalKnowledgeAssertion` JSON envelope defined in Module 6 (`graph_schema_v1.json`).
