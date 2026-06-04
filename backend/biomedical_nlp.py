"""
MEDINEX — STEP 4: BIOMEDICAL NLP PIPELINE
==========================================
Converts biomedical text into structured knowledge.

Implements the full pipeline that scispaCy / BioBERT / PubMedBERT provide:

  Paper
    ↓
  Entities  (NER: Disease, Drug, Gene, Protein, Species, Chemical)
    ↓
  Relations (co-occurrence + pattern-based: treats, causes, inhibits, etc.)
    ↓
  Embeddings (TF-IDF + semantic vectors for similarity search)

Architecture:
  - BiomedicalNER     : rule-based entity recognizer (replicates scispaCy patterns)
  - RelationExtractor : extracts typed relations from entity pairs in context
  - BiomedicalEmbedder: TF-IDF + cosine similarity (PubMedBERT-equivalent for offline)
  - NLPPipeline       : orchestrates all three stages end-to-end
"""

import re
import json
import math
import sqlite3
import itertools
import numpy as np
import pandas as pd
from pathlib import Path
from typing import Optional
from collections import defaultdict, Counter
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
from spacy.tokens import Span
from spacy.language import Language

DATA_DIR   = Path(__file__).parent.parent / "data"
NLP_DIR    = DATA_DIR / "nlp"
PUBMED_DIR = DATA_DIR / "pubmed"
NLP_DIR.mkdir(parents=True, exist_ok=True)


# ══════════════════════════════════════════════════════════════════
# 4A.  BIOMEDICAL ENTITY LEXICONS
#      (Mirrors the entity types in scispaCy's en_core_sci models)
# ══════════════════════════════════════════════════════════════════

ENTITY_LEXICONS = {

    "DISEASE": [
        # Neurodegenerative
        "alzheimer's disease", "alzheimer disease", "parkinson's disease",
        "parkinson disease", "multiple sclerosis", "amyotrophic lateral sclerosis",
        "huntington's disease", "dementia", "frontotemporal dementia",
        # Cancer
        "breast cancer", "lung cancer", "colorectal cancer", "prostate cancer",
        "pancreatic cancer", "leukemia", "lymphoma", "melanoma", "glioblastoma",
        "diffuse large b-cell lymphoma", "multiple myeloma", "mantle cell lymphoma",
        # Metabolic / Cardiovascular
        "type 2 diabetes", "type 1 diabetes", "diabetes mellitus",
        "heart failure", "myocardial infarction", "hypertension",
        "atrial fibrillation", "coronary artery disease", "stroke",
        "atherosclerosis", "metabolic syndrome",
        # Inflammatory / Immune
        "rheumatoid arthritis", "systemic lupus erythematosus", "crohn's disease",
        "ulcerative colitis", "sepsis", "pneumonia", "covid-19", "sars-cov-2",
        "long covid", "post-acute covid", "neuroinflammation",
        # Genetic
        "cystic fibrosis", "sickle cell disease", "down syndrome",
        "fragile x syndrome", "phenylketonuria",
        # Renal / Pulmonary
        "acute kidney injury", "chronic kidney disease", "copd",
        "asthma", "pulmonary fibrosis", "acute respiratory distress syndrome",
    ],

    "DRUG": [
        # Antibiotics
        "vancomycin", "metronidazole", "piperacillin", "ceftriaxone",
        "azithromycin", "amoxicillin", "ciprofloxacin", "meropenem",
        # Cardiovascular
        "metoprolol", "lisinopril", "atorvastatin", "warfarin", "heparin",
        "aspirin", "clopidogrel", "furosemide", "amiodarone", "digoxin",
        "amlodipine", "spironolactone", "losartan",
        # Oncology
        "pembrolizumab", "nivolumab", "trastuzumab", "bevacizumab",
        "rituximab", "imatinib", "erlotinib", "paclitaxel", "docetaxel",
        "carboplatin", "cisplatin", "cyclophosphamide", "tamoxifen",
        "olaparib", "rucaparib", "niraparib",  # PARP inhibitors
        "aducanumab", "lecanemab", "donanemab",  # Anti-amyloid
        # ICU / Vasopressors
        "norepinephrine", "vasopressin", "dopamine", "epinephrine",
        "propofol", "midazolam", "fentanyl", "morphine",
        # Metabolic
        "metformin", "insulin", "glipizide", "sitagliptin", "semaglutide",
        "liraglutide", "empagliflozin",
        # Immunosuppression
        "prednisone", "methylprednisolone", "tacrolimus", "cyclosporine",
        "mycophenolate", "azathioprine",
        # Antivirals
        "remdesivir", "nirmatrelvir", "molnupiravir", "oseltamivir",
    ],

    "GENE": [
        # Cancer genes
        "brca1", "brca2", "tp53", "egfr", "kras", "braf", "her2", "erbb2",
        "alk", "ret", "met", "cdkn2a", "pten", "rb1", "apc", "vhl",
        "mlh1", "msh2", "msh6",
        # Alzheimer's genes
        "app", "psen1", "psen2", "apoe", "trem2", "bin1", "clu", "abca7",
        # Metabolic genes
        "pparg", "lepr", "ins", "irs1", "irs2", "glut4", "slc2a4",
        # Inflammatory
        "tnf", "il6", "il1b", "nfkb1", "stat3", "jak2", "ifng",
        "cxcl10", "ccl2", "tlr4",
        # DNA repair / cancer
        "atm", "chek2", "palb2", "rad51", "fancd2",
        # Signaling
        "akt1", "pi3k", "mtor", "mapk1", "erk2", "vegfa",
        "p53", "mdm2", "bcl2", "mcl1",
    ],

    "PROTEIN": [
        "amyloid beta", "amyloid-beta", "tau protein", "alpha-synuclein",
        "tdp-43", "sod1", "huntingtin",
        "ace2", "spike protein", "cd4", "cd8", "pd-1", "pd-l1", "ctla-4",
        "car-t", "chimeric antigen receptor",
        "ampk", "mtor", "nf-kb", "stat3", "p53 protein",
        "creatinine", "troponin", "hemoglobin", "albumin", "fibrinogen",
        "interleukin-6", "tumor necrosis factor", "interferon-gamma",
        "c-reactive protein", "procalcitonin",
    ],

    "SPECIES": [
        "homo sapiens", "mus musculus", "rattus norvegicus",
        "saccharomyces cerevisiae", "escherichia coli", "drosophila melanogaster",
        "caenorhabditis elegans", "danio rerio", "xenopus laevis",
    ],

    "ANATOMICAL_STRUCTURE": [
        "hippocampus", "prefrontal cortex", "amygdala", "cerebellum",
        "blood-brain barrier", "synapse", "neuron", "microglia", "astrocyte",
        "mitochondria", "nucleus", "endoplasmic reticulum",
        "bone marrow", "thymus", "lymph node", "spleen",
        "kidney tubule", "glomerulus", "alveoli", "bronchiole",
        "cardiomyocyte", "hepatocyte", "pancreatic beta cell",
    ],

    "CHEMICAL": [
        "glucose", "cholesterol", "ldl", "hdl", "triglycerides",
        "reactive oxygen species", "ros", "nitric oxide",
        "atp", "nadh", "camp", "ip3",
        "serotonin", "dopamine", "acetylcholine", "norepinephrine",
        "glutamate", "gaba", "adenosine",
        "hydrogen peroxide", "superoxide",
        "dna", "rna", "mrna", "sirna", "mirna",
        "lipopolysaccharide", "lps",
    ],
}

# Build a flat lookup: term → entity_type
TERM_TO_TYPE: dict[str, str] = {}
for etype, terms in ENTITY_LEXICONS.items():
    for term in terms:
        TERM_TO_TYPE[term.lower()] = etype


# ══════════════════════════════════════════════════════════════════
# 4B.  BIOMEDICAL NER ENGINE
#      Replicates what scispaCy does with its EntityRuler + NER
# ══════════════════════════════════════════════════════════════════

class BiomedicalNER:
    """
    Rule-based biomedical named entity recognizer.
    Uses spaCy blank pipeline + EntityRuler with biomedical lexicons.
    In production: swap with scispaCy's en_core_sci_lg model.
    """

    def __init__(self):
        self.nlp = spacy.blank("en")
        self._add_entity_ruler()
        self._add_icd_patterns()

    def _add_entity_ruler(self):
        """Add EntityRuler with all biomedical lexicon patterns."""
        ruler = self.nlp.add_pipe("entity_ruler", config={"overwrite_ents": True})
        patterns = []
        for etype, terms in ENTITY_LEXICONS.items():
            for term in terms:
                patterns.append({"label": etype, "pattern": term})
                # Also match titlecase / uppercase variants
                patterns.append({"label": etype, "pattern": term.title()})
                if etype == "GENE":
                    patterns.append({"label": etype, "pattern": term.upper()})
        ruler.add_patterns(patterns)

    def _add_icd_patterns(self):
        """Add ICD-10 code pattern matching."""
        # ICD-10 codes: letter + 2 digits + optional decimal + digits
        self._icd_pattern = re.compile(
            r'\b([A-Z]\d{2}(?:\.\d{1,4})?)\b'
        )

    def extract_entities(self, text: str) -> list[dict]:
        """
        Run NER on biomedical text. Returns list of entity dicts.
        Each dict: {text, label, start, end, start_char, end_char}
        """
        doc = self.nlp(text.lower()[:100_000])  # spaCy token limit guard

        entities = []
        seen_spans = set()

        for ent in doc.ents:
            span_key = (ent.start_char, ent.end_char)
            if span_key in seen_spans:
                continue
            seen_spans.add(span_key)
            entities.append({
                "text": ent.text,
                "canonical": ent.text.lower(),
                "label": ent.label_,
                "start_char": ent.start_char,
                "end_char": ent.end_char,
                "source": "entity_ruler",
            })

        # ICD-10 codes (original casing)
        for match in self._icd_pattern.finditer(text):
            entities.append({
                "text": match.group(),
                "canonical": match.group(),
                "label": "ICD_CODE",
                "start_char": match.start(),
                "end_char": match.end(),
                "source": "regex",
            })

        # Deduplicate and sort by position
        entities.sort(key=lambda e: e["start_char"])
        return entities

    def entity_summary(self, entities: list[dict]) -> dict:
        """Summarize entity distribution."""
        by_type = defaultdict(list)
        for e in entities:
            by_type[e["label"]].append(e["canonical"])
        return {k: list(dict.fromkeys(v)) for k, v in by_type.items()}


# ══════════════════════════════════════════════════════════════════
# 4C.  RELATION EXTRACTOR
#      Replicates BioBERT relation extraction with pattern matching
#      In production: fine-tune BioBERT on BioRel / ChemProt datasets
# ══════════════════════════════════════════════════════════════════

RELATION_PATTERNS = {
    "TREATS": [
        r"({drug})\s+(?:treats?|used (?:for|to treat)|indicated for|therapy for|treatment of|reduces?|improves?)\s+(?:\w+\s+)*({disease})",
        r"({disease})\s+(?:treated|managed|controlled)\s+(?:with|by|using)\s+(?:\w+\s+)*({drug})",
        r"({drug})\s+(?:showed?|demonstrates?|exhibits?)\s+(?:efficacy|effect|benefit)\s+(?:in|against|for)\s+(?:\w+\s+)*({disease})",
    ],
    "INHIBITS": [
        r"({drug})\s+(?:inhibits?|blocks?|suppresses?|antagonizes?|reduces?)\s+(?:\w+\s+)*({protein}|{gene})",
        r"({drug})\s+(?:is\s+(?:an?\s+)?)?(?:inhibitor|antagonist|blocker)\s+of\s+(?:\w+\s+)*({protein}|{gene})",
    ],
    "CAUSES": [
        r"({gene}|{protein})\s+(?:causes?|induces?|promotes?|drives?|leads?\s+to)\s+(?:\w+\s+)*({disease})",
        r"({disease})\s+(?:is\s+caused\s+by|results?\s+from|is\s+associated\s+with)\s+(?:\w+\s+)*({gene}|{protein})",
    ],
    "ASSOCIATED_WITH": [
        r"({gene})\s+(?:(?:is\s+)?associated\s+with|linked\s+to|implicated\s+in|variant[s]?\s+in)\s+(?:\w+\s+)*({disease})",
        r"({disease})\s+(?:is\s+associated\s+with|involves?|is\s+linked\s+to)\s+(?:\w+\s+)*({gene})",
        r"({gene})\s+(?:mutation[s]?|variant[s]?|polymorphism[s]?)\s+(?:\w+\s+){0,5}({disease})",
    ],
    "TARGETED_BY": [
        r"({gene}|{protein})\s+(?:is\s+)?(?:targeted|inhibited|blocked)\s+by\s+(?:\w+\s+)*({drug})",
        r"({drug})\s+(?:targets?|inhibits?)\s+(?:\w+\s+)*({gene}|{protein})",
    ],
    "BIOMARKER_FOR": [
        r"({protein}|{chemical})\s+(?:(?:is\s+a\s+)?biomarker|marker)\s+(?:for|of)\s+(?:\w+\s+)*({disease})",
        r"elevated?\s+(?:\w+\s+)*({protein}|{chemical})\s+(?:in|among)\s+(?:\w+\s+)*({disease})",
    ],
    "CO_OCCURS": [],  # filled by co-occurrence analysis
}


class RelationExtractor:
    """
    Extract typed biological relations from text.
    Uses:
      1. Pattern-based extraction (regex over entity mentions)
      2. Co-occurrence within sentence windows
    In production: replace with BioBERT fine-tuned on BioRel/ChemProt.
    """

    def __init__(self, ner: BiomedicalNER):
        self.ner = ner

    def extract_relations(self, text: str, pmid: str = "") -> list[dict]:
        """Full relation extraction pipeline."""
        entities = self.ner.extract_entities(text)
        relations = []

        # 1) Pattern-based extraction
        relations.extend(self._pattern_extraction(text, entities))

        # 2) Co-occurrence within sentence windows
        relations.extend(self._cooccurrence_extraction(text, entities, pmid))

        # Deduplicate
        seen = set()
        unique = []
        for r in relations:
            key = (r["subject"], r["relation"], r["object"])
            if key not in seen:
                seen.add(key)
                unique.append(r)

        return unique

    def _pattern_extraction(self, text: str, entities: list[dict]) -> list[dict]:
        """Match relation patterns over entity spans."""
        relations = []
        text_lower = text.lower()

        # Build quick entity lookup by type
        by_type = defaultdict(list)
        for e in entities:
            by_type[e["label"]].append(e["canonical"])

        # Simple co-occurrence within 150-char window for key relation types
        relation_triggers = {
            "TREATS": [
                "treats", "treat", "therapy", "treatment", "indicated for",
                "reduces", "used for", "effective for", "beneficial for",
            ],
            "INHIBITS": [
                "inhibits", "inhibit", "blocks", "suppresses", "antagonizes",
                "inhibitor", "blocker", "antagonist",
            ],
            "CAUSES": [
                "causes", "cause", "induces", "promotes", "drives",
                "leads to", "results in", "responsible for",
            ],
            "ASSOCIATED_WITH": [
                "associated with", "linked to", "implicated in",
                "risk factor", "correlation", "mutant", "mutation",
            ],
            "TARGETED_BY": [
                "targeted by", "target of", "inhibited by",
            ],
            "BIOMARKER_FOR": [
                "biomarker", "marker for", "elevated in", "levels in",
            ],
        }

        drugs    = by_type.get("DRUG", [])
        diseases = by_type.get("DISEASE", [])
        genes    = by_type.get("GENE", [])
        proteins = by_type.get("PROTEIN", [])
        chemicals= by_type.get("CHEMICAL", [])

        # Drug ↔ Disease: TREATS
        for drug in drugs:
            for disease in diseases:
                window = self._extract_window(text_lower, drug, disease, 200)
                if window and any(t in window for t in relation_triggers["TREATS"]):
                    relations.append({
                        "subject": drug, "subject_type": "DRUG",
                        "relation": "TREATS",
                        "object": disease, "object_type": "DISEASE",
                        "method": "pattern", "confidence": 0.75,
                    })

        # Drug ↔ Gene/Protein: INHIBITS / TARGETED_BY
        for drug in drugs:
            for target in genes + proteins:
                window = self._extract_window(text_lower, drug, target, 200)
                if window and any(t in window for t in relation_triggers["INHIBITS"]):
                    relations.append({
                        "subject": drug, "subject_type": "DRUG",
                        "relation": "INHIBITS",
                        "object": target,
                        "object_type": "GENE" if target in genes else "PROTEIN",
                        "method": "pattern", "confidence": 0.72,
                    })

        # Gene ↔ Disease: ASSOCIATED_WITH / CAUSES
        for gene in genes:
            for disease in diseases:
                window = self._extract_window(text_lower, gene, disease, 250)
                if window:
                    if any(t in window for t in relation_triggers["CAUSES"]):
                        rel = "CAUSES"
                        conf = 0.70
                    elif any(t in window for t in relation_triggers["ASSOCIATED_WITH"]):
                        rel = "ASSOCIATED_WITH"
                        conf = 0.68
                    else:
                        continue
                    relations.append({
                        "subject": gene, "subject_type": "GENE",
                        "relation": rel,
                        "object": disease, "object_type": "DISEASE",
                        "method": "pattern", "confidence": conf,
                    })

        # Protein / Chemical ↔ Disease: BIOMARKER_FOR
        for biomarker in proteins + chemicals:
            for disease in diseases:
                window = self._extract_window(text_lower, biomarker, disease, 200)
                if window and any(t in window for t in relation_triggers["BIOMARKER_FOR"]):
                    relations.append({
                        "subject": biomarker,
                        "subject_type": "PROTEIN" if biomarker in proteins else "CHEMICAL",
                        "relation": "BIOMARKER_FOR",
                        "object": disease, "object_type": "DISEASE",
                        "method": "pattern", "confidence": 0.65,
                    })

        return relations

    def _cooccurrence_extraction(self, text: str, entities: list[dict],
                                  pmid: str) -> list[dict]:
        """
        Extract CO_OCCURS relations from entity pairs in same sentence.
        This is the baseline used before supervised relation extraction.
        """
        sentences = re.split(r'(?<=[.!?])\s+', text)
        relations = []

        for sent in sentences:
            sent_lower = sent.lower()
            sent_ents = [
                e for e in entities
                if e["canonical"] in sent_lower
            ]
            # Pair all entities in same sentence
            for e1, e2 in itertools.combinations(sent_ents, 2):
                if e1["label"] == e2["label"]:
                    continue  # skip same-type pairs
                # Only interesting cross-type pairs
                pair_types = {e1["label"], e2["label"]}
                interesting = (
                    {"DISEASE", "GENE"} <= pair_types or
                    {"DISEASE", "DRUG"} <= pair_types or
                    {"GENE", "DRUG"} <= pair_types or
                    {"GENE", "PROTEIN"} <= pair_types
                )
                if interesting:
                    relations.append({
                        "subject": e1["canonical"], "subject_type": e1["label"],
                        "relation": "CO_OCCURS",
                        "object": e2["canonical"], "object_type": e2["label"],
                        "method": "cooccurrence", "confidence": 0.50,
                        "pmid": pmid,
                    })
        return relations

    @staticmethod
    def _extract_window(text: str, e1: str, e2: str, window: int) -> Optional[str]:
        """Extract text window around two entity mentions."""
        idx1 = text.find(e1)
        idx2 = text.find(e2)
        if idx1 == -1 or idx2 == -1:
            return None
        lo = max(0, min(idx1, idx2) - 20)
        hi = min(len(text), max(idx1 + len(e1), idx2 + len(e2)) + 20)
        if abs(idx1 - idx2) > window:
            return None
        return text[lo:hi]


# ══════════════════════════════════════════════════════════════════
# 4D.  BIOMEDICAL EMBEDDINGS
#      TF-IDF document embeddings + cosine similarity
#      In production: replace with PubMedBERT sentence embeddings
# ══════════════════════════════════════════════════════════════════

class BiomedicalEmbedder:
    """
    Compute biomedical text embeddings using TF-IDF with
    biomedical-optimized preprocessing.

    PubMedBERT equivalent for offline use:
    - In production: microsoft/BiomedNLP-PubMedBERT-base-uncased-abstract
    - Swap self.vectorize() with model.encode() from sentence-transformers
    """

    BIOMEDICAL_STOP_WORDS = {
        "the", "a", "an", "in", "of", "and", "or", "to", "with",
        "is", "are", "was", "were", "be", "been", "being", "have",
        "has", "had", "do", "does", "did", "will", "would", "could",
        "should", "may", "might", "shall", "can", "this", "that",
        "these", "those", "we", "our", "their", "patients", "patient",
        "study", "studies", "results", "methods", "conclusions",
        "background", "purpose", "objective", "conclusion",
        "significantly", "however", "therefore", "moreover", "also",
        "furthermore", "although", "while", "among", "between",
        "within", "without", "from", "into", "through", "during",
    }

    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 3),       # unigrams, bigrams, trigrams
            max_features=15_000,
            min_df=1,
            stop_words=list(self.BIOMEDICAL_STOP_WORDS),
            sublinear_tf=True,        # log normalization
            analyzer="word",
        )
        self.corpus: list[dict] = []
        self.matrix = None
        self.is_fitted = False

    def fit(self, documents: list[dict]):
        """
        Fit on a corpus of paper dicts.
        Each dict must have 'abstract' and optionally 'title', 'mesh_terms_flat'.
        """
        self.corpus = documents
        texts = []
        for doc in documents:
            # Combine title (2x weight via repetition), abstract, MeSH
            title   = doc.get("title", "") or ""
            abstract= doc.get("abstract", "") or ""
            mesh    = doc.get("mesh_terms_flat", "") or ""
            combined = f"{title} {title} {abstract} {mesh}"
            texts.append(combined)

        self.matrix = self.vectorizer.fit_transform(texts)
        self.is_fitted = True
        return self

    def embed(self, text: str) -> np.ndarray:
        """Embed a single query string. Returns sparse→dense vector."""
        assert self.is_fitted, "Call fit() first"
        return self.vectorizer.transform([text])

    def most_similar(self, query: str, top_k: int = 5) -> list[dict]:
        """Find top-k most similar papers to a query string."""
        q_vec = self.embed(query)
        sims  = cosine_similarity(q_vec, self.matrix).flatten()
        top_idx = sims.argsort()[::-1][:top_k]
        results = []
        for idx in top_idx:
            doc = self.corpus[idx].copy()
            doc["similarity_score"] = float(round(sims[idx], 4))
            results.append(doc)
        return results

    def paper_similarity(self, pmid1: str, pmid2: str) -> float:
        """Compute cosine similarity between two papers by PMID."""
        ids = [d.get("pmid") for d in self.corpus]
        i1 = ids.index(pmid1) if pmid1 in ids else -1
        i2 = ids.index(pmid2) if pmid2 in ids else -1
        if i1 == -1 or i2 == -1:
            return 0.0
        sim = cosine_similarity(self.matrix[i1], self.matrix[i2])
        return float(round(sim[0][0], 4))

    def top_terms(self, pmid: str, top_k: int = 10) -> list[tuple]:
        """Get the highest-weighted TF-IDF terms for a paper."""
        ids = [d.get("pmid") for d in self.corpus]
        idx = ids.index(pmid) if pmid in ids else -1
        if idx == -1:
            return []
        vec = self.matrix[idx]
        feat_names = self.vectorizer.get_feature_names_out()
        scores = zip(feat_names, vec.toarray().flatten())
        return sorted(scores, key=lambda x: x[1], reverse=True)[:top_k]


# ══════════════════════════════════════════════════════════════════
# 4E.  END-TO-END NLP PIPELINE
# ══════════════════════════════════════════════════════════════════

class NLPPipeline:
    """
    Orchestrates NER → Relation Extraction → Embedding
    for the full biomedical paper corpus.
    """

    def __init__(self):
        self.ner       = BiomedicalNER()
        self.re_engine = RelationExtractor(self.ner)
        self.embedder  = BiomedicalEmbedder()

    def process_paper(self, paper: dict) -> dict:
        """Run full NLP pipeline on one paper."""
        text = f"{paper.get('title', '')} {paper.get('abstract', '')}"

        # NER
        entities  = self.ner.extract_entities(text)
        summary   = self.ner.entity_summary(entities)

        # Relation extraction
        relations = self.re_engine.extract_relations(text, pmid=paper.get("pmid", ""))

        return {
            "pmid"     : paper.get("pmid"),
            "title"    : paper.get("title"),
            "entities" : entities,
            "entity_summary": summary,
            "relations": relations,
            "entity_count"  : len(entities),
            "relation_count": len(relations),
        }

    def process_corpus(self, papers: list[dict]) -> list[dict]:
        """Process all papers and fit the embedder."""
        print(f"  Running NLP pipeline on {len(papers)} papers...")
        results = []
        for p in papers:
            r = self.process_paper(p)
            results.append(r)
            print(f"    PMID {r['pmid']:>10s}  "
                  f"{r['entity_count']:3d} entities  "
                  f"{r['relation_count']:3d} relations")

        # Fit embedder on full corpus
        self.embedder.fit(papers)
        print(f"  Embedder fitted: vocab size = {len(self.embedder.vectorizer.vocabulary_):,}")

        return results

    def save_results(self, results: list[dict]) -> Path:
        """Save NLP results to JSON."""
        out = NLP_DIR / "nlp_results.json"
        # Convert numpy types for JSON serialization
        serializable = json.loads(json.dumps(results, default=str))
        with open(out, "w") as f:
            json.dump(serializable, f, indent=2)
        print(f"  ✓ NLP results saved → {out}")
        return out

    def save_relations(self, results: list[dict]) -> Path:
        """Flatten all relations across papers to a CSV."""
        all_rels = []
        for r in results:
            for rel in r.get("relations", []):
                rel["pmid"] = r["pmid"]
                all_rels.append(rel)
        df = pd.DataFrame(all_rels)
        out = NLP_DIR / "relations.csv"
        df.to_csv(out, index=False)
        print(f"  ✓ Relations CSV   saved → {out}  ({len(df)} rows)")
        return out


# ══════════════════════════════════════════════════════════════════
# DEMO — Run Step 4
# ══════════════════════════════════════════════════════════════════

def print_nlp_results(result: dict):
    print(f"\n  ┌─ PMID {result['pmid']} — {result['title'][:60]}...")
    print(f"  │  Entities found: {result['entity_count']}")
    for etype, terms in result.get("entity_summary", {}).items():
        print(f"  │    {etype:25s}: {', '.join(terms[:5])}")
    print(f"  │  Relations found: {result['relation_count']}")
    for rel in result.get("relations", [])[:6]:
        conf = rel.get("confidence", 0)
        print(f"  │    [{rel['subject_type']}] {rel['subject'][:20]:<20} "
              f"─── {rel['relation']:<16} ──▶ "
              f"[{rel['object_type']}] {rel['object'][:20]}   "
              f"(conf={conf:.2f})")
    print("  └─")


if __name__ == "__main__":
    import sys
    sys.path.insert(0, str(Path(__file__).parent.parent))
    from sample_data import SAMPLE_PAPERS

    print("\n  MEDINEX PHASE 0 · STEP 4: BIOMEDICAL NLP PIPELINE")
    print("  " + "─" * 55)
    print("\n  Components:")
    print("  ├─ BiomedicalNER        (scispaCy equivalent — EntityRuler + lexicons)")
    print("  ├─ RelationExtractor    (BioBERT equivalent — pattern + co-occurrence)")
    print("  └─ BiomedicalEmbedder   (PubMedBERT equivalent — TF-IDF semantic vectors)")

    pipeline = NLPPipeline()

    # Process all sample papers
    print("\n" + "═" * 70)
    print("  STEP 4A — Named Entity Recognition (NER)")
    print("═" * 70)
    results = pipeline.process_corpus(SAMPLE_PAPERS)

    for r in results:
        print_nlp_results(r)

    # Semantic similarity demo
    print("\n" + "═" * 70)
    print("  STEP 4B — Biomedical Embeddings & Semantic Similarity")
    print("═" * 70)

    queries = [
        "amyloid beta plaques neurodegeneration treatment",
        "BRCA gene mutation cancer risk therapy",
        "diabetes insulin resistance glucose metabolism",
        "CAR-T cell immunotherapy lymphoma",
    ]

    for query in queries:
        print(f"\n  Query: \"{query}\"")
        hits = pipeline.embedder.most_similar(query, top_k=2)
        for h in hits:
            score = h.get("similarity_score", 0)
            print(f"    {score:.4f}  [{h.get('pmid')}] {h.get('title','')[:60]}...")

    # Paper-to-paper similarity
    print("\n  Paper-to-paper similarity matrix:")
    pmids = [p["pmid"] for p in SAMPLE_PAPERS]
    print(f"  {'':15}", end="")
    for p in pmids:
        print(f"  {p:>12}", end="")
    print()
    for p1 in pmids:
        print(f"  {p1:<15}", end="")
        for p2 in pmids:
            sim = pipeline.embedder.paper_similarity(p1, p2)
            print(f"  {'█'*int(sim*8):<8} {sim:.2f}", end="")
        print()

    # Top TF-IDF terms per paper
    print("\n  Top biomedical terms (TF-IDF weights):")
    for paper in SAMPLE_PAPERS[:3]:
        pmid = paper["pmid"]
        terms = pipeline.embedder.top_terms(pmid, top_k=6)
        term_str = "  |  ".join(f"{t} ({w:.3f})" for t, w in terms)
        print(f"  [{pmid}] {term_str}")

    # Save all results
    print("\n" + "═" * 70)
    pipeline.save_results(results)
    pipeline.save_relations(results)

    # Summary stats
    all_rels = [r for res in results for r in res["relations"]]
    rel_counts = Counter(r["relation"] for r in all_rels)
    print("\n  Relation type distribution:")
    for rtype, cnt in rel_counts.most_common():
        bar = "█" * cnt
        print(f"    {rtype:<20} {bar} ({cnt})")

    print("\n  ✅ STEP 4 COMPLETE — Paper → Entities → Relations → Embeddings\n")
