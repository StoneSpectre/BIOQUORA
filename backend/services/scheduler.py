"""
services/scheduler.py

Nightly analytics aggregation jobs for Step 8.
Uses APScheduler with AsyncIO — add to your FastAPI startup.

Install:  pip install apscheduler
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from sqlalchemy.ext.asyncio import AsyncSession

from api.core.database import async_session_maker
from ..models import AnalyticsJobRun
from ..api.research_events import run_nightly_aggregation

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler(timezone="UTC")


def _register_jobs() -> None:
    # Run at 02:00 UTC every day
    scheduler.add_job(
        _run_aggregation_job,
        trigger=CronTrigger(hour=2, minute=0),
        id="nightly_analytics",
        replace_existing=True,
        misfire_grace_time=3600,
    )
    logger.info("Registered nightly analytics job (02:00 UTC)")


async def _run_aggregation_job() -> None:
    logger.info("Nightly analytics aggregation started")
    run_record: AnalyticsJobRun | None = None

    async with async_session_maker() as db:
        run_record = AnalyticsJobRun(job_name="nightly_analytics")
        db.add(run_record)
        await db.commit()
        await db.refresh(run_record)

        try:
            results = await run_nightly_aggregation(db)
            run_record.status = "success"
            run_record.rows_written = sum(results.values())
            run_record.finished_at = datetime.now(timezone.utc)
            await db.commit()
            logger.info("Analytics aggregation complete: %s", results)
        except Exception as exc:
            run_record.status = "failed"
            run_record.error_msg = str(exc)
            run_record.finished_at = datetime.now(timezone.utc)
            await db.commit()
            logger.exception("Analytics aggregation failed")


# ── FastAPI integration ────────────────────────────────────────────────────────
#
# In your main.py:
#
#   from .services.scheduler import scheduler, _register_jobs
#   from .websockets.manager import manager
#
#   @app.on_event("startup")
#   async def startup():
#       await manager.startup()
#       _register_jobs()
#       scheduler.start()
#
#   @app.on_event("shutdown")
#   async def shutdown():
#       scheduler.shutdown(wait=False)
#       await manager.shutdown()
