-- BIOQUORA STEP 6, STAGE 4: BioMarket (AI Research Marketplace)
-- Defines the schema for the biomedical asset exchange economy.

CREATE TABLE marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL,
    asset_type VARCHAR(100), -- 'Model', 'Dataset', 'Workflow', 'Plugin'
    status VARCHAR(50) DEFAULT 'published',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    architecture VARCHAR(150),
    framework VARCHAR(100), -- 'PyTorch', 'TensorFlow', 'JAX'
    license_id UUID,
    downloads INT DEFAULT 0
);

CREATE TABLE dataset_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    modality VARCHAR(100), -- 'Genomics', 'Clinical', 'Multi-omics'
    size_bytes BIGINT,
    license_id UUID,
    downloads INT DEFAULT 0
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    engine VARCHAR(100), -- 'Nextflow', 'Snakemake', 'CWL'
    version VARCHAR(50),
    license_id UUID
);

CREATE TABLE plugin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    target_platform VARCHAR(100), -- 'Bioquora Core', 'Jupyter'
    version VARCHAR(50),
    installs INT DEFAULT 0
);

CREATE TABLE agent_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    capabilities JSONB,
    version VARCHAR(50),
    deployments INT DEFAULT 0
);

CREATE TABLE protocol_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    name VARCHAR(255) NOT NULL,
    protocol_type VARCHAR(100), -- 'Wet-lab', 'Computational'
    version VARCHAR(50)
);

CREATE TABLE container_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publisher_id UUID,
    image_name VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    digest VARCHAR(255),
    size_bytes BIGINT
);

CREATE TABLE license_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150),
    type VARCHAR(100), -- 'Open Source', 'Commercial', 'Academic'
    terms TEXT,
    spdx_id VARCHAR(50)
);

CREATE TABLE provenance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    action VARCHAR(100), -- 'Created', 'Derived From', 'Validated By'
    actor_id UUID,
    target_asset_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    benchmark_name VARCHAR(255),
    score FLOAT,
    metric_type VARCHAR(100),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reproducibility_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    reproduced_by UUID,
    status VARCHAR(50), -- 'Verified', 'Failed'
    environment_snapshot JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    metric_name VARCHAR(100),
    value FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    moderation_status VARCHAR(50), -- 'Approved', 'Flagged', 'Retired'
    moderator_id UUID,
    notes TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    scan_type VARCHAR(100), -- 'Malware', 'Dependencies', 'Container'
    vulnerabilities_found INT DEFAULT 0,
    scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE compliance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    compliance_framework VARCHAR(100),
    status VARCHAR(50),
    certified_date TIMESTAMP
);

CREATE TABLE enterprise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID,
    asset_id UUID,
    approval_status VARCHAR(50),
    approved_by UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE search_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    tags JSONB,
    description_vector JSONB,
    indexed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE dependency_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_asset_id UUID,
    target_asset_id UUID,
    dependency_type VARCHAR(100), -- 'Requires', 'Trained On', 'Uses'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE trust_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    trust_score FLOAT,
    factors JSONB,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
