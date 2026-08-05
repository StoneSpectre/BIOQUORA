from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biolearning import *

router = APIRouter(prefix='/api/v1/biolearning', tags=['biolearning'])

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

@router.get('/literature_learning')
async def get_literature_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureLearningRegistry))
    return result.scalars().all()

@router.post('/literature_learning')
async def create_literature_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/graph_learning')
async def get_graph_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphLearningRegistry))
    return result.scalars().all()

@router.post('/graph_learning')
async def create_graph_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dataset_learning')
async def get_dataset_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetLearningRegistry))
    return result.scalars().all()

@router.post('/dataset_learning')
async def create_dataset_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ontology_learning')
async def get_ontology_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OntologyLearningRegistry))
    return result.scalars().all()

@router.post('/ontology_learning')
async def create_ontology_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OntologyLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model_learning')
async def get_model_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelLearningRegistry))
    return result.scalars().all()

@router.post('/model_learning')
async def create_model_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/reasoning_learning')
async def get_reasoning_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReasoningLearningRegistry))
    return result.scalars().all()

@router.post('/reasoning_learning')
async def create_reasoning_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ReasoningLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/agent_learning')
async def get_agent_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AgentLearningRegistry))
    return result.scalars().all()

@router.post('/agent_learning')
async def create_agent_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AgentLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow_learning')
async def get_workflow_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowLearningRegistry))
    return result.scalars().all()

@router.post('/workflow_learning')
async def create_workflow_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/benchmark_learning')
async def get_benchmark_learning_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BenchmarkLearningRegistry))
    return result.scalars().all()

@router.post('/benchmark_learning')
async def create_benchmark_learning_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BenchmarkLearningRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/feedback')
async def get_feedback_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FeedbackRegistry))
    return result.scalars().all()

@router.post('/feedback')
async def create_feedback_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = FeedbackRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/expert_review')
async def get_expert_review_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExpertReviewRegistry))
    return result.scalars().all()

@router.post('/expert_review')
async def create_expert_review_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExpertReviewRegistry(**data)
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

@router.get('/adaptive')
async def get_adaptive_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(AdaptiveRegistry))
    return result.scalars().all()

@router.post('/adaptive')
async def create_adaptive_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = AdaptiveRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/biolearning_index')
async def get_biolearning_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiolearningIndex))
    return result.scalars().all()

@router.post('/biolearning_index')
async def create_biolearning_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiolearningIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
