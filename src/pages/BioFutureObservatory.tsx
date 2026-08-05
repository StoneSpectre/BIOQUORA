import React, { useState, useEffect } from 'react';

export default function BioFutureObservatory() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 overflow-hidden relative">
      
      {/* Deep Tech Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3 flex items-center justify-center gap-3">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Global Foresight Observatory</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Macro-level visualization of emerging technological trajectories and planetary research momentum.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Tech Radar Mockup */}
           <div className="col-span-2 bg-[#111] border border-slate-800 rounded-2xl shadow-2xl p-8 relative flex flex-col items-center justify-center min-h-[500px]">
              
              <h3 className="absolute top-6 left-8 font-bold text-white uppercase tracking-wider text-sm">Technology Readiness Radar</h3>
              
              {/* Radar Circles */}
              <div className="relative w-[400px] h-[400px] rounded-full border border-slate-700 flex items-center justify-center">
                 <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-700/80"></div>
                 <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-700/60"></div>
                 <div className="absolute w-[100px] h-[100px] rounded-full border border-slate-700/40"></div>
                 
                 {/* Crosshairs */}
                 <div className="absolute w-full h-px bg-slate-800"></div>
                 <div className="absolute h-full w-px bg-slate-800"></div>

                 {/* Data Points */}
                 <div className="absolute top-[20%] left-[30%] flex items-center gap-2 group cursor-pointer">
                    <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse"></div>
                    <span className="text-xs text-slate-300 font-bold group-hover:text-white">Spatial Omics</span>
                 </div>

                 <div className="absolute bottom-[30%] right-[25%] flex items-center gap-2 group cursor-pointer">
                    <div className="w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                    <span className="text-xs text-slate-300 font-bold group-hover:text-white">Brain-Computer Interfaces</span>
                 </div>

                 <div className="absolute top-[60%] left-[15%] flex items-center gap-2 group cursor-pointer">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-bounce"></div>
                    <span className="text-xs text-slate-300 font-bold group-hover:text-white">AI-De Novo Protein Gen.</span>
                 </div>
              </div>

              <div className="absolute bottom-6 left-8 flex gap-6 text-xs text-slate-500 font-bold uppercase">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-700 rounded-full"></div> Horizon 3 (10+ Yrs)</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-700 rounded-full"></div> Horizon 2 (5-10 Yrs)</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-700 rounded-full"></div> Horizon 1 (0-5 Yrs)</div>
              </div>

           </div>

           {/* Metrics & Insights */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#111] border border-slate-800 rounded-2xl p-6 shadow-xl">
                 <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Biomedical Future Index</div>
                 <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">92.4</div>
                 <p className="text-xs text-slate-400 mt-2">Aggregate score measuring global scientific momentum and innovation readiness.</p>
              </div>

              <div className="bg-[#111] border border-slate-800 rounded-2xl p-6 shadow-xl">
                 <h3 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">High-Velocity Trends</h3>
                 
                 <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                       <div>
                          <div className="text-sm font-bold text-slate-200">Autonomous Labs</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Cloud-controlled wet-lab execution</div>
                       </div>
                       <div className="text-emerald-400 text-sm font-bold">↑ 412%</div>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                       <div>
                          <div className="text-sm font-bold text-slate-200">Quantum Simulation</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Molecular dynamics modeling</div>
                       </div>
                       <div className="text-emerald-400 text-sm font-bold">↑ 280%</div>
                    </div>
                    <div className="flex justify-between items-center">
                       <div>
                          <div className="text-sm font-bold text-slate-200">Epigenetic Clocks</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Longevity biomarker tracking</div>
                       </div>
                       <div className="text-emerald-400 text-sm font-bold">↑ 145%</div>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
