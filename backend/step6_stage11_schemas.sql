-- BIOQUORA STEP 6, STAGE 11: BioSearch (AI Scientific Search Engine)
-- Defines the schema for hybrid retrieval, embeddings, and personalized search.

CREATE TABLE search_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(50), -- 'Publication', 'Dataset', 'Gene'
    searchable_text TEXT,
    last_indexed TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE embedding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    model_version VARCHAR(50),
    dimension INT
);

CREATE TABLE vector_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    embedding_id UUID,
    vector_data JSONB, -- Stored as JSON array for mock purposes, would be pgvector
    metadata JSONB
);

CREATE TABLE retrieval_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT,
    intent_classification VARCHAR(100),
    retrieved_entities JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ranking_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    entity_id UUID,
    base_score FLOAT,
    evidence_score FLOAT,
    final_rank INT
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID,
    target_id UUID,
    citation_context TEXT,
    sentiment VARCHAR(50) -- 'Supporting', 'Contradicting', 'Mentioning'
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_text TEXT,
    supporting_sources JSONB,
    confidence_score FLOAT
);

CREATE TABLE personalization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    interest_vector JSONB,
    recent_searches JSONB
);

CREATE TABLE workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    saved_searches JSONB,
    pinned_evidence JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100), -- 'Latency', 'Click-Through', 'Zero-Result'
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(100),
    status VARCHAR(50),
    uptime_seconds BIGINT
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_url VARCHAR(500),
    institution_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE graph_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_id UUID,
    traversed_path JSONB,
    path_score FLOAT
);

CREATE TABLE recommendation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    recommended_query TEXT,
    reason TEXT
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    benchmark_name VARCHAR(100),
    precision_score FLOAT,
    recall_score FLOAT,
    f1_score FLOAT
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(100), -- 'OpenSearch', 'SPARQL'
    endpoint_url VARCHAR(500)
);

CREATE TABLE cache_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_hash VARCHAR(255),
    cached_response JSONB,
    expires_at TIMESTAMP
);

CREATE TABLE provenance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID,
    source_system VARCHAR(100),
    extraction_date TIMESTAMP
);

CREATE TABLE api_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID,
    endpoint_called VARCHAR(255),
    latency_ms INT
);

CREATE TABLE session_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    session_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    conversation_history JSONB
);
