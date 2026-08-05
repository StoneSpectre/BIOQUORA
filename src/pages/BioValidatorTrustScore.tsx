import React, { useState, useEffect } from 'react';

export default function BioValidatorTrustScore() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8">
      
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-center font-mono">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-emerald-500">✅</span> Explainable Trust Score
            </h1>
            <p className="text-slate-500 mt-2 text-sm">
               Multi-axis validation breakdown for AI-generated scientific reports.
            </p>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-4xl font-bold text-emerald-400">92/100</div>
             <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Overall Confidence</div>
          </div>
        </header>

        <div className="flex gap-8 font-mono">
           
           {/* Radar Chart Area */}
           <div className="flex-1 bg-[#0a0a0a] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative shadow-inner">
              
              <h3 className="absolute top-6 left-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Validation Axis</h3>
              
              {/* Simulated Radar Chart */}
              <div className="relative w-64 h-64 mt-4">
                 
                 {/* Web lines */}
                 <div className="absolute inset-0 border border-slate-700 rounded-full"></div>
                 <div className="absolute inset-[15%] border border-slate-800 rounded-full"></div>
                 <div className="absolute inset-[30%] border border-slate-800 rounded-full"></div>
                 
                 {/* Crosshairs */}
                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-700"></div>
                 <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-700"></div>
                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-700 rotate-45"></div>
                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-slate-700 -rotate-45"></div>

                 {/* Polygon Data Shape */}
                 <svg className="absolute inset-0 w-full h-full text-emerald-500 opacity-40 fill-current stroke-current stroke-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" viewBox="0 0 100 100">
                    <polygon points="50,5 90,30 85,80 50,90 20,70 10,40" />
                 </svg>

                 {/* Labels */}
                 <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold bg-slate-900 px-2 rounded">Citations (95)</span>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-white font-bold bg-slate-900 px-2 rounded">Stats (90)</span>
                 <span className="absolute top-1/2 -left-20 -translate-y-1/2 text-[10px] text-amber-400 font-bold bg-amber-950 px-2 rounded border border-amber-900">Logic (75)</span>
                 <span className="absolute top-1/2 -right-24 -translate-y-1/2 text-[10px] text-white font-bold bg-slate-900 px-2 rounded">Reproducibility (98)</span>

              </div>
           </div>

           {/* Breakdown Panel */}
           <div className="w-96 space-y-4">
              
              <div className="bg-[#111] border border-slate-800 rounded-lg p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Citation Integrity</h4>
                    <span className="text-emerald-400 font-bold">95%</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-sans">14/15 citations validated against PubMed. 1 citation could not be fully verified (preprint).</p>
              </div>

              <div className="bg-[#111] border border-amber-900/50 rounded-lg p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Logical Consistency</h4>
                    <span className="text-amber-400 font-bold">75%</span>
                 </div>
                 <p className="text-[10px] text-amber-200/70 font-sans">Potential contradiction detected: Paragraph 2 suggests inhibition, while conclusion implies activation. Human review recommended.</p>
                 <button className="mt-3 text-[10px] bg-amber-600 text-white px-2 py-1 rounded font-bold">Request Review</button>
              </div>

              <div className="bg-[#111] border border-slate-800 rounded-lg p-4">
                 <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Reproducibility</h4>
                    <span className="text-emerald-400 font-bold">98%</span>
                 </div>
                 <p className="text-[10px] text-slate-400 font-sans">BioCoder pipeline successfully executed in sandbox. Output matches reported results.</p>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
