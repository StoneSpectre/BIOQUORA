"""
BIOQUORA - Biomedical Node Factory Engine
Implements Module 11 for Step 4 Stage 4 (BioNodes v1.0).
Coordinates: Knowledge Object / Identity Candidate -> Property Assignment -> Metadata -> Validation -> Specialized Node Creation.
"""

from typing import Dict, Any, Optional
from bioquora.graph_identity.stage2_identity_integration import GraphNodeCandidateEnvelope
from bioquora.identity.bioq_ids.generator import EntityCategory
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.nodes.disease.disease_node import DiseaseGraphNode
from bioquora.nodes.molecular.molecular_node import MolecularGraphNode
from bioquora.nodes.drug.therapeutic_node import TherapeuticGraphNode
from bioquora.nodes.validation.node_validator import NodeValidatorEngine

class BiomedicalNodeFactory:
    @staticmethod
    def create_node_from_identity_candidate(cand: GraphNodeCandidateEnvelope, extra_props: Optional[Dict[str, Any]] = None) -> UniversalBiomedicalNode:
        props = extra_props or {}
        cat = cand.entity_category

        if cat == EntityCategory.DISEASE:
            node = DiseaseGraphNode(
                bioq_id=cand.bioq_id,
                preferred_name=cand.preferred_name,
                ontology_ids={cand.preferred_curie.split(":")[0]: cand.preferred_curie},
                aliases=cand.resolved_aliases,
                mondo_id=cand.preferred_curie if "MONDO" in cand.preferred_curie else props.get("mondo_id")
            )
        elif cat in {EntityCategory.GENE, EntityCategory.PROTEIN, EntityCategory.VARIANT}:
            node = MolecularGraphNode(
                bioq_id=cand.bioq_id,
                entity_type=cat.value,
                preferred_name=cand.preferred_name,
                ontology_ids={cand.preferred_curie.split(":")[0]: cand.preferred_curie},
                aliases=cand.resolved_aliases,
                hgnc_id=cand.preferred_curie if "HGNC" in cand.preferred_curie else props.get("hgnc_id")
            )
        elif cat in {EntityCategory.DRUG, EntityCategory.CHEMICAL}:
            node = TherapeuticGraphNode(
                bioq_id=cand.bioq_id,
                preferred_name=cand.preferred_name,
                ontology_ids={cand.preferred_curie.split(":")[0]: cand.preferred_curie},
                aliases=cand.resolved_aliases,
                drugbank_id=cand.preferred_curie if "DB" in cand.preferred_curie else props.get("drugbank_id")
            )
        else:
            node = UniversalBiomedicalNode(
                bioq_id=cand.bioq_id,
                entity_type=cat.value,
                preferred_name=cand.preferred_name,
                ontology_ids={cand.preferred_curie.split(":")[0]: cand.preferred_curie},
                aliases=cand.resolved_aliases
            )

        val = NodeValidatorEngine.validate_node(node)
        if not val["is_valid"]:
            raise ValueError(f"Created node failed schema validation: {val['errors']}")
        return node
