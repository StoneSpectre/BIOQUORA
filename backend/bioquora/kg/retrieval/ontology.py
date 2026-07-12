"""
Part 6 §7.7 (Entity Expansion) and §7.9 (Ontology Retrieval).

"Users rarely use canonical terminology... Expansion is driven by the
ontology layer, not manually curated synonym lists" — in a full deployment
this queries Part 3's ontology service (MONDO/HPO/ChEBI/UMLS cross-maps).
Here we simulate that service with a small in-memory synonym + hierarchy
table so the retrieval pipeline's *behavior* is faithful to the spec even
without a live ontology server.
"""

from __future__ import annotations

from typing import Any

# lay term -> (canonical label, ontology_ids)
SYNONYM_MAP: dict[str, dict] = {
    "heart attack": {
        "canonical": "Myocardial Infarction",
        "aliases": ["Myocardial Infarction", "Acute Myocardial Infarction", "AMI"],
        "ontology_ids": {"ICD11": "BA41", "SNOMEDCT": "22298006", "MONDO": "MONDO:0005068"},
    },
    "breast cancer": {
        "canonical": "Breast Carcinoma",
        "aliases": ["Breast Carcinoma", "Mammary Carcinoma", "Malignant neoplasm of breast"],
        "ontology_ids": {"SNOMEDCT": "254837009", "MONDO": "MONDO:0007254", "ICD11": "2C60"},
    },
    "ca breast": {
        "canonical": "Breast Carcinoma",
        "aliases": ["Breast Carcinoma", "Mammary Carcinoma"],
        "ontology_ids": {"SNOMEDCT": "254837009", "MONDO": "MONDO:0007254"},
    },
    "mammary carcinoma": {
        "canonical": "Breast Carcinoma",
        "aliases": ["Breast Carcinoma", "Breast Cancer"],
        "ontology_ids": {"SNOMEDCT": "254837009", "MONDO": "MONDO:0007254"},
    },
    "breast carcinoma": {
        "canonical": "Breast Carcinoma",
        "aliases": ["Breast Cancer", "Mammary Carcinoma"],
        "ontology_ids": {"SNOMEDCT": "254837009", "MONDO": "MONDO:0007254"},
    },
    "brca1": {
        "canonical": "BRCA1",
        "aliases": ["BRCA1", "breast cancer type 1 susceptibility protein", "BRCA1 DNA repair associated"],
        "ontology_ids": {"HGNC": "HGNC:1100", "NCBI_GENE": "672", "ENSEMBL": "ENSG00000012048"},
    },
    "olaparib": {
        "canonical": "Olaparib",
        "aliases": ["Olaparib", "Lynparza", "AZD2281"],
        "ontology_ids": {"ChEBI": "CHEBI:68634", "ChEMBL": "CHEMBL521", "DrugBank": "DB09074"},
    },
}

# broad concept -> narrower concepts (simulated ontology hierarchy expansion)
HIERARCHY_MAP: dict[str, list[str]] = {
    "cancer": ["Breast Cancer", "Lung Cancer", "Melanoma", "Glioblastoma"],
    "breast cancer": ["HER2-positive Breast Cancer", "Triple-negative Breast Cancer"],
    "breast carcinoma": ["HER2-positive Breast Cancer", "Triple-negative Breast Cancer", "carcinoma", "neoplasm"],
}


class OntologyExpander:
    def __init__(self, registry: Any = None, **kwargs: Any):
        self.registry = registry

    def expand(self, term: str) -> dict:
        key = term.lower().strip()
        result = {
            "input_term": term,
            "mention": term,
            "canonical_label": None,
            "ontology_ids": {},
            "synonym_expansion": [],
            "hierarchy_expansion": [],
        }
        if key in SYNONYM_MAP:
            entry = SYNONYM_MAP[key]
            result["canonical_label"] = entry["canonical"]
            result["ontology_ids"] = entry["ontology_ids"]
            result["synonym_expansion"] = entry["aliases"]
        if key in HIERARCHY_MAP:
            result["hierarchy_expansion"] = HIERARCHY_MAP[key]
        return result
