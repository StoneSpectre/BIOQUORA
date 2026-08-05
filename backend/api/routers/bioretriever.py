from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from api.core.database import get_db
from api.models.bioretriever import *

router = APIRouter(prefix='/api/v1/bioretriever', tags=['bioretriever'])

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

@router.get('/semantic_index')
async def get_semantic_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SemanticIndex))
    return result.scalars().all()

@router.post('/semantic_index')
async def create_semantic_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SemanticIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/vector_index')
async def get_vector_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(VectorIndex))
    return result.scalars().all()

@router.post('/vector_index')
async def create_vector_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = VectorIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/graph_index')
async def get_graph_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GraphIndex))
    return result.scalars().all()

@router.post('/graph_index')
async def create_graph_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GraphIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/citation_index')
async def get_citation_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(CitationIndex))
    return result.scalars().all()

@router.post('/citation_index')
async def create_citation_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = CitationIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ontology_index')
async def get_ontology_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(OntologyIndex))
    return result.scalars().all()

@router.post('/ontology_index')
async def create_ontology_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = OntologyIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/dataset_index')
async def get_dataset_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(DatasetIndex))
    return result.scalars().all()

@router.post('/dataset_index')
async def create_dataset_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = DatasetIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/software_index')
async def get_software_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SoftwareIndex))
    return result.scalars().all()

@router.post('/software_index')
async def create_software_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = SoftwareIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protocol_index')
async def get_protocol_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProtocolIndex))
    return result.scalars().all()

@router.post('/protocol_index')
async def create_protocol_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProtocolIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/model_index')
async def get_model_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ModelIndex))
    return result.scalars().all()

@router.post('/model_index')
async def create_model_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ModelIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/education_index')
async def get_education_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EducationIndex))
    return result.scalars().all()

@router.post('/education_index')
async def create_education_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EducationIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/molecular_index')
async def get_molecular_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MolecularIndex))
    return result.scalars().all()

@router.post('/molecular_index')
async def create_molecular_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MolecularIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/protein_index')
async def get_protein_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProteinIndex))
    return result.scalars().all()

@router.post('/protein_index')
async def create_protein_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProteinIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/genomic_index')
async def get_genomic_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(GenomicIndex))
    return result.scalars().all()

@router.post('/genomic_index')
async def create_genomic_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = GenomicIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/clinical_index')
async def get_clinical_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ClinicalIndex))
    return result.scalars().all()

@router.post('/clinical_index')
async def create_clinical_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ClinicalIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/multimodal_index')
async def get_multimodal_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(MultimodalIndex))
    return result.scalars().all()

@router.post('/multimodal_index')
async def create_multimodal_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = MultimodalIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/evidence_index')
async def get_evidence_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(EvidenceIndex))
    return result.scalars().all()

@router.post('/evidence_index')
async def create_evidence_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = EvidenceIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/ranking_index')
async def get_ranking_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(RankingIndex))
    return result.scalars().all()

@router.post('/ranking_index')
async def create_ranking_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = RankingIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/provenance_index')
async def get_provenance_index(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ProvenanceIndex))
    return result.scalars().all()

@router.post('/provenance_index')
async def create_provenance_index(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = ProvenanceIndex(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record

@router.get('/indexing')
async def get_indexing_registry(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(IndexingRegistry))
    return result.scalars().all()

@router.post('/indexing')
async def create_indexing_registry(data: dict, db: AsyncSession = Depends(get_db)):
    new_record = IndexingRegistry(**data)
    db.add(new_record)
    await db.commit()
    await db.refresh(new_record)
    return new_record
