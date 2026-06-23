import numpy as np
import math
from qdrant_client import AsyncQdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchAny

DECAY_LAMBDA  = 0.05
CURRENT_YEAR  = 2025

class ContentBasedFilter:
    """
    Step 2 — BioLinkBERT semantic similarity in Qdrant.
    Applies exponential recency decay: score × exp(-λ × age)
    """

    def __init__(self, qdrant: AsyncQdrantClient, collection: str = "papers"):
        self.qdrant     = qdrant
        self.collection = collection

    def _recency_score(self, base: float, year: int) -> float:
        age = max(0, CURRENT_YEAR - year)
        return base * math.exp(-DECAY_LAMBDA * age)

    async def retrieve(
        self,
        query_vec: np.ndarray,
        limit: int,
        exclude_ids: set[str],
        mesh_filter: list[str] | None = None,
    ) -> list[dict]:
        qf = None
        if mesh_filter:
            qf = Filter(must=[FieldCondition(
                key="mesh_terms", match=MatchAny(any=mesh_filter)
            )])
        hits = await self.qdrant.search(
            collection_name=self.collection,
            query_vector=query_vec.tolist(),
            limit=limit * 3,
            query_filter=qf,
            with_payload=True,
        )
        results = []
        for h in hits:
            if str(h.id) in exclude_ids:
                continue
            year = h.payload.get("year", 2000)
            results.append({
                "paper_id":     str(h.id),
                "content_score": self._recency_score(h.score, year),
                "raw_cosine":   h.score,
                "payload":      h.payload,
            })
        results.sort(key=lambda x: -x["content_score"])
        return results[:limit]
