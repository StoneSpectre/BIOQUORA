import React, { useState, useEffect } from 'react';

export default function BioInnovationStartupBuilder() {

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
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-6">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center font-bold text-white text-2xl">⚡</div>
             <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">Kynetic Therapeutics</h1>
                <p className="text-indigo-300 font-medium mt-1">Oncology Spin-out • Pre-Seed • Bioquora Incubator</p>
             </div>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-700">View Data Room</button>
             <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg shadow hover:bg-indigo-500">Update Roadmap</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Cap Table & Team */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg overflow-hidden">
                 <div className="bg-slate-800/50 px-5 py-3 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-200">Capitalization Table</h3>
                    <button className="text-xs text-indigo-400 hover:text-indigo-300">Issue Shares</button>
                 </div>
                 <div className="p-5">
                    
                    {/* Donut Chart Mockup */}
                    <div className="flex justify-center mb-6">
                       <div className="w-32 h-32 rounded-full border-[16px] border-indigo-500 relative flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-[16px] border-purple-500" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 0 100%, 0 50%)' }}></div>
                          <div className="absolute inset-0 rounded-full border-[16px] border-slate-600" style={{ clipPath: 'polygon(50% 50%, 0 50%, 0 0, 50% 0)' }}></div>
                          <div className="text-center">
                             <div className="text-xs text-slate-400">Total</div>
                             <div className="font-bold text-white">10M</div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-3 text-sm">
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-indigo-500 rounded-full"></div> <span className="text-slate-300">Founders</span></div>
                          <div className="font-bold text-white">65.0%</div>
                       </div>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full"></div> <span className="text-slate-300">University IP (Stanford)</span></div>
                          <div className="font-bold text-white">15.0%</div>
                       </div>
                       <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-600 rounded-full"></div> <span className="text-slate-300">Option Pool</span></div>
                          <div className="font-bold text-white">20.0%</div>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg p-5">
                 <h3 className="text-sm font-bold text-slate-200 mb-4">Core Team</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white">JC</div>
                       <div>
                          <div className="text-sm font-bold text-white">Dr. James Chen</div>
                          <div className="text-xs text-slate-400">CEO / Scientific Founder</div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center font-bold text-white">AL</div>
                       <div>
                          <div className="text-sm font-bold text-white">Alice Lee, PhD</div>
                          <div className="text-xs text-slate-400">CTO / Lead Computation</div>
                       </div>
                    </div>
                    <button className="w-full py-2 border border-dashed border-slate-600 text-slate-400 text-xs font-bold rounded hover:bg-slate-800 hover:text-white transition">
                       + Add Team Member
                    </button>
                 </div>
              </div>

           </div>

           {/* MVP Roadmap & Milestones */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg p-6">
                 <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
                    <span className="text-indigo-400">🎯</span> Commercialization Roadmap
                 </h3>
                 
                 <div className="relative pl-6 border-l-2 border-slate-700 space-y-8">
                    
                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#1e293b]"></div>
                       <div className="text-xs font-bold text-emerald-400 mb-1">COMPLETED • Q2 2026</div>
                       <h4 className="text-lg font-bold text-white">IP Licensing Finalized</h4>
                       <p className="text-sm text-slate-400 mt-1">Exclusive license signed with Stanford OTL for the KRAS G12D PROTAC patent family.</p>
                    </div>

                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 bg-indigo-500 rounded-full border-4 border-[#1e293b] animate-pulse"></div>
                       <div className="text-xs font-bold text-indigo-400 mb-1">IN PROGRESS • Q3 2026</div>
                       <h4 className="text-lg font-bold text-white">In Vivo Efficacy (Mouse Models)</h4>
                       <p className="text-sm text-slate-400 mt-1">Validating tumor regression in PDX models via BioLab automated workflows.</p>
                       <div className="mt-3 bg-slate-900 rounded p-3 text-xs font-mono border border-slate-700 flex justify-between items-center">
                          <span className="text-slate-300">Experiment_ID: EXP-8492</span>
                          <span className="text-amber-400">60% Complete</span>
                       </div>
                    </div>

                    <div className="relative">
                       <div className="absolute -left-[31px] w-4 h-4 bg-slate-700 rounded-full border-4 border-[#1e293b]"></div>
                       <div className="text-xs font-bold text-slate-500 mb-1">PLANNED • Q1 2027</div>
                       <h4 className="text-lg font-bold text-slate-300">Pre-IND Meeting with FDA</h4>
                       <p className="text-sm text-slate-500 mt-1">Submit briefing package generated via BioScientistX Regulatory module.</p>
                    </div>

                 </div>
              </div>

              {/* Startup Sandbox Integration */}
              <div className="bg-gradient-to-r from-slate-800 to-indigo-900/40 border border-indigo-500/30 rounded-xl p-6 shadow-lg flex items-center justify-between">
                 <div>
                    <h3 className="font-bold text-white mb-1">BioStudio Integration</h3>
                    <p className="text-sm text-indigo-200">Your startup's codebase and data are synced with BioStudio.</p>
                 </div>
                 <button className="px-5 py-2 bg-indigo-600 text-white text-sm font-bold rounded shadow hover:bg-indigo-500">Launch Startup IDE</button>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
