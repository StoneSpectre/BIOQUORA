import React, { useState, useEffect } from 'react';

export default function BioVisionRadiology() {

  // Auto-wired API Data State
  const [liveData, setLiveData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verify backend connectivity
    fetch('http://127.0.0.1:8000/api/health')
      .then(res => res.json())
      .then(data => {
        setLiveData([data]);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Backend Disconnected:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-mono p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-cyan-500">🩻</span> RadioVision: DICOM/MRI Interpretation
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-sans">
             Automated 3D volumetric reasoning over radiological scans.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Mock DICOM Viewer */}
           <div className="col-span-2 bg-[#0a0a0a] border border-slate-800 rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-center mb-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
                 <span>T1-Weighted MRI (Axial)</span>
                 <span>Z-Slice: 42/120</span>
              </div>
              
              <div className="flex-1 bg-black border border-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center">
                 {/* Simulated MRI Brain Scan gradient */}
                 <div className="w-64 h-80 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0,rgba(255,255,255,0.02)_70%,transparent_100%)] rounded-[40%_40%_50%_50%] border-4 border-slate-800/50 relative">
                    {/* Lesion Annotation */}
                    <div className="absolute top-[30%] left-[60%] w-8 h-8 border border-rose-500 bg-rose-500/20 rounded-full animate-pulse"></div>
                    <div className="absolute top-[20%] left-[75%] bg-rose-950/80 text-rose-400 text-[8px] px-2 py-1 rounded border border-rose-900">
                       Hyperintense Lesion
                    </div>
                 </div>
              </div>
              
              {/* Scrub bar */}
              <div className="mt-4">
                 <div className="w-full h-1 bg-slate-900 rounded-full relative">
                    <div className="absolute left-[35%] w-2 h-3 bg-cyan-500 -top-1 rounded cursor-pointer"></div>
                 </div>
              </div>
           </div>

           {/* Volumetric Analysis */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-[#111] border border-slate-800 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Volumetric Findings</h3>
                 <ul className="space-y-4 text-xs font-sans text-slate-300">
                    <li className="flex justify-between">
                       <span className="text-slate-500">Total Volume:</span>
                       <span>4.2 cm³</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Enhancement:</span>
                       <span className="text-emerald-400">Homogeneous</span>
                    </li>
                    <li className="flex justify-between">
                       <span className="text-slate-500">Location:</span>
                       <span>Right Frontal Lobe</span>
                    </li>
                 </ul>
              </div>

              <div className="bg-cyan-950/10 border border-cyan-900/30 rounded-xl p-6">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Explainable AI Reasoning</h3>
                 <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                    RadioVision identifies a well-circumscribed hyperintense lesion on T1-weighted imaging. The lack of perilesional edema suggests a slow-growing etiology. Evidence mapped to standard neuroradiology ontology codes.
                 </p>
              </div>

           </div>

        </div>

      </div>
    </div>
  );
}
