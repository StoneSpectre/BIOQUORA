"""
BIOQUORA - Graph Constraints Engine
Implements Module 7 for Step 4 Stage 6 (BioBuilder v1.0).
Enforces strict biological domain and range semantic constraints across graph edges.
"""

from typing import Dict, Set, Tuple

# Allowed domain -> range mappings per predicate
PREDICATE_DOMAIN_RANGE_CONSTRAINTS: Dict[str, Set[Tuple[str, str]]] = {
    "TREATS": {("DRUG", "DISEASE"), ("CHEMICAL", "DISEASE")},
    "CAUSES": {("VARIANT", "DISEASE"), ("GENE", "DISEASE"), ("CHEMICAL", "DISEASE")},
    "EXPRESSED_IN": {("GENE", "TISSUE"), ("PROTEIN", "TISSUE"), ("GENE", "CELL"), ("PROTEIN", "CELL")},
    "TARGETS": {("DRUG", "PROTEIN"), ("DRUG", "GENE"), ("CHEMICAL", "PROTEIN")},
    "LOCATED_IN": {("GENE", "CHROMOSOME"), ("VARIANT", "CHROMOSOME")},
    "ASSOCIATED_WITH": {("GENE", "DISEASE"), ("VARIANT", "DISEASE"), ("PHENOTYPE", "DISEASE")}
}

class GraphConstraintsEngine:
    @staticmethod
    def validate_semantic_constraint(source_type: str, target_type: str, predicate: str) -> Tuple[bool, str]:
        pred = predicate.upper()
        if pred not in PREDICATE_DOMAIN_RANGE_CONSTRAINTS:
            # General predicate allowed by default
            return True, f"Predicate {pred} permitted."

        allowed_pairs = PREDICATE_DOMAIN_RANGE_CONSTRAINTS[pred]
        if (source_type.upper(), target_type.upper()) in allowed_pairs:
            return True, f"Semantic constraint satisfied: {source_type} -> {pred} -> {target_type}"

        return False, (
            f"Semantic Constraint Violation: {source_type} cannot {pred} {target_type}. "
            f"Allowed pairs for {pred}: {allowed_pairs}"
        )
