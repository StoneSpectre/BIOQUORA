# BIOGRAPH CORE — GRAPH QUALITY ASSURANCE FRAMEWORK
**Constitutional Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** GQAF-2026-V1.0  
**Status:** FROZEN  

---

## 1. Quality Dimensions & Thresholds
BioGraph Core enforces 9 strict quality metrics across any candidate node/edge batch:

| Metric | Target Threshold | Description |
| :--- | :--- | :--- |
| **Graph Consistency** | `100%` | Zero dangling edges; every edge points to existing `source_bioq_id` and `target_bioq_id`. |
| **Ontology Compliance** | `>= 99.5%` | Entities map to valid CURIEs defined in `namespaces.json`. |
| **Duplicate Rate** | `< 0.1%` | Uniqueness on `(preferred_id, category)` pair. |
| **Evidence Completeness** | `100%` | Every edge possesses `confidence >= 0.70` and publication citation (`PMID`/`DOI`). |
| **Provenance Coverage** | `100%` | Every node/edge has explicit extraction pipeline signature and timestamp. |
| **Schema Compliance** | `100%` | Strict JSON Schema conformance against `graph_schema_v1.json`. |
| **Node Integrity** | `100%` | All mandatory attributes populated (`bioq_id`, `preferred_id`, `name`). |
| **Edge Integrity** | `100%` | All predicates belong to `EdgePredicate` enum. |
| **Temporal Integrity** | `100%` | ISO 8601 timestamps formatted correctly; `updated_at >= created_at`. |
