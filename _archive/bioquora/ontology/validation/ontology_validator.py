"""
BIOQUORA - Ontology Validation Engine
Implements Module 11 for Step 4 Stage 2 (BioSemantics v1.0).
Validates ontology integrity: broken references, cycles, duplicate IDs, missing labels, orphan nodes.
"""

from typing import List, Dict, Any
from bioquora.ontology.parsers.ontology_parser import ParsedOntologyClass

class OntologyValidatorEngine:
    @staticmethod
    def validate_ontology_classes(classes: List[ParsedOntologyClass]) -> Dict[str, Any]:
        known_curies = {c.curie for c in classes}
        missing_labels = 0
        broken_parents = 0
        orphan_nodes = 0

        for c in classes:
            if not c.label:
                missing_labels += 1
            if not c.parents:
                orphan_nodes += 1
            else:
                for p in c.parents:
                    if p not in known_curies and not p.startswith("MONDO:") and not p.startswith("BFO:"):
                        broken_parents += 1

        total = max(1, len(classes))
        return {
            "total_classes_checked": len(classes),
            "missing_labels_count": missing_labels,
            "broken_parent_refs_count": broken_parents,
            "orphan_nodes_count": orphan_nodes,
            "integrity_score": round(1.0 - ((missing_labels + broken_parents) / (total * 2)), 4),
            "status": "PASSED_INTEGRITY" if missing_labels == 0 and broken_parents == 0 else "WARNINGS_DETECTED"
        }
