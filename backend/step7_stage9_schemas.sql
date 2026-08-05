-- BIOQUORA STEP 7, STAGE 9: BioValidator
-- Defines the schema for scientific trust, evidence scoring, and end-to-end provenance.

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID,
    ai_output_id UUID,
    validation_status VARCHAR(50), -- 'Passed', 'Flagged', 'Failed'
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    claim_text TEXT,
    supporting_evidence JSONB,
    contradicting_evidence JSONB
);

CREATE TABLE citation_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    citation_id VARCHAR(100),
    is_hallucinated BOOLEAN,
    citation_quality_score FLOAT
);

CREATE TABLE claim_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    extracted_claim TEXT,
    truth_probability FLOAT
);

CREATE TABLE statistics_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    statistical_method VARCHAR(100),
    is_appropriate BOOLEAN,
    p_value_check FLOAT
);

CREATE TABLE logic_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    reasoning_chain JSONB,
    fallacies_detected JSONB
);

CREATE TABLE ontology_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    entity_name VARCHAR(100),
    mapped_ontology_id VARCHAR(100),
    confidence FLOAT
);

CREATE TABLE code_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    software_id UUID,
    security_vulnerabilities JSONB,
    reproducibility_check BOOLEAN
);

CREATE TABLE simulation_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    simulation_id UUID,
    parameter_bounds_check BOOLEAN
);

CREATE TABLE dataset_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    dataset_id UUID,
    data_leakage_detected BOOLEAN,
    bias_metrics JSONB
);

CREATE TABLE multimodal_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    asset_id UUID,
    cross_modal_alignment_score FLOAT
);

CREATE TABLE clinical_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    phi_detected BOOLEAN,
    guideline_concordance JSONB
);

CREATE TABLE workflow_validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    workflow_id UUID,
    dag_integrity_check BOOLEAN
);

CREATE TABLE trust_score_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    overall_trust_score FLOAT,
    scoring_breakdown JSONB
);

CREATE TABLE provenance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    lineage_graph JSONB,
    origin_sources JSONB
);

CREATE TABLE explainability_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    explanation_text TEXT,
    feature_importance JSONB
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    policy_id VARCHAR(100),
    compliance_status VARCHAR(50)
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    human_reviewer_id UUID,
    review_decision VARCHAR(50),
    comments TEXT
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validator_module VARCHAR(100),
    accuracy FLOAT,
    false_positive_rate FLOAT
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    validation_id UUID,
    compute_time_ms INT,
    api_calls_made INT
);
