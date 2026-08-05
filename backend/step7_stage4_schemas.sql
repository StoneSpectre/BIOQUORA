-- BIOQUORA STEP 7, STAGE 4: BioMemory (Long-Term AI Memory Architecture)
-- Defines the schema for persistent memory, provenance, timelines, and access control.

CREATE TABLE personal_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID,
    entity_type VARCHAR(100),
    entity_value JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_accessed TIMESTAMP
);

CREATE TABLE project_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID,
    milestones JSONB,
    project_state JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE institution_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    institution_id UUID,
    knowledge_domain VARCHAR(255),
    shared_assets JSONB,
    access_policy JSONB
);

CREATE TABLE laboratory_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lab_id UUID,
    protocol_history JSONB,
    equipment_logs JSONB
);

CREATE TABLE literature_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_or_project_id UUID,
    document_id UUID,
    reading_notes TEXT,
    synthesis_tags JSONB
);

CREATE TABLE dataset_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    lineage_hash VARCHAR(255),
    version_history JSONB
);

CREATE TABLE code_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    script_id UUID,
    execution_history JSONB,
    dependencies JSONB
);

CREATE TABLE graph_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_node_id UUID,
    knowledge_graph_node_id UUID,
    sync_status VARCHAR(50)
);

CREATE TABLE hypothesis_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    hypothesis_id UUID,
    revision_history JSONB,
    current_status VARCHAR(50), -- 'Active', 'Rejected', 'Validated'
    owner_id UUID
);

CREATE TABLE experiment_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    experiment_id UUID,
    observations JSONB,
    reproducibility_score FLOAT
);

CREATE TABLE agent_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID,
    mission_id UUID,
    agent_scratchpad JSONB
);

CREATE TABLE team_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id UUID,
    discussion_summaries JSONB,
    shared_decisions JSONB
);

CREATE TABLE education_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    learner_id UUID,
    competency_profile JSONB,
    learning_pathway JSONB
);

CREATE TABLE enterprise_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enterprise_id UUID,
    department_id UUID,
    knowledge_assets JSONB
);

CREATE TABLE citation_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_id UUID,
    citation_network_snapshot JSONB
);

CREATE TABLE timeline_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    event_timestamp TIMESTAMP,
    event_description TEXT,
    event_metadata JSONB
);

CREATE TABLE workflow_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workflow_id UUID,
    execution_traces JSONB,
    optimization_history JSONB
);

CREATE TABLE decision_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    decision_id UUID,
    rationale TEXT,
    alternatives_considered JSONB,
    decider_id UUID
);

CREATE TABLE governance_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID,
    retention_policy VARCHAR(100),
    encryption_key_ref VARCHAR(255),
    privacy_level VARCHAR(50) -- 'Private', 'Team', 'Public'
);

CREATE TABLE audit_memory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    memory_id UUID,
    action_type VARCHAR(50), -- 'Read', 'Write', 'Delete'
    actor_id UUID,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
