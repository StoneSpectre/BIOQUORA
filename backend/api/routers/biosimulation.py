from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.biosimulation import *

router = APIRouter(prefix='/api/v1/biosimulation', tags=['biosimulation'])

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

@router.get('/molecular_model')
async def get_molecular_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MolecularModelRegistry))
    return result.scalars().all()

@router.post('/molecular_model')
async def create_molecular_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MolecularModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protein_model')
async def get_protein_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProteinModelRegistry))
    return result.scalars().all()

@router.post('/protein_model')
async def create_protein_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProteinModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/cellular_model')
async def get_cellular_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CellularModelRegistry))
    return result.scalars().all()

@router.post('/cellular_model')
async def create_cellular_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CellularModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/tissue_model')
async def get_tissue_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(TissueModelRegistry))
    return result.scalars().all()

@router.post('/tissue_model')
async def create_tissue_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = TissueModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/physiology_model')
async def get_physiology_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PhysiologyModelRegistry))
    return result.scalars().all()

@router.post('/physiology_model')
async def create_physiology_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PhysiologyModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/systems_biology')
async def get_systems_biology_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SystemsBiologyRegistry))
    return result.scalars().all()

@router.post('/systems_biology')
async def create_systems_biology_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SystemsBiologyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/omics_model')
async def get_omics_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OmicsModelRegistry))
    return result.scalars().all()

@router.post('/omics_model')
async def create_omics_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OmicsModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/disease_model')
async def get_disease_model_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DiseaseModelRegistry))
    return result.scalars().all()

@router.post('/disease_model')
async def create_disease_model_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DiseaseModelRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/pk_pd')
async def get_pk_pd_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PkPdRegistry))
    return result.scalars().all()

@router.post('/pk_pd')
async def create_pk_pd_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = PkPdRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/epidemiology')
async def get_epidemiology_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EpidemiologyRegistry))
    return result.scalars().all()

@router.post('/epidemiology')
async def create_epidemiology_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EpidemiologyRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/experiment')
async def get_experiment_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ExperimentRegistry))
    return result.scalars().all()

@router.post('/experiment')
async def create_experiment_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ExperimentRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/digital_twin')
async def get_digital_twin_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DigitalTwinRegistry))
    return result.scalars().all()

@router.post('/digital_twin')
async def create_digital_twin_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DigitalTwinRegistry(**data)
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

@router.get('/sensitivity')
async def get_sensitivity_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SensitivityRegistry))
    return result.scalars().all()

@router.post('/sensitivity')
async def create_sensitivity_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SensitivityRegistry(**data)
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

@router.get('/simulation_index')
async def get_simulation_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SimulationIndex))
    return result.scalars().all()

@router.post('/simulation_index')
async def create_simulation_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SimulationIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
