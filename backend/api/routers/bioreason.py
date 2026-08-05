from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioreason import *

router = APIRouter(prefix='/api/v1/bioreason', tags=['bioreason'])

@router.get('/reasoning_core')
async def get_reasoning_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReasoningRegistryCore))
    return result.scalars().all()

@router.post('/reasoning_core')
async def create_reasoning_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ReasoningRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/evidence_core')
async def get_evidence_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvidenceRegistryCore))
    return result.scalars().all()

@router.post('/evidence_core')
async def create_evidence_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvidenceRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/hypothesis')
async def get_hypothesis_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(HypothesisRegistry))
    return result.scalars().all()

@router.post('/hypothesis')
async def create_hypothesis_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = HypothesisRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/causal')
async def get_causal_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CausalRegistry))
    return result.scalars().all()

@router.post('/causal')
async def create_causal_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CausalRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/statistical_core')
async def get_statistical_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(StatisticalRegistryCore))
    return result.scalars().all()

@router.post('/statistical_core')
async def create_statistical_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = StatisticalRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/biological_core')
async def get_biological_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BiologicalRegistryCore))
    return result.scalars().all()

@router.post('/biological_core')
async def create_biological_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BiologicalRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/chemistry_core')
async def get_chemistry_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ChemistryRegistryCore))
    return result.scalars().all()

@router.post('/chemistry_core')
async def create_chemistry_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ChemistryRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protein_core')
async def get_protein_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProteinRegistryCore))
    return result.scalars().all()

@router.post('/protein_core')
async def create_protein_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProteinRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/genomics_core')
async def get_genomics_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GenomicsRegistryCore))
    return result.scalars().all()

@router.post('/genomics_core')
async def create_genomics_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GenomicsRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/graph_core')
async def get_graph_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphRegistryCore))
    return result.scalars().all()

@router.post('/graph_core')
async def create_graph_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/literature_core')
async def get_literature_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LiteratureRegistryCore))
    return result.scalars().all()

@router.post('/literature_core')
async def create_literature_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LiteratureRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/citation_core')
async def get_citation_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationRegistryCore))
    return result.scalars().all()

@router.post('/citation_core')
async def create_citation_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/explainability')
async def get_explainability_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExplainabilityRegistry))
    return result.scalars().all()

@router.post('/explainability')
async def create_explainability_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExplainabilityRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/uncertainty')
async def get_uncertainty_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(UncertaintyRegistry))
    return result.scalars().all()

@router.post('/uncertainty')
async def create_uncertainty_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = UncertaintyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/validation')
async def get_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ValidationRegistry))
    return result.scalars().all()

@router.post('/validation')
async def create_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/benchmark_reasoning')
async def get_benchmark_registry_reasoning(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(BenchmarkRegistryReasoning))
    return result.scalars().all()

@router.post('/benchmark_reasoning')
async def create_benchmark_registry_reasoning(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = BenchmarkRegistryReasoning(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow_core')
async def get_workflow_registry_core(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowRegistryCore))
    return result.scalars().all()

@router.post('/workflow_core')
async def create_workflow_registry_core(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowRegistryCore(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/telemetry_reasoning')
async def get_telemetry_registry_reasoning(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TelemetryRegistryReasoning))
    return result.scalars().all()

@router.post('/telemetry_reasoning')
async def create_telemetry_registry_reasoning(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TelemetryRegistryReasoning(**data)
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
