"""
Nightly SVD retraining job.
Schedule at 02:00 UTC via APScheduler or Celery beat.
Requires: pip install scipy redis apscheduler
"""
import asyncio
import pickle
import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
import redis.asyncio as aioredis

from collaborative_filter import CollaborativeFilter

logger = logging.getLogger(__name__)


async def retrain_and_cache(db, redis_url: str = "redis://localhost:6379"):
    redis_client = await aioredis.from_url(redis_url)
    try:
        cf = CollaborativeFilter(db, redis_client)
        R, user_ids, paper_ids = await cf.build_matrix()

        if R.nnz < 10:
            logger.warning("Insufficient interactions for SVD retraining (%d non-zero)", R.nnz)
            return

        U, sigma, Vt = cf.decompose(R)
        await cf.cache_factors(U, sigma, Vt, user_ids, paper_ids)

        logger.info(
            "SVD retrained: %d users × %d papers, k=%d",
            len(user_ids), len(paper_ids), len(sigma),
        )
    finally:
        await redis_client.aclose()


def start_scheduler(db):
    scheduler = AsyncIOScheduler()
    scheduler.add_job(
        retrain_and_cache, "cron",
        hour=2, minute=0,
        args=[db],
        id="svd_retrain",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("SVD retraining scheduler started — runs nightly at 02:00 UTC")
    return scheduler
