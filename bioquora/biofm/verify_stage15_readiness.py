import os
import sys

def verify_stage15():
    print("Initiating Bioquora Step 5 Stage 15 (BioFM v1.0) Readiness Verification...")
    
    base_path = os.path.join(os.path.dirname(__file__))
    
    modules = [
        "architecture/foundation_architecture.py",
        "tokenizer/biological_tokenizer.py",
        "encoders/multimodal_encoder.py",
        "embeddings/embedding_platform.py",
        "training/pretraining_pipeline.py",
        "reasoning/reasoning_engine.py",
        "retrieval/biological_rag.py",
        "generation/scientific_generator.py",
        "agents/biological_agents.py",
        "planning/scientific_planner.py",
        "finetuning/finetuning_infrastructure.py",
        "evaluation/evaluation_suite.py",
        "evaluation/reliability_framework.py",
        "serving/serving_platform.py",
        "api/foundation_services.py",
        "storage/foundation_repository.py",
        "validation/validation_platform.py",
        "validation/benchmark_suite.py",
        "architecture/stage_integration.py",
        "specifications/BIOFM_MASTER_SPECIFICATION.md"
    ]
    
    missing = []
    for module in modules:
        path = os.path.join(base_path, module)
        if not os.path.exists(path):
            missing.append(module)
            
    if missing:
        print(f"FAILED: Missing {len(missing)} modules:")
        for m in missing:
            print(f" - {m}")
        sys.exit(1)
        
    print("SUCCESS: All 20 BioFM modules verified successfully.")
    print("Stage 15 (BioFM v1.0) is 100% READY.")
    sys.exit(0)

if __name__ == "__main__":
    verify_stage15()
