-- BIOQUORA STEP 6, STAGE 16: BioEnterprise (Enterprise Biomedical Platform)
-- Defines the schema for Organization Management, Governance, Security, and Analytics.

CREATE TABLE organization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type VARCHAR(100), -- 'University', 'Hospital', 'Pharma'
    domain VARCHAR(255),
    status VARCHAR(50) DEFAULT 'ACTIVE'
);

CREATE TABLE department_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    name VARCHAR(255),
    head_id UUID
);

CREATE TABLE identity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    sso_provider VARCHAR(100),
    user_roles JSONB,
    policies JSONB
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    policy_name VARCHAR(255),
    rules JSONB,
    enforcement_level VARCHAR(50)
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    framework VARCHAR(100), -- 'HIPAA', 'GDPR', 'FDA_21CFR11'
    status VARCHAR(50),
    last_audit TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    kpi_type VARCHAR(100),
    value JSONB,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    resource_type VARCHAR(100), -- 'GPU', 'Storage', 'Compute'
    allocation JSONB,
    cost_center VARCHAR(100)
);

CREATE TABLE finance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    grant_id UUID,
    budget_allocated DECIMAL(15,2),
    budget_spent DECIMAL(15,2)
);

CREATE TABLE procurement_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    request_type VARCHAR(100),
    status VARCHAR(50),
    approved_by UUID
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    workspace_name VARCHAR(255),
    members JSONB,
    visibility VARCHAR(50)
);

CREATE TABLE messaging_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    channel_name VARCHAR(255),
    is_secure BOOLEAN DEFAULT TRUE
);

CREATE TABLE calendar_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    event_type VARCHAR(100),
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    metric_name VARCHAR(100),
    current_value FLOAT,
    alert_threshold FLOAT
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_org_id UUID,
    target_org_id UUID,
    shared_assets JSONB,
    trust_level VARCHAR(50)
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    actor_id UUID,
    action_type VARCHAR(100),
    resource_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    model_id UUID,
    approval_status VARCHAR(50),
    risk_assessment JSONB
);

CREATE TABLE digital_twin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    graph_snapshot JSONB,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE backup_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    snapshot_uri VARCHAR(500),
    retention_policy VARCHAR(100)
);

CREATE TABLE operations_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    workflow_id UUID,
    execution_status VARCHAR(50),
    logs JSONB
);

CREATE TABLE enterprise_marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    app_id UUID,
    deployment_status VARCHAR(50),
    license_key VARCHAR(255)
);
