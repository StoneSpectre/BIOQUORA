from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biocoder import *

router = APIRouter(prefix='/api/v1/biocoder', tags=['biocoder'])

@router.get('/programming')
async def get_programming_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProgrammingRegistry))
    return result.scalars().all()

@router.post('/programming')
async def create_programming_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProgrammingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/software')
async def get_software_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SoftwareRegistry))
    return result.scalars().all()

@router.post('/software')
async def create_software_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SoftwareRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/notebook')
async def get_notebook_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(NotebookRegistry))
    return result.scalars().all()

@router.post('/notebook')
async def create_notebook_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = NotebookRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow')
async def get_workflow_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowRegistry))
    return result.scalars().all()

@router.post('/workflow')
async def create_workflow_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/pipeline')
async def get_pipeline_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PipelineRegistry))
    return result.scalars().all()

@router.post('/pipeline')
async def create_pipeline_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PipelineRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/testing')
async def get_testing_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TestingRegistry))
    return result.scalars().all()

@router.post('/testing')
async def create_testing_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TestingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/debugging')
async def get_debugging_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DebuggingRegistry))
    return result.scalars().all()

@router.post('/debugging')
async def create_debugging_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DebuggingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/optimization')
async def get_optimization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OptimizationRegistry))
    return result.scalars().all()

@router.post('/optimization')
async def create_optimization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OptimizationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/documentation')
async def get_documentation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DocumentationRegistry))
    return result.scalars().all()

@router.post('/documentation')
async def create_documentation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DocumentationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/api')
async def get_api_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ApiRegistry))
    return result.scalars().all()

@router.post('/api')
async def create_api_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ApiRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/database')
async def get_database_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatabaseRegistry))
    return result.scalars().all()

@router.post('/database')
async def create_database_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatabaseRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/simulation')
async def get_simulation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SimulationRegistry))
    return result.scalars().all()

@router.post('/simulation')
async def create_simulation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SimulationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ml')
async def get_ml_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MlRegistry))
    return result.scalars().all()

@router.post('/ml')
async def create_ml_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MlRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/deep_learning')
async def get_deep_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DeepLearningRegistry))
    return result.scalars().all()

@router.post('/deep_learning')
async def create_deep_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DeepLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/statistics')
async def get_statistics_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(StatisticsRegistry))
    return result.scalars().all()

@router.post('/statistics')
async def create_statistics_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = StatisticsRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/visualization')
async def get_visualization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VisualizationRegistry))
    return result.scalars().all()

@router.post('/visualization')
async def create_visualization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VisualizationRegistry(**data)
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
