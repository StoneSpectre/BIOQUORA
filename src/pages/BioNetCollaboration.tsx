import React, { useState, useEffect } from 'react';

export default function BioNetCollaboration() {

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
      <div className="max-w-7xl mx-auto flex h-[calc(100vh-4rem)]">
        
        {/* Sidebar */}
        <div className="w-64 bg-[#0A1020] border-r border-slate-800 flex flex-col rounded-l-xl overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-800 bg-[#050A15]">
            <h2 className="text-sm font-mono text-white uppercase tracking-wider">Workspaces</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="text-xs font-mono text-slate-500 mb-2 px-2 mt-2">Active Projects</div>
            <div className="px-2 py-1.5 bg-slate-800/50 text-slate-200 rounded cursor-pointer text-sm mb-1">
              # onc-multiomics-26
            </div>
            <div className="px-2 py-1.5 hover:bg-slate-800/30 text-slate-400 rounded cursor-pointer text-sm mb-1">
              # drug-repurposing-ai
            </div>
            
            <div className="text-xs font-mono text-slate-500 mb-2 px-2 mt-6">Direct Messages</div>
            <div className="px-2 py-1.5 hover:bg-slate-800/30 text-slate-400 rounded cursor-pointer text-sm mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Dr. Chen (Stanford)
            </div>
            <div className="px-2 py-1.5 hover:bg-slate-800/30 text-slate-400 rounded cursor-pointer text-sm mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span> AI Reviewer Agent
            </div>
          </div>
        </div>

        {/* Main Chat/Workspace Area */}
        <div className="flex-1 bg-[#050A15] border border-slate-800 border-l-0 rounded-r-xl flex flex-col relative overflow-hidden">
          <header className="p-4 border-b border-slate-800 bg-[#0A1020] flex justify-between items-center">
            <div>
              <h2 className="text-white font-medium"># onc-multiomics-26</h2>
              <p className="text-xs text-slate-500 font-mono">Federated space: Stanford, Broad, EMBL</p>
            </div>
            <button className="text-[#4A90E2] text-sm hover:underline font-mono">Manage Access</button>
          </header>
          
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="mb-6 flex gap-4">
              <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center text-xs shrink-0 text-white">SC</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-200">Sarah Chen</span>
                  <span className="text-xs text-slate-500 font-mono">10:42 AM</span>
                </div>
                <p className="text-sm text-slate-300">I've just authorized the federated transfer of the TCGA lung cohort. The AI agent can start indexing it now.</p>
              </div>
            </div>
            
            <div className="mb-6 flex gap-4">
              <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-xs shrink-0 border border-slate-600 text-white">🤖</div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm font-medium text-[#4A90E2]">BioNet Protocol Agent</span>
                  <span className="text-xs text-slate-500 font-mono">10:43 AM</span>
                </div>
                <div className="bg-[#0A1020] border border-slate-800 p-3 rounded-lg inline-block">
                  <p className="text-sm text-slate-300 mb-2">Transfer verified via zero-trust proxy. Indexing initiated.</p>
                  <div className="w-full bg-[#050A15] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#4A90E2] h-full w-[45%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-[#0A1020] border-t border-slate-800">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Message #onc-multiomics-26 or @Agent..." 
                className="w-full bg-[#050A15] border border-slate-700 text-white rounded p-3 text-sm focus:outline-none focus:border-[#4A90E2]"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
