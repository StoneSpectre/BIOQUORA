-- BIOQUORA STEP 7, STAGE 1: BioFoundation (Biomedical Foundation Models)
-- Defines the schema for AI models, reasoning pathways, and evaluation.

CREATE TABLE foundation_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(255),
    domain VARCHAR(100), -- 'Language', 'Molecule', 'Protein', 'Vision'
    architecture VARCHAR(100),
    parameters_billion FLOAT
);

CREATE TABLE model_version_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    version_tag VARCHAR(50),
    weights_path VARCHAR(500),
    deployment_status VARCHAR(50)
);

CREATE TABLE inference_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    endpoint_url VARCHAR(255),
    max_batch_size INT,
    hardware_target VARCHAR(100)
);

CREATE TABLE embedding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(100),
    model_version VARCHAR(50),
    vector_dimension INT,
    storage_path VARCHAR(255)
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    reasoning_pathway JSONB,
    evidence_retrieved JSONB,
    confidence_score FLOAT
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID,
    target_id UUID,
    context_vector VARCHAR(255),
    sentiment VARCHAR(50)
);

CREATE TABLE literature_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id VARCHAR(255),
    parsed_sections JSONB,
    knowledge_graph_nodes JSONB
);

CREATE TABLE molecule_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    smiles_string TEXT,
    computed_properties JSONB,
    generated_by_model UUID
);

CREATE TABLE protein_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence TEXT,
    predicted_structure JSONB,
    functional_annotations JSONB
);

CREATE TABLE genome_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sequence_id VARCHAR(255),
    variant_annotations JSONB,
    expression_profiles JSONB
);

CREATE TABLE multimodal_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    asset_type VARCHAR(50), -- 'Image', 'Graph'
    aligned_text TEXT,
    model_id UUID
);

CREATE TABLE domain_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_model_id UUID,
    domain_specialty VARCHAR(100),
    fine_tuning_dataset VARCHAR(255)
);

CREATE TABLE evaluation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    benchmark_id UUID,
    score FLOAT,
    evaluated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_name VARCHAR(255),
    task_type VARCHAR(100), -- 'QA', 'Coding', 'Folding'
    num_samples INT
);

CREATE TABLE safety_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    hallucination_rate FLOAT,
    toxicity_score FLOAT,
    guardrails_passed BOOLEAN
);

CREATE TABLE explainability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inference_id UUID,
    attention_weights JSONB,
    saliency_map VARCHAR(255)
);

CREATE TABLE routing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intent_class VARCHAR(100),
    target_model_id UUID,
    fallback_model_id UUID
);

CREATE TABLE memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    user_id UUID,
    context_window JSONB,
    long_term_embeddings JSONB
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_id VARCHAR(100),
    gpu_type VARCHAR(50),
    total_nodes INT,
    available_vram_gb FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    latency_ms FLOAT,
    tokens_per_second FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
