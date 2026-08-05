import React, { useState, useEffect } from 'react';

export default function BioAgentsRegistry() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-amber-500">🗂️</span> Agent Registry
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Catalog of specialized AI agents available for orchestration, their base models, and tool access capabilities.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6">
           
           {/* Agent 1 */}
           <div className="bg-[#0f1115] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">📚</div>
                    <h3 className="text-base font-bold text-white">LiteratureAgent</h3>
                 </div>
                 <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-800/50">Online</span>
              </div>
              <p className="text-sm text-slate-400 font-sans mb-4">Specializes in retrieving, summarizing, and synthesizing biomedical literature from PubMed and BioRxiv.</p>
              
              <div className="space-y-2 text-xs">
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Base Model</span>
                    <span className="text-slate-300">BioLLM-70B</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Tools Enabled</span>
                    <span className="text-amber-400 font-sans">PubMed API, Crossref, Semantic Search</span>
                 </div>
              </div>
           </div>

           {/* Agent 2 */}
           <div className="bg-[#0f1115] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">📊</div>
                    <h3 className="text-base font-bold text-white">StatsAgent</h3>
                 </div>
                 <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-800/50">Online</span>
              </div>
              <p className="text-sm text-slate-400 font-sans mb-4">Expert in experimental design, power analysis, significance testing, and generating R/Python statistical scripts.</p>
              
              <div className="space-y-2 text-xs">
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Base Model</span>
                    <span className="text-slate-300">SciLLM-Math</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Tools Enabled</span>
                    <span className="text-amber-400 font-sans">Python REPL (scipy, statsmodels)</span>
                 </div>
              </div>
           </div>

           {/* Agent 3 */}
           <div className="bg-[#0f1115] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">🧬</div>
                    <h3 className="text-base font-bold text-white">BioinfoAgent</h3>
                 </div>
                 <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-800/50">Online</span>
              </div>
              <p className="text-sm text-slate-400 font-sans mb-4">Handles RNA-seq pipelines, variant calling, genomic annotations, and multi-omics data integration.</p>
              
              <div className="space-y-2 text-xs">
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Base Model</span>
                    <span className="text-slate-300">BioLLM-70B + CodeCore</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Tools Enabled</span>
                    <span className="text-amber-400 font-sans">Bash, BioConductor, Ensembl API</span>
                 </div>
              </div>
           </div>

           {/* Agent 4 */}
           <div className="bg-[#0f1115] border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">💊</div>
                    <h3 className="text-base font-bold text-white">DrugDiscoveryAgent</h3>
                 </div>
                 <span className="px-2 py-0.5 bg-rose-900/40 text-rose-400 text-[10px] font-bold uppercase rounded border border-rose-800/50">Maintenance</span>
              </div>
              <p className="text-sm text-slate-400 font-sans mb-4">Specialized in molecular docking, structure-activity relationships (SAR), and compound screening.</p>
              
              <div className="space-y-2 text-xs">
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Base Model</span>
                    <span className="text-slate-300">MoleculeAI-v4</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span className="text-slate-500 uppercase">Tools Enabled</span>
                    <span className="text-amber-400 font-sans">ChEMBL API, PyMOL Engine</span>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
