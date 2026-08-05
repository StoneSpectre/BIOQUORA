import React, { useState, useEffect } from 'react';

export default function BioMemoryGovernance() {

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
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-rose-500">🛡️</span> Memory Governance & Privacy
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans max-w-3xl">
             Control encryption, access policies, retention rules, and federated synchronization for all BioMemory assets.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-8">
           
           <div className="space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Encryption Status</h3>
                 <div className="flex items-center justify-between p-4 bg-[#111] border border-rose-900/30 rounded-lg">
                    <div>
                       <div className="text-rose-400 font-bold">End-to-End Encryption</div>
                       <div className="text-xs text-slate-500 font-sans mt-1">AES-256-GCM • Key managed by Institution</div>
                    </div>
                    <div className="w-10 h-6 bg-rose-900 rounded-full relative shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                       <div className="absolute top-1 right-1 w-4 h-4 bg-rose-400 rounded-full"></div>
                    </div>
                 </div>
              </div>

              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Retention Policies</h3>
                 <ul className="space-y-3">
                    <li className="flex justify-between items-center text-sm">
                       <span className="text-slate-400">Personal Memory</span>
                       <span className="px-2 py-1 bg-[#111] border border-slate-700 rounded text-xs">Indefinite (User Controlled)</span>
                    </li>
                    <li className="flex justify-between items-center text-sm border-t border-slate-800 pt-3">
                       <span className="text-slate-400">Project Memory</span>
                       <span className="px-2 py-1 bg-[#111] border border-slate-700 rounded text-xs">Project End + 5 Years</span>
                    </li>
                    <li className="flex justify-between items-center text-sm border-t border-slate-800 pt-3">
                       <span className="text-slate-400">Institutional Audit Logs</span>
                       <span className="px-2 py-1 bg-[#111] border border-slate-700 rounded text-xs">7 Years (Compliance)</span>
                    </li>
                 </ul>
              </div>

           </div>

           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                 Audit Log
              </h3>
              
              <div className="space-y-3">
                 <div className="p-3 bg-[#111] border border-slate-800 rounded text-xs font-sans text-slate-400">
                    <span className="text-slate-500 font-mono mr-2">10:45 AM</span> 
                    <strong>Dr. Sarah Chen</strong> escalated Project Memory node [ID: 8821] to Institutional Shared Knowledge.
                 </div>
                 <div className="p-3 bg-[#111] border border-slate-800 rounded text-xs font-sans text-slate-400">
                    <span className="text-slate-500 font-mono mr-2">09:12 AM</span> 
                    Automated Garbage Collection purged 12 expired temporary agent scratchpads.
                 </div>
                 <div className="p-3 bg-[#111] border border-slate-800 rounded text-xs font-sans text-slate-400">
                    <span className="text-slate-500 font-mono mr-2">08:00 AM</span> 
                    <strong>System</strong> performed daily cryptographic integrity check. <span className="text-emerald-500">Passed</span>.
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
