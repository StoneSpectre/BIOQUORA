import React, { useState, useEffect } from 'react';

export default function BioInnovationWorkspace() {

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col">
         <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <span className="text-white font-bold tracking-wide flex items-center gap-2">
               <span className="text-teal-400">💡</span> Tech Transfer
            </span>
         </div>
         <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Intellectual Property</div>
            <a href="#" className="block px-6 py-2 text-sm text-white bg-teal-900/50 border-l-4 border-teal-500">Invention Disclosures</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Patent Portfolio</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Trademarks & Copyrights</a>
            
            <div className="px-6 mb-2 mt-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Commercialization</div>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Licensing Opportunities</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Active Agreements (MTAs)</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Royalty Tracking</a>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
         
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
            <h2 className="text-lg font-bold text-slate-800">Invention Disclosures & IP Management</h2>
            <div className="flex gap-3">
               <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded shadow-sm hover:bg-slate-50">Generate Prior Art Report</button>
               <button className="px-4 py-1.5 bg-teal-600 text-white text-sm font-bold rounded shadow hover:bg-teal-700">File New Disclosure</button>
            </div>
         </header>

         <div className="flex-1 overflow-y-auto p-8">
            
            <div className="grid grid-cols-4 gap-6 mb-8">
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Disclosures</div>
                  <div className="text-2xl font-bold text-slate-900">14</div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Patents Pending</div>
                  <div className="text-2xl font-bold text-amber-600">8</div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Patents Granted</div>
                  <div className="text-2xl font-bold text-emerald-600">32</div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Licensing Revenue (YTD)</div>
                  <div className="text-2xl font-bold text-slate-900">$2.4M</div>
               </div>
            </div>

            {/* Invention Pipeline */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                  <div>
                     <h3 className="font-bold text-slate-800">Technology Pipeline</h3>
                     <p className="text-xs text-slate-500 mt-1">Review and process research disclosures into patents or startups.</p>
                  </div>
                  <div className="relative">
                     <input type="text" placeholder="Search technologies..." className="text-sm border border-slate-300 rounded-lg pl-3 pr-10 py-1.5 w-64" />
                     <span className="absolute right-3 top-2 text-slate-400 text-xs">🔍</span>
                  </div>
               </div>
               
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <th className="px-6 py-3 font-bold">Technology / Title</th>
                        <th className="px-6 py-3 font-bold">Lead Inventor</th>
                        <th className="px-6 py-3 font-bold">Stage</th>
                        <th className="px-6 py-3 font-bold">Readiness (TRL)</th>
                        <th className="px-6 py-3 font-bold text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm">
                     
                     <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-800">Novel PROTAC for KRAS G12D</div>
                           <div className="text-xs text-slate-500">ID: INV-2026-084 • BioStudio Project: P1</div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">Dr. James Chen</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded border border-amber-200">Patent Drafting</span></td>
                        <td className="px-6 py-4 font-bold text-slate-600">TRL 3 (Proof of Concept)</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-teal-600 hover:text-teal-800 font-bold text-xs">Review Draft</button>
                        </td>
                     </tr>
                     
                     <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-800">AAV Vector for Retina Delivery</div>
                           <div className="text-xs text-slate-500">ID: INV-2026-041 • BioPublish Paper pending</div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">Dr. Sarah Vance</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded border border-emerald-200">Granted (US-102934)</span></td>
                        <td className="px-6 py-4 font-bold text-slate-600">TRL 5 (Validation)</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-blue-600 hover:text-blue-800 font-bold text-xs">Find Licensees</button>
                        </td>
                     </tr>

                     <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                           <div className="font-bold text-slate-800">Quantum Biomarker Screener</div>
                           <div className="text-xs text-slate-500">ID: INV-2026-112</div>
                        </td>
                        <td className="px-6 py-4 text-slate-700">Dr. Alan Turing</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-200 text-slate-700 text-xs font-bold rounded border border-slate-300">Under Evaluation</span></td>
                        <td className="px-6 py-4 font-bold text-slate-600">TRL 2 (Formulation)</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-teal-600 hover:text-teal-800 font-bold text-xs">Run AI Prior Art</button>
                        </td>
                     </tr>

                  </tbody>
               </table>
            </div>

         </div>
      </div>

    </div>
  );
}
