from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class AgentRegistry(Base):
    __tablename__ = 'agent_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_name = Column(Text)
    domain_specialty = Column(Text)
    base_model_id = Column(PG_UUID(as_uuid=True))
    status = Column(Text)

class AgentInteractionLog(Base):
    __tablename__ = 'agent_interaction_log'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    task_id = Column(PG_UUID(as_uuid=True))
    input_data = Column(JSON)
    output_data = Column(JSON)
    status = Column(Text)
    created_at = Column(DateTime, default=func.now())

class AgentCapabilityRegistry(Base):
    __tablename__ = 'agent_capability_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    capability_name = Column(Text)
    supported_tools = Column(JSON)

class OrchestrationRegistry(Base):
    __tablename__ = 'orchestration_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    current_step = Column(Integer)
    active_agent_id = Column(PG_UUID(as_uuid=True))
    execution_state = Column(JSON)

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_name = Column(Text)
    agent_sequence = Column(JSON)
    required_inputs = Column(JSON)

class MissionRegistry(Base):
    __tablename__ = 'mission_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    user_id = Column(PG_UUID(as_uuid=True))
    high_level_goal = Column(Text)
    decomposed_tasks = Column(JSON)
    status = Column(Text)

class MemoryRegistryAgents(Base):
    __tablename__ = 'memory_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    shared_context = Column(JSON)
    global_variables = Column(JSON)

class CommunicationRegistry(Base):
    __tablename__ = 'communication_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    sender_agent_id = Column(PG_UUID(as_uuid=True))
    receiver_agent_id = Column(PG_UUID(as_uuid=True))
    payload = Column(JSON)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

class EvidenceRegistry(Base):
    __tablename__ = 'evidence_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    claim = Column(Text)
    supporting_citations = Column(JSON)
    validation_status = Column(Text)

class ReasoningRegistryAgents(Base):
    __tablename__ = 'reasoning_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    decision_path = Column(JSON)
    confidence = Column(Float)

class LiteratureRegistryAgents(Base):
    __tablename__ = 'literature_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    query_executed = Column(Text)
    documents_synthesized = Column(Integer)

class CodingRegistry(Base):
    __tablename__ = 'coding_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    generated_code = Column(Text)
    language = Column(Text)
    execution_result = Column(JSON)

class StatisticsRegistry(Base):
    __tablename__ = 'statistics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    test_type = Column(Text)
    p_value = Column(Float)
    assumptions_checked = Column(Boolean)

class BioinformaticsRegistry(Base):
    __tablename__ = 'bioinformatics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    pipeline_run = Column(Text)
    omics_type = Column(Text)
    results_path = Column(Text)

class MolecularRegistryAgents(Base):
    __tablename__ = 'molecular_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    target_protein = Column(Text)
    candidates_screened = Column(Integer)

class ClinicalRegistryAgents(Base):
    __tablename__ = 'clinical_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    trial_protocol = Column(JSON)
    ethical_review_flag = Column(Boolean)

class EducationRegistryAgents(Base):
    __tablename__ = 'education_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    learning_pathway = Column(JSON)
    difficulty_level = Column(Text)

class GovernanceRegistry(Base):
    __tablename__ = 'governance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    flagged_output = Column(Text)
    human_reviewer_id = Column(PG_UUID(as_uuid=True))
    approval_status = Column(Text)

class EvaluationRegistryAgents(Base):
    __tablename__ = 'evaluation_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    task_success_rate = Column(Float)
    tool_error_rate = Column(Float)

class TelemetryRegistryAgents(Base):
    __tablename__ = 'telemetry_registry_agents'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    agent_id = Column(PG_UUID(as_uuid=True))
    cpu_time_ms = Column(Float)
    api_calls = Column(Integer)

class PerformanceRegistry(Base):
    __tablename__ = 'performance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    mission_id = Column(PG_UUID(as_uuid=True))
    time_to_completion_sec = Column(Integer)
    cost_estimate_usd = Column(Float)
