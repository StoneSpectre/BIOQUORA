import React, { useState, useEffect } from 'react';

export default function BioSafeAudit() {

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
      
      <div className="max-w-[1200px] mx-auto">
        
        <header className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-yellow-500">📜</span> Immutable Audit Engine
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Cryptographically verifiable logs of all API interactions, access requests, and AI governance approvals.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 bg-yellow-950/40 text-yellow-400 border border-yellow-900 rounded font-bold text-xs uppercase hover:bg-yellow-900/50">Export CSV</button>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
           <div className="bg-[#111] border-b border-slate-800 px-6 py-4 flex justify-between items-center">
              <input type="text" placeholder="Search hash, user, or action..." className="bg-black border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500 w-64" />
           </div>
           
           <table className="w-full text-left text-[10px] text-slate-400 font-mono">
              <thead className="bg-[#050505] border-b border-slate-800 text-slate-500 uppercase tracking-widest">
                 <tr>
                    <th className="px-6 py-3">Timestamp (UTC)</th>
                    <th className="px-6 py-3">User / Service</th>
                    <th className="px-6 py-3">Action Type</th>
                    <th className="px-6 py-3">Resource / Details</th>
                    <th className="px-6 py-3">SHA-256 Hash Signature</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                 <tr className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-3">2026-08-01 10:45:12</td>
                    <td className="px-6 py-3 text-blue-400">admin_mccarthy</td>
                    <td className="px-6 py-3"><span className="text-yellow-400 bg-yellow-950/30 border border-yellow-900 px-1 rounded">POLICY_UPDATE</span></td>
                    <td className="px-6 py-3">Modified Data Egress Rule #44</td>
                    <td className="px-6 py-3 text-slate-600 truncate max-w-[150px]">8f434346648f6b96df89dda901c5176b10a6d839...</td>
                 </tr>
                 <tr className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-3">2026-08-01 10:42:15</td>
                    <td className="px-6 py-3 text-emerald-400">dr_jchen (HMS)</td>
                    <td className="px-6 py-3"><span className="text-emerald-400 bg-emerald-950/30 border border-emerald-900 px-1 rounded">AUTH_SUCCESS</span></td>
                    <td className="px-6 py-3">SSO Login via Institutional IdP</td>
                    <td className="px-6 py-3 text-slate-600 truncate max-w-[150px]">a2c5b366648f6b96df89dda901c5176b10a6d839...</td>
                 </tr>
                 <tr className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-3">2026-08-01 10:38:05</td>
                    <td className="px-6 py-3 text-rose-400">dr_stranger</td>
                    <td className="px-6 py-3"><span className="text-rose-400 bg-rose-950/30 border border-rose-900 px-1 rounded">ACCESS_DENIED</span></td>
                    <td className="px-6 py-3">Attempted access to restricted Clinical Trial Dataset X</td>
                    <td className="px-6 py-3 text-slate-600 truncate max-w-[150px]">c9823346648f6b96df89dda901c5176b10a6d839...</td>
                 </tr>
                 <tr className="hover:bg-[#111] transition-colors">
                    <td className="px-6 py-3">2026-08-01 10:15:00</td>
                    <td className="px-6 py-3 text-fuchsia-400">GovEngine_Service</td>
                    <td className="px-6 py-3"><span className="text-fuchsia-400 bg-fuchsia-950/30 border border-fuchsia-900 px-1 rounded">MODEL_DEPLOY</span></td>
                    <td className="px-6 py-3">BioVision-Rad v2.1 pushed to Production Edge</td>
                    <td className="px-6 py-3 text-slate-600 truncate max-w-[150px]">e10fa346648f6b96df89dda901c5176b10a6d839...</td>
                 </tr>
              </tbody>
           </table>
        </div>

      </div>
    </div>
  );
}
