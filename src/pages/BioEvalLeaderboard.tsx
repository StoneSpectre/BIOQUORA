import React, { useState, useEffect } from 'react';

export default function BioEvalLeaderboard() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-[1200px] mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-amber-500">🏆</span> Scientific Leaderboards
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Transparent Elo ratings and domain-specific rankings for Bioquora AI Models.
            </p>
          </div>
          <div className="flex gap-4">
             <select className="px-4 py-1.5 bg-black text-slate-300 border border-slate-700 rounded font-bold text-xs uppercase focus:outline-none focus:border-amber-500 cursor-pointer">
                <option>Domain: General Biomedical QA</option>
                <option>Domain: Oncology Therapeutics</option>
                <option>Domain: Molecular Dynamics Code</option>
                <option>Domain: Radiology Vision</option>
             </select>
          </div>
        </header>

        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
           <table className="w-full text-left text-sm text-slate-400 font-sans">
              <thead className="bg-[#111] border-b border-slate-800 text-xs uppercase tracking-widest text-slate-500 font-bold font-mono">
                 <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Model Name</th>
                    <th className="px-6 py-4">Elo Rating</th>
                    <th className="px-6 py-4">BioQA Accuracy</th>
                    <th className="px-6 py-4">Hallucination Rate</th>
                    <th className="px-6 py-4">Expert Review Score</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                 
                 <tr className="bg-amber-950/10 hover:bg-amber-950/20 transition-colors border-l-4 border-l-amber-500">
                    <td className="px-6 py-4 font-mono font-bold text-amber-500 text-xl">1</td>
                    <td className="px-6 py-4 font-bold text-white flex items-center gap-2">
                       BioFoundation-70B-v3
                       <span className="text-[8px] bg-amber-500 text-black px-1 rounded uppercase font-bold tracking-widest">SOTA</span>
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-slate-200">1420</td>
                    <td className="px-6 py-4">94.2%</td>
                    <td className="px-6 py-4 text-emerald-400 font-bold">&lt; 1.0%</td>
                    <td className="px-6 py-4">
                       <div className="flex text-amber-500 text-xs">★★★★★</div>
                    </td>
                 </tr>

                 <tr className="hover:bg-[#111] transition-colors border-l-4 border-l-transparent">
                    <td className="px-6 py-4 font-mono font-bold text-slate-500">2</td>
                    <td className="px-6 py-4 font-bold text-slate-300">BioFoundation-70B-v2</td>
                    <td className="px-6 py-4 font-mono">1385</td>
                    <td className="px-6 py-4">91.8%</td>
                    <td className="px-6 py-4">2.4%</td>
                    <td className="px-6 py-4">
                       <div className="flex text-slate-500 text-xs">★★★★☆</div>
                    </td>
                 </tr>

                 <tr className="hover:bg-[#111] transition-colors border-l-4 border-l-transparent">
                    <td className="px-6 py-4 font-mono font-bold text-slate-500">3</td>
                    <td className="px-6 py-4 font-bold text-slate-300">BioFoundation-34B-Edge</td>
                    <td className="px-6 py-4 font-mono">1290</td>
                    <td className="px-6 py-4">88.5%</td>
                    <td className="px-6 py-4 text-yellow-500">4.1%</td>
                    <td className="px-6 py-4">
                       <div className="flex text-slate-500 text-xs">★★★☆☆</div>
                    </td>
                 </tr>
                 
                 <tr className="hover:bg-[#111] transition-colors border-l-4 border-l-transparent opacity-50">
                    <td className="px-6 py-4 font-mono font-bold text-slate-500">4</td>
                    <td className="px-6 py-4 font-bold text-slate-400 line-through">BioFoundation-13B (Deprecated)</td>
                    <td className="px-6 py-4 font-mono">1105</td>
                    <td className="px-6 py-4">76.2%</td>
                    <td className="px-6 py-4 text-rose-500">9.8%</td>
                    <td className="px-6 py-4">
                       <div className="flex text-slate-500 text-xs">★★☆☆☆</div>
                    </td>
                 </tr>

              </tbody>
           </table>
           
           <div className="bg-[#050505] border-t border-slate-800 p-4 text-[10px] text-slate-500 text-center font-sans">
              * Elo ratings are calculated from automated head-to-head QA battles verified by BioValidator. Human Expert Review scores are aggregated from the Bioquora Scientific Advisory Board.
           </div>
        </div>

      </div>
    </div>
  );
}
