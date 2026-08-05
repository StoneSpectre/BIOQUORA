import React, { useState, useEffect } from 'react';

export default function BioCoderPipelines() {

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
             <span className="text-orange-500">⛓️</span> Workflow & Pipeline Builder
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Visualizing DAGs (Directed Acyclic Graphs) for bioinformatics pipelines (Nextflow / Snakemake).
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-8 h-[600px] relative overflow-hidden flex flex-col">
           
           <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Variant Calling Pipeline (Nextflow)</h3>
              <div className="flex gap-2">
                 <button className="px-4 py-1.5 bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 rounded text-xs uppercase font-bold">Run Pipeline</button>
              </div>
           </div>

           {/* DAG Visualization Area */}
           <div className="flex-1 relative border border-slate-800 rounded-lg bg-[#050505] p-6 flex flex-col items-center justify-between">
              
              {/* Node 1 */}
              <div className="w-48 p-3 bg-[#111] border border-slate-700 rounded text-center shadow-lg z-10 relative">
                 <div className="text-xs font-bold text-blue-400 uppercase mb-1">FastQC</div>
                 <div className="text-[10px] text-slate-500 font-sans">Quality Control</div>
                 <div className="absolute -right-2 -top-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-black">✓</div>
              </div>

              {/* Edge */}
              <div className="w-0.5 h-12 bg-slate-700 -my-2 z-0"></div>

              {/* Node 2 */}
              <div className="w-48 p-3 bg-[#111] border border-slate-700 rounded text-center shadow-lg z-10">
                 <div className="text-xs font-bold text-purple-400 uppercase mb-1">BWA-MEM</div>
                 <div className="text-[10px] text-slate-500 font-sans">Read Alignment</div>
                 <div className="absolute -right-2 -top-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center text-[8px] text-black">✓</div>
              </div>

              {/* Edge */}
              <div className="w-0.5 h-12 bg-slate-700 -my-2 z-0"></div>

              {/* Node 3 (Running) */}
              <div className="w-48 p-3 bg-orange-950/20 border border-orange-500/50 rounded text-center shadow-[0_0_15px_rgba(249,115,22,0.1)] z-10 relative">
                 <div className="text-xs font-bold text-orange-400 uppercase mb-1">GATK HaplotypeCaller</div>
                 <div className="text-[10px] text-slate-500 font-sans">Variant Calling</div>
                 <div className="absolute -right-2 -top-2 w-4 h-4 bg-orange-500 rounded-full animate-pulse border-2 border-black"></div>
                 
                 {/* Progress Bar */}
                 <div className="w-full h-1 bg-slate-900 rounded-full mt-2">
                    <div className="w-[45%] h-full bg-orange-500 rounded-full"></div>
                 </div>
              </div>

              {/* Edge */}
              <div className="w-0.5 h-12 bg-slate-700 -my-2 z-0"></div>

              {/* Node 4 (Pending) */}
              <div className="w-48 p-3 bg-[#0a0a0a] border border-slate-800 rounded text-center z-10 opacity-50">
                 <div className="text-xs font-bold text-slate-500 uppercase mb-1">VEP</div>
                 <div className="text-[10px] text-slate-600 font-sans">Variant Annotation</div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
