-- BIOQUORA STEP 6, STAGE 9: BioOS (Biomedical Operating System)
-- Defines the schema for the unified OS layer integrating all prior platforms.

CREATE TABLE workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    owner_id UUID,
    type VARCHAR(50), -- 'personal', 'lab', 'institution'
    storage_quota BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE desktop_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    layout_config JSONB,
    active_widgets JSONB,
    theme VARCHAR(50) DEFAULT 'dark'
);

CREATE TABLE kernel_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(100) NOT NULL,
    status VARCHAR(50), -- 'running', 'stopped', 'degraded'
    version VARCHAR(20),
    last_heartbeat TIMESTAMP
);

CREATE TABLE application_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    app_name VARCHAR(255) NOT NULL,
    module_identifier VARCHAR(100), -- 'BioLab', 'BioPharma', 'BioDigital'
    version VARCHAR(20),
    is_core BOOLEAN DEFAULT true
);

CREATE TABLE plugin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plugin_name VARCHAR(255) NOT NULL,
    developer_id UUID,
    target_app UUID,
    approval_status VARCHAR(50), -- 'pending', 'approved', 'rejected'
    install_count BIGINT DEFAULT 0
);

CREATE TABLE agent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(100),
    role VARCHAR(100), -- 'Planner', 'Statistician', 'Chemist'
    model_backend VARCHAR(100),
    capabilities JSONB
);

CREATE TABLE compute_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_id VARCHAR(100),
    node_type VARCHAR(50), -- 'CPU', 'GPU_A100'
    allocation_status VARCHAR(50),
    assigned_workspace UUID
);

CREATE TABLE search_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(50),
    index_text TEXT,
    last_indexed TIMESTAMP
);

CREATE TABLE notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    title VARCHAR(500),
    content_blocks JSONB, -- Mixed markdown, code, and AI blocks
    last_edited TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    active_users JSONB,
    shared_pointers JSONB, -- For real-time sync
    session_start TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    compute_hours FLOAT,
    storage_used BIGINT,
    api_calls BIGINT
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_id UUID,
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    partner_name VARCHAR(255),
    endpoint_url VARCHAR(500),
    auth_token VARCHAR(500),
    sync_status VARCHAR(50)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    rules JSONB,
    enforcement_level VARCHAR(50) -- 'strict', 'audit_only'
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID,
    encryption_key_hash VARCHAR(500),
    access_control_list JSONB
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(100), -- 'FHIR', 'RO-Crate'
    schema_definition TEXT,
    version VARCHAR(50)
);

CREATE TABLE synchronization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id UUID,
    user_id UUID,
    last_sync TIMESTAMP,
    pending_mutations JSONB
);

CREATE TABLE identity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    wallet_address VARCHAR(255),
    credentials JSONB, -- Institutional IDs, ORCID
    verified BOOLEAN
);

CREATE TABLE digital_twin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    model_id UUID, -- References BioDigital
    live_data_stream VARCHAR(500),
    sync_status VARCHAR(50)
);

CREATE TABLE operating_system_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deployment_id UUID,
    version VARCHAR(50),
    global_config JSONB,
    last_update TIMESTAMP
);
