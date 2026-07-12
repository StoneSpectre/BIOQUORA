"""
Module 1 & Module 2: Source Registry & Publishing Ecosystem
Implements Publisher Registry, Publication Lifecycle Model, and Tier 1 / Tier 2 / Tier 3 Source Configurations.
"""

from typing import List, Dict, Optional, Literal
from pydantic import BaseModel, Field


PublisherCategory = Literal["COMMERCIAL", "SOCIETY", "GOVERNMENT", "OPEN_ACCESS"]
PublicationLifecycleStage = Literal[
    "IDEA", "EXPERIMENT", "MANUSCRIPT", "PEER_REVIEW", "PUBLISHED",
    "CORRECTION", "RETRACTION", "VERSION_UPDATE"
]


class PublisherInfo(BaseModel):
    name: str
    category: PublisherCategory
    primary_domains: List[str]
    open_access_policy: str


PUBLISHERS_REGISTRY: Dict[str, PublisherInfo] = {
    "Elsevier": PublisherInfo(name="Elsevier", category="COMMERCIAL", primary_domains=["sciencedirect.com", "cell.com"], open_access_policy="HYBRID"),
    "Springer Nature": PublisherInfo(name="Springer Nature", category="COMMERCIAL", primary_domains=["nature.com", "springer.com"], open_access_policy="HYBRID"),
    "Wiley": PublisherInfo(name="Wiley", category="COMMERCIAL", primary_domains=["wiley.com"], open_access_policy="HYBRID"),
    "IEEE": PublisherInfo(name="IEEE", category="SOCIETY", primary_domains=["ieeexplore.ieee.org"], open_access_policy="HYBRID"),
    "NIH/NCBI": PublisherInfo(name="NIH/NCBI", category="GOVERNMENT", primary_domains=["ncbi.nlm.nih.gov"], open_access_policy="FULL_OPEN"),
    "PLOS": PublisherInfo(name="Public Library of Science (PLOS)", category="OPEN_ACCESS", primary_domains=["plos.org"], open_access_policy="FULL_OPEN"),
    "eLife": PublisherInfo(name="eLife Sciences", category="OPEN_ACCESS", primary_domains=["elifesciences.org"], open_access_policy="FULL_OPEN")
}


class SourceEndpointConfig(BaseModel):
    """Canonical configuration for a biomedical literature source."""
    id: str
    name: str
    organization: str
    api: str
    tier: Literal["TIER_1", "TIER_2", "TIER_3"]
    authentication: str
    rate_limit_requests_per_sec: float
    update_frequency: str
    identifier_types: List[str]
    license: str
    full_text_formats: List[str]
    metadata_fields_supported: List[str]
    availability: float = 0.999


SOURCE_REGISTRY: Dict[str, SourceEndpointConfig] = {
    "pubmed": SourceEndpointConfig(
        id="pubmed",
        name="PubMed / MEDLINE",
        organization="NCBI / NLM",
        api="https://eutils.ncbi.nlm.nih.gov/entrez/eutils/",
        tier="TIER_1",
        authentication="API_KEY_OPTIONAL",
        rate_limit_requests_per_sec=10.0,
        update_frequency="DAILY",
        identifier_types=["PMID", "PMCID", "DOI"],
        license="PUBLIC_DOMAIN",
        full_text_formats=["JATS_XML", "HTML", "PDF"],
        metadata_fields_supported=["Title", "Authors", "Abstract", "Keywords", "DOI", "PMID", "PMCID", "Journal", "Volume", "Issue", "Publication Date", "MeshTerms"]
    ),
    "europepmc": SourceEndpointConfig(
        id="europepmc",
        name="Europe PMC",
        organization="EMBL-EBI",
        api="https://www.ebi.ac.uk/europepmc/webservices/rest/",
        tier="TIER_1",
        authentication="NONE",
        rate_limit_requests_per_sec=20.0,
        update_frequency="DAILY",
        identifier_types=["PMID", "PMCID", "DOI"],
        license="OPEN_ACCESS_CC_BY",
        full_text_formats=["JATS_XML", "PDF"],
        metadata_fields_supported=["Title", "Authors", "Abstract", "Keywords", "DOI", "PMID", "PMCID", "Journal", "Citations", "References"]
    ),
    "openalex": SourceEndpointConfig(
        id="openalex",
        name="OpenAlex Scholarly Graph",
        organization="OurResearch",
        api="https://api.openalex.org/works",
        tier="TIER_1",
        authentication="MAILTO_HEADER",
        rate_limit_requests_per_sec=10.0,
        update_frequency="DAILY",
        identifier_types=["OPENALEX_ID", "DOI", "PMID", "PMCID"],
        license="CC0_PUBLIC_DOMAIN",
        full_text_formats=["HTML_URL", "PDF_URL"],
        metadata_fields_supported=["Title", "Authors", "Abstract", "DOI", "CitationCount", "OpenAccessStatus"]
    ),
    "crossref": SourceEndpointConfig(
        id="crossref",
        name="Crossref Metadata REST API",
        organization="Crossref",
        api="https://api.crossref.org/works",
        tier="TIER_1",
        authentication="POLITE_POOL_EMAIL",
        rate_limit_requests_per_sec=50.0,
        update_frequency="REALTIME",
        identifier_types=["DOI"],
        license="OPEN_METADATA",
        full_text_formats=["RESOURCE_LINKS"],
        metadata_fields_supported=["Title", "Authors", "DOI", "Journal", "References", "License"]
    ),
    "semantic_scholar": SourceEndpointConfig(
        id="semantic_scholar",
        name="Semantic Scholar Academic Graph",
        organization="Allen Institute for AI (AI2)",
        api="https://api.semanticscholar.org/graph/v1/paper/",
        tier="TIER_2",
        authentication="API_KEY_OPTIONAL",
        rate_limit_requests_per_sec=5.0,
        update_frequency="WEEKLY",
        identifier_types=["S2_PAPER_ID", "DOI", "PMID", "ARXIV_ID"],
        license="ODC_BY",
        full_text_formats=["OPEN_ACCESS_PDF"],
        metadata_fields_supported=["Title", "Authors", "Abstract", "CitationCount", "InfluentialCitations"]
    ),
    "biorxiv": SourceEndpointConfig(
        id="biorxiv",
        name="bioRxiv & medRxiv Preprints",
        organization="Cold Spring Harbor Laboratory",
        api="https://api.biorxiv.org/details/biorxiv/",
        tier="TIER_2",
        authentication="NONE",
        rate_limit_requests_per_sec=2.0,
        update_frequency="DAILY",
        identifier_types=["DOI"],
        license="AUTHOR_CHOICE_CC",
        full_text_formats=["PDF", "HTML"],
        metadata_fields_supported=["Title", "Authors", "Abstract", "DOI", "VersionHistory"]
    )
}
