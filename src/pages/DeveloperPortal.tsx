import React from 'react';

export default function DeveloperPortal() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Developer Portal</h1>
            <p className="text-slate-400">Build, test, and deploy BioUniverse plugins and API integrations.</p>
          </div>
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-medium transition">Generate API Key</button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
              <span className="text-[#6B7FD4]">{'{}'}</span> BioUniverse SDK
            </h2>
            <p className="text-slate-400 mb-6 text-sm">Integrate Bioquora intelligence into your own institutional applications.</p>
            <pre className="bg-[#050D18] p-4 rounded text-sm text-[#00C2A8] font-mono overflow-x-auto">
              npm install @biouniverse/sdk
            </pre>
          </div>
          
          <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-8">
            <h2 className="text-xl font-medium mb-4 text-white flex items-center gap-2">
              <span className="text-[#6B7FD4]">🔌</span> Plugin Framework
            </h2>
            <p className="text-slate-400 mb-6 text-sm">Develop custom data connectors and analysis modules for the marketplace.</p>
            <div className="space-y-2">
              <div className="text-sm p-3 bg-[#050D18] border border-slate-800 rounded flex justify-between">
                <span>Documentation</span>
                <span className="text-[#00C2A8] cursor-pointer">View &rarr;</span>
              </div>
              <div className="text-sm p-3 bg-[#050D18] border border-slate-800 rounded flex justify-between">
                <span>Sandbox Environment</span>
                <span className="text-[#00C2A8] cursor-pointer">Launch &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
