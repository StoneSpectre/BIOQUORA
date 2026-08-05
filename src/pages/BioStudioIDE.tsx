import React, { useState, useEffect } from 'react';

export default function BioStudioIDE() {

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
      <header className="h-10 bg-[#333333] border-b border-[#252526] flex items-center justify-between px-4 shrink-0 shadow-sm z-10 text-xs">
        <div className="flex items-center gap-4">
          <span className="text-blue-400 font-bold">BioStudio</span>
          <div className="flex gap-4 text-[#cccccc]">
            <span className="hover:text-white cursor-pointer">File</span>
            <span className="hover:text-white cursor-pointer">Edit</span>
            <span className="hover:text-white cursor-pointer">View</span>
            <span className="hover:text-white cursor-pointer">Run</span>
            <span className="hover:text-white cursor-pointer">Terminal</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <span className="px-2 py-0.5 bg-emerald-900/50 text-emerald-400 border border-emerald-800 rounded font-mono">Env: Python 3.10 (GPU T4)</span>
           <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">U</div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: File Tree */}
        <div className="w-64 bg-[#252526] border-r border-[#333333] flex flex-col shrink-0 text-sm font-mono">
          <div className="px-4 py-2 uppercase tracking-wider text-xs font-bold text-[#858585] mb-2">Explorer</div>
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span>📁</span> <span className="text-[#cccccc]">data</span>
          </div>
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span>📁</span> <span className="text-[#cccccc]">models</span>
          </div>
          <div className="px-4 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span>📁</span> <span className="text-[#cccccc]">src</span>
          </div>
          <div className="px-8 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2 bg-[#37373d]">
            <span className="text-blue-400">🐍</span> <span className="text-blue-400">train_kras.py</span>
          </div>
          <div className="px-8 py-1 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-yellow-400">📜</span> <span className="text-[#cccccc]">utils.py</span>
          </div>
          <div className="px-4 py-1 mt-2 hover:bg-[#2a2d2e] cursor-pointer flex items-center gap-2">
            <span className="text-green-400">🐳</span> <span className="text-[#cccccc]">Dockerfile</span>
          </div>
        </div>

        {/* Center: Editor + Terminal */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Editor Tabs */}
          <div className="flex bg-[#252526] text-sm overflow-x-auto shrink-0 scrollbar-hide">
             <div className="px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-white flex items-center gap-2 cursor-pointer border-r border-[#333333]">
               <span className="text-blue-400">🐍</span> train_kras.py <span className="text-[#858585] hover:bg-[#333333] rounded px-1 ml-2">x</span>
             </div>
             <div className="px-4 py-2 text-[#969696] hover:bg-[#2d2d2d] flex items-center gap-2 cursor-pointer border-r border-[#333333]">
               <span className="text-yellow-400">📜</span> utils.py
             </div>
          </div>

          {/* Code Editor (Monaco mock) */}
          <div className="flex-1 bg-[#1e1e1e] p-4 font-mono text-[14px] leading-relaxed overflow-y-auto">
             <div className="flex">
               <div className="w-10 text-right pr-4 text-[#858585] select-none flex flex-col">
                 <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
               </div>
               <div className="flex-1 whitespace-pre">
                 <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">torch</span>{'\n'}
                 <span className="text-[#c586c0]">import</span> <span className="text-[#9cdcfe]">torch.nn</span> <span className="text-[#c586c0]">as</span> <span className="text-[#9cdcfe]">nn</span>{'\n'}
                 <span className="text-[#c586c0]">from</span> <span className="text-[#9cdcfe]">biostudio.models</span> <span className="text-[#c586c0]">import</span> <span className="text-[#4ec9b0]">GraphAttentionNetwork</span>{'\n'}
                 {'\n'}
                 <span className="text-[#569cd6]">def</span> <span className="text-[#dcdcaa]">build_model</span>():{'\n'}
                 <span className="text-[#6a9955]">    # Initialize GAT for KRAS G12D binding affinity prediction</span>{'\n'}
                 {'    '}model <span className="text-[#d4d4d4]">=</span> <span className="text-[#4ec9b0]">GraphAttentionNetwork</span>({'\n'}
                 {'        '}in_features<span className="text-[#d4d4d4]">=</span><span className="text-[#b5cea8]">128</span>,{'\n'}
                 {'        '}hidden_dims<span className="text-[#d4d4d4]">=</span>[<span className="text-[#b5cea8]">256</span>, <span className="text-[#b5cea8]">512</span>],{'\n'}
                 {'        '}heads<span className="text-[#d4d4d4]">=</span><span className="text-[#b5cea8]">8</span>,{'\n'}
                 {'        '}dropout<span className="text-[#d4d4d4]">=</span><span className="text-[#b5cea8]">0.2</span>{'\n'}
                 {'    '}){'\n'}
                 <span className="text-[#c586c0]">    return</span> model{'\n'}
               </div>
             </div>
             
             {/* AI Ghost Text Mockup */}
             <div className="flex mt-1">
                <div className="w-10"></div>
                <div className="flex-1 text-[#858585] italic whitespace-pre opacity-60 bg-[#2a2d2e]/30 px-1 border-l-2 border-blue-500/50">
                  <span className="text-xs text-blue-400 not-italic uppercase tracking-wider mr-2 bg-blue-900/30 px-1 rounded">Copilot Suggestion</span>{'\n'}
                  def train_epoch(model, dataloader, optimizer, criterion):{'\n'}
                  {'    '}model.train(){'\n'}
                  {'    '}total_loss = 0.0{'\n'}
                  {'    '}...
                </div>
             </div>
          </div>

          {/* Integrated Terminal */}
          <div className="h-48 bg-[#1e1e1e] border-t border-[#333333] flex flex-col shrink-0">
             <div className="flex bg-[#252526] text-xs px-4">
                <div className="px-4 py-1.5 border-b-2 border-blue-500 text-white cursor-pointer uppercase tracking-wider">Terminal</div>
                <div className="px-4 py-1.5 text-[#969696] hover:text-white cursor-pointer uppercase tracking-wider">Output</div>
                <div className="px-4 py-1.5 text-[#969696] hover:text-white cursor-pointer uppercase tracking-wider">Debug Console</div>
             </div>
             <div className="flex-1 p-3 font-mono text-[13px] overflow-y-auto">
                <div className="text-green-400">user@bioquora-workspace ~/repo $ <span className="text-white">python3 src/train_kras.py</span></div>
                <div className="text-slate-400">Loading dataset: KRAS_G12D_PROTAC_binders.csv (14,230 samples)...</div>
                <div className="text-slate-400">Initializing GAT model on CUDA:0...</div>
                <div className="text-white">Epoch 1/50 - Loss: 2.3412 - Val MSE: 1.8492</div>
                <div className="text-white">Epoch 2/50 - Loss: 1.9431 - Val MSE: 1.5123</div>
                <div className="text-green-400 flex items-center gap-2 mt-1">user@bioquora-workspace ~/repo $ <span className="w-2 h-4 bg-white animate-pulse inline-block"></span></div>
             </div>
          </div>

        </div>

        {/* Right: AI Coding Assistant (Copilot Sidebar) */}
        <div className="w-80 bg-[#252526] border-l border-[#333333] flex flex-col shrink-0">
           <header className="h-10 border-b border-[#333333] flex items-center px-4 shrink-0">
             <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2"><span className="text-blue-500 text-base">🤖</span> BioStudio Copilot</span>
           </header>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-[#1e1e1e] border border-[#333333] rounded p-3 text-xs text-slate-300">
                <strong className="text-white block mb-1">Current Context</strong>
                Editing <span className="text-blue-400 font-mono">train_kras.py</span>. Building a Graph Attention Network for PROTAC binding affinity.
              </div>

              <div className="flex gap-2">
                <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center text-[10px] text-white shrink-0">AI</div>
                <div className="text-xs text-[#cccccc] leading-relaxed">
                  I notice you are building a GAT for binding affinity. Ensure that your node features include partial charges and hydrogen bond donor/acceptor flags, as these are critical for the switch II pocket of KRAS G12D.
                </div>
              </div>

              <div className="bg-[#1e1e1e] border border-[#333333] rounded p-2 mt-2">
                 <div className="text-xs text-[#9cdcfe] font-mono mb-2">Generate dataset loader?</div>
                 <div className="flex gap-2">
                    <button className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-[10px] py-1 rounded">Accept</button>
                    <button className="flex-1 bg-[#333333] hover:bg-[#444444] text-[#cccccc] text-[10px] py-1 rounded">Discard</button>
                 </div>
              </div>
           </div>

           <div className="p-3 bg-[#1e1e1e] border-t border-[#333333] shrink-0">
              <input type="text" placeholder="Ask Copilot..." className="w-full bg-[#2d2d2d] border border-[#3c3c3c] rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500" />
           </div>
        </div>

      </div>
    </div>
  );
}
