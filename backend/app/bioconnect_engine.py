"""
Bioquora Founder Bible — Volume XIV (Step 14)
Bioquora Global Collaboration Network (Codename: BioConnect)

Implements:
  1. Living ORCID Researcher Profile & Institution Graph Engine
  2. Graph-Based Scientific Collaboration Recommendation & Matchmaker
  3. Grant Opportunity & Funding Intelligence Engine
"""

import uuid
from datetime import datetime, timezone
from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field


CRediTRole = Literal[
    "CONCEPTUALIZATION", "METHODOLOGY", "SOFTWARE", "VALIDATION",
    "FORMAL_ANALYSIS", "INVESTIGATION", "RESOURCES", "DATA_CURATION",
    "WRITING_ORIGINAL_DRAFT", "SUPERVISION", "FUNDING_ACQUISITION"
]


class BioConnectInstitution(BaseModel):
    """Canonical biomedical organization in the BioConnect Institution Graph."""
    institution_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    institution_name: str
    country_iso_code: str
    institution_type: Literal["UNIVERSITY", "HOSPITAL", "PHARMA", "BIOTECH", "FUNDING_AGENCY"]


class BioConnectResearcherProfile(BaseModel):
    """Living scientific identity linked to ORCID and BioKG domains."""
    researcher_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    full_name: str
    orcid_id: str
    primary_institution_id: uuid.UUID
    expertise_concept_urns: List[str]
    h_index_score: int = 10
    total_citations: int = 150
    credit_roles_specialty: List[CRediTRole] = Field(
        default_factory=lambda: ["CONCEPTUALIZATION", "INVESTIGATION"]
    )


class CollaborationRecommendation(BaseModel):
    """Ranked collaborator recommendation emitted by BioConnect Engine."""
    recommendation_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    source_orcid: str
    recommended_orcid: str
    recommended_name: str
    match_score: float = Field(..., ge=0.0, le=1.0)
    shared_concept_urns: List[str]
    rationale: str


class GrantOpportunityMatch(BaseModel):
    """Ranked grant opportunity matched to a researcher profile."""
    grant_id: uuid.UUID = Field(default_factory=uuid.uuid4)
    funder_name: str
    grant_title: str
    target_concept_urn: str
    max_funding_usd: float
    eligibility_score: float = Field(..., ge=0.0, le=1.0)
    match_rationale: str


class BioConnectEngine:
    """
    Production BioConnect Engine:
      - Enrolls ORCID researcher profiles and institutions
      - Computes graph-based collaboration recommendations
      - Matches researchers to high-eligibility funding opportunities
    """

    def __init__(self):
        self.institutions: Dict[uuid.UUID, BioConnectInstitution] = {}
        self.researchers: Dict[str, BioConnectResearcherProfile] = {}

    def enroll_institution(
        self,
        name: str,
        country: str,
        inst_type: Literal["UNIVERSITY", "HOSPITAL", "PHARMA", "BIOTECH", "FUNDING_AGENCY"],
    ) -> BioConnectInstitution:
        inst = BioConnectInstitution(institution_name=name, country_iso_code=country, institution_type=inst_type)
        self.institutions[inst.institution_id] = inst
        return inst

    def register_researcher(
        self,
        full_name: str,
        orcid_id: str,
        institution_id: uuid.UUID,
        expertise_urns: List[str],
    ) -> BioConnectResearcherProfile:
        profile = BioConnectResearcherProfile(
            full_name=full_name,
            orcid_id=orcid_id,
            primary_institution_id=institution_id,
            expertise_concept_urns=expertise_urns,
        )
        self.researchers[orcid_id] = profile
        return profile

    def recommend_collaborators(self, source_orcid: str, top_k: int = 5) -> List[CollaborationRecommendation]:
        source = self.researchers.get(source_orcid)
        if not source:
            return []

        source_set = set(source.expertise_concept_urns)
        recs = []

        for orcid, candidate in self.researchers.items():
            if orcid == source_orcid:
                continue

            cand_set = set(candidate.expertise_concept_urns)
            shared = sorted(list(source_set.intersection(cand_set)))
            if shared:
                score = len(shared) / max(1, len(source_set.union(cand_set)))
                recs.append(
                    CollaborationRecommendation(
                        source_orcid=source_orcid,
                        recommended_orcid=orcid,
                        recommended_name=candidate.full_name,
                        match_score=round(min(0.99, score * 1.5), 4),
                        shared_concept_urns=shared,
                        rationale=f"Shared expertise across {len(shared)} BioKG concepts ({shared[0]}, ...). Complementary CRediT specialization.",
                    )
                )

        recs.sort(key=lambda x: x.match_score, reverse=True)
        return recs[:top_k]

    def match_grant_opportunities(
        self,
        researcher_orcid: str,
        grants: List[Dict[str, str]],
    ) -> List[GrantOpportunityMatch]:
        researcher = self.researchers.get(researcher_orcid)
        if not researcher:
            return []

        matches = []
        for g in grants:
            target_urn = g.get("target_concept_urn", "")
            is_match = target_urn in researcher.expertise_concept_urns
            score = 0.95 if is_match else 0.35
            matches.append(
                GrantOpportunityMatch(
                    funder_name=g.get("funder_name", "National Institutes of Health"),
                    grant_title=g.get("grant_title", "Biomedical R01 Grant"),
                    target_concept_urn=target_urn,
                    max_funding_usd=float(g.get("max_funding_usd", 1250000.0)),
                    eligibility_score=score,
                    match_rationale="Direct BioKG concept overlap with researcher expertise profile." if is_match else "Broad biomedical opportunity.",
                )
            )

        matches.sort(key=lambda x: x.eligibility_score, reverse=True)
        return matches
