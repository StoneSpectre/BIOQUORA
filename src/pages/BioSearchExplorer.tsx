import React, { useState, useEffect } from 'react';

export default function BioSearchExplorer() {

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
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* Top Navbar */}
      <header className="h-14 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-4">
          <span className="text-xl text-teal-500">🧭</span>
          <h1 className="text-lg font-light text-white tracking-widest uppercase">Knowledge Explorer</h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
           Path: Gene → Disease → Clinical Trial
        </div>
      </header>

      {/* Main Graph Canvas Area */}
      <div className="flex-1 relative w-full h-full cursor-grab active:cursor-grabbing">
         
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black opacity-90 pointer-events-none"></div>

         {/* Abstract Flow/Tree Visualization Mockup */}
         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
            
            <path d="M 200 400 C 350 400, 350 200, 500 200" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="3" fill="none" strokeDasharray="5,5" />
            <path d="M 200 400 C 350 400, 350 600, 500 600" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="3" fill="none" />
            
            <path d="M 500 200 C 650 200, 650 150, 800 150" stroke="rgba(244, 63, 94, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 500 200 C 650 200, 650 250, 800 250" stroke="rgba(244, 63, 94, 0.4)" strokeWidth="2" fill="none" />

            <path d="M 500 600 C 650 600, 650 550, 800 550" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 500 600 C 650 600, 650 650, 800 650" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" />

            {/* Level 1: Root Concept */}
            <g transform="translate(200, 400)">
              <rect x="-60" y="-30" width="120" height="60" rx="8" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" className="cursor-pointer hover:fill-purple-900/50" />
              <text x="0" y="5" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">BRAF V600E</text>
              <text x="0" y="20" fill="#a855f7" fontSize="10" textAnchor="middle" className="font-mono uppercase tracking-wider">Mutation</text>
            </g>

            {/* Level 2: Diseases */}
            <g transform="translate(500, 200)">
              <rect x="-70" y="-25" width="140" height="50" rx="25" fill="#4c0519" stroke="#f43f5e" strokeWidth="2" className="cursor-pointer hover:fill-rose-900/50" />
              <text x="0" y="5" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">Melanoma</text>
            </g>
            
            <g transform="translate(500, 600)">
              <rect x="-80" y="-25" width="160" height="50" rx="25" fill="#082f49" stroke="#3b82f6" strokeWidth="2" className="cursor-pointer hover:fill-sky-900/50" />
              <text x="0" y="5" fill="white" fontSize="12" textAnchor="middle" fontWeight="bold">Colorectal Cancer</text>
            </g>

            {/* Level 3: Interventions/Drugs */}
            <g transform="translate(800, 150)">
              <circle cx="0" cy="0" r="20" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="cursor-pointer" />
              <text x="30" y="5" fill="white" fontSize="12">Vemurafenib</text>
            </g>

            <g transform="translate(800, 250)">
              <circle cx="0" cy="0" r="20" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="cursor-pointer" />
              <text x="30" y="5" fill="white" fontSize="12">Dabrafenib</text>
            </g>

            <g transform="translate(800, 550)">
              <circle cx="0" cy="0" r="20" fill="#064e3b" stroke="#10b981" strokeWidth="2" className="cursor-pointer" />
              <text x="30" y="5" fill="white" fontSize="12">Encorafenib + Cetuximab</text>
            </g>
            
         </svg>
      </div>

      {/* Floating Info Panel (Bottom Right) */}
      <div className="absolute right-6 bottom-6 w-80 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-5 z-20">
         <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Selected Node</h3>
         <h2 className="text-lg font-bold text-white mb-1">BRAF V600E → Colorectal Cancer</h2>
         <p className="text-xs text-slate-400 mb-4">Unlike in melanoma, BRAF V600E mutant colorectal cancers exhibit poor response to BRAF inhibitor monotherapy due to feedback activation of EGFR.</p>
         
         <button className="w-full py-2 bg-blue-600 text-white font-bold text-xs rounded hover:bg-blue-500 transition shadow-lg">
           View Clinical Trials (12)
         </button>
      </div>

    </div>
  );
}
