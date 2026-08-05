from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioeval import *

router = APIRouter(prefix='/api/v1/bioeval', tags=['bioeval'])

@router.get('/benchmark')
async def get_benchmark_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BenchmarkRegistry))
    return result.scalars().all()

@router.post('/benchmark')
async def create_benchmark_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BenchmarkRegistry(**data)
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

@router.get('/citation')
async def get_citation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationRegistry))
    return result.scalars().all()

@router.post('/citation')
async def create_citation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/graph')
async def get_graph_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphRegistry))
    return result.scalars().all()

@router.post('/graph')
async def create_graph_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphRegistry(**data)
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

@router.get('/vision')
async def get_vision_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VisionRegistry))
    return result.scalars().all()

@router.post('/vision')
async def create_vision_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VisionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal')
async def get_multimodal_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalRegistry))
    return result.scalars().all()

@router.post('/multimodal')
async def create_multimodal_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/safety')
async def get_safety_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SafetyRegistry))
    return result.scalars().all()

@router.post('/safety')
async def create_safety_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SafetyRegistry(**data)
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

@router.get('/leaderboard')
async def get_leaderboard_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LeaderboardRegistry))
    return result.scalars().all()

@router.post('/leaderboard')
async def create_leaderboard_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LeaderboardRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/reproducibility')
async def get_reproducibility_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReproducibilityRegistry))
    return result.scalars().all()

@router.post('/reproducibility')
async def create_reproducibility_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ReproducibilityRegistry(**data)
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

@router.get('/improvement')
async def get_improvement_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ImprovementRegistry))
    return result.scalars().all()

@router.post('/improvement')
async def create_improvement_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ImprovementRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/bioeval_index')
async def get_bioeval_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BioevalIndex))
    return result.scalars().all()

@router.post('/bioeval_index')
async def create_bioeval_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BioevalIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
