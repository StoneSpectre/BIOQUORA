from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioagents import *
from pydantic import BaseModel
from api.ai.biochemist_agent import BioChemistAgent
from api.ai.clinical_agent import ClinicalTrialAgent

router = APIRouter(prefix='/api/v1/bioagents', tags=['bioagents'])

class AgentExecutionRequest(BaseModel):
    agent_type: str
    task: str

@router.post('/execute')
async def execute_agent_task(request: AgentExecutionRequest, db: AsyncSession = Depends(get_db)):
    # 1. Route to correct agent
    if request.agent_type.lower() == "biochemist":
        agent = BioChemistAgent()
    elif request.agent_type.lower() == "clinicaltrial":
        agent = ClinicalTrialAgent()
    else:
        agent = BioChemistAgent() # Fallback

    # 2. Execute AI logic
    response_data = await agent.think(request.task)

    # 3. Log into AgentInteractionLog
    log_entry = AgentInteractionLog(
        agent_id=None,
        task_id=None,
        input_data={"task": request.task},
        output_data=response_data,
        status=response_data.get("status", "success")
    )
    db.add(log_entry)
    await db.commit()
    await db.refresh(log_entry)

    return {
        "interaction_id": log_entry.id,
        "agent": agent.role_name,
        "response": response_data
    }

@router.get('/agent')
async def get_agent_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentRegistry))
    return result.scalars().all()

@router.post('/agent')
async def create_agent_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgentRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/agent_capability')
async def get_agent_capability_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentCapabilityRegistry))
    return result.scalars().all()

@router.post('/agent_capability')
async def create_agent_capability_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgentCapabilityRegistry(**data)
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

@router.get('/memory_agents')
async def get_memory_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MemoryRegistryAgents))
    return result.scalars().all()

@router.post('/memory_agents')
async def create_memory_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MemoryRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/communication')
async def get_communication_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CommunicationRegistry))
    return result.scalars().all()

@router.post('/communication')
async def create_communication_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CommunicationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/evidence')
async def get_evidence_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvidenceRegistry))
    return result.scalars().all()

@router.post('/evidence')
async def create_evidence_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvidenceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/reasoning_agents')
async def get_reasoning_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReasoningRegistryAgents))
    return result.scalars().all()

@router.post('/reasoning_agents')
async def create_reasoning_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ReasoningRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/literature_agents')
async def get_literature_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureRegistryAgents))
    return result.scalars().all()

@router.post('/literature_agents')
async def create_literature_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/coding')
async def get_coding_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CodingRegistry))
    return result.scalars().all()

@router.post('/coding')
async def create_coding_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CodingRegistry(**data)
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

@router.get('/bioinformatics')
async def get_bioinformatics_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BioinformaticsRegistry))
    return result.scalars().all()

@router.post('/bioinformatics')
async def create_bioinformatics_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BioinformaticsRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/molecular_agents')
async def get_molecular_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MolecularRegistryAgents))
    return result.scalars().all()

@router.post('/molecular_agents')
async def create_molecular_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MolecularRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/clinical_agents')
async def get_clinical_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ClinicalRegistryAgents))
    return result.scalars().all()

@router.post('/clinical_agents')
async def create_clinical_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ClinicalRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/education_agents')
async def get_education_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EducationRegistryAgents))
    return result.scalars().all()

@router.post('/education_agents')
async def create_education_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EducationRegistryAgents(**data)
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

@router.get('/evaluation_agents')
async def get_evaluation_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvaluationRegistryAgents))
    return result.scalars().all()

@router.post('/evaluation_agents')
async def create_evaluation_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvaluationRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/telemetry_agents')
async def get_telemetry_registry_agents(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TelemetryRegistryAgents))
    return result.scalars().all()

@router.post('/telemetry_agents')
async def create_telemetry_registry_agents(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TelemetryRegistryAgents(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/performance')
async def get_performance_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PerformanceRegistry))
    return result.scalars().all()

@router.post('/performance')
async def create_performance_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PerformanceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
