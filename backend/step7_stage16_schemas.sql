-- BIOQUORA STEP 7, STAGE 16: BioAI Hub
-- Defines the schema for Unified Biomedical AI Ecosystem & Developer Platform.

CREATE TABLE developer_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_name VARCHAR(255),
    organization VARCHAR(255),
    api_key_hash VARCHAR(255)
);

CREATE TABLE api_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint_path VARCHAR(255),
    method VARCHAR(10),
    rate_limit_per_min INT
);

CREATE TABLE sdk_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language VARCHAR(50),
    version VARCHAR(50),
    download_url VARCHAR(255)
);

CREATE TABLE plugin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plugin_name VARCHAR(100),
    developer_id UUID,
    status VARCHAR(50)
);

CREATE TABLE extension_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    extension_name VARCHAR(100),
    installed_count INT,
    rating FLOAT
);

CREATE TABLE marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_type VARCHAR(50), -- 'model', 'dataset', 'workflow', 'agent'
    item_id UUID,
    price_usd FLOAT
);

CREATE TABLE workflow_market_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    downloads INT,
    certification_status VARCHAR(50)
);

CREATE TABLE agent_market_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    specialty VARCHAR(100),
    rating FLOAT
);

CREATE TABLE model_market_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    license_type VARCHAR(50),
    downloads INT
);

CREATE TABLE dataset_market_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    size_gb FLOAT,
    access_level VARCHAR(50)
);

CREATE TABLE billing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID,
    current_cycle_spend FLOAT,
    tier VARCHAR(50)
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_id UUID,
    api_calls_last_30d INT,
    error_rate FLOAT
);

CREATE TABLE documentation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doc_id VARCHAR(100),
    version VARCHAR(50),
    content TEXT
);

CREATE TABLE certification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_id UUID,
    certified_by VARCHAR(100),
    date_certified TIMESTAMP
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID,
    sso_enabled BOOLEAN,
    custom_domain VARCHAR(255)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plugin_id UUID,
    review_status VARCHAR(50),
    security_scan_passed BOOLEAN
);

CREATE TABLE community_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID,
    post_count INT,
    active_contributors INT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ecosystem_metric VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE integration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    external_system VARCHAR(100),
    auth_type VARCHAR(50),
    status VARCHAR(50)
);

CREATE TABLE bioaihub_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_developers INT,
    total_ecosystem_apps INT
);
