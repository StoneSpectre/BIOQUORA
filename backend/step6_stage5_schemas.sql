-- BIOQUORA STEP 6, STAGE 5: BioLab (Autonomous Laboratory Platform)
-- Defines the schema for the computational laboratory ecosystem.

CREATE TABLE experiment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    hypothesis TEXT,
    owner_id UUID,
    status VARCHAR(50) DEFAULT 'planned', -- 'planned', 'running', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    name VARCHAR(255) NOT NULL,
    graph_json JSONB, -- The DAG definition
    version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE execution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    status VARCHAR(50), -- 'queued', 'running', 'success', 'failed'
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);

CREATE TABLE scheduler_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID,
    compute_target VARCHAR(100), -- 'BioCloud GPU', 'Local', 'HPC'
    cpu_cores INT,
    memory_gb INT,
    gpu_count INT
);

CREATE TABLE notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    title VARCHAR(255),
    language VARCHAR(50), -- 'Python', 'R', 'Julia'
    content_blob_id UUID,
    last_modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    engine VARCHAR(100), -- 'GROMACS', 'CellDesigner'
    parameters JSONB,
    status VARCHAR(50)
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    analysis_type VARCHAR(100),
    model_spec JSONB,
    results JSONB
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID,
    check_type VARCHAR(100),
    passed BOOLEAN,
    logs TEXT
);

CREATE TABLE reproducibility_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    environment_snapshot JSONB,
    dependency_tree JSONB,
    seed_values JSONB
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID,
    metric_name VARCHAR(100),
    metric_value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE result_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    artifact_type VARCHAR(100), -- 'Model', 'Dataset', 'Figure'
    storage_path VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    collaborator_id UUID,
    role VARCHAR(50), -- 'PI', 'Analyst', 'Viewer'
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node_id UUID,
    source_type VARCHAR(50),
    target_node_id UUID,
    target_type VARCHAR(50),
    relation VARCHAR(100) -- 'generated_by', 'trained_on'
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    compute_hours FLOAT,
    storage_gb FLOAT,
    cost_estimate FLOAT
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    data_classification VARCHAR(50), -- 'Public', 'PHI', 'Confidential'
    encryption_key_id UUID
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    audit_event VARCHAR(255),
    actor_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    lab_name VARCHAR(255),
    resource_quota JSONB,
    active BOOLEAN DEFAULT true
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    execution_id UUID,
    benchmark_type VARCHAR(100),
    score FLOAT
);

CREATE TABLE agent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    agent_role VARCHAR(100), -- 'Bioinformatician', 'Statistician'
    tasks_completed INT DEFAULT 0
);

CREATE TABLE storage_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    bucket_name VARCHAR(255),
    total_size_bytes BIGINT
);
