import React from 'react';

export default function Governance() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Responsible AI Governance</h1>
          <p className="text-slate-400">Monitor model biases, audit logs, and operational compliance.</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Models Audited', val: '45' },
            { label: 'Bias Reports', val: '2' },
            { label: 'Human Overrides', val: '124' },
            { label: 'System Health', val: '99.9%' }
          ].map((stat, i) => (
            <div key={i} className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-4 text-center">
              <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
              <div className="text-2xl font-bold text-[#00C2A8]">{stat.val}</div>
            </div>
          ))}
        </div>
        
        <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4 text-[#6B7FD4]">Recent Audit Logs</h2>
          <div className="space-y-3">
            {[
              { act: 'Model Version Demoted', res: 'BioPredict-v1 failed clinical parity test', time: '10 mins ago' },
              { act: 'Data Access Approved', res: 'Stanford Medicine team granted read access', time: '1 hour ago' },
              { act: 'Bias Scan Completed', res: 'No significant demographic bias detected in NLP layer', time: '3 hours ago' }
            ].map((log, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-[#0A0F1E] rounded border border-slate-800 text-sm">
                <div>
                  <span className="font-medium text-white">{log.act}: </span>
                  <span className="text-slate-400">{log.res}</span>
                </div>
                <div className="text-slate-500 text-xs">{log.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
