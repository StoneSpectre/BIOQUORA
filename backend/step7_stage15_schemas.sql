-- BIOQUORA STEP 7, STAGE 15: BioFactory
-- Defines the schema for Autonomous Biomedical AI Production & Research Factory.

CREATE TABLE acquisition_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(255),
    documents_ingested INT,
    last_sync TIMESTAMP
);

CREATE TABLE literature_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    paper_id VARCHAR(100),
    extracted_entities JSONB,
    processed BOOLEAN
);

CREATE TABLE dataset_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_name VARCHAR(255),
    record_count INT,
    version VARCHAR(50)
);

CREATE TABLE annotation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    annotator_id UUID,
    completion_rate FLOAT
);

CREATE TABLE graph_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_count INT,
    edge_count INT,
    last_updated TIMESTAMP
);

CREATE TABLE embedding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_used VARCHAR(100),
    vector_dimension INT,
    total_embeddings INT
);

CREATE TABLE vector_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    index_name VARCHAR(100),
    shard_count INT,
    status VARCHAR(50)
);

CREATE TABLE ontology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_name VARCHAR(100),
    term_count INT,
    version VARCHAR(50)
);

CREATE TABLE taxonomy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(100),
    hierarchy_depth INT
);

CREATE TABLE metadata_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    asset_type VARCHAR(50),
    tags JSONB
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    parameters_billion FLOAT,
    training_status VARCHAR(50)
);

CREATE TABLE deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    environment VARCHAR(50),
    endpoint_url VARCHAR(255)
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    validation_score FLOAT,
    passed BOOLEAN
);

CREATE TABLE evaluation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    benchmark_suite VARCHAR(100),
    score FLOAT
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    factory_component VARCHAR(100),
    uptime_percentage FLOAT,
    error_rate FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_id UUID,
    throughput_gb_hr FLOAT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    release_id UUID,
    approved_by UUID,
    approval_date TIMESTAMP
);

CREATE TABLE production_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pipeline_name VARCHAR(100),
    status VARCHAR(50),
    last_run TIMESTAMP
);

CREATE TABLE evolution_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_name VARCHAR(100),
    version_bump VARCHAR(50),
    improvement_notes TEXT
);

CREATE TABLE biofactory_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_models_produced INT,
    total_data_processed_tb FLOAT
);
