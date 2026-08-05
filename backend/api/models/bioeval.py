from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    benchmark_name = Column(Text)
    domain = Column(Text)
    dataset_version = Column(Text)

class EvaluationRegistry(Base):
    __tablename__ = 'evaluation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    benchmark_id = Column(PG_UUID(as_uuid=True))
    overall_score = Column(Float)

class ReasoningRegistry(Base):
    __tablename__ = 'reasoning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    logical_consistency_score = Column(Float)
    causal_accuracy_score = Column(Float)

class RetrievalRegistry(Base):
    __tablename__ = 'retrieval_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    retriever_id = Column(PG_UUID(as_uuid=True))
    mean_reciprocal_rank = Column(Float)
    recall_at_10 = Column(Float)

class CitationRegistry(Base):
    __tablename__ = 'citation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    response_id = Column(PG_UUID(as_uuid=True))
    hallucinated_citations = Column(Integer)
    valid_citations = Column(Integer)

class GraphRegistry(Base):
    __tablename__ = 'graph_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    graph_id = Column(PG_UUID(as_uuid=True))
    node_accuracy = Column(Float)
    edge_consistency = Column(Float)

class StatisticsRegistry(Base):
    __tablename__ = 'statistics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    p_value_calculation_accuracy = Column(Float)
    power_analysis_accuracy = Column(Float)

class ProgrammingRegistry(Base):
    __tablename__ = 'programming_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    pass_at_1 = Column(Float)
    syntax_error_rate = Column(Float)

class SimulationRegistry(Base):
    __tablename__ = 'simulation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    thermodynamic_stability_score = Column(Float)
    rmsd_error = Column(Float)

class VisionRegistry(Base):
    __tablename__ = 'vision_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    segmentation_iou = Column(Float)
    classification_auroc = Column(Float)

class MultimodalRegistry(Base):
    __tablename__ = 'multimodal_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    cross_modal_alignment_score = Column(Float)

class SafetyRegistry(Base):
    __tablename__ = 'safety_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    jailbreak_resistance_score = Column(Float)
    bias_score = Column(Float)

class InfrastructureRegistry(Base):
    __tablename__ = 'infrastructure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    deployment_id = Column(PG_UUID(as_uuid=True))
    p99_latency_ms = Column(Float)
    throughput_tps = Column(Float)

class AnalyticsRegistry(Base):
    __tablename__ = 'analytics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    evaluation_run_id = Column(PG_UUID(as_uuid=True))
    cost_per_1k_tokens = Column(Float)
    energy_consumption_kwh = Column(Float)

class LeaderboardRegistry(Base):
    __tablename__ = 'leaderboard_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    domain = Column(Text)
    top_model_id = Column(PG_UUID(as_uuid=True))
    elo_rating = Column(Integer)

class ReproducibilityRegistry(Base):
    __tablename__ = 'reproducibility_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    experiment_id = Column(PG_UUID(as_uuid=True))
    variance_across_runs = Column(Float)
    deterministic = Column(Boolean)

class ExpertReviewRegistry(Base):
    __tablename__ = 'expert_review_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    response_id = Column(PG_UUID(as_uuid=True))
    reviewer_id = Column(PG_UUID(as_uuid=True))
    expert_rating = Column(Integer)
    comments = Column(Text)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    evaluation_run_id = Column(PG_UUID(as_uuid=True))
    duration_seconds = Column(Integer)

class ImprovementRegistry(Base):
    __tablename__ = 'improvement_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    recommended_fine_tuning_dataset = Column(PG_UUID(as_uuid=True))
    expected_gain_percent = Column(Float)

class BioevalIndex(Base):
    __tablename__ = 'bioeval_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    total_evaluations_run = Column(Integer)
    global_model_readiness_score = Column(Float)
