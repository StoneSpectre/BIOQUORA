import React, { useState, useEffect } from 'react';

export default function BioNetGraph() {

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
      <header className="mb-6 flex justify-between items-center border-b border-slate-800 pb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-wide">Research Knowledge Graph</h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Real-time Visualization | 1.8B Relationships</p>
        </div>
        <div className="flex gap-3">
          <select className="bg-[#0A1020] border border-slate-700 text-sm text-white rounded px-3 py-1">
            <option>View: Collaboration Network</option>
            <option>View: Institutional Trust</option>
            <option>View: Disease & Target Graph</option>
          </select>
        </div>
      </header>

      <div className="flex-1 bg-[#0A1020] border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
        {/* Mock Network Visualization */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, #4A90E2 0%, transparent 60%)'
        }}></div>
        
        <div className="relative z-10 text-center">
          <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(74,144,226,0.2)]">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400"></div>
          </div>
          
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" style={{ zIndex: -1 }}>
            <circle cx="300" cy="300" r="150" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="300" cy="300" r="250" fill="none" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
            {/* Connection lines mock */}
            <path d="M 300 300 L 450 300" stroke="#4A90E2" strokeWidth="2" opacity="0.5" />
            <path d="M 300 300 L 200 150" stroke="#4A90E2" strokeWidth="2" opacity="0.5" />
            <path d="M 300 300 L 150 400" stroke="#4A90E2" strokeWidth="2" opacity="0.5" />
          </svg>

          <h2 className="text-xl text-white font-medium">Interactive Graph Rendering Engine</h2>
          <p className="text-slate-500 mt-2 text-sm max-w-md mx-auto">Connecting Nodes: Researchers, Institutions, Publications, and Datasets. Select a node to expand its federated relationships.</p>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
          <div className="bg-[#050A15]/80 backdrop-blur border border-slate-800 p-3 rounded text-xs font-mono">
            <span className="text-slate-400">Active Nodes:</span> <span className="text-white">12,401</span> | 
            <span className="text-slate-400 ml-2">Edges:</span> <span className="text-white">89,204</span>
          </div>
          <div className="bg-[#050A15]/80 backdrop-blur border border-slate-800 p-3 rounded text-xs flex gap-4">
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Institution</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-purple-400"></div> Researcher</span>
            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400"></div> Dataset</span>
          </div>
        </div>
      </div>
    </div>
  );
}
