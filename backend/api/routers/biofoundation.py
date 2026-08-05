from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biofoundation import *

router = APIRouter(prefix='/api/v1/biofoundation', tags=['biofoundation'])

@router.get('/foundation_model')
async def get_foundation_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FoundationModelRegistry))
    return result.scalars().all()

@router.post('/foundation_model')
async def create_foundation_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = FoundationModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model_version')
async def get_model_version_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelVersionRegistry))
    return result.scalars().all()

@router.post('/model_version')
async def create_model_version_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelVersionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/inference')
async def get_inference_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InferenceRegistry))
    return result.scalars().all()

@router.post('/inference')
async def create_inference_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InferenceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/embedding')
async def get_embedding_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EmbeddingRegistry))
    return result.scalars().all()

@router.post('/embedding')
async def create_embedding_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EmbeddingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/reasoning')
async def get_reasoning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReasoningRegistry))
    return result.scalars().all()

@router.post('/reasoning')
async def create_reasoning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ReasoningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/citation')
async def get_citation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationRegistry))
    return result.scalars().all()

@router.post('/citation')
async def create_citation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/literature')
async def get_literature_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureRegistry))
    return result.scalars().all()

@router.post('/literature')
async def create_literature_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/molecule')
async def get_molecule_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MoleculeRegistry))
    return result.scalars().all()

@router.post('/molecule')
async def create_molecule_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MoleculeRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protein')
async def get_protein_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProteinRegistry))
    return result.scalars().all()

@router.post('/protein')
async def create_protein_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProteinRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/genome')
async def get_genome_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GenomeRegistry))
    return result.scalars().all()

@router.post('/genome')
async def create_genome_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GenomeRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal')
async def get_multimodal_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalRegistry))
    return result.scalars().all()

@router.post('/multimodal')
async def create_multimodal_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/domain_model')
async def get_domain_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DomainModelRegistry))
    return result.scalars().all()

@router.post('/domain_model')
async def create_domain_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DomainModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/evaluation')
async def get_evaluation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvaluationRegistry))
    return result.scalars().all()

@router.post('/evaluation')
async def create_evaluation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvaluationRegistry(**data)
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

@router.get('/safety')
async def get_safety_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SafetyRegistry))
    return result.scalars().all()

@router.post('/safety')
async def create_safety_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SafetyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/explainability')
async def get_explainability_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExplainabilityRegistry))
    return result.scalars().all()

@router.post('/explainability')
async def create_explainability_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExplainabilityRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/routing')
async def get_routing_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RoutingRegistry))
    return result.scalars().all()

@router.post('/routing')
async def create_routing_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = RoutingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/memory')
async def get_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MemoryRegistry))
    return result.scalars().all()

@router.post('/memory')
async def create_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/infrastructure')
async def get_infrastructure_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InfrastructureRegistry))
    return result.scalars().all()

@router.post('/infrastructure')
async def create_infrastructure_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InfrastructureRegistry(**data)
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
