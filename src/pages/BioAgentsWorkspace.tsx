import React, { useState, useEffect } from 'react';
import { Bot, Plus, CheckCircle, Loader2, BookOpen, Dna, Pill, BarChart, Server, Activity, ArrowRight, BrainCircuit } from 'lucide-react';

export default function BioAgentsWorkspace() {
  const [missionProgress, setMissionProgress] = useState(65);
  const [isExecuting, setIsExecuting] = useState(true);

  // Simulate progress
  useEffect(() => {
    if (!isExecuting) return;
    const interval = setInterval(() => {
      setMissionProgress(prev => {
        if (prev >= 100) {
          setIsExecuting(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [isExecuting]);

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 2 • Multi-Agent Ecosystem</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Bot className="w-10 h-10 mr-3 text-indigo-500 animate-pulse" />
             Mission Orchestrator
          </h1>
        </div>
        <div className="flex space-x-4">
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.4)] transition flex items-center">
             <Plus className="w-4 h-4 mr-2" /> New Mission
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Main Canvas: Active Mission Workflow */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-500"></div>
             
             <div className="mb-8 pb-6 border-b border-gray-900 relative">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-black text-gray-100 font-mono tracking-wider">Mission: MSN-7A9B</h2>
                  <div className="flex items-center px-3 py-1 bg-indigo-900/20 border border-indigo-900/50 rounded-full">
                    {isExecuting ? (
                       <><div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#6366f1]"></div><span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Executing</span></>
                    ) : (
                       <><div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 shadow-[0_0_10px_#10b981]"></div><span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Complete</span></>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400 font-mono leading-relaxed max-w-3xl">"Identify potential repurposed drug candidates for triple-negative breast cancer (TNBC) based on recent transcriptomic datasets, and draft a preliminary statistical validation plan."</p>
             </div>
             
             <div className="space-y-6 flex-1 relative">
                
                {/* Connecting Line */}
                <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-gray-900 z-0"></div>

                {/* Task 1: Complete */}
                <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-2xl flex items-start gap-5 relative z-10 shadow-inner group-hover:border-gray-700 transition-colors">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-900/20 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                         <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Literature Review & Dataset ID</h3>
                         <span className="px-2.5 py-1 bg-[#050505] text-emerald-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-gray-800 flex items-center">
                           <BookOpen className="w-3 h-3 mr-1" /> LiteratureAgent
                         </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono">Scanned PubMed and GEO. Identified 3 high-quality TNBC RNA-seq datasets (GSE123...).</p>
                   </div>
                </div>

                {/* Task 2: Active / Complete */}
                <div className={`bg-[#0a0a0c] border p-5 rounded-2xl flex items-start gap-5 relative z-10 shadow-inner transition-colors duration-500 ${isExecuting ? 'border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]' : 'border-gray-800'}`}>
                   <div className={`w-14 h-14 shrink-0 rounded-xl border-2 flex items-center justify-center transition-all ${isExecuting ? 'bg-indigo-900/30 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'bg-emerald-900/20 border-emerald-500/50'}`}>
                      {isExecuting ? (
                        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <CheckCircle className="w-6 h-6 text-emerald-500" />
                      )}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                         <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Differential Expression Analysis</h3>
                         <span className="px-2.5 py-1 bg-[#050505] text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-gray-800 flex items-center">
                           <Dna className="w-3 h-3 mr-1" /> BioinfoAgent
                         </span>
                      </div>
                      <p className="text-xs text-gray-400 font-mono mb-4">Executing DESeq2 pipeline on GSE123 datasets to identify significantly upregulated targets.</p>
                      <div className="w-full bg-gray-900 rounded-full h-2 border border-gray-800 overflow-hidden">
                         <div className={`h-full rounded-full transition-all duration-100 ease-out ${isExecuting ? 'bg-indigo-500 shadow-[0_0_10px_#6366f1]' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`} style={{ width: `${Math.min(100, missionProgress)}%` }}></div>
                      </div>
                      {isExecuting && <div className="mt-2 text-[10px] text-gray-500 font-mono text-right">{Math.round(missionProgress)}%</div>}
                   </div>
                </div>

                {/* Task 3: Pending */}
                <div className={`bg-[#0a0a0c] border border-gray-800 p-5 rounded-2xl flex items-start gap-5 relative z-10 shadow-inner transition-opacity duration-500 ${!isExecuting ? 'opacity-100' : 'opacity-40'}`}>
                   <div className={`w-14 h-14 shrink-0 rounded-xl bg-[#050505] border-2 border-gray-800 flex items-center justify-center text-gray-600 font-bold ${!isExecuting ? 'border-amber-500/50 text-amber-500' : ''}`}>
                      3
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                         <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Drug-Target Network Mapping</h3>
                         <span className="px-2.5 py-1 bg-[#050505] text-amber-500/70 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-gray-800 flex items-center">
                           <Pill className="w-3 h-3 mr-1" /> DrugAgent
                         </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">Awaiting DE genes from BioinfoAgent to query ChEMBL for repurposed compounds.</p>
                   </div>
                </div>

                {/* Task 4: Pending */}
                <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-2xl flex items-start gap-5 relative z-10 shadow-inner opacity-30">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-[#050505] border-2 border-gray-800 flex items-center justify-center text-gray-600 font-bold">
                      4
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                         <h3 className="text-sm font-bold text-gray-200 uppercase tracking-wider">Statistical Validation Plan</h3>
                         <span className="px-2.5 py-1 bg-[#050505] text-purple-500/70 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-gray-800 flex items-center">
                           <BarChart className="w-3 h-3 mr-1" /> StatsAgent
                         </span>
                      </div>
                      <p className="text-xs text-gray-500 font-mono">Drafting power analysis and validation protocols.</p>
                   </div>
                </div>

             </div>
          </div>
        </div>

        {/* Right Column: Active Agent Pool */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
                <BrainCircuit className="w-4 h-4 mr-2 text-indigo-400" />
                Active Agent Pool
             </h3>
             
             <div className="space-y-4 flex-1">
                
                {/* Agent 1 */}
                <div className="flex items-center gap-4 p-4 bg-[#0a0a0c] rounded-xl border border-gray-800 shadow-inner">
                   <div className="w-10 h-10 rounded-lg bg-[#050505] border border-gray-800 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-gray-500" />
                   </div>
                   <div className="flex-1">
                      <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">LiteratureAgent</div>
                      <div className="text-[10px] text-gray-500 font-mono">Status: <span className="text-emerald-500/70">Idle (Task Complete)</span></div>
                   </div>
                </div>

                {/* Agent 2 */}
                <div className={`flex items-center gap-4 p-4 rounded-xl border transition-colors duration-500 shadow-inner ${isExecuting ? 'bg-indigo-900/10 border-indigo-900/50' : 'bg-[#0a0a0c] border-gray-800'}`}>
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${isExecuting ? 'bg-indigo-900/30 border-indigo-500/30' : 'bg-[#050505] border-gray-800'}`}>
                      <Dna className={`w-5 h-5 ${isExecuting ? 'text-indigo-400 animate-pulse' : 'text-gray-500'}`} />
                   </div>
                   <div className="flex-1">
                      <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isExecuting ? 'text-indigo-300' : 'text-gray-300'}`}>BioinfoAgent</div>
                      <div className="text-[10px] font-mono">Status: <span className={isExecuting ? "text-indigo-400 font-bold" : "text-emerald-500/70"}>{isExecuting ? "Executing (DESeq2 Pipeline)" : "Idle (Task Complete)"}</span></div>
                   </div>
                </div>

                {/* Agent 3 */}
                <div className={`flex items-center gap-4 p-4 rounded-xl border shadow-inner transition-colors duration-500 ${!isExecuting ? 'bg-amber-900/10 border-amber-900/50' : 'bg-[#0a0a0c] border-gray-800'}`}>
                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${!isExecuting ? 'bg-amber-900/30 border-amber-500/30' : 'bg-[#050505] border-gray-800'}`}>
                      <Pill className={`w-5 h-5 ${!isExecuting ? 'text-amber-400 animate-pulse' : 'text-gray-500'}`} />
                   </div>
                   <div className="flex-1">
                      <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${!isExecuting ? 'text-amber-300' : 'text-gray-300'}`}>DrugDiscoveryAgent</div>
                      <div className="text-[10px] font-mono">Status: <span className={!isExecuting ? "text-amber-400 font-bold" : "text-gray-500"}>{!isExecuting ? "Initializing ChEMBL Query..." : "Waiting for Inputs"}</span></div>
                   </div>
                </div>

                {/* Agent 4 */}
                <div className="flex items-center gap-4 p-4 bg-[#0a0a0c] rounded-xl border border-gray-800 shadow-inner">
                   <div className="w-10 h-10 rounded-lg bg-[#050505] border border-gray-800 flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-gray-500" />
                   </div>
                   <div className="flex-1">
                      <div className="text-xs font-bold text-gray-300 uppercase tracking-wider mb-1">StatsAgent</div>
                      <div className="text-[10px] text-gray-500 font-mono">Status: <span>Idle</span></div>
                   </div>
                </div>

             </div>

             <div className="mt-6 pt-4 border-t border-gray-900">
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner flex items-center justify-between">
                 <div className="flex items-center">
                   <Server className="w-4 h-4 text-gray-500 mr-2" />
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compute Cluster</span>
                 </div>
                 <div className="text-xs font-mono text-indigo-400">Node-A4 (Healthy)</div>
               </div>
             </div>

          </div>
        </div>

      </div>
      
    </div>
  );
}
