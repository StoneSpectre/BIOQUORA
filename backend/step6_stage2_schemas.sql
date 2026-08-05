-- BIOQUORA STEP 6, STAGE 2: BioNet (Biomedical Internet)
-- Defines the schema for the global biomedical collaboration layer.

CREATE TABLE institution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(100) UNIQUE,
    institution_type VARCHAR(100),
    country VARCHAR(100),
    verification_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE researcher_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID REFERENCES institution_registry(id),
    name VARCHAR(255) NOT NULL,
    orcid VARCHAR(50) UNIQUE,
    title VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_institution UUID REFERENCES institution_registry(id),
    target_institution UUID REFERENCES institution_registry(id),
    trust_level VARCHAR(50), -- 'Full', 'Restricted', 'Guest'
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255) NOT NULL,
    lead_researcher_id UUID REFERENCES researcher_registry(id),
    privacy_level VARCHAR(50), -- 'Public', 'Federated', 'Private'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messaging_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id UUID,
    sender_id UUID REFERENCES researcher_registry(id),
    message_type VARCHAR(50), -- 'Chat', 'Event', 'Alert'
    payload JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_name VARCHAR(255),
    owner_id UUID REFERENCES researcher_registry(id),
    execution_environment VARCHAR(100), -- 'Local', 'Federated'
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ai_agent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(150),
    capabilities JSONB,
    owner_institution UUID REFERENCES institution_registry(id),
    access_policy VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE search_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_type VARCHAR(50), -- 'Dataset', 'Paper', 'Researcher'
    resource_id UUID,
    metadata JSONB,
    indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    scope VARCHAR(100), -- 'Global', 'Institution', 'Project'
    rules JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework VARCHAR(100), -- 'HIPAA', 'GDPR', 'IRB'
    target_resource UUID,
    status VARCHAR(50),
    certified_at TIMESTAMP
);

CREATE TABLE certification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    certification_type VARCHAR(100),
    issued_by VARCHAR(150),
    valid_until TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    dimension VARCHAR(100),
    value FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID,
    action VARCHAR(255),
    resource_id UUID,
    ip_address VARCHAR(45),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE policy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    description TEXT,
    enforcement_mode VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE network_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(100),
    node_type VARCHAR(50),
    status VARCHAR(50),
    last_heartbeat TIMESTAMP
);

CREATE TABLE event_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100),
    source VARCHAR(150),
    payload JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_type VARCHAR(100),
    severity VARCHAR(50),
    resolved BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resilience_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    failover_event VARCHAR(255),
    affected_region VARCHAR(100),
    recovery_status VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES researcher_registry(id),
    title VARCHAR(255),
    content TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE developer_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    app_name VARCHAR(255),
    developer_id UUID REFERENCES researcher_registry(id),
    api_key_hash VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
