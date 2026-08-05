import React, { useState, useEffect } from 'react';

export default function BioRetrieverGraphRAG() {

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
             <span className="text-indigo-500">🕸️</span> GraphRAG Extraction
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Visualizing structured knowledge subgraphs extracted to augment AI context prior to reasoning.
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl h-[600px] relative overflow-hidden flex items-center justify-center">
           
           {/* Abstract Node Graph Representation */}
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0,transparent_50%)]"></div>

           {/* Nodes */}
           <div className="relative w-full h-full max-w-4xl max-h-[500px]">
              
              {/* Central Target Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-600 flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <span className="text-white font-bold text-sm text-center">BRCA2<br/>Gene</span>
                 </div>
                 <span className="mt-2 text-[10px] text-slate-500 uppercase bg-[#050505] px-2 py-0.5 rounded">Target Entity</span>
              </div>

              {/* Edge to Drug */}
              <div className="absolute top-[30%] left-[35%] w-[200px] h-0.5 bg-indigo-500/50 origin-bottom-right rotate-[35deg] z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[9px] text-indigo-400 font-bold uppercase rotate-[-35deg]">Targeted By</div>
              </div>
              
              {/* Drug Node */}
              <div className="absolute top-[20%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-indigo-950/40 border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                    <span className="text-indigo-400 font-bold text-xs text-center">Olaparib</span>
                 </div>
                 <span className="mt-2 text-[10px] text-indigo-400 font-bold uppercase bg-indigo-950/50 px-2 py-0.5 rounded border border-indigo-900">Drug</span>
              </div>

              {/* Edge to Disease */}
              <div className="absolute top-[70%] left-[35%] w-[200px] h-0.5 bg-rose-500/50 origin-top-right rotate-[-35deg] z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[9px] text-rose-400 font-bold uppercase rotate-[35deg]">Associated With</div>
              </div>

              {/* Disease Node */}
              <div className="absolute top-[80%] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-16 h-16 rounded-full bg-rose-950/40 border-2 border-rose-500 flex items-center justify-center shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                    <span className="text-rose-400 font-bold text-xs text-center">TNBC</span>
                 </div>
                 <span className="mt-2 text-[10px] text-rose-400 font-bold uppercase bg-rose-950/50 px-2 py-0.5 rounded border border-rose-900">Disease</span>
              </div>

              {/* Edge to Pathway */}
              <div className="absolute top-[50%] left-[55%] w-[250px] h-0.5 bg-emerald-500/50 -translate-y-1/2 z-0">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-2 text-[9px] text-emerald-400 font-bold uppercase">Participates In</div>
              </div>

              {/* Pathway Node */}
              <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-emerald-950/40 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] relative">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping opacity-20"></div>
                    <span className="text-emerald-400 font-bold text-[10px] text-center px-2">Homologous<br/>Recombination</span>
                 </div>
                 <span className="mt-2 text-[10px] text-emerald-400 font-bold uppercase bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900">Biological Process</span>
              </div>

           </div>

           {/* Extraction Output Panel */}
           <div className="absolute bottom-6 right-6 bg-[#111] border border-slate-800 p-4 rounded-lg shadow-xl w-80">
              <h4 className="text-xs font-bold text-indigo-400 uppercase mb-2 flex items-center justify-between">
                 Context Assembled 
                 <span className="px-2 py-0.5 bg-indigo-900/30 text-indigo-300 rounded">1.2kb</span>
              </h4>
              <p className="text-[10px] text-slate-400 font-sans">
                 GraphRAG successfully mapped BRCA2 to TNBC, Olaparib, and HR pathways. Subgraph constraints applied. Passing semantic triples to Reasoning Engine.
              </p>
           </div>

        </div>
      </div>
    </div>
  );
}
