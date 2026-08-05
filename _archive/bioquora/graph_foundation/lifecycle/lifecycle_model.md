# BIOGRAPH CORE — KNOWLEDGE LIFECYCLE MODEL
**Constitutional Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** KLM-2026-V1.0  
**Status:** FROZEN  

---

## 1. The 9 Canonical States of Biomedical Knowledge

```
DISCOVERY ──► EXTRACTION ──► VALIDATION ──► ONTOLOGY_MAPPING ──► GRAPH_INTEGRATION
                                 │                 │
                                 ▼                 ▼
                            DEPRECATION       DEPRECATION
                                 │                 │
                                 ▼                 ▼
                              ARCHIVE           ARCHIVE

GRAPH_INTEGRATION ──► PUBLICATION ──► UPDATE ──► VALIDATION
                           │
                           ▼
                      DEPRECATION ──► ARCHIVE
```

---

## 2. State Transition Governance
* **DISCOVERY $\rightarrow$ EXTRACTION:** Literature text ingested from PubMed/PMC.
* **EXTRACTION $\rightarrow$ VALIDATION:** NLP pipeline extracts triples and passes them to the Semantic Layer.
* **VALIDATION $\rightarrow$ ONTOLOGY_MAPPING:** Entities mapped to authoritative CURIEs (`MONDO`, `DrugBank`, `UniProt`).
* **ONTOLOGY_MAPPING $\rightarrow$ GRAPH_INTEGRATION:** Nodes and edges inserted into transactional Neo4j staging graph.
* **GRAPH_INTEGRATION $\rightarrow$ PUBLICATION:** Triples promoted to live GraphRAG production release (`v1.0.0-PROD`).
* **DEPRECATION $\rightarrow$ ARCHIVE:** Superseded assertions archived into immutable cold storage with complete historical audit trail.
