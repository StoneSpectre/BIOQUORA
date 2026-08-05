from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biomemory import *

router = APIRouter(prefix='/api/v1/biomemory', tags=['biomemory'])

@router.get('/personal_memory')
async def get_personal_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PersonalMemoryRegistry))
    return result.scalars().all()

@router.post('/personal_memory')
async def create_personal_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PersonalMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/project_memory')
async def get_project_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProjectMemoryRegistry))
    return result.scalars().all()

@router.post('/project_memory')
async def create_project_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProjectMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/institution_memory')
async def get_institution_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InstitutionMemoryRegistry))
    return result.scalars().all()

@router.post('/institution_memory')
async def create_institution_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InstitutionMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/laboratory_memory')
async def get_laboratory_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LaboratoryMemoryRegistry))
    return result.scalars().all()

@router.post('/laboratory_memory')
async def create_laboratory_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LaboratoryMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/literature_memory')
async def get_literature_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureMemoryRegistry))
    return result.scalars().all()

@router.post('/literature_memory')
async def create_literature_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dataset_memory')
async def get_dataset_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetMemoryRegistry))
    return result.scalars().all()

@router.post('/dataset_memory')
async def create_dataset_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/code_memory')
async def get_code_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CodeMemoryRegistry))
    return result.scalars().all()

@router.post('/code_memory')
async def create_code_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CodeMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/graph_memory')
async def get_graph_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphMemoryRegistry))
    return result.scalars().all()

@router.post('/graph_memory')
async def create_graph_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/hypothesis_memory')
async def get_hypothesis_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(HypothesisMemoryRegistry))
    return result.scalars().all()

@router.post('/hypothesis_memory')
async def create_hypothesis_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = HypothesisMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/experiment_memory')
async def get_experiment_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExperimentMemoryRegistry))
    return result.scalars().all()

@router.post('/experiment_memory')
async def create_experiment_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExperimentMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/agent_memory')
async def get_agent_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentMemoryRegistry))
    return result.scalars().all()

@router.post('/agent_memory')
async def create_agent_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgentMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/team_memory')
async def get_team_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TeamMemoryRegistry))
    return result.scalars().all()

@router.post('/team_memory')
async def create_team_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TeamMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/education_memory')
async def get_education_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EducationMemoryRegistry))
    return result.scalars().all()

@router.post('/education_memory')
async def create_education_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EducationMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/enterprise_memory')
async def get_enterprise_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EnterpriseMemoryRegistry))
    return result.scalars().all()

@router.post('/enterprise_memory')
async def create_enterprise_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EnterpriseMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/citation_memory')
async def get_citation_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationMemoryRegistry))
    return result.scalars().all()

@router.post('/citation_memory')
async def create_citation_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/timeline_memory')
async def get_timeline_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TimelineMemoryRegistry))
    return result.scalars().all()

@router.post('/timeline_memory')
async def create_timeline_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TimelineMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow_memory')
async def get_workflow_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowMemoryRegistry))
    return result.scalars().all()

@router.post('/workflow_memory')
async def create_workflow_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/decision_memory')
async def get_decision_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DecisionMemoryRegistry))
    return result.scalars().all()

@router.post('/decision_memory')
async def create_decision_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DecisionMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/governance_memory')
async def get_governance_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GovernanceMemoryRegistry))
    return result.scalars().all()

@router.post('/governance_memory')
async def create_governance_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GovernanceMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/audit_memory')
async def get_audit_memory_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AuditMemoryRegistry))
    return result.scalars().all()

@router.post('/audit_memory')
async def create_audit_memory_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AuditMemoryRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
