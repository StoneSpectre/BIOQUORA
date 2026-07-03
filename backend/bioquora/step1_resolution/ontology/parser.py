"""
Bioquora OBO Parser
===================
Parses Open Biomedical Ontologies (OBO) format files into structured concept and relationship objects.
Supports standard OBO tags: id, name, def, synonym, xref, is_a, relationship, and is_obsolete.
"""

from __future__ import annotations
import os
import re
from dataclasses import dataclass, field
from typing import Any

try:
    from ..models import EntityType
except ImportError:
    from models import EntityType


@dataclass
class SynonymObj:
    text: str
    type: str = "exact"


@dataclass
class XrefObj:
    ontology: str
    id: str


@dataclass
class ParsedConcept:
    native_id: str
    ontology: str
    label: str
    entity_type: Any
    version: str
    definition: str | None = None
    synonyms: list[SynonymObj] = field(default_factory=list)
    xrefs: list[XrefObj] = field(default_factory=list)
    is_obsolete: bool = False


_SYN_RE = re.compile(r'^"([^"]+)"\s+([A-Z]+)', re.IGNORECASE)
_DEF_RE = re.compile(r'^"([^"]+)"')
_XREF_RE = re.compile(r'^([A-Za-z0-9_-]+):([A-Za-z0-9_.-]+)')
_REL_RE = re.compile(r'^([a-zA-Z0-9_-]+)\s+([A-Za-z0-9_.-]+:[A-Za-z0-9_.-]+)')


def _get_lines(file_path_or_content: str) -> list[str]:
    if len(file_path_or_content) < 4096 and os.path.exists(file_path_or_content) and os.path.isfile(file_path_or_content):
        with open(file_path_or_content, "r", encoding="utf-8", errors="replace") as f:
            return f.readlines()
    return file_path_or_content.splitlines()


def parse_obo(file_path_or_content: str, short_name: str, default_type: Any, version: str) -> list[ParsedConcept]:
    """
    Parses an OBO file or string content into a list of ParsedConcept objects.
    Skips obsolete concepts ([Term] where is_obsolete: true).
    """
    lines = _get_lines(file_path_or_content)
    concepts: list[ParsedConcept] = []
    current: dict[str, Any] | None = None

    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("!"):
            continue

        if line == "[Term]":
            if current and current.get("id") and current.get("name") and not current.get("is_obsolete"):
                concepts.append(_build_concept(current, short_name, default_type, version))
            current = {"synonyms": [], "xrefs": [], "is_obsolete": False}
            continue
        elif line.startswith("[") and line.endswith("]"):
            # [Typedef] or other stanza
            if current and current.get("id") and current.get("name") and not current.get("is_obsolete"):
                concepts.append(_build_concept(current, short_name, default_type, version))
            current = None
            continue

        if current is None:
            continue

        if ":" not in line:
            continue

        tag, _, val = line.partition(":")
        tag = tag.strip().lower()
        val = val.strip()
        # Remove trailing comments (! comment)
        if " !" in val:
            val = val.split(" !", 1)[0].strip()

        if tag == "id":
            current["id"] = val
        elif tag == "name":
            current["name"] = val
        elif tag == "def":
            m = _DEF_RE.match(val)
            if m:
                current["def"] = m.group(1)
            else:
                current["def"] = val
        elif tag == "synonym":
            m = _SYN_RE.match(val)
            if m:
                syn_text = m.group(1)
                syn_type = m.group(2).lower()
                current["synonyms"].append(SynonymObj(text=syn_text, type=syn_type))
        elif tag == "xref":
            m = _XREF_RE.match(val)
            if m:
                current["xrefs"].append(XrefObj(ontology=m.group(1).upper(), id=m.group(0)))
            elif ":" in val:
                parts = val.split(":", 1)
                current["xrefs"].append(XrefObj(ontology=parts[0].strip().upper(), id=val.strip()))
        elif tag == "is_obsolete" and val.lower() in ("true", "yes", "1"):
            current["is_obsolete"] = True

    if current and current.get("id") and current.get("name") and not current.get("is_obsolete"):
        concepts.append(_build_concept(current, short_name, default_type, version))

    return concepts


def _build_concept(raw: dict[str, Any], short_name: str, default_type: Any, version: str) -> ParsedConcept:
    return ParsedConcept(
        native_id=raw["id"],
        ontology=short_name,
        label=raw["name"],
        entity_type=default_type,
        version=version,
        definition=raw.get("def"),
        synonyms=raw["synonyms"],
        xrefs=raw["xrefs"],
        is_obsolete=raw.get("is_obsolete", False),
    )


def extract_relationships(file_path_or_content: str) -> list[tuple[str, str, str]]:
    """
    Extracts directed relationship tuples (subject_native_id, predicate, object_native_id)
    from an OBO file or string content.
    """
    lines = _get_lines(file_path_or_content)
    relationships: list[tuple[str, str, str]] = []
    current_id: str | None = None
    is_term = False
    is_obsolete = False
    term_rels: list[tuple[str, str]] = []

    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("!"):
            continue

        if line == "[Term]":
            if current_id and not is_obsolete and term_rels:
                for pred, obj_id in term_rels:
                    relationships.append((current_id, pred, obj_id))
            current_id = None
            is_term = True
            is_obsolete = False
            term_rels = []
            continue
        elif line.startswith("[") and line.endswith("]"):
            if current_id and not is_obsolete and term_rels:
                for pred, obj_id in term_rels:
                    relationships.append((current_id, pred, obj_id))
            current_id = None
            is_term = False
            term_rels = []
            continue

        if not is_term:
            continue

        if ":" not in line:
            continue

        tag, _, val = line.partition(":")
        tag = tag.strip().lower()
        val = val.strip()
        if " !" in val:
            val = val.split(" !", 1)[0].strip()

        if tag == "id":
            current_id = val
        elif tag == "is_obsolete" and val.lower() in ("true", "yes", "1"):
            is_obsolete = True
        elif tag == "is_a":
            term_rels.append(("IS_A", val))
        elif tag == "relationship":
            m = _REL_RE.match(val)
            if m:
                term_rels.append((m.group(1).upper(), m.group(2)))
            elif " " in val:
                parts = val.split(maxsplit=1)
                term_rels.append((parts[0].upper(), parts[1]))

    if current_id and not is_obsolete and term_rels:
        for pred, obj_id in term_rels:
            relationships.append((current_id, pred, obj_id))

    return relationships
