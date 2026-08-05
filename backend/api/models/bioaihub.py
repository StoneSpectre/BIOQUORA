from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class DeveloperRegistry(Base):
    __tablename__ = 'developer_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    developer_name = Column(Text)
    organization = Column(Text)
    api_key_hash = Column(Text)

class ApiRegistry(Base):
    __tablename__ = 'api_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    endpoint_path = Column(Text)
    method = Column(Text)
    rate_limit_per_min = Column(Integer)

class SdkRegistry(Base):
    __tablename__ = 'sdk_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    language = Column(Text)
    version = Column(Text)
    download_url = Column(Text)

class PluginRegistry(Base):
    __tablename__ = 'plugin_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    plugin_name = Column(Text)
    developer_id = Column(PG_UUID(as_uuid=True))
    status = Column(Text)

class ExtensionRegistry(Base):
    __tablename__ = 'extension_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    extension_name = Column(Text)
    installed_count = Column(Integer)
    rating = Column(Float)

class MarketplaceRegistry(Base):
    __tablename__ = 'marketplace_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    item_type = Column(Text)
    item_id = Column(PG_UUID(as_uuid=True))
    price_usd = Column(Float)

class WorkflowMarketRegistry(Base):
    __tablename__ = 'workflow_market_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    downloads = Column(Integer)
    certification_status = Column(Text)

class AgentMarketRegistry(Base):
    __tablename__ = 'agent_market_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    specialty = Column(Text)
    rating = Column(Float)

class ModelMarketRegistry(Base):
    __tablename__ = 'model_market_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    license_type = Column(Text)
    downloads = Column(Integer)

class DatasetMarketRegistry(Base):
    __tablename__ = 'dataset_market_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    size_gb = Column(Float)
    access_level = Column(Text)

class BillingRegistry(Base):
    __tablename__ = 'billing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    developer_id = Column(PG_UUID(as_uuid=True))
    current_cycle_spend = Column(Float)
    tier = Column(Text)

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    developer_id = Column(PG_UUID(as_uuid=True))
    api_calls_last_30d = Column(Integer)
    error_rate = Column(Float)

class DocumentationRegistry(Base):
    __tablename__ = 'documentation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    doc_id = Column(Text)
    version = Column(Text)
    content = Column(Text)

class CertificationRegistry(Base):
    __tablename__ = 'certification_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    item_id = Column(PG_UUID(as_uuid=True))
    certified_by = Column(Text)
    date_certified = Column(DateTime(timezone=True), server_default=func.now())

class EnterpriseRegistry(Base):
    __tablename__ = 'enterprise_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    tenant_id = Column(PG_UUID(as_uuid=True))
    sso_enabled = Column(Boolean)
    custom_domain = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    plugin_id = Column(PG_UUID(as_uuid=True))
    review_status = Column(Text)
    security_scan_passed = Column(Boolean)

class CommunityRegistry(Base):
    __tablename__ = 'community_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    topic_id = Column(PG_UUID(as_uuid=True))
    post_count = Column(Integer)
    active_contributors = Column(Integer)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    ecosystem_metric = Column(Text)
    value = Column(Float)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class IntegrationRegistry(Base):
    __tablename__ = 'integration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    external_system = Column(Text)
    auth_type = Column(Text)
    status = Column(Text)

class BioaihubIndex(Base):
    __tablename__ = 'bioaihub_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_developers = Column(Integer)
    total_ecosystem_apps = Column(Integer)
