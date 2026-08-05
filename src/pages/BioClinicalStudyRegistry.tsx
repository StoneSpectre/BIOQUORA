import React, { useState, useEffect } from 'react';

export default function BioClinicalStudyRegistry() {

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
          <h1 className="text-lg font-semibold text-slate-800 tracking-tight">Clinical Study Registry</h1>
          <span className="text-xs bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-mono">Secure Enterprise Domain</span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-white text-slate-700 text-xs font-medium rounded border border-slate-300 hover:bg-slate-50 transition">Export Registry</button>
          <button className="px-3 py-1.5 bg-[#0052CC] text-white text-xs font-medium rounded hover:bg-[#0047B3] transition shadow-sm">+ New Study Protocol</button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Filters */}
        <div className="w-64 bg-white border-r border-slate-200 flex flex-col z-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Filters</h2>
            <input type="text" placeholder="Search by Protocol ID..." className="w-full bg-slate-50 border border-slate-200 rounded py-2 px-3 text-sm text-slate-800 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC]" />
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-6">
            
            <div>
              <h3 className="text-xs font-semibold text-slate-700 mb-2">Study Phase</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> Observational (42)</label>
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> Phase I (12)</label>
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> Phase II (8)</label>
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> Phase III (3)</label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-slate-700 mb-2">Compliance Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> IRB Approved</label>
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> GCP Compliant</label>
                <label className="flex items-center gap-2 text-sm text-slate-600"><input type="checkbox" className="rounded border-slate-300 text-[#0052CC] focus:ring-[#0052CC]" /> HIPAA Aligned</label>
              </div>
            </div>

          </div>
        </div>

        {/* Center: Data Table */}
        <div className="flex-1 flex flex-col bg-slate-50 p-6 overflow-hidden">
          
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-sm font-semibold text-slate-800">Active Studies Overview</h2>
              <div className="text-xs text-slate-500">Showing 1-10 of 65 entries</div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider sticky top-0 border-b border-slate-200 z-10">
                  <tr>
                    <th className="px-6 py-3">Protocol ID</th>
                    <th className="px-6 py-3">Study Title</th>
                    <th className="px-6 py-3">Phase / Type</th>
                    <th className="px-6 py-3">PI</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Compliance</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  
                  <tr className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-[#0052CC]">BC-ONC-2026-01</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">Longitudinal Biomarker Analysis in NSCLC</div>
                      <div className="text-xs text-slate-500 truncate max-w-[250px]">Evaluating predictive value of ctDNA clearance dynamics...</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Observational</td>
                    <td className="px-6 py-4 text-slate-600">Dr. E. Chen</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Enrolling
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500 bg-slate-50" title="IRB Approved">IRB</span>
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500 bg-slate-50" title="HIPAA Aligned">HIPAA</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0052CC] hover:text-[#003d99] text-xs font-medium">View Workspace</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-[#0052CC]">BC-IMM-2025-42</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">Autoimmune Cohort Phenotyping Study</div>
                      <div className="text-xs text-slate-500 truncate max-w-[250px]">Multi-omic profiling of early-onset Rheumatoid Arthritis...</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Phase II</td>
                    <td className="px-6 py-4 text-slate-600">Dr. M. Rossi</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Data Lock
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500 bg-slate-50" title="IRB Approved">IRB</span>
                        <span className="px-1.5 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-500 bg-slate-50" title="GCP Compliant">GCP</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0052CC] hover:text-[#003d99] text-xs font-medium">View Workspace</button>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition bg-rose-50/30">
                    <td className="px-6 py-4 font-mono text-xs text-[#0052CC]">BC-CV-2026-11</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800 flex items-center gap-2">
                        Cardiovascular Risk AI Prediction Model
                        <span className="px-1.5 py-0.5 bg-rose-100 text-rose-700 text-[10px] rounded font-bold">ACTION REQUIRED</span>
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[250px]">Validation of deep learning risk scores on EHR data...</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">Retrospective</td>
                    <td className="px-6 py-4 text-slate-600">Dr. J. Smith</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Draft
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-1">
                        <span className="px-1.5 py-0.5 rounded border border-rose-200 text-[10px] font-medium text-rose-600 bg-rose-50 border-dashed" title="Pending Ethics Approval">IRB PENDING</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0052CC] hover:text-[#003d99] text-xs font-medium">Review Protocol</button>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            {/* Pagination Mockup */}
            <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex justify-between items-center">
              <button className="px-3 py-1 bg-white border border-slate-300 text-slate-600 text-xs rounded hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <div className="text-xs text-slate-500">Page 1 of 7</div>
              <button className="px-3 py-1 bg-white border border-slate-300 text-slate-600 text-xs rounded hover:bg-slate-50">Next</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
