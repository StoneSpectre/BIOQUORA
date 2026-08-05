import React, { useState, useEffect } from 'react';

export default function BioOSResearchCopilot() {

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
      {/* OS App Header */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-blue-500 text-xl">✨</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Research Copilot</h1>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Chat/Command Interface */}
        <div className="w-[450px] bg-[#1e293b] border-r border-slate-700 flex flex-col z-10">
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* User Intent */}
            <div className="flex flex-col items-end">
              <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm text-sm shadow-md max-w-[85%]">
                "Set up a new workflow to screen the top 50 compounds from yesterday's BioMarket batch against the mutant EGFR kinase domain. Document everything in the notebook."
              </div>
            </div>

            {/* Copilot Response & Planning */}
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">✨</span>
                <span className="text-xs font-bold text-slate-400">BioOS Agent Kernel</span>
              </div>
              <div className="bg-[#0f172a] border border-slate-700 p-4 rounded-2xl rounded-tl-sm text-sm shadow-md w-full">
                <p className="mb-3 text-slate-300">I have parsed your intent and generated a cross-platform execution plan. This will require coordinating BioMarket, BioPharma, and BioLab services.</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-xs bg-[#1e293b] p-2 rounded border border-slate-600">
                    <span className="text-emerald-400">✓</span> <span>Fetch dataset from BioMarket</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-[#1e293b] p-2 rounded border border-slate-600">
                    <span className="text-blue-400 animate-pulse">⟳</span> <span>Run docking simulation via BioPharma (GPU Cluster)</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs bg-[#1e293b] p-2 rounded border border-slate-600 opacity-50">
                    <span className="text-slate-500">○</span> <span>Compile report in BioLab Notebook</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-blue-600 text-white rounded font-medium hover:bg-blue-500 transition">Execute Plan</button>
                  <button className="px-3 py-1.5 bg-slate-700 text-slate-300 rounded font-medium hover:bg-slate-600 transition">Modify</button>
                </div>
              </div>
            </div>

          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-slate-700 bg-[#0f172a]">
             <div className="relative">
               <textarea 
                 className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-blue-500 resize-none h-24"
                 placeholder="Ask BioOS to plan a workflow, analyze data, or manage your workspace..."
               ></textarea>
               <button className="absolute bottom-3 right-3 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-500 transition shadow-md">
                 ↑
               </button>
             </div>
          </div>
        </div>

        {/* Right: Telemetry & Visualization of the Agent's Actions */}
        <div className="flex-1 bg-[#020617] p-8 relative overflow-hidden flex flex-col items-center justify-center">
           {/* Abstract Agent Neural Network background */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           
           <div className="relative z-10 w-full max-w-2xl bg-[#0f172a]/80 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-6 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
             <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                  Execution Telemetry
                </h2>
                <span className="text-xs font-mono text-slate-400">Session: AGT-9921-X</span>
             </div>

             {/* Live Terminal / Log output */}
             <div className="bg-black border border-slate-800 rounded-lg p-4 font-mono text-[10px] text-emerald-400 h-64 overflow-y-auto space-y-2">
                <div className="text-slate-500">[{new Date().toISOString()}] SYSTEM: Initializing Agent OS...</div>
                <div>[{new Date().toISOString()}] PLANNER: Breaking down user intent into 3 steps.</div>
                <div>[{new Date().toISOString()}] WORKSPACE: Verifying permissions for Dataset BQ-MKT-554... OK.</div>
                <div>[{new Date().toISOString()}] COMPUTE: Requesting 4x A100 nodes from BioCloud scheduler...</div>
                <div className="text-blue-400">[{new Date().toISOString()}] COMPUTE: Nodes provisioned successfully.</div>
                <div>[{new Date().toISOString()}] BIOPHARMA: Dispatching 50 compounds for AutoDock Vina pipeline...</div>
                <div className="text-amber-400">[{new Date().toISOString()}] BIOPHARMA: Docking running (12/50 completed) ...</div>
                <div className="text-amber-400 animate-pulse">_</div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
