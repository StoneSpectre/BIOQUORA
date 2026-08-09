import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Download, Play, CheckCircle, Loader2, Sparkles, Copy, Braces, TerminalSquare, Layers, Command } from 'lucide-react';

const BioCoderWorkspace = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [code, setCode] = useState('');
  const [showResults, setShowResults] = useState(false);

  const samplePrompt = "Generate a single-cell RNA-seq clustering pipeline for BRCA data.";
  const finalCode = `import pandas as pd
import scanpy as sc
import numpy as np
import matplotlib.pyplot as plt

def analyze_brca_scRNA(data_path):
    print("Initializing BioCoder Pipeline...")
    
    # 1. Load Data
    print(f"Loading data from {data_path}")
    adata = sc.read_10x_mtx(data_path, var_names='gene_symbols', cache=True)
    adata.var_names_make_unique()
    
    # 2. Quality Control
    sc.pp.filter_cells(adata, min_genes=200)
    sc.pp.filter_genes(adata, min_cells=3)
    adata.var['mt'] = adata.var_names.str.startswith('MT-')
    sc.pp.calculate_qc_metrics(adata, qc_vars=['mt'], percent_top=None, log1p=False, inplace=True)
    
    # 3. Normalization
    sc.pp.normalize_total(adata, target_sum=1e4)
    sc.pp.log1p(adata)
    
    # 4. Dimensionality Reduction & Clustering
    sc.pp.highly_variable_genes(adata, min_mean=0.0125, max_mean=3, min_disp=0.5)
    sc.pl.highly_variable_genes(adata)
    adata = adata[:, adata.var.highly_variable]
    sc.pp.scale(adata, max_value=10)
    sc.tl.pca(adata, svd_solver='arpack')
    sc.pp.neighbors(adata, n_neighbors=10, n_pcs=40)
    sc.tl.umap(adata)
    sc.tl.leiden(adata)
    
    print("Pipeline Complete: Ready for downstream analysis.")
    return adata

if __name__ == "__main__":
    analyze_brca_scRNA("./data/BRCA_raw")`;

  const handleGenerate = () => {
    if (!prompt) return;
    setIsGenerating(true);
    setCode('');
    setShowResults(false);

    let i = 0;
    const typingInterval = setInterval(() => {
      setCode((prev) => prev + finalCode.charAt(i));
      i++;
      if (i >= finalCode.length) {
        clearInterval(typingInterval);
        setIsGenerating(false);
        setShowResults(true);
      }
    }, 15);
  };

  const handleUseSample = () => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-8 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 7 • Script Generation Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
            <Terminal className="w-10 h-10 mr-3 text-red-500 animate-pulse" />
            BioCoder IDE
          </h1>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-950/80 backdrop-blur rounded-full border border-gray-800 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2 shadow-[0_0_10px_#ef4444]"></div>
            <span className="text-sm text-gray-200 font-mono font-bold tracking-widest uppercase">LLM: llama-3-biocoder</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left/Main Column: Prompt & Editor */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          
          {/* Prompt Box */}
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-orange-500"></div>

            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-bold text-gray-400 flex items-center tracking-widest uppercase">
                <Command className="w-4 h-4 mr-2 text-red-400" />
                Natural Language Instruction
              </label>
              <button 
                onClick={handleUseSample}
                className="text-[10px] font-mono font-bold text-red-400 hover:text-red-300 transition-colors bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 px-2 py-1 rounded uppercase tracking-widest"
              >
                Use Example Prompt
              </button>
            </div>
            <div className="flex space-x-4">
              <input 
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Build a pipeline to filter and normalize single-cell RNA..."
                className="flex-1 bg-[#0a0a0c] border border-gray-800 rounded-xl px-4 py-3 text-gray-200 focus:outline-none focus:border-red-500 transition-colors font-mono text-sm shadow-inner"
              />
              <button 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`px-8 py-3 rounded-xl font-bold flex items-center transition-all tracking-wide text-sm ${
                  !prompt || isGenerating ? 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800' : 'bg-red-600 text-white hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                }`}
              >
                {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> SYNTHESIZING...</> : 'GENERATE'}
              </button>
            </div>
          </div>

          {/* IDE Window */}
          <div className="flex-1 bg-[#030303] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden min-h-[550px] group hover:border-gray-600 transition-colors duration-500">
            {/* IDE Header */}
            <div className="bg-[#0a0a0c] px-6 py-3 flex items-center justify-between border-b border-gray-900">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono font-bold flex items-center uppercase tracking-widest">
                <Code className="w-4 h-4 mr-2 text-red-500" /> pipeline.py
              </div>
              <div className="flex space-x-4">
                <button className="text-gray-600 hover:text-white transition-colors" title="Copy Code">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-white transition-colors" title="Download Script">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Code Content Area */}
            <div className="flex-1 p-6 relative overflow-y-auto font-mono text-sm leading-relaxed">
              {!code && !isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600/50">
                  <TerminalSquare className="w-20 h-20 mb-4 opacity-50 text-red-900/50" />
                  <p className="font-mono text-xs uppercase tracking-widest">Awaiting instructions. Ready to synthesize pipelines.</p>
                </div>
              ) : (
                <pre className="text-gray-300 whitespace-pre-wrap">
                  <code 
                    dangerouslySetInnerHTML={{
                      __html: code
                        .replace(/import|from|def|if|return/g, '<span class="text-pink-500 font-bold">$&</span>')
                        .replace(/print/g, '<span class="text-cyan-400 font-bold">$&</span>')
                        .replace(/(".*?"|'.*?')/g, '<span class="text-amber-300">$&</span>')
                        .replace(/(#.*)/g, '<span class="text-gray-500 italic">$&</span>')
                    }}
                  />
                  {isGenerating && <span className="inline-block w-2 h-4 bg-red-500 ml-1 animate-pulse shadow-[0_0_10px_#ef4444]"></span>}
                </pre>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column: AI Insights & Dependencies */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl h-full flex flex-col group hover:border-gray-600 transition-colors duration-500 relative overflow-hidden">
             
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-900 pb-3 flex items-center">
              <Cpu className="w-4 h-4 mr-2 text-red-400" />
              Runtime Analysis
            </h3>
            
            {!showResults ? (
               <div className="flex-1 flex flex-col items-center justify-center text-gray-600 text-xs font-mono uppercase tracking-widest text-center">
                 {isGenerating ? (
                   <>
                     <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-4" />
                     <p>Analyzing AST and resolving dependencies...</p>
                   </>
                 ) : (
                   <p className="opacity-50">Run a generation to see runtime metrics and dependencies.</p>
                 )}
               </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up flex-1 flex flex-col">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Time Complexity</div>
                    <div className="text-sm font-mono font-bold text-emerald-400">O(N log N)</div>
                  </div>
                  <div className="bg-[#0a0a0c] p-4 rounded-xl border border-gray-800">
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Space Complexity</div>
                    <div className="text-sm font-mono font-bold text-amber-400">O(N)</div>
                  </div>
                </div>

                {/* Dependencies */}
                <div className="flex-1">
                  <h4 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 flex items-center">
                     <Layers className="w-3.5 h-3.5 mr-2 text-blue-400" />
                     Detected Dependencies
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-xs bg-[#0a0a0c] px-4 py-3 rounded-xl border border-gray-800">
                      <span className="font-mono text-blue-400 font-bold">scanpy</span>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v1.9.3</span>
                    </li>
                    <li className="flex items-center justify-between text-xs bg-[#0a0a0c] px-4 py-3 rounded-xl border border-gray-800">
                      <span className="font-mono text-blue-400 font-bold">pandas</span>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v2.1.0</span>
                    </li>
                    <li className="flex items-center justify-between text-xs bg-[#0a0a0c] px-4 py-3 rounded-xl border border-gray-800">
                      <span className="font-mono text-blue-400 font-bold">numpy</span>
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v1.26.0</span>
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-gray-900">
                  <button className="w-full flex items-center justify-center px-4 py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <Play className="w-4 h-4 mr-2 fill-current" />
                    Deploy to Compute Cluster
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
      </div>
      
      {/* Global CSS for animations */}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BioCoderWorkspace;
