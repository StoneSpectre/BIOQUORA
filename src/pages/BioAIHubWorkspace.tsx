import React, { useState } from 'react';
import { Store, Search, Star, Download, ShieldCheck, CheckCircle, Loader2, Filter, TrendingUp, DollarSign, ExternalLink, Network, Command } from 'lucide-react';

export default function BioAIHubWorkspace() {
  const [installingId, setInstallingId] = useState<number | null>(null);
  const [installed, setInstalled] = useState<number[]>([]);

  const aiAgents = [
    {
      id: 1,
      name: "Mayo Clinic Oncology Copilot",
      developer: "Mayo Clinic IT",
      description: "Specialized clinical reasoning engine trained on 50+ years of Mayo Clinic oncology records. Unparalleled edge-case resolution.",
      rating: 4.9,
      downloads: "124k",
      price: "Enterprise",
      isVerified: true,
      category: "Oncology",
      accent: "from-blue-600 to-indigo-600",
      icon: "🏥"
    },
    {
      id: 2,
      name: "Pediatric Genomics Engine",
      developer: "Bioquora Labs",
      description: "Identifies rare pediatric genetic anomalies from WGS data with 99.8% precision. NCCN compliant workflow integration.",
      rating: 4.8,
      downloads: "89k",
      price: "$299/mo",
      isVerified: true,
      category: "Genomics",
      accent: "from-purple-600 to-pink-600",
      icon: "🧬"
    },
    {
      id: 3,
      name: "CardioTox Predictor v4",
      developer: "HeartAI Inc.",
      description: "Advanced cardiotoxicity screening tool for early-stage drug discovery. Integrates directly with BioTox workspace.",
      rating: 4.6,
      downloads: "42k",
      price: "$99/mo",
      isVerified: false,
      category: "Toxicology",
      accent: "from-rose-600 to-red-600",
      icon: "🫀"
    },
    {
      id: 4,
      name: "AlphaFold 3 Router",
      developer: "OpenBio Community",
      description: "Seamlessly route FASTA sequences to AlphaFold 3 via Bioquora's workflow orchestrator. Open source MIT license.",
      rating: 4.7,
      downloads: "210k",
      price: "Free",
      isVerified: true,
      category: "Simulation",
      accent: "from-emerald-600 to-teal-600",
      icon: "🧪"
    }
  ];

  const handleInstall = (id: number) => {
    setInstallingId(id);
    setTimeout(() => {
      setInstalled([...installed, id]);
      setInstallingId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 16 • Ecosystem Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Store className="w-10 h-10 mr-3 text-sky-500 animate-pulse" />
             BioAI Hub
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
             <div className="w-6 h-6 rounded-full bg-sky-900/30 flex items-center justify-center mr-3 border border-sky-500/30">
               <DollarSign className="w-3 h-3 text-sky-400" />
             </div>
             <div>
               <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Dev Revenue (Oct)</div>
               <div className="text-sm font-mono font-bold text-sky-400">$142,850.00</div>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Sidebar: Filters */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
             
             <h3 className="font-bold text-gray-400 flex items-center mb-6 text-xs uppercase tracking-widest border-b border-gray-900 pb-3">
               <Filter className="w-4 h-4 mr-2 text-sky-400" /> Categories
             </h3>
             <ul className="space-y-2 text-sm text-gray-400 font-bold">
               <li className="flex justify-between items-center bg-sky-900/20 text-sky-400 px-4 py-3 rounded-xl border border-sky-500/30 cursor-pointer shadow-inner">
                 <span className="uppercase tracking-widest text-[10px]">All Agents</span> <span className="bg-[#0a0a0c] border border-sky-500/50 px-2 py-0.5 rounded-lg text-xs font-mono">1,204</span>
               </li>
               <li className="flex justify-between items-center hover:bg-[#0a0a0c] px-4 py-3 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-800">
                 <span className="uppercase tracking-widest text-[10px]">Oncology</span> <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-0.5 rounded-lg text-xs font-mono">342</span>
               </li>
               <li className="flex justify-between items-center hover:bg-[#0a0a0c] px-4 py-3 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-800">
                 <span className="uppercase tracking-widest text-[10px]">Genomics</span> <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-0.5 rounded-lg text-xs font-mono">156</span>
               </li>
               <li className="flex justify-between items-center hover:bg-[#0a0a0c] px-4 py-3 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-800">
                 <span className="uppercase tracking-widest text-[10px]">Toxicology</span> <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-0.5 rounded-lg text-xs font-mono">89</span>
               </li>
               <li className="flex justify-between items-center hover:bg-[#0a0a0c] px-4 py-3 rounded-xl cursor-pointer transition-colors border border-transparent hover:border-gray-800">
                 <span className="uppercase tracking-widest text-[10px]">Radiology</span> <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-0.5 rounded-lg text-xs font-mono">412</span>
               </li>
             </ul>

             <h3 className="font-bold text-gray-400 flex items-center mt-8 mb-6 text-xs uppercase tracking-widest border-b border-gray-900 pb-3">
               <TrendingUp className="w-4 h-4 mr-2 text-emerald-400" /> Trending Devs
             </h3>
             <div className="space-y-4">
               <div className="flex items-center text-sm p-3 bg-[#0a0a0c] rounded-xl border border-gray-800 shadow-inner">
                 <div className="w-8 h-8 rounded-lg bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold mr-3 text-xs shadow-inner">M</div>
                 <div className="flex flex-col">
                   <span className="font-bold text-gray-300 text-[10px] uppercase tracking-widest">Mayo Clinic IT</span>
                   <span className="text-[10px] text-emerald-400 font-mono">Top Tier</span>
                 </div>
               </div>
               <div className="flex items-center text-sm p-3 bg-[#0a0a0c] rounded-xl border border-gray-800 shadow-inner">
                 <div className="w-8 h-8 rounded-lg bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold mr-3 text-xs shadow-inner">S</div>
                 <div className="flex flex-col">
                   <span className="font-bold text-gray-300 text-[10px] uppercase tracking-widest">Stanford Med</span>
                   <span className="text-[10px] text-emerald-400 font-mono">Verified</span>
                 </div>
               </div>
             </div>
          </div>

          {/* Dev Portal Prompt */}
          <div className="bg-gradient-to-br from-sky-900/20 to-blue-900/20 border border-sky-500/30 rounded-2xl p-6 shadow-[0_0_20px_rgba(14,165,233,0.1)] relative overflow-hidden group">
             <div className="absolute -right-4 -top-4 text-sky-500/10 group-hover:text-sky-500/20 transition-colors">
               <Command className="w-24 h-24" />
             </div>
             <h3 className="text-sm font-black text-sky-300 uppercase tracking-widest mb-2 relative z-10">Developer Portal</h3>
             <p className="text-[10px] text-gray-400 font-mono mb-4 relative z-10">Build, monetize, and distribute AI agents to 500+ global hospitals.</p>
             <button className="w-full py-2 bg-[#0a0a0c] border border-sky-500/50 hover:bg-sky-900/40 rounded-xl text-[10px] font-bold text-sky-400 uppercase tracking-widest transition-colors flex items-center justify-center relative z-10 shadow-inner">
                Publish Agent <ExternalLink className="w-3 h-3 ml-2" />
             </button>
          </div>
        </div>

        {/* Main Content: Marketplace Grid */}
        <div className="lg:col-span-9 flex flex-col space-y-6">
          
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-sky-400 transition-colors" />
            <input 
              type="text" 
              placeholder="Search for specialized AI agents, models, or clinical workflows..."
              className="w-full bg-[#050505] border border-gray-800 rounded-2xl py-5 pl-14 pr-6 text-sm font-mono text-gray-200 focus:outline-none focus:border-sky-500/50 shadow-2xl transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
               <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-1 rounded text-[10px] font-mono text-gray-500">⌘</span>
               <span className="bg-[#0a0a0c] border border-gray-800 px-2 py-1 rounded text-[10px] font-mono text-gray-500">K</span>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            {aiAgents.map((agent) => (
              <div key={agent.id} className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl hover:border-gray-600 transition-colors flex flex-col h-full group relative overflow-hidden">
                
                {/* Decoration */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${agent.accent} opacity-10 rounded-bl-full -z-0 group-hover:opacity-20 transition-opacity`}></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="flex items-start">
                     <div className="text-3xl mr-4 bg-[#0a0a0c] p-3 rounded-xl border border-gray-800 shadow-inner group-hover:scale-110 transition-transform">
                       {agent.icon}
                     </div>
                     <div>
                       <h3 className="font-bold text-gray-100 flex items-center mb-1 text-sm uppercase tracking-wider">
                         {agent.name}
                         {agent.isVerified && <ShieldCheck className="w-4 h-4 text-sky-500 ml-2 drop-shadow-[0_0_5px_rgba(14,165,233,0.5)]" title="Bioquora Verified" />}
                       </h3>
                       <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">by <span className="font-bold text-gray-400 group-hover:text-sky-400 transition-colors">{agent.developer}</span></p>
                     </div>
                  </div>
                  <div className="bg-[#0a0a0c] border border-yellow-900/50 px-2.5 py-1.5 rounded-lg flex items-center text-xs font-bold text-yellow-500 shadow-inner">
                    <Star className="w-3 h-3 mr-1 fill-current drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" /> {agent.rating}
                  </div>
                </div>
                
                <p className="text-xs text-gray-400 mb-8 flex-1 relative z-10 leading-relaxed font-sans">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between mt-auto relative z-10 pt-5 border-t border-gray-900">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest font-bold mb-1">Installs</span>
                    <span className="text-sm font-bold font-mono text-gray-300 flex items-center"><Download className="w-3 h-3 mr-1.5 text-gray-500" /> {agent.downloads}</span>
                  </div>
                  
                  {installed.includes(agent.id) ? (
                    <button disabled className="px-6 py-2.5 bg-emerald-900/20 text-emerald-400 border border-emerald-900/50 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center cursor-default transition-colors shadow-inner">
                      <CheckCircle className="w-4 h-4 mr-2" /> Installed
                    </button>
                  ) : installingId === agent.id ? (
                    <button disabled className="px-6 py-2.5 bg-sky-900/20 text-sky-400 border border-sky-900/50 rounded-xl font-bold text-[10px] uppercase tracking-widest flex items-center cursor-wait w-36 justify-center transition-colors shadow-inner">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Installing
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInstall(agent.id)}
                      className="px-6 py-2.5 bg-[#0a0a0c] border border-gray-700 text-gray-300 hover:bg-gray-900 hover:border-sky-500/50 hover:text-sky-400 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-colors w-36 shadow-inner flex justify-center"
                    >
                      {agent.price}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </div>
  );
}
