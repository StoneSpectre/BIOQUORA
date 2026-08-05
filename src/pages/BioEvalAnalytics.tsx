import React, { useState, useEffect } from 'react';

export default function BioEvalAnalytics() {

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
               <span className="text-sky-500">📊</span> Performance Analytics
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Multi-dimensional analysis of Accuracy, Latency, and Cost across inference zones.
            </p>
          </div>
          <div className="text-right">
             <div className="text-[10px] text-slate-500 uppercase tracking-widest">Active Evaluation</div>
             <div className="text-sm font-bold text-sky-400">BioFoundation-70B-v3</div>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-6">
           
           {/* Pareto Frontier: Accuracy vs Latency */}
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 h-80 flex flex-col">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Pareto Frontier: Accuracy vs. Latency</h3>
              
              {/* Simulated Scatter Plot area */}
              <div className="flex-1 border-l border-b border-slate-700 relative ml-4 mb-4">
                 <span className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 tracking-widest uppercase">Accuracy</span>
                 <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 tracking-widest uppercase">Latency (ms)</span>
                 
                 {/* Data Points */}
                 <div className="absolute top-[10%] left-[80%] w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] group cursor-pointer">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-slate-700 text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">70B (Acc: 94%, 180ms)</div>
                 </div>
                 
                 <div className="absolute top-[40%] left-[30%] w-3 h-3 rounded-full bg-emerald-500 group cursor-pointer">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-slate-700 text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">34B Edge (Acc: 88%, 60ms)</div>
                 </div>
                 
                 <div className="absolute top-[70%] left-[10%] w-3 h-3 rounded-full bg-slate-600 group cursor-pointer opacity-50">
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black border border-slate-700 text-[10px] px-2 py-1 rounded hidden group-hover:block whitespace-nowrap z-10">13B Old (Acc: 76%, 30ms)</div>
                 </div>
                 
                 {/* Pareto Line */}
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <path d="M 80% 10% Q 40% 15% 30% 40% Q 20% 60% 10% 70%" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="4,4" />
                 </svg>
              </div>
           </div>

           {/* Cost & Efficiency */}
           <div className="space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 flex items-center justify-between">
                 <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cost per 1K Tokens</h3>
                    <div className="text-3xl font-bold text-white">$0.0014</div>
                 </div>
                 <div className="text-right">
                    <div className="text-xs text-emerald-500 font-bold mb-1">▼ 34%</div>
                    <div className="text-[10px] text-slate-500 font-sans">due to FP8 Quantization</div>
                 </div>
              </div>

              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Improvement Recommendations</h3>
                 
                 <div className="bg-sky-950/20 border border-sky-900/50 p-4 rounded mb-2">
                    <div className="flex gap-2 text-xs font-bold text-sky-400 mb-1">
                       <span>💡</span> <span>Fine-Tuning Target Identified</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-sans">
                       Model consistently fails reasoning tasks involving ternary protein complex stabilization. Suggest running BioEval-Domain-Biophysics dataset on next LoRA tuning pass.
                    </div>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
