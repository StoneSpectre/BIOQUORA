-- BIOQUORA STEP 7, STAGE 8: BioSimulation AI
-- Defines the schema for multi-scale computational biology simulations.

CREATE TABLE simulation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    hypothesis_id UUID,
    status VARCHAR(50), -- 'Running', 'Completed', 'Failed'
    execution_engine VARCHAR(50)
);

CREATE TABLE molecular_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    pdb_id VARCHAR(10),
    force_field VARCHAR(50),
    trajectory_path VARCHAR(500)
);

CREATE TABLE protein_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    sequence TEXT,
    predicted_structure_path VARCHAR(500),
    plddt_score FLOAT
);

CREATE TABLE cellular_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    cell_type VARCHAR(100),
    signaling_network JSONB
);

CREATE TABLE tissue_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    tissue_type VARCHAR(100),
    spatial_organization JSONB
);

CREATE TABLE physiology_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    organ_system VARCHAR(100),
    compartment_parameters JSONB
);

CREATE TABLE systems_biology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    sbml_model_path VARCHAR(500),
    flux_balance_results JSONB
);

CREATE TABLE omics_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    omics_type VARCHAR(50),
    expression_matrix JSONB
);

CREATE TABLE disease_model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    disease_id VARCHAR(100),
    progression_parameters JSONB
);

CREATE TABLE pk_pd_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    compound_id VARCHAR(100),
    compartment_model JSONB,
    clearance_rate FLOAT
);

CREATE TABLE epidemiology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    sir_parameters JSONB,
    population_size INT
);

CREATE TABLE experiment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    design_matrix JSONB,
    virtual_readouts JSONB
);

CREATE TABLE digital_twin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID,
    twin_parameters JSONB,
    simulated_outcomes JSONB
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    ground_truth_reference VARCHAR(255),
    error_margin FLOAT
);

CREATE TABLE sensitivity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    parameter_variances JSONB,
    robustness_score FLOAT
);

CREATE TABLE provenance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    literature_citations JSONB,
    dataset_sources JSONB
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_type VARCHAR(100),
    performance_metrics JSONB
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    compute_node VARCHAR(100),
    gpu_utilization FLOAT,
    duration_ms INT
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    dag_definition JSONB,
    stage_status JSONB
);

CREATE TABLE simulation_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulation_id UUID,
    searchable_metadata JSONB,
    embedding vector(1536)
);
