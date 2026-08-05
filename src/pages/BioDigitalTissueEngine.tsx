import React, { useState, useEffect } from 'react';

export default function BioDigitalTissueEngine() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Digital Tissue Engine</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Spatial Map:</span>
            <span className="font-mono bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">Tumor Microenvironment (TME)</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-700 text-white text-xs font-mono rounded hover:bg-slate-600 transition">Import Spatial Transcriptomics</button>
          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-mono rounded hover:bg-emerald-500 transition shadow-sm">Simulate TME Growth (t=30d)</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Cell Populations */}
        <div className="w-72 bg-[#1e293b] border-r border-slate-700 flex flex-col z-0">
          <div className="p-4 border-b border-slate-700 bg-[#0f172a]">
             <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cell Populations</h2>
             <div className="flex gap-2">
                <button className="flex-1 py-1.5 bg-slate-800 border border-slate-600 rounded text-xs hover:text-white">Add Population</button>
             </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Population 1 */}
            <div className="bg-[#0f172a] border border-slate-600 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                  <span className="text-sm font-bold text-white">Tumor Cells</span>
                </div>
                <span className="text-xs font-mono text-slate-400">N=4,520</span>
              </div>
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Proliferation Rate</span><span>High</span></div>
                  <input type="range" className="w-full accent-rose-500 h-1" defaultValue="80" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Apoptosis Threshold</span><span>Low</span></div>
                  <input type="range" className="w-full accent-rose-500 h-1" defaultValue="20" />
                </div>
              </div>
            </div>

            {/* Population 2 */}
            <div className="bg-[#0f172a] border border-slate-600 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]"></div>
                  <span className="text-sm font-bold text-white">CD8+ T-Cells</span>
                </div>
                <span className="text-xs font-mono text-slate-400">N=1,200</span>
              </div>
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Infiltration Rate</span><span>Med</span></div>
                  <input type="range" className="w-full accent-cyan-500 h-1" defaultValue="50" />
                </div>
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>Exhaustion State</span><span>PD-1 High</span></div>
                  <input type="range" className="w-full accent-cyan-500 h-1" defaultValue="75" />
                </div>
              </div>
            </div>

            {/* Population 3 */}
            <div className="bg-[#0f172a] border border-slate-600 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></div>
                  <span className="text-sm font-bold text-white">Fibroblasts (CAFs)</span>
                </div>
                <span className="text-xs font-mono text-slate-400">N=2,150</span>
              </div>
              <div className="space-y-2 mt-3">
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1"><span>ECM Production</span><span>Very High</span></div>
                  <input type="range" className="w-full accent-amber-500 h-1" defaultValue="90" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Center: Spatial Canvas (2D/3D) */}
        <div className="flex-1 bg-black relative overflow-hidden flex items-center justify-center cursor-crosshair">
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] to-black opacity-50"></div>
          
          {/* Abstract Spatial Cellular Map Mockup */}
          <div className="relative w-[600px] h-[600px] rounded-full border border-slate-800 bg-[#0f172a]/40 backdrop-blur-sm overflow-hidden" style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}>
            
            {/* Tumor Core (Dense Rose) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-rose-900/30 blur-2xl"></div>
            
            {/* SVG Scatter Plot representing cells */}
            <svg viewBox="0 0 600 600" className="w-full h-full absolute inset-0">
               {/* Just a few representative dots for mockup */}
               {Array.from({ length: 150 }).map((_, i) => (
                 <circle key={`t-${i}`} cx={300 + (Math.random() - 0.5) * 200} cy={300 + (Math.random() - 0.5) * 200} r="3" fill="#f43f5e" opacity={0.6 + Math.random()*0.4} />
               ))}
               {Array.from({ length: 50 }).map((_, i) => (
                 <circle key={`c-${i}`} cx={300 + (Math.random() - 0.5) * 450} cy={300 + (Math.random() - 0.5) * 450} r="2.5" fill="#06b6d4" opacity={0.8} />
               ))}
               {Array.from({ length: 80 }).map((_, i) => (
                 <circle key={`f-${i}`} cx={300 + (Math.random() - 0.5) * 350} cy={300 + (Math.random() - 0.5) * 350} r="3.5" fill="#f59e0b" opacity={0.5} />
               ))}
               
               {/* Hypoxia Gradient Contour */}
               <path d="M 250 200 Q 400 150 450 300 T 250 450 T 150 300 Z" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="5 5" />
               <text x="300" y="300" fill="rgba(255,255,255,0.3)" fontSize="12" textAnchor="middle">Hypoxic Core</text>
            </svg>
          </div>

          {/* Environmental Gradients Panel */}
          <div className="absolute right-6 top-6 bg-[#1e293b]/80 backdrop-blur border border-slate-700 rounded-lg p-4 w-64 shadow-xl">
             <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Microenvironment</h3>
             <div className="space-y-4 text-xs text-slate-400">
               <div>
                 <div className="flex justify-between mb-1"><span>Oxygen (pO2)</span><span className="font-mono text-white">Gradient</span></div>
                 <div className="h-2 w-full bg-gradient-to-r from-red-900 to-blue-400 rounded"></div>
               </div>
               <div>
                 <div className="flex justify-between mb-1"><span>Drug Penetration</span><span className="font-mono text-white">Low</span></div>
                 <div className="h-2 w-full bg-gradient-to-r from-slate-800 to-emerald-400 rounded"></div>
               </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
