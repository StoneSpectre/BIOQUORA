from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class PersonalMemoryRegistry(Base):
    __tablename__ = 'personal_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    entity_type = Column(Text)
    entity_value = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    last_accessed = Column(DateTime(timezone=True), server_default=func.now())

class ProjectMemoryRegistry(Base):
    __tablename__ = 'project_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    project_id = Column(PG_UUID(as_uuid=True))
    milestones = Column(JSON)
    project_state = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class InstitutionMemoryRegistry(Base):
    __tablename__ = 'institution_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    institution_id = Column(PG_UUID(as_uuid=True))
    knowledge_domain = Column(Text)
    shared_assets = Column(JSON)
    access_policy = Column(JSON)

class LaboratoryMemoryRegistry(Base):
    __tablename__ = 'laboratory_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    lab_id = Column(PG_UUID(as_uuid=True))
    protocol_history = Column(JSON)
    equipment_logs = Column(JSON)

class LiteratureMemoryRegistry(Base):
    __tablename__ = 'literature_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_or_project_id = Column(PG_UUID(as_uuid=True))
    document_id = Column(PG_UUID(as_uuid=True))
    reading_notes = Column(Text)
    synthesis_tags = Column(JSON)

class DatasetMemoryRegistry(Base):
    __tablename__ = 'dataset_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    lineage_hash = Column(Text)
    version_history = Column(JSON)

class CodeMemoryRegistry(Base):
    __tablename__ = 'code_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    script_id = Column(PG_UUID(as_uuid=True))
    execution_history = Column(JSON)
    dependencies = Column(JSON)

class GraphMemoryRegistry(Base):
    __tablename__ = 'graph_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    memory_node_id = Column(PG_UUID(as_uuid=True))
    knowledge_graph_node_id = Column(PG_UUID(as_uuid=True))
    sync_status = Column(Text)

class HypothesisMemoryRegistry(Base):
    __tablename__ = 'hypothesis_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    hypothesis_id = Column(PG_UUID(as_uuid=True))
    revision_history = Column(JSON)
    current_status = Column(Text)
    owner_id = Column(PG_UUID(as_uuid=True))

class ExperimentMemoryRegistry(Base):
    __tablename__ = 'experiment_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    experiment_id = Column(PG_UUID(as_uuid=True))
    observations = Column(JSON)
    reproducibility_score = Column(Float)

class AgentMemoryRegistry(Base):
    __tablename__ = 'agent_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    mission_id = Column(PG_UUID(as_uuid=True))
    agent_scratchpad = Column(JSON)

class TeamMemoryRegistry(Base):
    __tablename__ = 'team_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    team_id = Column(PG_UUID(as_uuid=True))
    discussion_summaries = Column(JSON)
    shared_decisions = Column(JSON)

class EducationMemoryRegistry(Base):
    __tablename__ = 'education_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    learner_id = Column(PG_UUID(as_uuid=True))
    competency_profile = Column(JSON)
    learning_pathway = Column(JSON)

class EnterpriseMemoryRegistry(Base):
    __tablename__ = 'enterprise_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    enterprise_id = Column(PG_UUID(as_uuid=True))
    department_id = Column(PG_UUID(as_uuid=True))
    knowledge_assets = Column(JSON)

class CitationMemoryRegistry(Base):
    __tablename__ = 'citation_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_id = Column(PG_UUID(as_uuid=True))
    citation_network_snapshot = Column(JSON)

class TimelineMemoryRegistry(Base):
    __tablename__ = 'timeline_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    entity_id = Column(PG_UUID(as_uuid=True))
    event_timestamp = Column(DateTime(timezone=True), server_default=func.now())
    event_description = Column(Text)
    event_metadata = Column(JSON)

class WorkflowMemoryRegistry(Base):
    __tablename__ = 'workflow_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    execution_traces = Column(JSON)
    optimization_history = Column(JSON)

class DecisionMemoryRegistry(Base):
    __tablename__ = 'decision_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    decision_id = Column(PG_UUID(as_uuid=True))
    rationale = Column(Text)
    alternatives_considered = Column(JSON)
    decider_id = Column(PG_UUID(as_uuid=True))

class GovernanceMemoryRegistry(Base):
    __tablename__ = 'governance_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    memory_id = Column(PG_UUID(as_uuid=True))
    retention_policy = Column(Text)
    encryption_key_ref = Column(Text)
    privacy_level = Column(Text)

class AuditMemoryRegistry(Base):
    __tablename__ = 'audit_memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    memory_id = Column(PG_UUID(as_uuid=True))
    action_type = Column(Text)
    actor_id = Column(PG_UUID(as_uuid=True))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
