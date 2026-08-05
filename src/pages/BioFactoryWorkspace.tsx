import React, { useState, useEffect } from 'react';
import { Factory, Server, Cpu, HardDrive, Network, Play, Shield, Loader2, ArrowUpRight, Copy } from 'lucide-react';

const BioFactoryWorkspace = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [pods, setPods] = useState(12);
  const [cpuUsage, setCpuUsage] = useState(24);
  
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
    
    // Animate pod scaling
    let currentPods = pods;
    const targetPods = 144;
    
    const interval = setInterval(() => {
      currentPods += Math.floor(Math.random() * 10) + 5;
      if (currentPods >= targetPods) {
        setPods(targetPods);
        setIsDeploying(false);
        clearInterval(interval);
      } else {
        setPods(currentPods);
      }
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-indigo-500 flex items-center">
            <Factory className="w-10 h-10 mr-3 text-cyan-500" />
            BioFactory Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 15: Global Kubernetes Fleet & Enterprise Deployment</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-cyan-900/50">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
             <span className="text-sm text-emerald-400 font-mono">AWS / GCP Multi-Cloud: HEALTHY</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: Fleet Controls */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden h-full flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-600"></div>
            
             <h2 className="font-bold text-gray-200 flex items-center mb-6">
              <Server className="w-5 h-5 mr-2 text-cyan-400" />
              Cluster Deployment
            </h2>

            <div className="space-y-4 flex-1">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Target Node</div>
                <div className="font-mono text-sm text-cyan-300">us-east-1 (N. Virginia)</div>
                <div className="font-mono text-xs text-gray-500 mt-1">GKE Cluster: bioq-prod-01</div>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Deployed Architecture</div>
                <div className="flex flex-wrap gap-2 mt-2">
                   <span className="px-2 py-1 bg-indigo-900/30 text-indigo-400 text-[10px] border border-indigo-900/50 rounded">Llama-3-Bio</span>
                   <span className="px-2 py-1 bg-teal-900/30 text-teal-400 text-[10px] border border-teal-900/50 rounded">BioVision-Net</span>
                   <span className="px-2 py-1 bg-orange-900/30 text-orange-400 text-[10px] border border-orange-900/50 rounded">Evoformer</span>
                </div>
              </div>
              
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-xs text-gray-500 uppercase tracking-wider">Active Pods</span>
                   <span className="font-mono font-bold text-cyan-400 text-lg">{pods}</span>
                 </div>
                 <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-500 h-1.5 transition-all duration-300" style={{ width: `${Math.min((pods/150)*100, 100)}%` }}></div>
                 </div>
              </div>
            </div>

            <button 
              onClick={handleScaleUp}
              disabled={isDeploying || pods > 100}
              className={`w-full py-3 mt-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                isDeploying || pods > 100 ? 'bg-cyan-900/30 text-cyan-700 cursor-not-allowed' : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
              }`}
            >
              {isDeploying ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Provisioning Nodes...</>
              ) : pods > 100 ? (
                <><Shield className="w-5 h-5 mr-2" /> Max Capacity Reached</>
              ) : (
                <><ArrowUpRight className="w-5 h-5 mr-2" /> Scale to 144 Pods</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Visualization & Telemetry */}
        <div className="xl:col-span-3 space-y-6 flex flex-col">
          
          {/* Top Row: Telemetry Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl flex items-center">
               <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-900/50 mr-4">
                 <Cpu className="w-6 h-6 text-blue-500" />
               </div>
               <div>
                 <div className="text-xs text-gray-500 uppercase">GPU Utilization</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{cpuUsage + (pods > 50 ? 40 : 0)}%</div>
               </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl flex items-center">
               <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center border border-purple-900/50 mr-4">
                 <HardDrive className="w-6 h-6 text-purple-500" />
               </div>
               <div>
                 <div className="text-xs text-gray-500 uppercase">VRAM Allocation</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{(pods * 1.2).toFixed(1)} TB</div>
               </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 shadow-xl flex items-center">
               <div className="w-12 h-12 bg-emerald-900/20 rounded-full flex items-center justify-center border border-emerald-900/50 mr-4">
                 <Network className="w-6 h-6 text-emerald-500" />
               </div>
               <div>
                 <div className="text-xs text-gray-500 uppercase">Network I/O</div>
                 <div className="text-2xl font-mono font-bold text-gray-200">{(pods * 0.45).toFixed(2)} GB/s</div>
               </div>
            </div>
          </div>

          {/* Main Visualizer: K8s Node Map */}
          <div className="flex-1 bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-200 flex items-center">
                <Network className="w-5 h-5 mr-2 text-indigo-400" />
                Kubernetes Pod Topology
              </h3>
              <div className="text-xs font-mono text-gray-500 bg-black px-3 py-1 rounded border border-gray-800">
                Namespace: default
              </div>
            </div>

            <div className="bg-black/50 border border-gray-800 rounded-xl h-[320px] p-6 overflow-y-auto custom-scrollbar relative">
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: pods }).map((_, i) => (
                  <div key={i} className={`w-8 h-8 rounded border flex items-center justify-center animate-fade-in ${
                    i < 12 ? 'bg-indigo-900/30 border-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.2)]' : 
                    'bg-cyan-900/30 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    }`} style={{ animationDelay: `${(i % 10) * 50}ms` }}>
                     <div className={`w-2 h-2 rounded-full ${i % 7 === 0 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`}></div>
                  </div>
                ))}
              </div>
              
              {isDeploying && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-8 pointer-events-none">
                   <div className="bg-cyan-900/80 backdrop-blur text-cyan-100 px-6 py-2 rounded-full font-mono text-xs border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.5)] flex items-center">
                     <Loader2 className="w-4 h-4 mr-2 animate-spin" /> SPINNING UP REPLICA SET...
                   </div>
                </div>
              )}
            </div>

            {/* Terminal snippet */}
            <div className="mt-4 bg-[#0a0f1c] border border-gray-800 p-3 rounded-lg flex items-center justify-between group">
              <div className="font-mono text-[10px] text-gray-400">
                <span className="text-pink-500 mr-2">$</span> kubectl scale deployment bioq-engine --replicas={pods}
              </div>
              <button className="text-gray-600 group-hover:text-gray-400 transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
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
          background-color: #334155;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default BioFactoryWorkspace;
