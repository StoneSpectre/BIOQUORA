"""
BIOQUORA - Biological Network Architecture Framework
Implements Module 1 for Step 5 Stage 4 (BioNetwork v1.0).
Defines standardized network hierarchy across 11 canonical biological interaction systems:
GRN, PPI, Metabolic, Signaling, Disease, Drug-Target, Cell-Cell Communication, Tissue, Organ, Host-Pathogen, and Microbiome.
"""

from typing import Dict, Any, List

class BiologicalNetworkArchitecture:
    @staticmethod
    def get_network_hierarchy() -> Dict[str, Any]:
        return {
            "network_classes": [
                "GENE_REGULATORY_NETWORK_GRN",
                "PROTEIN_PROTEIN_INTERACTION_PPI",
                "METABOLIC_NETWORK",
                "SIGNALING_TRANSDUCTION_NETWORK",
                "DISEASE_MECHANISM_NETWORK",
                "DRUG_TARGET_NETWORK",
                "CELL_CELL_COMMUNICATION_NETWORK",
                "TISSUE_MICROENVIRONMENT_NETWORK",
                "ORGAN_SYSTEM_NETWORK",
                "HOST_PATHOGEN_INTERACTION_NETWORK",
                "MICROBIOME_COMMUNITY_NETWORK"
            ],
            "graph_formalism": "DIRECTED_AND_UNDIRECTED_ATTRIBUTED_MULTIGRAPH",
            "edge_attributes": ["affinity_kd_nm", "confidence_score", "evidence_code", "temporal_dynamics"],
            "status": "BIOLOGICAL_NETWORK_ARCHITECTURE_SPECIFIED"
        }
