import React, { useState, useEffect } from 'react';

export default function BioKnowledgeOntology() {

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
          <span className="text-xl text-emerald-500">🌲</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Ontology Framework</h1>
        </div>
        <div className="flex gap-3 text-xs">
           <select className="bg-[#0f172a] border border-slate-700 text-slate-300 rounded px-3 py-1.5 outline-none">
             <option>Gene Ontology (GO)</option>
             <option>MeSH (Medical Subject Headings)</option>
             <option>Human Phenotype Ontology (HPO)</option>
           </select>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Ontology Tree Browser */}
        <div className="w-1/3 bg-[#1e293b] border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700 bg-[#0f172a]">
             <input type="text" placeholder="Search GO terms..." className="w-full bg-[#1e293b] border border-slate-600 rounded py-1.5 px-3 text-sm text-white focus:outline-none focus:border-emerald-500" />
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-slate-400">
             {/* Mock Tree */}
             <ul className="space-y-2">
               <li className="flex items-start gap-2">
                 <span className="cursor-pointer hover:text-white">▼</span>
                 <div>
                   <span className="font-bold text-slate-300">GO:0008150</span> <span className="text-slate-500">biological_process</span>
                   
                   <ul className="pl-4 mt-2 border-l border-slate-700 space-y-2">
                     <li className="flex items-start gap-2">
                       <span className="cursor-pointer hover:text-white">▼</span>
                       <div>
                         <span className="font-bold text-slate-300">GO:0009987</span> <span className="text-slate-500">cellular_process</span>
                         
                         <ul className="pl-4 mt-2 border-l border-slate-700 space-y-2">
                           <li className="flex items-start gap-2">
                             <span className="cursor-pointer hover:text-white">▶</span>
                             <div><span className="font-bold text-slate-300">GO:0006996</span> <span className="text-slate-500">organelle organization</span></div>
                           </li>
                           <li className="flex items-start gap-2">
                             <span className="cursor-pointer text-emerald-400">▼</span>
                             <div>
                               <span className="font-bold text-emerald-400 bg-emerald-900/30 px-1 rounded">GO:0016043</span> <span className="text-slate-300">cellular component organization</span>
                             </div>
                           </li>
                         </ul>

                       </div>
                     </li>
                   </ul>

                 </div>
               </li>
             </ul>
          </div>
        </div>

        {/* Right: Term Details & Mappings */}
        <div className="flex-1 bg-[#020617] p-8 overflow-y-auto">
          
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 border border-emerald-500/30 text-[10px] rounded font-bold uppercase tracking-wider">GO Term</span>
              <span className="text-slate-400 font-mono text-sm">GO:0016043</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-6">cellular component organization</h2>

            <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 mb-8 shadow-md">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Definition</h3>
               <p className="text-sm text-slate-300 leading-relaxed">
                 A process that results in the assembly, arrangement of constituent parts, or disassembly of a cellular component.
               </p>
            </div>

            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Cross-Ontology Mappings</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
               <div className="bg-[#1e293b] border border-slate-700 rounded-lg p-4">
                 <div className="text-xs text-slate-500 mb-1">MeSH</div>
                 <div className="font-mono text-sm text-blue-400">D002462 (Cell Membrane) <span className="text-slate-600 text-[10px] block">Partial match</span></div>
               </div>
               <div className="bg-[#1e293b] border border-slate-700 rounded-lg p-4">
                 <div className="text-xs text-slate-500 mb-1">Reactome</div>
                 <div className="font-mono text-sm text-purple-400">R-HSA-8953897 <span className="text-slate-600 text-[10px] block">Exact match</span></div>
               </div>
            </div>

            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Annotated Entities in BioKnowledge (Top 3)</h3>
            <div className="space-y-2">
               <div className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-slate-700">
                 <span className="text-sm text-white font-medium">ACTB (Actin Beta)</span>
                 <span className="text-xs font-mono text-slate-500">Gene</span>
               </div>
               <div className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-slate-700">
                 <span className="text-sm text-white font-medium">TUBB (Tubulin Beta Class I)</span>
                 <span className="text-xs font-mono text-slate-500">Gene</span>
               </div>
               <div className="flex justify-between items-center bg-[#1e293b] p-3 rounded-lg border border-slate-700">
                 <span className="text-sm text-white font-medium">VIM (Vimentin)</span>
                 <span className="text-xs font-mono text-slate-500">Gene</span>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
