import React, { useState, useEffect } from 'react';

export default function BioClinicalProtocolBuilder() {

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
    <div className="h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-slate-800 tracking-tight">Protocol Designer</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">BC-CV-2026-11</span>
            <span>Draft v0.4</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 transition">Save Draft</button>
          <button className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-medium rounded hover:bg-emerald-700 transition shadow-sm">Submit for IRB Review</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Protocol Sections */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Document Outline</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <nav className="space-y-1">
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-50 group">
                1. Study Synopsis
                <span className="text-emerald-500 text-xs">✓</span>
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-50 group">
                2. Objectives & Endpoints
                <span className="text-emerald-500 text-xs">✓</span>
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm font-medium text-[#0052CC] bg-blue-50 rounded-md group">
                3. Eligibility Criteria
                <span className="w-2 h-2 rounded-full bg-[#0052CC]"></span>
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 group">
                4. Study Procedures
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 group">
                5. Statistical Plan
              </a>
              <a href="#" className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-50 group">
                6. Data Management
              </a>
            </nav>
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 bg-slate-50 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            
            <div className="p-8 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">3. Eligibility Criteria</h2>
              <p className="text-sm text-slate-500">Define the characteristics that must be shared by all participants in the study cohort. The AI assistant can help formalize these rules.</p>
            </div>
            
            <div className="p-8 space-y-8">
              
              {/* Inclusion Criteria */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center justify-between">
                  3.1 Inclusion Criteria
                  <button className="text-xs text-[#0052CC] font-medium">+ Add Criterion</button>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg group">
                    <span className="text-slate-400 font-mono text-sm mt-0.5">01</span>
                    <textarea className="flex-1 bg-transparent text-sm text-slate-700 resize-none focus:outline-none focus:ring-0" rows={2} defaultValue="Age >= 18 years and <= 75 years at the time of signing informed consent." />
                    <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition">✕</button>
                  </div>
                  
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg group">
                    <span className="text-slate-400 font-mono text-sm mt-0.5">02</span>
                    <textarea className="flex-1 bg-transparent text-sm text-slate-700 resize-none focus:outline-none focus:ring-0" rows={2} defaultValue="Documented diagnosis of heart failure with reduced ejection fraction (HFrEF) (LVEF ≤ 40%)." />
                    <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition">✕</button>
                  </div>
                </div>
              </div>

              {/* Exclusion Criteria */}
              <div>
                <h3 className="text-sm font-semibold text-slate-800 mb-4 flex items-center justify-between">
                  3.2 Exclusion Criteria
                  <button className="text-xs text-[#0052CC] font-medium">+ Add Criterion</button>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg group relative border-amber-300 bg-amber-50">
                    <span className="text-amber-500 font-mono text-sm mt-0.5">01</span>
                    <div className="flex-1">
                      <textarea className="w-full bg-transparent text-sm text-slate-800 resize-none focus:outline-none focus:ring-0" rows={2} defaultValue="Patients with severe renal impairment." />
                      <div className="mt-2 text-xs text-amber-700 bg-amber-100/50 p-2 rounded flex gap-2 items-start border border-amber-200">
                        <span>⚠️</span>
                        <div>
                          <strong>AI Reviewer Note:</strong> "Severe renal impairment" is ambiguous. Regulatory guidelines recommend specifying an eGFR threshold (e.g., eGFR &lt; 30 mL/min/1.73m²).
                          <div className="mt-1 flex gap-2">
                            <button className="text-[#0052CC] font-medium hover:underline">Accept Suggestion</button>
                            <button className="text-slate-500 hover:underline">Dismiss</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition">✕</button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Sidebar: AI Assistant */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col z-0">
          <div className="p-4 border-b border-slate-100 bg-slate-50/50">
            <h2 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <span className="text-[#0052CC]">✨</span> Clinical AI Assistant
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
            <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg text-slate-700">
              I can help you draft sections, formalize criteria for computable cohorts, or cross-reference the protocol against GCP guidelines.
            </div>
            
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-slate-700">
              <div className="font-semibold text-slate-800 text-xs uppercase mb-1">Literature Context</div>
              Found 3 recent trials investigating HFrEF prognostic models. Would you like me to extract their eligibility criteria for comparison?
              <button className="mt-2 w-full py-1.5 bg-white border border-slate-300 text-xs font-medium rounded text-slate-600 hover:bg-slate-50">Compare Criteria</button>
            </div>
          </div>
          
          <div className="p-3 border-t border-slate-200 bg-slate-50">
             <input type="text" placeholder="Ask assistant to draft or review..." className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-800 focus:outline-none focus:border-[#0052CC]" />
          </div>
        </div>

      </div>
    </div>
  );
}
