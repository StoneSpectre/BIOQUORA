import React, { useState, useEffect } from 'react';

export default function BioEarthPublicHealth() {

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
    <div className="min-h-screen bg-slate-900 text-slate-300 font-sans p-8">
      
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-8 flex justify-between items-end border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="text-rose-500">🏥</span> Global Public Health Intelligence
            </h1>
            <p className="text-slate-400 mt-1">Real-time epidemiological surveillance, pathogen tracking, and environmental health monitoring.</p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-slate-800 border border-slate-700 text-white text-sm font-bold rounded-lg shadow-sm hover:bg-slate-700">WHO Integration Status</button>
             <button className="px-4 py-2 bg-rose-600 text-white text-sm font-bold rounded-lg shadow hover:bg-rose-500">Issue Health Alert</button>
          </div>
        </header>

        <div className="grid grid-cols-3 gap-8">
           
           {/* Disease Surveillance */}
           <div className="col-span-2 space-y-6">
              
              <div className="bg-[#1e293b] border border-slate-700 rounded-xl shadow-lg overflow-hidden">
                 <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
                    <div>
                       <h3 className="font-bold text-slate-200">Active Disease Surveillance</h3>
                       <p className="text-xs text-slate-400">Federated genomic and clinical data from global health partners.</p>
                    </div>
                    <div className="px-3 py-1 bg-rose-900/30 text-rose-400 border border-rose-500/50 rounded text-xs font-bold flex items-center gap-2">
                       <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span> 3 Active Outbreaks Monitored
                    </div>
                 </div>
                 
                 <div className="p-6 space-y-6">
                    
                    {/* Outbreak 1 */}
                    <div className="bg-black/40 border border-rose-500/30 rounded-lg p-5 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                       <div className="flex justify-between items-start mb-3">
                          <div>
                             <h4 className="text-lg font-bold text-white">Avian Influenza (H5N1) - Clade 2.3.4.4b</h4>
                             <p className="text-xs text-slate-400 mt-1">Detected via genomic wastewater surveillance network.</p>
                          </div>
                          <span className="px-2 py-1 bg-rose-900/50 text-rose-400 text-xs font-bold rounded border border-rose-500/50 uppercase">Elevated Risk</span>
                       </div>
                       <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Regions Affected</div>
                             <div className="text-sm font-bold text-slate-300">North America, EU</div>
                          </div>
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">New Genomes Seq. (7d)</div>
                             <div className="text-sm font-bold text-white">1,402</div>
                          </div>
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Transmission Mode</div>
                             <div className="text-sm font-bold text-slate-300">Zoonotic (Avian/Bovine)</div>
                          </div>
                       </div>
                    </div>

                    {/* Outbreak 2 */}
                    <div className="bg-black/40 border border-amber-500/30 rounded-lg p-5 relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
                       <div className="flex justify-between items-start mb-3">
                          <div>
                             <h4 className="text-lg font-bold text-white">Dengue Virus (Serotype 2)</h4>
                             <p className="text-xs text-slate-400 mt-1">Correlated with unprecedented regional temperature and rainfall spikes.</p>
                          </div>
                          <span className="px-2 py-1 bg-amber-900/50 text-amber-400 text-xs font-bold rounded border border-amber-500/50 uppercase">Monitoring</span>
                       </div>
                       <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Regions Affected</div>
                             <div className="text-sm font-bold text-slate-300">South America, SE Asia</div>
                          </div>
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Climate Correlation</div>
                             <div className="text-sm font-bold text-amber-400">Very High (El Niño)</div>
                          </div>
                          <div>
                             <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Active Trials</div>
                             <div className="text-sm font-bold text-slate-300">14 (BioClinical)</div>
                          </div>
                       </div>
                    </div>

                 </div>
              </div>

           </div>

           {/* Environmental Health */}
           <div className="col-span-1 space-y-6">
              
              <div className="bg-gradient-to-br from-teal-900 to-[#1e293b] border border-teal-700/50 rounded-xl p-6 shadow-lg">
                 <h3 className="text-sm font-bold text-teal-300 mb-4 uppercase tracking-wider">Environmental Intelligence</h3>
                 
                 <div className="space-y-5">
                    <div>
                       <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-200">Global AQI Alert (PM2.5)</span>
                          <span className="text-rose-400">Critical (South Asia)</span>
                       </div>
                       <p className="text-[10px] text-teal-100/70 leading-relaxed">
                          BioEarth AI models correlate recent severe air quality degradation with a projected 15% spike in acute respiratory admissions over the next 14 days. Predictive resources deployed to local hospital federations.
                       </p>
                    </div>

                    <hr className="border-teal-700/50" />

                    <div>
                       <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-slate-200">Zoonotic Spillover Risk</span>
                          <span className="text-amber-400">Elevated (Amazon Basin)</span>
                       </div>
                       <p className="text-[10px] text-teal-100/70 leading-relaxed">
                          Deforestation satellite metrics combined with local biodiversity loss indicate high probability zones for novel pathogen emergence. Field teams notified via BioNet.
                       </p>
                    </div>
                 </div>
              </div>

           </div>

        </div>
      </div>
    </div>
  );
}
