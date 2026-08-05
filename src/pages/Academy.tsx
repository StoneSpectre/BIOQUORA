import React from 'react';

export default function Academy() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Bioquora Academy</h1>
            <p className="text-slate-400">Master biomedical AI through interactive labs and certifications.</p>
          </div>
          <button className="px-4 py-2 bg-[#00C2A8] text-[#0A0F1E] rounded font-medium hover:bg-[#00a892] transition">My Learning</button>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-[#6B7FD4]">Learning Paths</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center p-4 bg-[#0A0F1E] rounded border border-slate-800">
                <span>Introduction to GraphRAG in Genomics</span>
                <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Beginner</span>
              </li>
              <li className="flex justify-between items-center p-4 bg-[#0A0F1E] rounded border border-slate-800">
                <span>Advanced Protein Structure Simulation</span>
                <span className="text-xs bg-[#00C2A8]/20 text-[#00C2A8] px-2 py-1 rounded">Advanced</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-[#6B7FD4]">Virtual Laboratories</h2>
            <div className="aspect-video bg-[#0A0F1E] rounded border border-slate-800 flex items-center justify-center text-slate-500">
              Interactive Lab Environment (Launch Required)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
