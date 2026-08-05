import React, { useState, useEffect } from 'react';

export default function BioAIHubDocs() {

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
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans p-8 font-mono">
      <div className="max-w-7xl mx-auto flex gap-8">
        
        {/* Sidebar Nav */}
        <div className="w-64 border-r border-slate-800 pr-6">
           <h2 className="text-lg font-bold text-white mb-6 uppercase tracking-widest">BioAPI Reference</h2>
           
           <div className="space-y-4 text-xs font-bold">
              <div>
                 <div className="text-slate-500 uppercase tracking-widest mb-2">Authentication</div>
                 <div className="space-y-2 pl-2 border-l border-slate-800">
                    <div className="text-pink-400 cursor-pointer">Generate API Key</div>
                    <div className="text-slate-400 hover:text-white cursor-pointer">OAuth2 Integration</div>
                 </div>
              </div>
              <div>
                 <div className="text-slate-500 uppercase tracking-widest mb-2">BioRetriever</div>
                 <div className="space-y-2 pl-2 border-l border-slate-800">
                    <div className="text-slate-400 hover:text-white cursor-pointer">Vector Search</div>
                    <div className="text-slate-400 hover:text-white cursor-pointer">Graph Traversal</div>
                 </div>
              </div>
           </div>
        </div>

        {/* Content */}
        <div className="flex-1">
           <div className="flex justify-between items-end mb-6 border-b border-slate-800 pb-4">
              <h1 className="text-2xl font-bold text-white">Generate API Key</h1>
              <span className="bg-emerald-950 text-emerald-400 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest">POST /api/v1/auth/keys</span>
           </div>

           <div className="prose prose-invert prose-sm max-w-none font-sans">
              <p className="text-slate-400">
                 Creates a new API key scoped to your developer account or organization tenant.
                 Requires standard Bioquora JWT authentication to provision.
              </p>
              
              <h3 className="text-white mt-8 mb-4 font-mono text-sm uppercase tracking-widest">Example Request (cURL)</h3>
              <div className="bg-black border border-slate-800 rounded p-4 text-xs font-mono text-slate-300 overflow-x-auto">
<pre>{`curl -X POST https://api.bioquora.com/v1/auth/keys \\
  -H "Authorization: Bearer <YOUR_JWT>" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production Server Key",
    "scopes": ["retriever:read", "reasoning:write"]
  }'`}</pre>
              </div>

              <h3 className="text-white mt-8 mb-4 font-mono text-sm uppercase tracking-widest">Response</h3>
              <div className="bg-black border border-slate-800 rounded p-4 text-xs font-mono text-emerald-400 overflow-x-auto">
<pre>{`{
  "id": "key_8923jklj234",
  "name": "Production Server Key",
  "key": "bk_prod_xxxxxxxxxxxxxx",
  "created_at": "2026-08-01T10:14:00Z"
}`}</pre>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
