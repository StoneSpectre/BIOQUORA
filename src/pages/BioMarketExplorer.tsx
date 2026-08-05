import React, { useState, useEffect } from 'react';

export default function BioMarketExplorer() {

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
    <div className="min-h-screen bg-[#050A15] text-slate-300 p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-light text-white mb-3">BioMarket</h1>
          <p className="text-sm text-slate-500 font-mono">The Global Exchange for Biomedical Knowledge & AI</p>
        </header>

        {/* Global Search */}
        <div className="relative max-w-3xl mx-auto mb-12">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="text-xl">🔍</span>
          </div>
          <input 
            type="text" 
            placeholder="Search for models, datasets, plugins, or workflows..." 
            className="w-full bg-[#0A1020] border-2 border-slate-700 text-white rounded-xl py-4 pl-12 pr-6 text-lg focus:outline-none focus:border-[#4A90E2] shadow-[0_0_20px_rgba(74,144,226,0.1)] transition"
          />
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-12">
          {['🤖 AI Models', '🧬 Datasets', '⚙️ Workspaces', '🧩 Plugins', '🧪 Protocols', '📦 Containers'].map((cat, i) => (
            <button key={i} className="px-5 py-2.5 bg-[#0A1020] border border-slate-700 rounded-full text-sm font-medium hover:bg-slate-800 hover:border-slate-500 transition shadow-sm">
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 flex justify-between items-end border-b border-slate-800 pb-2">
          <h2 className="text-xl text-white font-medium">Trending Foundation Models</h2>
          <button className="text-[#4A90E2] text-sm hover:underline font-mono">View All Models &rarr;</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl overflow-hidden hover:border-[#4A90E2] transition cursor-pointer group shadow-lg">
            <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-mono text-blue-300 border border-blue-500/30">Clinical NLP</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-white group-hover:text-[#4A90E2] transition">BioGPT-v3-Enterprise</h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">Verified</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">Enterprise-grade LLM fine-tuned on 100M electronic health records for clinical decision support.</p>
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>By Stanford Medicine</span>
                <span>⬇️ 1.2M</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl overflow-hidden hover:border-purple-500 transition cursor-pointer group shadow-lg">
            <div className="h-32 bg-gradient-to-r from-purple-900 to-fuchsia-900 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-mono text-purple-300 border border-purple-500/30">Protein Folding</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-white group-hover:text-purple-400 transition">AlphaFold-Omni</h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">Verified</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">Next-generation multi-modal protein folding model predicting complex interactions with ligands.</p>
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>By DeepMind Hub</span>
                <span>⬇️ 845k</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-500 transition cursor-pointer group shadow-lg">
            <div className="h-32 bg-gradient-to-r from-emerald-900 to-teal-900 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
              <div className="absolute bottom-4 left-4">
                <span className="px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-mono text-emerald-300 border border-emerald-500/30">Genomics Dataset</span>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-medium text-white group-hover:text-emerald-400 transition">UK Biobank: Exomes v2</h3>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20">Verified</span>
              </div>
              <p className="text-sm text-slate-400 mb-4 line-clamp-2">Harmonized exome sequencing data for 500,000 individuals with linked phenotypic records.</p>
              <div className="flex justify-between items-center text-xs text-slate-500 font-mono">
                <span>By UKB Consortium</span>
                <span>📦 42 TB</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
