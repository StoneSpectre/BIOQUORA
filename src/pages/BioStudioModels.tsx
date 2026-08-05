import React, { useState, useEffect } from 'react';

export default function BioStudioModels() {

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
              <span className="text-purple-500">🧠</span> AI Model Studio
            </h1>
            <p className="text-slate-400">Train, fine-tune, and benchmark biomedical foundation models.</p>
          </div>
          <button className="px-4 py-2 bg-purple-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition">
             + New Training Job
          </button>
        </header>

        <div className="grid grid-cols-3 gap-6 mb-8">
           
           {/* Stat Card 1 */}
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-lg">
             <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Active Training Clusters</div>
             <div className="text-3xl font-bold text-white flex items-baseline gap-2">4 <span className="text-sm font-normal text-slate-500">GPUs in use: 32xA100</span></div>
           </div>

           {/* Stat Card 2 */}
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-lg">
             <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Deployed Models</div>
             <div className="text-3xl font-bold text-white flex items-baseline gap-2">12 <span className="text-sm font-normal text-emerald-400">Active APIs</span></div>
           </div>

           {/* Stat Card 3 */}
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 shadow-lg">
             <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Global API Requests (24h)</div>
             <div className="text-3xl font-bold text-white flex items-baseline gap-2">1.4M <span className="text-sm font-normal text-blue-400">+12%</span></div>
           </div>

        </div>

        {/* Training Jobs List */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
           <div className="bg-[#0f172a] border-b border-slate-700 px-6 py-4 flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Recent Training Jobs</h2>
              <span className="text-xs text-slate-400">View All</span>
           </div>

           <div className="divide-y divide-slate-700/50">
             
             {/* Job 1 */}
             <div className="p-6 flex items-center justify-between hover:bg-[#273549] transition">
               <div>
                 <div className="flex items-center gap-3 mb-1">
                   <h3 className="text-white font-bold text-lg">ProtT5-FineTune-KRAS</h3>
                   <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] rounded uppercase font-bold">Protein Language Model</span>
                 </div>
                 <p className="text-sm text-slate-400">Fine-tuning ProtT5 on custom PDAC mutated sequences.</p>
                 <div className="flex gap-4 mt-3 text-xs text-slate-500">
                    <span>Target: BioCloud-GPU-Cluster-1</span>
                    <span>Epochs: 24/50</span>
                 </div>
               </div>
               
               <div className="flex flex-col items-end gap-2">
                 <div className="text-amber-400 font-mono text-sm flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span> Training
                 </div>
                 <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[48%] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                 </div>
                 <span className="text-xs text-slate-500">Loss: 1.432 (Decreasing)</span>
               </div>
             </div>

             {/* Job 2 */}
             <div className="p-6 flex items-center justify-between hover:bg-[#273549] transition">
               <div>
                 <div className="flex items-center gap-3 mb-1">
                   <h3 className="text-white font-bold text-lg">GAT-Binding-Affinity-v2</h3>
                   <span className="px-2 py-0.5 bg-purple-900/30 text-purple-400 border border-purple-800 text-[10px] rounded uppercase font-bold">Graph Neural Network</span>
                 </div>
                 <p className="text-sm text-slate-400">Predicting binding affinity (pIC50) for ternary complexes.</p>
                 <div className="flex gap-4 mt-3 text-xs text-slate-500">
                    <span>Target: BioCloud-GPU-Cluster-2</span>
                    <span>Epochs: 100/100</span>
                 </div>
               </div>
               
               <div className="flex flex-col items-end gap-2">
                 <div className="text-emerald-400 font-mono text-sm flex items-center gap-2">
                   <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Completed
                 </div>
                 <div className="flex gap-2 mt-1">
                   <button className="px-3 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600">View Metrics</button>
                   <button className="px-3 py-1 bg-emerald-600/20 text-emerald-400 border border-emerald-600 text-xs rounded hover:bg-emerald-600/30">Deploy to Endpoint</button>
                 </div>
               </div>
             </div>

           </div>
        </div>

      </div>
    </div>
  );
}
