import React, { useState, useEffect } from 'react';

export default function BioPharmaCompoundLibrary() {

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
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0B1121] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Compound Library Manager</h1>
          <span className="text-xs bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">1.2M Compounds</span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-white text-xs font-mono rounded border border-slate-700 hover:bg-slate-700 transition">Import SD File</button>
          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-mono rounded hover:bg-emerald-500 transition shadow-sm">Substructure Search</button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Filters & Library Selection */}
        <div className="w-64 bg-[#0B1121] border-r border-slate-800 flex flex-col z-0">
          <div className="p-4 border-b border-slate-800">
             <input type="text" placeholder="SMILES / InChI / Name..." className="w-full bg-[#0F172A] border border-slate-700 rounded py-2 px-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Library Source</h3>
              <div className="space-y-1 text-sm">
                <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" defaultChecked className="rounded border-slate-600 bg-[#0F172A] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900" /> Internal Projects (4,520)</label>
                <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" defaultChecked className="rounded border-slate-600 bg-[#0F172A] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900" /> Enamine REAL (1M+)</label>
                <label className="flex items-center gap-2 text-slate-300"><input type="checkbox" className="rounded border-slate-600 bg-[#0F172A] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900" /> ChEMBL FDA Approved (3,124)</label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Physicochemical Filters</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Molecular Weight</span>
                    <span>&lt; 500 Da</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="100" max="1000" defaultValue="500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>LogP (Lipophilicity)</span>
                    <span>&lt; 5.0</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="-2" max="8" defaultValue="5" />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-300"><input type="checkbox" defaultChecked className="rounded border-slate-600 bg-[#0F172A] text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900" /> Lipinski Rule of 5 Compliant</label>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Center: Compound Grid */}
        <div className="flex-1 bg-[#020617] p-6 overflow-y-auto">
          
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-white">Compound Results (124 Matches)</h2>
            <div className="flex gap-2">
              <button className="p-1.5 bg-slate-800 rounded border border-slate-700 text-emerald-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
              </button>
              <button className="p-1.5 bg-[#0F172A] rounded border border-slate-800 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            
            {/* Compound Card 1 */}
            <div className="bg-[#0B1121] border border-slate-700 hover:border-emerald-500 rounded-xl overflow-hidden transition cursor-pointer group shadow-lg">
              <div className="h-40 bg-white p-4 flex items-center justify-center relative">
                 {/* Chemical Structure Mockup (SVG) */}
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-90">
                   <path d="M 30 50 L 45 40 L 60 50 L 60 65 L 45 75 L 30 65 Z" fill="none" stroke="#000" strokeWidth="2" />
                   <path d="M 33 52 L 45 44 L 57 52" fill="none" stroke="#000" strokeWidth="1" />
                   <path d="M 60 50 L 75 40" fill="none" stroke="#000" strokeWidth="2" />
                   <path d="M 75 40 L 85 50 L 85 65 L 75 75 L 60 65" fill="none" stroke="#000" strokeWidth="2" />
                   <text x="73" y="38" fontSize="8" fill="red">O</text>
                   <text x="25" y="52" fontSize="8" fill="blue">HN</text>
                   <path d="M 30 65 L 15 75" fill="none" stroke="#000" strokeWidth="2" />
                   <text x="10" y="80" fontSize="8" fill="red">OH</text>
                 </svg>
                 <div className="absolute top-2 right-2 flex gap-1">
                   <button className="bg-slate-100 text-slate-600 p-1 rounded hover:bg-emerald-100 hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition shadow">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                   </button>
                 </div>
              </div>
              <div className="p-4 border-t border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-white truncate" title="BQ-7842-1">BQ-7842-1</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">Internal</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div><span className="text-slate-500">MW:</span> <span className="text-slate-300">384.2</span></div>
                  <div><span className="text-slate-500">LogP:</span> <span className="text-slate-300">2.4</span></div>
                  <div><span className="text-slate-500">TPSA:</span> <span className="text-slate-300">84.1</span></div>
                  <div><span className="text-slate-500">QED:</span> <span className="text-emerald-400">0.82</span></div>
                </div>
              </div>
            </div>

            {/* Compound Card 2 */}
            <div className="bg-[#0B1121] border border-slate-700 hover:border-emerald-500 rounded-xl overflow-hidden transition cursor-pointer group shadow-lg">
              <div className="h-40 bg-white p-4 flex items-center justify-center relative">
                 <svg viewBox="0 0 100 100" className="w-full h-full opacity-90 transform scale-90">
                   <path d="M 40 40 L 60 40 L 70 55 L 60 70 L 40 70 L 30 55 Z" fill="none" stroke="#000" strokeWidth="2" />
                   <path d="M 42 43 L 58 43" fill="none" stroke="#000" strokeWidth="1" />
                   <path d="M 66 55 L 58 67" fill="none" stroke="#000" strokeWidth="1" />
                   <path d="M 34 55 L 42 67" fill="none" stroke="#000" strokeWidth="1" />
                   <path d="M 70 55 L 85 55" fill="none" stroke="#000" strokeWidth="2" />
                   <path d="M 85 53 L 85 57 M 87 52 L 87 58 M 89 51 L 89 59" stroke="#000" strokeWidth="1" />
                   <text x="92" y="58" fontSize="8" fill="blue">N</text>
                 </svg>
              </div>
              <div className="p-4 border-t border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-bold text-white truncate" title="Z41258900">Z41258900</h3>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700">Enamine</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div><span className="text-slate-500">MW:</span> <span className="text-slate-300">290.1</span></div>
                  <div><span className="text-slate-500">LogP:</span> <span className="text-slate-300">1.8</span></div>
                  <div><span className="text-slate-500">TPSA:</span> <span className="text-slate-300">62.4</span></div>
                  <div><span className="text-slate-500">QED:</span> <span className="text-emerald-400">0.91</span></div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
