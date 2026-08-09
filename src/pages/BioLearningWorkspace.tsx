import React, { useState } from 'react';
import { BrainCircuit, BookOpen, ThumbsUp, ThumbsDown, Play, Loader2, GitCommit, LineChart, CheckCircle, Activity, ArrowRight, Zap } from 'lucide-react';

export default function BioLearningWorkspace() {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [epoch, setEpoch] = useState(0);

  const handleTrain = () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setEpoch(0);

    const interval = setInterval(() => {
      setEpoch((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          setTrainingComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-amber-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 17 • Continuous Alignment Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <BrainCircuit className="w-10 h-10 mr-3 text-amber-500 animate-pulse" />
             BioLearning RLHF Engine
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#10b981]"></div>
             <span className="text-sm text-emerald-400 font-mono font-bold tracking-widest uppercase">LoRA Adapter: Ready to Sync</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Human Feedback Queue */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden flex flex-col">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
             
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
               <BookOpen className="w-4 h-4 mr-2 text-amber-400" />
               Doctor Feedback Queue (RLHF)
             </h3>

             <div className="space-y-4 flex-1 flex flex-col">
               
               {/* Feedback Item 1 */}
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner group/item hover:border-gray-600 transition-colors">
                 <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center">
                     <div className="w-6 h-6 rounded-lg bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold mr-2 text-[10px]">AS</div>
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dr. A. Sharma (Oncology)</span>
                   </div>
                   <ThumbsDown className="w-4 h-4 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                 </div>
                 <div className="text-xs text-gray-300 bg-[#050505] p-3 rounded-lg border border-gray-900 font-mono">
                   <div className="text-gray-500 line-through mb-1 opacity-70">AI: Standard dose is 200mg for pediatric.</div>
                   <div className="text-emerald-400 flex items-center"><ArrowRight className="w-3 h-3 mr-1" /> Pediatric dose max is 150mg/m2.</div>
                 </div>
               </div>
               
               {/* Feedback Item 2 */}
               <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800 shadow-inner group/item hover:border-gray-600 transition-colors">
                 <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center">
                     <div className="w-6 h-6 rounded-lg bg-teal-900/30 text-teal-400 border border-teal-500/30 flex items-center justify-center font-bold mr-2 text-[10px]">JD</div>
                     <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Dr. J. Doe (Genomics)</span>
                   </div>
                   <ThumbsUp className="w-4 h-4 text-emerald-500 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
                 </div>
                 <div className="text-xs text-gray-400 bg-[#050505] p-3 rounded-lg border border-gray-900 font-mono italic">
                   Confirmed AI finding on novel BRCA2 variant pathogenesis. High quality retrieval context.
                 </div>
               </div>
               
               <div className="text-center mt-auto pt-4">
                  <div className="inline-block bg-amber-900/10 border border-amber-900/30 px-4 py-2 rounded-lg">
                    <span className="text-amber-400 font-bold text-xs">+ 1,402 verified feedback pairs</span>
                  </div>
               </div>

             </div>

             <div className="pt-6 mt-6 border-t border-gray-900">
                <button 
                  onClick={handleTrain}
                  disabled={isTraining || trainingComplete}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all uppercase tracking-widest text-sm ${
                    isTraining ? 'bg-[#0a0a0c] text-amber-500 border border-amber-900/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 
                    trainingComplete ? 'bg-[#0a0a0c] text-emerald-500 border border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
                    'bg-amber-600 text-white hover:bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  }`}
                >
                  {isTraining ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> EPOCH {epoch}/100...</>
                  ) : trainingComplete ? (
                    <><CheckCircle className="w-5 h-5 mr-2 text-emerald-400" /> TRAINING COMPLETE</>
                  ) : (
                    <><Play className="w-5 h-5 mr-2 fill-current" /> TRIGGER RLHF EPOCH</>
                  )}
                </button>
             </div>
          </div>
        </div>

        {/* Right Column: Training Visualization */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[50px] pointer-events-none"></div>

            <h3 className="text-xs font-bold text-gray-400 flex items-center border-b border-gray-900 pb-4 mb-6 uppercase tracking-widest relative z-10">
              <LineChart className="w-4 h-4 mr-2 text-amber-400" />
              Fine-Tuning Loss Curve (PEFT/LoRA)
            </h3>
            
            {!isTraining && !trainingComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-700 relative z-10">
                 <GitCommit className="w-16 h-16 mb-4 opacity-50" />
                 <p className="font-mono text-xs font-bold uppercase tracking-widest">AWAITING TRAINING TRIGGER</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col space-y-6 relative z-10">
                
                {/* Chart Area */}
                <div className="flex-1 border-l border-b border-gray-800 relative ml-10 mb-8 min-h-[300px] mt-4">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 w-full h-full pointer-events-none">
                     <div className="w-full h-[1px] bg-gray-900 absolute top-0"></div>
                     <div className="w-full h-[1px] bg-gray-900 absolute top-1/4"></div>
                     <div className="w-full h-[1px] bg-gray-900 absolute top-1/2"></div>
                     <div className="w-full h-[1px] bg-gray-900 absolute top-3/4"></div>
                     
                     <div className="h-full w-[1px] bg-gray-900 absolute left-1/4"></div>
                     <div className="h-full w-[1px] bg-gray-900 absolute left-1/2"></div>
                     <div className="h-full w-[1px] bg-gray-900 absolute left-3/4"></div>
                  </div>

                  {/* Y-axis labels */}
                  <div className="absolute -left-10 top-0 text-[10px] text-gray-500 font-mono">2.5</div>
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 font-mono">1.2</div>
                  <div className="absolute -left-10 bottom-0 text-[10px] text-gray-500 font-mono">0.1</div>
                  
                  {/* X-axis labels */}
                  <div className="absolute -bottom-6 left-0 text-[10px] text-gray-500 font-mono">0</div>
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-mono">50</div>
                  <div className="absolute -bottom-6 right-0 text-[10px] text-gray-500 font-mono">100 (Epoch)</div>

                  {/* Animated Line */}
                  <div className="absolute inset-0 overflow-hidden z-10">
                    <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <polyline 
                        points="0,5 10,20 20,40 40,65 60,80 80,90 100,95" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="3" 
                        strokeLinejoin="round" 
                        strokeLinecap="round"
                        className="transition-all duration-100 ease-linear"
                        strokeDasharray="300"
                        strokeDashoffset={300 - (300 * (epoch / 100))}
                      />
                    </svg>
                  </div>
                  
                  {/* Current Loss Marker/Glow */}
                  {isTraining && (
                    <div 
                      className="absolute w-4 h-4 bg-white rounded-full shadow-[0_0_15px_#f59e0b] -translate-x-2 -translate-y-2 transition-all duration-100 ease-linear z-20"
                      style={{ 
                        left: `${epoch}%`, 
                        top: `${Math.min(5 + (epoch * 0.9), 95)}%` 
                      }}
                    >
                      <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-50"></div>
                    </div>
                  )}
                </div>

                {/* Training Metrics Footer */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 animate-fade-in-up">
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 rounded-full blur-[20px]"></div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Current Loss</div>
                    <div className="text-3xl font-black font-mono text-amber-400 relative z-10">
                      {isTraining ? (2.5 - (epoch * 0.024)).toFixed(4) : "0.1004"}
                    </div>
                  </div>
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner relative overflow-hidden">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Learning Rate</div>
                    <div className="text-3xl font-black font-mono text-gray-300 relative z-10">2e-5</div>
                  </div>
                  <div className="bg-[#0a0a0c] border border-gray-800 p-5 rounded-xl text-center shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 rounded-full blur-[20px]"></div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Adapter Status</div>
                    <div className={`text-xl font-black font-mono ${trainingComplete ? 'text-emerald-400' : 'text-indigo-400 animate-pulse'} flex items-center justify-center mt-3 relative z-10`}>
                      {trainingComplete ? 'MERGED TO BASE' : 'COMPUTING GRADS'}
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
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
