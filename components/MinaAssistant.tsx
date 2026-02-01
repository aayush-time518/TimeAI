import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, BarChart3, Search, Calendar, Cpu, Loader2, TrendingUp, Zap, BrainCircuit, Activity, Database, Layers, FileText, AlertTriangle, Bot, Workflow, Target, Clock, ShieldCheck, Users, UserCog } from 'lucide-react';
import { sendMessageToMina } from '../services/geminiService';
import { ChatMessage, ViewState } from '../types';
import { MinaCharacter } from './MinaCharacter';
import { playSound } from '../utils/sound';

interface MinaAssistantProps {
  currentView: ViewState;
}

export const MinaAssistant: React.FC<MinaAssistantProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello! I'm Mina, your Intelligence Architect. How can I help optimize your business today?" }
  ]);
  const [input, setInput] = useState('');
  const [assistantState, setAssistantState] = useState<'idle' | 'thinking' | 'talking'>('idle');
  const [loadingText, setLoadingText] = useState("Initializing...");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Context-aware suggestions based on currentView
  const getSuggestions = (view: ViewState) => {
    switch (view) {
      case 'solutions':
        return [
           { icon: <TrendingUp size={14} />, text: "Forecasting Capabilities?" },
           { icon: <BrainCircuit size={14} />, text: "Explain Neural Arch" },
           { icon: <Bot size={14} />, text: "How do Agents work?" },
           { icon: <Workflow size={14} />, text: "Data Pipeline Specs" }
        ];
      case 'intel':
        return [
           { icon: <FileText size={14} />, text: "Summarize RAG Strategy" },
           { icon: <Search size={14} />, text: "Find Logistics Case Studies" },
           { icon: <Cpu size={14} />, text: "Latest Engineering Reports" },
           { icon: <Layers size={14} />, text: "Explain 'Active' UI" }
        ];
      case 'about':
        return [
           { icon: <Target size={14} />, text: "What is your Mission?" },
           { icon: <Clock size={14} />, text: "Implementation Timeline" },
           { icon: <ShieldCheck size={14} />, text: "Security Protocols" },
           { icon: <Users size={14} />, text: "Client Success Stories" }
        ];
      case 'contact':
        return [
           { icon: <Zap size={14} />, text: "Start a Pilot Program" },
           { icon: <UserCog size={14} />, text: "Speak to an Architect" },
           { icon: <Calendar size={14} />, text: "Schedule Audit" },
           { icon: <MessageSquare size={14} />, text: "Support Channels" }
        ];
      case 'home':
      default:
        return [
            { icon: <TrendingUp size={14} />, text: "Predict Q4 Revenue Drift" },
            { icon: <Activity size={14} />, text: "Analyze Supply Chain Latency" },
            { icon: <FileText size={14} />, text: "Draft Risk Assessment" },
            { icon: <Zap size={14} />, text: "Explain Recent Anomalies" }
        ];
    }
  };

  const suggestions = getSuggestions(currentView);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, assistantState]);

  // Cycle loading text for "thinking" state
  useEffect(() => {
    if (assistantState === 'thinking') {
        const texts = [
            "Ingesting Data Streams...", 
            "Aligning Temporal Vectors...", 
            "Calculating Variance...", 
            "Accessing Neural Weights...", 
            "Optimizing Tokens..."
        ];
        let i = 0;
        setLoadingText(texts[0]); // Reset immediately
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setLoadingText(texts[i]);
        }, 1200);
        return () => clearInterval(interval);
    }
  }, [assistantState]);

  const toggleChat = () => {
    if (!isOpen) playSound('chime');
    setIsOpen(!isOpen);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || assistantState !== 'idle') return;

    playSound('pop');
    setInput('');
    setAssistantState('thinking');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    
    // Add placeholder for model response
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    try {
      const stream = sendMessageToMina(textToSend);
      let fullResponse = '';
      let hasStartedTalking = false;

      for await (const chunk of stream) {
        if (chunk) {
          if (!hasStartedTalking) {
              setAssistantState('talking');
              hasStartedTalking = true;
          }
          fullResponse += chunk;
          setMessages(prev => {
            const newMsgs = [...prev];
            const lastMsg = newMsgs[newMsgs.length - 1];
            if (lastMsg.role === 'model' && lastMsg.isStreaming) {
              lastMsg.text = fullResponse;
            }
            return newMsgs;
          });
        }
      }
      
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg) lastMsg.isStreaming = false;
        return newMsgs;
      });
      playSound('chime');

    } catch (e) {
      setMessages(prev => {
         const newMsgs = [...prev];
         const lastMsg = newMsgs[newMsgs.length - 1];
         if (lastMsg.role === 'model') {
             lastMsg.text = "Connection interrupted. Please try again.";
             lastMsg.isStreaming = false;
         }
         return newMsgs;
      });
    } finally {
      setAssistantState('idle');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none font-sans">
      {/* Chat Window */}
      <div className={`
        bg-white shadow-2xl rounded-2xl w-[calc(100vw-2rem)] md:w-[400px] mb-4 overflow-hidden pointer-events-auto flex flex-col 
        transition-all duration-700 ease-out-expo origin-bottom-right border border-gray-100
        ${isOpen ? 'scale-100 opacity-100 translate-y-0 h-[650px] max-h-[85vh]' : 'scale-90 opacity-0 translate-y-10 h-0 invisible'}
      `}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-tva-orange to-indigo-900 p-4 flex items-center justify-between shrink-0 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4=')] opacity-20"></div>
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="relative">
                  <div className="bg-white/95 backdrop-blur-sm p-1 rounded-full w-12 h-12 overflow-hidden shadow-lg border-2 border-white/20">
                    <MinaCharacter className="w-full h-full" variant={assistantState} />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full flex items-center justify-center ${assistantState !== 'idle' ? 'bg-amber-400' : 'bg-green-400'}`}>
                    {assistantState !== 'idle' && <div className="w-2 h-2 bg-white/50 rounded-full animate-ping" />}
                  </div>
              </div>
              <div>
                <h3 className="font-bold text-white text-lg leading-tight">Mina</h3>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors duration-300 ${assistantState === 'idle' ? 'bg-white/10 text-white/90' : 'bg-amber-400/20 text-amber-300'}`}>
                        {assistantState === 'idle' ? 'Online' : (assistantState === 'thinking' ? 'Processing' : 'Transmitting')}
                    </span>
                    <span className="text-blue-100 text-xs font-medium">v2.4</span>
                </div>
              </div>
            </div>
            <button onClick={toggleChat} className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-lg relative z-10">
              <ChevronDown size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gray-50/50 scroll-smooth relative">
            <div className="text-center text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em] my-4 opacity-50">Secure Uplink Established</div>
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out`}
              >
                {msg.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-200 p-1 mr-3 mt-1 shrink-0 shadow-sm flex items-center justify-center">
                        <Sparkles size={14} className="text-tva-orange" />
                    </div>
                )}
                <div 
                  className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm relative ${
                    msg.role === 'user' 
                      ? 'bg-tva-orange text-white rounded-br-sm' 
                      : 'bg-white text-gray-700 border border-gray-200 rounded-bl-sm'
                  }`}
                >
                  {/* Loading State: High-Tech Processing */}
                  {msg.isStreaming && !msg.text && (
                      <div className="flex flex-col gap-2 min-w-[160px] py-1">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-tva-orange uppercase tracking-widest">
                              <Loader2 className="animate-spin" size={10} />
                              <span className="animate-pulse">{loadingText}</span>
                          </div>
                          
                          {/* Animated Matrix Bar */}
                          <div className="flex gap-0.5 h-3 items-center">
                              {[...Array(12)].map((_, i) => (
                                  <div 
                                    key={i}
                                    className="w-1 bg-tva-orange rounded-full animate-pulse"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        animationDelay: `${i * 0.05}s`,
                                        opacity: 0.4
                                    }}
                                  ></div>
                              ))}
                          </div>
                      </div>
                  )}

                  {/* Message Content */}
                  {msg.text && (
                      <div className={msg.role === 'model' ? "markdown-prose" : ""}>
                          {msg.text}
                          {/* Enhanced Cursor */}
                          {msg.isStreaming && (
                              <span className="inline-block w-2 h-4 bg-tva-orange ml-1 align-middle animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.8)]"></span>
                          )}
                      </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)] z-10">
             {/* Suggestions */}
             {messages.length < 3 && (
                <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar mask-fade-right">
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => handleSend(s.text)}
                            disabled={assistantState !== 'idle'}
                            className="whitespace-nowrap px-3 py-2 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:border-tva-orange hover:text-tva-orange hover:bg-blue-50 transition-all flex-shrink-0 flex items-center gap-2 shadow-sm group"
                        >
                            <span className="text-gray-400 group-hover:text-tva-orange transition-colors">{s.icon}</span>
                            {s.text}
                        </button>
                    ))}
                </div>
             )}

            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask Mina about your data..."
                disabled={assistantState !== 'idle'}
                className="w-full bg-gray-50 text-gray-800 text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-tva-orange/50 focus:bg-white transition-all disabled:opacity-50 font-medium placeholder:text-gray-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={assistantState !== 'idle' || !input.trim()}
                className="absolute right-2 p-2 bg-tva-orange text-white rounded-lg hover:bg-blue-700 hover:shadow-lg transition-all disabled:opacity-50 disabled:bg-gray-200 disabled:shadow-none transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {assistantState !== 'idle' ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
            
            <div className="text-center mt-2">
                <span className="text-[10px] text-gray-300 font-medium">Powered by Time AI Neural Engine</span>
            </div>
          </div>
      </div>

      {/* Launcher Button */}
      <button
        onClick={toggleChat}
        className={`
            pointer-events-auto group relative flex items-center justify-center w-16 h-16 rounded-full shadow-2xl transition-all duration-500 ease-out-expo
            ${isOpen ? 'bg-white text-gray-400 rotate-90 scale-90' : 'bg-tva-orange text-white hover:scale-110 hover:bg-blue-600 hover:shadow-glow-blue'}
        `}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <>
            <MessageSquare size={28} className="fill-current" />
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-tva-orange"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};