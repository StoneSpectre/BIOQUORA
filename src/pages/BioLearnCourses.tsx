import React, { useState, useEffect } from 'react';

export default function BioLearnCourses() {

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      
      <div className="max-w-6xl mx-auto">
        
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4 flex items-center justify-center gap-3">
            <span className="text-blue-500">🎓</span> Curriculum Studio & Open Education
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover adaptive courses built by global universities, or use AI to generate a custom curriculum tailored to your research goals.
          </p>
          
          <div className="mt-8 flex justify-center gap-4">
             <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition">
                + Create Custom Curriculum
             </button>
             <button className="px-6 py-2.5 bg-white border border-slate-300 text-slate-700 font-bold rounded-full shadow-sm hover:bg-slate-50 transition">
                Browse Global Repository
             </button>
          </div>
        </header>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
           <div className="px-4 py-1.5 bg-slate-800 text-white text-sm font-bold rounded-full cursor-pointer shrink-0">For You</div>
           <div className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded-full cursor-pointer hover:bg-slate-50 shrink-0">Bioinformatics</div>
           <div className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded-full cursor-pointer hover:bg-slate-50 shrink-0">Computational Chemistry</div>
           <div className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded-full cursor-pointer hover:bg-slate-50 shrink-0">Clinical AI</div>
           <div className="px-4 py-1.5 bg-white border border-slate-300 text-slate-600 text-sm font-bold rounded-full cursor-pointer hover:bg-slate-50 shrink-0">Systems Biology</div>
        </div>

        {/* Course Grid */}
        <h2 className="text-lg font-bold text-slate-800 mb-4">Recommended Based on Your Portfolio</h2>
        <div className="grid grid-cols-3 gap-6 mb-12">
           
           {/* Course Card 1 */}
           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col">
              <div className="h-32 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 flex items-end relative overflow-hidden">
                 <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Beginner</div>
                 <h3 className="text-lg font-bold text-white relative z-10">Introduction to PyMOL & Structural Visualization</h3>
                 <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition">🔬</div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                 <p className="text-sm text-slate-600 mb-4 line-clamp-2">Master the fundamentals of protein visualization, ligand interaction analysis, and creating publication-quality figures.</p>
                 <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">MIT</div>
                       <span className="text-xs font-bold text-slate-600">MIT OpenCourseWare</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Free</span>
                 </div>
              </div>
           </div>

           {/* Course Card 2 */}
           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col relative ring-2 ring-indigo-500">
              <div className="absolute -top-3 -right-3 bg-indigo-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded shadow-lg z-20">AI Generated</div>
              <div className="h-32 bg-gradient-to-br from-slate-800 to-slate-900 p-4 flex items-end relative overflow-hidden">
                 <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Advanced</div>
                 <h3 className="text-lg font-bold text-white relative z-10">Graph ML for Drug Discovery (Custom Path)</h3>
                 <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition">🧠</div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                 <p className="text-sm text-slate-600 mb-4 line-clamp-2">A personalized 6-module curriculum generated by BioTutor specifically to bridge your knowledge gaps in PyTorch Geometric and KRAS biology.</p>
                 <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-indigo-100 text-[10px] flex items-center justify-center font-bold text-indigo-600">AI</div>
                       <span className="text-xs font-bold text-slate-600">BioLearn Engine</span>
                    </div>
                    <span className="text-xs font-bold text-blue-600">Enrolled</span>
                 </div>
              </div>
           </div>

           {/* Course Card 3 */}
           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer group flex flex-col">
              <div className="h-32 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 flex items-end relative overflow-hidden">
                 <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur text-white text-[10px] font-bold uppercase rounded">Intermediate</div>
                 <h3 className="text-lg font-bold text-white relative z-10">Single-Cell RNA-Seq Analysis Pipeline</h3>
                 <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 group-hover:scale-110 transition">🧬</div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                 <p className="text-sm text-slate-600 mb-4 line-clamp-2">Learn to process, QC, and analyze scRNA-seq data using Seurat. Includes BioLab Virtual Sandbox exercises.</p>
                 <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-full bg-slate-200 text-[10px] flex items-center justify-center font-bold">SU</div>
                       <span className="text-xs font-bold text-slate-600">Stanford Medicine</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">Free</span>
                 </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
}
