import React, { useEffect } from 'react';
import './Phase4.css';

const Phase4: React.FC = () => {
  useEffect(() => {
    const steps = document.querySelectorAll('.step');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    steps.forEach((s, i) => {
      (s as HTMLElement).style.transitionDelay = `${i * 0.06}s`;
      obs.observe(s);
    });

    setTimeout(() => {
      steps.forEach(s => {
        const rect = s.getBoundingClientRect();
        if (rect.top < window.innerHeight) s.classList.add('visible');
      });
    }, 100);

    return () => {
      steps.forEach(s => obs.unobserve(s));
    };
  }, []);

  return (
    <div className="phase4-container">
      {/* ═══ HEADER ═══ */}
      <header>
        <div className="phase-badge">Phase 4 · 2028 – 2029</div>
        <h1>GraphRAG &<br />Research Copilot</h1>
        <p className="subtitle">From semantic search to structured biomedical reasoning — building the transparent intelligence layer of BIOQUORA.</p>
        <div className="header-stats">
          <div className="stat">
            <div className="stat-num">10</div>
            <div className="stat-label">Sequential Steps</div>
          </div>
          <div className="stat">
            <div className="stat-num">2</div>
            <div className="stat-label">Core Products</div>
          </div>
          <div className="stat">
            <div className="stat-num">~24mo</div>
            <div className="stat-label">Build Window</div>
          </div>
          <div className="stat">
            <div className="stat-num">∞</div>
            <div className="stat-label">Black-box answers avoided</div>
          </div>
        </div>
      </header>

      {/* ═══ PIPELINE STEPS ═══ */}
      <div className="pipeline-visual">

        {/* STEP 1 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node teal">01</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow teal">Query Layer · Input Processing</div>
            <div className="step-title">Biomedical Question Understanding</div>
            <div className="step-desc">
              Raw clinical or research questions are far noisier than web search queries. Before anything else, BIOQUORA must parse intent, disambiguate entities, and classify question type — a task that determines the entire downstream pipeline shape.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Intent classification</span><span className="sub-body">— mechanistic, epidemiological, diagnostic, therapeutic, or comparative query</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">NER with PubMedBERT</span><span className="sub-body">— extract diseases, genes, drugs, pathways, organisms as typed spans</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Entity disambiguation</span><span className="sub-body">— map surface forms to canonical IDs (UMLS CUI, MeSH, HGNC, ChEMBL)</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Multi-hop detection</span><span className="sub-body">— identify if the question requires chaining across ≥2 biological hops</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag teal">PubMedBERT</span>
              <span className="tag teal">UMLS</span>
              <span className="tag teal">MeSH</span>
              <span className="tag grey">spaCy + scispaCy</span>
              <span className="tag grey">BioNER</span>
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node teal">02</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow teal">Vector Layer · Dense Retrieval</div>
            <div className="step-title">Semantic Vector Search over PubMed Corpus</div>
            <div className="step-desc">
              Parallel dense retrieval across multi-index Qdrant collections. The query embedding is computed with a biomedical-domain encoder and matched against pre-indexed abstracts, full texts, and structured clinical summaries.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Dual-encoder setup</span><span className="sub-body">— separate query tower and document tower fine-tuned on biomedical QA pairs (MedQA, BioASQ)</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Multi-collection retrieval</span><span className="sub-body">— PubMed abstracts (37M+), ClinicalTrials, DrugBank summaries, OMIM gene-disease records</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Hybrid BM25 + dense</span><span className="sub-body">— keyword recall for rare disease names + dense for semantic near-misses; reciprocal rank fusion</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Temporal filtering</span><span className="sub-body">— recency weighting + pre/post date filters to expose emerging vs. established evidence</span></div>
              </div>
            </div>
            <div className="code-block">
<span className="cm"># Hybrid retrieval with RRF fusion</span><br/>
<span className="kw">async def</span> <span className="fn">retrieve</span>(query: str, top_k=50):<br/>
&nbsp;&nbsp;dense = <span className="kw">await</span> qdrant.search(embed(query), top=top_k)<br/>
&nbsp;&nbsp;sparse = bm25_index.search(query, top=top_k)<br/>
&nbsp;&nbsp;<span className="kw">return</span> reciprocal_rank_fusion(dense, sparse, k=60)
            </div>
            <div className="tag-row">
              <span className="tag teal">Qdrant</span>
              <span className="tag teal">BioLinkBERT</span>
              <span className="tag grey">BM25 (Elasticsearch)</span>
              <span className="tag grey">BioASQ</span>
              <span className="tag grey">RRF</span>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node purple">03</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow purple">Graph Layer · Structural Traversal</div>
            <div className="step-title">Knowledge Graph Query & Multi-hop Traversal</div>
            <div className="step-desc">
              Vector search returns candidate documents; the knowledge graph returns structural context. Entities extracted in Step 1 are used as seed nodes for Cypher-based traversal, pulling in first- and second-degree biological relationships.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Seed node lookup</span><span className="sub-body">— map canonical entity IDs to Neo4j nodes; instantiate traversal anchors</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Typed edge traversal</span><span className="sub-body">— follow TREATS, INHIBITS, ACTIVATES, ASSOCIATED_WITH, PART_OF, EXPRESSED_IN up to depth 3</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Pathway subgraph extraction</span><span className="sub-body">— KEGG/Reactome subgraph induced by retrieved entities; used for pathway-level explanation</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Graph embedding alignment</span><span className="sub-body">— PyKEEN TransE/RotatE scores on retrieved triples augment structural relevance ranking</span></div>
              </div>
            </div>
            <div className="code-block">
<span className="cm">// Cypher: multi-hop from disease to drug candidates</span><br/>
<span className="kw">MATCH</span> (d:Disease {'{cui: $cui}'})<br/>
&nbsp;&nbsp;-[:ASSOCIATED_WITH]-&gt;(g:Gene)<br/>
&nbsp;&nbsp;-[:TARGETED_BY]-&gt;(drug:Drug)<br/>
<span className="kw">WHERE</span> drug.fda_approved = <span className="str">true</span><br/>
<span className="kw">RETURN</span> d, g, drug, <span className="fn">relationships</span>(path)<br/>
<span className="kw">LIMIT</span> 100
            </div>
            <div className="tag-row">
              <span className="tag purple">Neo4j</span>
              <span className="tag purple">PyKEEN</span>
              <span className="tag purple">Cypher</span>
              <span className="tag grey">KEGG</span>
              <span className="tag grey">Reactome</span>
              <span className="tag grey">STRING DB</span>
            </div>
          </div>
        </div>

        {/* STEP 4 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node purple">04</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow purple">Graph Layer · Context Fusion</div>
            <div className="step-title">GraphRAG Context Assembly</div>
            <div className="step-desc">
              The core GraphRAG innovation: combining retrieved document chunks with graph-derived structural context into a unified, ranked context window. Neither alone is sufficient — papers provide language; the graph provides structure.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Node-anchored chunking</span><span className="sub-body">— document passages re-ranked by how many canonical entities they share with the graph subgraph</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Triple serialization</span><span className="sub-body">— graph triples rendered as structured natural language ("BRCA1 INHIBITS tumor_suppression_pathway") and prepended to context</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Conflict flagging</span><span className="sub-body">— BiomedNLI checks for document ↔ graph contradictions; conflicting pairs are flagged, not silently merged</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Context compression</span><span className="sub-body">— RECOMP-style selective compression to fit the assembled context within LLM window budget</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag purple">GraphRAG</span>
              <span className="tag purple">BiomedNLI</span>
              <span className="tag purple">RECOMP</span>
              <span className="tag grey">LangChain</span>
              <span className="tag grey">LlamaIndex</span>
            </div>
          </div>
        </div>

        {/* STEP 5 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node teal">05</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow teal">Evidence Layer · Scoring</div>
            <div className="step-title">Evidence Ranking & Provenance Scoring</div>
            <div className="step-desc">
              Not all evidence is equal. A 2024 RCT outweighs a 2009 case report. This step scores, weights, and ranks each piece of evidence before it reaches the answer generator — establishing a defensible epistemic hierarchy.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Evidence level tagging</span><span className="sub-body">— classify each source on EBM pyramid (SR/MA &gt; RCT &gt; cohort &gt; case &gt; expert opinion)</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Citation graph authority</span><span className="sub-body">— PageRank-style score on PubMed citation network; high-authority papers weighted upward</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Recency decay</span><span className="sub-body">— exponential half-life decay (λ=5yr) tempered by field-specific revision rates (genomics decays faster than anatomy)</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Contradiction weight reduction</span><span className="sub-body">— evidence flagged by NLI contradiction detection in Step 4 receives reduced weight pending review</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Provenance chain</span><span className="sub-body">— every ranked item retains DOI, authors, journal, date, sample size for downstream citation</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag teal">EBM Pyramid</span>
              <span className="tag teal">PageRank</span>
              <span className="tag grey">PubMed API</span>
              <span className="tag grey">Semantic Scholar</span>
              <span className="tag grey">CrossRef</span>
            </div>
          </div>
        </div>

        {/* STEP 6 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node amber">06</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow amber">Generation Layer · Grounded LLM</div>
            <div className="step-title">Transparent, Citation-Grounded Answer Generation</div>
            <div className="step-desc">
              The LLM generates the answer strictly from the assembled, ranked context — never from parametric memory alone. Every claim in the output must be traceable to a specific ranked source. This is the core of "transparent reasoning, not black-box answers."
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Constrained generation</span><span className="sub-body">— system prompt forces citation brackets [1][2] inline; no claim without provenance tag</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Structured output format</span><span className="sub-body">— Summary → Mechanism → Evidence → Uncertainty → References; enforced with function calling / JSON schema</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Uncertainty quantification</span><span className="sub-body">— explicit "confidence: low/medium/high" for each claim based on evidence density and consensus</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Hallucination guard</span><span className="sub-body">— post-hoc NLI check of each generated claim against cited source; unfounded claims are suppressed or flagged</span></div>
              </div>
            </div>
            <div className="code-block">
<span className="cm"># Constrained generation prompt structure</span><br/>
SYSTEM: <span className="str">"Answer only from provided context. Tag every <br/>
claim [source_id]. If evidence is absent or conflicting, <br/>
state uncertainty explicitly. Never infer beyond context."</span><br/>
<br/>
OUTPUT_SCHEMA: {'{'}<br/>
&nbsp;&nbsp;summary: str, mechanism: str,<br/>
&nbsp;&nbsp;claims: [{'{text, source_ids, confidence}'}],<br/>
&nbsp;&nbsp;uncertainty_notes: str, references: [...]<br/>
{'}'}
            </div>
            <div className="tag-row">
              <span className="tag amber">Function Calling</span>
              <span className="tag amber">JSON Schema</span>
              <span className="tag amber">BiomedNLI guard</span>
              <span className="tag grey">Claude / GPT-4o</span>
              <span className="tag grey">RAG eval</span>
            </div>
          </div>
        </div>

        {/* STEP 7 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node amber">07</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow amber">Reasoning Layer · Post-processing</div>
            <div className="step-title">Contradiction Detection & Hypothesis Surfacing</div>
            <div className="step-desc">
              BIOQUORA doesn't just synthesize consensus — it surfaces where the literature disagrees and what might explain the conflict. This step turns tensions in retrieved evidence into explicit research leads.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Cross-paper NLI</span><span className="sub-body">— pairwise BiomedNLI on top-20 retrieved passages to map entailment/contradiction/neutral relationships</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Contradiction taxonomy</span><span className="sub-body">— classify conflict type: population heterogeneity, assay difference, recency gap, replication failure</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Hypothesis generation</span><span className="sub-body">— structured prompting over contradiction clusters to generate falsifiable mechanistic hypotheses</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Knowledge gap mapping</span><span className="sub-body">— identify entity pairs in the graph with no supporting literature — explicit open questions</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag amber">BiomedNLI</span>
              <span className="tag amber">NLI pipeline</span>
              <span className="tag grey">Hypothesis ranking</span>
              <span className="tag grey">Gap detection</span>
            </div>
          </div>
        </div>

        {/* STEP 8 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node purple">08</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow purple">Product Layer · Copilot Core</div>
            <div className="step-title">Research Copilot — Conversational Interface</div>
            <div className="step-desc">
              The pipeline above powers the Research Copilot: a multi-turn, biomedically literate assistant that retains session context, supports follow-up questions, and lets researchers explore a topic as if collaborating with a well-read colleague who always cites their sources.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Session context management</span><span className="sub-body">— rolling context window tracks entities, constraints, and user corrections across turns</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Explain diseases</span><span className="sub-body">— etiology, epidemiology, molecular mechanism, clinical presentation — each layer with source tracing</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Explore pathways</span><span className="sub-body">— interactive graph visualization of retrieved subgraphs; node click reveals supporting literature</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Find papers</span><span className="sub-body">— precision literature retrieval with evidence-level annotation; exportable BibTeX / RIS</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot purple"></div>
                <div><span className="sub-label">Trace evidence</span><span className="sub-body">— full provenance chain from claim → citation → methodology → data source; forward citation graph</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag purple">Multi-turn RAG</span>
              <span className="tag purple">Session state</span>
              <span className="tag purple">React + D3</span>
              <span className="tag grey">BibTeX export</span>
              <span className="tag grey">WebSocket</span>
            </div>
          </div>
        </div>

        {/* STEP 9 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node teal">09</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow teal">Evaluation Layer · Quality Assurance</div>
            <div className="step-title">RAG Evaluation & Continuous Accuracy Monitoring</div>
            <div className="step-desc">
              A GraphRAG system without rigorous evaluation is a liability in a clinical context. This step establishes the continuous eval harness that validates retrieval quality, generation faithfulness, and entity accuracy — automatically, before and after every model or index update.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Retrieval metrics</span><span className="sub-body">— Recall@K, MRR, NDCG on BioASQ, MedQA, and held-out BIOQUORA query sets</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Faithfulness scoring</span><span className="sub-body">— RAGAS faithfulness + answer relevance; human annotation for medical factuality on sampled outputs</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Contradiction recall</span><span className="sub-body">— precision/recall of the contradiction detection module on manually labelled conflict pairs</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Entity linking accuracy</span><span className="sub-body">— F1 on NER + normalization against BC5CDR, NCBI Disease, and CRAFT benchmarks</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot teal"></div>
                <div><span className="sub-label">Regression gate</span><span className="sub-body">— CI/CD pipeline blocks deployment if any eval metric drops &gt;2% vs. baseline; Prometheus dashboards for live drift</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag teal">RAGAS</span>
              <span className="tag teal">BioASQ</span>
              <span className="tag teal">MedQA</span>
              <span className="tag grey">Prometheus</span>
              <span className="tag grey">Grafana</span>
              <span className="tag grey">BC5CDR</span>
            </div>
          </div>
        </div>

        {/* STEP 10 */}
        <div className="step">
          <div className="step-spine">
            <div className="step-node amber">10</div>
          </div>
          <div className="step-card">
            <div className="step-eyebrow amber">Delivery Layer · Scale & Access</div>
            <div className="step-title">Production Deployment, Access Control & Collaborative Workspaces</div>
            <div className="step-desc">
              Phase 4 closes by hardening the system for multi-user, institutional deployment — with role-based access, audit logging, collaborative annotation, and API access for external integrations. This is when BIOQUORA becomes a platform, not a pipeline.
            </div>
            <div className="sub-items">
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">RBAC + SSO</span><span className="sub-body">— researcher / clinician / admin roles; OAuth2/SAML for institutional identity providers</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Audit trail</span><span className="sub-body">— immutable per-query log of retrieved sources, ranked scores, generated output; HIPAA-aligned record retention</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Collaborative workspaces</span><span className="sub-body">— shared research sessions with inline annotation, comment threads on cited evidence, version history</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Public API + SDKs</span><span className="sub-body">— REST + GraphQL endpoints for EHR integrations, hospital research portals, and third-party tools</span></div>
              </div>
              <div className="sub-item">
                <div className="sub-dot amber"></div>
                <div><span className="sub-label">Kubernetes autoscaling</span><span className="sub-body">— HPA on query load; separate scaling pools for vector search, graph traversal, and LLM inference</span></div>
              </div>
            </div>
            <div className="tag-row">
              <span className="tag amber">RBAC</span>
              <span className="tag amber">OAuth2 / SAML</span>
              <span className="tag amber">REST + GraphQL</span>
              <span className="tag grey">Kubernetes HPA</span>
              <span className="tag grey">HIPAA</span>
              <span className="tag grey">Audit logs</span>
            </div>
          </div>
        </div>

      </div>{/* /pipeline-visual */}

      {/* ═══ PRODUCTS ═══ */}
      <div className="products-section">
        <div className="products-header">
          <div className="phase-badge">Phase 4 Products</div>
          <h2>What Phase 4 Ships</h2>
        </div>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-icon">🧬</div>
            <div className="product-name">BIOQUORA Research Copilot</div>
            <div className="product-desc">A conversational biomedical research assistant with full GraphRAG reasoning — not an LLM wrapper, but a structured intelligence layer with traceable claims.</div>
            <ul className="capability-list">
              <li>Explain diseases at molecular, cellular, and systemic levels</li>
              <li>Explore and visualize biological pathways interactively</li>
              <li>Find and rank papers by evidence level and recency</li>
              <li>Trace every claim back to its primary literature source</li>
              <li>Surface contradictions and open research questions</li>
            </ul>
          </div>
          <div className="product-card">
            <div className="product-icon">🔬</div>
            <div className="product-name">Evidence Intelligence API</div>
            <div className="product-desc">Programmatic access to the full GraphRAG pipeline — enabling hospitals, EHR vendors, and research institutions to embed BIOQUORA reasoning into their own tools.</div>
            <ul className="capability-list">
              <li>REST + GraphQL query endpoints</li>
              <li>Structured JSON responses with provenance metadata</li>
              <li>FHIR-compatible entity schema</li>
              <li>Webhook callbacks for async deep-search jobs</li>
              <li>Rate-limited per-institution tiers</li>
            </ul>
          </div>
          <div className="product-card">
            <div className="product-icon">🤝</div>
            <div className="product-name">Collaborative Research Workspace</div>
            <div className="product-desc">Shared sessions where research teams co-annotate evidence, debate sources, and build structured literature reviews — with the full GraphRAG engine live in-session.</div>
            <ul className="capability-list">
              <li>Multi-user real-time sessions (WebSocket)</li>
              <li>Inline annotation on retrieved papers</li>
              <li>Version-controlled evidence boards</li>
              <li>Export to PDF, BibTeX, or structured report</li>
              <li>Role-based view / edit / admin permissions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ═══ ADVANTAGE ═══ */}
      <div className="advantage-block">
        <div className="advantage-inner">
          <div className="advantage-eyebrow">Core Differentiator</div>
          <div className="advantage-text">Transparent reasoning.<br /><em>Not black-box answers.</em></div>
          <div className="advantage-sub">Every BIOQUORA response is a structured argument: claim → evidence → source → confidence. Researchers and clinicians can audit, contest, and extend any output. The graph makes the reasoning path visible. The citation chain makes it verifiable. This is the architecture that earns trust in high-stakes biomedical decision-making.</div>
        </div>
      </div>

      {/* ═══ TIMELINE ═══ */}
      <div className="timeline-footer">
        <h3>Phase 4 Delivery Milestones</h3>
        <div className="timeline-row">
          <div className="tl-item">
            <div className="tl-dot" style={{ background: 'var(--teal)' }}></div>
            <div className="tl-q">Q1 2028</div>
            <div className="tl-milestone">NER pipeline + Vector search (Steps 1–2)</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{ background: 'var(--purple)' }}></div>
            <div className="tl-q">Q2 2028</div>
            <div className="tl-milestone">KG traversal + GraphRAG fusion (Steps 3–4)</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{ background: 'var(--teal)' }}></div>
            <div className="tl-q">Q3 2028</div>
            <div className="tl-milestone">Evidence ranking + Grounded LLM (Steps 5–6)</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{ background: 'var(--amber)' }}></div>
            <div className="tl-q">Q4 2028</div>
            <div className="tl-milestone">Contradiction detection + Copilot beta (Steps 7–8)</div>
          </div>
          <div className="tl-item">
            <div className="tl-dot" style={{ background: 'var(--teal)' }}></div>
            <div className="tl-q">Q1–Q2 2029</div>
            <div className="tl-milestone">Eval harness + Production hardening (Steps 9–10)</div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Phase4;
