from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biovalidator import *

router = APIRouter(prefix='/api/v1/biovalidator', tags=['biovalidator'])

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

@router.get('/citation_validation')
async def get_citation_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationValidationRegistry))
    return result.scalars().all()

@router.post('/citation_validation')
async def create_citation_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/claim')
async def get_claim_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ClaimRegistry))
    return result.scalars().all()

@router.post('/claim')
async def create_claim_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ClaimRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/statistics_validation')
async def get_statistics_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(StatisticsValidationRegistry))
    return result.scalars().all()

@router.post('/statistics_validation')
async def create_statistics_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = StatisticsValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/logic_validation')
async def get_logic_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(LogicValidationRegistry))
    return result.scalars().all()

@router.post('/logic_validation')
async def create_logic_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = LogicValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ontology_validation')
async def get_ontology_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OntologyValidationRegistry))
    return result.scalars().all()

@router.post('/ontology_validation')
async def create_ontology_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OntologyValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/code_validation')
async def get_code_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CodeValidationRegistry))
    return result.scalars().all()

@router.post('/code_validation')
async def create_code_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CodeValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/simulation_validation')
async def get_simulation_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SimulationValidationRegistry))
    return result.scalars().all()

@router.post('/simulation_validation')
async def create_simulation_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SimulationValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dataset_validation')
async def get_dataset_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetValidationRegistry))
    return result.scalars().all()

@router.post('/dataset_validation')
async def create_dataset_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal_validation')
async def get_multimodal_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalValidationRegistry))
    return result.scalars().all()

@router.post('/multimodal_validation')
async def create_multimodal_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/clinical_validation')
async def get_clinical_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ClinicalValidationRegistry))
    return result.scalars().all()

@router.post('/clinical_validation')
async def create_clinical_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ClinicalValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/workflow_validation')
async def get_workflow_validation_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WorkflowValidationRegistry))
    return result.scalars().all()

@router.post('/workflow_validation')
async def create_workflow_validation_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = WorkflowValidationRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/trust_score')
async def get_trust_score_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TrustScoreRegistry))
    return result.scalars().all()

@router.post('/trust_score')
async def create_trust_score_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TrustScoreRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/provenance')
async def get_provenance_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProvenanceRegistry))
    return result.scalars().all()

@router.post('/provenance')
async def create_provenance_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProvenanceRegistry(**data)
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
