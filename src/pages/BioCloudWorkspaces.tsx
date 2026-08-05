import React, { useState, useEffect } from 'react';

export default function BioCloudWorkspaces() {

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
        <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">Scientific Workspaces</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Multi-tenant Research Environments | Notebooks</p>
          </div>
          <button className="px-4 py-1.5 bg-[#4A90E2] text-xs font-mono text-white rounded hover:bg-blue-600 transition">Create Workspace</button>
        </header>

        <div className="bg-[#0A1020] border border-slate-800 rounded-lg p-6">
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 border-b border-slate-800 uppercase font-mono">
              <tr>
                <th className="pb-2 font-normal">Workspace Name</th>
                <th className="pb-2 font-normal">Organization</th>
                <th className="pb-2 font-normal">Storage Used</th>
                <th className="pb-2 font-normal">Active Notebooks</th>
                <th className="pb-2 font-normal">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr className="hover:bg-slate-800/20 transition">
                <td className="py-4 font-medium text-slate-200">Oncology Multi-Omics</td>
                <td className="py-4 text-slate-400">Stanford Medicine</td>
                <td className="py-4 font-mono text-slate-400">4.2 TB / 10 TB</td>
                <td className="py-4 text-[#4A90E2]">3 Running</td>
                <td className="py-4"><button className="text-[#4A90E2] hover:underline text-xs">Manage</button></td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition">
                <td className="py-4 font-medium text-slate-200">CRISPR Target Predictor</td>
                <td className="py-4 text-slate-400">Broad Institute</td>
                <td className="py-4 font-mono text-slate-400">12.5 TB / 20 TB</td>
                <td className="py-4 text-slate-500">0 Running</td>
                <td className="py-4"><button className="text-[#4A90E2] hover:underline text-xs">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
