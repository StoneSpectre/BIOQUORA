import React, { useState, useEffect } from 'react';

export default function BioMemoryTimeline() {

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
      
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-12">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-sky-500">⏱️</span> Research Timeline Memory
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Chronological history of research activities, experiments, and decision provenance within a project.
          </p>
        </header>

        <div className="relative border-l border-slate-800 ml-6 space-y-12 pb-12">
           
           {/* Event 1 */}
           <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)]"></div>
              <div className="text-xs text-sky-400 font-bold mb-1">Today, 14:30</div>
              <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded-lg shadow-lg">
                 <h3 className="text-sm font-bold text-white mb-2">Hypothesis Refined</h3>
                 <p className="text-sm text-slate-400 font-sans">
                    Based on in-silico docking results, BioReason refined the primary hypothesis to target the allosteric site rather than the active site.
                 </p>
                 <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-[#111] border border-slate-700 text-[10px] rounded text-slate-300">Decision Provenance</span>
                 </div>
              </div>
           </div>

           {/* Event 2 */}
           <div className="relative pl-8">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-500"></div>
              <div className="text-xs text-slate-500 font-bold mb-1">Yesterday, 09:15</div>
              <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded-lg shadow-lg">
                 <h3 className="text-sm font-bold text-white mb-2">Dataset Version 2.0 Committed</h3>
                 <p className="text-sm text-slate-400 font-sans">
                    BioinfoAgent cleaned and normalized the RNA-Seq batch. 14 outliers were automatically removed.
                 </p>
                 <div className="mt-3 flex gap-2">
                    <span className="px-2 py-1 bg-purple-950/20 border border-purple-900/50 text-[10px] rounded text-purple-400">Dataset Memory</span>
                 </div>
              </div>
           </div>

           {/* Event 3 */}
           <div className="relative pl-8 opacity-75">
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
              <div className="text-xs text-slate-500 font-bold mb-1">Oct 12, 2026</div>
              <div className="bg-[#0a0a0a] border border-slate-800 p-5 rounded-lg shadow-lg">
                 <h3 className="text-sm font-bold text-white mb-2">Project Initialized</h3>
                 <p className="text-sm text-slate-400 font-sans">
                    Research goals imported from institutional grant proposal. LiteratureAgent began background synthesis.
                 </p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
