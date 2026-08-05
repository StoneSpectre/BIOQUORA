import React, { useState, useEffect } from 'react';

export default function BioFoundationReasoningEngine() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8 relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-cyan-500">⎈</span> Semantic Reasoning Backbone
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans max-w-2xl">
             Visualizing the multi-step deductive and inductive reasoning processes employed by SciLLM to answer complex biomedical queries.
          </p>
        </header>

        <div className="bg-[#111] border border-slate-800 rounded-xl p-8 shadow-2xl">
           
           <div className="mb-8 p-4 bg-slate-900/50 border border-slate-700 rounded text-sm font-sans">
              <span className="text-slate-500 font-bold mr-2 uppercase text-xs">Target Query:</span> 
              <span className="text-white">"Why did the experimental drug candidate XZ-204 fail Phase II trials for Rheumatoid Arthritis despite strong pre-clinical TNF-alpha inhibition?"</span>
           </div>

           {/* Reasoning Flow */}
           <div className="relative pl-10 border-l border-slate-800 space-y-8 pb-4">
              
              {/* Step 1 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-1 w-6 h-6 bg-slate-900 border border-cyan-500 rounded flex items-center justify-center text-[10px] text-cyan-500 font-bold">1</div>
                 <h3 className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2">Abductive Reasoning / Hypothesis Generation</h3>
                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-sm text-slate-400 font-sans">
                    SciLLM posits three potential hypotheses for Phase II failure: (A) Unexpected off-target toxicity, (B) Inadequate pharmacokinetics in human subjects vs. murine models, (C) Compensatory cytokine pathway upregulation (e.g., IL-6) bypassing TNF-alpha block.
                 </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-1 w-6 h-6 bg-slate-900 border border-purple-500 rounded flex items-center justify-center text-[10px] text-purple-500 font-bold">2</div>
                 <h3 className="text-purple-500 text-xs font-bold uppercase tracking-widest mb-2">Evidence Retrieval (Vector DB)</h3>
                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-sm text-slate-400 font-sans">
                    <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                       <span className="animate-spin">⚙️</span> Querying BioKnowledge Graph embeddings...
                    </div>
                    <ul className="space-y-2 list-disc pl-5 text-xs text-slate-300">
                       <li>Retrieved: <i>Pharmacokinetics of XZ-204 in healthy volunteers</i> (PMID: 342...). PK profile matches pre-clinical. <span className="text-rose-500 font-bold">[Refutes B]</span></li>
                       <li>Retrieved: <i>Cytokine profiling in XZ-204 Phase II cohort</i>. Shows 400% spike in IL-17 and IL-6 at week 4. <span className="text-emerald-500 font-bold">[Supports C]</span></li>
                    </ul>
                 </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-1 w-6 h-6 bg-slate-900 border border-amber-500 rounded flex items-center justify-center text-[10px] text-amber-500 font-bold">3</div>
                 <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-2">Deductive Synthesis & Fact-Checking</h3>
                 <div className="bg-[#0a0a0a] border border-slate-800 p-4 rounded text-sm text-slate-400 font-sans">
                    Synthesizing retrieved evidence. Passing through `SafeAI` hallucination checker. 
                    <div className="mt-3 p-2 bg-amber-950/30 border border-amber-900 rounded text-xs text-amber-500">
                       ✓ Grounding Check Passed: 98.4% overlap with provided citations.
                    </div>
                 </div>
              </div>

              {/* Final Output */}
              <div className="relative">
                 <div className="absolute -left-[45px] top-1 w-6 h-6 bg-slate-900 border border-emerald-500 rounded flex items-center justify-center text-[10px] text-emerald-500 font-bold">4</div>
                 <h3 className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">Final Grounded Response</h3>
                 <div className="bg-emerald-950/10 border border-emerald-900/50 p-4 rounded text-sm text-slate-300 font-sans leading-relaxed">
                    Based on available clinical data, XZ-204 failed Phase II trials primarily due to compensatory upregulation of alternative inflammatory pathways. While TNF-alpha was successfully inhibited, patients exhibited a significant spike in IL-6 and IL-17 levels by week 4, bypassing the primary mechanism of action and sustaining rheumatoid pathology. Pharmacokinetics and safety profiles were otherwise acceptable.
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
