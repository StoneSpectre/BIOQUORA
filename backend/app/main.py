"""
Bioquora BioDOS Phase 1 Standalone Microservice
Entrypoint for Ontology Management and OBO Ingestion
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import ontologies


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database tables on startup
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="BioDOS Core - Ontology Ingestion Service",
    version="1.0.0",
    description="The Biomedical Data Operating System (BioDOS) Phase 1 API for standardizing and ingesting OBO ontologies.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Wire up the ontology router
app.include_router(ontologies.router, prefix="/api/v1")


@app.get("/health", tags=["System Diagnostics"])
def health_check():
    return {"status": "healthy", "engine": "biodos-phase1-core", "version": app.version}
