# BIOGRAPH CORE — ARCHITECTURE DECISION REPOSITORY (ADR CODEX)
**Constitutional Architecture Records — BIOQUORA Step 4 Stage 1**  
**Document ID:** ADR-CODEX-2026-V1.0  
**Status:** FROZEN  

---

## ADR-001: Selection of Labeled Property Graph (LPG) Over Pure RDF Triple Store
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** Biomedical knowledge graphs require both rich key-value edge properties (e.g., `p_value`, `sample_size`, `pmid`, `confidence`) and sub-500ms multi-hop traversal for real-time GraphRAG. Pure RDF triple stores require RDF Reification or RDF-Star to attach metadata to edges, resulting in severe query overhead.
* **Decision:** BIOQUORA adopts **Labeled Property Graph (LPG)** for core operational storage and querying, while maintaining an automated **W3C RDF/Turtle serialization layer** for interoperability.

---

## ADR-002: Selection of Neo4j as Primary Graph Storage Engine
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** BIOQUORA requires robust transactional ACID guarantees, native Graph Data Science (PageRank, Node2Vec, causal link prediction), and enterprise vector index integration.
* **Decision:** Neo4j Community/Enterprise is selected as the v1 core database engine.

---

## ADR-003: Mandatory Evidence & Provenance Envelopes on All Edges
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** Unverified assertions or unreferenced claims cause AI hallucination in biomedical discovery.
* **Decision:** 100% of graph edges must carry a verified `evidence` envelope (`pmid`/`doi`, `confidence >= 0.70`). Edges failing this check are rejected at insertion time.

---

## ADR-004: Ontology-First Entity Grounding
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** Ad-hoc naming conventions create graph fragmentation.
* **Decision:** All entities must map to a standardized authoritative ontology (`MONDO`, `DrugBank`, `UniProt`, `HGNC`, `Reactome`, `CL`, `HP`).

---

## ADR-005: Cryptographic Immutable Lineage
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** Regulatory audit compliance requires tracing every graph edge back to its exact literature source text.
* **Decision:** Every node and edge records `created_at`, `extraction_pipeline`, and SHA-256 span hash.

---

## ADR-006: Versioned Graph Releases (`v1.0.0-KG`)
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** Scientific reasoning experiments must be reproducible against fixed graph states.
* **Decision:** BioGraph Core releases follow strict semantic versioning (`vMAJOR.MINOR.PATCH-KG`).

---

## ADR-007: Adoption of Canonical BKOS (`v1.0`) as Upstream Ingestion Interface
* **Date:** 2026-07-13
* **Status:** ACCEPTED / FROZEN
* **Context:** BIOQUORA Step 3 generates standardized Biomedical Knowledge Objects (`BKOS v1.0`).
* **Decision:** `BKOS v1.0` is designated as the sole canonical JSON input interface for Stage 2 graph ingestion.
