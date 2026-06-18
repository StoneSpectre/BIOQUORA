import React, { useState } from 'react';
import './Steps67.css';

const Steps67 = () => {
  const [activeStep, setActiveStep] = useState('s6');
  const [activeModule, setActiveModule] = useState('m71');

  return (
    <div className="steps-67-container">
      {/* Wrapper div to contain the styles if needed */}
      <nav className="topbar">
  <div className="topbar-logo">MEDI<span>NEX</span></div>
  <div className="step-tabs">
    <button className={`step-tab ${activeStep === 's6' ? 'active' : ''}`} onClick={() => setActiveStep('s6')}>Step 6 — Production KG Infrastructure</button>
    <button className={`step-tab ${activeStep === 's7' ? 'active' : ''}`} onClick={() => setActiveStep('s7')}>Step 7 — Research Intelligence Layer</button>
    <button className={`step-tab ${activeStep === 'infra' ? 'active' : ''}`} onClick={() => setActiveStep('infra')}>Infrastructure & End State</button>
  </div>
</nav>

{/* ═══════════════════════════════════════════ STEP 6 ═══════════ */}
<div id="s6" className={`step-panel ${activeStep === 's6' ? 'active' : ''}`}>
<div className="container">

  <div className="phase-label">Step 6 of 10</div>
  <div className="phase-title">Production Knowledge Graph Infrastructure</div>
  <div className="phase-desc">Automated PubMed ingestion pipeline, multi-database schema, Celery scheduling, graph versioning, and operational monitoring. This step transforms the prototype KG into a production-grade, self-updating system.</div>

  {/* Metrics */}
  <div className="metrics-row">
    <div className="metric-card">
      <div className="metric-val">2AM</div>
      <div className="metric-label">Daily Ingestion</div>
    </div>
    <div className="metric-card">
      <div className="metric-val" style={{color: "var(--accent3)"}}>7</div>
      <div className="metric-label">Microservices</div>
    </div>
    <div className="metric-card">
      <div className="metric-val" style={{color: "var(--accent2)"}}>3</div>
      <div className="metric-label">Databases</div>
    </div>
    <div className="metric-card">
      <div className="metric-val" style={{color: "var(--warn)"}}>7</div>
      <div className="metric-label">Prometheus Metrics</div>
    </div>
  </div>

  {/* Service Layout */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.1</span>
      <span className="section-title">Service Directory Layout</span>
    </div>
    <div className="grid-2">
      <div className="card">
        <div className="card-title">Microservices</div>
        <div className="code-block"><span className="cm"># services/ root</span>
services/
├── <span className="fn">api-gateway</span>/          <span className="cm"># FastAPI entry point</span>
│   ├── main.py
│   ├── routers/
│   └── middleware/
├── <span className="fn">paper-ingestion</span>/     <span className="cm"># PubMed fetch & dedup</span>
│   ├── pubmed_client.py
│   ├── deduplicator.py
│   └── queue_writer.py
├── <span className="fn">nlp-pipeline</span>/        <span className="cm"># NER + relation extraction</span>
│   ├── ner_service.py
│   ├── re_service.py
│   └── models/
├── <span className="fn">relation-extraction</span>/  <span className="cm"># BioRE models</span>
├── <span className="fn">evidence-engine</span>/     <span className="cm"># Tier scoring</span>
├── <span className="fn">graph-writer</span>/       <span className="cm"># Neo4j write layer</span>
├── <span className="fn">scheduler</span>/          <span className="cm"># Celery Beat</span>
├── <span className="fn">monitoring</span>/         <span className="cm"># Prometheus + Grafana</span>
└── <span className="fn">reporting</span>/          <span className="cm"># Weekly intelligence reports</span></div>
      </div>
      <div className="card">
        <div className="card-title">PubMed Delta Pipeline Flow</div>
        <div className="flow-diagram">
          <div className="flow-node highlight">PubMed E-utilities API</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node">PMID Batch Fetch (efetch)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node green">Duplicate Filter (PostgreSQL lookup)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node orange">Redis Queue (Celery tasks)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node purple">NLP Pipeline (NER + RE)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node highlight">Neo4j Graph Writer</div>
        </div>
      </div>
    </div>
  </div>

  {/* Database Layer */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.2</span>
      <span className="section-title">Database Layer — PostgreSQL Schema</span>
    </div>
    <div className="card" style={{marginBottom: "20px"}}>
      <div className="card-title">papers table</div>
      <table className="schema-table">
        <tr><th>Column</th><th>Type</th><th>Notes</th></tr>
        <tr><td>id</td><td><span className="type-badge type-uuid">UUID</span></td><td>Primary key</td></tr>
        <tr><td>pmid</td><td><span className="type-badge type-text">VARCHAR(32)</span></td><td>Unique — dedup key</td></tr>
        <tr><td>title</td><td><span className="type-badge type-text">TEXT</span></td><td>Full paper title</td></tr>
        <tr><td>abstract</td><td><span className="type-badge type-text">TEXT</span></td><td>NLP input source</td></tr>
        <tr><td>publication_date</td><td><span className="type-badge type-ts">DATE</span></td><td>For trend detection</td></tr>
        <tr><td>mesh_terms</td><td><span className="type-badge type-json">JSONB</span></td><td>MeSH hierarchy tags</td></tr>
        <tr><td>study_type</td><td><span className="type-badge type-text">VARCHAR(50)</span></td><td>RCT / meta / cohort…</td></tr>
        <tr><td>evidence_tier</td><td><span className="type-badge type-int">INTEGER</span></td><td>1–5 (1 = strongest)</td></tr>
        <tr><td>created_at</td><td><span className="type-badge type-ts">TIMESTAMP</span></td><td>Ingestion timestamp</td></tr>
      </table>
    </div>
    <div className="code-block"><span className="cm">-- PostgreSQL: papers table with JSONB for MeSH</span>
<span className="kw">CREATE TABLE</span> papers (
    id               <span className="type">UUID</span>          <span className="kw">PRIMARY KEY DEFAULT</span> gen_random_uuid(),
    pmid             <span className="type">VARCHAR</span>(<span className="num">32</span>)   <span className="kw">UNIQUE NOT NULL</span>,
    title            <span className="type">TEXT</span>,
    abstract         <span className="type">TEXT</span>,
    publication_date <span className="type">DATE</span>,
    mesh_terms       <span className="type">JSONB</span>,
    study_type       <span className="type">VARCHAR</span>(<span className="num">50</span>),
    evidence_tier    <span className="type">INTEGER</span>     <span className="kw">CHECK</span> (evidence_tier <span className="kw">BETWEEN</span> <span className="num">1</span> <span className="kw">AND</span> <span className="num">5</span>),
    created_at       <span className="type">TIMESTAMP</span>   <span className="kw">DEFAULT NOW</span>()
);

<span className="cm">-- Index for fast dedup lookups</span>
<span className="kw">CREATE INDEX</span> idx_papers_pmid         <span className="kw">ON</span> papers (pmid);
<span className="kw">CREATE INDEX</span> idx_papers_study_type   <span className="kw">ON</span> papers (study_type);
<span className="kw">CREATE INDEX</span> idx_papers_evidence_tier <span className="kw">ON</span> papers (evidence_tier);
<span className="kw">CREATE INDEX</span> idx_papers_pub_date      <span className="kw">ON</span> papers (publication_date);</div>
  </div>

  {/* Neo4j Constraints */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.3</span>
      <span className="section-title">Neo4j Graph Schema & Constraints</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm">// Neo4j — Node constraints</span>
<span className="kw">CREATE CONSTRAINT</span> gene_id
  <span className="kw">IF NOT EXISTS FOR</span> (g:Gene)
  <span className="kw">REQUIRE</span> g.id <span className="kw">IS UNIQUE</span>;

<span className="kw">CREATE CONSTRAINT</span> disease_id
  <span className="kw">IF NOT EXISTS FOR</span> (d:Disease)
  <span className="kw">REQUIRE</span> d.id <span className="kw">IS UNIQUE</span>;

<span className="kw">CREATE CONSTRAINT</span> paper_pmid
  <span className="kw">IF NOT EXISTS FOR</span> (p:Paper)
  <span className="kw">REQUIRE</span> p.pmid <span className="kw">IS UNIQUE</span>;

<span className="kw">CREATE CONSTRAINT</span> drug_id
  <span className="kw">IF NOT EXISTS FOR</span> (dr:Drug)
  <span className="kw">REQUIRE</span> dr.id <span className="kw">IS UNIQUE</span>;

<span className="kw">CREATE CONSTRAINT</span> protein_id
  <span className="kw">IF NOT EXISTS FOR</span> (pr:Protein)
  <span className="kw">REQUIRE</span> pr.id <span className="kw">IS UNIQUE</span>;</div>
      </div>
      <div>
        <div className="code-block"><span className="cm">// Core edge types</span>
(:Gene)-[:ASSOCIATED_WITH    {"{"}confidence:FLOAT, pmids:[]{"}"}]-&gt;(:Disease)
(:Gene)-[:EXPRESSED_IN       {"{"}tissue:STRING{"}"}]-&gt;(:Tissue)
(:Drug)-[:TARGETS            {"{"}mechanism:STRING{"}"}]-&gt;(:Protein)
(:Drug)-[:TREATS             {"{"}evidence_tier:INT{"}"}]-&gt;(:Disease)
(:Protein)-[:INTERACTS_WITH  {"{"}score:FLOAT{"}"}]-&gt;(:Protein)
(:Paper)-[:SUPPORTS          {"{"}claim:STRING{"}"}]-&gt;(:Relation)

<span className="cm">// Graph snapshot for versioning</span>
(:GraphSnapshot {"{"}
  version:     <span className="str">"2026-06-18"</span>,
  nodes:        <span className="num">1203844</span>,
  edges:        <span className="num">9923144</span>,
  created_at:  <span className="str">"2026-06-18T02:00:00Z"</span>
{"}"})

<span className="cm">// Rollback: restore from snapshot</span>
<span className="kw">MATCH</span> (s:GraphSnapshot {"{"}version:<span className="str">"2026-06-17"</span>{"}"})
<span className="kw">CALL</span> apoc.graph.load(s.snapshot_path)</div>
      </div>
    </div>
  </div>

  {/* Celery Scheduler */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.4</span>
      <span className="section-title">Celery Beat Scheduler</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm"># scheduler/celery_config.py</span>
<span className="kw">from</span> celery.schedules <span className="kw">import</span> crontab

CELERY_BEAT_SCHEDULE = {"{"}
  <span className="str">"daily_pubmed_ingestion"</span>: {"{"}
    <span className="str">"task"</span>:     <span className="str">"tasks.ingest_pubmed"</span>,
    <span className="str">"schedule"</span>: crontab(hour=<span className="num">2</span>, minute=<span className="num">0</span>),
    <span className="str">"kwargs"</span>: {"{"}
      <span className="str">"look_back_days"</span>: <span className="num">1</span>,
      <span className="str">"batch_size"</span>:     <span className="num">500</span>
    {"}"}
  {"}"},
  <span className="str">"weekly_intelligence_report"</span>: {"{"}
    <span className="str">"task"</span>:     <span className="str">"tasks.generate_report"</span>,
    <span className="str">"schedule"</span>: crontab(day_of_week=<span className="num">0</span>, hour=<span className="num">6</span>)
  {"}"},
  <span className="str">"daily_kg_snapshot"</span>: {"{"}
    <span className="str">"task"</span>:     <span className="str">"tasks.snapshot_graph"</span>,
    <span className="str">"schedule"</span>: crontab(hour=<span className="num">3</span>, minute=<span className="num">30</span>)
  {"}"},
  <span className="str">"hourly_pipeline_health"</span>: {"{"}
    <span className="str">"task"</span>:     <span className="str">"tasks.health_check"</span>,
    <span className="str">"schedule"</span>: crontab(minute=<span className="num">0</span>)
  {"}"}
{"}"}</div>
      </div>
      <div>
        <div className="code-block"><span className="cm"># tasks/ingest_pubmed.py</span>
<span className="kw">from</span> celery <span className="kw">import</span> shared_task
<span className="kw">from</span> services.pubmed_client <span className="kw">import</span> PubMedClient
<span className="kw">from</span> services.deduplicator <span className="kw">import</span> Deduplicator
<span className="kw">from</span> services.nlp_pipeline <span className="kw">import</span> NLPPipeline

@shared_task(bind=<span className="kw">True</span>, max_retries=<span className="num">3</span>)
<span className="kw">def</span> <span className="fn">ingest_pubmed</span>(self, look_back_days=<span className="num">1</span>, batch_size=<span className="num">500</span>):
    client  = PubMedClient()
    dedup   = Deduplicator()
    nlp     = NLPPipeline()

    pmids = client.fetch_recent(days=look_back_days)
    new   = dedup.filter_seen(pmids)

    <span className="kw">for</span> batch <span className="kw">in</span> chunks(new, batch_size):
        papers = client.fetch_abstracts(batch)
        <span className="kw">for</span> p <span className="kw">in</span> papers:
            process_paper.delay(p)      <span className="cm"># async</span>

    metrics.papers_queued.inc(len(new))
    <span className="kw">return</span> {"{"}<span className="str">"queued"</span>: len(new){"}"}</div>
      </div>
    </div>
  </div>

  {/* Monitoring */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.5</span>
      <span className="section-title">Monitoring — Admin APIs & Prometheus</span>
    </div>
    <div className="grid-2">
      <div className="card">
        <div className="card-title">Admin API Endpoints</div>
        <div className="pipeline">
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>📊</div>
            <div><div className="pipe-name">GET /admin/kg-stats</div><div className="pipe-desc">Total nodes, edges, last update time, node type breakdown</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,255,157,0.1)"}}>🔬</div>
            <div><div className="pipe-name">GET /admin/pipeline-health</div><div className="pipe-desc">Service statuses, queue depths, failed job counts</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(123,97,255,0.1)"}}>📥</div>
            <div><div className="pipe-name">GET /admin/ingestion-history</div><div className="pipe-desc">Per-day paper counts, NLP success/failure rates</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(255,107,53,0.1)"}}>🔗</div>
            <div><div className="pipe-name">GET /admin/new-relations</div><div className="pipe-desc">Novel edges added in last 7 days, by relation type</div></div>
          </div>
        </div>
      </div>
      <div>
        <div className="code-block"><span className="cm"># monitoring/metrics.py</span>
<span className="kw">from</span> prometheus_client <span className="kw">import</span> Counter, Gauge, Histogram

papers_processed = Counter(
  <span className="str">"papers_processed_total"</span>,
  <span className="str">"Papers ingested from PubMed"</span>
)
entities_extracted = Counter(
  <span className="str">"entities_extracted_total"</span>,
  <span className="str">"NER entities found"</span>,
  [<span className="str">"entity_type"</span>]          <span className="cm"># Gene/Disease/Drug</span>
)
relations_extracted = Counter(
  <span className="str">"relations_extracted_total"</span>,
  <span className="str">"Relations extracted by RE model"</span>
)
kg_nodes = Gauge(
  <span className="str">"kg_nodes_total"</span>,
  <span className="str">"Current node count in Neo4j"</span>,
  [<span className="str">"node_type"</span>]
)
kg_edges = Gauge(
  <span className="str">"kg_edges_total"</span>,
  <span className="str">"Current edge count in Neo4j"</span>
)
pipeline_latency = Histogram(
  <span className="str">"pipeline_latency_seconds"</span>,
  <span className="str">"E2E paper processing time"</span>,
  buckets=[<span className="num">1</span>,<span className="num">5</span>,<span className="num">15</span>,<span className="num">30</span>,<span className="num">60</span>,<span className="num">120</span>,<span className="num">300</span>]
)
failed_jobs = Counter(
  <span className="str">"failed_jobs_total"</span>,
  <span className="str">"Celery task failures"</span>,
  [<span className="str">"task_name"</span>]
)</div>
      </div>
    </div>
  </div>

  {/* Weekly Report */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">6.6</span>
      <span className="section-title">Weekly Intelligence Report Output</span>
    </div>
    <div className="grid-2">
      <div className="code-block"><span className="cm"># Sample weekly report JSON</span>
{"{"}
  <span className="str">"report_date"</span>:        <span className="str">"2026-06-15"</span>,
  <span className="str">"period"</span>:             <span className="str">"2026-06-08 to 2026-06-14"</span>,
  <span className="str">"papers_ingested"</span>:    <span className="num">1842</span>,
  <span className="str">"new_genes"</span>:          <span className="num">120</span>,
  <span className="str">"new_diseases"</span>:       <span className="num">34</span>,
  <span className="str">"new_drugs"</span>:          <span className="num">22</span>,
  <span className="str">"novel_relations"</span>:    <span className="num">502</span>,
  <span className="str">"high_confidence_edges"</span>: <span className="num">142</span>,
  <span className="str">"contradictions_flagged"</span>: <span className="num">18</span>,
  <span className="str">"top_emerging_genes"</span>: [
    <span className="str">"KRAS"</span>, <span className="str">"BRCA2"</span>, <span className="str">"EGFR"</span>
  ],
  <span className="str">"pipeline_health"</span>: {"{"}
    <span className="str">"success_rate"</span>:  <span className="num">0.9887</span>,
    <span className="str">"avg_latency_s"</span>: <span className="num">14.2</span>,
    <span className="str">"failed_jobs"</span>:   <span className="num">21</span>
  {"}"}
{"}"}</div>
      <div className="card">
        <div className="card-title">Evidence Tier System</div>
        <div className="pipeline">
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,255,157,0.15)"}}>1</div>
            <div><div className="pipe-name">Tier 1 — Meta-Analysis / Systematic Review</div><div className="pipe-desc">Highest confidence. Cochrane, PRISMA-compliant</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,198,255,0.15)"}}>2</div>
            <div><div className="pipe-name">Tier 2 — Randomised Controlled Trial</div><div className="pipe-desc">CONSORT-reported RCTs with p-value and effect size</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(123,97,255,0.15)"}}>3</div>
            <div><div className="pipe-name">Tier 3 — Cohort / Case-Control Study</div><div className="pipe-desc">Observational epidemiology, large n</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(255,107,53,0.15)"}}>4</div>
            <div><div className="pipe-name">Tier 4 — Case Report / Expert Opinion</div><div className="pipe-desc">Anecdotal. Used only when no higher tier available</div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</div>

{/* ═══════════════════════════════════════════ STEP 7 ═══════════ */}
<div id="s7" className={`step-panel ${activeStep === 's7' ? 'active' : ''}`}>
<div className="container">

  <div className="phase-label">Step 7 of 10</div>
  <div className="phase-title">Biomedical Research Intelligence Layer</div>
  <div className="phase-desc">Seven intelligence modules that transform the production KG into an active reasoning system: GraphRAG query engine, contradiction detection, trend forecasting, hypothesis generation, digital paper library, and collaborative research workspaces.</div>

  {/* Module Nav */}
  <div className="module-nav">
    <button className={`module-btn ${activeModule === 'm71' ? 'active' : ''}`} onClick={() => setActiveModule('m71')}>7.1 GraphRAG</button>
    <button className={`module-btn ${activeModule === 'm72' ? 'active' : ''}`} onClick={() => setActiveModule('m72')}>7.2 Research Copilot</button>
    <button className={`module-btn ${activeModule === 'm73' ? 'active' : ''}`} onClick={() => setActiveModule('m73')}>7.3 Contradiction Engine</button>
    <button className={`module-btn ${activeModule === 'm74' ? 'active' : ''}`} onClick={() => setActiveModule('m74')}>7.4 Trend Detection</button>
    <button className={`module-btn ${activeModule === 'm75' ? 'active' : ''}`} onClick={() => setActiveModule('m75')}>7.5 Hypothesis Generation</button>
    <button className={`module-btn ${activeModule === 'm76' ? 'active' : ''}`} onClick={() => setActiveModule('m76')}>7.6 Digital Library</button>
    <button className={`module-btn ${activeModule === 'm77' ? 'active' : ''}`} onClick={() => setActiveModule('m77')}>7.7 Research Workspaces</button>
  </div>

  {/* 7.1 GraphRAG */}
  <div id="m71" className={`module-panel ${activeModule === 'm71' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.1</span>
      <span className="section-title">GraphRAG Engine — Graph + Vector Retrieval</span>
    </div>
    <div className="grid-2" style={{marginBottom: "20px"}}>
      <div className="card">
        <div className="card-title">Component Stack</div>
        <div className="pipeline">
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>🧠</div>
            <div><div className="pipe-name">Neo4j</div><div className="pipe-desc">Graph traversal — subgraph expansion around query entities</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(123,97,255,0.1)"}}>🔷</div>
            <div><div className="pipe-name">Qdrant</div><div className="pipe-desc">768-d dense vector search over paper embeddings</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(0,255,157,0.1)"}}>⚙️</div>
            <div><div className="pipe-name">PubMedBERT Embedding Service</div><div className="pipe-desc">Domain-specific BERT. Abstracts → 768-d vectors</div></div>
          </div>
          <div className="pipe-node">
            <div className="pipe-icon" style={{background: "rgba(255,107,53,0.1)"}}>🤖</div>
            <div><div className="pipe-name">LLM Reasoner (Claude / Llama)</div><div className="pipe-desc">Synthesises graph context + retrieved chunks into answer</div></div>
          </div>
        </div>
      </div>
      <div>
        <div className="card-title" style={{fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--accent2)", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px"}}>Retrieval Flow</div>
        <div className="flow-diagram">
          <div className="flow-node highlight">User Question (NL)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node">NER → Extract query entities</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node green">Neo4j: Subgraph Expansion (k-hop)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node purple">Qdrant: ANN Vector Search</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node">Evidence Ranking (tier + confidence)</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node orange">LLM Synthesis with Citations</div>
          <div className="flow-arrow">↓</div>
          <div className="flow-node highlight">Structured Answer + Evidence</div>
        </div>
      </div>
    </div>
    <div className="code-block"><span className="cm"># services/graphrag/retrieval.py</span>
<span className="kw">class</span> <span className="fn">GraphRAGRetriever</span>:
    <span className="kw">def</span> <span className="fn">retrieve</span>(self, question: <span className="type">str</span>) -&gt; <span className="type">dict</span>:
        <span className="cm"># 1. Extract entities from question</span>
        entities = self.ner.extract(question)         <span className="cm"># e.g. ["TP53", "lung cancer"]</span>

        <span className="cm"># 2. Graph traversal — 2-hop subgraph</span>
        subgraph = self.neo4j.query(<span className="str">"""
            MATCH (e)-[r*1..2]-(neighbor)
            WHERE e.id IN $entity_ids
            RETURN e, r, neighbor
            ORDER BY r.confidence DESC LIMIT 50
        """</span>, entity_ids=[e.id <span className="kw">for</span> e <span className="kw">in</span> entities])

        <span className="cm"># 3. Vector search over paper abstracts</span>
        q_vector = self.embedder.encode(question)
        chunks   = self.qdrant.search(
            collection=<span className="str">"abstracts"</span>,
            query_vector=q_vector,
            limit=<span className="num">20</span>,
            with_payload=<span className="kw">True</span>
        )

        <span className="cm"># 4. Rank by evidence tier + semantic score</span>
        ranked = self.ranker.merge_rank(subgraph, chunks)

        <span className="cm"># 5. Build context and call LLM</span>
        context = self.context_builder.build(ranked[:12])
        answer  = self.llm.reason(question, context)
        <span className="kw">return</span> answer</div>
  </div>

  {/* 7.2 Research Copilot */}
  <div id="m72" className={`module-panel ${activeModule === 'm72' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.2</span>
      <span className="section-title">Research Copilot — Natural Language Interface</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm"># POST /copilot/query</span>

<span className="cm">## Request</span>
{"{"}
  <span className="str">"question"</span>: <span className="str">"How does TP53 affect lung cancer prognosis?"</span>,
  <span className="str">"user_id"</span>:  <span className="str">"usr_abc123"</span>,
  <span className="str">"options"</span>: {"{"}
    <span className="str">"evidence_min_tier"</span>: <span className="num">2</span>,
    <span className="str">"max_citations"</span>:    <span className="num">10</span>,
    <span className="str">"include_graph"</span>:   <span className="kw">true</span>
  {"}"}
{"}"}

<span className="cm">## Response</span>
{"{"}
  <span className="str">"answer"</span>: <span className="str">"TP53 mutations are associated with..."</span>,
  <span className="str">"confidence"</span>: <span className="num">0.92</span>,
  <span className="str">"citations"</span>: [
    {"{"}
      <span className="str">"pmid"</span>:    <span className="str">"38291040"</span>,
      <span className="str">"title"</span>:   <span className="str">"TP53 mutations and survival..."</span>,
      <span className="str">"tier"</span>:    <span className="num">1</span>,
      <span className="str">"snippet"</span>: <span className="str">"...mutant TP53 independently..."</span>
    {"}"}
  ],
  <span className="str">"evidence_summary"</span>: {"{"}
    <span className="str">"tier1_count"</span>: <span className="num">3</span>,
    <span className="str">"tier2_count"</span>: <span className="num">5</span>,
    <span className="str">"conflict"</span>:   <span className="kw">false</span>
  {"}"},
  <span className="str">"graph_context"</span>: {"{"}
    <span className="str">"nodes"</span>:     [<span className="str">"TP53"</span>, <span className="str">"LUNG_CANCER"</span>, <span className="str">"MDM2"</span>],
    <span className="str">"relations"</span>: [<span className="str">"ASSOCIATED_WITH"</span>, <span className="str">"REGULATES"</span>]
  {"}"}
{"}"}</div>
      </div>
      <div className="card">
        <div className="card-title">Copilot Router Logic</div>
        <div className="code-block"><span className="cm"># services/copilot/router.py</span>
<span className="kw">class</span> <span className="fn">CopilotRouter</span>:
    <span className="str">"""
    Routes query to appropriate handler:
    - Factual  → GraphRAG retriever
    - Compare  → multi-entity retrieval
    - Trend    → temporal aggregation
    - Hypothesis → link prediction
    """</span>
    <span className="kw">def</span> <span className="fn">route</span>(self, q: <span className="type">str</span>) -&gt; <span className="type">str</span>:
        intent = self.classifier.predict(q)
        <span className="cm"># intent ∈ {"{"}factual, comparative,</span>
        <span className="cm">#            temporal, hypothesis{"}"}</span>
        <span className="kw">return</span> intent

<span className="cm"># FastAPI endpoint</span>
@app.post(<span className="str">"/copilot/query"</span>)
<span className="kw">async def</span> <span className="fn">copilot_query</span>(req: QueryRequest):
    intent   = router.route(req.question)
    result   = handlers[intent].handle(req)
    <span className="kw">await</span> logger.log(req.user_id, req, result)
    <span className="kw">return</span> result</div>
      </div>
    </div>
  </div>

  {/* 7.3 Contradiction Engine */}
  <div id="m73" className={`module-panel ${activeModule === 'm73' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.3</span>
      <span className="section-title">Contradiction Detection Engine</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm">// Neo4j — Contradiction graph model</span>
(:Claim {"{"}
  id:       <span className="str">"clm_001"</span>,
  text:     <span className="str">"Drug X improves survival in stage 3"</span>,
  pmid:     <span className="str">"38201040"</span>,
  tier:     <span className="num">1</span>,
  polarity: <span className="str">"POSITIVE"</span>
{"}"})

(:Claim {"{"}
  id:       <span className="str">"clm_002"</span>,
  text:     <span className="str">"Drug X shows no survival benefit"</span>,
  pmid:     <span className="str">"38301245"</span>,
  tier:     <span className="num">2</span>,
  polarity: <span className="str">"NEGATIVE"</span>
{"}"})

(:Claim)-[:SUPPORTS]-&gt;(:Relation)
(:Claim)-[:CONTRADICTS]-&gt;(:Claim)

<span className="cm">// Query: find all contradicting claim pairs</span>
<span className="kw">MATCH</span> (c1:Claim)-[:CONTRADICTS]-&gt;(c2:Claim)
<span className="kw">WHERE</span>  c1.pmid &lt;&gt; c2.pmid
<span className="kw">RETURN</span> c1, c2
<span className="kw">ORDER BY</span> c1.tier <span className="kw">ASC</span></div>
      </div>
      <div>
        <div className="code-block"><span className="cm"># services/contradiction/detector.py</span>
<span className="kw">class</span> <span className="fn">ContradictionDetector</span>:
    <span className="kw">def</span> <span className="fn">detect</span>(self, relation_id: <span className="type">str</span>) -&gt; list:
        <span className="cm"># Get all claims about this relation</span>
        claims = self.neo4j.get_claims(relation_id)

        pairs = []
        <span className="kw">for</span> i, a <span className="kw">in</span> enumerate(claims):
          <span className="kw">for</span> b <span className="kw">in</span> claims[i+<span className="num">1</span>:]:
            score = self.nli.predict(a.text, b.text)
            <span className="cm"># NLI: ENTAIL / NEUTRAL / CONTRADICT</span>
            <span className="kw">if</span> score.label == <span className="str">"CONTRADICTION"</span>:
                self.neo4j.create_edge(
                  a.id, b.id, <span className="str">"CONTRADICTS"</span>,
                  {"{"}<span className="str">"nli_score"</span>: score.prob,
                   <span className="str">"tier_gap"</span>: abs(a.tier - b.tier){"}"}
                )
              pairs.append((a, b, score))
        <span className="kw">return</span> pairs

<span className="cm"># NLI model: microsoft/BiomedNLI</span>
<span className="cm"># Contradiction threshold: 0.80</span></div>
      </div>
    </div>
  </div>

  {/* 7.4 Trend Detection */}
  <div id="m74" className={`module-panel ${activeModule === 'm74' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.4</span>
      <span className="section-title">Trend Detection — Temporal Signal Mining</span>
    </div>
    <div className="grid-2">
      <div className="code-block"><span className="cm"># services/trends/aggregator.py</span>
<span className="kw">class</span> <span className="fn">TrendAggregator</span>:
    <span className="kw">def</span> <span className="fn">monthly_signals</span>(self, entity_id: <span className="type">str</span>) -&gt; <span className="type">dict</span>:
        <span className="cm"># 1. Relation frequency over time</span>
        freq = self.pg.query(<span className="str">"""
            SELECT DATE_TRUNC('month', publication_date) AS month,
                   COUNT(*) AS count
            FROM   papers p
            JOIN   paper_relations pr ON pr.paper_id = p.id
            WHERE  pr.entity_id = %s
            GROUP  BY month ORDER BY month
        """</span>, [entity_id])

        <span className="cm"># 2. Entity growth (new node mentions)</span>
        growth = self.neo4j.query(<span className="str">"""
            MATCH (e:Gene {"{"}id:$eid{"}"})&lt;-[:MENTIONS]-(p:Paper)
            RETURN p.month AS month, COUNT(p) AS mentions
            ORDER BY month
        """</span>, eid=entity_id)

        <span className="cm"># 3. Citation velocity (rolling 90 days)</span>
        velocity = self._rolling_velocity(freq, window=<span className="num">90</span>)

        <span className="kw">return</span> {"{"}
          <span className="str">"relation_frequency"</span>: freq,
          <span className="str">"entity_growth"</span>:      growth,
          <span className="str">"citation_velocity"</span>:  velocity,
          <span className="str">"trend_label"</span>:        self._classify(velocity)
        {"}"}</div>
      <div className="card">
        <div className="card-title">Trend Output Labels</div>
        <div style={{marginTop: "8px"}}>
          <div style={{marginBottom: "16px"}}>
            <span className="pill pill-green">🧬 Emerging Biomarker</span>
            <div style={{color: "var(--muted)", fontSize: "12px", marginTop: "6px"}}>Rapid increase in gene–disease associations over 90 days. Velocity &gt; 2σ above baseline.</div>
          </div>
          <div style={{marginBottom: "16px"}}>
            <span className="pill pill-blue">🎯 Emerging Therapeutic Target</span>
            <div style={{color: "var(--muted)", fontSize: "12px", marginTop: "6px"}}>Protein node gains new DRUG_TARGETS edges at accelerating rate.</div>
          </div>
          <div style={{marginBottom: "16px"}}>
            <span className="pill pill-purple">🔬 Emerging Disease Mechanism</span>
            <div style={{color: "var(--muted)", fontSize: "12px", marginTop: "6px"}}>Novel pathway cluster forms around a disease node, supported by Tier 1–2 evidence.</div>
          </div>
          <div>
            <span className="pill pill-orange">⚠️ Contradictory Signal</span>
            <div style={{color: "var(--muted)", fontSize: "12px", marginTop: "6px"}}>Trend line shows positive then negative inflection — conflicting studies emerging.</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* 7.5 Hypothesis Generation */}
  <div id="m75" className={`module-panel ${activeModule === 'm75' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.5</span>
      <span className="section-title">Hypothesis Generation — Graph Embedding Link Prediction</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm"># services/hypothesis/trainer.py</span>
<span className="kw">from</span> pykeen.pipeline <span className="kw">import</span> pipeline
<span className="kw">from</span> pykeen.triples  <span className="kw">import</span> TriplesFactory

<span className="cm"># Export triples from Neo4j</span>
<span className="cm"># Format: (head_id, relation, tail_id)</span>
triples = neo4j.export_triples()

tf = TriplesFactory.from_labeled_triples(triples)
train, test = tf.split()

<span className="cm"># Train TransE (baseline)</span>
result_transe = pipeline(
    training=train, testing=test,
    model=<span className="str">"TransE"</span>,
    training_kwargs={"{"}
<span className="str">"num_epochs"</span>: <span className="num">200</span>{"}"},
)

<span className="cm"># Train RotatE (best for asymmetric)</span>
result_rotate = pipeline(
    training=train, testing=test,
    model=<span className="str">"RotatE"</span>,
    training_kwargs={"{"}
<span className="str">"num_epochs"</span>: <span className="num">200</span>{"}"},
    model_kwargs={"{"}
<span className="str">"embedding_dim"</span>: <span className="num">256</span>{"}"},
)

<span className="cm"># Save best checkpoint</span>
result_rotate.save_to_directory(<span className="str">"models/rotate_v1/"</span>)</div>
      </div>
      <div>
        <div className="code-block"><span className="cm"># services/hypothesis/predictor.py</span>
<span className="kw">class</span> <span className="fn">HypothesisPredictor</span>:
    <span className="kw">def</span> <span className="fn">predict_links</span>(self, head: <span className="type">str</span>,
                          relation: <span className="type">str</span>,
                          top_k: <span className="num">10</span>) -&gt; list:
        <span className="cm">"""
        head     = "BRCA1"
        relation = "ASSOCIATED_WITH"
        Returns top-k candidate tail entities
        with probability scores.
        """</span>
        head_id = self.kg.entity_to_id[head]
        rel_id  = self.kg.relation_to_id[relation]

        scores  = self.model.score_t(
            hr_batch=torch.tensor([[head_id, rel_id]])
        )
        topk    = torch.topk(scores, k=top_k)

        <span className="kw">return</span> [
            {"{"}
<span className="str">"entity"</span>: self.kg.id_to_entity[i.item()],
              <span className="str">"score"</span>:  s.item(),
              <span className="str">"in_graph"</span>: self.kg.edge_exists(head, i.item())
            {"}"}
            <span className="kw">for</span> i, s <span className="kw">in</span> zip(topk.indices[0], topk.values[0])
        ]

<span className="cm"># Example output</span>
<span className="cm"># BRCA1 → ASSOCIATED_WITH → Ovarian Cancer: 0.92</span>
<span className="cm"># BRCA1 → ASSOCIATED_WITH → Breast Cancer:  0.89</span>
<span className="cm"># BRCA1 → ASSOCIATED_WITH → PARP inhibitor: 0.81 (novel!)</span></div>
      </div>
    </div>
    <div style={{marginTop: "16px"}} className="card">
      <div className="card-title">Model Comparison Matrix</div>
      <table className="schema-table">
        <tr><th>Model</th><th>Type</th><th>Strength</th><th>Embedding Dim</th><th>Best For</th></tr>
        <tr><td>Node2Vec</td><td><span className="pill pill-blue">Random Walk</span></td><td>Structural similarity</td><td>128</td><td>Community detection</td></tr>
        <tr><td>GraphSAGE</td><td><span className="pill pill-green">GNN</span></td><td>Inductive, scalable</td><td>256</td><td>New node prediction</td></tr>
        <tr><td>TransE</td><td><span className="pill pill-purple">KGE</span></td><td>Simple, fast baseline</td><td>200</td><td>1-to-1 relations</td></tr>
        <tr><td>RotatE</td><td><span className="pill pill-purple">KGE</span></td><td>Asymmetric relations</td><td>256</td><td>Directional bio-relations</td></tr>
        <tr><td>ComplEx</td><td><span className="pill pill-purple">KGE</span></td><td>Complex vector space</td><td>200</td><td>Anti-symmetric patterns</td></tr>
      </table>
    </div>
  </div>

  {/* 7.6 Digital Library */}
  <div id="m76" className={`module-panel ${activeModule === 'm76' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.6</span>
      <span className="section-title">Biomedical Digital Library — Enriched Paper Store</span>
    </div>
    <div className="grid-2">
      <div className="code-block"><span className="cm"># Every paper, post-ingestion, receives this envelope</span>
{"{"}
<span className="str">"pmid"</span>:         <span className="str">"38291040"</span>,
  <span className="str">"title"</span>:        <span className="str">"TP53 mutations and prognosis..."</span>,
  <span className="str">"summary"</span>:      <span className="str">"AI-generated 3-sentence abstract..."</span>,
  <span className="str">"key_findings"</span>: [
    <span className="str">"TP53 mutation associated with poor OS"</span>,
    <span className="str">"Hazard ratio: 1.82 (95% CI 1.41–2.34)"</span>
  ],
  <span className="str">"entities"</span>: {"{"}
<span className="str">"genes"</span>:     [<span className="str">"TP53"</span>, <span className="str">"MDM2"</span>],
    <span className="str">"diseases"</span>:  [<span className="str">"NSCLC"</span>],
    <span className="str">"drugs"</span>:     [<span className="str">"Cisplatin"</span>],
    <span className="str">"variants"</span>:  [<span className="str">"R175H"</span>]
  {"}"},
  <span className="str">"relations"</span>:    [
    {"{"}
<span className="str">"head"</span>:<span className="str">"TP53"</span>,<span className="str">"rel"</span>:<span className="str">"ASSOC"</span>,<span className="str">"tail"</span>:<span className="str">"NSCLC"</span>,<span className="str">"conf"</span>:<span className="num">0.94</span>{"}"}
  ],
  <span className="str">"study_type"</span>:   <span className="str">"meta-analysis"</span>,
  <span className="str">"evidence_tier"</span>: <span className="num">1</span>,
  <span className="str">"embedding"</span>:    <span className="str">"[stored in Qdrant — 768-d vector]"</span>,
  <span className="str">"contradicts"</span>:  [<span className="str">"pmid:38102933"</span>],
  <span className="str">"cited_by"</span>:     <span className="num">14</span>,
  <span className="str">"open_access"</span>:  <span className="kw">true</span>,
  <span className="str">"pdf_url"</span>:      <span className="str">"https://pmc.ncbi.nlm.nih.gov/..."</span>
{"}"}</div>
      <div>
        <div className="card" style={{marginBottom: "16px"}}>
          <div className="card-title">Search Interface — /library/search</div>
          <div className="code-block" style={{fontSize: "11px"}}><span className="cm"># POST /library/search</span>
{"{"}
<span className="str">"query"</span>:          <span className="str">"KRAS lung"</span>,
  <span className="str">"filters"</span>: {"{"}
<span className="str">"evidence_tier"</span>: [<span className="num">1</span>, <span className="num">2</span>],
    <span className="str">"study_type"</span>:   <span className="str">"RCT"</span>,
    <span className="str">"date_from"</span>:   <span className="str">"2022-01-01"</span>,
    <span className="str">"open_access"</span>: <span className="kw">true</span>
  {"}"},
  <span className="str">"sort"</span>: <span className="str">"relevance"</span>,
  <span className="str">"limit"</span>: <span className="num">20</span>
{"}"}</div>
        </div>
        <div className="card">
          <div className="card-title">Summary Generation</div>
          <div className="code-block" style={{fontSize: "11px"}}><span className="kw">class</span> <span className="fn">PaperSummarizer</span>:
  <span className="kw">def</span> <span className="fn">summarize</span>(self, abstract):
    <span className="kw">return</span> self.llm.generate(
      system=<span className="str">"""You are a biomedical editor.
Produce: 1 objective sentence,
1 method sentence,
1 key finding sentence."""</span>,
      user=abstract
    )</div>
        </div>
      </div>
    </div>
  </div>

  {/* 7.7 Research Workspaces */}
  <div id="m77" className={`module-panel ${activeModule === 'm77' ? 'active' : ''}`}>
    <div className="section-header">
      <span className="section-num">7.7</span>
      <span className="section-title">Research Workspaces — Collaborative Intelligence</span>
    </div>
    <div className="grid-2">
      <div>
        <div className="code-block"><span className="cm">-- PostgreSQL workspace schema</span>

<span className="kw">CREATE TABLE</span> projects (
  id          <span className="type">UUID</span> <span className="kw">PRIMARY KEY</span>,
  user_id     <span className="type">UUID</span> <span className="kw">REFERENCES</span> users(id),
  name        <span className="type">TEXT</span> <span className="kw">NOT NULL</span>,
  description <span className="type">TEXT</span>,
  created_at  <span className="type">TIMESTAMP</span> <span className="kw">DEFAULT NOW</span>()
);

<span className="kw">CREATE TABLE</span> collections (
  id         <span className="type">UUID</span> <span className="kw">PRIMARY KEY</span>,
  project_id <span className="type">UUID</span> <span className="kw">REFERENCES</span> projects(id),
  name       <span className="type">TEXT</span>
);

<span className="kw">CREATE TABLE</span> saved_papers (
  id            <span className="type">UUID</span> <span className="kw">PRIMARY KEY</span>,
  collection_id <span className="type">UUID</span> <span className="kw">REFERENCES</span> collections(id),
  pmid          <span className="type">VARCHAR</span>(<span className="num">32</span>),
  annotation    <span className="type">TEXT</span>,
  tags          <span className="type">JSONB</span>,
  added_at      <span className="type">TIMESTAMP</span> <span className="kw">DEFAULT NOW</span>()
);

<span className="kw">CREATE TABLE</span> graph_views (
  id         <span className="type">UUID</span> <span className="kw">PRIMARY KEY</span>,
  project_id <span className="type">UUID</span> <span className="kw">REFERENCES</span> projects(id),
  name       <span className="type">TEXT</span>,
  cypher     <span className="type">TEXT</span>,        <span className="cm">-- saved Neo4j query</span>
  layout     <span className="type">JSONB</span>,       <span className="cm">-- node positions</span>
  created_at <span className="type">TIMESTAMP</span>
);

<span className="kw">CREATE TABLE</span> notes (
  id         <span className="type">UUID</span> <span className="kw">PRIMARY KEY</span>,
  project_id <span className="type">UUID</span> <span className="kw">REFERENCES</span> projects(id),
  content    <span className="type">TEXT</span>,
  type       <span className="type">VARCHAR</span>(<span className="num">30</span>),  <span className="cm">-- hypothesis / observation</span>
  created_at <span className="type">TIMESTAMP</span>
);</div>
      </div>
      <div>
        <div className="card" style={{marginBottom: "16px"}}>
          <div className="card-title">Workspace Entity Model</div>
          <div className="pipeline">
            <div className="pipe-node">
              <div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>👤</div>
              <div><div className="pipe-name">User</div><div className="pipe-desc">Auth via JWT. Role: researcher / reviewer / admin</div></div>
            </div>
            <div className="pipe-node">
              <div className="pipe-icon" style={{background: "rgba(0,255,157,0.1)"}}>📁</div>
              <div><div className="pipe-name">Project</div><div className="pipe-desc">Root container. Shareable with team members</div></div>
            </div>
            <div className="pipe-node">
              <div className="pipe-icon" style={{background: "rgba(123,97,255,0.1)"}}>📚</div>
              <div><div className="pipe-name">Collection</div><div className="pipe-desc">Curated paper set within a project</div></div>
            </div>
            <div className="pipe-node">
              <div className="pipe-icon" style={{background: "rgba(255,107,53,0.1)"}}>🔗</div>
              <div><div className="pipe-name">Graph View</div><div className="pipe-desc">Saved Cypher queries with visual node layout</div></div>
            </div>
            <div className="pipe-node">
              <div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>💡</div>
              <div><div className="pipe-name">Notes & Annotations</div><div className="pipe-desc">Hypothesis tracking, inline paper commentary</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</div>
</div>

{/* ═══════════════════════════════════════════ INFRA ═══════════ */}
<div id="infra" className={`step-panel ${activeStep === 'infra' ? 'active' : ''}`}>
<div className="container">

  <div className="phase-label">Infrastructure & Deployment</div>
  <div className="phase-title">Docker Compose → Kubernetes</div>
  <div className="phase-desc">Full service deployment configuration for the combined Step 6 + 7 system. Docker Compose for local/staging, Kubernetes for production.</div>

  <div className="section">
    <div className="section-header">
      <span className="section-num">I.1</span>
      <span className="section-title">Docker Compose — Full Stack</span>
    </div>
    <div className="code-block"><span className="cm"># docker-compose.yml</span>
<span className="kw">version</span>: <span className="str">"3.9"</span>

<span className="kw">services</span>:
  <span className="fn">api-gateway</span>:
    build: ./services/api-gateway
    ports: [<span className="str">"8000:8000"</span>]
    env_file: .env
    depends_on: [postgres, redis, neo4j]

  <span className="fn">paper-ingestion</span>:
    build: ./services/paper-ingestion
    depends_on: [postgres, redis]

  <span className="fn">nlp-pipeline</span>:
    build: ./services/nlp-pipeline
    deploy:
      resources:
        reservations:
          devices: [{"{"}driver: nvidia, count: 1, capabilities: [gpu]{"}"}]

  <span className="fn">graph-writer</span>:
    build: ./services/graph-writer
    depends_on: [neo4j, postgres]

  <span className="fn">scheduler</span>:
    build: ./services/scheduler
    depends_on: [redis, postgres]

  <span className="fn">celery-worker</span>:
    build: ./services/scheduler
    command: celery -A tasks worker --concurrency=4
    depends_on: [redis]

  <span className="fn">postgres</span>:
    image: postgres:16
    volumes: [pg_data:/var/lib/postgresql/data]
    environment:
      POSTGRES_DB: medinex
      POSTGRES_USER: medinex
      POSTGRES_PASSWORD: ${PG_PASSWORD}

  <span className="fn">neo4j</span>:
    image: neo4j:5.18-enterprise
    ports: [<span className="str">"7474:7474"</span>, <span className="str">"7687:7687"</span>]
    environment:
      NEO4J_AUTH: neo4j/${NEO4J_PASSWORD}
      NEO4J_PLUGINS: <span className="str">'["apoc","graph-data-science"]'</span>
    volumes: [neo4j_data:/data]

  <span className="fn">redis</span>:
    image: redis:7-alpine

  <span className="fn">qdrant</span>:
    image: qdrant/qdrant:v1.9.1
    ports: [<span className="str">"6333:6333"</span>]
    volumes: [qdrant_data:/qdrant/storage]

  <span className="fn">prometheus</span>:
    image: prom/prometheus
    volumes: [./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml]

  <span className="fn">grafana</span>:
    image: grafana/grafana
    ports: [<span className="str">"3000:3000"</span>]
    depends_on: [prometheus]

  <span className="fn">minio</span>:
    image: minio/minio
    command: server /data
    ports: [<span className="str">"9000:9000"</span>]
    volumes: [minio_data:/data]

<span className="kw">volumes</span>: {pg_data, neo4j_data, qdrant_data, minio_data}</div>
  </div>

  <div className="section">
    <div className="section-header">
      <span className="section-num">I.2</span>
      <span className="section-title">Kubernetes Production Deployments</span>
    </div>
    <div className="grid-2">
      <div className="code-block"><span className="cm"># k8s/api-deployment.yaml</span>
<span className="kw">apiVersion</span>: apps/v1
<span className="kw">kind</span>: Deployment
<span className="kw">metadata</span>:
  name: medinex-api
<span className="kw">spec</span>:
  replicas: <span className="num">3</span>
  selector:
    matchLabels: {"{"}app: medinex-api{"}"}{"}"}
  template:
    metadata:
      labels: {"{"}app: medinex-api{"}"}{"}"}
    spec:
      containers:
      - name: api
        image: medinex/api-gateway:latest
        ports: [{"{"}containerPort: <span className="num">8000</span>{"}"}]
        resources:
          requests: {"{"}cpu: <span className="str">"500m"</span>, memory: <span className="str">"512Mi"</span>{"}"}
          limits:   {"{"}cpu: <span className="str">"2"</span>,     memory: <span className="str">"2Gi"</span>{"}"}
        livenessProbe:
          httpGet: {"{"}path: /health, port: <span className="num">8000</span>{"}"}
          initialDelaySeconds: <span className="num">15</span>

<span className="cm">---</span>
<span className="cm"># k8s/worker-deployment.yaml</span>
<span className="kw">spec</span>:
  replicas: <span className="num">4</span>          <span className="cm"># NLP workers — scale by queue depth</span>
  containers:
  - name: worker
    image: medinex/nlp-worker:latest
    resources:
      limits:
        nvidia.com/gpu: <span className="num">1</span>   <span className="cm"># GPU for NER + RE models</span></div>
      <div>
        <div className="card" style={{marginBottom: "16px"}}>
          <div className="card-title">K8s Services Map</div>
          <div className="pipeline">
            <div className="pipe-node"><div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>🌐</div><div><div className="pipe-name">api-deployment</div><div className="pipe-desc">3 replicas. HPA on CPU &gt; 60%</div></div></div>
            <div className="pipe-node"><div className="pipe-icon" style={{background: "rgba(0,255,157,0.1)"}}>⚙️</div><div><div className="pipe-name">worker-deployment</div><div className="pipe-desc">4 GPU NLP workers. Scale on queue depth</div></div></div>
            <div className="pipe-node"><div className="pipe-icon" style={{background: "rgba(123,97,255,0.1)"}}>⏰</div><div><div className="pipe-name">scheduler-deployment</div><div className="pipe-desc">1 Celery Beat. Single-instance critical</div></div></div>
            <div className="pipe-node"><div className="pipe-icon" style="background:rgba(255,157,0,0.1)">🔷</div><div><div className="pipe-name">qdrant-deployment</div><div className="pipe-desc">StatefulSet. Persistent vector store</div></div></div>
            <div className="pipe-node"><div className="pipe-icon" style={{background: "rgba(255,107,53,0.1)"}}>🗄️</div><div><div className="pipe-name">neo4j-cluster</div><div className="pipe-desc">3-node causal cluster. Leader + 2 followers</div></div></div>
            <div className="pipe-node"><div className="pipe-icon" style={{background: "rgba(0,198,255,0.1)"}}>🐘</div><div><div className="pipe-name">postgres-cluster</div><div className="pipe-desc">Primary + 1 read replica via pgpool</div></div></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* End State */}
  <div className="section">
    <div className="section-header">
      <span className="section-num">I.3</span>
      <span className="section-title">End State After Steps 6 + 7</span>
    </div>
    <div className="end-state">
      <div className="flow-diagram">
        <div className="flow-node highlight">PubMed (35M+ papers)</div>
        <div className="flow-arrow">↓ Daily at 2AM</div>
        <div className="flow-node green">Automated Delta Ingestion (Celery Beat)</div>
        <div className="flow-arrow">↓ Redis queue</div>
        <div className="flow-node">Biomedical NLP — NER + Relation Extraction</div>
        <div className="flow-arrow">↓ Evidence scoring</div>
        <div className="flow-node purple">Knowledge Graph (Neo4j — nodes + edges + snapshots)</div>
        <div className="flow-arrow">↓ GraphRAG retrieval</div>
        <div className="flow-node highlight">Research Copilot — Natural Language Q&A</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-node orange">Contradiction Detection + Trend Signals</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-node purple">Hypothesis Generation (RotatE link prediction)</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-node green">Collaborative Research Workspace</div>
        <div className="flow-arrow">↓</div>
        <div className="flow-node highlight">Weekly Intelligence Reports</div>
      </div>
      <div style={{marginTop: "28px", paddingTop: "20px", borderTop: "1px solid var(--border)"}}>
        <div style={{fontFamily: "JetBrains Mono, monospace", fontSize: "11px", color: "var(--muted)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "1px"}}>Technology Stack</div>
        <div>
          <span className="pill pill-blue">FastAPI</span>
          <span className="pill pill-blue">Neo4j 5</span>
          <span className="pill pill-blue">PostgreSQL 16</span>
          <span className="pill pill-blue">Redis 7</span>
          <span className="pill pill-green">Celery Beat</span>
          <span className="pill pill-green">Qdrant</span>
          <span className="pill pill-green">PubMedBERT</span>
          <span className="pill pill-purple">RotatE / TransE</span>
          <span className="pill pill-purple">GraphSAGE</span>
          <span className="pill pill-orange">Prometheus</span>
          <span className="pill pill-orange">Grafana</span>
          <span className="pill pill-orange">MinIO</span>
          <span className="pill pill-blue">Docker</span>
          <span className="pill pill-blue">Kubernetes</span>
        </div>
        <div style={{marginTop: "20px", color: "var(--muted)", fontSize: "13px", lineHeight: "1.7"}}>
          At this point, MEDINEX has the architecture of a biomedical research intelligence platform comparable in direction to Elsevier, Semantic Scholar, and BenevolentAI — with automated ingestion, evidence-ranked knowledge graph, LLM-powered Q&A, contradiction detection, trend forecasting, link prediction, and collaborative workspaces.
        </div>
      </div>
    </div>
  </div>

</div>
</div>
    </div>
  );
};

export default Steps67;
