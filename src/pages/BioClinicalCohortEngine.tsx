import React, { useState, useEffect } from 'react';

export default function BioClinicalCohortEngine() {

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
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-slate-800 tracking-tight">Dynamic Cohort Builder</h1>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Database:</span>
            <span className="font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Bioquora RWD Network
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 transition">Export OMOP Data</button>
          <button className="px-3 py-1.5 bg-[#0052CC] text-white text-xs font-medium rounded hover:bg-[#0047B3] transition shadow-sm">Save Cohort Definition</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6 max-w-7xl mx-auto w-full">
        
        {/* Left Column: Query Builder */}
        <div className="w-1/2 flex flex-col gap-4">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-800">Inclusion Rules</h2>
              <button className="text-[#0052CC] text-xs font-medium">+ Add Rule Group</button>
            </div>
            
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              
              {/* Rule Group 1 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-1.5 py-0.5 bg-blue-100 text-[#0052CC] text-[10px] font-bold rounded">AND</span>
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Demographics</span>
                </div>
                
                <div className="flex gap-3 items-center mb-2">
                  <select className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none">
                    <option>Age at index date</option>
                  </select>
                  <select className="w-24 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none">
                    <option>Between</option>
                  </select>
                  <input type="number" defaultValue={18} className="w-16 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none text-center" />
                  <span className="text-slate-400 text-sm">and</span>
                  <input type="number" defaultValue={75} className="w-16 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none text-center" />
                  <button className="text-slate-400 hover:text-rose-500">✕</button>
                </div>
              </div>

              {/* Rule Group 2 */}
              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-1.5 py-0.5 bg-blue-100 text-[#0052CC] text-[10px] font-bold rounded">AND</span>
                  <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Conditions & Biomarkers</span>
                </div>
                
                <div className="flex gap-3 items-center mb-2">
                  <select className="flex-1 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none">
                    <option>Condition Occurrence</option>
                  </select>
                  <select className="w-24 bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-700 focus:outline-none">
                    <option>Contains</option>
                  </select>
                  <div className="flex-1 relative">
                    <span className="absolute left-2 top-1.5 text-slate-400 text-sm">ICD10:</span>
                    <input type="text" defaultValue="I50.9 (Heart failure, unspecified)" className="w-full bg-white border border-slate-300 rounded py-1.5 pl-14 pr-2 text-sm text-slate-700 focus:outline-none font-medium" />
                  </div>
                  <button className="text-slate-400 hover:text-rose-500">✕</button>
                </div>

                <div className="flex gap-3 items-center opacity-50 pl-8 relative">
                   <div className="absolute left-3 top-0 bottom-0 w-px bg-slate-300"></div>
                   <div className="absolute left-3 top-1/2 w-4 h-px bg-slate-300"></div>
                   <span className="px-1.5 py-0.5 bg-slate-200 text-slate-500 text-[10px] font-bold rounded z-10">OR</span>
                   <button className="text-xs text-slate-500 hover:text-[#0052CC] font-medium">+ Add Criteria</button>
                </div>
              </div>

            </div>
          </div>
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-800">Exclusion Rules</h2>
              <button className="text-[#0052CC] text-xs font-medium">+ Add Rule Group</button>
            </div>
            <div className="p-4 flex items-center justify-center text-sm text-slate-500 italic h-24">
              No exclusion criteria defined.
            </div>
          </div>

        </div>

        {/* Right Column: Real-time Analytics */}
        <div className="w-1/2 flex flex-col gap-4">
          
          {/* Funnel Attrition */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Cohort Attrition Funnel</h2>
            
            <div className="space-y-3">
              <div className="relative h-10 w-full flex items-center justify-between z-10">
                <div className="absolute inset-0 bg-[#0052CC]/10 rounded border border-[#0052CC]/20 -z-10"></div>
                <span className="pl-3 text-sm font-medium text-slate-700">Initial Population (Network)</span>
                <span className="pr-3 text-sm font-mono text-slate-800">12,450,210</span>
              </div>
              
              <div className="relative h-10 w-[85%] mx-auto flex items-center justify-between z-10">
                <div className="absolute inset-0 bg-[#0052CC]/20 rounded border border-[#0052CC]/30 -z-10"></div>
                <span className="pl-3 text-sm font-medium text-slate-700">Age bounds applied</span>
                <span className="pr-3 text-sm font-mono text-slate-800">8,102,400</span>
              </div>

              <div className="relative h-10 w-[15%] mx-auto flex items-center justify-between z-10">
                <div className="absolute inset-0 bg-[#0052CC] rounded shadow -z-10"></div>
                <span className="pl-3 text-sm font-medium text-white">Condition: I50.9</span>
                <span className="pr-3 text-sm font-mono text-white">124,530</span>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-sm text-slate-500">Final Target Cohort</span>
              <span className="text-2xl font-bold text-[#0052CC] font-mono">124,530</span>
            </div>
          </div>

          {/* Demographic Distributions */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 flex-1 flex flex-col">
            <h2 className="text-sm font-semibold text-slate-800 mb-4">Cohort Demographics (Preview)</h2>
            <div className="flex-1 flex gap-6">
              
              {/* Mock Chart 1 */}
              <div className="flex-1 flex flex-col">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2 text-center">Sex Distribution</div>
                <div className="flex-1 relative flex items-center justify-center border border-slate-100 rounded bg-slate-50">
                   <div className="w-24 h-24 rounded-full border-[12px] border-[#0052CC] border-r-emerald-500"></div>
                   <div className="absolute text-xs font-mono font-bold text-slate-700">58% M</div>
                </div>
              </div>

              {/* Mock Chart 2 */}
              <div className="flex-1 flex flex-col">
                <div className="text-xs font-semibold text-slate-500 uppercase mb-2 text-center">Age Distribution</div>
                <div className="flex-1 relative flex items-end justify-center border border-slate-100 rounded bg-slate-50 gap-1 px-2 pt-4">
                   <div className="w-6 bg-slate-300 rounded-t h-[20%]" title="18-30"></div>
                   <div className="w-6 bg-slate-400 rounded-t h-[40%]" title="31-50"></div>
                   <div className="w-6 bg-[#0052CC] rounded-t h-[80%]" title="51-65"></div>
                   <div className="w-6 bg-[#0047B3] rounded-t h-[95%]" title="66-75"></div>
                </div>
              </div>
              
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
