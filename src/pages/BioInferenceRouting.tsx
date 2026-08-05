import React, { useState, useEffect } from 'react';

export default function BioInferenceRouting() {

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
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-cyan-500">🔀</span> Model Routing & Federated Edge
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Dynamic workload orchestration prioritizing privacy, latency, and hardware constraints.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 bg-slate-900 text-slate-400 border border-slate-800 rounded font-bold text-xs uppercase">View Policies</button>
             <button className="px-4 py-1.5 bg-cyan-950/40 text-cyan-400 border border-cyan-900 rounded font-bold text-xs uppercase hover:bg-cyan-900/50">Add Edge Node</button>
          </div>
        </header>

        <div className="flex gap-8">
           
           {/* Active Models Table */}
           <div className="flex-1 bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="bg-[#111] border-b border-slate-800 px-6 py-4 flex justify-between items-center">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Active Models</h3>
                 <span className="text-xs text-slate-500">Auto-Scaling: ON</span>
              </div>
              
              <table className="w-full text-left text-sm text-slate-400 font-sans">
                 <thead className="bg-[#050505] border-b border-slate-800 text-xs uppercase tracking-widest text-slate-500 font-bold">
                    <tr>
                       <th className="px-6 py-3">Model</th>
                       <th className="px-6 py-3">Domain</th>
                       <th className="px-6 py-3">Location</th>
                       <th className="px-6 py-3">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800">
                    <tr className="hover:bg-[#111] transition-colors">
                       <td className="px-6 py-4 font-mono font-bold text-slate-200">BioFoundation-70B</td>
                       <td className="px-6 py-4">General / NLP</td>
                       <td className="px-6 py-4"><span className="text-emerald-400 border border-emerald-900/50 px-2 py-0.5 rounded bg-emerald-950/20 text-xs">Cloud (AWS)</span></td>
                       <td className="px-6 py-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Serving</td>
                    </tr>
                    <tr className="hover:bg-[#111] transition-colors">
                       <td className="px-6 py-4 font-mono font-bold text-slate-200">BioVision-Rad</td>
                       <td className="px-6 py-4">Radiology</td>
                       <td className="px-6 py-4"><span className="text-cyan-400 border border-cyan-900/50 px-2 py-0.5 rounded bg-cyan-950/20 text-xs">Federated (Hosp A)</span></td>
                       <td className="px-6 py-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Serving</td>
                    </tr>
                    <tr className="hover:bg-[#111] transition-colors">
                       <td className="px-6 py-4 font-mono font-bold text-slate-200">BioSim-MD</td>
                       <td className="px-6 py-4">Molecular Dynamics</td>
                       <td className="px-6 py-4"><span className="text-orange-400 border border-orange-900/50 px-2 py-0.5 rounded bg-orange-950/20 text-xs">On-Prem (H100)</span></td>
                       <td className="px-6 py-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> Max Load</td>
                    </tr>
                 </tbody>
              </table>
           </div>

           {/* Federated Edge Insights */}
           <div className="w-96 flex flex-col gap-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 flex-1 relative overflow-hidden">
                 
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 relative z-10">Privacy routing</h3>
                 
                 <div className="relative z-10 bg-cyan-950/20 border border-cyan-900/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                       <span className="text-xl">🏥</span>
                       <span className="text-sm font-bold text-cyan-400">Hospital A Node</span>
                    </div>
                    <p className="text-xs text-slate-300 font-sans mb-3">
                       Request contains PHI. Payload routed to secure federated edge node for local inference. Data will not leave hospital network.
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest border-t border-slate-800 pt-3">
                       <span>HIPAA Mode: Active</span>
                       <span className="text-emerald-500">✓ Verified</span>
                    </div>
                 </div>

              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
