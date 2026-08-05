-- BIOQUORA STEP 7, STAGE 19: BioASI
-- Defines the schema for Biomedical Artificial Super Intelligence Architecture.

CREATE TABLE executive_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    objective_name VARCHAR(255),
    priority VARCHAR(50),
    status VARCHAR(50)
);

CREATE TABLE mission_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    executive_id UUID,
    mission_plan JSONB,
    completion_percentage FLOAT
);

CREATE TABLE cognition_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cognitive_state VARCHAR(100),
    active_subsystems JSONB,
    memory_context_id UUID
);

CREATE TABLE coordination_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    coordinator_agent UUID,
    status VARCHAR(50)
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID,
    reasoning_tree JSONB,
    confidence_score FLOAT
);

CREATE TABLE planning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    horizon VARCHAR(50), -- 'SHORT', 'LONG'
    plan_steps JSONB,
    active_step INT
);

CREATE TABLE learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learning_objective VARCHAR(255),
    target_metric VARCHAR(100),
    improvement_delta FLOAT
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_query_id UUID,
    institutions_involved INT,
    consensus_reached BOOLEAN
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_id UUID,
    human_override BOOLEAN,
    reviewer_id UUID
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subsystem_name VARCHAR(100),
    health_status VARCHAR(50),
    load_percentage FLOAT
);

CREATE TABLE decision_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    recommendation TEXT,
    evidence_links JSONB
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    human_team_id UUID,
    ai_team_id UUID,
    interaction_log JSONB
);

CREATE TABLE resource_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_type VARCHAR(50), -- 'COMPUTE', 'MEMORY'
    allocation_percentage FLOAT,
    priority INT
);

CREATE TABLE execution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plan_step_id UUID,
    execution_status VARCHAR(50),
    result JSONB
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100),
    payload JSONB
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cognitive_action VARCHAR(255),
    justification TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evolution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    architecture_version VARCHAR(50),
    major_cognitive_leap VARCHAR(255)
);

CREATE TABLE intelligence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(100),
    capability_score FLOAT
);

CREATE TABLE bioasi_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    active_missions INT,
    global_intelligence_score FLOAT
);
