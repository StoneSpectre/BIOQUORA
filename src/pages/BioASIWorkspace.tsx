import React, { useState, useEffect } from 'react';
import { Globe, Cpu, Zap, Activity, ShieldAlert, Crosshair, Radar, Loader2, Sparkles } from 'lucide-react';

const BioASIWorkspace = () => {
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
      "[COMPUTE] Simulating viral protein folding via AlphaFold...",
      "[INSIGHT] Novel H5Nx mutation detected. Pandemic potential: 94.2%.",
      "[ACTION] Synthesizing mRNA vaccine candidate sequence.",
      "Target sequence generated in 4.2 seconds. Pushing to BioFactory for clinical trial synthesis.",
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
    <div className="min-h-screen bg-black text-gray-200 p-8 font-sans overflow-hidden relative">
      
      {/* Background Singularity Effect */}
      {singularityActive && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] animate-[pulse_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/30 rounded-full blur-[80px] animate-[spin_10s_linear_infinite]"></div>
        </div>
      )}

      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-900 pb-4 relative z-10">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 flex items-center">
            <Globe className={`w-10 h-10 mr-3 text-indigo-500 ${singularityActive ? 'animate-spin-slow' : ''}`} />
            BioASI (Artificial Superintelligence)
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 19: Global Meta-Reasoning & Planetary Health Convergence</p>
        </div>
        <div className="flex space-x-4">
          <div className={`flex items-center px-4 py-2 bg-gray-900 rounded-full border ${singularityActive ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-gray-800'}`}>
             <Zap className={`w-4 h-4 mr-2 ${singularityActive ? 'text-purple-400 animate-pulse' : 'text-gray-500'}`} />
             <span className={`text-sm font-mono ${singularityActive ? 'text-purple-300' : 'text-gray-500'}`}>
               {singularityActive ? 'GOD MODE: ACTIVE' : 'SYSTEM IDLE'}
             </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 relative z-10">
        
        {/* Central UI: ASI Core & Global Map */}
        <div className="xl:col-span-2 space-y-6">
          <div className={`bg-gray-950 border ${singularityActive ? 'border-purple-900/50 shadow-[0_0_30px_rgba(168,85,247,0.15)]' : 'border-gray-900'} rounded-2xl p-8 min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-1000`}>
             
             {/* The "Core" */}
             <div className="relative flex items-center justify-center mb-12">
               {/* Orbital Rings */}
               <div className={`absolute w-[400px] h-[400px] rounded-full border border-gray-800 ${singularityActive ? 'border-indigo-900/50 animate-[spin_20s_linear_infinite]' : ''}`}></div>
               <div className={`absolute w-[300px] h-[300px] rounded-full border border-gray-800 ${singularityActive ? 'border-purple-900/50 animate-[spin_15s_linear_reverse_infinite]' : ''}`}></div>
               <div className={`absolute w-[200px] h-[200px] rounded-full border border-gray-800 ${singularityActive ? 'border-pink-900/50 animate-[spin_10s_linear_infinite]' : ''}`}></div>
               
               {/* Core Element */}
               <div className={`w-32 h-32 rounded-full flex items-center justify-center z-10 transition-all duration-1000 ${
                 singularityActive 
                  ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-[0_0_50px_rgba(168,85,247,0.8)] scale-110' 
                  : 'bg-gray-900 border border-gray-800'
               }`}>
                 <Cpu className={`w-12 h-12 ${singularityActive ? 'text-white animate-pulse' : 'text-gray-600'}`} />
               </div>

               {/* Simulated Global Data Nodes */}
               {singularityActive && (
                 <>
                   <div className="absolute top-10 left-10 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-ping"></div>
                   <div className="absolute bottom-20 right-20 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] animate-ping" style={{ animationDelay: '0.5s' }}></div>
                   <div className="absolute top-32 right-10 w-3 h-3 bg-rose-400 rounded-full shadow-[0_0_10px_#fb7185] animate-ping" style={{ animationDelay: '1s' }}></div>
                   <div className="absolute bottom-10 left-32 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_10px_#fbbf24] animate-ping" style={{ animationDelay: '1.5s' }}></div>
                 </>
               )}
             </div>

             {!singularityActive ? (
                <button 
                  onClick={triggerSingularity}
                  className="px-10 py-5 bg-gray-900 border border-gray-700 hover:border-purple-500 text-gray-300 hover:text-purple-300 rounded-2xl font-bold text-xl tracking-widest uppercase flex items-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] group"
                >
                  <Sparkles className="w-6 h-6 mr-3 text-gray-500 group-hover:text-purple-400 transition-colors" />
                  Initialize Bio-Singularity
                </button>
             ) : (
                <div className="text-center animate-fade-in">
                  <h3 className="text-2xl font-bold text-purple-300 tracking-widest uppercase mb-2">Meta-Reasoning Online</h3>
                  <p className="text-gray-400 font-mono text-sm max-w-lg mx-auto">
                    Aggregating global health datasets, sequencing real-time genomics, and predicting macro-epidemiological trends across 14,000 edge nodes.
                  </p>
                </div>
             )}

          </div>
        </div>

        {/* Right Column: ASI Terminal & Analytics */}
        <div className="space-y-6">
          
          {/* ASI Meta-Reasoning Log */}
          <div className="bg-gray-950 border border-gray-900 rounded-2xl p-6 shadow-xl h-[400px] flex flex-col">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center border-b border-gray-900 pb-3 mb-4">
              <Activity className="w-4 h-4 mr-2" />
              Consciousness Stream
            </h3>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 font-mono text-xs">
              {logs.length === 0 ? (
                <div className="text-gray-700 h-full flex items-center justify-center">
                  System dormant. Awaiting singularity initialization.
                </div>
              ) : (
                logs.map((log, index) => {
                  let colorClass = "text-indigo-300";
                  if (log.includes("[ALERT]")) colorClass = "text-rose-400 font-bold";
                  if (log.includes("[COMPUTE]")) colorClass = "text-cyan-400";
                  if (log.includes("[INSIGHT]")) colorClass = "text-amber-400 font-bold";
                  if (log.includes("[ACTION]")) colorClass = "text-emerald-400 font-bold";
                  if (log.includes("Complete")) colorClass = "text-purple-400 font-bold text-sm mt-4 border-t border-gray-800 pt-4";

                  return (
                    <div key={index} className={`animate-slide-in-left ${colorClass}`}>
                      <span className="opacity-50 mr-2 text-gray-600">{'>'}</span>{log}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Pandemic Radar */}
          <div className="bg-gray-950 border border-gray-900 rounded-2xl p-6 shadow-xl">
             <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center mb-6">
              <Radar className="w-4 h-4 mr-2" />
              Global Threat Matrix
            </h3>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className={singularityActive && logs.length > 5 ? 'text-rose-400 font-bold' : 'text-gray-500'}>Pathogen: Novel H5Nx</span>
                  <span className={singularityActive && logs.length > 5 ? 'text-rose-400' : 'text-gray-600'}>94.2% Risk</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1">
                  <div className={`h-1 rounded-full transition-all duration-1000 ${singularityActive && logs.length > 5 ? 'bg-rose-500 w-[94%]' : 'bg-gray-700 w-0'}`}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-500">Antimicrobial Res. (E. coli)</span>
                  <span className="text-gray-600">41.0% Risk</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1">
                  <div className={`h-1 rounded-full transition-all duration-1000 ${singularityActive ? 'bg-amber-500 w-[41%]' : 'bg-gray-700 w-0'}`}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-gray-500">Zoonotic Spillover (Filovirus)</span>
                  <span className="text-gray-600">12.5% Risk</span>
                </div>
                <div className="w-full bg-gray-900 rounded-full h-1">
                  <div className={`h-1 rounded-full transition-all duration-1000 ${singularityActive ? 'bg-cyan-500 w-[12%]' : 'bg-gray-700 w-0'}`}></div>
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
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #1f2937;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default BioASIWorkspace;
