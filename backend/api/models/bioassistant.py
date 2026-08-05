from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class AssistantRegistry(Base):
    __tablename__ = 'assistant_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    assistant_name = Column(Text)
    active_status = Column(Boolean)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class UserProfileRegistry(Base):
    __tablename__ = 'user_profile_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    domain_expertise = Column(JSON)
    research_interests = Column(JSON)

class ResearchWorkspaceRegistry(Base):
    __tablename__ = 'research_workspace_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    workspace_name = Column(Text)
    active_context = Column(JSON)

class ProjectRegistry(Base):
    __tablename__ = 'project_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    project_title = Column(Text)
    milestones = Column(JSON)

class LiteratureWorkspaceRegistry(Base):
    __tablename__ = 'literature_workspace_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    saved_papers = Column(JSON)
    synthesized_summaries = Column(JSON)

class WritingRegistry(Base):
    __tablename__ = 'writing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    document_type = Column(Text)
    draft_content = Column(Text)
    latex_source = Column(Text)

class ProgrammingWorkspaceRegistry(Base):
    __tablename__ = 'programming_workspace_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    active_scripts = Column(JSON)
    execution_history = Column(JSON)

class StatisticsWorkspaceRegistry(Base):
    __tablename__ = 'statistics_workspace_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    analysis_plans = Column(JSON)
    generated_charts = Column(JSON)

class CollaborationRegistry(Base):
    __tablename__ = 'collaboration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    team_members = Column(JSON)
    shared_notes = Column(Text)

class MeetingRegistry(Base):
    __tablename__ = 'meeting_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    meeting_transcript = Column(Text)
    extracted_action_items = Column(JSON)

class LaboratoryRegistry(Base):
    __tablename__ = 'laboratory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    electronic_lab_notebook = Column(Text)
    protocol_steps = Column(JSON)

class FundingRegistry(Base):
    __tablename__ = 'funding_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    grant_deadlines = Column(JSON)
    proposal_drafts = Column(JSON)

class ConferenceRegistry(Base):
    __tablename__ = 'conference_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workspace_id = Column(PG_UUID(as_uuid=True))
    abstract_submissions = Column(JSON)
    poster_drafts = Column(JSON)

class PersonalizationRegistry(Base):
    __tablename__ = 'personalization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    writing_style_preferences = Column(JSON)
    coding_style_preferences = Column(JSON)

class MemoryPreferencesRegistry(Base):
    __tablename__ = 'memory_preferences_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    retained_facts = Column(JSON)
    forgotten_entities = Column(JSON)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    data_sharing_consents = Column(JSON)
    institutional_policies = Column(JSON)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    action_log = Column(JSON)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    session_duration_minutes = Column(Integer)
    api_calls_made = Column(Integer)

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    automated_tasks = Column(JSON)
    cron_schedules = Column(JSON)

class ProductivityRegistry(Base):
    __tablename__ = 'productivity_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    assistant_id = Column(PG_UUID(as_uuid=True))
    words_written = Column(Integer)
    lines_of_code_generated = Column(Integer)
