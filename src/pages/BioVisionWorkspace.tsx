import React, { useState, useEffect } from 'react';
import { Upload, Activity, Brain, CheckCircle, AlertTriangle, Play, Loader2 } from 'lucide-react';

const BioVisionWorkspace = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setTimeout(() => {
      handleScan();
    }, 1000);
  };

  const handleScan = () => {
    setIsScanning(true);
    // Simulate AI backend analyzing the image via biovision_engine.py
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            BioVision Intelligence
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 6: Autonomous Radiomics & Pathology Analysis</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-gray-700">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-gray-300">BioVision Engine: Online</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Image Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden relative shadow-2xl h-[600px] flex flex-col">
            <div className="p-4 bg-gray-800 flex justify-between items-center">
              <h2 className="font-semibold text-gray-200 flex items-center">
                <Brain className="w-5 h-5 mr-2 text-blue-400" />
                Primary Viewing Console
              </h2>
              <span className="text-xs text-gray-500 font-mono">DICOM VIEWER v4.2</span>
            </div>
            
            <div className="flex-1 relative flex items-center justify-center bg-black/50 p-6">
              {!uploaded ? (
                <div 
                  onClick={handleUpload}
                  className="border-2 border-dashed border-gray-600 rounded-xl w-full h-full flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-gray-800/30 transition-all group"
                >
                  <Upload className="w-16 h-16 text-gray-500 group-hover:text-blue-400 transition-colors mb-4" />
                  <p className="text-xl font-medium text-gray-400 group-hover:text-gray-200">Drag & Drop MRI/CT Scan</p>
                  <p className="text-sm text-gray-600 mt-2">Supports DICOM, NIfTI, JPEG, PNG</p>
                </div>
              ) : (
                <div className="relative w-full h-full max-w-md mx-auto flex items-center justify-center">
                  {/* Mock Brain MRI Image */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/T1t2PD.jpg/640px-T1t2PD.jpg" 
                    alt="Brain MRI" 
                    className="object-contain h-full w-full rounded-lg opacity-80"
                  />
                  
                  {/* Scanning Animation */}
                  {isScanning && (
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg">
                      <div className="w-full h-2 bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]" style={{
                        animationName: 'scan',
                        animationDuration: '1.5s',
                        animationIterationCount: 'infinite',
                        animationDirection: 'alternate'
                      }}></div>
                    </div>
                  )}

                  {/* AI Bounding Box (Appears after scan) */}
                  {scanComplete && (
                    <div className="absolute border-2 border-red-500 bg-red-500/20 rounded-md" 
                         style={{ top: '35%', left: '40%', width: '15%', height: '15%' }}>
                      <div className="absolute -top-6 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">
                        ANOMALY
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Control Bar */}
            <div className="p-4 bg-gray-800 flex items-center justify-between">
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300">Axial</button>
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300">Sagittal</button>
                <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-gray-300">Coronal</button>
              </div>
              <button 
                onClick={handleScan}
                disabled={!uploaded || isScanning || scanComplete}
                className={`flex items-center px-6 py-2 rounded-lg font-semibold transition-all ${
                  !uploaded || scanComplete ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 
                  isScanning ? 'bg-blue-600 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-blue-500/20'
                }`}
              >
                {isScanning ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</>
                ) : scanComplete ? (
                  <><CheckCircle className="w-5 h-5 mr-2" /> Analysis Complete</>
                ) : (
                  <><Play className="w-5 h-5 mr-2" /> Initialize AI Scan</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Insights */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <Activity className="w-6 h-6 mr-2 text-emerald-400" />
              AI Diagnostics Report
            </h3>
            
            {!scanComplete ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                {isScanning ? (
                  <>
                    <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                    <p>BioVision Engine computing feature maps...</p>
                  </>
                ) : (
                  <p>Awaiting scan initialization...</p>
                )}
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up">
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Primary Findings</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start text-gray-200">
                      <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500 shrink-0 mt-0.5" />
                      Hyperintensity detected in right frontal lobe (14mm x 12mm)
                    </li>
                    <li className="flex items-start text-gray-200">
                      <CheckCircle className="w-5 h-5 mr-2 text-emerald-500 shrink-0 mt-0.5" />
                      No evidence of midline shift
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-2">Diagnosis Probabilities</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-red-400 font-semibold">Suspected Glioblastoma</span>
                        <span className="text-gray-300">85.4%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '85.4%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-yellow-400 font-semibold">Benign Meningioma</span>
                        <span className="text-gray-300">12.1%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '12.1%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 border border-blue-800 rounded-xl">
                  <h4 className="font-semibold text-blue-400 mb-1">Recommended Next Step</h4>
                  <p className="text-sm text-blue-200">
                    Route to Stage 14 (BioWorkflow) to automatically schedule a contrast-enhanced MRI and cross-check patient history via Stage 5 (BioRetriever).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Global CSS for the scanning animation */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(500px); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BioVisionWorkspace;
