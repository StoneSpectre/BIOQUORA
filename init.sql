-- ==========================================
# Bioquora BioDOS Production Database Schema
# Connect to core catalog and establish tables
# ==========================================
\c biodos_catalog;

-- ==========================================
-- 1. ONTOLOGY & SCHEMA REGISTRY (Chapter 4)
-- ==========================================
CREATE TABLE IF NOT EXISTS ontology_registry (
    ontology_id VARCHAR(64) PRIMARY KEY, -- e.g., 'DOID', 'HPO', 'GO', 'MONDO'
    version VARCHAR(64) NOT NULL,
    authority VARCHAR(128) NOT NULL,
    download_url TEXT,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    CONSTRAINT uq_ontology_registry_version UNIQUE(ontology_id, version)
);

CREATE TABLE IF NOT EXISTS entity_schema_registry (
    schema_id VARCHAR(128) PRIMARY KEY,  -- e.g., 'urn:bioquora:schema:term:v1'
    version INT NOT NULL,
    schema_type VARCHAR(32) NOT NULL,    -- 'AVRO', 'PROTOBUF', 'JSON'
    schema_definition JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ==========================================
-- 2. DETERMINISTIC IDENTITY RESOLUTION (DIRE)
-- ==========================================
CREATE TABLE IF NOT EXISTS global_identity_map (
    bioquora_urn VARCHAR(256) PRIMARY KEY, -- e.g., 'urn:bioquora:gene:hgnc:11998'
    entity_type VARCHAR(64) NOT NULL,      -- 'GENE', 'DISEASE', 'DRUG'
    primary_label VARCHAR(512) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_verified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS external_id_crosswalk (
    bioquora_urn VARCHAR(256) REFERENCES global_identity_map(bioquora_urn) ON DELETE CASCADE,
    source_authority VARCHAR(64) NOT NULL, -- 'Ensembl', 'NCBI', 'UniProt', 'DOID'
    external_accession VARCHAR(128) NOT NULL,
    match_precision VARCHAR(32) DEFAULT 'EXACT', -- 'EXACT', 'NARROW', 'BROAD'
    PRIMARY KEY (source_authority, external_accession)
);

CREATE INDEX IF NOT EXISTS idx_crosswalk_urn ON external_id_crosswalk(bioquora_urn);

-- ==========================================
-- 3. W3C PROV-O PROVENANCE LEDGER (Chapter 13)
-- ==========================================
CREATE TABLE IF NOT EXISTS provenance_activities (
    activity_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    activity_type VARCHAR(64) NOT NULL,    -- 'OBO_INGESTION', 'EMBEDDING_GEN'
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE,
    executed_by VARCHAR(128) NOT NULL,     -- e.g., 'pipeline:biodos-stage-3'
    execution_context JSONB
);

CREATE TABLE IF NOT EXISTS provenance_entities (
    entity_id VARCHAR(256) PRIMARY KEY,    -- URI or S3 path
    entity_type VARCHAR(64) NOT NULL,      -- 'OBO_FILE', 'VECTOR_INDEX', 'RELATION'
    generated_by_activity UUID REFERENCES provenance_activities(activity_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    checksum_sha256 VARCHAR(64)
);

CREATE TABLE IF NOT EXISTS provenance_derivation_graph (
    derived_entity_id VARCHAR(256) REFERENCES provenance_entities(entity_id) ON DELETE CASCADE,
    source_entity_id VARCHAR(256) REFERENCES provenance_entities(entity_id) ON DELETE CASCADE,
    derivation_type VARCHAR(64) NOT NULL,  -- 'wasDerivedFrom', 'wasRevisionOf'
    activity_id UUID REFERENCES provenance_activities(activity_id) ON DELETE SET NULL,
    PRIMARY KEY (derived_entity_id, source_entity_id, derivation_type)
);

CREATE INDEX IF NOT EXISTS idx_prov_source ON provenance_derivation_graph(source_entity_id);
