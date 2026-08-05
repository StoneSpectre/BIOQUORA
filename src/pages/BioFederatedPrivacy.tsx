import React, { useState, useEffect } from 'react';

export default function BioFederatedPrivacy() {

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
               <span className="text-rose-500">🔒</span> Privacy & Governance
            </h1>
            <p className="text-slate-500 mt-1 text-xs font-sans">
               Configure local data boundaries, anonymization rules, and external access policies.
            </p>
          </div>
        </header>

        <div className="space-y-6">
           <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Local Policy: Patient Genomic Data Sharing</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Anonymization Protocol</div>
                    <select className="w-full bg-black border border-slate-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500">
                       <option>Differential Privacy (ε = 0.1)</option>
                       <option>k-Anonymity (k=10)</option>
                       <option>Strict Internal Only</option>
                    </select>
                 </div>
                 <div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Compute Sharing</div>
                    <select className="w-full bg-black border border-slate-700 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-rose-500">
                       <option>Allow Federated Queries (Masked Results)</option>
                       <option>Allow Model Training (Federated Averaging)</option>
                       <option>No External Access</option>
                    </select>
                 </div>
              </div>
              
              <div className="flex gap-4 border-t border-slate-800 pt-4">
                 <button className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded uppercase tracking-widest transition-colors">Apply Policy Update</button>
                 <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded uppercase tracking-widest transition-colors">Revert to Default</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
