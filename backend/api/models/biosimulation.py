from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class SimulationRegistry(Base):
    __tablename__ = 'simulation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    session_id = Column(PG_UUID(as_uuid=True))
    hypothesis_id = Column(PG_UUID(as_uuid=True))
    status = Column(Text)
    execution_engine = Column(Text)

class MolecularModelRegistry(Base):
    __tablename__ = 'molecular_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    pdb_id = Column(Text)
    force_field = Column(Text)
    trajectory_path = Column(Text)

class ProteinModelRegistry(Base):
    __tablename__ = 'protein_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    sequence = Column(Text)
    predicted_structure_path = Column(Text)
    plddt_score = Column(Float)

class CellularModelRegistry(Base):
    __tablename__ = 'cellular_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    cell_type = Column(Text)
    signaling_network = Column(JSON)

class TissueModelRegistry(Base):
    __tablename__ = 'tissue_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    tissue_type = Column(Text)
    spatial_organization = Column(JSON)

class PhysiologyModelRegistry(Base):
    __tablename__ = 'physiology_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    organ_system = Column(Text)
    compartment_parameters = Column(JSON)

class SystemsBiologyRegistry(Base):
    __tablename__ = 'systems_biology_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    sbml_model_path = Column(Text)
    flux_balance_results = Column(JSON)

class OmicsModelRegistry(Base):
    __tablename__ = 'omics_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    omics_type = Column(Text)
    expression_matrix = Column(JSON)

class DiseaseModelRegistry(Base):
    __tablename__ = 'disease_model_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    disease_id = Column(Text)
    progression_parameters = Column(JSON)

class PkPdRegistry(Base):
    __tablename__ = 'pk_pd_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    compound_id = Column(Text)
    compartment_model = Column(JSON)
    clearance_rate = Column(Float)

class EpidemiologyRegistry(Base):
    __tablename__ = 'epidemiology_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    sir_parameters = Column(JSON)
    population_size = Column(Integer)

class ExperimentRegistry(Base):
    __tablename__ = 'experiment_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    design_matrix = Column(JSON)
    virtual_readouts = Column(JSON)

class DigitalTwinRegistry(Base):
    __tablename__ = 'digital_twin_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    patient_id = Column(PG_UUID(as_uuid=True))
    twin_parameters = Column(JSON)
    simulated_outcomes = Column(JSON)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    ground_truth_reference = Column(Text)
    error_margin = Column(Float)

class SensitivityRegistry(Base):
    __tablename__ = 'sensitivity_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    parameter_variances = Column(JSON)
    robustness_score = Column(Float)

class ProvenanceRegistry(Base):
    __tablename__ = 'provenance_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    literature_citations = Column(JSON)
    dataset_sources = Column(JSON)

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_type = Column(Text)
    performance_metrics = Column(JSON)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    compute_node = Column(Text)
    gpu_utilization = Column(Float)
    duration_ms = Column(Integer)

class WorkflowRegistry(Base):
    __tablename__ = 'workflow_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    dag_definition = Column(JSON)
    stage_status = Column(JSON)

class SimulationIndex(Base):
    __tablename__ = 'simulation_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    simulation_id = Column(PG_UUID(as_uuid=True))
    searchable_metadata = Column(JSON)
    embedding = Column(Text) # Fallback for VECTOR(1536)
