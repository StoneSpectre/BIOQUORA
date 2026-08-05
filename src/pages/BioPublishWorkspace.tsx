import React, { useState, useEffect } from 'react';

export default function BioPublishWorkspace() {

  // Auto-wired API Data State
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify backend connectivity
    fetch('http://127.0.0.1:8000/api/health')
      .then(res => res.json())
      .then(data => {
        setLiveData([data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Backend Disconnected:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <span className="text-2xl text-blue-600">📖</span>
          <div>
             <h1 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">BioPublish</h1>
             <p className="text-xs text-slate-500">Living Publication Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded uppercase tracking-wider">Published & Verified</span>
           <div className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer font-medium">Download PDF</div>
           <div className="text-sm text-slate-600 hover:text-blue-600 cursor-pointer font-medium">Cite</div>
           <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow hover:bg-blue-700 transition">Execute in BioStudio</button>
        </div>
      </header>

      <div className="flex-1 flex max-w-7xl mx-auto w-full">
        
        {/* Left: Article Navigation */}
        <div className="w-64 shrink-0 py-8 pr-8 hidden md:block">
           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Contents</h3>
           <nav className="space-y-3 text-sm font-medium text-slate-600">
             <a href="#abstract" className="block text-blue-600">Abstract</a>
             <a href="#intro" className="block hover:text-slate-900">1. Introduction</a>
             <a href="#results" className="block hover:text-slate-900">2. Results</a>
             <div className="pl-4 space-y-2 text-slate-500">
                <a href="#fig1" className="block hover:text-slate-900">2.1 Molecular Dynamics</a>
                <a href="#fig2" className="block hover:text-slate-900">2.2 Binding Affinity (Live)</a>
             </div>
             <a href="#methods" className="block hover:text-slate-900">3. Methods</a>
             <a href="#data" className="block hover:text-slate-900 flex justify-between">4. Data & Code <span className="text-emerald-500">✓</span></a>
             <a href="#refs" className="block hover:text-slate-900">5. References</a>
           </nav>
        </div>

        {/* Center: Manuscript & Interactive Objects */}
        <div className="flex-1 max-w-3xl py-12 px-4">
           
           <div className="mb-8 border-b border-slate-200 pb-8">
             <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4 leading-tight">
               Graph Attention Networks reveal cryptic pockets in KRAS G12D
             </h1>
             <div className="text-lg text-slate-700 mb-6">
                Sarah Jenkins<sup className="text-xs text-blue-600 ml-0.5">1,2</sup>, 
                David Chen<sup className="text-xs text-blue-600 ml-0.5">1</sup>, 
                BioScientistX (AI)<sup className="text-xs text-purple-600 ml-0.5">3</sup>
             </div>
             <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
               <span className="flex items-center gap-1">📅 Published: July 30, 2026</span>
               <span className="flex items-center gap-1">🔗 DOI: 10.1038/s41586-026-0000-1</span>
               <span className="flex items-center gap-1 text-emerald-600">✓ FAIR Validated</span>
             </div>
           </div>

           <div className="prose prose-slate prose-lg max-w-none font-serif text-slate-800">
             <h2 id="abstract" className="font-sans font-bold text-2xl text-slate-900">Abstract</h2>
             <p>
               Mutations in the KRAS oncogene are responsible for nearly 30% of human cancers, yet targeting the G12D variant remains notoriously difficult. Here, we present a novel deep learning framework using Graph Attention Networks (GATs) combined with massively parallel molecular dynamics simulations to identify and target transient cryptic pockets in the switch II region.
             </p>

             <h2 id="results" className="font-sans font-bold text-2xl text-slate-900 mt-12">2. Results</h2>
             <p>
               Our primary model architecture (ProtT5 + GAT) was trained on 4.2 million binding events. The model identified a novel allosteric site that opens transiently for ~200 ns during the GTP-hydrolysis cycle.
             </p>
           </div>

           {/* Interactive Figure / Code Block (The "Living" aspect) */}
           <div className="my-10 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm font-sans">
              <div className="bg-slate-800 text-slate-300 px-4 py-2 text-xs flex justify-between items-center font-mono">
                 <div className="flex gap-4">
                   <span className="text-white">Figure 2. Interactive Binding Predictor</span>
                   <span className="text-slate-500">Python 3.10 / PyTorch</span>
                 </div>
                 <div className="flex gap-2">
                   <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-500 transition">▶ Run Cell</button>
                 </div>
              </div>
              <div className="p-4 bg-[#1e1e1e] font-mono text-[13px] text-slate-300 overflow-x-auto">
<pre><code><span className="text-[#c586c0]">from</span> biopublish.models <span className="text-[#c586c0]">import</span> load_model
<span className="text-[#c586c0]">from</span> biopublish.data <span className="text-[#c586c0]">import</span> fetch_dataset

<span className="text-[#6a9955]"># This block connects live to the published dataset (10.1038/data.1)</span>
dataset = fetch_dataset(<span className="text-[#ce9178]">'kras_g12d_library_v2'</span>)
model = load_model(<span className="text-[#ce9178]">'gat_binding_predictor_final'</span>)

<span className="text-[#6a9955]"># Predict affinity for top candidate (MRTX-001)</span>
prediction = model.predict(dataset[<span className="text-[#ce9178]">'MRTX-001'</span>])
print(<span className="text-[#ce9178]">f"Predicted pIC50: </span><span className="text-[#569cd6]">{"{"}</span>prediction.pIC50<span className="text-[#569cd6]">:.2f{"}"}</span><span className="text-[#ce9178]">"</span>)</code></pre>
              </div>
              <div className="p-4 bg-white border-t border-slate-200">
                 <div className="text-sm font-bold text-slate-800 mb-2">Output:</div>
                 <div className="font-mono text-sm text-slate-600 bg-slate-100 p-3 rounded">Predicted pIC50: 8.42</div>
                 <p className="text-xs text-slate-500 mt-3 italic">
                    Note: This cell executes live against the model weights stored in BioPublish Archive. Readers can modify the SMILES string and re-run to test alternative compounds.
                 </p>
              </div>
           </div>

           <div className="prose prose-slate prose-lg max-w-none font-serif text-slate-800">
             <p>
               As demonstrated in the executable figure above, the model strongly predicts high affinity for the MRTX scaffold when the cryptic pocket is exposed.
             </p>
           </div>

        </div>

        {/* Right: Metrics & Metadata Sidebar */}
        <div className="w-72 shrink-0 py-12 pl-8 hidden lg:block border-l border-slate-100">
           
           <div className="mb-8">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Impact Metrics</h3>
             <div className="space-y-4">
                <div>
                   <div className="text-2xl font-bold text-slate-800">14,203</div>
                   <div className="text-xs text-slate-500">Views (HTML)</div>
                </div>
                <div>
                   <div className="text-2xl font-bold text-slate-800">142</div>
                   <div className="text-xs text-slate-500">Citations (Crossref)</div>
                </div>
                <div>
                   <div className="text-2xl font-bold text-emerald-600">8.4k</div>
                   <div className="text-xs text-slate-500">Dataset Downloads</div>
                </div>
                <div>
                   <div className="text-2xl font-bold text-purple-600">890</div>
                   <div className="text-xs text-slate-500">Workflow Forks (BioStudio)</div>
                </div>
             </div>
           </div>

           <div className="mb-8 bg-blue-50 border border-blue-100 p-4 rounded-xl">
             <h3 className="text-sm font-bold text-blue-900 mb-2">Linked Assets</h3>
             <ul className="space-y-3 text-xs text-blue-800">
                <li className="flex items-center justify-between hover:underline cursor-pointer">
                  <span>📊 Training Dataset</span> <span className="text-blue-500">↗</span>
                </li>
                <li className="flex items-center justify-between hover:underline cursor-pointer">
                  <span>🧠 GAT Model Weights</span> <span className="text-blue-500">↗</span>
                </li>
                <li className="flex items-center justify-between hover:underline cursor-pointer">
                  <span>⚙️ BioLab Workflow</span> <span className="text-blue-500">↗</span>
                </li>
             </ul>
           </div>
           
           <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Peer Review</h3>
              <p className="text-xs text-slate-600 mb-3">This article underwent transparent open peer review.</p>
              <button className="w-full py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-bold rounded shadow-sm hover:bg-slate-50">Read Reviewer Reports</button>
           </div>

        </div>

      </div>
    </div>
  );
}
