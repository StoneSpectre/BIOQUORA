-- BIOQUORA STEP 6, STAGE 18: BioEarth (Global Biomedical Intelligence Network)
-- Defines the schema for Global Federation, Public Health, and the Planetary Twin.

CREATE TABLE institution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    country VARCHAR(100),
    type VARCHAR(100),
    metadata JSONB
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID, -- References institution_registry
    connection_status VARCHAR(50),
    last_sync TIMESTAMP,
    policies JSONB
);

CREATE TABLE public_health_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_id VARCHAR(100),
    region VARCHAR(100),
    case_count INT,
    mortality_rate DECIMAL(5,4),
    recorded_at TIMESTAMP
);

CREATE TABLE environmental_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region VARCHAR(100),
    air_quality_index INT,
    water_quality_index INT,
    biodiversity_score FLOAT,
    recorded_at TIMESTAMP
);

CREATE TABLE observatory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_category VARCHAR(100),
    description TEXT,
    momentum_score FLOAT,
    published_date TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255),
    participating_institutions JSONB,
    status VARCHAR(50)
);

CREATE TABLE knowledge_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    graph_edges JSONB,
    global_visibility BOOLEAN DEFAULT TRUE
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(100), -- 'GA4GH', 'FHIR'
    version VARCHAR(50),
    adoption_rate FLOAT
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    global_value JSONB,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    international_treaty_ref VARCHAR(255),
    rules JSONB
);

CREATE TABLE ai_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    federated_nodes JSONB,
    global_accuracy FLOAT
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    latency_ms INT,
    uptime_percentage FLOAT,
    status VARCHAR(50)
);

CREATE TABLE sustainability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    carbon_footprint_tons FLOAT,
    energy_usage_kwh FLOAT,
    recorded_at TIMESTAMP
);

CREATE TABLE education_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID,
    global_enrollment INT,
    countries_reached INT
);

CREATE TABLE innovation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID,
    global_impact_score FLOAT,
    markets_active JSONB
);

CREATE TABLE digital_twin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    planet_snapshot JSONB,
    active_nodes INT,
    total_compute_teraflops FLOAT,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE translation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID,
    source_language VARCHAR(50),
    target_languages JSONB,
    translation_status VARCHAR(50)
);

CREATE TABLE space_biology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id VARCHAR(100),
    location VARCHAR(100), -- 'ISS', 'Artemis'
    principal_investigator UUID,
    results JSONB
);

CREATE TABLE earth_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_score FLOAT,
    components JSONB,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recovery_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    global_snapshot_uri VARCHAR(500),
    size_tb FLOAT,
    created_at TIMESTAMP
);
