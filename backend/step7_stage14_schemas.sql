-- BIOQUORA STEP 7, STAGE 14: BioWorkflow AI
-- Defines the schema for Autonomous Scientific Workflow Orchestration.

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name VARCHAR(255),
    domain VARCHAR(100),
    status VARCHAR(50)
);

CREATE TABLE workflow_template_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    template_name VARCHAR(255),
    structure JSONB,
    version VARCHAR(50)
);

CREATE TABLE execution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    success BOOLEAN
);

CREATE TABLE dependency_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    parent_task_id UUID,
    child_task_id UUID
);

CREATE TABLE scheduler_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID,
    scheduled_time TIMESTAMP,
    priority INT
);

CREATE TABLE experiment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    experiment_design JSONB,
    approval_status VARCHAR(50)
);

CREATE TABLE literature_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    search_queries JSONB,
    extracted_papers INT
);

CREATE TABLE programming_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    repo_url VARCHAR(255),
    commit_hash VARCHAR(255)
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    simulation_type VARCHAR(100),
    status VARCHAR(50)
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    validator_node UUID,
    passed BOOLEAN
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    manuscript_draft TEXT,
    target_journal VARCHAR(255)
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    team_members JSONB,
    comments TEXT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    reviewer_id UUID,
    decision VARCHAR(50)
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    cpu_usage FLOAT,
    memory_usage FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    event_log JSONB
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    action VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestone_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    milestone_name VARCHAR(100),
    achieved BOOLEAN
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    total_cost FLOAT,
    duration_hours FLOAT
);

CREATE TABLE optimization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    bottleneck_identified VARCHAR(255),
    recommendation TEXT
);

CREATE TABLE bioworkflow_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_active_workflows INT,
    global_success_rate FLOAT
);
