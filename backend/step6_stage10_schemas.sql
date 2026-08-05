-- BIOQUORA STEP 6, STAGE 10: BioKnowledge (Global Biomedical Knowledge Network)
-- Defines the schema for the knowledge graph, ontologies, and evidence extraction.

CREATE TABLE literature_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pmid VARCHAR(50),
    doi VARCHAR(100),
    title TEXT NOT NULL,
    abstract TEXT,
    publication_date DATE,
    journal VARCHAR(255)
);

CREATE TABLE ontology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_name VARCHAR(100) NOT NULL, -- 'GO', 'MeSH', 'UMLS'
    version VARCHAR(50),
    source_url VARCHAR(500),
    last_synced TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE entity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ontology_id VARCHAR(100), -- e.g., 'GO:0006915'
    entity_type VARCHAR(50), -- 'Gene', 'Disease', 'Compound'
    name VARCHAR(255),
    description TEXT
);

CREATE TABLE relationship_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_entity_id UUID,
    target_entity_id UUID,
    predicate VARCHAR(100), -- 'inhibits', 'associated_with', 'expressed_in'
    weight FLOAT DEFAULT 1.0
);

CREATE TABLE evidence_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    relationship_id UUID,
    publication_id UUID,
    evidence_type VARCHAR(50), -- 'experimental', 'computational', 'curated'
    confidence_score FLOAT,
    extracted_text TEXT
);

CREATE TABLE graph_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subgraph_name VARCHAR(255),
    node_count BIGINT,
    edge_count BIGINT,
    last_computed TIMESTAMP
);

CREATE TABLE citation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    citing_publication_id UUID,
    cited_publication_id UUID,
    context TEXT
);

CREATE TABLE publication_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID,
    title VARCHAR(500),
    status VARCHAR(50) -- 'draft', 'published', 'retracted'
);

CREATE TABLE recommendation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    recommended_entity_id UUID,
    entity_type VARCHAR(50), -- 'Publication', 'Dataset', 'Researcher'
    score FLOAT
);

CREATE TABLE reasoning_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query TEXT,
    inferred_path JSONB,
    confidence FLOAT,
    agent_id UUID
);

CREATE TABLE workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    saved_entities JSONB,
    reading_list JSONB
);

CREATE TABLE analytics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_name VARCHAR(100),
    value FLOAT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_type VARCHAR(100),
    rules JSONB,
    enforcement_status VARCHAR(50)
);

CREATE TABLE standards_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    standard_name VARCHAR(100), -- 'RDF', 'JSON-LD', 'OWL'
    schema_url VARCHAR(500)
);

CREATE TABLE federation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_name VARCHAR(255),
    endpoint_url VARCHAR(500),
    sync_status VARCHAR(50)
);

CREATE TABLE monitoring_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_name VARCHAR(100),
    status VARCHAR(50),
    latency_ms INT
);

CREATE TABLE synchronization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100), -- 'PubMed', 'Reactome'
    last_sync_timestamp TIMESTAMP,
    records_processed BIGINT
);

CREATE TABLE annotation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    user_id UUID,
    annotation_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE provenance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    record_id UUID,
    source_system VARCHAR(100),
    transformation_history JSONB
);

CREATE TABLE semantic_index_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    embedding_vector JSONB, -- Stored as JSON array for mock purposes, would be pgvector in prod
    model_version VARCHAR(50)
);
