-- BIOQUORA STEP 7, STAGE 17: BioLearning AI
-- Defines the schema for Self-Improving Biomedical Intelligence & Continuous Learning Engine.

CREATE TABLE learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_cycle_id UUID,
    status VARCHAR(50),
    start_time TIMESTAMP
);

CREATE TABLE literature_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id VARCHAR(100),
    knowledge_extracted JSONB,
    validation_status VARCHAR(50)
);

CREATE TABLE graph_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    new_edge_id UUID,
    confidence_score FLOAT,
    evidence_sources JSONB
);

CREATE TABLE dataset_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    new_records_added INT,
    data_drift_score FLOAT
);

CREATE TABLE ontology_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_name VARCHAR(100),
    new_terms_proposed INT,
    approved_terms INT
);

CREATE TABLE model_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    fine_tuning_run_id UUID,
    improvement_delta FLOAT
);

CREATE TABLE reasoning_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_path_id UUID,
    success_rate_before FLOAT,
    success_rate_after FLOAT
);

CREATE TABLE agent_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    new_skill_acquired VARCHAR(100),
    performance_boost FLOAT
);

CREATE TABLE workflow_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_template_id UUID,
    optimization_applied VARCHAR(255),
    time_saved_seconds INT
);

CREATE TABLE benchmark_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_id UUID,
    previous_score FLOAT,
    new_score FLOAT
);

CREATE TABLE feedback_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    model_response_id UUID,
    correction_provided TEXT,
    incorporated BOOLEAN
);

CREATE TABLE expert_review_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID,
    expert_id UUID,
    decision VARCHAR(50), -- 'APPROVE', 'REJECT', 'REVISE'
    comments TEXT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_update_id UUID,
    approved_by UUID,
    rollback_available BOOLEAN
);

CREATE TABLE evolution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform_version VARCHAR(50),
    major_capabilities_added JSONB,
    deployment_date TIMESTAMP
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_module VARCHAR(100),
    compute_hours_used FLOAT,
    cost_usd FLOAT
);

CREATE TABLE version_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_name VARCHAR(100),
    current_version VARCHAR(50),
    previous_version VARCHAR(50)
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100),
    actor UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE optimization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_metric VARCHAR(100),
    optimization_strategy VARCHAR(100),
    gain_percent FLOAT
);

CREATE TABLE adaptive_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dynamic_routing_rule VARCHAR(255),
    trigger_condition VARCHAR(255),
    active BOOLEAN
);

CREATE TABLE biolearning_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_learning_cycles INT,
    global_intelligence_delta FLOAT
);
