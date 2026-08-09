import React, { useState } from 'react';
import { Calculator, BarChart3, LineChart, FileDigit, Play, CheckCircle, AlertTriangle, Loader2, GitMerge, Activity, Sigma } from 'lucide-react';

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
        return old + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-orange-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 11 • Statistical Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Calculator className="w-10 h-10 mr-3 text-orange-500 animate-pulse" />
            BioInference Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(249,115,22,0.1)]">
            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#f97316]"></div>
            <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">Math Kernel: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Data & Configuration */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-amber-500"></div>
            
            <h3 className="text-xs font-bold text-gray-400 flex items-center mb-6 tracking-widest uppercase border-b border-gray-900 pb-3">
              <FileDigit className="w-4 h-4 mr-2 text-orange-400" />
              Hypothesis Configuration
            </h3>

            <div className="space-y-5">
              <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2 flex items-center">
                  <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></div>
                  Null Hypothesis (H₀)
                </div>
                <div className="font-mono text-sm text-gray-300 leading-relaxed">Drug X has no effect on tumor shrinkage compared to placebo.</div>
              </div>
              
              <div className="bg-[#0a0a0c] p-4 rounded-xl border border-orange-900/30 shadow-inner relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500"></div>
                <div className="text-[10px] text-amber-500/70 font-bold uppercase tracking-widest mb-2 flex items-center pl-2">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2 shadow-[0_0_5px_#f59e0b]"></div>
                  Alternative Hypothesis (H₁)
                </div>
                <div className="font-mono text-sm text-amber-400 leading-relaxed pl-2">Drug X significantly reduces tumor volume compared to placebo.</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Alpha Level (α)</label>
                  <select className="w-full mt-1.5 bg-[#0a0a0c] border border-gray-800 rounded-lg p-2.5 text-sm font-mono text-gray-200 focus:outline-none focus:border-orange-500 transition-colors">
                    <option>0.05 (Standard)</option>
                    <option>0.01 (Strict)</option>
                    <option>0.10 (Lenient)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Cohort Size (N)</label>
                  <input type="text" value="N = 450" disabled className="w-full mt-1.5 bg-[#0a0a0c] border border-gray-800 rounded-lg p-2.5 text-sm font-mono text-gray-500 cursor-not-allowed text-center" />
                </div>
              </div>

              <button 
                onClick={handleRunInference}
                disabled={isCalculating}
                className={`w-full py-4 mt-4 rounded-xl font-bold flex items-center justify-center transition-all tracking-widest uppercase text-sm ${
                  isCalculating ? 'bg-gray-900 text-gray-500 border border-gray-800' : 'bg-orange-600 text-white hover:bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                }`}
              >
                {isCalculating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> COMPUTING VECTORS...</>
                ) : (
                  <><Play className="w-5 h-5 mr-2 fill-current" /> RUN INFERENCE KERNEL</>
                )}
              </button>
            </div>
          </div>
          
          {/* Real-time Math View */}
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl h-48 flex flex-col justify-center items-center group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
            <h3 className="absolute top-4 left-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center">
              <Sigma className="w-3 h-3 mr-1" />
              Live Computation
            </h3>

            {isCalculating ? (
              <div className="w-full mt-4">
                <div className="flex justify-between text-[10px] font-bold text-orange-400 mb-2 font-mono uppercase tracking-widest">
                  <span>Calculating T-Statistic Matrix...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-900 border border-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-gradient-to-r from-orange-600 to-amber-400 h-full rounded-full shadow-[0_0_10px_#f97316]" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="mt-6 font-mono text-xs text-gray-500 text-center animate-pulse">
                  {"$ t = \\frac{\\bar{x}_1 - \\bar{x}_2}{\\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}} $"}
                </div>
              </div>
            ) : (
              <div className="text-gray-600 text-xs font-mono font-bold uppercase tracking-widest mt-4 opacity-50 flex flex-col items-center">
                <Activity className="w-8 h-8 mb-2 opacity-50" />
                Awaiting Data Stream
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Visualization & Results */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-3 mb-6 tracking-widest uppercase">
              <BarChart3 className="w-4 h-4 mr-2 text-amber-500" />
              Inference Report & Distribution
            </h3>
            
            {!resultsReady ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600/50">
                 <LineChart className="w-20 h-20 mb-4 opacity-30 text-amber-900/50" />
                 <p className="font-mono text-xs font-bold uppercase tracking-widest">Initialize inference engine to view data</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in space-y-8">
                
                {/* Simulated Bell Curve / Data Viz */}
                <div className="h-72 w-full bg-[#0a0a0c] rounded-2xl border border-gray-800 relative flex items-end justify-center pb-6 px-10 overflow-hidden shadow-inner">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                  {/* Mock Bell Curve SVG */}
                  <svg className="absolute bottom-0 w-full h-full opacity-80" viewBox="0 0 100 50" preserveAspectRatio="none">
                    {/* Fill */}
                    <path d="M 0 50 Q 25 50 40 20 T 50 5 T 60 20 T 75 50 L 100 50" fill="rgba(245, 158, 11, 0.05)" />
                    {/* Stroke */}
                    <path d="M 0 50 Q 25 50 40 20 T 50 5 T 60 20 T 75 50 L 100 50" fill="transparent" stroke="#f59e0b" strokeWidth="0.5" className="drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" />
                    {/* Rejection Region Fill */}
                    <path d="M 75 50 Q 80 40 100 50 Z" fill="rgba(239, 68, 68, 0.3)" />
                    {/* Alpha line */}
                    <line x1="75" y1="0" x2="75" y2="50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="1,1" />
                  </svg>
                  
                  {/* Data Legend */}
                  <div className="absolute top-4 right-4 bg-[#050505]/80 backdrop-blur border border-gray-800 p-3 rounded-lg text-[10px] font-mono shadow-xl z-20">
                    <div className="flex items-center text-gray-300"><span className="w-2 h-2 bg-amber-500 rounded-full mr-2 shadow-[0_0_5px_#f59e0b]"></span> Distribution Model</div>
                    <div className="flex items-center mt-2 text-gray-300"><span className="w-2 h-2 bg-red-500 rounded-full mr-2 shadow-[0_0_5px_#ef4444]"></span> Critical Region (α=0.05)</div>
                  </div>
                  
                  {/* Plotted Test Statistic */}
                  <div className="absolute bottom-0 left-[82%] flex flex-col items-center animate-bounce-short z-20">
                     <div className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded mb-1 shadow-[0_0_10px_rgba(234,88,12,0.5)] border border-orange-400">t = 2.45</div>
                     <div className="w-0.5 h-full bg-orange-500 shadow-[0_0_5px_#f97316]"></div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-500/50"></div>
                    <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">P-Value</div>
                    <div className="text-3xl font-black font-mono text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]">0.014</div>
                  </div>
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner">
                    <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">Effect Size (d)</div>
                    <div className="text-3xl font-black font-mono text-gray-200">0.82</div>
                  </div>
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner">
                    <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-widest">95% CI</div>
                    <div className="text-2xl font-black font-mono text-gray-200 flex items-center justify-center h-full pb-2">[1.2, 4.5]</div>
                  </div>
                </div>

                {/* Conclusion Box */}
                <div className="bg-emerald-900/10 border border-emerald-900/40 p-5 rounded-xl flex items-start mt-auto shadow-inner">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mr-4 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
                  <div>
                    <h4 className="font-bold text-emerald-400 text-sm uppercase tracking-widest mb-1">Statistically Significant</h4>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      The p-value <span className="font-mono text-gray-300">0.014</span> is less than the alpha level <span className="font-mono text-gray-300">0.05</span>. We reject the null hypothesis (H₀). The data provides strong evidence that Drug X significantly reduces tumor volume compared to placebo.
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
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-bounce-short {
          animation: bounceShort 2.5s ease-in-out infinite;
        }
        @keyframes bounceShort {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
};

export default BioInferenceWorkspace;
