-- BIOQUORA STEP 6, STAGE 7: BioPharma (Drug Discovery Cloud)
-- Defines the schema for the AI-powered drug discovery and translational research platform.

CREATE TABLE disease_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_name VARCHAR(255) NOT NULL,
    ontology_id VARCHAR(100), -- e.g., MONDO, DOID
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE target_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_name VARCHAR(255) NOT NULL,
    gene_symbol VARCHAR(50),
    uniprot_id VARCHAR(50),
    priority_score FLOAT,
    druggability_status VARCHAR(50) -- 'druggable', 'undruggable', 'novel'
);

CREATE TABLE compound_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compound_name VARCHAR(255),
    smiles TEXT NOT NULL,
    inchi_key VARCHAR(100),
    molecular_weight FLOAT,
    logp FLOAT,
    library_source VARCHAR(100) -- 'internal', 'chembl', 'enamine'
);

CREATE TABLE structure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_id UUID,
    pdb_id VARCHAR(50),
    structure_blob_id UUID,
    resolution FLOAT,
    source VARCHAR(50) -- 'experimental', 'alphafold'
);

CREATE TABLE chemistry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    scaffold_smiles TEXT,
    analog_count INT DEFAULT 0,
    status VARCHAR(50) -- 'hit_to_lead', 'lead_opt'
);

CREATE TABLE biomarker_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    disease_id UUID,
    name VARCHAR(255),
    omics_type VARCHAR(50), -- 'transcriptomics', 'proteomics'
    evidence_score FLOAT
);

CREATE TABLE omics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_name VARCHAR(255),
    assay_type VARCHAR(100),
    sample_count INT,
    storage_path VARCHAR(500)
);

CREATE TABLE pathway_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pathway_name VARCHAR(255),
    reactome_id VARCHAR(100),
    gene_count INT,
    description TEXT
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_type VARCHAR(50), -- 'literature', 'database', 'experiment'
    citation JSONB,
    ai_summary TEXT,
    confidence_score FLOAT
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100), -- 'virtual_screening', 'molecular_dynamics'
    pipeline_json JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    compound_id UUID,
    target_id UUID,
    docking_score FLOAT,
    binding_affinity FLOAT,
    status VARCHAR(50) -- 'running', 'completed', 'failed'
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    title VARCHAR(500),
    authors JSONB,
    doi VARCHAR(100),
    status VARCHAR(50) -- 'draft', 'submitted', 'published'
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    compounds_screened BIGINT,
    compute_hours FLOAT,
    cost_estimate FLOAT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    approval_status VARCHAR(50),
    approved_by UUID,
    approval_date TIMESTAMP
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    ip_classification VARCHAR(50), -- 'public', 'confidential', 'trade_secret'
    encryption_key_id UUID
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    pharma_name VARCHAR(255),
    license_type VARCHAR(50),
    active BOOLEAN DEFAULT true
);

CREATE TABLE knowledge_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID,
    subject_type VARCHAR(50), -- 'Compound', 'Target', 'Disease'
    object_id UUID,
    object_type VARCHAR(50),
    predicate VARCHAR(100) -- 'binds_to', 'treats', 'associated_with'
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    metric VARCHAR(50), -- 'F1', 'RMSE'
    score FLOAT,
    dataset_id UUID
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    requirement VARCHAR(100),
    status VARCHAR(50), -- 'compliant', 'pending'
    last_checked TIMESTAMP
);

CREATE TABLE developer_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    api_key_id UUID,
    developer_name VARCHAR(255),
    quota_limit INT,
    calls_made INT DEFAULT 0
);
