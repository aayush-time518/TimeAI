
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronDown, Linkedin, ExternalLink, Target, Zap, Activity, Sparkles } from 'lucide-react';
import { sendMessageToMina } from '../services/geminiService';
import { ChatMessage, ViewState } from '../types';
import { MinaCharacter } from './MinaCharacter';
import { playSound } from '../utils/sound';

interface MinaAssistantProps {
  currentView: ViewState;
}

const VIEW_SUGGESTIONS: Record<ViewState, string[]> = {
  home: ["Architectural ROI", "48h System Audit", "Agentic Case Studies"],
  solutions: ["Hardened RAG Pipelines", "Forecasting Specs", "LangGraph Orchestration", "PEFT Model Alignment"],
  demo: ["Sub-second AP Automation", "Signal Fusion Logic", "Contextual Drafting"],
  intel: ["NLP Technical Briefs", "LLM Security Patterns", "Retail Intelligence Study"],
  about: ["Our Miami HQ & Team", "Engineering Methodology", "Security Standards & SOC2"],
  contact: ["Audit My Infrastructure", "Technical Consultation", "Strategic Partnership"]
};

export const MinaAssistant: React.FC<MinaAssistantProps> = ({ currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I'm Mina, Strategy Lead at Time AI. I'm currently auditing some reasoning loops, but I have a moment to discuss your architecture. Where is the most friction in your stack?" }
  ]);
  const [input, setInput] = useState('');
  const [assistantState, setAssistantState] = useState<'idle' | 'talking'>('idle');
  const [latency, setLatency] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = VIEW_SUGGESTIONS[currentView] || VIEW_SUGGESTIONS.home;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, assistantState]);

  const toggleChat = () => {
    if (!isOpen) playSound('chime');
    setIsOpen(!isOpen);
  };

  const getLocalReply = (text: string): string | null => {
    const t = text.toLowerCase().trim();
    if (t === 'hi' || t === 'hello' || t === 'hey' || t === 'hlo') {
      return "Hello. It's a good time to talk shop. Are you looking into RAG optimization or perhaps autonomous workflow orchestration?";
    }
    if (t.includes('how are you')) {
      return "Focused. We're currently benchmarking some new LoRA adapters for a fintech deployment in Miami. The results are promising. How can I help you optimize your stack today?";
    }
    if (t.includes('who are you') || t.includes('your name') || t.includes('what are you')) {
      return "I'm Mina. I specialize in mapping unstructured business data to high-velocity AI pipelines. My focus is ensuring that every deployment is a hardened operational asset.";
    }
    if (t === 'thanks' || t === 'thank you') {
      return "Strategic precision is our goal. Let me know if you want to dive deeper into the technical specs of our agentic loops or forecasting models.";
    }
    return null;
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || assistantState !== 'idle') return;

    playSound('pop');
    setInput('');
    setAssistantState('talking');
    setLatency(null);
    
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    
    const localReply = getLocalReply(textToSend);
    if (localReply) {
      setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);
      await new Promise(r => setTimeout(r, 450));
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg) {
          lastMsg.text = localReply;
          lastMsg.isStreaming = false;
        }
        return newMsgs;
      });
      setLatency(142); 
      setAssistantState('idle');
      return;
    }

    const startTime = Date.now();
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    try {
      const stream = sendMessageToMina(textToSend);
      let fullResponse = '';

      for await (const chunk of stream) {
        if (chunk) {
          if (fullResponse === '') {
             setLatency(Date.now() - startTime);
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

    } catch (e) {
      setMessages(prev => {
         const newMsgs = [...prev];
         const lastMsg = newMsgs[newMsgs.length - 1];
         if (lastMsg.role === 'model') {
             lastMsg.text = "Inference session timeout. Please reach out to our technical team on LinkedIn for high-priority support: https://www.linkedin.com/company/time-ai/";
             lastMsg.isStreaming = false;
         }
         return newMsgs;
      });
    } finally {
      setAssistantState('idle');
    }
  };

  const MessageContent: React.FC<{ text: string }> = ({ text }) => {
    const hasLinkedIn = text.toLowerCase().includes('linkedin.com/company/time-ai');
    
    if (hasLinkedIn) {
        return (
            <div className="space-y-4">
                <p>{text.split('https://')[0]}</p>
                <a 
                    href="https://www.linkedin.com/company/time-ai/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-gray-800 transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Linkedin size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Human Support</div>
                            <div className="text-sm font-bold">Strategic Partnership</div>
                        </div>
                    </div>
                    <ExternalLink size={16} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
            </div>
        );
    }

    return <div>{text}</div>;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end pointer-events-none font-sans isolate">
      <div className={`
        w-[calc(100vw-2rem)] md:w-[380px] 
        bg-white/98 backdrop-blur-xl 
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)] 
        rounded-2xl overflow-hidden pointer-events-auto flex flex-col 
        transition-all duration-500 ease-out-expo origin-bottom-right
        ${isOpen ? 'opacity-100 translate-y-0 scale-100 h-[560px] max-h-[75vh]' : 'opacity-0 translate-y-10 scale-95 h-0 invisible'}
      `}>
          
          <div className="bg-white p-4 shrink-0 relative flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
                 <div className="relative w-10 h-10 shrink-0">
                    <div className="absolute inset-0 bg-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                         <MinaCharacter className="w-full h-full scale-125 translate-y-1" variant={assistantState} />
                    </div>
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 text-sm tracking-tight leading-none">Mina</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-700 animate-pulse"></div>
                        <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Architect Verified</span>
                    </div>
                 </div>
            </div>
            <div className="flex items-center gap-3">
                {latency && (
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-100 rounded-md animate-in fade-in duration-500">
                        <Zap size={10} className="text-gray-700" />
                        <span className="text-[8px] font-mono font-bold text-gray-500">{latency}ms</span>
                    </div>
                )}
                <button onClick={toggleChat} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <ChevronDown size={20} />
                </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-white relative">
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-enter-view duration-300`}
              >
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                    <div 
                        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-slate-900 text-white rounded-br-none shadow-sm' 
                            : 'bg-gray-100 text-gray-700 rounded-bl-none border border-gray-200/50'
                        }`}
                    >
                        {msg.isStreaming && !msg.text ? (
                            <div className="flex gap-1.5 py-1.5">
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            </div>
                        ) : (
                            <MessageContent text={msg.text} />
                        )}
                    </div>
                    {msg.role === 'model' && idx === messages.length - 1 && !msg.isStreaming && (
                        <div className="mt-1 flex items-center gap-1 text-[8px] font-mono text-gray-400 uppercase tracking-tighter ml-1">
                            <Activity size={8} /> Logic Synced
                        </div>
                    )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 bg-white shrink-0 border-t-2 border-gray-300">
            <div className="flex flex-wrap gap-2.5 mb-5">
                {suggestions.map((s, i) => (
                    <button
                        key={i}
                        onClick={() => handleSend(s)}
                        disabled={assistantState !== 'idle'}
                        className="px-4 py-2 bg-gray-50 border-2 border-gray-300 rounded-full text-[10px] font-black text-gray-700 hover:border-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all animate-in fade-in slide-in-from-bottom-2 duration-500 disabled:opacity-30 flex items-center gap-1.5 shadow-sm hover:shadow-md"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <Target size={11} className="text-gray-900" />
                        {s}
                    </button>
                ))}
            </div>

            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Consult Mina..."
                disabled={assistantState !== 'idle'}
                className="w-full bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-gray-700 focus:ring-2 focus:ring-gray-200 transition-all disabled:opacity-50 disabled:bg-gray-100 font-semibold placeholder:text-gray-500"
              />
              <button 
                onClick={() => handleSend()}
                disabled={assistantState !== 'idle' || !input.trim()}
                className="absolute right-2 p-2 text-gray-900 hover:text-gray-700 hover:bg-gray-100 rounded-lg disabled:opacity-0 transition-all transform hover:scale-110 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 text-center">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Deployment Engine: Gemini-3-Flash</p>
            </div>
          </div>
      </div>

      <button
        onClick={toggleChat}
        className={`
            pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform
            ${isOpen ? 'bg-white text-slate-400 scale-90 rotate-90' : 'bg-slate-950 text-white hover:scale-110 hover:shadow-tva-orange/20'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
      </button>
    </div>
  );
};
