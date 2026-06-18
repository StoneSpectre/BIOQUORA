"""
Medinex GraphRAG Pipeline — Main Orchestrator
Runs Steps 1, 2, and 3 sequentially for a given biomedical query.
"""

from step1_question_understanding import QuestionUnderstanding
from step2_semantic_retrieval import SemanticRetrieval
from step3_graph_traversal import GraphTraversal
import json


def run_pipeline(query: str) -> dict:
    print(f"\n{'='*60}")
    print(f"MEDINEX GraphRAG PIPELINE")
    print(f"Query: {query}")
    print(f"{'='*60}\n")

    # ── STEP 1: Question Understanding ──────────────────────────
    print("▶  STEP 1: Question Understanding")
    qu = QuestionUnderstanding()
    step1_result = qu.run(query)
    print(json.dumps(step1_result, indent=2))

    # ── STEP 2: Semantic Retrieval ───────────────────────────────
    print("\n▶  STEP 2: Semantic Retrieval")
    sr = SemanticRetrieval()
    step2_result = sr.run(query, step1_result)
    print(json.dumps(step2_result, indent=2))

    # ── STEP 3: Knowledge Graph Traversal ───────────────────────
    print("\n▶  STEP 3: Knowledge Graph Traversal")
    gt = GraphTraversal()
    step3_result = gt.run(step1_result)
    print(json.dumps(step3_result, indent=2))

    return {
        "query": query,
        "step1_question_understanding": step1_result,
        "step2_semantic_retrieval": step2_result,
        "step3_graph_traversal": step3_result,
    }


if __name__ == "__main__":
    query = "How does Metformin reduce insulin resistance?"
    result = run_pipeline(query)

    with open("pipeline_output.json", "w") as f:
        json.dump(result, f, indent=2)
    print("\n✓  Full output saved to pipeline_output.json")
