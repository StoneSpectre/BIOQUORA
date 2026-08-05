import React, { useState, useEffect } from 'react';

export default function BioEnterpriseAnalytics() {

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
            <h1 className="text-3xl font-bold text-white tracking-tight mb-1 flex items-center gap-3">
              <span className="text-teal-400">📊</span> Executive Intelligence Dashboard
            </h1>
            <p className="text-slate-400">Real-time financial, infrastructure, and research productivity metrics.</p>
          </div>
          <div className="flex gap-2">
             <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded hover:bg-slate-700">Q1 2026</button>
             <button className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded hover:bg-slate-700">Q2 2026</button>
             <button className="px-3 py-1.5 bg-teal-600 text-white text-xs font-bold rounded shadow hover:bg-teal-500">Q3 2026 (Current)</button>
          </div>
        </header>

        {/* Top Level KPIs */}
        <div className="grid grid-cols-4 gap-6 mb-8">
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total R&D Expenditure</div>
             <div className="text-3xl font-bold text-white mb-2">$42.8M</div>
             <div className="text-xs font-bold text-teal-400">↑ 4.2% vs Last Quarter</div>
           </div>
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Compute Cost (BioCloud)</div>
             <div className="text-3xl font-bold text-white mb-2">$1.2M</div>
             <div className="text-xs font-bold text-rose-400">↑ 12.1% (High GPU Usage)</div>
           </div>
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Publications (BioPublish)</div>
             <div className="text-3xl font-bold text-white mb-2">184</div>
             <div className="text-xs font-bold text-teal-400">↑ 22 High-Impact Journals</div>
           </div>
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
             <div className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Active Clinical Trials</div>
             <div className="text-3xl font-bold text-white mb-2">41</div>
             <div className="text-xs font-bold text-slate-500">Status Quo</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
           
           {/* Cloud Infrastructure Analytics */}
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-sm font-bold text-white mb-6">Infrastructure Utilization (BioCloud)</h3>
              
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">GPU Clusters (A100/H100)</span>
                       <span className="text-rose-400">92% Capacity</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-rose-500 w-[92%] shadow-[0_0_10px_rgba(244,63,94,0.5)]"></div></div>
                    <p className="text-[10px] text-slate-500 mt-1">Primarily driven by Structural Biology Dept (AlphaFold instances).</p>
                 </div>
                 
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Object Storage (Petabytes)</span>
                       <span className="text-teal-400">45% Capacity</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-teal-500 w-[45%]"></div></div>
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Enterprise AI Inference (Tokens)</span>
                       <span className="text-amber-400">78% of Monthly Quota</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[78%]"></div></div>
                 </div>
              </div>
           </div>

           {/* AI Organizational Insights */}
           <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-4 right-4 text-3xl opacity-50">🤖</div>
              <h3 className="text-sm font-bold text-indigo-300 mb-6 uppercase tracking-wider">AI Strategy Insights</h3>
              
              <div className="space-y-4">
                 <div className="p-4 bg-black/20 border border-white/10 rounded-lg text-sm text-slate-300">
                    <strong className="text-white block mb-1">Cost Optimization Alert</strong>
                    GPU usage in the Structural Biology department is highly cyclical. Auto-scaling rules can be adjusted to scale down H100 instances during weekend hours, estimated saving: <span className="text-teal-400 font-bold">$45,000/mo</span>.
                 </div>
                 
                 <div className="p-4 bg-black/20 border border-white/10 rounded-lg text-sm text-slate-300">
                    <strong className="text-white block mb-1">Collaboration Opportunity</strong>
                    BioSearch Analytics detects that the Oncology and Immunology departments are querying the same overlapping scRNA-seq datasets. Creating a federated workspace between them could reduce redundant storage costs.
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
