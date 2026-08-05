import React, { useState, useEffect } from 'react';

export default function BioWorkflowMonitor() {

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
               <span className="text-rose-500">📈</span> Execution Monitor
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Real-time telemetry, bottleneck detection, and infrastructure scaling.
            </p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl p-6">
           <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Workflow Bottlenecks</h3>
           
           <table className="w-full text-left text-xs text-slate-400 font-sans">
              <thead className="bg-[#111] border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono">
                 <tr>
                    <th className="px-4 py-3">Workflow ID</th>
                    <th className="px-4 py-3">Blocked Node</th>
                    <th className="px-4 py-3">Wait Time</th>
                    <th className="px-4 py-3">Root Cause</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">WF-1092</td>
                    <td className="px-4 py-3 text-amber-500">Human Approval Gate</td>
                    <td className="px-4 py-3">14h 22m</td>
                    <td className="px-4 py-3 text-slate-500">Pending PI review for Phase 2 funding</td>
                 </tr>
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">WF-1105</td>
                    <td className="px-4 py-3 text-rose-500">BioSimulation-MD</td>
                    <td className="px-4 py-3">45m</td>
                    <td className="px-4 py-3 text-rose-400">GPU Resource Starvation (BioInference cluster full)</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
