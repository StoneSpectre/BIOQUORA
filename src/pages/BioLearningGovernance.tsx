import React, { useState, useEffect } from 'react';

export default function BioLearningGovernance() {

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
               <span className="text-emerald-500">⚖️</span> Learning Governance
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Human expert review and approval for foundational knowledge updates.
            </p>
          </div>
        </header>

        <div className="space-y-6">
           <div className="bg-[#111] border border-slate-800 border-l-4 border-l-amber-500 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                 <div>
                    <h3 className="text-lg font-bold text-white mb-1">Knowledge Update Request: PR-992</h3>
                    <p className="text-xs text-slate-500 font-sans">Source: "Novel FDA Approval: Drug X for Indication Y" (New England Journal of Medicine, Aug 2026).</p>
                 </div>
                 <span className="bg-amber-900/30 text-amber-500 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-widest">Pending Review</span>
              </div>
              
              <div className="bg-black border border-slate-800 rounded p-4 text-xs font-sans mb-4 space-y-2">
                 <div className="text-emerald-400 font-bold">Proposed Graph Changes:</div>
                 <div className="text-slate-400">+ Edge: [Drug X] --(TREATS)--&gt; [Indication Y]</div>
                 <div className="text-slate-400">+ Edge: [Drug X] --(BINDS_TO)--&gt; [Target Z]</div>
                 <div className="text-slate-500 text-[10px] mt-2 italic">BioLearning Confidence: 99.8% (FDA Official Press Release cross-referenced).</div>
              </div>
              
              <div className="flex gap-4">
                 <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded uppercase tracking-widest">Approve Update</button>
                 <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded uppercase tracking-widest">Request Edits</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
