import React, { useState, useEffect } from 'react';

export default function BioConnectHub() {

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
        <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">Scientific Hub</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Publications • Datasets • AI Models</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 bg-slate-800 text-xs font-mono text-white rounded border border-slate-700 hover:bg-slate-700">Upload Dataset</button>
            <button className="px-4 py-1.5 bg-[#4A90E2] text-xs font-mono text-white rounded hover:bg-blue-600">Publish Model</button>
          </div>
        </header>

        <div className="mb-6 flex gap-1 border-b border-slate-800">
          <button className="px-4 py-2 text-sm text-[#4A90E2] border-b-2 border-[#4A90E2] font-medium">Trending Models</button>
          <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 font-medium">Recent Datasets</button>
          <button className="px-4 py-2 text-sm text-slate-400 hover:text-slate-200 font-medium">Preprints</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Model Card 1 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-slate-600 transition">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono bg-blue-900/30 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20">Foundation Model</span>
                <span className="text-xs text-slate-500">v2.1.0</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">BioBERT-Clinical-Large</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-3">A large-scale language model pre-trained on MIMIC-III and 4M PubMed abstracts, optimized for clinical entity extraction.</p>
              <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">⬇️ 14.2k Pulls</span>
                <span className="flex items-center gap-1">⭐ 1.2k</span>
              </div>
            </div>
          </div>

          {/* Model Card 2 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-slate-600 transition">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono bg-purple-900/30 text-purple-400 px-2 py-0.5 rounded border border-purple-500/20">Protein Structure</span>
                <span className="text-xs text-slate-500">v1.0.4</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">FoldPredict-Fast</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-3">Lightweight graph neural network for ultra-fast approximation of protein complex structures. Runs on single consumer GPU.</p>
              <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">⬇️ 8.9k Pulls</span>
                <span className="flex items-center gap-1">⭐ 845</span>
              </div>
            </div>
          </div>

          {/* Model Card 3 */}
          <div className="bg-[#0A1020] border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-slate-600 transition">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono bg-emerald-900/30 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">Drug Discovery</span>
                <span className="text-xs text-slate-500">v3.0.0</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">ToxScreen-GNN</h3>
              <p className="text-sm text-slate-400 mb-4 line-clamp-3">Predicts human hepatotoxicity directly from SMILES strings using molecular graph attention networks.</p>
              <div className="mt-auto pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1">⬇️ 5.4k Pulls</span>
                <span className="flex items-center gap-1">⭐ 621</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
