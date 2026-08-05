import React, { useState, useEffect } from 'react';

export default function BioOSAppStore() {

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
    <div className="h-screen bg-[#0f172a] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6 shrink-0 shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-xl">🏪</span>
          <h1 className="text-lg font-semibold text-white tracking-wide">Biomedical App Store</h1>
        </div>
        <div className="flex gap-4">
           <div className="bg-[#0f172a] border border-slate-600 rounded flex items-center px-2">
             <span className="text-slate-500 text-xs mr-2">🔍</span>
             <input type="text" placeholder="Search apps, plugins, agents..." className="bg-transparent border-none outline-none text-xs text-white py-1.5 w-48" />
           </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Categories */}
        <div className="w-56 bg-[#1e293b] border-r border-slate-700 flex flex-col py-4">
           <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Categories</h3>
           <nav className="space-y-1">
             <a href="#" className="block px-4 py-2 text-sm text-white bg-blue-600/20 border-r-2 border-blue-500">Discover</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">AI Agents & Copilots</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Bioinformatics</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Clinical Tools</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Data Visualization</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Simulations (BioDigital)</a>
           </nav>
           
           <h3 className="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mt-8 mb-2">Management</h3>
           <nav className="space-y-1">
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Installed Apps (12)</a>
             <a href="#" className="block px-4 py-2 text-sm text-slate-400 hover:bg-slate-800 hover:text-slate-200">Updates Available (2)</a>
           </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto bg-[#020617]">
          
          {/* Featured Banner */}
          <div className="w-full h-64 bg-gradient-to-r from-blue-900 to-purple-900 rounded-2xl mb-8 relative overflow-hidden shadow-xl flex items-center px-10">
             <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-30 mix-blend-overlay"></div>
             <div className="relative z-10 max-w-lg">
                <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-4 inline-block">Featured BioOS Extension</span>
                <h2 className="text-3xl font-bold text-white mb-2">AlphaFold 3 Integration</h2>
                <p className="text-slate-300 mb-6">Seamlessly run state-of-the-art protein structure predictions directly from your BioOS Desktop using BioCloud compute.</p>
                <button className="bg-white text-blue-900 font-bold py-2 px-6 rounded-lg hover:bg-slate-100 transition shadow-lg">Install Free</button>
             </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Trending for Bioinformatics</h2>
          
          {/* App Grid */}
          <div className="grid grid-cols-3 gap-6">
             
             {/* App 1 */}
             <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 flex flex-col hover:border-slate-500 transition hover:shadow-lg cursor-pointer">
                <div className="flex gap-4 items-start mb-4">
                   <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-slate-600">📊</div>
                   <div className="flex-1">
                     <h3 className="font-bold text-white">Seurat v5 OS GUI</h3>
                     <p className="text-xs text-slate-400">By Satija Lab</p>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-amber-400 text-xs">★ 4.9</span>
                       <span className="text-slate-500 text-[10px]">(2.4k)</span>
                     </div>
                   </div>
                </div>
                <p className="text-sm text-slate-400 flex-1 mb-4">Native GUI integration for single-cell genomics analysis. Connects directly to BioLab workspaces.</p>
                <button className="w-full py-2 bg-slate-700 text-white rounded font-medium text-sm hover:bg-slate-600 transition">Install</button>
             </div>

             {/* App 2 */}
             <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 flex flex-col hover:border-slate-500 transition hover:shadow-lg cursor-pointer">
                <div className="flex gap-4 items-start mb-4">
                   <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-slate-600">🧠</div>
                   <div className="flex-1">
                     <h3 className="font-bold text-white">Statistician Agent</h3>
                     <p className="text-xs text-slate-400">By Bioquora AI Core</p>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-amber-400 text-xs">★ 4.8</span>
                       <span className="text-slate-500 text-[10px]">(5.1k)</span>
                     </div>
                   </div>
                </div>
                <p className="text-sm text-slate-400 flex-1 mb-4">A specialized AI agent that joins your Copilot to automatically perform rigorous statistical testing on your datasets.</p>
                <button className="w-full py-2 bg-[#0f172a] border border-slate-600 text-slate-400 rounded font-medium text-sm cursor-default">Installed</button>
             </div>

             {/* App 3 */}
             <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 flex flex-col hover:border-slate-500 transition hover:shadow-lg cursor-pointer">
                <div className="flex gap-4 items-start mb-4">
                   <div className="w-16 h-16 bg-slate-800 rounded-xl flex items-center justify-center text-3xl shadow-inner border border-slate-600">🧪</div>
                   <div className="flex-1">
                     <h3 className="font-bold text-white">ChemDraw BioOS</h3>
                     <p className="text-xs text-slate-400">By Revvity</p>
                     <div className="flex items-center gap-1 mt-1">
                       <span className="text-amber-400 text-xs">★ 4.6</span>
                       <span className="text-slate-500 text-[10px]">(890)</span>
                     </div>
                   </div>
                </div>
                <p className="text-sm text-slate-400 flex-1 mb-4">Enterprise chemical drawing tool, now running natively inside your Bioquora environment.</p>
                <button className="w-full py-2 bg-blue-600 text-white rounded font-medium text-sm hover:bg-blue-500 transition">Get License (Enterprise)</button>
             </div>

          </div>

        </div>

      </div>
    </div>
  );
}
