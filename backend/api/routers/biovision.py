from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biovision import *

router = APIRouter(prefix='/api/v1/biovision', tags=['biovision'])

@router.get('/image')
async def get_image_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ImageRegistry))
    return result.scalars().all()

@router.post('/image')
async def create_image_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ImageRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/microscopy')
async def get_microscopy_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MicroscopyRegistry))
    return result.scalars().all()

@router.post('/microscopy')
async def create_microscopy_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MicroscopyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/pathology')
async def get_pathology_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PathologyRegistry))
    return result.scalars().all()

@router.post('/pathology')
async def create_pathology_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PathologyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/radiology')
async def get_radiology_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RadiologyRegistry))
    return result.scalars().all()

@router.post('/radiology')
async def create_radiology_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = RadiologyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/molecule_visual')
async def get_molecule_visual_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MoleculeVisualRegistry))
    return result.scalars().all()

@router.post('/molecule_visual')
async def create_molecule_visual_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MoleculeVisualRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protein_structure')
async def get_protein_structure_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProteinStructureRegistry))
    return result.scalars().all()

@router.post('/protein_structure')
async def create_protein_structure_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProteinStructureRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/genomics_visual')
async def get_genomics_visual_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GenomicsVisualRegistry))
    return result.scalars().all()

@router.post('/genomics_visual')
async def create_genomics_visual_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GenomicsVisualRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/omics')
async def get_omics_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OmicsRegistry))
    return result.scalars().all()

@router.post('/omics')
async def create_omics_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OmicsRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/figure')
async def get_figure_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FigureRegistry))
    return result.scalars().all()

@router.post('/figure')
async def create_figure_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = FigureRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/table')
async def get_table_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TableRegistry))
    return result.scalars().all()

@router.post('/table')
async def create_table_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TableRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/video')
async def get_video_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VideoRegistry))
    return result.scalars().all()

@router.post('/video')
async def create_video_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VideoRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/audio')
async def get_audio_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AudioRegistry))
    return result.scalars().all()

@router.post('/audio')
async def create_audio_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AudioRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal_embedding')
async def get_multimodal_embedding_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalEmbeddingRegistry))
    return result.scalars().all()

@router.post('/multimodal_embedding')
async def create_multimodal_embedding_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalEmbeddingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/segmentation')
async def get_segmentation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SegmentationRegistry))
    return result.scalars().all()

@router.post('/segmentation')
async def create_segmentation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SegmentationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/annotation')
async def get_annotation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnnotationRegistry))
    return result.scalars().all()

@router.post('/annotation')
async def create_annotation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AnnotationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/explanation')
async def get_explanation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExplanationRegistry))
    return result.scalars().all()

@router.post('/explanation')
async def create_explanation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExplanationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/validation')
async def get_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ValidationRegistry))
    return result.scalars().all()

@router.post('/validation')
async def create_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/benchmark')
async def get_benchmark_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BenchmarkRegistry))
    return result.scalars().all()

@router.post('/benchmark')
async def create_benchmark_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BenchmarkRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/telemetry')
async def get_telemetry_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TelemetryRegistry))
    return result.scalars().all()

@router.post('/telemetry')
async def create_telemetry_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TelemetryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal_index')
async def get_multimodal_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalIndex))
    return result.scalars().all()

@router.post('/multimodal_index')
async def create_multimodal_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
