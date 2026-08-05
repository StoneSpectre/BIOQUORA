-- BIOQUORA STAGE 19: BioValidate Registries
-- Defines the schema for scientific quality assurance and benchmarking.

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    component_name VARCHAR(150) NOT NULL,
    validation_type VARCHAR(50) NOT NULL, -- 'biological', 'clinical', 'statistical', 'ai', 'software'
    status VARCHAR(50) DEFAULT 'pending',
    certified_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE benchmark_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_name VARCHAR(200) NOT NULL,
    domain VARCHAR(100) NOT NULL, -- e.g., 'Genomics', 'Proteomics'
    dataset_url VARCHAR(255),
    baseline_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reproducibility_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID NOT NULL,
    random_seed INTEGER,
    software_versions JSONB,
    hardware_config JSONB,
    reproducibility_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID NOT NULL,
    approval_status VARCHAR(50) DEFAULT 'under_review',
    bias_scan_result JSONB,
    audit_trail JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(150) NOT NULL,
    intended_use TEXT,
    limitations TEXT,
    performance_metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dataset_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_name VARCHAR(150) NOT NULL,
    provenance TEXT,
    demographic_distribution JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE audit_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action VARCHAR(200) NOT NULL,
    actor_id UUID NOT NULL,
    resource_id UUID NOT NULL,
    details JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quality_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    system_component VARCHAR(100) NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value FLOAT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expert_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID NOT NULL,
    target_id UUID NOT NULL, -- UUID of model, dataset, or pipeline
    review_domain VARCHAR(100), -- 'Clinical', 'Statistical', etc.
    decision VARCHAR(50), -- 'Approved', 'Rejected', 'Needs Revision'
    comments TEXT,
    reviewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE validation_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_title VARCHAR(200) NOT NULL,
    target_component VARCHAR(150) NOT NULL,
    summary TEXT,
    full_report_url VARCHAR(255),
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
