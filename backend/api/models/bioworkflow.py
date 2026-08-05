from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_name = Column(Text)
    domain = Column(Text)
    status = Column(Text)

class WorkflowTemplateRegistry(Base):
    __tablename__ = 'workflow_template_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    template_name = Column(Text)
    structure = Column(JSON)
    version = Column(Text)

class ExecutionRegistry(Base):
    __tablename__ = 'execution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    start_time = Column(DateTime(timezone=True), server_default=func.now())
    end_time = Column(DateTime(timezone=True), server_default=func.now())
    success = Column(Boolean)

class DependencyRegistry(Base):
    __tablename__ = 'dependency_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    parent_task_id = Column(PG_UUID(as_uuid=True))
    child_task_id = Column(PG_UUID(as_uuid=True))

class SchedulerRegistry(Base):
    __tablename__ = 'scheduler_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    task_id = Column(PG_UUID(as_uuid=True))
    scheduled_time = Column(DateTime(timezone=True), server_default=func.now())
    priority = Column(Integer)

class ExperimentRegistry(Base):
    __tablename__ = 'experiment_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    experiment_design = Column(JSON)
    approval_status = Column(Text)

class LiteratureRegistry(Base):
    __tablename__ = 'literature_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    search_queries = Column(JSON)
    extracted_papers = Column(Integer)

class ProgrammingRegistry(Base):
    __tablename__ = 'programming_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    repo_url = Column(Text)
    commit_hash = Column(Text)

class SimulationRegistry(Base):
    __tablename__ = 'simulation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    simulation_type = Column(Text)
    status = Column(Text)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    validator_node = Column(PG_UUID(as_uuid=True))
    passed = Column(Boolean)

class PublicationRegistry(Base):
    __tablename__ = 'publication_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    manuscript_draft = Column(Text)
    target_journal = Column(Text)

class CollaborationRegistry(Base):
    __tablename__ = 'collaboration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    team_members = Column(JSON)
    comments = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    reviewer_id = Column(PG_UUID(as_uuid=True))
    decision = Column(Text)

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    cpu_usage = Column(Float)
    memory_usage = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    event_log = Column(JSON)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    action = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class MilestoneRegistry(Base):
    __tablename__ = 'milestone_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    milestone_name = Column(Text)
    achieved = Column(Boolean)

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    total_cost = Column(Float)
    duration_hours = Column(Float)

class OptimizationRegistry(Base):
    __tablename__ = 'optimization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    bottleneck_identified = Column(Text)
    recommendation = Column(Text)

class BioworkflowIndex(Base):
    __tablename__ = 'bioworkflow_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_active_workflows = Column(Integer)
    global_success_rate = Column(Float)
