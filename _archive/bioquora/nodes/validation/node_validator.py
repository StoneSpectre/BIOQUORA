"""
BIOQUORA - Property Validation Engine (Node Validator)
Implements Module 10 for Step 4 Stage 4 (BioNodes v1.0).
Validates node schema compliance, required fields, BIOQ-ID syntax, and property ranges.
"""

from typing import Dict, Any, List
from bioquora.nodes.universal_node import UniversalBiomedicalNode
from bioquora.identity.bioq_ids.generator import BioqIdGenerator

class NodeValidatorEngine:
    @staticmethod
    def validate_node(node: UniversalBiomedicalNode) -> Dict[str, Any]:
        errors = []
        if not node.bioq_id or not BioqIdGenerator.is_valid_syntax(node.bioq_id):
            errors.append(f"Invalid BIOQ-ID syntax: {node.bioq_id}")
        if not node.preferred_name:
            errors.append("Missing preferred_name")
        if not node.entity_type:
            errors.append("Missing entity_type")
        if node.confidence < 0.0 or node.confidence > 1.0:
            errors.append("Confidence score out of bounds [0.0, 1.0]")
        if node.quality_score < 0.0 or node.quality_score > 1.0:
            errors.append("Quality score out of bounds [0.0, 1.0]")

        return {
            "bioq_id": node.bioq_id,
            "is_valid": len(errors) == 0,
            "error_count": len(errors),
            "errors": errors,
            "status": "PASSED_VALIDATION" if len(errors) == 0 else "FAILED_SCHEMA"
        }
