import React from 'react';

export default function Reproducibility() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Reproducibility & Explainability</h1>
          <p className="text-slate-400">Guarantee repeatable analyses and transparent feature attributions.</p>
        </header>

        <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl overflow-hidden mb-8">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="font-medium text-white">Execution Provenance</h2>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">Run ID: 8f4a-92b1</span>
          </div>
          <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">Random Seed</div>
              <div className="font-mono text-[#6B7FD4]">42</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">BioUniverse SDK</div>
              <div className="font-mono text-slate-300">v1.0.4</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Dataset Checksum</div>
              <div className="font-mono text-slate-300">a3f9...c12</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Hardware</div>
              <div className="font-mono text-slate-300">NVIDIA A100 x8</div>
            </div>
          </div>
        </div>

        <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4 text-white">Feature Attributions (SHAP/Integrated Gradients)</h2>
          <div className="space-y-3">
            {[
              { feat: 'Gene Expression (BRCA1)', val: '+0.45' },
              { feat: 'Clinical Age', val: '+0.21' },
              { feat: 'Tumor Mutational Burden', val: '+0.15' }
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0A0F1E] border border-slate-800 rounded">
                <span className="text-sm text-slate-300">{f.feat}</span>
                <span className="text-sm text-[#00C2A8] font-mono">{f.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
