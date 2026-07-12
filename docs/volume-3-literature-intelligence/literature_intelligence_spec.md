# BIOQUORA FOUNDER BIBLE
## Volume III — Step 3: Literature Intelligence & Biomedical Knowledge Extraction Engine
### Full Engineering Specification & Evidence-Aware Scientific NLP Architecture
**Version:** 1.0.0-PROD  
**Classification:** Scientific Literature Intelligence Specification (10-Year Horizon)  
**Target System:** Bioquora Document Parser, Scientific Claim Extraction Engine, & Literature Knowledge Graph  

---

## Executive Summary & Engineering Philosophy

While **Step 1** established the canonical language of biomedical meaning and **Step 2** provided the polyglot storage kernel, **Step 3 (Literature Intelligence)** transforms unstructured scientific text into **machine-verifiable scientific claims and evidence graphs**.

Bioquora does not operate as a mere document search engine (like PubMed). It acts as an **autonomous scientific reader** capable of parsing complex JATS/XML and PDF layouts, performing multi-class Named Entity Recognition (NER) linked to canonical BioIDs, extracting directed causal relations (`treats`, `inhibits`, `upregulates`), isolating quantitative statistical evidence ($p$-values, sample size $N$, odds ratios), and detecting empirical contradictions across millions of papers.

---

## 1. Scientific Document Intelligence & Structural Parsing

To extract rigorous claims, Bioquora parses documents into structured semantic sections rather than flat text:
- **JATS/XML Structural Decomposition:** Natively parses PubMed Central (PMC) JATS XML (`<front>`, `<body>`, `<back>`), preserving section semantics (`INTRO`, `METHODS`, `RESULTS`, `DISCUSSION`).
- **Equation & Table Extraction:** Isolates statistical tables and numerical reporting frames.
- **Citation Anchoring:** Links inline citation markers (`[14, 22]`) directly to the canonical paper DOI/PMID node in the Citation Graph.

---

## 2. Biomedical NLP & Entity Canonicalization Pipeline

```
[Raw Scientific Text / Abstract / Section]
                   │
                   ▼
  1. Tokenization & Biomedical POS/Dependency Parsing (SciSpaCy)
                   │
                   ▼
  2. Multi-Class NER (PubMedBERT / BioLinkBERT / GatorTron)
     ├── DISEASE (MONDO / DOID)
     ├── GENE / PROTEIN (HGNC / UniProt)
     ├── DRUG / CHEMICAL (ChEBI / RxNorm)
     └── PHENOTYPE (HPO)
                   │
                   ▼
  3. LNP-1 Lexical Normalization & DIRE URN Canonical Linking
                   │
                   ▼
  4. Relation & Event Extraction (Subject BioID ─[Predicate]─► Object BioID)
```

---

## 3. Scientific Evidence Quad & Claim Specification

Every claim extracted from literature must satisfy the **Scientific Evidence Quad Contract**:
$$\mathcal{E}_{\text{lit}} = \langle s_{\text{BioID}}, \, p_{\text{RO}}, \, o_{\text{BioID}}, \, \mathcal{M}_{\text{stats}} \rangle$$
Where $\mathcal{M}_{\text{stats}}$ is the Quantitative Statistical Evidence Envelope:
- `sample_size_n`: Total cohort or experimental replica count ($N$).
- `p_value`: Empirical statistical significance ($p < 0.05, 0.01, 0.001$).
- `effect_metric`: Quantitative effect size (Odds Ratio, Hazard Ratio, IC50, Fold Change).
- `assertion_polarity`: Positive assertion, null finding, or explicit contradiction.

---

## 4. Executable Python Contract for Literature Intelligence

Below is the production Pydantic data model governing every extracted paper claim:

```python
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field, ConfigDict


class ScientificEvidenceMetric(BaseModel):
    """Quantitative statistical reporting isolated from scientific results."""
    sample_size_n: Optional[int] = Field(None, ge=1, description="Experimental or clinical cohort size N")
    p_value: Optional[float] = Field(None, ge=0.0, le=1.0, description="Statistical significance p-value")
    effect_metric_name: Optional[str] = Field(None, description="e.g., 'Odds Ratio', 'IC50', 'Hazard Ratio'")
    effect_metric_value: Optional[float] = None
    is_statistically_significant: bool = True

    model_config = ConfigDict(frozen=True)


class ExtractedLiteratureClaim(BaseModel):
    """Canonical causal or associative assertion extracted from literature."""
    claim_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    pmid_or_doi: str = Field(..., description="Source publication identifier")
    section_source: Literal["ABSTRACT", "RESULTS", "DISCUSSION", "METHODS"] = "ABSTRACT"
    subject_bioid: str = Field(..., description="Canonical subject BioID URN")
    predicate_curie: str = Field(..., description="RO / Biolink relation CURIE")
    object_bioid: str = Field(..., description="Canonical object BioID URN")
    evidence_metrics: ScientificEvidenceMetric
    verbatim_sentence: str = Field(..., description="Exact textual sentence supporting assertion")
    extraction_confidence: float = Field(1.0, ge=0.0, le=1.0)
    extracted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
```
