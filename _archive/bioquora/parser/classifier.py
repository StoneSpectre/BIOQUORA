"""
Module 1: Document Classification & Routing Engine
Classifies incoming biomedical files across Native Scientific Documents (PDF, JATS XML, HTML),
Supplementary Files (CSV, XLSX, FASTA), and Publisher Templates.
"""

from typing import Literal, Tuple, Optional
from pydantic import BaseModel


DocumentFormat = Literal["PDF", "JATS_XML", "HTML", "EPUB", "SUPPLEMENTARY_CSV", "SUPPLEMENTARY_EXCEL", "SUPPLEMENTARY_FASTA", "IMAGE", "ARCHIVE", "UNKNOWN"]
PublisherTemplate = Literal["ELSEVIER", "NATURE", "PLOS", "IEEE", "PUBMED_CENTRAL", "GENERIC"]


class DocumentClassificationResult(BaseModel):
    detected_format: DocumentFormat
    mime_type: str
    publisher_template: PublisherTemplate
    is_parseable_native: bool


class DocumentClassificationEngine:
    """Production Document Classifier & Router."""

    @staticmethod
    def classify_document(filename: str, raw_payload: bytes) -> DocumentClassificationResult:
        lower_name = filename.lower()
        content_str = ""
        try:
            content_str = raw_payload[:2000].decode("utf-8", errors="ignore")
        except Exception:
            pass

        if lower_name.endswith(".xml") or "<article" in content_str or "<JATS" in content_str:
            template: PublisherTemplate = "PUBMED_CENTRAL"
            if "elsevier" in content_str.lower():
                template = "ELSEVIER"
            elif "nature" in content_str.lower():
                template = "NATURE"
            return DocumentClassificationResult(
                detected_format="JATS_XML",
                mime_type="application/xml",
                publisher_template=template,
                is_parseable_native=True,
            )

        if lower_name.endswith(".pdf") or raw_payload.startswith(b"%PDF"):
            return DocumentClassificationResult(
                detected_format="PDF",
                mime_type="application/pdf",
                publisher_template="GENERIC",
                is_parseable_native=True,
            )

        if lower_name.endswith(".html") or "<html" in content_str.lower():
            return DocumentClassificationResult(
                detected_format="HTML",
                mime_type="text/html",
                publisher_template="GENERIC",
                is_parseable_native=True,
            )

        if lower_name.endswith(".csv"):
            return DocumentClassificationResult(
                detected_format="SUPPLEMENTARY_CSV",
                mime_type="text/csv",
                publisher_template="GENERIC",
                is_parseable_native=True,
            )

        if lower_name.endswith(".fasta") or lower_name.endswith(".fa"):
            return DocumentClassificationResult(
                detected_format="SUPPLEMENTARY_FASTA",
                mime_type="application/x-fasta",
                publisher_template="GENERIC",
                is_parseable_native=True,
            )

        return DocumentClassificationResult(
            detected_format="UNKNOWN",
            mime_type="application/octet-stream",
            publisher_template="GENERIC",
            is_parseable_native=False,
        )
