"""
BIOQUORA - Graph Schema Registry
Implements Module 2 for Step 4 Stage 7 (BioGraphX v1.0).
Manages Node Labels, Edge Labels, property schemas, and schema evolution rules.
"""

from typing import Dict, List, Set, Any

class GraphSchemaRegistry:
    def __init__(self):
        self.node_labels: Set[str] = {
            "DISEASE", "GENE", "PROTEIN", "DRUG", "CHEMICAL", "VARIANT",
            "PHENOTYPE", "PATHWAY", "BIOLOGICAL_PROCESS", "PUBLICATION"
        }
        self.edge_labels: Set[str] = {
            "TREATS", "CAUSES", "EXPRESSED_IN", "TARGETS", "LOCATED_IN", "ASSOCIATED_WITH"
        }

    def register_node_label(self, label: str) -> str:
        upper_l = label.upper()
        self.node_labels.add(upper_l)
        return upper_l

    def register_edge_label(self, label: str) -> str:
        upper_l = label.upper()
        self.edge_labels.add(upper_l)
        return upper_l

    def validate_node_label(self, label: str) -> bool:
        return label.upper() in self.node_labels

    def validate_edge_label(self, label: str) -> bool:
        return label.upper() in self.edge_labels
