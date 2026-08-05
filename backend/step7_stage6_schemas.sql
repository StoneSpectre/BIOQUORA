-- BIOQUORA STEP 7, STAGE 6: BioVision (Multimodal Biomedical Intelligence)
-- Defines the schema for multimodal indices, object registries, and cross-modal embeddings.

CREATE TABLE image_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_path VARCHAR(500),
    modality VARCHAR(50),
    resolution_x INT,
    resolution_y INT
);

CREATE TABLE microscopy_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID,
    microscopy_type VARCHAR(50), -- e.g., 'Confocal', 'Electron'
    magnification FLOAT,
    stains JSONB
);

CREATE TABLE pathology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID,
    tissue_type VARCHAR(100),
    diagnosis_tags JSONB,
    slide_metadata JSONB
);

CREATE TABLE radiology_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID,
    scan_type VARCHAR(50), -- e.g., 'MRI', 'CT', 'PET'
    dicom_tags JSONB
);

CREATE TABLE molecule_visual_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    molecule_id UUID,
    render_type VARCHAR(50), -- '2D', '3D'
    viewing_angle JSONB
);

CREATE TABLE protein_structure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    protein_id UUID,
    pdb_id VARCHAR(10),
    resolution FLOAT,
    experimental_method VARCHAR(100)
);

CREATE TABLE genomics_visual_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    locus_id UUID,
    plot_type VARCHAR(50), -- e.g., 'Manhattan', 'Circos'
    tracks JSONB
);

CREATE TABLE omics_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dataset_id UUID,
    heatmap_matrix JSONB,
    clustering_method VARCHAR(100)
);

CREATE TABLE figure_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID,
    figure_type VARCHAR(50), -- 'Pathway', 'BarChart'
    extracted_text TEXT
);

CREATE TABLE table_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID,
    table_schema JSONB,
    extracted_data JSONB
);

CREATE TABLE video_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_path VARCHAR(500),
    duration_sec INT,
    video_type VARCHAR(50) -- 'Surgery', 'Protocol'
);

CREATE TABLE audio_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_path VARCHAR(500),
    transcript TEXT,
    speaker_diarization JSONB
);

CREATE TABLE multimodal_embedding_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    modality VARCHAR(50),
    embedding vector(1536)
);

CREATE TABLE segmentation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_id UUID,
    mask_path VARCHAR(500),
    identified_objects JSONB
);

CREATE TABLE annotation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    annotator_id UUID,
    bounding_boxes JSONB,
    labels JSONB
);

CREATE TABLE explanation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    attention_map_path VARCHAR(500),
    rationale TEXT
);

CREATE TABLE validation_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID,
    quality_score FLOAT,
    artifacts_detected JSONB
);

CREATE TABLE benchmark_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_name VARCHAR(100),
    dataset_name VARCHAR(100),
    metric_scores JSONB
);

CREATE TABLE telemetry_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    model_version VARCHAR(50),
    inference_time_ms INT,
    modality_used VARCHAR(50)
);

CREATE TABLE multimodal_index (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_id UUID,
    cross_modal_links JSONB
);
