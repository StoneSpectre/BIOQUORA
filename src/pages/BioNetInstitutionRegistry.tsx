import React, { useState, useEffect } from 'react';

export default function BioNetInstitutionRegistry() {

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
    <div className="min-h-screen bg-[#050A15] text-slate-300 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-white mb-2 tracking-wide">Global Institution Registry</h1>
            <p className="text-slate-500 font-mono text-sm">BioIdentity Federation | Node Trust Verification</p>
          </div>
          <button className="px-4 py-2 bg-[#4A90E2] text-white rounded text-sm hover:bg-blue-600 transition">Register Organization</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Federated Institutions', val: '2,491' },
            { label: 'Verified Researchers', val: '142k' },
            { label: 'Cross-Org Trust Links', val: '18.4k' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1020] border border-slate-800 p-6 rounded-lg text-center">
              <div className="text-xs text-slate-500 font-mono mb-2 uppercase">{stat.label}</div>
              <div className="text-3xl text-white font-light">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#0A1020] border border-slate-800 rounded-lg overflow-hidden">
          <div className="p-4 bg-[#050A15] border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-sm font-mono text-slate-400 uppercase">Trusted Nodes</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]"></span>
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            </div>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0A1020] text-slate-500 font-mono text-xs">
              <tr>
                <th className="p-4 font-normal border-b border-slate-800">Institution</th>
                <th className="p-4 font-normal border-b border-slate-800">Domain</th>
                <th className="p-4 font-normal border-b border-slate-800">Region</th>
                <th className="p-4 font-normal border-b border-slate-800">Trust Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr className="hover:bg-slate-800/30 transition cursor-pointer">
                <td className="p-4 text-slate-200 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-xs">SM</div>
                  Stanford Medicine
                </td>
                <td className="p-4 font-mono text-slate-400">stanford.edu</td>
                <td className="p-4 text-slate-400">North America</td>
                <td className="p-4"><span className="text-green-400 bg-green-400/10 px-2 py-1 rounded text-xs border border-green-500/20">Full Federation</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition cursor-pointer">
                <td className="p-4 text-slate-200 font-medium flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#1e293b] flex items-center justify-center text-xs">EM</div>
                  EMBL-EBI
                </td>
                <td className="p-4 font-mono text-slate-400">ebi.ac.uk</td>
                <td className="p-4 text-slate-400">Europe</td>
                <td className="p-4"><span className="text-blue-400 bg-blue-400/10 px-2 py-1 rounded text-xs border border-blue-500/20">Data Provider</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
