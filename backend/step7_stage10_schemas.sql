-- BIOQUORA STEP 7, STAGE 10: BioAssistant
-- Defines the schema for the personal AI biomedical research assistant.

CREATE TABLE assistant_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    assistant_name VARCHAR(100),
    active_status BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profile_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    domain_expertise JSONB,
    research_interests JSONB
);

CREATE TABLE research_workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    workspace_name VARCHAR(255),
    active_context JSONB
);

CREATE TABLE project_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    project_title VARCHAR(255),
    milestones JSONB
);

CREATE TABLE literature_workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    saved_papers JSONB,
    synthesized_summaries JSONB
);

CREATE TABLE writing_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    document_type VARCHAR(50), -- 'Manuscript', 'Grant', 'Report'
    draft_content TEXT,
    latex_source TEXT
);

CREATE TABLE programming_workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    active_scripts JSONB,
    execution_history JSONB
);

CREATE TABLE statistics_workspace_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    analysis_plans JSONB,
    generated_charts JSONB
);

CREATE TABLE collaboration_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    team_members JSONB,
    shared_notes TEXT
);

CREATE TABLE meeting_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    meeting_transcript TEXT,
    extracted_action_items JSONB
);

CREATE TABLE laboratory_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    electronic_lab_notebook TEXT,
    protocol_steps JSONB
);

CREATE TABLE funding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    grant_deadlines JSONB,
    proposal_drafts JSONB
);

CREATE TABLE conference_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID,
    abstract_submissions JSONB,
    poster_drafts JSONB
);

CREATE TABLE personalization_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    writing_style_preferences JSONB,
    coding_style_preferences JSONB
);

CREATE TABLE memory_preferences_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    retained_facts JSONB,
    forgotten_entities JSONB
);

CREATE TABLE governance_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    data_sharing_consents JSONB,
    institutional_policies JSONB
);

CREATE TABLE audit_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    action_log JSONB,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    session_duration_minutes INT,
    api_calls_made INT
);

CREATE TABLE workflow_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    automated_tasks JSONB,
    cron_schedules JSONB
);

CREATE TABLE productivity_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assistant_id UUID,
    words_written INT,
    lines_of_code_generated INT
);
