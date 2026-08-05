from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioinference import *

router = APIRouter(prefix='/api/v1/bioinference', tags=['bioinference'])

@router.get('/inference')
async def get_inference_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InferenceRegistry))
    return result.scalars().all()

@router.post('/inference')
async def create_inference_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InferenceRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model')
async def get_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelRegistry))
    return result.scalars().all()

@router.post('/model')
async def create_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/deployment')
async def get_deployment_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DeploymentRegistry))
    return result.scalars().all()

@router.post('/deployment')
async def create_deployment_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DeploymentRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/gpu')
async def get_gpu_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GpuRegistry))
    return result.scalars().all()

@router.post('/gpu')
async def create_gpu_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GpuRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/cpu')
async def get_cpu_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CpuRegistry))
    return result.scalars().all()

@router.post('/cpu')
async def create_cpu_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CpuRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/edge')
async def get_edge_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EdgeRegistry))
    return result.scalars().all()

@router.post('/edge')
async def create_edge_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EdgeRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/cloud')
async def get_cloud_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CloudRegistry))
    return result.scalars().all()

@router.post('/cloud')
async def create_cloud_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CloudRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workload')
async def get_workload_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkloadRegistry))
    return result.scalars().all()

@router.post('/workload')
async def create_workload_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkloadRegistry(**data)
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

@router.get('/latency')
async def get_latency_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LatencyRegistry))
    return result.scalars().all()

@router.post('/latency')
async def create_latency_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LatencyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/throughput')
async def get_throughput_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ThroughputRegistry))
    return result.scalars().all()

@router.post('/throughput')
async def create_throughput_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ThroughputRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/security')
async def get_security_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SecurityRegistry))
    return result.scalars().all()

@router.post('/security')
async def create_security_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SecurityRegistry(**data)
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

@router.get('/session')
async def get_session_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SessionRegistry))
    return result.scalars().all()

@router.post('/session')
async def create_session_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SessionRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/pipeline')
async def get_pipeline_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PipelineRegistry))
    return result.scalars().all()

@router.post('/pipeline')
async def create_pipeline_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PipelineRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/infrastructure_index')
async def get_infrastructure_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(InfrastructureIndex))
    return result.scalars().all()

@router.post('/infrastructure_index')
async def create_infrastructure_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = InfrastructureIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
