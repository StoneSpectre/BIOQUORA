import React, { useState, useEffect } from 'react';
import { Globe, Cpu, Zap, Activity, ShieldAlert, Crosshair, Radar, Loader2, Sparkles, Brain } from 'lucide-react';

export default function BioASIWorkspace() {
  const [singularityActive, setSingularityActive] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [pulse, setPulse] = useState(false);

  // Background pulsing effect for the ASI Core
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerSingularity = () => {
    setSingularityActive(true);
    setLogs([]);

    const eventSequence = [
      "INITIATING GLOBAL META-REASONING PROTOCOL...",
      "Merging Stage 1-18 Subsystems...",
      "BioVision & BioCoder connected. Semantic logic bound.",
      "BioFederated privacy nodes locked. Global weights aggregated.",
      "Scanning global epidemiological feeds...",
      "[ALERT] Correlating anomaly in SE Asia respiratory ICU admissions (n=452) with novel variant in London wastewater.",
      "[COMPUTE] Simulating viral protein folding via AlphaFold 3 Engine...",
      "[INSIGHT] Novel H5Nx mutation detected. Pandemic potential: 94.2%.",
      "[ACTION] Synthesizing mRNA vaccine candidate sequence.",
      "Target sequence generated in 4.2 seconds. Pushing to BioFactory for clinical trial synthesis.",
      "[RECURSION] Self-improving predictive models based on H5Nx topology...",
      "ASI Convergence Complete. Global Health Monitored."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < eventSequence.length) {
        setLogs(prev => [...prev, eventSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Singularity Effect */}
      {singularityActive ? (
        <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 opacity-100">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-900/20 rounded-full blur-[150px] animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuchsia-900/20 rounded-full blur-[100px] animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>
      ) : (
        <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 opacity-50">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      )}

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 19 • Planetary Meta-Reasoning</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Globe className={`w-10 h-10 mr-3 text-indigo-500 ${singularityActive ? 'animate-spin-slow drop-shadow-[0_0_15px_rgba(99,102,241,0.8)]' : ''}`} />
             BioASI Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className={`flex items-center px-4 py-2 bg-[#050505]/80 backdrop-blur rounded-full border transition-all duration-500 ${singularityActive ? 'border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.3)]' : 'border-gray-800'}`}>
             <Zap className={`w-4 h-4 mr-2 ${singularityActive ? 'text-fuchsia-400 animate-pulse' : 'text-gray-600'}`} />
             <span className={`text-sm font-mono font-bold tracking-widest uppercase transition-colors ${singularityActive ? 'text-fuchsia-300' : 'text-gray-600'}`}>
               {singularityActive ? 'GOD MODE: ACTIVE' : 'SYSTEM IDLE'}
             </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 relative z-10">
        
        {/* Central UI: ASI Core & Global Map */}
        <div className="xl:col-span-8 flex flex-col space-y-6">
          <div className={`bg-[#030303] border ${singularityActive ? 'border-indigo-900/50 shadow-[0_0_40px_rgba(99,102,241,0.15)]' : 'border-gray-900'} rounded-3xl p-8 min-h-[600px] flex-1 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000`}>
             
             {/* The "Core" */}
             <div className="relative flex items-center justify-center mb-16 mt-8">
               
               {/* Orbital Rings */}
               <div className={`absolute w-[450px] h-[450px] rounded-full border border-gray-900 transition-all duration-1000 ${singularityActive ? 'border-indigo-900/50 animate-[spin_20s_linear_infinite]' : ''}`}>
                 {singularityActive && <div className="absolute top-0 left-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_#6366f1]"></div>}
               </div>
               
               <div className={`absolute w-[350px] h-[350px] rounded-full border border-gray-900 transition-all duration-1000 ${singularityActive ? 'border-fuchsia-900/50 animate-[spin_15s_linear_reverse_infinite]' : ''}`}>
                 {singularityActive && <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_#d946ef]"></div>}
               </div>
               
               <div className={`absolute w-[250px] h-[250px] rounded-full border border-gray-900 transition-all duration-1000 ${singularityActive ? 'border-pink-900/50 animate-[spin_10s_linear_infinite]' : ''}`}></div>
               
               {/* Core Element */}
               <div className={`w-40 h-40 rounded-full flex items-center justify-center z-10 transition-all duration-1000 relative ${
                 singularityActive 
                  ? 'bg-gradient-to-br from-indigo-900 via-fuchsia-900 to-pink-900 shadow-[0_0_80px_rgba(217,70,239,0.5)] scale-110 border-4 border-fuchsia-500/30' 
                  : 'bg-[#050505] border-2 border-gray-800'
               }`}>
                 <Brain className={`w-16 h-16 transition-all duration-1000 ${singularityActive ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse' : 'text-gray-700'}`} />
                 
                 {/* Internal Core Pulse */}
                 {singularityActive && (
                    <div className="absolute inset-0 rounded-full bg-fuchsia-400/20 animate-ping"></div>
                 )}
               </div>

               {/* Simulated Global Data Nodes */}
               {singularityActive && (
                 <>
                   <div className="absolute top-10 left-10 flex items-center space-x-2">
                     <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-ping"></div>
                     <span className="text-[10px] font-mono text-cyan-400">London</span>
                   </div>
                   <div className="absolute bottom-20 right-20 flex items-center space-x-2">
                     <span className="text-[10px] font-mono text-emerald-400">Singapore</span>
                     <div className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] animate-ping" style={{ animationDelay: '0.5s' }}></div>
                   </div>
                   <div className="absolute top-32 right-10 flex items-center space-x-2">
                     <span className="text-[10px] font-mono text-rose-400">New York</span>
                     <div className="w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_15px_#fb7185] animate-ping" style={{ animationDelay: '1s' }}></div>
                   </div>
                   <div className="absolute bottom-10 left-32 flex items-center space-x-2">
                     <div className="w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_#fbbf24] animate-ping" style={{ animationDelay: '1.5s' }}></div>
                     <span className="text-[10px] font-mono text-amber-400">Tokyo</span>
                   </div>
                 </>
               )}
             </div>

             {!singularityActive ? (
                <button 
                  onClick={triggerSingularity}
                  className="px-10 py-5 bg-[#0a0a0c] border border-gray-800 hover:border-fuchsia-500/50 text-gray-400 hover:text-fuchsia-300 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:bg-fuchsia-900/10 group z-20"
                >
                  <Sparkles className="w-6 h-6 mr-3 text-gray-600 group-hover:text-fuchsia-400 transition-colors" />
                  Initialize Bio-Singularity
                </button>
             ) : (
                <div className="text-center animate-fade-in-up z-20 bg-black/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-900">
                  <h3 className="text-xl font-black text-fuchsia-400 tracking-widest uppercase mb-3 drop-shadow-[0_0_10px_rgba(217,70,239,0.5)]">Meta-Reasoning Convergence</h3>
                  <p className="text-gray-400 font-mono text-[10px] max-w-lg mx-auto uppercase tracking-widest leading-relaxed">
                    Aggregating global health datasets, sequencing real-time genomics, and predicting macro-epidemiological trends across 14,000 edge nodes. Recursive self-improvement active.
                  </p>
                </div>
             )}

          </div>
        </div>

        {/* Right Column: ASI Terminal & Analytics */}
        <div className="xl:col-span-4 flex flex-col space-y-6">
          
          {/* ASI Meta-Reasoning Log */}
          <div className="bg-[#050505] border border-gray-900 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-900/10 rounded-full blur-[30px]"></div>
            
            <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center border-b border-gray-900 pb-4 mb-4 relative z-10">
              <Activity className="w-4 h-4 mr-2 text-indigo-500" />
              Consciousness Stream
            </h3>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-[10px] relative z-10 uppercase tracking-widest leading-relaxed">
              {logs.length === 0 ? (
                <div className="text-gray-700 h-full flex flex-col items-center justify-center font-bold">
                  <Loader2 className="w-8 h-8 mb-4 text-gray-800 animate-spin" />
                  SYSTEM DORMANT.
                  <br />
                  AWAITING INITIALIZATION.
                </div>
              ) : (
                logs.map((log, index) => {
                  let colorClass = "text-indigo-400";
                  let bgClass = "";
                  
                  if (log.includes("[ALERT]")) {
                    colorClass = "text-rose-400 font-bold";
                    bgClass = "bg-rose-900/10 border border-rose-900/30 p-2 rounded";
                  } else if (log.includes("[COMPUTE]")) {
                    colorClass = "text-cyan-400";
                  } else if (log.includes("[INSIGHT]")) {
                    colorClass = "text-amber-400 font-bold";
                    bgClass = "bg-amber-900/10 border border-amber-900/30 p-2 rounded";
                  } else if (log.includes("[ACTION]")) {
                    colorClass = "text-emerald-400 font-bold";
                    bgClass = "bg-emerald-900/10 border border-emerald-900/30 p-2 rounded";
                  } else if (log.includes("[RECURSION]")) {
                     colorClass = "text-fuchsia-400 font-bold";
                     bgClass = "bg-fuchsia-900/10 border border-fuchsia-900/30 p-2 rounded";
                  } else if (log.includes("Complete")) {
                    colorClass = "text-fuchsia-400 font-black text-xs mt-4 border-t border-gray-800 pt-4";
                  }

                  return (
                    <div key={index} className={`animate-slide-in-left ${colorClass} ${bgClass}`}>
                      <span className="opacity-50 mr-2 text-gray-700 font-bold">{'>'}</span>{log}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Pandemic Radar */}
          <div className="bg-[#050505] border border-gray-900 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-rose-900/10 rounded-full blur-[30px]"></div>

             <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center mb-6 relative z-10">
              <Radar className="w-4 h-4 mr-2 text-rose-500" />
              Global Threat Matrix
            </h3>

            <div className="space-y-5 relative z-10">
              <div>
                <div className="flex justify-between text-[10px] mb-2 font-mono font-bold uppercase tracking-widest">
                  <span className={singularityActive && logs.length > 5 ? 'text-rose-400 drop-shadow-[0_0_5px_rgba(251,113,133,0.8)]' : 'text-gray-600'}>Pathogen: Novel H5Nx</span>
                  <span className={singularityActive && logs.length > 5 ? 'text-rose-400' : 'text-gray-700'}>94.2% Risk</span>
                </div>
                <div className="w-full bg-gray-950 rounded-full h-1.5 border border-gray-900">
                  <div className={`h-full rounded-full transition-all duration-1000 ${singularityActive && logs.length > 5 ? 'bg-rose-500 w-[94%] shadow-[0_0_10px_#f43f5e]' : 'bg-gray-800 w-0'}`}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] mb-2 font-mono font-bold uppercase tracking-widest">
                  <span className="text-gray-600">Antimicrobial Res. (E. coli)</span>
                  <span className="text-gray-700">41.0% Risk</span>
                </div>
                <div className="w-full bg-gray-950 rounded-full h-1.5 border border-gray-900">
                  <div className={`h-full rounded-full transition-all duration-1000 ${singularityActive ? 'bg-amber-500 w-[41%] shadow-[0_0_10px_#f59e0b]' : 'bg-gray-800 w-0'}`}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[10px] mb-2 font-mono font-bold uppercase tracking-widest">
                  <span className="text-gray-600">Zoonotic Spillover (Filovirus)</span>
                  <span className="text-gray-700">12.5% Risk</span>
                </div>
                <div className="w-full bg-gray-950 rounded-full h-1.5 border border-gray-900">
                  <div className={`h-full rounded-full transition-all duration-1000 ${singularityActive ? 'bg-cyan-500 w-[12%] shadow-[0_0_10px_#06b6d4]' : 'bg-gray-800 w-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #222;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
