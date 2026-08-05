import React, { useState, useEffect } from 'react';

export default function BioCoreRouting() {

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
               <span className="text-cyan-500">🔀</span> Universal Request Router
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               High-performance routing layer connecting user queries to specialized AI subsystems.
            </p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl p-6">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Live Traffic Routing</h3>
           
           <div className="space-y-3">
              <div className="bg-black border border-slate-800 rounded p-4 flex items-center justify-between text-xs font-mono">
                 <div className="flex items-center gap-4">
                    <span className="text-slate-500">REQ-81102</span>
                    <span className="text-white font-bold w-64 truncate">"Predict side effects of Drug Y"</span>
                 </div>
                 <div className="flex items-center gap-4 text-slate-400">
                    <span>--- routes to ---&gt;</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded border border-cyan-900 uppercase">BioReason</span>
                    <span className="bg-cyan-950/50 text-cyan-400 px-2 py-1 rounded border border-cyan-900 uppercase">BioRetriever</span>
                 </div>
                 <div className="text-emerald-500 font-bold">12ms latency</div>
              </div>

              <div className="bg-black border border-slate-800 rounded p-4 flex items-center justify-between text-xs font-mono">
                 <div className="flex items-center gap-4">
                    <span className="text-slate-500">REQ-81103</span>
                    <span className="text-white font-bold w-64 truncate">"Write Python script for PyMOL"</span>
                 </div>
                 <div className="flex items-center gap-4 text-slate-400">
                    <span>--- routes to ---&gt;</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="bg-amber-950/50 text-amber-400 px-2 py-1 rounded border border-amber-900 uppercase">BioCoder</span>
                 </div>
                 <div className="text-emerald-500 font-bold">8ms latency</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
