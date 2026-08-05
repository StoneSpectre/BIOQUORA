import React, { useState, useEffect } from 'react';

export default function BioLabExecution() {

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
    <div className="h-screen bg-[#050A15] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <header className="h-14 bg-[#0A1020] border-b border-slate-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold text-white tracking-wide">Execution Monitor</h1>
          <span className="text-xs bg-blue-900/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> RUNNING
          </span>
        </div>
        <div className="flex gap-3">
          <button className="px-3 py-1.5 bg-rose-900/20 text-rose-400 text-xs font-mono rounded border border-rose-500/30 hover:bg-rose-900/40">Cancel Execution</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden p-6 gap-6">
        
        {/* Left Column: DAG Status */}
        <div className="w-1/3 bg-[#0A1020] border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-[#050A15] flex justify-between items-center">
            <h2 className="text-sm font-medium text-white">Execution Pipeline</h2>
            <span className="text-xs font-mono text-slate-500">Job: exec-456</span>
          </div>
          <div className="p-4 flex-1 overflow-y-auto space-y-4">
            
            <div className="border border-green-500/30 bg-green-900/10 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-green-500">✓</div>
                <div>
                  <div className="text-sm text-slate-200">Data Fetch & Validation</div>
                  <div className="text-xs text-slate-500 font-mono">1m 24s</div>
                </div>
              </div>
              <span className="text-[10px] uppercase text-green-500 font-mono">Success</span>
            </div>

            <div className="border border-blue-500/30 bg-blue-900/10 p-3 rounded-lg flex items-center justify-between relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-1 bg-blue-500 w-[45%]"></div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                <div>
                  <div className="text-sm text-white font-medium">Bowtie2 Alignment (GRCh38)</div>
                  <div className="text-xs text-slate-400 font-mono">Running on BioCloud HPC... 45m elapsed</div>
                </div>
              </div>
              <span className="text-[10px] uppercase text-blue-400 font-mono">45%</span>
            </div>

            <div className="border border-slate-700 bg-[#050A15] p-3 rounded-lg flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="text-slate-600">⏳</div>
                <div>
                  <div className="text-sm text-slate-400">BioBERT Fine-Tuning</div>
                  <div className="text-xs text-slate-500 font-mono">Awaiting upstream tasks</div>
                </div>
              </div>
              <span className="text-[10px] uppercase text-slate-500 font-mono">Queued</span>
            </div>

          </div>
        </div>

        {/* Right Column: Logs & Metrics */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Terminal / Logs */}
          <div className="flex-1 bg-[#0A1020] border border-slate-800 rounded-xl flex flex-col overflow-hidden shadow-lg">
            <div className="p-3 border-b border-slate-800 bg-[#050A15] flex justify-between items-center">
              <h2 className="text-sm font-mono text-slate-400">Execution Logs: Bowtie2 Alignment</h2>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                <span className="w-3 h-3 rounded-full bg-slate-700"></span>
                <span className="w-3 h-3 rounded-full bg-slate-700"></span>
              </div>
            </div>
            <div className="flex-1 bg-black p-4 font-mono text-[11px] text-slate-300 overflow-y-auto leading-relaxed">
              <div className="text-emerald-400">[SYSTEM] Provisioning BioCloud HPC instance (16 CPU, 64GB RAM)... Done.</div>
              <div className="text-emerald-400">[SYSTEM] Pulling container biocontainers/bowtie2:2.4.4... Done.</div>
              <div>[BOWTIE] Time loading reference: 00:00:12</div>
              <div>[BOWTIE] Time loading forward index: 00:00:08</div>
              <div>[BOWTIE] Reading reads from GSE12345_R1.fq.gz...</div>
              <div>[BOWTIE] Processing block 1 / 100...</div>
              <div>[BOWTIE] 1450000 reads; of these:</div>
              <div>[BOWTIE]   1450000 (100.00%) were paired; of these:</div>
              <div>[BOWTIE]     120000 (8.28%) aligned concordantly 0 times</div>
              <div>[BOWTIE]     1300000 (89.65%) aligned concordantly exactly 1 time</div>
              <div>[BOWTIE]     30000 (2.07%) aligned concordantly &gt;1 times</div>
              <div className="text-blue-400 animate-pulse mt-4">_</div>
            </div>
          </div>

          {/* Resource Metrics */}
          <div className="h-48 bg-[#0A1020] border border-slate-800 rounded-xl p-4 flex flex-col">
            <h2 className="text-sm font-mono text-slate-400 uppercase mb-4">BioCloud Resource Utilization</h2>
            <div className="flex gap-8 flex-1">
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">CPU (16 Cores)</span>
                  <span className="text-emerald-400 font-mono">92%</span>
                </div>
                <div className="w-full bg-[#050A15] h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-emerald-500 h-full w-[92%]"></div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">Memory (64 GB)</span>
                  <span className="text-amber-400 font-mono">42.5 GB</span>
                </div>
                <div className="w-full bg-[#050A15] h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-amber-500 h-full w-[66%]"></div>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-slate-300">Network I/O</span>
                  <span className="text-blue-400 font-mono">450 MB/s</span>
                </div>
                <div className="w-full bg-[#050A15] h-3 rounded-full overflow-hidden border border-slate-800">
                  <div className="bg-blue-500 h-full w-[40%]"></div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
