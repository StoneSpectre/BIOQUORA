import React, { useState, useEffect } from 'react';

export default function BioOSUniversalSearch() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col items-center pt-20">
      
      <div className="w-full max-w-4xl px-6 flex flex-col items-center">
        {/* Search Logo / Header */}
        <h1 className="text-4xl font-light text-white mb-8 tracking-wide">
          <span className="font-semibold text-blue-500">BioOS</span> Universal Search
        </h1>

        {/* Big Search Bar */}
        <div className="w-full relative shadow-2xl">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-2xl text-slate-400">
            🔍
          </div>
          <input 
            type="text" 
            className="w-full bg-[#1e293b] border-2 border-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 rounded-2xl py-4 pl-12 pr-4 text-lg text-white shadow-inner transition outline-none"
            placeholder="Search publications, datasets, genes, experiments, apps..."
            defaultValue="TP53 mutation in lung cancer"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
             <kbd className="hidden sm:inline-block bg-slate-800 border border-slate-600 text-slate-400 px-2 py-1 rounded text-xs font-mono">⌘K</kbd>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-3 mt-6 w-full justify-center flex-wrap">
          <span className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-full cursor-pointer shadow">All Results (12,405)</span>
          <span className="px-4 py-1.5 bg-[#1e293b] border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded-full cursor-pointer transition">Literature (8,291)</span>
          <span className="px-4 py-1.5 bg-[#1e293b] border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded-full cursor-pointer transition">Datasets (412)</span>
          <span className="px-4 py-1.5 bg-[#1e293b] border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded-full cursor-pointer transition">Knowledge Graph (3,400)</span>
          <span className="px-4 py-1.5 bg-[#1e293b] border border-slate-600 text-slate-300 hover:bg-slate-700 text-sm rounded-full cursor-pointer transition">My Workspace (12)</span>
        </div>
      </div>

      {/* Results Area */}
      <div className="w-full max-w-4xl mt-10 px-6 flex-1 overflow-y-auto pb-10 space-y-4">
         
         {/* Result Card: Knowledge Graph Entity */}
         <div className="bg-[#1e293b] border border-purple-500/30 rounded-xl p-5 hover:border-purple-500 transition cursor-pointer flex gap-4">
           <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center text-2xl border border-purple-500/20 shrink-0">
             🧬
           </div>
           <div className="flex-1">
             <div className="flex justify-between items-start mb-1">
               <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition">TP53 (Tumor Protein p53)</h3>
               <span className="text-[10px] bg-purple-900/50 text-purple-400 px-2 py-0.5 rounded border border-purple-700">Gene Entity</span>
             </div>
             <p className="text-sm text-slate-400 mb-2">Acts as a tumor suppressor in many tumor types; induces growth arrest or apoptosis depending on the physiological circumstances and cell type.</p>
             <div className="flex gap-2 text-xs text-slate-500 font-mono">
               <span>ID: ENSG00000141510</span>
               <span>•</span>
               <span className="text-blue-400 hover:underline">View in BioDigital Network</span>
             </div>
           </div>
         </div>

         {/* Result Card: Literature */}
         <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 hover:border-slate-500 transition cursor-pointer flex gap-4">
           <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-2xl border border-slate-600 shrink-0">
             📄
           </div>
           <div className="flex-1">
             <div className="flex justify-between items-start mb-1">
               <h3 className="text-lg font-bold text-blue-400 hover:underline">Targeting mutant p53 for cancer therapy: direct and indirect strategies</h3>
               <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-600">Publication</span>
             </div>
             <p className="text-sm text-slate-400 mb-2">Authors: Baugh EH, Ke H, Levine AJ ... (2018) | Cell Death & Differentiation</p>
             <div className="flex gap-2">
               <span className="px-2 py-1 bg-[#0f172a] rounded text-[10px] text-slate-500 border border-slate-700">Cited by 842</span>
               <span className="px-2 py-1 bg-emerald-900/20 rounded text-[10px] text-emerald-500 border border-emerald-900/50">Open Access PDF</span>
             </div>
           </div>
         </div>

         {/* Result Card: Workspace File */}
         <div className="bg-[#1e293b] border border-blue-500/30 rounded-xl p-5 hover:border-blue-500 transition cursor-pointer flex gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
           <div className="w-12 h-12 bg-blue-900/20 rounded-lg flex items-center justify-center text-2xl border border-blue-500/20 shrink-0">
             📊
           </div>
           <div className="flex-1">
             <div className="flex justify-between items-start mb-1">
               <h3 className="text-lg font-bold text-white">Lung_Adeno_Patient_Cohort_Analysis.ipynb</h3>
               <span className="text-[10px] bg-blue-900/50 text-blue-400 px-2 py-0.5 rounded border border-blue-700">My Workspace</span>
             </div>
             <p className="text-sm text-slate-400 mb-2">Jupyter notebook containing the survival analysis for the P53 mutant cohort in BioClinical.</p>
             <div className="text-xs text-slate-500 font-mono">
               Last edited 3 days ago by You
             </div>
           </div>
         </div>

      </div>
    </div>
  );
}
