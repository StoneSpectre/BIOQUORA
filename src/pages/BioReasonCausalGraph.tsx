import React, { useState, useEffect } from 'react';

export default function BioReasonCausalGraph() {

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
        
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-fuchsia-500">🕸️</span> Mechanistic Causal Mapping
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Interactive node-based visualization of biological cause-effect relationships inferred by CausalAI.
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl h-[600px] relative overflow-hidden flex items-center justify-center">
           
           {/* Abstract Node Graph Representation via CSS */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.1)_0,transparent_50%)]"></div>

           {/* Nodes */}
           <div className="relative w-full h-full max-w-4xl max-h-[500px]">
              
              {/* Node A (Wnt Inhibitor) */}
              <div className="absolute top-1/2 left-10 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <span className="text-2xl">💊</span>
                 </div>
                 <span className="mt-2 text-xs font-bold text-white uppercase bg-slate-900 px-2 py-1 rounded">Wnt Inhibitor</span>
              </div>

              {/* Edge A to B */}
              <div className="absolute top-1/2 left-[104px] w-[150px] h-0.5 bg-rose-500 -translate-y-1/2 z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[10px] text-rose-500 font-bold uppercase">Inhibits</div>
              </div>

              {/* Node B (Beta-catenin) */}
              <div className="absolute top-1/2 left-[254px] -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-rose-950/40 border-2 border-rose-500 flex items-center justify-center shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                    <span className="text-rose-400 font-bold text-sm">β-Cat</span>
                 </div>
                 <span className="mt-2 text-xs font-bold text-white uppercase bg-slate-900 px-2 py-1 rounded">β-Catenin</span>
              </div>

              {/* Edge B to C1 */}
              <div className="absolute top-1/4 left-[318px] w-[200px] h-0.5 bg-slate-600 origin-left rotate-[20deg] z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[10px] text-slate-400 font-bold uppercase rotate-[-20deg]">Downregulates</div>
              </div>

              {/* Edge B to C2 */}
              <div className="absolute top-[75%] left-[318px] w-[200px] h-0.5 bg-slate-600 origin-left rotate-[-20deg] z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[10px] text-slate-400 font-bold uppercase rotate-[20deg]">Downregulates</div>
              </div>

              {/* Node C1 (Survivin) */}
              <div className="absolute top-[35%] left-[500px] -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center">
                    <span className="text-slate-300 font-bold text-xs">BIRC5</span>
                 </div>
                 <span className="mt-2 text-[10px] text-slate-400 uppercase">Survivin</span>
              </div>

              {/* Node C2 (c-Myc) */}
              <div className="absolute top-[65%] left-[500px] -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-14 h-14 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center">
                    <span className="text-slate-300 font-bold text-xs">MYC</span>
                 </div>
                 <span className="mt-2 text-[10px] text-slate-400 uppercase">c-Myc</span>
              </div>

              {/* Edges from C to D (Bax) */}
              <div className="absolute top-[35%] left-[556px] w-[150px] h-0.5 bg-emerald-500/50 origin-left rotate-[15deg] z-0 dashed-line"></div>
              <div className="absolute top-[65%] left-[556px] w-[150px] h-0.5 bg-emerald-500/50 origin-left rotate-[-15deg] z-0 dashed-line"></div>

              {/* Node D (Bax/Bcl2 Ratio) - The Secondary Mediator */}
              <div className="absolute top-1/2 left-[700px] -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-emerald-950/40 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] relative">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-20"></div>
                    <span className="text-emerald-400 font-bold text-sm text-center leading-tight">Bax/Bcl-2<br/>Ratio</span>
                 </div>
                 <span className="mt-2 text-xs font-bold text-emerald-400 uppercase bg-emerald-950/50 border border-emerald-900 px-2 py-1 rounded">Secondary Mediator</span>
              </div>

              {/* Edge D to E (Apoptosis) */}
              <div className="absolute top-1/2 left-[780px] w-[100px] h-0.5 bg-emerald-500 -translate-y-1/2 z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[10px] text-emerald-500 font-bold uppercase">Triggers</div>
              </div>

              {/* Node E (Apoptosis) */}
              <div className="absolute top-1/2 left-[880px] -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-500 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                    <span className="text-2xl">💀</span>
                 </div>
                 <span className="mt-2 text-xs font-bold text-white uppercase bg-slate-900 px-2 py-1 rounded">Apoptosis</span>
              </div>
           </div>

           {/* Legend Panel */}
           <div className="absolute bottom-6 left-6 bg-[#111] border border-slate-800 p-4 rounded-lg shadow-xl">
              <h4 className="text-xs font-bold text-white uppercase mb-3">Causal Legend</h4>
              <div className="space-y-2 text-[10px] text-slate-400 uppercase">
                 <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-rose-500"></div> Direct Inhibition</div>
                 <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-emerald-500"></div> Direct Activation</div>
                 <div className="flex items-center gap-2"><div className="w-4 h-0.5 bg-slate-600"></div> Downregulation</div>
                 <div className="flex items-center gap-2"><div className="w-4 h-0.5 border-t border-dashed border-emerald-500"></div> Inferred Secondary Effect</div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
