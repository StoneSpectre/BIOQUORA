from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class LearningRegistry(Base):
    __tablename__ = 'learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    learning_cycle_id = Column(PG_UUID(as_uuid=True))
    status = Column(Text)
    start_time = Column(DateTime(timezone=True), server_default=func.now())

class LiteratureLearningRegistry(Base):
    __tablename__ = 'literature_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    paper_id = Column(Text)
    knowledge_extracted = Column(JSON)
    validation_status = Column(Text)

class GraphLearningRegistry(Base):
    __tablename__ = 'graph_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    new_edge_id = Column(PG_UUID(as_uuid=True))
    confidence_score = Column(Float)
    evidence_sources = Column(JSON)

class DatasetLearningRegistry(Base):
    __tablename__ = 'dataset_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    new_records_added = Column(Integer)
    data_drift_score = Column(Float)

class OntologyLearningRegistry(Base):
    __tablename__ = 'ontology_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    ontology_name = Column(Text)
    new_terms_proposed = Column(Integer)
    approved_terms = Column(Integer)

class ModelLearningRegistry(Base):
    __tablename__ = 'model_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    fine_tuning_run_id = Column(PG_UUID(as_uuid=True))
    improvement_delta = Column(Float)

class ReasoningLearningRegistry(Base):
    __tablename__ = 'reasoning_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_path_id = Column(PG_UUID(as_uuid=True))
    success_rate_before = Column(Float)
    success_rate_after = Column(Float)

class AgentLearningRegistry(Base):
    __tablename__ = 'agent_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    new_skill_acquired = Column(Text)
    performance_boost = Column(Float)

class WorkflowLearningRegistry(Base):
    __tablename__ = 'workflow_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_template_id = Column(PG_UUID(as_uuid=True))
    optimization_applied = Column(Text)
    time_saved_seconds = Column(Integer)

class BenchmarkLearningRegistry(Base):
    __tablename__ = 'benchmark_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    benchmark_id = Column(PG_UUID(as_uuid=True))
    previous_score = Column(Float)
    new_score = Column(Float)

class FeedbackRegistry(Base):
    __tablename__ = 'feedback_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    model_response_id = Column(PG_UUID(as_uuid=True))
    correction_provided = Column(Text)
    incorporated = Column(Boolean)

class ExpertReviewRegistry(Base):
    __tablename__ = 'expert_review_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    review_id = Column(PG_UUID(as_uuid=True))
    expert_id = Column(PG_UUID(as_uuid=True))
    decision = Column(Text)
    comments = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    learning_update_id = Column(PG_UUID(as_uuid=True))
    approved_by = Column(PG_UUID(as_uuid=True))
    rollback_available = Column(Boolean)

class EvolutionRegistry(Base):
    __tablename__ = 'evolution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    platform_version = Column(Text)
    major_capabilities_added = Column(JSON)
    deployment_date = Column(DateTime(timezone=True), server_default=func.now())

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    learning_module = Column(Text)
    compute_hours_used = Column(Float)
    cost_usd = Column(Float)

class VersionRegistry(Base):
    __tablename__ = 'version_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    component_name = Column(Text)
    current_version = Column(Text)
    previous_version = Column(Text)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    action = Column(Text)
    actor = Column(PG_UUID(as_uuid=True))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class OptimizationRegistry(Base):
    __tablename__ = 'optimization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    target_metric = Column(Text)
    optimization_strategy = Column(Text)
    gain_percent = Column(Float)

class AdaptiveRegistry(Base):
    __tablename__ = 'adaptive_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dynamic_routing_rule = Column(Text)
    trigger_condition = Column(Text)
    active = Column(Boolean)

class BiolearningIndex(Base):
    __tablename__ = 'biolearning_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_learning_cycles = Column(Integer)
    global_intelligence_delta = Column(Float)
