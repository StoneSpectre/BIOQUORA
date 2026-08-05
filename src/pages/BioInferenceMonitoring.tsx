import React, { useState, useEffect } from 'react';

export default function BioInferenceMonitoring() {

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
               <span className="text-rose-500">📈</span> GPU Cluster Telemetry
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Real-time hardware observability, VRAM utilization, and latency optimization.
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-slate-500 uppercase tracking-widest">Global P99 Latency</div>
             <div className="text-xl font-bold text-rose-400">142 ms</div>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
           
           {/* Telemetry Charts */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 h-64 flex flex-col">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">VRAM Utilization (Cluster Alpha)</h3>
                 
                 {/* Simulated Bar Chart for GPUs */}
                 <div className="flex-1 flex items-end justify-around gap-2 px-4 border-b border-slate-800 pb-2">
                    {[85, 92, 45, 98, 70, 88, 95, 60].map((val, i) => (
                       <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                          {/* Tooltip */}
                          <div className="absolute -top-8 bg-black border border-slate-700 text-[10px] px-2 py-1 rounded hidden group-hover:block z-10 whitespace-nowrap">
                             GPU-{i} • {val}% VRAM
                          </div>
                          
                          {/* Bar */}
                          <div className="w-full bg-slate-900 rounded-t flex items-end overflow-hidden" style={{ height: '150px' }}>
                             <div className={`w-full ${val > 90 ? 'bg-rose-500' : 'bg-emerald-500'} rounded-t transition-all`} style={{ height: `${val}%` }}></div>
                          </div>
                          <span className="text-[8px] text-slate-600">GPU-{i}</span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 
                 <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Throughput (Tokens/s)</h3>
                    <div className="text-4xl font-bold text-white mb-2">4.2M</div>
                    <div className="text-xs text-emerald-400 flex items-center gap-1">
                       <span>▲ 12%</span> <span className="text-slate-500 font-sans">from last hour</span>
                    </div>
                 </div>

                 <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Power Draw (kW)</h3>
                    <div className="text-4xl font-bold text-rose-400 mb-2">12.4</div>
                    <div className="text-xs text-rose-500 flex items-center gap-1">
                       <span>▲ Critical Load</span>
                    </div>
                 </div>

              </div>
           </div>

           {/* Optimization Suggestions */}
           <div className="col-span-1">
              
              <div className="bg-[#111] border border-slate-800 rounded-xl p-6 h-full border-t-4 border-t-blue-500">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                    <span className="text-blue-500">⚙️</span> Autotuner Recommendations
                 </h3>
                 
                 <div className="space-y-6">
                    
                    <div>
                       <h4 className="text-xs font-bold text-blue-400 uppercase mb-2">KV Cache Optimization</h4>
                       <p className="text-[10px] text-slate-400 font-sans mb-3">
                          GPU-03 is experiencing VRAM pressure (98%). Enable paged attention for BioFoundation-70B to reduce fragmentation.
                       </p>
                       <button className="w-full bg-blue-900/30 text-blue-400 border border-blue-900 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-blue-900/50">Apply Fix</button>
                    </div>
                    
                    <div className="border-t border-slate-800 pt-6">
                       <h4 className="text-xs font-bold text-rose-400 uppercase mb-2">Batch Size Throttling</h4>
                       <p className="text-[10px] text-slate-400 font-sans mb-3">
                          Latency for BioVision-Rad inference has exceeded 200ms target. Reduce max batch size from 32 to 16.
                       </p>
                       <button className="w-full bg-slate-800 text-slate-300 py-1.5 rounded text-[10px] font-bold uppercase hover:bg-slate-700">Apply Fix</button>
                    </div>

                 </div>

              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
