import React, { useState, useEffect } from 'react';

export default function BioEnterpriseAdmin() {

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
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-slate-300 shrink-0 flex flex-col">
         <div className="h-16 flex items-center px-6 border-b border-slate-800">
            <span className="text-white font-bold tracking-wide flex items-center gap-2">
               <span className="text-blue-500">🛡️</span> Admin Console
            </span>
         </div>
         <div className="flex-1 overflow-y-auto py-6">
            <div className="px-6 mb-2 text-xs font-bold text-slate-500 uppercase tracking-wider">Access & Security</div>
            <a href="#" className="block px-6 py-2 text-sm text-white bg-blue-900/50 border-l-4 border-blue-500">Identity (IAM)</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Role Policies</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Audit Logs</a>
            
            <div className="px-6 mb-2 mt-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Infrastructure</div>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Resource Quotas</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Multi-Tenant Setup</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Disaster Recovery</a>

            <div className="px-6 mb-2 mt-6 text-xs font-bold text-slate-500 uppercase tracking-wider">AI Governance</div>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Model Registry</a>
            <a href="#" className="block px-6 py-2 text-sm hover:text-white">Data Privacy Filters</a>
         </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
         
         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
            <h2 className="text-lg font-bold text-slate-800">Identity & Access Management</h2>
            <div className="flex gap-3">
               <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded shadow-sm hover:bg-slate-50">Sync with Azure AD</button>
               <button className="px-4 py-1.5 bg-blue-600 text-white text-sm font-bold rounded shadow hover:bg-blue-700">Add User</button>
            </div>
         </header>

         <div className="flex-1 overflow-y-auto p-8">
            
            {/* Identity Dashboard Stats */}
            <div className="grid grid-cols-4 gap-6 mb-8">
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Users</div>
                  <div className="text-2xl font-bold text-slate-900">4,192</div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Active Sessions</div>
                  <div className="text-2xl font-bold text-emerald-600">842</div>
               </div>
               <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">MFA Compliance</div>
                  <div className="text-2xl font-bold text-slate-900">99.8%</div>
               </div>
               <div className="bg-white border border-rose-200 rounded-xl p-5 shadow-sm bg-rose-50">
                  <div className="text-rose-600 text-xs font-bold uppercase tracking-wider mb-1">Security Alerts</div>
                  <div className="text-2xl font-bold text-rose-700">3</div>
               </div>
            </div>

            {/* Policy Enforcement View */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-8">
               <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800">Global Data Access Policies (ABAC)</h3>
                  <p className="text-xs text-slate-500 mt-1">Attribute-Based Access Control enforcing HIPAA and PHI protection rules.</p>
               </div>
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                        <th className="px-6 py-3 font-bold">Policy Name</th>
                        <th className="px-6 py-3 font-bold">Condition / Attribute</th>
                        <th className="px-6 py-3 font-bold">Effect</th>
                        <th className="px-6 py-3 font-bold">Status</th>
                     </tr>
                  </thead>
                  <tbody className="text-sm">
                     <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-800">PHI Restrict</td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">resource.tags contains 'PHI' AND user.clearance != 'Clinical'</td>
                        <td className="px-6 py-4 font-bold text-rose-600">DENY</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Enforced</span></td>
                     </tr>
                     <tr className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-800">External IP Block</td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">request.ip NOT IN org.vpn_cidrs</td>
                        <td className="px-6 py-4 font-bold text-rose-600">DENY (BioClinical Only)</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Enforced</span></td>
                     </tr>
                     <tr className="hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-800">LLM Data Masking</td>
                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">ai.prompt contains 'Patient ID'</td>
                        <td className="px-6 py-4 font-bold text-amber-500">REDACT</td>
                        <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">Enforced</span></td>
                     </tr>
                  </tbody>
               </table>
            </div>

         </div>
      </div>

    </div>
  );
}
