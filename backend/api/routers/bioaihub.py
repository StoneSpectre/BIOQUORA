from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioaihub import *

router = APIRouter(prefix='/api/v1/bioaihub', tags=['bioaihub'])

@router.get('/developer')
async def get_developer_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DeveloperRegistry))
    return result.scalars().all()

@router.post('/developer')
async def create_developer_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DeveloperRegistry(**data)
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

@router.get('/sdk')
async def get_sdk_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SdkRegistry))
    return result.scalars().all()

@router.post('/sdk')
async def create_sdk_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SdkRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/plugin')
async def get_plugin_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PluginRegistry))
    return result.scalars().all()

@router.post('/plugin')
async def create_plugin_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PluginRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/extension')
async def get_extension_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExtensionRegistry))
    return result.scalars().all()

@router.post('/extension')
async def create_extension_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExtensionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/marketplace')
async def get_marketplace_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MarketplaceRegistry))
    return result.scalars().all()

@router.post('/marketplace')
async def create_marketplace_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MarketplaceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow_market')
async def get_workflow_market_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowMarketRegistry))
    return result.scalars().all()

@router.post('/workflow_market')
async def create_workflow_market_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowMarketRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/agent_market')
async def get_agent_market_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentMarketRegistry))
    return result.scalars().all()

@router.post('/agent_market')
async def create_agent_market_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgentMarketRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model_market')
async def get_model_market_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelMarketRegistry))
    return result.scalars().all()

@router.post('/model_market')
async def create_model_market_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelMarketRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dataset_market')
async def get_dataset_market_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetMarketRegistry))
    return result.scalars().all()

@router.post('/dataset_market')
async def create_dataset_market_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetMarketRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/billing')
async def get_billing_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BillingRegistry))
    return result.scalars().all()

@router.post('/billing')
async def create_billing_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BillingRegistry(**data)
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

@router.get('/certification')
async def get_certification_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CertificationRegistry))
    return result.scalars().all()

@router.post('/certification')
async def create_certification_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CertificationRegistry(**data)
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

@router.get('/community')
async def get_community_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CommunityRegistry))
    return result.scalars().all()

@router.post('/community')
async def create_community_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CommunityRegistry(**data)
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

@router.get('/integration')
async def get_integration_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IntegrationRegistry))
    return result.scalars().all()

@router.post('/integration')
async def create_integration_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = IntegrationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/bioaihub_index')
async def get_bioaihub_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BioaihubIndex))
    return result.scalars().all()

@router.post('/bioaihub_index')
async def create_bioaihub_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BioaihubIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
