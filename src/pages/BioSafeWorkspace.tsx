import React, { useState } from 'react';
import { Skull, ShieldAlert, ShieldCheck, Activity, Search, Loader2, FlaskConical, AlertOctagon, Zap, Shield, Microscope } from 'lucide-react';

const BioSafeWorkspace = () => {
  const [smiles, setSmiles] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Sample: Aspirin (Acetylsalicylic acid)
  const sampleSmiles = "CC(=O)OC1=CC=CC=C1C(=O)O";

  const handleAnalyze = () => {
    if (!smiles) return;
    setIsAnalyzing(true);
    setAnalysisComplete(false);

    // Simulate AI toxicology analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  const handleUseSample = () => {
    setSmiles(sampleSmiles);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 12 • Safety & Tox Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Skull className="w-10 h-10 mr-3 text-red-600 animate-pulse" />
            BioSafe Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#dc2626]"></div>
             <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">Tox21 Node: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Input */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>
             
             <div className="flex items-center justify-between mb-6 mt-2">
              <h2 className="text-sm font-bold text-gray-400 flex items-center tracking-widest uppercase">
                <FlaskConical className="w-4 h-4 mr-2 text-red-500" />
                Compound Input
              </h2>
              <button 
                onClick={handleUseSample} 
                className="text-[10px] font-mono font-bold text-red-400 hover:text-red-300 transition-colors bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 px-2 py-1 rounded uppercase tracking-widest"
              >
                LOAD ASPIRIN
              </button>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              <div>
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">SMILES Notation</label>
                <textarea 
                  value={smiles}
                  onChange={(e) => setSmiles(e.target.value)}
                  placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                  className="w-full h-24 mt-2 bg-[#0a0a0c] border border-gray-800 rounded-xl p-3 text-gray-200 font-mono text-sm focus:outline-none focus:border-red-600 transition-colors resize-none shadow-inner"
                />
              </div>

              {/* Mock 2D Structure Render */}
              <div className="flex-1 min-h-[200px] border border-gray-800 rounded-xl flex items-center justify-center bg-[#030303] relative overflow-hidden group shadow-inner">
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:10px_10px]"></div>

                {!smiles ? (
                  <div className="flex flex-col items-center justify-center text-gray-600/50">
                    <Microscope className="w-10 h-10 mb-2" />
                    <span className="font-mono text-[10px] uppercase tracking-widest font-bold">2D Structure Preview</span>
                  </div>
                ) : (
                  <>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aspirin-skeletal.svg/640px-Aspirin-skeletal.svg.png" 
                      alt="Molecule Structure" 
                      className={`h-3/4 object-contain transition-all duration-700 z-10 ${isAnalyzing ? 'blur-sm scale-110 opacity-50' : 'blur-0 scale-100 opacity-90'}`}
                      style={{ filter: 'invert(1) drop-shadow(0 0 10px rgba(255,255,255,0.2))' }}
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-red-900/10 z-20">
                        <div className="w-full h-1 bg-red-500 shadow-[0_0_20px_#ef4444]" style={{
                           animationName: 'scanVertical',
                           animationDuration: '2s',
                           animationIterationCount: 'infinite',
                           animationDirection: 'alternate',
                           animationTimingFunction: 'ease-in-out'
                        }}></div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!smiles || isAnalyzing}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all tracking-widest uppercase text-sm ${
                  !smiles || isAnalyzing ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 'bg-red-700 text-white hover:bg-red-600 shadow-[0_0_20px_rgba(185,28,28,0.4)]'
                }`}
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SIMULATING TOXICITY...</>
                ) : (
                  <><Search className="w-5 h-5 mr-2" /> PREDICT TOXICOLOGY</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Toxicity Profiles */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-3 mb-6 tracking-widest uppercase">
              <Activity className="w-4 h-4 mr-2 text-red-500" />
              Toxicity Profile Report
            </h3>

            {!analysisComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-xs font-mono font-bold uppercase tracking-widest">
                 {isAnalyzing ? (
                   <>
                     <Activity className="w-16 h-16 mb-4 animate-pulse text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
                     <p className="text-red-500/80">Querying Tox21 & ClinTox pathways...</p>
                   </>
                 ) : (
                   <>
                     <AlertOctagon className="w-16 h-16 mb-4 opacity-30 text-gray-700" />
                     <p className="opacity-50">AWAITING MOLECULAR INPUT</p>
                   </>
                 )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in space-y-8">
                
                {/* Top Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Safety Badge */}
                  <div className="bg-emerald-900/10 border border-emerald-900/30 p-6 rounded-2xl flex items-center shadow-inner">
                    <div className="bg-emerald-900/30 p-3 rounded-full mr-4 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-emerald-400 text-lg uppercase tracking-widest mb-1">Generally Safe</h4>
                      <p className="text-xs text-emerald-100/50 font-mono">High therapeutic index predicted.</p>
                    </div>
                  </div>
                  
                  {/* LD50 Estimator */}
                  <div className="bg-[#0a0a0c] border border-gray-800 p-6 rounded-2xl flex justify-between items-center shadow-inner relative overflow-hidden">
                     <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-900/20 to-transparent pointer-events-none"></div>
                     <div className="z-10">
                       <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center">
                         <Zap className="w-3 h-3 mr-1 text-orange-500" />
                         Predicted Oral LD50 (Rat)
                       </div>
                       <div className="text-4xl font-black font-mono text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]">200 <span className="text-sm text-orange-500/50 tracking-normal">mg/kg</span></div>
                     </div>
                     <div className="w-16 h-16 rounded-full border-4 border-orange-500/30 flex items-center justify-center text-xs font-black text-orange-400 z-10 bg-orange-900/10 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                       CAT 3
                     </div>
                  </div>
                </div>

                {/* Toxicity Radar / Bars */}
                <div className="bg-[#030303] border border-gray-800 rounded-2xl p-6 shadow-inner flex-1">
                  <h4 className="text-[10px] font-bold text-gray-500 mb-6 uppercase tracking-widest border-b border-gray-900 pb-2">End-Point Predictions</h4>
                  <div className="space-y-6">
                    
                    {/* Bar 1 */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400 font-bold tracking-wider">Hepatotoxicity (Liver)</span>
                        <span className="text-emerald-400 font-mono font-bold bg-emerald-900/20 px-2 py-0.5 rounded text-[10px]">0.02 (Low Risk)</span>
                      </div>
                      <div className="w-full bg-gray-900 border border-gray-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_#10b981]" style={{ width: '10%' }}></div>
                      </div>
                    </div>

                    {/* Bar 2 */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400 font-bold tracking-wider">Cardiotoxicity (hERG block)</span>
                        <span className="text-emerald-400 font-mono font-bold bg-emerald-900/20 px-2 py-0.5 rounded text-[10px]">0.05 (Low Risk)</span>
                      </div>
                      <div className="w-full bg-gray-900 border border-gray-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_#10b981]" style={{ width: '15%' }}></div>
                      </div>
                    </div>

                    {/* Bar 3 */}
                    <div>
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-gray-400 font-bold tracking-wider">Mutagenicity (Ames)</span>
                        <span className="text-emerald-400 font-mono font-bold bg-emerald-900/20 px-2 py-0.5 rounded text-[10px]">Negative</span>
                      </div>
                      <div className="w-full bg-gray-900 border border-gray-800 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full shadow-[0_0_10px_#10b981]" style={{ width: '5%' }}></div>
                      </div>
                    </div>

                    {/* Bar 4 - Warning */}
                    <div className="bg-orange-900/10 p-4 rounded-xl border border-orange-900/30">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="text-orange-500 font-black flex items-center tracking-wider uppercase"><ShieldAlert className="w-3.5 h-3.5 mr-2"/> Gastrointestinal Toxicity</span>
                        <span className="text-orange-400 font-mono font-bold bg-orange-900/40 px-2 py-0.5 rounded text-[10px] border border-orange-500/50">0.82 (High Risk)</span>
                      </div>
                      <div className="w-full bg-gray-900 border border-gray-800 rounded-full h-2.5 overflow-hidden mb-3">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full shadow-[0_0_10px_#f97316]" style={{ width: '82%' }}></div>
                      </div>
                      <p className="text-[10px] text-orange-200/50 font-mono uppercase tracking-widest flex items-center">
                        <AlertOctagon className="w-3 h-3 mr-1" /> Structural alerts indicate potential for mucosal irritation (COX-1 inhibition).
                      </p>
                    </div>

                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scanVertical {
          0% { transform: translateY(-30px); }
          100% { transform: translateY(200px); }
        }
      `}</style>
    </div>
  );
};

export default BioSafeWorkspace;
