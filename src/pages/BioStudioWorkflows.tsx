import React, { useState, useEffect } from 'react';

export default function BioStudioWorkflows() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* Top Navbar */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <span className="text-xl text-emerald-500">🕸️</span>
          <h1 className="text-lg font-bold text-white tracking-wide">Visual Workflow Studio</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded shadow hover:bg-emerald-500">Deploy to BioCloud</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar (Components) */}
        <div className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col shrink-0 p-4 overflow-y-auto">
           <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Bioinformatics Nodes</h2>
           
           <div className="space-y-2 mb-6">
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-blue-400">📥</span>
               <span className="text-sm font-medium">Fetch FASTQ (SRA)</span>
             </div>
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-purple-400">✂️</span>
               <span className="text-sm font-medium">Trimmomatic</span>
             </div>
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-emerald-400">🧬</span>
               <span className="text-sm font-medium">BWA-MEM Align</span>
             </div>
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-amber-400">📊</span>
               <span className="text-sm font-medium">GATK Variant Call</span>
             </div>
           </div>

           <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-t border-slate-700 pt-4">AI / ML Nodes</h2>
           <div className="space-y-2">
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-indigo-400">🧠</span>
               <span className="text-sm font-medium">AlphaFold Predict</span>
             </div>
             <div className="bg-[#0f172a] border border-slate-600 p-2 rounded flex items-center gap-3 cursor-grab hover:border-emerald-500 transition">
               <span className="text-indigo-400">🧪</span>
               <span className="text-sm font-medium">AutoDock Vina</span>
             </div>
           </div>
        </div>

        {/* Center: Canvas (SVG Mockup) */}
        <div className="flex-1 bg-[#020617] relative overflow-hidden cursor-grab active:cursor-grabbing grid-bg">
           
           <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 800">
             <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                   <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>
                </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />

             {/* Connection Lines */}
             <path d="M 250 200 C 350 200, 350 200, 450 200" stroke="#475569" strokeWidth="2" fill="none" />
             <path d="M 650 200 C 750 200, 750 300, 850 300" stroke="#475569" strokeWidth="2" fill="none" />
             <path d="M 250 400 C 350 400, 350 300, 850 300" stroke="#475569" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-[dash_2s_linear_infinite]"/>
           </svg>

           {/* Nodes */}
           <div className="absolute top-[160px] left-[50px] w-[200px] bg-[#1e293b] border-2 border-slate-600 rounded-lg shadow-lg pointer-events-auto hover:border-emerald-500 transition">
              <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 rounded-t-md flex items-center justify-between">
                <span className="text-xs font-bold text-white">1. Fetch PDB (6OIM)</span>
                <span className="text-blue-400">📥</span>
              </div>
              <div className="p-3 text-[10px] text-slate-400">Source: RCSB Database</div>
           </div>

           <div className="absolute top-[360px] left-[50px] w-[200px] bg-[#1e293b] border-2 border-slate-600 rounded-lg shadow-lg pointer-events-auto hover:border-emerald-500 transition">
              <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 rounded-t-md flex items-center justify-between">
                <span className="text-xs font-bold text-white">2. Generate SMILES</span>
                <span className="text-indigo-400">🤖</span>
              </div>
              <div className="p-3 text-[10px] text-slate-400">Model: ChemGPT-3B</div>
           </div>

           <div className="absolute top-[160px] left-[450px] w-[200px] bg-[#1e293b] border-2 border-emerald-500 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] pointer-events-auto">
              <div className="bg-emerald-900/30 px-3 py-2 border-b border-emerald-800 rounded-t-md flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">3. Receptor Prep</span>
                <span className="text-emerald-400">⚙️</span>
              </div>
              <div className="p-3 text-[10px] text-slate-400">Tool: AutoDockTools (MGLTools)</div>
           </div>

           <div className="absolute top-[260px] left-[850px] w-[200px] bg-[#1e293b] border-2 border-slate-600 rounded-lg shadow-lg pointer-events-auto hover:border-emerald-500 transition">
              <div className="bg-slate-800 px-3 py-2 border-b border-slate-700 rounded-t-md flex items-center justify-between">
                <span className="text-xs font-bold text-white">4. Docking Simulation</span>
                <span className="text-amber-400">🧪</span>
              </div>
              <div className="p-3 text-[10px] text-slate-400">Tool: Vina (GPU Accelerated)</div>
           </div>

        </div>

      </div>
    </div>
  );
}
