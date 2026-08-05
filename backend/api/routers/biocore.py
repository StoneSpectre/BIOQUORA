from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biocore import *

router = APIRouter(prefix='/api/v1/biocore', tags=['biocore'])

@router.get('/kernel')
async def get_kernel_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(KernelRegistry))
    return result.scalars().all()

@router.post('/kernel')
async def create_kernel_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = KernelRegistry(**data)
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

@router.get('/orchestration')
async def get_orchestration_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OrchestrationRegistry))
    return result.scalars().all()

@router.post('/orchestration')
async def create_orchestration_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OrchestrationRegistry(**data)
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

@router.get('/knowledge')
async def get_knowledge_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(KnowledgeRegistry))
    return result.scalars().all()

@router.post('/knowledge')
async def create_knowledge_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = KnowledgeRegistry(**data)
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

@router.get('/enterprise')
async def get_enterprise_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EnterpriseRegistry))
    return result.scalars().all()

@router.post('/enterprise')
async def create_enterprise_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EnterpriseRegistry(**data)
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

@router.get('/version')
async def get_version_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VersionRegistry))
    return result.scalars().all()

@router.post('/version')
async def create_version_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VersionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/platform')
async def get_platform_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PlatformRegistry))
    return result.scalars().all()

@router.post('/platform')
async def create_platform_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PlatformRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/civilization')
async def get_civilization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CivilizationRegistry))
    return result.scalars().all()

@router.post('/civilization')
async def create_civilization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CivilizationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/biocore_index')
async def get_biocore_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiocoreIndex))
    return result.scalars().all()

@router.post('/biocore_index')
async def create_biocore_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiocoreIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
