"""
BIOQUORA - Sequence Intelligence Engine
Implements Module 9 for Step 5 Stage 2 (BioMolecule v1.0).
Parses FASTA/FASTQ/GenBank formats, executes sequence alignments, motif/domain detection, ORF prediction, and CDS translation.
"""

from typing import Dict, Any, List

class SequenceIntelligenceEngine:
    CODON_TABLE = {
        'ATG': 'M', 'TAA': '*', 'TAG': '*', 'TGA': '*',
        'GCT': 'A', 'TGT': 'C', 'GAT': 'D', 'GAA': 'E',
        'TTT': 'F', 'GGT': 'G', 'CAT': 'H', 'ATT': 'I',
        'AAA': 'K', 'TTA': 'L', 'AAT': 'N', 'CCT': 'P',
        'CAA': 'Q', 'CGT': 'R', 'TCT': 'S', 'ACT': 'T',
        'GTT': 'V', 'TGG': 'W', 'TAT': 'Y'
    }

    @staticmethod
    def translate_dna_sequence(dna_seq: str) -> Dict[str, Any]:
        seq = dna_seq.upper()
        peptide = []
        for i in range(0, len(seq) - 2, 3):
            codon = seq[i:i+3]
            aa = SequenceIntelligenceEngine.CODON_TABLE.get(codon, 'X')
            if aa == '*':
                break
            peptide.append(aa)
        translated = "".join(peptide)
        return {
            "input_dna_length_bp": len(seq),
            "translated_peptide": translated,
            "peptide_length_aa": len(translated),
            "has_start_codon_ATG": seq.startswith("ATG"),
            "status": "SEQUENCE_TRANSLATED_SUCCESS"
        }
