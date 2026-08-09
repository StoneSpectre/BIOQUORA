import React, { useState } from 'react';
import { 
  Rocket, BookOpen, Search, Lightbulb, FlaskConical, BarChart3, 
  FileCheck, ShieldAlert, FileText, Settings, Sparkles, ChevronRight 
} from 'lucide-react';

export default function BioScientistMission() {
  const [activePhase, setActivePhase] = useState('hypothesis');

  return (
    <div className="h-screen bg-[#020617] text-slate-300 font-sans flex flex-col overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-16 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 shrink-0 shadow-lg z-20">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-900/50 p-2 rounded-lg border border-indigo-500/30">
            <Rocket className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-indigo-500 tracking-[0.2em] uppercase">Step 4.01 • AI Scientist</div>
            <h1 className="text-lg font-bold text-white tracking-wide">Autonomous Mission Control</h1>
          </div>
        </div>
        <div className="flex gap-4 items-center">
           <span className="px-3 py-1 bg-indigo-900/30 text-indigo-400 border border-indigo-500/50 rounded-full text-xs font-mono font-bold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
             MISSION ACTIVE
           </span>
           <button className="p-2 hover:bg-slate-800 rounded-full transition-colors">
             <Settings className="w-5 h-5 text-slate-400" />
           </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left: Intelligence Card & Context */}
        <div className="w-[450px] bg-[#0f172a] border-r border-slate-800 flex flex-col overflow-y-auto relative z-10 shadow-2xl">
          
          <div className="p-6 border-b border-slate-800 bg-gradient-to-br from-indigo-900/20 to-transparent">
            <div className="inline-flex items-center gap-2 px-2 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded text-indigo-400 text-[10px] font-mono mb-4 uppercase">
              <Sparkles className="w-3 h-3" /> Target Identified
            </div>
            <h2 className="text-2xl font-bold text-white mb-2 leading-tight">IL-6 Blockade Efficacy in Cytokine Storm</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Autonomous objective: Synthesize conflicting reports on IL-6 inhibitor timing, identify mechanistic gaps, and propose a novel biomarker-driven clinical trial design.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Confidence</div>
                <div className="text-lg font-mono font-bold text-emerald-400">92.4%</div>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg">
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Novelty</div>
                <div className="text-lg font-mono font-bold text-fuchsia-400">High</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6 flex-1">
            
            {/* Knowledge Sources */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Database className="w-4 h-4" /> Live Ingestion Sources
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">PubMed (Papers)</span>
                  <span className="text-xs font-mono text-emerald-400">4,192 indexed</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">OpenAlex (Authors/Institutions)</span>
                  <span className="text-xs font-mono text-emerald-400">Synced</span>
                </div>
                <div className="flex justify-between items-center text-sm p-2 bg-slate-900/50 border border-slate-800 rounded">
                  <span className="text-slate-300">NIH RePORTER (Grants)</span>
                  <span className="text-xs font-mono text-amber-400">12 matches</span>
                </div>
              </div>
            </div>

            {/* Funding Matches */}
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Funding Opportunities
              </h3>
              <div className="bg-indigo-900/10 border border-indigo-900/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-bold text-indigo-400">NIH R01: Immune Response Biomarkers</h4>
                  <span className="text-xs font-mono text-slate-500">RFA-AI-23-001</span>
                </div>
                <p className="text-xs text-slate-400 mb-3">High alignment (88%) with proposed IL-6 hypothesis. Grant drafting agent recommends initiating proposal.</p>
                <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded shadow-lg shadow-indigo-500/20 transition-all">
                  Initialize Grant Draft
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Scientific Workflow execution */}
        <div className="flex-1 bg-[#020617] flex flex-col relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-indigo-900/10 to-transparent rounded-full blur-[120px] pointer-events-none"></div>

          {/* Workflow Tabs */}
          <div className="px-10 pt-8 pb-4 border-b border-slate-800 relative z-10">
            <div className="flex gap-8">
              {[
                { id: 'gap', icon: <Search className="w-4 h-4" />, label: 'Gap Analysis' },
                { id: 'hypothesis', icon: <Lightbulb className="w-4 h-4" />, label: 'Hypothesis Gen' },
                { id: 'experiment', icon: <FlaskConical className="w-4 h-4" />, label: 'Experiment Design' },
                { id: 'manuscript', icon: <BookOpen className="w-4 h-4" />, label: 'Manuscript Draft' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActivePhase(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${activePhase === tab.id ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Workflow Content */}
          <div className="flex-1 overflow-y-auto p-10 relative z-10">
            
            {activePhase === 'gap' && (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-white mb-6">Literature Gap Analysis</h3>
                <div className="space-y-4">
                  <div className="bg-[#0f172a] border border-slate-700 p-5 rounded-xl">
                    <h4 className="text-sm font-bold text-slate-300 mb-2">Contradictory Evidence Detected</h4>
                    <p className="text-sm text-slate-400">While RECOVERY trial (2021) shows mortality benefit of Tocilizumab, the COVACTA trial showed no significant improvement in clinical status at day 28.</p>
                  </div>
                  <div className="bg-rose-900/10 border border-rose-900/50 p-5 rounded-xl">
                    <h4 className="text-sm font-bold text-rose-400 mb-2 flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Critical Missing Dataset</h4>
                    <p className="text-sm text-slate-400">Lack of stratifying baseline ferritin and CRP velocity prior to administration. The gap lies in temporal biomarker profiling rather than absolute drug efficacy.</p>
                  </div>
                </div>
              </div>
            )}

            {activePhase === 'hypothesis' && (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-white mb-6">Autonomous Hypothesis Generation</h3>
                
                <div className="bg-gradient-to-br from-indigo-900/30 to-slate-900 border border-indigo-500/30 p-6 rounded-xl shadow-[0_0_30px_rgba(79,70,229,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Lightbulb className="w-24 h-24 text-indigo-500" /></div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs font-bold rounded-full mb-4">
                    Generated by ASIE (BioGPT + Causal Engine)
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-4 leading-relaxed">
                    H1: IL-6 receptor blockade is only efficacious in a highly specific temporal window characterized by rising ferritin velocity (&gt;2x/24h) prior to severe hypoxia, driven by the sIL-6R trans-signaling pathway rather than classic signaling.
                  </h4>
                  
                  <div className="mt-6 border-t border-indigo-500/20 pt-4 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Mechanistic Path</div>
                      <div className="text-sm font-mono text-slate-300">ADAM17 cleavage → sIL-6R → gp130</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-widest mb-1">Validation Requirement</div>
                      <div className="text-sm font-mono text-slate-300">scRNA-seq of alveolar macrophages</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                   <button onClick={() => setActivePhase('experiment')} className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold rounded hover:bg-slate-200 transition-colors">
                     Proceed to Experiment Design <ChevronRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            )}

            {activePhase === 'experiment' && (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-white mb-6">Experimental Roadmap</h3>
                <div className="space-y-4">
                   <div className="bg-[#0f172a] border border-slate-700 p-5 rounded-xl border-l-4 border-l-indigo-500">
                     <h4 className="font-bold text-white text-sm mb-1">Step 1: In-silico Retrospective Analysis</h4>
                     <p className="text-sm text-slate-400 mb-3">Query MIMIC-IV database for patients with temporal CRP/Ferritin labs prior to IL-6 inhibitor administration.</p>
                     <div className="flex gap-2">
                       <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">n = 1,420 estimated</span>
                       <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-slate-300">Propensity matched</span>
                     </div>
                   </div>
                   <div className="bg-[#0f172a] border border-slate-700 p-5 rounded-xl border-l-4 border-l-fuchsia-500 opacity-50">
                     <h4 className="font-bold text-white text-sm mb-1">Step 2: In-vitro Trans-signaling Model</h4>
                     <p className="text-sm text-slate-400">Pending Step 1 completion. Will utilize human precision-cut lung slices (hPCLS).</p>
                   </div>
                </div>
              </div>
            )}
            
            {activePhase === 'manuscript' && (
              <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4">
                <h3 className="text-xl font-bold text-white mb-6">Manuscript Draft Status</h3>
                <div className="bg-[#0f172a] border border-slate-700 rounded-xl overflow-hidden">
                   <div className="bg-slate-900 p-3 border-b border-slate-700 flex justify-between items-center">
                     <span className="text-xs font-mono text-slate-400">draft_v0.1.tex</span>
                     <span className="text-[10px] bg-indigo-900/50 text-indigo-400 px-2 py-1 rounded">Auto-updating</span>
                   </div>
                   <div className="p-6 font-serif text-slate-300 text-sm leading-relaxed space-y-4">
                     <h1 className="text-2xl text-white font-bold mb-4">Temporal Dynamics of Biomarker Velocity Determine IL-6 Blockade Efficacy in Hyperinflammatory Syndromes</h1>
                     <p><strong className="text-white">Abstract.</strong> The efficacy of interleukin-6 (IL-6) receptor antagonists in cytokine storm syndromes has demonstrated significant heterogeneity across clinical trials. Here, we present a computational and retrospective analysis...</p>
                     <div className="p-4 bg-slate-900 border border-slate-800 rounded italic text-slate-500">
                       [Waiting for in-silico retrospective data to populate Results section...]
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
