import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, RefreshCw, ChevronDown, BarChart3, Search, Calendar, Cpu, Loader2, TrendingUp, Zap, BrainCircuit, Activity, Database, Layers, FileText, AlertTriangle, Bot, Workflow, Target, Clock, ShieldCheck, Users, UserCog, Lock, Terminal } from 'lucide-react';
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
    { role: 'model', text: "Systems online. I am Mina, your Intelligence Architect. How can I optimize your workflow?" }
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
           { icon: <TrendingUp size={12} />, text: "Forecasting Accuracy?" },
           { icon: <BrainCircuit size={12} />, text: "Neural Architecture" },
           { icon: <Bot size={12} />, text: "Autonomous Agents" },
        ];
      case 'intel':
        return [
           { icon: <FileText size={12} />, text: "RAG Strategy" },
           { icon: <Search size={12} />, text: "Logistics Case Study" },
           { icon: <ShieldCheck size={12} />, text: "Security Protocols" },
        ];
      case 'about':
        return [
           { icon: <Target size={12} />, text: "Company Mission" },
           { icon: <Clock size={12} />, text: "Implementation Time" },
           { icon: <Users size={12} />, text: "Client References" },
        ];
      case 'contact':
        return [
           { icon: <Zap size={12} />, text: "Start Pilot" },
           { icon: <UserCog size={12} />, text: "Speak to Human" },
           { icon: <Calendar size={12} />, text: "Schedule Audit" },
        ];
      case 'home':
      default:
        return [
            { icon: <TrendingUp size={12} />, text: "Predict Revenue" },
            { icon: <Activity size={12} />, text: "Supply Chain Risk" },
            { icon: <FileText size={12} />, text: "Draft Report" },
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
            "ACCESSING_DATALAKE...", 
            "CALCULATING_VARIANCE...", 
            "OPTIMIZING_VECTORS...", 
            "GENERATING_INSIGHT...", 
        ];
        let i = 0;
        setLoadingText(texts[0]); // Reset immediately
        const interval = setInterval(() => {
            i = (i + 1) % texts.length;
            setLoadingText(texts[i]);
        }, 800);
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
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-none font-sans isolate">
      {/* Chat Window HUD */}
      <div className={`
        w-[calc(100vw-2rem)] md:w-[420px] 
        bg-white/95 backdrop-blur-xl 
        shadow-[0_0_50px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.05)] 
        rounded-2xl overflow-hidden pointer-events-auto flex flex-col 
        transition-all duration-500 ease-out-expo origin-bottom-right
        ${isOpen ? 'opacity-100 translate-y-0 scale-100 h-[650px] max-h-[85vh]' : 'opacity-0 translate-y-10 scale-95 h-0 invisible'}
      `}>
          
          {/* Header - Dark Tech Look */}
          <div className="bg-slate-950 p-0 shrink-0 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-tva-orange/10 to-blue-600/10"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>

            <div className="relative z-10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                     {/* Character Portal */}
                     <div className="relative w-12 h-12 shrink-0 group cursor-pointer" onClick={() => playSound('tick')}>
                        <div className="absolute inset-0 bg-gradient-to-tr from-tva-orange to-amber-500 rounded-full animate-spin-slow opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <div className="absolute inset-0.5 bg-slate-900 rounded-full flex items-center justify-center border border-white/10 overflow-hidden">
                             <MinaCharacter className="w-full h-full scale-125 translate-y-1" variant={assistantState} />
                        </div>
                        {/* Status Dot */}
                        <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-950 rounded-full ${assistantState !== 'idle' ? 'bg-amber-400 animate-pulse' : 'bg-green-500 shadow-[0_0_8px_#22c55e]'}`}></div>
                     </div>
                     
                     <div>
                        <h3 className="font-bold text-white text-base tracking-tight leading-none mb-1">Mina <span className="text-slate-500 font-normal">v2.4</span></h3>
                        <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 ${assistantState === 'idle' ? 'text-slate-400' : 'text-amber-400'}`}>
                                {assistantState === 'idle' ? (
                                    <>
                                        <Activity size={10} /> System Online
                                    </>
                                ) : (
                                    <>
                                        <Cpu size={10} className="animate-spin" /> Processing
                                    </>
                                )}
                            </span>
                        </div>
                     </div>
                </div>

                {/* Close Button */}
                <button 
                    onClick={toggleChat}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5"
                >
                    <ChevronDown size={18} />
                </button>
            </div>
            
            {/* Active Progress Line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10 overflow-hidden">
                 {assistantState !== 'idle' && (
                    <div className="absolute inset-0 bg-tva-orange w-1/2 animate-[shimmer_1s_infinite]"></div>
                 )}
            </div>
          </div>

          {/* Messages Area - Grid Background */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-slate-50 relative scroll-smooth">
             {/* Technical Grid Pattern */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
             
             {/* Security Badge */}
             <div className="flex justify-center my-2 relative z-10">
                 <div className="px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-200 rounded-full flex items-center gap-1.5">
                     <Lock size={10} className="text-slate-400" />
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encrypted Uplink</span>
                 </div>
             </div>
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10`}
              >
                {msg.role === 'model' && (
                    <div className="w-6 h-6 rounded-full bg-white border border-gray-200 p-1 mr-2 mt-1 shrink-0 shadow-sm flex items-center justify-center text-tva-orange">
                        <Sparkles size={12} />
                    </div>
                )}
                <div 
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed shadow-sm relative ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-tva-orange to-red-600 text-white rounded-br-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {/* Loading State: High-Tech Processing */}
                  {msg.isStreaming && !msg.text && (
                      <div className="flex flex-col gap-2 min-w-[140px] py-1">
                          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-tva-orange uppercase tracking-widest">
                              <Loader2 className="animate-spin" size={10} />
                              <span className="animate-pulse">{loadingText}</span>
                          </div>
                          
                          {/* Animated Matrix Bar */}
                          <div className="flex gap-0.5 h-1 items-center bg-gray-100 rounded-full overflow-hidden w-full">
                              <div className="h-full bg-tva-orange animate-[shimmer_1s_infinite] w-full origin-left transform scale-x-50"></div>
                          </div>
                      </div>
                  )}

                  {/* Message Content */}
                  {msg.text && (
                      <div className={msg.role === 'model' ? "markdown-prose" : ""}>
                          {msg.text}
                          {/* Enhanced Cursor */}
                          {msg.isStreaming && (
                              <span className="inline-block w-1.5 h-3.5 bg-tva-orange ml-1 align-middle animate-pulse"></span>
                          )}
                      </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Control Deck */}
          <div className="p-4 bg-white border-t border-gray-100 shrink-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-20">
             
             {/* Quick Actions (Chips) */}
             {messages.length < 4 && assistantState === 'idle' && (
                <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-fade-right">
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => handleSend(s.text)}
                            className="whitespace-nowrap px-3 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-bold uppercase tracking-wide rounded hover:border-tva-orange hover:text-tva-orange hover:bg-orange-50 transition-all flex-shrink-0 flex items-center gap-2 shadow-sm group"
                        >
                            <span className="text-slate-400 group-hover:text-tva-orange transition-colors">{s.icon}</span>
                            {s.text}
                        </button>
                    ))}
                </div>
             )}

            <div className="relative flex items-center gap-2">
              <div className="absolute left-3 text-gray-300">
                  <Terminal size={16} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Execute command..."
                disabled={assistantState !== 'idle'}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-tva-orange/20 focus:border-tva-orange transition-all disabled:opacity-50 font-medium placeholder:text-gray-400"
              />
              <button 
                onClick={() => handleSend()}
                disabled={assistantState !== 'idle' || !input.trim()}
                className={`
                    absolute right-2 p-2 rounded-lg transition-all transform duration-300
                    ${assistantState !== 'idle' || !input.trim() 
                        ? 'bg-gray-200 text-gray-400 scale-90' 
                        : 'bg-tva-orange text-white shadow-lg hover:scale-105 hover:bg-red-600'}
                `}
              >
                {assistantState !== 'idle' ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center mt-3 px-1">
                <span className="text-[9px] text-gray-300 font-bold uppercase tracking-widest">
                    Time AI // Neural Engine v3.0
                </span>
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_5px_#22c55e]"></span>
            </div>
          </div>
      </div>

      {/* Launcher Button */}
      <button
        onClick={toggleChat}
        className={`
            pointer-events-auto group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full shadow-[0_10px_30px_-10px_rgba(220,38,38,0.5)] transition-all duration-500 ease-out-expo
            ${isOpen ? 'bg-white text-slate-400 rotate-90 scale-90 ring-4 ring-gray-100' : 'bg-gradient-to-br from-tva-orange to-red-600 text-white hover:scale-110 hover:-translate-y-1 ring-4 ring-white/50'}
        `}
      >
        {isOpen ? (
          <X size={28} />
        ) : (
          <>
            <MessageSquare size={26} className="fill-current" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
          </>
        )}
      </button>
    </div>
  );
};