from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioworkflow import *

router = APIRouter(prefix='/api/v1/bioworkflow', tags=['bioworkflow'])

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

@router.get('/workflow_template')
async def get_workflow_template_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowTemplateRegistry))
    return result.scalars().all()

@router.post('/workflow_template')
async def create_workflow_template_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowTemplateRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/execution')
async def get_execution_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExecutionRegistry))
    return result.scalars().all()

@router.post('/execution')
async def create_execution_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExecutionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dependency')
async def get_dependency_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DependencyRegistry))
    return result.scalars().all()

@router.post('/dependency')
async def create_dependency_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DependencyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/scheduler')
async def get_scheduler_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SchedulerRegistry))
    return result.scalars().all()

@router.post('/scheduler')
async def create_scheduler_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SchedulerRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/experiment')
async def get_experiment_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExperimentRegistry))
    return result.scalars().all()

@router.post('/experiment')
async def create_experiment_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExperimentRegistry(**data)
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

@router.get('/publication')
async def get_publication_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PublicationRegistry))
    return result.scalars().all()

@router.post('/publication')
async def create_publication_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PublicationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/collaboration')
async def get_collaboration_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CollaborationRegistry))
    return result.scalars().all()

@router.post('/collaboration')
async def create_collaboration_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CollaborationRegistry(**data)
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

@router.get('/audit')
async def get_audit_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AuditRegistry))
    return result.scalars().all()

@router.post('/audit')
async def create_audit_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AuditRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/milestone')
async def get_milestone_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MilestoneRegistry))
    return result.scalars().all()

@router.post('/milestone')
async def create_milestone_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MilestoneRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/analytics')
async def get_analytics_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AnalyticsRegistry))
    return result.scalars().all()

@router.post('/analytics')
async def create_analytics_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AnalyticsRegistry(**data)
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

@router.get('/bioworkflow_index')
async def get_bioworkflow_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BioworkflowIndex))
    return result.scalars().all()

@router.post('/bioworkflow_index')
async def create_bioworkflow_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BioworkflowIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
