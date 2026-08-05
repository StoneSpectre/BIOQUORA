from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class ProgrammingRegistry(Base):
    __tablename__ = 'programming_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    user_id = Column(PG_UUID(as_uuid=True))
    language = Column(Text)
    goal_description = Column(Text)

class SoftwareRegistry(Base):
    __tablename__ = 'software_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    project_name = Column(Text)
    architecture_design = Column(JSON)
    dependencies = Column(JSON)

class NotebookRegistry(Base):
    __tablename__ = 'notebook_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    cells = Column(JSON)
    kernel = Column(Text)

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    name = Column(Text)
    dag_definition = Column(JSON)
    execution_engine = Column(Text)

class PipelineRegistry(Base):
    __tablename__ = 'pipeline_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    workflow_id = Column(PG_UUID(as_uuid=True))
    run_status = Column(Text)
    logs = Column(Text)

class TestingRegistry(Base):
    __tablename__ = 'testing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    test_suite = Column(JSON)
    coverage_percentage = Column(Float)

class DebuggingRegistry(Base):
    __tablename__ = 'debugging_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    error_trace = Column(Text)
    suggested_fix = Column(Text)
    resolved = Column(Boolean)

class OptimizationRegistry(Base):
    __tablename__ = 'optimization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    performance_metrics = Column(JSON)
    refactor_suggestions = Column(Text)

class DocumentationRegistry(Base):
    __tablename__ = 'documentation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    api_docs = Column(Text)
    user_guide = Column(Text)

class ApiRegistry(Base):
    __tablename__ = 'api_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    endpoints = Column(JSON)
    security_schema = Column(JSON)

class DatabaseRegistry(Base):
    __tablename__ = 'database_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    schema_definition = Column(JSON)
    migrations = Column(JSON)

class SimulationRegistry(Base):
    __tablename__ = 'simulation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_id = Column(PG_UUID(as_uuid=True))
    parameters = Column(JSON)
    results_path = Column(Text)

class MlRegistry(Base):
    __tablename__ = 'ml_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    experiment_name = Column(Text)
    hyperparameters = Column(JSON)
    metrics = Column(JSON)

class DeepLearningRegistry(Base):
    __tablename__ = 'deep_learning_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_name = Column(Text)
    framework = Column(Text)
    weights_path = Column(Text)

class StatisticsRegistry(Base):
    __tablename__ = 'statistics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    analysis_name = Column(Text)
    methods = Column(JSON)
    p_values = Column(JSON)

class VisualizationRegistry(Base):
    __tablename__ = 'visualization_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    plot_type = Column(Text)
    code_snippet = Column(Text)
    render_path = Column(Text)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    reproducibility_score = Column(Float)
    validation_report = Column(Text)

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    algorithm_name = Column(Text)
    dataset = Column(Text)
    performance = Column(JSON)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    execution_time_ms = Column(Integer)
    memory_usage_mb = Column(Float)
    cpu_utilization = Column(Float)

class DeploymentRegistry(Base):
    __tablename__ = 'deployment_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    software_id = Column(PG_UUID(as_uuid=True))
    container_image = Column(Text)
    deployment_status = Column(Text)
