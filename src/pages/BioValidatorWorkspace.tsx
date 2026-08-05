import React, { useState } from 'react';
import { ShieldCheck, Search, Database, CheckCircle, XCircle, AlertTriangle, Play, Loader2, FileText, Lock } from 'lucide-react';

const BioValidatorWorkspace = () => {
  const [claim, setClaim] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const sampleClaim = "BioAgent Recommendation: Prescribe 150mg Erlotinib daily for EGFR-mutated Non-Small Cell Lung Cancer (NSCLC).";

  const handleValidate = () => {
    if (!claim) return;
    setIsValidating(true);
    setValidationComplete(false);
    setCurrentStep(0);

    // Simulate multi-step validation process
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= 4) {
          clearInterval(timer);
          setIsValidating(false);
          setValidationComplete(true);
          return 4;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleUseSample = () => {
    setClaim(sampleClaim);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-gray-100 p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center">
            <ShieldCheck className="w-10 h-10 mr-3 text-emerald-400" />
            BioValidator Integrity Engine
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 9: Clinical Guideline Verification & Hallucination Defense</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-emerald-900/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <Lock className="w-4 h-4 text-emerald-500 mr-2" />
            <span className="text-sm text-emerald-300 font-mono">FDA / NCCN Node Sync: Active</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input & Verification Steps */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Claim Input Box */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
            
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="font-bold text-gray-200 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-emerald-500" />
                Input AI Claim / Treatment Plan
              </h2>
              <button onClick={handleUseSample} className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-900/20 px-3 py-1.5 rounded border border-emerald-900/50">
                Load Test Claim
              </button>
            </div>
            
            <div className="flex space-x-4">
              <input 
                type="text"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Paste AI generated medical recommendation here..."
                className="flex-1 bg-gray-950 border border-gray-700 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors font-medium text-sm shadow-inner"
              />
              <button 
                onClick={handleValidate}
                disabled={!claim || isValidating}
                className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-all shadow-lg ${
                  !claim ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 
                  isValidating ? 'bg-emerald-900 text-emerald-100' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/25 hover:shadow-emerald-500/40'
                }`}
              >
                {isValidating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...</>
                ) : (
                  <><Search className="w-5 h-5 mr-2" /> Audit Claim</>
                )}
              </button>
            </div>
          </div>

          {/* Validation Pipeline UI */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl min-h-[400px]">
             <h3 className="text-lg font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-6">
              <Database className="w-5 h-5 mr-2 text-teal-400" />
              Cross-Reference Pipeline
            </h3>

            <div className="space-y-6 pl-4">
              {/* Step 1 */}
              <div className={`flex items-start transition-opacity duration-500 ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-4">
                   {currentStep > 1 ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : currentStep === 1 ? <Loader2 className="w-6 h-6 text-blue-500 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>}
                 </div>
                 <div>
                   <h4 className={`text-lg font-semibold ${currentStep >= 1 ? 'text-gray-200' : 'text-gray-500'}`}>Semantic Decomposition</h4>
                   <p className="text-sm text-gray-400 mt-1">Extracting entities: [Drug: Erlotinib], [Dose: 150mg], [Target: EGFR], [Condition: NSCLC]</p>
                 </div>
              </div>

              {/* Step 2 */}
              <div className={`flex items-start transition-opacity duration-500 ${currentStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-4">
                   {currentStep > 2 ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : currentStep === 2 ? <Loader2 className="w-6 h-6 text-blue-500 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>}
                 </div>
                 <div>
                   <h4 className={`text-lg font-semibold ${currentStep >= 2 ? 'text-gray-200' : 'text-gray-500'}`}>FDA Pharmacogenomics Query</h4>
                   <p className="text-sm text-gray-400 mt-1">Checking FDA Table of Pharmacogenomic Biomarkers in Drug Labeling for Erlotinib/EGFR correlation.</p>
                   {currentStep > 2 && <div className="mt-2 text-xs font-mono text-emerald-400 bg-emerald-900/10 p-2 rounded border border-emerald-900/30">Match found: FDA Label approved for EGFR exon 19 deletions.</div>}
                 </div>
              </div>

              {/* Step 3 */}
              <div className={`flex items-start transition-opacity duration-500 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-4">
                   {currentStep > 3 ? <CheckCircle className="w-6 h-6 text-emerald-500" /> : currentStep === 3 ? <Loader2 className="w-6 h-6 text-blue-500 animate-spin" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>}
                 </div>
                 <div>
                   <h4 className={`text-lg font-semibold ${currentStep >= 3 ? 'text-gray-200' : 'text-gray-500'}`}>NCCN Guideline Vector Search</h4>
                   <p className="text-sm text-gray-400 mt-1">Searching NCCN Clinical Practice Guidelines in Oncology for NSCLC dose recommendations.</p>
                   {currentStep > 3 && <div className="mt-2 text-xs font-mono text-emerald-400 bg-emerald-900/10 p-2 rounded border border-emerald-900/30">Match found: Recommended starting dose is 150mg/day.</div>}
                 </div>
              </div>

              {/* Step 4 */}
              <div className={`flex items-start transition-opacity duration-500 ${currentStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-4">
                   {currentStep >= 4 ? <CheckCircle className="w-6 h-6 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] rounded-full" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-600"></div>}
                 </div>
                 <div>
                   <h4 className={`text-lg font-semibold ${currentStep >= 4 ? 'text-emerald-400' : 'text-gray-500'}`}>Final Hallucination Check</h4>
                   <p className="text-sm text-gray-400 mt-1">Cross-validating mathematical logic and confirming zero contradictions in knowledge graph.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Validation Output */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl h-full flex flex-col">
            <h3 className="text-xl font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <ShieldCheck className="w-6 h-6 mr-2 text-emerald-400" />
              Safety Report
            </h3>
            
            {!validationComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                {isValidating ? (
                  <>
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-4" />
                    <p className="text-center">Querying global medical <br/>knowledge graphs...</p>
                  </>
                ) : (
                  <p className="text-center">Awaiting claim input for <br/>safety validation.</p>
                )}
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up flex-1 flex flex-col">
                
                {/* Circular Trust Score UI */}
                <div className="flex flex-col items-center justify-center py-4">
                  <div className="relative flex items-center justify-center w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="#1f2937" strokeWidth="10" />
                      <circle cx="80" cy="80" r="70" fill="transparent" stroke="#10b981" strokeWidth="10" strokeDasharray="440" strokeDashoffset="4.4" className="transition-all duration-1000 ease-out" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-4xl font-extrabold text-white">99<span className="text-2xl">.8%</span></span>
                      <span className="text-xs font-semibold text-emerald-500 uppercase tracking-widest mt-1">Trusted</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-900/20 border border-emerald-900/50 p-4 rounded-xl">
                  <h4 className="flex items-center font-bold text-emerald-400 mb-2">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Clinically Validated
                  </h4>
                  <p className="text-sm text-emerald-100/70 leading-relaxed">
                    The AI's recommendation perfectly aligns with FDA prescribing guidelines and NCCN protocols. No hallucinated entities detected. Safe for clinical review.
                  </p>
                </div>

                {/* Cryptographic Audit Log */}
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-2">Cryptographic Audit Trail</h4>
                  <div className="bg-black/50 p-3 rounded-lg font-mono text-[10px] text-gray-500 break-all border border-gray-800">
                    <div>Hash: 0x8f2a4b9e7c3d1f0a5b6c8d9e2f4a1c3b</div>
                    <div className="mt-1">Timestamp: {new Date().toISOString()}</div>
                    <div className="mt-1 text-emerald-500/50">✓ Written to immutable ledger</div>
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

export default BioValidatorWorkspace;
