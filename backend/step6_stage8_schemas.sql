-- BIOQUORA STEP 6, STAGE 8: BioDigital (Digital Biology Cloud)
-- Defines the schema for the multi-scale computational biology platform.

CREATE TABLE cell_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cell_type VARCHAR(255) NOT NULL,
    ontology_id VARCHAR(100), -- e.g., CL:0000000
    model_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tissue_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tissue_name VARCHAR(255) NOT NULL,
    ontology_id VARCHAR(100), -- e.g., UBERON:0000000
    cell_population_count INT,
    spatial_architecture TEXT
);

CREATE TABLE organ_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organ_name VARCHAR(255) NOT NULL,
    ontology_id VARCHAR(100),
    physiological_parameters JSONB
);

CREATE TABLE physiology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_name VARCHAR(255), -- e.g., 'cardiovascular', 'nervous'
    organ_components JSONB,
    description TEXT
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    model_id UUID,
    scale VARCHAR(50), -- 'cell', 'tissue', 'organ', 'system'
    status VARCHAR(50), -- 'queued', 'running', 'completed', 'failed'
    start_time TIMESTAMP,
    end_time TIMESTAMP
);

CREATE TABLE parameter_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    parameter_name VARCHAR(255),
    value FLOAT,
    unit VARCHAR(50),
    source_reference VARCHAR(500)
);

CREATE TABLE scenario_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    scenario_type VARCHAR(100), -- 'baseline', 'perturbation'
    modifications JSONB,
    description TEXT
);

CREATE TABLE visualization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    type VARCHAR(50), -- '3d_spatial', 'network_graph', 'timeseries'
    storage_path VARCHAR(500)
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    scale VARCHAR(50),
    format VARCHAR(50), -- 'SBML', 'CellML'
    version VARCHAR(20)
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(100), -- e.g., 'SBML L3V2'
    supported_formats JSONB,
    validation_schema TEXT
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    usage_count BIGINT DEFAULT 0,
    compute_cost FLOAT,
    reproducibility_score FLOAT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    approval_status VARCHAR(50),
    reviewed_by UUID,
    audit_trail JSONB
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    subscription_tier VARCHAR(50),
    dedicated_compute_nodes INT,
    active BOOLEAN DEFAULT true
);

CREATE TABLE knowledge_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID,
    subject_type VARCHAR(50), -- 'Cell', 'Tissue', 'Protein'
    object_id UUID,
    object_type VARCHAR(50),
    predicate VARCHAR(100) -- 'part_of', 'interacts_with'
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    title VARCHAR(500),
    doi VARCHAR(100),
    simulation_artifacts JSONB
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    access_level VARCHAR(50), -- 'public', 'private', 'consortium'
    encryption_status BOOLEAN DEFAULT true
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    team_members JSONB,
    permissions JSONB,
    last_activity TIMESTAMP
);

CREATE TABLE recovery_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    checkpoint_url VARCHAR(500),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    author_id UUID,
    content TEXT,
    equations JSONB
);

CREATE TABLE ontology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_name VARCHAR(100), -- 'GO', 'CL', 'UBERON'
    version VARCHAR(50),
    last_synced TIMESTAMP
);
