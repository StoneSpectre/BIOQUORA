from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    ai_output_id = Column(PG_UUID(as_uuid=True))
    validation_status = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class EvidenceRegistry(Base):
    __tablename__ = 'evidence_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    claim_text = Column(Text)
    supporting_evidence = Column(JSON)
    contradicting_evidence = Column(JSON)

class CitationValidationRegistry(Base):
    __tablename__ = 'citation_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    citation_id = Column(Text)
    is_hallucinated = Column(Boolean)
    citation_quality_score = Column(Float)

class ClaimRegistry(Base):
    __tablename__ = 'claim_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    extracted_claim = Column(Text)
    truth_probability = Column(Float)

class StatisticsValidationRegistry(Base):
    __tablename__ = 'statistics_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    statistical_method = Column(Text)
    is_appropriate = Column(Boolean)
    p_value_check = Column(Float)

class LogicValidationRegistry(Base):
    __tablename__ = 'logic_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    reasoning_chain = Column(JSON)
    fallacies_detected = Column(JSON)

class OntologyValidationRegistry(Base):
    __tablename__ = 'ontology_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    entity_name = Column(Text)
    mapped_ontology_id = Column(Text)
    confidence = Column(Float)

class CodeValidationRegistry(Base):
    __tablename__ = 'code_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    software_id = Column(PG_UUID(as_uuid=True))
    security_vulnerabilities = Column(JSON)
    reproducibility_check = Column(Boolean)

class SimulationValidationRegistry(Base):
    __tablename__ = 'simulation_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    simulation_id = Column(PG_UUID(as_uuid=True))
    parameter_bounds_check = Column(Boolean)

class DatasetValidationRegistry(Base):
    __tablename__ = 'dataset_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    dataset_id = Column(PG_UUID(as_uuid=True))
    data_leakage_detected = Column(Boolean)
    bias_metrics = Column(JSON)

class MultimodalValidationRegistry(Base):
    __tablename__ = 'multimodal_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    asset_id = Column(PG_UUID(as_uuid=True))
    cross_modal_alignment_score = Column(Float)

class ClinicalValidationRegistry(Base):
    __tablename__ = 'clinical_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    phi_detected = Column(Boolean)
    guideline_concordance = Column(JSON)

class WorkflowValidationRegistry(Base):
    __tablename__ = 'workflow_validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    workflow_id = Column(PG_UUID(as_uuid=True))
    dag_integrity_check = Column(Boolean)

class TrustScoreRegistry(Base):
    __tablename__ = 'trust_score_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    overall_trust_score = Column(Float)
    scoring_breakdown = Column(JSON)

class ProvenanceRegistry(Base):
    __tablename__ = 'provenance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    lineage_graph = Column(JSON)
    origin_sources = Column(JSON)

class ExplainabilityRegistry(Base):
    __tablename__ = 'explainability_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    explanation_text = Column(Text)
    feature_importance = Column(JSON)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    policy_id = Column(Text)
    compliance_status = Column(Text)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    human_reviewer_id = Column(PG_UUID(as_uuid=True))
    review_decision = Column(Text)
    comments = Column(Text)

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validator_module = Column(Text)
    accuracy = Column(Float)
    false_positive_rate = Column(Float)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    validation_id = Column(PG_UUID(as_uuid=True))
    compute_time_ms = Column(Integer)
    api_calls_made = Column(Integer)
