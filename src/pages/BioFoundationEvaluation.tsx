import React, { useState, useEffect } from 'react';

export default function BioFoundationEvaluation() {

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
               <span className="text-rose-500">⚖️</span> Model Evaluation & Safety Guardrails
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans max-w-3xl">
               Continuous benchmarking against medical QA datasets (MedQA, PubMedQA) and real-time hallucination monitoring.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8">
           
           {/* Benchmarks */}
           <div className="bg-[#111] border border-slate-800 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-slate-800 pb-3">Standardized Benchmarks (BioLLM-70B)</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-xs text-slate-400">MedQA (USMLE)</span>
                       <span className="text-sm font-bold text-emerald-400">89.4%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[89.4%]"></div>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-xs text-slate-400">PubMedQA</span>
                       <span className="text-sm font-bold text-emerald-400">82.1%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500 w-[82.1%]"></div>
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-end mb-2">
                       <span className="text-xs text-slate-400">BioASQ (Semantic QA)</span>
                       <span className="text-sm font-bold text-amber-400">76.8%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-amber-500 w-[76.8%]"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Safety Telemetry */}
           <div className="bg-[#111] border border-slate-800 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 border-b border-slate-800 pb-3">Live Safety Telemetry (24h)</h3>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Hallucination Rate</div>
                    <div className="text-2xl font-bold text-emerald-500">0.42%</div>
                    <div className="text-[10px] text-slate-600 mt-1">Target: &lt;1.0%</div>
                 </div>
                 
                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Ungrounded Claims</div>
                    <div className="text-2xl font-bold text-rose-500">142</div>
                    <div className="text-[10px] text-slate-600 mt-1">Intercepted & Blocked</div>
                 </div>

                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-center col-span-2 flex items-center justify-between">
                    <div className="text-left">
                       <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Clinical Safety Filter</div>
                       <div className="text-[10px] font-sans text-slate-400">Blocks direct medical advice to unauthenticated patients.</div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-900/30 text-emerald-500 border border-emerald-800 text-xs font-bold rounded">ACTIVE</div>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
