from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class ImageRegistry(Base):
    __tablename__ = 'image_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_path = Column(Text)
    modality = Column(Text)
    resolution_x = Column(Integer)
    resolution_y = Column(Integer)

class MicroscopyRegistry(Base):
    __tablename__ = 'microscopy_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    image_id = Column(PG_UUID(as_uuid=True))
    microscopy_type = Column(Text)
    magnification = Column(Float)
    stains = Column(JSON)

class PathologyRegistry(Base):
    __tablename__ = 'pathology_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    image_id = Column(PG_UUID(as_uuid=True))
    tissue_type = Column(Text)
    diagnosis_tags = Column(JSON)
    slide_metadata = Column(JSON)

class RadiologyRegistry(Base):
    __tablename__ = 'radiology_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    image_id = Column(PG_UUID(as_uuid=True))
    scan_type = Column(Text)
    dicom_tags = Column(JSON)

class MoleculeVisualRegistry(Base):
    __tablename__ = 'molecule_visual_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    molecule_id = Column(PG_UUID(as_uuid=True))
    render_type = Column(Text)
    viewing_angle = Column(JSON)

class ProteinStructureRegistry(Base):
    __tablename__ = 'protein_structure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    protein_id = Column(PG_UUID(as_uuid=True))
    pdb_id = Column(Text)
    resolution = Column(Float)
    experimental_method = Column(Text)

class GenomicsVisualRegistry(Base):
    __tablename__ = 'genomics_visual_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    locus_id = Column(PG_UUID(as_uuid=True))
    plot_type = Column(Text)
    tracks = Column(JSON)

class OmicsRegistry(Base):
    __tablename__ = 'omics_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    heatmap_matrix = Column(JSON)
    clustering_method = Column(Text)

class FigureRegistry(Base):
    __tablename__ = 'figure_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id = Column(PG_UUID(as_uuid=True))
    figure_type = Column(Text)
    extracted_text = Column(Text)

class TableRegistry(Base):
    __tablename__ = 'table_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id = Column(PG_UUID(as_uuid=True))
    table_schema = Column(JSON)
    extracted_data = Column(JSON)

class VideoRegistry(Base):
    __tablename__ = 'video_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_path = Column(Text)
    duration_sec = Column(Integer)
    video_type = Column(Text)

class AudioRegistry(Base):
    __tablename__ = 'audio_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_path = Column(Text)
    transcript = Column(Text)
    speaker_diarization = Column(JSON)

class MultimodalEmbeddingRegistry(Base):
    __tablename__ = 'multimodal_embedding_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    modality = Column(Text)
    embedding = Column(Text) # Fallback for VECTOR(1536)

class SegmentationRegistry(Base):
    __tablename__ = 'segmentation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    image_id = Column(PG_UUID(as_uuid=True))
    mask_path = Column(Text)
    identified_objects = Column(JSON)

class AnnotationRegistry(Base):
    __tablename__ = 'annotation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    annotator_id = Column(PG_UUID(as_uuid=True))
    bounding_boxes = Column(JSON)
    labels = Column(JSON)

class ExplanationRegistry(Base):
    __tablename__ = 'explanation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    attention_map_path = Column(Text)
    rationale = Column(Text)

class ValidationRegistry(Base):
    __tablename__ = 'validation_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    quality_score = Column(Float)
    artifacts_detected = Column(JSON)

class BenchmarkRegistry(Base):
    __tablename__ = 'benchmark_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    task_name = Column(Text)
    dataset_name = Column(Text)
    metric_scores = Column(JSON)

class TelemetryRegistry(Base):
    __tablename__ = 'telemetry_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_version = Column(Text)
    inference_time_ms = Column(Integer)
    modality_used = Column(Text)

class MultimodalIndex(Base):
    __tablename__ = 'multimodal_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    entity_id = Column(PG_UUID(as_uuid=True))
    cross_modal_links = Column(JSON)
