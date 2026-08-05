import React, { useState, useEffect } from 'react';

export default function BioPharmaTargetDiscovery() {

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
          <h1 className="text-lg font-semibold text-white tracking-wide">Target Discovery Engine</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Disease Area:</span>
            <span className="font-mono bg-indigo-900/40 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded">Non-Small Cell Lung Cancer (MONDO:0005233)</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-800 text-white text-xs font-mono rounded border border-slate-700 hover:bg-slate-700 transition">Update Knowledge Graph</button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-mono rounded hover:bg-indigo-500 transition shadow-sm">Run AI Prioritization</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Column: Target List */}
        <div className="w-96 bg-[#0B1121] border-r border-slate-800 flex flex-col z-0">
          <div className="p-4 border-b border-slate-800 bg-[#020617]">
            <input type="text" placeholder="Search targets by gene, pathway, or mechanism..." className="w-full bg-[#0F172A] border border-slate-700 rounded py-2 px-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500" />
            <div className="mt-3 flex gap-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider pt-1">Sort By:</span>
              <select className="bg-transparent text-xs text-indigo-400 font-medium focus:outline-none cursor-pointer">
                <option>Bioquora AI Score</option>
                <option>Genetic Evidence</option>
                <option>Druggability</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            
            {/* Target Card 1 (Active) */}
            <div className="bg-[#1E293B] border border-indigo-500 rounded-lg p-4 cursor-pointer relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">RANK #1</div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">KRAS</h3>
                  <div className="text-xs text-slate-400 font-mono">P01111 • Kinase / GTPase</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-indigo-400">9.8</div>
                  <div className="text-[10px] text-slate-500 uppercase">AI Score</div>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-[10px] rounded font-medium" title="High Genetic Evidence">GEN: High</span>
                <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] rounded font-medium" title="Druggable Pocket Identified">DRUG: Yes</span>
                <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 border border-amber-800 text-[10px] rounded font-medium" title="Active Clinical Trials">CLIN: Phase III</span>
              </div>
            </div>

            {/* Target Card 2 */}
            <div className="bg-[#0F172A] border border-slate-700 rounded-lg p-4 cursor-pointer hover:border-slate-500 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">EGFR</h3>
                  <div className="text-xs text-slate-500 font-mono">P00533 • Receptor Tyrosine Kinase</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-slate-300">8.5</div>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-[10px] rounded font-medium">GEN: High</span>
                <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] rounded font-medium">DRUG: Yes</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 text-[10px] rounded font-medium">CLIN: Approved</span>
              </div>
            </div>

            {/* Target Card 3 */}
            <div className="bg-[#0F172A] border border-slate-700 rounded-lg p-4 cursor-pointer hover:border-slate-500 transition">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-200">CD274 (PD-L1)</h3>
                  <div className="text-xs text-slate-500 font-mono">Q9NZQ7 • Immune Checkpoint</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-slate-300">8.2</div>
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                <span className="px-2 py-0.5 bg-amber-900/30 text-amber-400 border border-amber-800 text-[10px] rounded font-medium">GEN: Med</span>
                <span className="px-2 py-0.5 bg-blue-900/30 text-blue-400 border border-blue-800 text-[10px] rounded font-medium">DRUG: Bio</span>
              </div>
            </div>

          </div>
        </div>

        {/* Center/Right: Target Intelligence & Knowledge Graph */}
        <div className="flex-1 flex flex-col bg-[#020617] overflow-y-auto">
          
          <div className="p-8 pb-4">
            <h2 className="text-3xl font-black text-white mb-2 flex items-center gap-3">
              KRAS 
              <span className="text-sm font-normal text-slate-400 bg-slate-800 px-2 py-1 rounded">GTPase KRas</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
              Ras proteins bind GDP/GTP and possess intrinsic GTPase activity. Plays an important role in the regulation of cell proliferation, promoting oncogenic events by inducing transcriptional silencing of tumor suppressor genes in colorectal cancer. The G12C mutation is highly prevalent in NSCLC.
            </p>
          </div>
          
          <div className="px-8 grid grid-cols-2 gap-6 mb-8">
            
            {/* Multi-Omics Evidence */}
            <div className="bg-[#0B1121] border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex justify-between">
                Omics Evidence <span className="text-indigo-400 cursor-pointer text-xs normal-case font-medium">View Data</span>
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Differential Expression (Tumor vs Normal)</span>
                    <span className="text-rose-400 font-mono">+4.2 Log2FC</span>
                  </div>
                  <div className="w-full bg-[#020617] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-rose-600 to-rose-400 h-full w-[85%]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Mutation Frequency (TCGA-LUAD)</span>
                    <span className="text-amber-400 font-mono">32.5%</span>
                  </div>
                  <div className="w-full bg-[#020617] h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full w-[32%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Druggability & Structure */}
            <div className="bg-[#0B1121] border border-slate-800 rounded-xl p-5 shadow-lg">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex justify-between">
                Structural Druggability <span className="text-indigo-400 cursor-pointer text-xs normal-case font-medium">Open Viewer</span>
              </h3>
              
              <div className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-slate-900 rounded border border-slate-700 flex items-center justify-center relative overflow-hidden">
                   {/* Abstract representation of a protein structure */}
                   <svg viewBox="0 0 100 100" className="w-full h-full opacity-50">
                     <path d="M20,50 Q40,20 60,50 T90,60" fill="none" stroke="#6366f1" strokeWidth="4" />
                     <path d="M10,70 Q30,90 50,60 T80,40" fill="none" stroke="#3b82f6" strokeWidth="4" />
                     <circle cx="60" cy="50" r="8" fill="#10b981" />
                   </svg>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                    <span className="text-slate-500">PDB Structures</span>
                    <span className="text-white font-mono">142</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                    <span className="text-slate-500">Known Allosteric Pockets</span>
                    <span className="text-white font-mono">2 (Switch II)</span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-b border-slate-800 pb-1">
                    <span className="text-slate-500">AlphaFold Confidence</span>
                    <span className="text-emerald-400 font-mono">Very High (pLDDT &gt; 90)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Knowledge Graph Mockup */}
          <div className="px-8 pb-8 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Bioquora Target Knowledge Graph</h3>
            <div className="flex-1 bg-[#0B1121] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
              
              {/* Network Graph Vis Mockup */}
              <svg className="w-full h-full absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
                
                {/* Edges */}
                <line x1="50%" y1="50%" x2="30%" y2="30%" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4"/>
                <line x1="50%" y1="50%" x2="70%" y2="30%" stroke="#475569" strokeWidth="1.5"/>
                <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="#475569" strokeWidth="1.5"/>
                <line x1="50%" y1="50%" x2="80%" y2="60%" stroke="#475569" strokeWidth="1.5"/>
                
                {/* Center Node: Target */}
                <circle cx="50%" cy="50%" r="35" fill="#1e1b4b" stroke="#6366f1" strokeWidth="3" />
                <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="white" fontSize="14" fontWeight="bold">KRAS</text>

                {/* Node: Disease */}
                <circle cx="30%" cy="30%" r="25" fill="#4c1d95" stroke="#8b5cf6" strokeWidth="2" />
                <text x="30%" y="30%" textAnchor="middle" dy=".3em" fill="white" fontSize="10">NSCLC</text>

                {/* Node: Pathway */}
                <circle cx="70%" cy="30%" r="25" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                <text x="70%" y="30%" textAnchor="middle" dy=".3em" fill="white" fontSize="10">MAPK</text>
                
                {/* Node: Compound */}
                <circle cx="50%" cy="75%" r="25" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
                <text x="50%" y="75%" textAnchor="middle" dy=".3em" fill="white" fontSize="10">Sotorasib</text>

                {/* Node: Gene interactant */}
                <circle cx="80%" cy="60%" r="20" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
                <text x="80%" y="60%" textAnchor="middle" dy=".3em" fill="white" fontSize="10">BRAF</text>
              </svg>
              
              <div className="absolute top-4 left-4 bg-[#020617]/80 backdrop-blur border border-slate-700 p-2 rounded text-xs space-y-1 text-slate-300">
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span> Disease Association</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Biological Pathway</div>
                <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#ef4444]"></span> Known Inhibitor</div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
