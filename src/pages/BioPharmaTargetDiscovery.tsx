import React, { useState } from 'react';
import { 
  TestTube, Activity, GitCommit, Database, Share2, Target, 
  ShieldAlert, Settings, Maximize2, GitMerge 
} from 'lucide-react';

export default function BioPharmaTargetDiscovery() {
  const [activeTab, setActiveTab] = useState('docking');

  return (
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-16 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 shrink-0 shadow-lg z-20">
        <div className="flex items-center gap-4">
          <div className="bg-emerald-900/50 p-2 rounded-lg border border-emerald-500/30">
            <TestTube className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-emerald-500 tracking-[0.2em] uppercase">Step 3.08 • ADDIE</div>
            <h1 className="text-lg font-bold text-white tracking-wide">Autonomous Drug Discovery Engine</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center">
           <span className="px-3 py-1 bg-emerald-900/30 text-emerald-400 border border-emerald-500/50 rounded-full text-xs font-mono font-bold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
             GPU CLUSTER: ONLINE
           </span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Intelligence Card & Context */}
        <div className="w-[450px] bg-[#0f172a] border-r border-slate-800 flex flex-col overflow-y-auto relative z-10 shadow-2xl">
          
          <div className="p-6 border-b border-slate-800 bg-gradient-to-br from-emerald-900/20 to-transparent">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-[10px] font-mono mb-4 uppercase">
              <Target className="w-3 h-3" /> Target Selected
            </div>
            <h2 className="text-3xl font-black text-white mb-1">KRAS G12C</h2>
            <div className="text-xs text-slate-500 font-mono mb-4">UniProt: P01111 | Ensembl: ENSG00000133703</div>
            
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              GTPase playing a critical role in cellular proliferation. The G12C mutation is a high-priority target in Non-Small Cell Lung Cancer (NSCLC). Evaluated for covalent inhibition via the Switch II pocket.
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Druggability</div>
                <div className="text-lg font-mono font-bold text-emerald-400">High</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Known Ligands</div>
                <div className="text-lg font-mono font-bold text-emerald-400">4,291</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Structural References */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" /> Structural Knowledge Bases
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">PDB Structures</span>
                  <span className="text-xs font-mono text-emerald-400">142 loaded</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">AlphaFold DB</span>
                  <span className="text-xs font-mono text-emerald-400">v4 Synced</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">PocketDB</span>
                  <span className="text-xs font-mono text-amber-400">Switch II pocket</span>
                </div>
              </div>
            </div>

            {/* AI Models Active */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BrainCircuit className="w-4 h-4" /> Generative Chemistry AI
              </h3>
              <div className="bg-emerald-900/10 border border-emerald-900/50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                   <span className="text-xs font-bold text-slate-300">MolFormer</span>
                   <span className="text-[10px] font-mono text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                   <span className="text-xs font-bold text-slate-300">ChemBERTa</span>
                   <span className="text-[10px] font-mono text-emerald-400">Active</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                   <span className="text-xs font-bold text-slate-300">DiffDock</span>
                   <span className="text-[10px] font-mono text-amber-400">Running...</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Scientific Workflow execution */}
        <div className="flex-1 bg-[#020617] flex flex-col relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-emerald-900/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

          {/* Workflow Tabs */}
          <div className="px-10 pt-8 pb-4 border-b border-slate-800 relative z-10 flex justify-between items-end">
            <div className="flex gap-8">
              {[
                { id: 'docking', icon: <GitMerge className="w-4 h-4" />, label: 'Molecular Docking' },
                { id: 'dynamics', icon: <Activity className="w-4 h-4" />, label: 'Molecular Dynamics' },
                { id: 'admet', icon: <ShieldAlert className="w-4 h-4" />, label: 'ADMET Profile' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <span className="text-xs text-slate-500 font-mono">CANDIDATE: BQ-KRAS-492</span>
            </div>
          </div>

          {/* Workflow Content */}
          <div className="flex-1 overflow-y-auto p-10 relative z-10">
            
            {activeTab === 'docking' && (
              <div className="animate-in fade-in slide-in-from-bottom-4">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  {/* Fake 3D Protein Viewer */}
                  <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-4 shadow-xl flex flex-col">
                     <div className="flex justify-between items-center mb-4">
                       <h3 className="text-sm font-bold text-slate-300">Protein-Ligand Complex (DiffDock)</h3>
                       <button className="text-slate-500 hover:text-slate-300"><Maximize2 className="w-4 h-4" /></button>
                     </div>
                     <div className="flex-1 bg-[#020617] rounded-lg border border-slate-800 relative overflow-hidden min-h-[300px] flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full max-w-[200px] opacity-80 animate-[spin_60s_linear_infinite]">
                          <path d="M50,100 Q80,40 120,100 T180,120" fill="none" stroke="#10b981" strokeWidth="8" strokeLinecap="round" />
                          <path d="M20,140 Q60,180 100,120 T160,80" fill="none" stroke="#059669" strokeWidth="8" strokeLinecap="round" />
                          {/* Ligand */}
                          <circle cx="120" cy="100" r="15" fill="#f59e0b" className="animate-pulse" />
                          <circle cx="105" cy="90" r="8" fill="#fcd34d" />
                          <circle cx="135" cy="110" r="10" fill="#fcd34d" />
                        </svg>
                     </div>
                  </div>

                  {/* Docking Scores */}
                  <div className="space-y-4">
                    <div className="bg-[#0f172a] border border-slate-700 p-5 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Binding Affinity</h4>
                      <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-black text-emerald-400">-11.4</span>
                        <span className="text-sm text-slate-500 mb-1">kcal/mol</span>
                      </div>
                      <p className="text-xs text-slate-400">Top pose out of 40 generated by DiffDock. Exceeds Sotorasib baseline (-9.8 kcal/mol).</p>
                    </div>

                    <div className="bg-[#0f172a] border border-slate-700 p-5 rounded-xl">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Interactions (Switch II)</h4>
                      <ul className="space-y-3 font-mono text-sm">
                        <li className="flex justify-between items-center text-slate-300">
                          <span>Cys12 (Covalent)</span>
                          <span className="text-emerald-400">2.1 Å</span>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                          <span>His95 (H-bond)</span>
                          <span className="text-blue-400">2.8 Å</span>
                        </li>
                        <li className="flex justify-between items-center text-slate-300">
                          <span>Tyr96 (Pi-Pi)</span>
                          <span className="text-fuchsia-400">3.4 Å</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'dynamics' && (
              <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 space-y-6">
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-6">OpenMM Simulation (500ns)</h3>
                  
                  <div className="space-y-8">
                    {/* RMSD Chart Mockup */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ligand RMSD (Å)</h4>
                        <span className="text-xs font-mono text-emerald-400">Stable at 1.2 Å</span>
                      </div>
                      <div className="w-full h-32 bg-[#020617] border border-slate-800 rounded flex items-end px-2 pt-4">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <polyline points="0,90 10,70 20,40 30,35 40,30 50,32 60,31 70,29 80,30 90,31 100,29" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    {/* RMSF Chart Mockup */}
                    <div>
                      <div className="flex justify-between items-end mb-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Protein RMSF (Residue Fluctuation)</h4>
                      </div>
                      <div className="w-full h-32 bg-[#020617] border border-slate-800 rounded flex items-end px-2 pt-4">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                          <polyline points="0,80 10,85 20,40 30,90 40,85 50,20 60,80 70,85 80,90 90,40 100,80" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          {/* Highlight Switch Regions */}
                          <rect x="15" y="0" width="10" height="100" fill="#ef4444" opacity="0.2" />
                          <rect x="45" y="0" width="10" height="100" fill="#ef4444" opacity="0.2" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'admet' && (
              <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl p-6">
                   <h3 className="text-lg font-bold text-white mb-6">ADMET-AI Prediction Profile</h3>
                   
                   <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Absorption & Distribution</h4>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">Caco-2 Permeability</span>
                         <span className="font-mono text-emerald-400">High (-4.2 cm/s)</span>
                       </div>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">Blood-Brain Barrier (BBB)</span>
                         <span className="font-mono text-rose-400">Low (0.12)</span>
                       </div>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">Human Oral Bioavailability</span>
                         <span className="font-mono text-emerald-400">68%</span>
                       </div>
                     </div>

                     <div className="space-y-4">
                       <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Metabolism & Toxicity</h4>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">CYP3A4 Inhibition</span>
                         <span className="font-mono text-amber-400">Moderate</span>
                       </div>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">hERG Toxicity (Cardio)</span>
                         <span className="font-mono text-emerald-400">Negative</span>
                       </div>
                       <div className="flex justify-between items-center text-sm bg-slate-900/50 p-3 rounded border border-slate-800">
                         <span className="text-slate-300">Hepatotoxicity</span>
                         <span className="font-mono text-emerald-400">Negative</span>
                       </div>
                     </div>
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
