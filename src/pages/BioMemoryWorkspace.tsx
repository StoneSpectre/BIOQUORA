import React, { useState, useEffect } from 'react';
import { HardDrive, Search, Database, Share2, FolderOpen, User, RefreshCw, Layers, BrainCircuit, BookOpen } from 'lucide-react';

export default function BioMemoryWorkspace() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-fuchsia-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 4 • Memory Layer</div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
               <HardDrive className="w-10 h-10 mr-3 text-fuchsia-500 animate-pulse" />
               BioMemory Hub
            </h1>
          </div>
          <div className="flex space-x-4">
             <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(217,70,239,0.1)]">
                <div className="w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#d946ef]"></div>
                <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">VECTOR DB ONLINE</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left: Semantic Graph & Vector DB */}
           <div className="lg:col-span-8 space-y-6 flex flex-col">
              
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500 h-[450px] flex flex-col">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-600 to-pink-500"></div>
                 
                 <div className="flex justify-between items-center mb-4 z-10 border-b border-gray-900 pb-2">
                    <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest flex items-center">
                       <Share2 className="w-4 h-4 mr-2 text-fuchsia-400" />
                       Semantic Medical Graph
                    </h2>
                    <div className="text-xs font-mono text-gray-500 bg-gray-950 px-2 py-1 rounded border border-gray-800">
                      Query: "PARP Inhibitors in BRCA1-"
                    </div>
                 </div>

                 {/* Interactive Graph Area */}
                 <div className="flex-1 relative bg-black rounded-xl border border-gray-900 overflow-hidden mt-2">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" viewBox="0 0 600 300">
                       <line x1="300" y1="150" x2="150" y2="80" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 4" />
                       <line x1="300" y1="150" x2="150" y2="220" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 4" />
                       <line x1="300" y1="150" x2="450" y2="80" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 4" />
                       <line x1="300" y1="150" x2="450" y2="220" stroke="#d946ef" strokeWidth="1" strokeDasharray="4 4" />
                       <line x1="150" y1="80" x2="150" y2="220" stroke="#6366f1" strokeWidth="0.5" />
                       <line x1="450" y1="80" x2="450" y2="220" stroke="#6366f1" strokeWidth="0.5" />
                    </svg>

                    {/* Nodes */}
                    <div className="absolute inset-0 flex items-center justify-center">
                       
                       {/* Center Node */}
                       <div className={`absolute z-20 flex flex-col items-center justify-center ${pulse ? 'scale-105' : 'scale-100'} transition-transform duration-1000`}>
                          <div className="w-16 h-16 bg-fuchsia-900/50 rounded-full border border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center justify-center backdrop-blur">
                            <BrainCircuit className="w-8 h-8 text-fuchsia-400" />
                          </div>
                          <div className="mt-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-fuchsia-300 uppercase tracking-widest border border-fuchsia-900/50">PARP Inhibition</div>
                       </div>

                       {/* Top Left */}
                       <div className="absolute top-12 left-20 z-10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer">
                            <Database className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="mt-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">BRCA1 Mutation</div>
                       </div>

                       {/* Bottom Left */}
                       <div className="absolute bottom-12 left-20 z-10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer">
                            <Layers className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="mt-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">Synthetic Lethality</div>
                       </div>

                       {/* Top Right */}
                       <div className="absolute top-12 right-20 z-10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer">
                            <BookOpen className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="mt-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">Olaparib Trial</div>
                       </div>

                       {/* Bottom Right */}
                       <div className="absolute bottom-12 right-20 z-10 flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-900 rounded-full border border-gray-700 flex items-center justify-center hover:border-pink-500 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer">
                            <Activity className="w-5 h-5 text-gray-400" />
                          </div>
                          <div className="mt-2 bg-black/80 px-2 py-0.5 rounded text-[10px] font-bold text-gray-400 uppercase tracking-widest">DNA Repair</div>
                       </div>

                    </div>
                 </div>
              </div>

              {/* Active Project Repositories */}
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500 flex-1">
                 <h2 className="text-sm font-bold text-gray-200 font-sans flex items-center gap-2 mb-4 border-b border-gray-900 pb-2 uppercase tracking-widest">
                    <FolderOpen className="w-4 h-4 text-pink-400" />
                    Active Project Repositories
                 </h2>
                 
                 <div className="space-y-3">
                    <div className="p-4 bg-[#0a0a0c] border border-gray-800 rounded-xl flex justify-between items-center hover:border-fuchsia-900 hover:bg-fuchsia-900/10 transition-colors group/item cursor-pointer">
                       <div>
                          <div className="text-sm font-bold text-gray-200 group-hover/item:text-fuchsia-300 transition-colors">TNBC Target Discovery</div>
                          <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">Modified: 2h ago • 4 Datasets • 12 Nodes</div>
                       </div>
                       <button className="px-4 py-1.5 bg-fuchsia-900/30 text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest rounded border border-fuchsia-900/50 hover:bg-fuchsia-900/50 transition-colors">Restore Context</button>
                    </div>

                    <div className="p-4 bg-[#0a0a0c] border border-gray-800 rounded-xl flex justify-between items-center hover:border-fuchsia-900 hover:bg-fuchsia-900/10 transition-colors group/item cursor-pointer">
                       <div>
                          <div className="text-sm font-bold text-gray-200 group-hover/item:text-fuchsia-300 transition-colors">PARP Inhibitor Resistance Lit Review</div>
                          <div className="text-[10px] font-mono text-gray-500 mt-1 uppercase tracking-widest">Modified: 3d ago • 42 Papers • 3 Hypotheses</div>
                       </div>
                       <button className="px-4 py-1.5 bg-fuchsia-900/30 text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest rounded border border-fuchsia-900/50 hover:bg-fuchsia-900/50 transition-colors">Restore Context</button>
                    </div>
                 </div>
              </div>

           </div>

           {/* Right: Metrics & Sync */}
           <div className="lg:col-span-4 space-y-6 flex flex-col">
              
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl group hover:border-gray-600 transition-colors duration-500">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-2 flex items-center">
                   <User className="w-4 h-4 mr-2 text-blue-400" />
                   Personal Context
                 </h3>
                 <p className="text-xs text-gray-500 font-sans mb-4 leading-relaxed">
                    Bioquora Agent memory actively retains your methodological preferences, standard protocols, and areas of expertise to shape its responses.
                 </p>
                 <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase tracking-wider">
                    <span className="px-2 py-1 bg-blue-900/20 border border-blue-900/50 text-blue-400 rounded">Lang: Python</span>
                    <span className="px-2 py-1 bg-blue-900/20 border border-blue-900/50 text-blue-400 rounded">Exp: scRNA-Seq</span>
                    <span className="px-2 py-1 bg-blue-900/20 border border-blue-900/50 text-blue-400 rounded">Alpha: 0.05</span>
                 </div>
              </div>
              
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl group hover:border-gray-600 transition-colors duration-500 flex-1">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5 border-b border-gray-900 pb-3 flex items-center">
                   <Database className="w-4 h-4 mr-2 text-fuchsia-400" />
                   Memory Indices
                 </h3>
                 <div className="space-y-5">
                    <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><BrainCircuit className="w-3.5 h-3.5 mr-2 text-gray-600" /> Hypotheses</span>
                       <span className="font-mono text-gray-200 text-sm">142</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><BookOpen className="w-3.5 h-3.5 mr-2 text-gray-600" /> Extracted Literature</span>
                       <span className="font-mono text-gray-200 text-sm">3,892</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><GitMerge className="w-3.5 h-3.5 mr-2 text-gray-600" /> Workflow Cache</span>
                       <span className="font-mono text-gray-200 text-sm">18</span>
                    </div>
                 </div>
              </div>

              <div className="bg-fuchsia-900/10 border border-fuchsia-900/30 p-6 rounded-2xl text-center group hover:bg-fuchsia-900/20 transition-colors">
                 <div className="w-12 h-12 bg-fuchsia-900/40 rounded-full flex items-center justify-center mx-auto mb-4 border border-fuchsia-500/30 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                    <RefreshCw className="w-5 h-5 text-fuchsia-400 animate-spin-slow" />
                 </div>
                 <h3 className="text-sm font-bold text-fuchsia-400 uppercase tracking-widest mb-2">Continuous Sync</h3>
                 <p className="text-xs text-fuchsia-200/50 leading-relaxed max-w-[250px] mx-auto">
                    Agent scratchpads and conversation buffers are currently syncing to long-term memory.
                 </p>
              </div>

           </div>

        </div>
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
