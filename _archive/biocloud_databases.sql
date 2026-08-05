-- ==========================================
-- # Bioquora BioCloud (God Mode) Database Schema
-- # Stage 1 Implementation
-- ==========================================

-- 1. Identity & Authentication Platform
CREATE TABLE IF NOT EXISTS user_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(256) UNIQUE NOT NULL,
    role VARCHAR(64) NOT NULL, -- e.g., Student, Researcher, PI
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS organization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(256) NOT NULL,
    org_type VARCHAR(64), -- e.g., University, Hospital, Pharma
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Organization Management
CREATE TABLE IF NOT EXISTS project_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organization_registry(id),
    name VARCHAR(256) NOT NULL,
    budget NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Scientific Workspace Platform
CREATE TABLE IF NOT EXISTS workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_registry(id),
    project_id UUID REFERENCES project_registry(id),
    name VARCHAR(256) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BioCompute Cluster
CREATE TABLE IF NOT EXISTS compute_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cluster_type VARCHAR(64) NOT NULL, -- CPU, GPU, Memory, HPC
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gpu_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compute_id UUID REFERENCES compute_registry(id),
    gpu_type VARCHAR(64) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

-- 5. Distributed Storage
CREATE TABLE IF NOT EXISTS storage_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    storage_type VARCHAR(64) NOT NULL, -- Object, Research, Model
    capacity_gb INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Research Notebook Platform
CREATE TABLE IF NOT EXISTS notebook_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    language VARCHAR(64) NOT NULL, -- Python, R, Julia, SQL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Workflow Orchestrator
CREATE TABLE IF NOT EXISTS workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. AI Infrastructure
CREATE TABLE IF NOT EXISTS model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspace_registry(id),
    name VARCHAR(256) NOT NULL,
    version VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CI/CD Platform
CREATE TABLE IF NOT EXISTS deployment_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_id UUID REFERENCES model_registry(id),
    status VARCHAR(64) NOT NULL,
    deployed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Security & Monitoring
CREATE TABLE IF NOT EXISTS audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES user_registry(id),
    action VARCHAR(256) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS billing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    org_id UUID REFERENCES organization_registry(id),
    amount NUMERIC NOT NULL,
    status VARCHAR(64) NOT NULL,
    billing_date DATE NOT NULL
);

-- 11. Marketplace
CREATE TABLE IF NOT EXISTS marketplace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_type VARCHAR(64) NOT NULL, -- Dataset, Model, Agent
    name VARCHAR(256) NOT NULL,
    price NUMERIC DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(128) NOT NULL,
    value NUMERIC NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Governance Platform
CREATE TABLE IF NOT EXISTS governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(256) NOT NULL,
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Security Platform
CREATE TABLE IF NOT EXISTS security_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    threat_type VARCHAR(128) NOT NULL,
    severity VARCHAR(64) NOT NULL,
    detected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Backup & Disaster Recovery
CREATE TABLE IF NOT EXISTS backup_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    backup_type VARCHAR(64) NOT NULL,
    status VARCHAR(64) NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 15. AI Operations (AIOps)
CREATE TABLE IF NOT EXISTS aiops_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_taken TEXT NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. API Platform
CREATE TABLE IF NOT EXISTS api_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint VARCHAR(256) NOT NULL,
    method VARCHAR(16) NOT NULL,
    status VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
