from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class FederationRegistry(Base):
    __tablename__ = 'federation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    federation_name = Column(Text)
    status = Column(Text)
    established_date = Column(DateTime(timezone=True), server_default=func.now())

class InstitutionRegistry(Base):
    __tablename__ = 'institution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    institution_name = Column(Text)
    country = Column(Text)
    domain_type = Column(Text)

class NodeRegistry(Base):
    __tablename__ = 'node_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    institution_id = Column(PG_UUID(as_uuid=True))
    node_ip = Column(Text)
    status = Column(Text)

class IdentityRegistry(Base):
    __tablename__ = 'identity_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    institution_id = Column(PG_UUID(as_uuid=True))
    auth_protocol = Column(Text)
    issuer_url = Column(Text)

class PolicyRegistry(Base):
    __tablename__ = 'policy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(PG_UUID(as_uuid=True))
    data_sharing_level = Column(Text)
    compute_sharing_level = Column(Text)

class SynchronizationRegistry(Base):
    __tablename__ = 'synchronization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(PG_UUID(as_uuid=True))
    last_sync = Column(DateTime(timezone=True), server_default=func.now())
    bytes_transferred = Column(Integer)

class CollaborationRegistry(Base):
    __tablename__ = 'collaboration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    project_name = Column(Text)
    participating_institutions = Column(JSON)
    status = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agreement_id = Column(PG_UUID(as_uuid=True))
    approved_by = Column(PG_UUID(as_uuid=True))
    approval_date = Column(DateTime(timezone=True), server_default=func.now())

class PrivacyRegistry(Base):
    __tablename__ = 'privacy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(PG_UUID(as_uuid=True))
    anonymization_protocol = Column(Text)
    differential_privacy_epsilon = Column(Float)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    action = Column(Text)
    actor = Column(PG_UUID(as_uuid=True))
    node_id = Column(PG_UUID(as_uuid=True))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class KnowledgeExchangeRegistry(Base):
    __tablename__ = 'knowledge_exchange_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_node = Column(PG_UUID(as_uuid=True))
    target_node = Column(PG_UUID(as_uuid=True))
    graph_subgraph_id = Column(PG_UUID(as_uuid=True))
    approved = Column(Boolean)

class RetrievalRegistry(Base):
    __tablename__ = 'retrieval_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_id = Column(PG_UUID(as_uuid=True))
    nodes_queried = Column(JSON)
    results_aggregated = Column(Integer)

class ReasoningRegistry(Base):
    __tablename__ = 'reasoning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    federated_task_id = Column(PG_UUID(as_uuid=True))
    consensus_score = Column(Float)
    participating_engines = Column(JSON)

class EvaluationRegistry(Base):
    __tablename__ = 'evaluation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    benchmark_id = Column(PG_UUID(as_uuid=True))
    global_average_score = Column(Float)
    nodes_participated = Column(Integer)

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(PG_UUID(as_uuid=True))
    uptime_percentage = Column(Float)
    latency_ms = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    federation_event = Column(Text)
    event_data = Column(JSON)

class InfrastructureRegistry(Base):
    __tablename__ = 'infrastructure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cloud_provider = Column(Text)
    region = Column(Text)
    active_nodes = Column(Integer)

class AgreementRegistry(Base):
    __tablename__ = 'agreement_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    institution_a = Column(PG_UUID(as_uuid=True))
    institution_b = Column(PG_UUID(as_uuid=True))
    terms = Column(Text)
    signed_date = Column(DateTime(timezone=True), server_default=func.now())

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    global_compute_hours = Column(Float)
    total_queries_served = Column(Integer)

class BiofederatedIndex(Base):
    __tablename__ = 'biofederated_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_institutions = Column(Integer)
    total_nodes = Column(Integer)
