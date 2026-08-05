-- BIOQUORA STAGE 20: BioUniverse Registries
-- Defines the schema for the ecosystem platform.

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL,
    team_members JSONB NOT NULL,
    workspace_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_type VARCHAR(50) NOT NULL, -- 'model', 'dataset', 'pipeline', 'plugin'
    asset_name VARCHAR(150) NOT NULL,
    author_id UUID NOT NULL,
    price_credits INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plugin_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plugin_name VARCHAR(100) NOT NULL,
    version VARCHAR(20) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_review',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE academy_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_title VARCHAR(200) NOT NULL,
    module_type VARCHAR(50) NOT NULL, -- 'tutorial', 'lab', 'case_study'
    content_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE developer_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    developer_name VARCHAR(150) NOT NULL,
    api_key_hash VARCHAR(255) NOT NULL,
    tier VARCHAR(50) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partnership_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_name VARCHAR(200) NOT NULL,
    partnership_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID NOT NULL,
    bias_score FLOAT,
    audit_log JSONB,
    reviewed_by UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_repository (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100) NOT NULL,
    metric_value FLOAT NOT NULL,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE release_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    version_tag VARCHAR(50) NOT NULL,
    release_notes TEXT,
    is_production BOOLEAN DEFAULT false,
    released_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ecosystem_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    active_users INTEGER DEFAULT 0,
    total_plugins INTEGER DEFAULT 0,
    total_collaborations INTEGER DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
