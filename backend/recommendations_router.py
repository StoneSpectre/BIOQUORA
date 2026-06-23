from fastapi import APIRouter, Depends
from uuid import UUID

from schemas_interaction import (
    InteractionEvent, PaperRecRequest,
    DatasetRecRequest, TopicRecRequest,
)
from interaction_service import InteractionService
from content_filter import ContentBasedFilter
from collaborative_filter import CollaborativeFilter
from citation_graph import CitationGraphEngine
from hybrid_fusion import HybridFusion

router = APIRouter(prefix="/v1", tags=["recommendations"])


# ── Interaction logging ────────────────────────────────────────────────────
@router.post("/interactions", status_code=201)
async def log_interaction(
    user_id: UUID,
    event: InteractionEvent,
    service: InteractionService = Depends(),
):
    result = await service.log(
        user_id, event.paper_id, event.event_type, event.metadata or {}
    )
    return result


# ── Paper recommendations ──────────────────────────────────────────────────
@router.post("/recommendations/papers")
async def recommend_papers(
    req: PaperRecRequest,
    service: InteractionService = Depends(),
    content_filter: ContentBasedFilter = Depends(),
    collab_filter: CollaborativeFilter = Depends(),
    graph_engine: CitationGraphEngine = Depends(),
):
    import asyncio

    # Build user profile vector
    profile_vec = await service.build_user_profile_vector(req.user_id)
    interactions = await service.repo.get_user_interactions(req.user_id)
    seen  = {str(i.paper_id) for i in interactions}
    saved = {str(i.paper_id) for i in interactions if i.event_type == "save"}

    # Run three engines in parallel
    seed_ids = [str(p) for p in req.seed_paper_ids]
    content_r, collab_r, graph_r = await asyncio.gather(
        content_filter.retrieve(profile_vec, 80, seen),
        collab_filter.predict_for_user_async(req.user_id, seen, 80),
        graph_engine.citation_neighbours(seed_ids, hops=2, limit=80),
    )

    # Fuse
    fusion = HybridFusion(maturity=req.maturity)
    fused  = fusion.rrf_merge(content_r, collab_r, graph_r)

    # Fetch metadata for reranking
    all_ids  = list(fused.keys())
    metadata = {}   # TODO: fetch from Postgres/Qdrant payload

    ranked   = fusion.evidence_rerank(fused, metadata, seen, saved)
    if req.diversity:
        ranked = fusion.diversity_filter(ranked, metadata)

    return {"recommendations": ranked[:req.limit], "meta": {"engines_used": 3}}


# ── Dataset recommendations ────────────────────────────────────────────────
@router.post("/recommendations/datasets")
async def recommend_datasets(req: DatasetRecRequest):
    # Placeholder: implement dataset graph matching (Step 6 M2)
    return {"datasets": [], "query": req.research_context}


# ── Topic recommendations ──────────────────────────────────────────────────
@router.post("/recommendations/topics")
async def recommend_topics(req: TopicRecRequest):
    # Placeholder: implement BRIDE opportunity engine (Step 6 M5)
    return {"topics": []}
