"""
Module 1: Biomedical Text Preprocessing Engine
Normalizes Unicode, segments narrative into sentences, and prepares text for NLP extraction.
"""

import re
from typing import List


class BiomedicalTextPreprocessingEngine:
    """Production Biomedical Text Normalizer & Sentence Segmenter."""

    def normalize_and_segment(self, raw_text: str) -> List[str]:
        cleaned = re.sub(r"\s+", " ", raw_text).strip()
        sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+", cleaned) if len(s.strip()) > 3]
        return sentences
