import React, { useState, useEffect } from 'react';
import { Dna, Play, StopCircle, CheckCircle, Loader2, Database, Zap, Cpu, Maximize } from 'lucide-react';

const BioSimulationWorkspace = () => {
  const [sequence, setSequence] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);

  const sampleSequence = ">sp|P04637|P53_HUMAN Cellular tumor antigen p53 OS=Homo sapiens\nMEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSPLPSQAMDDLMLSPDDIEQWFTEDPGP\nDEAPRMPEAAPPVAPAPAAPTPAAPAPAPSWPLSSSVPSQKTYQGSYGFRLGFLHSGTAK\nSVTCTYSPALNKMFCQLAKTCPVQLWVDSTPPPGTRVRAMAIYKQSQHMTEVVRRCPHHE";

  const handleSimulate = () => {
    if (!sequence) return;
    setIsSimulating(true);
    setSimulationComplete(false);
    setProgress(0);

    // Simulate heavy compute folding
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimulationComplete(true);
          return 100;
        }
        return oldProgress + 2;
      });
    }, 100);
  };

  const handleUseSample = () => {
    setSequence(sampleSequence);
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-gray-100 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center">
            <Dna className="w-10 h-10 mr-3 text-cyan-400" />
            BioSimulation Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 8: Molecular Dynamics & Protein Folding (AlphaFold Architecture)</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-[#0a1526] rounded-full border border-cyan-900/50">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse mr-2 shadow-[0_0_8px_#06b6d4]"></div>
            <span className="text-sm text-cyan-300 font-mono">GPU Cluster: H100 (x8) Allocated</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0a1526] border border-gray-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            {/* Cybernetic Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
            
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="font-bold text-gray-200">Protein Target</h2>
              <button onClick={handleUseSample} className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-900/20 px-2 py-1 rounded">
                LOAD FASTA
              </button>
            </div>
            
            <textarea 
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Paste raw amino acid sequence (FASTA format)..."
              className="w-full h-48 bg-[#030712] border border-gray-700 rounded-xl p-3 text-cyan-50 font-mono text-xs focus:outline-none focus:border-cyan-500 transition-colors resize-none mb-4 shadow-inner"
            />
            
            <button 
              onClick={handleSimulate}
              disabled={!sequence || isSimulating}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg ${
                !sequence ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 
                isSimulating ? 'bg-cyan-900 text-cyan-100' : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40'
              }`}
            >
              {isSimulating ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Computing Folds...</>
              ) : (
                <><Play className="w-5 h-5 mr-2 fill-current" /> Initialize Simulation</>
              )}
            </button>
          </div>
          
          {/* Telemetry Box */}
          <div className="bg-[#0a1526] border border-gray-800 rounded-2xl p-5 shadow-2xl">
            <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-4 border-b border-gray-800 pb-2">Cluster Telemetry</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm flex items-center"><Cpu className="w-4 h-4 mr-2" /> VRAM Usage</span>
                <span className="font-mono text-gray-300 text-sm">{isSimulating ? '64.2 GB' : '1.4 GB'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm flex items-center"><Zap className="w-4 h-4 mr-2" /> TFLOPS</span>
                <span className="font-mono text-gray-300 text-sm">{isSimulating ? '985.4' : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm flex items-center"><Database className="w-4 h-4 mr-2" /> PDB Templates</span>
                <span className="font-mono text-gray-300 text-sm">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Simulation Window */}
        <div className="lg:col-span-3">
          <div className="bg-[#0a1526] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl h-[700px] flex flex-col relative">
            
            {/* Viewport Header */}
            <div className="h-12 bg-[#0f172a] border-b border-gray-800 flex items-center justify-between px-4 z-10">
              <div className="flex space-x-2">
                <div className="text-xs font-mono text-gray-500 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> X-RAY
                </div>
                <div className="text-xs font-mono text-cyan-400 flex items-center ml-4">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></span> MSA COMPUTATION
                </div>
              </div>
              <Maximize className="w-4 h-4 text-gray-500 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Viewport Area */}
            <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-black overflow-hidden flex items-center justify-center">
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

              {!isSimulating && !simulationComplete ? (
                <div className="text-center z-10">
                  <Dna className="w-24 h-24 mx-auto text-gray-800 mb-4" />
                  <p className="text-gray-600 font-mono">SIMULATION KERNEL IDLE</p>
                </div>
              ) : null}

              {/* Simulation Animation */}
              {isSimulating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* CSS "Molecule" spinning */}
                  <div className="relative w-64 h-64 animate-[spin_4s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 w-6 h-6 bg-cyan-500 rounded-full blur-sm shadow-[0_0_20px_#06b6d4]"></div>
                    <div className="absolute bottom-0 left-1/2 w-8 h-8 bg-blue-500 rounded-full blur-sm shadow-[0_0_20px_#3b82f6]"></div>
                    <div className="absolute left-0 top-1/2 w-4 h-4 bg-purple-500 rounded-full blur-sm shadow-[0_0_20px_#a855f7]"></div>
                    <div className="absolute right-0 top-1/2 w-7 h-7 bg-indigo-500 rounded-full blur-sm shadow-[0_0_20px_#6366f1]"></div>
                    <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                      <line x1="50" y1="0" x2="50" y2="100" stroke="#06b6d4" strokeWidth="0.5" />
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#3b82f6" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  {/* Progress Bar overlay */}
                  <div className="absolute bottom-20 w-1/2 max-w-md">
                    <div className="flex justify-between text-xs font-mono text-cyan-400 mb-2">
                      <span>Evoformer Iteration</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 transition-all duration-100" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Scrolling matrix code */}
                  <div className="absolute top-10 left-10 text-[10px] font-mono text-cyan-900/50 hidden md:block">
                    <div>[MSA] seq_id:0.98 aligned</div>
                    <div>[GPU0] tensor allocation: OK</div>
                    <div>[Evo] block_idx: 12</div>
                    <div>[Attn] computing pair rep...</div>
                  </div>
                </div>
              )}

              {/* Completed Structure Display (Mock) */}
              {simulationComplete && (
                <div className="absolute inset-0 flex items-center justify-center z-10 animate-fade-in">
                  {/* Beautiful mock 3D render using an abstract CSS composition to look like a folded protein */}
                  <div className="relative w-96 h-96">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Protein_BRCA1_PDB_1jm7.png/640px-Protein_BRCA1_PDB_1jm7.png" 
                      alt="3D Protein Structure" 
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_30px_rgba(6,182,212,0.3)] animate-[float_6s_ease-in-out_infinite]"
                      style={{
                         filter: 'hue-rotate(180deg) saturate(1.5) contrast(1.2)'
                      }}
                    />
                    
                    {/* UI Overlay on the protein */}
                    <div className="absolute top-1/4 -right-12 bg-black/60 backdrop-blur border border-gray-700 p-2 rounded-lg text-xs font-mono flex items-center shadow-xl">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                      Helix α4 <br/> pLDDT: 98.2
                    </div>
                    <div className="absolute bottom-1/4 -left-8 bg-black/60 backdrop-blur border border-gray-700 p-2 rounded-lg text-xs font-mono flex items-center shadow-xl">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      Loop Region <br/> pLDDT: 64.1
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="absolute bottom-6 right-6 bg-[#0a1526]/90 backdrop-blur-md border border-gray-700 p-5 rounded-xl shadow-2xl w-72">
                    <div className="flex items-center text-emerald-400 mb-3 border-b border-gray-700 pb-2">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <h4 className="font-bold">Folding Complete</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-gray-400 uppercase">Global pLDDT (Confidence)</div>
                        <div className="text-2xl font-bold text-white font-mono">92.4 <span className="text-sm text-gray-500 font-sans font-normal">/ 100</span></div>
                        <div className="w-full bg-gray-800 h-1.5 mt-1 rounded-full">
                          <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '92.4%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                         <div className="bg-gray-800/50 p-2 rounded">
                           <div className="text-[10px] text-gray-400">RMSD Estimate</div>
                           <div className="text-sm font-mono text-gray-200">1.2 Å</div>
                         </div>
                         <div className="bg-gray-800/50 p-2 rounded">
                           <div className="text-[10px] text-gray-400">Compute Time</div>
                           <div className="text-sm font-mono text-gray-200">5.2 sec</div>
                         </div>
                      </div>
                      <button className="w-full py-2 mt-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-sm text-white transition-colors">
                        Download PDB File
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default BioSimulationWorkspace;
