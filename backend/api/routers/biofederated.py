from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biofederated import *

router = APIRouter(prefix='/api/v1/biofederated', tags=['biofederated'])

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

@router.get('/institution')
async def get_institution_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InstitutionRegistry))
    return result.scalars().all()

@router.post('/institution')
async def create_institution_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InstitutionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/node')
async def get_node_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(NodeRegistry))
    return result.scalars().all()

@router.post('/node')
async def create_node_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = NodeRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/identity')
async def get_identity_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IdentityRegistry))
    return result.scalars().all()

@router.post('/identity')
async def create_identity_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = IdentityRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/policy')
async def get_policy_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PolicyRegistry))
    return result.scalars().all()

@router.post('/policy')
async def create_policy_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PolicyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/synchronization')
async def get_synchronization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SynchronizationRegistry))
    return result.scalars().all()

@router.post('/synchronization')
async def create_synchronization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SynchronizationRegistry(**data)
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

@router.get('/privacy')
async def get_privacy_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PrivacyRegistry))
    return result.scalars().all()

@router.post('/privacy')
async def create_privacy_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PrivacyRegistry(**data)
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

@router.get('/knowledge_exchange')
async def get_knowledge_exchange_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(KnowledgeExchangeRegistry))
    return result.scalars().all()

@router.post('/knowledge_exchange')
async def create_knowledge_exchange_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = KnowledgeExchangeRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/retrieval')
async def get_retrieval_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RetrievalRegistry))
    return result.scalars().all()

@router.post('/retrieval')
async def create_retrieval_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = RetrievalRegistry(**data)
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

@router.get('/agreement')
async def get_agreement_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgreementRegistry))
    return result.scalars().all()

@router.post('/agreement')
async def create_agreement_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgreementRegistry(**data)
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

@router.get('/biofederated_index')
async def get_biofederated_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiofederatedIndex))
    return result.scalars().all()

@router.post('/biofederated_index')
async def create_biofederated_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiofederatedIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
