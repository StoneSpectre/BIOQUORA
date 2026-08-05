import React, { useState, useEffect } from 'react';

export default function BioMemoryWorkspace() {

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
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-indigo-500 tracking-[0.2em] mb-2 uppercase">Step 7 • Memory Layer</div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-indigo-400">💾</span> BioMemory Hub
            </h1>
            <p className="text-slate-500 mt-2 font-sans max-w-3xl">
              Navigate personal, project, and institutional memory repositories. Bioquora AI preserves your research context continuously.
            </p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 uppercase tracking-widest">Storage Status</div>
             <div className="text-xl font-bold text-indigo-400">Synchronized</div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Repositories */}
           <div className="col-span-2 space-y-6">
              
              {/* Project Memory */}
              <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                 <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2 mb-4">
                    📁 Active Project Memory: <span className="text-indigo-400 text-sm">TNBC Target Discovery</span>
                 </h2>
                 
                 <div className="space-y-3">
                    <div className="p-3 bg-[#111] border border-slate-800 rounded flex justify-between items-center hover:border-indigo-900 transition-colors">
                       <div>
                          <div className="text-sm font-bold text-slate-200">Experiment 04: CRISPR Screen Validation</div>
                          <div className="text-xs text-slate-500 font-sans mt-1">Saved 2 hours ago • Contains 4 datasets, 12 observations</div>
                       </div>
                       <button className="px-3 py-1 bg-indigo-950/30 text-indigo-400 text-xs rounded border border-indigo-900/50">Restore Context</button>
                    </div>

                    <div className="p-3 bg-[#111] border border-slate-800 rounded flex justify-between items-center hover:border-indigo-900 transition-colors">
                       <div>
                          <div className="text-sm font-bold text-slate-200">Literature Synthesis: PARP Inhibitor Resistance</div>
                          <div className="text-xs text-slate-500 font-sans mt-1">Saved 3 days ago • Contains 42 indexed papers, 3 hypotheses</div>
                       </div>
                       <button className="px-3 py-1 bg-indigo-950/30 text-indigo-400 text-xs rounded border border-indigo-900/50">Restore Context</button>
                    </div>
                 </div>
              </div>

              {/* Personal Memory */}
              <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                 <h2 className="text-lg font-bold text-white font-sans flex items-center gap-2 mb-4">
                    👤 Personal Memory & Preferences
                 </h2>
                 <p className="text-xs text-slate-500 font-sans mb-4">
                    The AI retains your methodological preferences, standard protocols, and areas of expertise.
                 </p>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-950/20 border border-blue-900/50 text-blue-400 text-xs rounded">Prefers Python over R</span>
                    <span className="px-2 py-1 bg-blue-950/20 border border-blue-900/50 text-blue-400 text-xs rounded">Expert: Single-Cell RNA-Seq</span>
                    <span className="px-2 py-1 bg-blue-950/20 border border-blue-900/50 text-blue-400 text-xs rounded">Default Alpha: 0.05</span>
                 </div>
              </div>

           </div>

           {/* Metrics & Sync */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 p-6 rounded-xl">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Memory Metrics</h3>
                 <div className="space-y-4">
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Hypotheses Stored</span>
                          <span className="text-indigo-400 font-bold">142</span>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Papers Retained in Memory</span>
                          <span className="text-indigo-400 font-bold">3,892</span>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs text-slate-400 mb-1">
                          <span>Workflows Cached</span>
                          <span className="text-indigo-400 font-bold">18</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-indigo-950/10 border border-indigo-900/30 p-6 rounded-xl text-center">
                 <div className="w-12 h-12 bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-3 text-xl shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    🔄
                 </div>
                 <h3 className="text-sm font-bold text-indigo-300">Continuous Sync Active</h3>
                 <p className="text-xs text-slate-400 font-sans mt-2">
                    Agent scratchpads and conversation buffers are currently syncing to long-term Project Memory.
                 </p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
