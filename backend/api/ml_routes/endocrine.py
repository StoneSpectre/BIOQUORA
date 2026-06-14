"""
Endocrine API Routes — Diabetes + Thyroid
POST /api/v1/endocrine/diabetes/predict
POST /api/v1/endocrine/thyroid/predict
GET  /api/v1/endocrine/diabetes/fields
GET  /api/v1/endocrine/thyroid/fields
"""

from fastapi import APIRouter, HTTPException
from ml.schemas import DiabetesInput, ThyroidInput, PredictionResponse
from ml.engine import predictor

router = APIRouter()

DIABETES_FIELDS = [
    {"key": "age",              "label": "Age",                    "type": "number", "unit": "years",   "min": 1,  "max": 120,"step": 1,    "required": True},
    {"key": "sex",              "label": "Sex",                    "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "hba1c",            "label": "HbA1c",                  "type": "number", "unit": "%",       "min": 3,  "max": 20, "step": 0.1,  "required": True,  "normal": "< 5.7%"},
    {"key": "glucose",          "label": "Fasting Plasma Glucose", "type": "number", "unit": "mg/dL",   "min": 40, "max": 600,"step": 1,    "required": True,  "normal": "70–100"},
    {"key": "blood_pressure",   "label": "Diastolic Blood Pressure","type": "number","unit": "mmHg",    "min": 40, "max": 200,"step": 1,    "required": True,  "normal": "60–80"},
    {"key": "bmi",              "label": "BMI",                    "type": "number", "unit": "kg/m²",   "min": 10, "max": 70, "step": 0.1,  "required": True,  "normal": "18.5–24.9"},
    {"key": "diabetes_pedigree","label": "Diabetes Pedigree Function","type": "number","unit": "",       "min": 0,  "max": 3,  "step": 0.001,"required": True,  "normal": "< 0.5 lower risk"},
    {"key": "pregnancies",      "label": "Pregnancies",            "type": "number", "unit": "",        "min": 0,  "max": 20, "step": 1,    "required": False, "showIf": {"sex": 0}},
    {"key": "insulin",          "label": "2-Hour Serum Insulin",   "type": "number", "unit": "µU/mL",   "min": 0,  "max": 900,"step": 1,    "required": False, "normal": "2–25"},
    {"key": "skin_thickness",   "label": "Triceps Skin Fold",      "type": "number", "unit": "mm",      "min": 0,  "max": 100,"step": 0.5,  "required": False, "normal": "10–30 mm typical"},
    {"key": "family_history",   "label": "Family History of Diabetes","type":"select","options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "microalbuminuria", "label": "Microalbuminuria",       "type": "number", "unit": "mg/g",    "min": 0,  "max": 3000,"step": 1,  "required": False, "normal": "< 30"},
    {"key": "metformin_use",    "label": "On Metformin?",          "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "statin_use",       "label": "On Statins?",            "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
]

THYROID_FIELDS = [
    {"key": "age",                 "label": "Age",                   "type": "number", "unit": "years",  "min": 1, "max": 120,"step": 1,   "required": True},
    {"key": "sex",                 "label": "Sex",                   "type": "select", "options": [{"value": 0, "label": "Female"}, {"value": 1, "label": "Male"}], "required": True},
    {"key": "tsh",                 "label": "TSH",                   "type": "number", "unit": "mIU/L",  "min": 0, "max": 100,"step": 0.01,"required": True, "normal": "0.4–4.0"},
    {"key": "t3",                  "label": "Free T3",               "type": "number", "unit": "pg/mL",  "min": 0, "max": 15, "step": 0.1, "required": True, "normal": "2.0–4.4"},
    {"key": "t4",                  "label": "Free T4",               "type": "number", "unit": "ng/dL",  "min": 0, "max": 30, "step": 0.01,"required": True, "normal": "0.8–1.8"},
    {"key": "anti_tpo",            "label": "Anti-TPO Antibodies",   "type": "number", "unit": "IU/mL",  "min": 0, "max": 10000,"step": 1,"required": False, "normal": "< 34"},
    {"key": "trab",                "label": "TRAb Antibodies",       "type": "number", "unit": "IU/L",   "min": 0, "max": 100, "step": 0.1,"required": False, "normal": "< 1.75"},
    {"key": "levothyroxine_use",   "label": "On Levothyroxine?",     "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "on_thyroxine",        "label": "On Thyroxine?",         "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "on_antithyroid_meds", "label": "On Antithyroid Medication?","type":"select","options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "thyroid_surgery",     "label": "Prior Thyroid Surgery?","type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "goitre",              "label": "Goitre Present?",       "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "pregnant",            "label": "Currently Pregnant?",   "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": False, "showIf": {"sex": 0}},
    {"key": "sick",                "label": "Currently Sick?",       "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "tumor",               "label": "Tumor History?",        "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "hypopituitary",       "label": "Hypopituitary?",        "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
    {"key": "psych",               "label": "Psychiatric Disorder?", "type": "select", "options": [{"value": 0, "label": "No"}, {"value": 1, "label": "Yes"}], "required": True},
]


@router.get("/diabetes/fields")
async def diabetes_fields():
    return {"module": "diabetes", "title": "Diabetes Risk Assessment", "fields": DIABETES_FIELDS}


@router.post("/diabetes/predict", response_model=PredictionResponse)
async def predict_diabetes(data: DiabetesInput):
    try:
        result = predictor.predict("diabetes", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="Diabetes model not trained. Run: python -m app.ml.engine")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/thyroid/fields")
async def thyroid_fields():
    return {"module": "thyroid", "title": "Thyroid Function Assessment", "fields": THYROID_FIELDS}


@router.post("/thyroid/predict", response_model=PredictionResponse)
async def predict_thyroid(data: ThyroidInput):
    try:
        result = predictor.predict("thyroid", data.model_dump())
        return PredictionResponse(**result)
    except FileNotFoundError:
        raise HTTPException(status_code=503, detail="Thyroid model not trained. Run: python -m app.ml.engine")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
