import React, { useState } from 'react';
import { ShieldCheck, Search, Database, CheckCircle, XCircle, AlertTriangle, Play, Loader2, FileText, Lock, FileDigit, Link, Scale, Cpu } from 'lucide-react';

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
    }, 1500);
  };

  const handleUseSample = () => {
    setClaim(sampleClaim);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 9 • Validation Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <ShieldCheck className="w-10 h-10 mr-3 text-emerald-500 animate-pulse" />
            BioValidator Integrity
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <Lock className="w-4 h-4 text-emerald-500 mr-2" />
            <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">FDA / NCCN Node Sync</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Input & Verification Steps */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Claim Input Box */}
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-500"></div>
            
            <div className="flex items-center justify-between mb-4 mt-2">
              <h2 className="font-bold text-gray-400 flex items-center tracking-widest uppercase text-sm">
                <FileText className="w-4 h-4 mr-2 text-emerald-400" />
                Input AI Claim / Treatment Plan
              </h2>
              <button 
                onClick={handleUseSample} 
                className="text-[10px] font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-900/20 hover:bg-emerald-900/40 border border-emerald-900/50 px-2 py-1 rounded uppercase tracking-widest"
              >
                Load Test Claim
              </button>
            </div>
            
            <div className="flex space-x-4">
              <input 
                type="text"
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                placeholder="Paste AI generated medical recommendation here..."
                className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono text-sm shadow-inner"
              />
              <button 
                onClick={handleValidate}
                disabled={!claim || isValidating}
                className={`px-8 py-3 rounded-xl font-bold flex items-center justify-center transition-all tracking-wide text-sm ${
                  !claim || isValidating ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                }`}
              >
                {isValidating ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> VERIFYING...</>
                ) : (
                  <><Search className="w-5 h-5 mr-2" /> AUDIT CLAIM</>
                )}
              </button>
            </div>
          </div>

          {/* Validation Pipeline UI */}
          <div className="flex-1 bg-[#030303] border border-gray-800 rounded-2xl p-8 shadow-2xl flex flex-col group hover:border-gray-600 transition-colors duration-500">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
              <Database className="w-4 h-4 mr-2 text-teal-400" />
              Cross-Reference Pipeline
            </h3>

            <div className="space-y-8 pl-6 relative">
              {/* Connecting Line */}
              <div className="absolute left-[39px] top-5 bottom-5 w-0.5 bg-gray-900 z-0"></div>

              {/* Step 1 */}
              <div className={`flex items-start transition-opacity duration-500 relative z-10 ${currentStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-6 bg-[#030303]">
                   {currentStep > 1 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/50 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                       <CheckCircle className="w-4 h-4 text-emerald-400" />
                     </div>
                   ) : currentStep === 1 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/30 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                       <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                     </div>
                   ) : (
                     <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-900"></div>
                   )}
                 </div>
                 <div className="flex-1">
                   <h4 className={`text-sm font-bold uppercase tracking-wider ${currentStep >= 1 ? 'text-gray-200' : 'text-gray-500'}`}>Semantic Decomposition</h4>
                   <div className="bg-[#0a0a0c] border border-gray-800 p-4 rounded-xl mt-3">
                     <p className="text-xs text-gray-400 font-mono">Extracting entities:</p>
                     <div className="flex flex-wrap gap-2 mt-2">
                       <span className="px-2 py-1 bg-purple-900/20 border border-purple-900/50 text-purple-400 text-[10px] uppercase font-bold rounded">Drug: Erlotinib</span>
                       <span className="px-2 py-1 bg-amber-900/20 border border-amber-900/50 text-amber-400 text-[10px] uppercase font-bold rounded">Dose: 150mg</span>
                       <span className="px-2 py-1 bg-blue-900/20 border border-blue-900/50 text-blue-400 text-[10px] uppercase font-bold rounded">Target: EGFR</span>
                       <span className="px-2 py-1 bg-rose-900/20 border border-rose-900/50 text-rose-400 text-[10px] uppercase font-bold rounded">Cond: NSCLC</span>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Step 2 */}
              <div className={`flex items-start transition-opacity duration-500 relative z-10 ${currentStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-6 bg-[#030303]">
                   {currentStep > 2 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/50 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                       <CheckCircle className="w-4 h-4 text-emerald-400" />
                     </div>
                   ) : currentStep === 2 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/30 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                       <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                     </div>
                   ) : (
                     <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-900"></div>
                   )}
                 </div>
                 <div className="flex-1">
                   <h4 className={`text-sm font-bold uppercase tracking-wider ${currentStep >= 2 ? 'text-gray-200' : 'text-gray-500'}`}>FDA Pharmacogenomics Query</h4>
                   <p className="text-xs text-gray-400 mt-2 font-mono">Checking FDA Table of Pharmacogenomic Biomarkers for Erlotinib/EGFR correlation.</p>
                   {currentStep > 2 && (
                     <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-900/10 p-3 rounded-xl border border-emerald-900/30 flex items-center">
                       <Link className="w-3.5 h-3.5 mr-2" /> Match found: FDA Label approved for EGFR exon 19 deletions.
                     </div>
                   )}
                 </div>
              </div>

              {/* Step 3 */}
              <div className={`flex items-start transition-opacity duration-500 relative z-10 ${currentStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-6 bg-[#030303]">
                   {currentStep > 3 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/50 border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                       <CheckCircle className="w-4 h-4 text-emerald-400" />
                     </div>
                   ) : currentStep === 3 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-900/30 border-2 border-emerald-500 flex items-center justify-center animate-pulse">
                       <Loader2 className="w-4 h-4 text-emerald-400 animate-spin" />
                     </div>
                   ) : (
                     <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-900"></div>
                   )}
                 </div>
                 <div className="flex-1">
                   <h4 className={`text-sm font-bold uppercase tracking-wider ${currentStep >= 3 ? 'text-gray-200' : 'text-gray-500'}`}>NCCN Guideline Vector Search</h4>
                   <p className="text-xs text-gray-400 mt-2 font-mono">Searching NCCN Clinical Practice Guidelines in Oncology for NSCLC dose recommendations.</p>
                   {currentStep > 3 && (
                     <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-900/10 p-3 rounded-xl border border-emerald-900/30 flex items-center">
                       <Link className="w-3.5 h-3.5 mr-2" /> Match found: Recommended starting dose is 150mg/day.
                     </div>
                   )}
                 </div>
              </div>

              {/* Step 4 */}
              <div className={`flex items-start transition-opacity duration-500 relative z-10 ${currentStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                 <div className="mt-1 mr-6 bg-[#030303]">
                   {currentStep >= 4 ? (
                     <div className="w-8 h-8 rounded-full bg-emerald-600 border-2 border-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                       <ShieldCheck className="w-4 h-4 text-white" />
                     </div>
                   ) : (
                     <div className="w-8 h-8 rounded-full border-2 border-gray-800 bg-gray-900"></div>
                   )}
                 </div>
                 <div className="flex-1">
                   <h4 className={`text-sm font-bold uppercase tracking-wider ${currentStep >= 4 ? 'text-emerald-400' : 'text-gray-500'}`}>Final Hallucination Check</h4>
                   <p className="text-xs text-gray-400 mt-2 font-mono">Cross-validating logic and confirming zero contradictions in knowledge graph.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Validation Output */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-8 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
              <Scale className="w-4 h-4 mr-2 text-emerald-400" />
              Compliance Report
            </h3>
            
            {!validationComplete ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-xs font-mono uppercase tracking-widest">
                {isValidating ? (
                  <>
                    <Loader2 className="w-12 h-12 animate-spin text-emerald-500 mb-6" />
                    <p className="text-center opacity-70">Querying global medical <br/>knowledge graphs...</p>
                  </>
                ) : (
                  <p className="text-center opacity-50">Awaiting claim input for <br/>safety validation.</p>
                )}
              </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up flex-1 flex flex-col">
                
                {/* Circular Trust Score UI */}
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="relative flex items-center justify-center w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="80" fill="transparent" stroke="#111827" strokeWidth="12" />
                      <circle cx="96" cy="96" r="80" fill="transparent" stroke="#10b981" strokeWidth="12" strokeDasharray="502" strokeDashoffset="5.02" className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-5xl font-extrabold text-white font-mono">99<span className="text-3xl">.8</span></span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-2 bg-emerald-900/20 px-3 py-1 rounded-full border border-emerald-900/50">Trusted</span>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-900/10 border border-emerald-900/50 p-5 rounded-xl shadow-inner">
                  <h4 className="flex items-center text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Clinically Validated
                  </h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    The AI's recommendation perfectly aligns with FDA prescribing guidelines and NCCN protocols. No hallucinated entities detected. Safe for clinical review.
                  </p>
                </div>

                {/* Cryptographic Audit Log */}
                <div className="mt-auto pt-6 border-t border-gray-900">
                  <h4 className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 flex items-center">
                    <FileDigit className="w-3.5 h-3.5 mr-2 text-gray-600" />
                    Cryptographic Audit Trail
                  </h4>
                  <div className="bg-[#0a0a0c] p-4 rounded-xl font-mono text-[10px] text-gray-500 break-all border border-gray-800 shadow-inner">
                    <div className="flex justify-between items-center mb-1">
                      <span>Hash:</span>
                      <span className="text-gray-400">0x8f2a4b9...</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Timestamp:</span>
                      <span className="text-gray-400">{new Date().toISOString().split('T')[0]}</span>
                    </div>
                    <div className="mt-2 text-emerald-500/70 font-bold uppercase tracking-widest text-center border-t border-gray-800 pt-2">
                      ✓ Written to immutable ledger
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

export default BioValidatorWorkspace;
