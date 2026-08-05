from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biosafe import *

router = APIRouter(prefix='/api/v1/biosafe', tags=['biosafe'])

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

@router.get('/authentication')
async def get_authentication_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AuthenticationRegistry))
    return result.scalars().all()

@router.post('/authentication')
async def create_authentication_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AuthenticationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/authorization')
async def get_authorization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AuthorizationRegistry))
    return result.scalars().all()

@router.post('/authorization')
async def create_authorization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AuthorizationRegistry(**data)
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

@router.get('/risk')
async def get_risk_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RiskRegistry))
    return result.scalars().all()

@router.post('/risk')
async def create_risk_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = RiskRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/compliance')
async def get_compliance_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ComplianceRegistry))
    return result.scalars().all()

@router.post('/compliance')
async def create_compliance_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ComplianceRegistry(**data)
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

@router.get('/incident')
async def get_incident_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IncidentRegistry))
    return result.scalars().all()

@router.post('/incident')
async def create_incident_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = IncidentRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/security_event')
async def get_security_event_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SecurityEventRegistry))
    return result.scalars().all()

@router.post('/security_event')
async def create_security_event_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SecurityEventRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model_security')
async def get_model_security_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelSecurityRegistry))
    return result.scalars().all()

@router.post('/model_security')
async def create_model_security_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelSecurityRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/api_security')
async def get_api_security_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ApiSecurityRegistry))
    return result.scalars().all()

@router.post('/api_security')
async def create_api_security_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ApiSecurityRegistry(**data)
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

@router.get('/threat')
async def get_threat_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ThreatRegistry))
    return result.scalars().all()

@router.post('/threat')
async def create_threat_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ThreatRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/trust')
async def get_trust_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TrustRegistry))
    return result.scalars().all()

@router.post('/trust')
async def create_trust_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TrustRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/biosafe_index')
async def get_biosafe_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiosafeIndex))
    return result.scalars().all()

@router.post('/biosafe_index')
async def create_biosafe_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiosafeIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
