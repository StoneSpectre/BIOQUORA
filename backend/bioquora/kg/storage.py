from __future__ import annotations
import sqlite3
import json
import os
from typing import Any, Optional
from .models import Node, Edge, EntityType, Predicate, Confidence, Provenance, Evidence

import dataclasses
from enum import Enum

def _serialize(obj: Any) -> Any:
    if dataclasses.is_dataclass(obj) and not isinstance(obj, type):
        return dataclasses.asdict(obj)
    elif isinstance(obj, Enum):
        return obj.value
    elif isinstance(obj, dict):
        return {k: _serialize(v) for k, v in obj.items()}
    elif isinstance(obj, (list, tuple)):
        return [_serialize(v) for v in obj]
    elif hasattr(obj, "__dict__"):
        return _serialize(obj.__dict__)
    return obj

SCHEMA = """
CREATE TABLE IF NOT EXISTS kg_nodes (
    id TEXT PRIMARY KEY,
    entity_type TEXT,
    name TEXT,
    description TEXT,
    synonyms_json TEXT,
    external_ids_json TEXT,
    confidence_val REAL,
    provenance_json TEXT,
    properties_json TEXT,
    active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS kg_edges (
    id TEXT PRIMARY KEY,
    source_id TEXT,
    target_id TEXT,
    predicate TEXT,
    confidence_val REAL,
    evidence_json TEXT,
    provenance_json TEXT,
    properties_json TEXT,
    FOREIGN KEY(source_id) REFERENCES kg_nodes(id),
    FOREIGN KEY(target_id) REFERENCES kg_nodes(id)
);

CREATE INDEX IF NOT EXISTS idx_kg_edges_source ON kg_edges(source_id);
CREATE INDEX IF NOT EXISTS idx_kg_edges_target ON kg_edges(target_id);
CREATE INDEX IF NOT EXISTS idx_kg_edges_predicate ON kg_edges(predicate);

CREATE TABLE IF NOT EXISTS kg_embeddings (
    node_id TEXT,
    model_name TEXT,
    embedding_json TEXT,
    PRIMARY KEY(node_id, model_name)
);
"""


class BioquoraStore:
    """
    Bioquora Knowledge Graph Store
    ==============================
    Backing store for canonical entities, external-ID mappings, synonyms,
    relationships (with conflict-preserving semantics per Ch.5 §5.17), evidence,
    provenance, and merge/split audit log.
    """
    def __init__(self, db_path: str = ":memory:"):
        self.db_path = db_path
        if db_path != ":memory:":
            os.makedirs(os.path.dirname(db_path) or ".", exist_ok=True)
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.conn.row_factory = sqlite3.Row
        self._init_schema()

    def _init_schema(self):
        with self.conn:
            self.conn.executescript(SCHEMA)

    def add_node(self, node: Node) -> bool:
        with self.conn:
            self.conn.execute(
                """
                INSERT OR REPLACE INTO kg_nodes (
                    id, entity_type, name, description, synonyms_json,
                    external_ids_json, confidence_val, provenance_json, properties_json, active
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    node.id,
                    getattr(node.entity_type, "value", str(node.entity_type)),
                    node.name,
                    node.description,
                    json.dumps(_serialize(node.synonyms)),
                    json.dumps(_serialize(node.external_ids)),
                    node.confidence.value if node.confidence else 1.0,
                    json.dumps(_serialize(node.provenance)),
                    json.dumps(_serialize(node.properties)),
                    1 if node.active else 0,
                )
            )
        return True

    def get_node(self, node_id: str) -> Optional[Node]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM kg_nodes WHERE id = ?", (node_id,))
        row = cursor.fetchone()
        if not row:
            return None
        return Node(
            id=row["id"],
            entity_type=row["entity_type"],
            name=row["name"],
            description=row["description"],
            synonyms=json.loads(row["synonyms_json"] or "[]"),
            external_ids=json.loads(row["external_ids_json"] or "{}"),
            confidence=Confidence(value=row["confidence_val"] or 1.0),
            properties=json.loads(row["properties_json"] or "{}"),
            active=bool(row["active"]),
        )

    def add_edge(self, edge: Edge) -> bool:
        edge_id = edge.id or f"{edge.source_id}_{getattr(edge.predicate, 'value', str(edge.predicate))}_{edge.target_id}"
        with self.conn:
            self.conn.execute(
                """
                INSERT OR REPLACE INTO kg_edges (
                    id, source_id, target_id, predicate, confidence_val,
                    evidence_json, provenance_json, properties_json
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    edge_id,
                    edge.source_id,
                    edge.target_id,
                    getattr(edge.predicate, "value", str(edge.predicate)),
                    edge.confidence.value if edge.confidence else 1.0,
                    json.dumps(_serialize(edge.evidence)),
                    json.dumps(_serialize(edge.provenance)),
                    json.dumps(_serialize(edge.properties)),
                )
            )
        return True

    def get_edges(self, source_id: Optional[str] = None, target_id: Optional[str] = None, predicate: Optional[str] = None) -> list[Edge]:
        query = "SELECT * FROM kg_edges WHERE 1=1"
        params = []
        if source_id:
            query += " AND source_id = ?"
            params.append(source_id)
        if target_id:
            query += " AND target_id = ?"
            params.append(target_id)
        if predicate:
            query += " AND predicate = ?"
            params.append(predicate)
        cursor = self.conn.cursor()
        cursor.execute(query, params)
        rows = cursor.fetchall()
        edges = []
        for row in rows:
            ev_list = []
            for ev_dict in json.loads(row["evidence_json"] or "[]"):
                if isinstance(ev_dict, dict):
                    ev_list.append(Evidence(
                        id=ev_dict.get("id", ""),
                        evidence_type=ev_dict.get("evidence_type", "CuratedDatabase"),
                        source=ev_dict.get("source", "Unknown"),
                        snippet=ev_dict.get("snippet"),
                        url=ev_dict.get("url"),
                        pmid=ev_dict.get("pmid"),
                        metadata=ev_dict.get("metadata", {}),
                    ))
                else:
                    ev_list.append(ev_dict)
            edges.append(Edge(
                id=row["id"],
                source_id=row["source_id"],
                target_id=row["target_id"],
                predicate=row["predicate"],
                confidence=Confidence(value=row["confidence_val"] or 1.0),
                evidence=ev_list,
                properties=json.loads(row["properties_json"] or "{}"),
            ))
        return edges


    def all_nodes(self) -> list[Node]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM kg_nodes")
        rows = cursor.fetchall()
        nodes = []
        for row in rows:
            nodes.append(Node(
                id=row["id"],
                entity_type=row["entity_type"],
                name=row["name"],
                description=row["description"],
                synonyms=json.loads(row["synonyms_json"] or "[]"),
                external_ids=json.loads(row["external_ids_json"] or "{}"),
                confidence=Confidence(value=row["confidence_val"] or 1.0),
                properties=json.loads(row["properties_json"] or "{}"),
                active=bool(row["active"]),
            ))
        return nodes

    def all_edges(self) -> list[Edge]:
        return self.get_edges()

    def upsert_embedding(self, node_id: str, model_name: str, vec: list[float]) -> bool:
        with self.conn:
            self.conn.execute(
                """
                INSERT OR REPLACE INTO kg_embeddings (node_id, model_name, embedding_json)
                VALUES (?, ?, ?)
                """,
                (node_id, model_name, json.dumps(vec))
            )
        return True

    def get_embedding(self, node_id: str, model_name: str) -> Optional[list[float]]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT embedding_json FROM kg_embeddings WHERE node_id = ? AND model_name = ?", (node_id, model_name))
        row = cursor.fetchone()
        if not row or not row["embedding_json"]:
            return None
        return json.loads(row["embedding_json"])

    def close(self):
        self.conn.close()

