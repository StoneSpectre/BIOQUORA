import React, { useState } from 'react';

export default function BioOSDesktop() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  return (
    <div className="h-screen w-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* OS Background Wallpaper (Abstract Biomedical Theme) */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)' }}>
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.01) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Desktop Workspace (Main Area) */}
      <div className="flex-1 relative z-0 p-6 grid grid-cols-12 gap-6 content-start">
        
        {/* Desktop Icons */}
        <div className="col-span-1 flex flex-col gap-6 items-center pt-4">
           <div className="flex flex-col items-center gap-1 cursor-pointer group">
             <div className="w-12 h-12 bg-blue-600/20 border border-blue-500/50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-600/40 transition shadow-lg">🔬</div>
             <span className="text-[10px] text-white font-medium shadow-black drop-shadow-md">BioLab</span>
           </div>
           <div className="flex flex-col items-center gap-1 cursor-pointer group">
             <div className="w-12 h-12 bg-emerald-600/20 border border-emerald-500/50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-emerald-600/40 transition shadow-lg">🧬</div>
             <span className="text-[10px] text-white font-medium shadow-black drop-shadow-md">BioPharma</span>
           </div>
           <div className="flex flex-col items-center gap-1 cursor-pointer group">
             <div className="w-12 h-12 bg-purple-600/20 border border-purple-500/50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-purple-600/40 transition shadow-lg">🧠</div>
             <span className="text-[10px] text-white font-medium shadow-black drop-shadow-md">BioDigital</span>
           </div>
           <div className="flex flex-col items-center gap-1 cursor-pointer group">
             <div className="w-12 h-12 bg-amber-600/20 border border-amber-500/50 rounded-xl flex items-center justify-center text-2xl group-hover:bg-amber-600/40 transition shadow-lg">📊</div>
             <span className="text-[10px] text-white font-medium shadow-black drop-shadow-md">BioClinical</span>
           </div>
        </div>

        {/* Floating Widgets Area */}
        <div className="col-span-3 flex flex-col gap-4">
           
           {/* Widget: Active Project */}
           <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
             <div className="flex justify-between items-center mb-3">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Workspace</h3>
               <span className="text-[10px] bg-emerald-900/40 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">Synced</span>
             </div>
             <h4 className="text-sm font-bold text-white mb-1">Project: Oncology Target X</h4>
             <p className="text-xs text-slate-400 mb-3">Multi-omic analysis & compound screening.</p>
             <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mb-2">
               <div className="bg-blue-500 h-full w-[45%]"></div>
             </div>
             <div className="flex justify-between text-[10px] text-slate-500 font-mono">
               <span>Tasks: 12/28</span>
               <span>Compute: 1.2k hrs</span>
             </div>
           </div>

           {/* Widget: Recent Knowledge Sync */}
           <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 shadow-2xl">
             <div className="flex justify-between items-center mb-3">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Knowledge Graph</h3>
               <span className="text-[10px] text-slate-500 font-mono">2m ago</span>
             </div>
             <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                   <div className="text-blue-400 mt-0.5">📄</div>
                   <div><span className="text-white font-medium">New Publication Found</span><br/><span className="text-slate-400">Nature: "KRAS inhibition pathways..."</span></div>
                </div>
                <div className="flex items-start gap-2">
                   <div className="text-purple-400 mt-0.5">🧬</div>
                   <div><span className="text-white font-medium">Model Updated</span><br/><span className="text-slate-400">AlphaFold DB synced 4 new structures</span></div>
                </div>
             </div>
           </div>

        </div>

        {/* Center: Open Window Mockup (Digital Notebook) */}
        <div className="col-span-8 flex justify-center items-start pt-8">
           
           <div className="w-full max-w-4xl h-[600px] bg-[#1e293b] border border-slate-600 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden transform transition hover:scale-[1.01] duration-300">
             {/* Window Header */}
             <div className="h-10 bg-[#0f172a] border-b border-slate-700 flex items-center justify-between px-4">
               <div className="flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-500 cursor-pointer"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-500 cursor-pointer"></div>
               </div>
               <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
                 <span>📝 Research Notebook</span>
                 <span className="text-slate-600">|</span>
                 <span>Oncology_Target_X_Notes.md</span>
               </div>
               <div className="w-12"></div> {/* Spacer for balance */}
             </div>
             {/* Window Content */}
             <div className="flex-1 bg-white flex flex-col">
                <div className="p-8 prose prose-slate max-w-none flex-1 overflow-y-auto">
                   <h1 className="text-slate-900 text-2xl font-bold">Initial Screening Results</h1>
                   <p className="text-slate-700 text-sm">We ran the <strong>BioPharma Virtual Screen</strong> against the updated KRAS mutant pocket derived from the latest AlphaFold predictions.</p>
                   
                   <div className="bg-slate-100 p-4 rounded-lg my-4 border border-slate-200">
                     <div className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-2">✨ AI Copilot Insight</div>
                     <p className="text-sm text-slate-700 m-0">Based on the docking scores, Compound <strong>BQ-8821</strong> shows a 45% higher binding affinity than the baseline. I recommend queuing a BioDigital cellular simulation to verify toxicity.</p>
                     <button className="mt-3 bg-blue-600 text-white text-xs px-3 py-1.5 rounded shadow-sm hover:bg-blue-700">Queue Simulation</button>
                   </div>
                   
                   <h2 className="text-slate-800 text-lg font-semibold border-b pb-2">Next Steps</h2>
                   <ul className="text-sm text-slate-700 list-disc pl-5">
                     <li>Review PK/PD models.</li>
                     <li>Schedule wet-lab validation (Sync to BioLab calendar).</li>
                   </ul>
                </div>
             </div>
           </div>

        </div>

      </div>

      {/* BioOS Taskbar (Bottom) */}
      <div className="h-14 bg-[#0f172a]/90 backdrop-blur-xl border-t border-slate-700/80 flex items-center justify-between px-4 z-50 shrink-0">
         
         {/* Start Button / App Launcher */}
         <div className="flex items-center gap-2">
           <button className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition group">
             <div className="grid grid-cols-2 gap-1 group-hover:scale-110 transition-transform">
                <div className="w-2 h-2 bg-white rounded-sm"></div><div className="w-2 h-2 bg-white rounded-sm"></div>
                <div className="w-2 h-2 bg-white rounded-sm"></div><div className="w-2 h-2 bg-blue-300 rounded-sm"></div>
             </div>
           </button>
           
           {/* Universal Search Bar embedded in taskbar */}
           <div className="ml-4 w-64 bg-[#1e293b] border border-slate-600 rounded-lg flex items-center px-3 py-1.5 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition">
             <span className="text-slate-400 text-sm mr-2">🔍</span>
             <input type="text" placeholder="Search Bioquora (Cmd+K)" className="bg-transparent border-none outline-none text-xs text-white w-full placeholder-slate-500" />
           </div>
         </div>

         {/* Running Apps / Dock */}
         <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
           <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-600 flex items-center justify-center text-xl cursor-pointer hover:bg-slate-700 relative">
             📝
             <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
           </div>
           <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-600 flex items-center justify-center text-xl cursor-pointer hover:bg-slate-700 relative">
             ✨
             <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
           </div>
           <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-600 flex items-center justify-center text-xl cursor-pointer hover:bg-slate-700 relative">
             ⚙️
           </div>
         </div>

         {/* System Tray */}
         <div className="flex items-center gap-4 text-slate-400">
           <div className="flex items-center gap-3 text-[14px]">
             <span className="hover:text-white cursor-pointer transition">📶</span>
             <span className="hover:text-white cursor-pointer transition">🔋</span>
           </div>
           <div className="text-xs font-medium bg-[#1e293b] px-3 py-1.5 rounded-lg border border-slate-700">
             {time}
           </div>
         </div>
      </div>
      
    </div>
  );
}
