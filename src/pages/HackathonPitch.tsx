import React, { useState } from 'react';

export default function HackathonPitch() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 10;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 1));

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#020617] text-slate-200 font-sans overflow-hidden relative flex flex-col items-center justify-center">
      {/* Background Effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="w-full max-w-6xl aspect-video bg-[#0f172a]/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl relative flex flex-col p-12">
        
        {/* Slide 1: Title */}
        {currentSlide === 1 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-32 h-32 mb-8 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-2xl rotate-45 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <span className="text-4xl font-bold text-white -rotate-45">s</span>
            </div>
            <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-400 tracking-tight mb-4">
              Bioquora
            </h1>
            <p className="text-2xl text-slate-400 font-mono tracking-widest uppercase mb-12">
              The Decentralized Biomedical Intelligence OS
            </p>
            <div className="inline-block px-6 py-2 border border-slate-700 rounded-full text-slate-400">
              MSME Idea Hackathon 6.O Pitch
            </div>
          </div>
        )}

        {/* Slide 2: The Problem */}
        {currentSlide === 2 && (
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">The Problem: Data Silos & High Costs</h2>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="p-6 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <h3 className="text-rose-400 font-bold mb-2">Trapped Clinical Data</h3>
                  <p className="text-slate-400">HIPAA and DPDP Acts prevent global sharing of patient data, starving AI models of necessary training data.</p>
                </div>
                <div className="p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <h3 className="text-orange-400 font-bold mb-2">Exorbitant Infrastructure Costs</h3>
                  <p className="text-slate-400">Small diagnostic centers and biotech MSMEs cannot afford the multi-million dollar GPU clusters required to run modern AI.</p>
                </div>
              </div>
              <div className="flex items-center justify-center text-center">
                <p className="text-3xl text-slate-300 italic leading-relaxed">
                  "The common man (Aam Aadmi) suffers because precision medicine remains a luxury available only in metro cities."
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: The Solution */}
        {currentSlide === 3 && (
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
            <h2 className="text-4xl font-bold text-emerald-400 mb-8 border-b border-slate-800 pb-4">The Solution: Bioquora</h2>
            <div className="grid grid-cols-3 gap-8">
               <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700">
                 <div className="text-4xl mb-4">!</div>
                 <h3 className="text-xl font-bold text-white mb-2">Decentralized Intelligence</h3>
                 <p className="text-slate-400">Moving the AI to the data instead of the data to the AI. 100% privacy compliance.</p>
               </div>
               <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700">
                 <div className="text-4xl mb-4"></div>
                 <h3 className="text-xl font-bold text-white mb-2">MSME Democratization</h3>
                 <p className="text-slate-400">Affordable, pay-as-you-go access to Enterprise-grade AI for rural and Tier-3 clinics.</p>
               </div>
               <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700">
                 <div className="text-4xl mb-4"></div>
                 <h3 className="text-xl font-bold text-white mb-2">Multi-Agent Swarm</h3>
                 <p className="text-slate-400">Specialized AI agents working together autonomously to accelerate drug discovery.</p>
               </div>
            </div>
          </div>
        )}

        {/* Slide 4: Architecture */}
        {currentSlide === 4 && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">The "God Mode" 20-Stage Architecture</h2>
            <div className="w-full h-64 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-wrap items-center justify-center p-8 gap-4">
              {['BioFoundation', 'BioAgents', 'BioReason', 'BioMemory', 'BioVision', 'BioCoder', 'BioSimulation', 'BioValidator', 'BioAssistant', 'BioInference', 'BioSafe'].map(stage => (
                <div key={stage} className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg border border-indigo-500/30 font-mono text-sm">
                  {stage}
                </div>
              ))}
              <div className="w-full text-center mt-4 text-slate-400 text-sm italic">
                * We have fully coded the backend database ORMs and API routers for all 20 stages.
              </div>
            </div>
          </div>
        )}

        {/* Slide 5: Societal Impact */}
        {currentSlide === 5 && (
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-left duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Societal Impact (The Aam Aadmi)</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <span className="text-emerald-400 text-2xl">$</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Affordable Diagnostics</h3>
                  <p className="text-slate-400 text-lg">Local diagnostic centers can run AI-driven pathology and genomics, vastly reducing the cost to the patient.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <span className="text-indigo-400 text-2xl">~</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Rural Reach</h3>
                  <p className="text-slate-400 text-lg">World-class precision medicine no longer requires travel to Tier-1 cities.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 6: Market Potential */}
        {currentSlide === 6 && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Market Potential & Target Audience</h2>
            <div className="grid grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-indigo-400 mb-6">Target Segments</h3>
                <ul className="space-y-4 text-lg text-slate-300">
                  <li className="flex items-center gap-3"> MSME Biotechnology Startups</li>
                  <li className="flex items-center gap-3"> Contract Research Organizations</li>
                  <li className="flex items-center gap-3"> Hospitals and Diagnostic Centers</li>
                  <li className="flex items-center gap-3"> Academic Research Institutions</li>
                </ul>
              </div>
              <div className="bg-[#1e293b] p-8 rounded-xl border border-slate-700 flex flex-col justify-center items-center">
                <div className="text-6xl font-bold text-emerald-400 mb-2">$188B</div>
                <div className="text-slate-400 uppercase tracking-widest text-sm">Global AI in Healthcare Market (2030)</div>
              </div>
            </div>
          </div>
        )}

        {/* Slide 7: Business Model */}
        {currentSlide === 7 && (
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Scalable Revenue Model</h2>
            <div className="grid grid-cols-3 gap-6">
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                 <h3 className="text-emerald-400 font-bold mb-4 uppercase tracking-wider text-sm">MSME Tier</h3>
                 <div className="text-2xl text-white font-bold mb-2">Pay-As-You-Go</div>
                 <p className="text-slate-400 text-sm">API access billed per inference token and compute-hour. Zero upfront CapEx for MSMEs.</p>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700 ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0f172a]">
                 <h3 className="text-indigo-400 font-bold mb-4 uppercase tracking-wider text-sm">Enterprise Tier</h3>
                 <div className="text-2xl text-white font-bold mb-2">Annual License</div>
                 <p className="text-slate-400 text-sm">$50k - $250k/year for private, on-premise "BioFederated" nodes at large hospitals.</p>
               </div>
               <div className="bg-[#1e293b] p-6 rounded-xl border border-slate-700">
                 <h3 className="text-fuchsia-400 font-bold mb-4 uppercase tracking-wider text-sm">BioAI Hub</h3>
                 <div className="text-2xl text-white font-bold mb-2">20% Platform Fee</div>
                 <p className="text-slate-400 text-sm">A decentralized marketplace where researchers can buy/sell specialized AI models.</p>
               </div>
            </div>
          </div>
        )}

        {/* Slide 8: Security */}
        {currentSlide === 8 && (
          <div className="flex-1 flex flex-col justify-center animate-in fade-in duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Security & Compliance (BioSafe)</h2>
            <div className="max-w-3xl">
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Security is non-negotiable in healthcare. We have engineered military-grade data protection directly into the OS.
              </p>
              <ul className="space-y-6">
                <li className="flex items-center gap-4 text-lg text-slate-400">
                  <span className="text-emerald-400">~</span> Zero-Trust Differential Privacy
                </li>
                <li className="flex items-center gap-4 text-lg text-slate-400">
                  <span className="text-emerald-400">~</span> On-Premise Federated Learning (Data never leaves the hospital)
                </li>
                <li className="flex items-center gap-4 text-lg text-slate-400">
                  <span className="text-emerald-400">~</span> Blockchain-backed Audit Trails (BioMemory)
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Slide 9: Traction & Roadmap */}
        {currentSlide === 9 && (
          <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
            <h2 className="text-4xl font-bold text-white mb-8 border-b border-slate-800 pb-4">Traction & Engineering Status</h2>
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 mb-8">
              <h3 className="text-xl text-emerald-400 font-bold mb-4">Current Status: Actively Compiling</h3>
              <p className="text-slate-300">
                Unlike pure concept pitches, Bioquora's core infrastructure is already built. We have successfully generated the SQLAlchemy ORMs, FastAPI backend routes, and React UI bindings for all 20 stages of the platform. The system is containerized via Docker and Kubernetes.
              </p>
            </div>
            <h3 className="text-lg text-slate-400 uppercase tracking-widest mb-4">Roadmap</h3>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-[#1e293b] rounded-lg text-sm text-slate-300 text-center">Year 1: Product-Market Fit & Beta Launch (3 Pilot Clinics)</div>
              <div className="flex-1 p-4 bg-[#1e293b] rounded-lg text-sm text-slate-300 text-center">Year 2: BioAI Hub Marketplace Launch</div>
              <div className="flex-1 p-4 bg-[#1e293b] rounded-lg text-sm text-slate-300 text-center">Year 3: Global Federated Network Scaling</div>
            </div>
          </div>
        )}

        {/* Slide 10: Conclusion / Ask */}
        {currentSlide === 10 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 mb-6 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-full flex items-center justify-center">
              <span className="text-4xl text-white">~</span>
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Partner With Us</h2>
            <p className="text-2xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
              We are asking for the MSME Idea Hackathon grant to deploy our Beta nodes to our first 3 partner clinics in rural India.
            </p>
            <div className="text-emerald-400 font-mono tracking-widest uppercase mb-2">Thank You</div>
            <div className="text-slate-500 text-sm">Bioquora - The Decentralized Biomedical Intelligence OS</div>
          </div>
        )}

        {/* Controls */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-slate-500">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="px-4 py-2 hover:text-white disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <div className="font-mono text-sm tracking-widest">
            {currentSlide} / {totalSlides}
          </div>
          <button 
            onClick={nextSlide}
            disabled={currentSlide === totalSlides}
            className="px-4 py-2 hover:text-white disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>

      </div>
    </div>
  );
}
