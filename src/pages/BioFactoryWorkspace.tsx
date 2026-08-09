import React, { useState, useEffect } from 'react';
import { Factory, Server, Cpu, HardDrive, Network, Play, Shield, Loader2, ArrowUpRight, Copy, Activity, Zap, CheckCircle } from 'lucide-react';

export default function BioFactoryWorkspace() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [pods, setPods] = useState(12);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [deploymentPhase, setDeploymentPhase] = useState('');
  
  // Simulate live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(prev => {
        const variance = Math.floor(Math.random() * 5) - 2;
        let newUsage = prev + variance;
        if (newUsage > 95) newUsage = 95;
        if (newUsage < 10) newUsage = 15;
        return newUsage;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleScaleUp = () => {
    setIsDeploying(true);
    setDeploymentPhase('PROVISIONING');
    
    // Animate pod scaling
    let currentPods = pods;
    const targetPods = 144;
    
    setTimeout(() => setDeploymentPhase('ALLOCATING_VRAM'), 2000);
    setTimeout(() => setDeploymentPhase('SYNCING_WEIGHTS'), 4000);
    
    const interval = setInterval(() => {
      currentPods += Math.floor(Math.random() * 10) + 5;
      if (currentPods >= targetPods) {
        setPods(targetPods);
        setIsDeploying(false);
        setDeploymentPhase('');
        clearInterval(interval);
      } else {
        setPods(currentPods);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 15 • Global Compute Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Factory className="w-10 h-10 mr-3 text-cyan-500 animate-pulse" />
             BioFactory Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#10b981]"></div>
             <span className="text-sm text-emerald-400 font-mono font-bold tracking-widest uppercase">AWS / GCP Multi-Cloud: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Fleet Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-blue-500"></div>
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <Server className="w-4 h-4 mr-2 text-cyan-400" />
               Cluster Deployment Control
             </h3>

             <div className="space-y-6 flex-1 flex flex-col">
               
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner">
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center">
                    <Zap className="w-3 h-3 mr-1 text-yellow-400" /> Target Node
                 </div>
                 <div className="font-mono text-sm text-cyan-300 font-bold uppercase tracking-widest mb-1">us-east-1 (N. Virginia)</div>
                 <div className="font-mono text-[10px] text-gray-500">GKE Cluster: bioq-prod-01</div>
               </div>

               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner">
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 flex items-center">
                    <Activity className="w-3 h-3 mr-1 text-emerald-400" /> Deployed Architecture
                 </div>
                 <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1.5 bg-[#050505] text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-gray-800 rounded-lg">Llama-3-Bio</span>
                    <span className="px-2.5 py-1.5 bg-[#050505] text-teal-400 text-[10px] font-bold uppercase tracking-widest border border-gray-800 rounded-lg">BioVision-Net</span>
                    <span className="px-2.5 py-1.5 bg-[#050505] text-orange-400 text-[10px] font-bold uppercase tracking-widest border border-gray-800 rounded-lg">Evoformer</span>
                 </div>
               </div>
               
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner mt-auto">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Pods</span>
                    <span className="font-mono font-bold text-cyan-400 text-2xl">{pods}</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-2 border border-gray-800 overflow-hidden mb-2 shadow-inner">
                     <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_#06b6d4]" style={{ width: `${Math.min((pods/150)*100, 100)}%` }}></div>
                  </div>
                  {isDeploying && (
                     <div className="text-[10px] text-cyan-500 font-mono text-right animate-pulse">
                        Scaling to 144...
                     </div>
                  )}
               </div>

               <div className="pt-4">
                  <button 
                    onClick={handleScaleUp}
                    disabled={isDeploying || pods > 100}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all uppercase tracking-widest text-sm ${
                      isDeploying || pods > 100 ? 'bg-[#0a0a0c] text-gray-600 border border-gray-800 cursor-not-allowed' : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    }`}
                  >
                    {isDeploying ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> PROVISIONING NODES...</>
                    ) : pods > 100 ? (
                      <><CheckCircle className="w-5 h-5 mr-2 text-emerald-500" /> MAX CAPACITY REACHED</>
                    ) : (
                      <><ArrowUpRight className="w-5 h-5 mr-2" /> SCALE OUT FLEET (144)</>
                    )}
                  </button>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Visualization & Telemetry */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Top Row: Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex items-center group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-[30px]"></div>
               <div className="w-12 h-12 bg-[#0a0a0c] rounded-xl flex items-center justify-center border border-gray-800 shadow-inner mr-4">
                 <Cpu className="w-6 h-6 text-blue-500" />
               </div>
               <div className="relative z-10">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">GPU Utilization</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{cpuUsage + (pods > 50 ? 40 : 0)}%</div>
               </div>
            </div>
            
            <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex items-center group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-[30px]"></div>
               <div className="w-12 h-12 bg-[#0a0a0c] rounded-xl flex items-center justify-center border border-gray-800 shadow-inner mr-4">
                 <HardDrive className="w-6 h-6 text-purple-500" />
               </div>
               <div className="relative z-10">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">VRAM Allocation</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{(pods * 1.2).toFixed(1)} TB</div>
               </div>
            </div>
            
            <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex items-center group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-[30px]"></div>
               <div className="w-12 h-12 bg-[#0a0a0c] rounded-xl flex items-center justify-center border border-gray-800 shadow-inner mr-4">
                 <Network className="w-6 h-6 text-emerald-500" />
               </div>
               <div className="relative z-10">
                 <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Network I/O</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{(pods * 0.45).toFixed(2)} GB/s</div>
               </div>
            </div>
          </div>

          {/* Main Visualizer: K8s Node Map */}
          <div className="flex-1 bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-900">
              <h3 className="text-xs font-bold text-gray-400 flex items-center uppercase tracking-widest">
                <Network className="w-4 h-4 mr-2 text-indigo-400" />
                Kubernetes Pod Topology
              </h3>
              <div className="text-[10px] font-bold font-mono text-gray-500 bg-[#0a0a0c] px-3 py-1.5 rounded-lg border border-gray-800 shadow-inner uppercase tracking-widest">
                Namespace: default
              </div>
            </div>

            <div className="flex-1 bg-[#020202] border border-gray-900 rounded-xl p-6 overflow-y-auto custom-scrollbar relative shadow-inner">
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {Array.from({ length: pods }).map((_, i) => (
                  <div key={i} className={`w-10 h-10 rounded-xl border flex items-center justify-center animate-fade-in ${
                    i < 12 ? 'bg-[#050505] border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 
                    'bg-[#0a0a0c] border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    }`} style={{ animationDelay: `${(i % 10) * 30}ms` }}>
                     <div className={`w-2 h-2 rounded-full ${i % 7 === 0 ? 'bg-amber-400 animate-pulse shadow-[0_0_5px_#fbbf24]' : 'bg-emerald-400 shadow-[0_0_5px_#10b981]'}`}></div>
                  </div>
                ))}
              </div>
              
              {/* Overlay for deployment phase */}
              {isDeploying && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-20 flex flex-col items-center justify-center pointer-events-none">
                   <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                   <div className="bg-[#050505]/80 text-cyan-300 px-6 py-3 rounded-full font-mono text-xs font-bold border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center uppercase tracking-widest">
                     {deploymentPhase}...
                   </div>
                </div>
              )}
            </div>

            {/* Terminal snippet */}
            <div className="mt-6 bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl flex items-center justify-between group shadow-inner">
              <div className="font-mono text-xs text-gray-400 flex items-center">
                <span className="text-cyan-500 font-bold mr-3">{'>'}</span> kubectl scale deployment bioq-engine --replicas={pods}
              </div>
              <button className="text-gray-600 hover:text-cyan-400 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
