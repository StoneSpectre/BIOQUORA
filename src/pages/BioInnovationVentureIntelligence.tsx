import React, { useState, useEffect } from 'react';

export default function BioInnovationVentureIntelligence() {

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
    <div className="min-h-screen bg-black text-slate-300 font-sans p-8 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">Venture Intelligence</h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            AI-driven matchmaking connecting Bioquora startups with strategic investors based on the Innovation Knowledge Graph.
          </p>
        </header>

        {/* Tinder-like Match UI */}
        <div className="flex items-stretch justify-center gap-8 h-[500px]">
           
           {/* Left: Your Startup Profile */}
           <div className="w-80 bg-[#111] border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col">
              <div className="text-center mb-6">
                 <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(99,102,241,0.4)]">⚡</div>
                 <h2 className="text-xl font-bold text-white">Kynetic Tx</h2>
                 <p className="text-xs text-indigo-400 font-bold mt-1">SEEKING $3.5M SEED</p>
              </div>
              
              <div className="flex-1 space-y-4 text-sm">
                 <div className="bg-[#1a1a1a] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-xs block mb-1">Sector</span>
                    <span className="text-slate-200">Targeted Oncology</span>
                 </div>
                 <div className="bg-[#1a1a1a] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-xs block mb-1">Asset</span>
                    <span className="text-slate-200">KRAS G12D PROTAC (Pre-clinical)</span>
                 </div>
                 <div className="bg-[#1a1a1a] p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-xs block mb-1">IP Status</span>
                    <span className="text-emerald-400 font-bold">Exclusive License (Stanford)</span>
                 </div>
              </div>
           </div>

           {/* Center: Match AI */}
           <div className="w-24 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-400 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5)] animate-pulse cursor-pointer hover:scale-110 transition">
                 <span className="text-2xl text-white font-bold">94%</span>
              </div>
              <div className="text-[10px] text-pink-400 font-bold mt-3 text-center uppercase tracking-widest">Synergy Match</div>
           </div>

           {/* Right: VC Firm Profile */}
           <div className="w-[450px] bg-[#111] border border-pink-500/30 rounded-2xl shadow-[0_0_40px_rgba(236,72,153,0.1)] flex flex-col overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-orange-400"></div>
              
              <div className="p-8 flex-1">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                       <h2 className="text-2xl font-bold text-white mb-1">Atlas Venture</h2>
                       <p className="text-sm text-slate-400">Cambridge, MA • Early-Stage Life Sciences</p>
                    </div>
                    <div className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-bold">$3B AUM</div>
                 </div>

                 <div className="space-y-6">
                    <div>
                       <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Investment Thesis Match</h3>
                       <p className="text-sm text-slate-300 leading-relaxed">
                          Atlas recently raised Fund XIII focusing on precision oncology and novel degrader modalities. They lack a KRAS PROTAC in their current portfolio, creating a highly strategic gap for Kynetic.
                       </p>
                    </div>

                    <div>
                       <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recent Investments (Bioquora Graph)</h3>
                       <div className="flex gap-2">
                          <span className="px-2 py-1 bg-[#1a1a1a] border border-slate-700 rounded text-xs text-slate-300">Kymera Therapeutics</span>
                          <span className="px-2 py-1 bg-[#1a1a1a] border border-slate-700 rounded text-xs text-slate-300">Vividion</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-[#1a1a1a] p-4 flex gap-4 border-t border-slate-800">
                 <button className="flex-1 py-3 bg-[#222] text-slate-400 font-bold rounded-xl hover:bg-[#333] hover:text-white transition">Pass</button>
                 <button className="flex-1 py-3 bg-gradient-to-r from-pink-600 to-orange-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition">Request Warm Intro</button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
