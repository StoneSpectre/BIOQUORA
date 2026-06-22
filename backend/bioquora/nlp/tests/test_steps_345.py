import pytest
from bioquora.nlp.pipeline.relation_extraction import RelationExtractor
from bioquora.nlp.pipeline.paper_classification import PaperClassifier
from bioquora.nlp.pipeline.evidence_scoring import EvidenceScorer

def test_paper_classification_rct():
    classifier = PaperClassifier()
    paper = {
        "title": "A randomized controlled trial of drug X",
        "abstract": "We conducted a double blind study in oncology.",
        "mesh_terms": ["Randomized Controlled Trial", "Neoplasms"]
    }
    result = classifier.classify(paper)
    
    assert result["study_type"] == "Randomized Controlled Trial"
    assert result["evidence_tier"] == "I"
    assert result["evidence_weight"] == 1.0
    assert result["domain"] == "oncology"

def test_paper_classification_case_report():
    classifier = PaperClassifier()
    paper = {
        "title": "A rare case of...",
        "abstract": "We present a case report of a patient.",
        "mesh_terms": []
    }
    result = classifier.classify(paper)
    
    assert result["study_type"] == "Case Report"
    assert result["evidence_tier"] == "IV"
    assert result["evidence_weight"] == 0.2

def test_relation_extraction_mock():
    extractor = RelationExtractor(use_mock=True)
    entities = [
        {"id": "D00001", "text": "Aspirin", "type": "Drug"},
        {"id": "D00002", "text": "Headache", "type": "Disease"},
        {"id": "G00001", "text": "BRCA1", "type": "Gene"}
    ]
    text = "Aspirin treats headaches."
    
    relations = extractor.extract_relations(entities, text)
    
    assert len(relations) == 2
    assert relations[0]["source"] == "D00001"
    assert relations[0]["target"] == "D00002"
    assert relations[0]["relation"] == "treats"
    
    assert relations[1]["source"] == "G00001"
    assert relations[1]["target"] == "D00002"
    assert relations[1]["relation"] == "associated_with"

def test_evidence_scoring_formula():
    scorer = EvidenceScorer(neo4j_client=None)
    
    paper_class_rct = {"evidence_weight": 1.0, "evidence_tier": "I"}
    relation = {"confidence": 0.88, "source": "A", "target": "B", "relation": "treats"}
    
    scored_rct = scorer.process_relation(relation.copy(), paper_class_rct, "123", existing_evidence_count=2)
    # Capped at 1.0
    assert scored_rct["composite_confidence"] <= 1.0
    assert scored_rct["composite_confidence"] > 0.9 
    
    # Test Case Report scoring difference
    paper_class_case = {"evidence_weight": 0.2, "evidence_tier": "IV"}
    scored_case = scorer.process_relation(relation.copy(), paper_class_case, "456", existing_evidence_count=0)
    
    # The RCT should score significantly higher than the Case Report
    assert scored_rct["composite_confidence"] > scored_case["composite_confidence"]
    assert scored_case["composite_confidence"] < 0.3
