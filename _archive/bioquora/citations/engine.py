"""
Module 8: Citation & Reference Intelligence Engine
Parses bibliographic references into structured DOI/PMID records and builds citation graphs.
"""

import re
from typing import List, Dict
from bioquora.bsdo.schema import ParsedCitationRecord


class CitationIntelligenceEngine:
    """Production Bibliographic Parser & Citation Graph Builder."""

    def parse_references(self, raw_refs: List[str]) -> List[ParsedCitationRecord]:
        parsed: List[ParsedCitationRecord] = []
        for ref_text in raw_refs:
            doi_match = re.search(r"10\.\d{4,9}/[-._;()/:A-Z0-9]+", ref_text, re.IGNORECASE)
            pmid_match = re.search(r"PMID:\s*(\d+)", ref_text, re.IGNORECASE)
            year_match = re.search(r"\b(19\d\d|20\d\d)\b", ref_text)

            parsed.append(
                ParsedCitationRecord(
                    raw_citation_text=ref_text,
                    doi=doi_match.group(0) if doi_match else None,
                    pmid=pmid_match.group(1) if pmid_match else None,
                    year=int(year_match.group(1)) if year_match else None,
                    is_resolved=True
                )
            )
        return parsed

    def build_citation_graph(self, paper_id: str, citations: List[ParsedCitationRecord]) -> Dict[str, List[str]]:
        graph = {paper_id: []}
        for cit in citations:
            target = cit.doi or cit.pmid or cit.ref_id
            graph[paper_id].append(target)
        return graph
