"""
Medinex GraphRAG — Step 1: Biomedical Question Understanding
============================================================
Sub-steps:
  1.1  Intent Classification       (PubMedBERT + classification head)
  1.2  Biomedical NER              (BioBERT token classification, BIO scheme)
  1.3  Entity Linking              (UMLS / HGNC / ChEMBL / UniProt lookup)
  1.4  Relation Extraction         (subject–relation–object triples)
  1.5  Multi-Hop Detection         (predicted reasoning depth + chain)

Dependencies:
    pip install transformers torch scispacy
    pip install https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.3/en_core_sci_sm-0.5.3.tar.gz
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Tuple, Optional
import re, json


# ─────────────────────────────────────────────────────────────
# Data Classes
# ─────────────────────────────────────────────────────────────

@dataclass
class IntentResult:
    intent: str                        # mechanistic | diagnostic | therapeutic | comparative | genetic | ...
    confidence: float
    retrieval_strategy: str            # human-readable strategy description
    model: str = "PubMedBERT-intent-v1"


@dataclass
class NERToken:
    text: str
    bio_label: str                     # B-GENE, I-DISEASE, O, …
    start: int
    end: int


@dataclass
class EntitySpan:
    text: str
    entity_type: str                   # GENE | DISEASE | DRUG | PROTEIN | PATHWAY | ORGANISM
    start: int
    end: int


@dataclass
class LinkedEntity:
    surface_form: str
    entity_type: str
    canonical_id: str                  # e.g. UMLS:C0021655
    canonical_name: str
    synonyms: List[str]
    source_db: str                     # UMLS | HGNC | ChEMBL | UniProt | KEGG
    link_score: float


@dataclass
class Triple:
    subject: str
    relation: str                      # INHIBITS | ACTIVATES | TREATS | ASSOCIATED_WITH | …
    object: str
    confidence: float
    evidence_sentence: str = ""


@dataclass
class MultiHopPrediction:
    is_multi_hop: bool
    expected_hops: int
    reasoning_chain: List[str]         # e.g. ["Alzheimer's", "Genes", "Proteins", "Drugs"]
    neo4j_traversal_depth: int


@dataclass
class Step1Result:
    query: str
    intent: IntentResult
    ner_tokens: List[NERToken]
    entity_spans: List[EntitySpan]
    linked_entities: List[LinkedEntity]
    triples: List[Triple]
    multi_hop: MultiHopPrediction

    def to_dict(self) -> dict:
        return asdict(self)


# ─────────────────────────────────────────────────────────────
# 1.1  Intent Classifier
# ─────────────────────────────────────────────────────────────

INTENT_KEYWORDS: Dict[str, List[str]] = {
    "mechanistic":    ["how does", "mechanism", "pathway", "inhibit", "activate", "signaling", "molecular"],
    "diagnostic":     ["diagnos", "how is", "symptoms", "criteria", "biomarker", "detect"],
    "therapeutic":    ["treatment", "treat", "drug", "therapy", "cure", "approved", "clinical trial", "rct"],
    "comparative":    ["compare", "versus", "vs", "better", "difference between"],
    "epidemiological":["prevalence", "incidence", "risk factor", "population", "epidemiology"],
    "genetic":        ["gene", "mutation", "variant", "snp", "gwas", "hereditary", "associated gene"],
    "pathway":        ["pathway", "signaling cascade", "downstream", "upstream"],
    "drug_discovery": ["target", "drug discovery", "novel compound", "lead compound"],
}

STRATEGY_MAP: Dict[str, str] = {
    "mechanistic":    "Fetch molecular pathway papers, kinase/enzyme interaction databases, metabolomics studies",
    "diagnostic":     "Retrieve clinical guidelines, WHO documents, diagnostic criteria papers, biomarker studies",
    "therapeutic":    "Query RCTs, meta-analyses, DrugBank, ChEMBL, ClinicalTrials.gov",
    "comparative":    "Fetch head-to-head trials, systematic reviews, network meta-analyses",
    "epidemiological":"Retrieve cohort studies, GWAS summaries, population-level databases",
    "genetic":        "Query OMIM, ClinVar, HGNC, GWAS Catalog, gene-disease association papers",
    "pathway":        "Retrieve KEGG, Reactome, STRING interaction data, pathway enrichment papers",
    "drug_discovery": "Search ChEMBL targets, PDB structures, virtual screening literature",
}


class IntentClassifier:
    """
    Production implementation: replace _classify_heuristic with a
    PubMedBERT fine-tuned on BioASQ / PubMedQA / MedQA intent labels.

    from transformers import pipeline
    self.clf = pipeline("text-classification",
                        model="pruas/BENT-PubMedBERT-NER-Gene",  # swap for intent model
                        tokenizer="microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract")
    """

    def classify(self, query: str) -> IntentResult:
        intent, confidence = self._classify_heuristic(query.lower())
        return IntentResult(
            intent=intent,
            confidence=confidence,
            retrieval_strategy=STRATEGY_MAP.get(intent, "General biomedical literature search"),
        )

    def _classify_heuristic(self, q: str) -> Tuple[str, float]:
        scores: Dict[str, float] = {}
        for intent, keywords in INTENT_KEYWORDS.items():
            hit = sum(1 for kw in keywords if kw in q)
            if hit:
                scores[intent] = round(0.70 + min(hit * 0.09, 0.28), 2)
        if not scores:
            return "mechanistic", 0.55
        best = max(scores, key=scores.__getitem__)
        return best, scores[best]


# ─────────────────────────────────────────────────────────────
# 1.2  Biomedical NER
# ─────────────────────────────────────────────────────────────

# Lightweight gazetteers — replace with BioBERT / scispaCy in production
GAZETTEERS: Dict[str, List[str]] = {
    "GENE":    ["BRCA1","BRCA2","TP53","APOE","APP","PSEN1","EGFR","HER2","TREM2","CLU","BIN1","AMPK","MAPK","PIK3CA"],
    "DISEASE": ["breast cancer","alzheimer's disease","alzheimer disease","insulin resistance","diabetes",
                "hypertension","tuberculosis","covid-19","parkinson","lung cancer","melanoma"],
    "DRUG":    ["metformin","aspirin","ibuprofen","olaparib","erlotinib","trastuzumab","niraparib",
                "rucaparib","talazoparib","glucophage"],
    "PROTEIN": ["egfr","her2","insulin receptor","akt","mtor","parp1","pi3k","insr","ampk","tp53 protein"],
    "PATHWAY": ["pi3k-akt","pi3k/akt","mapk","mtor","ampk pathway","wnt","notch","nf-kb","jak-stat"],
    "ORGANISM":["e.coli","sars-cov-2","h.pylori","p.falciparum"],
}


class BiomedicalNER:
    """
    Production: use BioBERT or PubMedBERT token classifier fine-tuned on
    BC5CDR (chemicals+diseases), NCBI Disease, JNLPBA (genes/proteins).

    from transformers import pipeline
    self.ner = pipeline("ner",
                        model="allenai/scibert_scivocab_uncased",
                        aggregation_strategy="simple")
    """

    def tag(self, query: str) -> Tuple[List[NERToken], List[EntitySpan]]:
        tokens, spans = self._gazetteer_ner(query)
        return tokens, spans

    def _gazetteer_ner(self, query: str) -> Tuple[List[NERToken], List[EntitySpan]]:
        q_lower = query.lower()
        # find entity positions
        entity_positions: List[Tuple[int, int, str]] = []  # (start, end, type)
        for etype, terms in GAZETTEERS.items():
            for term in terms:
                for m in re.finditer(re.escape(term.lower()), q_lower):
                    entity_positions.append((m.start(), m.end(), etype))
        entity_positions.sort(key=lambda x: x[0])

        # build word-level tokens
        words = [(m.group(), m.start(), m.end())
                 for m in re.finditer(r"[\w'-]+|[^\w\s]", query)]

        bio_tokens: List[NERToken] = []
        spans: List[EntitySpan] = []
        used: set = set()

        for word, ws, we in words:
            label = "O"
            for (es, ee, et) in entity_positions:
                if ws >= es and we <= ee and (es, ee) not in used:
                    label = ("B-" if ws == es else "I-") + et
                    if ws == es:
                        used.add((es, ee))
                        spans.append(EntitySpan(
                            text=query[es:ee],
                            entity_type=et,
                            start=es,
                            end=ee,
                        ))
                    break
            bio_tokens.append(NERToken(text=word, bio_label=label, start=ws, end=we))

        return bio_tokens, spans


# ─────────────────────────────────────────────────────────────
# 1.3  Entity Linker
# ─────────────────────────────────────────────────────────────

# Curated stub knowledge base — production uses UMLS Metathesaurus API,
# BioPortal, or a local SQLite mirror of UMLS + HGNC + ChEMBL.
KB: Dict[str, dict] = {
    "metformin":           {"id":"ChEMBL:CHEMBL1431","name":"Metformin","db":"ChEMBL","synonyms":["Glucophage","Dimethylbiguanide","1,1-Dimethylbiguanide"]},
    "insulin resistance":  {"id":"UMLS:C0021655","name":"Insulin Resistance","db":"UMLS","synonyms":["Insulin Insensitivity","Peripheral Insulin Resistance"]},
    "breast cancer":       {"id":"UMLS:C0006142","name":"Breast Cancer","db":"UMLS","synonyms":["Breast Neoplasm","Carcinoma of Breast","Mammary Carcinoma"]},
    "brca1":               {"id":"HGNC:1100","name":"BRCA1","db":"HGNC","synonyms":["FANCS","RNF53","IRIS","BRCAI"]},
    "egfr":                {"id":"UniProt:P00533","name":"EGFR","db":"UniProt","synonyms":["HER1","ErbB1","ERBB","mENA"]},
    "pi3k-akt":            {"id":"KEGG:hsa04151","name":"PI3K-AKT signaling pathway","db":"KEGG","synonyms":["PI3K/AKT","Phosphoinositide 3-kinase pathway"]},
    "alzheimer's disease": {"id":"UMLS:C0002395","name":"Alzheimer's Disease","db":"UMLS","synonyms":["AD","Alzheimer Disease","Senile Dementia of Alzheimer Type"]},
    "apoe":                {"id":"HGNC:613","name":"APOE","db":"HGNC","synonyms":["Apolipoprotein E","ApoE","APOE4"]},
    "app":                 {"id":"HGNC:620","name":"APP","db":"HGNC","synonyms":["Amyloid Precursor Protein","ABPP","PN-II"]},
    "ampk":                {"id":"UniProt:Q13131","name":"AMPK alpha-1","db":"UniProt","synonyms":["PRKAA1","AMPKα","5'-AMP-activated protein kinase"]},
    "mtor":                {"id":"UniProt:P42345","name":"mTOR","db":"UniProt","synonyms":["FRAP1","RAFT1","Mechanistic target of rapamycin"]},
    "parp1":               {"id":"UniProt:P09874","name":"PARP1","db":"UniProt","synonyms":["ADPRT","PPOL","poly ADP-ribose polymerase 1"]},
}


class EntityLinker:
    """
    Production: use scispaCy entity linker with UMLS KB, or
    BioSyn / BioEL / KRISSBERT for neural candidate re-ranking.
    """

    def link(self, spans: List[EntitySpan]) -> List[LinkedEntity]:
        results = []
        for span in spans:
            key = span.text.lower()
            entry = KB.get(key)
            if entry:
                results.append(LinkedEntity(
                    surface_form=span.text,
                    entity_type=span.entity_type,
                    canonical_id=entry["id"],
                    canonical_name=entry["name"],
                    synonyms=entry["synonyms"],
                    source_db=entry["db"],
                    link_score=0.97,
                ))
            else:
                # Fuzzy fallback
                best_key, best_score = self._fuzzy_match(key)
                if best_score > 0.6 and best_key:
                    entry = KB[best_key]
                    results.append(LinkedEntity(
                        surface_form=span.text,
                        entity_type=span.entity_type,
                        canonical_id=entry["id"],
                        canonical_name=entry["name"],
                        synonyms=entry["synonyms"],
                        source_db=entry["db"],
                        link_score=round(best_score, 2),
                    ))
        return results

    def _fuzzy_match(self, surface: str) -> Tuple[Optional[str], float]:
        best_key, best_score = None, 0.0
        for key in KB:
            score = self._jaccard(surface, key)
            if score > best_score:
                best_key, best_score = key, score
        return best_key, best_score

    @staticmethod
    def _jaccard(a: str, b: str) -> float:
        sa, sb = set(a.split()), set(b.split())
        if not sa | sb:
            return 0.0
        return len(sa & sb) / len(sa | sb)


# ─────────────────────────────────────────────────────────────
# 1.4  Relation Extractor
# ─────────────────────────────────────────────────────────────

RELATION_PATTERNS = [
    (r"\b(\w+)\s+(inhibits?|blocks?|suppresses?)\s+(\w[\w\s-]*)", "INHIBITS"),
    (r"\b(\w+)\s+(activates?|upregulates?|induces?)\s+(\w[\w\s-]*)", "ACTIVATES"),
    (r"\b(\w+)\s+(treats?|reduces?|alleviates?)\s+(\w[\w\s-]*)", "TREATS"),
    (r"\b(\w+)\s+(is associated with|associated with)\s+(\w[\w\s-]*)", "ASSOCIATED_WITH"),
    (r"\b(\w+)\s+(phosphorylates?)\s+(\w[\w\s-]*)", "PHOSPHORYLATES"),
    (r"\b(\w+)\s+(encodes?)\s+(\w[\w\s-]*)", "ENCODES"),
]


class RelationExtractor:
    """
    Production: use BioGPT, BioREL, or fine-tuned PubMedBERT on
    BioInfer / AIMed / HPRD50 relation extraction datasets.
    """

    def extract(self, query: str, linked_entities: List[LinkedEntity]) -> List[Triple]:
        triples: List[Triple] = []
        q_lower = query.lower()
        for pattern, rel_label in RELATION_PATTERNS:
            for m in re.finditer(pattern, q_lower):
                subj = m.group(1).strip().title()
                obj  = m.group(3).strip().title()
                triples.append(Triple(
                    subject=subj,
                    relation=rel_label,
                    object=obj,
                    confidence=0.88,
                    evidence_sentence=query,
                ))
        # Supplement with entity-pair co-occurrence triples
        if len(linked_entities) >= 2 and not triples:
            for i in range(len(linked_entities) - 1):
                triples.append(Triple(
                    subject=linked_entities[i].canonical_name,
                    relation="ASSOCIATED_WITH",
                    object=linked_entities[i+1].canonical_name,
                    confidence=0.70,
                    evidence_sentence=query,
                ))
        return triples


# ─────────────────────────────────────────────────────────────
# 1.5  Multi-Hop Detector
# ─────────────────────────────────────────────────────────────

HOP_TEMPLATES: Dict[str, Tuple[int, List[str]]] = {
    "mechanistic":    (3, ["{entity1}", "Molecular target", "Downstream effector", "Phenotypic outcome"]),
    "genetic":        (4, ["{entity1}", "Associated Genes", "Protein Products", "Drug Targets"]),
    "therapeutic":    (3, ["{entity1}", "Molecular Target", "Drug Class", "Approved Drugs"]),
    "diagnostic":     (2, ["{entity1}", "Biomarkers", "Diagnostic Criteria"]),
    "pathway":        (3, ["{entity1}", "Upstream regulator", "Pathway nodes", "Downstream targets"]),
    "comparative":    (2, ["{entity1}", "Comparative evidence", "Clinical outcomes"]),
    "epidemiological":(2, ["{entity1}", "Population data", "Risk estimates"]),
    "drug_discovery": (4, ["{entity1}", "Gene target", "Protein structure", "Drug candidates"]),
}


class MultiHopDetector:
    def predict(self, intent: IntentResult, linked_entities: List[LinkedEntity]) -> MultiHopPrediction:
        template = HOP_TEMPLATES.get(intent.intent, (2, ["{entity1}", "Intermediate", "Answer"]))
        hops, chain_template = template
        seed = linked_entities[0].canonical_name if linked_entities else "Query entity"
        chain = [c.replace("{entity1}", seed) for c in chain_template]
        return MultiHopPrediction(
            is_multi_hop=hops > 1,
            expected_hops=hops,
            reasoning_chain=chain,
            neo4j_traversal_depth=hops,
        )


# ─────────────────────────────────────────────────────────────
# Orchestrator
# ─────────────────────────────────────────────────────────────

class QuestionUnderstanding:
    def __init__(self):
        self.intent_clf  = IntentClassifier()
        self.ner         = BiomedicalNER()
        self.linker      = EntityLinker()
        self.rel_ext     = RelationExtractor()
        self.multihop    = MultiHopDetector()

    def run(self, query: str) -> dict:
        print("  [1.1] Intent Classification…")
        intent = self.intent_clf.classify(query)

        print("  [1.2] Biomedical NER…")
        tokens, spans = self.ner.tag(query)

        print("  [1.3] Entity Linking…")
        linked = self.linker.link(spans)

        print("  [1.4] Relation Extraction…")
        triples = self.rel_ext.extract(query, linked)

        print("  [1.5] Multi-Hop Detection…")
        multihop = self.multihop.predict(intent, linked)

        result = Step1Result(
            query=query,
            intent=intent,
            ner_tokens=tokens,
            entity_spans=spans,
            linked_entities=linked,
            triples=triples,
            multi_hop=multihop,
        )
        return result.to_dict()


# ─────────────────────────────────────────────────────────────
# Quick test
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    qu = QuestionUnderstanding()
    for q in [
        "How does Metformin reduce insulin resistance?",
        "Which drugs target BRCA1 mutation in breast cancer?",
        "What genes are associated with Alzheimer's disease?",
    ]:
        res = qu.run(q)
        print(json.dumps(res, indent=2))
        print()
