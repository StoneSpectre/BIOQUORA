# BIOGRAPH CORE — GRAPH MODELING DECISION DOCUMENT
**Constitutional Architecture Document — BIOQUORA Step 4 Stage 1**  
**Document ID:** GMDD-2026-V1.0  
**Status:** FROZEN  

---

## 1. Objective
To systematically compare graph paradigms and define the permanent storage, querying, and interoperability model for the BIOQUORA Biomedical Knowledge Graph (`BioKG`).

---

## 2. Structural & Architectural Comparison Matrix

| Dimension | Native Labeled Property Graph (LPG - Neo4j) | Semantic Web Triple Store (RDF/OWL - Apache Jena/Blazegraph) | **BIOQUORA Hybrid Decision** |
| :--- | :--- | :--- | :--- |
| **Primary Unit** | `Node`, `Edge`, and rich key-value `Properties` on both | Atomic `Subject -> Predicate -> Object` triples | **LPG Core** for operational speed; **RDF Exporter** for W3C interoperability |
| **Edge Provenance & Evidence** | Natively stores `p_value`, `sample_size`, `confidence`, and `pmid` directly on the Edge (`DRUG_TREATS_DISEASE`) | Requires complex RDF Reification or RDF-Star (`<<:s :p :o>> :evidence :e`) | **Native Edge Properties** in LPG eliminate graph explosion |
| **Query Language** | Cypher (Declarative pattern matching, sub-500ms graph traversal) | SPARQL (Federated RDF pattern queries) | **Cypher** for runtime GraphRAG API; **SPARQL endpoint** via export layer |
| **Graph Data Science (GDS)** | Native integration with link prediction, PageRank, Node2Vec, and Graph Neural Networks (GNNs) | Poor native ML/GNN runtime support | **Neo4j GDS** for mechanistic causal pathway discovery |
| **Ontology Grounding** | Node/Edge properties store CURIEs (`id: "MONDO:0005086"`) | Native URI namespaces (`http://purl.obolibrary.org/obo/MONDO_0005086`) | **CURIE properties** with dual URI mapping |

---

## 3. Formal Decision (ADR-001 & ADR-002 Alignment)
1. **Operational Graph Engine:** BIOQUORA adopts **Labeled Property Graph (LPG)** using Neo4j as the primary operational database for Stage 2+ ingestion, GraphRAG reasoning, and Graph Data Science.
2. **Interoperability Exporter Layer:** BIOQUORA maintains automated serialization into **W3C RDF/Turtle (`.ttl`)** and **JSON-LD** so global research consortia can ingest BIOQUORA knowledge into federated SPARQL endpoints.
