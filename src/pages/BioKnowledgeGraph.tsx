import React, { useState } from 'react';

export default function BioKnowledgeGraph() {
  const [activeNode, setActiveNode] = useState('EGFR (ENSG00000146648)');

  return (
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden relative">
      
      {/* Top Navbar */}
      <header className="h-14 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 shrink-0 z-20 absolute top-0 left-0 right-0">
        <div className="flex items-center gap-4">
          <span className="text-xl text-purple-500">🌌</span>
          <h1 className="text-lg font-light text-white tracking-widest uppercase">Global Knowledge Graph</h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-[#1e293b] border border-slate-700 rounded-full flex items-center px-4 py-1.5 shadow-inner">
             <span className="text-slate-500 text-sm mr-2">🔍</span>
             <input type="text" placeholder="Explore entities (e.g. EGFR)..." className="bg-transparent border-none outline-none text-sm text-white w-64 placeholder-slate-500" />
           </div>
           <button className="text-xs font-mono text-purple-400 border border-purple-500/30 bg-purple-900/20 px-3 py-1.5 rounded hover:bg-purple-900/40 transition">
             Export Subgraph
           </button>
        </div>
      </header>

      {/* Main Graph Canvas Area */}
      <div className="flex-1 relative w-full h-full cursor-grab active:cursor-grabbing">
         
         {/* Deep Space Background */}
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1b4b] via-[#020617] to-black opacity-80 pointer-events-none"></div>

         {/* Abstract WebGL Network Mockup using SVG */}
         <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Edges */}
            <path d="M 500 500 L 700 300" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 500 500 L 300 250" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 500 500 L 250 600" stroke="rgba(244, 63, 94, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 500 500 L 750 700" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" fill="none" />
            <path d="M 700 300 L 850 200" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" fill="none" />
            <path d="M 700 300 L 800 450" stroke="rgba(168, 85, 247, 0.2)" strokeWidth="1" fill="none" />

            {/* Central Node (Gene) */}
            <circle cx="500" cy="500" r="15" fill="#a855f7" filter="url(#glow)" className="cursor-pointer hover:fill-purple-400" />
            <text x="500" y="535" fill="white" fontSize="14" textAnchor="middle" fontWeight="bold">EGFR</text>
            <text x="500" y="555" fill="#94a3b8" fontSize="10" textAnchor="middle" className="font-mono">Gene • 12.4k connections</text>

            {/* Satellite Node 1 (Disease) */}
            <circle cx="700" cy="300" r="10" fill="#f43f5e" filter="url(#glow)" className="cursor-pointer hover:fill-rose-400" />
            <text x="700" y="275" fill="white" fontSize="12" textAnchor="middle">Non-Small Cell Lung Cancer</text>
            
            {/* Satellite Node 2 (Drug) */}
            <circle cx="300" cy="250" r="8" fill="#10b981" filter="url(#glow)" className="cursor-pointer hover:fill-emerald-400" />
            <text x="300" y="230" fill="white" fontSize="12" textAnchor="middle">Erlotinib</text>

            {/* Satellite Node 3 (Pathway) */}
            <circle cx="250" cy="600" r="12" fill="#3b82f6" filter="url(#glow)" className="cursor-pointer hover:fill-blue-400" />
            <text x="250" y="635" fill="white" fontSize="12" textAnchor="middle">PI3K/AKT Signaling</text>

            {/* Satellite Node 4 (Protein) */}
            <circle cx="750" cy="700" r="10" fill="#f59e0b" filter="url(#glow)" className="cursor-pointer hover:fill-amber-400" />
            <text x="750" y="730" fill="white" fontSize="12" textAnchor="middle">Epidermal Growth Factor (Protein)</text>

            {/* Ambient Background Nodes (Constellation effect) */}
            {Array.from({ length: 150 }).map((_, i) => (
               <circle 
                 key={i} 
                 cx={Math.random() * 1000} 
                 cy={Math.random() * 1000} 
                 r={Math.random() * 2 + 0.5} 
                 fill="rgba(255,255,255,0.15)" 
               />
            ))}
         </svg>
      </div>

      {/* Floating Entity Information Panel (Right) */}
      <div className="absolute right-6 top-20 w-80 bg-[#0f172a]/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl p-5 z-20">
         <div className="flex justify-between items-start mb-4">
           <div>
             <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 mb-1 block">Gene Entity</span>
             <h2 className="text-xl font-bold text-white">{activeNode.split(' ')[0]}</h2>
             <span className="text-xs font-mono text-slate-500">{activeNode.split(' ')[1]}</span>
           </div>
           <button className="text-slate-400 hover:text-white">✕</button>
         </div>

         <p className="text-xs text-slate-300 leading-relaxed mb-6">
           Epidermal growth factor receptor. The protein encoded by this gene is a transmembrane glycoprotein that is a member of the protein kinase superfamily. Binding of the protein to a ligand induces receptor dimerization and tyrosine autophosphorylation.
         </p>

         <div className="space-y-4">
           <div>
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Connected Ontologies</h3>
             <div className="flex flex-wrap gap-2">
               <span className="px-2 py-1 bg-[#1e293b] border border-slate-600 rounded text-[10px] text-slate-300">MeSH: D004815</span>
               <span className="px-2 py-1 bg-[#1e293b] border border-slate-600 rounded text-[10px] text-slate-300">GO:0006915</span>
               <span className="px-2 py-1 bg-[#1e293b] border border-slate-600 rounded text-[10px] text-slate-300">UMLS: C0014457</span>
             </div>
           </div>

           <div>
             <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Strongest Relationships</h3>
             <ul className="text-xs space-y-2">
               <li className="flex justify-between items-center bg-[#020617] p-2 rounded border border-slate-800">
                 <span className="text-rose-400">NSCLC</span>
                 <span className="text-slate-500 text-[10px]">Associated (99%)</span>
               </li>
               <li className="flex justify-between items-center bg-[#020617] p-2 rounded border border-slate-800">
                 <span className="text-emerald-400">Erlotinib</span>
                 <span className="text-slate-500 text-[10px]">Inhibited by (95%)</span>
               </li>
               <li className="flex justify-between items-center bg-[#020617] p-2 rounded border border-slate-800">
                 <span className="text-blue-400">PI3K/AKT</span>
                 <span className="text-slate-500 text-[10px]">Activates (92%)</span>
               </li>
             </ul>
           </div>
         </div>
         
         <button className="w-full mt-6 py-2 bg-purple-600/20 text-purple-400 font-bold text-xs border border-purple-500/30 rounded hover:bg-purple-600/40 transition">
           View Supporting Evidence
         </button>
      </div>

      {/* Floating Graph Controls (Bottom Left) */}
      <div className="absolute left-6 bottom-6 flex gap-2 z-20">
         <button className="w-10 h-10 bg-[#0f172a]/90 backdrop-blur border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-800 shadow-lg">＋</button>
         <button className="w-10 h-10 bg-[#0f172a]/90 backdrop-blur border border-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-slate-800 shadow-lg">－</button>
         <button className="px-4 h-10 bg-[#0f172a]/90 backdrop-blur border border-slate-700 rounded-lg flex items-center justify-center text-xs text-slate-300 hover:bg-slate-800 shadow-lg ml-2">Reset Layout</button>
      </div>

    </div>
  );
}
