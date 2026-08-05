import React from 'react';

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Scientific Marketplace</h1>
          <p className="text-slate-400">Discover and deploy reusable AI models, datasets, and pipelines.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['AlphaFold 3 Wrapper', 'Cardio Genomic Dataset', 'Protein Docking Pipeline'].map((item, i) => (
            <div key={i} className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-6 hover:border-[#00C2A8] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded bg-[#1e293b] mb-4 flex items-center justify-center text-[#6B7FD4]">
                {i === 0 ? '🧬' : i === 1 ? '🩸' : '⚙️'}
              </div>
              <h3 className="text-lg font-medium mb-2">{item}</h3>
              <p className="text-sm text-slate-400 mb-4">Official BioUniverse verified asset ready for enterprise deployment.</p>
              <button className="w-full py-2 bg-[#00C2A8]/10 text-[#00C2A8] rounded hover:bg-[#00C2A8]/20 transition">Install Asset</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
