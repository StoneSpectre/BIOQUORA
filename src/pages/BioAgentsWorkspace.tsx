import React, { useState, useEffect } from 'react';

export default function BioAgentsWorkspace() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-blue-500 tracking-[0.2em] mb-2 uppercase">Step 7 • Agent Ecosystem</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-blue-400">🤖</span> Mission Planner & Orchestrator
            </h1>
            <p className="text-slate-500 mt-2 font-sans max-w-3xl">
              Break down complex biomedical research goals into orchestrated, multi-agent workflows. 
              Assign specialized agents to specific tasks, manage dependencies, and monitor execution.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] transition">
             + New Mission
          </button>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Active Mission Workflow */}
           <div className="col-span-2 bg-[#0f1115] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]"></div>
              
              <div className="mb-6 pb-4 border-b border-slate-800">
                 <h2 className="text-lg font-bold text-white font-sans">Mission: Msn-7A9B</h2>
                 <p className="text-sm text-slate-400 font-sans mt-1">"Identify potential repurposed drug candidates for triple-negative breast cancer (TNBC) based on recent transcriptomic datasets, and draft a preliminary statistical validation plan."</p>
              </div>
              
              <div className="space-y-4">
                 
                 {/* Task 1: Complete */}
                 <div className="bg-[#050505] border border-emerald-900/50 p-4 rounded-lg flex items-start gap-4 opacity-70">
                    <div className="mt-1 w-6 h-6 rounded-full bg-emerald-900/40 border border-emerald-500 flex items-center justify-center text-emerald-500 text-xs">✓</div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h3 className="text-sm font-bold text-white">Literature Review & Dataset Identification</h3>
                          <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[10px] rounded border border-slate-800">LiteratureAgent</span>
                       </div>
                       <p className="text-xs text-slate-500 font-sans mb-3">Scanned PubMed and GEO. Identified 3 high-quality TNBC RNA-seq datasets (GSE123...).</p>
                    </div>
                 </div>

                 {/* Task 2: Active */}
                 <div className="bg-[#0f172a] border border-blue-900 p-4 rounded-lg flex items-start gap-4 shadow-[0_0_20px_rgba(30,58,138,0.15)]">
                    <div className="mt-1 w-6 h-6 rounded-full bg-blue-900/50 border border-blue-500 flex items-center justify-center">
                       <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h3 className="text-sm font-bold text-blue-100">Differential Expression Analysis</h3>
                          <span className="px-2 py-0.5 bg-blue-900/40 text-blue-400 text-[10px] font-bold rounded border border-blue-800">BioinfoAgent</span>
                       </div>
                       <p className="text-xs text-slate-400 font-sans mb-3">Executing DESeq2 pipeline on GSE123 datasets to identify significantly upregulated targets.</p>
                       <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[65%]"></div>
                       </div>
                    </div>
                 </div>

                 {/* Task 3: Pending */}
                 <div className="bg-[#050505] border border-slate-800 p-4 rounded-lg flex items-start gap-4 opacity-50">
                    <div className="mt-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-600 text-xs">3</div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h3 className="text-sm font-bold text-white">Drug-Target Network Mapping</h3>
                          <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[10px] rounded border border-slate-800">DrugDiscoveryAgent</span>
                       </div>
                       <p className="text-xs text-slate-500 font-sans">Awaiting DE genes from BioinfoAgent to query ChEMBL for repurposed compounds.</p>
                    </div>
                 </div>

                 {/* Task 4: Pending */}
                 <div className="bg-[#050505] border border-slate-800 p-4 rounded-lg flex items-start gap-4 opacity-50">
                    <div className="mt-1 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-600 text-xs">4</div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h3 className="text-sm font-bold text-white">Statistical Validation Plan</h3>
                          <span className="px-2 py-0.5 bg-slate-900 text-slate-400 text-[10px] rounded border border-slate-800">StatsAgent</span>
                       </div>
                       <p className="text-xs text-slate-500 font-sans">Drafting power analysis and validation protocols.</p>
                    </div>
                 </div>

              </div>
           </div>

           {/* Active Agent Pool */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#0f1115] border border-slate-800 p-5 rounded-xl">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="text-emerald-500">●</span> Active Agent Pool
                 </h3>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 bg-[#050505] rounded border border-slate-800">
                       <div className="text-xl">📚</div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200">LiteratureAgent</div>
                          <div className="text-[10px] text-slate-500">Idle</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-blue-900/10 rounded border border-blue-900/50">
                       <div className="text-xl">🧬</div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-blue-300">BioinfoAgent</div>
                          <div className="text-[10px] text-blue-500 font-bold">Executing (DESeq2)</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#050505] rounded border border-slate-800">
                       <div className="text-xl">💊</div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200">DrugDiscoveryAgent</div>
                          <div className="text-[10px] text-slate-500">Waiting for Inputs</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-[#050505] rounded border border-slate-800">
                       <div className="text-xl">📊</div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200">StatsAgent</div>
                          <div className="text-[10px] text-slate-500">Idle</div>
                       </div>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
