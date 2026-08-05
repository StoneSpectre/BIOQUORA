import React, { useState } from 'react';
import { Skull, ShieldAlert, ShieldCheck, Activity, Search, Loader2, FlaskConical, AlertOctagon } from 'lucide-react';

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
    <div className="min-h-screen bg-[#050505] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 flex items-center">
            <Skull className="w-10 h-10 mr-3 text-red-500" />
            BioSafe Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 12: In Silico Toxicology & Safety Prediction</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-red-900/50">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
             <span className="text-sm text-red-400 font-mono">Tox21 Database: Connected</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input */}
        <div className="lg:col-span-1 space-y-6">
          
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-600"></div>
             
             <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="font-bold text-gray-200 flex items-center">
                <FlaskConical className="w-5 h-5 mr-2 text-red-400" />
                Compound Input
              </h2>
              <button onClick={handleUseSample} className="text-xs font-mono text-red-400 hover:text-red-300 transition-colors bg-red-900/20 px-2 py-1 rounded">
                LOAD ASPIRIN
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider">SMILES Notation</label>
                <textarea 
                  value={smiles}
                  onChange={(e) => setSmiles(e.target.value)}
                  placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                  className="w-full h-24 mt-2 bg-[#000000] border border-gray-700 rounded-xl p-3 text-gray-200 font-mono text-sm focus:outline-none focus:border-red-500 transition-colors resize-none shadow-inner"
                />
              </div>

              {/* Mock 2D Structure Render */}
              <div className="h-48 border border-dashed border-gray-700 rounded-xl flex items-center justify-center bg-black/50 relative overflow-hidden group">
                {!smiles ? (
                  <span className="text-gray-600 text-sm">2D Structure Preview</span>
                ) : (
                  <>
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Aspirin-skeletal.svg/640px-Aspirin-skeletal.svg.png" 
                      alt="Molecule Structure" 
                      className={`h-3/4 object-contain transition-all duration-500 ${isAnalyzing ? 'blur-sm scale-110' : 'blur-0 scale-100'}`}
                      style={{ filter: 'invert(1) opacity(0.8)' }}
                    />
                    {isAnalyzing && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                        <div className="w-full h-1 bg-red-500 shadow-[0_0_15px_#ef4444] animate-[scan_1s_ease-in-out_infinite]" style={{
                           animationName: 'scanVertical',
                           animationDuration: '2s',
                           animationIterationCount: 'infinite',
                           animationDirection: 'alternate'
                        }}></div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <button 
                onClick={handleAnalyze}
                disabled={!smiles || isAnalyzing}
                className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all ${
                  !smiles ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 
                  isAnalyzing ? 'bg-red-900 text-red-100' : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-lg shadow-red-900/20'
                }`}
              >
                {isAnalyzing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Simulating Toxicity...</>
                ) : (
                  <><Search className="w-5 h-5 mr-2" /> Predict Toxicology</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Toxicity Profiles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <Activity className="w-6 h-6 mr-2 text-red-400" />
              Toxicity Profile Report
            </h3>

            {!analysisComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                 {isAnalyzing ? (
                   <>
                     <Activity className="w-16 h-16 mb-4 animate-pulse text-red-500" />
                     <p className="font-mono text-sm text-red-400">Querying Tox21 & ClinTox pathways...</p>
                   </>
                 ) : (
                   <>
                     <AlertOctagon className="w-16 h-16 mb-4 opacity-20" />
                     <p className="font-mono text-sm">AWAITING MOLECULAR INPUT</p>
                   </>
                 )}
              </div>
            ) : (
              <div className="flex-1 flex flex-col animate-fade-in space-y-8">
                
                {/* Top Stats */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Safety Badge */}
                  <div className="bg-emerald-900/20 border border-emerald-900/40 p-4 rounded-xl flex items-center">
                    <ShieldCheck className="w-10 h-10 text-emerald-500 mr-4 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-400 text-lg">Generally Safe</h4>
                      <p className="text-xs text-gray-400 mt-1">High therapeutic index predicted.</p>
                    </div>
                  </div>
                  
                  {/* LD50 Estimator */}
                  <div className="bg-[#0a0a0a] border border-gray-800 p-4 rounded-xl flex justify-between items-center">
                     <div>
                       <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Predicted Oral LD50 (Rat)</div>
                       <div className="text-3xl font-bold font-mono text-orange-400">200 <span className="text-sm text-gray-500">mg/kg</span></div>
                     </div>
                     <div className="w-12 h-12 rounded-full border-4 border-orange-500 flex items-center justify-center text-xs font-bold text-orange-400">
                       CAT 3
                     </div>
                  </div>
                </div>

                {/* Toxicity Radar / Bars */}
                <div>
                  <h4 className="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider">End-Point Predictions</h4>
                  <div className="space-y-4">
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Hepatotoxicity (Liver)</span>
                        <span className="text-emerald-400 font-mono">0.02 (Low Risk)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Cardiotoxicity (hERG block)</span>
                        <span className="text-emerald-400 font-mono">0.05 (Low Risk)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">Mutagenicity (Ames)</span>
                        <span className="text-emerald-400 font-mono">Negative</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-orange-400 font-bold flex items-center"><ShieldAlert className="w-3 h-3 mr-1"/> Gastrointestinal Toxicity</span>
                        <span className="text-orange-400 font-mono font-bold">0.82 (High Risk)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">Warning: Structural alerts indicate potential for mucosal irritation (COX-1 inhibition).</p>
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
          animation: fadeIn 0.8s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scanVertical {
          0% { transform: translateY(-50px); }
          100% { transform: translateY(150px); }
        }
      `}</style>
    </div>
  );
};

export default BioSafeWorkspace;
