"""
Bioquora Ontology Parser
========================
Implements Ch.4's pipeline steps:
    Parse -> Extract Concepts -> Extract Hierarchy -> Extract Relationships
    -> Extract Synonyms -> Extract Cross References

This is a genuine OBO-format (.obo) parser — it works on real files from
the OBO Foundry (MONDO, HP, GO, ChEBI, CL, UBERON, PR all ship .obo
releases with this exact stanza syntax), not a toy format.

OBO stanza example this parser understands:

    [Term]
    id: MONDO:0007254
    name: breast cancer
    def: "A ..." [PMID:12345]
    synonym: "breast carcinoma" EXACT []
    synonym: "CA breast" RELATED []
    xref: ICD10:C50
    xref: MeSH:D001943
    is_a: MONDO:0004992 ! cancer
"""

from __future__ import annotations
import os
import re
from typing import Any

try:
    from ..models import OntologyConcept, Synonym, SynonymType, CrossReference, EntityType
except ImportError:
    from models import OntologyConcept, Synonym, SynonymType, CrossReference, EntityType

_SYN_SCOPE_MAP = {
    "EXACT": SynonymType.EXACT,
    "BROAD": SynonymType.BROAD,
    "NARROW": SynonymType.NARROW,
    "RELATED": SynonymType.RELATED,
}

_SYNONYM_RE = re.compile(r'^synonym:\s*"(?P<text>[^"]*)"\s*(?P<scope>EXACT|BROAD|NARROW|RELATED)?', re.IGNORECASE)
_XREF_RE = re.compile(r'^xref:\s*([^\s!]+)', re.IGNORECASE)
_ISA_RE = re.compile(r'^is_a:\s*([^\s!]+)', re.IGNORECASE)
_REL_RE = re.compile(r'^relationship:\s*(\S+)\s+([^\s!]+)', re.IGNORECASE)

# Backward compatibility aliases for existing imports
ParsedConcept = OntologyConcept
XrefObj = CrossReference
SynonymObj = Synonym


def _get_lines(file_path_or_content: str) -> list[str]:
    if len(file_path_or_content) < 4096 and os.path.exists(file_path_or_content) and os.path.isfile(file_path_or_content):
        with open(file_path_or_content, "r", encoding="utf-8", errors="replace") as f:
            return f.readlines()
    return file_path_or_content.splitlines()


def parse_obo(text: str, ontology_short_name: str, default_type: Any,
              version: str = "unknown") -> list[OntologyConcept]:
    """Parse OBO text into a list of OntologyConcept objects, plus attach
    any 'relationship:' lines into concept.metadata-like structure via the
    returned list (extra relationships are yielded separately by callers
    that need them — kept simple here per Ch.4 scope)."""
    lines = _get_lines(text)
    concepts: list[OntologyConcept] = []
    current: dict | None = None

    def flush():
        if current is None:
            return
        if current.get("id") and current.get("name") and not current.get("is_obsolete"):
            concepts.append(OntologyConcept(
                ontology=ontology_short_name,
                native_id=current["id"],
                label=current["name"],
                entity_type=current.get("entity_type", default_type),
                definition=current.get("def", ""),
                synonyms=current.get("synonyms", []),
                xrefs=current.get("xrefs", []),
                parents=current.get("parents", []),
                version=version,
                is_obsolete=current.get("is_obsolete", False),
            ))

    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("!"):
            continue
        if line == "[Term]":
            flush()
            current = {"synonyms": [], "xrefs": [], "parents": [], "is_obsolete": False}
            continue
        if line.startswith("[") and line.endswith("]"):
            # entering a non-Term stanza (Typedef, Instance...) -> stop collecting
            flush()
            current = None
            continue
        if current is None:
            continue
        if ":" not in line:
            continue

        tag, _, val = line.partition(":")
        tag_lower = tag.strip().lower()
        val_clean = val.strip()
        if " !" in val_clean:
            val_clean = val_clean.split(" !", 1)[0].strip()

        if tag_lower == "id":
            current["id"] = val_clean
        elif tag_lower == "name":
            current["name"] = val_clean
        elif tag_lower == "def":
            m = re.match(r'^"([^"]*)"', val_clean)
            if m:
                current["def"] = m.group(1)
            else:
                current["def"] = val_clean
        elif tag_lower == "synonym":
            m = _SYNONYM_RE.match(line) or re.match(r'^"(?P<text>[^"]*)"\s*(?P<scope>EXACT|BROAD|NARROW|RELATED)?', val_clean, re.IGNORECASE)
            if m:
                scope = _SYN_SCOPE_MAP.get((m.group("scope") or "RELATED").upper(), SynonymType.RELATED)
                current["synonyms"].append(Synonym(text=m.group("text"), type=scope))
        elif tag_lower == "xref":
            m = _XREF_RE.match(line) or re.match(r'^([^\s!]+)', val_clean)
            if m:
                raw = m.group(1)
                if ":" in raw:
                    onto, oid = raw.split(":", 1)
                else:
                    onto, oid = ontology_short_name, raw
                current["xrefs"].append(CrossReference(ontology=onto.strip().upper(), id=raw.strip()))
        elif tag_lower == "is_a":
            current["parents"].append(val_clean)
        elif tag_lower == "is_obsolete" and val_clean.lower() in ("true", "yes", "1"):
            current["is_obsolete"] = True
            current["id"] = None  # drop obsolete terms on flush

    flush()
    return concepts


def extract_relationships(text: str) -> list[tuple[str, str, str]]:
    """Extract (subject_native_id, predicate, object_native_id) triples from
    is_a and relationship: lines — Ch.4 'Extract Relationships'."""
    lines = _get_lines(text)
    triples = []
    current_id = None
    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("!"):
            continue
        if line == "[Term]":
            current_id = None
            continue
        if line.startswith("[") and line.endswith("]"):
            current_id = None
            continue
        if line.lower().startswith("id:") and current_id is None:
            current_id = line.split(":", 1)[1].strip().split(" !", 1)[0].strip()
        elif line.lower().startswith("is_a:") and current_id:
            val = line.split(":", 1)[1].strip().split(" !", 1)[0].strip()
            triples.append((current_id, "IS_A", val))
        elif line.lower().startswith("relationship:") and current_id:
            val = line.split(":", 1)[1].strip().split(" !", 1)[0].strip()
            m = re.match(r'^(\S+)\s+([^\s!]+)', val)
            if m:
                triples.append((current_id, m.group(1).upper(), m.group(2)))
    return triples
