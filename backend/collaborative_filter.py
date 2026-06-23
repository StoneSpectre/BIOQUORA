import numpy as np
import pickle
from scipy.sparse import csr_matrix
from scipy.sparse.linalg import svds
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as redis

from interaction_repository import InteractionRepository

class CollaborativeFilter:
    """
    Step 3 — Truncated SVD matrix factorisation.
    R ≈ U × Σ × Vᵀ   (k=50 latent factors)
    Cached in Redis; rebuilt nightly.
    """
    K = 50

    def __init__(self, db: AsyncSession, redis_client):
        self.repo  = InteractionRepository(db)
        self.redis = redis_client

    async def build_matrix(self):
        rows = await self.repo.get_interaction_matrix()
        user_ids  = sorted({r.user_id  for r in rows})
        paper_ids = sorted({r.paper_id for r in rows})
        uidx = {u: i for i, u in enumerate(user_ids)}
        pidx = {p: i for i, p in enumerate(paper_ids)}
        ri   = [uidx[r.user_id]  for r in rows]
        ci   = [pidx[r.paper_id] for r in rows]
        vals = [r.score           for r in rows]
        R = csr_matrix((vals, (ri, ci)), shape=(len(user_ids), len(paper_ids)))
        return R, user_ids, paper_ids

    def decompose(self, R: csr_matrix):
        k = min(self.K, min(R.shape) - 1)
        U, sigma, Vt = svds(R.astype(np.float32), k=k)
        order = np.argsort(-sigma)
        return U[:, order], sigma[order], Vt[order, :]

    async def cache_factors(self, U, sigma, Vt, user_ids, paper_ids):
        payload = pickle.dumps({"U": U, "sigma": sigma, "Vt": Vt,
                                "user_ids": user_ids, "paper_ids": paper_ids})
        await self.redis.set("svd_factors", payload, ex=90_000)

    async def load_factors(self):
        raw = await self.redis.get("svd_factors")
        return pickle.loads(raw) if raw else None

    def predict_for_user(self, user_idx, U, sigma, Vt,
                          paper_ids, already_seen, limit) -> list[dict]:
        user_vec = U[user_idx] * sigma
        scores   = user_vec @ Vt
        ranked   = np.argsort(-scores)
        results  = []
        for idx in ranked:
            pid = paper_ids[idx]
            if pid not in already_seen:
                results.append({"paper_id": pid, "collab_score": float(scores[idx])})
            if len(results) >= limit:
                break
        return results
