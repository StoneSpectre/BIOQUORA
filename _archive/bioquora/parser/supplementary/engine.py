"""Module 9: Supplementary Intelligence Engine."""
from typing import List
from bioquora.bsdo.schema import SupplementaryItemRecord

class SupplementaryIntelligenceEngine:
    """Processes supplementary files (CSV, XLSX, FASTA) and links to parent paper."""
    def parse_supplementary_item(self, parent_paper_id: str, filename: str, format_type: str, desc: str) -> SupplementaryItemRecord:
        return SupplementaryItemRecord(
            filename=filename,
            format_type=format_type,
            description=desc,
            parent_paper_id=parent_paper_id,
        )
