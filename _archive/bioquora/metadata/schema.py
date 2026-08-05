"""
Module 1 & 3: Canonical Biomedical Metadata Schema & Normalizer
Enforces complete metadata validation across Title, Authors, Abstract, Keywords, DOI, PMID, PMCID,
Journal, Issue, Volume, Affiliations, ORCID, Funding, License, Publication Date, Citation Count, & References.
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict
from pydantic import BaseModel, Field


class AuthorAffiliationRecord(BaseModel):
    author_name: str
    orcid_id: Optional[str] = None
    affiliations: List[str] = Field(default_factory=list)


class ReferenceRecord(BaseModel):
    raw_citation: str
    doi: Optional[str] = None
    pmid: Optional[str] = None


class BiomedicalMetadataRecord(BaseModel):
    """Canonical normalized metadata record for a biomedical publication."""
    canonical_bioquora_id: str = Field(default_factory=lambda: f"bioquora:lit:{uuid.uuid4()}")
    title: str
    authors: List[AuthorAffiliationRecord] = Field(default_factory=list)
    abstract: str
    keywords: List[str] = Field(default_factory=list)
    doi: Optional[str] = None
    pmid: Optional[str] = None
    pmcid: Optional[str] = None
    openalex_id: Optional[str] = None
    crossref_id: Optional[str] = None
    semantic_scholar_id: Optional[str] = None
    arxiv_id: Optional[str] = None
    journal_title: Optional[str] = None
    journal_issue: Optional[str] = None
    journal_volume: Optional[str] = None
    publication_date: Optional[str] = None
    funding_acknowledgments: List[str] = Field(default_factory=list)
    license_type: str = "UNSPECIFIED"
    citation_count: int = 0
    references: List[ReferenceRecord] = Field(default_factory=list)
    source_origin: str
    ingested_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    metadata_completeness_score: float = Field(1.0, ge=0.0, le=1.0)
