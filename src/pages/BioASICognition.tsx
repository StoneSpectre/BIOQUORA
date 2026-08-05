import React, { useState, useEffect } from 'react';

export default function BioASICognition() {

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
               <span className="text-fuchsia-500">🧬</span> Cognitive State Monitor
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Real-time tracking of the platform's hierarchical reasoning and decision-support engines.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6">
           <div className="bg-[#111] border border-slate-800 rounded-xl p-6 h-[400px]">
              <h3 className="text-xs font-bold text-fuchsia-500 uppercase tracking-widest mb-6">Reasoning Tree (MS-990-ALPHA)</h3>
              
              <div className="pl-4 border-l border-slate-700 space-y-4 font-mono text-xs text-slate-400">
                 <div className="relative">
                    <div className="absolute w-4 h-[1px] bg-slate-700 -left-4 top-1/2"></div>
                    <span className="text-white font-bold bg-fuchsia-950 px-2 py-0.5 rounded border border-fuchsia-900">ROOT: Analyze Resistance</span>
                 </div>
                 
                 <div className="pl-8 border-l border-slate-700 space-y-4">
                    <div className="relative">
                       <div className="absolute w-4 h-[1px] bg-slate-700 -left-4 top-1/2"></div>
                       <span className="text-emerald-400 font-bold">Node 1: Extract Literature (Confidence: 0.98)</span>
                    </div>
                    <div className="relative">
                       <div className="absolute w-4 h-[1px] bg-slate-700 -left-4 top-1/2"></div>
                       <span className="text-amber-400 font-bold">Node 2: Identify Mutational Hotspots (Confidence: 0.84)</span>
                    </div>
                    <div className="pl-8 space-y-4">
                       <div className="relative">
                          <div className="absolute w-4 h-[1px] bg-slate-700 -left-4 top-1/2"></div>
                          <span className="text-sky-400 italic">Branch 2.1: Check ClinVar Database (Processing...)</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-[#111] border border-slate-800 rounded-xl p-6 h-[400px]">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Human Verification Queue</h3>
              
              <div className="bg-black border border-slate-800 rounded p-4 text-xs font-sans mb-4">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-bold">Decision Support: MS-990-ALPHA</span>
                    <span className="text-[10px] bg-amber-900/30 text-amber-500 px-2 py-1 rounded uppercase tracking-widest font-bold">Requires Human Approval</span>
                 </div>
                 <p className="text-slate-400 mb-4">BioASI has reached a conclusion regarding the L1196M mutation. Scientific confidence is 0.94, but protocol requires human oncologist review before finalizing the knowledge graph update.</p>
                 <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] rounded uppercase tracking-widest transition-colors w-full">Review Evidence Packet</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
