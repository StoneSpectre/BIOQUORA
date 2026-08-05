import React, { useState, useEffect } from 'react';

export default function BioKnowledgeEvidence() {

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
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-xl text-amber-500">⚖️</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Scientific Reasoning & Evidence Mapper</h1>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="px-3 py-1.5 bg-[#0f172a] border border-slate-700 text-slate-400 rounded">Target Claim: C797S causes Osimertinib resistance</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Claim Analysis */}
        <div className="w-1/3 bg-[#1e293b] border-r border-slate-700 flex flex-col p-6 overflow-y-auto">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Hypothesis / Claim</h2>
          <div className="bg-[#0f172a] border-l-4 border-amber-500 p-4 rounded-r-lg mb-8 shadow-md">
            <h3 className="text-lg font-bold text-white mb-2">The EGFR C797S mutation is the primary mediator of acquired resistance to Osimertinib in NSCLC.</h3>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">AI Confidence Score:</span>
              <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[92%]"></div>
              </div>
              <span className="text-xs font-mono text-white">92%</span>
            </div>
          </div>

          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Reasoning Trace</h2>
          <ol className="relative border-l border-slate-700 ml-3 space-y-6 text-sm">
             <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#1e293b] rounded-full -left-3 ring-4 ring-[#0f172a] border border-slate-500 text-[10px] font-bold text-white">1</span>
                <p className="text-slate-300">Osimertinib binds covalently to the C797 residue in the ATP-binding pocket of EGFR.</p>
                <a href="#" className="text-xs text-blue-400 hover:underline mt-1 inline-block">[PMID: 26027977]</a>
             </li>
             <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#1e293b] rounded-full -left-3 ring-4 ring-[#0f172a] border border-slate-500 text-[10px] font-bold text-white">2</span>
                <p className="text-slate-300">Mutation of Cysteine to Serine (C797S) abrogates this covalent bond formation.</p>
                <a href="#" className="text-xs text-blue-400 hover:underline mt-1 inline-block">[Struct. Analysis, AlphaFold DB]</a>
             </li>
             <li className="pl-6">
                <span className="absolute flex items-center justify-center w-6 h-6 bg-[#1e293b] rounded-full -left-3 ring-4 ring-[#0f172a] border border-emerald-500 text-[10px] font-bold text-emerald-400">3</span>
                <p className="text-slate-300">Clinical sequencing of relapsed patients confirms C797S presence in 15-25% of cases.</p>
                <a href="#" className="text-xs text-blue-400 hover:underline mt-1 inline-block">[PMID: 36123456, BioClinical Cohort X]</a>
             </li>
          </ol>
        </div>

        {/* Right: Evidence Weighting */}
        <div className="flex-1 bg-[#020617] p-8 overflow-y-auto">
          
          {/* Supporting Evidence */}
          <div className="mb-10">
            <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 border-b border-emerald-900/50 pb-2 flex items-center gap-2">
              <span className="text-lg">⊕</span> Supporting Evidence (124 sources)
            </h2>
            <div className="space-y-3">
              <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-xl flex gap-4">
                <div className="w-10 h-10 bg-emerald-900/30 border border-emerald-500/30 rounded flex items-center justify-center text-emerald-400 font-bold shrink-0">0.98</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Direct Clinical Observation (In Vivo)</h4>
                  <p className="text-xs text-slate-400 mt-1">Plasma ctDNA sequencing of 143 patients post-osimertinib progression showed C797S in 22%.</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: Thress et al., 2022</span>
                </div>
              </div>
              <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-xl flex gap-4">
                <div className="w-10 h-10 bg-emerald-900/30 border border-emerald-500/30 rounded flex items-center justify-center text-emerald-400 font-bold shrink-0">0.92</div>
                <div>
                  <h4 className="text-white font-medium text-sm">In Vitro Mutagenesis Screen</h4>
                  <p className="text-xs text-slate-400 mt-1">Ba/F3 cells engineered with Del19/T790M/C797S are highly resistant to osimertinib (IC50 &gt; 1000 nM).</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: Ercan et al., 2021</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contradictory / Nuanced Evidence */}
          <div>
            <h2 className="text-sm font-bold text-rose-400 uppercase tracking-wider mb-4 border-b border-rose-900/50 pb-2 flex items-center gap-2">
              <span className="text-lg">⊖</span> Contradictory / Nuanced Evidence (18 sources)
            </h2>
            <div className="space-y-3">
              <div className="bg-[#1e293b] border border-slate-700 p-4 rounded-xl flex gap-4 opacity-80">
                <div className="w-10 h-10 bg-rose-900/30 border border-rose-500/30 rounded flex items-center justify-center text-rose-400 font-bold shrink-0">0.45</div>
                <div>
                  <h4 className="text-white font-medium text-sm">Alternative Resistance Dominance (MET)</h4>
                  <p className="text-xs text-slate-400 mt-1">In specific Asian cohorts, MET amplification was observed more frequently (30%) than C797S, suggesting population-specific evolutionary trajectories rather than a universal primary mechanism.</p>
                  <span className="text-[10px] text-slate-500 font-mono block mt-2">Source: Lee et al., 2023 (BioClinical Data)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
