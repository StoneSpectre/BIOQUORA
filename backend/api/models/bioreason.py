from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class ReasoningRegistryCore(Base):
    __tablename__ = 'reasoning_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_type = Column(Text)
    query_id = Column(PG_UUID(as_uuid=True))
    output_claim = Column(Text)
    confidence_score = Column(Float)

class EvidenceRegistryCore(Base):
    __tablename__ = 'evidence_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    claim_id = Column(PG_UUID(as_uuid=True))
    citation_id = Column(PG_UUID(as_uuid=True))
    evidence_type = Column(Text)
    provenance_hash = Column(Text)

class HypothesisRegistry(Base):
    __tablename__ = 'hypothesis_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    problem_id = Column(PG_UUID(as_uuid=True))
    hypothesis_text = Column(Text)
    prior_probability = Column(Float)
    posterior_probability = Column(Float)

class CausalRegistry(Base):
    __tablename__ = 'causal_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    cause_entity_id = Column(PG_UUID(as_uuid=True))
    effect_entity_id = Column(PG_UUID(as_uuid=True))
    relationship_type = Column(Text)
    mechanistic_evidence = Column(JSON)

class StatisticalRegistryCore(Base):
    __tablename__ = 'statistical_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    analysis_id = Column(PG_UUID(as_uuid=True))
    effect_size = Column(Float)
    confidence_interval = Column(JSON)
    assumptions_validated = Column(Boolean)

class BiologicalRegistryCore(Base):
    __tablename__ = 'biological_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    pathway_id = Column(PG_UUID(as_uuid=True))
    biological_context = Column(Text)
    inferred_interactions = Column(JSON)

class ChemistryRegistryCore(Base):
    __tablename__ = 'chemistry_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reaction_id = Column(PG_UUID(as_uuid=True))
    reactants = Column(JSON)
    products = Column(JSON)
    inferred_mechanism = Column(Text)

class ProteinRegistryCore(Base):
    __tablename__ = 'protein_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    protein_id = Column(PG_UUID(as_uuid=True))
    inferred_function = Column(Text)
    structural_confidence = Column(JSON)

class GenomicsRegistryCore(Base):
    __tablename__ = 'genomics_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    variant_id = Column(PG_UUID(as_uuid=True))
    inferred_pathogenicity = Column(Text)
    evidence_codes = Column(JSON)

class GraphRegistryCore(Base):
    __tablename__ = 'graph_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_a = Column(PG_UUID(as_uuid=True))
    node_b = Column(PG_UUID(as_uuid=True))
    inferred_edge_type = Column(Text)
    inference_weight = Column(Float)

class LiteratureRegistryCore(Base):
    __tablename__ = 'literature_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id = Column(PG_UUID(as_uuid=True))
    extracted_claims = Column(JSON)
    contradictions_found = Column(JSON)

class CitationRegistryCore(Base):
    __tablename__ = 'citation_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_citation = Column(PG_UUID(as_uuid=True))
    target_citation = Column(PG_UUID(as_uuid=True))
    reasoning_context = Column(Text)

class ExplainabilityRegistry(Base):
    __tablename__ = 'explainability_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_id = Column(PG_UUID(as_uuid=True))
    natural_language_explanation = Column(Text)
    decision_tree_json = Column(JSON)

class UncertaintyRegistry(Base):
    __tablename__ = 'uncertainty_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    claim_id = Column(PG_UUID(as_uuid=True))
    known_limitations = Column(JSON)
    alternative_hypotheses = Column(JSON)
    epistemic_uncertainty = Column(Float)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_id = Column(PG_UUID(as_uuid=True))
    logical_consistency_check = Column(Boolean)
    human_override = Column(Boolean)

class BenchmarkRegistryReasoning(Base):
    __tablename__ = 'benchmark_registry_reasoning'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_name = Column(Text)
    reasoning_type = Column(Text)
    accuracy_score = Column(Float)

class WorkflowRegistryCore(Base):
    __tablename__ = 'workflow_registry_core'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_id = Column(PG_UUID(as_uuid=True))
    reasoning_steps = Column(JSON)
    execution_time_ms = Column(Integer)

class TelemetryRegistryReasoning(Base):
    __tablename__ = 'telemetry_registry_reasoning'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_id = Column(PG_UUID(as_uuid=True))
    tokens_consumed = Column(Integer)
    compute_cost = Column(Float)

class AuditRegistry(Base):
    __tablename__ = 'audit_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    reasoning_id = Column(PG_UUID(as_uuid=True))
    auditor_id = Column(PG_UUID(as_uuid=True))
    audit_notes = Column(Text)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class LearningRegistry(Base):
    __tablename__ = 'learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    correction_id = Column(PG_UUID(as_uuid=True))
    original_claim = Column(Text)
    corrected_claim = Column(Text)
    reasoning_adjustment = Column(JSON)
