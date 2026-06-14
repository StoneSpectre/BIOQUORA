"""
Immunology API Routes
POST /api/v1/immunology/predict  — run AI risk analysis
GET  /api/v1/immunology/fields   — return form field definitions for the frontend
"""

import uuid
from fastapi import APIRouter, HTTPException
from ml.schemas import ImmunologyInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

IMMUNOLOGY_FIELDS = [
    {"key": "age",         "label": "Age",                  "type": "number", "unit": "years", "min": 1,   "max": 120, "step": 1,   "required": True},
    {"key": "sex",         "label": "Sex",                  "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "wbc_count",   "label": "White Blood Cells",    "type": "number", "unit": "10^3/uL","min": 0.1,"max": 200, "step": 0.1, "required": True, "normal": "4.5-11.0"},
    {"key": "crp",         "label": "C-Reactive Protein",   "type": "number", "unit": "mg/L",  "min": 0,   "max": 500, "step": 0.1, "required": True, "normal": "< 3.0"},
    {"key": "esr",         "label": "ESR",                  "type": "number", "unit": "mm/hr", "min": 0,   "max": 200, "step": 1,   "required": True, "normal": "< 20"},
    {"key": "ana_titer",   "label": "ANA Titer (1:X)",      "type": "number", "unit": "",      "min": 0,   "max": 5120,"step": 40,  "required": True, "normal": "< 40"},
    {"key": "cd4_count",   "label": "CD4 T-Cell Count",     "type": "number", "unit": "cells/mm³","min":0, "max": 3000,"step": 1,   "required": True, "normal": "500-1500"},
    {"key": "igg",         "label": "Immunoglobulin G",     "type": "number", "unit": "mg/dL", "min": 0,   "max": 6000,"step": 10,  "required": True, "normal": "700-1600"},
]

@router.get("/fields")
async def get_fields():
    """Return form field definitions for the React frontend."""
    return {"module": "immunology", "title": "Immunology & Systemic Assessment", "fields": IMMUNOLOGY_FIELDS}

@router.post("/predict", response_model=PredictionResponse)
async def predict_immunology(data: ImmunologyInput):
    """Run XGBoost + SHAP immunology risk analysis."""
    try:
        result = predictor.predict("immunology", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Immunology model not yet trained. Run: python -m app.ml.engine",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
