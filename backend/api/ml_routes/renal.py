"""
Renal API Routes
POST /api/v1/renal/predict  — run AI risk analysis
GET  /api/v1/renal/fields   — return form field definitions for the frontend
"""

import uuid
from fastapi import APIRouter, HTTPException
from ml.schemas import RenalInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

RENAL_FIELDS = [
    {"key": "age",           "label": "Age",                  "type": "number", "unit": "years", "min": 1,   "max": 120, "step": 1,   "required": True},
    {"key": "sex",           "label": "Sex",                  "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "creatinine",    "label": "Serum Creatinine",     "type": "number", "unit": "mg/dL", "min": 0.1, "max": 25,  "step": 0.1, "required": True, "normal": "0.7-1.3"},
    {"key": "bun",           "label": "Blood Urea Nitrogen",  "type": "number", "unit": "mg/dL", "min": 1,   "max": 200, "step": 1,   "required": True, "normal": "7-20"},
    {"key": "egfr",          "label": "Estimated GFR",        "type": "number", "unit": "mL/min", "min": 1,  "max": 160, "step": 1,   "required": True, "normal": "> 90"},
    {"key": "urine_protein", "label": "Urine Protein",        "type": "number", "unit": "mg/dL", "min": 0,   "max": 5000,"step": 1,   "required": True, "normal": "< 15"},
    {"key": "sodium",        "label": "Serum Sodium",         "type": "number", "unit": "mEq/L", "min": 100, "max": 180, "step": 1,   "required": True, "normal": "135-145"},
    {"key": "potassium",     "label": "Serum Potassium",      "type": "number", "unit": "mEq/L", "min": 1.5, "max": 10,  "step": 0.1, "required": True, "normal": "3.6-5.2"},
]

@router.get("/fields")
async def get_fields():
    """Return form field definitions for the React frontend."""
    return {"module": "renal", "title": "Renal (Kidney) Assessment", "fields": RENAL_FIELDS}

@router.post("/predict", response_model=PredictionResponse)
async def predict_renal(data: RenalInput):
    """Run XGBoost + SHAP renal risk analysis."""
    try:
        result = predictor.predict("renal", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Renal model not yet trained. Run: python -m app.ml.engine",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
