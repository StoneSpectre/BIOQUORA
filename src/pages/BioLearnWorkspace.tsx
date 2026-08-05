import React, { useState, useEffect } from 'react';

export default function BioLearnWorkspace() {

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
        
        {/* Left: Main Learning Dashboard */}
        <div className="col-span-8 space-y-8">
           
           <header className="flex justify-between items-end border-b border-slate-200 pb-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-800 tracking-tight mb-2">Welcome back, Sarah.</h1>
                <p className="text-slate-500">Your AI-generated learning path for <strong className="text-slate-700">Structural Bioinformatics</strong>.</p>
              </div>
              <div className="text-right">
                 <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Current Goal</div>
                 <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Master GNNs for Drug Discovery</div>
              </div>
           </header>

           {/* Up Next / Active Module */}
           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex gap-6">
              <div className="w-48 h-32 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative group cursor-pointer">
                 <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-indigo-900/20 transition flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg text-indigo-600 pl-1">
                      ▶
                    </div>
                 </div>
                 {/* Placeholder for video thumbnail */}
                 <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center text-4xl">🧬</div>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                 <div className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2">Up Next • Module 4</div>
                 <h2 className="text-xl font-bold text-slate-800 mb-2">Graph Attention Networks in PyTorch Geometric</h2>
                 <p className="text-sm text-slate-600 mb-4 line-clamp-2">Learn how to implement GAT layers to predict molecular properties, focusing on attention weights across atomic bonds.</p>
                 <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1">⏱️ 45 mins</span>
                    <span className="flex items-center gap-1">📝 1 Quiz</span>
                    <span className="flex items-center gap-1 text-emerald-600">💻 Virtual Lab</span>
                 </div>
              </div>
           </div>

           {/* Learning Path (Timeline) */}
           <div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Your Personalized Path</h3>
              <div className="space-y-4">
                 
                 {/* Completed */}
                 <div className="flex items-center gap-4 opacity-60">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 shadow-sm border border-emerald-200">✓</div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                       <div>
                         <div className="font-bold text-slate-800">Module 3: Basics of Graph Neural Networks</div>
                         <div className="text-xs text-slate-500">Completed 2 days ago • 100% Mastery</div>
                       </div>
                       <button className="text-sm text-slate-500 hover:text-indigo-600 font-medium">Review</button>
                    </div>
                 </div>

                 {/* Current */}
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-lg border-2 border-indigo-200">▶</div>
                    <div className="flex-1 bg-white border-2 border-indigo-200 rounded-xl p-4 flex justify-between items-center shadow-sm">
                       <div>
                         <div className="font-bold text-indigo-900">Module 4: Graph Attention Networks</div>
                         <div className="text-xs text-indigo-600 mt-1">In Progress • 20% Complete</div>
                       </div>
                       <button className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-bold rounded shadow hover:bg-indigo-700">Continue</button>
                    </div>
                 </div>

                 {/* Locked */}
                 <div className="flex items-center gap-4 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0 font-bold border border-slate-300">🔒</div>
                    <div className="flex-1 bg-white border border-slate-200 rounded-xl p-4 flex justify-between items-center">
                       <div>
                         <div className="font-bold text-slate-800">Module 5: Project - KRAS Binding Prediction</div>
                         <div className="text-xs text-slate-500 mt-1">Unlocks after Module 4</div>
                       </div>
                    </div>
                 </div>

              </div>
           </div>

        </div>

        {/* Right: Competencies & Flashcards */}
        <div className="col-span-4 space-y-6">
           
           {/* Competency Graph */}
           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center justify-between">
                <span>Skill Mastery</span>
                <span className="text-xs text-slate-400 font-normal hover:text-indigo-600 cursor-pointer">View Portfolio ↗</span>
              </h3>
              
              <div className="space-y-4">
                 <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                       <span>Python</span>
                       <span>94%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-500 w-[94%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                       <span>PyTorch</span>
                       <span>72%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[72%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold text-indigo-600 mb-1">
                       <span>Graph ML</span>
                       <span>45%</span>
                    </div>
                    <div className="w-full h-1.5 bg-indigo-50 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[45%]"></div></div>
                 </div>
                 <div>
                    <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                       <span>Molecular Dynamics</span>
                       <span>20%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-slate-400 w-[20%]"></div></div>
                 </div>
              </div>
           </div>

           {/* Spaced Repetition Flashcards */}
           <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">🧠</div>
              <h3 className="text-lg font-bold mb-1 relative z-10">Daily Review</h3>
              <p className="text-sm text-indigo-100 mb-4 relative z-10">14 flashcards due today based on your forgetting curve.</p>
              <button className="w-full py-2 bg-white text-indigo-700 font-bold rounded-lg shadow hover:bg-indigo-50 transition relative z-10">
                 Start Revision Session
              </button>
           </div>

           {/* Mentorship Hub */}
           <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-800 mb-4">Research Mentor</h3>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-200"></div>
                 <div>
                    <div className="text-sm font-bold text-slate-800">Dr. James Chen</div>
                    <div className="text-xs text-slate-500">Available for 1:1 at 2:00 PM</div>
                 </div>
              </div>
              <button className="w-full py-1.5 border border-slate-300 text-slate-700 text-xs font-bold rounded hover:bg-slate-50 transition">Message Mentor</button>
           </div>

        </div>

      </div>
    </div>
  );
}
