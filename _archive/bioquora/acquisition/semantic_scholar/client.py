"""Semantic Scholar Academic Graph Harvester Client."""

from typing import Optional
from bioquora.metadata.schema import BiomedicalMetadataRecord, AuthorAffiliationRecord


class SemanticScholarAcquisitionClient:
    """Harvests Semantic Scholar Academic Graph records."""

    def fetch_paper_record(self, s2_id: str, title: str, abstract: str, doi: Optional[str] = None) -> BiomedicalMetadataRecord:
        return BiomedicalMetadataRecord(
            title=title,
            abstract=abstract,
            semantic_scholar_id=s2_id,
            doi=doi,
            source_origin="semantic_scholar",
            authors=[AuthorAffiliationRecord(author_name="S2 Academic Graph Author", affiliations=[])],
            keywords=["semantic_scholar", "academic_graph"],
            metadata_completeness_score=0.98
        )
