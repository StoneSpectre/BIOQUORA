import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Paperclip, Mic, Sparkles, Activity, FileText, Stethoscope, ChevronRight, Share2, Download, Maximize2 } from 'lucide-react';

export default function BioAssistantWorkspace() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello Dr. Smith. I am BioAssistant, your clinical AI copilot. I have analyzed the latest patient telemetry and federated EHR data. How can I assist you with your research or diagnostics today?',
      citations: [],
      actions: []
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [reasoningPhase, setReasoningPhase] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, reasoningPhase]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input, citations: [], actions: [] }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking phases
    setReasoningPhase('Parsing intent and entity extraction...');
    
    setTimeout(() => setReasoningPhase('Querying Vector DB & GraphRAG...'), 1500);
    setTimeout(() => setReasoningPhase('Synthesizing evidence against NCCN guidelines...'), 3000);
    setTimeout(() => setReasoningPhase('Generating clinical response...'), 4500);

    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: "Based on the latest NCCN guidelines and federated clinical data, I recommend reviewing the patient's EGFR mutation status. If an Exon 19 deletion is present, Erlotinib is highly indicated. I have generated a preliminary treatment plan for your review in Stage 14 (BioWorkflow).",
        citations: ['NCCN NSCLC Guidelines v3.2023', 'PMID: 25684711'],
        actions: ['View Treatment Plan', 'Export to EHR']
      }]);
      setIsTyping(false);
      setReasoningPhase('');
    }, 6000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="min-h-screen bg-[#020202] text-gray-300 font-sans p-8 overflow-hidden relative flex flex-col">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <header className="mb-6 border-b border-gray-900 pb-4 flex justify-between items-end relative z-10 shrink-0">
        <div>
          <div className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-1 uppercase">Stage 10 • Conversational Layer</div>
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500 flex items-center">
             <Bot className="w-10 h-10 mr-3 text-purple-500 animate-pulse" />
             BioAssistant Copilot
          </h1>
        </div>
        <div className="flex space-x-3">
           <button className="p-2.5 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl transition-colors shadow-inner text-gray-400 hover:text-white group">
             <Activity className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
           </button>
           <button className="p-2.5 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl transition-colors shadow-inner text-gray-400 hover:text-white group">
             <Stethoscope className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
           </button>
           <button className="p-2.5 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl transition-colors shadow-inner text-gray-400 hover:text-white group">
             <Maximize2 className="w-5 h-5 transition-colors" />
           </button>
        </div>
      </header>

      {/* Main Interface Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 overflow-hidden min-h-0">
        
        {/* Chat Area */}
        <div className="lg:col-span-8 flex flex-col bg-[#050505] border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden group hover:border-gray-600 transition-colors duration-500">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-fuchsia-500"></div>
           
           {/* Messages Scroll Area */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
             {messages.map((msg, index) => (
               <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`flex max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                   
                   {/* Avatar */}
                   <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border shadow-inner ${
                     msg.role === 'user' 
                       ? 'bg-[#0a0a0c] border-gray-800 ml-4' 
                       : 'bg-purple-900/30 border-purple-500/50 mr-4'
                   }`}>
                     {msg.role === 'user' 
                       ? <User className="w-5 h-5 text-gray-400" /> 
                       : <Sparkles className="w-5 h-5 text-purple-400" />
                     }
                   </div>
                   
                   {/* Bubble Container */}
                   <div className="flex flex-col">
                      {/* Name Label */}
                      <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${msg.role === 'user' ? 'text-right text-gray-500' : 'text-left text-purple-500'}`}>
                         {msg.role === 'user' ? 'Dr. Smith (You)' : 'BioAssistant AI'}
                      </div>
                      
                      {/* Message Bubble */}
                      <div className={`p-5 rounded-2xl shadow-lg relative ${
                        msg.role === 'user' 
                          ? 'bg-purple-600 text-white rounded-tr-none' 
                          : 'bg-[#0a0a0c] border border-gray-800 text-gray-300 rounded-tl-none shadow-inner'
                      }`}>
                        <p className="leading-relaxed text-sm font-sans whitespace-pre-wrap">{msg.content}</p>
                        
                        {/* Interactive Elements for Assistant */}
                        {msg.role === 'assistant' && index > 0 && (
                           <div className="mt-5 space-y-3 border-t border-gray-800/50 pt-4">
                              {msg.citations && msg.citations.length > 0 && (
                                 <div className="flex flex-wrap gap-2 items-center">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mr-2">Citations:</span>
                                    {msg.citations.map((cite, i) => (
                                      <span key={i} className="px-2 py-1 bg-[#111] border border-gray-700 rounded-lg text-[10px] font-mono text-emerald-400 hover:border-emerald-500 cursor-pointer transition-colors">
                                        {cite}
                                      </span>
                                    ))}
                                 </div>
                              )}
                              {msg.actions && msg.actions.length > 0 && (
                                 <div className="flex flex-wrap gap-2">
                                    {msg.actions.map((action, i) => (
                                      <button key={i} className="px-3 py-1.5 bg-purple-900/20 hover:bg-purple-900/40 border border-purple-500/30 rounded-lg text-[10px] font-bold uppercase tracking-widest text-purple-300 transition-colors flex items-center">
                                        {action} <ChevronRight className="w-3 h-3 ml-1" />
                                      </button>
                                    ))}
                                 </div>
                              )}
                           </div>
                        )}
                      </div>
                   </div>
                 </div>
               </div>
             ))}
             
             {/* Dynamic Typing & Reasoning Indicator */}
             {isTyping && (
               <div className="flex justify-start">
                 <div className="flex flex-row max-w-[85%]">
                   <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-900/30 border border-purple-500/50 mr-4 flex items-center justify-center shadow-inner">
                     <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                   </div>
                   <div className="flex flex-col justify-center">
                      <div className="p-4 bg-[#0a0a0c] border border-gray-800 rounded-2xl rounded-tl-none shadow-inner min-w-[250px]">
                         <div className="flex items-center space-x-3 mb-2">
                           <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                           <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                           <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                         </div>
                         <div className="text-[10px] font-mono text-purple-400/80 animate-pulse uppercase tracking-widest">
                           {reasoningPhase}
                         </div>
                      </div>
                   </div>
                 </div>
               </div>
             )}
             <div ref={messagesEndRef} />
           </div>

           {/* Input Area */}
           <div className="p-4 bg-[#050505] border-t border-gray-900 relative z-20">
              
              {/* Suggested Prompts */}
              {!isTyping && messages.length <= 1 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => handleSuggestion("Analyze recent literature on KRAS inhibitors.")} className="text-[10px] font-bold uppercase tracking-widest bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors flex items-center shadow-inner">
                    <FileText className="w-3 h-3 mr-2 text-purple-400" /> Analyze KRAS literature
                  </button>
                  <button onClick={() => handleSuggestion("Cross-check this patient's symptoms against rare diseases.")} className="text-[10px] font-bold uppercase tracking-widest bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 px-4 py-2 rounded-xl text-gray-400 hover:text-white transition-colors flex items-center shadow-inner">
                    <Activity className="w-3 h-3 mr-2 text-emerald-400" /> Check rare diseases
                  </button>
                </div>
              )}

              {/* Input Box */}
              <div className="relative flex items-end bg-[#0a0a0c] border border-gray-800 rounded-2xl overflow-hidden focus-within:border-purple-500/50 transition-all shadow-inner group">
                <button className="p-4 text-gray-500 hover:text-purple-400 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask BioAssistant a clinical question..."
                  className="flex-1 max-h-32 bg-transparent text-gray-200 p-4 pl-0 resize-none focus:outline-none text-sm font-sans"
                  rows={1}
                />
                <button className="p-4 text-gray-500 hover:text-purple-400 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className={`m-2 p-3 rounded-xl flex items-center justify-center transition-all ${
                    !input.trim() || isTyping ? 'bg-[#111] text-gray-600' : 'bg-purple-600 text-white hover:bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.4)]'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
           </div>
        </div>

        {/* Right Sidebar: Context & Actions */}
        <div className="lg:col-span-4 flex flex-col space-y-6">
           
           {/* Active Context */}
           <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col group hover:border-gray-600 transition-colors duration-500">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-3 flex items-center">
               <Database className="w-4 h-4 mr-2 text-purple-400" />
               Active Context Window
             </h3>
             <div className="space-y-3">
                <div className="p-3 bg-[#0a0a0c] border border-gray-800 rounded-xl shadow-inner">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Patient Profile</div>
                   <div className="text-xs text-gray-300 font-mono">ID: PT-892A • 64yo Female • NSCLC Stage IV</div>
                </div>
                <div className="p-3 bg-[#0a0a0c] border border-gray-800 rounded-xl shadow-inner">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">Genomic Panel</div>
                   <div className="text-xs text-gray-300 font-mono">EGFR (Pending) • ALK (Neg) • ROS1 (Neg)</div>
                </div>
                <div className="p-3 bg-[#0a0a0c] border border-gray-800 rounded-xl shadow-inner">
                   <div className="text-[10px] font-bold uppercase tracking-widest text-orange-400 mb-1">Guidelines</div>
                   <div className="text-xs text-gray-300 font-mono">NCCN NSCLC v3.2023 Loaded</div>
                </div>
             </div>
           </div>

           {/* Quick Actions */}
           <div className="bg-[#050505] border border-gray-800 rounded-2xl p-6 shadow-2xl flex-1 flex flex-col group hover:border-gray-600 transition-colors duration-500">
             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-900 pb-3 flex items-center">
               <Zap className="w-4 h-4 mr-2 text-yellow-400" />
               Quick Actions
             </h3>
             <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl text-center transition-colors shadow-inner flex flex-col items-center justify-center">
                   <Share2 className="w-5 h-5 text-gray-400 mb-2" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Share Chat</span>
                </button>
                <button className="p-3 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl text-center transition-colors shadow-inner flex flex-col items-center justify-center">
                   <Download className="w-5 h-5 text-gray-400 mb-2" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Export PDF</span>
                </button>
                <button className="p-3 bg-[#0a0a0c] hover:bg-gray-900 border border-gray-800 rounded-xl text-center transition-colors shadow-inner flex flex-col items-center justify-center col-span-2">
                   <FileText className="w-5 h-5 text-gray-400 mb-2" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Draft Clinical Note</span>
                </button>
             </div>
           </div>

        </div>

      </div>
      
      {/* Global Animations */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 10px;
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
