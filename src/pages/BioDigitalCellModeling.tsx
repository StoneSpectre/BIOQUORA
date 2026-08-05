import React, { useState, useEffect } from 'react';

export default function BioDigitalCellModeling() {

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
          <h1 className="text-lg font-semibold text-white tracking-wide">Digital Cell Framework</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Active Model:</span>
            <span className="font-mono bg-blue-900/40 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">Hepatocyte (CL:0000182)</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-700 text-white text-xs font-mono rounded hover:bg-slate-600 transition">Save Model State</button>
          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs font-mono rounded hover:bg-blue-500 transition shadow-sm flex items-center gap-2">
            <span>⚡</span> Run Cell Simulation
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar: Organelles & Pathways */}
        <div className="w-64 bg-[#1e293b] border-r border-slate-700 flex flex-col z-0">
          <div className="p-4 border-b border-slate-700 bg-[#0f172a]">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cellular Components</h2>
            <input type="text" placeholder="Search organelles, pathways..." className="w-full bg-[#1e293b] border border-slate-600 rounded py-1.5 px-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            
            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Organelles (Nodes)</h3>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-[#0f172a] border border-slate-600 rounded cursor-grab hover:border-blue-500 text-xs">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div> Nucleus
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#0f172a] border border-slate-600 rounded cursor-grab hover:border-blue-500 text-xs">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div> Mitochondrion
                </div>
                <div className="flex items-center gap-2 p-2 bg-[#0f172a] border border-slate-600 rounded cursor-grab hover:border-blue-500 text-xs">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Endoplasmic Reticulum
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Metabolic Pathways</h3>
              <div className="space-y-1">
                <div className="flex justify-between items-center p-2 bg-[#0f172a] border border-slate-600 rounded text-xs cursor-pointer hover:bg-slate-700">
                  <span>Glycolysis</span>
                  <span className="text-blue-400 font-mono text-[10px]">Active</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#0f172a] border border-slate-600 rounded text-xs cursor-pointer hover:bg-slate-700">
                  <span>Oxidative Phosphorylation</span>
                  <span className="text-blue-400 font-mono text-[10px]">Active</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-[#0f172a] border border-slate-600 rounded text-xs cursor-pointer hover:bg-slate-700">
                  <span>Apoptosis</span>
                  <span className="text-slate-500 font-mono text-[10px]">Inactive</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Center: Node Editor Canvas */}
        <div className="flex-1 bg-[#0f172a] relative overflow-hidden flex flex-col">
          
          {/* Canvas Grid Background */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Mock Node Network */}
          <div className="absolute inset-0">
            <svg className="w-full h-full pointer-events-none">
              <path d="M 300 200 C 400 200, 400 350, 500 350" fill="none" stroke="#475569" strokeWidth="3" strokeDasharray="5 5" />
              <path d="M 300 450 C 400 450, 400 350, 500 350" fill="none" stroke="#475569" strokeWidth="3" />
              <path d="M 700 350 C 750 350, 800 250, 850 250" fill="none" stroke="#3b82f6" strokeWidth="4" />
            </svg>
            
            {/* Node 1: Extracellular Signal */}
            <div className="absolute top-[170px] left-[100px] w-[200px] bg-[#1e293b] border-2 border-slate-600 rounded-lg shadow-xl text-xs overflow-hidden cursor-move">
              <div className="bg-slate-700 px-3 py-1.5 font-bold text-white flex justify-between items-center">
                <span>Insulin Receptor</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between text-slate-400"><span>Ligand Conc.</span><span className="font-mono text-white">1.2 nM</span></div>
                <input type="range" className="w-full accent-blue-500" defaultValue="40" />
              </div>
              <div className="bg-slate-800/50 p-1.5 flex justify-end">
                <div className="w-3 h-3 rounded-full bg-slate-400 border-2 border-[#1e293b] translate-x-1.5"></div>
              </div>
            </div>

            {/* Node 2: Mitochondrion */}
            <div className="absolute top-[420px] left-[100px] w-[200px] bg-[#1e293b] border-2 border-orange-500/50 rounded-lg shadow-xl text-xs overflow-hidden cursor-move">
              <div className="bg-orange-900/50 px-3 py-1.5 font-bold text-orange-400 flex justify-between items-center">
                <span>Mitochondrion</span>
                <div className="w-2 h-2 rounded-full bg-orange-400"></div>
              </div>
              <div className="p-3 space-y-2">
                <div className="flex justify-between text-slate-400"><span>ATP Prod.</span><span className="font-mono text-white">High</span></div>
                <div className="flex justify-between text-slate-400"><span>ROS Levels</span><span className="font-mono text-white">Low</span></div>
              </div>
              <div className="bg-slate-800/50 p-1.5 flex justify-end">
                <div className="w-3 h-3 rounded-full bg-slate-400 border-2 border-[#1e293b] translate-x-1.5"></div>
              </div>
            </div>

            {/* Node 3: Cytosolic Kinase Cascade */}
            <div className="absolute top-[320px] left-[500px] w-[200px] bg-[#1e293b] border-2 border-blue-500/50 rounded-lg shadow-xl text-xs overflow-hidden cursor-move">
              <div className="bg-blue-900/50 px-3 py-1.5 font-bold text-blue-400 flex justify-between items-center">
                <span>PI3K/AKT Cascade</span>
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
              </div>
              <div className="flex justify-between absolute -left-1.5 top-1/2 -translate-y-1/2 flex-col gap-8">
                 <div className="w-3 h-3 rounded-full bg-slate-400 border-2 border-[#1e293b]"></div>
                 <div className="w-3 h-3 rounded-full bg-slate-400 border-2 border-[#1e293b]"></div>
              </div>
              <div className="p-3 space-y-2 ml-2">
                <div className="flex justify-between text-slate-400"><span>Phosphorylation</span><span className="font-mono text-emerald-400">78%</span></div>
                <div className="w-full bg-[#0f172a] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[78%]"></div>
                </div>
              </div>
              <div className="bg-slate-800/50 p-1.5 flex justify-end">
                <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-[#1e293b] translate-x-1.5"></div>
              </div>
            </div>
            
            {/* Node 4: Nucleus */}
            <div className="absolute top-[220px] left-[850px] w-[200px] bg-[#1e293b] border-2 border-purple-500/50 rounded-lg shadow-xl text-xs overflow-hidden cursor-move">
              <div className="bg-purple-900/50 px-3 py-1.5 font-bold text-purple-400 flex justify-between items-center">
                <span>Nucleus (Transcription)</span>
                <div className="w-2 h-2 rounded-full bg-purple-400"></div>
              </div>
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-400 border-2 border-[#1e293b]"></div>
              <div className="p-3 space-y-2 ml-2">
                <div className="text-slate-400 mb-1">Active Gene Sets:</div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-1.5 py-0.5 bg-slate-700 rounded text-[9px]">Glycolysis</span>
                  <span className="px-1.5 py-0.5 bg-slate-700 rounded text-[9px]">Lipogenesis</span>
                </div>
              </div>
            </div>

          </div>

          {/* AI Copilot Overlay */}
          <div className="absolute bottom-6 right-6 w-80 bg-[#1e293b]/90 backdrop-blur border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-blue-900/30 p-3 border-b border-blue-900/50 flex items-center gap-2">
              <span className="text-blue-400">✨</span>
              <span className="text-sm font-semibold text-white">Modeling Assistant</span>
            </div>
            <div className="p-4 text-xs text-slate-300 space-y-3">
              <p>Based on recent literature (PMID: 3456789), linking the <span className="text-emerald-400 font-mono">AKT Cascade</span> to <span className="text-purple-400 font-mono">Nucleus (FOXO1 inhibition)</span> improves model accuracy for hepatocyte insulin response.</p>
              <button className="w-full py-1.5 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-600/40 transition">Apply Structural Change</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
