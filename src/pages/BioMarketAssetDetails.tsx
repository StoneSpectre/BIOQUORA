import React, { useState, useEffect } from 'react';

export default function BioMarketAssetDetails() {

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
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900 relative">
              <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8L3N2Zz4=')]"></div>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-3xl font-medium text-white">BioGPT-v3-Enterprise</h1>
                <button className="px-6 py-2 bg-[#4A90E2] text-white rounded font-medium shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition">Deploy to BioCloud</button>
              </div>
              <p className="text-slate-400 mb-6 text-lg">Enterprise-grade LLM fine-tuned on 100M electronic health records for clinical decision support.</p>
              
              <div className="flex gap-6 border-b border-slate-800 pb-4 mb-6 text-sm">
                <span className="text-[#4A90E2] border-b-2 border-[#4A90E2] pb-4 font-medium">Model Card</span>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">Benchmarks</span>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">Reproducibility</span>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer">Discussions</span>
              </div>

              <div className="prose prose-invert max-w-none text-sm text-slate-300">
                <h3 className="text-white text-lg font-medium mb-3">Overview</h3>
                <p className="mb-4">BioGPT-v3 is a domain-specific generative transformer language model pre-trained on large-scale biomedical literature and fine-tuned on de-identified clinical notes. It is designed to assist clinicians in extracting structured data from unstructured EHR text, predicting patient trajectories, and generating discharge summaries.</p>
                
                <h3 className="text-white text-lg font-medium mb-3 mt-6">Intended Use</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Clinical Named Entity Recognition (NER)</li>
                  <li>Medical concept normalization (ICD-10, SNOMED-CT)</li>
                  <li>Clinical trial matching</li>
                </ul>

                <h3 className="text-white text-lg font-medium mb-3 mt-6">Validation & Safety</h3>
                <div className="bg-[#050A15] border border-slate-800 p-4 rounded text-xs font-mono mb-4">
                  <div className="flex items-center gap-2 mb-2"><span className="text-green-400">✓</span> Passed HIPAA PHI Leakage Scan</div>
                  <div className="flex items-center gap-2 mb-2"><span className="text-green-400">✓</span> Toxicity thresholds below 0.01%</div>
                  <div className="flex items-center gap-2"><span className="text-green-400">✓</span> BioValidate 3-stage reproducibility check passed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dense Data Sidebar */}
        <div className="w-80 shrink-0 space-y-6">
          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Asset Metadata</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Version</span>
                <span className="text-slate-200 font-mono">3.0.1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Updated</span>
                <span className="text-slate-200 font-mono">2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Size</span>
                <span className="text-slate-200 font-mono">42.5 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Architecture</span>
                <span className="text-slate-200 font-mono">Llama-3-70B Base</span>
              </div>
              <div className="flex justify-between border-t border-slate-800 pt-3">
                <span className="text-slate-400">Downloads</span>
                <span className="text-slate-200 font-mono">1.2M</span>
              </div>
            </div>
          </div>

          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Licensing & Access</h3>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">⚖️</span>
              <div>
                <div className="text-sm font-medium text-slate-200">Commercial / Enterprise</div>
                <div className="text-xs text-slate-400">Stanford Health License v2</div>
              </div>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">This model is free for academic use. Commercial deployment requires an enterprise license agreement through BioMarket.</p>
            <button className="w-full py-2 bg-slate-800 text-white rounded text-xs hover:bg-slate-700 transition border border-slate-700">Request Commercial License</button>
          </div>

          <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
            <h3 className="text-xs font-mono text-slate-500 uppercase mb-4">Container Requirement</h3>
            <div className="bg-[#050A15] p-3 rounded border border-slate-800 font-mono text-xs text-slate-400">
              $ biomarket pull stanford/biogpt-v3<br/><br/>
              <span className="text-blue-400">Requires:</span><br/>
              NVIDIA A100 (80GB) x2<br/>
              CUDA 12.1+
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
