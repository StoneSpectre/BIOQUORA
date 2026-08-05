"""
BIOQUORA - Universal Biomedical Node Model
Implements Module 1 for Step 4 Stage 4 (BioNodes v1.0).
Defines the universal graph node base template for all biomedical concepts in BioGraph.
"""

from datetime import datetime
from typing import List, Dict, Any, Optional
from pydantic import BaseModel, Field
from bioquora.identity.bioq_ids.generator import EntityCategory
from bioquora.nodes.metadata.node_metadata import NodeMetadataEnvelope

class UniversalBiomedicalNode(BaseModel):
    bioq_id: str
    entity_type: str
    preferred_name: str
    ontology_ids: Dict[str, str] = Field(default_factory=dict)
    aliases: List[str] = Field(default_factory=list)
    description: str = ""
    status: str = "PUBLISHED"
    version: str = "1.0"
    created_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    updated_at: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    source: str = "Bioquora-Node-Factory"
    confidence: float = 0.99
    quality_score: float = 0.99
    provenance: str = "Ontology + Identity Pipeline"
    metadata: NodeMetadataEnvelope = Field(default_factory=NodeMetadataEnvelope)

    def to_graph_dict(self) -> Dict[str, Any]:
        """Returns a flat or JSON-compatible dict ready for Neo4j/PostgreSQL ingestion."""
        d = self.dict()
        return d
