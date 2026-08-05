"""
BIOQUORA - Universal Ontology Parsing Engine
Implements Module 3 for Step 4 Stage 2 (BioSemantics v1.0).
Parses OBO / OWL / JSON ontology entries into structured Bioquora Ontology Objects.
"""

import re
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class ParsedOntologyClass(BaseModel):
    curie: str
    label: str
    definition: Optional[str] = None
    synonyms: List[str] = Field(default_factory=list)
    parents: List[str] = Field(default_factory=list)
    cross_references: List[str] = Field(default_factory=list)
    is_obsolete: bool = False

class OntologyParserEngine:
    @staticmethod
    def parse_obo_snippet(obo_text: str) -> List[ParsedOntologyClass]:
        """
        Parses standard OBO term blocks into structured ParsedOntologyClass instances.
        """
        terms = []
        blocks = obo_text.split("[Term]")
        for block in blocks[1:]:
            lines = block.strip().split("\n")
            curie = ""
            label = ""
            defn = None
            synonyms = []
            parents = []
            xrefs = []
            is_obs = False

            for line in lines:
                line = line.strip()
                if line.startswith("id: "):
                    curie = line[4:].strip()
                elif line.startswith("name: "):
                    label = line[6:].strip()
                elif line.startswith("def: "):
                    defn = line[5:].strip().split('"')[1] if '"' in line else line[5:].strip()
                elif line.startswith("synonym: "):
                    if '"' in line:
                        synonyms.append(line.split('"')[1])
                elif line.startswith("is_a: "):
                    parent_curie = line[6:].split(" ! ")[0].strip()
                    parents.append(parent_curie)
                elif line.startswith("xref: "):
                    xrefs.append(line[6:].strip())
                elif line.startswith("is_obsolete: true"):
                    is_obs = True

            if curie and label:
                terms.append(ParsedOntologyClass(
                    curie=curie,
                    label=label,
                    definition=defn,
                    synonyms=synonyms,
                    parents=parents,
                    cross_references=xrefs,
                    is_obsolete=is_obs
                ))
        return terms
