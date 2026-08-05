import React, { useState, useEffect } from 'react';

export default function BioScientistAgents() {

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
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* Top Navbar */}
      <header className="h-14 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20">
        <div className="flex items-center gap-4">
          <span className="text-xl">🏛️</span>
          <h1 className="text-lg font-light text-white tracking-widest uppercase">Agent Council</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded shadow-lg shadow-indigo-500/20">Halt All Agents</button>
        </div>
      </header>

      {/* Main Grid: Multi-Agent Streams */}
      <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-hidden">
         
         {/* Agent 1: Literature */}
         <div className="bg-[#0f172a] border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-xl">
            <div className="bg-[#1e293b] p-3 border-b border-slate-700 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
                 <h3 className="text-sm font-bold text-white">Literature Analyst</h3>
               </div>
               <span className="text-[10px] text-slate-400 font-mono">IDLE (Watching Graph)</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 text-slate-400">
               <div><span className="text-emerald-400">[10:02:14]</span> <span>Indexed 42 new papers from PubMed RSS.</span></div>
               <div><span className="text-emerald-400">[10:02:18]</span> <span>Filtered 3 relevant to KRAS PROTACs.</span></div>
               <div><span className="text-emerald-400">[10:02:25]</span> <span className="text-white">Generated evidence summary for Mission Workspace.</span></div>
               <div className="text-slate-600">Waiting for next event...</div>
            </div>
         </div>

         {/* Agent 2: Bioinformatician */}
         <div className="bg-[#0f172a] border border-blue-900/50 rounded-2xl flex flex-col overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.1)] relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 animate-[pulse_2s_ease-in-out_infinite]"></div>
            <div className="bg-[#1e293b] p-3 border-b border-slate-700 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]"></div>
                 <h3 className="text-sm font-bold text-white">Structural Bioinformatician</h3>
               </div>
               <span className="text-[10px] text-blue-400 font-mono bg-blue-900/30 px-2 py-0.5 rounded">EXECUTING WORKFLOW</span>
            </div>
            <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3 text-slate-300">
               <div><span className="text-blue-400">[10:15:00]</span> <span>Received approval for docking workflow.</span></div>
               <div><span className="text-blue-400">[10:15:02]</span> <span>Provisioning BioCloud GPU node...</span></div>
               <div><span className="text-blue-400">[10:15:45]</span> <span className="text-emerald-400">Node active.</span> <span>Loading PDB: 6OIM (KRAS G12D).</span></div>
               <div><span className="text-blue-400">[10:16:12]</span> <span>Running AutoDock Vina preparation scripts.</span></div>
               <div className="animate-pulse text-indigo-300">Simulating ternary complex orientations... (ETA 3h 45m)</div>
            </div>
         </div>

         {/* Agent 3: Statistician */}
         <div className="bg-[#0f172a] border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-xl opacity-75">
            <div className="bg-[#1e293b] p-3 border-b border-slate-700 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                 <h3 className="text-sm font-bold text-slate-400">Statistical Advisor</h3>
               </div>
               <span className="text-[10px] text-slate-500 font-mono">ASLEEP</span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-xs text-slate-500 font-mono">
               Awaiting data from Structural Bioinformatician to begin analysis plan generation.
            </div>
         </div>

         {/* Agent 4: Writer */}
         <div className="bg-[#0f172a] border border-slate-700 rounded-2xl flex flex-col overflow-hidden shadow-xl opacity-75">
            <div className="bg-[#1e293b] p-3 border-b border-slate-700 flex justify-between items-center shrink-0">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                 <h3 className="text-sm font-bold text-slate-400">Scientific Writer</h3>
               </div>
               <span className="text-[10px] text-slate-500 font-mono">ASLEEP</span>
            </div>
            <div className="flex-1 p-4 flex items-center justify-center text-xs text-slate-500 font-mono">
               Waiting for milestone 3 completion to begin manuscript drafting.
            </div>
         </div>

      </div>
    </div>
  );
}
