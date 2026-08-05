-- BIOQUORA STEP 7, STAGE 20: BioCore AI
-- Defines the schema for The Unified Biomedical Intelligence Operating System.

CREATE TABLE kernel_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    kernel_version VARCHAR(50),
    uptime_seconds BIGINT,
    status VARCHAR(50)
);

CREATE TABLE routing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID,
    source VARCHAR(100),
    target_subsystem VARCHAR(100),
    latency_ms FLOAT
);

CREATE TABLE orchestration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    process_id UUID,
    parent_process_id UUID,
    state VARCHAR(50)
);

CREATE TABLE intelligence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subsystem VARCHAR(100),
    active_instances INT,
    health VARCHAR(50)
);

CREATE TABLE knowledge_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_nodes BIGINT,
    global_edges BIGINT,
    last_sync TIMESTAMP
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    reasoning_path JSONB,
    verified BOOLEAN
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    subsystems_engaged JSONB,
    completion_time TIMESTAMP
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    active_institutions INT,
    cross_node_queries INT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID,
    enforcement_level VARCHAR(50),
    violations INT
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compute_cluster VARCHAR(100),
    utilization_percent FLOAT,
    status VARCHAR(50)
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    participants JSONB,
    active BOOLEAN
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID,
    license_tier VARCHAR(50),
    active_users INT
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    daily_active_users INT,
    total_api_calls BIGINT
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(255),
    user_id UUID,
    ip_address VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cycle_id UUID,
    accuracy_delta FLOAT,
    approved BOOLEAN
);

CREATE TABLE version_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component VARCHAR(100),
    version VARCHAR(50),
    release_date TIMESTAMP
);

CREATE TABLE platform_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_name VARCHAR(100),
    setting_value JSONB
);

CREATE TABLE civilization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    epoch VARCHAR(50),
    major_discoveries JSONB,
    archived BOOLEAN
);

CREATE TABLE biocore_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_requests_processed BIGINT,
    system_health_score FLOAT
);
