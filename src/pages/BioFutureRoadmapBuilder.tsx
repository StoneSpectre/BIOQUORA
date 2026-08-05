import React, { useState, useEffect } from 'react';

export default function BioFutureRoadmapBuilder() {

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 border-b border-slate-200 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
               <span className="text-blue-600">🛣️</span> AI Strategic Roadmap Builder
            </h1>
            <p className="text-slate-500 mt-1">Translate future scenarios into actionable 5-to-10 year institutional research plans.</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg shadow hover:bg-blue-700">Export Roadmap (PDF)</button>
        </header>

        <div className="grid grid-cols-4 gap-8">
           
           {/* Sidebar Tools */}
           <div className="col-span-1 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                 <h3 className="font-bold text-slate-800 text-sm mb-4">Strategic Horizon</h3>
                 <select className="w-full bg-slate-50 border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                    <option>5 Years (2026-2031)</option>
                    <option>10 Years (2026-2036)</option>
                    <option>Long Term (2050)</option>
                 </select>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                 <h3 className="font-bold text-slate-800 text-sm mb-4">AI Alignment</h3>
                 <p className="text-xs text-slate-500 mb-3">Align milestones with projected technology readiness levels (TRL).</p>
                 <button className="w-full py-2 bg-slate-100 text-blue-700 font-bold text-xs rounded border border-blue-200 hover:bg-blue-50">Auto-Align Milestones</button>
              </div>
           </div>

           {/* Timeline Editor */}
           <div className="col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm p-8">
              
              <h2 className="text-xl font-bold text-slate-800 mb-8">Initiative: Next-Gen Cell Therapies</h2>

              <div className="relative border-l-2 border-blue-100 ml-4 space-y-10">
                 
                 {/* Milestone 1 */}
                 <div className="relative pl-8">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-white shadow"></div>
                    <div className="text-sm font-bold text-blue-600 mb-1">Phase 1: Foundation (2026-2028)</div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                       <h4 className="font-bold text-slate-800 mb-2">Establish In-Vivo Reprogramming Core</h4>
                       <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                          <li>Secure $15M institutional funding for LNP delivery optimization.</li>
                          <li>Recruit 3 Principle Investigators specializing in computational immunology.</li>
                          <li>Deploy local instance of Bioquora AI Scientist for target discovery.</li>
                       </ul>
                    </div>
                 </div>

                 {/* Milestone 2 */}
                 <div className="relative pl-8">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-slate-300 rounded-full border-4 border-white shadow"></div>
                    <div className="text-sm font-bold text-slate-500 mb-1">Phase 2: Translation (2028-2030)</div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-lg">
                       <h4 className="font-bold text-slate-800 mb-2">First-in-Human IND Filings</h4>
                       <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                          <li>Spin out 2 startup companies via BioInnovation pipeline.</li>
                          <li>Execute Phase I trials using federated BioEarth clinical network.</li>
                       </ul>
                       <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-start gap-2">
                          <span className="font-bold">⚠️ Risk Flag:</span> Based on AI forecast, regulatory frameworks for in-vivo editing may face delays in the EU region during this window.
                       </div>
                    </div>
                 </div>

                 {/* Milestone 3 */}
                 <div className="relative pl-8">
                    <div className="absolute -left-[11px] top-1 w-5 h-5 bg-slate-300 rounded-full border-4 border-white shadow"></div>
                    <div className="text-sm font-bold text-slate-500 mb-1">Phase 3: Scale (2031+)</div>
                    <div className="border-2 border-dashed border-slate-200 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 transition">
                       <span className="text-slate-400 font-bold text-sm">+ Add Phase 3 Milestone</span>
                    </div>
                 </div>

              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
