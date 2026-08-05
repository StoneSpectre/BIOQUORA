import React, { useState, useEffect } from 'react';

export default function BioCloudConsole() {

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
        <header className="mb-10 flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">BioCloud Enterprise Console</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">us-east-1 | Global Control Plane v1.0.0</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-1.5 bg-slate-800 text-xs font-mono text-white rounded border border-slate-700 hover:bg-slate-700">Deploy Resource</button>
            <div className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-mono rounded">System Status: OK</div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Orgs', val: '142' },
            { label: 'Total Projects', val: '1,059' },
            { label: 'Current Billing ($/hr)', val: '$4,290' },
            { label: 'Global API Requests', val: '8.4M/s' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1020] border border-slate-800 p-5 rounded-lg shadow-sm">
              <div className="text-xs text-slate-500 uppercase tracking-wider mb-2 font-mono">{stat.label}</div>
              <div className="text-2xl text-white font-light">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0A1020] border border-slate-800 rounded-lg p-6">
            <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-mono">Organization Registry</h2>
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500 border-b border-slate-800 uppercase font-mono">
                <tr>
                  <th className="pb-2 font-normal">Org ID</th>
                  <th className="pb-2 font-normal">Name</th>
                  <th className="pb-2 font-normal">Plan</th>
                  <th className="pb-2 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="py-3 font-mono text-[#4A90E2]">org-x89a</td>
                  <td className="py-3 text-slate-200">Stanford Medicine</td>
                  <td className="py-3 text-slate-400">Enterprise</td>
                  <td className="py-3"><span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>Active</td>
                </tr>
                <tr className="hover:bg-slate-800/20 transition">
                  <td className="py-3 font-mono text-[#4A90E2]">org-b22c</td>
                  <td className="py-3 text-slate-200">Global Pharma Inc.</td>
                  <td className="py-3 text-slate-400">Dedicated</td>
                  <td className="py-3"><span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2"></span>Active</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-[#0A1020] border border-slate-800 rounded-lg p-6">
            <h2 className="text-sm uppercase tracking-wider text-slate-400 mb-4 font-mono">AIOps Insights</h2>
            <div className="space-y-4">
              <div className="p-4 border border-blue-900/30 bg-blue-900/10 rounded">
                <div className="text-sm text-blue-400 font-medium mb-1">Scale-Down Recommendation</div>
                <div className="text-xs text-slate-400">Cluster `gpu-pool-eu` is underutilized. Recommended to spin down 40x A100 nodes to save $1,200/hr.</div>
              </div>
              <div className="p-4 border border-amber-900/30 bg-amber-900/10 rounded">
                <div className="text-sm text-amber-400 font-medium mb-1">Storage Tiering Alert</div>
                <div className="text-xs text-slate-400">12 PB of genomics data in Workspace-7 hasn't been accessed in 90 days. Move to Cold Archive?</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
