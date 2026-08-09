import React, { useState, useEffect } from 'react';
import { Dna, Play, StopCircle, CheckCircle, Loader2, Database, Zap, Cpu, Maximize, Network, Share2 } from 'lucide-react';

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
    <div className="min-h-screen bg-[#020202] text-gray-200 p-8 font-sans overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-900 pb-4 relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 8 • Molecular Dynamics</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Dna className="w-10 h-10 mr-3 text-cyan-400 animate-pulse" />
            BioSimulation Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#06b6d4]"></div>
            <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">GPU Cluster: H100 (x16)</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Input & Controls */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-blue-500"></div>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-200 flex items-center text-sm tracking-wide">
                <Share2 className="w-4 h-4 mr-2 text-cyan-400" />
                PROTEIN TARGET
              </h2>
              <button onClick={handleUseSample} className="text-[10px] font-mono font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-900/50 px-2 py-1 rounded">
                LOAD FASTA
              </button>
            </div>
            
            <textarea 
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Paste raw amino acid sequence (FASTA format)..."
              className="w-full h-48 bg-[#0a0a0c] border border-gray-800 rounded-xl p-4 text-cyan-50 font-mono text-[11px] focus:outline-none focus:border-cyan-500 transition-colors resize-none mb-6 shadow-inner"
            />
            
            <button 
              onClick={handleSimulate}
              disabled={!sequence || isSimulating}
              className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center transition-all tracking-wide text-sm ${
                !sequence ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 
                isSimulating ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-cyan-600 text-white hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
              }`}
            >
              {isSimulating ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> FOLDING IN PROGRESS...</>
              ) : (
                <><Play className="w-5 h-5 mr-2 fill-current" /> INITIALIZE ALPHAFOLD KERNEL</>
              )}
            </button>
          </div>
          
          {/* Telemetry Box */}
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500">
            <h3 className="font-bold text-gray-400 text-xs uppercase tracking-widest mb-5 border-b border-gray-900 pb-3 flex items-center">
              <Network className="w-4 h-4 mr-2" />
              Cluster Telemetry
            </h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><Cpu className="w-3.5 h-3.5 mr-2 text-cyan-500" /> VRAM Usage</span>
                <span className="font-mono text-gray-200 text-sm">{isSimulating ? '124.2 GB' : '1.4 GB'}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-900 pb-2">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><Zap className="w-3.5 h-3.5 mr-2 text-yellow-500" /> TFLOPS</span>
                <span className="font-mono text-gray-200 text-sm">{isSimulating ? '1,985.4' : '0.0'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center"><Database className="w-3.5 h-3.5 mr-2 text-emerald-500" /> PDB Templates</span>
                <span className="font-mono text-emerald-400 text-xs bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/50">SYNCED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Simulation Window */}
        <div className="lg:col-span-8">
          <div className="bg-[#030303] border border-gray-800 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.02)] h-[700px] flex flex-col relative group hover:border-gray-600 transition-colors duration-500">
            
            {/* Viewport Header */}
            <div className="h-12 bg-[#0a0a0c] border-b border-gray-900 flex items-center justify-between px-6 z-20">
              <div className="flex space-x-6">
                <div className="text-[10px] font-mono font-bold text-gray-500 flex items-center tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-rose-500 mr-2 shadow-[0_0_5px_#f43f5e]"></span> MSA ALIGNMENT
                </div>
                <div className="text-[10px] font-mono font-bold text-cyan-400 flex items-center tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 mr-2 shadow-[0_0_5px_#06b6d4]"></span> 3D STRUCTURE
                </div>
              </div>
              <Maximize className="w-4 h-4 text-gray-600 cursor-pointer hover:text-white transition-colors" />
            </div>

            {/* Viewport Area */}
            <div className="flex-1 relative bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black overflow-hidden flex items-center justify-center">
              
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:40px_40px]"></div>

              {!isSimulating && !simulationComplete ? (
                <div className="text-center z-10 opacity-30">
                  <Dna className="w-24 h-24 mx-auto text-gray-600 mb-6" />
                  <p className="text-gray-500 font-mono text-sm tracking-[0.3em]">SIMULATION KERNEL IDLE</p>
                </div>
              ) : null}

              {/* Simulation Animation */}
              {isSimulating && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {/* CSS "Molecule" spinning */}
                  <div className="relative w-72 h-72 animate-[spin_6s_linear_infinite]">
                    <div className="absolute top-0 left-1/2 w-8 h-8 bg-cyan-500 rounded-full blur-md shadow-[0_0_30px_#06b6d4]"></div>
                    <div className="absolute bottom-0 left-1/2 w-10 h-10 bg-blue-500 rounded-full blur-md shadow-[0_0_30px_#3b82f6]"></div>
                    <div className="absolute left-0 top-1/2 w-6 h-6 bg-fuchsia-500 rounded-full blur-md shadow-[0_0_30px_#d946ef]"></div>
                    <div className="absolute right-0 top-1/2 w-9 h-9 bg-indigo-500 rounded-full blur-md shadow-[0_0_30px_#6366f1]"></div>
                    <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100">
                      <line x1="50" y1="0" x2="50" y2="100" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2"/>
                      <line x1="0" y1="50" x2="100" y2="50" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2"/>
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#6366f1" strokeWidth="0.5" />
                    </svg>
                  </div>
                  
                  {/* Progress Bar overlay */}
                  <div className="absolute bottom-24 w-1/2 max-w-md">
                    <div className="flex justify-between text-[10px] font-mono font-bold text-cyan-400 mb-2 uppercase tracking-widest">
                      <span>Evoformer Iteration</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                      <div className="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-100 shadow-[0_0_10px_#06b6d4]" style={{ width: `${progress}%` }}></div>
                    </div>
                  </div>
                  
                  {/* Scrolling matrix code */}
                  <div className="absolute top-12 left-12 text-[10px] font-mono text-cyan-500/60 hidden md:block space-y-1">
                    <div><span className="text-gray-600">[MSA]</span> seq_id:0.98 aligned against Uniref90</div>
                    <div><span className="text-gray-600">[GPU0]</span> tensor allocation: 84.2GB OK</div>
                    <div><span className="text-gray-600">[Evo]</span> block_idx: {Math.floor(progress / 2)} / 48</div>
                    <div><span className="text-gray-600">[Attn]</span> computing pair representation...</div>
                  </div>
                </div>
              )}

              {/* Completed Structure Display (Mock) */}
              {simulationComplete && (
                <div className="absolute inset-0 flex items-center justify-center z-10 animate-fade-in">
                  
                  {/* Beautiful mock 3D render using an abstract CSS composition to look like a folded protein */}
                  <div className="relative w-[500px] h-[500px]">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Protein_BRCA1_PDB_1jm7.png/640px-Protein_BRCA1_PDB_1jm7.png" 
                      alt="3D Protein Structure" 
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_0_50px_rgba(6,182,212,0.4)] animate-[float_8s_ease-in-out_infinite]"
                      style={{
                         filter: 'hue-rotate(180deg) saturate(2) contrast(1.5) brightness(1.2)'
                      }}
                    />
                    
                    {/* UI Overlay on the protein */}
                    <div className="absolute top-1/4 -right-8 bg-black/80 backdrop-blur-md border border-gray-700 p-3 rounded-lg text-xs font-mono flex items-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 shadow-[0_0_5px_#10b981]"></div>
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase">Alpha Helix α4</div>
                        <div className="text-emerald-400 font-bold">pLDDT: 98.2</div>
                      </div>
                    </div>
                    <div className="absolute bottom-1/4 -left-12 bg-black/80 backdrop-blur-md border border-gray-700 p-3 rounded-lg text-xs font-mono flex items-center shadow-[0_0_20px_rgba(0,0,0,0.5)] z-20">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 shadow-[0_0_5px_#f59e0b]"></div>
                      <div>
                        <div className="text-gray-400 text-[10px] uppercase">Disordered Loop</div>
                        <div className="text-amber-400 font-bold">pLDDT: 64.1</div>
                      </div>
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="absolute bottom-8 right-8 bg-[#050505]/95 backdrop-blur-xl border border-gray-800 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] w-80 z-30">
                    <div className="flex items-center text-emerald-400 mb-5 border-b border-gray-800 pb-3">
                      <CheckCircle className="w-5 h-5 mr-3" />
                      <h4 className="font-bold text-sm tracking-wide uppercase">Folding Complete</h4>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Global pLDDT (Confidence)</div>
                        <div className="text-3xl font-black text-white font-mono flex items-baseline">
                          92.4 <span className="text-xs text-gray-600 font-sans font-normal ml-2 tracking-widest">/ 100</span>
                        </div>
                        <div className="w-full bg-gray-900 h-1.5 mt-2 rounded-full border border-gray-800 overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-600 to-cyan-400 h-full rounded-full shadow-[0_0_10px_#06b6d4]" style={{ width: '92.4%' }}></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-900">
                         <div className="bg-[#0a0a0c] p-3 rounded-xl border border-gray-800">
                           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">RMSD Est.</div>
                           <div className="text-base font-mono text-gray-200">1.2 Å</div>
                         </div>
                         <div className="bg-[#0a0a0c] p-3 rounded-xl border border-gray-800">
                           <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Time</div>
                           <div className="text-base font-mono text-gray-200">5.2s</div>
                         </div>
                      </div>
                      <button className="w-full py-3 mt-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-500 rounded-xl text-xs font-bold uppercase tracking-widest text-white transition-colors">
                        Download PDB Data
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
          animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(3deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default BioSimulationWorkspace;
