import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class PaperClassifier:
    """
    Step 4: Paper Classification
    Infers study type, domain, and Oxford evidence tier from MeSH terms.
    """
    def __init__(self):
        # Maps study type to (Weight Multiplier, Oxford Tier)
        self.evidence_hierarchy = {
            "Meta-Analysis": (1.0, "I"),
            "Randomized Controlled Trial": (1.0, "I"),
            "Controlled Clinical Trial": (0.8, "II"),
            "Cohort Study": (0.6, "II"),
            "Case-Control Study": (0.4, "III"),
            "Case Report": (0.2, "IV"),
            "Review": (0.5, "IV")
        }
        
        self.domain_keywords = {
            "oncology": ["neoplasms", "cancer", "tumor", "carcinoma", "oncology"],
            "cardiology": ["heart", "cardiovascular", "myocardial", "cardiology"],
            "neurology": ["brain", "neurological", "nervous", "alzheimer", "neurology"],
            "immunology": ["immune", "autoimmune", "allergy", "infection", "immunology"]
        }

    def classify(self, paper_metadata: Dict) -> Dict:
        """
        Classifies a paper based on its MeSH terms and title/abstract.
        Expects a dictionary with 'mesh_terms', 'title', 'abstract'.
        """
        mesh_terms = [m.lower() for m in paper_metadata.get("mesh_terms", [])]
        title = paper_metadata.get("title", "").lower()
        abstract = paper_metadata.get("abstract", "").lower()
        combined_text = title + " " + abstract
        
        # 1. Determine Study Type & Evidence Tier
        study_type = "Observational Study" # Default baseline
        weight = 0.3
        tier = "IV"
        
        # Check against hierarchy (ordered by strength implicitly by checking the dict)
        for ptype, (w, t) in self.evidence_hierarchy.items():
            if ptype.lower() in mesh_terms or ptype.lower() in combined_text:
                study_type = ptype
                weight = w
                tier = t
                break
                
        # 2. Determine Disease Domain
        domain = "general"
        for dom, keywords in self.domain_keywords.items():
            if any(k in mesh_terms for k in keywords) or any(k in combined_text for k in keywords):
                domain = dom
                break
                
        return {
            "study_type": study_type,
            "evidence_tier": tier,
            "evidence_weight": weight,
            "domain": domain
        }
