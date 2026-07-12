import pytest
from bioquora.kg import (
    BioquoraKnowledgeGraph, Node, Edge, EntityType, Predicate, BioquoraQueryPipeline, Intent, Evidence, EvidenceType,
)
from bioquora.kg.retrieval.query_pipeline import BiomedicalNER, QueryPlan, QueryResult
from bioquora.kg.retrieval.lexical import LexicalIndex
from bioquora.kg.embeddings import EmbeddingModel, VectorIndex
from bioquora.kg.retrieval.hybrid import HybridRanker, evidence_score, recency_score, ScoredResult
from bioquora.kg.retrieval.graph_search import GraphSearchLayer
from bioquora.kg.retrieval.ontology import OntologyExpander




def test_biomedical_ner_and_linking():
    kg = BioquoraKnowledgeGraph(db_path=":memory:")
    node1 = Node(id="BQ:DIS0001", entity_type=EntityType.DISEASE, name="Breast Carcinoma", synonyms=["breast cancer", "mammary carcinoma"])
    node2 = Node(id="BQ:GEN0001", entity_type=EntityType.GENE, name="BRCA1", synonyms=["breast cancer type 1 susceptibility protein"])
    kg.add_node(node1)
    kg.add_node(node2)

    ner = BiomedicalNER(kg)
    linked = ner.extract_and_link("What is the role of BRCA1 in HER2-positive breast cancer?")
    assert len(linked) >= 2
    ids = {e.bioquora_id for e in linked}
    assert "BQ:DIS0001" in ids
    assert "BQ:GEN0001" in ids


def test_lexical_and_vector_indices():
    lex = LexicalIndex()
    texts = {
        "BQ:DIS0001": "breast carcinoma | breast cancer | malignant tumor of mammary gland",
        "BQ:GEN0001": "BRCA1 | tumor suppressor gene involved in DNA repair",
    }
    lex.build(texts)
    hits = lex.search("breast cancer")
    assert len(hits) > 0
    assert hits[0][0] == "BQ:DIS0001"

    embedder = EmbeddingModel()
    embedder.fit(list(texts.values()))
    vecs = embedder.encode(list(texts.values()))
    id_to_vec = {list(texts.keys())[i]: vecs[i] for i in range(len(texts))}
    vidx = VectorIndex()
    vidx.build(id_to_vec)
    qvec = embedder.encode_one("mammary gland tumor")
    vhits = vidx.search(qvec)
    assert len(vhits) > 0
    assert vhits[0][0] == "BQ:DIS0001"


def test_evidence_and_recency_scores():
    kg = BioquoraKnowledgeGraph(db_path=":memory:")
    node1 = Node(id="BQ:DIS0001", entity_type=EntityType.DISEASE, name="Breast Carcinoma", properties={"metadata": {"publication_year": 2024}})
    node2 = Node(id="BQ:DRG0001", entity_type=EntityType.DRUG, name="Olaparib", properties={"metadata": {"publication_year": 1990}})
    kg.add_node(node1)
    kg.add_node(node2)

    ev = Evidence(id="EV1", evidence_type=EvidenceType.CLINICAL_TRIAL, metadata={"evidence_level": "Phase III RCT"})
    edge = Edge(source_id="BQ:DRG0001", target_id="BQ:DIS0001", predicate=Predicate.TREATS, evidence=[ev])
    kg.add_edge(edge)

    assert recency_score(node1) > recency_score(node2)
    escore = evidence_score(node1, kg)
    assert escore >= 0.5


def test_bsre_end_to_end_search():
    kg = BioquoraKnowledgeGraph(db_path=":memory:")
    node1 = Node(id="BQ:DIS0001", entity_type=EntityType.DISEASE, name="Breast Carcinoma", synonyms=["breast cancer"])
    node2 = Node(id="BQ:GEN0001", entity_type=EntityType.GENE, name="BRCA1", description="DNA repair gene")
    node3 = Node(id="BQ:DRG0001", entity_type=EntityType.DRUG, name="Olaparib", description="PARP inhibitor")
    kg.add_node(node1)
    kg.add_node(node2)
    kg.add_node(node3)

    kg.add_edge(Edge(source_id="BQ:GEN0001", target_id="BQ:DIS0001", predicate=Predicate.ASSOCIATED_WITH))
    kg.add_edge(Edge(source_id="BQ:DRG0001", target_id="BQ:DIS0001", predicate=Predicate.TREATS))

    pipeline = BioquoraQueryPipeline(kg)
    pipeline.build_indices()

    plan = pipeline.plan("What drug treats BRCA1 mutated breast cancer?")
    assert plan.intent in (Intent.DRUG_DISCOVERY, Intent.RELATIONSHIP_TRAVERSAL, Intent.MOLECULAR)
    assert len(plan.linked_entities) >= 1

    res = pipeline.search("What drug treats BRCA1 mutated breast cancer?", top_k=3)
    assert len(res.results) > 0
    assert res.explanation != ""
    assert any(r.bioquora_id == "BQ:DRG0001" for r in res.results)


def test_graph_search_layer():
    kg = BioquoraKnowledgeGraph(db_path=":memory:")
    node1 = Node(id="BQ:GEN001", entity_type=EntityType.GENE, name="Gene1")
    node2 = Node(id="BQ:DIS001", entity_type=EntityType.DISEASE, name="Disease1")
    node3 = Node(id="BQ:DRG001", entity_type=EntityType.DRUG, name="Drug1")
    kg.add_node(node1)
    kg.add_node(node2)
    kg.add_node(node3)

    kg.add_edge(Edge(source_id="BQ:GEN001", target_id="BQ:DIS001", predicate=Predicate.ASSOCIATED_WITH))
    kg.add_edge(Edge(source_id="BQ:DIS001", target_id="BQ:DRG001", predicate=Predicate.TREATS))

    layer = GraphSearchLayer(kg)
    hits = layer.neighborhood_search("BQ:GEN001", max_hops=2)
    assert len(hits) == 2
    hit_dict = dict(hits)
    assert hit_dict["BQ:DIS001"] == pytest.approx(0.5)  # 1 hop: 1 / (1 + 1)
    assert hit_dict["BQ:DRG001"] == pytest.approx(1.0 / 3.0)  # 2 hops: 1 / (1 + 2)


def test_ontology_expander():
    expander = OntologyExpander()
    res = expander.expand("heart attack")
    assert res["canonical_label"] == "Myocardial Infarction"
    assert "MONDO:0005068" in res["ontology_ids"].values()
    assert "AMI" in res["synonym_expansion"]

    res_hier = expander.expand("cancer")
    assert "Melanoma" in res_hier["hierarchy_expansion"]


def test_lexical_index_bm25():
    index = LexicalIndex()
    corpus = {
        "BQ:001": "myocardial infarction acute coronary syndrome",
        "BQ:002": "breast carcinoma malignant neoplasm",
        "BQ:003": "lung adenocarcinoma respiratory tumor",
    }
    index.build(corpus)
    hits = index.search("acute myocardial", top_k=2)
    assert len(hits) > 0
    assert hits[0][0] == "BQ:001"
    assert hits[0][1] == 1.0  # Normalized top score




