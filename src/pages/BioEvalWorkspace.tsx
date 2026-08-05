import React, { useState } from 'react';
import { Target, Trophy, Play, CheckCircle, Loader2, GitCommit, BarChart2, ShieldCheck, Activity } from 'lucide-react';

const BioEvalWorkspace = () => {
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRunBenchmark = () => {
    setIsEvaluating(true);
    setEvaluationComplete(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setIsEvaluating(false);
          setEvaluationComplete(true);
          return 100;
        }
        return old + 2; // Slower progress for dramatic effect
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center">
            <Target className="w-10 h-10 mr-3 text-indigo-500" />
            BioEval Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 13: Clinical Model Benchmarking & Quality Assurance</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-indigo-900/50">
            <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" />
            <span className="text-sm text-emerald-400 font-mono">SaMD Compliance: PASS</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column: Benchmarking Controls */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            <h2 className="font-bold text-gray-200 flex items-center mb-6">
              <Activity className="w-5 h-5 mr-2 text-indigo-400" />
              Evaluation Suite Control
            </h2>

            <div className="space-y-4">
              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Target Benchmark</div>
                <select className="w-full bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-300 font-medium focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none">
                  <option>USMLE (Medical Licensing Exam) Zero-Shot</option>
                  <option>MedQA (Clinical NLP Reasoning)</option>
                  <option>PubMedQA (Literature Extraction)</option>
                </select>
              </div>

              <div className="bg-[#0f172a] p-4 rounded-xl border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Dataset Size</div>
                <div className="font-mono text-xl text-indigo-400">100,000 <span className="text-sm text-gray-500 font-sans">clinical vignettes</span></div>
              </div>

              <button 
                onClick={handleRunBenchmark}
                disabled={isEvaluating}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                  isEvaluating ? 'bg-indigo-900/50 text-indigo-200' : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-900/20'
                }`}
              >
                {isEvaluating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Evaluating Models...</>
                ) : (
                  <><Play className="w-5 h-5 mr-2 fill-current" /> Run Benchmark Suite</>
                )}
              </button>
            </div>
            
            {/* Live Progress Viewer */}
            <div className="mt-6 pt-6 border-t border-gray-800">
              <div className="flex justify-between text-xs text-gray-400 font-mono mb-2">
                <span>Evaluation Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-75" style={{ width: `${progress}%` }}></div>
              </div>
              {isEvaluating && (
                <div className="mt-4 font-mono text-[10px] text-indigo-400 h-12 overflow-hidden">
                   <div className="animate-pulse">Batch 492: Running inference on Llama-3-Bio...</div>
                   <div className="opacity-70">Batch 491: Comparing outputs against ground truth...</div>
                   <div className="opacity-40">Batch 490: Updating metrics registry...</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard & Metrics */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[500px] flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-6">
              <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
              Bioquora Model Leaderboard
            </h3>
            
            {!evaluationComplete && !isEvaluating ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                 <BarChart2 className="w-20 h-20 mb-4 opacity-20" />
                 <p className="font-mono text-sm">RUN BENCHMARK TO POPULATE LEADERBOARD</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in space-y-6">
                
                {/* The Leaderboard Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-500">
                        <th className="pb-3 font-semibold">Rank</th>
                        <th className="pb-3 font-semibold">Model Architecture</th>
                        <th className="pb-3 font-semibold">Accuracy</th>
                        <th className="pb-3 font-semibold">Recall (Sensitivity)</th>
                        <th className="pb-3 font-semibold">F1 Score</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {/* Rank 1 */}
                      <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                        <td className="py-4"><div className="w-6 h-6 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center font-bold text-xs">1</div></td>
                        <td className="py-4 font-bold text-indigo-400 flex items-center"><GitCommit className="w-4 h-4 mr-2"/> Llama-3-Bioquora-70B</td>
                        <td className="py-4 font-mono font-bold text-gray-200">92.4%</td>
                        <td className="py-4 font-mono text-emerald-400">96.1%</td>
                        <td className="py-4 font-mono text-gray-300">0.93</td>
                        <td className="py-4"><span className="px-2 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 rounded text-xs font-semibold">PRODUCTION</span></td>
                      </tr>
                      {/* Rank 2 */}
                      <tr className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                        <td className="py-4"><div className="w-6 h-6 rounded-full bg-gray-600/20 text-gray-400 flex items-center justify-center font-bold text-xs">2</div></td>
                        <td className="py-4 font-semibold text-gray-300">Med-PaLM 2 (Baseline)</td>
                        <td className="py-4 font-mono text-gray-400">86.5%</td>
                        <td className="py-4 font-mono text-gray-400">89.2%</td>
                        <td className="py-4 font-mono text-gray-400">0.87</td>
                        <td className="py-4"><span className="px-2 py-1 bg-gray-800 text-gray-500 border border-gray-700 rounded text-xs">EXTERNAL</span></td>
                      </tr>
                      {/* Rank 3 */}
                      <tr className="hover:bg-gray-800/20 transition-colors">
                        <td className="py-4"><div className="w-6 h-6 rounded-full bg-orange-900/20 text-orange-500 flex items-center justify-center font-bold text-xs">3</div></td>
                        <td className="py-4 font-semibold text-gray-300">Bioquora-Vision-Net</td>
                        <td className="py-4 font-mono text-gray-400">84.1%</td>
                        <td className="py-4 font-mono text-gray-400">85.0%</td>
                        <td className="py-4 font-mono text-gray-400">0.84</td>
                        <td className="py-4"><span className="px-2 py-1 bg-blue-900/30 text-blue-400 border border-blue-900/50 rounded text-xs font-semibold">STAGING</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Highlighted Metric */}
                {evaluationComplete && (
                  <div className="mt-auto pt-4 flex space-x-4">
                    <div className="flex-1 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-4 rounded-xl flex items-start">
                      <CheckCircle className="w-6 h-6 text-indigo-400 mr-3 shrink-0" />
                      <div>
                        <h4 className="font-bold text-indigo-300">High Clinical Recall Achieved</h4>
                        <p className="text-xs text-indigo-200/70 mt-1 leading-relaxed">
                          The production model achieved a recall of 96.1%. In clinical contexts, high recall is vital to ensure false negatives are minimized (i.e., we rarely miss a diagnosis). The model safely passes the FDA SaMD thresholds for deployment.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default BioEvalWorkspace;
