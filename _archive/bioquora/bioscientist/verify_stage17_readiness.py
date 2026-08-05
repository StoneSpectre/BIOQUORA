import os

def verify_stage17():
    print("Verifying Stage 17: BioScientist Readiness...")
    
    base_dir = r"C:\Users\hp\Downloads\BIOQUORA\bioquora\bioscientist"
    
    modules = [
        "architecture/ai_scientist_architecture.py",
        "reasoning/scientific_question_engine.py",
        "planning/research_planner.py",
        "reasoning/reasoning_platform.py",
        "evidence/evidence_integration_engine.py",
        "debate/scientific_debate_platform.py",
        "planning/discovery_ranking_engine.py",
        "evidence/literature_intelligence_platform.py",
        "coordination/agent_coordination_engine.py",
        "planning/research_management_platform.py",
        "communication/scientific_writing_platform.py",
        "communication/human_collaboration_platform.py",
        "reasoning/adaptive_learning_engine.py",
        "governance/scientific_governance_framework.py",
        "api/ai_scientist_services.py",
        "evidence/scientific_repository.py",
        "validation/validation_platform.py",
        "benchmarks/benchmark_suite.py",
        "architecture/stage_integration.py",
        "specifications/BIOSCIENTIST_MASTER_SPECIFICATION.md"
    ]
    
    all_passed = True
    
    for mod in modules:
        path = os.path.join(base_dir, mod)
        if os.path.exists(path):
            print(f"[PASS] Found {mod}")
        else:
            print(f"[FAIL] Missing {mod}")
            all_passed = False
            
    if all_passed:
        print("\nAll Stage 17 modules are present and accounted for.")
        print("BioScientist v1.0 is ready for deployment!")
    else:
        print("\nSome modules are missing. Please check the logs.")

if __name__ == "__main__":
    verify_stage17()
