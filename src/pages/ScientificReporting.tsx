import React from 'react';

export default function ScientificReporting() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Scientific Reporting & QA</h1>
            <p className="text-slate-400">Automated evaluation reports, model cards, and continuous monitoring.</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 text-white rounded font-medium hover:bg-slate-700 transition">Download PDF</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-[#6B7FD4]">Continuous QA Status</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-4 bg-[#0A0F1E] rounded border border-slate-800">
                <span>Data Quality Checks</span>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">Passing</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-[#0A0F1E] rounded border border-slate-800">
                <span>Model Drift Detection</span>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">Normal</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-[#0A0F1E] rounded border border-slate-800">
                <span>API Reliability</span>
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">100% Uptime</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-[#6B7FD4]">Published Model Cards</h2>
            <div className="space-y-3">
              <div className="text-sm p-3 bg-[#0A0F1E] border border-slate-800 rounded flex justify-between">
                <span>BioPredict-v2</span>
                <span className="text-[#00C2A8] cursor-pointer">View Card &rarr;</span>
              </div>
              <div className="text-sm p-3 bg-[#0A0F1E] border border-slate-800 rounded flex justify-between">
                <span>GraphRAG QA Engine</span>
                <span className="text-[#00C2A8] cursor-pointer">View Card &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
