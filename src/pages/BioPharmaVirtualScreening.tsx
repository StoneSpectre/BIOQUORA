import React, { useState, useEffect } from 'react';

export default function BioPharmaVirtualScreening() {

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
          <h1 className="text-lg font-semibold text-white tracking-wide">Virtual Screening Platform</h1>
          <span className="text-xs bg-cyan-900/40 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">BioCloud GPU Cluster (A100)</span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-white text-xs font-mono rounded border border-slate-700 hover:bg-slate-700 transition">Configure Pipeline</button>
          <button className="px-3 py-1.5 bg-cyan-600 text-white text-xs font-mono rounded hover:bg-cyan-500 transition shadow-sm">Launch Screen</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Screening Configuration */}
        <div className="w-80 bg-[#0B1121] border-r border-slate-800 flex flex-col z-0">
          <div className="p-5 border-b border-slate-800 bg-[#020617]">
            <h2 className="text-sm font-bold text-white mb-1">Target: KRAS (G12C)</h2>
            <div className="text-xs text-slate-500 font-mono">PDB: 6OIM (Switch II Pocket)</div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Library Selection</h3>
              <div className="bg-[#0F172A] border border-slate-700 rounded p-3">
                <div className="flex justify-between items-center text-sm text-slate-300 mb-2">
                  <span>Enamine REAL (Filtered)</span>
                  <span className="font-mono text-cyan-400">125,000 cmpds</span>
                </div>
                <button className="w-full py-1.5 border border-slate-600 border-dashed text-slate-500 text-xs rounded hover:text-white transition">Change Library</button>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Screening Pipeline</h3>
              
              <div className="relative pl-4 space-y-4 before:content-[''] before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
                
                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#0B1121]"></div>
                  <div className="text-sm font-medium text-white mb-1">1. Pharmacophore Filter</div>
                  <div className="text-xs text-slate-500">Requires H-bond acceptor at pos (x,y,z)</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-cyan-500 border-2 border-[#0B1121]"></div>
                  <div className="text-sm font-medium text-white mb-1">2. Glide HTVS</div>
                  <div className="text-xs text-slate-500">High-throughput rigid docking</div>
                </div>

                <div className="relative">
                  <div className="absolute -left-[22px] top-1 w-3 h-3 rounded-full bg-slate-700 border-2 border-[#0B1121]"></div>
                  <div className="text-sm font-medium text-slate-400 mb-1">3. Glide SP</div>
                  <div className="text-xs text-slate-500">Standard precision docking (Top 10%)</div>
                </div>
                
              </div>
            </div>

          </div>
        </div>

        {/* Center: 3D Protein-Ligand Viewer */}
        <div className="flex-1 bg-black relative flex flex-col">
          
          {/* Main 3D Canvas Mockup */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center group cursor-crosshair">
            
            {/* Background gradient for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B1121] to-black opacity-80"></div>
            
            {/* Abstract 3D Protein Mesh Mockup */}
            <svg viewBox="0 0 200 200" className="w-96 h-96 absolute z-10 opacity-70" style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.3))' }}>
              {/* Alpha helices (cylinders abstract) */}
              <path d="M 50 150 Q 80 120 70 80 T 110 50" fill="none" stroke="#334155" strokeWidth="15" strokeLinecap="round" />
              <path d="M 60 140 Q 85 110 75 70 T 105 40" fill="none" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
              
              <path d="M 120 160 Q 150 130 130 90 T 160 60" fill="none" stroke="#334155" strokeWidth="15" strokeLinecap="round" />
              
              {/* Beta sheets (arrows abstract) */}
              <path d="M 80 160 L 100 120 L 115 125" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeLinecap="square" />
              <path d="M 90 170 L 110 130 L 125 135" fill="none" stroke="#8b5cf6" strokeWidth="12" strokeLinecap="square" />
              
              {/* Binding Pocket Highlight */}
              <circle cx="105" cy="100" r="25" fill="rgba(6, 182, 212, 0.1)" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" strokeDasharray="4 4"/>
              
              {/* Docked Ligand Mockup */}
              <g transform="translate(95, 90) scale(0.6)">
                <path d="M 0 10 L 15 0 L 30 10 L 30 25 L 15 35 L 0 25 Z" fill="rgba(255,255,255,0.8)" stroke="#fff" strokeWidth="2" />
                <path d="M 30 10 L 45 0" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="50" cy="-5" r="4" fill="#ef4444" />
                <path d="M 15 35 L 15 50" fill="none" stroke="#fff" strokeWidth="2" />
                <circle cx="15" cy="55" r="4" fill="#3b82f6" />
                {/* H-bond interactions */}
                <line x1="50" y1="-5" x2="70" y2="-20" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="15" y1="55" x2="-5" y2="70" stroke="#facc15" strokeWidth="2" strokeDasharray="3 3" />
              </g>
            </svg>
            
            {/* Viewer Controls Overlay */}
            <div className="absolute right-4 top-4 bg-[#0B1121]/80 backdrop-blur border border-slate-700 rounded-lg p-2 flex flex-col gap-2 z-20">
              <button className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 rounded hover:text-white" title="Surface view">S</button>
              <button className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 rounded hover:text-white" title="Cartoon view">C</button>
              <button className="w-8 h-8 flex items-center justify-center bg-[#0F172A] border border-cyan-500/50 text-cyan-400 rounded" title="Ligand interactions">I</button>
            </div>
            
            {/* Context Info Overlay */}
            <div className="absolute left-4 bottom-4 bg-[#0B1121]/80 backdrop-blur border border-slate-700 rounded-lg p-3 z-20">
              <div className="text-xs font-mono text-slate-400 mb-1">Pose 1/15 (Z41258900)</div>
              <div className="text-lg font-bold text-white mb-2">Docking Score: <span className="text-emerald-400">-9.4 kcal/mol</span></div>
              <div className="text-[10px] text-slate-500 flex gap-3">
                <span>H-Bonds: 2</span>
                <span>Pi-Pi Stacking: 1</span>
                <span>RMSD: 1.2Å</span>
              </div>
            </div>

          </div>
          
          {/* Bottom Panel: Screen Results Table */}
          <div className="h-64 bg-[#0B1121] border-t border-slate-800 flex flex-col shrink-0">
            <div className="p-2 border-b border-slate-800 flex justify-between items-center bg-[#020617]">
              <h3 className="text-xs font-semibold text-slate-300">Top Scoring Hits</h3>
              <button className="text-xs text-cyan-400 hover:underline font-medium">Export Hits (CSV)</button>
            </div>
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-[#0F172A] text-slate-400 text-xs font-semibold uppercase tracking-wider sticky top-0 border-b border-slate-800">
                  <tr>
                    <th className="px-4 py-2">Rank</th>
                    <th className="px-4 py-2">Compound ID</th>
                    <th className="px-4 py-2">Docking Score</th>
                    <th className="px-4 py-2">MW</th>
                    <th className="px-4 py-2">LogP</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  <tr className="hover:bg-slate-800/50 cursor-pointer bg-slate-800/30">
                    <td className="px-4 py-2 text-white font-mono text-xs">1</td>
                    <td className="px-4 py-2 text-cyan-400 font-mono text-xs">Z41258900</td>
                    <td className="px-4 py-2 text-emerald-400 font-mono text-xs font-bold">-9.42</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">384.2</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">2.4</td>
                    <td className="px-4 py-2"><button className="text-xs text-slate-400 hover:text-white">View Pose</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 cursor-pointer">
                    <td className="px-4 py-2 text-white font-mono text-xs">2</td>
                    <td className="px-4 py-2 text-cyan-400 font-mono text-xs">Z11029482</td>
                    <td className="px-4 py-2 text-emerald-400 font-mono text-xs font-bold">-8.91</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">412.5</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">3.1</td>
                    <td className="px-4 py-2"><button className="text-xs text-slate-400 hover:text-white">View Pose</button></td>
                  </tr>
                  <tr className="hover:bg-slate-800/50 cursor-pointer">
                    <td className="px-4 py-2 text-white font-mono text-xs">3</td>
                    <td className="px-4 py-2 text-cyan-400 font-mono text-xs">BQ-INT-441</td>
                    <td className="px-4 py-2 text-emerald-400 font-mono text-xs font-bold">-8.75</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">350.1</td>
                    <td className="px-4 py-2 text-slate-400 font-mono text-xs">1.9</td>
                    <td className="px-4 py-2"><button className="text-xs text-slate-400 hover:text-white">View Pose</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
