-- BIOQUORA STEP 7, STAGE 13: BioEval
-- Defines the schema for AI Evaluation, Benchmarking & Scientific Performance Intelligence.

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_name VARCHAR(100),
    domain VARCHAR(100),
    dataset_version VARCHAR(50)
);

CREATE TABLE evaluation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    benchmark_id UUID,
    overall_score FLOAT
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    logical_consistency_score FLOAT,
    causal_accuracy_score FLOAT
);

CREATE TABLE retrieval_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retriever_id UUID,
    mean_reciprocal_rank FLOAT,
    recall_at_10 FLOAT
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    response_id UUID,
    hallucinated_citations INT,
    valid_citations INT
);

CREATE TABLE graph_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    graph_id UUID,
    node_accuracy FLOAT,
    edge_consistency FLOAT
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    p_value_calculation_accuracy FLOAT,
    power_analysis_accuracy FLOAT
);

CREATE TABLE programming_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    pass_at_1 FLOAT,
    syntax_error_rate FLOAT
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    thermodynamic_stability_score FLOAT,
    rmsd_error FLOAT
);

CREATE TABLE vision_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    segmentation_iou FLOAT,
    classification_auroc FLOAT
);

CREATE TABLE multimodal_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    cross_modal_alignment_score FLOAT
);

CREATE TABLE safety_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    jailbreak_resistance_score FLOAT,
    bias_score FLOAT
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deployment_id UUID,
    p99_latency_ms FLOAT,
    throughput_tps FLOAT
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_run_id UUID,
    cost_per_1k_tokens FLOAT,
    energy_consumption_kwh FLOAT
);

CREATE TABLE leaderboard_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(100),
    top_model_id UUID,
    elo_rating INT
);

CREATE TABLE reproducibility_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    variance_across_runs FLOAT,
    deterministic BOOLEAN
);

CREATE TABLE expert_review_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    response_id UUID,
    reviewer_id UUID,
    expert_rating INT,
    comments TEXT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    evaluation_run_id UUID,
    duration_seconds INT
);

CREATE TABLE improvement_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    recommended_fine_tuning_dataset UUID,
    expected_gain_percent FLOAT
);

CREATE TABLE bioeval_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_evaluations_run INT,
    global_model_readiness_score FLOAT
);
