import React, { useState, useEffect } from 'react';

export default function BioSimulationMolecular() {

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
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-sky-500">⚛️</span> Molecular Dynamics Viewer
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Simulating protein-ligand interactions and conformational stability at the atomic scale.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 bg-sky-950/40 text-sky-400 border border-sky-900 rounded font-bold text-xs uppercase">Pause</button>
             <button className="px-4 py-1.5 bg-slate-900 text-slate-400 border border-slate-800 rounded font-bold text-xs uppercase">Export Trajectory</button>
          </div>
        </header>

        <div className="flex gap-8 h-[600px]">
           
           {/* 3D Viewer Pane (Simulated) */}
           <div className="flex-1 bg-[#0a0a0a] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center shadow-inner">
              
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.1)_0,transparent_70%)]"></div>
              
              {/* Abstract 3D Protein Representation */}
              <div className="relative w-96 h-96 animate-pulse">
                 {/* Alpha helices (simulated via rotated rounded divs) */}
                 <div className="absolute top-1/4 left-1/4 w-32 h-6 bg-rose-500/80 rounded-full rotate-45 blur-[1px]"></div>
                 <div className="absolute top-1/2 left-1/2 w-40 h-8 bg-sky-500/80 rounded-full -rotate-12 blur-[1px]"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-24 h-6 bg-emerald-500/80 rounded-full rotate-90 blur-[1px]"></div>
                 
                 {/* Ligand */}
                 <div className="absolute top-[45%] left-[45%] w-10 h-10 bg-yellow-400 rounded-full blur-[2px] shadow-[0_0_30px_rgba(250,204,21,1)]"></div>
                 
                 <div className="absolute top-[40%] left-[55%] text-[8px] text-yellow-400 bg-black/80 px-2 py-0.5 rounded border border-yellow-900">Ligand Binding Pocket</div>
              </div>

              {/* Simulation Timeline Overlay */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4">
                 <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                    <span>0 ns</span>
                    <span className="text-sky-400">45 ns (Current)</span>
                    <span>100 ns</span>
                 </div>
                 <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                    <div className="w-[45%] h-full bg-sky-500"></div>
                 </div>
              </div>
           </div>

           {/* Metrics Panel */}
           <div className="w-80 flex flex-col gap-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Thermodynamic Metrics</h3>
                 
                 <div className="space-y-4 text-xs">
                    <div>
                       <div className="flex justify-between text-slate-400 mb-1">
                          <span>Temperature</span>
                          <span>310 K</span>
                       </div>
                       <div className="w-full h-1 bg-slate-900 rounded-full"><div className="w-3/4 h-full bg-rose-500 rounded-full"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-slate-400 mb-1">
                          <span>RMSD (Stability)</span>
                          <span className="text-emerald-400">1.8 Å</span>
                       </div>
                       <div className="w-full h-1 bg-slate-900 rounded-full"><div className="w-1/4 h-full bg-emerald-500 rounded-full"></div></div>
                    </div>
                    <div>
                       <div className="flex justify-between text-slate-400 mb-1">
                          <span>Binding Affinity (ΔG)</span>
                          <span className="text-sky-400">-8.4 kcal/mol</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 flex-1">
                 <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Simulation Logs</h3>
                 <div className="font-sans text-[10px] text-slate-500 space-y-2 h-40 overflow-y-auto">
                    <p>[04:12:00] Equilibration phase complete (NVT/NPT).</p>
                    <p>[04:15:30] Production run started at 310K.</p>
                    <p className="text-sky-400">[04:45:10] Hydrogen bond formation detected at ARG-245.</p>
                    <p>[05:01:22] RMSD stabilization observed.</p>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
