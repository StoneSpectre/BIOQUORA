-- BIOQUORA STEP 6, STAGE 13: BioStudio (Scientific Development Studio)
-- Defines the schema for IDE workspaces, deployments, testing, and plugins.

CREATE TABLE repository_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    owner_id UUID,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    repository_id UUID,
    environment_type VARCHAR(100), -- 'python3.10-gpu', 'r-studio'
    status VARCHAR(50), -- 'running', 'stopped', 'suspended'
    last_accessed TIMESTAMP
);

CREATE TABLE plugin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    version VARCHAR(50),
    developer_id UUID,
    target_module VARCHAR(100), -- 'BioSearch', 'BioOS', 'IDE'
    status VARCHAR(50) -- 'draft', 'review', 'published'
);

CREATE TABLE sdk_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language VARCHAR(50),
    version VARCHAR(50),
    download_url VARCHAR(500)
);

CREATE TABLE build_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID,
    commit_hash VARCHAR(100),
    status VARCHAR(50), -- 'building', 'success', 'failed'
    logs JSONB,
    completed_at TIMESTAMP
);

CREATE TABLE deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    build_id UUID,
    target_environment VARCHAR(100), -- 'BioCloud-Prod', 'BioLab-Sandbox'
    status VARCHAR(50), -- 'deploying', 'active', 'rolled_back'
    deployed_at TIMESTAMP
);

CREATE TABLE testing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    build_id UUID,
    test_suite VARCHAR(100),
    passed_tests INT,
    failed_tests INT,
    coverage_percent FLOAT
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID,
    validation_type VARCHAR(100), -- 'Reproducibility', 'Data Integrity'
    result VARCHAR(50),
    details JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE developer_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    github_handle VARCHAR(100),
    permissions JSONB
);

CREATE TABLE template_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    type VARCHAR(100), -- 'Workflow', 'AI Model', 'Dashboard'
    definition JSONB
);

CREATE TABLE extension_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    installed_extensions JSONB
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(100),
    status VARCHAR(50),
    uptime_seconds BIGINT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    rules JSONB,
    enforcement_level VARCHAR(50)
);

CREATE TABLE security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID,
    scan_type VARCHAR(100), -- 'SAST', 'Dependency', 'Secrets'
    vulnerabilities_found INT,
    scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID,
    dataset_name VARCHAR(255),
    performance_metrics JSONB
);

CREATE TABLE cli_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version VARCHAR(50),
    supported_os JSONB,
    release_notes TEXT
);

CREATE TABLE documentation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repository_id UUID,
    auto_generated BOOLEAN DEFAULT TRUE,
    content TEXT,
    last_updated TIMESTAMP
);

CREATE TABLE environment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    base_image VARCHAR(255),
    installed_packages JSONB,
    gpu_enabled BOOLEAN
);

CREATE TABLE recovery_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    snapshot_data JSONB,
    snapshot_timestamp TIMESTAMP
);
