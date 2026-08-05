from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class FoundationModelRegistry(Base):
    __tablename__ = 'foundation_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_name = Column(Text)
    domain = Column(Text)
    architecture = Column(Text)
    parameters_billion = Column(Float)

class ModelVersionRegistry(Base):
    __tablename__ = 'model_version_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    version_tag = Column(Text)
    weights_path = Column(Text)
    deployment_status = Column(Text)

class InferenceRegistry(Base):
    __tablename__ = 'inference_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    endpoint_url = Column(Text)
    max_batch_size = Column(Integer)
    hardware_target = Column(Text)

class EmbeddingRegistry(Base):
    __tablename__ = 'embedding_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    entity_id = Column(PG_UUID(as_uuid=True))
    entity_type = Column(Text)
    model_version = Column(Text)
    vector_dimension = Column(Integer)
    storage_path = Column(Text)

class ReasoningRegistry(Base):
    __tablename__ = 'reasoning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_id = Column(PG_UUID(as_uuid=True))
    reasoning_pathway = Column(JSON)
    evidence_retrieved = Column(JSON)
    confidence_score = Column(Float)

class CitationRegistry(Base):
    __tablename__ = 'citation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_id = Column(PG_UUID(as_uuid=True))
    target_id = Column(PG_UUID(as_uuid=True))
    context_vector = Column(Text)
    sentiment = Column(Text)

class LiteratureRegistry(Base):
    __tablename__ = 'literature_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id = Column(Text)
    parsed_sections = Column(JSON)
    knowledge_graph_nodes = Column(JSON)

class MoleculeRegistry(Base):
    __tablename__ = 'molecule_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    smiles_string = Column(Text)
    computed_properties = Column(JSON)
    generated_by_model = Column(PG_UUID(as_uuid=True))

class ProteinRegistry(Base):
    __tablename__ = 'protein_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    sequence = Column(Text)
    predicted_structure = Column(JSON)
    functional_annotations = Column(JSON)

class GenomeRegistry(Base):
    __tablename__ = 'genome_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    sequence_id = Column(Text)
    variant_annotations = Column(JSON)
    expression_profiles = Column(JSON)

class MultimodalRegistry(Base):
    __tablename__ = 'multimodal_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    asset_type = Column(Text)
    aligned_text = Column(Text)
    model_id = Column(PG_UUID(as_uuid=True))

class DomainModelRegistry(Base):
    __tablename__ = 'domain_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    base_model_id = Column(PG_UUID(as_uuid=True))
    domain_specialty = Column(Text)
    fine_tuning_dataset = Column(Text)

class EvaluationRegistry(Base):
    __tablename__ = 'evaluation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    benchmark_id = Column(PG_UUID(as_uuid=True))
    score = Column(Float)
    evaluated_at = Column(DateTime(timezone=True), server_default=func.now())

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_name = Column(Text)
    task_type = Column(Text)
    num_samples = Column(Integer)

class SafetyRegistry(Base):
    __tablename__ = 'safety_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    hallucination_rate = Column(Float)
    toxicity_score = Column(Float)
    guardrails_passed = Column(Boolean)

class ExplainabilityRegistry(Base):
    __tablename__ = 'explainability_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    inference_id = Column(PG_UUID(as_uuid=True))
    attention_weights = Column(JSON)
    saliency_map = Column(Text)

class RoutingRegistry(Base):
    __tablename__ = 'routing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    intent_class = Column(Text)
    target_model_id = Column(PG_UUID(as_uuid=True))
    fallback_model_id = Column(PG_UUID(as_uuid=True))

class MemoryRegistry(Base):
    __tablename__ = 'memory_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    user_id = Column(PG_UUID(as_uuid=True))
    context_window = Column(JSON)
    long_term_embeddings = Column(JSON)

class InfrastructureRegistry(Base):
    __tablename__ = 'infrastructure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cluster_id = Column(Text)
    gpu_type = Column(Text)
    total_nodes = Column(Integer)
    available_vram_gb = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    latency_ms = Column(Float)
    tokens_per_second = Column(Float)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
