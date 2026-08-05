import React, { useState, useEffect } from 'react';

export default function BioConnectReputation() {

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
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-light text-white mb-2">BioReputation Engine</h1>
          <p className="text-sm text-slate-500 font-mono">AI-Inferred Expertise • Reproducibility Tracking • Impact Analysis</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Score Card */}
          <div className="lg:col-span-1 bg-[#0A1020] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-b from-[#4A90E2]/10 to-transparent"></div>
            <h2 className="text-sm font-mono text-slate-400 uppercase tracking-widest mb-6 relative z-10">Global Score</h2>
            <div className="w-40 h-40 rounded-full border-8 border-slate-800 flex items-center justify-center relative z-10 mb-4 shadow-[0_0_30px_rgba(74,144,226,0.15)]">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="50%" cy="50%" r="46%" fill="none" stroke="#4A90E2" strokeWidth="8" strokeDasharray="100 100" strokeDashoffset="2" pathLength="100" className="opacity-90" strokeLinecap="round" />
              </svg>
              <div className="text-center">
                <div className="text-5xl font-light text-white">98</div>
                <div className="text-xs text-[#4A90E2] font-mono mt-1">Top 1%</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center relative z-10 mt-2">Calculated from 420 data points across the Knowledge Graph.</p>
          </div>

          {/* Metrics Breakdown */}
          <div className="lg:col-span-2 bg-[#0A1020] border border-slate-800 rounded-xl p-6">
            <h2 className="text-sm font-mono text-slate-400 uppercase mb-6">Impact Vectors</h2>
            <div className="space-y-6">
              {[
                { label: 'Publication Quality & Citation Network', val: 95, color: 'bg-blue-500' },
                { label: 'Dataset Reuse & Open Science', val: 99, color: 'bg-green-500' },
                { label: 'Code & Model Adoption', val: 88, color: 'bg-purple-500' },
                { label: 'Peer Review & Community Mentorship', val: 92, color: 'bg-amber-500' },
                { label: 'Experimental Reproducibility Index', val: 97, color: 'bg-rose-500' }
              ].map((metric, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{metric.label}</span>
                    <span className="font-mono text-slate-500">{metric.val}/100</span>
                  </div>
                  <div className="w-full bg-[#050A15] h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className={`${metric.color} h-full`} style={{ width: `${metric.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-6">
          <h2 className="text-sm font-mono text-slate-400 uppercase mb-6">AI-Inferred Expertise Graph</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { topic: 'CRISPR-Cas9', conf: '99% Confident', evidence: '40 Papers, 2 Models' },
              { topic: 'Transcriptomics', conf: '94% Confident', evidence: '18 Papers, 5 Datasets' },
              { topic: 'Protein Folding', conf: '88% Confident', evidence: '12 Papers, 1 Model' },
              { topic: 'Clinical Trials', conf: '72% Confident', evidence: '3 Projects' }
            ].map((node, i) => (
              <div key={i} className="bg-[#050A15] border border-slate-800 p-4 rounded text-center">
                <div className="text-slate-200 font-medium mb-1">{node.topic}</div>
                <div className="text-xs text-green-400 font-mono mb-2">{node.conf}</div>
                <div className="text-xs text-slate-500 border-t border-slate-800 pt-2">{node.evidence}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
