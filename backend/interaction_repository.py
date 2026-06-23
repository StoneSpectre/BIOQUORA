from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from uuid import UUID

WEIGHTS = {
    "read": 1.0, "dwell": 1.5, "share": 1.8,
    "save": 2.0, "cite": 3.0, "downvote": -1.0,
}

class InteractionRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def upsert(self, user_id: UUID, paper_id: UUID, event_type: str, metadata: dict) -> float:
        weight = WEIGHTS[event_type]
        await self.db.execute(text("""
            INSERT INTO user_paper_interactions
                (user_id, paper_id, event_type, weight, metadata)
            VALUES (:uid, :pid, :etype, :w, :meta)
            ON CONFLICT (user_id, paper_id, event_type)
            DO UPDATE SET weight = EXCLUDED.weight,
                          updated_at = now(),
                          metadata = EXCLUDED.metadata
        """), {"uid": str(user_id), "pid": str(paper_id),
               "etype": event_type, "w": weight, "meta": metadata or {}})
        await self.db.commit()
        return weight

    async def get_user_interactions(self, user_id: UUID, weight_gt: float = 0) -> list:
        rows = await self.db.execute(text("""
            SELECT paper_id, event_type, weight, metadata, created_at
            FROM user_paper_interactions
            WHERE user_id = :uid AND weight > :wgt
            ORDER BY created_at DESC
        """), {"uid": str(user_id), "wgt": weight_gt})
        return rows.fetchall()

    async def get_interaction_matrix(self) -> list:
        rows = await self.db.execute(text("""
            SELECT user_id::text, paper_id::text,
                   SUM(weight) AS score
            FROM user_paper_interactions
            WHERE weight > 0
            GROUP BY user_id, paper_id
        """))
        return rows.fetchall()
