-- BIOQUORA STEP 7, STAGE 2: BioAgents (AI Agent Ecosystem)
-- Defines the schema for multi-agent orchestration, mission planning, and collaboration.

CREATE TABLE agent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100),
    domain_specialty VARCHAR(100),
    base_model_id UUID,
    status VARCHAR(50) -- 'Active', 'Learning', 'Offline'
);

CREATE TABLE agent_capability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    capability_name VARCHAR(100),
    supported_tools JSONB
);

CREATE TABLE orchestration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    current_step INT,
    active_agent_id UUID,
    execution_state JSONB
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name VARCHAR(255),
    agent_sequence JSONB,
    required_inputs JSONB
);

CREATE TABLE mission_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    high_level_goal TEXT,
    decomposed_tasks JSONB,
    status VARCHAR(50)
);

CREATE TABLE memory_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    shared_context JSONB,
    global_variables JSONB
);

CREATE TABLE communication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    sender_agent_id UUID,
    receiver_agent_id UUID,
    payload JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    claim TEXT,
    supporting_citations JSONB,
    validation_status VARCHAR(50)
);

CREATE TABLE reasoning_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    decision_path JSONB,
    confidence FLOAT
);

CREATE TABLE literature_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    query_executed TEXT,
    documents_synthesized INT
);

CREATE TABLE coding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    generated_code TEXT,
    language VARCHAR(50),
    execution_result JSONB
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    test_type VARCHAR(100),
    p_value FLOAT,
    assumptions_checked BOOLEAN
);

CREATE TABLE bioinformatics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    pipeline_run VARCHAR(255),
    omics_type VARCHAR(100),
    results_path VARCHAR(255)
);

CREATE TABLE molecular_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    target_protein VARCHAR(100),
    candidates_screened INT
);

CREATE TABLE clinical_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    trial_protocol JSONB,
    ethical_review_flag BOOLEAN
);

CREATE TABLE education_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    learning_pathway JSONB,
    difficulty_level VARCHAR(50)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    flagged_output TEXT,
    human_reviewer_id UUID,
    approval_status VARCHAR(50)
);

CREATE TABLE evaluation_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    task_success_rate FLOAT,
    tool_error_rate FLOAT
);

CREATE TABLE telemetry_registry_agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    cpu_time_ms FLOAT,
    api_calls INT
);

CREATE TABLE performance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    time_to_completion_sec INT,
    cost_estimate_usd FLOAT
);
