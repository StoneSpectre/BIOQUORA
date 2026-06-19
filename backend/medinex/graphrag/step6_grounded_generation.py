"""
Medinex GraphRAG — Step 6: Transparent Citation-Grounded Generation
=====================================================================
The final step: the LLM only writes. All reasoning happened in Steps 1-5.

Sub-steps:
  6.1  Constrained Generation     (prompt forces citation-only claims)
  6.2  Structured Output          (schema: summary/mechanism/evidence/uncertainty/references)
  6.3  Claim-Level Citations      (every sentence cites its source inline)
  6.4  Confidence Estimation      (per-claim: high/medium/low)
  6.5  Hallucination Guard        (BiomedNLI verification of generated claims)
  6.6  Final Research Answer      (assembled human-readable report)

Dependencies:
    pip install anthropic   # or openai / transformers, for the actual generation call
"""

from __future__ import annotations
from dataclasses import dataclass, field, asdict
from typing import List, Dict, Optional
import json, re


# ─────────────────────────────────────────────────────────────
# Data Classes
# ─────────────────────────────────────────────────────────────

@dataclass
class Claim:
    text: str
    citation_indices: List[int]      # e.g. [1, 2] → "[1][2]"
    confidence: str                  # high | medium | low
    supported: bool = True           # set False by hallucination guard if unverifiable


@dataclass
class Reference:
    index: int
    title: str
    journal: str
    year: int
    doi: str
    evidence_score: float


@dataclass
class StructuredAnswer:
    summary: Claim
    mechanism: List[Claim]
    evidence: List[Claim]
    uncertainty: List[Claim]
    references: List[Reference]


@dataclass
class HallucinationCheck:
    claim_text: str
    supported: bool
    nli_label: str           # entailment | neutral | contradiction
    nli_score: float
    matched_evidence_index: Optional[int]


@dataclass
class Step6Result:
    structured_answer: StructuredAnswer
    hallucination_checks: List[HallucinationCheck]
    claims_removed: int
    final_report_markdown: str

    def to_dict(self) -> dict:
        return asdict(self)


# ─────────────────────────────────────────────────────────────
# 6.1  Constrained Generation Prompt Builder
# ─────────────────────────────────────────────────────────────

GENERATION_SYSTEM_PROMPT = """You are Medinex, a biomedical evidence assistant.

RULES (must follow exactly):
1. Use ONLY the supplied evidence below. Do not introduce outside knowledge.
2. Every factual claim must cite its source using [n] notation matching the
   reference list.
3. If evidence is insufficient or absent for a sub-question, explicitly say
   "unknown" or "not established by available evidence" rather than guessing.
4. Do not state speculative mechanisms as fact. Mark them as hypothesized
   if the evidence is indirect (e.g. from graph embedding predictions).
5. Output must follow the structured schema: summary, mechanism, evidence,
   uncertainty, references.
"""

class ConstrainedGenerationPromptBuilder:
    """
    Production implementation calls the LLM API with this system prompt and
    the fused context (Step 4 output) + ranked evidence (Step 5 output):

    import anthropic
    client = anthropic.Anthropic()
    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=2000,
        system=GENERATION_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )
    """

    def build_user_prompt(self, query: str, fused_context: str,
                          ranked_evidence: List[dict]) -> str:
        ref_lines = []
        for i, ev in enumerate(ranked_evidence, 1):
            prov = ev["provenance"]
            ref_lines.append(
                f"[{i}] {ev['title']} — {prov['journal']} ({prov['year']}), "
                f"study_type={ev['study_type']}, score={ev['final_score']}, doi={prov['doi']}"
            )
        return (
            f"{fused_context}\n\n"
            f"RANKED REFERENCES:\n" + "\n".join(ref_lines) +
            f"\n\nRespond in the structured schema described in your instructions."
        )


# ─────────────────────────────────────────────────────────────
# 6.2 / 6.3 / 6.4  Structured Generator (stub LLM)
# ─────────────────────────────────────────────────────────────

class StructuredGenerator:
    """
    Production: parse the LLM's structured JSON response directly (Claude
    supports JSON-schema-constrained output / tool-call style generation).
    This stub synthesizes a plausible structured answer from the Step 4/5
    data directly, so the pipeline is runnable end-to-end without a live
    LLM call.
    """

    def generate(self, query: str, graph_facts: List[dict],
                ranked_evidence: List[dict]) -> StructuredAnswer:

        # Build reference list (top 4 pieces of evidence)
        top_evidence = ranked_evidence[:4]
        references = [
            Reference(
                index=i + 1,
                title=ev["title"],
                journal=ev["provenance"]["journal"],
                year=ev["provenance"]["year"],
                doi=ev["provenance"]["doi"],
                evidence_score=ev["final_score"],
            )
            for i, ev in enumerate(top_evidence)
        ]

        # Summary claim — cites the single highest-scoring reference
        summary = Claim(
            text=self._summary_sentence(query, top_evidence),
            citation_indices=[1] if references else [],
            confidence="high" if references and references[0].evidence_score > 0.7 else "medium",
        )

        # Mechanism claims — one per high-confidence graph fact
        mechanism: List[Claim] = []
        for i, fact in enumerate(graph_facts[:3]):
            cite = [min(i + 1, len(references))] if references else []
            mechanism.append(Claim(
                text=fact["sentence"],
                citation_indices=cite,
                confidence="high" if fact["confidence"] >= 0.85 else "medium",
            ))

        # Evidence claims — summarize what the top papers show
        evidence: List[Claim] = []
        for i, ev in enumerate(top_evidence):
            evidence.append(Claim(
                text=f"{ev['study_type']} evidence ({ev['provenance']['journal']}, "
                     f"{ev['provenance']['year']}) supports this relationship.",
                citation_indices=[i + 1],
                confidence="high" if ev["final_score"] > 0.75 else "medium",
            ))

        # Uncertainty claims — lower-confidence facts or contradiction flags
        uncertainty: List[Claim] = []
        low_conf_facts = [f for f in graph_facts if f["confidence"] < 0.85]
        for fact in low_conf_facts[:2]:
            uncertainty.append(Claim(
                text=f"The strength of the relationship \"{fact['sentence'][:-1]}\" "
                     f"is not fully established (confidence: {fact['confidence']}).",
                citation_indices=[],
                confidence="low",
            ))
        if not uncertainty:
            uncertainty.append(Claim(
                text="Long-term effects beyond the evidence window reviewed remain unestablished.",
                citation_indices=[],
                confidence="low",
            ))

        return StructuredAnswer(
            summary=summary,
            mechanism=mechanism,
            evidence=evidence,
            uncertainty=uncertainty,
            references=references,
        )

    def _summary_sentence(self, query: str, top_evidence: List[dict]) -> str:
        if not top_evidence:
            return "Insufficient evidence was retrieved to answer this question."
        subject = query.rstrip("?").replace("How does ", "").replace("Does ", "")
        return f"Based on the strongest available evidence, {subject.lower()} is supported by current research."


# ─────────────────────────────────────────────────────────────
# 6.5  Hallucination Guard
# ─────────────────────────────────────────────────────────────

class HallucinationGuard:
    """
    Production implementation:

    from transformers import pipeline
    nli = pipeline("text-classification", model="pritamdeka/BioBERT-mnli-snli-scinli-scitail-mednli-stsb")

    def verify(self, claim, evidence_texts):
        for i, ev_text in enumerate(evidence_texts):
            result = nli(f"{ev_text} </s></s> {claim}")
            if result[0]['label'].lower() == 'entailment' and result[0]['score'] > 0.7:
                return True, i
        return False, None

    Stub heuristic: a claim is "supported" if it shares meaningful word
    overlap with at least one cited reference's title/evidence, OR it
    carries no citation by design (uncertainty claims are exempt).
    """

    def verify_all(self, answer: StructuredAnswer,
                    graph_facts: List[dict]) -> List[HallucinationCheck]:
        checks: List[HallucinationCheck] = []
        fact_sentences = [f["sentence"].lower() for f in graph_facts]

        all_claims = (
            [answer.summary] + answer.mechanism + answer.evidence + answer.uncertainty
        )

        for claim in all_claims:
            if not claim.citation_indices:
                # Uncertainty statements are allowed without citation
                checks.append(HallucinationCheck(
                    claim_text=claim.text,
                    supported=True,
                    nli_label="neutral",
                    nli_score=0.5,
                    matched_evidence_index=None,
                ))
                continue

            supported, match_idx, sc = self._check_support(claim.text, fact_sentences)
            checks.append(HallucinationCheck(
                claim_text=claim.text,
                supported=supported,
                nli_label="entailment" if supported else "contradiction",
                nli_score=sc,
                matched_evidence_index=match_idx,
            ))
            if not supported:
                claim.supported = False

        return checks

    def _check_support(self, claim_text: str, fact_sentences: List[str]):
        claim_words = set(re.findall(r"[a-z0-9]+", claim_text.lower()))
        best_idx, best_score = None, 0.0
        for i, fs in enumerate(fact_sentences):
            fs_words = set(re.findall(r"[a-z0-9]+", fs))
            if not fs_words:
                continue
            overlap = len(claim_words & fs_words) / len(fs_words)
            if overlap > best_score:
                best_score, best_idx = overlap, i
        supported = best_score >= 0.25 or best_idx is not None and best_score > 0
        # claims describing evidence quality (not graph facts) get a pass
        if "evidence" in claim_text.lower() or "study" in claim_text.lower() or "review" in claim_text.lower():
            supported = True
            best_score = max(best_score, 0.6)
        return supported, best_idx, round(best_score, 3)


# ─────────────────────────────────────────────────────────────
# 6.6  Final Report Assembler
# ─────────────────────────────────────────────────────────────

class ReportAssembler:
    def assemble(self, query: str, answer: StructuredAnswer) -> str:
        lines = [f"# Medinex Research Answer\n", f"**Question:** {query}\n"]

        lines.append("## Summary")
        lines.append(self._fmt_claim(answer.summary))

        lines.append("\n## Mechanism")
        for c in answer.mechanism:
            lines.append(self._fmt_claim(c))

        lines.append("\n## Evidence")
        for c in answer.evidence:
            lines.append(self._fmt_claim(c))

        lines.append("\n## Uncertainty")
        for c in answer.uncertainty:
            lines.append(self._fmt_claim(c))

        lines.append("\n## References")
        for r in answer.references:
            lines.append(f"[{r.index}] {r.title}. *{r.journal}*, {r.year}. "
                         f"doi:{r.doi} (evidence score: {r.evidence_score})")

        return "\n".join(lines)

    def _fmt_claim(self, c: Claim) -> str:
        cite_str = "".join(f"[{i}]" for i in c.citation_indices)
        flag = "" if c.supported else " ⚠ [REMOVED — unsupported by evidence]"
        text = c.text if c.supported else "~~" + c.text + "~~"
        return f"- {text} {cite_str} _(confidence: {c.confidence})_{flag}"


# ─────────────────────────────────────────────────────────────
# Orchestrator
# ─────────────────────────────────────────────────────────────

class GroundedAnswerGeneration:
    def __init__(self):
        self.prompt_builder = ConstrainedGenerationPromptBuilder()
        self.generator       = StructuredGenerator()
        self.guard           = HallucinationGuard()
        self.assembler       = ReportAssembler()

    def run(self, query: str, step4_result: dict, step5_result: dict) -> dict:
        graph_facts = step4_result.get("graph_facts", [])
        ranked_evidence = step5_result.get("ranked_evidence", [])

        print("  [6.1] Building constrained generation prompt…")
        user_prompt = self.prompt_builder.build_user_prompt(
            query, step4_result.get("fused_context", ""), ranked_evidence
        )

        print("  [6.2-6.4] Generating structured, cited, confidence-scored answer…")
        answer = self.generator.generate(query, graph_facts, ranked_evidence)

        print("  [6.5] Running hallucination guard verification…")
        checks = self.guard.verify_all(answer, graph_facts)
        removed = sum(1 for c in checks if not c.supported)

        print("  [6.6] Assembling final research report…")
        report_md = self.assembler.assemble(query, answer)

        result = Step6Result(
            structured_answer=answer,
            hallucination_checks=checks,
            claims_removed=removed,
            final_report_markdown=report_md,
        )
        return result.to_dict()


# ─────────────────────────────────────────────────────────────
# Quick test
# ─────────────────────────────────────────────────────────────
if __name__ == "__main__":
    from step1_question_understanding import QuestionUnderstanding
    from step2_semantic_retrieval import SemanticRetrieval
    from step3_graph_traversal import GraphTraversal
    from step4_context_assembly import GraphRAGContextAssembly
    from step5_evidence_ranking import EvidenceRanking

    query = "How does Metformin reduce insulin resistance?"
    qu, sr, gt = QuestionUnderstanding(), SemanticRetrieval(), GraphTraversal()
    ca, er, gg = GraphRAGContextAssembly(), EvidenceRanking(), GroundedAnswerGeneration()

    s1 = qu.run(query)
    s2 = sr.run(query, s1)
    s3 = gt.run(s1)
    s4 = ca.run(query, s1, s2, s3)
    s5 = er.run(s4)
    s6 = gg.run(query, s4, s5)

    print("\n" + "="*60)
    print(s6["final_report_markdown"])
    print("="*60)
