import React, { useState, useEffect } from 'react';

export default function BioKnowledgeLiterature() {

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
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-xl text-blue-500">📄</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Scientific Literature Engine</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-slate-700 text-white text-xs font-mono rounded hover:bg-slate-600 transition">Saved Collections (4)</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Search & Filters */}
        <div className="p-6 bg-[#0f172a] border-b border-slate-700 shrink-0">
          <div className="max-w-5xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
              <input 
                type="text" 
                className="w-full bg-[#1e293b] border-2 border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-500 outline-none transition"
                placeholder="Semantic Search (e.g. 'What are the resistance mechanisms to Osimertinib in EGFR mutant NSCLC?')"
                defaultValue="Resistance mechanisms to Osimertinib in EGFR mutant NSCLC"
              />
            </div>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition shadow-lg">Search</button>
          </div>
          <div className="max-w-5xl mx-auto flex gap-3 mt-4">
             <span className="text-xs text-slate-500 uppercase font-bold tracking-wider mr-2 self-center">AI Filters:</span>
             <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-600 cursor-pointer hover:bg-slate-700">Clinical Trials Only</span>
             <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-500/50 cursor-pointer">Published &gt; 2022</span>
             <span className="px-3 py-1 bg-slate-800 text-slate-300 text-xs rounded-full border border-slate-600 cursor-pointer hover:bg-slate-700">Has Extracted Evidence</span>
          </div>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto bg-[#020617] p-6">
          <div className="max-w-5xl mx-auto space-y-6">
             
             {/* AI Summary Block */}
             <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">✨</div>
                <h2 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                   <span>AI Knowledge Synthesis</span>
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  Based on <strong>412</strong> highly relevant publications, the primary resistance mechanism to Osimertinib is the emergence of the <strong>EGFR C797S mutation</strong> (approx 15-25% of cases). Secondary mechanisms include <strong>MET amplification</strong> (15%), <strong>HER2 amplification</strong>, and histologic transformation to small cell lung cancer (SCLC).
                </p>
                <div className="flex gap-4">
                   <button className="text-xs bg-blue-600/20 border border-blue-500/40 text-blue-400 px-3 py-1.5 rounded hover:bg-blue-600/40 transition">View Evidence Graph</button>
                   <button className="text-xs bg-slate-800 border border-slate-600 text-slate-300 px-3 py-1.5 rounded hover:bg-slate-700 transition">Save Synthesis to Workspace</button>
                </div>
             </div>

             <div className="text-xs text-slate-500 uppercase font-bold tracking-wider mt-8 mb-4">Source Publications (412)</div>

             {/* Publication Card 1 */}
             <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition shadow-md">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-white hover:text-blue-400 cursor-pointer">Acquired Resistance to Osimertinib in EGFR-Mutated Non–Small Cell Lung Cancer</h3>
                   <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-[10px] rounded shrink-0">High Confidence</span>
                </div>
                <div className="text-sm text-slate-400 mb-3">Piotrowska Z, Sequist LV. | <span className="italic">Journal of Clinical Oncology</span> (2023) | PMID: 36123456</div>
                <div className="p-3 bg-[#0f172a] rounded-lg border border-slate-700 text-sm text-slate-300 mb-4">
                  <strong className="text-blue-400 text-xs uppercase tracking-wider block mb-1">Extracted Knowledge Fact:</strong>
                  "MET amplification was identified in 15% of patients progressing on first-line osimertinib therapy."
                </div>
                <div className="flex items-center gap-4 text-xs">
                   <span className="text-slate-500 flex items-center gap-1">🔗 Cited by 342</span>
                   <span className="text-slate-500 flex items-center gap-1">📊 1 Dataset Linked</span>
                   <button className="ml-auto text-blue-400 hover:underline">Add to Collection</button>
                </div>
             </div>

             {/* Publication Card 2 */}
             <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition shadow-md">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-lg font-bold text-white hover:text-blue-400 cursor-pointer">C797S Mutation Mediates Resistance to Third-Generation EGFR Inhibitors</h3>
                   <span className="px-2 py-0.5 bg-emerald-900/30 text-emerald-400 border border-emerald-800 text-[10px] rounded shrink-0">High Confidence</span>
                </div>
                <div className="text-sm text-slate-400 mb-3">Thress KS, et al. | <span className="italic">Nature Medicine</span> (2022) | PMID: 26027977</div>
                <div className="p-3 bg-[#0f172a] rounded-lg border border-slate-700 text-sm text-slate-300 mb-4">
                  <strong className="text-blue-400 text-xs uppercase tracking-wider block mb-1">Extracted Knowledge Fact:</strong>
                  "The C797S mutation in exon 20 of EGFR was detected in cell-free plasma DNA of patients exhibiting acquired resistance to osimertinib."
                </div>
                <div className="flex items-center gap-4 text-xs">
                   <span className="text-slate-500 flex items-center gap-1">🔗 Cited by 1,205</span>
                   <span className="text-slate-500 flex items-center gap-1">🧬 3 Genes Linked</span>
                   <button className="ml-auto text-blue-400 hover:underline">Add to Collection</button>
                </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}
