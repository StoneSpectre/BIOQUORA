import React, { useState } from 'react';
import { Store, Search, Star, Download, ShieldCheck, CheckCircle, Loader2, Filter, TrendingUp, DollarSign } from 'lucide-react';

const BioAIHubWorkspace = () => {
  const [installingId, setInstallingId] = useState<number | null>(null);
  const [installed, setInstalled] = useState<number[]>([]);

  const aiAgents = [
    {
      id: 1,
      name: "Mayo Clinic Oncology Copilot",
      developer: "Mayo Clinic IT",
      description: "Specialized clinical reasoning engine trained on 50+ years of Mayo Clinic oncology patient records. Excellent for rare cancer edge cases.",
      rating: 4.9,
      downloads: "124k",
      price: "Free",
      isVerified: true,
      category: "Oncology"
    },
    {
      id: 2,
      name: "Pediatric Genomics Engine",
      developer: "Bioquora Labs",
      description: "Identifies rare pediatric genetic anomalies from WGS data with 99.8% precision. NCCN compliant.",
      rating: 4.8,
      downloads: "89k",
      price: "$299/mo",
      isVerified: true,
      category: "Genomics"
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
      category: "Toxicology"
    },
    {
      id: 4,
      name: "AlphaFold Wrapper Plugin",
      developer: "OpenBio Community",
      description: "Seamlessly route FASTA sequences to AlphaFold 3 via Bioquora's workflow orchestrator.",
      rating: 4.7,
      downloads: "210k",
      price: "Free",
      isVerified: true,
      category: "Simulation"
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
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center">
            <Store className="w-10 h-10 mr-3 text-blue-600" />
            BioAI Hub
          </h1>
          <p className="text-slate-500 mt-2 text-lg">Stage 16: The App Store for Medical AI Agents</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
             <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
               <DollarSign className="w-4 h-4 text-blue-600" />
             </div>
             <div>
               <div className="text-[10px] text-slate-400 font-bold uppercase">Dev Revenue (Oct)</div>
               <div className="text-sm font-bold text-slate-700">$142,850.00</div>
             </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar: Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
             <h3 className="font-bold text-slate-800 flex items-center mb-4">
               <Filter className="w-4 h-4 mr-2" /> Categories
             </h3>
             <ul className="space-y-2 text-sm text-slate-600">
               <li className="flex justify-between items-center bg-blue-50 text-blue-700 px-3 py-2 rounded-lg font-medium cursor-pointer">
                 All Agents <span className="bg-blue-100 px-2 py-0.5 rounded-full text-xs">1,204</span>
               </li>
               <li className="flex justify-between items-center hover:bg-slate-50 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                 Oncology <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">342</span>
               </li>
               <li className="flex justify-between items-center hover:bg-slate-50 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                 Genomics <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">156</span>
               </li>
               <li className="flex justify-between items-center hover:bg-slate-50 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                 Toxicology <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">89</span>
               </li>
               <li className="flex justify-between items-center hover:bg-slate-50 px-3 py-2 rounded-lg cursor-pointer transition-colors">
                 Radiology <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs">412</span>
               </li>
             </ul>

             <h3 className="font-bold text-slate-800 flex items-center mt-8 mb-4">
               <TrendingUp className="w-4 h-4 mr-2" /> Trending Devs
             </h3>
             <div className="space-y-3">
               <div className="flex items-center text-sm">
                 <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-2 text-xs">M</div>
                 <span className="font-medium text-slate-700">Mayo Clinic IT</span>
               </div>
               <div className="flex items-center text-sm">
                 <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold mr-2 text-xs">S</div>
                 <span className="font-medium text-slate-700">Stanford Medicine</span>
               </div>
             </div>
          </div>
        </div>

        {/* Main Content: Marketplace Grid */}
        <div className="lg:col-span-3">
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search for specialized AI agents, models, or clinical workflows..."
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiAgents.map((agent) => (
              <div key={agent.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group relative overflow-hidden">
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-transparent rounded-bl-full -z-0"></div>

                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800 flex items-center">
                      {agent.name}
                      {agent.isVerified && <ShieldCheck className="w-4 h-4 text-blue-500 ml-2" title="Bioquora Verified" />}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">by <span className="font-medium text-blue-600 hover:underline cursor-pointer">{agent.developer}</span></p>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded-md flex items-center text-xs font-bold text-slate-700">
                    <Star className="w-3 h-3 text-yellow-500 mr-1 fill-current" /> {agent.rating}
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 mb-6 flex-1 relative z-10 leading-relaxed">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between mt-auto relative z-10 pt-4 border-t border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Installs</span>
                    <span className="text-sm font-bold text-slate-700 flex items-center"><Download className="w-3 h-3 mr-1" /> {agent.downloads}</span>
                  </div>
                  
                  {installed.includes(agent.id) ? (
                    <button disabled className="px-6 py-2 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg font-bold text-sm flex items-center cursor-default transition-colors">
                      <CheckCircle className="w-4 h-4 mr-2" /> Installed
                    </button>
                  ) : installingId === agent.id ? (
                    <button disabled className="px-6 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg font-bold text-sm flex items-center cursor-wait w-32 justify-center transition-colors">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Installing
                    </button>
                  ) : (
                    <button 
                      onClick={() => handleInstall(agent.id)}
                      className="px-6 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-blue-300 hover:text-blue-600 rounded-lg font-bold text-sm transition-colors w-32"
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
};

export default BioAIHubWorkspace;
