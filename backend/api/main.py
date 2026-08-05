"""
Bioquora Workspace API
FastAPI application — Steps 1–3
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.core.config import settings
from api.core.database import engine, Base
from api.routers import projects, folders, collections, saved_papers, notes, literature, literature_review, research_maps
"""
Bioquora Workspace API
FastAPI application — Steps 1–3
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.core.config import settings
from api.core.database import engine, Base
from api.routers import projects, folders, collections, saved_papers, notes, literature, literature_review, research_maps
from api.ml_routes import hepatic, endocrine, respiratory, cardiovascular, renal, immunology, feedback, graphrag, contradiction

# Step 7 God Mode Generated Routers (Milestone 1)
from api.routers.biofoundation import router as biofoundation_router
from api.routers.bioagents import router as bioagents_router
from api.routers.bioreason import router as bioreason_router
from api.routers.biomemory import router as biomemory_router
from api.routers.bioretriever import router as bioretriever_router
from api.routers.biovision import router as biovision_router
from api.routers.biocoder import router as biocoder_router
from api.routers.biosimulation import router as biosimulation_router
from api.routers.biovalidator import router as biovalidator_router
from api.routers.bioassistant import router as bioassistant_router
from api.routers.bioinference import router as bioinference_router
from api.routers.biosafe import router as biosafe_router
from api.routers.bioeval import router as bioeval_router
from api.routers.bioworkflow import router as bioworkflow_router
from api.routers.biofactory import router as biofactory_router
from api.routers.bioaihub import router as bioaihub_router
from api.routers.biolearning import router as biolearning_router
from api.routers.biofederated import router as biofederated_router
from api.routers.bioasi import router as bioasi_router
from api.routers.biocore import router as biocore_router
# from bioquora.step8_research_copilot import copilot_api
# from websockets.manager import manager
# from services.scheduler import start_scheduler

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup (use Alembic in production)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    # Start background tasks
    # start_scheduler()
    
    yield
    
    # await manager.close()

app = FastAPI(
    title="Bioquora Workspace API",
    version="0.3.0",
    description="Researcher workspace — Steps 1–3: schema, CRUD, literature tracker",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Routers ----
app.include_router(projects.router,      prefix="/api/v1/projects",      tags=["Projects"])
app.include_router(folders.router,       prefix="/api/v1/folders",        tags=["Folders"])
app.include_router(collections.router,   prefix="/api/v1/collections",    tags=["Collections"])
app.include_router(saved_papers.router,  prefix="/api/v1/saved-papers",   tags=["Saved Papers"])
app.include_router(notes.router,         prefix="/api/v1/notes",          tags=["Notes"])
app.include_router(literature.router,    prefix="/api/v1/literature",     tags=["Literature Tracker"])
app.include_router(literature_review.router, prefix="/api/v1/workspace/projects", tags=["AI Literature Review"])
app.include_router(research_maps.router, prefix="/api/v1/workspace/projects", tags=["Research Maps"])

# from api.routers import collaboration, research_events
# app.include_router(collaboration.router, prefix="/api/v1/workspace/projects", tags=["Collaboration"])
# app.include_router(research_events.router, prefix="/api/v1/events", tags=["Research Analytics"])

# ---- BioDOS Phase 1: Ontology Ingestion Engine ----
try:
    from app.routers import ontologies as bio_ontologies
    app.include_router(bio_ontologies.router, prefix="/api/v1", tags=["BioDOS Phase 1 - Ontologies"])
except ImportError:
    pass


# ---- Phase 3: ML Diagnostic Routers ----
app.include_router(hepatic.router, prefix="/api/v1/hepatic", tags=["ML - Hepatic"])
app.include_router(endocrine.router, prefix="/api/v1/endocrine", tags=["ML - Endocrine"])

from api.nlp.api.router import router as nlp_router
app.include_router(nlp_router, prefix="/api/v1/nlp", tags=["Phase 3 NLP Pipeline"])
app.include_router(respiratory.router, prefix="/api/v1/respiratory", tags=["ML - Respiratory"])
app.include_router(cardiovascular.router, prefix="/api/v1/cardiovascular", tags=["ML - Cardiovascular"])
app.include_router(renal.router, prefix="/api/v1/renal", tags=["ML - Renal"])
app.include_router(immunology.router, prefix="/api/v1/immunology", tags=["ML - Immunology"])
app.include_router(feedback.router, prefix="/api/v1/feedback", tags=["Human Feedback"])
app.include_router(graphrag.router, prefix="/api/v1/graphrag", tags=["GraphRAG"])
app.include_router(contradiction.router, prefix="/api/v1/contradiction", tags=["Step 7 Contradiction Engine"])

from api.recommendations.router import router as rec_router
app.include_router(rec_router, prefix="/api/v1/recommendations", tags=["Phase 5 Recommendation Systems"])

# ---- Phase 8: Multi-Agent Research Copilot ----
# app.include_router(copilot_api.router, prefix="/api/v1", tags=["Step 8 - Copilot"])

# @app.websocket("/ws/projects/{project_id}")
# async def websocket_endpoint(websocket, project_id: str):
#     await manager.connect(websocket, project_id)


# Bioquora Step 7 Routers
app.include_router(biofoundation_router)
app.include_router(bioagents_router)
app.include_router(bioreason_router)
app.include_router(biomemory_router)
app.include_router(bioretriever_router)
app.include_router(biovision_router)
app.include_router(biocoder_router)
app.include_router(biosimulation_router)
app.include_router(biovalidator_router)
app.include_router(bioassistant_router)
app.include_router(bioinference_router)
app.include_router(biosafe_router)
app.include_router(bioeval_router)
app.include_router(bioworkflow_router)
app.include_router(biofactory_router)
app.include_router(bioaihub_router)
app.include_router(biolearning_router)
app.include_router(biofederated_router)
app.include_router(bioasi_router)
app.include_router(biocore_router)

@app.get("/api/health")
async def health():
    return {"status": "healthy", "version": app.version}
