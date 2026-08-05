from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class ExecutiveRegistry(Base):
    __tablename__ = 'executive_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    objective_name = Column(Text)
    priority = Column(Text)
    status = Column(Text)

class MissionRegistry(Base):
    __tablename__ = 'mission_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    executive_id = Column(PG_UUID(as_uuid=True))
    mission_plan = Column(JSON)
    completion_percentage = Column(Float)

class CognitionRegistry(Base):
    __tablename__ = 'cognition_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cognitive_state = Column(Text)
    active_subsystems = Column(JSON)
    memory_context_id = Column(PG_UUID(as_uuid=True))

class CoordinationRegistry(Base):
    __tablename__ = 'coordination_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    coordinator_agent = Column(PG_UUID(as_uuid=True))
    status = Column(Text)

class ReasoningRegistry(Base):
    __tablename__ = 'reasoning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    task_id = Column(PG_UUID(as_uuid=True))
    reasoning_tree = Column(JSON)
    confidence_score = Column(Float)

class PlanningRegistry(Base):
    __tablename__ = 'planning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    horizon = Column(Text)
    plan_steps = Column(JSON)
    active_step = Column(Integer)

class LearningRegistry(Base):
    __tablename__ = 'learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    learning_objective = Column(Text)
    target_metric = Column(Text)
    improvement_delta = Column(Float)

class FederationRegistry(Base):
    __tablename__ = 'federation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    global_query_id = Column(PG_UUID(as_uuid=True))
    institutions_involved = Column(Integer)
    consensus_reached = Column(Boolean)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    decision_id = Column(PG_UUID(as_uuid=True))
    human_override = Column(Boolean)
    reviewer_id = Column(PG_UUID(as_uuid=True))

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    metric_name = Column(Text)
    value = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    subsystem_name = Column(Text)
    health_status = Column(Text)
    load_percentage = Column(Float)

class DecisionRegistry(Base):
    __tablename__ = 'decision_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    recommendation = Column(Text)
    evidence_links = Column(JSON)

class CollaborationRegistry(Base):
    __tablename__ = 'collaboration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    human_team_id = Column(PG_UUID(as_uuid=True))
    ai_team_id = Column(PG_UUID(as_uuid=True))
    interaction_log = Column(JSON)

class ResourceRegistry(Base):
    __tablename__ = 'resource_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    resource_type = Column(Text)
    allocation_percentage = Column(Float)
    priority = Column(Integer)

class ExecutionRegistry(Base):
    __tablename__ = 'execution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    plan_step_id = Column(PG_UUID(as_uuid=True))
    execution_status = Column(Text)
    result = Column(JSON)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    event_type = Column(Text)
    payload = Column(JSON)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cognitive_action = Column(Text)
    justification = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class EvolutionRegistry(Base):
    __tablename__ = 'evolution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    architecture_version = Column(Text)
    major_cognitive_leap = Column(Text)

class IntelligenceRegistry(Base):
    __tablename__ = 'intelligence_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    domain = Column(Text)
    capability_score = Column(Float)

class BioasiIndex(Base):
    __tablename__ = 'bioasi_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    active_missions = Column(Integer)
    global_intelligence_score = Column(Float)
