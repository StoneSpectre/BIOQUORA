import React, { useState, useEffect } from 'react';

export default function BioFoundationWorkspace() {

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
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-fuchsia-500 tracking-[0.2em] mb-2 uppercase">Step 7 • Foundation AI Layer</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-emerald-400">⚡</span> BioFoundation Control Core
            </h1>
            <p className="text-slate-500 mt-2 font-sans">
              Central orchestration for distributed inference, semantic intent routing, and cross-model reasoning pipelines.
            </p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 uppercase tracking-widest">Global Compute</div>
             <div className="text-2xl font-bold text-emerald-400">12.4 EFLOPS</div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Intent Router Viz */}
           <div className="col-span-2 bg-[#0f172a] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 rounded-full blur-[80px]"></div>
              
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                 <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"></div> Live Intent Routing
              </h3>
              
              <div className="space-y-6">
                 
                 {/* Query 1 */}
                 <div className="bg-[#020617] border border-slate-800 p-4 rounded flex items-center gap-4">
                    <div className="flex-1">
                       <div className="text-xs text-slate-500 mb-1">Incoming Query (User ID: 882a)</div>
                       <div className="text-sm text-slate-300 font-sans">"Design a small molecule inhibitor for KRAS G12C with optimized oral bioavailability."</div>
                    </div>
                    <div className="w-8 h-px bg-slate-700"></div>
                    <div className="bg-slate-900 border border-emerald-500/30 px-3 py-2 rounded">
                       <div className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Intent Parsed</div>
                       <div className="text-xs text-white">Molecule_Generation</div>
                    </div>
                    <div className="w-8 h-px bg-slate-700"></div>
                    <div className="bg-fuchsia-950/30 border border-fuchsia-900 px-3 py-2 rounded">
                       <div className="text-[10px] text-fuchsia-400 font-bold uppercase mb-1">Routed To</div>
                       <div className="text-xs text-white">MoleculeAI-v4 (CUDA_01)</div>
                    </div>
                 </div>

                 {/* Query 2 */}
                 <div className="bg-[#020617] border border-slate-800 p-4 rounded flex items-center gap-4">
                    <div className="flex-1">
                       <div className="text-xs text-slate-500 mb-1">Incoming Query (User ID: 91b1)</div>
                       <div className="text-sm text-slate-300 font-sans">"Synthesize evidence regarding IL-6 blockade efficacy in severe cytokine storm."</div>
                    </div>
                    <div className="w-8 h-px bg-slate-700"></div>
                    <div className="bg-slate-900 border border-emerald-500/30 px-3 py-2 rounded">
                       <div className="text-[10px] text-emerald-500 font-bold uppercase mb-1">Intent Parsed</div>
                       <div className="text-xs text-white">Literature_Synthesis</div>
                    </div>
                    <div className="w-8 h-px bg-slate-700"></div>
                    <div className="bg-blue-950/30 border border-blue-900 px-3 py-2 rounded">
                       <div className="text-[10px] text-blue-400 font-bold uppercase mb-1">Routed To</div>
                       <div className="text-xs text-white">BioLLM-70B (TPU_04)</div>
                    </div>
                 </div>

              </div>
           </div>

           {/* Foundation Ecosystem Status */}
           <div className="col-span-1 space-y-4">
              
              <div className="bg-[#0f172a] border border-slate-800 p-5 rounded-xl">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Core Models</h3>
                 
                 <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs text-slate-300">BioLLM (Language)</span>
                       </div>
                       <span className="text-[10px] text-slate-500">v4.1.2</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs text-slate-300">SciLLM (Reasoning)</span>
                       </div>
                       <span className="text-[10px] text-slate-500">v2.0.8</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                          <span className="text-xs text-slate-300">MoleculeAI</span>
                       </div>
                       <span className="text-[10px] text-emerald-500 font-bold">Training</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                       <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                          <span className="text-xs text-slate-300">ProteinAI</span>
                       </div>
                       <span className="text-[10px] text-slate-500">v3.5.0</span>
                    </div>
                 </div>
              </div>

              <div className="bg-emerald-950/20 border border-emerald-900/50 p-5 rounded-xl text-center">
                 <div className="text-4xl mb-2">🛡️</div>
                 <h4 className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Safety Layer Active</h4>
                 <p className="text-xs text-slate-400 mt-2 font-sans">Real-time hallucination detection and evidence grounding verification operational across all nodes.</p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
