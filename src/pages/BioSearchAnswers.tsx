import React, { useState, useEffect } from 'react';

export default function BioSearchAnswers() {

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
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans">
      
      {/* Search Header */}
      <header className="sticky top-0 z-30 bg-[#0f172a]/90 backdrop-blur-xl border-b border-slate-700 py-4 px-6 flex items-center gap-6 shadow-sm">
        <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 tracking-tight shrink-0">BioSearch</h1>
        <div className="flex-1 max-w-3xl relative">
          <input 
            type="text" 
            defaultValue="What is the role of the microbiome in immunotherapy response for melanoma?"
            className="w-full bg-[#1e293b] border border-slate-600 rounded-xl py-2.5 px-4 text-white text-sm focus:outline-none focus:border-blue-500 shadow-inner"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0"></div>
      </header>

      <main className="max-w-4xl mx-auto py-10 px-6">
         
         <div className="mb-8">
           <h2 className="text-3xl font-bold text-white mb-2">The gut microbiome modulates immunotherapy response in melanoma</h2>
           <p className="text-sm text-slate-500">Synthesized from 24 top-ranked publications and 3 clinical trials.</p>
         </div>

         {/* AI Answer Block */}
         <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden">
            {/* Sparkle decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-20 text-4xl">✨</div>
            
            <div className="prose prose-invert prose-slate max-w-none">
              <p className="text-lg leading-relaxed mb-4">
                The composition of the gut microbiome significantly influences the efficacy of immune checkpoint inhibitors (ICIs), particularly anti-PD-1 therapy, in patients with melanoma. Specific commensal bacteria have been identified as "favorable," correlating with enhanced anti-tumor immune responses and prolonged progression-free survival.
              </p>
              
              <h3 className="text-blue-400 text-sm font-bold uppercase tracking-wider mt-6 mb-3">Key Mechanisms</h3>
              <ul className="space-y-2 list-none p-0">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">⊕</span>
                  <span><strong>Metabolite Production:</strong> Bacteria such as <em>Bifidobacterium</em> and <em>Akkermansia muciniphila</em> produce short-chain fatty acids (SCFAs) and inosine, which systemicly modulate CD8+ T cell activation <a href="#" className="text-blue-400 text-xs hover:underline">[1]</a><a href="#" className="text-blue-400 text-xs hover:underline">[2]</a>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">⊕</span>
                  <span><strong>Dendritic Cell Priming:</strong> Microbial antigens cross-react with tumor antigens, enhancing dendritic cell presentation and subsequent T-cell priming in the tumor microenvironment <a href="#" className="text-blue-400 text-xs hover:underline">[3]</a>.</span>
                </li>
              </ul>

              <h3 className="text-blue-400 text-sm font-bold uppercase tracking-wider mt-6 mb-3">Clinical Evidence</h3>
              <p>
                Fecal microbiota transplantation (FMT) from ICI-responding patients into germ-free mice or non-responding patients has successfully overcome resistance to anti-PD-1 therapy in Phase I trials <a href="#" className="text-blue-400 text-xs hover:underline">[4]</a>. Conversely, the use of broad-spectrum antibiotics shortly before or after initiating ICI therapy is strongly associated with worse clinical outcomes <a href="#" className="text-blue-400 text-xs hover:underline">[5]</a>.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-700 flex gap-4">
               <button className="px-4 py-2 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-lg border border-blue-500/30 hover:bg-blue-600/30 transition">
                 View Full Reasoning Trace
               </button>
               <button className="px-4 py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg border border-slate-600 hover:bg-slate-700 transition">
                 Save to Workspace
               </button>
            </div>
         </div>

         {/* Source Citations */}
         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Primary Evidence Sources</h3>
         
         <div className="space-y-4">
            
            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 flex gap-4 hover:border-slate-500 transition">
               <div className="w-8 h-8 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/30">1</div>
               <div>
                 <h4 className="text-white font-bold text-base hover:text-blue-400 cursor-pointer">Gut microbiome modulates response to anti-PD-1 immunotherapy in melanoma patients</h4>
                 <div className="text-xs text-slate-400 mt-1 mb-2">Gopalakrishnan V, et al. | <span className="italic">Science</span> (2018) | Cited by 4,120</div>
                 <div className="text-xs text-emerald-400 bg-emerald-900/20 inline-block px-2 py-0.5 rounded border border-emerald-800">Highly Influential</div>
               </div>
            </div>

            <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-5 flex gap-4 hover:border-slate-500 transition">
               <div className="w-8 h-8 rounded bg-blue-900/50 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-500/30">2</div>
               <div>
                 <h4 className="text-white font-bold text-base hover:text-blue-400 cursor-pointer">Microbiome-derived inosine modulates response to checkpoint inhibitor immunotherapy</h4>
                 <div className="text-xs text-slate-400 mt-1 mb-2">Mager LF, et al. | <span className="italic">Science</span> (2020) | Cited by 845</div>
                 <div className="text-xs text-blue-400 bg-blue-900/20 inline-block px-2 py-0.5 rounded border border-blue-800">Mechanistic Evidence</div>
               </div>
            </div>

         </div>

      </main>

    </div>
  );
}
