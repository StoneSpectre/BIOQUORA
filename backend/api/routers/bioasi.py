from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioasi import *

router = APIRouter(prefix='/api/v1/bioasi', tags=['bioasi'])

@router.get('/executive')
async def get_executive_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExecutiveRegistry))
    return result.scalars().all()

@router.post('/executive')
async def create_executive_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExecutiveRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/mission')
async def get_mission_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MissionRegistry))
    return result.scalars().all()

@router.post('/mission')
async def create_mission_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MissionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/cognition')
async def get_cognition_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CognitionRegistry))
    return result.scalars().all()

@router.post('/cognition')
async def create_cognition_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CognitionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/coordination')
async def get_coordination_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CoordinationRegistry))
    return result.scalars().all()

@router.post('/coordination')
async def create_coordination_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CoordinationRegistry(**data)
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

@router.get('/planning')
async def get_planning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PlanningRegistry))
    return result.scalars().all()

@router.post('/planning')
async def create_planning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PlanningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/learning')
async def get_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LearningRegistry))
    return result.scalars().all()

@router.post('/learning')
async def create_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/federation')
async def get_federation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FederationRegistry))
    return result.scalars().all()

@router.post('/federation')
async def create_federation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = FederationRegistry(**data)
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

@router.get('/decision')
async def get_decision_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DecisionRegistry))
    return result.scalars().all()

@router.post('/decision')
async def create_decision_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DecisionRegistry(**data)
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

@router.get('/resource')
async def get_resource_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ResourceRegistry))
    return result.scalars().all()

@router.post('/resource')
async def create_resource_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ResourceRegistry(**data)
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

@router.get('/intelligence')
async def get_intelligence_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IntelligenceRegistry))
    return result.scalars().all()

@router.post('/intelligence')
async def create_intelligence_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = IntelligenceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/bioasi_index')
async def get_bioasi_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BioasiIndex))
    return result.scalars().all()

@router.post('/bioasi_index')
async def create_bioasi_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BioasiIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
