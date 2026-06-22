"""
Bioquora GraphRAG — Step 4: GraphRAG Context Assembly
=====================================================
The core fusion engine: combines retrieved chunks (Step 2) with the
knowledge graph subgraph (Step 3) into a single, compressed, conflict-aware
context package for the LLM.

Sub-steps:
  4.1  Input Assembly            (collect chunks + subgraph)
  4.2  Entity Overlap Scoring    (semantic_similarity + entity_overlap)
  4.3  Subgraph Extraction       (k-hop neighborhood around seed nodes)
  4.4  Triple Serialization      (graph triples → natural language facts)
  4.5  Context Fusion            (assemble Graph Facts + Papers + Metadata)
  4.6  Contradiction Detection   (BiomedNLI premise/hypothesis pairs)
  4.7  Context Compression       (token-budget-aware redundancy removal)

Dependencies:
    pip install transformers torch networkx
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Tuple, Optional, Set
import re, math, json, itertools


# ─────────────────────────────────────────────────────────────
# Data Classes
# ─────────────────────────────────────────────────────────────

@dataclass
class ScoredChunk:
    chunk_id: str
    title: str
    text: str
    semantic_similarity: float
    entity_overlap: float
    combined_score: float
    matched_entities: List[str] = field(default_factory=list)
    year: int = 0
    source: str = ""


@dataclass
class SubgraphTriple:
    subject: str
    relation: str
    object: str
    confidence: float
    hop_distance: int          # distance from nearest seed node


@dataclass
class SerializedFact:
    triple_index: int
    sentence: str               # e.g. "Metformin activates AMPK."
    confidence: float


@dataclass
class ContradictionFlag:
    chunk_a_id: str
    chunk_b_id: str
    claim_a: str
    claim_b: str
    nli_label: str               # contradiction | entailment | neutral
    nli_score: float


@dataclass
class CompressionStats:
    original_tokens: int
    compressed_tokens: int
    chunks_dropped: int
    compression_ratio: float


@dataclass
class Step4Result:
    ranked_chunks: List[ScoredChunk]
    subgraph_triples: List[SubgraphTriple]
    graph_facts: List[SerializedFact]
    contradictions: List[ContradictionFlag]
    compression_stats: CompressionStats
    fused_context: str            # the final text block sent toward Step 5/6

    def to_dict(self) -> dict:
        return asdict(self)


# ─────────────────────────────────────────────────────────────
# 4.1  Input Assembly
# ─────────────────────────────────────────────────────────────

class InputAssembler:
    """
    Pulls Step 2 (retrieved_chunks) and Step 3 (graph nodes/edges/paths)
    outputs into a normalized working structure.
    """

    def assemble(self, step2_result: dict, step3_result: dict) -> Tuple[List[dict], dict]:
        # Merge dense + bm25 + rrf chunk pools, deduplicated by chunk_id, prioritizing RRF order
        chunk_pool: Dict[str, dict] = {}
        for r in step2_result.get("dense_results", []):
            chunk_pool.setdefault(r["chunk_id"], r)
        for r in step2_result.get("bm25_results", []):
            chunk_pool.setdefault(r["chunk_id"], r)

        rrf_order = [r["chunk_id"] for r in step2_result.get("rrf_results", [])]
        ordered_chunks = [chunk_pool[cid] for cid in rrf_order if cid in chunk_pool]
        # Append any remaining chunks not in RRF (edge case)
        for cid, c in chunk_pool.items():
            if cid not in rrf_order:
                ordered_chunks.append(c)

        nodes = step3_result.get("seed_nodes", []) + step3_result.get("discovered_nodes", [])

        # Reconstruct individual edges from each traversal path, de-duplicated.
        # Each path already starts at a seed node, so walking consecutive
        # (node[i], edge[i], node[i+1]) triples gives us real graph edges
        # with per-edge confidence approximated from the path's cumulative
        # confidence (kept simple/conservative rather than back-solving it).
        edges = []
        seen_edge_keys: Set[Tuple[str, str, str]] = set()
        for path in step3_result.get("traversal_paths", []):
            path_nodes = path["nodes"]
            path_edges = path["edges"]
            for i, rel in enumerate(path_edges):
                subj, obj = path_nodes[i], path_nodes[i + 1]
                key = (subj, rel, obj)
                if key in seen_edge_keys:
                    continue
                seen_edge_keys.add(key)
                edges.append({
                    "subject": subj,
                    "relation": rel,
                    "object": obj,
                    "confidence": path.get("total_confidence", 0.8),
                    "hop_distance": i + 1,
                })

        subgraph = {"nodes": nodes, "edges": edges}
        return ordered_chunks, subgraph


# ─────────────────────────────────────────────────────────────
# 4.2  Entity Overlap Scoring
# ─────────────────────────────────────────────────────────────

class EntityOverlapScorer:
    """
    score = semantic_similarity (from Step 2 retrieval score, normalized)
          + entity_overlap (fraction of query entities mentioned in chunk)
    """

    def __init__(self, sim_weight: float = 0.55, overlap_weight: float = 0.45):
        self.sim_weight = sim_weight
        self.overlap_weight = overlap_weight

    def score(self, chunks: List[dict], query_entities: List[str]) -> List[ScoredChunk]:
        scored: List[ScoredChunk] = []
        max_raw_score = max((c.get("score", 0.0) for c in chunks), default=1.0) or 1.0

        for c in chunks:
            text_lower = c.get("text", "").lower()
            matched = [e for e in query_entities if e.lower() in text_lower]
            overlap = len(matched) / len(query_entities) if query_entities else 0.0
            sim_norm = min(c.get("score", 0.0) / max_raw_score, 1.0)

            combined = round(self.sim_weight * sim_norm + self.overlap_weight * overlap, 4)

            scored.append(ScoredChunk(
                chunk_id=c["chunk_id"],
                title=c.get("title", ""),
                text=c.get("text", ""),
                semantic_similarity=round(sim_norm, 4),
                entity_overlap=round(overlap, 4),
                combined_score=combined,
                matched_entities=matched,
                year=c.get("year", 0),
                source=c.get("source", ""),
            ))

        scored.sort(key=lambda x: x.combined_score, reverse=True)
        return scored


# ─────────────────────────────────────────────────────────────
# 4.3  Subgraph Extraction (k-hop)
# ─────────────────────────────────────────────────────────────

class SubgraphExtractor:
    """
    Extracts a bounded k-hop neighborhood around seed nodes so we never
    ship a million-node graph into the LLM context.
    """

    def extract(self, subgraph: dict, seed_names: List[str], depth: int = 2) -> List[SubgraphTriple]:
        edges = subgraph.get("edges", [])
        adjacency: Dict[str, List[dict]] = {}
        for e in edges:
            adjacency.setdefault(e["subject"], []).append(e)

        visited: Set[str] = set(seed_names)
        frontier: Set[str] = set(seed_names)
        triples: List[SubgraphTriple] = []
        triple_seen: Set[Tuple[str, str, str]] = set()

        for hop in range(1, depth + 1):
            next_frontier: Set[str] = set()
            for node in frontier:
                for e in adjacency.get(node, []):
                    key = (e["subject"], e["relation"], e["object"])
                    if key in triple_seen:
                        continue
                    triple_seen.add(key)
                    triples.append(SubgraphTriple(
                        subject=e["subject"],
                        relation=e["relation"],
                        object=e["object"],
                        confidence=round(e.get("confidence", 0.8), 3),
                        hop_distance=hop,
                    ))
                    if e["object"] not in visited:
                        next_frontier.add(e["object"])
                        visited.add(e["object"])
            frontier = next_frontier
            if not frontier:
                break

        return triples


# ─────────────────────────────────────────────────────────────
# 4.4  Triple Serializer
# ─────────────────────────────────────────────────────────────

RELATION_VERB_MAP: Dict[str, str] = {
    "INHIBITS":          "inhibits",
    "ACTIVATES":         "activates",
    "TREATS":            "treats",
    "CAUSES":            "causes",
    "ASSOCIATED_WITH":   "is associated with",
    "EXPRESSED_IN":      "is expressed in",
    "ENCODES":           "encodes",
    "PHOSPHORYLATES":    "phosphorylates",
    "TARGETS":           "targets",
    "SYNTHETIC_LETHAL":  "is synthetic lethal with",
    "INTERACTS_WITH":    "interacts with",
    "PART_OF":           "is part of",
    "REGULATES":         "regulates",
    "GENERATES":         "generates",
    "RECRUITS":          "recruits",
    "IMPAIRS":           "impairs",
    "SUPPRESSES":        "suppresses",
    "CONFERS_SENSITIVITY":"confers sensitivity to",
    "PRODUCES":          "produces",
}


class TripleSerializer:
    """Converts (subject, RELATION, object) triples into plain-English sentences."""

    def serialize(self, triples: List[SubgraphTriple]) -> List[SerializedFact]:
        facts: List[SerializedFact] = []
        for i, t in enumerate(triples):
            verb = RELATION_VERB_MAP.get(t.relation, t.relation.lower().replace("_", " "))
            sentence = f"{t.subject} {verb} {t.object}."
            facts.append(SerializedFact(
                triple_index=i + 1,
                sentence=sentence,
                confidence=t.confidence,
            ))
        return facts


# ─────────────────────────────────────────────────────────────
# 4.5  Context Fusion
# ─────────────────────────────────────────────────────────────

class ContextFusionEngine:
    """Assembles the final structured context block: Graph Facts + Papers + Metadata."""

    def fuse(self, query: str, facts: List[SerializedFact],
              chunks: List[ScoredChunk], contradictions: List[ContradictionFlag]) -> str:
        lines = [f"QUESTION:\n{query}\n"]

        lines.append("SECTION A — GRAPH RELATIONSHIPS:")
        if facts:
            for f in facts:
                flag = " ⚠ low-confidence" if f.confidence < 0.75 else ""
                lines.append(f"  {f.triple_index}. {f.sentence} (confidence: {f.confidence}){flag}")
        else:
            lines.append("  (no graph facts found)")

        lines.append("\nSECTION B — SUPPORTING LITERATURE:")
        for i, c in enumerate(chunks, 1):
            lines.append(f"  [{i}] {c.title} ({c.year}) — score: {c.combined_score}")
            snippet = c.text[:160].rstrip() + ("…" if len(c.text) > 160 else "")
            lines.append(f"      \"{snippet}\"")

        lines.append("\nSECTION C — EVIDENCE METADATA:")
        for i, c in enumerate(chunks, 1):
            lines.append(f"  [{i}] source={c.source}, chunk_id={c.chunk_id}, matched_entities={c.matched_entities}")

        if contradictions:
            lines.append("\nSECTION D — DETECTED CONTRADICTIONS:")
            for c in contradictions:
                lines.append(f"  ⚠ \"{c.claim_a}\" vs \"{c.claim_b}\" → {c.nli_label} (score: {c.nli_score})")

        return "\n".join(lines)


# ─────────────────────────────────────────────────────────────
# 4.6  Contradiction Detector
# ─────────────────────────────────────────────────────────────

# Lightweight negation/contrast cue detector — production swaps in BiomedNLI
NEGATION_CUES = ["no effect", "no benefit", "does not", "fails to", "no significant",
                  "lack of", "absence of", "no association", "not associated", "ineffective"]
POSITIVE_CUES = ["improves", "increases", "reduces", "effective", "significant benefit",
                  "associated with", "enhances", "promotes"]


class ContradictionDetector:
    """
    Production implementation:

    from transformers import pipeline
    nli = pipeline("text-classification", model="pritamdeka/BioBERT-mnli-snli-scinli-scitail-mednli-stsb")

    def check(self, premise, hypothesis):
        result = nli(f"{premise} </s></s> {hypothesis}")
        return result[0]  # {'label': 'CONTRADICTION', 'score': 0.94}
    """

    def detect(self, chunks: List[ScoredChunk]) -> List[ContradictionFlag]:
        flags: List[ContradictionFlag] = []
        # Compare every pair of chunks that share at least one matched entity
        for a, b in itertools.combinations(chunks, 2):
            shared = set(a.matched_entities) & set(b.matched_entities)
            if not shared:
                continue
            a_neg = any(cue in a.text.lower() for cue in NEGATION_CUES)
            b_neg = any(cue in b.text.lower() for cue in NEGATION_CUES)
            a_pos = any(cue in a.text.lower() for cue in POSITIVE_CUES)
            b_pos = any(cue in b.text.lower() for cue in POSITIVE_CUES)

            if (a_pos and b_neg) or (a_neg and b_pos):
                flags.append(ContradictionFlag(
                    chunk_a_id=a.chunk_id,
                    chunk_b_id=b.chunk_id,
                    claim_a=a.text[:120].strip() + "…",
                    claim_b=b.text[:120].strip() + "…",
                    nli_label="contradiction",
                    nli_score=round(0.80 + 0.15 * (len(shared) / max(len(a.matched_entities), 1)), 3),
                ))
        return flags

    def apply_penalty(self, chunks: List[ScoredChunk], flags: List[ContradictionFlag],
                       penalty: float = 0.7) -> List[ScoredChunk]:
        flagged_ids = {f.chunk_a_id for f in flags} | {f.chunk_b_id for f in flags}
        for c in chunks:
            if c.chunk_id in flagged_ids:
                c.combined_score = round(c.combined_score * penalty, 4)
        chunks.sort(key=lambda x: x.combined_score, reverse=True)
        return chunks


# ─────────────────────────────────────────────────────────────
# 4.7  Context Compressor
# ─────────────────────────────────────────────────────────────

class ContextCompressor:
    """
    Token-budget-aware compression: keeps highest-scoring, least redundant chunks.
    Redundancy estimated via word-overlap Jaccard similarity between chunk texts.
    """

    def __init__(self, token_budget: int = 1500, redundancy_threshold: float = 0.55):
        self.token_budget = token_budget
        self.redundancy_threshold = redundancy_threshold

    @staticmethod
    def _approx_tokens(text: str) -> int:
        return max(1, len(text.split()) * 4 // 3)  # rough word→token heuristic

    @staticmethod
    def _jaccard(a: str, b: str) -> float:
        sa, sb = set(a.lower().split()), set(b.lower().split())
        if not sa or not sb:
            return 0.0
        return len(sa & sb) / len(sa | sb)

    def compress(self, chunks: List[ScoredChunk]) -> Tuple[List[ScoredChunk], CompressionStats]:
        original_tokens = sum(self._approx_tokens(c.text) for c in chunks)

        kept: List[ScoredChunk] = []
        used_tokens = 0
        dropped = 0

        for c in chunks:
            # redundancy check against already-kept chunks
            is_redundant = any(
                self._jaccard(c.text, k.text) > self.redundancy_threshold for k in kept
            )
            if is_redundant:
                dropped += 1
                continue
            t = self._approx_tokens(c.text)
            if used_tokens + t > self.token_budget:
                dropped += 1
                continue
            kept.append(c)
            used_tokens += t

        stats = CompressionStats(
            original_tokens=original_tokens,
            compressed_tokens=used_tokens,
            chunks_dropped=dropped,
            compression_ratio=round(used_tokens / original_tokens, 3) if original_tokens else 1.0,
        )
        return kept, stats


# ─────────────────────────────────────────────────────────────
# Orchestrator
# ─────────────────────────────────────────────────────────────

class GraphRAGContextAssembly:
    def __init__(self, k_hop_depth: int = 2, token_budget: int = 1500):
        self.assembler   = InputAssembler()
        self.overlap     = EntityOverlapScorer()
        self.subgraph_ex = SubgraphExtractor()
        self.serializer  = TripleSerializer()
        self.fusion      = ContextFusionEngine()
        self.contradict  = ContradictionDetector()
        self.compressor  = ContextCompressor(token_budget=token_budget)
        self.k_hop_depth = k_hop_depth

    def run(self, query: str, step1_result: dict, step2_result: dict, step3_result: dict) -> dict:
        print("  [4.1] Assembling inputs from Step 2 + Step 3…")
        chunks_raw, subgraph = self.assembler.assemble(step2_result, step3_result)

        query_entities = [e["canonical_name"] for e in step1_result.get("linked_entities", [])]
        seed_names = [n["name"] for n in step3_result.get("seed_nodes", [])]

        print("  [4.2] Scoring chunks by entity overlap + semantic similarity…")
        scored_chunks = self.overlap.score(chunks_raw, query_entities)

        print(f"  [4.3] Extracting {self.k_hop_depth}-hop subgraph…")
        triples = self.subgraph_ex.extract(subgraph, seed_names, depth=self.k_hop_depth)

        print("  [4.4] Serializing triples to natural language…")
        facts = self.serializer.serialize(triples)

        print("  [4.6] Detecting contradictions…")
        contradictions = self.contradict.detect(scored_chunks)
        scored_chunks = self.contradict.apply_penalty(scored_chunks, contradictions)

        print("  [4.7] Compressing context to token budget…")
        compressed_chunks, comp_stats = self.compressor.compress(scored_chunks)

        print("  [4.5] Fusing final context block…")
        fused_context = self.fusion.fuse(query, facts, compressed_chunks, contradictions)

        result = Step4Result(
            ranked_chunks=compressed_chunks,
            subgraph_triples=triples,
            graph_facts=facts,
            contradictions=contradictions,
            compression_stats=comp_stats,
            fused_context=fused_context,
        )
        return result.to_dict()


# ─────────────────────────────────────────────────────────────
# Quick test
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    from step1_question_understanding import QuestionUnderstanding
    from step2_semantic_retrieval import SemanticRetrieval
    from step3_graph_traversal import GraphTraversal

    query = "How does Metformin reduce insulin resistance?"
    qu = QuestionUnderstanding()
    sr = SemanticRetrieval()
    gt = GraphTraversal()
    ca = GraphRAGContextAssembly()

    s1 = qu.run(query)
    s2 = sr.run(query, s1)
    s3 = gt.run(s1)
    s4 = ca.run(query, s1, s2, s3)

    print("\n" + "="*60)
    print(s4["fused_context"])
    print("="*60)
    print(json.dumps({k: v for k, v in s4.items() if k != "fused_context"}, indent=2))
