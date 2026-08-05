import React, { useState, useEffect } from 'react';

export default function BioMarketEnterprise() {

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
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-semibold text-white tracking-wide">Enterprise Market Hub</h1>
          <p className="text-xs text-slate-500 font-mono mt-1">Private Catalogs • License Management • Auditing</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button className="w-full text-left px-4 py-3 bg-[#4A90E2]/10 text-[#4A90E2] border-l-2 border-[#4A90E2] font-medium text-sm">Approved Assets</button>
            <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-sm transition">License Agreements</button>
            <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-sm transition">Procurement Requests</button>
            <button className="w-full text-left px-4 py-3 text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 font-medium text-sm transition">Compliance Audit Log</button>
          </div>

          {/* Main Area */}
          <div className="lg:col-span-3 bg-[#0A1020] border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-white">Institution-Approved Catalog</h2>
              <button className="px-4 py-1.5 bg-slate-800 text-xs font-mono text-white rounded border border-slate-700 hover:bg-slate-700">Add from Global Market</button>
            </div>

            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500 border-b border-slate-800 uppercase font-mono bg-[#050A15]">
                <tr>
                  <th className="p-3 font-normal">Asset Name</th>
                  <th className="p-3 font-normal">Type</th>
                  <th className="p-3 font-normal">License Status</th>
                  <th className="p-3 font-normal">Security Scan</th>
                  <th className="p-3 font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-3 font-medium text-slate-200">BioGPT-v3-Enterprise</td>
                  <td className="p-3"><span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">Model</span></td>
                  <td className="p-3"><span className="text-green-400 text-xs flex items-center gap-1">✓ Active (Commercial)</span></td>
                  <td className="p-3 text-xs font-mono text-slate-400">Passed (0 hours ago)</td>
                  <td className="p-3"><button className="text-[#4A90E2] hover:underline text-xs">Manage</button></td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-3 font-medium text-slate-200">TCGA Harmonized V4</td>
                  <td className="p-3"><span className="text-xs text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded">Dataset</span></td>
                  <td className="p-3"><span className="text-green-400 text-xs flex items-center gap-1">✓ Active (Academic)</span></td>
                  <td className="p-3 text-xs font-mono text-slate-400">Passed (2 days ago)</td>
                  <td className="p-3"><button className="text-[#4A90E2] hover:underline text-xs">Manage</button></td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="p-3 font-medium text-slate-200">AlphaFold-Omni</td>
                  <td className="p-3"><span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded">Model</span></td>
                  <td className="p-3"><span className="text-amber-400 text-xs flex items-center gap-1">⚠ Renewal Pending</span></td>
                  <td className="p-3 text-xs font-mono text-slate-400">Passed (1 week ago)</td>
                  <td className="p-3"><button className="text-[#4A90E2] hover:underline text-xs">Manage</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
