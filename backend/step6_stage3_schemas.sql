-- BIOQUORA STEP 6, STAGE 3: BioConnect (Scientific Social Network)
-- Defines the schema for the AI-powered scientific collaboration network.

CREATE TABLE profile_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL, -- Link to core user/identity
    orcid VARCHAR(50) UNIQUE,
    institution_id UUID,
    academic_title VARCHAR(150),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfolio_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    portfolio_type VARCHAR(50), -- 'Publication', 'Dataset', 'Model', 'Patent'
    resource_id UUID,
    contribution_role VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    doi VARCHAR(255) UNIQUE,
    title VARCHAR(500),
    abstract TEXT,
    authors JSONB,
    published_date DATE,
    metrics JSONB
);

CREATE TABLE dataset_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES profile_registry(id),
    dataset_name VARCHAR(255),
    description TEXT,
    size_bytes BIGINT,
    access_level VARCHAR(50), -- 'Public', 'Restricted'
    doi VARCHAR(255) UNIQUE
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES profile_registry(id),
    model_name VARCHAR(255),
    architecture VARCHAR(150),
    parameters_count BIGINT,
    use_case TEXT,
    api_endpoint VARCHAR(255)
);

CREATE TABLE reputation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    score FLOAT DEFAULT 0.0,
    metrics JSONB, -- { "citations": 120, "reproducibility": 9.8 }
    last_calculated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_name VARCHAR(255),
    description TEXT,
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messaging_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id UUID,
    sender_id UUID REFERENCES profile_registry(id),
    content TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE conference_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conference_name VARCHAR(255),
    topic VARCHAR(150),
    start_date DATE,
    end_date DATE,
    location VARCHAR(150),
    is_virtual BOOLEAN
);

CREATE TABLE grant_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    funder_name VARCHAR(255),
    grant_title VARCHAR(255),
    amount NUMERIC,
    deadline DATE,
    requirements TEXT
);

CREATE TABLE mentorship_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mentor_id UUID REFERENCES profile_registry(id),
    mentee_id UUID REFERENCES profile_registry(id),
    topic VARCHAR(150),
    status VARCHAR(50), -- 'Active', 'Completed'
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE career_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    role_title VARCHAR(255),
    role_type VARCHAR(100), -- 'Postdoc', 'PI', 'Industry'
    description TEXT,
    posted_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notification_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    notification_type VARCHAR(100),
    content TEXT,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type VARCHAR(100),
    target_id UUID,
    value FLOAT,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_name VARCHAR(255),
    rules JSONB,
    enforced BOOLEAN DEFAULT true
);

CREATE TABLE ranking_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR(50), -- 'Profile', 'Model', 'Dataset'
    entity_id UUID,
    global_rank INT,
    category_rank INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE privacy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    settings JSONB, -- { "show_grants": false, "allow_messaging": true }
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expertise_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    skill_name VARCHAR(100),
    confidence_score FLOAT,
    evidence JSONB -- Linking to papers, repos, etc.
);

CREATE TABLE activity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profile_registry(id),
    action VARCHAR(100),
    resource_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE social_graph (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID REFERENCES profile_registry(id),
    target_id UUID REFERENCES profile_registry(id),
    edge_type VARCHAR(50), -- 'Co-author', 'Follows', 'Mentors'
    weight FLOAT DEFAULT 1.0,
    established_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
