-- BIOQUORA STEP 6, STAGE 6: BioClinical (Clinical Research Cloud)
-- Defines the schema for the clinical and translational research platform.

CREATE TABLE study_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_id VARCHAR(100) UNIQUE,
    title VARCHAR(500) NOT NULL,
    phase VARCHAR(50), -- 'Phase I', 'Phase II', 'Observational'
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'enrolling', 'active', 'completed', 'suspended'
    sponsor_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE protocol_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    version VARCHAR(50),
    objectives TEXT,
    endpoints JSONB,
    eligibility_criteria JSONB,
    approved_by UUID,
    approved_at TIMESTAMP
);

CREATE TABLE cohort_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    name VARCHAR(255) NOT NULL,
    inclusion_rules JSONB,
    exclusion_rules JSONB,
    target_size INT,
    current_size INT DEFAULT 0
);

CREATE TABLE edc_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    form_name VARCHAR(255),
    schema_definition JSONB,
    version VARCHAR(50),
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE biomarker_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    name VARCHAR(255),
    type VARCHAR(100), -- 'genomic', 'proteomic', 'imaging', 'clinical'
    validation_status VARCHAR(50) -- 'exploratory', 'validated', 'surrogate'
);

CREATE TABLE imaging_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    modality VARCHAR(50), -- 'MRI', 'CT', 'PET'
    dicom_path VARCHAR(500),
    metadata JSONB
);

CREATE TABLE genomics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    sample_id VARCHAR(100),
    assay_type VARCHAR(100), -- 'WGS', 'WES', 'RNA-Seq'
    vcf_path VARCHAR(500)
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic VARCHAR(255),
    source_type VARCHAR(100), -- 'publication', 'guideline', 'trial'
    citation JSONB,
    ai_summary TEXT
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    title VARCHAR(500),
    authors JSONB,
    journal VARCHAR(255),
    doi VARCHAR(100),
    status VARCHAR(50) -- 'draft', 'submitted', 'published'
);

CREATE TABLE statistics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    analysis_plan JSONB,
    model_type VARCHAR(100), -- 'Cox Proportional Hazards', 'Logistic Regression'
    results JSONB
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    irb_approval_number VARCHAR(100),
    ethics_committee VARCHAR(255),
    approval_date DATE,
    expiration_date DATE
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    requirement VARCHAR(100), -- 'HIPAA', 'GDPR', 'GCP', '21 CFR Part 11'
    status VARCHAR(50), -- 'compliant', 'pending', 'violation'
    last_checked TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    institution_id UUID,
    investigator_id UUID,
    role VARCHAR(100), -- 'PI', 'Sub-Investigator', 'Data Manager'
    access_level VARCHAR(50)
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    enrollment_rate FLOAT,
    dropout_rate FLOAT,
    data_completeness_pct FLOAT
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    actor_id UUID,
    action VARCHAR(255), -- 'view_phi', 'modify_protocol', 'export_data'
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45)
);

CREATE TABLE knowledge_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject_id UUID,
    subject_type VARCHAR(50), -- 'Study', 'Biomarker', 'Disease'
    object_id UUID,
    object_type VARCHAR(50),
    predicate VARCHAR(100) -- 'investigates', 'correlates_with'
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    phi_present BOOLEAN DEFAULT false,
    encryption_status VARCHAR(50),
    data_residency VARCHAR(100)
);

CREATE TABLE notification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_id UUID,
    study_id UUID,
    message TEXT,
    priority VARCHAR(20), -- 'low', 'medium', 'high', 'critical'
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE integration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    system_name VARCHAR(100), -- 'BioLab', 'BioMarket', 'ClinicalTrials.gov'
    sync_status VARCHAR(50),
    last_sync TIMESTAMP
);

CREATE TABLE recovery_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    study_id UUID,
    backup_path VARCHAR(500),
    checksum VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
