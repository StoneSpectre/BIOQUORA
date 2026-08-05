-- BIOQUORA STEP 6, STAGE 1: BioCloud (God Mode)
-- Defines the schema for the BioCloud Control Plane.

CREATE TABLE user_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., 'Researcher', 'Enterprise Admin'
    sso_provider VARCHAR(50),
    mfa_enabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE organization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    org_type VARCHAR(100), -- e.g., 'University', 'Pharma'
    billing_plan VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE project_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organization_registry(id),
    name VARCHAR(255) NOT NULL,
    budget_limit FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES project_registry(id),
    name VARCHAR(255) NOT NULL,
    storage_quota_gb INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compute_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_type VARCHAR(50), -- 'CPU', 'GPU', 'HPC'
    region VARCHAR(100),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE gpu_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compute_id UUID REFERENCES compute_registry(id),
    gpu_model VARCHAR(100), -- 'A100', 'H100'
    allocation_status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE storage_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    storage_type VARCHAR(50), -- 'Object', 'Cold', 'Database'
    usage_bytes BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    kernel VARCHAR(50), -- 'Python', 'R', 'Julia'
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    workflow_name VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(255),
    version VARCHAR(50),
    framework VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID REFERENCES model_registry(id),
    endpoint_url VARCHAR(255),
    replicas INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    action VARCHAR(255),
    resource_id UUID,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE billing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organization_registry(id),
    compute_cost FLOAT,
    storage_cost FLOAT,
    billing_period VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_name VARCHAR(255),
    asset_type VARCHAR(50), -- 'Dataset', 'Model', 'Pipeline'
    price FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component VARCHAR(100),
    metric VARCHAR(100),
    value FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    enforcement_level VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_type VARCHAR(100),
    severity VARCHAR(50),
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE backup_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id UUID,
    backup_url VARCHAR(255),
    snapshot_time TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE aiops_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recommendation_type VARCHAR(100),
    details TEXT,
    applied BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_name VARCHAR(100),
    version VARCHAR(50),
    endpoint VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
