-- BIOQUORA STEP 6, STAGE 14: BioPublish (Scientific Publishing Ecosystem)
-- Defines the schema for Living Publications, datasets, reviews, and archiving.

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(500),
    doi VARCHAR(100) UNIQUE,
    authors JSONB,
    status VARCHAR(50), -- 'draft', 'in_review', 'published', 'retracted'
    published_at TIMESTAMP
);

CREATE TABLE manuscript_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    content_format VARCHAR(50), -- 'markdown', 'xml', 'jupyter_notebook'
    content TEXT,
    last_edited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE review_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    reviewer_id UUID,
    review_content TEXT,
    decision VARCHAR(50), -- 'accept', 'minor_revision', 'reject'
    is_public BOOLEAN DEFAULT FALSE,
    submitted_at TIMESTAMP
);

CREATE TABLE editorial_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    editor_id UUID,
    editorial_decision VARCHAR(50),
    decision_notes TEXT
);

CREATE TABLE dataset_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    dataset_name VARCHAR(255),
    storage_url VARCHAR(500),
    size_bytes BIGINT,
    fair_score FLOAT
);

CREATE TABLE software_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    repository_url VARCHAR(500),
    version VARCHAR(50),
    license VARCHAR(50)
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    workflow_type VARCHAR(100), -- 'biolab_pipeline', 'jupyter_notebook'
    execution_environment JSONB
);

CREATE TABLE model_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    model_name VARCHAR(255),
    weights_url VARCHAR(500),
    architecture JSONB
);

CREATE TABLE metadata_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID, -- References publication, dataset, or model
    asset_type VARCHAR(50),
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE archive_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    archive_url VARCHAR(500),
    preservation_status VARCHAR(50), -- 'archived', 'pending', 'verified'
    archived_at TIMESTAMP
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citing_publication_id UUID,
    cited_publication_id UUID,
    citation_context TEXT
);

CREATE TABLE integrity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    check_type VARCHAR(100), -- 'plagiarism', 'image_manipulation'
    result VARCHAR(50),
    flagged BOOLEAN DEFAULT FALSE
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    views INT DEFAULT 0,
    downloads INT DEFAULT 0,
    citations INT DEFAULT 0,
    altmetric_score FLOAT
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_type VARCHAR(100), -- 'open_access', 'embargo'
    rules JSONB
);

CREATE TABLE community_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    commenter_id UUID,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE recommendation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    target_user_id UUID,
    recommended_publication_id UUID,
    score FLOAT
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    schema_version VARCHAR(50), -- 'JATS 1.3'
    validation_status BOOLEAN
);

CREATE TABLE version_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID,
    version_number INT,
    snapshot_url VARCHAR(500),
    created_at TIMESTAMP
);

CREATE TABLE portfolio_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    total_publications INT,
    h_index INT,
    total_citations INT
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    repository_endpoint VARCHAR(500),
    sync_status VARCHAR(50)
);
