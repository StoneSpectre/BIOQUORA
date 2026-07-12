"""
Bioquora Founder Bible — Volume I (Step 1, Part 1)
Canonical Biomedical Knowledge Representation Engine

Implements:
  1. Description Logic SROIQ(D) Core Models (Quads-with-Evidence Axiom)
  2. LNP-1 Deterministic Lexical Normalization Pipeline
  3. Formal DAG & Asymmetric Role Consistency Checker
"""

import re
import uuid
import unicodedata
from datetime import datetime, timezone
from typing import List, Optional, Set, Dict, Tuple, Literal
from pydantic import BaseModel, Field, ConfigDict, field_validator


# =====================================================================
# 1. FORMAL DESCRIPTION LOGIC & PROVENANCE DATA MODELS
# =====================================================================

class ProvenanceFrame(BaseModel):
    """Immutable evidence URN and derivation frame for any semantic claim."""
    source_authority: str = Field(..., description="Source authority (e.g., 'MONDO', 'HPO', 'PubMed')")
    source_record_id: str = Field(..., description="Accession ID or PMID")
    evidence_type: Literal["EXPERIMENTAL", "CURATED", "AUTOMATED_INFERENCE", "LITERATURE_MINED"]
    confidence_score: float = Field(1.0, ge=0.0, le=1.0, description="Epistemic confidence probability [0, 1]")
    asserted_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    model_config = ConfigDict(frozen=True)


class CanonicalConceptNode(BaseModel):
    """Canonical biomedical entity node under the Bioquora Quads-with-Evidence Axiom."""
    bioid: str = Field(..., description="Deterministic URN (e.g., 'urn:bioquora:disease:mondo:0007915')")
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
    """Directed semantic triple with strict predicate typing and provenance."""
    edge_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    subject_bioid: str
    predicate_curie: str = Field(..., description="RO/Biolink relation CURIE")
    object_bioid: str
    is_negated: bool = False
    provenance: ProvenanceFrame


# =====================================================================
# 2. DETERMINISTIC LEXICAL NORMALIZATION PIPELINE (LNP-1)
# =====================================================================

_FILLER_TOKENS_RE = re.compile(
    r"\b(nos|not otherwise specified|unspecified|general|idiopathic|type|class)\b",
    re.IGNORECASE,
)
_PUNCT_RE = re.compile(r"[^\w\s]")
_MULTI_SPACE_RE = re.compile(r"\s+")


def normalize_lexical_string(raw_text: str) -> str:
    """
    LNP-1 5-Stage Lexical Normalizer:
      Stage 1: Unicode NFKC decomposition & normalization
      Stage 2: Case folding (lowercase) & punctuation stripping
      Stage 3: Clinical filler / NOS token removal
      Stage 4: Biomedical suffix simplification (inflectional normalization)
      Stage 5: Whitespace consolidation
    """
    if not raw_text:
        return ""

    # Stage 1: Unicode NFKC
    nfkc_str = unicodedata.normalize("NFKC", raw_text)

    # Stage 2: Case folding & punctuation stripping
    folded = _PUNCT_RE.sub(" ", nfkc_str.lower())

    # Stage 3: Remove NOS / filler tokens
    stripped = _FILLER_TOKENS_RE.sub(" ", folded)

    # Stage 4: Basic inflectional/suffix normalization
    tokens = []
    for token in stripped.split():
        if token.endswith("inhibition") and len(token) > 10:
            token = token[:-8] + "ibit"
        elif token.endswith("carcinoma") and len(token) > 9:
            token = "carcinoma"
        tokens.append(token)

    # Stage 5: Whitespace consolidation
    return _MULTI_SPACE_RE.sub(" ", " ".join(tokens)).strip()


# =====================================================================
# 3. DESCRIPTION LOGIC TABLEAUX CONSISTENCY ENGINE
# =====================================================================

class SemanticConsistencyChecker:
    """
    Verifies formal Description Logic axioms before writing triples to BioDOS:
      - Enforces Directed Acyclic Graph (DAG) strict subsumption for 'is_a'
      - Enforces asymmetric role invariants (e.g., part_of(x,y) => not part_of(y,x))
    """

    def __init__(self):
        # Adjacency list: subject -> set of objects for a given predicate
        self._graph: Dict[str, Dict[str, Set[str]]] = {}

    def add_assertion(self, subject_id: str, predicate: str, object_id: str) -> None:
        """Add and verify an edge assertion."""
        if predicate not in self._graph:
            self._graph[predicate] = {}
        if subject_id not in self._graph[predicate]:
            self._graph[predicate][subject_id] = set()

        # Check self-loop
        if subject_id == object_id and predicate in ("is_a", "part_of"):
            raise ValueError(f"DL Axiom Violation: Irreflexive role '{predicate}' forbids self-loop on '{subject_id}'")

        # Check asymmetry for strict hierarchies
        if predicate in ("is_a", "part_of"):
            rev_adj = self._graph.get(predicate, {})
            if object_id in rev_adj and subject_id in rev_adj[object_id]:
                raise ValueError(
                    f"DL Axiom Violation: Asymmetric role '{predicate}' cycle between '{subject_id}' and '{object_id}'"
                )

        # Check DAG acyclicity for 'is_a'
        if predicate == "is_a":
            if self._reaches(predicate, start=object_id, target=subject_id):
                raise ValueError(
                    f"DL Axiom Violation: Adding is_a({subject_id}, {object_id}) introduces a cyclic taxonomic loop"
                )

        self._graph[predicate][subject_id].add(object_id)

    def _reaches(self, predicate: str, start: str, target: str, visited: Optional[Set[str]] = None) -> bool:
        if visited is None:
            visited = set()
        if start == target:
            return True
        visited.add(start)

        adj = self._graph.get(predicate, {}).get(start, set())
        for nxt in adj:
            if nxt not in visited:
                if self._reaches(predicate, nxt, target, visited):
                    return True
        return False
