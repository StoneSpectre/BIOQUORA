# BIOGRAPH CORE — GRAPH SCHEMA BLUEPRINT (`v1.0`)
**Constitutional Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** GSB-2026-V1.0  
**Status:** FROZEN  

---

## 1. Schema Principles
1. **Stable:** Core node properties (`bioq_id`, `preferred_id`, `category`, `name`) are immutable across minor releases.
2. **Extensible:** Optional properties and domain-specific attributes can be appended without breaking schema validation.
3. **Ontology-Aware:** Every node is required to carry `preferred_id` formatted as a valid Compact URI (`CURIE`).
4. **Evidence-Aware:** Every edge stores mandatory confidence and publication provenance.

---

## 2. Neo4j Cypher DDL & Constraints
To ensure database-level constitutional compliance, BioGraph Core initializes Neo4j with the following strict constraints:

```cypher
// Uniqueness constraints on bioq_id and preferred_id
CREATE CONSTRAINT node_bioq_id_unique IF NOT EXISTS
FOR (n:BiomedicalNode) REQUIRE n.bioq_id IS UNIQUE;

CREATE INDEX node_preferred_id_idx IF NOT EXISTS
FOR (n:BiomedicalNode) ON (n.preferred_id);

CREATE INDEX node_category_idx IF NOT EXISTS
FOR (n:BiomedicalNode) ON (n.category);
```
