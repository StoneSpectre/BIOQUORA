import React, { useState, useEffect } from 'react';

export default function BioNetFederatedSearch() {

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
      <div className="max-w-5xl mx-auto mt-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light text-white mb-4">BioNet Global Search</h1>
          <p className="text-slate-500 font-mono text-sm">Query 2,491 institutions, 45M publications, and 12M datasets instantly.</p>
        </div>

        <div className="relative mb-12">
          <input 
            type="text" 
            placeholder="Search for genes, researchers, datasets, or organizations..." 
            className="w-full bg-[#0A1020] border border-slate-700 text-white rounded-full py-4 pl-6 pr-12 text-lg focus:outline-none focus:border-[#4A90E2] shadow-[0_0_15px_rgba(74,144,226,0.1)] transition"
          />
          <button className="absolute right-4 top-4 text-slate-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-mono text-slate-500 mb-4 uppercase">Trending Nodes</h3>
            <div className="space-y-3">
              <div className="p-4 bg-[#0A1020] border border-slate-800 rounded-lg hover:border-slate-600 transition cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded">Dataset</span>
                  <span className="text-slate-200 font-medium">Single-cell atlas of human lung</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Hosted by: Sanger Institute | 1.2 TB</div>
              </div>
              <div className="p-4 bg-[#0A1020] border border-slate-800 rounded-lg hover:border-slate-600 transition cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded">Researcher</span>
                  <span className="text-slate-200 font-medium">Dr. Elena Rostova</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">Expertise: CRISPR, Gene Therapy | UCSF</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A1020] border border-slate-800 rounded-lg p-6 flex flex-col justify-center items-center text-center h-full">
            <div className="w-20 h-20 rounded-full border border-dashed border-slate-600 flex items-center justify-center mb-4">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-white font-medium mb-2">Federated AI Agents</h3>
            <p className="text-sm text-slate-400 mb-4">Deploy an AI agent to search private institutional databases autonomously.</p>
            <button className="px-4 py-2 bg-slate-800 text-slate-200 text-sm font-mono rounded hover:bg-slate-700">Dispatch Agent</button>
          </div>
        </div>
      </div>
    </div>
  );
}
