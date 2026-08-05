import React, { useState, useEffect } from 'react';

export default function BioCloudCompute() {

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
            <h1 className="text-2xl font-semibold text-white tracking-wide">BioCompute Cluster</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Kubernetes Orchestration | GPU Allocation</p>
          </div>
          <button className="px-4 py-1.5 bg-[#4A90E2] text-xs font-mono text-white rounded hover:bg-blue-600 transition">Provision Node Pool</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active CPU Cores', val: '24,500' },
            { label: 'Allocated GPUs', val: '4,102' },
            { label: 'Running Pods', val: '18,430' },
            { label: 'Network Egress', val: '4.2 TB/s' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0A1020] border border-slate-800 p-4 rounded text-center">
              <div className="text-xs text-slate-500 font-mono mb-1">{stat.label}</div>
              <div className="text-xl text-white">{stat.val}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#0A1020] border border-slate-800 p-6 rounded-lg">
          <h2 className="text-sm text-slate-400 font-mono uppercase tracking-wide mb-4">GPU Clusters (CUDA / ROCm)</h2>
          <table className="w-full text-left text-sm">
            <thead className="text-xs text-slate-500 border-b border-slate-800 uppercase font-mono">
              <tr>
                <th className="pb-2 font-normal">Cluster ID</th>
                <th className="pb-2 font-normal">Region</th>
                <th className="pb-2 font-normal">Hardware</th>
                <th className="pb-2 font-normal">Utilization</th>
                <th className="pb-2 font-normal">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <tr className="hover:bg-slate-800/20 transition">
                <td className="py-4 font-mono text-[#4A90E2]">gpu-pool-us-east</td>
                <td className="py-4 text-slate-300">us-east-1</td>
                <td className="py-4 text-slate-300">NVIDIA H100 (x1024)</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#050A15] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full w-[94%]"></div>
                    </div>
                    <span className="text-xs font-mono">94%</span>
                  </div>
                </td>
                <td className="py-4"><span className="text-green-400 text-xs border border-green-500/20 bg-green-500/10 px-2 py-1 rounded">Healthy</span></td>
              </tr>
              <tr className="hover:bg-slate-800/20 transition">
                <td className="py-4 font-mono text-[#4A90E2]">gpu-pool-eu-west</td>
                <td className="py-4 text-slate-300">eu-west-1</td>
                <td className="py-4 text-slate-300">NVIDIA A100 (x512)</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-[#050A15] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-[42%]"></div>
                    </div>
                    <span className="text-xs font-mono">42%</span>
                  </div>
                </td>
                <td className="py-4"><span className="text-green-400 text-xs border border-green-500/20 bg-green-500/10 px-2 py-1 rounded">Healthy</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
