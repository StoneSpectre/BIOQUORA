import React, { useState } from 'react';
import { Target, Trophy, Play, CheckCircle, Loader2, GitCommit, BarChart2, ShieldCheck, Activity, Brain, Server, Shield } from 'lucide-react';

export default function BioEvalWorkspace() {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentBatch, setCurrentBatch] = useState(0);

  const handleRunBenchmark = () => {
    setIsEvaluating(true);
    setEvaluationComplete(false);
    setProgress(0);
    setCurrentBatch(1);

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setIsEvaluating(false);
          setEvaluationComplete(true);
          return 100;
        }
        if (old % 10 === 0) setCurrentBatch(prev => prev + 1);
        return old + 2; 
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 13 • Evaluation Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Target className="w-10 h-10 mr-3 text-indigo-500 animate-pulse" />
             BioEval Framework
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
             <ShieldCheck className="w-4 h-4 text-emerald-500 mr-2" />
             <span className="text-sm text-emerald-400 font-mono font-bold tracking-widest uppercase">SaMD Compliance: PASS</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Benchmarking Controls */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-500"></div>
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <Activity className="w-4 h-4 mr-2 text-indigo-400" />
               Evaluation Suite Control
             </h3>

             <div className="space-y-6 flex-1 flex flex-col">
               
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner">
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center">
                    <Brain className="w-3 h-3 mr-1 text-purple-400" /> Target Benchmark
                 </div>
                 <select className="w-full bg-[#050505] border border-gray-800 rounded-lg p-3 text-sm font-mono text-gray-300 focus:border-indigo-500 focus:outline-none transition-colors appearance-none">
                   <option>USMLE (Medical Licensing Exam) Zero-Shot</option>
                   <option>MedQA (Clinical NLP Reasoning)</option>
                   <option>PubMedQA (Literature Extraction)</option>
                 </select>
               </div>

               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner">
                 <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center">
                    <Server className="w-3 h-3 mr-1 text-emerald-400" /> Dataset Size
                 </div>
                 <div className="font-mono text-xl text-indigo-400 font-bold">100,000 <span className="text-xs text-gray-500 font-sans uppercase tracking-widest ml-1">clinical vignettes</span></div>
               </div>

               <div className="flex-1 flex flex-col justify-end">
                  <button 
                    onClick={handleRunBenchmark}
                    disabled={isEvaluating}
                    className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all tracking-widest uppercase text-sm ${
                      isEvaluating ? 'bg-[#0a0a0c] text-indigo-400 border border-indigo-900/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.4)]'
                    }`}
                  >
                    {isEvaluating ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> RUNNING INFERENCE...</>
                    ) : (
                      <><Play className="w-5 h-5 mr-2 fill-current" /> EXECUTE BENCHMARK</>
                    )}
                  </button>
               </div>
             </div>
             
             {/* Live Progress Viewer */}
             <div className="mt-6 pt-6 border-t border-gray-900 h-28">
               <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                 <span>Evaluation Progress</span>
                 <span className="text-indigo-400 font-mono">{progress}%</span>
               </div>
               <div className="w-full bg-gray-900 rounded-full h-2 border border-gray-800 overflow-hidden mb-4 shadow-inner">
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-100 shadow-[0_0_10px_#6366f1]" style={{ width: `${progress}%` }}></div>
               </div>
               
               <div className="h-10 overflow-hidden">
                 {isEvaluating && (
                   <div className="font-mono text-[10px] text-indigo-400 flex flex-col justify-end h-full animate-fade-in-up">
                      <div className="flex items-center">
                         <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping mr-2"></div>
                         {`Batch ${492 + currentBatch}: Running inference on Llama-3-Bio...`}
                      </div>
                      <div className="opacity-50 flex items-center mt-1">
                         <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></div>
                         {`Batch ${491 + currentBatch}: Comparing outputs against ground truth...`}
                      </div>
                   </div>
                 )}
                 {evaluationComplete && (
                   <div className="font-mono text-xs text-emerald-400 font-bold flex items-center justify-center h-full bg-emerald-900/10 rounded-lg border border-emerald-900/30 uppercase tracking-widest animate-fade-in">
                      [SUCCESS] BENCHMARK COMPLETE
                   </div>
                 )}
               </div>
             </div>
          </div>
        </div>

        {/* Right Column: Leaderboard & Metrics */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-4 mb-6 uppercase tracking-widest">
              <Trophy className="w-4 h-4 mr-2 text-yellow-500" />
              Bioquora Model Leaderboard
            </h3>
            
            {!evaluationComplete && !isEvaluating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-700">
                 <BarChart2 className="w-16 h-16 mb-4 opacity-50" />
                 <p className="font-mono text-xs font-bold uppercase tracking-widest">AWAITING BENCHMARK EXECUTION</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in relative">
                
                {/* Simulated Radar Chart overlay (decorative bg) */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 opacity-5 pointer-events-none flex items-center justify-center">
                   <div className="w-full h-full border border-indigo-500 rounded-full"></div>
                   <div className="absolute w-3/4 h-3/4 border border-purple-500 rounded-full"></div>
                   <div className="absolute w-1/2 h-1/2 border border-blue-500 rounded-full"></div>
                   <div className="absolute w-full h-[1px] bg-gray-500 rotate-45"></div>
                   <div className="absolute w-full h-[1px] bg-gray-500 -rotate-45"></div>
                   <div className="absolute w-[1px] h-full bg-gray-500"></div>
                   <div className="absolute w-full h-[1px] bg-gray-500"></div>
                </div>

                <div className="overflow-x-auto relative z-10">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-900 text-[10px] uppercase tracking-widest text-gray-500">
                        <th className="pb-4 font-bold">Rank</th>
                        <th className="pb-4 font-bold">Model Architecture</th>
                        <th className="pb-4 font-bold text-right">Accuracy</th>
                        <th className="pb-4 font-bold text-right">Recall</th>
                        <th className="pb-4 font-bold text-right">F1 Score</th>
                        <th className="pb-4 font-bold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {/* Rank 1 */}
                      <tr className={`border-b border-gray-900/50 hover:bg-[#0a0a0c] transition-colors ${evaluationComplete ? 'animate-fade-in' : 'opacity-30'}`} style={{ animationDelay: '0.1s' }}>
                        <td className="py-5"><div className="w-8 h-8 rounded-xl bg-yellow-900/20 text-yellow-500 border border-yellow-500/30 flex items-center justify-center font-black text-xs shadow-[0_0_10px_rgba(234,179,8,0.2)]">1</div></td>
                        <td className="py-5 font-bold text-indigo-400 flex items-center font-mono text-xs"><GitCommit className="w-4 h-4 mr-2"/> Llama-3-Bioquora-70B</td>
                        <td className="py-5 font-mono font-bold text-gray-200 text-right">
                           {evaluationComplete ? '92.4%' : <Loader2 className="w-4 h-4 animate-spin ml-auto text-indigo-500" />}
                        </td>
                        <td className="py-5 font-mono font-bold text-emerald-400 text-right">
                           {evaluationComplete ? '96.1%' : <Loader2 className="w-4 h-4 animate-spin ml-auto text-emerald-500" />}
                        </td>
                        <td className="py-5 font-mono text-gray-300 text-right">
                           {evaluationComplete ? '0.93' : <Loader2 className="w-4 h-4 animate-spin ml-auto text-gray-500" />}
                        </td>
                        <td className="py-5 text-center"><span className="px-3 py-1 bg-emerald-900/20 text-emerald-400 border border-emerald-900/50 rounded-lg text-[10px] font-bold uppercase tracking-widest">PRODUCTION</span></td>
                      </tr>
                      {/* Rank 2 */}
                      <tr className="border-b border-gray-900/50 hover:bg-[#0a0a0c] transition-colors">
                        <td className="py-5"><div className="w-8 h-8 rounded-xl bg-gray-900 text-gray-400 border border-gray-700 flex items-center justify-center font-bold text-xs">2</div></td>
                        <td className="py-5 font-bold text-gray-400 font-mono text-xs">Med-PaLM 2 (Baseline)</td>
                        <td className="py-5 font-mono text-gray-500 text-right">86.5%</td>
                        <td className="py-5 font-mono text-gray-500 text-right">89.2%</td>
                        <td className="py-5 font-mono text-gray-500 text-right">0.87</td>
                        <td className="py-5 text-center"><span className="px-3 py-1 bg-[#0a0a0c] text-gray-500 border border-gray-800 rounded-lg text-[10px] font-bold uppercase tracking-widest">EXTERNAL</span></td>
                      </tr>
                      {/* Rank 3 */}
                      <tr className="hover:bg-[#0a0a0c] transition-colors">
                        <td className="py-5"><div className="w-8 h-8 rounded-xl bg-orange-900/20 text-orange-500 border border-orange-900/50 flex items-center justify-center font-bold text-xs">3</div></td>
                        <td className="py-5 font-bold text-gray-400 font-mono text-xs">Bioquora-Vision-Net</td>
                        <td className="py-5 font-mono text-gray-500 text-right">84.1%</td>
                        <td className="py-5 font-mono text-gray-500 text-right">85.0%</td>
                        <td className="py-5 font-mono text-gray-500 text-right">0.84</td>
                        <td className="py-5 text-center"><span className="px-3 py-1 bg-blue-900/20 text-blue-400 border border-blue-900/50 rounded-lg text-[10px] font-bold uppercase tracking-widest">STAGING</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Highlighted Metric */}
                <div className="mt-auto pt-6 flex space-x-4 h-32">
                   {evaluationComplete && (
                     <div className="flex-1 bg-indigo-900/10 border border-indigo-500/30 p-5 rounded-xl flex items-start shadow-inner animate-fade-in-up relative overflow-hidden">
                       <div className="absolute right-0 top-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[30px]"></div>
                       <Shield className="w-8 h-8 text-indigo-400 mr-4 shrink-0 drop-shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                       <div className="relative z-10">
                         <h4 className="font-black text-indigo-300 uppercase tracking-widest text-xs mb-2">High Clinical Recall Achieved</h4>
                         <p className="text-[10px] font-mono text-gray-400 leading-relaxed uppercase tracking-wider">
                           Production model achieved <span className="text-emerald-400 font-bold">96.1%</span> recall. Minimizes false negatives in diagnostics. Safety thresholds for FDA SaMD deployment exceeded.
                         </p>
                       </div>
                     </div>
                   )}
                </div>

              </div>
            )}
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
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
