import React, { useState } from 'react';
import { BrainCircuit, BookOpen, ThumbsUp, ThumbsDown, Play, Loader2, GitCommit, LineChart, CheckCircle } from 'lucide-react';

const BioLearningWorkspace = () => {
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
    <div className="min-h-screen bg-[#0f0f11] text-gray-200 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500 flex items-center">
            <BrainCircuit className="w-10 h-10 mr-3 text-amber-500" />
            BioLearning RLHF Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 17: Continuous Learning & Human Feedback Alignment</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-amber-900/50">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
             <span className="text-sm text-emerald-400 font-mono">LoRA Adapter: Ready to sync</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Human Feedback Queue */}
        <div className="space-y-6">
          <div className="bg-[#151518] border border-gray-800 rounded-2xl p-6 shadow-xl h-full flex flex-col relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600"></div>
            
             <h2 className="font-bold text-gray-200 flex items-center mb-6">
              <BookOpen className="w-5 h-5 mr-2 text-amber-400" />
              Doctor Feedback Queue (RLHF)
            </h2>

            <div className="space-y-4 flex-1">
              {/* Feedback Item 1 */}
              <div className="bg-[#1c1c22] p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Dr. A. Sharma (Oncology)</span>
                  <ThumbsDown className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-sm text-gray-300">
                  <span className="text-gray-500 line-through mr-2">AI: Standard dose is 200mg for pediatric.</span>
                  <br/>
                  <span className="text-emerald-400 font-medium">Correction: Pediatric dose max is 150mg/m2.</span>
                </div>
              </div>
              
              {/* Feedback Item 2 */}
              <div className="bg-[#1c1c22] p-4 rounded-xl border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Dr. J. Doe (Genomics)</span>
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-sm text-gray-300">
                  <span className="text-gray-400 italic">Confirmed AI finding on novel BRCA2 variant pathogenesis. Added to permanent knowledge graph.</span>
                </div>
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-4">
                 + 1,402 other verified clinical feedback items waiting for next learning epoch.
              </div>
            </div>

            <button 
              onClick={handleTrain}
              disabled={isTraining || trainingComplete}
              className={`w-full py-4 mt-6 rounded-xl font-bold flex items-center justify-center transition-all ${
                isTraining ? 'bg-amber-900/30 text-amber-500 border border-amber-900/50' : 
                trainingComplete ? 'bg-emerald-900/30 text-emerald-500 border border-emerald-900/50' : 
                'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.2)]'
              }`}
            >
              {isTraining ? (
                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Training LoRA Adapter (Epoch {epoch}/100)...</>
              ) : trainingComplete ? (
                <><CheckCircle className="w-5 h-5 mr-2" /> Training Complete</>
              ) : (
                <><Play className="w-5 h-5 mr-2 fill-current" /> Trigger RLHF Training Epoch</>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Training Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#151518] border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[500px] flex flex-col relative">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-6">
              <LineChart className="w-6 h-6 mr-2 text-amber-500" />
              Fine-Tuning Loss Curve (PEFT/LoRA)
            </h3>
            
            {!isTraining && !trainingComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                 <GitCommit className="w-20 h-20 mb-4 opacity-20" />
                 <p className="font-mono text-sm">AWAITING TRAINING TRIGGER</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col space-y-6 relative">
                
                {/* Simulated Chart Area */}
                <div className="flex-1 border-l border-b border-gray-700 relative ml-8 mb-8">
                  {/* Y-axis labels */}
                  <div className="absolute -left-8 top-0 text-xs text-gray-500 font-mono">2.5</div>
                  <div className="absolute -left-8 top-1/2 text-xs text-gray-500 font-mono">1.2</div>
                  <div className="absolute -left-8 bottom-0 text-xs text-gray-500 font-mono">0.1</div>
                  
                  {/* X-axis labels */}
                  <div className="absolute -bottom-6 left-0 text-xs text-gray-500 font-mono">0</div>
                  <div className="absolute -bottom-6 left-1/2 text-xs text-gray-500 font-mono">50</div>
                  <div className="absolute -bottom-6 right-0 text-xs text-gray-500 font-mono">100 (Epoch)</div>

                  {/* Animated Line simulating Training Loss going down */}
                  <div className="absolute inset-0 overflow-hidden">
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <polyline 
                        points="0,10 20,40 40,65 60,80 80,90 100,95" 
                        fill="none" 
                        stroke="#f59e0b" 
                        strokeWidth="2" 
                        strokeLinejoin="round" 
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        strokeDasharray="300"
                        strokeDashoffset={300 - (300 * (epoch / 100))}
                      />
                    </svg>
                  </div>
                  
                  {/* Current Loss Marker */}
                  {isTraining && (
                    <div 
                      className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#f59e0b] -translate-x-1.5 -translate-y-1.5 transition-all duration-75"
                      style={{ 
                        left: `${epoch}%`, 
                        top: `${Math.min(10 + (epoch * 0.85), 95)}%` 
                      }}
                    ></div>
                  )}
                </div>

                {/* Training Metrics Footer */}
                <div className="grid grid-cols-3 gap-4 absolute bottom-0 w-full animate-fade-in-up">
                  <div className="bg-[#1c1c22] border border-gray-700 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 uppercase mb-1">Current Loss</div>
                    <div className="text-2xl font-bold font-mono text-amber-400">
                      {isTraining ? (2.5 - (epoch * 0.024)).toFixed(4) : "0.1004"}
                    </div>
                  </div>
                  <div className="bg-[#1c1c22] border border-gray-700 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 uppercase mb-1">Learning Rate</div>
                    <div className="text-2xl font-bold font-mono text-gray-300">2e-5</div>
                  </div>
                  <div className="bg-[#1c1c22] border border-gray-700 p-4 rounded-xl text-center">
                    <div className="text-xs text-gray-500 uppercase mb-1">Adapter Weights</div>
                    <div className="text-xl font-bold font-mono text-emerald-400 flex items-center justify-center mt-1">
                      {trainingComplete ? 'MERGED' : 'COMPUTING'}
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

export default BioLearningWorkspace;
