from __future__ import annotations
import math
import re
from typing import Any


class EmbeddingModel:
    MODEL_NAME = "bioquora-lightweight-embedding-v1"

    def __init__(self, dim: int = 64):
        self.dim = dim
        self.vocab: dict[str, int] = {}
        self.idf: dict[str, float] = {}

    def fit(self, texts: list[str]) -> None:
        doc_count = len(texts)
        df: dict[str, int] = {}
        for text in texts:
            words = set(re.findall(r"\w+", text.lower()))
            for w in words:
                df[w] = df.get(w, 0) + 1
                if w not in self.vocab:
                    self.vocab[w] = len(self.vocab) % self.dim
        for w, count in df.items():
            self.idf[w] = math.log((1 + doc_count) / (1 + count)) + 1.0

    def encode_one(self, text: str) -> list[float]:
        vec = [0.0] * self.dim
        words = re.findall(r"\w+", text.lower())
        if not words:
            return vec
        for w in words:
            idx = self.vocab.get(w, hash(w) % self.dim)
            weight = self.idf.get(w, 1.0)
            vec[idx] += weight
        # L2 normalize
        norm = math.sqrt(sum(x * x for x in vec))
        if norm > 0:
            vec = [x / norm for x in vec]
        return vec

    def encode(self, texts: list[str]) -> list[list[float]]:
        return [self.encode_one(t) for t in texts]


class VectorIndex:
    """Exact cosine-similarity vector index for Bioquora semantic search."""
    def __init__(self):
        self.id_to_vec: dict[str, list[float]] = {}

    def build(self, id_to_vec: dict[str, list[float]]) -> None:
        self.id_to_vec = id_to_vec

    def search(self, query_vec: list[float], top_k: int = 25) -> list[tuple[str, float]]:
        scores: list[tuple[str, float]] = []
        for bid, vec in self.id_to_vec.items():
            score = sum(q * v for q, v in zip(query_vec, vec))
            scores.append((bid, score))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:top_k]
