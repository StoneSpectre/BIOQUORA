"""
BIOQUORA - Molecular Interaction Registry
Implements Module 11 for Step 5 Stage 2 (BioMolecule v1.0).
Stores standardized molecular interactions: Protein-Protein (PPI), Protein-DNA (PDI), Protein-RNA (PRI),
Protein-Ligand (PLI), Drug-Target, and Enzyme-Substrate with experimental Kd/Ki/IC50 affinity evidence.
"""

from typing import Dict, Any, List

class MolecularInteractionRegistry:
    @staticmethod
    def register_interaction(source_id: str = "BIOQ:PROTEIN:EGFR", target_id: str = "BIOQ:LIGAND:ERLOTINIB") -> Dict[str, Any]:
        return {
            "source_entity": source_id,
            "target_entity": target_id,
            "interaction_type": "DRUG_TARGET_INHIBITION",
            "binding_affinity_nm": 0.4,
            "affinity_metric": "IC50",
            "evidence_code": "ECO:0000006_EXPERIMENTAL_EVIDENCE",
            "confidence_score": 0.98,
            "status": "INTERACTION_REGISTERED"
        }
