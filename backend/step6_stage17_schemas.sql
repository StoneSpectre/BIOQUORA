-- BIOQUORA STEP 6, STAGE 17: BioInnovation (Biomedical Innovation Ecosystem)
-- Defines the schema for Startups, Patents, Funding, and Innovation Analytics.

CREATE TABLE startup_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    founders JSONB,
    cap_table JSONB,
    stage VARCHAR(100), -- 'Pre-Seed', 'Seed', 'Series A'
    founded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE patent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255),
    inventors JSONB,
    assignee UUID, -- Linked to organization_registry
    status VARCHAR(100), -- 'Draft', 'Filed', 'Granted'
    filing_date TIMESTAMP
);

CREATE TABLE licensing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patent_id UUID,
    licensee_id UUID,
    terms JSONB,
    royalty_rate DECIMAL(5,2),
    status VARCHAR(50)
);

CREATE TABLE funding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID,
    round_type VARCHAR(100),
    amount_raised DECIMAL(15,2),
    valuation DECIMAL(15,2),
    date_closed TIMESTAMP
);

CREATE TABLE investor_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type VARCHAR(100), -- 'VC', 'Angel', 'Corporate'
    thesis JSONB,
    portfolio JSONB
);

CREATE TABLE partnership_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_a UUID,
    entity_b UUID,
    partnership_type VARCHAR(100),
    status VARCHAR(50)
);

CREATE TABLE innovation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255),
    lead_researcher UUID,
    trl_level INT, -- Technology Readiness Level (1-9)
    description TEXT
);

CREATE TABLE commercialization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    innovation_id UUID,
    target_market VARCHAR(255),
    strategy JSONB,
    milestones JSONB
);

CREATE TABLE incubation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID,
    cohort VARCHAR(100),
    mentors JSONB,
    progress JSONB
);

CREATE TABLE accelerator_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    startup_id UUID,
    demo_day_date TIMESTAMP,
    funding_awarded DECIMAL(15,2),
    status VARCHAR(50)
);

CREATE TABLE portfolio_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    assets JSONB, -- Mixed list of patents, startups, licenses
    total_value DECIMAL(15,2)
);

CREATE TABLE market_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    segment VARCHAR(255),
    tam DECIMAL(15,2), -- Total Addressable Market
    cagr DECIMAL(5,2),
    competitors JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(100), -- 'Startup', 'Patent'
    metrics JSONB,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    rules JSONB,
    enforcement_level VARCHAR(50)
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    clearance_level VARCHAR(50),
    access_logs JSONB
);

CREATE TABLE observatory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trend_name VARCHAR(255),
    category VARCHAR(100),
    impact_score FLOAT,
    data_points JSONB
);

CREATE TABLE impact_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    innovation_id UUID,
    jobs_created INT,
    patients_reached INT,
    esg_score FLOAT
);

CREATE TABLE regulatory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    innovation_id UUID,
    pathway VARCHAR(100), -- '510(k)', 'PMA', 'IND'
    status VARCHAR(50),
    documents JSONB
);

CREATE TABLE agreement_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(100), -- 'NDA', 'MTA', 'Term Sheet'
    parties JSONB,
    status VARCHAR(50),
    signed_date TIMESTAMP
);

CREATE TABLE innovation_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    index_score FLOAT,
    components JSONB,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
