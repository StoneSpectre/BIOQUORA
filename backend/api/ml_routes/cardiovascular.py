"""
Cardiovascular API Routes
POST /api/v1/cardiovascular/predict  — run AI risk analysis
GET  /api/v1/cardiovascular/fields   — return form field definitions for the frontend
"""

import uuid
from fastapi import APIRouter, HTTPException
from ml.schemas import CardiovascularInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

CARDIOVASCULAR_FIELDS = [
    {"key": "age",           "label": "Age",                  "type": "number", "unit": "years", "min": 1,   "max": 120, "step": 1,   "required": True},
    {"key": "sex",           "label": "Sex",                  "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "troponin",      "label": "Troponin I/T",         "type": "number", "unit": "ng/mL", "min": 0,   "max": 50,  "step": 0.01,"required": True, "normal": "< 0.04"},
    {"key": "nt_probnp",     "label": "NT-proBNP",            "type": "number", "unit": "pg/mL", "min": 0,   "max": 35000,"step": 1,  "required": True, "normal": "< 125"},
    {"key": "ldl",           "label": "LDL Cholesterol",      "type": "number", "unit": "mg/dL", "min": 10,  "max": 500, "step": 1,   "required": True, "normal": "< 100"},
    {"key": "hdl",           "label": "HDL Cholesterol",      "type": "number", "unit": "mg/dL", "min": 10,  "max": 150, "step": 1,   "required": True, "normal": "> 40"},
    {"key": "triglycerides", "label": "Triglycerides",        "type": "number", "unit": "mg/dL", "min": 10,  "max": 2000,"step": 1,   "required": True, "normal": "< 150"},
    {"key": "systolic_bp",   "label": "Systolic BP",          "type": "number", "unit": "mmHg",  "min": 50,  "max": 300, "step": 1,   "required": True, "normal": "< 120"},
    {"key": "diastolic_bp",  "label": "Diastolic BP",         "type": "number", "unit": "mmHg",  "min": 30,  "max": 200, "step": 1,   "required": True, "normal": "< 80"},
    {"key": "heart_rate",    "label": "Resting Heart Rate",   "type": "number", "unit": "bpm",   "min": 30,  "max": 250, "step": 1,   "required": True, "normal": "60-100"},
]

@router.get("/fields")
async def get_fields():
    """Return form field definitions for the React frontend."""
    return {"module": "cardiovascular", "title": "Cardiovascular Assessment", "fields": CARDIOVASCULAR_FIELDS}

@router.post("/predict", response_model=PredictionResponse)
async def predict_cardiovascular(data: CardiovascularInput):
    """Run XGBoost + SHAP cardiovascular risk analysis."""
    try:
        result = predictor.predict("cardiovascular", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Cardiovascular model not yet trained. Run: python -m app.ml.engine",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
