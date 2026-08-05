-- BIOQUORA STEP 6, STAGE 20: BioCivilization (Biomedical Civilization Platform)
-- Defines the schema for the ultimate integration layer, knowledge preservation, and heritage.

CREATE TABLE civilization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    civilization_epoch VARCHAR(255),
    active_nodes INT,
    global_status VARCHAR(100),
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE knowledge_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    concept_id VARCHAR(255),
    domain VARCHAR(100),
    unified_description TEXT,
    supporting_evidence JSONB
);

CREATE TABLE memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(100), -- 'Discovery', 'Refutation', 'Consensus'
    description TEXT,
    linked_entities JSONB,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE heritage_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    landmark_name VARCHAR(255),
    significance TEXT,
    historical_date DATE,
    archived_artifacts JSONB
);

CREATE TABLE identity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    researcher_id UUID,
    global_reputation_score FLOAT,
    contributions JSONB,
    mentorship_network JSONB
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    federation_role VARCHAR(100),
    shared_resources JSONB
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id VARCHAR(255),
    charter_section VARCHAR(255),
    voting_record JSONB,
    status VARCHAR(50)
);

CREATE TABLE ethics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dilemma_topic VARCHAR(255),
    guidance_framework TEXT,
    community_consensus JSONB
);

CREATE TABLE observatory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type VARCHAR(100),
    global_value FLOAT,
    trend_analysis JSONB
);

CREATE TABLE preservation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    vault_id VARCHAR(255),
    storage_type VARCHAR(50), -- 'Cold', 'Glacier', 'Distributed'
    archived_size_bytes BIGINT,
    checksum VARCHAR(255)
);

CREATE TABLE atlas_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id VARCHAR(255),
    node_type VARCHAR(50), -- 'Platform', 'Institution', 'KnowledgeDomain'
    connections JSONB,
    visualization_coordinates JSONB
);

CREATE TABLE timeline_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    milestone_title VARCHAR(255),
    impact_level INT,
    era VARCHAR(100),
    details TEXT
);

CREATE TABLE mission_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mission_name VARCHAR(255),
    decade_horizon VARCHAR(50),
    participating_nations JSONB,
    progress_status JSONB
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(255),
    version VARCHAR(50),
    interoperability_guidelines TEXT
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_name VARCHAR(255),
    civilization_metrics JSONB,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE impact_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discovery_id UUID,
    educational_reach INT,
    clinical_translation_score FLOAT,
    public_health_impact TEXT
);

CREATE TABLE resilience_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    infrastructure_layer VARCHAR(100),
    redundancy_level FLOAT,
    failover_status VARCHAR(50)
);

CREATE TABLE evolution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hypothesis_id UUID,
    evolution_stages JSONB,
    current_consensus VARCHAR(100)
);

CREATE TABLE civilization_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_score FLOAT,
    components JSONB, -- 'Knowledge', 'Collaboration', 'OpenScience'
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE legacy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(50), -- 'Person', 'Institution'
    historical_narrative TEXT,
    archived_contributions JSONB
);
