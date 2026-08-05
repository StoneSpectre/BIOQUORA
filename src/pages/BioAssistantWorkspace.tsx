import React, { useState, useRef, useEffect } from 'react';
import { Bot, User, Send, Paperclip, Mic, Sparkles, Loader2, Stethoscope, Activity, FileText } from 'lucide-react';

const BioAssistantWorkspace = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello Dr. Smith. I am BioAssistant, your clinical AI copilot. How can I assist you with your research or patient diagnostics today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      setMessages([...newMessages, { 
        role: 'assistant', 
        content: "Based on the latest NCCN guidelines and federated clinical data, I recommend reviewing the patient's EGFR mutation status. If an Exon 19 deletion is present, Erlotinib is highly indicated. I have generated a preliminary treatment plan for your review in Stage 14 (BioWorkflow)." 
      }]);
      setIsTyping(false);
    }, 2000);
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
    <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col font-sans">
      
      {/* Header */}
      <header className="flex justify-between items-center bg-[#1e293b] p-4 border-b border-slate-700 shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center mr-3 shadow-lg">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 flex items-center">
              BioAssistant 
              <span className="ml-2 px-2 py-0.5 text-[10px] bg-blue-900/50 text-blue-300 border border-blue-700/50 rounded-full">v2.0</span>
            </h1>
            <p className="text-xs text-slate-400">Stage 10: Conversational Medical Intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
           <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700">
             <Activity className="w-4 h-4 text-emerald-400" />
           </button>
           <button className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors border border-slate-700">
             <Stethoscope className="w-4 h-4 text-slate-300" />
           </button>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-900 custom-scrollbar">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[80%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-md ${
                msg.role === 'user' ? 'bg-slate-700 ml-3' : 'bg-gradient-to-br from-blue-600 to-indigo-700 mr-3'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-slate-300" /> : <Sparkles className="w-5 h-5 text-white" />}
              </div>
              
              {/* Message Bubble */}
              <div className={`p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-slate-800 border border-slate-700 text-slate-200 rounded-tl-none'
              }`}>
                <p className="leading-relaxed text-sm">{msg.content}</p>
                {msg.role === 'assistant' && index > 0 && (
                   <div className="mt-3 flex space-x-2">
                     <button className="text-[10px] px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors">View Citations</button>
                     <button className="text-[10px] px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-300 transition-colors">Export to EHR</button>
                   </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex flex-row max-w-[80%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 mr-3 flex items-center justify-center shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="p-4 bg-slate-800 border border-slate-700 rounded-2xl rounded-tl-none flex items-center space-x-2 w-20 shadow-sm">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-[#1e293b] border-t border-slate-700 p-4">
        <div className="max-w-4xl mx-auto">
          
          {/* Suggested Prompts */}
          {!isTyping && messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => handleSuggestion("Analyze recent literature on KRAS inhibitors.")} className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1.5 rounded-full text-slate-300 transition-colors flex items-center">
                <FileText className="w-3 h-3 mr-1" /> Analyze KRAS literature
              </button>
              <button onClick={() => handleSuggestion("Cross-check this patient's symptoms against rare diseases.")} className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-600 px-3 py-1.5 rounded-full text-slate-300 transition-colors flex items-center">
                <Activity className="w-3 h-3 mr-1" /> Check rare diseases
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="relative flex items-end bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-inner">
            <button className="p-3 text-slate-400 hover:text-blue-400 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask BioAssistant a clinical question..."
              className="flex-1 max-h-32 bg-transparent text-slate-200 p-3 resize-none focus:outline-none text-sm leading-relaxed"
              rows={1}
            />
            <button className="p-3 text-slate-400 hover:text-blue-400 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className={`m-2 p-2 rounded-xl flex items-center justify-center transition-colors ${
                !input.trim() || isTyping ? 'bg-slate-800 text-slate-500' : 'bg-blue-600 text-white hover:bg-blue-500 shadow-md'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2 text-[10px] text-slate-500">
            BioAssistant can make mistakes. Always verify clinical recommendations with Stage 9 (BioValidator).
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #334155;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default BioAssistantWorkspace;
