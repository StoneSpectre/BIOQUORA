import React, { useState, useEffect } from 'react';

export default function BioFutureScenarioStudio() {

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
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
               <span className="text-cyan-500">🧬</span> Scenario Studio
            </h1>
            <p className="text-slate-500 mt-1">Simulate branching future timelines based on scientific breakthroughs and policy decisions.</p>
          </div>
          <button className="px-4 py-2 bg-cyan-600 text-white text-sm font-bold rounded-lg shadow hover:bg-cyan-500">Run New Simulation</button>
        </header>

        {/* Interactive Scenario Branching (UI Mockup) */}
        <div className="bg-[#111] border border-slate-800 rounded-2xl shadow-2xl p-8 overflow-hidden relative min-h-[600px]">
           
           {/* Background Grid */}
           <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

           <div className="relative z-10 flex flex-col items-center">
              
              {/* Present Day Node */}
              <div className="w-64 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg mb-8 text-center relative z-20">
                 <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">2026 (Present Day)</div>
                 <h3 className="font-bold text-white">AI-Designed Therapeutics</h3>
                 <p className="text-xs text-slate-400 mt-1">Clinical success rate hovering at 14%.</p>
              </div>

              {/* Branching SVG Lines */}
              <svg className="absolute top-[100px] w-full h-[400px] pointer-events-none" style={{ overflow: 'visible' }}>
                 {/* Optimistic Branch */}
                 <path d="M 50% 0 C 50% 100, 20% 100, 20% 200" fill="transparent" stroke="rgba(16,185,129,0.5)" strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
                 {/* Conservative Branch */}
                 <path d="M 50% 0 L 50% 200" fill="transparent" stroke="rgba(148,163,184,0.3)" strokeWidth="2" />
                 {/* Disruptive Branch */}
                 <path d="M 50% 0 C 50% 100, 80% 100, 80% 200" fill="transparent" stroke="rgba(236,72,153,0.5)" strokeWidth="3" />
              </svg>

              {/* Future Nodes */}
              <div className="w-full flex justify-between px-10 mt-[100px] relative z-20">
                 
                 {/* Scenario 1 */}
                 <div className="w-64 bg-emerald-950/40 border border-emerald-900 p-4 rounded-xl shadow-lg backdrop-blur text-center hover:scale-105 transition cursor-pointer">
                    <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">2032 (Optimistic)</div>
                    <h3 className="font-bold text-white">Universal AI Validation</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                       In-silico trials achieve parity with Phase I human trials. FDA establishes regulatory fast-track for AI-validated molecules. Clinical success jumps to 45%.
                    </p>
                    <div className="mt-3 text-[10px] font-bold text-emerald-400">Probability: 24%</div>
                 </div>

                 {/* Scenario 2 */}
                 <div className="w-64 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg text-center hover:scale-105 transition cursor-pointer">
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">2032 (Conservative)</div>
                    <h3 className="font-bold text-white">Incremental Integration</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                       AI assists target discovery, but regulatory agencies require traditional multi-year in-vivo validation. Clinical success rises slightly to 18%.
                    </p>
                    <div className="mt-3 text-[10px] font-bold text-slate-400">Probability: 62%</div>
                 </div>

                 {/* Scenario 3 */}
                 <div className="w-64 bg-pink-950/40 border border-pink-900 p-4 rounded-xl shadow-lg backdrop-blur text-center hover:scale-105 transition cursor-pointer">
                    <div className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2">2030 (Disruptive)</div>
                    <h3 className="font-bold text-white">Quantum AlphaFold</h3>
                    <p className="text-xs text-slate-400 mt-2 line-clamp-3">
                       Early commercial quantum integration allows perfect simulation of protein-ligand dynamics. Traditional wet-labs become largely obsolete for screening.
                    </p>
                    <div className="mt-3 text-[10px] font-bold text-pink-400">Probability: 14%</div>
                 </div>

              </div>
           </div>

           {/* Simulation Parameters Overlay */}
           <div className="absolute bottom-6 left-6 right-6 bg-black/60 border border-slate-800 p-4 rounded-xl backdrop-blur flex justify-between items-center">
              <div>
                 <div className="text-xs font-bold text-slate-400 mb-1">Adjust AI Variables</div>
                 <div className="flex gap-4">
                    <span className="text-sm text-white bg-slate-800 px-3 py-1 rounded">Compute Scalability (Moore's Law)</span>
                    <span className="text-sm text-white bg-slate-800 px-3 py-1 rounded">Regulatory Agility</span>
                 </div>
              </div>
              <button className="px-6 py-2 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-500 transition">Update Model</button>
           </div>
        </div>

      </div>
    </div>
  );
}
