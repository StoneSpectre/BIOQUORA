import React, { useState, useEffect } from 'react';

export default function BioConnectCommunity() {

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
        <header className="mb-10 flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-wide">Scientific Communities</h1>
            <p className="text-xs text-slate-500 font-mono mt-1">Discover Labs, Grants, and Open Discussions</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <input type="text" placeholder="Search communities..." className="bg-[#0A1020] border border-slate-700 rounded-full py-1.5 pl-4 pr-10 text-sm text-white focus:outline-none focus:border-[#4A90E2]" />
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex gap-4 mb-4">
              <button className="px-4 py-1.5 bg-[#4A90E2] text-white text-sm rounded-full font-medium">All Activity</button>
              <button className="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700">Grants</button>
              <button className="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700">Conferences</button>
              <button className="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-full hover:bg-slate-700">Discussions</button>
            </div>

            {/* Post 1 */}
            <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-[#1e293b] flex items-center justify-center text-sm font-medium text-white">NIH</div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">National Institutes of Health</h3>
                    <p className="text-xs text-slate-500 font-mono">Grant Opportunity • 2h ago</p>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-white">...</button>
              </div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-[#4A90E2] mb-2">R01: AI-Driven Therapeutics for Rare Diseases</h4>
                <p className="text-sm text-slate-400 mb-3">We are announcing a $2.5M funding opportunity for federated AI models predicting novel therapeutic targets in rare genetic disorders.</p>
                <div className="bg-[#050A15] border border-slate-800 rounded p-3 text-xs font-mono text-slate-300 flex justify-between">
                  <span>Deadline: Dec 1, 2026</span>
                  <span className="text-amber-400">Collaboration encouraged</span>
                </div>
              </div>
              <div className="flex gap-4 border-t border-slate-800 pt-3">
                <button className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">🔖 Save Grant</button>
                <button className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">🤝 Find Collaborators</button>
              </div>
            </div>

            {/* Post 2 */}
            <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded bg-purple-900/50 flex items-center justify-center text-sm font-medium text-purple-400">CB</div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-200">Cancer Biology Network</h3>
                    <p className="text-xs text-slate-500 font-mono">Discussion • 5h ago</p>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-300 mb-3">Does anyone have experience fine-tuning foundation models on spatial transcriptomics data? I'm running into severe overfitting issues on the Visium datasets.</p>
              </div>
              <div className="flex gap-4 border-t border-slate-800 pt-3">
                <button className="text-xs text-[#4A90E2] flex items-center gap-1">💬 14 Replies</button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5">
              <h3 className="text-sm font-mono text-slate-500 uppercase mb-4">Recommended Communities</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg">🧬</span>
                    <div>
                      <div className="text-sm text-slate-200">Synthetic Biology</div>
                      <div className="text-xs text-slate-500">12.4k Members</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-slate-800 text-xs rounded hover:bg-slate-700">Join</button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="text-lg">🖥️</span>
                    <div>
                      <div className="text-sm text-slate-200">Medical AI & LLMs</div>
                      <div className="text-xs text-slate-500">45.1k Members</div>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-slate-800 text-xs rounded hover:bg-slate-700">Join</button>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A1020] border border-slate-800 rounded-xl p-5 border-l-4 border-l-amber-500">
              <h3 className="text-sm font-medium text-slate-200 mb-2">Upcoming Virtual Conference</h3>
              <p className="text-xs text-slate-400 mb-3">BioConnect Summit 2026: AI in Drug Discovery</p>
              <button className="w-full py-2 bg-amber-500/10 text-amber-500 text-xs font-mono rounded hover:bg-amber-500/20">Register Now</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
