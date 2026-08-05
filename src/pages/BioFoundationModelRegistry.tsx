import React, { useState, useEffect } from 'react';

export default function BioFoundationModelRegistry() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-purple-500">🗄️</span> Foundation Model Registry
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Version control, parameter tracking, and domain deployment for the specialized BioFoundation model family.
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-900/50 border border-purple-700 text-purple-300 text-xs font-bold uppercase tracking-wider rounded hover:bg-purple-800/50 transition">
             Register New Weights
          </button>
        </header>

        <div className="grid grid-cols-1 gap-4">
           
           {/* Model 1 */}
           <div className="bg-[#0f0f0f] border border-slate-800 rounded-lg p-5 flex items-center justify-between hover:border-slate-600 transition">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">💬</div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="text-lg font-bold text-white">BioLLM-70B</h3>
                       <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-800/50">Production</span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">Specialized language model trained on 34M PubMed abstracts and clinical trial protocols.</p>
                 </div>
              </div>
              <div className="flex gap-8 text-xs">
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Parameters</div>
                    <div className="text-white font-bold">70.4 Billion</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Context</div>
                    <div className="text-white font-bold">128k Tokens</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Version</div>
                    <div className="text-slate-400">v4.1.2</div>
                 </div>
                 <button className="text-slate-400 hover:text-white">⚙️</button>
              </div>
           </div>

           {/* Model 2 */}
           <div className="bg-[#0f0f0f] border border-slate-800 rounded-lg p-5 flex items-center justify-between hover:border-slate-600 transition">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">🧬</div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="text-lg font-bold text-white">MoleculeAI-Base</h3>
                       <span className="px-2 py-0.5 bg-amber-900/40 text-amber-400 text-[10px] font-bold uppercase rounded border border-amber-800/50">Training (Epoch 4)</span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">Graph Neural Network for small molecule generation, property prediction, and retrosynthesis.</p>
                 </div>
              </div>
              <div className="flex gap-8 text-xs">
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Parameters</div>
                    <div className="text-white font-bold">14.2 Billion</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Dataset</div>
                    <div className="text-white font-bold">ChEMBL + ZINC</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Version</div>
                    <div className="text-slate-400">v2.0.0-beta</div>
                 </div>
                 <button className="text-slate-400 hover:text-white">⚙️</button>
              </div>
           </div>

           {/* Model 3 */}
           <div className="bg-[#0f0f0f] border border-slate-800 rounded-lg p-5 flex items-center justify-between hover:border-slate-600 transition">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-center text-xl">🔬</div>
                 <div>
                    <div className="flex items-center gap-3 mb-1">
                       <h3 className="text-lg font-bold text-white">BioVision-Microscopy</h3>
                       <span className="px-2 py-0.5 bg-emerald-900/40 text-emerald-400 text-[10px] font-bold uppercase rounded border border-emerald-800/50">Production</span>
                    </div>
                    <p className="text-xs text-slate-500 font-sans">Vision transformer specialized for histopathology, H&E stains, and fluorescent microscopy segmentation.</p>
                 </div>
              </div>
              <div className="flex gap-8 text-xs">
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Parameters</div>
                    <div className="text-white font-bold">3.8 Billion</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Resolution</div>
                    <div className="text-white font-bold">1024x1024</div>
                 </div>
                 <div>
                    <div className="text-slate-600 mb-1 uppercase">Version</div>
                    <div className="text-slate-400">v1.5.4</div>
                 </div>
                 <button className="text-slate-400 hover:text-white">⚙️</button>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
