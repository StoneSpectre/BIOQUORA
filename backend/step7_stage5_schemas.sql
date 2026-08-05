-- BIOQUORA STEP 7, STAGE 5: BioRetriever (Advanced Knowledge Retrieval Engine)
-- Defines the schema for hybrid knowledge retrieval, evidence ranking, and provenance mapping.

CREATE TABLE retrieval_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT,
    intent_classification VARCHAR(100),
    retrieval_strategy JSONB,
    execution_time_ms INT
);

CREATE TABLE semantic_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_chunk_id UUID,
    embedding vector(1536),
    metadata JSONB
);

CREATE TABLE vector_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    entity_type VARCHAR(50), -- 'Gene', 'Disease', 'Drug'
    embedding vector(1536)
);

CREATE TABLE graph_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id UUID,
    subgraph_hash VARCHAR(255),
    graph_context TEXT
);

CREATE TABLE citation_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID,
    cited_by_count INT,
    citation_network_context JSONB
);

CREATE TABLE ontology_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    term_id VARCHAR(100), -- 'MeSH:D009369'
    synonyms JSONB,
    semantic_type VARCHAR(100)
);

CREATE TABLE dataset_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    domain_tags JSONB,
    usability_score FLOAT
);

CREATE TABLE software_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    repo_url VARCHAR(255),
    tool_type VARCHAR(100),
    language VARCHAR(50)
);

CREATE TABLE protocol_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protocol_id UUID,
    methodology_tags JSONB,
    reproducibility_rating FLOAT
);

CREATE TABLE model_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_name VARCHAR(100),
    architecture VARCHAR(50),
    performance_metrics JSONB
);

CREATE TABLE education_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID,
    difficulty_level VARCHAR(50),
    competency_tags JSONB
);

CREATE TABLE molecular_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    compound_id VARCHAR(100),
    smiles_string TEXT,
    fingerprint vector(1024)
);

CREATE TABLE protein_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    uniprot_id VARCHAR(50),
    sequence TEXT,
    family_domains JSONB
);

CREATE TABLE genomic_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    locus VARCHAR(100),
    variant_type VARCHAR(50),
    clinical_significance VARCHAR(100)
);

CREATE TABLE clinical_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trial_id VARCHAR(50),
    phase VARCHAR(20),
    conditions JSONB
);

CREATE TABLE multimodal_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    modality VARCHAR(50), -- 'Image', 'Audio', 'Slide'
    embedding vector(1536)
);

CREATE TABLE evidence_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_id UUID,
    supporting_documents JSONB,
    contradicting_documents JSONB
);

CREATE TABLE ranking_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    retrieval_id UUID,
    document_id UUID,
    ranking_score FLOAT,
    ranking_justification JSONB
);

CREATE TABLE provenance_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    knowledge_node_id UUID,
    source_attribution JSONB,
    trust_score FLOAT
);

CREATE TABLE indexing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_name VARCHAR(100),
    last_indexed_at TIMESTAMP,
    documents_processed INT,
    status VARCHAR(50)
);
