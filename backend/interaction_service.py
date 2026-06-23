import numpy as np
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from qdrant_client import AsyncQdrantClient

from interaction_repository import InteractionRepository

class InteractionService:
    def __init__(self, db: AsyncSession, qdrant: AsyncQdrantClient):
        self.repo = InteractionRepository(db)
        self.qdrant = qdrant

    async def log(self, user_id: UUID, paper_id: UUID, event_type: str, metadata: dict) -> dict:
        weight = await self.repo.upsert(user_id, paper_id, event_type, metadata)
        return {"status": "logged", "weight": weight, "event_type": event_type}

    async def build_user_profile_vector(self, user_id: UUID) -> np.ndarray:
        interactions = await self.repo.get_user_interactions(user_id, weight_gt=0)
        if not interactions:
            return np.zeros(768)  # cold-start

        paper_ids = [str(r.paper_id) for r in interactions]
        weights   = np.array([r.weight for r in interactions])

        points = await self.qdrant.retrieve(
            collection_name="papers",
            ids=paper_ids,
            with_vectors=True,
        )
        vectors = np.array([p.vector for p in points if p.vector])
        if not len(vectors):
            return np.zeros(768)

        w = weights[:len(vectors)]
        return (w[:, None] * vectors).sum(0) / w.sum()

    def get_cold_start_tier(self, interaction_count: int) -> str:
        if interaction_count == 0:    return "tier_1_cold"
        if interaction_count <= 4:    return "tier_2_warming"
        if interaction_count <= 19:   return "tier_3_developing"
        return "tier_4_established"
