import React, { useState } from 'react';

export default function BioSearchEngine() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center font-sans relative overflow-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Right Navigation */}
      <div className="absolute top-6 right-8 flex items-center gap-6 z-20">
         <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition">BioKnowledge</span>
         <span className="text-sm font-medium text-slate-400 hover:text-white cursor-pointer transition">Library</span>
         <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer border border-slate-700"></div>
      </div>

      <div className="w-full max-w-3xl z-10 px-6 flex flex-col items-center">
        
        {/* Logo */}
        <div className="mb-12 text-center">
          <div className="text-5xl mb-2 flex items-center justify-center gap-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-black tracking-tight">BioSearch</span>
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-wide">Intelligent Scientific Discovery Engine</p>
        </div>

        {/* Universal Search Bar */}
        <div className={`w-full relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}>
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-25 transition-opacity duration-300 ${isFocused ? 'opacity-50' : 'opacity-25'}`}></div>
          <div className="relative bg-[#0f172a] border border-slate-700 rounded-2xl flex items-center px-4 py-1 shadow-2xl">
            <span className="text-2xl text-slate-500 px-2">🔍</span>
            <input 
              type="text" 
              placeholder="Ask a scientific question, search literature, or explore entities..." 
              className="w-full bg-transparent border-none outline-none text-lg text-white py-4 px-2 placeholder-slate-500"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <div className="flex gap-2 pr-2 shrink-0">
               <button className="p-2 text-slate-400 hover:text-blue-400 transition bg-[#1e293b] rounded-lg border border-slate-700" title="Upload Dataset/PDF">
                 📎
               </button>
               <button className="px-4 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition">
                 Search
               </button>
            </div>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 w-full">
           <span className="px-4 py-2 bg-[#0f172a] border border-slate-700 text-slate-400 text-sm rounded-full cursor-pointer hover:border-slate-500 hover:text-white transition shadow-sm">
             🧠 What are the genetic drivers of early-onset Alzheimer's?
           </span>
           <span className="px-4 py-2 bg-[#0f172a] border border-slate-700 text-slate-400 text-sm rounded-full cursor-pointer hover:border-slate-500 hover:text-white transition shadow-sm">
             🧬 CRISPR off-target effects in T-cells
           </span>
           <span className="px-4 py-2 bg-[#0f172a] border border-slate-700 text-slate-400 text-sm rounded-full cursor-pointer hover:border-slate-500 hover:text-white transition shadow-sm">
             💊 Novel targets for KRAS G12D
           </span>
        </div>

      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-slate-600 font-mono flex gap-4 z-20">
         <span>Indexing 342M Publications</span>
         <span>•</span>
         <span>12B Graph Relations</span>
         <span>•</span>
         <span>Real-time Sync Active</span>
      </div>

    </div>
  );
}
