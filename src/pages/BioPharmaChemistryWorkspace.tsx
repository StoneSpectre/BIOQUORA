import React, { useState, useEffect } from 'react';

export default function BioPharmaChemistryWorkspace() {

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
          <h1 className="text-lg font-semibold text-white tracking-wide">Medicinal Chemistry Workspace</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono bg-[#1E293B] px-2 py-0.5 rounded border border-slate-700">Project: KRAS Inhibitors (Hit-to-Lead)</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-white text-xs font-mono rounded border border-slate-700 hover:bg-slate-700 transition">Export Series</button>
          <button className="px-3 py-1.5 bg-fuchsia-600 text-white text-xs font-mono rounded hover:bg-fuchsia-500 transition shadow-sm flex items-center gap-2">
            <span>✨</span> AI Generative Design
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1600px] mx-auto w-full">
        
        {/* Left Column: SAR Table & Lead Series */}
        <div className="flex-1 flex flex-col gap-4">
          
          <div className="bg-[#0B1121] border border-slate-800 rounded-xl shadow-lg flex flex-col overflow-hidden flex-1">
            <div className="p-4 border-b border-slate-800 bg-[#020617] flex justify-between items-center">
              <h2 className="text-sm font-semibold text-white">Structure-Activity Relationship (SAR)</h2>
              <div className="flex gap-2">
                 <button className="px-2 py-1 bg-slate-800 text-[10px] uppercase font-bold text-slate-400 rounded border border-slate-700">Add Analog</button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0F172A] text-slate-400 text-xs font-semibold uppercase tracking-wider sticky top-0 border-b border-slate-800 z-10">
                  <tr>
                    <th className="px-4 py-3">Structure</th>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">IC50 (nM)</th>
                    <th className="px-4 py-3">Solubility (µM)</th>
                    <th className="px-4 py-3">hERG (µM)</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  
                  <tr className="hover:bg-slate-800/50 bg-slate-800/30">
                    <td className="px-4 py-2">
                       <div className="w-16 h-12 bg-white rounded flex items-center justify-center p-1">
                         <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M 20 50 L 40 40 L 60 50 L 60 70 L 40 80 L 20 70 Z" fill="none" stroke="#000" strokeWidth="4"/></svg>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-fuchsia-400 font-mono text-xs font-bold">BQ-7842-1 (Lead)</td>
                    <td className="px-4 py-3 text-emerald-400 font-mono text-xs font-bold">12.5</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">85.0</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">&gt; 30</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 text-[10px] rounded border border-emerald-800">Synthesized</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/50">
                    <td className="px-4 py-2">
                       <div className="w-16 h-12 bg-white rounded flex items-center justify-center p-1 relative">
                         <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M 20 50 L 40 40 L 60 50 L 60 70 L 40 80 L 20 70 Z" fill="none" stroke="#000" strokeWidth="4"/><line x1="60" y1="50" x2="80" y2="40" stroke="#000" strokeWidth="4"/></svg>
                         <div className="absolute inset-0 border-2 border-fuchsia-500 rounded"></div>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">BQ-7842-2</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">pending...</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">pending...</td>
                    <td className="px-4 py-3 text-slate-500 font-mono text-xs">pending...</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 text-[10px] rounded border border-blue-800">In Synthesis</span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-800/50 opacity-60">
                    <td className="px-4 py-2">
                       <div className="w-16 h-12 bg-white rounded flex items-center justify-center p-1">
                         <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M 20 50 L 40 40 L 60 50 L 60 70 L 40 80 L 20 70 Z" fill="none" stroke="#000" strokeWidth="4"/><line x1="60" y1="70" x2="80" y2="80" stroke="#000" strokeWidth="4"/></svg>
                       </div>
                    </td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">BQ-7842-3</td>
                    <td className="px-4 py-3 text-rose-400 font-mono text-xs">1540.0</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">12.0</td>
                    <td className="px-4 py-3 text-slate-300 font-mono text-xs">5.2</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded border border-slate-700">Inactive</span>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          {/* R-Group Analysis Plot Stub */}
          <div className="h-64 bg-[#0B1121] border border-slate-800 rounded-xl shadow-lg p-4 flex flex-col">
             <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Multiparameter Optimization (MPO)</h3>
             <div className="flex-1 border border-slate-700 bg-[#020617] rounded flex items-center justify-center text-slate-500 text-xs font-mono">
                [ Radar Chart / Scatter Plot Rendering Engine ]
             </div>
          </div>

        </div>

        {/* Right Column: AI Generative Designer */}
        <div className="w-[400px] flex flex-col gap-4">
          
          <div className="bg-[#0B1121] border border-fuchsia-500/30 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.05)] flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-[#0F172A] flex justify-between items-center">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="text-fuchsia-500">✨</span> Molecule Design Copilot
              </h2>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-5 text-sm">
              
              <div className="bg-[#020617] border border-slate-700 p-4 rounded-lg">
                <p className="text-slate-300 mb-3">Our lead BQ-7842-1 has great potency (12.5 nM) but solubility is borderline (85 µM). Would you like to generate analogs to improve solubility while maintaining the core scaffold?</p>
                <button className="w-full py-1.5 bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-500/30 font-medium text-xs rounded hover:bg-fuchsia-600/40 transition">Generate Analogs (Optimize Solubility)</button>
              </div>

              <div className="border-t border-slate-800 pt-5 space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Proposals (Generated)</h3>
                
                {/* Proposed Molecule */}
                <div className="bg-[#1E293B] border border-slate-700 rounded-lg p-3 group">
                  <div className="flex gap-3">
                    <div className="w-20 h-20 bg-white rounded shrink-0 flex items-center justify-center p-1">
                      <svg viewBox="0 0 100 100" className="w-full h-full"><path d="M 20 50 L 40 40 L 60 50 L 60 70 L 40 80 L 20 70 Z" fill="none" stroke="#000" strokeWidth="4"/><circle cx="80" cy="40" r="10" fill="none" stroke="blue" strokeWidth="2"/></svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white mb-1">Morpholine substitution</div>
                      <div className="text-[10px] text-emerald-400 mb-2">Predicted Sol: +40 µM | IC50: ~15 nM</div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-1 bg-slate-700 text-white text-[10px] rounded hover:bg-slate-600">Add to queue</button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            
            <div className="p-3 border-t border-slate-800 bg-[#020617]">
               <input type="text" placeholder="Suggest modifications..." className="w-full bg-[#0F172A] border border-slate-700 rounded-md py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-fuchsia-500" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
