import React, { useState, useEffect } from 'react';

export default function BioMarketProvenance() {

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
    <div className="min-h-screen bg-[#050A15] text-slate-300 p-8 font-sans flex flex-col">
      <header className="mb-6 border-b border-slate-800 pb-4 shrink-0">
        <h1 className="text-2xl font-semibold text-white tracking-wide">Scientific Provenance Explorer</h1>
        <p className="text-xs text-slate-500 font-mono mt-1">Trace asset lineage, dependencies, and validation history.</p>
      </header>

      <div className="flex-1 bg-[#0A1020] border border-slate-800 rounded-lg relative overflow-hidden flex flex-col">
        {/* Tool bar */}
        <div className="p-3 bg-[#050A15] border-b border-slate-800 flex gap-4 text-xs font-mono text-slate-400 shrink-0">
          <span>Target: <strong className="text-blue-400">BioGPT-v3-Enterprise</strong></span>
          <span>Depth: <strong>3 Levels</strong></span>
        </div>

        {/* Graph Area Mockup */}
        <div className="flex-1 relative flex items-center justify-center p-8">
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #4A90E2 0%, transparent 60%)'
          }}></div>

          <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-4xl">
            
            {/* Top Level: Datasets */}
            <div className="flex justify-center gap-16 w-full">
              <div className="flex flex-col items-center">
                <div className="w-32 p-3 bg-emerald-900/20 border border-emerald-500/50 rounded-lg text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <div className="text-[10px] uppercase text-emerald-400 font-mono mb-1">Dataset</div>
                  <div className="text-sm text-slate-200">MIMIC-IV (Clinical)</div>
                </div>
                <div className="w-px h-12 bg-slate-700 mt-2"></div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-32 p-3 bg-emerald-900/20 border border-emerald-500/50 rounded-lg text-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <div className="text-[10px] uppercase text-emerald-400 font-mono mb-1">Dataset</div>
                  <div className="text-sm text-slate-200">PubMed Abstracts</div>
                </div>
                <div className="w-px h-12 bg-slate-700 mt-2"></div>
              </div>
            </div>

            {/* Mid Level: Training Pipeline */}
            <div className="flex flex-col items-center">
              <div className="w-48 p-3 bg-amber-900/20 border border-amber-500/50 rounded-lg text-center shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                <div className="text-[10px] uppercase text-amber-400 font-mono mb-1">Pipeline Workflow</div>
                <div className="text-sm text-slate-200">LLaMA Pre-training Script</div>
                <div className="text-[10px] text-slate-500 mt-1">Hash: 8f9a2c1b</div>
              </div>
              <div className="w-px h-12 bg-slate-700 mt-2"></div>
            </div>

            {/* Bottom Level: Target Model */}
            <div className="flex flex-col items-center">
              <div className="w-56 p-4 bg-blue-900/30 border-2 border-blue-500 rounded-lg text-center shadow-[0_0_30px_rgba(74,144,226,0.2)]">
                <div className="text-[10px] uppercase text-blue-400 font-mono mb-1">Target Asset (Model)</div>
                <div className="text-base font-medium text-white">BioGPT-v3-Enterprise</div>
              </div>
              <div className="w-px h-12 bg-slate-700 mt-2"></div>
              
              {/* Output Level: Plugin/App */}
              <div className="w-48 p-3 bg-purple-900/20 border border-purple-500/50 rounded-lg text-center shadow-[0_0_15px_rgba(168,85,247,0.1)] mt-2">
                <div className="text-[10px] uppercase text-purple-400 font-mono mb-1">Consuming Plugin</div>
                <div className="text-sm text-slate-200">Clinical Chart Summarizer</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
