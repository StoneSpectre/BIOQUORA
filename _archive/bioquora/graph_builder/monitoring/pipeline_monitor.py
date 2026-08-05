"""
BIOQUORA - Pipeline Monitoring & Operations Dashboard
Implements Module 14 for Step 4 Stage 6 (BioBuilder v1.0).
Monitors graph construction performance, update duration, merge conflicts, and validation pass rates.
"""

import time
from typing import Dict, Any

class PipelineMonitorDashboard:
    def __init__(self):
        self.total_build_jobs = 0
        self.failed_build_jobs = 0
        self.last_duration_sec = 0.0

    def record_job(self, duration_sec: float, success: bool):
        self.total_build_jobs += 1
        self.last_duration_sec = round(duration_sec, 4)
        if not success:
            self.failed_build_jobs += 1

    def get_dashboard_metrics(self) -> Dict[str, Any]:
        success_rate = round((self.total_build_jobs - self.failed_build_jobs) / max(1, self.total_build_jobs), 4)
        return {
            "total_construction_jobs": self.total_build_jobs,
            "failed_jobs": self.failed_build_jobs,
            "success_rate": success_rate,
            "last_job_duration_seconds": self.last_duration_sec,
            "pipeline_status": "OPERATIONAL_HEALTHY" if success_rate >= 0.95 else "DEGRADED"
        }
