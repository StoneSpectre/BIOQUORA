import React, { useState, useEffect } from 'react';

export default function BioInnovationObservatory() {

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
        
        <header className="mb-8 border-b border-slate-200 pb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center justify-center gap-3">
             <span className="text-blue-600">🌍</span> Global Biomedical Innovation Observatory
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
             Real-time macro analytics tracking the translation of research into commercial impact across the Bioquora ecosystem.
          </p>
        </header>

        {/* Global Impact Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-10">
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Total Startups Incubated</div>
              <div className="text-4xl font-bold text-slate-900">1,402</div>
              <div className="text-xs font-bold text-emerald-600 mt-2">↑ 34% YoY</div>
           </div>
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Venture Capital Raised</div>
              <div className="text-4xl font-bold text-blue-600">$8.4B</div>
              <div className="text-xs font-bold text-slate-500 mt-2">Across 320 Deals</div>
           </div>
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-center">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Patents Commercialized</div>
              <div className="text-4xl font-bold text-slate-900">8,912</div>
              <div className="text-xs font-bold text-slate-500 mt-2">Tech Transfer Licenses</div>
           </div>
           <div className="bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400 rounded-xl p-6 shadow-lg text-center text-white">
              <div className="text-emerald-100 text-xs font-bold uppercase tracking-wider mb-2">Bioquora Innovation Index</div>
              <div className="text-5xl font-bold mb-1">94.2</div>
              <div className="text-xs font-medium text-emerald-100 mt-1">Planetary Output Score</div>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
           
           {/* Top Sectors */}
           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                 <h3 className="font-bold text-slate-800">Top Growth Sectors (Q3 2026)</h3>
                 <p className="text-xs text-slate-500">Based on startup formation and funding volume.</p>
              </div>
              <div className="p-6 space-y-6">
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                       <span className="text-slate-800">AI-Driven Drug Discovery</span>
                       <span className="text-blue-600">$3.2B</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[85%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                       <span className="text-slate-800">mRNA Therapeutics</span>
                       <span className="text-teal-600">$1.8B</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-teal-500 w-[60%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                       <span className="text-slate-800">CRISPR/Gene Editing</span>
                       <span className="text-indigo-600">$1.4B</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[45%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-sm font-bold mb-1">
                       <span className="text-slate-800">Synthetic Biology (AgriTech)</span>
                       <span className="text-amber-500">$900M</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-amber-400 w-[25%]"></div></div>
                 </div>
              </div>
           </div>

           {/* World Map Mockup */}
           <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-center items-center text-center p-8">
              <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-cover"></div>
              <div className="relative z-10">
                 <h3 className="text-xl font-bold text-white mb-2">Global Innovation Hotspots</h3>
                 <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">Boston and San Francisco remain dominant, but massive biotech startup growth is surging in London, Basel, and Singapore.</p>
                 <button className="px-5 py-2 bg-white text-slate-900 text-sm font-bold rounded shadow hover:bg-slate-100 transition">Explore Global Heatmap</button>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
