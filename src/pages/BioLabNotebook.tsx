import React, { useState, useEffect } from 'react';

export default function BioLabNotebook() {

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
    <div className="h-screen bg-[#050A15] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0A1020] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Scientific Notebook</h1>
          <span className="text-xs bg-[#050A15] border border-slate-700 px-2 py-0.5 rounded font-mono text-slate-400">Analysis_Report.ipynb</span>
        </div>
        <div className="flex gap-3">
          <span className="flex items-center gap-2 text-xs text-green-400 font-mono"><span className="w-2 h-2 rounded-full bg-green-500"></span> Kernel: Python 3 (Bioquora Core)</span>
          <button className="px-3 py-1.5 bg-[#4A90E2] text-white text-xs font-mono rounded hover:bg-blue-600">Share & Publish</button>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Notebook Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-white text-slate-800">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Markdown Cell */}
            <div className="pl-12 relative group">
              <div className="absolute left-0 top-0 text-xs font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">MD</div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4 border-b pb-2">CRISPR Target Prediction Analysis</h1>
              <p className="mb-2 text-lg">In this notebook, we visualize the results from our BioBERT fine-tuning pipeline execution (ID: exec-456). We aim to validate the accuracy of the model against the ground truth labels from the GSE12345 dataset.</p>
            </div>

            {/* Code Cell 1 */}
            <div className="relative group border border-blue-200 rounded-lg overflow-hidden">
              <div className="absolute left-2 top-2 text-xs font-mono text-blue-500">In [1]:</div>
              <div className="bg-slate-50 p-4 pl-14 font-mono text-sm text-slate-800 overflow-x-auto">
                <span className="text-purple-600">import</span> pandas <span className="text-purple-600">as</span> pd<br/>
                <span className="text-purple-600">import</span> matplotlib.pyplot <span className="text-purple-600">as</span> plt<br/>
                <span className="text-purple-600">import</span> seaborn <span className="text-purple-600">as</span> sns<br/>
                <span className="text-purple-600">from</span> bioquora.sdk <span className="text-purple-600">import</span> ResultStore<br/><br/>
                <span className="text-slate-500"># Fetch results from BioLab Execution Registry</span><br/>
                results = ResultStore.get_execution(<span className="text-green-600">'exec-456'</span>)<br/>
                df = pd.read_csv(results.get_artifact(<span className="text-green-600">'predictions.csv'</span>))<br/>
                df.head()
              </div>
            </div>

            {/* Output Cell 1 */}
            <div className="pl-14 pt-2 pb-4">
              <table className="w-full text-left text-sm border-collapse border border-slate-200">
                <thead className="bg-slate-100 font-mono text-xs text-slate-600">
                  <tr>
                    <th className="border border-slate-200 p-2">target_seq</th>
                    <th className="border border-slate-200 p-2">true_score</th>
                    <th className="border border-slate-200 p-2">pred_score</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-xs">
                  <tr>
                    <td className="border border-slate-200 p-2">AGCTTAGCTAGCTAGCTGAA</td>
                    <td className="border border-slate-200 p-2">0.94</td>
                    <td className="border border-slate-200 p-2">0.92</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="border border-slate-200 p-2">TTAACGCTAGCTAGCTGGGG</td>
                    <td className="border border-slate-200 p-2">0.12</td>
                    <td className="border border-slate-200 p-2">0.15</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Markdown Cell */}
            <div className="pl-12 relative group mt-8">
              <div className="absolute left-0 top-0 text-xs font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition">MD</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Performance Visualization</h3>
              <p>The correlation between predicted and true binding scores demonstrates strong generalization.</p>
            </div>

            {/* Code Cell 2 */}
            <div className="relative group border border-slate-200 rounded-lg overflow-hidden">
              <div className="absolute left-2 top-2 text-xs font-mono text-slate-400">In [2]:</div>
              <div className="bg-slate-50 p-4 pl-14 font-mono text-sm text-slate-800">
                plt.figure(figsize=(8, 6))<br/>
                sns.scatterplot(data=df, x=<span className="text-green-600">'true_score'</span>, y=<span className="text-green-600">'pred_score'</span>, alpha=0.5)<br/>
                plt.plot([0, 1], [0, 1], <span className="text-green-600">'r--'</span>)<br/>
                plt.title(<span className="text-green-600">'BioBERT vs Ground Truth CRISPR Scores'</span>)<br/>
                plt.show()
              </div>
            </div>

            {/* Plot Output Mockup */}
            <div className="pl-14 py-4 flex justify-center">
              <div className="w-96 h-64 border border-slate-300 rounded bg-white flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 p-8">
                  <div className="w-full h-full border-l-2 border-b-2 border-slate-800 relative">
                     {/* Scatter points mockup */}
                     <div className="absolute w-2 h-2 rounded-full bg-blue-500/50" style={{bottom: '80%', left: '85%'}}></div>
                     <div className="absolute w-2 h-2 rounded-full bg-blue-500/50" style={{bottom: '75%', left: '70%'}}></div>
                     <div className="absolute w-2 h-2 rounded-full bg-blue-500/50" style={{bottom: '20%', left: '15%'}}></div>
                     <div className="absolute w-2 h-2 rounded-full bg-blue-500/50" style={{bottom: '10%', left: '10%'}}></div>
                     {/* Red line */}
                     <svg className="absolute inset-0" width="100%" height="100%"><line x1="0" y1="100%" x2="100%" y2="0" stroke="red" strokeWidth="2" strokeDasharray="4 4" /></svg>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar: AI Data Copilot */}
        <div className="w-80 bg-[#0A1020] border-l border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-[#050A15]">
            <h2 className="text-sm font-medium text-white">Notebook AI Assistant</h2>
          </div>
          <div className="p-4 flex-1 space-y-4 text-sm">
            <div className="bg-[#050A15] border border-blue-900/50 p-3 rounded text-slate-300 shadow-[0_0_15px_rgba(74,144,226,0.05)]">
              I noticed you're plotting predicted vs true scores. Do you want me to automatically calculate and append the Pearson/Spearman correlation coefficients to this notebook?
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-1 bg-[#4A90E2] text-white text-xs rounded hover:bg-blue-600">Yes, add code cell</button>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-slate-800 bg-[#0A1020]">
             <input type="text" placeholder="Ask AI to write code..." className="w-full bg-[#050A15] border border-slate-700 rounded py-2 px-3 text-xs text-white focus:outline-none focus:border-[#4A90E2]" />
          </div>
        </div>

      </div>
    </div>
  );
}
