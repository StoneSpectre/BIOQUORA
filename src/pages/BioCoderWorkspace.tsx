import React, { useState, useEffect } from 'react';
import { Terminal, Code, Cpu, Download, Play, CheckCircle, Loader2, Sparkles, Copy } from 'lucide-react';

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

    // Typewriter effect simulation
    let i = 0;
    const typingInterval = setInterval(() => {
      setCode((prev) => prev + finalCode.charAt(i));
      i++;
      if (i >= finalCode.length) {
        clearInterval(typingInterval);
        setIsGenerating(false);
        setShowResults(true);
      }
    }, 15); // Adjust typing speed here
  };

  const handleUseSample = () => {
    setPrompt(samplePrompt);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-8 font-sans">
      
      {/* Header */}
      <header className="mb-8 flex justify-between items-end border-b border-gray-800 pb-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 flex items-center">
            <Terminal className="w-10 h-10 mr-3 text-purple-400" />
            BioCoder IDE
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Stage 7: Autonomous Bioinformatics Pipeline Generation</p>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center px-4 py-2 bg-gray-900 rounded-full border border-gray-700">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-sm text-gray-300">Code LLM: llama-3-biocoder</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left/Main Column: Prompt & Editor */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          
          {/* Prompt Box */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-300 flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-pink-400" />
                Natural Language Instruction
              </label>
              <button 
                onClick={handleUseSample}
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
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
                className="flex-1 bg-[#161b22] border border-gray-700 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:border-purple-500 transition-colors font-mono text-sm"
              />
              <button 
                onClick={handleGenerate}
                disabled={!prompt || isGenerating}
                className={`px-6 py-3 rounded-lg font-bold flex items-center transition-all ${
                  !prompt || isGenerating ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                }`}
              >
                {isGenerating ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Coding...</> : 'Generate'}
              </button>
            </div>
          </div>

          {/* IDE Window */}
          <div className="flex-1 bg-[#010409] border border-gray-800 rounded-xl shadow-2xl flex flex-col overflow-hidden min-h-[500px]">
            {/* IDE Header */}
            <div className="bg-[#161b22] px-4 py-2 flex items-center justify-between border-b border-gray-800">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-500 font-mono flex items-center">
                <Code className="w-3 h-3 mr-1" /> pipeline.py
              </div>
              <div className="flex space-x-3">
                <button className="text-gray-400 hover:text-white transition-colors" title="Copy Code">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors" title="Download Script">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Code Content Area */}
            <div className="flex-1 p-6 relative overflow-y-auto font-mono text-sm">
              {!code && !isGenerating ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600">
                  <Terminal className="w-16 h-16 mb-4 opacity-50" />
                  <p>Awaiting instructions. Ready to synthesize pipelines.</p>
                </div>
              ) : (
                <pre className="text-gray-300 whitespace-pre-wrap">
                  <code 
                    dangerouslySetInnerHTML={{
                      // Very basic mock syntax highlighting for python
                      __html: code
                        .replace(/import|from|def|if|return/g, '<span class="text-pink-400">$&</span>')
                        .replace(/print/g, '<span class="text-blue-400">$&</span>')
                        .replace(/(".*?"|'.*?')/g, '<span class="text-yellow-300">$&</span>')
                        .replace(/(#.*)/g, '<span class="text-gray-500 italic">$&</span>')
                    }}
                  />
                  {isGenerating && <span className="inline-block w-2 h-4 bg-gray-400 ml-1 animate-pulse"></span>}
                </pre>
              )}
            </div>
          </div>
          
        </div>

        {/* Right Column: AI Insights & Dependencies */}
        <div className="space-y-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-xl h-full flex flex-col">
            <h3 className="text-lg font-bold text-gray-100 flex items-center border-b border-gray-800 pb-4 mb-4">
              <Cpu className="w-5 h-5 mr-2 text-purple-400" />
              Runtime Analysis
            </h3>
            
            {!showResults ? (
               <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-sm text-center">
                 {isGenerating ? (
                   <>
                     <Loader2 className="w-8 h-8 animate-spin text-purple-500 mb-4" />
                     <p>Analyzing AST and resolving dependencies...</p>
                   </>
                 ) : (
                   <p>Run a generation to see runtime metrics and dependencies.</p>
                 )}
               </div>
            ) : (
              <div className="space-y-6 animate-fade-in-up flex-1">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Time Complexity</div>
                    <div className="text-sm font-mono text-emerald-400">O(N log N)</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">Space Complexity</div>
                    <div className="text-sm font-mono text-yellow-400">O(N)</div>
                  </div>
                </div>

                {/* Dependencies */}
                <div>
                  <h4 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Detected Dependencies</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between text-sm bg-[#161b22] px-3 py-2 rounded-md">
                      <span className="font-mono text-blue-300">scanpy</span>
                      <span className="text-xs text-emerald-500 font-semibold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v1.9.3</span>
                    </li>
                    <li className="flex items-center justify-between text-sm bg-[#161b22] px-3 py-2 rounded-md">
                      <span className="font-mono text-blue-300">pandas</span>
                      <span className="text-xs text-emerald-500 font-semibold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v2.1.0</span>
                    </li>
                    <li className="flex items-center justify-between text-sm bg-[#161b22] px-3 py-2 rounded-md">
                      <span className="font-mono text-blue-300">numpy</span>
                      <span className="text-xs text-emerald-500 font-semibold flex items-center"><CheckCircle className="w-3 h-3 mr-1"/> v1.26.0</span>
                    </li>
                  </ul>
                </div>

                {/* Actions */}
                <div className="mt-auto pt-4 border-t border-gray-800">
                  <button className="w-full flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors text-sm font-semibold">
                    <Play className="w-4 h-4 mr-2" />
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
          animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BioCoderWorkspace;
