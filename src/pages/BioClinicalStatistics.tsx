import React, { useState, useEffect } from 'react';

export default function BioClinicalStatistics() {

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
          <h1 className="text-lg font-semibold text-slate-800 tracking-tight">Statistical Analysis Engine</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">Study: BC-ONC-2026-01</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 transition">Generate CSR (Report)</button>
          <button className="px-3 py-1.5 bg-[#0052CC] text-white text-xs font-medium rounded hover:bg-[#0047B3] transition shadow-sm flex items-center gap-2">
            Run Analysis <span className="text-[10px] bg-blue-400/30 px-1 rounded">Ctrl+Enter</span>
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Data Dictionary & Models */}
        <div className="w-72 bg-white border-r border-slate-200 flex flex-col z-0">
          
          <div className="p-4 border-b border-slate-100 bg-slate-50">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Analysis Type</h2>
            <select className="w-full bg-white border border-slate-300 rounded px-2 py-1.5 text-sm text-slate-800 focus:outline-none focus:border-[#0052CC]">
              <option>Cox Proportional Hazards (Survival)</option>
              <option>Kaplan-Meier Estimator</option>
              <option>Logistic Regression</option>
              <option>Linear Mixed-Effects Model</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Model Variables</h2>
              
              <div className="space-y-4">
                
                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-1">Time Variable (T)</div>
                  <div className="bg-slate-50 border border-slate-200 p-2 rounded text-sm text-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-300">
                    <span className="font-mono">OS_MONTHS</span>
                    <span className="text-xs text-slate-400 font-mono">Continuous</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-1">Event Variable (E)</div>
                  <div className="bg-slate-50 border border-slate-200 p-2 rounded text-sm text-slate-800 flex justify-between items-center group cursor-pointer hover:border-blue-300">
                    <span className="font-mono">DEATH_EVENT</span>
                    <span className="text-xs text-slate-400 font-mono">Binary (0,1)</span>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500 font-semibold mb-1">Covariates (X)</div>
                  <div className="space-y-2 border-2 border-dashed border-slate-200 p-2 rounded min-h-[100px] bg-slate-50/50">
                    <div className="bg-white border border-slate-200 p-1.5 rounded text-xs text-slate-800 flex justify-between items-center shadow-sm">
                      <span className="font-mono">ctDNA_CLEARED_W4</span>
                      <button className="text-slate-400 hover:text-rose-500">✕</button>
                    </div>
                    <div className="bg-white border border-slate-200 p-1.5 rounded text-xs text-slate-800 flex justify-between items-center shadow-sm">
                      <span className="font-mono">AGE_AT_DX</span>
                      <button className="text-slate-400 hover:text-rose-500">✕</button>
                    </div>
                    <div className="bg-white border border-slate-200 p-1.5 rounded text-xs text-slate-800 flex justify-between items-center shadow-sm">
                      <span className="font-mono">PDL1_TPS_CAT</span>
                      <button className="text-slate-400 hover:text-rose-500">✕</button>
                    </div>
                    <div className="text-center pt-2">
                      <button className="text-xs font-medium text-[#0052CC]">+ Drag or Add Variables</button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>

        {/* Center: Output & Results */}
        <div className="flex-1 bg-slate-100 overflow-y-auto p-6 flex flex-col gap-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Cox Proportional Hazards Model</h2>
                <p className="text-sm text-slate-500">N = 452 (Number of events: 184)</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-50 text-emerald-700 text-xs font-mono font-medium border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Convergence Reached
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">Covariate</th>
                    <th className="px-4 py-3">coef</th>
                    <th className="px-4 py-3">exp(coef) [HR]</th>
                    <th className="px-4 py-3">se(coef)</th>
                    <th className="px-4 py-3">z</th>
                    <th className="px-4 py-3 font-bold text-slate-700">p-value</th>
                    <th className="px-4 py-3">95% CI</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-4 py-3 font-mono font-medium text-slate-800">ctDNA_CLEARED_W4 (Yes)</td>
                    <td className="px-4 py-3 font-mono text-slate-600">-0.842</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0052CC]">0.431</td>
                    <td className="px-4 py-3 font-mono text-slate-500">0.152</td>
                    <td className="px-4 py-3 font-mono text-slate-500">-5.539</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">&lt; 0.001 ***</td>
                    <td className="px-4 py-3 font-mono text-slate-500">[0.32, 0.58]</td>
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="px-4 py-3 font-mono font-medium text-slate-800">AGE_AT_DX</td>
                    <td className="px-4 py-3 font-mono text-slate-600">0.015</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">1.015</td>
                    <td className="px-4 py-3 font-mono text-slate-500">0.008</td>
                    <td className="px-4 py-3 font-mono text-slate-500">1.875</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-700">0.061 .</td>
                    <td className="px-4 py-3 font-mono text-slate-500">[0.99, 1.03]</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono font-medium text-slate-800">PDL1_TPS_CAT (&gt;50%)</td>
                    <td className="px-4 py-3 font-mono text-slate-600">-0.310</td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0052CC]">0.733</td>
                    <td className="px-4 py-3 font-mono text-slate-500">0.145</td>
                    <td className="px-4 py-3 font-mono text-slate-500">-2.138</td>
                    <td className="px-4 py-3 font-mono font-bold text-emerald-600">0.032 *</td>
                    <td className="px-4 py-3 font-mono text-slate-500">[0.55, 0.97]</td>
                  </tr>
                </tbody>
              </table>
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
                <span>Concordance Index: 0.724</span>
                <span>Log-likelihood ratio test: 45.2 on 3 df, p &lt; 0.001</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div className="text-sm text-slate-800">
                <strong>AI Statistical Interpretation:</strong> Clearance of ctDNA at week 4 is strongly associated with improved overall survival. Patients achieving clearance have a 56.9% reduction in the hazard of death compared to those who do not, adjusting for age and PD-L1 status (HR = 0.431, 95% CI: 0.32 - 0.58, p &lt; 0.001). The proportional hazards assumption was verified via Schoenfeld residuals (p = 0.42).
              </div>
            </div>
          </div>
          
          {/* Visualizations Panel */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 flex flex-col items-center justify-center min-h-[400px]">
             <div className="text-sm font-semibold text-slate-800 mb-6 self-start">Adjusted Survival Curves (ctDNA Clearance)</div>
             <div className="relative w-full max-w-2xl aspect-video border-l-2 border-b-2 border-slate-800">
                {/* Mock Graph */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                  {/* Cleared curve */}
                  <path d="M 0 10 L 10 12 L 20 15 L 30 18 L 40 22 L 50 25 L 60 28 L 70 30 L 80 32 L 90 35 L 100 35" fill="none" stroke="#0052CC" strokeWidth="1.5" />
                  {/* Not cleared curve */}
                  <path d="M 0 10 L 10 20 L 20 35 L 30 50 L 40 65 L 50 75 L 60 82 L 70 88 L 80 92 L 90 95 L 100 97" fill="none" stroke="#E11D48" strokeWidth="1.5" />
                </svg>
                {/* Legend */}
                <div className="absolute top-4 right-4 bg-white border border-slate-200 p-2 rounded text-xs shadow-sm">
                  <div className="flex items-center gap-2 mb-1"><span className="w-3 h-0.5 bg-[#0052CC]"></span> ctDNA Cleared (W4)</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-0.5 bg-rose-600"></span> ctDNA Not Cleared</div>
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-slate-600">Time (Months)</div>
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-semibold text-slate-600">Survival Probability</div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
