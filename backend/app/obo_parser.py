"""
Robust, production-grade streaming parser for the OBO flat file format (used by DOID, HPO, GO, MONDO, etc.).
Supports:
  - Memory-efficient streaming iteration over multi-gigabyte files
  - Robust handling of escaped quotes in definitions
  - Universal stripping of trailing inline comments ('!') across all tags
"""

import re
from dataclasses import dataclass, field
from typing import List, Optional, Union, Iterable, TextIO
from app.models import RelationType

_RELATIONSHIP_LINE_RE = re.compile(r"^relationship:\s*(\S+)\s+(\S+)")

_PREDICATE_MAP = {
    "part_of": RelationType.part_of,
    "regulates": RelationType.regulates,
    "positively_regulates": RelationType.positively_regulates,
    "negatively_regulates": RelationType.negatively_regulates,
    "has_role": RelationType.has_role,
}


@dataclass
class OboEdge:
    predicate: RelationType
    target: str


@dataclass
class OboTerm:
    id: str
    name: str = ""
    def_: Optional[str] = None
    is_a: List[str] = field(default_factory=list)
    relationships: List[OboEdge] = field(default_factory=list)
    is_obsolete: bool = False


def _strip_inline_comment(val: str) -> str:
    """Strip OBO inline comments (everything after an unescaped '!') and trim whitespace."""
    idx = val.find("!")
    if idx != -1:
        val = val[:idx]
    return val.strip()


def parse_obo(source: Union[str, TextIO]) -> List[OboTerm]:
    """Parse an OBO file or stream into a list of OboTerm objects."""
    terms = []
    for term in parse_obo_stream(source):
        terms.append(term)
    return terms


def parse_obo_stream(source: Union[str, TextIO]) -> Iterable[OboTerm]:
    """Yield OboTerm objects one by one to support memory-efficient streaming ingestion."""
    if isinstance(source, str):
        with open(source, "r", encoding="utf-8", errors="replace") as f:
            yield from _parse_lines(f)
    else:
        yield from _parse_lines(source)


def _parse_lines(lines: Iterable[str]) -> Iterable[OboTerm]:
    current_term: Optional[OboTerm] = None
    in_term = False

    for raw_line in lines:
        line = raw_line.strip()
        if not line or line.startswith("!"):
            continue

        if line == "[Term]":
            if current_term is not None and current_term.id:
                yield current_term
            current_term = OboTerm(id="")
            in_term = True
            continue
        elif line.startswith("["):
            if current_term is not None and current_term.id:
                yield current_term
            current_term = None
            in_term = False
            continue

        if not in_term or current_term is None:
            continue

        if ":" not in line:
            continue

        key, val = line.split(":", 1)
        key = key.strip()
        val = val.strip()

        if key == "id":
            current_term.id = _strip_inline_comment(val)
        elif key == "name":
            current_term.name = _strip_inline_comment(val)
        elif key == "def":
            # Extract content inside double quotes handling escaped quotes
            if val.startswith('"'):
                end_idx = 1
                while end_idx < len(val):
                    if val[end_idx] == '"' and val[end_idx - 1] != "\\":
                        break
                    end_idx += 1
                if end_idx < len(val):
                    current_term.def_ = val[1:end_idx].replace('\\"', '"')
                else:
                    current_term.def_ = val.strip('"')
            else:
                current_term.def_ = _strip_inline_comment(val)
        elif key == "is_a":
            target = _strip_inline_comment(val)
            if target:
                current_term.is_a.append(target)
        elif key == "relationship":
            m = _RELATIONSHIP_LINE_RE.match(line)
            if m:
                rel_type_str, target = m.group(1), m.group(2)
                predicate = _PREDICATE_MAP.get(rel_type_str, RelationType.other)
                current_term.relationships.append(OboEdge(predicate=predicate, target=target))
        elif key == "is_obsolete":
            clean_val = _strip_inline_comment(val).lower()
            current_term.is_obsolete = clean_val == "true"

    if current_term is not None and current_term.id:
        yield current_term
