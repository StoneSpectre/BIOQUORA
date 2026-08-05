from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class InferenceRegistry(Base):
    __tablename__ = 'inference_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    request_id = Column(PG_UUID(as_uuid=True))
    assigned_model_id = Column(Text)
    status = Column(Text)
    latency_ms = Column(Integer)

class ModelRegistry(Base):
    __tablename__ = 'model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_name = Column(Text)
    version = Column(Text)
    hardware_requirements = Column(JSON)

class DeploymentRegistry(Base):
    __tablename__ = 'deployment_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    deployment_zone = Column(Text)
    replica_count = Column(Integer)

class GpuRegistry(Base):
    __tablename__ = 'gpu_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(Text)
    gpu_type = Column(Text)
    vram_total_gb = Column(Integer)
    vram_used_gb = Column(Float)

class CpuRegistry(Base):
    __tablename__ = 'cpu_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(Text)
    core_count = Column(Integer)
    cpu_utilization = Column(Float)

class EdgeRegistry(Base):
    __tablename__ = 'edge_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    device_id = Column(Text)
    location = Column(Text)
    supported_models = Column(JSON)

class CloudRegistry(Base):
    __tablename__ = 'cloud_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    provider = Column(Text)
    region = Column(Text)
    active_instances = Column(Integer)

class WorkloadRegistry(Base):
    __tablename__ = 'workload_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workload_type = Column(Text)
    priority_level = Column(Integer)
    payload_size_bytes = Column(Integer)

class RoutingRegistry(Base):
    __tablename__ = 'routing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    request_id = Column(PG_UUID(as_uuid=True))
    source_ip = Column(Text)
    destination_node = Column(Text)
    routing_reason = Column(Text)

class OptimizationRegistry(Base):
    __tablename__ = 'optimization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    quantization_level = Column(Text)
    tensorrt_enabled = Column(Boolean)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(Text)
    temperature_c = Column(Float)
    power_draw_w = Column(Float)

class LatencyRegistry(Base):
    __tablename__ = 'latency_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    p50_latency_ms = Column(Float)
    p99_latency_ms = Column(Float)

class ThroughputRegistry(Base):
    __tablename__ = 'throughput_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    tokens_per_second = Column(Float)
    requests_per_second = Column(Float)

class SecurityRegistry(Base):
    __tablename__ = 'security_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    request_id = Column(PG_UUID(as_uuid=True))
    encryption_status = Column(Text)
    anomaly_detected = Column(Boolean)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    approved_by = Column(PG_UUID(as_uuid=True))
    compliance_tags = Column(JSON)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    request_id = Column(PG_UUID(as_uuid=True))
    user_id = Column(PG_UUID(as_uuid=True))
    action_taken = Column(Text)

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    throughput_score = Column(Float)
    latency_score = Column(Float)

class SessionRegistry(Base):
    __tablename__ = 'session_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    active_node = Column(Text)
    context_window_used = Column(Integer)

class PipelineRegistry(Base):
    __tablename__ = 'pipeline_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    pipeline_id = Column(PG_UUID(as_uuid=True))
    stage_execution_times = Column(JSON)

class InfrastructureIndex(Base):
    __tablename__ = 'infrastructure_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cluster_id = Column(Text)
    overall_health_score = Column(Float)
    active_alerts = Column(JSON)
