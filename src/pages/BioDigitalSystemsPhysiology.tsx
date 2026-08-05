import React, { useState, useEffect } from 'react';

export default function BioDigitalSystemsPhysiology() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Systems Physiology Simulator</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">System Model:</span>
            <span className="font-mono bg-purple-900/40 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">Cardio-Renal Axis v2.1</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-700 text-white text-xs font-mono rounded hover:bg-slate-600 transition">Load SBML Model</button>
          <button className="px-3 py-1.5 bg-purple-600 text-white text-xs font-mono rounded hover:bg-purple-500 transition shadow-sm">Run Pharmacokinetics (PK)</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left: Organ System Node Graph */}
        <div className="flex-1 bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-700 bg-[#0f172a] flex justify-between items-center z-10">
             <h2 className="text-sm font-semibold text-white">Multi-Organ Interaction Map</h2>
          </div>
          
          <div className="flex-1 relative bg-[#020617]">
             <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
             
             <svg className="w-full h-full absolute inset-0 pointer-events-none">
               {/* Blood Flow / Signaling Edges */}
               <path d="M 200 150 Q 350 150 400 250" fill="none" stroke="#ef4444" strokeWidth="4" strokeDasharray="6 4" opacity="0.6"/>
               <path d="M 400 350 Q 300 450 200 450" fill="none" stroke="#3b82f6" strokeWidth="4" opacity="0.6"/>
               <path d="M 400 300 L 600 300" fill="none" stroke="#f59e0b" strokeWidth="3" opacity="0.6"/>
             </svg>

             {/* Organ Nodes */}
             <div className="absolute top-[100px] left-[100px] w-48 bg-[#1e293b] border-2 border-red-500/50 rounded-lg p-3 shadow-xl cursor-move">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 rounded bg-red-900/50 flex items-center justify-center text-red-400">♥</div>
                 <span className="font-bold text-white text-sm">Heart</span>
               </div>
               <div className="text-[10px] text-slate-400 font-mono space-y-1">
                 <div className="flex justify-between"><span>Cardiac Output</span><span className="text-red-400">5.2 L/min</span></div>
                 <div className="flex justify-between"><span>Blood Pressure</span><span className="text-white">120/80</span></div>
               </div>
             </div>

             <div className="absolute top-[250px] left-[350px] w-48 bg-[#1e293b] border-2 border-purple-500/50 rounded-lg p-3 shadow-xl cursor-move">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 rounded bg-purple-900/50 flex items-center justify-center text-purple-400">🩸</div>
                 <span className="font-bold text-white text-sm">Liver (Hepatic)</span>
               </div>
               <div className="text-[10px] text-slate-400 font-mono space-y-1">
                 <div className="flex justify-between"><span>Clearance Rate</span><span className="text-purple-400">High</span></div>
                 <div className="flex justify-between"><span>CYP3A4 Act.</span><span className="text-white">Normal</span></div>
               </div>
             </div>

             <div className="absolute top-[400px] left-[100px] w-48 bg-[#1e293b] border-2 border-blue-500/50 rounded-lg p-3 shadow-xl cursor-move">
               <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 rounded bg-blue-900/50 flex items-center justify-center text-blue-400">💧</div>
                 <span className="font-bold text-white text-sm">Kidneys (Renal)</span>
               </div>
               <div className="text-[10px] text-slate-400 font-mono space-y-1">
                 <div className="flex justify-between"><span>GFR</span><span className="text-blue-400">90 mL/min</span></div>
                 <div className="flex justify-between"><span>Excretion</span><span className="text-white">Active</span></div>
               </div>
             </div>
          </div>
        </div>

        {/* Right: Simulation Output & Time Series */}
        <div className="w-[450px] flex flex-col gap-4">
          
          {/* Time Series Charts */}
          <div className="flex-1 bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-700 bg-[#0f172a]">
              <h2 className="text-sm font-semibold text-white">PK/PD Trajectories</h2>
            </div>
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
               
               {/* Chart 1 */}
               <div>
                 <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Plasma Concentration (Drug X)</h3>
                 <div className="h-32 bg-[#0f172a] border border-slate-700 rounded relative">
                   <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     {/* Abstract curve */}
                     <path d="M 0 90 Q 20 10 30 20 T 70 80 T 100 95" fill="none" stroke="#a855f7" strokeWidth="2"/>
                     <line x1="0" y1="50" x2="100" y2="50" stroke="#475569" strokeDasharray="2 2" strokeWidth="1"/>
                   </svg>
                   <div className="absolute top-1 right-2 text-[9px] text-slate-500 font-mono">Time (hrs)</div>
                 </div>
               </div>

               {/* Chart 2 */}
               <div>
                 <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Biomarker Response (Target Y)</h3>
                 <div className="h-32 bg-[#0f172a] border border-slate-700 rounded relative">
                   <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                     <path d="M 0 10 Q 30 10 50 70 T 100 80" fill="none" stroke="#10b981" strokeWidth="2"/>
                   </svg>
                 </div>
               </div>

            </div>
          </div>

          {/* Scenario Parameters */}
          <div className="h-64 bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg flex flex-col overflow-hidden">
             <div className="p-3 border-b border-slate-700 bg-[#0f172a]">
               <h3 className="text-xs font-semibold text-slate-300">Scenario Overrides</h3>
             </div>
             <div className="flex-1 p-4 space-y-4 overflow-y-auto">
               <div>
                 <div className="flex justify-between text-xs text-slate-400 mb-1">
                   <span>Patient Age</span><span className="font-mono text-white">65 yrs</span>
                 </div>
                 <input type="range" className="w-full accent-purple-500" min="18" max="90" defaultValue="65" />
               </div>
               <div>
                 <div className="flex justify-between text-xs text-slate-400 mb-1">
                   <span>Renal Impairment (GFR scale)</span><span className="font-mono text-amber-400">Mild</span>
                 </div>
                 <input type="range" className="w-full accent-amber-500" min="0" max="100" defaultValue="75" />
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
