import React, { useState, useEffect } from 'react';

export default function BioLearnTutor() {

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
    <div className="h-screen bg-white text-slate-900 font-sans flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">BioTutor</h1>
          <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded ml-2 tracking-wider">AI Teaching Assistant</span>
        </div>
        <div className="flex gap-4">
          <div className="text-sm font-medium text-slate-500 hover:text-indigo-600 cursor-pointer">Generate Quiz</div>
          <div className="text-sm font-medium text-slate-500 hover:text-indigo-600 cursor-pointer">Concept Map</div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
         
         {/* Chat Area */}
         <div className="flex-1 flex flex-col bg-slate-50">
            
            <div className="flex-1 overflow-y-auto p-8 space-y-6">
               
               {/* User Message */}
               <div className="flex items-start gap-4 max-w-3xl mx-auto w-full">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 font-bold text-slate-600 text-xs">SJ</div>
                  <div className="flex-1">
                     <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 text-sm text-slate-800 shadow-sm">
                        Can you explain the difference between a standard Graph Convolutional Network (GCN) and a Graph Attention Network (GAT) in the context of molecular property prediction?
                     </div>
                  </div>
               </div>

               {/* AI Tutor Message */}
               <div className="flex items-start gap-4 max-w-3xl mx-auto w-full">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 font-bold text-white text-xs">🤖</div>
                  <div className="flex-1">
                     <div className="bg-white border border-indigo-100 rounded-2xl rounded-tr-none p-5 text-sm text-slate-800 shadow-sm leading-relaxed space-y-4">
                        <p>Great question, Sarah! Both GCNs and GATs are used to learn representations of molecules (where atoms are nodes and bonds are edges), but they aggregate neighborhood information differently.</p>
                        
                        <div className="grid grid-cols-2 gap-4 my-4">
                           <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                              <h4 className="font-bold text-slate-900 mb-1">GCN (Graph Convolution)</h4>
                              <p className="text-xs text-slate-600">Treats all neighboring atoms equally (or based strictly on degree). The weights are fixed based on the graph structure.</p>
                           </div>
                           <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
                              <h4 className="font-bold text-indigo-900 mb-1">GAT (Graph Attention)</h4>
                              <p className="text-xs text-slate-600">Learns which neighboring atoms are most important. It assigns an <em>attention weight</em> to each edge dynamically.</p>
                           </div>
                        </div>

                        <p><strong>Why does this matter for molecules?</strong></p>
                        <p>In a molecule, not all bonds are equally important for a specific property (like binding affinity). A GAT allows the model to "pay more attention" to a crucial hydrogen bond over a standard carbon-carbon bond.</p>

                        {/* Interactive Widget Injected by AI */}
                        <div className="mt-4 p-4 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                           <div>
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Interactive Mini-Quiz</div>
                              <div className="text-sm font-bold text-slate-800">Test your understanding of Attention Weights</div>
                           </div>
                           <button className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded shadow hover:bg-indigo-700">Start Quiz</button>
                        </div>
                     </div>
                  </div>
               </div>

            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-slate-200 shrink-0">
               <div className="max-w-3xl mx-auto relative">
                  <textarea 
                     placeholder="Ask BioTutor a question, request an explanation, or type /quiz..."
                     className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none h-14 shadow-inner"
                  ></textarea>
                  <button className="absolute right-3 top-3 w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center hover:bg-indigo-700 shadow">
                     ↑
                  </button>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Context & Notes */}
         <div className="w-80 bg-white border-l border-slate-200 flex flex-col shrink-0">
            <div className="p-4 border-b border-slate-200 bg-slate-50">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Learning Context</h3>
               <div className="text-sm font-bold text-slate-800 mb-1">Module 4: Graph Attention Networks</div>
               <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-3"><div className="h-full bg-indigo-500 w-[20%]"></div></div>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto">
               <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Your Smart Notes</h3>
               
               <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-slate-700 shadow-sm relative group cursor-pointer hover:bg-yellow-100">
                     <strong>GCN:</strong> Uses symmetric normalized Laplacian. Weights are static based on node degree.
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-slate-700 shadow-sm relative group cursor-pointer hover:bg-yellow-100">
                     <strong>GAT:</strong> Computes $e_{"{"}ij{"}"} = \text{LeakyReLU}(\mathbf{a}^T [\mathbf{W}h_i || \mathbf{W}h_j])$. Dynamic weights.
                  </div>
                  <button className="w-full py-2 border-2 border-dashed border-slate-300 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-50 hover:text-slate-600 transition">
                     + Add Note
                  </button>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
