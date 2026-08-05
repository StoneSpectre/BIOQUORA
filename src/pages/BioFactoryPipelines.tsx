import React, { useState, useEffect } from 'react';

export default function BioFactoryPipelines() {

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
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 border-b border-slate-800 pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-blue-500">🚰</span> Factory Pipelines
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Automated ingestion and processing streams.
            </p>
          </div>
        </header>
        
        <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
           <table className="w-full text-left text-xs text-slate-400 font-sans">
              <thead className="bg-[#111] border-b border-slate-800 text-[10px] uppercase tracking-widest font-mono">
                 <tr>
                    <th className="px-4 py-3">Pipeline ID</th>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Throughput</th>
                    <th className="px-4 py-3">Status</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono">
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">PL-Acq-PubMed</td>
                    <td className="px-4 py-3">PubMed Daily Bulk XML</td>
                    <td className="px-4 py-3">4,200 docs/hr</td>
                    <td className="px-4 py-3 text-emerald-500">HEALTHY</td>
                 </tr>
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">PL-Embed-ClinicalTrials</td>
                    <td className="px-4 py-3">ClinicalTrials.gov JSON</td>
                    <td className="px-4 py-3">120 docs/hr</td>
                    <td className="px-4 py-3 text-emerald-500">HEALTHY</td>
                 </tr>
                 <tr className="hover:bg-[#111]">
                    <td className="px-4 py-3 text-white">PL-Graph-UniProt</td>
                    <td className="px-4 py-3">UniProt KB Proteins</td>
                    <td className="px-4 py-3">0 nodes/hr</td>
                    <td className="px-4 py-3 text-rose-500">STALLED (API LIMIT)</td>
                 </tr>
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
}
