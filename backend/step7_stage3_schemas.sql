-- BIOQUORA STEP 7, STAGE 3: BioReason (Scientific Reasoning Engine)
-- Defines the schema for cognitive reasoning, uncertainty, evidence, and causality.

CREATE TABLE reasoning_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_type VARCHAR(100), -- 'Logical', 'Causal', 'Statistical'
    query_id UUID,
    output_claim TEXT,
    confidence_score FLOAT
);

CREATE TABLE evidence_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id UUID,
    citation_id UUID,
    evidence_type VARCHAR(100), -- 'Direct', 'Indirect', 'Contradictory'
    provenance_hash VARCHAR(255)
);

CREATE TABLE hypothesis_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    problem_id UUID,
    hypothesis_text TEXT,
    prior_probability FLOAT,
    posterior_probability FLOAT
);

CREATE TABLE causal_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cause_entity_id UUID,
    effect_entity_id UUID,
    relationship_type VARCHAR(100), -- 'Up-regulates', 'Inhibits'
    mechanistic_evidence JSONB
);

CREATE TABLE statistical_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID,
    effect_size FLOAT,
    confidence_interval JSONB,
    assumptions_validated BOOLEAN
);

CREATE TABLE biological_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pathway_id UUID,
    biological_context VARCHAR(255),
    inferred_interactions JSONB
);

CREATE TABLE chemistry_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reaction_id UUID,
    reactants JSONB,
    products JSONB,
    inferred_mechanism TEXT
);

CREATE TABLE protein_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protein_id UUID,
    inferred_function TEXT,
    structural_confidence JSONB
);

CREATE TABLE genomics_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    variant_id UUID,
    inferred_pathogenicity VARCHAR(50),
    evidence_codes JSONB
);

CREATE TABLE graph_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_a UUID,
    node_b UUID,
    inferred_edge_type VARCHAR(100),
    inference_weight FLOAT
);

CREATE TABLE literature_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID,
    extracted_claims JSONB,
    contradictions_found JSONB
);

CREATE TABLE citation_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_citation UUID,
    target_citation UUID,
    reasoning_context VARCHAR(255)
);

CREATE TABLE explainability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_id UUID,
    natural_language_explanation TEXT,
    decision_tree_json JSONB
);

CREATE TABLE uncertainty_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id UUID,
    known_limitations JSONB,
    alternative_hypotheses JSONB,
    epistemic_uncertainty FLOAT
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_id UUID,
    logical_consistency_check BOOLEAN,
    human_override BOOLEAN
);

CREATE TABLE benchmark_registry_reasoning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_name VARCHAR(100),
    reasoning_type VARCHAR(50),
    accuracy_score FLOAT
);

CREATE TABLE workflow_registry_core (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    reasoning_steps JSONB,
    execution_time_ms INT
);

CREATE TABLE telemetry_registry_reasoning (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_id UUID,
    tokens_consumed INT,
    compute_cost FLOAT
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reasoning_id UUID,
    auditor_id UUID,
    audit_notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE learning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    correction_id UUID,
    original_claim TEXT,
    corrected_claim TEXT,
    reasoning_adjustment JSONB
);
