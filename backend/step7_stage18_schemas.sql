-- BIOQUORA STEP 7, STAGE 18: BioFederated AI
-- Defines the schema for Global Federated Biomedical Intelligence Network.

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    federation_name VARCHAR(255),
    status VARCHAR(50),
    established_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_name VARCHAR(255),
    country VARCHAR(100),
    domain_type VARCHAR(100) -- 'Hospital', 'University', 'Pharma'
);

CREATE TABLE node_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    node_ip VARCHAR(50),
    status VARCHAR(50)
);

CREATE TABLE identity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    auth_protocol VARCHAR(50), -- 'SAML', 'OIDC'
    issuer_url VARCHAR(255)
);

CREATE TABLE policy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    data_sharing_level VARCHAR(50),
    compute_sharing_level VARCHAR(50)
);

CREATE TABLE synchronization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    last_sync TIMESTAMP,
    bytes_transferred BIGINT
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255),
    participating_institutions JSONB,
    status VARCHAR(50)
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID,
    approved_by UUID,
    approval_date TIMESTAMP
);

CREATE TABLE privacy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    anonymization_protocol VARCHAR(100),
    differential_privacy_epsilon FLOAT
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(100),
    actor UUID,
    node_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_exchange_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_node UUID,
    target_node UUID,
    graph_subgraph_id UUID,
    approved BOOLEAN
);

CREATE TABLE retrieval_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    nodes_queried JSONB,
    results_aggregated INT
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    federated_task_id UUID,
    consensus_score FLOAT,
    participating_engines JSONB
);

CREATE TABLE evaluation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_id UUID,
    global_average_score FLOAT,
    nodes_participated INT
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    uptime_percentage FLOAT,
    latency_ms FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    federation_event VARCHAR(100),
    event_data JSONB
);

CREATE TABLE infrastructure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cloud_provider VARCHAR(100),
    region VARCHAR(50),
    active_nodes INT
);

CREATE TABLE agreement_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_a UUID,
    institution_b UUID,
    terms TEXT,
    signed_date TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_compute_hours FLOAT,
    total_queries_served INT
);

CREATE TABLE biofederated_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_institutions INT,
    total_nodes INT
);
