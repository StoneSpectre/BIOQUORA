# BIOGRAPH CORE — SEMANTIC LAYER ARCHITECTURE BLUEPRINT
**Constitutional Architecture Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** SLAB-2026-V1.0  
**Status:** FROZEN  

---

## 1. Core Design Principle: Separating Meaning From Storage
In BioGraph Core, the **Storage Layer** (Neo4j LPG) stores nodes, properties, and relationships. However, **meaning** is governed entirely by the **Semantic Layer Architecture**. This 6-tier stack guarantees that every stored triple is scientifically unambiguous and grounded in authoritative global standards.

---

## 2. The 6-Tier Architecture Stack

```
┌─────────────────────────────────────────────────────────────┐
│ 1. SEMANTIC LAYER — Defines Scientific Meaning              │
│    Enforces domain semantics (e.g., Mechanism of Action)    │
├─────────────────────────────────────────────────────────────┤
│ 2. ONTOLOGY LAYER — Defines Controlled Vocabulary           │
│    Grounds entities in MONDO, DrugBank, UniProt, HGNC       │
├─────────────────────────────────────────────────────────────┤
│ 3. IDENTITY LAYER — Defines Canonical Resolvability         │
│    Enforces unique bioq_id and preferred_id deduplication   │
├─────────────────────────────────────────────────────────────┤
│ 4. EVIDENCE LAYER — Defines Empirical Truth                 │
│    Validates p-values, sample sizes, PMIDs, confidence      │
├─────────────────────────────────────────────────────────────┤
│ 5. REASONING LAYER — Defines GraphRAG Inference & Paths     │
│    Executes multi-hop subgraph path traversal & explanations│
├─────────────────────────────────────────────────────────────┤
│ 6. GRAPH STORAGE LAYER — Executes High-Speed Queries        │
│    Neo4j Labeled Property Graph (LPG) engine                │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Layer Responsibilities & Verification
1. **Semantic Layer:** Validates that `DRUG_TREATS_DISEASE` connects a `Drug` node to a `Disease` node (type domain/range checking).
2. **Ontology Layer:** Validates that the subject CURIE starts with `DrugBank:` or `ChEMBL:` and the object CURIE starts with `MONDO:` or `DOID:`.
3. **Identity Layer:** Verifies deduplication against canonical `preferred_id` mappings.
4. **Evidence Layer:** Rejects any relationship missing a valid PubMed/DOI citation or confidence score < 0.70.
5. **Reasoning Layer:** Formats graph triples into explainable GraphRAG contexts.
6. **Graph Storage Layer:** Persists verified objects into transactional Neo4j storage.
