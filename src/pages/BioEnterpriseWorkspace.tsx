import React, { useState, useEffect } from 'react';

export default function BioEnterpriseWorkspace() {

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
        
        {/* Enterprise Header */}
        <header className="mb-8 flex justify-between items-end border-b border-slate-200 pb-6">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 bg-white border border-slate-200 rounded-xl shadow-sm flex items-center justify-center font-bold text-red-700 text-xl">SU</div>
             <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Stanford University School of Medicine</h1>
                <p className="text-slate-500 font-medium">Department of Structural Biology • BioEnterprise Portal</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-lg shadow-sm hover:bg-slate-50">Global Search</button>
             <button className="px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg shadow hover:bg-slate-800">New Project</button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-8">
           
           {/* Left: Quick Access & Active Work */}
           <div className="col-span-8 space-y-8">
              
              <div className="grid grid-cols-3 gap-4">
                 <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm cursor-pointer hover:border-slate-300 hover:shadow">
                    <div className="text-xl mb-2">🔬</div>
                    <div className="font-bold text-slate-800">My Lab</div>
                    <div className="text-xs text-slate-500 mt-1">4 Active BioStudio Instances</div>
                 </div>
                 <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm cursor-pointer hover:border-slate-300 hover:shadow">
                    <div className="text-xl mb-2">💰</div>
                    <div className="font-bold text-slate-800">Grants & Funding</div>
                    <div className="text-xs text-emerald-600 font-medium mt-1">NIH R01 Report Due in 14d</div>
                 </div>
                 <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm cursor-pointer hover:border-slate-300 hover:shadow relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-blue-50 rounded-bl-full z-0"></div>
                    <div className="text-xl mb-2 relative z-10">🤖</div>
                    <div className="font-bold text-slate-800 relative z-10">Enterprise AI</div>
                    <div className="text-xs text-blue-600 font-medium mt-1 relative z-10">Ask Org Knowledge Graph</div>
                 </div>
              </div>

              {/* Active Projects */}
              <div>
                 <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Active Department Projects</h2>
                 <div className="space-y-4">
                    
                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-500 font-bold">P1</div>
                          <div>
                             <h3 className="text-base font-bold text-slate-800">Targeting KRAS G12D with PROTACs</h3>
                             <p className="text-xs text-slate-500 mt-1">PI: Dr. James Chen • NIH Funded (R01-CA123456) • 12 Members</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-xs font-bold text-slate-600 mb-1">Compute Usage</div>
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-400 w-[85%]"></div></div>
                          <div className="text-[10px] text-amber-600 font-medium mt-1">85% of Monthly GPU Quota</div>
                       </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex items-center justify-between">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-50 border border-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">P2</div>
                          <div>
                             <h3 className="text-base font-bold text-slate-800">scRNA-Seq Atlas of Tumor Microenvironment</h3>
                             <p className="text-xs text-slate-500 mt-1">PI: Dr. Emily Rostova • Internal Seed Grant • 8 Members</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="text-xs font-bold text-slate-600 mb-1">Compute Usage</div>
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[24%]"></div></div>
                          <div className="text-[10px] text-emerald-600 font-medium mt-1">24% of Monthly GPU Quota</div>
                       </div>
                    </div>

                 </div>
              </div>
           </div>

           {/* Right: Institutional Feed & Compliance */}
           <div className="col-span-4 space-y-6">
              
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                 <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-700">Governance & Compliance</h3>
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded">All Clear</span>
                 </div>
                 <div className="p-5 space-y-4">
                    <div className="flex items-start gap-3">
                       <span className="text-emerald-500">✓</span>
                       <div>
                          <div className="text-sm font-bold text-slate-800">IRB Protocol Renewed</div>
                          <div className="text-xs text-slate-500">Protocol #49281 approved until Oct 2027.</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <span className="text-emerald-500">✓</span>
                       <div>
                          <div className="text-sm font-bold text-slate-800">Data Sharing Agreement</div>
                          <div className="text-xs text-slate-500">MTA with UCSF finalized and signed.</div>
                       </div>
                    </div>
                    <div className="flex items-start gap-3">
                       <span className="text-amber-500">⚠️</span>
                       <div>
                          <div className="text-sm font-bold text-slate-800">Data Storage Audit</div>
                          <div className="text-xs text-slate-500">Please migrate legacy FASTQ files to cold storage by Friday.</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-slate-900 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🏢</div>
                 <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider mb-2 relative z-10">Cross-Institution Collab</h3>
                 <p className="text-sm text-slate-300 mb-4 relative z-10">Stanford has established a federated data pipeline with Dana-Farber. You can now request cross-access to their clinical cohorts.</p>
                 <button className="w-full py-2 bg-blue-600 text-white text-sm font-bold rounded shadow hover:bg-blue-500 transition relative z-10">Browse Federated Catalog</button>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
