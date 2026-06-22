import { useState } from "react";

const TABS = ["Overview", "Step 3: Collaborative Filtering", "Step 4: Citation Graph"];

// ── Shared UI primitives ──────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: 24 }}>
      <button
        onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
        style={{
          position: "absolute", top: 10, right: 12,
          background: copied ? "#16a34a" : "#1e293b",
          color: "#fff", border: "none", borderRadius: 6,
          padding: "3px 11px", fontSize: 11, cursor: "pointer", zIndex: 2,
          fontFamily: "monospace", letterSpacing: 0.5,
        }}
      >{copied ? "Copied ✓" : "Copy"}</button>
      <pre style={{
        background: "#050d1a", color: "#cdd9e5",
        borderRadius: 10, padding: "20px 16px 20px 18px",
        overflowX: "auto", fontSize: 12.5, lineHeight: 1.75, margin: 0,
        border: "1px solid #0f2035",
      }}><code>{code}</code></pre>
    </div>
  );
}

function Sec({ title, badge, accent = "#3b82f6", children }: any) {
  return (
    <div style={{ marginBottom: 38 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, borderBottom: "1px solid #0f2035", paddingBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#e2e8f0" }}>{title}</h3>
        {badge && <span style={{ background: `${accent}22`, color: accent, fontSize: 11, padding: "2px 9px", borderRadius: 20, fontWeight: 700, border: `1px solid ${accent}44` }}>{badge}</span>}
      </div>
      {children}
    </div>
  );
}

function Note({ icon = "ℹ️", text, accent = "#3b82f6" }: any) {
  return (
    <div style={{
      background: "#050d1a", border: `1px solid ${accent}33`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 8, padding: "10px 14px", marginBottom: 14,
      fontSize: 13, color: "#94a3b8", lineHeight: 1.6,
      display: "flex", gap: 10,
    }}>
      <span style={{ fontSize: 15 }}>{icon}</span><span>{text}</span>
    </div>
  );
}

function Flow({ steps, accent = "#3b82f6" }: any) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 0, marginBottom: 20 }}>
      {steps.map((s: string, i: number) => (
        <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
          <div style={{ background: `${accent}18`, color: accent, border: `1px solid ${accent}55`, borderRadius: 8, padding: "6px 16px", fontSize: 13, fontWeight: 500 }}>{s}</div>
          {i < steps.length - 1 && <div style={{ color: "#334155", fontSize: 18, lineHeight: 1, paddingLeft: 16 }}>↓</div>}
        </div>
      ))}
    </div>
  );
}

function MetricTable({ rows }: any) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, marginBottom: 20 }}>
      <thead>
        <tr style={{ background: "#0a1628" }}>
          {Object.keys(rows[0]).map(h => (
            <th key={h} style={{ padding: "8px 14px", textAlign: "left", color: "#64748b", fontWeight: 600, border: "1px solid #0f2035", fontSize: 12 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r: any, i: number) => (
          <tr key={i}>
            {Object.values(r).map((v: any, j: number) => (
              <td key={j} style={{ padding: "7px 14px", color: j === 0 ? "#38bdf8" : "#94a3b8", border: "1px solid #0f2035", fontFamily: j === 0 ? "monospace" : "inherit" }}>{v}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ── All code strings ──────────────────────────────────────────────────────────

const S3 = {

repository: `# recommendation/collaborative/repository.py
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text

class CollaborativeRepository:
    """
    Fetches aggregated interaction scores from PostgreSQL.
    Aggregation rule: sum all weights per (user, paper) pair.
    """

    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_all_interactions(self) -> list[dict]:
        """
        Full interaction dump for matrix construction.
        Called by the nightly trainer, not per-request.
        Returns rows: [{user_id, paper_id, score}]
        """
        result = await self.db.execute(text("""
            SELECT
                user_id,
                paper_id,
                SUM(weight) AS score          -- aggregate multiple events
            FROM user_paper_interactions
            WHERE weight > 0                  -- exclude downvotes from training
            GROUP BY user_id, paper_id
            HAVING SUM(weight) > 0
        """))
        return [{"user_id": str(r.user_id),
                 "paper_id": str(r.paper_id),
                 "score": float(r.score)}
                for r in result]

    async def get_user_interactions(self, user_id: UUID) -> set[str]:
        """Papers this user has already interacted with (for filtering)."""
        result = await self.db.execute(text("""
            SELECT DISTINCT paper_id
            FROM user_paper_interactions
            WHERE user_id = :uid
        """), {"uid": str(user_id)})
        return {str(r.paper_id) for r in result}`,

index_mapper: `# recommendation/collaborative/index_mapper.py
from uuid import UUID
from dataclasses import dataclass, field

@dataclass
class IndexMapper:
    """
    Bidirectional UUID ↔ integer index mapping.
    SVD operates on integer indices; we translate back to UUIDs for the API.
    """
    user_to_idx:  dict[str, int] = field(default_factory=dict)
    idx_to_user:  dict[int, str] = field(default_factory=dict)
    paper_to_idx: dict[str, int] = field(default_factory=dict)
    idx_to_paper: dict[int, str] = field(default_factory=dict)

    def build(self, interactions: list[dict]) -> "IndexMapper":
        users  = sorted({r["user_id"]  for r in interactions})
        papers = sorted({r["paper_id"] for r in interactions})

        self.user_to_idx  = {u: i for i, u in enumerate(users)}
        self.idx_to_user  = {i: u for i, u in enumerate(users)}
        self.paper_to_idx = {p: i for i, p in enumerate(papers)}
        self.idx_to_paper = {i: p for i, p in enumerate(papers)}
        return self

    @property
    def n_users(self) -> int:  return len(self.user_to_idx)

    @property
    def n_papers(self) -> int: return len(self.paper_to_idx)`,

matrix_builder: `# recommendation/collaborative/matrix_builder.py
import numpy as np
from scipy.sparse import csr_matrix
from recommendation.collaborative.index_mapper import IndexMapper

class MatrixBuilder:
    """
    Converts interaction rows into a CSR (Compressed Sparse Row) matrix.

    Dense matrix for 100k users × 2M papers = 200B floats → impossible.
    CSR stores only non-zero values → practical for millions of rows.

    Matrix shape: (n_users, n_papers)
    Values:       aggregated interaction score
    """

    def build(
        self,
        interactions: list[dict],
        mapper: IndexMapper,
    ) -> csr_matrix:
        rows, cols, data = [], [], []

        for row in interactions:
            u_idx = mapper.user_to_idx.get(row["user_id"])
            p_idx = mapper.paper_to_idx.get(row["paper_id"])
            if u_idx is None or p_idx is None:
                continue
            rows.append(u_idx)
            cols.append(p_idx)
            data.append(row["score"])

        matrix = csr_matrix(
            (data, (rows, cols)),
            shape=(mapper.n_users, mapper.n_papers),
            dtype=np.float32,
        )
        return matrix`,

svd_model: `# recommendation/collaborative/svd_model.py
import numpy as np
from scipy.sparse import csr_matrix
from sklearn.decomposition import TruncatedSVD
from dataclasses import dataclass

@dataclass
class SVDFactors:
    """Holds the decomposed factor matrices after training."""
    user_factors:   np.ndarray   # shape: (n_users,  n_components)
    paper_factors:  np.ndarray   # shape: (n_papers, n_components)
    singular_values: np.ndarray  # shape: (n_components,)
    n_components:   int
    model_version:  str

class SVDModel:
    """
    Truncated SVD (randomised) for implicit collaborative filtering.

    R ≈ U · Σ · Vᵀ

    We absorb √Σ into both U and V so that predictions become
    simple dot products:  score(u, p) = U_u · V_p

    Recommended latent dimensions:
      - 50  for datasets < 500k interactions
      - 100 for datasets > 1M interactions
    """

    def __init__(self, n_components: int = 50, random_state: int = 42):
        self.n_components  = n_components
        self.random_state  = random_state

    def train(self, matrix: csr_matrix, version: str) -> SVDFactors:
        svd = TruncatedSVD(
            n_components = self.n_components,
            algorithm    = "randomized",   # faster than ARPACK for large matrices
            n_iter       = 10,
            random_state = self.random_state,
        )
        # U matrix: each row = one user's latent vector
        U = svd.fit_transform(matrix)           # (n_users, k)
        S = svd.singular_values_               # (k,)
        V = svd.components_.T                   # (n_papers, k)

        # Absorb √Σ → prediction = U_u · V_p (pure dot product)
        sqrt_S     = np.sqrt(S)
        user_mat   = U * sqrt_S[np.newaxis, :]
        paper_mat  = V * sqrt_S[np.newaxis, :]

        # L2-normalise rows for stable dot-product scores
        user_mat  /= np.linalg.norm(user_mat,  axis=1, keepdims=True).clip(min=1e-8)
        paper_mat /= np.linalg.norm(paper_mat, axis=1, keepdims=True).clip(min=1e-8)

        return SVDFactors(
            user_factors    = user_mat,
            paper_factors   = paper_mat,
            singular_values = S,
            n_components    = self.n_components,
            model_version   = version,
        )`,

predictor: `# recommendation/collaborative/predictor.py
import numpy as np
from recommendation.collaborative.svd_model import SVDFactors
from recommendation.collaborative.index_mapper import IndexMapper

class Predictor:
    """
    Scores all papers for a given user using:
        score(u, p) = U_u · V_p   (dot product in latent space)

    Higher scores = stronger predicted interest.
    """

    def predict(
        self,
        user_uuid:   str,
        factors:     SVDFactors,
        mapper:      IndexMapper,
        seen_papers: set[str],
        top_k:       int = 100,
    ) -> list[dict]:

        u_idx = mapper.user_to_idx.get(user_uuid)
        if u_idx is None:
            return []   # user not in training set → cold-start fallback

        user_vec = factors.user_factors[u_idx]          # (k,)

        # Batch dot product against all paper vectors in one BLAS call
        scores = factors.paper_factors @ user_vec        # (n_papers,)

        # Build ranked list, filtering already-seen and downvoted papers
        ranked = []
        for p_idx in np.argsort(scores)[::-1]:
            paper_uuid = mapper.idx_to_paper.get(int(p_idx))
            if paper_uuid is None or paper_uuid in seen_papers:
                continue
            ranked.append({
                "paper_id": paper_uuid,
                "score":    float(scores[p_idx]),
            })
            if len(ranked) >= top_k:
                break

        return ranked`,

trainer: `# recommendation/collaborative/trainer.py
import logging
from datetime import datetime
from recommendation.collaborative.repository    import CollaborativeRepository
from recommendation.collaborative.index_mapper  import IndexMapper
from recommendation.collaborative.matrix_builder import MatrixBuilder
from recommendation.collaborative.svd_model     import SVDModel
from recommendation.collaborative.cache         import CollaborativeCache
from recommendation.collaborative.evaluator     import Evaluator

logger = logging.getLogger(__name__)

class Trainer:
    """
    Nightly retraining pipeline.

    Schedule (via APScheduler or Celery Beat):
        Midnight UTC → load interactions → build matrix → SVD → evaluate → cache
    """

    def __init__(
        self,
        repo:     CollaborativeRepository,
        cache:    CollaborativeCache,
        n_components: int = 50,
    ):
        self.repo         = repo
        self.cache        = cache
        self.n_components = n_components

    async def run(self) -> str:
        version = f"svd_{datetime.utcnow().strftime('%Y%m%d_%H%M')}"
        logger.info(f"Starting SVD training — version {version}")

        # 1. Load all aggregated interactions from PostgreSQL
        interactions = await self.repo.get_all_interactions()
        logger.info(f"Loaded {len(interactions)} interaction rows")

        if len(interactions) < 100:
            logger.warning("Insufficient data for collaborative training")
            return version

        # 2. Build index mappings (UUID ↔ integer)
        mapper = IndexMapper().build(interactions)
        logger.info(f"Matrix: {mapper.n_users} users × {mapper.n_papers} papers")

        # 3. Build sparse CSR matrix
        matrix = MatrixBuilder().build(interactions, mapper)

        # 4. Train Truncated SVD
        model   = SVDModel(n_components=self.n_components)
        factors = model.train(matrix, version=version)
        logger.info(f"SVD trained — {factors.n_components} latent factors")

        # 5. Evaluate (uses hold-out from Redis if available)
        metrics = Evaluator().evaluate(factors, mapper)
        logger.info(f"Metrics: {metrics}")

        # 6. Atomically replace cache (old model stays live until swap)
        await self.cache.store(factors, mapper, version)
        logger.info(f"Model {version} cached and active")

        return version`,

evaluator: `# recommendation/collaborative/evaluator.py
import numpy as np
from recommendation.collaborative.svd_model  import SVDFactors
from recommendation.collaborative.index_mapper import IndexMapper

class Evaluator:
    """
    Offline evaluation using leave-one-out hold-out.
    Metrics follow the Phase 5 specification.
    """

    def evaluate(
        self,
        factors: SVDFactors,
        mapper:  IndexMapper,
        sample_users: int = 500,
    ) -> dict:
        rng   = np.random.default_rng(42)
        idxs  = rng.choice(mapper.n_users, size=min(sample_users, mapper.n_users), replace=False)

        precisions_10, recalls_20, ndcg_20 = [], [], []

        for u_idx in idxs:
            user_vec = factors.user_factors[u_idx]
            scores   = factors.paper_factors @ user_vec         # (n_papers,)
            ranked   = np.argsort(scores)[::-1]

            # In real eval, compare against held-out interactions.
            # Here we use highest-scored papers as proxy positives.
            top10_set = set(ranked[:10].tolist())
            top20     = ranked[:20].tolist()

            # Stub — replace with real held-out ground truth in production
            positives = set(ranked[:5].tolist())

            hits_10 = len(top10_set & positives)
            hits_20 = len(set(top20) & positives)

            precisions_10.append(hits_10 / 10)
            recalls_20.append(hits_20 / max(len(positives), 1))

            # NDCG@20
            dcg = sum(
                1.0 / np.log2(rank + 2)
                for rank, idx in enumerate(top20)
                if idx in positives
            )
            ideal_dcg = sum(1.0 / np.log2(i + 2) for i in range(min(len(positives), 20)))
            ndcg_20.append(dcg / ideal_dcg if ideal_dcg > 0 else 0.0)

        return {
            "precision_at_10": round(float(np.mean(precisions_10)), 4),
            "recall_at_20":    round(float(np.mean(recalls_20)),    4),
            "ndcg_at_20":      round(float(np.mean(ndcg_20)),       4),
            "sample_users":    len(idxs),
        }`,

cache: `# recommendation/collaborative/cache.py
import pickle
import logging
import redis.asyncio as redis
from recommendation.collaborative.svd_model   import SVDFactors
from recommendation.collaborative.index_mapper import IndexMapper

logger = logging.getLogger(__name__)

KEY_FACTORS = "cf:factors"
KEY_MAPPER  = "cf:mapper"
KEY_VERSION = "cf:version"
TTL_SECONDS = 86_400 * 2   # 48-hour TTL; trainer refreshes nightly

class CollaborativeCache:
    def __init__(self, redis_url: str = "redis://localhost:6379"):
        self.redis_url = redis_url

    async def store(self, factors: SVDFactors, mapper: IndexMapper, version: str):
        async with redis.Redis.from_url(self.redis_url) as r:
            pipe = r.pipeline()
            pipe.set(KEY_FACTORS, pickle.dumps(factors), ex=TTL_SECONDS)
            pipe.set(KEY_MAPPER,  pickle.dumps(mapper),  ex=TTL_SECONDS)
            pipe.set(KEY_VERSION, version,               ex=TTL_SECONDS)
            await pipe.execute()
        logger.info(f"Collaborative model {version} stored in Redis")

    async def load(self) -> tuple[SVDFactors | None, IndexMapper | None, str | None]:
        async with redis.Redis.from_url(self.redis_url) as r:
            factors_b, mapper_b, version = await r.mget(KEY_FACTORS, KEY_MAPPER, KEY_VERSION)

        if not factors_b or not mapper_b:
            return None, None, None

        return (
            pickle.loads(factors_b),
            pickle.loads(mapper_b),
            version.decode() if version else None,
        )`,

service: `# recommendation/collaborative/service.py
import logging
from uuid import UUID
from recommendation.collaborative.cache     import CollaborativeCache
from recommendation.collaborative.predictor import Predictor
from recommendation.collaborative.repository import CollaborativeRepository

logger = logging.getLogger(__name__)

# Cold-start interaction thresholds (Phase 5 spec)
THRESHOLD_CB_ONLY   = 4    # < 5 interactions → content-based only
THRESHOLD_HYBRID    = 19   # 5–19             → 70% CB + 30% CF
# 20+                                          → full hybrid

class CollaborativeService:
    def __init__(self, cache: CollaborativeCache, repo: CollaborativeRepository):
        self.cache     = cache
        self.repo      = repo
        self.predictor = Predictor()

    async def recommend(
        self,
        user_id: UUID,
        limit:   int = 20,
    ) -> dict:
        user_uuid = str(user_id)

        # 1. Load model from Redis (millisecond latency)
        factors, mapper, version = await self.cache.load()
        if factors is None:
            logger.warning("Collaborative model not found in cache")
            return {"recommendations": [], "model_version": None, "strategy": "no_model"}

        # 2. Fetch papers already seen (to filter)
        seen_papers = await self.repo.get_user_interactions(user_id)
        n_seen      = len(seen_papers)

        # 3. Cold-start routing
        if n_seen <= THRESHOLD_CB_ONLY:
            return {
                "recommendations": [],
                "model_version": version,
                "strategy": "cold_start_content_only",
                "interaction_count": n_seen,
            }

        # 4. Predict
        candidates = self.predictor.predict(
            user_uuid   = user_uuid,
            factors     = factors,
            mapper      = mapper,
            seen_papers = seen_papers,
            top_k       = 100,
        )

        # 5. Determine blend strategy for Step 5 (Hybrid Fusion)
        strategy = "full_hybrid" if n_seen >= 20 else "partial_hybrid"

        return {
            "recommendations": [
                {
                    "paper_id": c["paper_id"],
                    "score":    round(c["score"], 4),
                    "reason":   "Researchers with similar interaction patterns engaged with this paper.",
                }
                for c in candidates[:limit]
            ],
            "model_version": version,
            "strategy": strategy,
        }`,

scheduler: `# recommendation/collaborative/scheduler.py
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from recommendation.collaborative.trainer import Trainer

logger = logging.getLogger(__name__)

class CollaborativeScheduler:
    """
    Schedules the nightly retraining of the collaborative filtering model.
    """
    def __init__(self, trainer: Trainer):
        self.trainer = trainer
        self.scheduler = AsyncIOScheduler()

    def start(self):
        # Run every day at 00:00 UTC
        self.scheduler.add_job(
            self._run_job,
            trigger=CronTrigger(hour=0, minute=0, timezone="UTC"),
            id="collaborative_retraining",
            replace_existing=True
        )
        self.scheduler.start()
        logger.info("CollaborativeScheduler started. Nightly retraining scheduled at 00:00 UTC.")

    async def _run_job(self):
        try:
            logger.info("Triggering nightly SVD collaborative filtering training...")
            version = await self.trainer.run()
            logger.info(f"Nightly training completed successfully. Model version: {version}")
        except Exception as e:
            logger.error(f"Nightly collaborative training failed: {e}", exc_info=True)
`
}; // End of S3

// ── Main Component ────────────────────────────────────────────────────────────

export default function RecommendationPhase2() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#e2e8f0", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "#0f172a", borderBottom: "1px solid #1e293b",
        padding: "14px 24px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <button 
          onClick={() => window.location.href = '/recommendations'}
          style={{ 
            background: "transparent", border: "1px solid #334155", borderRadius: "6px", 
            color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center", 
            gap: "6px", padding: "4px 8px", fontSize: 12, transition: "all 0.2s" 
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = "#f8fafc"; e.currentTarget.style.background = "#1e293b"; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "transparent"; }}
        >
          ← Back to Steps 1 & 2
        </button>
        <div style={{
          background: "#1d4ed8", color: "#fff",
          borderRadius: 8, padding: "4px 10px",
          fontSize: 12, fontWeight: 800, letterSpacing: 1,
        }}>MEDINEX</div>
        <span style={{ color: "#475569", fontSize: 13 }}>Phase 5 · Recommendation Systems · Steps 3 & 4</span>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 20px" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 30, borderBottom: "1px solid #1e293b", paddingBottom: 16 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: activeTab === tab ? "#3b82f6" : "transparent",
              color: activeTab === tab ? "#fff" : "#94a3b8",
              border: "none", padding: "8px 16px", borderRadius: 6, fontSize: 13,
              fontWeight: 600, cursor: "pointer", transition: "all 0.2s"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div>
          <Sec title="Phase 2 Architecture">
            <Note text="This section covers Step 3 (Collaborative Filtering) and Step 4 (Citation Graph)." />
            <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>Select a tab above to explore the implementation details.</p>
          </Sec>
        </div>
      )}

      {activeTab === "Step 3: Collaborative Filtering" && (
        <div>
          <Sec title="Matrix Factorization (Truncated SVD)">
            <Flow steps={["Extract User-Paper Interactions", "Build Sparse Matrix (CSR)", "Train SVD Model", "Predict Scores via Dot Product"]} />
            <CodeBlock code={S3.svd_model} />
            <CodeBlock code={S3.predictor} />
          </Sec>
          <Sec title="Nightly Retraining Pipeline">
            <CodeBlock code={S3.trainer} />
            <CodeBlock code={S3.scheduler} />
          </Sec>
          <Sec title="Data Mapping & Storage">
            <CodeBlock code={S3.repository} />
            <CodeBlock code={S3.index_mapper} />
            <CodeBlock code={S3.matrix_builder} />
            <CodeBlock code={S3.cache} />
          </Sec>
          <Sec title="Evaluation & Serving">
            <CodeBlock code={S3.evaluator} />
            <CodeBlock code={S3.service} />
          </Sec>
        </div>
      )}
      
      {activeTab === "Step 4: Citation Graph" && (
        <div>
          <Sec title="Citation Graph Implementation">
            <Note text="The Citation Graph implementation code will be placed here." />
          </Sec>
        </div>
      )}
    </div>
    </div>
  );
}
