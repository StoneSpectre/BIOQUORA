from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biofactory import *

router = APIRouter(prefix='/api/v1/biofactory', tags=['biofactory'])

@router.get('/acquisition')
async def get_acquisition_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AcquisitionRegistry))
    return result.scalars().all()

@router.post('/acquisition')
async def create_acquisition_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AcquisitionRegistry(**data)
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

@router.get('/dataset')
async def get_dataset_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetRegistry))
    return result.scalars().all()

@router.post('/dataset')
async def create_dataset_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetRegistry(**data)
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

@router.get('/graph')
async def get_graph_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphRegistry))
    return result.scalars().all()

@router.post('/graph')
async def create_graph_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphRegistry(**data)
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

@router.get('/vector')
async def get_vector_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VectorRegistry))
    return result.scalars().all()

@router.post('/vector')
async def create_vector_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VectorRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ontology')
async def get_ontology_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OntologyRegistry))
    return result.scalars().all()

@router.post('/ontology')
async def create_ontology_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OntologyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/taxonomy')
async def get_taxonomy_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TaxonomyRegistry))
    return result.scalars().all()

@router.post('/taxonomy')
async def create_taxonomy_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TaxonomyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/metadata')
async def get_metadata_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MetadataRegistry))
    return result.scalars().all()

@router.post('/metadata')
async def create_metadata_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MetadataRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model')
async def get_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelRegistry))
    return result.scalars().all()

@router.post('/model')
async def create_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/deployment')
async def get_deployment_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DeploymentRegistry))
    return result.scalars().all()

@router.post('/deployment')
async def create_deployment_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DeploymentRegistry(**data)
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

@router.get('/monitoring')
async def get_monitoring_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MonitoringRegistry))
    return result.scalars().all()

@router.post('/monitoring')
async def create_monitoring_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MonitoringRegistry(**data)
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

@router.get('/governance')
async def get_governance_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GovernanceRegistry))
    return result.scalars().all()

@router.post('/governance')
async def create_governance_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GovernanceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/production')
async def get_production_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProductionRegistry))
    return result.scalars().all()

@router.post('/production')
async def create_production_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProductionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/evolution')
async def get_evolution_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvolutionRegistry))
    return result.scalars().all()

@router.post('/evolution')
async def create_evolution_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvolutionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/biofactory_index')
async def get_biofactory_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiofactoryIndex))
    return result.scalars().all()

@router.post('/biofactory_index')
async def create_biofactory_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiofactoryIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
