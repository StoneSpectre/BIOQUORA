import React, { useState, useEffect } from 'react';

export default function BioRetrieverOntology() {

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
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-cyan-500">📚</span> Ontology & Semantic Resolution
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Mapping ambiguous user queries to standardized biomedical vocabularies (MeSH, GO, SNOMED CT) before retrieval.
          </p>
        </header>

        <div className="space-y-6">
           
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
              <h3 className="text-sm font-bold text-slate-400 mb-4 uppercase tracking-widest">Raw Query Input</h3>
              <div className="p-4 bg-[#111] border border-slate-700 rounded text-lg text-slate-200 font-sans">
                 "Does breast cancer medicine work better when there is a defect in DNA repair?"
              </div>
           </div>

           <div className="flex justify-center">
              <div className="w-px h-8 bg-cyan-500/50"></div>
           </div>

           <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 shadow-[0_0_20px_rgba(6,182,212,0.05)]">
              <h3 className="text-sm font-bold text-cyan-400 mb-6 uppercase tracking-widest flex items-center gap-2">
                 <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div> Semantic Resolution Matrix
              </h3>
              
              <div className="space-y-4">
                 
                 {/* Entity 1 */}
                 <div className="flex items-center gap-6 p-4 bg-[#111] border border-slate-800 rounded-lg">
                    <div className="w-1/3">
                       <div className="text-sm text-rose-400 font-bold mb-1">"breast cancer"</div>
                       <div className="text-[10px] text-slate-500 uppercase">Extracted Span</div>
                    </div>
                    <div className="text-slate-600 text-lg">&rarr;</div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">Breast Neoplasms</span>
                          <span className="px-2 py-0.5 bg-cyan-950/30 text-cyan-400 border border-cyan-900/50 rounded text-xs">MeSH: D001943</span>
                       </div>
                       <div className="text-[10px] text-slate-400 font-sans">Synonyms included in search: Mammary Cancer, Malignant Neoplasm of Breast.</div>
                    </div>
                 </div>

                 {/* Entity 2 */}
                 <div className="flex items-center gap-6 p-4 bg-[#111] border border-slate-800 rounded-lg">
                    <div className="w-1/3">
                       <div className="text-sm text-emerald-400 font-bold mb-1">"defect in DNA repair"</div>
                       <div className="text-[10px] text-slate-500 uppercase">Extracted Span</div>
                    </div>
                    <div className="text-slate-600 text-lg">&rarr;</div>
                    <div className="flex-1">
                       <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-bold text-white">DNA Repair Deficiency</span>
                          <span className="px-2 py-0.5 bg-emerald-950/30 text-emerald-400 border border-emerald-900/50 rounded text-xs">GO:0006281</span>
                       </div>
                       <div className="text-[10px] text-slate-400 font-sans">Mapped to Gene Ontology Biological Process. Subsumes HR deficiency (HRD).</div>
                    </div>
                 </div>

              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
