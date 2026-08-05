from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class AcquisitionRegistry(Base):
    __tablename__ = 'acquisition_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_name = Column(Text)
    documents_ingested = Column(Integer)
    last_sync = Column(DateTime(timezone=True), server_default=func.now())

class LiteratureRegistry(Base):
    __tablename__ = 'literature_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    paper_id = Column(Text)
    extracted_entities = Column(JSON)
    processed = Column(Boolean)

class DatasetRegistry(Base):
    __tablename__ = 'dataset_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_name = Column(Text)
    record_count = Column(Integer)
    version = Column(Text)

class AnnotationRegistry(Base):
    __tablename__ = 'annotation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    annotator_id = Column(PG_UUID(as_uuid=True))
    completion_rate = Column(Float)

class GraphRegistry(Base):
    __tablename__ = 'graph_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_count = Column(Integer)
    edge_count = Column(Integer)
    last_updated = Column(DateTime(timezone=True), server_default=func.now())

class EmbeddingRegistry(Base):
    __tablename__ = 'embedding_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_used = Column(Text)
    vector_dimension = Column(Integer)
    total_embeddings = Column(Integer)

class VectorRegistry(Base):
    __tablename__ = 'vector_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    index_name = Column(Text)
    shard_count = Column(Integer)
    status = Column(Text)

class OntologyRegistry(Base):
    __tablename__ = 'ontology_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    ontology_name = Column(Text)
    term_count = Column(Integer)
    version = Column(Text)

class TaxonomyRegistry(Base):
    __tablename__ = 'taxonomy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    domain = Column(Text)
    hierarchy_depth = Column(Integer)

class MetadataRegistry(Base):
    __tablename__ = 'metadata_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    asset_type = Column(Text)
    tags = Column(JSON)

class ModelRegistry(Base):
    __tablename__ = 'model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_name = Column(Text)
    parameters_billion = Column(Float)
    training_status = Column(Text)

class DeploymentRegistry(Base):
    __tablename__ = 'deployment_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    environment = Column(Text)
    endpoint_url = Column(Text)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    validation_score = Column(Float)
    passed = Column(Boolean)

class EvaluationRegistry(Base):
    __tablename__ = 'evaluation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    benchmark_suite = Column(Text)
    score = Column(Float)

class MonitoringRegistry(Base):
    __tablename__ = 'monitoring_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    factory_component = Column(Text)
    uptime_percentage = Column(Float)
    error_rate = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    pipeline_id = Column(PG_UUID(as_uuid=True))
    throughput_gb_hr = Column(Float)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    release_id = Column(PG_UUID(as_uuid=True))
    approved_by = Column(PG_UUID(as_uuid=True))
    approval_date = Column(DateTime(timezone=True), server_default=func.now())

class ProductionRegistry(Base):
    __tablename__ = 'production_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    pipeline_name = Column(Text)
    status = Column(Text)
    last_run = Column(DateTime(timezone=True), server_default=func.now())

class EvolutionRegistry(Base):
    __tablename__ = 'evolution_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    component_name = Column(Text)
    version_bump = Column(Text)
    improvement_notes = Column(Text)

class BiofactoryIndex(Base):
    __tablename__ = 'biofactory_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_models_produced = Column(Integer)
    total_data_processed_tb = Column(Float)
