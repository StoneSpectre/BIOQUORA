import React, { useState, useEffect } from 'react';

export default function BioCloudIAM() {

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
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">Identity & Access Management (IAM)</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Zero-Trust Security | Global Directory</p>
          </div>
          <button className="px-4 py-1.5 bg-[#4A90E2] text-xs font-mono text-white rounded hover:bg-blue-600 transition">Create Service Account</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#0A1020] border border-slate-800 p-6 rounded-lg">
            <h2 className="text-sm text-slate-400 font-mono uppercase tracking-wide mb-4">SSO Providers</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm p-2 bg-[#050A15] border border-slate-800 rounded">
                <span>Microsoft Entra ID</span>
                <span className="text-green-400 text-xs">Connected</span>
              </div>
              <div className="flex justify-between items-center text-sm p-2 bg-[#050A15] border border-slate-800 rounded">
                <span>Okta / SAML</span>
                <span className="text-green-400 text-xs">Connected</span>
              </div>
            </div>
          </div>
          
          <div className="col-span-2 bg-[#0A1020] border border-slate-800 p-6 rounded-lg">
            <h2 className="text-sm text-slate-400 font-mono uppercase tracking-wide mb-4">Security Policies</h2>
            <table className="w-full text-left text-sm">
              <thead className="text-xs text-slate-500 border-b border-slate-800 uppercase font-mono">
                <tr>
                  <th className="pb-2 font-normal">Policy Name</th>
                  <th className="pb-2 font-normal">Target</th>
                  <th className="pb-2 font-normal">Enforcement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                <tr>
                  <td className="py-3 text-slate-200">Require MFA (FIDO2)</td>
                  <td className="py-3 font-mono text-slate-400">All Roles</td>
                  <td className="py-3 text-green-400">Strict</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-200">Restrict API to Corporate IP</td>
                  <td className="py-3 font-mono text-slate-400">Service Accounts</td>
                  <td className="py-3 text-amber-400">Audit Only</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
