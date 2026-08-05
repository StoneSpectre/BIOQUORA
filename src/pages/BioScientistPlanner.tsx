import React, { useState, useEffect } from 'react';

export default function BioScientistPlanner() {

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
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
              <span className="text-blue-500">📅</span> AI Research Planner
            </h1>
            <p className="text-slate-400">Mission: Targeting KRAS G12D with novel PROTACs</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition">
             Regenerate Roadmap
          </button>
        </header>

        {/* Gantt / Milestone View Mockup */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
           
           <div className="grid grid-cols-12 bg-[#0f172a] border-b border-slate-700 text-xs font-bold text-slate-500 uppercase tracking-wider p-4">
             <div className="col-span-4">Phase / Milestone</div>
             <div className="col-span-2 text-center">Owner</div>
             <div className="col-span-2 text-center">Status</div>
             <div className="col-span-4 pl-4">Timeline (Weeks 1-12)</div>
           </div>

           <div className="divide-y divide-slate-700/50">
             
             {/* Phase 1 */}
             <div className="grid grid-cols-12 p-4 items-center hover:bg-[#0f172a]/50 transition">
               <div className="col-span-4">
                 <h4 className="text-white font-bold text-sm mb-1">Phase 1: Knowledge Assembly</h4>
                 <p className="text-xs text-slate-400">Literature synthesis and structural data gathering.</p>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="flex items-center gap-1 text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full border border-blue-800">🤖 LitAgent</span>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="text-xs font-bold text-emerald-400">Completed</span>
               </div>
               <div className="col-span-4 relative h-6 bg-slate-800 rounded-full mx-4 overflow-hidden">
                 <div className="absolute left-0 top-0 bottom-0 w-1/4 bg-emerald-500 rounded-full"></div>
               </div>
             </div>

             {/* Phase 2 */}
             <div className="grid grid-cols-12 p-4 items-center bg-blue-900/10">
               <div className="col-span-4">
                 <h4 className="text-blue-100 font-bold text-sm mb-1">Phase 2: Computational Screening</h4>
                 <p className="text-xs text-blue-300/70">Docking simulations of ternary complexes.</p>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="flex items-center gap-1 text-xs text-amber-400 bg-amber-900/20 px-2 py-1 rounded-full border border-amber-800">🤖 StructAgent</span>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="text-xs font-bold text-blue-400 animate-pulse">In Progress (60%)</span>
               </div>
               <div className="col-span-4 relative h-6 bg-slate-800 rounded-full mx-4 overflow-hidden">
                 <div className="absolute left-[25%] top-0 bottom-0 w-[30%] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
               </div>
             </div>

             {/* Phase 3 */}
             <div className="grid grid-cols-12 p-4 items-center hover:bg-[#0f172a]/50 transition">
               <div className="col-span-4">
                 <h4 className="text-slate-300 font-bold text-sm mb-1">Phase 3: Statistical Evaluation</h4>
                 <p className="text-xs text-slate-500">Analyze binding affinities and rank candidates.</p>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="flex items-center gap-1 text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded-full border border-purple-800">🤖 StatAgent</span>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="text-xs font-bold text-slate-500">Pending Dependency</span>
               </div>
               <div className="col-span-4 relative h-6 bg-slate-800 rounded-full mx-4">
                 <div className="absolute left-[55%] top-0 bottom-0 w-1/5 bg-slate-600 rounded-full opacity-50"></div>
               </div>
             </div>

             {/* Phase 4 */}
             <div className="grid grid-cols-12 p-4 items-center hover:bg-[#0f172a]/50 transition">
               <div className="col-span-4">
                 <h4 className="text-slate-300 font-bold text-sm mb-1">Phase 4: Manuscript Drafting</h4>
                 <p className="text-xs text-slate-500">Auto-generate methods and results sections.</p>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="flex items-center gap-1 text-xs text-rose-400 bg-rose-900/20 px-2 py-1 rounded-full border border-rose-800">🤖 WriteAgent</span>
               </div>
               <div className="col-span-2 flex justify-center">
                 <span className="text-xs font-bold text-slate-500">Planned</span>
               </div>
               <div className="col-span-4 relative h-6 bg-slate-800 rounded-full mx-4">
                 <div className="absolute left-[75%] top-0 bottom-0 w-1/4 bg-slate-600 rounded-full opacity-50"></div>
               </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
}
