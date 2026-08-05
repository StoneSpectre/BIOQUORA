import React, { useState, useEffect } from 'react';

export default function BioLearnSimulator() {

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
    <div className="h-screen bg-[#1e1e1e] text-[#cccccc] font-sans flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-12 bg-[#252526] border-b border-[#333333] flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-4">
          <span className="text-emerald-500 font-bold text-lg flex items-center gap-2">
            <span>🧪</span> Digital Laboratory Simulator
          </span>
          <span className="px-2 py-0.5 bg-[#333333] text-[#cccccc] border border-[#444444] rounded text-xs font-mono">Module 4: Exercise 2</span>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded hover:bg-emerald-500">Submit Assignment</button>
           <button className="px-4 py-1.5 bg-[#333333] border border-[#444444] text-[#cccccc] text-xs font-bold rounded hover:bg-[#444444]">Exit Lab</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left: BioTutor Guided Instructions */}
        <div className="w-80 bg-[#252526] border-r border-[#333333] flex flex-col shrink-0 z-10 shadow-[4px_0_15px_rgba(0,0,0,0.3)]">
           <header className="p-4 border-b border-[#333333] bg-[#2d2d2d]">
              <h2 className="text-sm font-bold text-white mb-1">Implementing GAT Layers</h2>
              <p className="text-xs text-[#969696]">In this sandbox, you will implement the attention mechanism for PyTorch Geometric.</p>
           </header>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 text-sm">
              
              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <div className="w-5 h-5 rounded-full bg-emerald-900/50 flex items-center justify-center text-xs">✓</div>
                    Step 1: Data Loading
                 </div>
                 <p className="text-[#969696] text-xs pl-7">Successfully loaded the KRAS structural dataset into a PyG DataLoader.</p>
              </div>

              <div className="space-y-2">
                 <div className="flex items-center gap-2 text-white font-bold">
                    <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-xs">2</div>
                    Step 2: Attention Mechanism
                 </div>
                 <div className="pl-7 space-y-3">
                    <p className="text-[#cccccc] text-xs leading-relaxed">
                       Navigate to <code className="bg-[#1e1e1e] text-[#dcdcaa] px-1 rounded">gat_layer.py</code>. Implement the linear transformation for the nodes, and then calculate the unnormalized attention scores $e_{"{"}ij{"}"}$.
                    </p>
                    <div className="p-3 bg-[#1e1e1e] border border-[#333333] rounded text-xs text-[#9cdcfe] font-mono">
                       Wh = self.lin(h)<br/>
                       e = self.leakyrelu(...)
                    </div>
                    
                    {/* Tutor Hint */}
                    <div className="p-3 bg-indigo-900/20 border border-indigo-900/50 rounded-lg text-xs mt-4">
                       <strong className="text-indigo-400 flex items-center gap-1 mb-1"><span>🤖</span> BioTutor Hint</strong>
                       <p className="text-indigo-200">Remember to concatenate the source and target node features before applying the attention vector `self.a`.</p>
                    </div>
                 </div>
              </div>

              <div className="space-y-2 opacity-50">
                 <div className="flex items-center gap-2 text-white font-bold">
                    <div className="w-5 h-5 rounded-full bg-[#333333] flex items-center justify-center text-xs">3</div>
                    Step 3: Run Training Loop
                 </div>
              </div>

           </div>
        </div>

        {/* Center: Simplified BioStudio IDE Interface */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
          
          <div className="flex bg-[#252526] text-sm shrink-0 border-b border-[#333333]">
             <div className="px-4 py-2 bg-[#1e1e1e] text-white flex items-center gap-2 border-r border-[#333333] border-t-2 border-emerald-500">
               <span className="text-blue-400">🐍</span> gat_layer.py
             </div>
          </div>

          <div className="flex-1 p-4 font-mono text-[14px] leading-relaxed overflow-y-auto">
             <div className="flex">
               <div className="w-10 text-right pr-4 text-[#858585] select-none flex flex-col">
                 <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
               </div>
               <div className="flex-1 whitespace-pre">
                 <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">torch</span>{'\n'}
                 <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">torch.nn.functional</span> <span className="text-[#c586c0]">as</span> <span className="text-[#9cdcfe]">F</span>{'\n'}
                 <span className="text-[#c586c0]">from</span> <span className="text-[#9cdcfe]">torch_geometric.nn</span> <span className="text-[#c586c0]">import</span> <span className="text-[#4ec9b0]">MessagePassing</span>{'\n'}
                 {'\n'}
                 <span className="text-[#569cd6]">class</span> <span className="text-[#4ec9b0]">GATLayer</span>(<span className="text-[#4ec9b0]">MessagePassing</span>):{'\n'}
                 {'    '}<span className="text-[#569cd6]">def</span> <span className="text-[#dcdcaa]">forward</span>(<span className="text-[#569cd6]">self</span>, h, edge_index):{'\n'}
                 <span className="text-[#6a9955]">        # TODO: Implement linear transform and message passing</span>{'\n'}
                 {'        '}Wh <span className="text-[#d4d4d4]">=</span> <span className="text-[#569cd6]">self</span>.lin(h){'\n'}
                 {'        '}<span className="text-[#c586c0]">return</span> <span className="text-[#569cd6]">self</span>.propagate(edge_index, h<span className="text-[#d4d4d4]">=</span>Wh)
               </div>
             </div>
          </div>

          {/* Integrated Terminal / Test Runner */}
          <div className="h-48 bg-[#1e1e1e] border-t border-[#333333] flex flex-col shrink-0">
             <div className="flex bg-[#252526] text-xs px-4 border-b border-[#333333]">
                <div className="px-4 py-1.5 border-b-2 border-emerald-500 text-white uppercase tracking-wider">Test Runner</div>
             </div>
             <div className="flex-1 p-3 font-mono text-[13px] overflow-y-auto">
                <div className="text-[#cccccc]">Running pytest tests/test_gat.py...</div>
                <div className="text-red-400 mt-2">F test_attention_scores (tests/test_gat.py:12)</div>
                <div className="text-[#858585] mt-1 text-xs">
                   AssertionError: Expected attention scores to sum to 1 across neighbors. Did you forget to apply softmax?<br/>
                   <span className="text-red-400">assert torch.allclose(alpha.sum(dim=-1), torch.ones_like(alpha.sum(dim=-1)))</span>
                </div>
                <div className="text-emerald-400 mt-2">user@biolearn-sandbox ~$ <span className="w-2 h-4 bg-white animate-pulse inline-block"></span></div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
