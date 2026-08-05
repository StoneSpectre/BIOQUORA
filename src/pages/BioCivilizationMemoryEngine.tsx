import React, { useState, useEffect } from 'react';

export default function BioCivilizationMemoryEngine() {

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
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-stone-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-stone-800 tracking-tight flex items-center gap-3">
               <span className="text-stone-500">📜</span> Living Scientific Memory
            </h1>
            <p className="text-stone-500 mt-2">Tracking the multi-generational evolution of hypotheses, evidence, and scientific consensus.</p>
          </div>
        </header>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-8">
           
           <h2 className="text-2xl font-bold text-stone-800 mb-8">Evolution of: <span className="text-amber-700">The Amyloid Hypothesis in Alzheimer's</span></h2>

           {/* Timeline Graphic */}
           <div className="relative border-l-4 border-stone-200 ml-6 space-y-12 pb-8">
              
              {/* Event 1 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[14px] top-1 w-6 h-6 bg-stone-400 rounded-full border-4 border-white shadow"></div>
                 <div className="text-sm font-bold text-stone-500 mb-1">1991 (Historical Origin)</div>
                 <div className="bg-stone-100 p-5 rounded-lg border border-stone-200">
                    <h4 className="font-bold text-stone-800 mb-2">Original Formulation</h4>
                    <p className="text-sm text-stone-600 mb-3">
                       Hardy and Allsop propose that amyloid-beta deposition is the causative agent of Alzheimer's Disease pathology.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[10px] bg-white border border-stone-200 text-stone-500 px-2 py-1 rounded font-bold">Seminal Paper</span>
                       <span className="text-[10px] bg-white border border-stone-200 text-stone-500 px-2 py-1 rounded font-bold">14,203 Citations</span>
                    </div>
                 </div>
              </div>

              {/* Event 2 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[14px] top-1 w-6 h-6 bg-rose-400 rounded-full border-4 border-white shadow"></div>
                 <div className="text-sm font-bold text-rose-500 mb-1">2000s - 2010s (Controversy & Refutation)</div>
                 <div className="bg-rose-50 p-5 rounded-lg border border-rose-200">
                    <h4 className="font-bold text-stone-800 mb-2">Clinical Trial Failures & Alternate Hypotheses</h4>
                    <p className="text-sm text-stone-600 mb-3">
                       Dozens of amyloid-clearing drugs fail to improve cognition in Phase III trials. The Tau hypothesis and Neuroinflammation hypothesis gain significant traction.
                    </p>
                    <div className="flex flex-wrap gap-2">
                       <span className="text-[10px] bg-white border border-rose-200 text-rose-600 px-2 py-1 rounded font-bold">Bapineuzumab Failure</span>
                       <span className="text-[10px] bg-white border border-rose-200 text-rose-600 px-2 py-1 rounded font-bold">Solanezumab Failure</span>
                    </div>
                 </div>
              </div>

              {/* Event 3 */}
              <div className="relative pl-8">
                 <div className="absolute -left-[14px] top-1 w-6 h-6 bg-emerald-400 rounded-full border-4 border-white shadow"></div>
                 <div className="text-sm font-bold text-emerald-600 mb-1">2020s (Nuanced Consensus)</div>
                 <div className="bg-emerald-50 p-5 rounded-lg border border-emerald-200">
                    <h4 className="font-bold text-stone-800 mb-2">Early Intervention & Clearance Validation</h4>
                    <p className="text-sm text-stone-600 mb-3">
                       Lecanemab and Donanemab demonstrate clinical slowing of cognitive decline by targeting specific protofibrils in early-stage patients, validating amyloid as a core, but not exclusive, component.
                    </p>
                    <div className="flex gap-2">
                       <span className="text-[10px] bg-white border border-emerald-200 text-emerald-700 px-2 py-1 rounded font-bold">FDA Approval</span>
                       <span className="text-[10px] bg-white border border-emerald-200 text-emerald-700 px-2 py-1 rounded font-bold">Paradigm Shift</span>
                    </div>
                 </div>
              </div>

              {/* Event 4 (Current) */}
              <div className="relative pl-8">
                 <div className="absolute -left-[14px] top-1 w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow animate-pulse"></div>
                 <div className="text-sm font-bold text-amber-600 mb-1">2026 (BioCivilization Present)</div>
                 <div className="bg-amber-50 p-5 rounded-lg border border-amber-200 border-dashed">
                    <h4 className="font-bold text-stone-800 mb-2">Multi-Target Network Theory</h4>
                    <p className="text-sm text-stone-600">
                       Bioquora Knowledge Graph consensus establishes Alzheimer's as a multiplex network disorder requiring simultaneous targeting of Amyloid, Tau, and Microglial activation.
                    </p>
                    <div className="mt-4 pt-4 border-t border-amber-200/50 flex gap-4">
                       <button className="text-xs font-bold text-amber-700 hover:text-amber-800">View Underlying Knowledge Graph</button>
                    </div>
                 </div>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
