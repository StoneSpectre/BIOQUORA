# BIOQUORA FOUNDER BIBLE
## Volume I — Step 1: Biomedical Semantic Foundation
### Part 1: Biomedical Knowledge Representation — Full Engineering & Executable Design Specification
**Version:** 1.0.0-PROD  
**Classification:** Internal Core Architecture Specification (5–10 Year Engineering Horizon)  
**Target System:** Bioquora Semantic Foundation & Canonical Knowledge Engine  

---

## Executive Summary & Engineering Scope

Before Bioquora can ingest literature, link variants to phenotypes, compute graph paths, or power causal diagnostic reasoning, it must establish a **mathematically formal, unambiguous, and computationally verifiable representation of biomedical meaning**.

This specification transitions **Part 1 (Biomedical Knowledge Representation)** from conceptual architecture into executable design. It defines the formal data structures, Description Logic bounds, schema registries, RDF/OWL serialization rules, and concrete Python/Rust data models required for every core entity in Bioquora.

---

## Chapter 1: Introduction to Biomedical Knowledge & Epistemology

### 1.1 The Epistemological Nature of Biomedical Assertions
Biomedical knowledge is fundamentally distinct from standard enterprise domain models due to four inherent characteristics:
1. **Multi-Granular Scale:** Entities span 11 orders of magnitude—from quantum molecular orbitals and single-nucleotide polymorphisms ($10^{-10}\text{m}$) to subcellular organelles, tissues, organs, organisms, and populations ($10^6\text{m}$).
2. **Context-Dependent Assertions:** A gene variant ($EGFR\text{ L858R}$) is not inherently "pathogenic"; it is oncogenic *in the context of Non-Small Cell Lung Carcinoma (NSCLC)* and predictive of sensitivity *in the context of tyrosine kinase inhibitor (Erlotinib) exposure*.
3. **Continuous Revision & Contradiction:** Scientific literature frequently contains conflicting empirical observations. Knowledge representation must treat assertions not as immutable global truths, but as **temporally scoped, evidence-backed claims** tied to specific experimental or observational provenance.
4. **Poly-Hierarchical Entanglement:** Single entities belong to orthogonal classification axes simultaneously (e.g., *Asthma* is both an *Immune System Disorder* by mechanism and a *Respiratory Tract Disease* by anatomy).

### 1.2 The Bioquora Knowledge Axiom
Every unit of biomedical knowledge ingested into Bioquora must satisfy the **Quads-with-Evidence Axiom**:
$$\mathcal{K} = \langle s, p, o, \mathcal{C} \rangle$$
Where:
- $s \in \mathcal{E}$ is the **Canonical Subject Entity** identified by a deterministic BioID URN.
- $p \in \mathcal{R}$ is a **Controlled Predicate** drawn from the Bioquora Relation Ontology (aligned with RO/Biolink).
- $o \in \mathcal{E} \cup \mathcal{L}$ is the **Canonical Object Entity** or typed literal value.
- $\mathcal{C}$ is the **Context & Provenance Frame** containing:
  $$\mathcal{C} = \{ \text{EvidenceType}, \text{PMID/DOI}, \text{ConfidenceScore} \in [0, 1], \text{TemporalScope}, \text{AssayContext} \}$$

---

## Chapter 2: Knowledge Representation Theory & Mathematical Formalisms

### 2.1 First-Order Logic (FOL) vs. Description Logic Bounds
While complete First-Order Logic (FOL) allows arbitrary quantification, general theorem proving in FOL is semi-decidable. Bioquora mandates **Description Logics (DL)** as the formal semantic backbone to guarantee decidability ($O(2^{\text{poly}(n)})$ or better query bounds).

Bioquora core knowledge models operate within **$\mathcal{SROIQ}(\mathcal{D})$ Description Logic** (the logical basis of OWL 2 DL):
- **$\mathcal{S}$ ($\mathcal{ALC}$ + transitive roles):** Allows transitive reasoning over anatomical and taxonomic hierarchies (e.g., `part_of`, `is_a`).
- **$\mathcal{R}$ (Role hierarchies & complex inclusion axioms):** Allows relationship propagation (e.g., `regulates` $\circ$ `part_of` $\sqsubseteq$ `regulates`).
- **$\mathcal{O}$ (Nominals):** Allows enumerating finite sets of canonical entities.
- **$\mathcal{I}$ (Inverse roles):** Ensures bi-directional graph traversal consistency ($r^{-1}$).
- **$\mathcal{Q}$ (Qualified cardinality restrictions):** Allows exact stoichiometric or structural bounds (e.g., $\leq 2 \text{ binding\_site}$).
- **$(\mathcal{D})$ (Concrete datatypes):** Supports floating-point pLDDT confidence scores, IC50 concentrations, and temporal intervals.

### 2.2 Formal Axiom Verification
Every ontology ingest pipeline in Bioquora runs structural reasoning via automated tableaux verification to ensure zero logical satisfiability contradictions ($\bot$) before writing to the canonical graph.

---

## Chapter 3: Controlled Vocabularies & Lexical Normalization

### 3.1 Lexical Entropy & Synonymy Problem
A single clinical entity can possess over 50 surface lexical strings (e.g., *"Breast cancer"*, *"Malignant neoplasm of breast"*, *"Mammary carcinoma"*, *"Carcinoma of breast, NOS"*).

### 3.2 Automated Lexical Normalization Pipeline (LNP-1)
Bioquora implements a deterministic 5-stage lexical normalizer applied to all raw string inputs:
1. **Unicode NFKC Normalization:** Converts fullwidth/halfwidth characters and decomposes ligatures.
2. **Case & Punctuation Folding:** Strips non-semantic hyphens, commas, and converts to lowercase (preserving ASCII case for gene symbols where required, e.g., human `TP53` vs. murine `Trp53`).
3. **Stop-word & NOS Removal:** Removes clinical filler tokens (`"NOS"`, `"unspecified"`, `"general"`).
4. **Porter/Lovins Biomedical Stemming:** Standardizes inflectional variations (`inhibition` $\to$ `inhibit`).
5. **Exact Hash Lexicon Lookup:** Maps normalized string tokens directly against the canonical synonym inverted index ($O(1)$ lookup time).

---

## Chapter 4: Taxonomies & Strict Subsumption Hierarchies

### 4.1 Strict Subsumption Semantics (`is_a`)
A taxonomic edge $A \xrightarrow{\text{is\_a}} B$ in Bioquora enforces strict set-theoretic subset inclusion:
$$\forall x \, (x \in A \implies x \in B)$$
Violations of strict subsumption (e.g., treating *instance_of* or *part_of* as *is_a*) are strictly rejected at validation time.

### 4.2 Directed Acyclic Graph (DAG) Integrity
All Bioquora taxonomies must form valid Directed Acyclic Graphs:
$$\nexists \, (v_0, v_1, \dots, v_k) \text{ s.t. } v_i \xrightarrow{\text{is\_a}} v_{i+1} \land v_k = v_0$$
Circular dependencies trigger an immediate pipeline halt and quarantine.

---

## Chapter 5: Thesauri & Poly-Hierarchical Cross-Indexing

### 5.1 SKOS (Simple Knowledge Organization System) Integration
Bioquora utilizes formal SKOS relations to manage lexical thesauri without polluting structural DL axioms:
- `skos:prefLabel`: Exactly one primary human-readable string per language per BioID.
- `skos:altLabel`: Validated synonyms, trade names, and clinical aliases.
- `skos:hiddenLabel`: Misspellings, historical deprecations, and OCR error patterns.
- `skos:exactMatch` / `skos:closeMatch` / `skos:broadMatch`: Inter-ontology mappings with explicit semantic precision tags.

---

## Chapter 6: Ontologies — OBO Foundry & OWL 2 DL Architecture

### 6.1 Core Supported Biomedical Ontologies (Phase 1 Baseline)
Bioquora natively ingests, aligns, and versions the following foundational ontologies:
| Ontology | Primary Domain | CURIE Prefix | Logical Formalism |
| :--- | :--- | :--- | :--- |
| **MONDO** | Unified Disease Concepts | `MONDO:` | OWL 2 DL |
| **HPO** | Human Phenotype Abnormalities | `HP:` | OWL 2 DL |
| **DOID** | Human Disease Ontology | `DOID:` | OBO / OWL |
| **GO** | Biological Process / Molecular Function | `GO:` | OWL 2 DL |
| **ChEBI** | Small Molecules & Chemicals | `CHEBI:` | OWL 2 DL |
| **Uberon** | Cross-Species Anatomy | `UBERON:` | OWL 2 DL |
| **CL** | Cell Ontology | `CL:` | OWL 2 DL |
| **NCBITaxon**| Organism Taxonomy | `NCBITaxon:`| OBO / OWL |

---

## Chapter 7: Semantic Networks & Relation Ontology (RO) Standards

### 7.1 Canonical Bioquora Predicate Registry
All edges in Bioquora must use standard Relation Ontology (`RO`) or Biolink predicates:
- `ro:part_of` (`BFO:0000050`): Transitive spatial/structural containment.
- `ro:regulates` (`RO:0002211`): Causative biological modulation.
- `ro:positively_regulates` (`RO:0002213`): Up-regulation or catalytic activation.
- `ro:negatively_regulates` (`RO:0002212`): Down-regulation or inhibition.
- `ro:has_phenotype` (`RO:0002200`): Disease to human phenotype manifestation.
- `biolink:treats`: Therapeutic chemical efficacy against disease condition.

---

## Chapter 8: RDF & OWL 2 Foundations — Data Serialization Specifications

### 8.1 JSON-LD Canonical Serialization Contract
Every entity served by Bioquora Semantic APIs exposes standard JSON-LD context payloads ensuring machine interoperability:

```json
{
  "@context": {
    "bioquora": "urn:bioquora:schema:v1#",
    "MONDO": "http://purl.obolibrary.org/obo/MONDO_",
    "HP": "http://purl.obolibrary.org/obo/HP_",
    "RO": "http://purl.obolibrary.org/obo/RO_",
    "skos": "http://www.w3.org/2004/02/skos/core#",
    "prov": "http://www.w3.org/ns/prov#"
  },
  "@id": "urn:bioquora:concept:disease:MONDO:0007915",
  "@type": "bioquora:DiseaseEntity",
  "skos:prefLabel": "systemic lupus erythematosus",
  "skos:altLabel": ["SLE", "Lupus erythematosus disseminatus"],
  "subClassOf": "MONDO:0000320",
  "hasPhenotype": [
    {
      "@id": "HP:0001025",
      "skos:prefLabel": "Urticaria",
      "prov:wasGeneratedBy": "urn:bioquora:activity:ingest:obo:2026-07"
    }
  ]
}
```

---

## Chapter 9: Description Logic Axiom Enforcement in Code

### 9.1 Tableaux Consistency Checker Specification
Bioquora implements structural verification before graph commit:
1. Check that no term is declared a subclass of its own disjoint class (`DisjointClasses(A, B)` $\land C \sqsubseteq A \land C \sqsubseteq B \implies \text{Error}$).
2. Check asymmetric property compliance (`Asymmetric(P)` $\land P(x, y) \land P(y, x) \implies \text{Error}$).

---

## Chapter 10: Biomedical Knowledge Graph Fundamentals — Executable Core Data Schema

### 10.1 Production Pydantic v2 Core Representation Model
Below is the canonical executable Python data model used across all Bioquora ingestion, entity resolution, and semantic serving workers.

```python
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any, Literal
from pydantic import BaseModel, Field, ConfigDict, field_validator


class ProvenanceFrame(BaseModel):
    """Immutable evidence and derivation tracking for any semantic claim."""
    source_authority: str = Field(..., description="Source database or ontology (e.g., 'MONDO', 'PubMed')")
    source_record_id: str = Field(..., description="Accession ID or PMID")
    evidence_type: Literal["EXPERIMENTAL", "CURATED", "AUTOMATED_INFERENCE", "LITERATURE_MINED"]
    confidence_score: float = Field(1.0, ge=0.0, le=1.0, description="Epistemic confidence probability")
    asserted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(frozen=True)


class SemanticTermReference(BaseModel):
    """Compact canonical reference to an ontology entity."""
    bioid: str = Field(..., pattern=r"^urn:bioquora:[a-z0-9_]+:[A-Za-z0-9_]+:[A-Za-z0-9_]+$")
    curie: str = Field(..., description="Standard CURIE (e.g., 'MONDO:0007915')")
    label: str = Field(..., description="Primary preferred human-readable label")


class CanonicalConceptNode(BaseModel):
    """Full canonical biomedical concept node as stored in BioDOS."""
    bioid: str = Field(..., description="Global deterministic Bioquora URN")
    curie: str = Field(..., description="Primary canonical CURIE")
    entity_type: Literal["DISEASE", "GENE", "PROTEIN", "DRUG", "PHENOTYPE", "PATHWAY", "ANATOMY"]
    pref_label: str = Field(..., max_length=512)
    synonyms: List[str] = Field(default_factory=list)
    definition: Optional[str] = None
    is_obsolete: bool = False
    provenance: List[ProvenanceFrame] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    @field_validator("synonyms")
    @classmethod
    def clean_synonyms(cls, vals: List[str]) -> List[str]:
        cleaned = {v.strip() for v in vals if v and v.strip()}
        return sorted(list(cleaned))


class CanonicalRelationEdge(BaseModel):
    """Directed semantic triple with strict predicate typing and evidence."""
    edge_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    subject_bioid: str = Field(..., description="Source entity BioID URN")
    predicate_curie: str = Field(..., description="RO/Biolink relation CURIE (e.g., 'RO:0002200')")
    object_bioid: str = Field(..., description="Target entity BioID URN")
    is_negated: bool = Field(False, description="True if evidence asserts absence of relationship")
    provenance: ProvenanceFrame
```
