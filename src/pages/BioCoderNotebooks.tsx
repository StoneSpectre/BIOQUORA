import React, { useState, useEffect } from 'react';

export default function BioCoderNotebooks() {

  // Auto-wired API Data State
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify backend connectivity
    fetch('http://127.0.0.1:8000/api/health')
      .then(res => res.json())
      .then(data => {
        setLiveData([data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Backend Disconnected:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8">
      
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase font-mono">
             <span className="text-blue-500">📓</span> Reproducible Research Notebooks
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
             Jupyter-style interface backed by BioCoder's autonomous cell generation and execution validation.
          </p>
        </header>

        <div className="space-y-6">
           
           {/* Markdown Cell */}
           <div className="bg-[#0a0a0a] border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
              <h2 className="text-xl font-bold text-white mb-4">1. Exploratory Data Analysis: Drug Response</h2>
              <p className="text-slate-400">
                 In this section, we analyze the IC50 values across 500 cell lines treated with our novel kinase inhibitor, correlating sensitivity with specific mutational signatures. BioCoder generated the statistical models below.
              </p>
           </div>

           {/* Code Cell 1 */}
           <div className="border border-slate-800 rounded-lg overflow-hidden font-mono">
              <div className="bg-[#111] p-2 flex justify-between items-center text-[10px] uppercase text-slate-500 font-bold border-b border-slate-800">
                 <span>[1] Python (Pandas + Seaborn)</span>
                 <div className="flex gap-2">
                    <button className="text-emerald-400">Run Cell</button>
                    <button className="text-yellow-400">Refactor with AI</button>
                 </div>
              </div>
              <div className="bg-[#050505] p-4 text-sm text-slate-300">
                 <span className="text-purple-400">import</span> seaborn <span className="text-purple-400">as</span> sns<br/>
                 <span className="text-purple-400">import</span> matplotlib.pyplot <span className="text-purple-400">as</span> plt<br/>
                 <br/>
                 sns.boxplot(x=<span className="text-green-300">'Mutation_Status'</span>, y=<span className="text-green-300">'IC50'</span>, data=df)<br/>
                 plt.title(<span className="text-green-300">"Drug Sensitivity by Status"</span>)<br/>
                 plt.show()
              </div>
              
              {/* Output Visualization */}
              <div className="bg-white p-4 flex justify-center border-t border-slate-800">
                 {/* Simulated Chart Graphic */}
                 <div className="w-96 h-48 border-l-2 border-b-2 border-slate-300 relative flex items-end justify-around px-8 pb-4">
                    {/* Box 1 */}
                    <div className="w-12 h-24 bg-blue-200 border-2 border-blue-500 rounded relative">
                       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-blue-800"></div>
                       <div className="absolute -top-6 left-1/2 w-0.5 h-6 bg-blue-500"></div>
                       <div className="absolute -bottom-6 left-1/2 w-0.5 h-6 bg-blue-500"></div>
                    </div>
                    {/* Box 2 */}
                    <div className="w-12 h-12 bg-rose-200 border-2 border-rose-500 rounded relative">
                       <div className="absolute top-1/2 left-0 w-full h-0.5 bg-rose-800"></div>
                       <div className="absolute -top-4 left-1/2 w-0.5 h-4 bg-rose-500"></div>
                       <div className="absolute -bottom-4 left-1/2 w-0.5 h-4 bg-rose-500"></div>
                    </div>
                    <div className="absolute -bottom-6 left-1/4 text-xs text-slate-600 font-sans">Wild-Type</div>
                    <div className="absolute -bottom-6 right-1/4 text-xs text-slate-600 font-sans">Mutated</div>
                 </div>
              </div>
           </div>

           {/* BioCoder Validation Block */}
           <div className="bg-emerald-950/10 border border-emerald-900/30 rounded-lg p-4 flex gap-4 items-start">
              <span className="text-emerald-500 text-xl">✓</span>
              <div>
                 <h4 className="text-sm font-bold text-emerald-400">Scientific Validation Passed</h4>
                 <p className="text-xs text-slate-400 mt-1">BioCoder verified that the sample size (n=500) is sufficient for this statistical test. Levene's test confirms equal variances. The result is reproducible.</p>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
