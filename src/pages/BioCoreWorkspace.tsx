import React, { useState, useEffect } from 'react';
import { Fingerprint, Activity, Server, Network, BrainCircuit, Globe, GitMerge, ShieldCheck, Database, Layers } from 'lucide-react';

const BioCoreWorkspace = () => {
  const [throughput, setThroughput] = useState(12450320);
  const [activeNodes, setActiveNodes] = useState(14023);
  const [pulse, setPulse] = useState(false);

  // Simulate global live data
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => prev + Math.floor(Math.random() * 45) + 10);
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setPulse(p => !p);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const subsystems = [
    { name: "BioFoundation", status: "online", icon: <Database className="w-4 h-4" /> },
    { name: "BioReason", status: "online", icon: <BrainCircuit className="w-4 h-4" /> },
    { name: "BioVision", status: "online", icon: <Activity className="w-4 h-4" /> },
    { name: "BioSafe", status: "online", icon: <ShieldCheck className="w-4 h-4" /> },
    { name: "BioWorkflow", status: "online", icon: <GitMerge className="w-4 h-4" /> },
    { name: "BioFactory", status: "online", icon: <Server className="w-4 h-4" /> },
    { name: "BioFederated", status: "online", icon: <Network className="w-4 h-4" /> },
    { name: "BioASI", status: "online", icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 p-8 font-sans overflow-hidden">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-900 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Fingerprint className="w-10 h-10 mr-3 text-white animate-pulse" />
            BioCore Operating System
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 20: The Unified Healthcare AI Command Center</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-gray-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
             <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: Global Metrics */}
        <div className="xl:col-span-1 space-y-6 flex flex-col">
          
          <div className="bg-[#0a0a0c] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-white"></div>
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold flex items-center">
               <Activity className="w-4 h-4 mr-2" /> Global Patient Throughput
             </div>
             <div className="text-4xl font-mono font-black text-white tracking-tight flex items-baseline">
               {throughput.toLocaleString()}
               <span className="text-sm font-sans text-gray-500 ml-2 font-normal">records/sec</span>
             </div>
          </div>

          <div className="bg-[#0a0a0c] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold flex items-center">
               <Network className="w-4 h-4 mr-2" /> Active Federated Nodes
             </div>
             <div className="text-4xl font-mono font-black text-gray-300 tracking-tight flex items-baseline">
               {activeNodes.toLocaleString()}
               <span className="text-sm font-sans text-gray-500 ml-2 font-normal">hospitals</span>
             </div>
          </div>

          <div className="bg-[#0a0a0c] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-1">
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold flex items-center border-b border-gray-900 pb-2">
               <Layers className="w-4 h-4 mr-2" /> Subsystem Integrity
             </div>
             <div className="space-y-3">
               {subsystems.map((sub, i) => (
                 <div key={i} className="flex justify-between items-center text-sm">
                   <span className="text-gray-400 flex items-center">
                     {sub.icon} <span className="ml-2 font-mono">{sub.name}</span>
                   </span>
                   <span className="text-[10px] uppercase font-bold text-gray-900 bg-white px-2 py-0.5 rounded-sm">
                     {sub.status}
                   </span>
                 </div>
               ))}
               <div className="text-center text-xs text-gray-600 italic pt-4">
                 + 12 additional microservices online
               </div>
             </div>
          </div>

        </div>

        {/* Center/Right Column: The BioCore Hub */}
        <div className="xl:col-span-3">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden h-full">
             
             {/* Dynamic Hexagon Grid Background */}
             <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='103.92304845413264' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 103.92304845413264L0 86.60254037844386L0 51.96152422706632L30 34.64101615137754L60 51.96152422706632L60 86.60254037844386Z' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 103.92px'
             }}></div>

             {/* Central OS Element */}
             <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
               
               {/* Orbital Connectors */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
                  <circle cx="400" cy="300" r="180" fill="none" stroke="#222" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]" />
                  <circle cx="400" cy="300" r="280" fill="none" stroke="#111" strokeWidth="1" className="animate-[spin_60s_linear_reverse_infinite]" />
                  
                  {/* Lines connecting to center */}
                  <line x1="400" y1="120" x2="400" y2="240" stroke="#333" strokeWidth="2" />
                  <line x1="400" y1="480" x2="400" y2="360" stroke="#333" strokeWidth="2" />
                  <line x1="220" y1="300" x2="340" y2="300" stroke="#333" strokeWidth="2" />
                  <line x1="580" y1="300" x2="460" y2="300" stroke="#333" strokeWidth="2" />
               </svg>

               {/* Center Core Logo */}
               <div className="relative z-20 w-40 h-40 bg-black rounded-2xl rotate-45 border-4 border-gray-800 shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden group hover:border-white transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <Fingerprint className={`w-16 h-16 text-white -rotate-45 relative z-10 ${pulse ? 'opacity-100 scale-105' : 'opacity-70 scale-100'} transition-all duration-300`} />
               </div>
               
               {/* Orbiting Satellite Nodes */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none max-w-3xl max-h-[600px]">
                 
                 {/* Top Node */}
                 <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-950 rounded-full border-2 border-gray-800 flex items-center justify-center shadow-lg"><Activity className="w-5 h-5 text-gray-400" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono">Clinical AI</span>
                 </div>
                 
                 {/* Bottom Node */}
                 <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-950 rounded-full border-2 border-gray-800 flex items-center justify-center shadow-lg"><Server className="w-5 h-5 text-gray-400" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono">Infra Layer</span>
                 </div>

                 {/* Left Node */}
                 <div className="absolute top-1/2 left-8 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-950 rounded-full border-2 border-gray-800 flex items-center justify-center shadow-lg"><Database className="w-5 h-5 text-gray-400" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono">Data Lake</span>
                 </div>

                 {/* Right Node */}
                 <div className="absolute top-1/2 right-8 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-950 rounded-full border-2 border-gray-800 flex items-center justify-center shadow-lg"><Globe className="w-5 h-5 text-gray-400" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono">Global Mesh</span>
                 </div>

               </div>

             </div>
             
             {/* Bottom Alert Feed */}
             <div className="absolute bottom-0 w-full left-0 bg-black/80 backdrop-blur border-t border-gray-900 p-3">
               <div className="flex items-center text-xs font-mono">
                 <span className="bg-white text-black font-bold px-2 py-0.5 rounded uppercase mr-3 shrink-0">Live Event Feed</span>
                 <div className="overflow-hidden flex-1 relative h-5">
                   <div className="absolute inset-0 animate-[slideUp_8s_linear_infinite] flex flex-col justify-between">
                     <span className="text-gray-400">BioWorkflow: Oncology pipeline executed for Node-7A in 1.2s</span>
                     <span className="text-gray-400">BioASI: Aggregated 4,021 new genomic variants into core knowledge graph.</span>
                     <span className="text-gray-400">BioFactory: Scaled up to 144 pods to handle regional query spike.</span>
                   </div>
                 </div>
               </div>
             </div>

          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        @keyframes slideUp {
          0% { transform: translateY(100%); opacity: 0; }
          10% { transform: translateY(0); opacity: 1; }
          40% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(-100%); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BioCoreWorkspace;
