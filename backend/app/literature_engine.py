"""
Bioquora Founder Bible — Volume III (Step 3)
Literature Intelligence & Scientific Claim Extraction Engine
Parses scientific text into canonical Evidence Quads with statistical reporting metrics.
"""

import re
import uuid
from datetime import datetime, timezone
from typing import List, Optional, Literal
from pydantic import BaseModel, Field, ConfigDict
from app.semantic_core import normalize_lexical_string


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
    pmid_or_doi: str
    section_source: Literal["ABSTRACT", "RESULTS", "DISCUSSION", "METHODS"] = "ABSTRACT"
    subject_bioid: str
    predicate_curie: str
    object_bioid: str
    evidence_metrics: ScientificEvidenceMetric
    verbatim_sentence: str
    extraction_confidence: float = Field(1.0, ge=0.0, le=1.0)
    extracted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


_P_VAL_RE = re.compile(r"p\s*(?:[=<]|less than)\s*([0-9.]+)", re.IGNORECASE)
_N_COHORT_RE = re.compile(r"\b(?:n|cohort size)\s*=\s*([0-9,]+)", re.IGNORECASE)
_RELATION_PATTERNS = [
    (re.compile(r"(\w+(?:\s+\w+)?)\s+(?:inhibits|blocks|suppresses)\s+(\w+(?:\s+\w+)?)", re.I), "RO:0002212"),
    (re.compile(r"(\w+(?:\s+\w+)?)\s+(?:upregulates|activates|promotes)\s+(\w+(?:\s+\w+)?)", re.I), "RO:0002213"),
    (re.compile(r"(\w+(?:\s+\w+)?)\s+(?:treats|alleviates|reduces)\s+(\w+(?:\s+\w+)?)", re.I), "BIOLINK:treats"),
]


class ScientificLiteratureExtractor:
    """
    Production Claim Extractor:
      - Isolates p-values and cohort sample sizes
      - Matches directed causal verbs to formal RO / Biolink predicates
      - Normalizes entity mentions via LNP-1 and links to BioID URNs
    """

    @classmethod
    def extract_claims_from_abstract(
        cls, pmid: str, abstract_text: str
    ) -> List[ExtractedLiteratureClaim]:
        claims: List[ExtractedLiteratureClaim] = []
        sentences = [s.strip() for s in abstract_text.split(".") if s.strip()]

        for sent in sentences:
            # Extract statistical evidence if present
            p_val = None
            p_match = _P_VAL_RE.search(sent)
            if p_match:
                try:
                    p_val = float(p_match.group(1))
                except ValueError:
                    p_val = None

            sample_n = None
            n_match = _N_COHORT_RE.search(sent)
            if n_match:
                try:
                    sample_n = int(n_match.group(1).replace(",", ""))
                except ValueError:
                    sample_n = None

            # Detect causal relation triple
            for pat, predicate_curie in _RELATION_PATTERNS:
                m = pat.search(sent)
                if m:
                    raw_subj, raw_obj = m.group(1), m.group(2)
                    norm_subj = normalize_lexical_string(raw_subj)
                    norm_obj = normalize_lexical_string(raw_obj)

                    subj_urn = f"urn:bioquora:entity:{norm_subj.replace(' ', '_')}"
                    obj_urn = f"urn:bioquora:entity:{norm_obj.replace(' ', '_')}"

                    metrics = ScientificEvidenceMetric(
                        sample_size_n=sample_n,
                        p_value=p_val,
                        is_statistically_significant=(p_val < 0.05) if p_val is not None else True,
                    )

                    claim = ExtractedLiteratureClaim(
                        pmid_or_doi=pmid,
                        section_source="ABSTRACT",
                        subject_bioid=subj_urn,
                        predicate_curie=predicate_curie,
                        object_bioid=obj_urn,
                        evidence_metrics=metrics,
                        verbatim_sentence=sent,
                    )
                    claims.append(claim)
        return claims
