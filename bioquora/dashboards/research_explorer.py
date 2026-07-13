"""
BIOQUORA - Biomedical Visualization Dashboard (Research Explorer)
Implements Module 15 for Step 4 Stage 7 (BioGraphX v1.0).
Provides interactive Disease Explorer, Drug Explorer, Gene Explorer, and Pathway Explorer views.
"""

from typing import Dict, Any, List
from bioquora.graph_platform.storage.graph_storage import BioGraphStorageEngine

class ResearchExplorerDashboard:
    def __init__(self, storage: BioGraphStorageEngine):
        self.storage = storage

    def explore_disease(self, bioq_id: str) -> Dict[str, Any]:
        node = self.storage.get_node(bioq_id)
        if not node or node.entity_type.upper() != "DISEASE":
            return {"status": "NOT_A_DISEASE_NODE", "bioq_id": bioq_id}

        related_drugs = []
        related_genes = []
        for e in self.storage.get_all_edges().values():
            if e.target_bioq_id == bioq_id and e.predicate == "TREATS":
                drug_node = self.storage.get_node(e.source_bioq_id)
                if drug_node:
                    related_drugs.append(drug_node.preferred_name)
            elif e.target_bioq_id == bioq_id and e.predicate in {"CAUSES", "ASSOCIATED_WITH"}:
                gene_node = self.storage.get_node(e.source_bioq_id)
                if gene_node:
                    related_genes.append(gene_node.preferred_name)

        return {
            "explorer_view": "DISEASE_EXPLORER",
            "disease_name": node.preferred_name,
            "bioq_id": node.bioq_id,
            "treatments": related_drugs,
            "associated_genes": related_genes,
            "status": "EXPLORER_VIEW_READY"
        }
