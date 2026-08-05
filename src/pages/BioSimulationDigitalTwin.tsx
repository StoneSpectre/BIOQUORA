import React, { useState, useEffect } from 'react';

export default function BioSimulationDigitalTwin() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-indigo-500">👤</span> BioTwin Modeler
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Digital representation of patient physiology for clinical scenario exploration and PK/PD modeling.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Patient Profile */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
                 <div className="w-16 h-16 bg-indigo-950/50 border-2 border-indigo-500 rounded-full flex items-center justify-center text-indigo-400 text-xl font-bold mb-4">
                    T1
                 </div>
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Digital Twin: Cohort A</h3>
                 <p className="text-xs text-slate-400 font-sans mb-4">Metabolic profile adjusted for moderate hepatic impairment.</p>
                 
                 <div className="space-y-2 text-xs border-t border-slate-800 pt-4">
                    <div className="flex justify-between">
                       <span className="text-slate-500">CYP3A4 Activity:</span>
                       <span className="text-rose-400">Reduced (-30%)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="text-slate-500">GFR:</span>
                       <span>85 mL/min</span>
                    </div>
                 </div>
              </div>

           </div>

           {/* PK/PD Visualization */}
           <div className="col-span-2 bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 flex flex-col">
              
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                 <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Pharmacokinetic Simulation (IV vs Oral)</h3>
                 <button className="text-xs bg-indigo-600 text-white px-3 py-1 rounded">Update Parameters</button>
              </div>

              {/* Simulated Line Chart Area */}
              <div className="flex-1 relative border-l-2 border-b-2 border-slate-700 mx-8 mb-8 mt-4 flex items-end">
                 
                 {/* Y Axis Label */}
                 <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-500 uppercase font-bold tracking-widest w-32 text-center">Concentration (ng/mL)</div>
                 
                 {/* X Axis Label */}
                 <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Time (Hours)</div>

                 {/* Therapeutic Window Overlay */}
                 <div className="absolute bottom-[20%] w-full h-[40%] bg-emerald-500/10 border-y border-emerald-500/30 flex items-center px-4">
                    <span className="text-[10px] text-emerald-400/50 uppercase font-bold">Therapeutic Window</span>
                 </div>

                 {/* Simulated Curves (using SVG) */}
                 <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    {/* IV Curve */}
                    <path d="M 0 10 Q 50 100, 100 200 T 300 280 L 500 295" stroke="#F43F5E" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke"/>
                    {/* Oral Curve */}
                    <path d="M 0 300 Q 50 150, 150 180 T 400 280 L 500 290" stroke="#6366F1" strokeWidth="3" fill="none" vectorEffect="non-scaling-stroke" strokeDasharray="5,5"/>
                 </svg>

              </div>

              <div className="flex justify-center gap-6 text-xs font-sans mt-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-rose-500 rounded"></div>
                    <span className="text-slate-400">IV Bolus (Standard)</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-indigo-500 rounded"></div>
                    <span className="text-slate-400">Oral Dose (Twin Adjusted)</span>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
