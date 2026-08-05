"""
Module 7: Biomedical Question Answering Engine
Answers natural language clinical & mechanistic questions grounded in GraphRAG evidence.
"""

from typing import List
from bioquora.search.schema import GraphRAGContext, BiomedicalQAResponse


class BiomedicalQuestionAnsweringEngine:
    """Production Grounded Biomedical QA Engine."""

    def answer_question(self, context: GraphRAGContext) -> BiomedicalQAResponse:
        if not context.retrieved_triples:
            return BiomedicalQAResponse(
                answer_text="No validated biomedical evidence found in indexed corpus.",
                confidence=0.0,
            )

        top_triple = context.retrieved_triples[0]
        answer = (
            f"Based on evidence from {', '.join(context.supporting_papers)}, "
            f"{top_triple['subject']} has a {top_triple['certainty'].lower()} relationship "
            f"({top_triple['relationship']}) with {top_triple['object']}."
        )

        paths = [
            f"({t['subject']}) --[{t['relationship']}]--> ({t['object']})"
            for t in context.retrieved_triples
        ]

        return BiomedicalQAResponse(
            answer_text=answer,
            confidence=context.grounding_confidence,
            supporting_evidence=[context.evidence_summary],
            citations=context.supporting_papers,
            graph_paths=paths,
        )
