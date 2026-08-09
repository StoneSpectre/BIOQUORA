import React, { useState, useEffect } from 'react';
import { BrainCircuit, GitMerge, FileText, Database, Share2, Activity, Play, Zap, Network, Code2, LineChart } from 'lucide-react';

export default function BioReasonWorkspace() {
  const [activeStep, setActiveStep] = useState(1);

  // Simulate CoT reasoning progression
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prev => (prev >= 4 ? 4 : prev + 1));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-slate-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end">
          <div>
            <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 3 • Cognitive Layer</div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
               <BrainCircuit className="w-10 h-10 mr-3 text-purple-500 animate-pulse" />
               BioReason Inference Engine
            </h1>
          </div>
          <div className="flex space-x-4">
             <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#a855f7]"></div>
                <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">CoT PIPELINE ACTIVE</span>
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
           
           {/* Left: Active Reasoning Pipeline */}
           <div className="lg:col-span-8 bg-[#050505] border border-gray-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-500"></div>
              
              <div className="mb-8 pb-6 border-b border-gray-900 flex justify-between items-start">
                 <div>
                   <h2 className="text-sm font-bold text-gray-400 font-mono flex items-center gap-2 tracking-widest uppercase mb-2">
                      <Code2 className="w-4 h-4 text-purple-400" />
                      Query <span className="text-purple-400">#Q-8819</span>
                   </h2>
                   <p className="text-lg text-gray-200 font-medium leading-relaxed max-w-2xl">
                      "Does the inhibition of the Wnt/beta-catenin pathway directly cause apoptosis in colorectal cancer cell lines with APC mutations, or is it mediated by secondary apoptotic signaling?"
                   </p>
                 </div>
                 <div className="bg-purple-900/20 border border-purple-500/30 px-3 py-1 rounded text-xs font-bold text-purple-400 uppercase tracking-widest">
                   Processing
                 </div>
              </div>
              
              <div className="space-y-8 relative">
                 
                 {/* Connecting Line */}
                 <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-900 z-0"></div>
                 
                 {/* Step 1 */}
                 <div className={`flex gap-6 relative z-10 transition-all duration-500 ${activeStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${activeStep > 1 ? 'bg-purple-900/50 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : activeStep === 1 ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
                      <Network className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1.5">
                       <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">1. Intent Analysis & Decomposition</h3>
                       <div className="bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl text-sm text-gray-400 leading-relaxed shadow-inner">
                          Identified causal query requiring mechanistic mapping. Decomposed into: 
                          <div className="mt-2 pl-3 border-l-2 border-purple-500/50 space-y-1 font-mono text-xs">
                             <div>(1) Baseline APC mutation effects on Wnt</div>
                             <div>(2) Direct vs indirect apoptotic triggers</div>
                             <div>(3) Secondary mediator identification</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Step 2 */}
                 <div className={`flex gap-6 relative z-10 transition-all duration-500 ${activeStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${activeStep > 2 ? 'bg-purple-900/50 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : activeStep === 2 ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
                      <Database className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1.5">
                       <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">2. Literature & Evidence Retrieval</h3>
                       <div className="bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl text-sm text-gray-400 shadow-inner flex items-center justify-between">
                          <span>Extracted 18 highly relevant mechanistic studies from PubMed and PMC.</span>
                          <span className="text-xs font-mono bg-emerald-900/20 text-emerald-400 px-2 py-1 border border-emerald-900/50 rounded flex items-center">
                            <Activity className="w-3 h-3 mr-1" /> 412 Papers Scanned
                          </span>
                       </div>
                    </div>
                 </div>

                 {/* Step 3 */}
                 <div className={`flex gap-6 relative z-10 transition-all duration-500 ${activeStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${activeStep > 3 ? 'bg-purple-900/50 border-purple-500 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : activeStep === 3 ? 'bg-purple-600 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] animate-pulse' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
                      <GitMerge className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1.5">
                       <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">3. Biological Causal Reasoning</h3>
                       <div className="bg-purple-900/10 border border-purple-500/20 p-5 rounded-xl text-sm text-gray-300 leading-relaxed shadow-[0_0_15px_rgba(168,85,247,0.05)]">
                          Mapping causal chain. Evidence indicates inhibition of Wnt/beta-catenin primarily downregulates <span className="font-mono text-pink-400 font-bold">survivin</span> and <span className="font-mono text-pink-400 font-bold">c-Myc</span> (direct effect). However, terminal apoptosis is frequently mediated by <span className="font-mono text-cyan-400 font-bold">Bax/Bcl-2</span> ratio alteration (secondary effect).
                          
                          {/* Mini Flowchart */}
                          <div className="mt-4 flex items-center justify-between bg-black/50 p-4 rounded-lg border border-gray-800">
                             <div className="text-center">
                                <div className="text-[10px] uppercase text-gray-500 mb-1">Inhibition</div>
                                <div className="bg-gray-800 px-3 py-1.5 rounded text-xs font-mono font-bold">Wnt Pathway</div>
                             </div>
                             <div className="flex-1 h-px bg-gray-700 relative mx-2">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-[10px] text-gray-500">Direct</div>
                             </div>
                             <div className="text-center">
                                <div className="text-[10px] uppercase text-gray-500 mb-1">Downregulates</div>
                                <div className="bg-gray-800 px-3 py-1.5 rounded text-xs font-mono font-bold border border-pink-500/30 text-pink-400">c-Myc / survivin</div>
                             </div>
                             <div className="flex-1 h-px bg-gray-700 relative mx-2">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-2 text-[10px] text-gray-500">Mediates</div>
                             </div>
                             <div className="text-center">
                                <div className="text-[10px] uppercase text-gray-500 mb-1">Apoptosis via</div>
                                <div className="bg-gray-800 px-3 py-1.5 rounded text-xs font-mono font-bold border border-cyan-500/30 text-cyan-400">Bax/Bcl-2</div>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Step 4 */}
                 <div className={`flex gap-6 relative z-10 transition-all duration-500 ${activeStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 ${activeStep === 4 ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-gray-900 border-gray-700 text-gray-500'}`}>
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex-1 pt-1.5">
                       <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider mb-2">4. Final Synthesis & Confidence</h3>
                       <div className="bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl shadow-inner">
                          {activeStep < 4 ? (
                             <div className="flex items-center text-gray-500 text-sm font-mono animate-pulse">
                                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin mr-3"></div>
                                Waiting for causal map resolution...
                             </div>
                          ) : (
                             <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-300 leading-relaxed max-w-md">Conclusion generated. Both direct (transcriptional) and indirect (mitochondrial) pathways are required for full apoptosis.</span>
                                <div className="text-right">
                                   <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Causal Confidence</div>
                                   <div className="text-2xl font-bold font-mono text-emerald-400">94.2%</div>
                                </div>
                             </div>
                          )}
                       </div>
                    </div>
                 </div>

              </div>
           </div>

           {/* Right: Modules & Stats */}
           <div className="lg:col-span-4 space-y-6 flex flex-col">
              
              {/* Active Modules */}
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl group hover:border-gray-600 transition-colors duration-500">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-2 flex items-center">
                   <Share2 className="w-4 h-4 mr-2 text-purple-400" />
                   Active Sub-Engines
                 </h3>
                 
                 <div className="space-y-3">
                    <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-950 rounded-lg shadow-inner"><BrainCircuit className="w-4 h-4 text-purple-400" /></div>
                          <div className="text-sm font-bold text-gray-200">BioLogic Engine</div>
                       </div>
                       <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping shadow-[0_0_10px_#a855f7]"></div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-950 rounded-lg shadow-inner"><Network className="w-4 h-4 text-pink-400" /></div>
                          <div className="text-sm font-bold text-gray-200">CausalAI Solver</div>
                       </div>
                       <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping delay-75 shadow-[0_0_10px_#ec4899]"></div>
                    </div>
                    
                    <div className="p-3 bg-gray-900/50 rounded-xl border border-gray-800 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-950 rounded-lg shadow-inner"><LineChart className="w-4 h-4 text-emerald-400" /></div>
                          <div className="text-sm font-bold text-gray-200">StatsReason Node</div>
                       </div>
                       <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping delay-150 shadow-[0_0_10px_#10b981]"></div>
                    </div>
                 </div>
              </div>

              {/* Causal Biostatistics Readout */}
              <div className="bg-[#050505] border border-gray-800 p-6 rounded-2xl shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500">
                 <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-2 flex items-center">
                   <Activity className="w-4 h-4 mr-2 text-pink-400" />
                   Causal Biostatistics
                 </h3>
                 
                 <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-gray-400">P-Value (Effect Size)</span>
                        <span className="text-white font-bold">p &lt; 0.001</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-gray-700 to-white h-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-mono mb-1">
                        <span className="text-gray-400">Confounder Adjusted (ATE)</span>
                        <span className="text-emerald-400 font-bold">+2.4x</span>
                      </div>
                      <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-900 to-emerald-400 h-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-950 rounded-xl border border-gray-800">
                      <div className="text-[10px] uppercase text-gray-500 mb-2 tracking-widest">Do-Calculus Graph Status</div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-gray-300">DAG Fully Identified</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">No unobserved mediators detected in Wnt -&gt; Apoptosis pathway block.</p>
                    </div>
                 </div>

              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
