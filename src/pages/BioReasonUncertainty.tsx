import React, { useState, useEffect } from 'react';

export default function BioReasonUncertainty() {

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
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-amber-500">⚖️</span> Uncertainty & Explainability Matrix
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans max-w-3xl">
               Evaluating epistemic uncertainty, known data limitations, and competing hypotheses. Essential for human-in-the-loop scientific oversight.
            </p>
          </div>
        </header>

        <div className="grid grid-cols-2 gap-8">
           
           {/* Qualitative Matrix */}
           <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 pb-2 border-b border-slate-800">Confidence Assessment</h3>
              
              <div className="flex items-center justify-center mb-8">
                 {/* 2x2 Matrix */}
                 <div className="relative w-64 h-64 border border-slate-700 bg-[#0a0a0a]">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-slate-700"></div>
                    <div className="absolute inset-x-0 top-1/2 h-px bg-slate-700"></div>
                    
                    {/* Quadrant Labels */}
                    <div className="absolute top-2 left-2 text-[10px] text-slate-500 uppercase">High Evidence / Low Consensus</div>
                    <div className="absolute top-2 right-2 text-[10px] text-emerald-500 font-bold uppercase">High Evidence / High Consensus</div>
                    <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 uppercase">Low Evidence / Low Consensus</div>
                    <div className="absolute bottom-2 right-2 text-[10px] text-amber-500 uppercase">Low Evidence / High Consensus</div>

                    {/* Data Point */}
                    <div className="absolute top-[30%] right-[30%] w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.8)] animate-pulse"></div>
                    
                    {/* Axis Labels */}
                    <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-slate-400 uppercase tracking-widest">Evidence Quality &rarr;</div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 uppercase tracking-widest">Scientific Consensus &rarr;</div>
                 </div>
              </div>

              <div className="text-center p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-lg">
                 <div className="text-2xl font-bold text-emerald-400 mb-1">87.5%</div>
                 <div className="text-xs text-slate-400 uppercase tracking-widest">Overall Model Confidence</div>
                 <p className="text-xs text-slate-500 font-sans mt-2">Strong consensus in literature; high-quality in vitro evidence available.</p>
              </div>
           </div>

           {/* Explainability Breakdown */}
           <div className="space-y-6">
              
              <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="text-rose-500">⚠</span> Known Limitations
                 </h3>
                 <ul className="space-y-3">
                    <li className="p-3 bg-[#0a0a0a] border border-slate-800 rounded text-sm font-sans text-slate-400">
                       <strong className="text-rose-400 font-mono text-xs uppercase mr-2">In Vitro Bias:</strong> 
                       Over 80% of supporting citations rely on 2D cell cultures. In vivo confirmation is limited.
                    </li>
                    <li className="p-3 bg-[#0a0a0a] border border-slate-800 rounded text-sm font-sans text-slate-400">
                       <strong className="text-rose-400 font-mono text-xs uppercase mr-2">Dose Dependency:</strong> 
                       Mechanism pathway may alter at exceptionally high dosages, as noted in outlier studies.
                    </li>
                 </ul>
              </div>

              <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="text-amber-500">⑂</span> Alternative Hypotheses Evaluated
                 </h3>
                 <div className="space-y-3">
                    <div className="p-3 bg-[#0a0a0a] border border-slate-800 rounded text-sm font-sans text-slate-400">
                       <div className="flex justify-between items-center mb-1">
                          <strong className="text-slate-300">Direct Caspase-3 Cleavage</strong>
                          <span className="text-xs text-amber-500 font-bold bg-amber-950/30 px-2 py-0.5 rounded">Rejected</span>
                       </div>
                       <p className="text-xs">BioReason evaluated the hypothesis that Wnt inhibition directly cleaves Caspase-3. Rejected due to temporal mismatch (cleavage occurs post-Bax activation in 95% of studies).</p>
                    </div>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
