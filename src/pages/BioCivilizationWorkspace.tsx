import React, { useState, useEffect } from 'react';

export default function BioCivilizationWorkspace() {

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
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 flex flex-col items-center justify-center text-center border-b border-slate-200 pb-10">
          <div className="w-16 h-16 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg mb-4">
             <span className="text-3xl text-white">🏛️</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">BioCivilization Workspace</h1>
          <p className="text-slate-500 max-w-2xl">
            The ultimate integration layer. Access unified knowledge, global heritage archives, and civilization-scale analytics across the entire Bioquora ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Civilization Metrics */}
           <div className="col-span-3 grid grid-cols-4 gap-4 mb-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Preserved Knowledge</div>
                 <div className="text-3xl font-bold text-slate-800">41.2M</div>
                 <div className="text-[10px] text-slate-400 mt-1">Archived Discoveries</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Global Integration</div>
                 <div className="text-3xl font-bold text-amber-500">100%</div>
                 <div className="text-[10px] text-slate-400 mt-1">20 Bioquora Systems Online</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Federated Nodes</div>
                 <div className="text-3xl font-bold text-slate-800">12,408</div>
                 <div className="text-[10px] text-slate-400 mt-1">Active Institutions</div>
              </div>
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
                 <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Civilization Index</div>
                 <div className="text-3xl font-bold text-orange-500">98.4</div>
                 <div className="text-[10px] text-slate-400 mt-1">Planetary Resilience Score</div>
              </div>
           </div>

           {/* Core Pillars */}
           <div className="col-span-1 space-y-4">
              <div className="bg-white border-l-4 border-amber-500 p-6 rounded-r-xl shadow-sm hover:shadow-md transition cursor-pointer">
                 <h3 className="text-lg font-bold text-slate-800 mb-2">Living Memory Engine</h3>
                 <p className="text-sm text-slate-500">Track the evolution of scientific evidence and consensus across generations.</p>
              </div>
              <div className="bg-white border-l-4 border-orange-500 p-6 rounded-r-xl shadow-sm hover:shadow-md transition cursor-pointer">
                 <h3 className="text-lg font-bold text-slate-800 mb-2">Heritage Vault</h3>
                 <p className="text-sm text-slate-500">Immutable planetary archive for humanity's landmark biomedical discoveries.</p>
              </div>
              <div className="bg-white border-l-4 border-rose-500 p-6 rounded-r-xl shadow-sm hover:shadow-md transition cursor-pointer">
                 <h3 className="text-lg font-bold text-slate-800 mb-2">Civilization Atlas</h3>
                 <p className="text-sm text-slate-500">Interactive macroscopic view of the completely integrated Bioquora ecosystem.</p>
              </div>
           </div>

           {/* Universal Search & Knowledge Feed */}
           <div className="col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm p-8">
              <div className="relative mb-8">
                 <input 
                    type="text" 
                    placeholder="Search the sum of human biomedical knowledge..." 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition shadow-inner"
                 />
                 <span className="absolute left-4 top-4 text-2xl">🔍</span>
              </div>

              <div>
                 <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Recent Civilization Milestones</h3>
                 
                 <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold text-lg">✓</div>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="font-bold text-slate-800">Global Eradication of Polio Certified</h4>
                             <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">Public Health</span>
                          </div>
                          <p className="text-sm text-slate-500">BioEarth federation data officially confirms zero wild-type transmissions globally for 36 consecutive months.</p>
                          <div className="mt-2 text-xs font-bold text-amber-600">Archived to Heritage Vault</div>
                       </div>
                    </div>

                    <div className="flex gap-4 items-start">
                       <div className="w-10 h-10 rounded bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-lg">AI</div>
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <h4 className="font-bold text-slate-800">AlphaEvolve-3 Achieves Broad Generalization</h4>
                             <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">BioScientistX</span>
                          </div>
                          <p className="text-sm text-slate-500">First AI system to autonomously design, test, and publish a novel metabolic pathway in a peer-reviewed BioPublish journal.</p>
                          <div className="mt-2 text-xs font-bold text-amber-600">Archived to Memory Engine</div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
