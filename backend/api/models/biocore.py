from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class KernelRegistry(Base):
    __tablename__ = 'kernel_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    kernel_version = Column(Text)
    uptime_seconds = Column(Integer)
    status = Column(Text)

class RoutingRegistry(Base):
    __tablename__ = 'routing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    request_id = Column(PG_UUID(as_uuid=True))
    source = Column(Text)
    target_subsystem = Column(Text)
    latency_ms = Column(Float)

class OrchestrationRegistry(Base):
    __tablename__ = 'orchestration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    process_id = Column(PG_UUID(as_uuid=True))
    parent_process_id = Column(PG_UUID(as_uuid=True))
    state = Column(Text)

class IntelligenceRegistry(Base):
    __tablename__ = 'intelligence_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    subsystem = Column(Text)
    active_instances = Column(Integer)
    health = Column(Text)

class KnowledgeRegistry(Base):
    __tablename__ = 'knowledge_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    global_nodes = Column(Integer)
    global_edges = Column(Integer)
    last_sync = Column(DateTime(timezone=True), server_default=func.now())

class ReasoningRegistry(Base):
    __tablename__ = 'reasoning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_id = Column(PG_UUID(as_uuid=True))
    reasoning_path = Column(JSON)
    verified = Column(Boolean)

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    subsystems_engaged = Column(JSON)
    completion_time = Column(DateTime(timezone=True), server_default=func.now())

class FederationRegistry(Base):
    __tablename__ = 'federation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    active_institutions = Column(Integer)
    cross_node_queries = Column(Integer)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    policy_id = Column(PG_UUID(as_uuid=True))
    enforcement_level = Column(Text)
    violations = Column(Integer)

class InfrastructureRegistry(Base):
    __tablename__ = 'infrastructure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    compute_cluster = Column(Text)
    utilization_percent = Column(Float)
    status = Column(Text)

class CollaborationRegistry(Base):
    __tablename__ = 'collaboration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    participants = Column(JSON)
    active = Column(Boolean)

class EnterpriseRegistry(Base):
    __tablename__ = 'enterprise_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(PG_UUID(as_uuid=True))
    license_tier = Column(Text)
    active_users = Column(Integer)

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    metric_name = Column(Text)
    value = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    daily_active_users = Column(Integer)
    total_api_calls = Column(Integer)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    action = Column(Text)
    user_id = Column(PG_UUID(as_uuid=True))
    ip_address = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class LearningRegistry(Base):
    __tablename__ = 'learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cycle_id = Column(PG_UUID(as_uuid=True))
    accuracy_delta = Column(Float)
    approved = Column(Boolean)

class VersionRegistry(Base):
    __tablename__ = 'version_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    component = Column(Text)
    version = Column(Text)
    release_date = Column(DateTime(timezone=True), server_default=func.now())

class PlatformRegistry(Base):
    __tablename__ = 'platform_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    setting_name = Column(Text)
    setting_value = Column(JSON)

class CivilizationRegistry(Base):
    __tablename__ = 'civilization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    epoch = Column(Text)
    major_discoveries = Column(JSON)
    archived = Column(Boolean)

class BiocoreIndex(Base):
    __tablename__ = 'biocore_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_requests_processed = Column(Integer)
    system_health_score = Column(Float)
