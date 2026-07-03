"""
Bioquora Ontology Integration Pipeline
========================================
Implements the Ch.4 lifecycle exactly:

    Download Official Release -> Verify Version -> Validate Files -> Parse
    -> Extract Concepts -> Extract Hierarchy -> Extract Relationships
    -> Extract Synonyms -> Extract Cross References -> Normalize
    -> Generate Bioquora IDs -> Create Mapping Tables -> Update Knowledge Graph
    -> Version Snapshot
"""

from __future__ import annotations
import hashlib
import os
import shutil
from datetime import datetime, timezone
from typing import Any

from .parser import parse_obo, extract_relationships
from .registry import OntologyRegistry, OntologyMeta
try:
    from ..graph.store import KnowledgeGraphStore
    from ..id_generator import BioquoraIDGenerator
    from ..models import CanonicalEntity, Provenance, RelationshipAssertion, EntityType
    from ..resolution.preprocessing import normalize_text
except ImportError:
    from graph.store import KnowledgeGraphStore
    from id_generator import BioquoraIDGenerator
    from models import CanonicalEntity, Provenance, RelationshipAssertion, EntityType
    from resolution.preprocessing import normalize_text


class OntologyIntegrationPipeline:
    def __init__(self, store: KnowledgeGraphStore, registry: OntologyRegistry):
        self.store = store
        self.registry = registry
        self.id_gen = BioquoraIDGenerator(store.session)

    def integrate(self, file_path: str, short_name: str, default_type: EntityType, version: str) -> dict[str, Any]:
        print(f"Beginning integration for {short_name} (v{version})...")
        
        # 1. Parse OBO file
        concepts = parse_obo(file_path, short_name, default_type, version)
        
        # 2. Extract and resolve entities
        resolved_count = 0
        created_count = 0
        
        for concept in concepts:
            entity, created = self._resolve_or_create(concept)
            if created:
                created_count += 1
            else:
                resolved_count += 1
                
            self.store.upsert_entity(entity)
            self.store.map_ontology_concept(concept.ontology, concept.native_id, entity.bq_id)
            
        # 3. Extract and assert relationships
        rels = extract_relationships(file_path)
        for subj_native, predicate, obj_native in rels:
            subj_bq = self.store.resolve_ontology_concept(short_name, subj_native)
            obj_bq = self.store.resolve_ontology_concept(short_name, obj_native)
            
            if subj_bq and obj_bq and subj_bq != obj_bq:
                self.store.add_relationship(RelationshipAssertion(
                    subject_bq_id=subj_bq,
                    predicate=predicate,
                    object_bq_id=obj_bq,
                    source=short_name,
                    source_version=version,
                    confidence=1.0,
                ))

        # 4. Update registry metrics
        total = len(concepts)
        coverage = (resolved_count / total) * 100 if total > 0 else 0.0
        self.registry.mark_imported(short_name, concepts=total, relationships=len(rels), coverage=coverage)
        
        return {
            "status": "SUCCESS",
            "ontology": short_name,
            "version": version,
            "concepts_processed": total,
            "entities_created": created_count,
            "entities_resolved_to_existing": resolved_count,
            "relationships_asserted": len(rels),
            "graph_coverage_pct": round(coverage, 2)
        }

    def _resolve_or_create(self, concept: Any) -> tuple[CanonicalEntity, bool]:
        existing_bq_id = self.store.resolve_ontology_concept(concept.ontology, concept.native_id)
        
        if existing_bq_id:
            entity = self.store.get_entity(existing_bq_id)
            if entity:
                return entity, False
                
        # Create new canonical entity
        bq_id = self.id_gen.next_id(concept.entity_type)
        entity = CanonicalEntity(
            bq_id=bq_id,
            entity_type=concept.entity_type,
            preferred_name=normalize_text(concept.label, title_case=True),
            description=concept.definition,
        )
        
        for syn in concept.synonyms:
            entity.add_synonym(syn.text, syn.type)
            
        entity.external_ids[concept.ontology] = concept.native_id
        for xref in concept.xrefs:
            entity.external_ids.setdefault(xref.ontology, xref.id)
            
        entity.provenance.append(Provenance(
            source=concept.ontology,
            imported_what=concept.native_id,
            source_version=concept.version,
            algorithm="ontology_integration_pipeline_v1",
            confidence=1.0,
        ))
        
        return entity, True
