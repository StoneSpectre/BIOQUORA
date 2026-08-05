import React, { useState } from 'react';
import { Calculator, BarChart3, LineChart, FileDigit, Play, CheckCircle, AlertTriangle, Loader2, GitMerge } from 'lucide-react';

const BioInferenceWorkspace = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRunInference = () => {
    setIsCalculating(true);
    setResultsReady(false);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setIsCalculating(false);
          setResultsReady(true);
          return 100;
        }
        return old + 5;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-500 flex items-center">
            <Calculator className="w-10 h-10 mr-3 text-orange-500" />
            BioInference Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 11: Statistical Significance & P-Value Computation</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-orange-900/50">
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-orange-300 font-mono">Math Kernel: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Data & Configuration */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-amber-500"></div>
            
            <h3 className="font-bold text-gray-200 flex items-center mb-6">
              <FileDigit className="w-5 h-5 mr-2 text-orange-500" />
              Hypothesis Configuration
            </h3>

            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Null Hypothesis (H₀)</div>
                <div className="font-mono text-sm text-gray-300">Drug X has no effect on tumor shrinkage compared to placebo.</div>
              </div>
              
              <div className="bg-black/50 p-4 rounded-lg border border-gray-800">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Alternative Hypothesis (H₁)</div>
                <div className="font-mono text-sm text-amber-400">Drug X significantly reduces tumor volume compared to placebo.</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-xs text-gray-500">Alpha Level (α)</label>
                  <select className="w-full mt-1 bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-200">
                    <option>0.05 (Standard)</option>
                    <option>0.01 (Strict)</option>
                    <option>0.10 (Lenient)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Cohort Size (N)</label>
                  <input type="text" value="N=450" disabled className="w-full mt-1 bg-gray-950 border border-gray-700 rounded p-2 text-sm text-gray-500 cursor-not-allowed" />
                </div>
              </div>

              <button 
                onClick={handleRunInference}
                disabled={isCalculating}
                className={`w-full py-3 mt-4 rounded-xl font-bold flex items-center justify-center transition-all ${
                  isCalculating ? 'bg-orange-900/50 text-orange-200' : 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white shadow-lg shadow-orange-900/20'
                }`}
              >
                {isCalculating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Computing Vectors...</>
                ) : (
                  <><Play className="w-5 h-5 mr-2 fill-current" /> Run Statistical Inference</>
                )}
              </button>
            </div>
          </div>
          
          {/* Real-time Math View */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl h-48 flex flex-col justify-center items-center">
            {isCalculating ? (
              <div className="w-full">
                <div className="flex justify-between text-xs text-orange-400 mb-2 font-mono">
                  <span>Calculating T-Statistic Matrix...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1">
                  <div className="bg-orange-500 h-1 rounded-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mt-4 font-mono text-[10px] text-gray-600 text-center animate-pulse">
                  {"$ t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}} $"}
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-center text-sm">
                <GitMerge className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Awaiting Data Stream
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visualization & Results */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[600px] flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <BarChart3 className="w-6 h-6 mr-2 text-amber-500" />
              Inference Report & Distribution
            </h3>
            
            {!resultsReady ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                 <LineChart className="w-24 h-24 mb-4 opacity-20" />
                 <p className="font-mono text-sm">INITIALIZE INFERENCE ENGINE TO VIEW DATA</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in space-y-6">
                
                {/* Simulated Bell Curve / Data Viz */}
                <div className="h-64 w-full bg-[#0a0a0a] rounded-xl border border-gray-800 relative flex items-end justify-center pb-4 px-8 overflow-hidden">
                  {/* Mock Bell Curve SVG */}
                  <svg className="absolute bottom-0 w-full h-full opacity-70" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <path d="M 0 50 Q 25 50 40 20 T 50 5 T 60 20 T 75 50 L 100 50" fill="transparent" stroke="#f59e0b" strokeWidth="0.5" />
                    {/* Rejection Region */}
                    <path d="M 75 50 Q 80 40 100 50 Z" fill="rgba(239, 68, 68, 0.3)" />
                    <line x1="75" y1="0" x2="75" y2="50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" />
                  </svg>
                  
                  {/* Data Points */}
                  <div className="absolute top-4 right-4 bg-gray-900 border border-gray-700 p-2 rounded text-[10px] font-mono">
                    <div className="flex items-center"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span> Distribution</div>
                    <div className="flex items-center mt-1"><span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span> Critical Region (α=0.05)</div>
                  </div>
                  
                  {/* Plotted Test Statistic */}
                  <div className="absolute bottom-0 left-[82%] flex flex-col items-center animate-bounce-short">
                     <div className="bg-orange-500 text-black text-[10px] font-bold px-1 rounded mb-1">t = 2.45</div>
                     <div className="w-0.5 h-full bg-orange-500"></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 mb-1">P-Value</div>
                    <div className="text-2xl font-bold font-mono text-emerald-400">0.014</div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 mb-1">Effect Size (Cohen's d)</div>
                    <div className="text-2xl font-bold font-mono text-gray-200">0.82</div>
                  </div>
                  <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 mb-1">95% Confidence Interval</div>
                    <div className="text-2xl font-bold font-mono text-gray-200">[1.2, 4.5]</div>
                  </div>
                </div>

                {/* Conclusion Box */}
                <div className="bg-emerald-900/10 border border-emerald-900/40 p-4 rounded-xl flex items-start">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-3 shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-400">Statistically Significant</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      The p-value (0.014) is less than the alpha level (0.05). We reject the null hypothesis (H₀). The data provides strong evidence that Drug X significantly reduces tumor volume compared to placebo.
                    </p>
                  </div>
                </div>

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
        .animate-bounce-short {
          animation: bounceShort 2s ease-in-out infinite;
        }
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default BioInferenceWorkspace;
