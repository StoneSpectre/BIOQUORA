import React, { useState, useEffect } from 'react';
import { Fingerprint, Activity, Server, Network, BrainCircuit, Globe, GitMerge, ShieldCheck, Database, Layers, Cpu, Code2 } from 'lucide-react';

const BioCoreWorkspace = () => {
  const [throughput, setThroughput] = useState(12450320);
  const [activeNodes, setActiveNodes] = useState(14023);
  const [pulse, setPulse] = useState(false);
  const [compute, setCompute] = useState(82);

  // Simulate global live data
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => prev + Math.floor(Math.random() * 45) + 10);
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setCompute(prev => Math.min(100, Math.max(0, prev + (Math.random() * 4 - 2))));
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
    <div className="min-h-screen bg-[#020202] text-gray-200 p-8 font-sans overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[800px] bg-gradient-to-b from-gray-900/40 to-transparent blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-900 pb-4 relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 20 • Unified Healthcare Command</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Fingerprint className="w-10 h-10 mr-3 text-white animate-pulse" />
            BioCore OS Dashboard
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-700 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
             <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">SYSTEMS NOMINAL</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Global Metrics & Telemetry */}
        <div className="xl:col-span-3 space-y-6 flex flex-col">
          
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-600 to-white"></div>
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold flex items-center">
               <Activity className="w-4 h-4 mr-2" /> Global Patient Throughput
             </div>
             <div className="text-3xl font-mono font-black text-white tracking-tight flex items-baseline">
               {throughput.toLocaleString()}
               <span className="text-sm font-sans text-gray-500 ml-2 font-normal">records/s</span>
             </div>
          </div>

          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors">
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-bold flex items-center">
               <Cpu className="w-4 h-4 mr-2" /> Aggregate Compute Load
             </div>
             <div className="text-3xl font-mono font-black text-gray-200 tracking-tight flex items-baseline mb-3">
               {compute.toFixed(1)}%
             </div>
             <div className="w-full h-1.5 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-white transition-all duration-300" style={{ width: `${compute}%` }}></div>
             </div>
          </div>

          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-1 group hover:border-gray-600 transition-colors">
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
             </div>
          </div>

        </div>

        {/* Center Column: The BioCore Hub */}
        <div className="xl:col-span-6">
          <div className="bg-[#030303] border border-gray-800 rounded-2xl p-8 shadow-[0_0_50px_rgba(255,255,255,0.03)] relative min-h-[600px] flex flex-col items-center justify-center overflow-hidden h-full">
             
             {/* Central OS Element */}
             <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
               
               {/* Orbital Connectors */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50" viewBox="0 0 800 600">
                  <circle cx="400" cy="300" r="160" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="4 4" className="animate-[spin_40s_linear_infinite]" />
                  <circle cx="400" cy="300" r="260" fill="none" stroke="#222" strokeWidth="1" className="animate-[spin_60s_linear_reverse_infinite]" />
                  
                  {/* Lines connecting to center */}
                  <line x1="400" y1="140" x2="400" y2="240" stroke="#333" strokeWidth="2" />
                  <line x1="400" y1="460" x2="400" y2="360" stroke="#333" strokeWidth="2" />
                  <line x1="240" y1="300" x2="340" y2="300" stroke="#333" strokeWidth="2" />
                  <line x1="560" y1="300" x2="460" y2="300" stroke="#333" strokeWidth="2" />
               </svg>

               {/* Center Core Logo */}
               <div className="relative z-20 w-40 h-40 bg-black rounded-2xl rotate-45 border-4 border-gray-700 shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden group hover:border-white transition-colors duration-500 cursor-crosshair">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"></div>
                  <Fingerprint className={`w-16 h-16 text-white -rotate-45 relative z-10 ${pulse ? 'opacity-100 scale-105 shadow-[0_0_30px_#fff]' : 'opacity-70 scale-100'} transition-all duration-300`} />
               </div>
               
               {/* Orbiting Satellite Nodes */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none max-w-3xl max-h-[600px]">
                 
                 <div className="absolute top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-950 rounded-full border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur"><Activity className="w-6 h-6 text-gray-300" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono bg-black/50 px-2 rounded">Clinical AI</span>
                 </div>
                 
                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-950 rounded-full border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur"><Server className="w-6 h-6 text-gray-300" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono bg-black/50 px-2 rounded">Infra Layer</span>
                 </div>

                 <div className="absolute top-1/2 left-12 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-950 rounded-full border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur"><Database className="w-6 h-6 text-gray-300" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono bg-black/50 px-2 rounded">Data Lake</span>
                 </div>

                 <div className="absolute top-1/2 right-12 -translate-y-1/2 flex flex-col items-center">
                    <div className="w-14 h-14 bg-gray-950 rounded-full border border-gray-700 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur"><Globe className="w-6 h-6 text-gray-300" /></div>
                    <span className="mt-2 text-[10px] font-bold tracking-widest uppercase text-gray-500 font-mono bg-black/50 px-2 rounded">Global Mesh</span>
                 </div>

               </div>

             </div>
             
             {/* Bottom Alert Feed */}
             <div className="absolute bottom-0 w-full left-0 bg-black/80 backdrop-blur border-t border-gray-900 p-3 z-30">
               <div className="flex items-center text-xs font-mono">
                 <span className="bg-white text-black font-bold px-2 py-0.5 rounded uppercase mr-3 shrink-0">Global Event Stream</span>
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

        {/* Right Column: Planetary Meta-Reasoning */}
        <div className="xl:col-span-3 space-y-6 flex flex-col">
           
           <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden flex-1 group hover:border-gray-600 transition-colors">
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold flex items-center border-b border-gray-900 pb-2">
               <BrainCircuit className="w-4 h-4 mr-2" /> Planetary Meta-Reasoning
             </div>
             
             <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Active Synthesis</div>
                  <h4 className="text-sm font-bold text-gray-200 mb-2">Emergent Pathogen Detection</h4>
                  <p className="text-xs text-gray-400">Cross-referencing 14,000 global nodes. Identified anomalous upper respiratory cluster in Region 4. BioASI assigning confidence: 82%.</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-lg border border-gray-800">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Resource Allocation</div>
                  <h4 className="text-sm font-bold text-gray-200 mb-2">Oncology Drug Discovery</h4>
                  <p className="text-xs text-gray-400">Rerouting 12.4 PFLOPS to BioSimulation AlphaFold clusters for novel KRAS G12D PROTAC docking analysis.</p>
                </div>
             </div>
           </div>

           <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors">
             <div className="text-xs text-gray-500 uppercase tracking-widest mb-4 font-bold flex items-center border-b border-gray-900 pb-2">
               <Code2 className="w-4 h-4 mr-2" /> Live Agent Operations
             </div>
             <div className="space-y-2 font-mono text-[10px] text-gray-400">
                <div className="flex justify-between border-b border-gray-900 pb-1"><span>Agent-09A</span><span className="text-white">Parsing</span></div>
                <div className="flex justify-between border-b border-gray-900 pb-1"><span>Agent-14B</span><span className="text-white">Docking</span></div>
                <div className="flex justify-between border-b border-gray-900 pb-1"><span>Agent-88X</span><span className="text-white">Writing</span></div>
                <div className="flex justify-between"><span>Agent-92Z</span><span className="text-white">Syncing</span></div>
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
