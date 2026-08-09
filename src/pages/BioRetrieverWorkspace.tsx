import React, { useState, useEffect } from 'react';
import { Search, Database, FileText, Network, CheckCircle, Loader2, ArrowRight, BookOpen, Layers, Zap, Hexagon } from 'lucide-react';

export default function BioRetrieverWorkspace() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);

  const queryText = "Impact of specific BRCA2 mutations on PARP inhibitor efficacy in triple-negative breast cancer";

  const executeSearch = () => {
    setIsSearching(true);
    setSearchStep(1);

    setTimeout(() => setSearchStep(2), 1500);
    setTimeout(() => setSearchStep(3), 3500);
    setTimeout(() => setSearchStep(4), 5500);
    setTimeout(() => {
      setSearchStep(5);
      setIsSearching(false);
    }, 7500);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 5 • Knowledge Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Search className="w-10 h-10 mr-3 text-sky-500 animate-pulse" />
             BioRetriever Hybrid Search
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
             <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mr-3">Global Indices</span>
             <span className="text-sm text-sky-400 font-mono font-bold tracking-widest uppercase flex items-center">
               <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#38bdf8]"></div> Synchronized
             </span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Main Console */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-600 to-cyan-400"></div>
             
             {/* Search Bar Area */}
             <div className="mb-8">
               <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center">
                 <Zap className="w-4 h-4 mr-2 text-sky-400" />
                 Semantic Query Console
               </h3>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0a0a0c] border border-gray-800 rounded-xl flex items-center justify-center text-sky-500 shadow-inner">
                     <Search className="w-6 h-6" />
                  </div>
                  <input 
                     type="text" 
                     value={queryText}
                     className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-xl px-5 py-4 text-sm font-mono text-gray-200 focus:outline-none focus:border-sky-500/50 shadow-inner"
                     readOnly
                  />
                  <button 
                    onClick={executeSearch}
                    disabled={isSearching}
                    className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center transition-all tracking-widest uppercase text-sm ${
                      isSearching ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 'bg-sky-600 text-white hover:bg-sky-500 shadow-[0_0_20px_rgba(2,132,199,0.4)]'
                    }`}
                  >
                    {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEARCH'}
                  </button>
               </div>
             </div>
             
             {/* Query Parsing (Step 1) */}
             <div className={`grid grid-cols-2 gap-4 mb-8 transition-opacity duration-500 ${searchStep >= 1 ? 'opacity-100' : 'opacity-20'}`}>
                <div className="p-5 bg-[#0a0a0c] border border-gray-800 rounded-xl shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 left-0 bottom-0 w-1 bg-purple-500"></div>
                   <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2 flex items-center pl-2">
                     <Layers className="w-3 h-3 mr-1" /> Intent Classification
                   </div>
                   <div className="text-sm font-mono text-gray-300 pl-2">Clinical & Molecular Research</div>
                </div>
                <div className="p-5 bg-[#0a0a0c] border border-gray-800 rounded-xl shadow-inner relative overflow-hidden">
                   <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500"></div>
                   <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2 flex items-center pl-2">
                     <Hexagon className="w-3 h-3 mr-1" /> Query Decomposition
                   </div>
                   <div className="text-xs font-mono text-gray-300 pl-2 flex flex-col gap-1 mt-2">
                     <span className="bg-emerald-900/20 px-2 py-1 rounded text-emerald-300 w-fit">1. BRCA2 Variants</span>
                     <span className="bg-emerald-900/20 px-2 py-1 rounded text-emerald-300 w-fit">2. PARP Inhibitors</span>
                     <span className="bg-emerald-900/20 px-2 py-1 rounded text-emerald-300 w-fit">3. TNBC Outcomes</span>
                   </div>
                </div>
             </div>
             
             {/* Retrieval Execution Pipeline */}
             <div className="flex-1 flex flex-col">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-2">Hybrid Retrieval Dispatch</h3>
                
                <div className="space-y-4 flex-1">
                   {/* Step 2: Vector */}
                   <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${
                     searchStep === 2 ? 'bg-sky-900/10 border-sky-500/50 shadow-[0_0_15px_rgba(14,165,233,0.15)]' : 
                     searchStep > 2 ? 'bg-[#0a0a0c] border-gray-800 shadow-inner' : 'opacity-20 border-gray-900 bg-transparent'
                   }`}>
                      <div className="flex items-center gap-4">
                         {searchStep > 2 ? (
                           <CheckCircle className="w-5 h-5 text-emerald-500" />
                         ) : searchStep === 2 ? (
                           <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                         ) : (
                           <Database className="w-5 h-5 text-gray-600" />
                         )}
                         <span className={`text-sm font-bold uppercase tracking-wider ${searchStep >= 2 ? 'text-gray-200' : 'text-gray-600'}`}>Vector Search (Dense Embeddings)</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">{searchStep > 2 ? '142 docs retrieved' : searchStep === 2 ? 'Searching...' : 'Pending'}</span>
                   </div>

                   {/* Step 3: Ontology */}
                   <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${
                     searchStep === 3 ? 'bg-indigo-900/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.15)]' : 
                     searchStep > 3 ? 'bg-[#0a0a0c] border-gray-800 shadow-inner' : 'opacity-20 border-gray-900 bg-transparent'
                   }`}>
                      <div className="flex items-center gap-4">
                         {searchStep > 3 ? (
                           <CheckCircle className="w-5 h-5 text-emerald-500" />
                         ) : searchStep === 3 ? (
                           <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                         ) : (
                           <BookOpen className="w-5 h-5 text-gray-600" />
                         )}
                         <span className={`text-sm font-bold uppercase tracking-wider ${searchStep >= 3 ? 'text-gray-200' : 'text-gray-600'}`}>Ontology Retrieval (MeSH / GO)</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest">{searchStep > 3 ? 'Term: D016159 (BRCA2)' : searchStep === 3 ? 'Mapping terms...' : 'Pending'}</span>
                   </div>

                   {/* Step 4: GraphRAG */}
                   <div className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-500 ${
                     searchStep === 4 ? 'bg-amber-900/10 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 
                     searchStep > 4 ? 'bg-[#0a0a0c] border-gray-800 shadow-inner' : 'opacity-20 border-gray-900 bg-transparent'
                   }`}>
                      <div className="flex items-center gap-4">
                         {searchStep > 4 ? (
                           <CheckCircle className="w-5 h-5 text-emerald-500" />
                         ) : searchStep === 4 ? (
                           <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                         ) : (
                           <Network className="w-5 h-5 text-gray-600" />
                         )}
                         <span className={`text-sm font-bold uppercase tracking-wider ${searchStep >= 4 ? 'text-gray-200' : 'text-gray-600'}`}>GraphRAG Search (BioKnowledge)</span>
                      </div>
                      <span className="text-[10px] text-amber-500/70 font-mono font-bold uppercase tracking-widest">{searchStep > 4 ? 'Subgraph Extracted' : searchStep === 4 ? 'Traversing graph...' : 'Pending'}</span>
                   </div>
                </div>

                {searchStep >= 5 && (
                  <div className="mt-6 pt-6 border-t border-gray-900 animate-fade-in flex items-center justify-between">
                     <div className="text-emerald-400 text-sm font-bold uppercase tracking-widest flex items-center bg-emerald-900/10 px-4 py-2 rounded-lg border border-emerald-900/30">
                       <CheckCircle className="w-5 h-5 mr-2" /> Context Retrieval Complete
                     </div>
                     <button className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest flex items-center">
                       View Merged Context <ArrowRight className="w-3 h-3 ml-1" />
                     </button>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Metrics */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col group hover:border-gray-600 transition-colors duration-500">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <Database className="w-4 h-4 mr-2 text-emerald-400" />
               Global Index Health
             </h3>
             <div className="space-y-6">
                <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      <span>Vector Store</span>
                      <span className="text-emerald-400">Online</span>
                   </div>
                   <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-emerald-500 h-full rounded-full w-full shadow-[0_0_10px_#10b981]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      <span>Graph Store</span>
                      <span className="text-emerald-400">Online</span>
                   </div>
                   <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-emerald-500 h-full rounded-full w-full shadow-[0_0_10px_#10b981]"></div>
                   </div>
                </div>
                <div>
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                      <span>Citation Matrix</span>
                      <span className="text-sky-400 animate-pulse">Syncing...</span>
                   </div>
                   <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                     <div className="bg-sky-500 h-full rounded-full w-3/4 shadow-[0_0_10px_#0ea5e9]"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col justify-center text-center relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
             <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-[50px]"></div>
             
             <div className="w-16 h-16 bg-[#0a0a0c] border border-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4 relative shadow-inner">
                <div className="absolute inset-0 bg-sky-500/20 rounded-2xl animate-pulse"></div>
                <Database className="w-8 h-8 text-sky-400 relative z-10 drop-shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
             </div>
             <h3 className="text-sm font-bold text-sky-400 uppercase tracking-widest mb-2">Continuous Indexing</h3>
             <p className="text-[10px] text-gray-500 font-mono leading-relaxed mt-2 uppercase">
                Ingesting <span className="text-gray-300 font-bold">4,200</span> new open-access publications from Europe PMC.
             </p>
          </div>

        </div>
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
