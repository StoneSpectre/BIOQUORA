import React, { useState, useEffect } from 'react';

export default function BioFutureWorkspace() {

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
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-fuchsia-500">🔮</span> Future Intelligence Workspace
            </h1>
            <p className="text-slate-400 mt-1">Strategic command center for horizon scanning, trend analysis, and long-term scientific goal setting.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-900 border border-slate-700 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-800">Review Council Logs</button>
             <button className="px-4 py-2 bg-fuchsia-600 text-white text-sm font-bold rounded-lg shadow hover:bg-fuchsia-500">New Strategic Goal</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Active Strategic Goals */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#111827] border border-slate-800 rounded-xl shadow-lg p-5">
                 <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-4">Active Grand Challenges</h3>
                 
                 <div className="space-y-4">
                    <div className="p-4 bg-slate-900 border border-fuchsia-500/30 rounded-lg relative overflow-hidden group cursor-pointer hover:border-fuchsia-500 transition">
                       <div className="absolute left-0 top-0 w-1 h-full bg-fuchsia-500"></div>
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-sm">Eradicate Antimicrobial Resistance</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">2035 Horizon</span>
                       </div>
                       <p className="text-xs text-slate-400 mb-3">Develop universal phage therapies and AI-designed novel antibiotic classes.</p>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-fuchsia-500 w-[24%]"></div></div>
                    </div>

                    <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-lg relative overflow-hidden group cursor-pointer hover:border-amber-500 transition">
                       <div className="absolute left-0 top-0 w-1 h-full bg-amber-500"></div>
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-white text-sm">Healthy Lifespan Extension (+15y)</h4>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">2040 Horizon</span>
                       </div>
                       <p className="text-xs text-slate-400 mb-3">Reversal of cellular senescence via in-vivo epigenetic reprogramming.</p>
                       <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 w-[12%]"></div></div>
                    </div>
                 </div>
              </div>

              {/* Weak Signal Radar */}
              <div className="bg-[#111827] border border-slate-800 rounded-xl shadow-lg p-5">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">Horizon Scanner</h3>
                    <span className="text-[10px] text-fuchsia-400 font-bold animate-pulse">Scanning...</span>
                 </div>
                 
                 <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200">Quantum Error Correction in Protein Folding</div>
                          <div className="text-[10px] text-slate-500">Signal Strength: Low • Papers: 12</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                       <div className="flex-1">
                          <div className="text-xs font-bold text-slate-200">DNA Data Storage for EHRs</div>
                          <div className="text-[10px] text-slate-500">Signal Strength: Medium • Papers: 84</div>
                       </div>
                    </div>
                 </div>
              </div>

           </div>

           {/* AI Future Council & Recommendations */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-gradient-to-br from-[#111827] to-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg relative overflow-hidden">
                 {/* Decorative background glow */}
                 <div className="absolute top-[-50%] right-[-10%] w-[400px] h-[400px] bg-fuchsia-600/10 rounded-full blur-[80px] pointer-events-none"></div>

                 <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-fuchsia-400">🤖</span> Multi-Agent Future Council Briefing
                 </h3>
                 
                 <div className="space-y-5 relative z-10">
                    
                    <div className="bg-black/40 border border-slate-700/50 p-4 rounded-lg flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-600 text-fuchsia-400 font-bold text-sm">TA</div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-200 mb-1">Trend Analyst</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                             Funding for CRISPR off-target mitigation has plateaued, while investments in Prime Editing have accelerated by 340% YoY. Recommend re-allocating 15% of genomic editing grants toward Prime Editing infrastructure.
                          </p>
                          <div className="mt-2 flex gap-2">
                             <button className="text-[10px] font-bold text-fuchsia-500 hover:text-fuchsia-400">View Evidence</button>
                             <button className="text-[10px] font-bold text-emerald-500 hover:text-emerald-400">Approve Shift</button>
                          </div>
                       </div>
                    </div>

                    <div className="bg-black/40 border border-slate-700/50 p-4 rounded-lg flex gap-4">
                       <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-slate-600 text-amber-400 font-bold text-sm">SA</div>
                       <div>
                          <h4 className="text-sm font-bold text-slate-200 mb-1">Sustainability Advisor</h4>
                          <p className="text-xs text-slate-400 leading-relaxed">
                             Current federated AI model training trajectories project a 400% increase in computational energy draw by 2029. Recommend immediate transition to sparse model architectures and green-grid execution policies.
                          </p>
                          <div className="mt-2 flex gap-2">
                             <button className="text-[10px] font-bold text-fuchsia-500 hover:text-fuchsia-400">Run Impact Scenario</button>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
