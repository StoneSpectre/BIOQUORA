import React, { useState, useEffect } from 'react';

export default function BioDigitalSimulationCore() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Multi-Scale Simulation Core</h1>
        </div>
        <div className="flex gap-3 text-xs font-mono">
          <span className="bg-[#0f172a] px-3 py-1.5 rounded border border-slate-700 text-slate-400">Cluster: Active (4 Nodes)</span>
          <button className="px-3 py-1.5 bg-amber-600 text-white rounded hover:bg-amber-500 transition shadow-sm">New Batch Job</button>
        </div>
      </header>

      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          
          <h2 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Active & Recent Simulations</h2>
          
          {/* Active Job Card */}
          <div className="bg-[#1e293b] border border-amber-500/50 rounded-xl p-5 shadow-[0_0_15px_rgba(245,158,11,0.1)] relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1 bg-amber-500 w-[65%] shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-white">TME Spatial Progression (t=100d)</h3>
                  <span className="px-2 py-0.5 bg-amber-900/40 text-amber-400 border border-amber-500/30 text-[10px] rounded animate-pulse">RUNNING</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">Job ID: SIM-99842 • Scale: Tissue • Model: BioDigital_TME_v4</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light text-white font-mono">65%</div>
                <div className="text-xs text-slate-500">Est. completion: 14 mins</div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 bg-[#0f172a] p-4 rounded-lg border border-slate-700 text-sm">
               <div><span className="block text-[10px] text-slate-500 uppercase">Engine</span><span className="font-mono text-slate-300">PhysiCell backend</span></div>
               <div><span className="block text-[10px] text-slate-500 uppercase">Compute Nodes</span><span className="font-mono text-slate-300">2x A100 GPU</span></div>
               <div><span className="block text-[10px] text-slate-500 uppercase">Time Step (dt)</span><span className="font-mono text-slate-300">1.0 min</span></div>
               <div><span className="block text-[10px] text-slate-500 uppercase">Generated Data</span><span className="font-mono text-emerald-400">14.2 GB</span></div>
            </div>
          </div>

          {/* Completed Job Card */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-300">KRAS Signaling Perturbation</h3>
                  <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-[10px] rounded">COMPLETED</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Job ID: SIM-99841 • Scale: Cellular • Model: Hepatic_Network_v1</div>
              </div>
              <button className="px-3 py-1 bg-slate-800 text-white text-xs border border-slate-600 rounded hover:bg-slate-700">View Results</button>
            </div>
          </div>

          {/* Failed Job Card */}
          <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 opacity-70">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-lg font-bold text-slate-400">Cardio-Renal PK/PD Base</h3>
                  <span className="px-2 py-0.5 bg-rose-900/30 text-rose-400 border border-rose-800 text-[10px] rounded">FAILED</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Job ID: SIM-99840 • Error: Non-convergent ODE at t=4.5h</div>
              </div>
              <button className="px-3 py-1 bg-slate-800 text-white text-xs border border-slate-600 rounded hover:bg-slate-700">View Logs</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
