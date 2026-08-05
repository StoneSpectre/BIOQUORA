import React, { useState, useEffect } from 'react';
import { GitMerge, Play, CheckCircle, Loader2, ArrowRight, Brain, ShieldCheck, FileText, Database, Activity } from 'lucide-react';

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

    // Sequence the nodes with delays
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
    <div className="min-h-screen bg-[#050914] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400 flex items-center">
            <GitMerge className="w-10 h-10 mr-3 text-pink-500" />
            BioWorkflow Orchestrator
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 14: Autonomous Multi-Agent Routing & Pipeline Execution</p>
        </div>
        <div className="flex space-x-4">
          <button 
            onClick={startWorkflow}
            disabled={isRunning}
            className={`px-6 py-2 rounded-full font-bold flex items-center transition-all ${
              isRunning ? 'bg-pink-900/30 text-pink-300 border border-pink-900/50' : 'bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.3)]'
            }`}
          >
            {isRunning ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Executing Pipeline</>
            ) : (
              <><Play className="w-4 h-4 mr-2 fill-current" /> Execute Oncology Workflow</>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Canvas: Workflow Diagram */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#0a0f1c] border border-gray-800 rounded-2xl p-8 shadow-2xl relative min-h-[500px] flex items-center justify-center overflow-hidden">
             
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

             <div className="relative z-10 w-full max-w-3xl flex items-center justify-between">
                
                {/* Node 1: BioVision */}
                <div className={`flex flex-col items-center transition-all duration-500 ${activeNode >= 1 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 z-10 ${
                    activeNode === 1 ? 'bg-blue-900/50 border-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.5)]' : 
                    activeNode > 1 ? 'bg-gray-800 border-gray-600' : 'bg-gray-900 border-gray-700'
                  }`}>
                    <Brain className={`w-8 h-8 ${activeNode === 1 ? 'text-blue-400 animate-pulse' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-3 font-semibold text-sm ${activeNode === 1 ? 'text-blue-300' : 'text-gray-500'}`}>1. BioVision</span>
                </div>

                {/* Connection 1 */}
                <div className="flex-1 h-1 bg-gray-800 relative mx-2">
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-1000 origin-left ${
                    activeNode >= 2 ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                  {activeNode === 1 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2s_linear_infinite]"><ArrowRight className="w-5 h-5 text-blue-400" /></div>}
                </div>

                {/* Node 2: BioRetriever */}
                <div className={`flex flex-col items-center transition-all duration-500 ${activeNode >= 2 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 z-10 ${
                    activeNode === 2 ? 'bg-teal-900/50 border-teal-400 shadow-[0_0_20px_rgba(45,212,191,0.5)]' : 
                    activeNode > 2 ? 'bg-gray-800 border-gray-600' : 'bg-gray-900 border-gray-700'
                  }`}>
                    <Database className={`w-8 h-8 ${activeNode === 2 ? 'text-teal-400 animate-pulse' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-3 font-semibold text-sm ${activeNode === 2 ? 'text-teal-300' : 'text-gray-500'}`}>2. BioRetriever</span>
                </div>

                {/* Connection 2 */}
                <div className="flex-1 h-1 bg-gray-800 relative mx-2">
                  <div className={`absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-1000 origin-left ${
                    activeNode >= 3 ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                  {activeNode === 2 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2.5s_linear_infinite]"><ArrowRight className="w-5 h-5 text-teal-400" /></div>}
                </div>

                {/* Node 3: BioValidator */}
                <div className={`flex flex-col items-center transition-all duration-500 ${activeNode >= 3 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 z-10 ${
                    activeNode === 3 ? 'bg-emerald-900/50 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 
                    activeNode > 3 ? 'bg-gray-800 border-gray-600' : 'bg-gray-900 border-gray-700'
                  }`}>
                    <ShieldCheck className={`w-8 h-8 ${activeNode === 3 ? 'text-emerald-400 animate-pulse' : 'text-gray-500'}`} />
                  </div>
                  <span className={`mt-3 font-semibold text-sm ${activeNode === 3 ? 'text-emerald-300' : 'text-gray-500'}`}>3. BioValidator</span>
                </div>

                {/* Connection 3 */}
                <div className="flex-1 h-1 bg-gray-800 relative mx-2">
                  <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-pink-500 transition-all duration-1000 origin-left ${
                    activeNode >= 4 ? 'scale-x-100' : 'scale-x-0'
                  }`}></div>
                  {activeNode === 3 && <div className="absolute -top-3 w-full flex justify-center animate-[slideRight_2.5s_linear_infinite]"><ArrowRight className="w-5 h-5 text-emerald-400" /></div>}
                </div>

                {/* Node 4: BioAssistant */}
                <div className={`flex flex-col items-center transition-all duration-500 ${activeNode >= 4 ? 'opacity-100 scale-110' : 'opacity-50'}`}>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-2 z-10 ${
                    activeNode === 4 || isComplete ? 'bg-pink-900/50 border-pink-400 shadow-[0_0_20px_rgba(244,114,182,0.5)]' : 
                    'bg-gray-900 border-gray-700'
                  }`}>
                    {isComplete ? <CheckCircle className="w-8 h-8 text-pink-400" /> : <FileText className={`w-8 h-8 ${activeNode === 4 ? 'text-pink-400 animate-pulse' : 'text-gray-500'}`} />}
                  </div>
                  <span className={`mt-3 font-semibold text-sm ${activeNode === 4 || isComplete ? 'text-pink-300' : 'text-gray-500'}`}>4. BioAssistant</span>
                </div>

             </div>
          </div>
        </div>

        {/* Right Column: Execution Logs & Status */}
        <div className="space-y-6">
          <div className="bg-[#0a0f1c] border border-gray-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <Activity className="w-6 h-6 mr-2 text-pink-400" />
              Runtime Orchestration Log
            </h3>
            
            <div className="flex-1 bg-black rounded-xl p-4 font-mono text-xs overflow-y-auto border border-gray-800 shadow-inner">
              {logs.length === 0 ? (
                <div className="text-gray-600 flex flex-col items-center justify-center h-full">
                  <span>SYSTEM READY.</span>
                  <span>Awaiting workflow trigger.</span>
                </div>
              ) : (
                <div className="space-y-3">
                  {logs.map((log, index) => (
                    <div key={index} className="animate-fade-in text-gray-300 leading-relaxed border-b border-gray-900 pb-2">
                      <span className="text-pink-500 mr-2">{'>'}</span>{log}
                    </div>
                  ))}
                  {isRunning && (
                    <div className="text-pink-500 animate-pulse mt-2 flex items-center">
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" /> Processing active node...
                    </div>
                  )}
                  {isComplete && (
                    <div className="text-emerald-400 mt-4 font-bold bg-emerald-900/20 p-2 rounded">
                      [SUCCESS] Workflow execution completed with 0 errors.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-2 text-sm">
               <div className="bg-gray-900 p-2 rounded text-center border border-gray-800">
                 <div className="text-gray-500 text-xs">Total Latency</div>
                 <div className="font-mono text-pink-400">9.5s</div>
               </div>
               <div className="bg-gray-900 p-2 rounded text-center border border-gray-800">
                 <div className="text-gray-500 text-xs">Tokens Used</div>
                 <div className="font-mono text-pink-400">4,291</div>
               </div>
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
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default BioWorkflowWorkspace;
