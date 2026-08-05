import React, { useState, useEffect } from 'react';

export default function BioAIHubMarketplace() {

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
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-pink-500">🛍️</span> BioAI Marketplace
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Discover, install, and share biomedical AI plugins, datasets, and agents.
            </p>
          </div>
          <div className="flex gap-4">
             <input type="text" placeholder="Search marketplace..." className="bg-black border border-slate-700 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500 w-64" />
          </div>
        </header>

        <div className="grid grid-cols-3 gap-6">
           
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 hover:border-pink-900/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                 <span className="text-xs bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Dataset</span>
                 <span className="text-slate-500 text-xs">Free</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">TCGA Pancancer Atlas</h3>
              <p className="text-xs text-slate-400 font-sans mb-4">Curated multi-omics dataset from the Cancer Genome Atlas, formatted for BioFoundation training.</p>
              <button className="w-full py-2 bg-[#111] hover:bg-[#222] border border-slate-700 text-white text-xs font-bold rounded uppercase tracking-widest">Install to Workspace</button>
           </div>

           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 hover:border-pink-900/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                 <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Plugin</span>
                 <span className="text-slate-500 text-xs">$49/mo</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">AlphaFold 3 Connector</h3>
              <p className="text-xs text-slate-400 font-sans mb-4">Direct integration with AF3 for high-throughput protein structure prediction in BioWorkflow.</p>
              <button className="w-full py-2 bg-pink-900/30 hover:bg-pink-900/50 border border-pink-800 text-pink-400 text-xs font-bold rounded uppercase tracking-widest">Subscribe</button>
           </div>
           
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 hover:border-pink-900/50 transition-colors">
              <div className="flex justify-between items-start mb-3">
                 <span className="text-xs bg-amber-950 text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Agent</span>
                 <span className="text-slate-500 text-xs">Free (Community)</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">BioAgent: Cheminformatics</h3>
              <p className="text-xs text-slate-400 font-sans mb-4">Specialized agent for SMILES parsing, molecular weight calculation, and ADMET prediction.</p>
              <button className="w-full py-2 bg-[#111] hover:bg-[#222] border border-slate-700 text-white text-xs font-bold rounded uppercase tracking-widest">Install to Workspace</button>
           </div>

        </div>
      </div>
    </div>
  );
}
