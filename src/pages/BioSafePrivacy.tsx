import React, { useState, useEffect } from 'react';

export default function BioSafePrivacy() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 font-mono">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
               <span className="text-fuchsia-500">🔒</span> HIPAA Privacy Engine
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-sans">
               Automated PHI redaction, de-identification, and Prompt Guarding.
            </p>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-1.5 bg-fuchsia-950/40 text-fuchsia-400 border border-fuchsia-900 rounded font-bold text-xs uppercase hover:bg-fuchsia-900/50">Configure Regex</button>
          </div>
        </header>

        <div className="flex gap-8">
           
           {/* Interactive Prompt Guard Demo */}
           <div className="flex-1 bg-[#0a0a0a] border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[60px]"></div>
              
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                 <span className="text-fuchsia-500">●</span> Live Prompt Inspection
              </h3>
              
              <div className="space-y-6 relative z-10">
                 
                 {/* Raw Input */}
                 <div>
                    <label className="text-xs text-slate-500 uppercase tracking-widest mb-2 block">Raw Inbound Prompt (from Researcher)</label>
                    <div className="bg-[#111] border border-slate-700 rounded-lg p-4 text-sm text-slate-300 font-serif leading-relaxed">
                       Patient <strong>John Doe</strong>, DOB <strong>04/12/1982</strong>, MRN <strong>99827361</strong> presented to Mass General on Tuesday. 
                       Analyze these blood test results and suggest a treatment plan.
                    </div>
                 </div>

                 {/* Processing Pipeline Animation (Static representation) */}
                 <div className="flex justify-center my-4 text-fuchsia-500">
                    <div className="flex flex-col items-center">
                       <span className="text-xl">↓</span>
                       <span className="text-[10px] font-bold uppercase tracking-widest bg-fuchsia-950 px-2 py-1 rounded">BioSafe De-Identification Engine</span>
                       <span className="text-xl">↓</span>
                    </div>
                 </div>

                 {/* Scrubbed Output */}
                 <div>
                    <label className="text-xs text-fuchsia-400 uppercase tracking-widest mb-2 block">Scrubbed Prompt (Sent to BioFoundation LLM)</label>
                    <div className="bg-black border-2 border-fuchsia-900/50 rounded-lg p-4 text-sm text-slate-300 font-serif leading-relaxed shadow-[0_0_20px_rgba(217,70,239,0.1)]">
                       Patient <span className="bg-fuchsia-900/50 text-fuchsia-200 px-1 rounded cursor-not-allowed select-none border border-fuchsia-700">[NAME_REDACTED]</span>, 
                       DOB <span className="bg-fuchsia-900/50 text-fuchsia-200 px-1 rounded cursor-not-allowed select-none border border-fuchsia-700">[DATE_REDACTED]</span>, 
                       MRN <span className="bg-fuchsia-900/50 text-fuchsia-200 px-1 rounded cursor-not-allowed select-none border border-fuchsia-700">[ID_REDACTED]</span> presented to 
                       <span className="bg-fuchsia-900/50 text-fuchsia-200 px-1 rounded cursor-not-allowed select-none border border-fuchsia-700">[ORG_REDACTED]</span> on Tuesday. 
                       Analyze these blood test results and suggest a treatment plan.
                    </div>
                 </div>

              </div>

           </div>

           {/* Metrics Pane */}
           <div className="w-80 flex flex-col gap-6">
              
              <div className="bg-[#111] border border-slate-800 rounded-xl p-5">
                 <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">PHI Detection Stats (24h)</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                       <span className="text-sm text-slate-300">Names Blocked</span>
                       <span className="text-fuchsia-400 font-bold">14,203</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                       <span className="text-sm text-slate-300">MRNs Blocked</span>
                       <span className="text-fuchsia-400 font-bold">8,921</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-sm text-slate-300">Dates Modified</span>
                       <span className="text-fuchsia-400 font-bold">22,105</span>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
