import React, { useState, useEffect } from 'react';

export default function BioValidatorProvenance() {

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
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-purple-500">🔗</span> Scientific Audit Trail (Provenance)
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Immutable record of data lineage, human approvals, and AI execution chains.
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-8 relative">
           
           <h3 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-8">Lineage Graph: Report #492-B</h3>

           {/* Vertical Timeline / Provenance Tree */}
           <div className="relative border-l-2 border-slate-800 ml-6 space-y-8 pb-4">
              
              {/* Event 1 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-900 border-2 border-blue-500 rounded-full"></div>
                 <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Data Ingestion</div>
                 <div className="bg-[#111] border border-slate-700 p-4 rounded-lg inline-block w-full max-w-lg">
                    <p className="text-xs text-white mb-2">Ingested scRNA-seq Dataset (GSE123456)</p>
                    <p className="text-[10px] text-slate-500">Source: GEO API • Hash: 9f86d081884c</p>
                 </div>
              </div>

              {/* Event 2 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[11px] top-1 w-5 h-5 bg-purple-900 border-2 border-purple-500 rounded-full"></div>
                 <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">AI Processing (BioCoder)</div>
                 <div className="bg-[#111] border border-slate-700 p-4 rounded-lg inline-block w-full max-w-lg">
                    <p className="text-xs text-white mb-2">Executed differential expression pipeline v2.1</p>
                    <p className="text-[10px] text-slate-500">Agent ID: BioCoder-Analyzer-04 • Container: biocontainers/scanpy:latest</p>
                 </div>
              </div>

              {/* Event 3 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[11px] top-1 w-5 h-5 bg-emerald-900 border-2 border-emerald-500 rounded-full"></div>
                 <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-1">Validation (BioValidator)</div>
                 <div className="bg-[#111] border border-slate-700 p-4 rounded-lg inline-block w-full max-w-lg">
                    <p className="text-xs text-white mb-2">Automatic reproducibility check passed.</p>
                    <p className="text-[10px] text-slate-500">Trust Score: 98/100 • Variance: &lt; 0.01%</p>
                 </div>
              </div>

              {/* Event 4 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[11px] top-1 w-5 h-5 bg-amber-900 border-2 border-amber-500 rounded-full flex items-center justify-center text-[10px] text-white">👤</div>
                 <div className="text-[10px] text-amber-400 font-bold uppercase tracking-widest mb-1">Human Review</div>
                 <div className="bg-amber-950/20 border border-amber-900/50 p-4 rounded-lg inline-block w-full max-w-lg">
                    <p className="text-xs text-white mb-2">Approved by Dr. Sarah Chen</p>
                    <p className="text-[10px] text-amber-200/70 font-sans">"Results align with internal wet-lab validation. Approved for internal publication."</p>
                    <p className="text-[10px] text-slate-500 mt-2">Timestamp: 2026-08-01 14:30:22 UTC • Role: Principal Investigator</p>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
