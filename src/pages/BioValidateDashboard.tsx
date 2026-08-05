import React, { useState, useEffect } from 'react';

export default function BioValidateDashboard() {

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
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">BioValidate Dashboard</h1>
            <p className="text-slate-400">Scientific Certification & Quality Assurance Gate</p>
          </div>
          <button className="px-4 py-2 bg-[#00C2A8] text-[#0A0F1E] rounded font-medium hover:bg-[#00a892] transition">Run Full Validation</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Biological Validation', status: 'Passed', icon: '🧬', color: 'text-green-400' },
            { title: 'Statistical Rigor', status: 'Passed', icon: '📊', color: 'text-green-400' },
            { title: 'AI Benchmarks', status: 'Under Review', icon: '🤖', color: 'text-amber-400' }
          ].map((card, i) => (
            <div key={i} className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{card.icon}</div>
                <div className={`text-xs px-2 py-1 rounded bg-[#0A0F1E] border border-slate-800 ${card.color}`}>{card.status}</div>
              </div>
              <h3 className="text-lg font-medium text-white">{card.title}</h3>
            </div>
          ))}
        </div>

        <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#050D18]">
            <h2 className="font-medium text-[#6B7FD4]">Recent Certification Requests</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-[#0A0F1E] text-slate-400">
              <tr>
                <th className="p-4 font-medium border-b border-slate-800">Component</th>
                <th className="p-4 font-medium border-b border-slate-800">Domain</th>
                <th className="p-4 font-medium border-b border-slate-800">AUROC / Score</th>
                <th className="p-4 font-medium border-b border-slate-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="p-4 text-white">BioProtein-Fold v2</td>
                <td className="p-4 text-slate-400">Proteomics</td>
                <td className="p-4 text-green-400">0.96</td>
                <td className="p-4"><span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">Certified</span></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="p-4 text-white">CardioRisk Predictor</td>
                <td className="p-4 text-slate-400">Clinical</td>
                <td className="p-4 text-amber-400">0.82</td>
                <td className="p-4"><span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded">Pending Expert Review</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
