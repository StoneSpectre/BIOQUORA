import React, { useState } from 'react';
import { GitMerge, Play, CheckCircle, Loader2, ArrowRight, Brain, ShieldCheck, FileText, Database, Activity, Waypoints, Cpu } from 'lucide-react';

const BioWorkflowWorkspace = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeNode, setActiveNode] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const startWorkflow = () => {
    setIsRunning(true);
    setActiveNode(1);
    setIsComplete(false);
    setLogs(["[SYSTEM] Initializing Automated Clinical Oncology Pipeline..."]);

    setTimeout(() => {
      setActiveNode(2);
      setLogs(prev => [...prev, "[Node 1: BioVision] Uploaded MRI scan analyzed. Glioblastoma probability: 88.4%."]);
    }, 2000);

    setTimeout(() => {
      setActiveNode(3);
      setLogs(prev => [...prev, "[Node 2: BioRetriever] Retrieved patient EHR history. No contraindications found."]);
    }, 4500);

    setTimeout(() => {
      setActiveNode(4);
      setLogs(prev => [...prev, "[Node 3: BioValidator] Cross-referenced FDA guidelines. Standard of Care confirmed."]);
    }, 7000);

    setTimeout(() => {
      setActiveNode(5);
      setLogs(prev => [...prev, "[Node 4: BioAssistant] Generated final clinical report and treatment protocol."]);
      setIsRunning(false);
      setIsComplete(true);
    }, 9500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 14 • Orchestration Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <GitMerge className="w-10 h-10 mr-3 text-pink-500 animate-pulse" />
            BioWorkflow Orchestrator
          </h1>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={startWorkflow}
            disabled={isRunning}
            className={`px-8 py-3 rounded-xl font-bold flex items-center transition-all uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(236,72,153,0.2)] ${
              isRunning ? 'bg-gray-900 text-gray-600 border border-gray-800 cursor-not-allowed' : 'bg-pink-600 text-white hover:bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.4)]'
            }`}
          >
            {isRunning ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> EXECUTING PIPELINE...</>
            ) : (
              <><Play className="w-5 h-5 mr-2 fill-current" /> EXECUTE WORKFLOW</>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Main Canvas: Workflow Diagram */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="flex-1 bg-[#050505] border border-gray-800 rounded-2xl p-10 shadow-2xl relative min-h-[550px] flex flex-col group hover:border-gray-600 transition-colors duration-500 overflow-hidden">
             
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]"></div>

             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center absolute top-6 left-8 bg-[#050505]/80 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-800 z-20">
               <Waypoints className="w-4 h-4 mr-2 text-pink-400" />
               Agentic DAG Visualization
             </h3>

             <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
                
                <div className="flex items-center justify-between w-full relative">
                  
                  {/* Connecting Line Base (Behind Nodes) */}
                  <div className="absolute top-1/2 left-8 right-8 h-1 bg-gray-900 -translate-y-1/2 z-0 rounded-full"></div>

                  {/* Node 1: BioVision */}
                  <div className={`flex flex-col items-center transition-all duration-700 z-10 relative ${activeNode >= 1 ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border-2 z-10 transition-colors duration-500 relative overflow-hidden ${
                      activeNode === 1 ? 'bg-blue-900/40 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 
                      activeNode > 1 ? 'bg-gray-900 border-gray-700' : 'bg-black border-gray-800'
                    }`}>
                      {activeNode === 1 && <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent"></div>}
                      <Brain className={`w-8 h-8 relative z-10 ${activeNode === 1 ? 'text-blue-400 animate-pulse' : 'text-gray-600'}`} />
                    </div>
                    <span className={`mt-4 font-bold text-xs uppercase tracking-widest bg-[#050505] px-2 py-1 rounded ${activeNode === 1 ? 'text-blue-400' : 'text-gray-600'}`}>1. BioVision</span>
                  </div>

                  {/* Connection 1 */}
                  <div className="flex-1 h-2 relative z-0 mx-[-20px]">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-[2.5s] ease-linear origin-left shadow-[0_0_10px_rgba(59,130,246,0.5)] ${
                      activeNode >= 2 ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                    {activeNode === 1 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2s_linear_infinite]"><ArrowRight className="w-5 h-5 text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,1)]" /></div>}
                  </div>

                  {/* Node 2: BioRetriever */}
                  <div className={`flex flex-col items-center transition-all duration-700 z-10 relative ${activeNode >= 2 ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border-2 z-10 transition-colors duration-500 relative overflow-hidden ${
                      activeNode === 2 ? 'bg-teal-900/40 border-teal-500 shadow-[0_0_30px_rgba(20,184,166,0.3)]' : 
                      activeNode > 2 ? 'bg-gray-900 border-gray-700' : 'bg-black border-gray-800'
                    }`}>
                      {activeNode === 2 && <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/20 to-transparent"></div>}
                      <Database className={`w-8 h-8 relative z-10 ${activeNode === 2 ? 'text-teal-400 animate-pulse' : 'text-gray-600'}`} />
                    </div>
                    <span className={`mt-4 font-bold text-xs uppercase tracking-widest bg-[#050505] px-2 py-1 rounded ${activeNode === 2 ? 'text-teal-400' : 'text-gray-600'}`}>2. BioRetriever</span>
                  </div>

                  {/* Connection 2 */}
                  <div className="flex-1 h-2 relative z-0 mx-[-20px]">
                    <div className={`absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-[2.5s] ease-linear origin-left shadow-[0_0_10px_rgba(20,184,166,0.5)] ${
                      activeNode >= 3 ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                    {activeNode === 2 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2.5s_linear_infinite]"><ArrowRight className="w-5 h-5 text-teal-400 drop-shadow-[0_0_5px_rgba(20,184,166,1)]" /></div>}
                  </div>

                  {/* Node 3: BioValidator */}
                  <div className={`flex flex-col items-center transition-all duration-700 z-10 relative ${activeNode >= 3 ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border-2 z-10 transition-colors duration-500 relative overflow-hidden ${
                      activeNode === 3 ? 'bg-emerald-900/40 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 
                      activeNode > 3 ? 'bg-gray-900 border-gray-700' : 'bg-black border-gray-800'
                    }`}>
                      {activeNode === 3 && <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent"></div>}
                      <ShieldCheck className={`w-8 h-8 relative z-10 ${activeNode === 3 ? 'text-emerald-400 animate-pulse' : 'text-gray-600'}`} />
                    </div>
                    <span className={`mt-4 font-bold text-xs uppercase tracking-widest bg-[#050505] px-2 py-1 rounded ${activeNode === 3 ? 'text-emerald-400' : 'text-gray-600'}`}>3. BioValidator</span>
                  </div>

                  {/* Connection 3 */}
                  <div className="flex-1 h-2 relative z-0 mx-[-20px]">
                    <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-pink-500 transition-all duration-[2.5s] ease-linear origin-left shadow-[0_0_10px_rgba(16,185,129,0.5)] ${
                      activeNode >= 4 ? 'scale-x-100' : 'scale-x-0'
                    }`}></div>
                    {activeNode === 3 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2.5s_linear_infinite]"><ArrowRight className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,1)]" /></div>}
                  </div>

                  {/* Node 4: BioAssistant */}
                  <div className={`flex flex-col items-center transition-all duration-700 z-10 relative ${activeNode >= 4 ? 'opacity-100 scale-100' : 'opacity-30 scale-90'}`}>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl border-2 z-10 transition-colors duration-500 relative overflow-hidden ${
                      activeNode === 4 || isComplete ? 'bg-pink-900/40 border-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.3)]' : 
                      'bg-black border-gray-800'
                    }`}>
                      {(activeNode === 4 || isComplete) && <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-transparent"></div>}
                      {isComplete ? (
                         <CheckCircle className="w-8 h-8 relative z-10 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                      ) : (
                         <FileText className={`w-8 h-8 relative z-10 ${activeNode === 4 ? 'text-pink-400 animate-pulse' : 'text-gray-600'}`} />
                      )}
                    </div>
                    <span className={`mt-4 font-bold text-xs uppercase tracking-widest bg-[#050505] px-2 py-1 rounded ${activeNode === 4 || isComplete ? 'text-pink-400' : 'text-gray-600'}`}>4. BioAssistant</span>
                  </div>

                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Execution Logs & Status */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl h-full flex flex-col group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-3 mb-4 uppercase tracking-widest">
              <Cpu className="w-4 h-4 mr-2 text-pink-400" />
              Runtime Orchestration Log
            </h3>
            
            <div className="flex-1 bg-[#0a0a0c] rounded-xl p-5 font-mono text-[10px] overflow-y-auto border border-gray-800 shadow-inner relative">
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

              {logs.length === 0 ? (
                <div className="text-gray-600 flex flex-col items-center justify-center h-full opacity-50 uppercase tracking-widest font-bold">
                  <Activity className="w-8 h-8 mb-2" />
                  <span>SYSTEM READY.</span>
                  <span>Awaiting workflow trigger.</span>
                </div>
              ) : (
                <div className="space-y-4">
                  {logs.map((log, index) => (
                    <div key={index} className="animate-fade-in text-gray-400 leading-relaxed border-l-2 border-pink-500/30 pl-3">
                      <span className="text-pink-500 font-bold mr-2">{'>'}</span>{log}
                    </div>
                  ))}
                  {isRunning && (
                    <div className="text-pink-400 animate-pulse mt-4 flex items-center border-l-2 border-pink-500 pl-3 font-bold uppercase tracking-widest">
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Processing active node...
                    </div>
                  )}
                  {isComplete && (
                    <div className="text-emerald-400 mt-6 font-bold bg-emerald-900/10 border border-emerald-900/30 p-3 rounded-lg uppercase tracking-widest">
                      [SUCCESS] Workflow execution completed with 0 errors.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-900 grid grid-cols-2 gap-4 text-sm">
               <div className="bg-[#0a0a0c] p-3 rounded-xl text-center border border-gray-800 shadow-inner">
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Latency</div>
                 <div className="font-mono text-pink-400 font-bold text-lg">9.5s</div>
               </div>
               <div className="bg-[#0a0a0c] p-3 rounded-xl text-center border border-gray-800 shadow-inner">
                 <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Tokens Used</div>
                 <div className="font-mono text-pink-400 font-bold text-lg">4,291</div>
               </div>
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
          from { opacity: 0; transform: translateX(-5px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(150px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BioWorkflowWorkspace;
