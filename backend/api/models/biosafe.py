from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class IdentityRegistry(Base):
    __tablename__ = 'identity_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    role = Column(Text)
    clearance_level = Column(Integer)

class AuthenticationRegistry(Base):
    __tablename__ = 'authentication_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    auth_method = Column(Text)
    last_login = Column(DateTime(timezone=True), server_default=func.now())

class AuthorizationRegistry(Base):
    __tablename__ = 'authorization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    resource_id = Column(PG_UUID(as_uuid=True))
    permissions = Column(JSON)

class PolicyRegistry(Base):
    __tablename__ = 'policy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    policy_name = Column(Text)
    rules = Column(JSON)
    enforcement_mode = Column(Text)

class PrivacyRegistry(Base):
    __tablename__ = 'privacy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    phi_detected = Column(Boolean)
    deidentification_strategy = Column(Text)

class RiskRegistry(Base):
    __tablename__ = 'risk_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    risk_score = Column(Float)
    mitigation_steps = Column(JSON)

class ComplianceRegistry(Base):
    __tablename__ = 'compliance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    framework = Column(Text)
    status = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    approval_status = Column(Text)
    review_board_notes = Column(Text)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    action_type = Column(Text)
    user_id = Column(PG_UUID(as_uuid=True))
    resource_id = Column(PG_UUID(as_uuid=True))
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class IncidentRegistry(Base):
    __tablename__ = 'incident_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    severity = Column(Text)
    description = Column(Text)
    resolution_status = Column(Text)

class SecurityEventRegistry(Base):
    __tablename__ = 'security_event_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    event_type = Column(Text)
    source_ip = Column(Text)
    payload_hash = Column(Text)

class ModelSecurityRegistry(Base):
    __tablename__ = 'model_security_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    vulnerability_scan_passed = Column(Boolean)
    adversarial_defense_active = Column(Boolean)

class ApiSecurityRegistry(Base):
    __tablename__ = 'api_security_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    endpoint = Column(Text)
    rate_limit_hits = Column(Integer)
    waf_blocks = Column(Integer)

class InfrastructureRegistry(Base):
    __tablename__ = 'infrastructure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(Text)
    encryption_at_rest = Column(Boolean)
    encryption_in_transit = Column(Boolean)

class EnterpriseRegistry(Base):
    __tablename__ = 'enterprise_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(PG_UUID(as_uuid=True))
    tenant_name = Column(Text)
    custom_policies = Column(JSON)

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    metric_name = Column(Text)
    current_value = Column(Float)
    alert_threshold = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    system_component = Column(Text)
    uptime_seconds = Column(Integer)
    error_count = Column(Integer)

class ThreatRegistry(Base):
    __tablename__ = 'threat_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    threat_actor = Column(Text)
    iocs = Column(JSON)
    mitigation_applied = Column(Boolean)

class TrustRegistry(Base):
    __tablename__ = 'trust_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    entity_id = Column(PG_UUID(as_uuid=True))
    trust_score = Column(Float)
    explainability_report = Column(JSON)

class BiosafeIndex(Base):
    __tablename__ = 'biosafe_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    global_security_score = Column(Float)
    active_incidents = Column(Integer)
