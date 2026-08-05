import React, { useState, useEffect } from 'react';

export default function BioPublishReview() {

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-end border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-3">
              <span className="text-indigo-500">⚖️</span> Editorial Management
            </h1>
            <p className="text-slate-500">Peer review tracking, AI pre-screening, and editorial decisions.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg shadow-sm hover:bg-slate-50">Assign Reviewers</button>
             <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow hover:bg-indigo-700">Make Decision</button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
           
           {/* Left: Submissions List */}
           <div className="col-span-4 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col h-[700px]">
              <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 font-bold text-sm text-slate-700">
                Active Submissions (12)
              </div>
              
              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                 
                 {/* Selected Submission */}
                 <div className="p-4 bg-indigo-50/50 cursor-pointer border-l-4 border-indigo-500">
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-bold text-slate-500 font-mono">BQP-2026-0842</span>
                       <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-100 text-amber-700">In Review</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2">Deep learning prediction of GPCR conformational dynamics</h3>
                    <div className="text-xs text-slate-500">Submitted: 14 days ago</div>
                 </div>

                 {/* Other Submission */}
                 <div className="p-4 hover:bg-slate-50 cursor-pointer border-l-4 border-transparent">
                    <div className="flex justify-between items-start mb-1">
                       <span className="text-xs font-bold text-slate-500 font-mono">BQP-2026-0911</span>
                       <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-emerald-100 text-emerald-700">Revised</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 leading-tight mb-2">Single-cell RNA-seq reveals distinct fibroblast subpopulations</h3>
                    <div className="text-xs text-slate-500">Submitted: 3 days ago</div>
                 </div>

              </div>
           </div>

           {/* Right: Submission Details & AI Pre-screen */}
           <div className="col-span-8 space-y-6">
              
              {/* Top: Metadata */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
                 <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Deep learning prediction of GPCR conformational dynamics</h2>
                 <p className="text-sm text-slate-600 mb-6">Authors: Dr. Emily Rostova, Dr. James Chen</p>

                 <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded border border-slate-100">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-1">Review Status</div>
                       <div className="text-lg font-bold text-slate-800">2 / 3 Received</div>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded border border-emerald-100">
                       <div className="text-xs font-bold text-emerald-600 uppercase mb-1">FAIR Score</div>
                       <div className="text-lg font-bold text-emerald-700">94% (A)</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded border border-slate-100">
                       <div className="text-xs font-bold text-slate-400 uppercase mb-1">Linked Assets</div>
                       <div className="text-sm font-bold text-slate-800">1 Dataset, 1 Model</div>
                    </div>
                 </div>
              </div>

              {/* AI Pre-Screening Report */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="bg-indigo-900 px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">🤖</span>
                      <h3 className="text-sm font-bold text-white tracking-wide">AI Integrity & Reproducibility Pre-Screen</h3>
                    </div>
                    <span className="text-xs text-indigo-300 font-mono">Run: 14 days ago</span>
                 </div>
                 
                 <div className="p-6 space-y-4">
                    
                    <div className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
                       <div>
                         <h4 className="text-sm font-bold text-slate-800">Plagiarism / Similarity</h4>
                         <p className="text-xs text-slate-600 mt-1">Similarity score is 4%. No major overlapping text detected outside of methodology boilerplate.</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">✓</div>
                       <div>
                         <h4 className="text-sm font-bold text-slate-800">Code Executability</h4>
                         <p className="text-xs text-slate-600 mt-1">BioStudio container successfully built. `main.py` executed without errors in CI sandbox.</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-4">
                       <div className="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">⚠️</div>
                       <div>
                         <h4 className="text-sm font-bold text-slate-800">Statistical Reporting</h4>
                         <p className="text-xs text-slate-600 mt-1">P-values are reported in Table 2, but exact statistical tests (e.g., Student's t-test vs. Mann-Whitney) are not explicitly stated in the legend.</p>
                       </div>
                    </div>

                 </div>
              </div>

              {/* Reviewer Reports */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-800">Reviewer Reports</h3>
                 </div>
                 <div className="p-6">
                    <div className="border border-slate-200 rounded p-4 mb-4">
                       <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm text-slate-800">Reviewer 1</span>
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Accept</span>
                       </div>
                       <p className="text-sm text-slate-600 font-serif italic">"The authors have presented a highly robust model. The attached BioStudio executable workflow makes verifying their claims trivial. Excellent work."</p>
                    </div>
                    
                    <div className="border border-slate-200 rounded p-4">
                       <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-sm text-slate-800">Reviewer 2</span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">Minor Revision</span>
                       </div>
                       <p className="text-sm text-slate-600 font-serif italic">"The dataset is comprehensive, however, as noted by the AI pre-screen, the exact statistical tests for Table 2 need to be documented."</p>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
