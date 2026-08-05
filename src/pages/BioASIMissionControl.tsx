import React, { useState, useEffect } from 'react';

export default function BioASIMissionControl() {

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
               <span className="text-purple-500">🎯</span> Executive Mission Control
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Decompose complex biomedical problems into structured multi-agent research missions.
            </p>
          </div>
          <button className="px-4 py-1.5 bg-purple-950/40 text-purple-400 border border-purple-900 rounded font-bold text-xs uppercase hover:bg-purple-900/50">Declare New Mission</button>
        </header>

        <div className="space-y-6">
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-400 font-sans">
                 <thead className="bg-[#111] border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono">
                    <tr>
                       <th className="px-4 py-3">Mission ID</th>
                       <th className="px-4 py-3">Objective Objective</th>
                       <th className="px-4 py-3">Coordinator</th>
                       <th className="px-4 py-3">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800 font-mono">
                    <tr className="hover:bg-[#111]">
                       <td className="px-4 py-3 text-slate-500">MS-990-ALPHA</td>
                       <td className="px-4 py-3 text-white">Synthesize global evidence for ALK-inhibitor resistance mechanisms</td>
                       <td className="px-4 py-3">BioASI Knowledge OS</td>
                       <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden w-24">
                                <div className="bg-purple-500 h-full w-[70%]"></div>
                             </div>
                             <span className="text-[10px] text-purple-400">70%</span>
                          </div>
                       </td>
                    </tr>
                    <tr className="hover:bg-[#111]">
                       <td className="px-4 py-3 text-slate-500">MS-991-BETA</td>
                       <td className="px-4 py-3 text-white">Execute virtual screen of 100M compounds against novel target</td>
                       <td className="px-4 py-3">BioASI Simulation OS</td>
                       <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                             <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden w-24">
                                <div className="bg-emerald-500 h-full w-[100%]"></div>
                             </div>
                             <span className="text-[10px] text-emerald-500">DONE</span>
                          </div>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
}
