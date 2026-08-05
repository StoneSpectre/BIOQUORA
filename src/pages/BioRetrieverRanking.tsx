import React, { useState, useEffect } from 'react';

export default function BioRetrieverRanking() {

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
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-emerald-500">🏆</span> Evidence Ranking Engine
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans max-w-3xl">
               Knowledge Fusion Layer: Visualizing how retrieved documents are scored and ranked based on consensus, impact, and study design.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           <div className="col-span-2 space-y-6">
              
              {/* Ranked Item 1 */}
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 rounded text-[10px] font-bold uppercase">Rank 1</span>
                          <span className="text-xs text-slate-400">PMID: 30123456</span>
                       </div>
                       <h3 className="text-base font-bold text-slate-200 font-sans">Olaparib for Metastatic Breast Cancer in Patients with a Germline BRCA Mutation</h3>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-bold text-emerald-400">98.2</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">Fusion Score</div>
                    </div>
                 </div>
                 <p className="text-xs text-slate-400 font-sans mb-4">New England Journal of Medicine, 2017</p>
                 
                 {/* Ranking Justification Bars */}
                 <div className="space-y-2">
                    <div>
                       <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-1">
                          <span>Study Design (Phase III RCT)</span>
                          <span className="text-emerald-400">Max</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded"><div className="bg-emerald-500 h-1 rounded w-full"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-1">
                          <span>Citation Impact (5,200+ citations)</span>
                          <span className="text-emerald-400">95%</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded"><div className="bg-emerald-500 h-1 rounded w-[95%]"></div></div>
                    </div>
                 </div>
              </div>

              {/* Ranked Item 2 */}
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 relative overflow-hidden opacity-80">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <div className="flex justify-between items-start mb-4">
                    <div>
                       <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-1 bg-blue-950/30 text-blue-400 border border-blue-900/50 rounded text-[10px] font-bold uppercase">Rank 2</span>
                          <span className="text-xs text-slate-400">PMID: 31890123</span>
                       </div>
                       <h3 className="text-base font-bold text-slate-200 font-sans">Mechanisms of PARP inhibitor resistance in BRCA-mutated breast cancer</h3>
                    </div>
                    <div className="text-right">
                       <div className="text-2xl font-bold text-blue-400">84.5</div>
                       <div className="text-[10px] text-slate-500 uppercase tracking-widest">Fusion Score</div>
                    </div>
                 </div>
                 <p className="text-xs text-slate-400 font-sans mb-4">Nature Reviews Cancer, 2020</p>
                 
                 {/* Ranking Justification Bars */}
                 <div className="space-y-2">
                    <div>
                       <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-1">
                          <span>Study Design (Review)</span>
                          <span className="text-blue-400">70%</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded"><div className="bg-blue-500 h-1 rounded w-[70%]"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-[10px] text-slate-500 uppercase mb-1">
                          <span>Citation Impact (1,100+ citations)</span>
                          <span className="text-blue-400">80%</span>
                       </div>
                       <div className="w-full bg-slate-900 h-1 rounded"><div className="bg-blue-500 h-1 rounded w-[80%]"></div></div>
                    </div>
                 </div>
              </div>

           </div>

           <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">Ranking Weights</h3>
              
              <div className="space-y-6">
                 {/* Simulated Radar Chart Metric list */}
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Study Design (RCT/Meta)</span>
                    <span className="text-emerald-500 font-bold">40%</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Citation Impact</span>
                    <span className="text-emerald-500 font-bold">25%</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Semantic Relevance</span>
                    <span className="text-emerald-500 font-bold">20%</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 uppercase tracking-widest">Recency / Temporal</span>
                    <span className="text-emerald-500 font-bold">15%</span>
                 </div>
              </div>

              <div className="mt-8 p-4 bg-[#0a0a0a] border border-slate-800 rounded text-xs text-slate-500 font-sans">
                 <strong>Knowledge Fusion Logic:</strong> The engine prioritizes Phase III Clinical Trials and Meta-analyses over observational or in-vitro studies, adjusting weights based on IntentAI classification.
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
