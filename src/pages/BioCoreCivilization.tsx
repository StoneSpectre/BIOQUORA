import React, { useState, useEffect } from 'react';

export default function BioCoreCivilization() {

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
        <header className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-amber-500">🏛️</span> Civilization Knowledge Archive
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Long-term preservation and indexing of the global biomedical knowledge graph.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6">
           <div className="bg-[#111] border border-slate-800 rounded-xl p-6 h-[300px]">
              <h3 className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-6">Archive Statistics</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Total Indexed Documents (Global)</div>
                    <div className="text-3xl font-black text-white font-sans">142,881,092</div>
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Knowledge Graph Nodes</div>
                    <div className="text-3xl font-black text-white font-sans">4.2 Billion</div>
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Current Epoch</div>
                    <div className="text-lg font-bold text-amber-400 font-sans tracking-wide">Era of Multimodal Intelligence</div>
                 </div>
              </div>
           </div>

           <div className="bg-[#111] border border-slate-800 rounded-xl p-6 h-[300px]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Recent Major Integrations</h3>
              <ul className="space-y-4 text-xs font-sans text-slate-300">
                 <li className="flex gap-4 items-start">
                    <span className="text-emerald-500 mt-0.5">●</span>
                    <div>
                       <div className="font-bold text-white">UK Biobank Complete Exome Dataset</div>
                       <div className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-mono">Ingested: 2026-07-20</div>
                    </div>
                 </li>
                 <li className="flex gap-4 items-start">
                    <span className="text-emerald-500 mt-0.5">●</span>
                    <div>
                       <div className="font-bold text-white">Global AlphaFold 3 Database Mirror</div>
                       <div className="text-slate-500 text-[10px] mt-1 uppercase tracking-widest font-mono">Ingested: 2026-06-15</div>
                    </div>
                 </li>
              </ul>
           </div>
        </div>
      </div>
    </div>
  );
}
