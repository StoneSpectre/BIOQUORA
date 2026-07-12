# BIOQUORA FOUNDER BIBLE
## Volume IV — Step 4: Biomedical Knowledge Graph Platform (BioKG)
### Full Engineering Specification & Temporal, Evidence-Aware Graph Architecture
**Version:** 2.0.0-PROD  
**Classification:** Core Knowledge Graph Platform Specification (10-Year Horizon)  
**Target System:** Bioquora Labeled Property Graph (LPG) + Temporal Versioning & Link Prediction Engine  

---

## Executive Summary & Engineering Philosophy

**BioKG** is the heart of Bioquora—transitioning the system from isolated databases and parsed literature into an **Explainable Biomedical Knowledge Infrastructure**. Every assertion across millions of publications, clinical trials, and multi-omics databases is unified into a canonical semantic graph.

Unlike static graphs, BioKG is **Temporal, Evidence-Grounded, and Contradiction-Aware**. It explicitly models retractions, historical corrections, conflicting laboratory findings (`SUPPORTED_BY` vs. `CONTRADICTED_BY`), and topological link prediction (e.g., GraphSAGE / RotatE embeddings for zero-shot drug repurposing candidates).

---

## 1. Canonical Node & 15-Predicate Relationship Schema

### 1.1 Canonical Node Types (17 Classes)
`Disease`, `Drug`, `Gene`, `Protein`, `Variant`, `Pathway`, `Chemical`, `Cell`, `Tissue`, `Organ`, `Organism`, `Publication`, `ClinicalTrial`, `Guideline`, `Institution`, `Researcher`, `Dataset`.

### 1.2 Canonical Directed Relationship Predicates (15 Types)
1. `TREATS` — Therapeutic efficacy
2. `CAUSES` — Pathogenic etiology
3. `ASSOCIATED_WITH` — Statistical co-occurrence or GWAS correlation
4. `INTERACTS_WITH` — Protein-Protein Interaction (PPI) or Drug-Drug Interaction (DDI)
5. `EXPRESSES` — Gene/protein expression in cell/tissue
6. `INHIBITS` — Downregulation or antagonist action
7. `ACTIVATES` — Upregulation or agonist action
8. `PARTICIPATES_IN` — Pathway membership
9. `REGULATES` — Modulation of biological process
10. `LOCATED_IN` — Subcellular or anatomical localization
11. `DERIVED_FROM` — Evolutionary or lineage derivation
12. `VALIDATED_BY` — Experimental or clinical trial proof
13. `CONTRADICTED_BY` — Explicit empirical refutation
14. `SUPPORTED_BY` — Corroborating publication citation
15. `CITED_BY` — Bibliographic citation link

---

## 2. Temporal Knowledge & Contradiction Resolution Architecture

```
                 [Subject Concept: Erlotinib]
                              │
               ┌──────────────┴──────────────┐
               │                             │
    ──[INHIBITS (Conf: 0.95)]──►    ──[CONTRADICTED_BY]──►
   (Valid: 2018-01 to Present)       (Valid: 2024-03 [PMID:399001])
               │                             │
               ▼                             ▼
       [Target: EGFR]            [Resistant Mutation T790M]
```

When BioKG detects `CONTRADICTED_BY` edges along a mechanistic path, it flags **Contradictory Epistemic State**, presenting both corroborating (`SUPPORTED_BY`) and refuting (`CONTRADICTED_BY`) evidence with time-stamped lineage.

---

## 3. Executable Python Contract for Temporal BioKG

```python
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field


CanonicalPredicate = Literal[
    "TREATS", "CAUSES", "ASSOCIATED_WITH", "INTERACTS_WITH", "EXPRESSES",
    "INHIBITS", "ACTIVATES", "PARTICIPATES_IN", "REGULATES", "LOCATED_IN",
    "DERIVED_FROM", "VALIDATED_BY", "CONTRADICTED_BY", "SUPPORTED_BY", "CITED_BY"
]


class TemporalEdgeEvidence(BaseModel):
    """Temporal and evidentiary metadata attached to every BioKG edge."""
    edge_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    source_urn: str
    predicate: CanonicalPredicate
    target_urn: str
    confidence_score: float = Field(1.0, ge=0.0, le=1.0)
    valid_from: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    valid_to: Optional[datetime] = None
    is_retracted: bool = False
    supporting_pmids: List[str] = Field(default_factory=list)
    contradicting_pmids: List[str] = Field(default_factory=list)
```
