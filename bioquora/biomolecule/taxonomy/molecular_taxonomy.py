"""
BIOQUORA - Unified Molecular Entity Taxonomy
Implements Module 1 for Step 5 Stage 2 (BioMolecule v1.0).
Defines complete taxonomy of molecular entities across DNA, RNA, Proteins, Enzymes, Metabolites, and Variants.
"""

from typing import Dict, Any, List

class UnifiedMolecularTaxonomy:
    @staticmethod
    def get_taxonomy_tree() -> Dict[str, List[str]]:
        return {
            "DNA": ["CHROMOSOME", "GENE", "PROMOTER", "ENHANCER", "CPG_ISLAND", "TELOMERE"],
            "RNA": ["mRNA", "miRNA", "lncRNA", "circRNA", "tRNA", "rRNA", "snRNA", "snoRNA"],
            "PROTEIN": ["MONOMER_PROTEIN", "ENZYME", "PEPTIDE", "PROTEIN_COMPLEX", "ISOFORM"],
            "METABOLITE_SMALL_MOLECULE": ["METABOLITE", "LIPID", "CARBOHYDRATE", "COFACTOR", "DRUG_LIGAND"],
            "VARIANT": ["SNP", "INDEL", "CNV", "STRUCTURAL_VARIANT", "SOMATIC_MUTATION", "GERMLINE_MUTATION"]
        }

    @staticmethod
    def classify_entity(entity_type: str) -> Dict[str, Any]:
        tree = UnifiedMolecularTaxonomy.get_taxonomy_tree()
        for parent, subtypes in tree.items():
            if entity_type.upper() in subtypes or entity_type.upper() == parent:
                return {
                    "entity_type": entity_type.upper(),
                    "parent_category": parent,
                    "is_computable_molecular_object": True,
                    "status": "TAXONOMY_CLASSIFIED"
                }
        return {"entity_type": entity_type, "parent_category": "UNKNOWN", "status": "UNCLASSIFIED"}
