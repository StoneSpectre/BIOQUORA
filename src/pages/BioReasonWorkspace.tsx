import React, { useState, useEffect } from 'react';

export default function BioReasonWorkspace() {

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
            <div className="text-xs font-bold text-teal-500 tracking-[0.2em] mb-2 uppercase">Step 7 • Cognitive Layer</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-teal-400">🧠</span> Scientific Reasoning Engine
            </h1>
            <p className="text-slate-500 mt-2 font-sans max-w-3xl">
              Coordinate logical, causal, and statistical reasoning pipelines. Watch as BioReason decomposes complex queries into structured, evidence-backed deduction chains.
            </p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 uppercase tracking-widest">Cognitive State</div>
             <div className="text-xl font-bold text-teal-400">Processing Pipeline</div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Active Reasoning Pipeline */}
           <div className="col-span-2 bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]"></div>
              
              <div className="mb-6 pb-4 border-b border-slate-800">
                 <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2">
                    Query <span className="text-teal-500 text-sm">#Q-8819</span>
                 </h2>
                 <p className="text-sm text-slate-300 font-sans mt-2">
                    "Does the inhibition of the Wnt/beta-catenin pathway directly cause apoptosis in colorectal cancer cell lines with APC mutations, or is it mediated by secondary apoptotic signaling?"
                 </p>
              </div>
              
              <div className="space-y-6">
                 
                 {/* Step 1 */}
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">1</div>
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Intent Analysis & Decomposition</h3>
                       <div className="bg-[#111] border border-slate-800 p-3 rounded text-xs font-sans text-slate-400">
                          Identified causal query requiring mechanistic mapping. Decomposed into: (1) Baseline APC mutation effects on Wnt, (2) Direct vs indirect apoptotic triggers upon inhibition, (3) Secondary mediator identification.
                       </div>
                    </div>
                 </div>

                 {/* Step 2 */}
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">2</div>
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Literature & Evidence Retrieval</h3>
                       <div className="bg-[#111] border border-slate-800 p-3 rounded text-xs font-sans text-slate-400">
                          <span className="text-emerald-500">✓ 412 papers scanned.</span> 18 highly relevant mechanistic studies extracted from PubMed and PMC.
                       </div>
                    </div>
                 </div>

                 {/* Step 3 */}
                 <div className="flex gap-4">
                    <div className="w-8 h-8 rounded bg-teal-900/30 border border-teal-500/50 flex items-center justify-center text-xs font-bold text-teal-400 shadow-[0_0_10px_rgba(20,184,166,0.3)]">3</div>
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-teal-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div> Biological Causal Reasoning
                       </h3>
                       <div className="bg-teal-950/10 border border-teal-900/30 p-3 rounded text-sm font-sans text-slate-300">
                          Mapping causal chain. Evidence indicates inhibition of Wnt/beta-catenin primarily downregulates survivin and c-Myc (direct effect). However, terminal apoptosis is frequently mediated by Bax/Bcl-2 ratio alteration (secondary effect).
                       </div>
                    </div>
                 </div>

                 {/* Step 4 */}
                 <div className="flex gap-4 opacity-50">
                    <div className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-700">4</div>
                    <div className="flex-1">
                       <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Uncertainty & Explainability Validation</h3>
                       <div className="bg-[#050505] border border-slate-900 p-3 rounded text-xs font-sans text-slate-600">
                          Pending causal map completion...
                       </div>
                    </div>
                 </div>

              </div>
           </div>

           {/* Core Reasoning Modules */}
           <div className="col-span-1 space-y-4">
              
              <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded-xl">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Active Modules</h3>
                 
                 <div className="space-y-3">
                    <div className="p-3 bg-[#111] rounded border border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="text-lg">🧬</div>
                          <div className="text-sm text-slate-300">BioLogic</div>
                       </div>
                       <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
                    </div>
                    
                    <div className="p-3 bg-[#111] rounded border border-slate-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="text-lg">🔗</div>
                          <div className="text-sm text-slate-300">CausalAI</div>
                       </div>
                       <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping delay-75"></div>
                    </div>
                    
                    <div className="p-3 bg-[#111] rounded border border-slate-800 flex items-center justify-between opacity-50">
                       <div className="flex items-center gap-3">
                          <div className="text-lg">📊</div>
                          <div className="text-sm text-slate-300">StatsReason</div>
                       </div>
                       <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
