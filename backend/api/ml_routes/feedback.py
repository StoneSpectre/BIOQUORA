"""
Feedback API — Human-in-the-Loop
POST /api/v1/feedback/submit
GET  /api/v1/feedback/stats

Logs doctor agree/disagree decisions. In production, connect this to
a PostgreSQL table and a retraining pipeline queue.
"""

import json
import logging
from datetime import datetime
from pathlib import Path
from fastapi import APIRouter
from ml.schemas import FeedbackInput

router = APIRouter()
logger = logging.getLogger(__name__)

FEEDBACK_LOG = Path("./feedback_log.jsonl")


@router.post("/submit")
async def submit_feedback(data: FeedbackInput):
    """
    Store doctor feedback. Each line in feedback_log.jsonl is one decision.
    In production: INSERT INTO feedback_events table, trigger retraining queue.
    """
    record = {
        "timestamp": datetime.utcnow().isoformat(),
        "module": data.module,
        "prediction_id": data.prediction_id,
        "agree": data.agree,
        "doctor_diagnosis": data.doctor_diagnosis,
        "notes": data.notes,
    }
    with open(FEEDBACK_LOG, "a") as f:
        f.write(json.dumps(record) + "\n")

    logger.info(f"Feedback logged: {data.module} | agree={data.agree}")
    return {"status": "logged", "message": "Feedback recorded. Thank you."}


@router.get("/stats")
async def feedback_stats():
    """Return agreement rate per module for the monitoring dashboard."""
    if not FEEDBACK_LOG.exists():
        return {"total": 0, "by_module": {}}

    records = []
    with open(FEEDBACK_LOG) as f:
        for line in f:
            try:
                records.append(json.loads(line))
            except json.JSONDecodeError:
                continue

    by_module: dict = {}
    for r in records:
        m = r.get("module", "unknown")
        if m not in by_module:
            by_module[m] = {"total": 0, "agree": 0}
        by_module[m]["total"] += 1
        if r.get("agree"):
            by_module[m]["agree"] += 1

    for m, v in by_module.items():
        v["agreement_rate"] = round(v["agree"] / v["total"] * 100, 1) if v["total"] else 0

    return {"total": len(records), "by_module": by_module}
