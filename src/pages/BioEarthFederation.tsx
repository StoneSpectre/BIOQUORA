import React, { useState, useEffect } from 'react';

export default function BioEarthFederation() {

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
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-emerald-500">🌍</span> Global Federation Gateway
            </h1>
            <p className="text-slate-400 mt-1">Manage secure, cross-border institutional data synchronization and distributed AI inference.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-700">Audit Logs</button>
             <button className="px-4 py-2 bg-emerald-600 text-white text-sm font-bold rounded-lg shadow hover:bg-emerald-500">Add Federation Node</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Node Status */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg overflow-hidden">
                 <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <div>
                       <h3 className="font-bold text-slate-200">Active Federation Nodes</h3>
                       <p className="text-xs text-slate-400">Real-time status of connected international research organizations.</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-500/50 rounded text-xs font-bold flex items-center gap-2">
                       <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> 4,192 Nodes Online
                    </div>
                 </div>
                 
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="bg-slate-800/30 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-700">
                          <th className="px-6 py-3 font-bold">Institution / Region</th>
                          <th className="px-6 py-3 font-bold">Data Synced</th>
                          <th className="px-6 py-3 font-bold">Federated AI Status</th>
                          <th className="px-6 py-3 font-bold text-right">Latency</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       
                       <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="px-6 py-4">
                             <div className="font-bold text-slate-200">EMBL-EBI</div>
                             <div className="text-xs text-slate-500">Hinxton, United Kingdom 🇬🇧</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-emerald-400 font-bold">14.2 PB</div>
                             <div className="text-[10px] text-slate-500">Genomics / Proteomics</div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 text-xs font-bold rounded border border-emerald-500/30">Active (Training)</span></td>
                          <td className="px-6 py-4 text-right font-mono text-slate-400">12ms</td>
                       </tr>

                       <tr className="border-b border-slate-800 hover:bg-slate-800/50">
                          <td className="px-6 py-4">
                             <div className="font-bold text-slate-200">Broad Institute</div>
                             <div className="text-xs text-slate-500">Cambridge, USA 🇺🇸</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-emerald-400 font-bold">8.4 PB</div>
                             <div className="text-[10px] text-slate-500">Clinical / scRNA-seq</div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 text-xs font-bold rounded border border-emerald-500/30">Active (Inference)</span></td>
                          <td className="px-6 py-4 text-right font-mono text-slate-400">24ms</td>
                       </tr>

                       <tr className="hover:bg-slate-800/50">
                          <td className="px-6 py-4">
                             <div className="font-bold text-slate-200">National University Hospital</div>
                             <div className="text-xs text-slate-500">Singapore 🇸🇬</div>
                          </td>
                          <td className="px-6 py-4">
                             <div className="text-emerald-400 font-bold">1.2 PB</div>
                             <div className="text-[10px] text-slate-500">Public Health / Epidemiology</div>
                          </td>
                          <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-900/30 text-amber-400 text-xs font-bold rounded border border-amber-500/30">Syncing... (45%)</span></td>
                          <td className="px-6 py-4 text-right font-mono text-slate-400">142ms</td>
                       </tr>

                    </tbody>
                 </table>
              </div>

           </div>

           {/* Global Policies & Security */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-gradient-to-br from-slate-800 to-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
                 <h3 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">Global Governance</h3>
                 
                 <div className="space-y-4">
                    <div className="p-3 bg-black/40 border border-slate-700 rounded-lg">
                       <div className="flex justify-between items-start mb-1">
                          <div className="font-bold text-slate-200 text-sm">GDPR Compliance Gateway</div>
                          <span className="text-emerald-400">Enforced</span>
                       </div>
                       <p className="text-xs text-slate-500">Data residency protocols active for all EU nodes. PII masking enabled globally.</p>
                    </div>

                    <div className="p-3 bg-black/40 border border-slate-700 rounded-lg">
                       <div className="flex justify-between items-start mb-1">
                          <div className="font-bold text-slate-200 text-sm">GA4GH Interoperability</div>
                          <span className="text-emerald-400">Active</span>
                       </div>
                       <p className="text-xs text-slate-500">Global Alliance for Genomics and Health standard API formats enforced for data exchange.</p>
                    </div>
                 </div>
              </div>

              <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
                 <h3 className="text-sm font-bold text-slate-200 mb-4 uppercase tracking-wider">Federated AI Training</h3>
                 
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Global Foundation Model v4.2</span>
                       <span className="text-blue-400">74%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-3"><div className="h-full bg-blue-500 w-[74%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div></div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">
                       Training distributed across 412 institutional GPU clusters. No patient data leaves the local edge nodes; only model gradients are aggregated centrally.
                    </p>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
