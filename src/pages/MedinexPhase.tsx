import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : "0,0,0";
}

const codeSnippets: Record<number, { tabs: string[]; code: string[] }> = {
  11: {
    tabs: ["ML Inference Engine"],
    code: [
      `from fastapi import APIRouter
from pydantic import BaseModel
import numpy as np

router = APIRouter()

class HealthInput(BaseModel):
    age: float
    blood_pressure: float
    cholesterol: float

@router.post("/predict/cardiovascular")
def predict_cvd(data: HealthInput):
    risk_score = (data.age * 0.1) + (data.blood_pressure * 0.2) + (data.cholesterol * 0.15)
    return {"risk_probability": round(min(risk_score / 100, 1.0), 4)}`
    ]
  },
  21: {
    tabs: ["Pathway Modal UI"],
    code: [
      `import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"

export function PathwayModal({ isOpen, onClose, pathwayId }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-slate-950 text-slate-200">
        <DialogHeader>Clinical Pathway Explorer</DialogHeader>
        <div className="overflow-y-auto max-h-[70vh]">
          {/* Rich interactive pathway visualization */}
        </div>
      </DialogContent>
    </Dialog>
  )
}`
    ]
  },
  6: {
    tabs: ["PubMed E-utilities", "Neo4j Ingestion"],
    code: [
      `from Bio import Entrez
import time

Entrez.email = "research@medinex.ai"

def fetch_pubmed_abstracts(query, max_results=100):
    handle = Entrez.esearch(db="pubmed", term=query, retmax=max_results)
    record = Entrez.read(handle)
    handle.close()
    
    id_list = record["IdList"]
    abstracts = []
    
    for pmid in id_list:
        handle = Entrez.efetch(db="pubmed", id=pmid, retmode="xml")
        records = Entrez.read(handle)
        handle.close()
        try:
            abstract = records['PubmedArticle'][0]['MedlineCitation']['Article']['Abstract']['AbstractText'][0]
            abstracts.append({"pmid": pmid, "text": str(abstract)})
        except KeyError:
            continue
        time.sleep(0.34) # Rate limit
    
    return abstracts`,
      `from neo4j import GraphDatabase

class Neo4jIngestor:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def merge_paper(self, pmid, title, abstract):
        query = """
        MERGE (p:Paper {pmid: $pmid})
        SET p.title = $title, p.abstract = $abstract
        RETURN p
        """
        with self.driver.session() as session:
            session.run(query, pmid=pmid, title=title, abstract=abstract)
`
    ]
  },
  7: {
    tabs: ["Qdrant Semantic Search", "Hybrid Retrieval"],
    code: [
      `from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from sentence_transformers import SentenceTransformer
import uuid

client = QdrantClient(":memory:")
model = SentenceTransformer("microsoft/BiomedNLP-BiomedBERT-base-uncased-abstract")

client.create_collection(
    collection_name="biomedical_papers",
    vectors_config=VectorParams(size=768, distance=Distance.COSINE),
)

def index_paper(text, metadata):
    vector = model.encode([text])[0].tolist()
    client.upsert(
        collection_name="biomedical_papers",
        points=[PointStruct(id=str(uuid.uuid4()), vector=vector, payload=metadata)]
    )`,
      `# Hybrid Search with RRF Fusion
async def retrieve(query: str, top_k=50):
  dense = await qdrant.search(embed(query), top=top_k)
  sparse = bm25_index.search(query, top=top_k)
  return reciprocal_rank_fusion(dense, sparse, k=60)`
    ]
  },
  41: {
    tabs: ["Entity Extraction", "Intent Classification"],
    code: [
      `from transformers import pipeline

ner_pipeline = pipeline("ner", model="d4data/biomedical-ner-all")

text = "Patient presents with severe hypertension and was prescribed Lisinopril."
entities = ner_pipeline(text)

for ent in entities:
    print(f"{ent['word']}: {ent['entity_group']} ({ent['score']:.2f})")`,
      `from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

model_id = "microsoft/BiomedNLP-BiomedBERT-base-uncased-abstract"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForSequenceClassification.from_pretrained(model_id, num_labels=5)

query = "What is the mechanism of action of Aspirin in cardiovascular disease?"
inputs = tokenizer(query, return_tensors="pt")
outputs = model(**inputs)
intent = torch.argmax(outputs.logits).item()
print(f"Detected Intent Class: {intent}")`
    ],
  },
  42: {
    tabs: ["Qdrant Search", "Hybrid BM25+Vector"],
    code: [
      `from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams
from sentence_transformers import SentenceTransformer

client = QdrantClient(":memory:")
model = SentenceTransformer("microsoft/BiomedNLP-BiomedBERT-base-uncased-abstract")

# Searching Qdrant
query = "novel treatments for alzheimer's"
q_vec = model.encode(query).tolist()

hits = client.search(
    collection_name="biomedical_papers",
    query_vector=q_vec,
    limit=5
)
for h in hits:
    print(h.payload["pmid"], h.score)`,
      `# Hybrid Search with RRF Fusion
async def retrieve(query: str, top_k=50):
  dense = await qdrant.search(embed(query), top=top_k)
  sparse = bm25_index.search(query, top=top_k)
  return reciprocal_rank_fusion(dense, sparse, k=60)`
    ],
  },
  43: {
    tabs: ["Cypher Multi-hop", "PyKEEN Alignment"],
    code: [
      `from neo4j import GraphDatabase

driver = GraphDatabase.driver("bolt://localhost:7687", auth=("neo4j","password"))

# Cypher: multi-hop from disease to drug candidates
query = """
MATCH (d:Disease {cui: $cui})
  -[:ASSOCIATED_WITH]->(g:Gene)
  -[:TARGETED_BY]->(drug:Drug)
WHERE drug.fda_approved = true
RETURN d, g, drug
LIMIT 100
"""

with driver.session() as session:
    result = session.run(query, cui="C0002395")
    for record in result:
        print(record["drug"]["name"])`,
      `from pykeen.pipeline import pipeline

# Train TransE model on extracted knowledge graph
result = pipeline(
    dataset='Nations', # Placeholder for custom KG dataset
    model='TransE',
    epochs=50,
)

model = result.model
print("Knowledge Graph Embeddings trained.")`
    ],
  },
  44: {
    tabs: ["RAG Engine Prompt", "Citation Linking"],
    code: [
      `from langchain.prompts import PromptTemplate

PROMPT = PromptTemplate(
    input_variables=["context", "question"],
    template="""You are MEDINEX, a biomedical AI. Use ONLY the
provided context to answer. Do not hallucinate.

Context:
{context}

Question: {question}
Answer:"""
)

print(PROMPT.format(context="Aspirin inhibits COX-1.", question="How does aspirin work?"))`,
      `def link_citations(generated_text, retrieved_chunks):
    # Simplistic citation linking logic
    cited_text = generated_text
    for i, chunk in enumerate(retrieved_chunks):
        if chunk.keyword in generated_text:
            cited_text = cited_text.replace(chunk.keyword, f"{chunk.keyword} [{i+1}]")
    return cited_text`
    ],
  },
};

const stepTasks: Record<number, {id: string, label: string, difficulty: string, est: string}[]> = {
  11: [
    { id: "11-1", label: "Develop Cardiovascular ML Prediction Model", difficulty: "medium", est: "Completed" },
    { id: "11-2", label: "Develop Renal ML Prediction Model", difficulty: "medium", est: "Completed" },
    { id: "11-3", label: "Develop Hepatic ML Prediction Model", difficulty: "medium", est: "Completed" },
    { id: "11-4", label: "Develop Respiratory ML Prediction Model", difficulty: "medium", est: "Completed" },
    { id: "11-5", label: "Develop Immunology ML Prediction Model", difficulty: "medium", est: "Completed" },
    { id: "11-6", label: "Develop Thyroid ML Prediction Model", difficulty: "medium", est: "Completed" }
  ],
  21: [
    { id: "21-1", label: "Build main Biomedical Workspace UI", difficulty: "medium", est: "Completed" },
    { id: "21-2", label: "Implement diagnostic risk progress bars", difficulty: "easy", est: "Completed" },
    { id: "21-3", label: "Create Clinical Pathway Modal", difficulty: "hard", est: "Completed" },
    { id: "21-4", label: "Implement scrollable content areas", difficulty: "easy", est: "Completed" }
  ],
  6: [
    { id: "6-1", label: "Implement fetch_pubmed_batch() async ingestion module", difficulty: "medium", est: "2h" },
    { id: "6-2", label: "Implement build_neo4j_graph() graph writer layer", difficulty: "hard", est: "3h" },
    { id: "6-3", label: "Set up Celery scheduling for daily updates", difficulty: "medium", est: "1h" },
    { id: "6-4", label: "Add Prometheus operational monitoring", difficulty: "easy", est: "1h" }
  ],
  7: [
    { id: "7-1", label: "Set up Qdrant Vector DB for biomedical embeddings", difficulty: "medium", est: "2h" },
    { id: "7-2", label: "Integrate Sentence-Transformers for semantic encoding", difficulty: "medium", est: "2h" },
    { id: "7-3", label: "Implement Hybrid BM25+Dense retrieval strategy", difficulty: "hard", est: "3h" },
    { id: "7-4", label: "Build FastAPI endpoints for search and analytics", difficulty: "easy", est: "1h" }
  ],
  41: [
    { id: "41-1", label: "Implement query parser", difficulty: "medium", est: "2h" },
    { id: "41-2", label: "Train/Integrate PubMedBERT NER", difficulty: "hard", est: "4h" },
    { id: "41-3", label: "Build entity disambiguation map", difficulty: "hard", est: "3h" }
  ],
  42: [
    { id: "42-1", label: "Set up Qdrant Vector DB", difficulty: "easy", est: "2h" },
    { id: "42-2", label: "Implement Hybrid BM25+Dense", difficulty: "medium", est: "3h" },
    { id: "42-3", label: "RRF Fusion algorithm", difficulty: "hard", est: "2h" }
  ],
  43: [
    { id: "43-1", label: "Neo4j Cypher Multi-hop queries", difficulty: "medium", est: "3h" },
    { id: "43-2", label: "Extract Pathway subgraphs", difficulty: "hard", est: "2h" }
  ],
  44: [
    { id: "44-1", label: "Build joint RAG prompt", difficulty: "medium", est: "1h" },
    { id: "44-2", label: "Implement exact citation engine", difficulty: "hard", est: "4h" }
  ]
};

const steps = [
  {
    id: 11,
    phase: 1,
    title: "Predictive ML Engine",
    subtitle: "Implemented",
    color: "#a78bfa",
    icon: "🧬",
    description: "Fully implemented machine learning models for early risk detection across Cardiovascular, Renal, Hepatic, Respiratory, Immunology, and Thyroid domains.",
    resources: [],
    learn: ["FastAPI Backend", "Ensemble Models", "Clinical Logic"],
    deliverable: "ML Prediction API",
    flow: ["Patient Data", "Rules Engine", "ML Model", "Risk Score"],
    codeKey: 11
  },
  {
    id: 21,
    phase: 2,
    title: "Clinical Workspace & Pathway UI",
    subtitle: "Implemented",
    color: "#34d399",
    icon: "💻",
    description: "Built the comprehensive Medinex Workspace interface, including diagnostic progress bars and the deep-dive Clinical Pathway Explorer Modal for clinical decision support.",
    resources: [],
    learn: ["React", "TailwindCSS", "Radix UI", "Responsive Design"],
    deliverable: "Frontend Workspace UI",
    flow: ["Dashboard", "Risk Analysis", "Pathway Modal", "Clinical Guidelines"],
    codeKey: 21
  },
  {
    id: 6,
    phase: 3,
    title: "Production Knowledge Graph",
    subtitle: "In Progress",
    color: "#fbbf24",
    icon: "🕸️",
    description: "Automated PubMed ingestion pipeline, multi-database schema, Celery scheduling, graph versioning, and operational monitoring.",
    resources: [],
    learn: ["Microservices", "Celery", "Neo4j", "Prometheus"],
    deliverable: "Production KG",
    flow: ["PubMed", "Celery", "NLP", "Neo4j"],
    codeKey: 6
  },
  {
    id: 7,
    phase: 3,
    title: "Research Intelligence Layer",
    subtitle: "In Progress",
    color: "#fbbf24",
    icon: "🔍",
    description: "Semantic search, vector embedding, graph integration using Qdrant and fast embeddings to query the ingested literature accurately.",
    resources: [],
    learn: ["Qdrant", "FastAPI", "Redis", "Embeddings"],
    deliverable: "Intelligence API",
    flow: ["Query", "Vector", "Graph", "RAG"],
    codeKey: 7
  },
  {
    id: 41,
    phase: 4,
    title: "Biomedical Question Understanding",
    subtitle: "In Progress",
    color: "#00d4c8",
    icon: "🧠",
    description: "Raw clinical or research questions are far noisier than web search queries. Before anything else, MEDINEX must parse intent, disambiguate entities, and classify question type.",
    resources: [],
    learn: ["Intent classification", "NER with PubMedBERT", "Entity disambiguation", "Multi-hop detection"],
    deliverable: "Parsed Query",
    flow: ["Input", "PubMedBERT", "UMLS/MeSH", "Query Plan"],
    codeKey: 41
  },
  {
    id: 42,
    phase: 4,
    title: "Semantic Vector Search",
    subtitle: "In Progress",
    color: "#00d4c8",
    icon: "🔍",
    description: "Parallel dense retrieval across multi-index Qdrant collections. Hybrid BM25 + dense retrieval with RRF fusion.",
    resources: [],
    learn: ["Dual-encoder setup", "Multi-collection retrieval", "Hybrid BM25 + dense"],
    deliverable: "Top-k Evidence Chunks",
    flow: ["Qdrant", "BioLinkBERT", "BM25", "RRF Fusion"],
    codeKey: 42
  },
  {
    id: 43,
    phase: 4,
    title: "Knowledge Graph Query",
    subtitle: "In Progress",
    color: "#00d4c8",
    icon: "🕸️",
    description: "Vector search returns candidate documents; the knowledge graph returns structural context via Cypher-based traversal.",
    resources: [],
    learn: ["Seed node lookup", "Typed edge traversal", "Pathway subgraph extraction"],
    deliverable: "Biological Subgraph",
    flow: ["Neo4j", "Cypher", "PyKEEN", "KEGG/Reactome"],
    codeKey: 43
  },
  {
    id: 44,
    phase: 4,
    title: "Constrained Generation & Citation",
    subtitle: "In Progress",
    color: "#00d4c8",
    icon: "📝",
    description: "LLM synthesis grounded tightly in the retrieved multi-modal evidence, with strict hallucination constraints and exact sentence-level citations.",
    resources: [],
    learn: ["Joint context formatting", "Chain-of-Verification", "Exact citation generation"],
    deliverable: "Grounded Answer",
    flow: ["Context Assembly", "LLM Generation", "Citation Linking"],
    isFinal: true,
    codeKey: 44
  }
];

export default function MedinexDashboard() {

  const defaultSteps = new Set([11, 21]);

  const defaultTasks = new Set(["11-1", "11-2", "11-3", "11-4", "11-5", "11-6", "21-1", "21-2", "21-3", "21-4"]);

  const [activeStep, setActiveStep]         = useState<number | null>(null);

  const [completedSteps, setCompletedSteps] = useState(defaultSteps);

  const [completedTasks, setCompletedTasks] = useState(defaultTasks);

  const [activeTab, setActiveTabState]      = useState("tasks"); // "tasks" | "code"

  const [activePhaseTab, setActivePhaseTab] = useState(4); // Default to Phase 2 where our current work is



  const toggleComplete = (id, e) => {

    e.stopPropagation();

    setCompletedSteps(prev => {

      const next = new Set(prev);

      next.has(id) ? next.delete(id) : next.add(id);

      return next;

    });

  };



  const toggleTask = (taskId) => {

    setCompletedTasks(prev => {

      const next = new Set(prev);

      next.has(taskId) ? next.delete(taskId) : next.add(taskId);

      return next;

    });

  };



  // Total tasks progress across steps 7-10

  const allTasks = [11, 21, 6, 7, 41, 42, 43, 44].flatMap(k => stepTasks[k] || []);

  const doneTaskCount = allTasks.filter(t => completedTasks.has(t.id)).length;

  const totalTasks    = allTasks.length;



  const stepProgress  = (completedSteps.size / steps.length) * 100;

  const taskProgress  = totalTasks > 0 ? (doneTaskCount / totalTasks) * 100 : 0;



  return (

    <Layout>

    <div style={{

      minHeight: "100vh",

      background: "#030712",

      color: "#e2e8f0",

      fontFamily: "'DM Mono', 'Fira Code', monospace",

      position: "relative",

      overflow: "hidden",

    }}>



      {/* Animated grid background */}

      <div style={{

        position: "fixed", inset: 0, pointerEvents: "none",

        backgroundImage: `

          linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px),

          linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)

        `,

        backgroundSize: "40px 40px",

        zIndex: 0,

      }} />



      {/* Glowing orbs */}

      <div style={{ position: "fixed", top: "-200px", left: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "fixed", bottom: "-200px", right: "-200px", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,78,205,0.06) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />



      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>



        {/* Header */}

        <div style={{ textAlign: "center", marginBottom: "60px" }}>

          <div style={{ fontSize: "11px", letterSpacing: "6px", color: activePhaseTab === 0 ? "#00d4ff" : activePhaseTab === 1 ? "#a78bfa" : activePhaseTab === 2 ? "#34d399" : "#fbbf24", textTransform: "uppercase", marginBottom: "16px", opacity: 0.8 }}>

            {activePhaseTab === 0 ? "BIOMEDICAL INTELLIGENCE" : activePhaseTab === 1 ? "PHASE 1 ┬╖ MULTI-OMICS & GENOMICS" : activePhaseTab === 2 ? "PHASE 2 ┬╖ BIOMEDICAL WORKSPACE & COLLABORATION" : "PHASE 3 ┬╖ REGULATORY & DEPLOYMENT"}

          </div>

          <h1 style={{

            fontSize: "clamp(36px, 6vw, 72px)",

            fontFamily: "'Space Grotesk', 'DM Mono', sans-serif",

            fontWeight: 800,

            letterSpacing: "-2px",

            margin: 0,

            background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 40%, #ff4ecd 100%)",

            WebkitBackgroundClip: "text",

            WebkitTextFillColor: "transparent",

            backgroundClip: "text",

            lineHeight: 1.1,

          }}>

            MEDINEX

          </h1>

          <p style={{ color: "#64748b", fontSize: "15px", marginTop: "12px", letterSpacing: "1px" }}>

            Build the first true Biomedical Intelligence Layer

          </p>



          {/* Progress bars */}

          <div style={{ marginTop: "32px", maxWidth: "500px", margin: "32px auto 0", display: "flex", flexDirection: "column", gap: "12px" }}>

            <div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "11px", color: "#475569" }}>

                <span>STEPS COMPLETED</span>

                <span style={{ color: "#00d4ff" }}>{completedSteps.size}/{steps.length}</span>

              </div>

              <div style={{ height: "4px", background: "#0f172a", borderRadius: "2px", overflow: "hidden" }}>

                <div style={{ height: "100%", width: `${stepProgress}%`, background: "linear-gradient(90deg, #00d4ff, #ff4ecd)", borderRadius: "2px", transition: "width 0.5s ease" }} />

              </div>

            </div>

            <div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "11px", color: "#475569" }}>

                <span>IMPLEMENTATION TASKS (Steps 7ΓÇô10)</span>

                <span style={{ color: "#f97316" }}>{doneTaskCount}/{totalTasks}</span>

              </div>

              <div style={{ height: "4px", background: "#0f172a", borderRadius: "2px", overflow: "hidden" }}>

                <div style={{ height: "100%", width: `${taskProgress}%`, background: "linear-gradient(90deg, #f97316, #ff4ecd)", borderRadius: "2px", transition: "width 0.5s ease" }} />

              </div>

            </div>

          </div>

        </div>



        {/* Architecture flow */}

        <div style={{

          background: "rgba(15,23,42,0.8)",

          border: "1px solid rgba(0,212,255,0.15)",

          borderRadius: "16px",

          padding: "24px",

          marginBottom: "48px",

          backdropFilter: "blur(10px)",

        }}>

          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#475569", marginBottom: "20px" }}>SYSTEM ARCHITECTURE</div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>

            {["PubMed", "PMC", "PhysioNet", "MIMIC-IV", "NCBI APIs", "scispaCy", "BioBERT", "PubMedBERT", "Neo4j", "NetworkX", "FAISS", "Qdrant", "LlamaIndex", "LangChain", "GraphRAG"].map((item, i, arr) => (

              <div key={item} style={{ display: "flex", alignItems: "center", gap: "8px" }}>

                <div style={{

                  padding: "6px 12px",

                  background: "rgba(0,212,255,0.06)",

                  border: "1px solid rgba(0,212,255,0.2)",

                  borderRadius: "6px",

                  fontSize: "12px",

                  color: "#94a3b8",

                  whiteSpace: "nowrap",

                }}>

                  {item}

                </div>

                {i < arr.length - 1 && <span style={{ color: "#1e3a4a", fontSize: "16px" }}>ΓåÆ</span>}

              </div>

            ))}

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>

              <span style={{ color: "#1e3a4a", fontSize: "16px" }}>ΓåÆ</span>

              <div style={{

                padding: "6px 14px",

                background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(255,78,205,0.15))",

                border: "1px solid rgba(255,78,205,0.4)",

                borderRadius: "6px",

                fontSize: "12px",

                color: "#ff4ecd",

                fontWeight: 700,

                letterSpacing: "1px",

              }}>

                MEDINEX

              </div>

            </div>

          </div>

        </div>



        {/* Steps grid */}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px", marginBottom: "48px" }}>

          {steps.filter(s => (s.phase || 0) === activePhaseTab).map((s, idx) => {

            const i = steps.findIndex(st => st.id === s.id);

            const isComplete  = completedSteps.has(s.id);

            const isActive    = activeStep === i;

            const hasTasks    = !!stepTasks[s.id];

            const tasksDone   = hasTasks ? (stepTasks[s.id] || []).filter(t => completedTasks.has(t.id)).length : 0;

            const tasksTotal  = hasTasks ? (stepTasks[s.id] || []).length : 0;

            const tasksPct    = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0;



            return (

              <div

                key={s.id}

                onClick={() => setActiveStep(isActive ? null : i)}

                style={{

                  background: isActive

                    ? `linear-gradient(135deg, rgba(${hexToRgb(s.color)},0.12), rgba(${hexToRgb(s.color)},0.04))`

                    : "rgba(15,23,42,0.7)",

                  border: `1px solid ${isActive ? s.color + "60" : "rgba(255,255,255,0.06)"}`,

                  borderRadius: "16px",

                  padding: "24px",

                  cursor: "pointer",

                  transition: "all 0.2s ease",

                  backdropFilter: "blur(10px)",

                  position: "relative",

                  overflow: "hidden",

                  gridColumn: s.isFinal ? "1 / -1" : undefined,

                }}

              >

                {/* Completion top-bar */}

                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: isComplete ? s.color : "transparent", transition: "background 0.3s" }} />



                {/* Task progress bar (steps 7-10) */}

                {hasTasks && tasksDone > 0 && (

                  <div style={{ position: "absolute", top: "2px", left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.04)" }}>

                    <div style={{ height: "100%", width: `${tasksPct}%`, background: s.color + "80", transition: "width 0.4s" }} />

                  </div>

                )}



                {/* Card header */}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                    <div style={{

                      width: "36px", height: "36px", borderRadius: "10px",

                      background: `rgba(${hexToRgb(s.color)},0.15)`,

                      border: `1px solid ${s.color}40`,

                      display: "flex", alignItems: "center", justifyContent: "center",

                      fontSize: "18px",

                    }}>

                      {s.icon}

                    </div>

                    <div>

                      <div style={{ fontSize: "10px", color: s.color, letterSpacing: "3px", textTransform: "uppercase", marginBottom: "2px" }}>

                        STEP {s.id}

                      </div>

                      <div style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", lineHeight: 1.2 }}>{s.title}</div>

                    </div>

                  </div>

                  <button

                    onClick={(e) => toggleComplete(s.id, e)}

                    style={{

                      width: "28px", height: "28px", borderRadius: "8px",

                      background: isComplete ? s.color : "rgba(255,255,255,0.05)",

                      border: `1px solid ${isComplete ? s.color : "rgba(255,255,255,0.1)"}`,

                      color: isComplete ? "#000" : "#475569",

                      fontSize: "14px", cursor: "pointer",

                      display: "flex", alignItems: "center", justifyContent: "center",

                      transition: "all 0.2s",

                      flexShrink: 0,

                    }}

                  >

                    Γ£ô

                  </button>

                </div>



                <div style={{ fontSize: "11px", color: "#64748b", marginBottom: "16px", lineHeight: 1.5 }}>

                  {s.subtitle}

                </div>



                <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "16px", lineHeight: 1.6, margin: "0 0 16px 0" }}>

                  {s.description}

                </p>



                {/* Task mini-summary for steps 7-10 (collapsed) */}

                {hasTasks && !isActive && (

                  <div style={{

                    display: "flex", alignItems: "center", gap: "8px",

                    padding: "8px 12px",

                    background: `rgba(${hexToRgb(s.color)},0.05)`,

                    border: `1px solid ${s.color}20`,

                    borderRadius: "8px",

                    marginBottom: "12px",

                  }}>

                    <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>

                      <div style={{ height: "100%", width: `${tasksPct}%`, background: s.color, borderRadius: "2px", transition: "width 0.4s" }} />

                    </div>

                    <span style={{ fontSize: "10px", color: tasksDone === tasksTotal && tasksTotal > 0 ? s.color : "#475569", whiteSpace: "nowrap" }}>

                      {tasksDone}/{tasksTotal} tasks

                    </span>

                  </div>

                )}



                {/* Resources */}

                {s.resources.length > 0 && (

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>

                    {s.resources.map(r => {

                      const badge = badgeStyle[r.type] || badgeStyle.website;

                      return (

                        <a

                          key={r.name}

                          href={r.url}

                          target="_blank"

                          rel="noopener noreferrer"

                          onClick={e => e.stopPropagation()}

                          style={{

                            display: "flex", alignItems: "center", gap: "4px",

                            padding: "4px 10px",

                            background: badge.bg,

                            border: `1px solid ${badge.color}30`,

                            borderRadius: "6px",

                            fontSize: "11px",

                            color: badge.color,

                            textDecoration: "none",

                            transition: "all 0.15s",

                          }}

                        >

                          <span style={{ fontSize: "9px", opacity: 0.6 }}>{badge.label}</span>

                          <span>{r.name}</span>

                          <span style={{ opacity: 0.4 }}>Γåù</span>

                        </a>

                      );

                    })}

                  </div>

                )}



                {/* Expandable detail */}

                {isActive && (

                  <div style={{ marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "20px", animation: "fadeIn 0.2s ease" }}>



                    {/* Graph schema */}

                    {s.graph && (

                      <div style={{ marginBottom: "16px" }}>

                        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px" }}>GRAPH SCHEMA</div>

                        {s.graph.map(g => (

                          <div key={g.rel} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "12px" }}>

                            <span style={{ color: "#e2e8f0", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "4px" }}>{g.from}</span>

                            <span style={{ color: "#475569", fontSize: "10px" }}>ΓöÇΓöÇΓöÇ {g.rel} ΓöÇΓöÇΓöÇΓû╢</span>

                            <span style={{ color: "#e2e8f0", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "4px" }}>{g.to}</span>

                          </div>

                        ))}

                      </div>

                    )}



                    {/* Learn */}

                    <div style={{ marginBottom: "16px" }}>

                      <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px" }}>LEARN</div>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>

                        {s.learn.map(l => (

                          <span key={l} style={{

                            padding: "3px 10px",

                            background: `rgba(${hexToRgb(s.color)},0.08)`,

                            border: `1px solid ${s.color}20`,

                            borderRadius: "4px",

                            fontSize: "11px",

                            color: "#94a3b8",

                          }}>

                            {l}

                          </span>

                        ))}

                      </div>

                    </div>



                    {/* Pipeline flow */}

                    {s.flow && (

                      <div style={{ marginBottom: "16px" }}>

                        <div style={{ fontSize: "10px", letterSpacing: "3px", color: "#475569", marginBottom: "10px" }}>PIPELINE</div>

                        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px" }}>

                          {s.flow.map((f, idx) => (

                            <div key={f} style={{ display: "flex", alignItems: "center", gap: "6px" }}>

                              <span style={{

                                padding: "3px 10px",

                                background: "rgba(255,255,255,0.04)",

                                border: "1px solid rgba(255,255,255,0.08)",

                                borderRadius: "4px",

                                fontSize: "11px",

                                color: "#cbd5e1",

                              }}>{f}</span>

                              {idx < s.flow.length - 1 && <span style={{ color: "#1e3a4a" }}>Γåô</span>}

                            </div>

                          ))}

                        </div>

                      </div>

                    )}



                    {/* Deliverable */}

                    <div style={{

                      padding: "12px 16px",

                      background: `rgba(${hexToRgb(s.color)},0.06)`,

                      border: `1px solid ${s.color}25`,

                      borderRadius: "8px",

                      fontSize: "12px",

                      color: s.color,

                      marginBottom: hasTasks ? "0" : "0",

                    }}>

                      <span style={{ opacity: 0.6, marginRight: "8px", fontSize: "10px", letterSpacing: "2px" }}>DELIVERABLE</span>

                      {s.deliverable}

                    </div>



                    {/* ΓöÇΓöÇ TASKS + CODE PANEL (Steps 7ΓÇô10) ΓöÇΓöÇ */}

                    {hasTasks && (

                      <div>

                        {/* Tab switcher */}

                        <div style={{

                          display: "flex", gap: "0", marginTop: "20px",

                          border: `1px solid ${s.color}20`,

                          borderRadius: "10px 10px 0 0",

                          overflow: "hidden",

                          background: "rgba(15,23,42,0.9)",

                        }}>

                          {["tasks", "code"].map(tab => (

                            <button

                              key={tab}

                              onClick={e => { e.stopPropagation(); setActiveTabState(tab); }}

                              style={{

                                flex: 1, padding: "10px",

                                fontSize: "11px", letterSpacing: "2px",

                                textTransform: "uppercase",

                                cursor: "pointer", border: "none",

                                background: activeTab === tab ? `rgba(${hexToRgb(s.color)},0.12)` : "transparent",

                                color: activeTab === tab ? s.color : "#475569",

                                borderBottom: activeTab === tab ? `2px solid ${s.color}` : "2px solid transparent",

                                transition: "all 0.15s",

                              }}

                            >

                              {tab === "tasks" ? `Γ£ª Tasks (${stepTasks[s.id].length})` : "Γƒ¿/Γƒ⌐ Code"}

                            </button>

                          ))}

                        </div>



                        {activeTab === "tasks" ? (

                          <TaskPanel

                            stepId={s.id}

                            stepColor={s.color}

                            completedTasks={completedTasks}

                            toggleTask={toggleTask}

                          />

                        ) : (

                          <CodePanel codeKey={s.codeKey} stepColor={s.color} />

                        )}

                      </div>

                    )}

                  </div>

                )}



                {!isActive && (

                  <div style={{ marginTop: "12px", fontSize: "10px", color: "#334155", letterSpacing: "1px" }}>

                    {hasTasks ? "CLICK TO EXPAND ┬╖ TASKS + CODE Γåô" : s.codeKey ? "CLICK TO EXPAND ┬╖ CODE INCLUDED Γåô" : "CLICK TO EXPAND Γåô"}

                  </div>

                )}

              </div>

            );

          })}

        </div>



        {/* Phase Roadmap */}

        <div style={{

          background: "rgba(15,23,42,0.8)",

          border: "1px solid rgba(255,78,205,0.15)",

          borderRadius: "16px",

          padding: "32px",

          backdropFilter: "blur(10px)",

          textAlign: "center",

        }}>

          <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#475569", marginBottom: "16px" }}>PHASE ROADMAP</div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", alignItems: "center" }}>

            {[

              { label: "Biomedical Intelligence", sub: "Data Pipeline Layer", color: "#00d4ff", active: true },

              { label: "Phase 1", sub: "Multi-Omics & Genomics", color: "#a78bfa", active: true },

              { label: "Phase 2", sub: "Biomedical Workspace", color: "#34d399", active: true },

              { label: "Phase 3", sub: "Regulatory & Deployment", color: "#fbbf24" },

            ].map((p, i) => (

              <div key={p.label} style={{ display: "flex", alignItems: "center", gap: "12px" }}>

                <div 

                  onClick={() => setActivePhaseTab(i)}

                  style={{

                  padding: "10px 20px",

                  background: p.active || activePhaseTab === i ? `rgba(${hexToRgb(p.color)},0.15)` : "rgba(255,255,255,0.02)",

                  border: `1px solid ${p.active || activePhaseTab === i ? p.color + "50" : "rgba(255,255,255,0.06)"}`,

                  borderRadius: "10px",

                  textAlign: "left",

                  opacity: p.active ? 1 : 0.4,

                  cursor: "pointer",

                  boxShadow: activePhaseTab === i ? `0 0 15px ${p.color}40` : "none",

                  transform: activePhaseTab === i ? "scale(1.05)" : "scale(1)",

                  transition: "all 0.2s ease"

                }}>

                  <div style={{ fontSize: "11px", color: p.color, fontWeight: 700, marginBottom: "2px" }}>{p.label}</div>

                  <div style={{ fontSize: "10px", color: "#64748b" }}>{p.sub}</div>

                </div>

                {i < 3 && <span style={{ color: "#1e3a4a", fontSize: "20px" }}>ΓåÆ</span>}

              </div>

            ))}

          </div>

          <div style={{ marginTop: "24px", fontSize: "11px", color: "#334155", letterSpacing: "1px" }}>

            Phase 1 & 2 are now unlocked. Complete all Phase 2 steps to unlock Phase 3.

          </div>

        </div>



      </div>



      <style>{`

        @keyframes fadeIn {

          from { opacity: 0; transform: translateY(8px); }

          to   { opacity: 1; transform: translateY(0); }

        }

      `}</style>

    </div>

    </Layout>

  );

}

