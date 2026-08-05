from sqlalchemy import Column, String, Float, Integer, Boolean, Text, JSON, DateTime
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from sqlalchemy.sql import func
from uuid import uuid4
from api.core.database import Base

class RetrievalRegistry(Base):
    __tablename__ = 'retrieval_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    query_text = Column(Text)
    intent_classification = Column(Text)
    retrieval_strategy = Column(JSON)
    execution_time_ms = Column(Integer)

class SemanticIndex(Base):
    __tablename__ = 'semantic_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_chunk_id = Column(PG_UUID(as_uuid=True))
    embedding = Column(Text) # Fallback for VECTOR(1536)
    metadata_col = Column('metadata', JSON)

class VectorIndex(Base):
    __tablename__ = 'vector_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    entity_id = Column(PG_UUID(as_uuid=True))
    entity_type = Column(Text)
    embedding = Column(Text) # Fallback for VECTOR(1536)

class GraphIndex(Base):
    __tablename__ = 'graph_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    node_id = Column(PG_UUID(as_uuid=True))
    subgraph_hash = Column(Text)
    graph_context = Column(Text)

class CitationIndex(Base):
    __tablename__ = 'citation_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    document_id = Column(PG_UUID(as_uuid=True))
    cited_by_count = Column(Integer)
    citation_network_context = Column(JSON)

class OntologyIndex(Base):
    __tablename__ = 'ontology_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    term_id = Column(Text)
    synonyms = Column(JSON)
    semantic_type = Column(Text)

class DatasetIndex(Base):
    __tablename__ = 'dataset_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    dataset_id = Column(PG_UUID(as_uuid=True))
    domain_tags = Column(JSON)
    usability_score = Column(Float)

class SoftwareIndex(Base):
    __tablename__ = 'software_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    repo_url = Column(Text)
    tool_type = Column(Text)
    language = Column(Text)

class ProtocolIndex(Base):
    __tablename__ = 'protocol_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    protocol_id = Column(PG_UUID(as_uuid=True))
    methodology_tags = Column(JSON)
    reproducibility_rating = Column(Float)

class ModelIndex(Base):
    __tablename__ = 'model_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    model_name = Column(Text)
    architecture = Column(Text)
    performance_metrics = Column(JSON)

class EducationIndex(Base):
    __tablename__ = 'education_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    module_id = Column(PG_UUID(as_uuid=True))
    difficulty_level = Column(Text)
    competency_tags = Column(JSON)

class MolecularIndex(Base):
    __tablename__ = 'molecular_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    compound_id = Column(Text)
    smiles_string = Column(Text)
    fingerprint = Column(Text) # Fallback for VECTOR(1024)

class ProteinIndex(Base):
    __tablename__ = 'protein_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    uniprot_id = Column(Text)
    sequence = Column(Text)
    family_domains = Column(JSON)

class GenomicIndex(Base):
    __tablename__ = 'genomic_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    locus = Column(Text)
    variant_type = Column(Text)
    clinical_significance = Column(Text)

class ClinicalIndex(Base):
    __tablename__ = 'clinical_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    trial_id = Column(Text)
    phase = Column(Text)
    conditions = Column(JSON)

class MultimodalIndex(Base):
    __tablename__ = 'multimodal_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    asset_id = Column(PG_UUID(as_uuid=True))
    modality = Column(Text)
    embedding = Column(Text) # Fallback for VECTOR(1536)

class EvidenceIndex(Base):
    __tablename__ = 'evidence_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    claim_id = Column(PG_UUID(as_uuid=True))
    supporting_documents = Column(JSON)
    contradicting_documents = Column(JSON)

class RankingIndex(Base):
    __tablename__ = 'ranking_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    retrieval_id = Column(PG_UUID(as_uuid=True))
    document_id = Column(PG_UUID(as_uuid=True))
    ranking_score = Column(Float)
    ranking_justification = Column(JSON)

class ProvenanceIndex(Base):
    __tablename__ = 'provenance_index'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    knowledge_node_id = Column(PG_UUID(as_uuid=True))
    source_attribution = Column(JSON)
    trust_score = Column(Float)

class IndexingRegistry(Base):
    __tablename__ = 'indexing_registry'
    __table_args__ = {'extend_existing': True}

    id = Column(PG_UUID(as_uuid=True), primary_key=True, default=uuid4)
    source_name = Column(Text)
    last_indexed_at = Column(DateTime(timezone=True), server_default=func.now())
    documents_processed = Column(Integer)
    status = Column(Text)
