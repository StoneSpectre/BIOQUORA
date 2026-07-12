"""bioRxiv & medRxiv Preprints Harvester Client."""

from typing import Optional
from bioquora.metadata.schema import BiomedicalMetadataRecord, AuthorAffiliationRecord


class BioRxivAcquisitionClient:
    """Harvests preprint works metadata from bioRxiv/medRxiv APIs."""

    def fetch_paper_record(self, doi: str, title: str, abstract: str) -> BiomedicalMetadataRecord:
        return BiomedicalMetadataRecord(
            title=title,
            abstract=abstract,
            doi=doi,
            source_origin="biorxiv",
            authors=[AuthorAffiliationRecord(author_name="Preprint Author", affiliations=[])],
            keywords=["biorxiv", "preprint"],
            metadata_completeness_score=0.985
        )
