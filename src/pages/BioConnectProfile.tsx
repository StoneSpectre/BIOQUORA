import React, { useState, useEffect } from 'react';

export default function BioConnectProfile() {

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
      <div className="max-w-6xl mx-auto flex gap-8">
        
        {/* Left Column: Dossier */}
        <div className="w-1/3 shrink-0 space-y-6">
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl overflow-hidden shadow-lg">
            <div className="h-24 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-b border-slate-800"></div>
            <div className="px-6 pb-6 relative">
              <div className="w-20 h-20 rounded-xl bg-[#1e293b] border-4 border-[#0A1020] absolute -top-10 flex items-center justify-center text-2xl text-slate-400">
                SC
              </div>
              <div className="pt-12">
                <h1 className="text-xl font-medium text-white mb-1">Dr. Sarah Chen</h1>
                <p className="text-sm text-[#4A90E2] mb-3">Principal Investigator, Genomics</p>
                <p className="text-sm text-slate-400 flex items-center gap-2 mb-4">
                  <span>🏛️ Stanford University</span>
                </p>
                <div className="flex gap-2 text-xs font-mono mb-4">
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">CRISPR</span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Oncology</span>
                  <span className="px-2 py-1 bg-slate-800 rounded border border-slate-700">Deep Learning</span>
                </div>
                <div className="pt-4 border-t border-slate-800 flex gap-4">
                  <button className="flex-1 py-1.5 bg-[#4A90E2] text-white rounded text-sm hover:bg-blue-600 transition">Message</button>
                  <button className="flex-1 py-1.5 bg-slate-800 text-white rounded border border-slate-700 text-sm hover:bg-slate-700 transition">Collaborate</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-6">
            <h2 className="text-xs font-mono text-slate-500 uppercase mb-4">AI Research Portfolio</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 border border-slate-800 rounded bg-[#050A15]">
                <div className="text-2xl text-white font-light">142</div>
                <div className="text-xs text-slate-500 font-mono">Publications</div>
              </div>
              <div className="text-center p-3 border border-slate-800 rounded bg-[#050A15]">
                <div className="text-2xl text-white font-light">12</div>
                <div className="text-xs text-slate-500 font-mono">Datasets</div>
              </div>
              <div className="text-center p-3 border border-slate-800 rounded bg-[#050A15]">
                <div className="text-2xl text-white font-light">4</div>
                <div className="text-xs text-slate-500 font-mono">AI Models</div>
              </div>
              <div className="text-center p-3 border border-slate-800 rounded bg-[#050A15]">
                <div className="text-2xl text-white font-light">8</div>
                <div className="text-xs text-slate-500 font-mono">Grants</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Timeline & Feed */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl">🤖</div>
            <h2 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <span className="text-[#4A90E2]">BioAssistant Summary</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Dr. Chen's recent work focuses on integrating multi-modal genomic data with transformer architectures to predict CRISPR off-target effects. Her latest model, <em>CRISPR-Trans</em>, has seen high adoption across the BioConnect network with 4.2k downloads this month. She is actively seeking collaborators for an upcoming NIH grant on rare disease therapeutics.
            </p>
          </div>

          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-2">
              <h2 className="text-sm font-mono text-slate-400 uppercase">Interactive Scientific Timeline</h2>
              <select className="bg-transparent text-xs text-slate-500 font-mono outline-none">
                <option>All Activity</option>
                <option>Publications</option>
              </select>
            </div>
            
            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-500 bg-[#050A15] text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#050A15] p-4 rounded border border-slate-800 shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-medium text-slate-200 text-sm">Published Nature Paper</div>
                    <time className="font-mono text-xs text-slate-500">Oct 2026</time>
                  </div>
                  <div className="text-xs text-slate-400">"Attention-based prediction of Cas9 binding across human cell lines."</div>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-purple-500 bg-[#050A15] text-purple-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" /></svg>
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#050A15] p-4 rounded border border-slate-800 shadow">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-medium text-slate-200 text-sm">Released Dataset</div>
                    <time className="font-mono text-xs text-slate-500">Aug 2026</time>
                  </div>
                  <div className="text-xs text-slate-400">TCGA Lung Cohort (Multi-omics harmonized). Downloaded 1.2k times.</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
