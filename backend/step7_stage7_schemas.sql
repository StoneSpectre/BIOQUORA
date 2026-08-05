-- BIOQUORA STEP 7, STAGE 7: BioCoder (AI Scientific Programming Engine)
-- Defines the schema for scientific programming, reproducible workflows, and validation.

CREATE TABLE programming_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    user_id UUID,
    language VARCHAR(50),
    goal_description TEXT
);

CREATE TABLE software_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(100),
    architecture_design JSONB,
    dependencies JSONB
);

CREATE TABLE notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    cells JSONB,
    kernel VARCHAR(50)
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100),
    dag_definition JSONB,
    execution_engine VARCHAR(50) -- 'Nextflow', 'Snakemake'
);

CREATE TABLE pipeline_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    run_status VARCHAR(50),
    logs TEXT
);

CREATE TABLE testing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    test_suite JSONB,
    coverage_percentage FLOAT
);

CREATE TABLE debugging_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    error_trace TEXT,
    suggested_fix TEXT,
    resolved BOOLEAN
);

CREATE TABLE optimization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    performance_metrics JSONB,
    refactor_suggestions TEXT
);

CREATE TABLE documentation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    api_docs TEXT,
    user_guide TEXT
);

CREATE TABLE api_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    endpoints JSONB,
    security_schema JSONB
);

CREATE TABLE database_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    schema_definition JSONB,
    migrations JSONB
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    parameters JSONB,
    results_path VARCHAR(500)
);

CREATE TABLE ml_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_name VARCHAR(100),
    hyperparameters JSONB,
    metrics JSONB
);

CREATE TABLE deep_learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    framework VARCHAR(50), -- 'PyTorch', 'TensorFlow'
    weights_path VARCHAR(500)
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_name VARCHAR(100),
    methods JSONB,
    p_values JSONB
);

CREATE TABLE visualization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plot_type VARCHAR(50),
    code_snippet TEXT,
    render_path VARCHAR(500)
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    reproducibility_score FLOAT,
    validation_report TEXT
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    algorithm_name VARCHAR(100),
    dataset VARCHAR(100),
    performance JSONB
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_time_ms INT,
    memory_usage_mb FLOAT,
    cpu_utilization FLOAT
);

CREATE TABLE deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    software_id UUID,
    container_image VARCHAR(255),
    deployment_status VARCHAR(50)
);
