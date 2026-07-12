"""
9.3 Semantic Platform Components / 9.4 Service Responsibilities

Eleven single-responsibility services communicating through the shared
EventBus (9.6) and a common KnowledgeGraph instance (9.2 -- "one semantic
infrastructure, many intelligent applications"). Each service is a thin,
swappable boundary: in production, IdentifierService/OntologyService/etc.
would be backed by Postgres, Neo4j, Qdrant, etc.; here they're in-memory
reference implementations that preserve the exact responsibilities in 9.4.
"""

from __future__ import annotations

import hashlib
import uuid
from datetime import datetime, timezone
from typing import Optional

from ..reasoning.engine import BiomedicalReasoningEngine
from ..reasoning.graph import KnowledgeGraph
from ..reasoning.models import (
    Evidence,
    EvidenceSource,
    GraphEdge,
    GraphNode,
    Predicate,
)
from .event_bus import (
    TOPIC_CONFIDENCE_CHANGED,
    TOPIC_EDGE_ADDED,
    TOPIC_ENTITY_UPDATED,
    TOPIC_ONTOLOGY_VERSION,
    TOPIC_PUBLICATION_IMPORTED,
    EventBus,
)


# ---------------------------------------------------------------------------
# Identifier Service -- canonical IDs, namespaces, cross-ref resolution, dupes
# ---------------------------------------------------------------------------

class IdentifierService:
    def __init__(self):
        self._canonical: dict[str, str] = {}   # external_ref -> canonical_id
        self._namespaces: dict[str, str] = {}  # canonical_id -> namespace

    def mint(self, namespace: str, external_ref: str) -> str:
        """Cross-reference resolution + duplicate detection: if this
        external ref was already seen, return the existing canonical ID."""
        key = f"{namespace}:{external_ref}"
        if key in self._canonical:
            return self._canonical[key]
        canonical_id = f"{namespace.upper()}:{uuid.uuid4().hex[:8]}"
        self._canonical[key] = canonical_id
        self._namespaces[canonical_id] = namespace
        return canonical_id

    def resolve(self, namespace: str, external_ref: str) -> Optional[str]:
        return self._canonical.get(f"{namespace}:{external_ref}")


# ---------------------------------------------------------------------------
# Ontology Service -- ingestion, versioning, hierarchy traversal, predicate validation
# ---------------------------------------------------------------------------

class OntologyService:
    def __init__(self, event_bus: EventBus):
        self.bus = event_bus
        self.versions: dict[str, str] = {}          # ontology_name -> current version
        self.hierarchy: dict[str, set[str]] = {}     # term -> parent terms

    def ingest_version(self, ontology_name: str, version: str) -> None:
        self.versions[ontology_name] = version
        self.bus.publish(TOPIC_ONTOLOGY_VERSION, {"ontology": ontology_name, "version": version})

    def add_relation(self, child: str, parent: str) -> None:
        self.hierarchy.setdefault(child, set()).add(parent)

    def ancestors(self, term: str) -> set[str]:
        seen, stack = set(), [term]
        while stack:
            t = stack.pop()
            for p in self.hierarchy.get(t, set()):
                if p not in seen:
                    seen.add(p)
                    stack.append(p)
        return seen

    def descendants(self, term: str) -> set[str]:
        return {c for c, parents in self.hierarchy.items() if term in parents}

    def validate_predicate(self, subject_type: str, predicate: Predicate, object_type: str) -> bool:
        from ..reasoning.graph import VALID_RULES
        return (subject_type, predicate, object_type) in VALID_RULES


# ---------------------------------------------------------------------------
# Entity Resolution Service -- normalization, synonyms, merge/split decisions
# ---------------------------------------------------------------------------

class EntityResolutionService:
    def __init__(self):
        self.synonyms: dict[str, str] = {}  # alias (lowercased) -> canonical_id
        self.merge_log: list[dict] = []

    def register_synonym(self, alias: str, canonical_id: str) -> None:
        self.synonyms[alias.lower().strip()] = canonical_id

    def normalize(self, mention: str) -> Optional[str]:
        return self.synonyms.get(mention.lower().strip())

    def merge(self, keep_id: str, drop_id: str, reason: str) -> None:
        for alias, cid in list(self.synonyms.items()):
            if cid == drop_id:
                self.synonyms[alias] = keep_id
        self.merge_log.append({"kept": keep_id, "dropped": drop_id, "reason": reason})


# ---------------------------------------------------------------------------
# Knowledge Graph Service -- nodes/edges/traversal/validation
# (thin wrapper exposing the reasoning.graph.KnowledgeGraph as a "service")
# ---------------------------------------------------------------------------

class KnowledgeGraphService:
    def __init__(self, kg: KnowledgeGraph, event_bus: EventBus):
        self.kg = kg
        self.bus = event_bus

    def upsert_node(self, node: GraphNode) -> None:
        self.kg.add_node(node)
        self.bus.publish(TOPIC_ENTITY_UPDATED, {"node_id": node.id, "type": node.type.value})

    def add_edge(self, edge: GraphEdge) -> GraphEdge:
        result = self.kg.add_edge(edge)
        self.bus.publish(TOPIC_EDGE_ADDED, {"edge_id": edge.id, "predicate": edge.predicate.value})
        return result

    def update_confidence(self, edge_id: str, new_confidence: float) -> None:
        old = self.kg.edges[edge_id].confidence
        self.kg.edges[edge_id].confidence = new_confidence
        self.bus.publish(
            TOPIC_CONFIDENCE_CHANGED,
            {"edge_id": edge_id, "old": old, "new": new_confidence},
        )

    def neighbors(self, node_id: str) -> list[str]:
        return self.kg.neighbors(node_id)


# ---------------------------------------------------------------------------
# Evidence Service -- publication linkage, clinical evidence, scoring, citations
# ---------------------------------------------------------------------------

class EvidenceService:
    def __init__(self, kg: KnowledgeGraph, event_bus: EventBus):
        self.kg = kg
        self.bus = event_bus

    def add_publication_evidence(
        self, edge_id: str, pmid: str, statement: str, supports: bool = True, **kwargs
    ) -> Evidence:
        ev = Evidence(
            source=EvidenceSource.PUBLICATION,
            source_id=pmid,
            statement=statement,
            supports=supports,
            **kwargs,
        )
        self.kg.add_evidence(ev)
        self.kg.edges[edge_id].evidence_ids.append(ev.id)
        self.bus.publish(TOPIC_PUBLICATION_IMPORTED, {"edge_id": edge_id, "pmid": pmid})
        return ev

    def supporting_publications(self, edge_id: str) -> list[Evidence]:
        return [self.kg.evidence[eid] for eid in self.kg.edges[edge_id].evidence_ids if self.kg.evidence[eid].supports]


# ---------------------------------------------------------------------------
# Embedding Service -- entity/document embeddings, similarity, versioning
# ---------------------------------------------------------------------------

class EmbeddingService:
    """Reference implementation uses a deterministic hash-based pseudo-embedding
    so the demo is dependency-free; production swaps this for PubMedBERT /
    a real encoder without changing the interface."""

    DIM = 32

    def __init__(self):
        self.version = "hash-embed-v1"
        self._cache: dict[str, list[float]] = {}

    def embed(self, text: str) -> list[float]:
        if text in self._cache:
            return self._cache[text]
        h = hashlib.sha256(text.encode()).digest()
        vec = [b / 255.0 for b in h[: self.DIM]]
        self._cache[text] = vec
        return vec

    @staticmethod
    def cosine(a: list[float], b: list[float]) -> float:
        dot = sum(x * y for x, y in zip(a, b))
        norm_a = sum(x * x for x in a) ** 0.5
        norm_b = sum(y * y for y in b) ** 0.5
        return round(dot / (norm_a * norm_b), 4) if norm_a and norm_b else 0.0


# ---------------------------------------------------------------------------
# Search Service -- lexical + vector + graph retrieval, hybrid ranking
# ---------------------------------------------------------------------------

class SearchService:
    def __init__(self, kg: KnowledgeGraph, embeddings: EmbeddingService):
        self.kg = kg
        self.embeddings = embeddings

    def lexical(self, query: str, limit: int = 10) -> list[GraphNode]:
        q = query.lower()
        return [n for n in self.kg.nodes.values() if q in n.name.lower()][:limit]

    def vector(self, query: str, limit: int = 10) -> list[tuple[GraphNode, float]]:
        qv = self.embeddings.embed(query)
        scored = [(n, self.embeddings.cosine(qv, self.embeddings.embed(n.name))) for n in self.kg.nodes.values()]
        return sorted(scored, key=lambda kv: kv[1], reverse=True)[:limit]

    def hybrid(self, query: str, limit: int = 10, alpha: float = 0.5) -> list[tuple[GraphNode, float]]:
        """alpha weights lexical vs. vector signal."""
        lexical_hits = {n.id for n in self.lexical(query, limit=50)}
        vector_scores = dict((n.id, s) for n, s in self.vector(query, limit=50))
        combined: dict[str, float] = {}
        for nid, vscore in vector_scores.items():
            lscore = 1.0 if nid in lexical_hits else 0.0
            combined[nid] = alpha * lscore + (1 - alpha) * vscore
        ranked = sorted(combined.items(), key=lambda kv: kv[1], reverse=True)[:limit]
        return [(self.kg.nodes[nid], round(score, 4)) for nid, score in ranked]


# ---------------------------------------------------------------------------
# Reasoning Service -- thin API wrapper over BiomedicalReasoningEngine
# ---------------------------------------------------------------------------

class ReasoningService:
    def __init__(self, kg: KnowledgeGraph):
        self.engine = BiomedicalReasoningEngine(kg)


# ---------------------------------------------------------------------------
# Provenance Service -- source, pipeline, timestamp, transformation/validation history
# ---------------------------------------------------------------------------

class ProvenanceService:
    def __init__(self):
        self.records: dict[str, list[dict]] = {}

    def record(self, object_id: str, **fields) -> None:
        entry = {"timestamp": datetime.now(timezone.utc).isoformat(), **fields}
        self.records.setdefault(object_id, []).append(entry)

    def history(self, object_id: str) -> list[dict]:
        return self.records.get(object_id, [])


# ---------------------------------------------------------------------------
# Version Service -- independent versions per component (9.10)
# ---------------------------------------------------------------------------

class VersionService:
    def __init__(self):
        self.components = {
            "ontology": "unset",
            "knowledge_graph": "v0.0.0",
            "embeddings": "unset",
            "search_index": "v0.0.0",
            "reasoning_rules": "v1.0.0",
            "mapping_tables": "v0.0.0",
        }

    def bump(self, component: str, version: str) -> None:
        self.components[component] = version

    def release_manifest(self) -> dict:
        return {"released_at": datetime.now(timezone.utc).isoformat(), **self.components}


# ---------------------------------------------------------------------------
# Audit Service -- who did what, when (security + governance backbone)
# ---------------------------------------------------------------------------

class AuditService:
    def __init__(self):
        self.log: list[dict] = []

    def record(self, actor: str, action: str, target: str, details: Optional[dict] = None) -> None:
        self.log.append(
            {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "actor": actor,
                "action": action,
                "target": target,
                "details": details or {},
            }
        )
