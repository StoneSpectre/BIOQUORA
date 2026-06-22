from fastapi import APIRouter
from pydantic import BaseModel
import sys
import os

# Fix Windows console print encoding issues with emojis
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

# Add bioquora directory to path so we can import the graphrag modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../bioquora/graphrag')))

from pipeline import run_pipeline

router = APIRouter()

class GraphRAGQuery(BaseModel):
    query: str

@router.post("/query")
def execute_graphrag_pipeline(data: GraphRAGQuery):
    """
    Executes the full 6-Step Bioquora GraphRAG Pipeline:
    1. Question Understanding
    2. Semantic Retrieval
    3. Knowledge Graph Traversal
    4. GraphRAG Context Assembly
    5. Evidence Ranking & Provenance Scoring
    6. Transparent Citation-Grounded Generation
    """
    try:
        # Run the imported pipeline
        result = run_pipeline(data.query)
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
