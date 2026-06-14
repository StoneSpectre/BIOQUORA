"""
Respiratory API Routes
POST /api/v1/respiratory/predict
GET  /api/v1/respiratory/fields
"""

from fastapi import APIRouter, HTTPException
from ml.schemas import RespiratoryInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

RESPIRATORY_FIELDS = [
    {"key": "age",                  "label": "Age",                      "type": "number", "unit": "years",    "min": 1,  "max": 120,"step": 1,   "required": True},
    {"key": "sex",                  "label": "Sex",                      "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "fev1",                 "label": "FEV1",                     "type": "number", "unit": "L",        "min": 0.2,"max": 8,  "step": 0.01,"required": True, "normal": "> 80% predicted", "tooltip": "Forced Expiratory Volume in 1 second"},
    {"key": "fvc",                  "label": "FVC",                      "type": "number", "unit": "L",        "min": 0.5,"max": 10, "step": 0.01,"required": True, "normal": "> 80% predicted", "tooltip": "Forced Vital Capacity"},
    {"key": "fev1_fvc_ratio",       "label": "FEV1/FVC Ratio",           "type": "number", "unit": "",         "min": 0.1,"max": 1.0,"step": 0.01,"required": True, "normal": "> 0.70 = normal"},
    {"key": "spo2",                 "label": "Resting SpO2",             "type": "number", "unit": "%",        "min": 60, "max": 100,"step": 0.1, "required": True, "normal": "> 95%"},
    {"key": "pao2",                 "label": "Arterial O2 (PaO2)",       "type": "number", "unit": "mmHg",     "min": 20, "max": 120,"step": 0.1, "required": True, "normal": "75–100"},
    {"key": "paco2",                "label": "Arterial CO2 (PaCO2)",     "type": "number", "unit": "mmHg",     "min": 10, "max": 100,"step": 0.1, "required": True, "normal": "35–45"},
    {"key": "hco3",                 "label": "Bicarbonate (HCO3)",       "type": "number", "unit": "mEq/L",    "min": 5,  "max": 50, "step": 0.1, "required": True, "normal": "22–28"},
    {"key": "heart_rate",           "label": "Heart Rate",               "type": "number", "unit": "BPM",      "min": 30, "max": 250,"step": 1,   "required": True, "normal": "60–100"},
    {"key": "respiratory_rate",     "label": "Respiratory Rate",         "type": "number", "unit": "breaths/m","min": 5,  "max": 60, "step": 1,   "required": True, "normal": "12–20"},
    {"key": "pack_years",           "label": "Smoking History",          "type": "number", "unit": "pack-years","min": 0, "max": 200,"step": 0.5, "required": True, "normal": "0 = non-smoker", "tooltip": "Packs per day × years smoked"},
    {"key": "dyspnea_scale",        "label": "MRC Dyspnea Scale",        "type": "select", "options": [
        {"value": 0, "label": "0 — None"},
        {"value": 1, "label": "1 — Breathless on strenuous exertion"},
        {"value": 2, "label": "2 — Breathless walking uphill"},
        {"value": 3, "label": "3 — Slower than peers on level ground"},
        {"value": 4, "label": "4 — Stops for breath after 100 metres"},
    ], "required": True},
    {"key": "cough_frequency",      "label": "Cough Frequency",          "type": "select", "options": [
        {"value": 0, "label": "None"},
        {"value": 1, "label": "Mild — occasional"},
        {"value": 2, "label": "Moderate — daily"},
        {"value": 3, "label": "Severe — constant"},
    ], "required": True},
    {"key": "wheezing",             "label": "Wheezing Present?",        "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "chest_tightness",      "label": "Chest Tightness?",         "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "occupational_exposure","label": "Occupational Dust/Fume Exposure?","type":"select","options":[{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
]


@router.get("/fields")
async def get_fields():
    return {"module": "respiratory", "title": "Respiratory Assessment", "fields": RESPIRATORY_FIELDS}


@router.post("/predict", response_model=PredictionResponse)
async def predict_respiratory(data: RespiratoryInput):
    try:
        result = predictor.predict("respiratory", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="Respiratory model not trained. Run: python -m app.ml.engine")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
