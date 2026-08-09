import React, { useState, useEffect } from 'react';
import { Database, UploadCloud, Server, Activity, FileText, Dna, ActivitySquare, Brain, Loader2, CheckCircle, Zap } from 'lucide-react';

export default function BioFoundationWorkspace() {
  const [isIngesting, setIsIngesting] = useState(false);
  const [ingestProgress, setIngestProgress] = useState(0);
  const [ingestComplete, setIngestComplete] = useState(false);

  const startIngestion = () => {
    setIsIngesting(true);
    setIngestProgress(0);
    setIngestComplete(false);

    const interval = setInterval(() => {
      setIngestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsIngesting(false);
          setIngestComplete(true);
          return 100;
        }
        return prev + 2.5;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 1 • Foundation Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Database className="w-10 h-10 mr-3 text-blue-500 animate-pulse" />
             BioFoundation Ingestion
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#3b82f6]"></div>
             <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">EHR Sync: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Data Input */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-500"></div>
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <UploadCloud className="w-4 h-4 mr-2 text-blue-400" />
               Multimodal Data Upload
             </h3>

             <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-800 rounded-xl bg-[#030303] p-8 group-hover:border-blue-500/50 transition-colors relative overflow-hidden">
                {!isIngesting && !ingestComplete && (
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-900/20 p-4 rounded-full mb-4 border border-blue-500/30">
                      <Database className="w-8 h-8 text-blue-400" />
                    </div>
                    <h4 className="font-bold text-gray-300 uppercase tracking-widest text-sm mb-2">Initialize Batch Ingestion</h4>
                    <p className="text-xs text-gray-500 mb-6 font-mono">Drag & drop FHIR JSON, FASTQ, or DICOM files here</p>
                    <button 
                      onClick={startIngestion}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center"
                    >
                      <Zap className="w-4 h-4 mr-2" /> Start Processing
                    </button>
                  </div>
                )}

                {isIngesting && (
                  <div className="w-full flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <h4 className="font-bold text-blue-400 uppercase tracking-widest text-sm mb-4">Parsing Modalities...</h4>
                    <div className="w-full max-w-sm bg-gray-900 rounded-full h-2 border border-gray-800 overflow-hidden">
                       <div className="bg-blue-500 h-full rounded-full transition-all duration-100 ease-out shadow-[0_0_10px_#3b82f6]" style={{ width: `${ingestProgress}%` }}></div>
                    </div>
                    <div className="mt-2 text-xs font-mono text-gray-500 font-bold">{Math.round(ingestProgress)}% Complete</div>
                  </div>
                )}

                {ingestComplete && (
                  <div className="flex flex-col items-center text-center animate-fade-in">
                    <div className="bg-emerald-900/20 p-4 rounded-full mb-4 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-emerald-400 uppercase tracking-widest text-sm mb-2">Ingestion Successful</h4>
                    <p className="text-xs text-gray-500 font-mono">Data parsed, normalized, and embedded into Vector DB.</p>
                    <button 
                      onClick={() => setIngestComplete(false)}
                      className="mt-6 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest underline underline-offset-4"
                    >
                      Upload New Batch
                    </button>
                  </div>
                )}
             </div>
          </div>
        </div>

        {/* Right Column: Modality Pipelines */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-3 mb-6 tracking-widest uppercase">
              <Server className="w-4 h-4 mr-2 text-blue-500" />
              Modality Vectorization Pipelines
            </h3>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              
              {/* EHR Node */}
              <div className={`bg-[#0a0a0c] border p-4 rounded-xl flex items-center transition-all duration-500 ${isIngesting && ingestProgress > 10 ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-gray-800'}`}>
                <div className={`p-3 rounded-lg mr-4 transition-colors ${isIngesting && ingestProgress > 10 ? 'bg-blue-900/40 text-blue-400' : 'bg-gray-900 text-gray-600'}`}>
                  <FileText className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Clinical Text (EHR)</h4>
                    <span className="text-[10px] font-mono text-gray-500">ClinicalBERT / BioMegatron</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                    <div className="bg-blue-500 h-full rounded-full transition-all" style={{ width: isIngesting && ingestProgress > 10 ? `${Math.min(100, (ingestProgress - 10) * 1.5)}%` : ingestComplete ? '100%' : '0%' }}></div>
                  </div>
                </div>
                {ingestComplete && <CheckCircle className="w-5 h-5 text-emerald-500 ml-4 animate-fade-in" />}
              </div>

              {/* Genomics Node */}
              <div className={`bg-[#0a0a0c] border p-4 rounded-xl flex items-center transition-all duration-500 ${isIngesting && ingestProgress > 30 ? 'border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'border-gray-800'}`}>
                <div className={`p-3 rounded-lg mr-4 transition-colors ${isIngesting && ingestProgress > 30 ? 'bg-purple-900/40 text-purple-400' : 'bg-gray-900 text-gray-600'}`}>
                  <Dna className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Genomics (VCF/FASTQ)</h4>
                    <span className="text-[10px] font-mono text-gray-500">Nucleotide Transformer</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                    <div className="bg-purple-500 h-full rounded-full transition-all" style={{ width: isIngesting && ingestProgress > 30 ? `${Math.min(100, (ingestProgress - 30) * 1.5)}%` : ingestComplete ? '100%' : '0%' }}></div>
                  </div>
                </div>
                {ingestComplete && <CheckCircle className="w-5 h-5 text-emerald-500 ml-4 animate-fade-in" />}
              </div>

              {/* Imaging Node */}
              <div className={`bg-[#0a0a0c] border p-4 rounded-xl flex items-center transition-all duration-500 ${isIngesting && ingestProgress > 50 ? 'border-teal-500/50 shadow-[0_0_15px_rgba(20,184,166,0.2)]' : 'border-gray-800'}`}>
                <div className={`p-3 rounded-lg mr-4 transition-colors ${isIngesting && ingestProgress > 50 ? 'bg-teal-900/40 text-teal-400' : 'bg-gray-900 text-gray-600'}`}>
                  <ActivitySquare className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Imaging (DICOM/MRI)</h4>
                    <span className="text-[10px] font-mono text-gray-500">Vision Transformer (ViT-3D)</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full transition-all" style={{ width: isIngesting && ingestProgress > 50 ? `${Math.min(100, (ingestProgress - 50) * 1.5)}%` : ingestComplete ? '100%' : '0%' }}></div>
                  </div>
                </div>
                {ingestComplete && <CheckCircle className="w-5 h-5 text-emerald-500 ml-4 animate-fade-in" />}
              </div>

              {/* Lab Values Node */}
              <div className={`bg-[#0a0a0c] border p-4 rounded-xl flex items-center transition-all duration-500 ${isIngesting && ingestProgress > 70 ? 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'border-gray-800'}`}>
                <div className={`p-3 rounded-lg mr-4 transition-colors ${isIngesting && ingestProgress > 70 ? 'bg-orange-900/40 text-orange-400' : 'bg-gray-900 text-gray-600'}`}>
                  <Activity className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300">Time-Series (Vitals/Labs)</h4>
                    <span className="text-[10px] font-mono text-gray-500">Temporal CNN</span>
                  </div>
                  <div className="w-full bg-gray-900 rounded-full h-1 overflow-hidden">
                    <div className="bg-orange-500 h-full rounded-full transition-all" style={{ width: isIngesting && ingestProgress > 70 ? `${Math.min(100, (ingestProgress - 70) * 2)}%` : ingestComplete ? '100%' : '0%' }}></div>
                  </div>
                </div>
                {ingestComplete && <CheckCircle className="w-5 h-5 text-emerald-500 ml-4 animate-fade-in" />}
              </div>

            </div>
          </div>
        </div>
        
      </div>
      
      {/* Global Animations */}
      <style>{`
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
