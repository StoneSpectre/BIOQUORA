"""
BIOQUORA - Stage 2 to Stage 3 Identity Integration Pipeline
Implements Module 14 for Step 4 Stage 3 (BioIdentity v1.0).
Coordinates: Ontology Concept -> Canonical Identifier -> Identity Resolution -> BIOQ-ID -> Graph Node Candidate.
"""

from pydantic import BaseModel
from bioquora.ontology.registry.canonical_identifier_registry import CanonicalOntologyConcept
from bioquora.identity.registry.canonical_identity import CanonicalIdentityRegistry, CanonicalEntityRecord
from bioquora.identity.bioq_ids.generator import EntityCategory

class GraphNodeCandidateEnvelope(BaseModel):
    bioq_id: str
    preferred_name: str
    preferred_curie: str
    entity_category: EntityCategory
    resolved_aliases: list
    is_graph_ready: bool = True

class Stage2IdentityIntegrationPipeline:
    def __init__(self, registry: CanonicalIdentityRegistry):
        self.registry = registry

    def process_ontology_concept(self, concept: CanonicalOntologyConcept, category: EntityCategory) -> GraphNodeCandidateEnvelope:
        existing = self.registry.resolve_external_id(concept.preferred_identifier)
        if existing:
            return GraphNodeCandidateEnvelope(
                bioq_id=existing.bioq_id,
                preferred_name=existing.preferred_name,
                preferred_curie=existing.preferred_ontology_id,
                entity_category=existing.entity_type,
                resolved_aliases=existing.aliases
            )

        new_rec = self.registry.register_entity(
            preferred_name=concept.preferred_label,
            preferred_ontology_id=concept.preferred_identifier,
            entity_type=category,
            namespace=concept.ontology,
            synonyms=concept.aliases,
            external_ids=concept.external_ids
        )

        return GraphNodeCandidateEnvelope(
            bioq_id=new_rec.bioq_id,
            preferred_name=new_rec.preferred_name,
            preferred_curie=new_rec.preferred_ontology_id,
            entity_category=new_rec.entity_type,
            resolved_aliases=new_rec.aliases
        )
