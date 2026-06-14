"""
Hepatic (Liver) API Routes
POST /api/v1/hepatic/predict  — run AI risk analysis
GET  /api/v1/hepatic/fields   — return form field definitions for the frontend
"""

import uuid
from fastapi import APIRouter, HTTPException
from ml.schemas import HepaticInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

HEPATIC_FIELDS = [
    {"key": "age",                    "label": "Age",                    "type": "number", "unit": "years",     "min": 1,   "max": 120, "step": 1,   "required": True},
    {"key": "sex",                    "label": "Sex",                    "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "total_bilirubin",        "label": "Total Bilirubin",        "type": "number", "unit": "mg/dL",     "min": 0.1, "max": 80,  "step": 0.1, "required": True,  "normal": "0.1–1.2"},
    {"key": "direct_bilirubin",       "label": "Direct Bilirubin",       "type": "number", "unit": "mg/dL",     "min": 0,   "max": 40,  "step": 0.1, "required": True,  "normal": "0.0–0.3"},
    {"key": "alkaline_phosphatase",   "label": "Alkaline Phosphatase",   "type": "number", "unit": "IU/L",      "min": 20,  "max": 2000,"step": 1,   "required": True,  "normal": "44–147"},
    {"key": "alt",                    "label": "ALT",                    "type": "number", "unit": "IU/L",      "min": 5,   "max": 3000,"step": 1,   "required": True,  "normal": "7–56"},
    {"key": "ast",                    "label": "AST",                    "type": "number", "unit": "IU/L",      "min": 5,   "max": 3000,"step": 1,   "required": True,  "normal": "10–40"},
    {"key": "platelets",              "label": "Platelets",              "type": "number", "unit": "10^9/L",    "min": 10,  "max": 2000,"step": 1,   "required": True,  "normal": "150–450"},
    {"key": "total_protein",          "label": "Total Protein",          "type": "number", "unit": "g/dL",      "min": 1,   "max": 12,  "step": 0.1, "required": True,  "normal": "6.0–8.3"},
    {"key": "albumin",                "label": "Albumin",                "type": "number", "unit": "g/dL",      "min": 0.5, "max": 6,   "step": 0.1, "required": True,  "normal": "3.5–5.0"},
    {"key": "albumin_globulin_ratio", "label": "Albumin/Globulin Ratio", "type": "number", "unit": "",          "min": 0.1, "max": 5,   "step": 0.01,"required": True,  "normal": "1.0–2.5"},
    {"key": "bmi",                    "label": "BMI",                    "type": "number", "unit": "kg/m²",     "min": 10,  "max": 70,  "step": 0.1, "required": True,  "normal": "18.5–24.9"},
    {"key": "alcohol_units_per_week", "label": "Alcohol Consumption",    "type": "number", "unit": "units/week","min": 0,   "max": 200, "step": 1,   "required": False, "normal": "0–14 (safe limit)"},
]


@router.get("/fields")
async def get_fields():
    """Return form field definitions for the React frontend."""
    return {"module": "hepatic", "title": "Hepatic (Liver) Assessment", "fields": HEPATIC_FIELDS}


@router.post("/predict", response_model=PredictionResponse)
async def predict_hepatic(data: HepaticInput):
    """Run XGBoost + SHAP liver disease risk analysis."""
    try:
        result = predictor.predict("hepatic", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Hepatic model not yet trained. Run: python -m app.ml.engine",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
