import React, { useState, useEffect } from 'react';

export default function BioEarthDigitalTwin() {

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
    <div className="h-screen bg-black text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* Top Bar overlay */}
      <header className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between px-8 z-20 pointer-events-none">
        <div className="pointer-events-auto">
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <span className="text-blue-500">🌐</span> Planetary Research Twin
          </h1>
          <p className="text-xs text-slate-400 font-mono ml-9">LIVE • Graph Resolution: Planetary Scale</p>
        </div>
        <div className="flex gap-2 pointer-events-auto">
           <button className="px-3 py-1.5 bg-blue-900 border border-blue-700 text-white text-xs font-bold rounded shadow-[0_0_10px_rgba(59,130,246,0.5)]">Layer: Compute Grid</button>
           <button className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold rounded">Layer: Data Flow</button>
        </div>
      </header>

      {/* Mock 3D Earth / Node Visualization */}
      <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0f172a] via-[#020617] to-black">
         
         {/* Background Stars / Grid */}
         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

         {/* Center Globe Mockup (CSS generated) */}
         <div className="relative w-[500px] h-[500px] rounded-full border border-blue-500/20 shadow-[0_0_80px_rgba(59,130,246,0.1)] flex items-center justify-center">
            
            {/* Latitude/Longitude lines */}
            <div className="absolute inset-0 rounded-full border border-blue-500/10 rotate-45"></div>
            <div className="absolute inset-0 rounded-full border border-blue-500/10 -rotate-45"></div>
            <div className="absolute w-[80%] h-[100%] rounded-full border border-blue-500/10"></div>
            <div className="absolute w-[100%] h-[80%] rounded-full border border-blue-500/10"></div>
            <div className="absolute w-[40%] h-[100%] rounded-full border border-blue-500/10"></div>

            {/* Glowing Core */}
            <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>

            {/* Node: North America */}
            <div className="absolute top-[25%] left-[20%] flex flex-col items-center group cursor-pointer z-10">
               <div className="w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.8)] group-hover:scale-150 transition animate-pulse"></div>
               
               <div className="absolute top-6 w-48 bg-slate-900/90 border border-slate-700 p-3 rounded shadow-xl hidden group-hover:block backdrop-blur z-30">
                  <div className="text-xs font-bold text-white mb-1">North America Hub</div>
                  <div className="text-[10px] text-slate-400">Compute: 42.1 EFLOPS</div>
                  <div className="text-[10px] text-slate-400">Active Institutions: 3,492</div>
               </div>
            </div>

            {/* Node: Europe */}
            <div className="absolute top-[20%] right-[30%] flex flex-col items-center group cursor-pointer z-10">
               <div className="w-5 h-5 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] group-hover:scale-150 transition animate-pulse"></div>
               
               <div className="absolute top-8 w-48 bg-slate-900/90 border border-slate-700 p-3 rounded shadow-xl hidden group-hover:block backdrop-blur z-30">
                  <div className="text-xs font-bold text-white mb-1">EU / EMBL-EBI Federation</div>
                  <div className="text-[10px] text-slate-400">Compute: 38.4 EFLOPS</div>
                  <div className="text-[10px] text-emerald-400 font-bold">Primary Data Lake Sync Active</div>
               </div>
            </div>

            {/* Node: Asia Pac */}
            <div className="absolute top-[40%] right-[10%] flex flex-col items-center group cursor-pointer z-10">
               <div className="w-3 h-3 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(192,132,252,0.8)] group-hover:scale-150 transition"></div>
            </div>

            {/* Data transfer lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
               <path d="M 100 125 Q 250 50 350 100" fill="transparent" stroke="rgba(52,211,153,0.4)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
               <path d="M 350 100 Q 400 150 450 200" fill="transparent" stroke="rgba(192,132,252,0.3)" strokeWidth="1" />
            </svg>

         </div>

      </div>

      {/* Bottom Panel Overlay */}
      <div className="absolute bottom-8 left-8 right-8 bg-black/60 border border-blue-500/20 backdrop-blur-md p-4 rounded-xl flex items-center justify-between z-20 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
         <div>
            <h3 className="text-sm font-bold text-white">Global Distributed Compute Grid</h3>
            <p className="text-xs text-slate-400">Aggregated from federated BioCloud institutional deployments.</p>
         </div>
         <div className="flex gap-8 text-xs text-slate-300 font-mono border-l border-slate-700 pl-8">
            <div><span className="text-slate-500 block mb-1">Total Network Compute</span> <span className="font-bold text-white text-lg">142 ExaFLOPS</span></div>
            <div><span className="text-slate-500 block mb-1">Federated AI Models Training</span> <span className="font-bold text-white text-lg">84</span></div>
            <div><span className="text-slate-500 block mb-1">Network Synchronization</span> <span className="font-bold text-emerald-400 text-lg">100% (Green)</span></div>
         </div>
      </div>

    </div>
  );
}
