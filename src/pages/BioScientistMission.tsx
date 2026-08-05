import React, { useState, useEffect } from 'react';

export default function BioScientistMission() {

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
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-xl text-amber-500">🚀</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Research Mission Workspace</h1>
        </div>
        <div className="flex gap-3 text-xs">
           <span className="px-3 py-1.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 rounded font-bold uppercase tracking-wider">Status: Active</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Mission Overview */}
        <div className="w-1/3 bg-[#1e293b] border-r border-slate-700 flex flex-col p-6 overflow-y-auto">
          
          <h2 className="text-2xl font-bold text-white mb-2">Targeting KRAS G12D with novel PROTACs</h2>
          <p className="text-sm text-slate-400 mb-6">Mission Objective: Design, computationally screen, and evaluate candidate PROTAC degraders targeting the KRAS G12D mutation for pancreatic ductal adenocarcinoma (PDAC).</p>
          
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Mission Assets</h3>
          <div className="space-y-3 mb-8">
             <div className="flex items-center justify-between bg-[#0f172a] p-3 rounded border border-slate-700">
               <span className="flex items-center gap-2 text-sm"><span className="text-blue-400">📄</span> Literature Review (142 sources)</span>
               <span className="text-[10px] text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">Up to date</span>
             </div>
             <div className="flex items-center justify-between bg-[#0f172a] p-3 rounded border border-slate-700">
               <span className="flex items-center gap-2 text-sm"><span className="text-purple-400">🧬</span> Structural Models (4 PDBs)</span>
               <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Cached</span>
             </div>
             <div className="flex items-center justify-between bg-[#0f172a] p-3 rounded border border-slate-700">
               <span className="flex items-center gap-2 text-sm"><span className="text-emerald-400">⚙️</span> Docking Workflow</span>
               <span className="text-[10px] text-amber-400 bg-amber-900/20 px-2 py-0.5 rounded border border-amber-800">Pending Approval</span>
             </div>
          </div>

          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">Central Hypotheses</h3>
          <div className="space-y-3">
             <div className="bg-[#0f172a] p-4 rounded-lg border-l-2 border-amber-500 shadow-md">
               <p className="text-sm text-white mb-2">H1: Recruiting VHL E3 ligase will yield more efficient KRAS G12D degradation than CRBN due to spatial orientation in the ternary complex.</p>
               <div className="flex justify-between items-center text-xs">
                 <span className="text-slate-500">Evidence: Supported (Computational)</span>
               </div>
             </div>
          </div>

        </div>

        {/* Right: AI Activity Feed & Approvals */}
        <div className="flex-1 bg-[#020617] p-8 overflow-y-auto">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Recent AI Operations</h2>
          
          <div className="space-y-6">
             
             {/* Feed Item 1: Literature Synthesis */}
             <div className="relative pl-8">
                <span className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full border-4 border-[#020617]"></span>
                <div className="absolute left-1.5 top-4 bottom-[-24px] w-0.5 bg-slate-800"></div>
                <div className="bg-[#1e293b] border border-slate-700 p-5 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold text-sm flex items-center gap-2"><span className="text-blue-400">🤖 Literature Agent</span> <span>Evidence Update</span></h4>
                    <span className="text-xs text-slate-500">2 hours ago</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-3">Synthesized 12 new preprints regarding KRAS G12D PROTACs. Found a conflicting report on VHL vs CRBN efficacy in PDAC cell lines (PMID: 39123456).</p>
                  <button className="text-xs text-blue-400 bg-blue-900/20 border border-blue-800 px-3 py-1.5 rounded hover:bg-blue-900/40">Review Conflict</button>
                </div>
             </div>

             {/* Feed Item 2: Workflow Proposal (Requires Approval) */}
             <div className="relative pl-8">
                <span className="absolute left-0 top-0 w-4 h-4 bg-amber-500 rounded-full border-4 border-[#020617] ring-2 ring-amber-500/50 animate-pulse"></span>
                <div className="bg-[#1e293b] border border-amber-900/50 p-5 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-white font-bold text-sm flex items-center gap-2"><span className="text-amber-400">🤖 Structural Agent</span> <span>Workflow Approval Required</span></h4>
                    <span className="text-xs text-slate-500">10 mins ago</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">Proposed a BioPharma docking workflow: ternary complex formation simulation using AutoDock Vina, focused on the switch II pocket. Estimated compute cost: $14.50. Duration: 4 hours.</p>
                  <div className="flex gap-3">
                     <button className="text-xs font-bold text-white bg-amber-600 px-4 py-2 rounded shadow hover:bg-amber-500">Approve Execution</button>
                     <button className="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-600 px-4 py-2 rounded hover:bg-slate-700">Modify Parameters</button>
                  </div>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
