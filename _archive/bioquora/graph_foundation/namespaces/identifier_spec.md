# BIOGRAPH CORE — NAMESPACE & IDENTIFIER SPECIFICATION
**Constitutional Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** NIS-2026-V1.0  
**Status:** FROZEN  

---

## 1. Canonical Node Identification
Every node in BioGraph Core must maintain the standard 9-property identifier envelope:

```yaml
bioq_id: "bioq_node_01H123456789"
external_ids:
  drugbank: "DB00853"
  chembl: "CHEMBL102"
preferred_id: "DrugBank:DB00853"
aliases:
  - "Temozolomide"
  - "Temodar"
namespace: "DrugBank"
version: "1.0"
status: "ACTIVE"
created_at: "2026-07-13T10:00:00Z"
updated_at: "2026-07-13T10:00:00Z"
```

---

## 2. Namespace URI Resolution Rule
Whenever an interoperability client exports a CURIE (`PREFIX:LOCAL_ID`), the BioGraph resolver expands it to a fully qualified URI using the canonical prefix mapping table (`namespaces.json`).
