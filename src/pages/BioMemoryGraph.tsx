import React, { useState, useEffect } from 'react';

export default function BioMemoryGraph() {

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
             <span className="text-purple-500">🕸️</span> Knowledge Graph Memory
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Visualizing how personal, project, and institutional memories map onto the global biomedical knowledge graph.
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl h-[600px] relative overflow-hidden flex items-center justify-center">
           
           {/* Graph Canvas */}
           <div className="relative w-full h-full">
              
              {/* Central Global Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <span className="text-white font-bold text-sm text-center">TP53<br/>Gene</span>
                 </div>
                 <span className="mt-2 text-[10px] text-slate-500 uppercase">Global Ontology</span>
              </div>

              {/* Edge to Personal Memory */}
              <div className="absolute top-[30%] left-[35%] w-[200px] h-0.5 bg-blue-500/50 origin-bottom-right rotate-[35deg] z-0"></div>
              
              {/* Personal Memory Node (Blue) */}
              <div className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-14 h-14 rounded-full bg-blue-950/40 border-2 border-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                    <span className="text-blue-400 font-bold text-xs">Note</span>
                 </div>
                 <span className="mt-2 text-[10px] text-blue-400 font-bold uppercase bg-blue-950/50 px-2 py-0.5 rounded border border-blue-900">Personal Memory</span>
                 <span className="mt-1 text-[9px] text-slate-500">"Check TP53 in latest batch"</span>
              </div>

              {/* Edge to Project Memory */}
              <div className="absolute top-[70%] left-[35%] w-[200px] h-0.5 bg-purple-500/50 origin-top-right rotate-[-35deg] z-0"></div>

              {/* Project Memory Node (Purple) */}
              <div className="absolute top-[80%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-purple-950/40 border-2 border-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    <span className="text-purple-400 font-bold text-xs text-center">Dataset<br/>v1.2</span>
                 </div>
                 <span className="mt-2 text-[10px] text-purple-400 font-bold uppercase bg-purple-950/50 px-2 py-0.5 rounded border border-purple-900">Project Memory</span>
                 <span className="mt-1 text-[9px] text-slate-500">TNBC_Mutations.csv</span>
              </div>

              {/* Edge to Institutional Memory */}
              <div className="absolute top-[50%] left-[55%] w-[250px] h-0.5 bg-emerald-500/50 -translate-y-1/2 z-0"></div>

              {/* Institutional Memory Node (Emerald) */}
              <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-emerald-950/40 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                    <span className="text-emerald-400 font-bold text-xs text-center">Standard<br/>Protocol</span>
                 </div>
                 <span className="mt-2 text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">Institutional Memory</span>
                 <span className="mt-1 text-[9px] text-slate-500">SOP-Genomics-044</span>
              </div>

           </div>

           {/* Legend Panel */}
           <div className="absolute bottom-6 left-6 bg-[#111] border border-slate-800 p-4 rounded-lg shadow-xl">
              <h4 className="text-xs font-bold text-white uppercase mb-3">Privacy Topology</h4>
              <div className="space-y-2 text-[10px] text-slate-400 uppercase">
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Private (User Only)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500"></div> Project (Team Shared)</div>
                 <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Institutional (Org Wide)</div>
                 <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-800"><div className="w-3 h-3 rounded-full bg-slate-600 border border-slate-400"></div> Global Ontology Node</div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
