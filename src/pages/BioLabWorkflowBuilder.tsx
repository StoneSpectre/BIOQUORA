import React, { useState, useEffect } from 'react';

export default function BioLabWorkflowBuilder() {

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
    <div className="h-screen bg-[#050A15] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0A1020] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Visual Workflow Builder</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">v1.2 (Unsaved)</span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-xs font-mono text-white rounded border border-slate-700 hover:bg-slate-700">Validate DAG</button>
          <button className="px-3 py-1.5 bg-[#4A90E2] text-white text-xs font-mono rounded hover:bg-blue-600">Save & Export</button>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Components Node Library */}
        <div className="w-64 bg-[#0A1020] border-r border-slate-800 flex flex-col">
          <div className="p-3 border-b border-slate-800">
            <input type="text" placeholder="Search nodes..." className="w-full bg-[#050A15] border border-slate-700 rounded py-1.5 px-3 text-xs text-white focus:outline-none focus:border-slate-500" />
          </div>
          
          <div className="p-3 flex-1 overflow-y-auto space-y-4">
            <div>
              <h3 className="text-[10px] font-mono text-slate-500 uppercase mb-2">Input / Output</h3>
              <div className="space-y-1">
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-emerald-500 transition">Dataset (BioMarket)</div>
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-emerald-500 transition">Local File</div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-slate-500 uppercase mb-2">Bioinformatics</h3>
              <div className="space-y-1">
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-amber-500 transition">Sequence Alignment</div>
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-amber-500 transition">Variant Calling</div>
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-amber-500 transition">Quality Control</div>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-slate-500 uppercase mb-2">AI & Machine Learning</h3>
              <div className="space-y-1">
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-blue-500 transition">PyTorch Training</div>
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-blue-500 transition">Model Inference</div>
                <div className="bg-[#050A15] border border-slate-700 p-2 rounded text-xs cursor-grab hover:border-blue-500 transition">Feature Extractor</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Canvas (Mockup) */}
        <div className="flex-1 bg-[#050A15] relative overflow-hidden" style={{
          backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}>
          {/* Node 1 */}
          <div className="absolute top-20 left-32 w-48 bg-[#0A1020] border border-emerald-500/50 rounded-lg shadow-lg">
            <div className="bg-emerald-900/30 px-3 py-1.5 border-b border-emerald-500/30 rounded-t-lg flex justify-between items-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Input</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <div className="p-3 text-xs text-slate-300">
              <div className="font-medium text-white mb-1">GSE12345 Data</div>
              <div className="text-slate-500 font-mono text-[10px]">FASTQ (Paired-end)</div>
            </div>
            {/* Output port */}
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0A1020] -translate-y-1/2"></div>
          </div>

          {/* Connection Line */}
          <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%">
            <path d="M 320 120 C 400 120, 400 120, 480 120" fill="none" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Node 2 */}
          <div className="absolute top-20 left-[480px] w-56 bg-[#0A1020] border border-amber-500/50 rounded-lg shadow-lg">
            {/* Input port */}
            <div className="absolute top-1/2 -left-2 w-4 h-4 bg-slate-700 rounded-full border-4 border-[#0A1020] -translate-y-1/2"></div>
            
            <div className="bg-amber-900/30 px-3 py-1.5 border-b border-amber-500/30 rounded-t-lg flex justify-between items-center">
              <span className="text-[10px] font-mono text-amber-400 uppercase">Compute</span>
              <span className="text-[10px] text-slate-400">Node: CPU</span>
            </div>
            <div className="p-3 text-xs text-slate-300">
              <div className="font-medium text-white mb-1">Bowtie2 Alignment</div>
              <div className="bg-[#050A15] p-1.5 mt-2 rounded border border-slate-800 font-mono text-[10px]">
                Target: GRCh38<br/>
                Threads: 16
              </div>
            </div>
            {/* Output port */}
            <div className="absolute top-1/2 -right-2 w-4 h-4 bg-amber-500 rounded-full border-4 border-[#0A1020] -translate-y-1/2"></div>
          </div>
        </div>

        {/* Right Sidebar: Node Config */}
        <div className="w-80 bg-[#0A1020] border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-[#050A15]">
            <h2 className="text-sm font-medium text-white">Node Configuration</h2>
          </div>
          <div className="p-4 space-y-4 text-sm">
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Node Name</label>
              <input type="text" value="Bowtie2 Alignment" className="w-full bg-[#050A15] border border-slate-700 rounded py-1.5 px-3 text-white focus:outline-none focus:border-[#4A90E2]" readOnly />
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-500 mb-1">Container Image</label>
              <input type="text" value="biocontainers/bowtie2:2.4.4" className="w-full bg-[#050A15] border border-slate-700 rounded py-1.5 px-3 text-white font-mono text-xs focus:outline-none" readOnly />
            </div>
            <div className="border-t border-slate-800 pt-4">
              <label className="block text-xs font-mono text-slate-500 mb-2">Compute Allocation (BioCloud)</label>
              <div className="flex justify-between items-center bg-[#050A15] border border-slate-700 p-2 rounded">
                <span className="text-slate-300 text-xs">CPU Cores</span>
                <span className="text-[#4A90E2] font-mono text-xs">16</span>
              </div>
              <div className="flex justify-between items-center bg-[#050A15] border border-slate-700 p-2 rounded mt-2">
                <span className="text-slate-300 text-xs">Memory (GB)</span>
                <span className="text-[#4A90E2] font-mono text-xs">64</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
