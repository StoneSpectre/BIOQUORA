import React, { useState, useEffect } from 'react';

export default function BioEnterpriseDigitalTwin() {

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
            <span className="text-purple-500">🌐</span> Digital Institution Twin
          </h1>
          <p className="text-xs text-slate-400 font-mono ml-9">LIVE • Graph Resolution: Enterprise-Wide</p>
        </div>
        <div className="flex gap-2 pointer-events-auto">
           <button className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold rounded">Nodes: Depts</button>
           <button className="px-3 py-1.5 bg-purple-600 border border-purple-500 text-white text-xs font-bold rounded shadow-[0_0_10px_rgba(168,85,247,0.5)]">Nodes: Compute / Projects</button>
        </div>
      </header>

      {/* Mock 3D Graph Visualization */}
      <div className="flex-1 relative flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black">
         
         {/* Background Grid */}
         <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

         {/* Center Node (Institution) */}
         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-[0_0_30px_rgba(255,255,255,0.8)] z-10 flex items-center justify-center font-bold text-black">
            SU
         </div>

         {/* Radiating Lines & Nodes (Mockup) */}
         <svg className="absolute inset-0 w-full h-full">
            {/* Lines from center */}
            <line x1="50%" y1="50%" x2="30%" y2="25%" stroke="rgba(168,85,247,0.5)" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
            <line x1="50%" y1="50%" x2="70%" y2="20%" stroke="rgba(20,184,166,0.5)" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="rgba(59,130,246,0.5)" strokeWidth="2" />
            <line x1="50%" y1="50%" x2="25%" y2="65%" stroke="rgba(244,63,94,0.5)" strokeWidth="2" className="animate-pulse" />

            {/* Connecting lines between departments */}
            <line x1="30%" y1="25%" x2="70%" y2="20%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="70%" y1="20%" x2="75%" y2="70%" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
         </svg>

         {/* Node 1: Struct Bio (High Compute) */}
         <div className="absolute top-[25%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-8 h-8 bg-purple-500 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.8)] mb-2 group-hover:scale-125 transition"></div>
            <div className="bg-black/80 border border-slate-700 px-2 py-1 rounded text-xs text-white backdrop-blur">StructBio</div>
            
            {/* Hover Tooltip */}
            <div className="absolute top-12 w-48 bg-slate-900 border border-slate-700 p-3 rounded shadow-xl hidden group-hover:block z-30">
               <div className="text-xs font-bold text-white mb-2 border-b border-slate-700 pb-1">Structural Biology</div>
               <div className="text-[10px] text-slate-400 mb-1">Compute: <span className="text-rose-400 font-bold">92% Load</span> (Critical)</div>
               <div className="text-[10px] text-slate-400 mb-1">Projects: 14 Active</div>
               <div className="text-[10px] text-slate-400">Researchers: 42</div>
            </div>
         </div>

         {/* Node 2: Oncology */}
         <div className="absolute top-[20%] left-[70%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-8 h-8 bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)] mb-2 group-hover:scale-125 transition"></div>
            <div className="bg-black/80 border border-slate-700 px-2 py-1 rounded text-xs text-white backdrop-blur">Oncology</div>
         </div>

         {/* Node 3: Clinical Trials */}
         <div className="absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] mb-2 group-hover:scale-125 transition"></div>
            <div className="bg-black/80 border border-slate-700 px-2 py-1 rounded text-xs text-white backdrop-blur">BioClinical</div>
         </div>

         {/* Node 4: Genomics (Data Heavy) */}
         <div className="absolute top-[65%] left-[25%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer">
            <div className="w-12 h-12 bg-rose-500 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.8)] mb-2 group-hover:scale-125 transition animate-pulse"></div>
            <div className="bg-black/80 border border-slate-700 px-2 py-1 rounded text-xs text-white backdrop-blur">Genomics Core</div>
            
            <div className="absolute top-16 w-48 bg-slate-900 border border-slate-700 p-3 rounded shadow-xl hidden group-hover:block z-30">
               <div className="text-xs font-bold text-white mb-2 border-b border-slate-700 pb-1">Genomics Core</div>
               <div className="text-[10px] text-slate-400 mb-1">Storage: <span className="text-amber-400 font-bold">14 PB INGEST</span> (Active)</div>
               <div className="text-[10px] text-slate-400">Bandwidth: 40 Gbps</div>
            </div>
         </div>

      </div>

      {/* Bottom Panel Overlay */}
      <div className="absolute bottom-8 left-8 right-8 bg-black/60 border border-white/10 backdrop-blur-md p-4 rounded-xl flex items-center justify-between z-20">
         <div>
            <h3 className="text-sm font-bold text-white">System Status: Nominal</h3>
            <p className="text-xs text-slate-400">Digital Twin rendering real-time telemetry from BioCloud Infrastructure.</p>
         </div>
         <div className="flex gap-6 text-xs text-slate-300 font-mono">
            <div><span className="text-slate-500 block mb-1">Total Nodes</span> <span className="font-bold text-white text-lg">14,204</span></div>
            <div><span className="text-slate-500 block mb-1">Total Edges</span> <span className="font-bold text-white text-lg">89,112</span></div>
            <div><span className="text-slate-500 block mb-1">Graph Sync Latency</span> <span className="font-bold text-emerald-400 text-lg">12ms</span></div>
         </div>
      </div>

    </div>
  );
}
