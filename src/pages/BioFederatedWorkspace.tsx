import React, { useState, useEffect } from 'react';
import { Network, Database, Lock, ShieldCheck, Play, Loader2, Link2, Share2, UploadCloud } from 'lucide-react';

const BioFederatedWorkspace = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Idle, 1: Local Train, 2: Uploading, 3: Aggregating

  const handleTriggerFederated = () => {
    setIsTraining(true);
    setPhase(1);

    // Phase 1: Local Training
    setTimeout(() => {
      setPhase(2);
    }, 3000);

    // Phase 2: Uploading Gradients
    setTimeout(() => {
      setPhase(3);
    }, 5500);

    // Phase 3: Aggregating
    setTimeout(() => {
      setPhase(0);
      setIsTraining(false);
    }, 8500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-500 flex items-center">
            <Share2 className="w-10 h-10 mr-3 text-emerald-500" />
            BioFederated Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 18: Privacy-Preserving Decentralized Learning Network</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-emerald-900/50">
             <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
             <span className="text-sm text-emerald-400 font-mono">HIPAA / GDPR Compliant</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Security Audit & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl h-full flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-600"></div>
            
             <h2 className="font-bold text-gray-200 flex items-center mb-6">
              <Lock className="w-5 h-5 mr-2 text-emerald-400" />
              Privacy Audit
            </h2>

            <div className="space-y-4 flex-1">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                <span className="text-sm text-gray-400">PHI Exposed</span>
                <span className="font-mono text-emerald-400 font-bold">0 Bytes</span>
              </div>
              
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                <span className="text-sm text-gray-400">Homomorphic Enc.</span>
                <span className="font-mono text-cyan-400 font-bold">Active (AES-256)</span>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800 flex flex-col">
                <span className="text-xs text-gray-500 mb-1 uppercase tracking-wider">Differential Privacy Noise</span>
                <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden mt-1">
                  <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 w-[75%]"></div>
                </div>
                <span className="text-[10px] text-gray-500 mt-1">Epsilon (ε) = 0.5</span>
              </div>

              <div className="mt-8 pt-4 border-t border-gray-800">
                <div className="text-xs text-gray-500 leading-relaxed">
                  Federated learning pushes the model to the edge. Raw patient records never leave the hospital's secure intranet. Only encrypted gradient updates are shared.
                </div>
              </div>
            </div>

            <button 
              onClick={handleTriggerFederated}
              disabled={isTraining}
              className={`w-full py-4 mt-6 rounded-xl font-bold flex items-center justify-center transition-all ${
                isTraining ? 'bg-emerald-900/30 text-emerald-500 border border-emerald-900/50' : 
                'bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]'
              }`}
            >
              {isTraining ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Simulating Protocol...</>
              ) : (
                <><Play className="w-5 h-5 mr-2 fill-current" /> Trigger FL Sync Epoch</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Network Topology Visualization */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[500px] flex flex-col relative overflow-hidden">
             
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px]"></div>
            
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-6 relative z-10">
              <Network className="w-6 h-6 mr-2 text-cyan-500" />
              Global Aggregation Topology
            </h3>
            
            <div className="flex-1 flex items-center justify-center relative z-10">
               
               {/* Central Aggregator */}
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center bg-gray-950 transition-all duration-500 ${
                    phase === 3 ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.4)]' : 'border-gray-700'
                  }`}>
                     <Database className={`w-10 h-10 ${phase === 3 ? 'text-cyan-400 animate-pulse' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-4 font-bold ${phase === 3 ? 'text-cyan-300' : 'text-gray-400'}`}>Bioquora Aggregator</span>
                  {phase === 3 && <span className="absolute -bottom-8 text-xs font-mono text-cyan-400 animate-fade-in">Averaging Weights (FedAvg)...</span>}
               </div>

               {/* Edge Node 1: Top Left */}
               <div className="absolute top-10 left-10 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center bg-gray-900 transition-all ${
                    phase === 1 ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-700'
                  }`}>
                    <Server className={`w-6 h-6 ${phase === 1 ? 'text-emerald-400 animate-pulse' : 'text-gray-600'}`} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-gray-400">Node: Mayo Clinic</span>
                  {phase === 1 && <span className="text-[10px] font-mono text-emerald-400 mt-1">Local Train (12k docs)</span>}
               </div>

               {/* Connection 1 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                 <line x1="15%" y1="20%" x2="45%" y2="45%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                 {phase === 2 && (
                   <circle cx="15%" cy="20%" r="4" fill="#34d399">
                     <animate attributeName="cx" values="15%;45%" dur="1s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="20%;45%" dur="1s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>

               {/* Edge Node 2: Bottom Left */}
               <div className="absolute bottom-10 left-10 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center bg-gray-900 transition-all ${
                    phase === 1 ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-700'
                  }`}>
                    <Server className={`w-6 h-6 ${phase === 1 ? 'text-emerald-400 animate-pulse' : 'text-gray-600'}`} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-gray-400">Node: Apollo Health</span>
                  {phase === 1 && <span className="text-[10px] font-mono text-emerald-400 mt-1">Local Train (8k docs)</span>}
               </div>

               {/* Connection 2 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                 <line x1="15%" y1="80%" x2="45%" y2="55%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                 {phase === 2 && (
                   <circle cx="15%" cy="80%" r="4" fill="#34d399">
                     <animate attributeName="cx" values="15%;45%" dur="1s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="80%;55%" dur="1s" repeatCount="indefinite" />
                   </circle>
                 )}
               </svg>

               {/* Edge Node 3: Top Right */}
               <div className="absolute top-10 right-10 flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center bg-gray-900 transition-all ${
                    phase === 1 ? 'border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-gray-700'
                  }`}>
                    <Server className={`w-6 h-6 ${phase === 1 ? 'text-emerald-400 animate-pulse' : 'text-gray-600'}`} />
                  </div>
                  <span className="mt-2 text-xs font-bold text-gray-400">Node: UK NHS Trust</span>
                  {phase === 1 && <span className="text-[10px] font-mono text-emerald-400 mt-1">Local Train (24k docs)</span>}
               </div>

               {/* Connection 3 */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
                 <line x1="85%" y1="20%" x2="55%" y2="45%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
                 {phase === 2 && (
                   <circle cx="85%" cy="20%" r="4" fill="#34d399">
                     <animate attributeName="cx" values="85%;55%" dur="1s" repeatCount="indefinite" />
                     <animate attributeName="cy" values="20%;45%" dur="1s" repeatCount="indefinite" />
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
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BioFederatedWorkspace;
