import React, { useState, useEffect } from 'react';

export default function BioPublishArchive() {

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
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-4 flex items-center justify-center gap-4">
            <span className="text-cyan-400">🏛️</span> Global Research Archive
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            The permanent, version-controlled, and FAIR-validated repository for humanity's biomedical knowledge.
          </p>
          
          <div className="mt-8 max-w-2xl mx-auto relative">
             <input 
               type="text" 
               placeholder="Search publications, datasets, models, or workflows by DOI or keyword..." 
               className="w-full bg-[#1e293b] border-2 border-slate-700 rounded-full px-6 py-4 text-lg text-white focus:outline-none focus:border-cyan-500 transition shadow-lg"
             />
             <button className="absolute right-3 top-3 bg-cyan-600 text-white px-6 py-1.5 rounded-full font-bold hover:bg-cyan-500">Search</button>
          </div>
        </header>

        <div className="grid grid-cols-4 gap-6 mb-12">
           
           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 text-center shadow-lg">
             <div className="text-cyan-400 text-3xl mb-2">📄</div>
             <div className="text-3xl font-bold text-white mb-1">12.4M</div>
             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Living Publications</div>
           </div>

           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 text-center shadow-lg">
             <div className="text-emerald-400 text-3xl mb-2">💾</div>
             <div className="text-3xl font-bold text-white mb-1">45.1 PB</div>
             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Verified Datasets</div>
           </div>

           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 text-center shadow-lg">
             <div className="text-purple-400 text-3xl mb-2">🧠</div>
             <div className="text-3xl font-bold text-white mb-1">84,211</div>
             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Executable Models</div>
           </div>

           <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-6 text-center shadow-lg">
             <div className="text-blue-400 text-3xl mb-2">🔗</div>
             <div className="text-3xl font-bold text-white mb-1">1.2B</div>
             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Graph Relationships</div>
           </div>

        </div>

        {/* FAIR Compliance Dashboard */}
        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8 shadow-xl">
           <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">FAIR Compliance Engine</h2>
           
           <div className="grid grid-cols-2 gap-12">
              
              <div>
                 <p className="text-sm text-slate-400 mb-6">
                    BioPublish enforces strict adherence to FAIR (Findable, Accessible, Interoperable, Reusable) principles. 
                    Submissions that fail validation are blocked from final publication until resolved.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-white">F - Findability</span>
                       <span className="text-cyan-400 font-mono text-sm">99.8% Compliance</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full"><div className="h-full w-[99.8%] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div></div>

                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-white">A - Accessibility</span>
                       <span className="text-cyan-400 font-mono text-sm">100% Compliance</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full"><div className="h-full w-[100%] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div></div>

                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-white">I - Interoperability</span>
                       <span className="text-amber-400 font-mono text-sm">87.4% Compliance</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full"><div className="h-full w-[87.4%] bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div></div>

                    <div className="flex items-center justify-between">
                       <span className="text-sm font-bold text-white">R - Reusability</span>
                       <span className="text-cyan-400 font-mono text-sm">92.1% Compliance</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full"><div className="h-full w-[92.1%] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div></div>
                 </div>
              </div>

              <div className="bg-[#0f172a] rounded-xl p-6 border border-slate-700 font-mono text-xs text-slate-400 overflow-y-auto">
                 <div className="text-slate-500 mb-2">## Live Validation Logs</div>
                 <div className="text-emerald-400">[2026-07-30 00:23:14] VALIDATE: BQP-2026-1102</div>
                 <div className="text-slate-300">Checking DOI resolution... OK</div>
                 <div className="text-slate-300">Scanning attached Dockerfile for reproducibility...</div>
                 <div className="text-slate-300">Resolving dependencies... OK</div>
                 <div className="text-emerald-400">FAIR Score: 96/100. Ready for archive.</div>
                 <div className="mt-2 text-emerald-400">[2026-07-30 00:23:18] VALIDATE: BQP-2026-1105</div>
                 <div className="text-slate-300">Checking dataset metadata (Dublin Core)...</div>
                 <div className="text-rose-400">ERROR: Missing required field `dc:creator` for dataset DS-881.</div>
                 <div className="text-amber-400">WARN: Interoperability score lowered. Rejecting archive request.</div>
              </div>

           </div>
        </div>

      </div>
    </div>
  );
}
