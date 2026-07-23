"""
BIOQUORA - Network Medicine Architecture
Implements Module 1 for Step 5 Stage 12 (BioNetworkMed v1.0).
Defines the computational framework to represent Diseases, Symptoms, Phenotypes,
Biomarkers, Drug Targets, Clinical Outcomes, Environmental Factors, Lifestyle Factors,
Genetics, and Molecular Networks.
"""

from typing import Dict, Any, List

class NetworkMedicineArchitecture:
    @staticmethod
    def get_supported_entities() -> List[str]:
        return [
            "Disease", "Symptom", "Phenotype", "Biomarker", "Drug Target",
            "Clinical Outcome", "Environmental Factor", "Lifestyle Factor",
            "Gene", "Molecular Network"
        ]
