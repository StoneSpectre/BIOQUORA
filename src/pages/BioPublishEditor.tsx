import React, { useState, useEffect } from 'react';

export default function BioPublishEditor() {

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
    <div className="h-screen bg-[#f8fafc] text-slate-800 font-sans flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-4">
          <span className="text-xl">📝</span>
          <h1 className="text-sm font-bold text-slate-700 tracking-wide">Draft: Targeted Protein Degradation Strategies</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white z-10">SJ</div>
            <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white z-0">DC</div>
          </div>
          <button className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded shadow hover:bg-blue-700 transition">Submit to Editorial</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar */}
        <div className="w-14 bg-white border-r border-slate-200 flex flex-col items-center py-4 shrink-0 gap-6">
           <div className="text-slate-400 hover:text-blue-600 cursor-pointer text-xl" title="Write">📝</div>
           <div className="text-slate-400 hover:text-blue-600 cursor-pointer text-xl" title="Insert Figure">📊</div>
           <div className="text-slate-400 hover:text-blue-600 cursor-pointer text-xl" title="Insert Dataset">💾</div>
           <div className="text-slate-400 hover:text-blue-600 cursor-pointer text-xl" title="Manage References">📚</div>
           <div className="text-slate-400 hover:text-blue-600 cursor-pointer text-xl" title="Link BioStudio Workflow">⚙️</div>
        </div>

        {/* Center Editor (WYSIWYG Mock) */}
        <div className="flex-1 overflow-y-auto px-12 py-10">
           <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm min-h-full p-12 font-serif">
              
              <h1 className="text-3xl font-bold text-slate-900 mb-6 focus:outline-none" contentEditable suppressContentEditableWarning>
                Targeted Protein Degradation Strategies via PROTACs
              </h1>

              <p className="text-lg text-slate-700 leading-relaxed mb-6 focus:outline-none" contentEditable suppressContentEditableWarning>
                Proteolysis targeting chimeras (PROTACs) have emerged as a powerful modality for knocking down disease-causing proteins. Unlike traditional inhibitors, PROTACs act via event-driven pharmacology, leading to the ubiquitination and subsequent degradation of the target.
              </p>

              {/* AI Suggestion Highlight Mockup */}
              <div className="relative">
                 <p className="text-lg leading-relaxed mb-6 focus:outline-none" contentEditable suppressContentEditableWarning>
                   <span className="bg-purple-100 text-purple-900 px-1 border-b-2 border-purple-400 cursor-pointer relative group">
                     However, designing the linker region remains a significant challenge, often requiring extensive trial and error.
                     
                     {/* Hover Tooltip */}
                     <div className="absolute left-0 -top-12 bg-white border border-slate-200 rounded shadow-xl p-2 w-72 hidden group-hover:block z-10 text-sans text-sm font-sans text-slate-700">
                        <div className="flex items-center gap-2 mb-1"><span className="text-purple-600">🤖</span> <strong>AI Suggestion</strong></div>
                        Add citation: "Recent advances in deep learning for linker design..." <br/>
                        <button className="mt-2 text-xs bg-purple-600 text-white px-2 py-1 rounded">Accept</button>
                     </div>
                   </span>
                 </p>
              </div>

              {/* Embedded Asset Stub */}
              <div className="my-6 border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 text-slate-500 font-sans cursor-pointer hover:bg-slate-100 transition">
                 <span className="text-2xl mb-2">📊</span>
                 <span className="text-sm font-bold">Figure 1. PROTAC Ternary Complex Structure</span>
                 <span className="text-xs">Linked from BioStudio Model Registry</span>
              </div>

           </div>
        </div>

        {/* Right Sidebar: AI Manuscript Assistant */}
        <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
           <header className="h-12 border-b border-slate-200 flex items-center px-4 shrink-0 bg-slate-50">
             <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
               <span className="text-purple-500 text-base">🤖</span> AI Assistant
             </span>
           </header>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-5">
              
              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                 <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 border-b border-slate-200 flex justify-between">
                    <span>Reference Suggestions</span>
                    <span className="text-purple-600 text-[10px]">3 Found</span>
                 </div>
                 <div className="p-3 text-xs text-slate-600 space-y-3">
                    <div className="flex items-start gap-2">
                       <input type="checkbox" className="mt-0.5" />
                       <div>
                         <span className="font-bold text-slate-800 block">"AI-driven design of PROTAC linkers"</span>
                         Chen et al., Nature (2025). <span className="text-blue-500 hover:underline cursor-pointer">Insert</span>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden shadow-sm">
                 <div className="bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700 border-b border-slate-200">
                    Scientific Consistency Check
                 </div>
                 <div className="p-3 text-xs text-slate-600">
                    <div className="text-amber-600 font-bold mb-1 flex items-center gap-1"><span>⚠️</span> Methods gap</div>
                    You mention using a "Graph Neural Network" in the intro, but the Methods section currently describes a "Convolutional Neural Network". Would you like me to draft a correction based on your attached BioStudio model metadata?
                    <div className="mt-2 text-right">
                       <button className="text-[10px] bg-slate-800 text-white px-2 py-1 rounded">Generate Fix</button>
                    </div>
                 </div>
              </div>

           </div>

           <div className="p-3 bg-white border-t border-slate-200 shrink-0">
              <input type="text" placeholder="Ask AI Assistant..." className="w-full bg-slate-100 border border-slate-300 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500" />
           </div>
        </div>

      </div>
    </div>
  );
}
