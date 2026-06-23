from dataclasses import dataclass
import numpy as np

EVIDENCE_MULTIPLIER = {
    "meta_analysis": 1.30, "systematic_review": 1.25, "rct": 1.20,
    "cohort": 1.05, "case_control": 1.05, "cross_sectional": 1.00,
    "basic_science": 0.95, "case_report": 0.80, "editorial": 0.75,
    "unknown": 0.85,
}

@dataclass
class FusionWeights:
    content:       float = 0.40
    collaborative: float = 0.35
    graph:         float = 0.25
    rrf_k:         int   = 60

DYNAMIC_WEIGHTS = {
    "new":    FusionWeights(content=0.80, collaborative=0.00, graph=0.20),
    "active": FusionWeights(content=0.55, collaborative=0.25, graph=0.20),
    "senior": FusionWeights(content=0.35, collaborative=0.35, graph=0.30),
}

class HybridFusion:
    """
    Step 5 — Two-stage fusion:
      Stage 1: Reciprocal Rank Fusion (RRF) merges three ranked lists.
      Stage 2: Evidence tier multiplier re-ranks final slate.
    """

    def __init__(self, maturity: str = "active"):
        self.w = DYNAMIC_WEIGHTS.get(maturity, DYNAMIC_WEIGHTS["active"])

    def rrf_merge(
        self,
        content_results:  list[dict],
        collab_results:   list[dict],
        graph_results:    list[dict],
    ) -> dict[str, float]:
        def to_rank(lst):
            return {r["paper_id"]: i + 1 for i, r in enumerate(lst)}

        c_rank  = to_rank(content_results)
        cf_rank = to_rank(collab_results)
        g_rank  = to_rank(graph_results)
        all_ids = set(c_rank) | set(cf_rank) | set(g_rank)
        k       = self.w.rrf_k

        return {
            pid: (
                self.w.content       / (k + c_rank.get(pid,  9999))
              + self.w.collaborative / (k + cf_rank.get(pid, 9999))
              + self.w.graph         / (k + g_rank.get(pid,  9999))
            )
            for pid in all_ids
        }

    def novelty_score(self, paper_id: str, seen: set[str], saved: set[str]) -> float:
        if paper_id in seen:  return 0.0
        if paper_id in saved: return 0.4
        return 1.0

    def freshness_score(self, year: int, lam: float = 0.05) -> float:
        import math
        return math.exp(-lam * max(0, 2025 - year))

    def evidence_rerank(
        self,
        fused:    dict[str, float],
        metadata: dict[str, dict],
        seen:     set[str],
        saved:    set[str],
    ) -> list[dict]:
        scored = []
        for pid, rrf_score in fused.items():
            meta  = metadata.get(pid, {})
            tier  = meta.get("evidence_tier", "unknown")
            mult  = EVIDENCE_MULTIPLIER.get(tier, 0.85)
            nov   = self.novelty_score(pid, seen, saved)
            fresh = self.freshness_score(meta.get("year", 2000))
            scored.append({
                "paper_id":     pid,
                "final_score":  rrf_score * mult * nov * fresh,
                "rrf_score":    rrf_score,
                "evidence_tier": tier,
                "novelty":      nov,
                "freshness":    fresh,
                "evidence_mult": mult,
            })
        scored.sort(key=lambda x: -x["final_score"])
        return scored

    def diversity_filter(self, ranked: list[dict], metadata: dict, cap: int = 2) -> list[dict]:
        """Cap each research field at `cap` results to prevent echo chambers."""
        field_count: dict[str, int] = {}
        diverse = []
        for r in ranked:
            field = metadata.get(r["paper_id"], {}).get("field", "General")
            field_count[field] = field_count.get(field, 0) + 1
            if field_count[field] <= cap:
                diverse.append(r)
        return diverse

    def confidence_score(self, content: float, collab: float, graph: float) -> float:
        scores   = [content, collab, graph]
        mean     = sum(scores) / 3
        variance = sum((s - mean) ** 2 for s in scores) / 3
        return float(max(0.45, min(0.98, 1 - variance * 4)))
