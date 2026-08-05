import React from 'react';

export default function AIEvaluation() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">AI Benchmark Platform</h1>
            <p className="text-slate-400">Standardized evaluation across biological and clinical datasets.</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 transition">View Model Cards</button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-6 text-white flex justify-between">
              <span>TCGA Benchmark Suite</span>
              <span className="text-[#6B7FD4] text-sm">v1.4.2</span>
            </h2>
            <div className="space-y-4">
              {[
                { metric: 'Accuracy', val: '94.2%', w: '94%' },
                { metric: 'Precision', val: '91.8%', w: '91%' },
                { metric: 'Recall', val: '95.1%', w: '95%' },
                { metric: 'F1-Score', val: '0.93', w: '93%' }
              ].map((m, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">{m.metric}</span>
                    <span className="text-[#00C2A8] font-mono">{m.val}</span>
                  </div>
                  <div className="w-full bg-[#0A0F1E] rounded-full h-2">
                    <div className="bg-[#00C2A8] h-2 rounded-full" style={{ width: m.w }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-6 text-white">Calibration & Uncertainty</h2>
            <div className="aspect-video bg-[#050D18] border border-slate-800 rounded flex items-center justify-center text-slate-500 text-sm">
              [ Calibration Curve Visualization ]
            </div>
            <p className="text-xs text-slate-400 mt-4 text-center">Expected Calibration Error (ECE): 0.042</p>
          </div>
        </div>
      </div>
    </div>
  );
}
