import React, { useState } from 'react';
import { Network, Database, Lock, ShieldCheck, Play, Loader2, Server, Key, Activity, Fingerprint, ShieldAlert } from 'lucide-react';

export default function BioFederatedWorkspace() {
  const [isTraining, setIsTraining] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Idle, 1: Local Train, 2: Uploading, 3: Aggregating

  const handleTriggerFederated = () => {
    setIsTraining(true);
    setPhase(1);

    // Phase 1: Local Training
    setTimeout(() => setPhase(2), 3000);

    // Phase 2: Uploading Gradients
    setTimeout(() => setPhase(3), 6000);

    // Phase 3: Aggregating
    setTimeout(() => {
      setPhase(0);
      setIsTraining(false);
    }, 9000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 18 • Privacy & Security Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Network className="w-10 h-10 mr-3 text-emerald-500 animate-pulse" />
             BioFederated Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
             <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
             <span className="text-sm text-emerald-400 font-mono font-bold tracking-widest uppercase">HIPAA / GDPR / SOC2: Compliant</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Security Audit & Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-600"></div>
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <Lock className="w-4 h-4 mr-2 text-emerald-400" />
               Cryptographic Audit Logs
             </h3>

             <div className="space-y-6 flex-1 flex flex-col">
               
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner group/item hover:border-gray-600 transition-colors">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center"><ShieldAlert className="w-3 h-3 mr-1 text-red-400" /> PHI Exposure Risk</span>
                   <span className="font-mono font-black text-emerald-400 text-lg">0 BYTES</span>
                 </div>
                 <div className="text-[10px] text-gray-600 font-mono">No raw data leaves local hospital intranets.</div>
               </div>
               
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner group/item hover:border-gray-600 transition-colors">
                 <div className="flex justify-between items-center mb-1">
                   <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center"><Key className="w-3 h-3 mr-1 text-amber-400" /> Homomorphic Encryption</span>
                   <span className="font-mono font-bold text-cyan-400 bg-cyan-900/20 px-2 py-0.5 rounded border border-cyan-900/50">ACTIVE (AES-256)</span>
                 </div>
                 <div className="text-[10px] text-gray-600 font-mono mt-1">Gradients encrypted before transit.</div>
               </div>

               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner flex flex-col group/item hover:border-gray-600 transition-colors">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center"><Fingerprint className="w-3 h-3 mr-1 text-purple-400" /> Differential Privacy Noise</span>
                    <span className="font-mono text-purple-400 text-[10px] font-bold">ε = 0.5</span>
                 </div>
                 <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden mt-1 shadow-inner">
                   <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 w-[75%] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                 </div>
                 <div className="text-[10px] text-gray-600 font-mono mt-2 flex justify-between">
                    <span>Noise Injection Level</span>
                    <span>High Security</span>
                 </div>
               </div>

               <div className="mt-auto pt-4">
                  <button 
                    onClick={handleTriggerFederated}
                    disabled={isTraining}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all uppercase tracking-widest text-sm ${
                      isTraining ? 'bg-[#0a0a0c] text-emerald-500 border border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
                      'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                    }`}
                  >
                    {isTraining ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> EXECUTING PROTOCOL...</>
                    ) : (
                      <><Play className="w-5 h-5 mr-2 fill-current" /> TRIGGER FEDERATED SYNC</>
                    )}
                  </button>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Network Topology Visualization */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
             
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
             
             {/* Status overlay */}
             <div className="absolute top-6 right-6 z-20">
                <div className="bg-[#0a0a0c] border border-gray-800 px-4 py-2 rounded-xl shadow-inner flex items-center">
                   <Activity className={`w-4 h-4 mr-2 ${isTraining ? 'text-emerald-400 animate-pulse' : 'text-gray-500'}`} />
                   <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-gray-400">
                     {phase === 0 ? 'Network Idle' : phase === 1 ? 'Phase 1: Local Training' : phase === 2 ? 'Phase 2: Secure Tx' : 'Phase 3: FedAvg Aggregation'}
                   </span>
                </div>
             </div>
            
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-4 mb-6 relative z-10 uppercase tracking-widest">
              <Network className="w-4 h-4 mr-2 text-cyan-500" />
              Global Aggregation Topology
            </h3>
            
            <div className="flex-1 flex items-center justify-center relative z-10 min-h-[400px]">
               
               {/* Central Aggregator */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                  <div className={`w-28 h-28 rounded-full border-2 flex items-center justify-center bg-[#0a0a0c] transition-all duration-500 ${
                    phase === 3 ? 'border-cyan-500 shadow-[0_0_50px_rgba(34,211,238,0.3)] bg-cyan-900/10' : 'border-gray-800 shadow-2xl'
                  }`}>
                     <Database className={`w-12 h-12 ${phase === 3 ? 'text-cyan-400 animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]' : 'text-gray-600'}`} />
                  </div>
                  <div className="bg-[#050505] border border-gray-800 px-4 py-1.5 rounded-full mt-4 shadow-xl">
                    <span className={`font-black uppercase tracking-widest text-xs ${phase === 3 ? 'text-cyan-400' : 'text-gray-500'}`}>Bioquora Aggregator</span>
                  </div>
                  {phase === 3 && (
                     <span className="absolute -bottom-10 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-900/20 border border-cyan-900/50 px-3 py-1 rounded-lg animate-fade-in-up uppercase tracking-widest">
                        Averaging Weights...
                     </span>
                  )}
               </div>

               {/* Edge Node 1: Top Left */}
               <div className="absolute top-12 left-12 flex flex-col items-center z-10">
                  <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center bg-[#0a0a0c] transition-all duration-300 ${
                    phase === 1 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-900/10' : 'border-gray-800'
                  }`}>
                    <Server className={`w-8 h-8 ${phase === 1 ? 'text-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-gray-700'}`} />
                  </div>
                  <span className="mt-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">Mayo Clinic Enclave</span>
                  <span className={`text-[10px] font-mono mt-1 ${phase === 1 ? 'text-emerald-400' : 'text-transparent'}`}>Local Train (12k)</span>
               </div>

               {/* Connection 1 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="20%" y1="25%" x2="45%" y2="45%" stroke="#1f2937" strokeWidth="2" strokeDasharray="6,6" className={`${phase === 2 ? 'animate-[dash_1s_linear_infinite]' : ''}`} />
                 {phase === 2 && (
                   <circle cx="20%" cy="25%" r="5" fill="#34d399" filter="drop-shadow(0 0 5px #34d399)">
                     <animate attributeName="cx" values="20%;45%" dur="1.5s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="25%;45%" dur="1.5s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>

               {/* Edge Node 2: Bottom Left */}
               <div className="absolute bottom-12 left-12 flex flex-col items-center z-10">
                  <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center bg-[#0a0a0c] transition-all duration-300 ${
                    phase === 1 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-900/10' : 'border-gray-800'
                  }`}>
                    <Server className={`w-8 h-8 ${phase === 1 ? 'text-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-gray-700'}`} />
                  </div>
                  <span className="mt-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">Apollo Health Hub</span>
                  <span className={`text-[10px] font-mono mt-1 ${phase === 1 ? 'text-emerald-400' : 'text-transparent'}`}>Local Train (8k)</span>
               </div>

               {/* Connection 2 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="20%" y1="75%" x2="45%" y2="55%" stroke="#1f2937" strokeWidth="2" strokeDasharray="6,6" className={`${phase === 2 ? 'animate-[dash_1s_linear_infinite]' : ''}`} />
                 {phase === 2 && (
                   <circle cx="20%" cy="75%" r="5" fill="#34d399" filter="drop-shadow(0 0 5px #34d399)">
                     <animate attributeName="cx" values="20%;45%" dur="1.2s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="75%;55%" dur="1.2s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>

               {/* Edge Node 3: Top Right */}
               <div className="absolute top-12 right-12 flex flex-col items-center z-10">
                  <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center bg-[#0a0a0c] transition-all duration-300 ${
                    phase === 1 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-900/10' : 'border-gray-800'
                  }`}>
                    <Server className={`w-8 h-8 ${phase === 1 ? 'text-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-gray-700'}`} />
                  </div>
                  <span className="mt-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">UK NHS Trust Node</span>
                  <span className={`text-[10px] font-mono mt-1 ${phase === 1 ? 'text-emerald-400' : 'text-transparent'}`}>Local Train (24k)</span>
               </div>

               {/* Connection 3 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="80%" y1="25%" x2="55%" y2="45%" stroke="#1f2937" strokeWidth="2" strokeDasharray="6,6" className={`${phase === 2 ? 'animate-[dash_1s_linear_infinite]' : ''}`} />
                 {phase === 2 && (
                   <circle cx="80%" cy="25%" r="5" fill="#34d399" filter="drop-shadow(0 0 5px #34d399)">
                     <animate attributeName="cx" values="80%;55%" dur="1.8s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="25%;45%" dur="1.8s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>
               
               {/* Edge Node 4: Bottom Right */}
               <div className="absolute bottom-12 right-12 flex flex-col items-center z-10">
                  <div className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center bg-[#0a0a0c] transition-all duration-300 ${
                    phase === 1 ? 'border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-emerald-900/10' : 'border-gray-800'
                  }`}>
                    <Server className={`w-8 h-8 ${phase === 1 ? 'text-emerald-400 animate-pulse drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'text-gray-700'}`} />
                  </div>
                  <span className="mt-3 text-[10px] font-black text-gray-500 uppercase tracking-widest">Charité Berlin</span>
                  <span className={`text-[10px] font-mono mt-1 ${phase === 1 ? 'text-emerald-400' : 'text-transparent'}`}>Local Train (15k)</span>
               </div>

               {/* Connection 4 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                 <line x1="80%" y1="75%" x2="55%" y2="55%" stroke="#1f2937" strokeWidth="2" strokeDasharray="6,6" className={`${phase === 2 ? 'animate-[dash_1s_linear_infinite]' : ''}`} />
                 {phase === 2 && (
                   <circle cx="80%" cy="75%" r="5" fill="#34d399" filter="drop-shadow(0 0 5px #34d399)">
                     <animate attributeName="cx" values="80%;55%" dur="1.4s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="75%;55%" dur="1.4s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>

            </div>
          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) translateX(-50%); }
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -12;
          }
        }
      `}</style>
    </div>
  );
}
