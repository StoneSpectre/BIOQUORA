import React, { useState, useEffect } from 'react';

export default function BioRetrieverWorkspace() {

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
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-orange-500 tracking-[0.2em] mb-2 uppercase">Step 7 • Knowledge Layer</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-orange-400">📡</span> BioRetriever Hybrid Search
            </h1>
            <p className="text-slate-500 mt-2 font-sans max-w-3xl">
              The Knowledge Nervous System. Dispatch hybrid queries combining Vector, Semantic, Graph, and Citation retrieval to ensure AI claims are evidence-backed.
            </p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 uppercase tracking-widest">Global Indices</div>
             <div className="text-xl font-bold text-orange-400">Synchronized</div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Query Console */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-[80px]"></div>
                 
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-orange-500">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                       type="text" 
                       value="Impact of specific BRCA2 mutations on PARP inhibitor efficacy in triple-negative breast cancer"
                       className="w-full bg-[#111] border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-orange-500/50"
                       readOnly
                    />
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-orange-950/10 border border-orange-900/30 rounded-lg">
                       <div className="text-xs text-orange-400 font-bold uppercase mb-1">Intent Classification</div>
                       <div className="text-sm font-sans text-slate-300">Clinical & Molecular Research</div>
                    </div>
                    <div className="p-4 bg-orange-950/10 border border-orange-900/30 rounded-lg">
                       <div className="text-xs text-orange-400 font-bold uppercase mb-1">Query Decomposition</div>
                       <div className="text-sm font-sans text-slate-300">3 Sub-queries (BRCA2 Variants, PARP Inhibitors, TNBC Outcomes)</div>
                    </div>
                 </div>
                 
                 {/* Retrieval Execution */}
                 <div className="space-y-3">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Hybrid Retrieval Dispatch</h3>
                    
                    <div className="flex items-center justify-between p-3 bg-[#111] border border-slate-800 rounded">
                       <div className="flex items-center gap-3">
                          <span className="text-emerald-500">✓</span>
                          <span className="text-sm text-slate-300">Vector Search (Dense Embeddings)</span>
                       </div>
                       <span className="text-xs text-slate-500 font-mono">142 docs retrieved</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#111] border border-slate-800 rounded">
                       <div className="flex items-center gap-3">
                          <span className="text-emerald-500">✓</span>
                          <span className="text-sm text-slate-300">Ontology Retrieval (MeSH / GO)</span>
                       </div>
                       <span className="text-xs text-slate-500 font-mono">Term: D016159 (BRCA2)</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-[#111] border border-slate-800 rounded">
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></div>
                          <span className="text-sm text-slate-300">GraphRAG Search (BioKnowledge)</span>
                       </div>
                       <span className="text-xs text-orange-400 font-mono">Extracting subgraph...</span>
                    </div>
                 </div>
              </div>

           </div>

           {/* Metrics */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Global Index Health</h3>
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Vector Store</span>
                          <span className="text-emerald-400">Online</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded-full"><div className="bg-emerald-500 h-1 rounded-full w-full"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Graph Store</span>
                          <span className="text-emerald-400">Online</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded-full"><div className="bg-emerald-500 h-1 rounded-full w-full"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Citation Matrix</span>
                          <span className="text-orange-400 animate-pulse">Syncing...</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded-full"><div className="bg-orange-500 h-1 rounded-full w-3/4"></div></div>
                    </div>
                 </div>
              </div>

              <div className="bg-orange-950/10 border border-orange-900/30 p-6 rounded-xl text-center">
                 <div className="w-12 h-12 bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                    ⚡
                 </div>
                 <h3 className="text-sm font-bold text-orange-300">Continuous Indexing Active</h3>
                 <p className="text-xs text-slate-400 font-sans mt-2">
                    Ingesting 4,200 new open-access publications from Europe PMC.
                 </p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
