import React from 'react';

export default function Collaboration() {
  return (
    <div className="min-h-screen bg-[#0A0F1E] text-slate-200 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-semibold text-[#00C2A8] mb-2">Research Collaboration Network</h1>
            <p className="text-slate-400">Shared workspaces for cross-institutional biomedical research.</p>
          </div>
          <button className="px-4 py-2 bg-[#00C2A8] text-[#0A0F1E] rounded font-medium hover:bg-[#00a892] transition">New Workspace</button>
        </header>
        
        <div className="bg-[#0D1B2A] border border-slate-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#0A0F1E] text-slate-400 text-sm">
              <tr>
                <th className="p-4 font-medium border-b border-slate-800">Workspace</th>
                <th className="p-4 font-medium border-b border-slate-800">Institution</th>
                <th className="p-4 font-medium border-b border-slate-800">Members</th>
                <th className="p-4 font-medium border-b border-slate-800">Status</th>
                <th className="p-4 font-medium border-b border-slate-800">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/30 transition">
                <td className="p-4 font-medium text-white">Oncology Multi-omics Analysis</td>
                <td className="p-4 text-slate-400">Stanford Medicine</td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-600 border border-[#0D1B2A]"></div>
                    <div className="w-6 h-6 rounded-full bg-slate-500 border border-[#0D1B2A]"></div>
                    <div className="w-6 h-6 rounded-full bg-[#6B7FD4] border border-[#0D1B2A] flex items-center justify-center text-[10px]">+3</div>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-green-500/10 text-green-400 rounded text-xs">Active</span></td>
                <td className="p-4"><button className="text-[#00C2A8] hover:underline">Join</button></td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition">
                <td className="p-4 font-medium text-white">CRISPR Off-target Prediction</td>
                <td className="p-4 text-slate-400">Global Consortium</td>
                <td className="p-4">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-slate-600 border border-[#0D1B2A]"></div>
                    <div className="w-6 h-6 rounded-full bg-slate-500 border border-[#0D1B2A]"></div>
                  </div>
                </td>
                <td className="p-4"><span className="px-2 py-1 bg-amber-500/10 text-amber-400 rounded text-xs">Pending Review</span></td>
                <td className="p-4"><button className="text-[#00C2A8] hover:underline">Manage</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
