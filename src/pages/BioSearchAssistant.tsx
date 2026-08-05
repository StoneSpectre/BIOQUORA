import React, { useState, useEffect } from 'react';

export default function BioSearchAssistant() {

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
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col">
      
      {/* Top Navbar */}
      <header className="h-14 bg-[#0f172a] border-b border-slate-800 flex items-center justify-between px-6 shrink-0 shadow-md z-10">
        <div className="flex items-center gap-4">
          <span className="text-xl text-indigo-500">🤖</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Conversational Research Assistant</h1>
        </div>
        <div className="flex gap-3 text-xs">
          <button className="px-3 py-1.5 bg-[#1e293b] text-slate-300 border border-slate-700 rounded hover:bg-slate-800">Clear Context</button>
          <button className="px-3 py-1.5 bg-indigo-600 text-white rounded hover:bg-indigo-500 font-bold">Save Session</button>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* User Message */}
          <div className="flex gap-4 justify-end">
            <div className="bg-[#1e293b] border border-slate-700 rounded-2xl rounded-tr-sm p-4 max-w-2xl text-sm text-slate-200">
              Can you summarize the latest evidence regarding liquid biopsies for early detection of pancreatic cancer? Focus on methylation markers.
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0"></div>
          </div>

          {/* Agent Action Status */}
          <div className="flex gap-4">
             <div className="w-8 h-8 shrink-0"></div>
             <div className="text-xs font-mono text-slate-500 flex flex-col gap-1">
                <span className="flex items-center gap-2"><span>🔄</span> Parsing intent...</span>
                <span className="flex items-center gap-2"><span>🔍</span> Searching PubMed & BioKnowledge Graph (Pancreatic Neoplasms [MeSH] AND DNA Methylation AND Liquid Biopsy)</span>
                <span className="flex items-center gap-2 text-indigo-400"><span>⚡</span> Synthesizing 34 recent high-impact publications...</span>
             </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-indigo-500/20">AI</div>
            <div className="bg-[#0f172a] border border-indigo-900/50 rounded-2xl rounded-tl-sm p-6 max-w-3xl text-sm text-slate-300 shadow-xl">
              <p className="mb-4">
                Recent advancements in liquid biopsies for early pancreatic ductal adenocarcinoma (PDAC) detection have heavily focused on cell-free DNA (cfDNA) methylation profiling. This approach often outperforms standard somatic mutation panels (like KRAS) due to the tissue-specific nature of methylation signatures and their early alteration in carcinogenesis.
              </p>
              
              <div className="bg-[#1e293b] border border-slate-700 rounded-lg p-4 mb-4">
                 <h4 className="text-white font-bold mb-2">Key Emerging Markers</h4>
                 <ul className="list-disc pl-5 space-y-1 text-slate-400">
                   <li><strong>BNC1 & ADAMTS1:</strong> Promoters frequently hypermethylated in early PDAC; multiplexed assays show ~80% sensitivity for stage I disease.</li>
                   <li><strong>HOXA1 & SOX17:</strong> Identified via whole-genome bisulfite sequencing of plasma cfDNA as robust early-detection candidates.</li>
                 </ul>
              </div>

              <p className="mb-4">
                <strong>Current limitations:</strong> While analytical sensitivity is improving (often combined with CA19-9), large-scale prospective validation in asymptomatic, high-risk cohorts is still ongoing to prove clinical utility.
              </p>

              <div className="flex gap-2 flex-wrap">
                 <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">Reference: PMID 35123456</span>
                 <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">Reference: PMID 34891234</span>
                 <span className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-[10px] text-slate-400">Data: ClinicalTrials.gov NCT0456789</span>
              </div>
            </div>
          </div>

          {/* AI Hypothesis Suggestion */}
          <div className="flex gap-4">
            <div className="w-8 h-8 shrink-0"></div>
            <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-4 max-w-3xl text-sm text-indigo-300 flex items-start gap-3">
              <span className="text-lg">💡</span>
              <div>
                <strong className="text-indigo-400 block mb-1">AI Hypothesis Suggestion</strong>
                Based on your query, the BioKnowledge graph indicates a potential underexplored synergy: Combining cfDNA methylation panels with exosomal miRNA profiling (specifically miR-10b and miR-21) might increase diagnostic specificity by filtering out chronic pancreatitis false positives. Would you like to explore literature on this combination?
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#0f172a] border-t border-slate-800 shrink-0">
         <div className="max-w-4xl mx-auto relative">
            <textarea 
              className="w-full bg-[#1e293b] border-2 border-slate-700 rounded-xl py-3 pl-4 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none overflow-hidden" 
              placeholder="Ask a follow-up question or suggest a new direction..."
              rows={2}
            ></textarea>
            <button className="absolute right-3 bottom-3 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition">
              <span className="transform rotate-90 inline-block">▲</span>
            </button>
         </div>
         <div className="max-w-4xl mx-auto mt-2 text-center">
            <span className="text-[10px] text-slate-500 font-mono">BioSearch Assistant may hallucinate. Always verify clinical information with primary sources.</span>
         </div>
      </div>

    </div>
  );
}
