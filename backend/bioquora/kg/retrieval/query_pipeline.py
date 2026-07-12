"""
Part 6 — Bioquora Semantic Retrieval Engine (BSRE)

Implements the end-to-end pipeline of §7.4:

  User Query -> Language Detection -> Biomedical NER -> Entity Linking
  -> Ontology Expansion -> Intent Detection -> Graph Query Construction
  -> Vector Embedding -> Hybrid Retrieval -> Evidence Ranking
  -> Response Assembly

and the Query Planner of §7.18, which chooses which retrieval components
to invoke based on detected intent (§7.6).
"""

from __future__ import annotations

import re
from dataclasses import dataclass, field
from enum import Enum

from ..embeddings import EmbeddingModel, VectorIndex
from ..graph import BioquoraKnowledgeGraph
from ..models import EntityType, Predicate
from .graph_search import GraphSearchLayer
from .hybrid import HybridRanker, ScoredResult
from .lexical import LexicalIndex
from .ontology import OntologyExpander


# ---------------------------------------------------------------------------
# §7.6 Query Intent Classification
# ---------------------------------------------------------------------------
class Intent(str, Enum):
    LITERATURE = "literature"                 # find papers / summarize evidence
    CLINICAL = "clinical"                      # treatments / diagnosis / prognosis
    MOLECULAR = "molecular"                    # gene / protein / variant / pathway
    DRUG_DISCOVERY = "drug_discovery"           # drug targets / repurposing
    KNOWLEDGE_GRAPH = "knowledge_graph"         # connections / explain relationship
    RESEARCH = "research"                       # datasets / trials / models
    ENTITY_LOOKUP = "ENTITY_LOOKUP"             # alias for entity lookup
    RELATIONSHIP_TRAVERSAL = "RELATIONSHIP_TRAVERSAL"
    SUBGRAPH_EXTRACTION = "SUBGRAPH_EXTRACTION"
    PATH_FINDING = "PATH_FINDING"
    CONTRADICTION_SEARCH = "CONTRADICTION_SEARCH"
    LITERATURE_EVIDENCE = "LITERATURE_EVIDENCE"
    GENERAL_QA = "GENERAL_QA"


_INTENT_PATTERNS: list[tuple[Intent, list[str]]] = [
    (Intent.CONTRADICTION_SEARCH, [r"\bcontradict\b", r"\bconflict\b", r"\bdisagree\b"]),
    (Intent.RELATIONSHIP_TRAVERSAL, [r"\bcause", r"\brelat", r"\binteract", r"\baffect", r"\bbinds?\b"]),
    (Intent.PATH_FINDING, [r"\bpath\b", r"\bbetween\b", r"\bconnect", r"\brelationship\b", r"\bexplain\b", r"\bhow (is|are|does)\b"]),
    (Intent.ENTITY_LOOKUP, [r"what is\b", r"define\b", r"who is\b"]),
    (Intent.DRUG_DISCOVERY, [r"\bdrug\b", r"\btarget", r"\brepurpos", r"\btreat"]),
    (Intent.CLINICAL, [r"\bdiagnos", r"\bprognos", r"\bbiomarker", r"\bclinical\b", r"\bsymptom"]),
    (Intent.MOLECULAR, [r"\bgene\b", r"\bprotein\b", r"\bvariant\b", r"\bpathway\b", r"\bencodes\b"]),
    (Intent.RESEARCH, [r"\bdataset", r"\btrial\b", r"\bmodel\b", r"\bbenchmark"]),
    (Intent.LITERATURE, [r"\bpaper", r"\bstud(y|ies)\b", r"\bsummariz", r"\bcompare\b", r"\bliterature\b"]),
]


def detect_intent(query: str) -> Intent:
    q = query.lower()
    for intent, patterns in _INTENT_PATTERNS:
        if any(re.search(p, q) for p in patterns):
            return intent
    return Intent.LITERATURE  # sensible default


# ---------------------------------------------------------------------------
# §7.5 Biomedical Query Understanding — lightweight NER + entity linking
# ---------------------------------------------------------------------------
@dataclass
class LinkedEntity:
    mention: str
    bioquora_id: str | None
    entity_type: str | None
    canonical_label: str | None


class BiomedicalNER:
    """Dictionary-driven NER: scans the query for any known node label or
    synonym already present in the knowledge graph. This mirrors what a
    trained biomedical NER + entity-linking model (e.g. SciSpaCy + a KG
    linker) would return, without requiring an external model download."""

    def __init__(self, kg: BioquoraKnowledgeGraph):
        self.kg = kg
        self._surface_forms: dict[str, str] = {}  # lowercase surface -> bioquora_id
        for _, node in kg._g.nodes(data=True):
            if not node:
                continue
            for form in [node["preferred_label"], *node.get("synonyms", [])]:
                self._surface_forms[form.lower()] = node["bioquora_id"]

    def extract_and_link(self, query: str) -> list[LinkedEntity]:
        found: list[LinkedEntity] = []
        q_lower = query.lower()
        # longest-match-first so "HER2-positive breast cancer" beats "breast cancer"
        for surface in sorted(self._surface_forms, key=len, reverse=True):
            if surface in q_lower:
                bid = self._surface_forms[surface]
                node = self.kg.get_node(bid)
                found.append(
                    LinkedEntity(
                        mention=surface,
                        bioquora_id=bid,
                        entity_type=str(node["entity_type"]) if node else None,
                        canonical_label=node["preferred_label"] if node else None,
                    )
                )
                q_lower = q_lower.replace(surface, "")  # avoid overlapping re-matches
        return found


# ---------------------------------------------------------------------------
# §7.18 Query Planner
# ---------------------------------------------------------------------------
_INTENT_TO_LAYERS: dict[Intent, list[str]] = {
    Intent.KNOWLEDGE_GRAPH: ["graph", "lexical"],
    Intent.DRUG_DISCOVERY: ["graph", "vector", "lexical"],
    Intent.CLINICAL: ["graph", "lexical", "vector"],
    Intent.MOLECULAR: ["graph", "lexical"],
    Intent.RESEARCH: ["lexical", "graph"],
    Intent.LITERATURE: ["lexical", "vector"],
    Intent.CONTRADICTION_SEARCH: ["graph", "lexical", "vector"],
    Intent.PATH_FINDING: ["graph", "lexical"],
    Intent.ENTITY_LOOKUP: ["lexical", "graph"],
    Intent.RELATIONSHIP_TRAVERSAL: ["graph", "lexical"],
    Intent.SUBGRAPH_EXTRACTION: ["graph"],
    Intent.LITERATURE_EVIDENCE: ["lexical", "vector"],
    Intent.GENERAL_QA: ["lexical", "vector", "graph"],
}


@dataclass
class QueryPlan:
    intent: Intent
    layers: list[str]
    linked_entities: list[LinkedEntity]
    ontology_expansions: list[dict]


@dataclass
class QueryResult:
    query: str
    plan: QueryPlan
    results: list[ScoredResult]
    explanation: str = ""
    intent: Intent = field(init=False)
    nodes: list[Any] = field(default_factory=list)
    edges: list[Any] = field(default_factory=list)
    metadata: dict[str, Any] = field(default_factory=dict)

    def __post_init__(self):
        self.intent = self.plan.intent


class BioquoraQueryPipeline:
    """Orchestrates §7.4 end to end."""

    def __init__(self, kg: BioquoraKnowledgeGraph):
        self.kg = kg
        self.ner = BiomedicalNER(kg)
        self.ontology = OntologyExpander()
        self.graph_search = GraphSearchLayer(kg)
        self.lexical_index = LexicalIndex()
        self.vector_index = VectorIndex()
        self.embedder = EmbeddingModel()
        self.ranker = HybridRanker(kg)
        self._indexed = False

    def classify_intent(self, query: str) -> Intent:
        return detect_intent(query)

    def execute(self, query: str, intent: Optional[Intent] = None) -> QueryResult:
        return self.search(query)

    # -- index construction (run once after graph is populated) --------
    def build_indices(self) -> None:
        nodes = self.kg.all_nodes() if hasattr(self.kg, "all_nodes") else self.kg.store.all_nodes()
        id_to_text = {n["bioquora_id"]: self._searchable_text(n) for n in nodes}
        self.lexical_index.build(id_to_text)

        texts = list(id_to_text.values())
        ids = list(id_to_text.keys())
        self.embedder.fit(texts)
        vectors = self.embedder.encode(texts)
        id_to_vec = {ids[i]: vectors[i] for i in range(len(ids))}
        for bid, vec in id_to_vec.items():
            self.kg.store.upsert_embedding(bid, self.embedder.MODEL_NAME, vec)
        self.vector_index.build(id_to_vec)
        self._indexed = True

    @staticmethod
    def _searchable_text(node: Any) -> str:
        parts = [node["preferred_label"], *node.get("synonyms", []), node.get("description", "")]
        parts += list(node.get("ontology_ids", {}).values())
        return " | ".join(p for p in parts if p)

    # -- step-by-step pipeline (§7.4) -----------------------------------
    def plan(self, query: str) -> QueryPlan:
        entities = self.ner.extract_and_link(query)          # NER + linking
        intent = detect_intent(query)                        # intent detection
        expansions = [self.ontology.expand(e.mention) for e in entities]
        unmatched_terms = self._candidate_lay_terms(query, entities)
        expansions += [self.ontology.expand(t) for t in unmatched_terms]
        expansions = [e for e in expansions if e["canonical_label"] or e["hierarchy_expansion"]]
        layers = _INTENT_TO_LAYERS.get(intent, ["lexical", "vector"])
        return QueryPlan(intent=intent, layers=layers, linked_entities=entities, ontology_expansions=expansions)

    @staticmethod
    def _candidate_lay_terms(query: str, entities: list[LinkedEntity]) -> list[str]:
        q = query.lower()
        for e in entities:
            q = q.replace(e.mention, "")
        return [w.strip() for w in re.split(r"[?.,!]", q) if 0 < len(w.strip().split()) <= 3]

    def search(self, query: str, top_k: int = 5) -> QueryResult:
        if not self._indexed:
            self.build_indices()

        plan = self.plan(query)

        lexical_hits = self.lexical_index.search(query, top_k=25) if "lexical" in plan.layers else []

        vector_hits: list[tuple[str, float]] = []
        if "vector" in plan.layers:
            qvec = self.embedder.encode_one(query)
            vector_hits = self.vector_index.search(qvec, top_k=25)

        graph_hits: list[tuple[str, float]] = []
        ontology_boost_ids: set[str] = set()
        if "graph" in plan.layers:
            for ent in plan.linked_entities:
                if ent.bioquora_id:
                    ontology_boost_ids.add(ent.bioquora_id)
                    graph_hits += self.graph_search.neighborhood_search(ent.bioquora_id, max_hops=2)

        ranked = self.ranker.rank(lexical_hits, vector_hits, graph_hits, ontology_boost_ids, top_k=top_k)
        explanation = self._explain(plan, ranked)
        return QueryResult(query=query, plan=plan, results=ranked, explanation=explanation)

    @staticmethod
    def _explain(plan: QueryPlan, ranked: list[ScoredResult]) -> str:
        ents = ", ".join(e.canonical_label or e.mention for e in plan.linked_entities) or "none detected"
        layers = " + ".join(plan.layers)
        return (
            f"Intent: {plan.intent.value} | Entities linked: {ents} | "
            f"Retrieval layers used: {layers} | {len(ranked)} results ranked by hybrid score."
        )
