import React, { useState, useEffect } from 'react';

export default function BioAssistantLiterature() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end font-mono">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-indigo-500">📚</span> Literature Synthesis Engine
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
               Synthesize hundreds of papers into coherent narratives with full citation provenance.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 bg-indigo-950/40 text-indigo-400 border border-indigo-900 rounded font-bold text-xs uppercase hover:bg-indigo-900/50">Generate Report</button>
          </div>
        </header>

        <div className="flex gap-8 h-[650px]">
           
           {/* Document Reader Pane */}
           <div className="flex-1 bg-white rounded-xl relative overflow-hidden shadow-xl flex flex-col">
              
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
                 <div className="text-sm font-bold text-slate-800">Review_Article_Draft.md</div>
                 <div className="flex gap-2 text-xs">
                    <button className="text-slate-500 hover:text-slate-800">Export</button>
                 </div>
              </div>

              <div className="p-8 text-slate-800 font-serif leading-relaxed overflow-y-auto text-sm space-y-4">
                 <h2 className="text-2xl font-bold mb-4 font-sans text-black">Targeting KRAS G12C: Mechanisms of Acquired Resistance</h2>
                 <p>
                    The advent of covalent inhibitors targeting the KRAS G12C mutation has transformed the therapeutic landscape for non-small cell lung cancer (NSCLC) <span className="bg-indigo-100 text-indigo-800 px-1 rounded text-xs cursor-pointer">[1, 2]</span>. However, clinical efficacy is frequently limited by the emergence of acquired resistance.
                 </p>
                 <p>
                    Recent multi-omic profiling has revealed that resistance mechanisms are highly heterogeneous. Secondary mutations within the switch-II pocket, specifically Y96D, sterically hinder the binding of inhibitors like Sotorasib <span className="bg-indigo-100 text-indigo-800 px-1 rounded text-xs cursor-pointer hover:bg-indigo-200 transition-colors">[3]</span>. Furthermore, bypass signaling through the amplification of MET or the activation of the EGFR/HER2 axis maintains downstream MAPK signaling independent of KRAS <span className="bg-indigo-100 text-indigo-800 px-1 rounded text-xs cursor-pointer">[4]</span>.
                 </p>
              </div>
           </div>

           {/* Citation & Evidence Inspector Pane */}
           <div className="w-96 flex flex-col gap-6 font-mono">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 flex-1">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Active Citation Inspector</h3>
                 
                 <div className="p-4 bg-indigo-950/20 border border-indigo-900/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-xs text-indigo-400 font-bold">[3] Awad et al., 2021</span>
                       <span className="text-[10px] text-emerald-400 border border-emerald-900 px-1 rounded">Peer-Reviewed</span>
                    </div>
                    <h4 className="text-sm text-white font-sans font-bold leading-tight mb-2">Acquired Resistance to KRAS G12C Inhibition in Cancer</h4>
                    <p className="text-[10px] text-slate-400 font-sans italic mb-4">N Engl J Med. 2021; 384(25):2382-2393.</p>
                    
                    <div className="bg-[#050505] p-3 rounded border border-slate-800 text-[10px] text-slate-300 font-sans">
                       <strong className="text-indigo-400">BioValidator Fact-Check:</strong> The claim regarding the "Y96D mutation sterically hindering Sotorasib" is strongly supported by Figure 3B and structural analysis in the original paper.
                    </div>
                 </div>
              </div>

              <div className="bg-[#111] border border-slate-800 rounded-xl p-5 h-48">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Knowledge Graph Link</h3>
                 <div className="text-xs text-slate-400 font-sans space-y-2">
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-rose-500"></span> KRAS (Gene)
                    </div>
                    <div className="flex items-center gap-2 ml-4 border-l border-slate-700 pl-4">
                       <span className="w-2 h-2 rounded-full bg-blue-500"></span> Sotorasib (Drug)
                    </div>
                    <div className="flex items-center gap-2 ml-8 border-l border-slate-700 pl-4">
                       <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Y96D (Mutation)
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
