import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database, Bot, BrainCircuit, HardDrive, Search, Activity, Code, TestTube, 
  ShieldCheck, MessageSquare, LineChart, ShieldAlert, Target, GitMerge, 
  Factory, Network, BookOpen, Share2, Globe, Fingerprint, Play
} from 'lucide-react';

const BioquoraLauncher = () => {
  const navigate = useNavigate();

  const stages = [
    { id: 1, name: "BioFoundation", desc: "Multimodal EHR/Genomic ingestion", path: "/biofoundation", icon: <Database />, color: "from-blue-500 to-blue-700" },
    { id: 2, name: "BioAgents", desc: "Specialized clinical micro-agents", path: "/bioagents-workspace", icon: <Bot />, color: "from-indigo-500 to-indigo-700" },
    { id: 3, name: "BioReason", desc: "Clinical inference & CoT reasoning", path: "/bioreason-workspace", icon: <BrainCircuit />, color: "from-purple-500 to-purple-700" },
    { id: 4, name: "BioMemory", desc: "Vector DB & semantic medical graphs", path: "/biomemory-workspace", icon: <HardDrive />, color: "from-fuchsia-500 to-fuchsia-700" },
    { id: 5, name: "BioRetriever", desc: "RAG over 30M+ PubMed papers", path: "/bioretriever-workspace", icon: <Search />, color: "from-pink-500 to-pink-700" },
    { id: 6, name: "BioVision", desc: "DICOM/MRI CNN Analysis", path: "/biovision-workspace", icon: <Activity />, color: "from-rose-500 to-rose-700" },
    { id: 7, name: "BioCoder", desc: "Bioinformatics script generation", path: "/biocoder-workspace", icon: <Code />, color: "from-red-500 to-red-700" },
    { id: 8, name: "BioSimulation", desc: "AlphaFold protein folding", path: "/biosimulation-workspace", icon: <TestTube />, color: "from-orange-500 to-orange-700" },
    { id: 9, name: "BioValidator", desc: "FDA & NCCN guideline checking", path: "/biovalidator-workspace", icon: <ShieldCheck />, color: "from-amber-500 to-amber-700" },
    { id: 10, name: "BioAssistant", desc: "Conversational clinical interface", path: "/bioassistant-workspace", icon: <MessageSquare />, color: "from-yellow-500 to-yellow-700" },
    { id: 11, name: "BioInference", desc: "P-value & causal biostatistics", path: "/bioinference-workspace", icon: <LineChart />, color: "from-lime-500 to-lime-700" },
    { id: 12, name: "BioSafe", desc: "In silico toxicology prediction", path: "/biosafe-workspace", icon: <ShieldAlert />, color: "from-green-500 to-green-700" },
    { id: 13, name: "BioEval", desc: "USMLE model benchmarking", path: "/bioeval-workspace", icon: <Target />, color: "from-emerald-500 to-emerald-700" },
    { id: 14, name: "BioWorkflow", desc: "Autonomous agent orchestration", path: "/bioworkflow-workspace", icon: <GitMerge />, color: "from-teal-500 to-teal-700" },
    { id: 15, name: "BioFactory", desc: "Kubernetes global fleet scaling", path: "/biofactory-workspace", icon: <Factory />, color: "from-cyan-500 to-cyan-700" },
    { id: 16, name: "BioAIHub", desc: "3rd-party medical app store", path: "/bioaihub-workspace", icon: <Network />, color: "from-sky-500 to-sky-700" },
    { id: 17, name: "BioLearning", desc: "RLHF & continuous fine-tuning", path: "/biolearning-workspace", icon: <BookOpen />, color: "from-blue-500 to-indigo-500" },
    { id: 18, name: "BioFederated", desc: "Decentralized privacy (HIPAA)", path: "/biofederated-workspace", icon: <Share2 />, color: "from-indigo-500 to-purple-500" },
    { id: 19, name: "BioASI", desc: "Planetary meta-reasoning", path: "/bioasi-workspace", icon: <Globe />, color: "from-purple-500 to-pink-500" },
    { id: 20, name: "BioCore", desc: "Unified Healthcare OS Dashboard", path: "/biocore-workspace", icon: <Fingerprint />, color: "from-gray-700 to-black border-2 border-white" },
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white p-10 font-sans relative overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/20 to-transparent blur-3xl pointer-events-none"></div>

      <header className="text-center mb-16 relative z-10">
        <h1 className="text-6xl font-black mb-4 tracking-tighter flex justify-center items-center">
          BIOQUORA<span className="text-blue-500 ml-2">OS</span>
        </h1>
        <p className="text-xl text-gray-400 font-light tracking-wide max-w-2xl mx-auto">
          The 20-Stage Cognitive Architecture for Planetary Healthcare.
        </p>
        <div className="mt-6 flex justify-center">
           <button onClick={() => navigate('/biocore-workspace')} className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full font-mono text-sm transition-colors flex items-center">
             <Play className="w-4 h-4 mr-2" />
             LAUNCH BIOCORE (STAGE 20)
           </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto relative z-10 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {stages.map((stage) => (
            <div 
              key={stage.id}
              onClick={() => navigate(stage.path)}
              className="bg-[#0a0a0a] border border-gray-800 hover:border-gray-500 rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:-translate-y-1 relative overflow-hidden flex flex-col h-full"
            >
              {/* Card Gradient Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stage.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${stage.color} shadow-lg text-white`}>
                  {React.cloneElement(stage.icon as React.ReactElement, { className: 'w-6 h-6' })}
                </div>
                <div className="text-[10px] font-mono font-bold text-gray-500 bg-gray-900 px-2 py-1 rounded">
                  STAGE {stage.id}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-1 relative z-10 group-hover:text-white text-gray-200">{stage.name}</h3>
              <p className="text-xs text-gray-500 relative z-10 leading-relaxed group-hover:text-gray-400">
                {stage.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default BioquoraLauncher;
