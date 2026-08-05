"""
Module 7: Negation & Speculation Detection Engine
Detects assertion certainty: CONFIRMED, NEGATIVE, SPECULATIVE, or CONTRADICTORY.
"""

from bioquora.bionlp.schema import CertaintyLabel


class NegationSpeculationDetectionEngine:
    """Production Biomedical Certainty Asserter."""

    def analyze_certainty(self, sentence_text: str) -> CertaintyLabel:
        lower = sentence_text.lower()
        if any(w in lower for w in ["no association", "not significant", "failed trial", "no evidence"]):
            return "NEGATIVE"
        if any(w in lower for w in ["may indicate", "possibly", "suggests", "hypothesized", "likely"]):
            return "SPECULATIVE"
        if any(w in lower for w in ["contradicts", "however", "in contrast"]):
            return "CONTRADICTORY"
        return "CONFIRMED"
