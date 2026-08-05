import React, { useState, useEffect } from 'react';

export default function BioFederatedTopology() {

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
               <span className="text-indigo-500">🕸️</span> Federation Topology
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Node orchestration, peering status, and connectivity analytics.
            </p>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
           <table className="w-full text-left text-xs text-slate-400 font-sans">
              <thead className="bg-[#111] border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono">
                 <tr>
                    <th className="px-4 py-3">Node ID</th>
                    <th className="px-4 py-3">Institution</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Peers</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-slate-500">N-992A-US</td>
                    <td className="px-4 py-3 text-white">Mayo Clinic</td>
                    <td className="px-4 py-3 text-sky-400">Compute / Inference</td>
                    <td className="px-4 py-3 text-emerald-500">ONLINE</td>
                    <td className="px-4 py-3">14</td>
                 </tr>
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-slate-500">N-104B-EU</td>
                    <td className="px-4 py-3 text-white">CERN Bio</td>
                    <td className="px-4 py-3 text-fuchsia-400">Simulation Hub</td>
                    <td className="px-4 py-3 text-emerald-500">ONLINE</td>
                    <td className="px-4 py-3">42</td>
                 </tr>
                 <tr className="hover:bg-[#111] opacity-50">
                    <td className="px-4 py-3 text-slate-500">N-881C-AP</td>
                    <td className="px-4 py-3 text-white">Tokyo Univ. Med</td>
                    <td className="px-4 py-3 text-amber-400">Data Vault</td>
                    <td className="px-4 py-3 text-rose-500">SYNC_FAIL</td>
                    <td className="px-4 py-3">0</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
