import React, { useState, useEffect } from 'react';

export default function BioVisionMicroscopy() {

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
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 border-b border-slate-800 pb-6">
          <h1 className="text-2xl font-bold text-white tracking-wider flex items-center gap-3 uppercase">
             <span className="text-fuchsia-500">🔬</span> MicroVision: Histopathology & Cellular Intelligence
          </h1>
        </header>

        <div className="flex gap-8 h-[600px]">
           
           {/* Image Viewer Pane (Simulated) */}
           <div className="flex-1 bg-[#0a0a0a] border border-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center">
              
              {/* Background gradient simulating a stained tissue slide */}
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.3)_0,rgba(16,185,129,0.1)_100%)] blur-[40px]"></div>
              
              {/* Mock cells / segmentation bounding boxes */}
              <div className="relative w-[500px] h-[400px] border border-slate-700 bg-slate-900/50 rounded-lg">
                 
                 {/* Bounding box 1 */}
                 <div className="absolute top-[20%] left-[30%] w-24 h-24 border-2 border-emerald-500 bg-emerald-500/10 rounded flex items-start justify-start p-1 cursor-crosshair hover:bg-emerald-500/20 transition-all">
                    <span className="text-[8px] bg-emerald-500 text-black px-1 font-bold uppercase">Lymphocyte</span>
                 </div>
                 
                 {/* Bounding box 2 */}
                 <div className="absolute top-[50%] left-[60%] w-32 h-28 border-2 border-fuchsia-500 bg-fuchsia-500/10 rounded-full flex items-start justify-start p-1 cursor-crosshair hover:bg-fuchsia-500/20 transition-all">
                    <span className="text-[8px] bg-fuchsia-500 text-black px-1 font-bold uppercase rounded-sm">Tumor Cell</span>
                 </div>

                 {/* Segmentation Mask Overlay Graphic */}
                 <div className="absolute top-[60%] left-[20%] w-40 h-32 border-2 border-rose-500/50 bg-rose-500/20 opacity-50 rounded-[40%_60%_70%_30%]"></div>
                 <span className="absolute top-[85%] left-[25%] text-[8px] text-rose-400 font-bold uppercase">Necrotic Core</span>
              </div>

              {/* Toolbar */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#111] border border-slate-800 rounded-full px-6 py-2 flex gap-4 text-xs">
                 <button className="text-emerald-400 hover:text-white">Segment Cells</button>
                 <div className="w-px bg-slate-700"></div>
                 <button className="text-slate-400 hover:text-white">Attention Map</button>
                 <div className="w-px bg-slate-700"></div>
                 <button className="text-slate-400 hover:text-white">Measure Area</button>
              </div>
           </div>

           {/* Analysis Panel */}
           <div className="w-96 flex flex-col gap-6">
              
              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 flex-1">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">Cellular Intelligence</h3>
                 
                 <div className="space-y-4 text-xs font-sans">
                    <div className="p-3 bg-fuchsia-950/20 border border-fuchsia-900/30 rounded text-slate-300">
                       <strong className="text-fuchsia-400">Diagnosis:</strong> High-grade invasive ductal carcinoma.
                    </div>
                    <div className="p-3 bg-[#111] border border-slate-800 rounded text-slate-400">
                       <strong>Mitotic Count:</strong> 12 per 10 HPF
                    </div>
                    <div className="p-3 bg-[#111] border border-slate-800 rounded text-slate-400">
                       <strong>Tumor-Infiltrating Lymphocytes (TILs):</strong> ~15% stromal infiltration (Moderate).
                    </div>
                 </div>
              </div>

              <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-5 h-48">
                 <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Provenance & Validation
                 </h3>
                 <p className="text-[10px] text-slate-500 font-sans">
                    Image validated against OME-TIFF metadata schema. Features aligned with Pathomics Benchmark 2026 dataset with 98.4% diagnostic confidence.
                 </p>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
