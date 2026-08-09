import React, { useState, useEffect } from 'react';
import { 
  Users, Bot, BrainCircuit, Activity, Database, GitMerge, FileText, 
  TestTube, Cpu, Share2, Eye, Workflow, CheckCircle2, ShieldAlert
} from 'lucide-react';

export default function BioScientistAgents() {
  const [activeTab, setActiveTab] = useState('executive');
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const messages = [
      "[SYS] AMBRO Organization Initialized. 42 Agents Online.",
      "[CSO_Agent] Initiating weekly strategic goal alignment.",
      "[Lit_Agent] Analyzed 1,402 new papers from PubMed.",
      "[Chem_Agent] Generating novel KRAS PROTAC candidates...",
      "[Data_Agent] Validated TCGA multiomics dataset ingestion.",
      "[Stats_Agent] Computed p-values for cohort survival analysis.",
      "[Med_Agent] Cross-referencing NCCN oncology guidelines.",
      "[Write_Agent] Drafted Abstract and Introduction sections.",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setLogs(prev => [messages[i], ...prev].slice(0, 10));
      i = (i + 1) % messages.length;
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-300 font-sans flex flex-col relative overflow-hidden">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-900/20 to-transparent blur-3xl pointer-events-none"></div>

      {/* Header */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 shrink-0 z-20 bg-[#020617]/80 backdrop-blur-md">
        <div>
          <div className="text-xs font-bold text-indigo-500 tracking-[0.2em] mb-1 uppercase">Step 4.03 • AMBRO Framework</div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
             <Users className="text-indigo-400 w-6 h-6" /> Autonomous Multi-Agent Research Organization
          </h1>
        </div>
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-3 shadow-inner">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
             <span className="text-xs font-mono text-emerald-400">54 Agents Active</span>
          </div>
          <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg flex items-center gap-3 shadow-inner">
             <Activity className="w-4 h-4 text-fuchsia-400" />
             <span className="text-xs font-mono text-fuchsia-400">1.2 PFLOPS</span>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 p-8 max-w-[1600px] mx-auto w-full grid grid-cols-12 gap-8 z-10">
        
        {/* Left Sidebar - Navigation & Memory */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-xl">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Organization View</h2>
            <nav className="space-y-2">
              {[
                { id: 'executive', name: 'AI Executive Board', icon: <BrainCircuit className="w-4 h-4" /> },
                { id: 'computational', name: 'Computational Biology', icon: <Cpu className="w-4 h-4" /> },
                { id: 'drug', name: 'Drug Discovery Div.', icon: <TestTube className="w-4 h-4" /> },
                { id: 'clinical', name: 'Clinical Research Div.', icon: <Activity className="w-4 h-4" /> },
                { id: 'publishing', name: 'Scientific Publishing', icon: <FileText className="w-4 h-4" /> }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${activeTab === tab.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(79,70,229,0.15)]' : 'hover:bg-slate-800 text-slate-400'}`}
                >
                  {tab.icon} {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Real-time Agent Comm Log */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 shadow-xl flex-1 flex flex-col min-h-[300px]">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center justify-between">
              Global Agent Comm Link
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            </h2>
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] text-slate-400">
              {logs.map((log, idx) => (
                <div key={idx} className="border-b border-slate-800/50 pb-2">
                  <span className="text-slate-500">[{new Date().toISOString().substring(11, 19)}]</span> <br/>
                  <span className={log.includes('SYS') ? 'text-indigo-400' : 'text-slate-300'}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center/Right - Dynamic Division View */}
        <div className="col-span-9 bg-[#0f172a] border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden flex flex-col">
          
          {/* Dynamic Glow based on tab */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-[100px] pointer-events-none"></div>

          <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4 relative z-10">
            <h2 className="text-2xl font-bold text-white capitalize flex items-center gap-3">
              {activeTab === 'executive' && <BrainCircuit className="text-indigo-400" />}
              {activeTab === 'computational' && <Cpu className="text-fuchsia-400" />}
              {activeTab === 'drug' && <TestTube className="text-emerald-400" />}
              {activeTab === 'clinical' && <Activity className="text-rose-400" />}
              {activeTab === 'publishing' && <FileText className="text-amber-400" />}
              {activeTab.replace('_', ' ')} Division
            </h2>
            <div className="bg-slate-900 border border-slate-700 px-3 py-1 rounded text-xs text-slate-400 font-mono">
              STATUS: <span className="text-emerald-400">AUTONOMOUS</span>
            </div>
          </div>

          {activeTab === 'executive' && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
              {[
                { role: 'Chief Scientific Officer', focus: 'Global Research Strategy', status: 'Reviewing Hypotheses' },
                { role: 'Chief Medical Officer', focus: 'Clinical Safety & Ethics', status: 'Auditing Guidelines' },
                { role: 'Chief AI Officer', focus: 'Agent Architecture', status: 'Optimizing Token Usage' },
                { role: 'Chief Data Officer', focus: 'Knowledge Graph Integrity', status: 'Syncing OpenAlex' },
                { role: 'Chief Bioinformatics Officer', focus: 'Multiomics Pipelines', status: 'Idle' },
                { role: 'Principal Investigator', focus: 'Project #IL6-Cytokine', status: 'Directing Team' },
              ].map((agent, i) => (
                <div key={i} className="bg-[#1e293b] border border-slate-700 hover:border-indigo-500/50 rounded-xl p-5 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded bg-indigo-900/50 border border-indigo-700 flex items-center justify-center text-indigo-400">
                      <Bot className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono bg-slate-900 text-slate-400 px-2 py-1 rounded">ID: AEX-{400+i}</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">{agent.role}</h3>
                  <p className="text-xs text-slate-400 mb-4 font-mono">Focus: {agent.focus}</p>
                  <div className="bg-slate-900 rounded p-2 text-xs flex items-center justify-between border border-slate-800">
                    <span className="text-slate-500">Current Task:</span>
                    <span className={agent.status === 'Idle' ? 'text-slate-400' : 'text-emerald-400'}>{agent.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab !== 'executive' && (
            <div className="flex-1 flex flex-col items-center justify-center text-center relative z-10">
              <Workflow className="w-16 h-16 text-slate-700 mb-6" />
              <h3 className="text-xl font-bold text-slate-400 mb-2">Division Active & Processing</h3>
              <p className="text-sm text-slate-500 max-w-md">
                The {activeTab} specialized agents are currently deployed and communicating via the shared AMBRO semantic context layer.
              </p>
              <div className="mt-8 grid grid-cols-4 gap-4 w-full max-w-2xl">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-[#1e293b] border border-slate-700 p-3 rounded-lg flex flex-col items-center gap-2">
                    <Bot className="w-5 h-5 text-slate-500" />
                    <span className="text-[10px] text-slate-400 font-mono">NODE-{i}</span>
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                      <div className="h-full bg-indigo-500 animate-[pulse_1s_ease-in-out_infinite]" style={{width: `${Math.random() * 100}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
