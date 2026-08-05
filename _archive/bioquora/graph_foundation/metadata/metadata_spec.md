# BIOGRAPH CORE — METADATA ARCHITECTURE SPECIFICATION
**Constitutional Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** GMAS-2026-V1.0  
**Status:** FROZEN  

---

## 1. Required Metadata Attributes
Every Graph Knowledge Unit (GKU), Node, and Edge entering BioGraph Core must embed the following 12 canonical metadata attributes:
1. `created_at`: ISO 8601 creation timestamp.
2. `updated_at`: ISO 8601 last modified timestamp.
3. `source`: Upstream data origin (`PubMed`, `PMC`, `DrugBank Release 5.1`).
4. `license`: Open science license (`CC-BY-4.0`).
5. `evidence_count`: Total number of independent literature citations supporting the assertion (`>= 1`).
6. `confidence`: Normalized extraction and consensus score (`0.00` to `1.00`).
7. `version`: Semantic schema version (`1.0`).
8. `quality_score`: Multi-dimensional quality score computed by Stage 1 Quality Framework (`0.00` to `1.00`).
9. `maintainer`: Agent or team responsible for entity lifecycle (`BIOQUORA-Automated-Curator`).
10. `extraction_pipeline`: Exact pipeline build signature (`BioUnderstand-v1.0.0-PROD`).
11. `model_version`: Underlying NER/RE checkpoint (`BioASQ-BLURB-v1.0`).
12. `validation_status`: Explicit readiness state (`PASSED_STAGE1_VERIFIED`).
