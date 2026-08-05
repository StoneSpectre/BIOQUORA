import React, { useState, useEffect } from 'react';

export default function BioWorkflowDesigner() {

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
               <span className="text-teal-500">🎨</span> Workflow Designer
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Drag-and-drop scientific protocol assembly.
            </p>
          </div>
          <button className="px-4 py-1.5 bg-teal-950/40 text-teal-400 border border-teal-900 rounded font-bold text-xs uppercase hover:bg-teal-900/50">Deploy Protocol</button>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl h-[600px] flex relative overflow-hidden">
           {/* Sidebar Tools */}
           <div className="w-64 border-r border-slate-800 bg-[#050505] p-4">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Node Library</div>
              <div className="space-y-2">
                 <div className="p-2 border border-slate-700 bg-[#111] rounded text-xs cursor-move hover:border-teal-500 transition-colors">Literature Search (BioRetriever)</div>
                 <div className="p-2 border border-slate-700 bg-[#111] rounded text-xs cursor-move hover:border-teal-500 transition-colors">Hypothesis Gen (BioReason)</div>
                 <div className="p-2 border border-slate-700 bg-[#111] rounded text-xs cursor-move hover:border-teal-500 transition-colors">MD Simulation (BioSimulation)</div>
                 <div className="p-2 border border-slate-700 bg-[#111] rounded text-xs cursor-move hover:border-teal-500 transition-colors">Statistical Test (BioCoder)</div>
                 <div className="p-2 border border-slate-700 bg-[#111] rounded text-xs cursor-move hover:border-teal-500 transition-colors border-dashed border-amber-500 text-amber-500">Human Approval Gate</div>
              </div>
           </div>

           {/* Canvas Area */}
           <div className="flex-1 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')]">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 font-bold uppercase tracking-widest text-xl opacity-20 pointer-events-none">
                 Canvas Empty
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
