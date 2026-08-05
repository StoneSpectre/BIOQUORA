import React, { useState, useEffect } from 'react';

export default function BioLabWorkspace() {

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
          <h1 className="text-lg font-semibold text-white tracking-wide">BioLab Workspace</h1>
          <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">EXP-7892</span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-xs font-mono text-white rounded border border-slate-700 hover:bg-slate-700">Team Access</button>
          <button className="px-3 py-1.5 bg-emerald-600/20 text-emerald-400 text-xs font-mono rounded border border-emerald-500/30">Deploy to Execution</button>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Experiment Config */}
        <div className="w-80 bg-[#0A1020] border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-[#050A15]">
            <h2 className="text-sm font-medium text-white mb-2">Project: CRISPR Target Prediction</h2>
            <p className="text-xs text-slate-500 leading-relaxed">Hypothesis: Attention-based architectures can predict Cas9 off-target binding sites with &gt;95% accuracy across human cell lines.</p>
          </div>
          
          <div className="p-4 flex-1 overflow-y-auto">
            <h3 className="text-xs font-mono text-slate-500 uppercase mb-3">Experiment Assets</h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between"><span>Datasets (2)</span> <span className="text-[#4A90E2] cursor-pointer">+ Add</span></div>
                <div className="bg-[#050A15] p-2 rounded border border-slate-800 text-xs font-mono text-emerald-400 mb-1 flex items-center gap-2">
                  <span>🧬</span> GSE12345_sgRNA_counts
                </div>
                <div className="bg-[#050A15] p-2 rounded border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <span>🧬</span> GRCh38_Reference
                </div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1 flex justify-between"><span>Base Models (1)</span> <span className="text-[#4A90E2] cursor-pointer">+ Add</span></div>
                <div className="bg-[#050A15] p-2 rounded border border-slate-800 text-xs font-mono text-blue-400 flex items-center gap-2">
                  <span>🤖</span> BioBERT-Base-v2
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right: AI Planner & Timeline */}
        <div className="flex-1 flex flex-col">
          {/* AI Planning Chat */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-sm font-medium border border-slate-700 shrink-0">SC</div>
                <div className="bg-[#0A1020] border border-slate-800 rounded-lg rounded-tl-none p-4 text-sm text-slate-300">
                  I want to build a workflow to fine-tune BioBERT on the GSE12345 dataset. We need to preprocess the sgRNA sequences and align them to GRCh38 first.
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#4A90E2]/20 text-[#4A90E2] flex items-center justify-center text-lg shrink-0 border border-[#4A90E2]/30">🤖</div>
                <div className="bg-[#050A15] border border-blue-900/50 rounded-lg rounded-tl-none p-4 text-sm text-slate-300 shadow-[0_0_15px_rgba(74,144,226,0.05)]">
                  <p className="mb-4">I can design that workflow for you. Based on BioMarket best practices, I recommend the following sequence:</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="bg-[#0A1020] border border-slate-800 p-3 rounded flex justify-between items-center">
                      <span className="font-mono text-xs text-emerald-400">1. Bowtie2 Alignment (GRCh38)</span>
                      <span className="text-xs text-slate-500">Est. 2h (16 CPUs)</span>
                    </div>
                    <div className="bg-[#0A1020] border border-slate-800 p-3 rounded flex justify-between items-center">
                      <span className="font-mono text-xs text-amber-400">2. Feature Engineering (k-mers)</span>
                      <span className="text-xs text-slate-500">Est. 30m (8 CPUs)</span>
                    </div>
                    <div className="bg-[#0A1020] border border-slate-800 p-3 rounded flex justify-between items-center">
                      <span className="font-mono text-xs text-blue-400">3. BioBERT Fine-tuning</span>
                      <span className="text-xs text-slate-500">Est. 12h (2x A100 GPU)</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4 border-t border-slate-800 pt-3">
                    <button className="px-4 py-1.5 bg-[#4A90E2] text-white text-xs font-medium rounded hover:bg-blue-600">Generate Visual Workflow</button>
                    <button className="px-4 py-1.5 bg-slate-800 text-white text-xs rounded border border-slate-700">Modify Steps</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Input Bar */}
          <div className="p-4 bg-[#0A1020] border-t border-slate-800 shrink-0">
            <div className="max-w-3xl mx-auto relative">
              <input type="text" placeholder="Ask the Lab Assistant to plan analyses, find datasets, or debug code..." className="w-full bg-[#050A15] border border-slate-700 rounded-lg py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-[#4A90E2]" />
              <button className="absolute right-3 top-2.5 text-slate-400 hover:text-[#4A90E2]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
