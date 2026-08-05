import React, { useState, useEffect } from 'react';

export default function BioAgentsCollaboration() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8">
      
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-indigo-400">💬</span> Agent Collaboration Thread
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Live view of inter-agent communication, data passing, and distributed problem solving.
          </p>
        </header>

        <div className="bg-[#0a0c10] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[700px]">
           
           {/* Thread Header */}
           <div className="bg-[#0f1115] border-b border-slate-800 p-4 flex justify-between items-center">
              <div className="text-sm font-bold text-white font-sans">Mission: Msn-7A9B (TNBC Repurposing)</div>
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                 <span className="text-xs text-slate-400 uppercase tracking-widest">Live Sync</span>
              </div>
           </div>

           {/* Chat Feed */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Message 1 */}
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-lg shadow-sm border border-slate-700">📚</div>
                 <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-sm font-bold text-slate-200">LiteratureAgent</span>
                       <span className="text-[10px] text-slate-500">10:42 AM</span>
                    </div>
                    <div className="bg-[#111] border border-slate-800 p-3 rounded-r-lg rounded-bl-lg text-sm font-sans text-slate-300">
                       I have retrieved and synthesized 3 relevant RNA-seq datasets for TNBC from GEO. I'm passing the GSE accessions to the BioinfoAgent for processing.
                       <div className="mt-3 p-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-slate-400">
                          {`Payload: { "accessions": ["GSE12345", "GSE67890", "GSE54321"], "context": "TNBC vs Normal Tissue" }`}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Message 2 */}
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded bg-blue-900/30 flex items-center justify-center text-lg shadow-sm border border-blue-800">🧬</div>
                 <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-sm font-bold text-blue-300">BioinfoAgent</span>
                       <span className="text-[10px] text-slate-500">10:55 AM</span>
                    </div>
                    <div className="bg-blue-950/10 border border-blue-900/50 p-3 rounded-r-lg rounded-bl-lg text-sm font-sans text-slate-300">
                       Received accessions. Executing differential expression analysis (DESeq2 pipeline). 
                       <br/><br/>
                       Analysis complete. Identified 142 significantly upregulated genes (log2FC &gt; 2, padj &lt; 0.01). Passing top 20 candidates to DrugDiscoveryAgent.
                       <div className="mt-3 p-2 bg-slate-900 border border-slate-700 rounded text-xs font-mono text-blue-400 overflow-hidden text-ellipsis">
                          {`Payload: { "top_targets": ["EGFR", "PARP1", "MYC", "CDK4", "CCNE1"...] }`}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Message 3 */}
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded bg-fuchsia-900/30 flex items-center justify-center text-lg shadow-sm border border-fuchsia-800">💊</div>
                 <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-sm font-bold text-fuchsia-300">DrugDiscoveryAgent</span>
                       <span className="text-[10px] text-slate-500">11:02 AM</span>
                    </div>
                    <div className="bg-fuchsia-950/10 border border-fuchsia-900/50 p-3 rounded-r-lg rounded-bl-lg text-sm font-sans text-slate-300">
                       Target list received. Querying ChEMBL for approved compounds targeting these proteins to prioritize repurposing candidates.
                       <br/><br/>
                       Found 5 highly promising FDA-approved candidates mapping to the upregulated kinase pathways. 
                       <span className="text-fuchsia-400 font-bold"> Note: Candidate C (Palbociclib) shows potential off-target effects.</span> Requesting ClinicalAgent review.
                    </div>
                 </div>
              </div>

              {/* Message 4 - In Progress */}
              <div className="flex gap-4">
                 <div className="w-10 h-10 rounded bg-emerald-900/30 flex items-center justify-center text-lg shadow-sm border border-emerald-800">🏥</div>
                 <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                       <span className="text-sm font-bold text-emerald-300">ClinicalAgent</span>
                       <span className="text-[10px] text-slate-500">Just now</span>
                    </div>
                    <div className="bg-emerald-950/10 border border-emerald-900/50 p-3 rounded-r-lg rounded-bl-lg text-sm font-sans text-slate-300 flex items-center gap-2">
                       <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-75"></div>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150"></div>
                       </div>
                       <span className="text-emerald-500/70 italic text-xs">Reviewing toxicity profiles...</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
