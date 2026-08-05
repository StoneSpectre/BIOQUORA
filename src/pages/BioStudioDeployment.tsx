import React, { useState, useEffect } from 'react';

export default function BioStudioDeployment() {

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
      
      <div className="max-w-5xl mx-auto">
        <header className="mb-8 border-b border-slate-700 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
              <span className="text-sky-500">🚢</span> Continuous Deployment Engine
            </h1>
            <p className="text-slate-400">Automated testing, validation, and release pipelines to BioCloud.</p>
          </div>
          <div className="text-right">
             <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Production Status</div>
             <div className="text-emerald-400 font-bold flex items-center gap-2 justify-end">
               <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span> All Systems Nominal
             </div>
          </div>
        </header>

        {/* Pipeline Visualization Mockup */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 mb-8 shadow-xl">
           <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-bold text-lg">Release: v1.4.2 (GAT API Update)</h2>
              <span className="text-xs font-mono text-slate-500">Commit: f8a9b2c</span>
           </div>
           
           {/* CI/CD Stages */}
           <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-10 right-10 h-1 bg-slate-700 -translate-y-1/2 z-0"></div>
              <div className="absolute top-1/2 left-10 w-[75%] h-1 bg-emerald-500 -translate-y-1/2 z-0 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>

              {/* Stage 1: Source */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">✓</div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-white">Source</div>
                    <div className="text-[10px] text-slate-400">Git Triggered</div>
                 </div>
              </div>

              {/* Stage 2: Build */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">✓</div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-white">Build</div>
                    <div className="text-[10px] text-slate-400">Docker Image Built</div>
                 </div>
              </div>

              {/* Stage 3: Test */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-emerald-900 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xl shadow-[0_0_15px_rgba(16,185,129,0.2)]">✓</div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-white">Test</div>
                    <div className="text-[10px] text-slate-400">142/142 Passed</div>
                 </div>
              </div>

              {/* Stage 4: Deploy (Active) */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-sky-900 border-2 border-sky-400 flex items-center justify-center text-sky-400 text-xl animate-pulse shadow-[0_0_20px_rgba(56,189,248,0.4)]">⚙️</div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-sky-400">Deploy</div>
                    <div className="text-[10px] text-slate-400">Rolling Update: 2/5 Pods</div>
                 </div>
              </div>

              {/* Stage 5: Validation */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-500 text-xl">🛡️</div>
                 <div className="text-center">
                    <div className="text-sm font-bold text-slate-500">Validate</div>
                    <div className="text-[10px] text-slate-500">Pending</div>
                 </div>
              </div>

           </div>
        </div>

        {/* Recent Deployments Table */}
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Deployment History</h3>
        <div className="bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden shadow-lg">
           <table className="w-full text-left text-sm">
             <thead className="bg-[#0f172a] text-slate-400 border-b border-slate-700">
               <tr>
                 <th className="px-6 py-3 font-semibold">Service</th>
                 <th className="px-6 py-3 font-semibold">Environment</th>
                 <th className="px-6 py-3 font-semibold">Version</th>
                 <th className="px-6 py-3 font-semibold">Status</th>
                 <th className="px-6 py-3 font-semibold text-right">Time</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-700/50">
               <tr className="hover:bg-[#273549] transition">
                 <td className="px-6 py-4 font-bold text-white">BioSearch Indexer</td>
                 <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded text-xs border border-purple-800">Production</span></td>
                 <td className="px-6 py-4 font-mono text-xs">v2.1.0</td>
                 <td className="px-6 py-4"><span className="text-emerald-400 flex items-center gap-1">✓ Success</span></td>
                 <td className="px-6 py-4 text-right text-slate-500 text-xs">2 hours ago</td>
               </tr>
               <tr className="hover:bg-[#273549] transition">
                 <td className="px-6 py-4 font-bold text-white">Docking API</td>
                 <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-900/30 text-amber-400 rounded text-xs border border-amber-800">Staging</span></td>
                 <td className="px-6 py-4 font-mono text-xs">v1.0.4-rc2</td>
                 <td className="px-6 py-4"><span className="text-emerald-400 flex items-center gap-1">✓ Success</span></td>
                 <td className="px-6 py-4 text-right text-slate-500 text-xs">Yesterday</td>
               </tr>
               <tr className="hover:bg-[#273549] transition bg-rose-900/10">
                 <td className="px-6 py-4 font-bold text-rose-200">User Dashboard Auth</td>
                 <td className="px-6 py-4"><span className="px-2 py-1 bg-purple-900/30 text-purple-400 rounded text-xs border border-purple-800">Production</span></td>
                 <td className="px-6 py-4 font-mono text-xs">v1.1.2</td>
                 <td className="px-6 py-4"><span className="text-rose-400 flex items-center gap-1">❌ Failed (Rolled Back)</span></td>
                 <td className="px-6 py-4 text-right text-slate-500 text-xs">3 days ago</td>
               </tr>
             </tbody>
           </table>
        </div>

      </div>
    </div>
  );
}
