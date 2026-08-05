-- BIOQUORA STEP 7, STAGE 12: BioSafe
-- Defines the schema for AI Safety, Security & Responsible Biomedical AI Framework.

CREATE TABLE identity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    role VARCHAR(100),
    clearance_level INT
);

CREATE TABLE authentication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    auth_method VARCHAR(50),
    last_login TIMESTAMP
);

CREATE TABLE authorization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    resource_id UUID,
    permissions JSONB
);

CREATE TABLE policy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(100),
    rules JSONB,
    enforcement_mode VARCHAR(50)
);

CREATE TABLE privacy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    phi_detected BOOLEAN,
    deidentification_strategy VARCHAR(100)
);

CREATE TABLE risk_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    risk_score FLOAT,
    mitigation_steps JSONB
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework VARCHAR(100), -- 'HIPAA', 'GDPR', 'FDA_CFR_21'
    status VARCHAR(50)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    approval_status VARCHAR(50),
    review_board_notes TEXT
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type VARCHAR(100),
    user_id UUID,
    resource_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE incident_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    severity VARCHAR(50),
    description TEXT,
    resolution_status VARCHAR(50)
);

CREATE TABLE security_event_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100),
    source_ip VARCHAR(50),
    payload_hash VARCHAR(255)
);

CREATE TABLE model_security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    vulnerability_scan_passed BOOLEAN,
    adversarial_defense_active BOOLEAN
);

CREATE TABLE api_security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint VARCHAR(255),
    rate_limit_hits INT,
    waf_blocks INT
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100),
    encryption_at_rest BOOLEAN,
    encryption_in_transit BOOLEAN
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID,
    tenant_name VARCHAR(255),
    custom_policies JSONB
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    current_value FLOAT,
    alert_threshold FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_component VARCHAR(100),
    uptime_seconds INT,
    error_count INT
);

CREATE TABLE threat_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_actor VARCHAR(100),
    iocs JSONB,
    mitigation_applied BOOLEAN
);

CREATE TABLE trust_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    trust_score FLOAT,
    explainability_report JSONB
);

CREATE TABLE biosafe_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_security_score FLOAT,
    active_incidents INT
);
