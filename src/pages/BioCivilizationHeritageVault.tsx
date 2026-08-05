import React, { useState, useEffect } from 'react';

export default function BioCivilizationHeritageVault() {

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
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans p-8 flex flex-col items-center">
      
      {/* Vault UI */}
      <div className="max-w-5xl w-full">
        
        <header className="mb-12 text-center mt-8">
          <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-700 mb-4 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
             <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" /></svg>
          </div>
          <h1 className="text-4xl font-black text-white tracking-widest uppercase">The Heritage Vault</h1>
          <p className="text-slate-500 mt-3 text-sm max-w-xl mx-auto">
             Immutable, globally distributed, planet-scale archival of humanity's most significant biomedical achievements. Preserved for future generations.
          </p>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-2 shadow-2xl relative overflow-hidden">
           
           {/* Vault Grid */}
           <div className="bg-[#111] rounded-lg border border-slate-800/50 p-8 min-h-[500px]">
              
              <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                 <div className="flex gap-4">
                    <button className="text-xs font-bold text-white bg-slate-800 px-4 py-2 rounded">All Epochs</button>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-300 px-4 py-2">20th Century</button>
                    <button className="text-xs font-bold text-slate-500 hover:text-slate-300 px-4 py-2">21st Century</button>
                 </div>
                 <div className="text-xs font-mono text-slate-500 flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div> Integrity: 100% Validated
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 
                 {/* Artifact 1 */}
                 <div className="group border border-slate-800 bg-slate-900/50 p-6 rounded-xl hover:border-slate-600 transition cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                       <span className="text-6xl">🧬</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mb-2">ARCHIVE ID: HGP-2003-001</div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">The Human Genome Project</h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                       The complete, high-quality sequence of the human genome. This archive contains the original consensus data, sequencing protocols, and the Bermuda Principles declaration.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Raw Sequence Data</span>
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Historical Protocols</span>
                    </div>
                 </div>

                 {/* Artifact 2 */}
                 <div className="group border border-slate-800 bg-slate-900/50 p-6 rounded-xl hover:border-slate-600 transition cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                       <span className="text-6xl">🦠</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mb-2">ARCHIVE ID: MRNA-2020-042</div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">SARS-CoV-2 mRNA Vaccine Sequence</h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                       The original digital sequence and lipid nanoparticle formulation data for the first authorized mRNA vaccines, demonstrating rapid planetary response to a pandemic pathogen.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Molecular Schematics</span>
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Clinical Trial Data</span>
                    </div>
                 </div>

                 {/* Artifact 3 */}
                 <div className="group border border-slate-800 bg-slate-900/50 p-6 rounded-xl hover:border-slate-600 transition cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                       <span className="text-6xl">🤖</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-500 mb-2">ARCHIVE ID: AF-2024-001</div>
                    <h3 className="text-xl font-bold text-slate-200 mb-2">AlphaFold 3 Architecture</h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                       The model weights, training datasets, and inference code for the AI system that solved the protein folding problem across all of life's molecules.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Model Weights (PB)</span>
                       <span className="text-[9px] uppercase tracking-wider bg-slate-800 text-slate-400 px-2 py-1 rounded">Source Code</span>
                    </div>
                 </div>

              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
