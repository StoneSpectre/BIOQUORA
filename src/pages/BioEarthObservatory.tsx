import React, { useState, useEffect } from 'react';

export default function BioEarthObservatory() {

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 border-b border-slate-200 pb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center justify-center gap-3">
             <span className="text-indigo-600">🔭</span> Global Biomedical Observatory
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
             Monitoring planetary-scale AI research trends, breakthrough publications, and open science collaboration metrics.
          </p>
        </header>

        {/* Global Impact Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-10">
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Connected Researchers</div>
              <div className="text-4xl font-bold text-slate-900">2.4M</div>
              <div className="text-xs font-bold text-emerald-600 mt-2">Across 192 Countries</div>
           </div>
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Open Data (Petabytes)</div>
              <div className="text-4xl font-bold text-blue-600">142 PB</div>
              <div className="text-xs font-bold text-slate-500 mt-2">FAIR Compliant Datasets</div>
           </div>
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Cross-Border Collabs</div>
              <div className="text-4xl font-bold text-slate-900">48,192</div>
              <div className="text-xs font-bold text-emerald-600 mt-2">Active Multi-National Projects</div>
           </div>
           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400 rounded-xl p-6 shadow-lg text-center text-white">
              <div className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-2">Earth Collaboration Index</div>
              <div className="text-5xl font-bold mb-1">98.4</div>
              <div className="text-xs font-medium text-indigo-100 mt-1">Planetary Synergy Score</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
           
           {/* Scientific Timeline */}
           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                 <h3 className="font-bold text-slate-800">Global Scientific Timeline (Last 7 Days)</h3>
                 <button className="text-xs text-indigo-600 font-bold">View Full History</button>
              </div>
              <div className="p-6 relative">
                 <div className="absolute left-10 top-6 bottom-6 w-0.5 bg-slate-200"></div>
                 
                 <div className="space-y-6 relative">
                    <div className="flex gap-4">
                       <div className="w-8 h-8 bg-indigo-100 rounded-full border-2 border-white shadow flex items-center justify-center text-indigo-600 text-xs z-10 shrink-0">Today</div>
                       <div>
                          <div className="text-sm font-bold text-slate-800">Novel Malaria Vaccine Candidate Validated</div>
                          <div className="text-xs text-slate-500 mt-1">Multi-national cohort study across 4 African nations completed Phase II. Data federated via BioEarth.</div>
                       </div>
                    </div>
                    
                    <div className="flex gap-4">
                       <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white shadow flex items-center justify-center text-slate-600 text-xs font-bold z-10 shrink-0">2d</div>
                       <div>
                          <div className="text-sm font-bold text-slate-800">AlphaFold 4 Open Sourced</div>
                          <div className="text-xs text-slate-500 mt-1">DeepMind released model weights to the Bioquora Enterprise AI Registry. Adopted by 400+ institutions within 48 hours.</div>
                       </div>
                    </div>

                    <div className="flex gap-4">
                       <div className="w-8 h-8 bg-slate-100 rounded-full border-2 border-white shadow flex items-center justify-center text-slate-600 text-xs font-bold z-10 shrink-0">5d</div>
                       <div>
                          <div className="text-sm font-bold text-slate-800">Global Pathogen Genomic Surveillance Standardized</div>
                          <div className="text-xs text-slate-500 mt-1">WHO and Bioquora finalize real-time sequencing data exchange protocols for emerging zoonotic threats.</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Trend Analytics */}
           <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg p-6">
              <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Emerging Research Momentum</h3>
              
              <div className="space-y-5">
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Spatial Transcriptomics</span>
                       <span className="text-emerald-400">Very High</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[95%]"></div></div>
                    <p className="text-[10px] text-slate-500 mt-1">+140% increase in publications and BioStudio workflows YoY.</p>
                 </div>
                 
                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Space Biology / Microgravity Med</span>
                       <span className="text-blue-400">High Growth</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[65%]"></div></div>
                    <p className="text-[10px] text-slate-500 mt-1">Driven by NASA/ESA Artemis collaboration data dumps.</p>
                 </div>

                 <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-slate-300">Quantum Machine Learning for Pharma</span>
                       <span className="text-purple-400">Emerging</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-purple-500 w-[30%]"></div></div>
                    <p className="text-[10px] text-slate-500 mt-1">Early stage proofs of concept appearing in preprint network.</p>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
