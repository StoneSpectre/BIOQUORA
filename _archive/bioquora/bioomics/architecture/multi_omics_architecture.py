"""
BIOQUORA - Unified Multi-Omics Architecture Document (Code Representation)
Implements Module 1 for Step 5 Stage 9 (BioOmics v1.0).
Designs Bioquora's unified omics ecosystem.
"""

from typing import Dict, Any, List

class MultiOmicsArchitecture:
    @staticmethod
    def get_supported_layers() -> List[str]:
        return [
            "Genomics", "Transcriptomics", "Proteomics",
            "Metabolomics", "Epigenomics", "Lipidomics",
            "Glycomics", "Microbiomics", "Phenomics",
            "Radiomics", "Spatial Omics", "Single-cell Omics"
        ]
