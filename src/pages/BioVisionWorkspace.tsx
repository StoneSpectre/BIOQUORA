import React, { useState } from 'react';
import { Upload, Activity, Brain, CheckCircle, AlertTriangle, Play, Loader2, Scan, Eye, Crosshair } from 'lucide-react';

const BioVisionWorkspace = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => {
      handleScan();
    }, 500);
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI backend analyzing the image via biovision_engine.py
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-200 p-8 font-sans overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-900 pb-4 relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 6 • Radiomics & Pathology</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Activity className="w-10 h-10 mr-3 text-emerald-400 animate-pulse" />
            BioVision CNN Analysis
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#10b981]"></div>
            <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">ENGINE ONLINE</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Image Viewer */}
        <div className="lg:col-span-8 space-y-6 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl min-h-[600px] flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
            
            <div className="p-4 bg-[#0a0a0c] border-b border-gray-900 flex justify-between items-center z-10">
              <h2 className="font-semibold text-gray-200 flex items-center tracking-wide text-sm">
                <Scan className="w-4 h-4 mr-2 text-emerald-400" />
                DICOM/NIFTI PRIMARY CONSOLE
              </h2>
              <div className="flex space-x-3 items-center">
                <span className="text-xs text-gray-500 font-mono bg-black px-2 py-1 rounded">SLICE: 42/128</span>
                <span className="text-xs text-gray-500 font-mono bg-black px-2 py-1 rounded">AXIAL</span>
              </div>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center bg-black p-6 overflow-hidden">
              {/* Grid overlay for medical feel */}
              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
              
              {/* Crosshairs */}
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-emerald-500/20 pointer-events-none"></div>
              <div className="absolute top-0 left-1/2 w-[1px] h-full bg-emerald-500/20 pointer-events-none"></div>

              {!uploaded ? (
                <div 
                  onClick={handleUpload}
                  className="relative z-10 border-2 border-dashed border-gray-700 rounded-2xl w-full max-w-md h-64 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-900/10 transition-all group/upload"
                >
                  <Upload className="w-12 h-12 text-gray-600 group-hover/upload:text-emerald-400 transition-colors mb-4" />
                  <p className="text-lg font-bold text-gray-400 group-hover/upload:text-gray-200">Initialize T1/T2 Scan</p>
                  <p className="text-xs font-mono text-gray-600 mt-2 uppercase tracking-widest">Auto-detects artifacts</p>
                </div>
              ) : (
                <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center">
                  
                  {/* Mock Brain MRI Image with High Contrast Filter */}
                  <div className="relative group/scan">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/T1t2PD.jpg/640px-T1t2PD.jpg" 
                      alt="Brain MRI" 
                      className="object-contain h-[500px] w-auto filter contrast-125 grayscale"
                    />
                    
                    {/* Scanning Animation */}
                    {isScanning && (
                      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                        <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10b981] animate-[scan_2s_ease-in-out_infinite]" style={{
                          animationName: 'scan',
                          animationDuration: '2s',
                          animationIterationCount: 'infinite',
                          animationDirection: 'alternate'
                        }}></div>
                        
                        {/* Scanning telemetry */}
                        <div className="absolute bottom-4 left-4 text-emerald-400 font-mono text-[10px] space-y-1">
                           <div>Extracting CNN Features...</div>
                           <div>Applying ResNet-152 Filters...</div>
                           <div>Mapping Tissue Density...</div>
                        </div>
                      </div>
                    )}

                    {/* AI Bounding Box (Appears after scan) */}
                    {scanComplete && (
                      <div className="absolute border-[1.5px] border-rose-500 bg-rose-500/10 shadow-[0_0_15px_rgba(244,63,94,0.3)] animate-pulse" 
                           style={{ top: '38%', left: '35%', width: '12%', height: '18%' }}>
                        
                        {/* Target reticle corners */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-rose-400"></div>
                        <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-rose-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-rose-400"></div>
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-rose-400"></div>

                        <div className="absolute -top-6 -right-2 bg-rose-500 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(244,63,94,0.5)]">
                          OBJ_DETECTED
                        </div>
                        
                        {/* Line connecting to readout */}
                        <svg className="absolute top-1/2 left-full overflow-visible pointer-events-none" width="150" height="2">
                           <line x1="0" y1="0" x2="150" y2="-50" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
                           <circle cx="150" cy="-50" r="3" fill="#f43f5e" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Control Bar */}
            <div className="p-4 bg-[#0a0a0c] border-t border-gray-900 flex items-center justify-between z-10">
              <div className="flex space-x-2 bg-black p-1 rounded-lg border border-gray-800">
                <button className="px-4 py-1.5 bg-gray-800 rounded text-xs font-bold text-gray-200 uppercase tracking-wider">Axial</button>
                <button className="px-4 py-1.5 hover:bg-gray-900 rounded text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors">Coronal</button>
                <button className="px-4 py-1.5 hover:bg-gray-900 rounded text-xs font-bold text-gray-500 uppercase tracking-wider transition-colors">Sagittal</button>
              </div>
              
              <button 
                onClick={handleScan}
                disabled={!uploaded || isScanning || scanComplete}
                className={`flex items-center px-6 py-2.5 rounded-lg font-bold text-sm tracking-wide transition-all ${
                  !uploaded || scanComplete ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 
                  isScanning ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isScanning ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> EXECUTING CNN...</>
                ) : scanComplete ? (
                  <><CheckCircle className="w-4 h-4 mr-2" /> ANALYSIS LOCKED</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> RUN BIOVISION</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-sm font-bold text-gray-200 flex items-center border-b border-gray-900 pb-4 mb-6 uppercase tracking-widest">
              <Brain className="w-4 h-4 mr-2 text-emerald-400" />
              Diagnostic Telemetry
            </h3>
            
            {!scanComplete ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-gray-600 font-mono text-xs">
                {isScanning ? (
                  <>
                     <div className="relative w-16 h-16 mb-6">
                        <div className="absolute inset-0 rounded-full border-t-2 border-emerald-500 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-b-2 border-teal-500 animate-[spin_2s_linear_reverse_infinite]"></div>
                     </div>
                     <p className="animate-pulse tracking-widest uppercase">Processing volumetric data...</p>
                  </>
                ) : (
                  <div className="flex flex-col items-center opacity-50">
                     <Eye className="w-8 h-8 mb-3 text-gray-700" />
                     <p className="tracking-widest uppercase">Awaiting Image Matrix</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in-up h-full flex flex-col">
                
                {/* Critical Findings */}
                <div className="bg-gray-950 border border-rose-900/30 rounded-xl p-5 shadow-[0_0_20px_rgba(244,63,94,0.05)]">
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-3">Detected Anomalies</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Crosshair className="w-4 h-4 mr-3 text-rose-500 shrink-0 mt-0.5 animate-pulse" />
                      <div>
                         <div className="text-gray-200 text-sm font-bold">Hyperintense Mass (14x12x18mm)</div>
                         <div className="text-gray-500 text-xs font-mono mt-1">LOC: Right Frontal Lobe • VOL: 3.02 cm³</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-4 h-4 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                         <div className="text-gray-300 text-sm">Ventricles Symmetric</div>
                         <div className="text-gray-600 text-xs font-mono mt-1">No midline shift detected</div>
                      </div>
                    </li>
                  </ul>
                </div>
                
                {/* Classification Probabilities */}
                <div>
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-[0.2em] mb-4">Neural Net Classification (Top 3)</h4>
                  <div className="space-y-5">
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-mono">
                        <span className="text-rose-400 font-bold uppercase">Glioblastoma Multiforme</span>
                        <span className="text-white">85.42%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full shadow-[0_0_10px_#f43f5e]" style={{ width: '85.42%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-mono">
                        <span className="text-amber-400 font-bold uppercase">Low-Grade Glioma</span>
                        <span className="text-gray-300">10.15%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-600 to-amber-400 h-full rounded-full" style={{ width: '10.15%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-mono">
                        <span className="text-teal-400 font-bold uppercase">Metastatic Lesion</span>
                        <span className="text-gray-400">4.43%</span>
                      </div>
                      <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-teal-500 h-full rounded-full" style={{ width: '4.43%' }}></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Autonomous Action */}
                <div className="mt-auto p-4 bg-emerald-900/10 border border-emerald-900/50 rounded-xl flex items-start group/action hover:bg-emerald-900/20 transition-colors cursor-pointer">
                  <div className="bg-emerald-950 p-2 rounded mr-3 text-emerald-400">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-400 text-xs uppercase tracking-wider mb-1">Trigger BioWorkflow</h4>
                    <p className="text-xs text-emerald-100/60 leading-relaxed">
                      Auto-generate preliminary radiology report and schedule contrast MRI protocol for oncologist review.
                    </p>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Global CSS for the scanning animation */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BioVisionWorkspace;
