import React, { useState, useEffect } from 'react';

export default function BioAssistantWriting() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8">
      
      <div className="max-w-[1400px] mx-auto">
        
        <header className="mb-6 border-b border-slate-800 pb-4">
          <h1 className="text-xl font-bold text-white tracking-wider flex items-center gap-3 font-mono uppercase">
             <span className="text-green-500">✍️</span> BioAssistant LaTeX Co-Author
          </h1>
        </header>

        {/* Overleaf-Style Split Interface */}
        <div className="flex gap-4 h-[750px]">
           
           {/* Sidebar: AI Suggestions */}
           <div className="w-64 bg-[#0a0a0a] border border-slate-800 rounded-lg p-4 font-mono text-xs flex flex-col gap-4">
              <div className="font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">AI Copilot</div>
              
              <div className="bg-green-950/20 border border-green-900/30 p-3 rounded">
                 <strong className="text-green-400">Section Suggestion:</strong>
                 <p className="text-[10px] text-slate-400 mt-1 font-sans">You haven't mentioned the statistical method used for the survival curve. Should I insert a sentence about the Kaplan-Meier estimator?</p>
                 <button className="mt-2 text-[10px] bg-green-900/50 text-green-400 px-2 py-1 rounded">Insert LaTeX</button>
              </div>

              <div className="bg-[#111] border border-slate-800 p-3 rounded">
                 <strong className="text-slate-300">Format Check:</strong>
                 <p className="text-[10px] text-slate-400 mt-1 font-sans">Nature Methods formatting requires references in superscript. BioValidator has auto-corrected 4 citations.</p>
              </div>
           </div>

           {/* Middle: LaTeX Editor */}
           <div className="flex-1 bg-[#1e1e1e] border border-slate-800 rounded-lg overflow-hidden flex flex-col font-mono text-sm shadow-2xl relative">
              <div className="bg-[#2d2d2d] text-slate-400 px-4 py-2 border-b border-black text-xs flex justify-between">
                 <span>main.tex</span>
                 <span className="text-green-400">Autosaved</span>
              </div>
              <div className="p-4 overflow-y-auto text-slate-300 leading-relaxed flex-1">
                 <div className="flex">
                    <div className="text-slate-600 select-none pr-4 text-right w-8 border-r border-slate-700 mr-4">12<br/>13<br/>14<br/>15<br/>16</div>
                    <div className="w-full">
                       <span className="text-pink-400">\section</span>&#123;Methods&#125;<br/><br/>
                       <span className="text-pink-400">\subsection</span>&#123;Statistical Analysis&#125;<br/>
                       Survival analysis was performed using the Kaplan-Meier method, and differences between cohorts were evaluated using the log-rank test. <br/>
                       <div className="bg-green-900/30 border-l-2 border-green-500 -ml-2 pl-2 my-1 text-green-200">
                          Cox proportional-hazards models were used to estimate hazard ratios (HR) and 95\% confidence intervals (CI).
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: Live PDF Preview (Simulated) */}
           <div className="flex-1 bg-[#f5f5f5] rounded-lg shadow-inner overflow-hidden flex flex-col relative">
              <div className="bg-slate-300 px-4 py-2 flex justify-between items-center border-b border-slate-400 text-xs text-slate-700 font-bold">
                 <span>Preview (PDF)</span>
                 <div className="flex gap-2">
                    <button className="bg-white px-2 py-1 rounded shadow-sm hover:bg-slate-50">Compile</button>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded shadow-sm hover:bg-blue-700">Download</button>
                 </div>
              </div>
              
              <div className="flex-1 p-12 overflow-y-auto text-black font-serif text-sm leading-relaxed">
                 <h2 className="text-xl font-bold mb-4 font-sans border-b border-slate-300 pb-2">3. Methods</h2>
                 
                 <h3 className="text-lg font-bold mb-2 font-sans mt-4">3.1 Statistical Analysis</h3>
                 <p className="mb-4">
                    Survival analysis was performed using the Kaplan-Meier method, and differences between cohorts were evaluated using the log-rank test. <span className="bg-green-200">Cox proportional-hazards models were used to estimate hazard ratios (HR) and 95% confidence intervals (CI).</span>
                 </p>
                 
                 <div className="w-full h-48 border border-slate-400 bg-white flex items-center justify-center mt-6 text-slate-400 font-sans">
                    [Figure 1 Placeholder: Kaplan-Meier Survival Curve]
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
