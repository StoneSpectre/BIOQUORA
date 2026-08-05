from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioassistant import *

router = APIRouter(prefix='/api/v1/bioassistant', tags=['bioassistant'])

@router.get('/assistant')
async def get_assistant_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AssistantRegistry))
    return result.scalars().all()

@router.post('/assistant')
async def create_assistant_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AssistantRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/user_profile')
async def get_user_profile_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UserProfileRegistry))
    return result.scalars().all()

@router.post('/user_profile')
async def create_user_profile_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = UserProfileRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/research_workspace')
async def get_research_workspace_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ResearchWorkspaceRegistry))
    return result.scalars().all()

@router.post('/research_workspace')
async def create_research_workspace_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ResearchWorkspaceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/project')
async def get_project_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProjectRegistry))
    return result.scalars().all()

@router.post('/project')
async def create_project_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProjectRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/literature_workspace')
async def get_literature_workspace_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureWorkspaceRegistry))
    return result.scalars().all()

@router.post('/literature_workspace')
async def create_literature_workspace_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureWorkspaceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/writing')
async def get_writing_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WritingRegistry))
    return result.scalars().all()

@router.post('/writing')
async def create_writing_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WritingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/programming_workspace')
async def get_programming_workspace_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProgrammingWorkspaceRegistry))
    return result.scalars().all()

@router.post('/programming_workspace')
async def create_programming_workspace_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProgrammingWorkspaceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/statistics_workspace')
async def get_statistics_workspace_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(StatisticsWorkspaceRegistry))
    return result.scalars().all()

@router.post('/statistics_workspace')
async def create_statistics_workspace_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = StatisticsWorkspaceRegistry(**data)
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

@router.get('/meeting')
async def get_meeting_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MeetingRegistry))
    return result.scalars().all()

@router.post('/meeting')
async def create_meeting_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MeetingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/laboratory')
async def get_laboratory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LaboratoryRegistry))
    return result.scalars().all()

@router.post('/laboratory')
async def create_laboratory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LaboratoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/funding')
async def get_funding_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FundingRegistry))
    return result.scalars().all()

@router.post('/funding')
async def create_funding_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = FundingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/conference')
async def get_conference_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ConferenceRegistry))
    return result.scalars().all()

@router.post('/conference')
async def create_conference_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ConferenceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/personalization')
async def get_personalization_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PersonalizationRegistry))
    return result.scalars().all()

@router.post('/personalization')
async def create_personalization_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PersonalizationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/memory_preferences')
async def get_memory_preferences_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MemoryPreferencesRegistry))
    return result.scalars().all()

@router.post('/memory_preferences')
async def create_memory_preferences_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MemoryPreferencesRegistry(**data)
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

@router.get('/productivity')
async def get_productivity_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProductivityRegistry))
    return result.scalars().all()

@router.post('/productivity')
async def create_productivity_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProductivityRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
