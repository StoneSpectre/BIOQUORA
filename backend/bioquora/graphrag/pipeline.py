"""
Bioquora GraphRAG Pipeline — Main Orchestrator
================================================
Runs the full 6-step pipeline for a given biomedical query:

  Step 1  Biomedical Question Understanding
  Step 2  Semantic Vector Retrieval
  Step 3  Knowledge Graph Traversal
  Step 4  GraphRAG Context Assembly
  Step 5  Evidence Ranking & Provenance Scoring
  Step 6  Transparent Citation-Grounded Generation
"""

from step1_question_understanding import QuestionUnderstanding
from step2_semantic_retrieval import SemanticRetrieval
from step3_graph_traversal import GraphTraversal
from step4_context_assembly import GraphRAGContextAssembly
from step5_evidence_ranking import EvidenceRanking
from step6_grounded_generation import GroundedAnswerGeneration
import json


import time

def run_pipeline(query: str, verbose: bool = True) -> dict:
    if verbose:
        print(f"\n{'='*60}")
        print(f"BIOQUORA GraphRAG PIPELINE")
        print(f"Query: {query}")
        print(f"{'='*60}\n")

    qu = QuestionUnderstanding()
    sr = SemanticRetrieval()
    gt = GraphTraversal()
    ca = GraphRAGContextAssembly()
    er = EvidenceRanking()
    gg = GroundedAnswerGeneration()

    print(f"[{time.strftime('%X')}] SCAN  STEP 1: Question Understanding")
    step1 = qu.run(query)

    print(f"\n[{time.strftime('%X')}] SCAN  STEP 2: Semantic Retrieval")
    step2 = sr.run(query, step1)

    print(f"\n[{time.strftime('%X')}] SCAN  STEP 3: Knowledge Graph Traversal")
    step3 = gt.run(step1)

    print(f"\n[{time.strftime('%X')}] SCAN  STEP 4: GraphRAG Context Assembly")
    step4 = ca.run(query, step1, step2, step3)

    print(f"\n[{time.strftime('%X')}] SCAN  STEP 5: Evidence Ranking & Provenance Scoring")
    step5 = er.run(step4)

    print(f"\n[{time.strftime('%X')}] SCAN  STEP 6: Transparent Citation-Grounded Generation")
    step6 = gg.run(query, step4, step5)
    print(f"\n[{time.strftime('%X')}] DONE")

    if verbose:
        print(f"\n{'='*60}")
        print("FINAL RESEARCH ANSWER")
        print(f"{'='*60}\n")
        print(step6["final_report_markdown"])

    return {
        "query": query,
        "step1_question_understanding": step1,
        "step2_semantic_retrieval": step2,
        "step3_graph_traversal": step3,
        "step4_context_assembly": step4,
        "step5_evidence_ranking": step5,
        "step6_grounded_generation": step6,
    }


if __name__ == "__main__":
    query = "How does Metformin reduce insulin resistance?"
    result = run_pipeline(query)

    with open("pipeline_output.json", "w") as f:
        json.dump(result, f, indent=2)
    print("\nDONE  Full output saved to pipeline_output.json")
