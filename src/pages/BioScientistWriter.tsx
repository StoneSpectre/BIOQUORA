import React, { useState, useEffect } from 'react';

export default function BioScientistWriter() {

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
    <div className="h-screen bg-slate-100 font-sans flex overflow-hidden">
      
      {/* Left: Document Editor (Clean, MS Word / Notion style) */}
      <div className="flex-1 bg-white flex flex-col relative shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)] z-10">
         <header className="h-14 border-b border-slate-200 flex items-center px-6 shrink-0">
           <h1 className="text-sm font-bold text-slate-800">Draft: Design of novel KRAS G12D Degraders</h1>
           <span className="ml-4 px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] rounded font-bold uppercase">Auto-Saving</span>
         </header>
         
         <div className="flex-1 overflow-y-auto p-12 flex justify-center">
           <div className="max-w-3xl w-full text-slate-800 text-lg leading-relaxed font-serif">
             <h1 className="text-4xl font-bold mb-6 font-sans">Introduction</h1>
             <p className="mb-4">
               The Kirsten rat sarcoma viral oncogene homolog (KRAS) is one of the most frequently mutated oncogenes in human cancers, particularly in pancreatic ductal adenocarcinoma (PDAC), colorectal cancer, and non-small cell lung cancer (NSCLC) <span className="text-blue-600 cursor-pointer bg-blue-50 px-1 rounded">[1]</span>. Among these mutations, the G12D substitution is predominant in PDAC. 
             </p>
             <p className="mb-4">
               Despite recent successes in covalently targeting the KRAS G12C allele, G12D has remained challenging due to the lack of a reactive cysteine residue in the switch II pocket. Targeted protein degradation via Proteolysis Targeting Chimeras (PROTACs) offers a compelling alternative strategy by hijacking the ubiquitin-proteasome system to eliminate the oncogenic protein entirely <span className="text-blue-600 cursor-pointer bg-blue-50 px-1 rounded">[2, 3]</span>.
             </p>
             <div className="my-6 p-4 border-l-4 border-amber-400 bg-amber-50 font-sans">
               <div className="flex items-center gap-2 mb-2 text-sm font-bold text-amber-800">
                 <span>✍️</span> <span>WriteAgent Suggestion</span>
               </div>
               <p className="text-sm text-amber-900 mb-3">Should we include a brief comparison of VHL vs CRBN ligases here, based on your Central Hypothesis (H1)?</p>
               <div className="flex gap-2">
                 <button className="px-3 py-1 bg-amber-600 text-white text-xs font-bold rounded shadow hover:bg-amber-700">Generate Paragraph</button>
                 <button className="px-3 py-1 bg-white text-slate-600 border border-slate-300 text-xs font-bold rounded hover:bg-slate-50">Dismiss</button>
               </div>
             </div>
           </div>
         </div>
      </div>

      {/* Right: AI Writing Assistant Sidebar */}
      <div className="w-96 bg-[#0f172a] text-slate-300 flex flex-col shrink-0">
         <header className="h-14 border-b border-slate-800 flex items-center px-6 shrink-0">
           <span className="text-lg mr-2">✍️</span>
           <h2 className="text-sm font-bold text-white uppercase tracking-wider">WriteAgent Controls</h2>
         </header>

         <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            {/* Citation Manager */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Live Citations</h3>
              <div className="space-y-2">
                 <div className="bg-[#1e293b] p-3 rounded border border-slate-700 text-xs">
                   <div className="text-blue-400 font-bold mb-1">[1] Prior, I. A., et al. (2020)</div>
                   <div className="text-slate-400 truncate">The frequency of Ras mutations in cancer. Cancer Research.</div>
                 </div>
                 <div className="bg-[#1e293b] p-3 rounded border border-slate-700 text-xs">
                   <div className="text-blue-400 font-bold mb-1">[2] Békés, M., et al. (2022)</div>
                   <div className="text-slate-400 truncate">PROTAC targeted protein degraders: the past is prologue.</div>
                 </div>
              </div>
              <button className="w-full mt-3 py-1.5 bg-[#1e293b] text-slate-400 text-xs border border-slate-700 rounded hover:bg-slate-800 transition">
                + Insert Citation from BioSearch
              </button>
            </div>

            {/* Actions */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">AI Generation</h3>
              <div className="grid grid-cols-2 gap-2">
                 <button className="py-2 bg-indigo-900/30 text-indigo-400 text-xs font-bold border border-indigo-500/30 rounded hover:bg-indigo-900/50">Draft Methods</button>
                 <button className="py-2 bg-indigo-900/30 text-indigo-400 text-xs font-bold border border-indigo-500/30 rounded hover:bg-indigo-900/50">Summarize Results</button>
                 <button className="py-2 bg-indigo-900/30 text-indigo-400 text-xs font-bold border border-indigo-500/30 rounded hover:bg-indigo-900/50">Format Nature</button>
                 <button className="py-2 bg-slate-800 text-slate-400 text-xs font-bold border border-slate-700 rounded hover:bg-slate-700">Check Flow</button>
              </div>
            </div>

         </div>
      </div>

    </div>
  );
}
