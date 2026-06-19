"""
Medinex GraphRAG — Step 5: Evidence Ranking & Provenance Scoring
==================================================================
Scores each piece of supporting literature on a multi-factor scientific
trust formula, not just retrieval similarity.

Sub-steps:
  5.1  Evidence Pyramid Classification  (study type: Meta-Analysis → Expert Opinion)
  5.2  Authority Score                  (citation-graph PageRank)
  5.3  Recency Score                    (exponential decay, field-dependent λ)
  5.4  Sample Size Weight               (log-scaled N)
  5.5  Contradiction Penalty            (from Step 4 conflict flags)
  5.6  Final Evidence Score             (weighted composite)
  5.7  Provenance Tracking              (doi, authors, journal, year, N)

Dependencies:
    pip install networkx numpy
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional
import math, json


# ─────────────────────────────────────────────────────────────
# Data Classes
# ─────────────────────────────────────────────────────────────

@dataclass
class Provenance:
    chunk_id: str
    doi: str
    authors: str
    journal: str
    year: int
    sample_size: int


@dataclass
class EvidenceClassification:
    chunk_id: str
    study_type: str          # Meta-Analysis | Systematic Review | RCT | Cohort | Case Control | Case Report | Expert Opinion
    pyramid_level: int        # 7 = highest (meta-analysis), 1 = lowest (expert opinion)
    classifier_confidence: float


@dataclass
class EvidenceScore:
    chunk_id: str
    title: str
    study_type: str
    evidence_level_score: float
    authority_score: float
    recency_score: float
    sample_size_score: float
    relevance_score: float
    contradiction_penalty_applied: bool
    final_score: float
    provenance: Provenance


@dataclass
class Step5Result:
    ranked_evidence: List[EvidenceScore]
    provenance: List[Provenance]
    confidence_scores: Dict[str, float]
    scoring_weights: Dict[str, float]

    def to_dict(self) -> dict:
        return asdict(self)


# ─────────────────────────────────────────────────────────────
# 5.1  Evidence Pyramid Classifier
# ─────────────────────────────────────────────────────────────

PYRAMID_LEVELS: Dict[str, int] = {
    "Meta-Analysis":        7,
    "Systematic Review":    6,
    "RCT":                  5,
    "Cohort":               4,
    "Case Control":         3,
    "Case Report":          2,
    "Expert Opinion":       1,
}

# Keyword cues for heuristic classification — production uses a fine-tuned
# PubMedBERT classifier trained on labeled study-type corpora (e.g. RobotReviewer).
STUDY_TYPE_CUES: Dict[str, List[str]] = {
    "Meta-Analysis":     ["meta-analysis", "meta analysis", "pooled analysis"],
    "Systematic Review": ["systematic review"],
    "RCT":               ["randomized controlled trial", "randomised controlled trial",
                           "rct", "phase iii trial", "phase ii trial", "double-blind"],
    "Cohort":            ["cohort study", "prospective cohort", "longitudinal study"],
    "Case Control":      ["case-control", "case control study"],
    "Case Report":       ["case report", "case series"],
    "Expert Opinion":    ["expert opinion", "review article", "perspective", "commentary"],
}


class EvidencePyramidClassifier:
    """
    Production implementation:

    from transformers import pipeline
    clf = pipeline("text-classification",
                   model="your-org/pubmedbert-study-type-classifier")
    """

    def classify(self, chunk_id: str, title: str, text: str) -> EvidenceClassification:
        combined = f"{title} {text}".lower()
        for study_type, cues in STUDY_TYPE_CUES.items():
            if any(cue in combined for cue in cues):
                return EvidenceClassification(
                    chunk_id=chunk_id,
                    study_type=study_type,
                    pyramid_level=PYRAMID_LEVELS[study_type],
                    classifier_confidence=0.91,
                )
        # default fallback: assume cohort-level evidence
        return EvidenceClassification(
            chunk_id=chunk_id,
            study_type="Cohort",
            pyramid_level=PYRAMID_LEVELS["Cohort"],
            classifier_confidence=0.55,
        )


# ─────────────────────────────────────────────────────────────
# 5.2  Authority Scorer (citation-graph PageRank)
# ─────────────────────────────────────────────────────────────

class AuthorityScorer:
    """
    Production implementation:

    import networkx as nx
    G = nx.DiGraph()
    G.add_edges_from(citation_edges)  # (citing_doi, cited_doi)
    pagerank = nx.pagerank(G, alpha=0.85)
    """

    # Stub journal-tier authority — production replaces with real PageRank
    # over a citation graph built from Semantic Scholar / OpenCitations.
    JOURNAL_TIER: Dict[str, float] = {
        "nature":              0.97,
        "nature medicine":     0.96,
        "the lancet":          0.95,
        "nejm":                0.95,
        "cell":                0.94,
        "science":             0.94,
        "jama":                0.92,
        "pubmed":              0.55,   # generic/unknown journal fallback
        "clinicaltrials":      0.50,
        "preprint":            0.30,
    }

    def score(self, journal: str, citation_count: int = 0) -> float:
        base = self.JOURNAL_TIER.get(journal.lower(), 0.55)
        # small boost from raw citation count, log-scaled and capped
        boost = min(math.log1p(citation_count) / 20, 0.15)
        return round(min(base + boost, 1.0), 3)


# ─────────────────────────────────────────────────────────────
# 5.3  Recency Scorer (exponential decay)
# ─────────────────────────────────────────────────────────────

class RecencyScorer:
    """
    score = e^(-λ * age_years)
    λ varies by field — fast-moving fields (genomics, immunotherapy) decay
    faster than slow-moving ones (anatomy, basic physiology).
    """

    FIELD_DECAY_RATES: Dict[str, float] = {
        "genomics":      0.15,
        "oncology":      0.12,
        "immunotherapy": 0.14,
        "pharmacology":  0.08,
        "cardiology":    0.07,
        "anatomy":       0.02,
        "physiology":    0.03,
        "default":       0.08,
    }

    def score(self, year: int, current_year: int, field: str = "default") -> float:
        age = max(current_year - year, 0)
        lam = self.FIELD_DECAY_RATES.get(field, self.FIELD_DECAY_RATES["default"])
        return round(math.exp(-lam * age), 3)


# ─────────────────────────────────────────────────────────────
# 5.4  Sample Size Weighter
# ─────────────────────────────────────────────────────────────

class SampleSizeScorer:
    """score = log(sample_size), normalized to [0, 1] against a reference ceiling."""

    def __init__(self, reference_ceiling: int = 50000):
        self.ceiling_log = math.log(reference_ceiling)

    def score(self, sample_size: int) -> float:
        if sample_size <= 0:
            return 0.05
        return round(min(math.log(sample_size) / self.ceiling_log, 1.0), 3)


# ─────────────────────────────────────────────────────────────
# 5.5  Contradiction Penalty (consumes Step 4 output)
# ─────────────────────────────────────────────────────────────

class ContradictionPenalizer:
    def __init__(self, penalty_factor: float = 0.7):
        self.penalty_factor = penalty_factor

    def flagged_chunk_ids(self, step4_contradictions: List[dict]) -> set:
        ids = set()
        for c in step4_contradictions:
            ids.add(c["chunk_a_id"])
            ids.add(c["chunk_b_id"])
        return ids


# ─────────────────────────────────────────────────────────────
# Provenance Builder (5.7) — stub metadata source
# ─────────────────────────────────────────────────────────────

STUB_PROVENANCE: Dict[str, dict] = {
    "pmid:38901234::chunk0": {"doi":"10.1234/jhep.2024.001","authors":"Tanaka et al.","journal":"Nature Medicine","year":2024,"sample_size":1},
    "pmid:37812456::chunk0": {"doi":"10.1234/diab.2023.045","authors":"Singh & Romero","journal":"The Lancet","year":2023,"sample_size":1},
    "pmid:37654321::chunk0": {"doi":"10.1234/cellsig.2023.087","authors":"Okafor et al.","journal":"Cell","year":2023,"sample_size":1},
    "pmid:38112233::chunk0": {"doi":"10.1234/diabcare.2024.112","authors":"Müller et al.","journal":"JAMA","year":2024,"sample_size":20000},
    "pmid:36987654::chunk0": {"doi":"10.1234/oncol.2024.033","authors":"Chen et al.","journal":"Nature","year":2024,"sample_size":1},
    "pmid:37345678::chunk0": {"doi":"10.1234/brcanc.2024.019","authors":"Davies et al.","journal":"NEJM","year":2024,"sample_size":1500},
    "pmid:38765432::chunk0": {"doi":"10.1234/molcell.2024.077","authors":"Park & Liu","journal":"Science","year":2024,"sample_size":1},
    "pmid:37234567::chunk0": {"doi":"10.1234/gwas.2023.201","authors":"Bennett et al.","journal":"Nature Medicine","year":2023,"sample_size":85000},
}

DEFAULT_PROVENANCE = {"doi":"10.0000/unknown","authors":"Unknown","journal":"PubMed","year":2022,"sample_size":1}


class ProvenanceBuilder:
    def build(self, chunk_id: str) -> Provenance:
        meta = STUB_PROVENANCE.get(chunk_id, DEFAULT_PROVENANCE)
        return Provenance(
            chunk_id=chunk_id,
            doi=meta["doi"],
            authors=meta["authors"],
            journal=meta["journal"],
            year=meta["year"],
            sample_size=meta["sample_size"],
        )


# ─────────────────────────────────────────────────────────────
# 5.6  Final Evidence Scorer
# ─────────────────────────────────────────────────────────────

class FinalEvidenceScorer:
    """
    Composite score across evidence_level, authority, recency, sample_size,
    and relevance. A paper's prestige (authority) or recency must not be
    able to outrank a topically relevant paper just because the corpus
    pool — built from Step 4's entity-overlap ranking — happens to include
    a high-profile but off-topic paper (e.g. it shared one generic word
    with the query). We treat relevance as a gate, not just a weighted
    addend: papers with near-zero query relevance get capped low overall,
    regardless of how authoritative or recent they are.
    """

    WEIGHTS = {
        "evidence_level": 0.30,
        "authority":      0.25,
        "recency":        0.20,
        "sample_size":    0.15,
        "relevance":      0.10,
    }

    RELEVANCE_GATE_CAP = 0.45         # off-topic evidence final score is capped here

    def compute(self, evidence_level_score: float, authority: float, recency: float,
                sample_size: float, relevance: float, contradiction_flagged: bool,
                entity_overlap: float = 1.0, penalty_factor: float = 0.7) -> float:
        raw = (
            self.WEIGHTS["evidence_level"] * evidence_level_score +
            self.WEIGHTS["authority"]      * authority +
            self.WEIGHTS["recency"]        * recency +
            self.WEIGHTS["sample_size"]    * sample_size +
            self.WEIGHTS["relevance"]      * relevance
        )
        if contradiction_flagged:
            raw *= penalty_factor
        # Gate on entity_overlap (exact query-entity mentions), not the
        # blended relevance score — combined_score mixes in noisy generic
        # word-similarity that can push an off-topic paper just over a
        # similarity-based threshold. Zero entity overlap means the paper
        # never actually mentions the query's biomedical entities, so it
        # should never outrank a paper that does, regardless of prestige.
        if entity_overlap == 0.0:
            raw = min(raw, self.RELEVANCE_GATE_CAP)
        return round(raw, 4)


# ─────────────────────────────────────────────────────────────
# Orchestrator
# ─────────────────────────────────────────────────────────────

class EvidenceRanking:
    def __init__(self, current_year: int = 2026, field: str = "pharmacology"):
        self.classifier  = EvidencePyramidClassifier()
        self.authority    = AuthorityScorer()
        self.recency      = RecencyScorer()
        self.sample_size  = SampleSizeScorer()
        self.contradict   = ContradictionPenalizer()
        self.provenance   = ProvenanceBuilder()
        self.final_scorer = FinalEvidenceScorer()
        self.current_year = current_year
        self.field        = field

    def run(self, step4_result: dict) -> dict:
        chunks = step4_result.get("ranked_chunks", [])
        contradictions = step4_result.get("contradictions", [])
        flagged_ids = self.contradict.flagged_chunk_ids(contradictions)

        print("  [5.1] Classifying evidence pyramid level…")
        print("  [5.2] Computing authority scores…")
        print("  [5.3] Computing recency scores…")
        print("  [5.4] Computing sample size weights…")
        print("  [5.5] Applying contradiction penalties…")
        print("  [5.7] Building provenance records…")

        scored: List[EvidenceScore] = []
        provenance_list: List[Provenance] = []

        for c in chunks:
            cid = c["chunk_id"]
            title = c.get("title", "")
            text = c.get("text", "")

            classification = self.classifier.classify(cid, title, text)
            prov = self.provenance.build(cid)
            provenance_list.append(prov)

            evidence_level_norm = classification.pyramid_level / 7.0
            authority_score = self.authority.score(prov.journal)
            recency_score = self.recency.score(prov.year, self.current_year, self.field)
            sample_score = self.sample_size.score(prov.sample_size)
            relevance_score = c.get("combined_score", 0.5)

            is_flagged = cid in flagged_ids
            final = self.final_scorer.compute(
                evidence_level_norm, authority_score, recency_score,
                sample_score, relevance_score, is_flagged,
                entity_overlap=c.get("entity_overlap", 1.0),
            )

            scored.append(EvidenceScore(
                chunk_id=cid,
                title=title,
                study_type=classification.study_type,
                evidence_level_score=round(evidence_level_norm, 3),
                authority_score=authority_score,
                recency_score=recency_score,
                sample_size_score=sample_score,
                relevance_score=round(relevance_score, 3),
                contradiction_penalty_applied=is_flagged,
                final_score=final,
                provenance=prov,
            ))

        print("  [5.6] Computing final weighted evidence scores…")
        scored.sort(key=lambda x: x.final_score, reverse=True)

        confidence_scores = {s.chunk_id: s.final_score for s in scored}

        result = Step5Result(
            ranked_evidence=scored,
            provenance=provenance_list,
            confidence_scores=confidence_scores,
            scoring_weights=FinalEvidenceScorer.WEIGHTS,
        )
        return result.to_dict()


# ─────────────────────────────────────────────────────────────
# Quick test
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    from step1_question_understanding import QuestionUnderstanding
    from step2_semantic_retrieval import SemanticRetrieval
    from step3_graph_traversal import GraphTraversal
    from step4_context_assembly import GraphRAGContextAssembly

    query = "How does Metformin reduce insulin resistance?"
    qu, sr, gt, ca, er = (QuestionUnderstanding(), SemanticRetrieval(),
                          GraphTraversal(), GraphRAGContextAssembly(), EvidenceRanking())

    s1 = qu.run(query)
    s2 = sr.run(query, s1)
    s3 = gt.run(s1)
    s4 = ca.run(query, s1, s2, s3)
    s5 = er.run(s4)

    print(json.dumps(s5, indent=2))
