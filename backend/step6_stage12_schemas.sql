-- BIOQUORA STEP 6, STAGE 12: BioScientistX (Autonomous Research Intelligence Platform)
-- Defines the schema for multi-agent coordination, mission planning, and research memory.

CREATE TABLE mission_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    title VARCHAR(500),
    objective TEXT,
    status VARCHAR(50), -- 'planning', 'active', 'review_pending', 'completed'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE planner_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    milestones JSONB,
    estimated_timeline JSONB,
    resource_requirements JSONB
);

CREATE TABLE hypothesis_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    hypothesis_text TEXT,
    evidence_status VARCHAR(50), -- 'supported', 'contradicted', 'untested'
    associated_entities JSONB
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    workflow_definition JSONB, -- BioLab/Nextflow integration structure
    execution_status VARCHAR(50)
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    agent_id VARCHAR(100), -- 'Literature_Analyst', 'Statistician'
    reasoning_trace JSONB,
    conclusion TEXT
);

CREATE TABLE writing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    document_type VARCHAR(50), -- 'manuscript', 'grant', 'protocol'
    content TEXT,
    version INT
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    analysis_plan JSONB,
    assumptions_checked BOOLEAN,
    results_summary TEXT
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    writing_id UUID,
    publication_id UUID,
    in_text_location VARCHAR(100)
);

CREATE TABLE conversation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    agent_id VARCHAR(100),
    message_log JSONB
);

CREATE TABLE research_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    mission_id UUID,
    learned_insight TEXT,
    context_vector JSONB -- pgvector for semantic retrieval of past decisions
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    team_members JSONB,
    access_level VARCHAR(50)
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_type VARCHAR(100), -- 'agent_autonomy', 'data_access'
    rules JSONB,
    enforcement_status VARCHAR(50)
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(100),
    status VARCHAR(50),
    uptime_seconds BIGINT
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_url VARCHAR(500),
    institution_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE extension_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plugin_name VARCHAR(100),
    developer_id UUID,
    capabilities JSONB
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_name VARCHAR(100),
    agent_performance_score FLOAT,
    human_eval_score FLOAT
);

CREATE TABLE approval_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    action_requested TEXT,
    human_approver_id UUID,
    status VARCHAR(50) -- 'pending', 'approved', 'rejected'
);

CREATE TABLE dashboard_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    widget_layout JSONB,
    preferences JSONB
);

CREATE TABLE recovery_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_id UUID,
    snapshot_data JSONB,
    snapshot_timestamp TIMESTAMP
);
