"""
pytest tests for all Phase-1 API routes.
Run: pytest backend/tests/ -v
"""

import pytest
from fastapi.testclient import TestClient
from api.main import app

client = TestClient(app)

# ── Health ────────────────────────────────────────────────────────────────────

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json()["status"] == "healthy"


# ── Field definitions ─────────────────────────────────────────────────────────

def test_hepatic_fields():
    r = client.get("/api/v1/hepatic/fields")
    assert r.status_code == 200
    body = r.json()
    assert body["module"] == "hepatic"
    assert len(body["fields"]) > 0


def test_diabetes_fields():
    r = client.get("/api/v1/endocrine/diabetes/fields")
    assert r.status_code == 200
    assert r.json()["module"] == "diabetes"


def test_thyroid_fields():
    r = client.get("/api/v1/endocrine/thyroid/fields")
    assert r.status_code == 200
    assert r.json()["module"] == "thyroid"


def test_respiratory_fields():
    r = client.get("/api/v1/respiratory/fields")
    assert r.status_code == 200
    assert r.json()["module"] == "respiratory"


# ── Schema validation ─────────────────────────────────────────────────────────

def test_hepatic_validation_missing_field():
    r = client.post("/api/v1/hepatic/predict", json={"age": 45})
    assert r.status_code == 422   # Unprocessable Entity


def test_hepatic_validation_direct_gt_total():
    """Direct bilirubin > total bilirubin should be rejected."""
    r = client.post("/api/v1/hepatic/predict", json={
        "age": 40, "sex": 1,
        "total_bilirubin": 1.0, "direct_bilirubin": 2.0,  # invalid
        "alkaline_phosphatase": 120, "alt": 35, "ast": 30,
        "total_protein": 7.0, "albumin": 4.0, "albumin_globulin_ratio": 1.5,
        "bmi": 24, "alcohol_units_per_week": 5,
    })
    assert r.status_code == 422


def test_respiratory_fev1_fvc_inconsistency():
    """FEV1/FVC ratio very inconsistent with raw values should be rejected."""
    r = client.post("/api/v1/respiratory/predict", json={
        "age": 55, "sex": 1,
        "fev1": 4.0, "fvc": 5.0, "fev1_fvc_ratio": 0.3,  # 4/5=0.8, but ratio=0.3
        "spo2": 96, "pack_years": 10, "dyspnea_scale": 1,
        "cough_frequency": 1, "wheezing": 0, "chest_tightness": 0,
        "occupational_exposure": 0,
    })
    assert r.status_code == 422


# ── Feedback ──────────────────────────────────────────────────────────────────

def test_feedback_submit():
    r = client.post("/api/v1/feedback/submit", json={
        "module": "hepatic",
        "prediction_id": "test-uuid-001",
        "agree": True,
        "doctor_diagnosis": None,
        "notes": "Consistent with clinical picture.",
    })
    assert r.status_code == 200
    assert r.json()["status"] == "logged"


def test_feedback_stats():
    r = client.get("/api/v1/feedback/stats")
    assert r.status_code == 200
    body = r.json()
    assert "total" in body
    assert "by_module" in body
