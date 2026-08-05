import React, { useState, useEffect } from 'react';

export default function BioCivilizationAtlas() {

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
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      
      {/* Deep Space / Network Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-[800px] flex items-center justify-center">
         
         {/* The Tree of Knowledge / Integration Graph (Abstract Visualization) */}
         <div className="relative w-[600px] h-[600px]">
            
            {/* Center Core: BioCivilization */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.4)] z-50">
               <span className="text-black font-black text-xs uppercase tracking-widest text-center leading-tight">Bio<br/>Civilization</span>
            </div>

            {/* Orbit 1: Foundational Layers */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] border border-white/20 rounded-full animate-[spin_60s_linear_infinite]">
               <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-500 rounded-full shadow-[0_0_20px_blue] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioCloud</span>
               </div>
               <div className="absolute top-1/2 -left-3 transform -translate-y-1/2 w-6 h-6 bg-purple-500 rounded-full shadow-[0_0_20px_purple] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -left-12 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioOS</span>
               </div>
               <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-teal-500 rounded-full shadow-[0_0_20px_teal] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -bottom-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioNet</span>
               </div>
            </div>

            {/* Orbit 2: Application & AI Layers */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-[spin_120s_linear_infinite_reverse]">
               <div className="absolute top-[10%] right-[10%] w-8 h-8 bg-emerald-500 rounded-full shadow-[0_0_25px_#10b981] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioScientistX</span>
               </div>
               <div className="absolute bottom-[10%] left-[10%] w-8 h-8 bg-rose-500 rounded-full shadow-[0_0_25px_#f43f5e] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -bottom-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioPublish</span>
               </div>
               <div className="absolute top-[10%] left-[10%] w-8 h-8 bg-amber-500 rounded-full shadow-[0_0_25px_#f59e0b] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap">BioKnowledge</span>
               </div>
            </div>

            {/* Orbit 3: Macro/Planetary Layers */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] border border-white/5 rounded-full animate-[spin_180s_linear_infinite]">
               <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-cyan-400 rounded-full shadow-[0_0_30px_#22d3ee] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -top-6 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap font-bold text-cyan-400">BioEarth</span>
               </div>
               <div className="absolute bottom-1/4 -right-2 w-10 h-10 bg-fuchsia-500 rounded-full shadow-[0_0_30px_#d946ef] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -right-16 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap font-bold text-fuchsia-400">BioFuture</span>
               </div>
               <div className="absolute bottom-1/4 -left-2 w-10 h-10 bg-indigo-500 rounded-full shadow-[0_0_30px_#6366f1] flex items-center justify-center group cursor-pointer">
                  <span className="absolute -left-20 text-[10px] opacity-0 group-hover:opacity-100 transition whitespace-nowrap font-bold text-indigo-400">BioEnterprise</span>
               </div>
            </div>

            {/* Connecting SVG Lines (Static abstract representation) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 z-10" viewBox="0 0 600 600">
               <line x1="300" y1="300" x2="300" y2="25" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
               <line x1="300" y1="300" x2="575" y2="450" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
               <line x1="300" y1="300" x2="25" y2="450" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

         </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center z-50 pointer-events-none">
         <h1 className="text-3xl font-bold uppercase tracking-[0.3em] text-white/90">Biomedical Civilization Atlas</h1>
         <p className="text-white/50 text-xs mt-2 uppercase tracking-widest">The Complete 20-Stage Bioquora Ecosystem</p>
      </div>

    </div>
  );
}
