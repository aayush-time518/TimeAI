import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, CircleDot, RefreshCw } from 'lucide-react';
import { sendMessageToMina } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MinaCharacter } from './MinaCharacter';
import { playSound } from '../utils/sound';

export const MinaAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Greetings! I'm monitoring your operational timeline. How can I assist with variance reduction today?" }
  ]);
  const [input, setInput] = useState('');
  const [assistantState, setAssistantState] = useState<'idle' | 'thinking' | 'talking'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Business-focused suggestions
  const suggestions = [
    "Forecast Q3 Revenue",
    "Analyze Supply Chain Lag",
    "Detect Anomalies",
    "Deploy New Agent"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, assistantState]);

  const toggleChat = () => {
    if (!isOpen) {
      playSound('chime');
    } else {
      playSound('tick');
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || assistantState !== 'idle') return;

    playSound('pop');
    setInput('');
    setAssistantState('thinking');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);

    // Add placeholder for streaming response
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
          // Play subtle ticks during generation (throttled)
          if (Math.random() > 0.8) playSound('tick');
        }
      }
      
      // Finalize message
      setMessages(prev => {
        const newMsgs = [...prev];
        const lastMsg = newMsgs[newMsgs.length - 1];
        if (lastMsg) lastMsg.isStreaming = false;
        return newMsgs;
      });
      playSound('chime');

    } catch (e) {
      console.error(e);
      setMessages(prev => {
         const newMsgs = [...prev];
         const lastMsg = newMsgs[newMsgs.length - 1];
         if (lastMsg.role === 'model') {
             lastMsg.text = "Signal lost. Temporal interference detected. Please retry.";
             lastMsg.isStreaming = false;
         }
         return newMsgs;
      });
    } finally {
      setAssistantState('idle');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-tva-panel border-2 border-tva-orange shadow-[0_0_30px_rgba(234,88,12,0.3)] rounded-xl w-[calc(100vw-3rem)] md:w-96 mb-4 overflow-hidden pointer-events-auto flex flex-col h-[500px] max-h-[70vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-tva-orange p-3 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-tva-dark/10 bg-[size:10px_10px] opacity-20"></div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="bg-tva-cream/90 p-1 rounded-full border-2 border-tva-dark w-12 h-12 overflow-hidden flex items-center justify-center">
                <MinaCharacter className="w-full h-full" variant={assistantState} />
              </div>
              <div>
                <h3 className="font-mono font-bold text-tva-dark text-lg uppercase tracking-wider leading-none">Mina</h3>
                <div className="flex items-center gap-1 mt-1">
                   <span className={`w-1.5 h-1.5 rounded-full ${assistantState !== 'idle' ? 'bg-tva-dark animate-ping' : 'bg-green-700'}`}></span>
                   <p className="text-[10px] text-tva-dark/80 font-mono font-bold uppercase">
                     {assistantState === 'thinking' ? 'Processing...' : assistantState === 'talking' ? 'Transmitting...' : 'Online'}
                   </p>
                </div>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-tva-dark hover:text-white transition-colors relative z-10"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-tva-dark/95 relative scroll-smooth">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(245,158,11,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.2)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div 
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm font-mono leading-relaxed border shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-tva-orange text-tva-dark border-tva-orange' 
                      : 'bg-tva-panel text-tva-cream border-tva-amber/30'
                  }`}
                >
                  {/* Empty loading state for model */}
                  {msg.role === 'model' && msg.isStreaming && !msg.text && (
                      <div className="flex gap-1 items-center h-5">
                          <span className="w-1 h-1 bg-tva-orange rounded-full animate-bounce delay-0"></span>
                          <span className="w-1 h-1 bg-tva-orange rounded-full animate-bounce delay-150"></span>
                          <span className="w-1 h-1 bg-tva-orange rounded-full animate-bounce delay-300"></span>
                      </div>
                  )}
                  
                  {msg.text}
                  
                  {/* Cursor for streaming */}
                  {msg.isStreaming && msg.text && (
                      <span className="inline-block w-2 h-4 ml-1 align-middle bg-tva-orange animate-pulse shadow-[0_0_5px_#ea580c]"/>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-tva-panel border-t border-tva-orange/50">
             {/* Quick Suggestions */}
             <div className="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar mask-gradient-right">
                {suggestions.map((s, i) => (
                    <button 
                        key={i}
                        onClick={() => handleSend(s)}
                        disabled={assistantState !== 'idle'}
                        className="whitespace-nowrap px-3 py-1.5 bg-tva-dark border border-tva-orange/30 text-tva-orange/80 text-[10px] font-mono rounded-sm hover:bg-tva-orange hover:text-tva-dark hover:border-tva-orange transition-all flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
                    >
                        {s}
                    </button>
                ))}
             </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-tva-orange/5 rounded-md blur-sm group-focus-within:bg-tva-orange/10 transition-colors"></div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={assistantState === 'thinking' ? "Processing request..." : assistantState === 'talking' ? "Receiving transmission..." : "Query the timeline..."}
                disabled={assistantState !== 'idle'}
                className="w-full bg-tva-dark relative text-tva-amber font-mono text-sm rounded-md pl-4 pr-12 py-3 border border-tva-orange/30 focus:outline-none focus:border-tva-orange focus:ring-1 focus:ring-tva-orange placeholder:text-tva-amber/20 transition-all disabled:opacity-50 disabled:cursor-wait"
              />
              <button 
                onClick={() => handleSend()}
                disabled={assistantState !== 'idle' || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-tva-orange hover:text-tva-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {assistantState !== 'idle' ? <RefreshCw size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
            
            <div className="flex justify-between mt-2 px-1">
                <span className="text-[9px] text-tva-cream/20 font-mono uppercase">SECURE CHANNEL // ENCRYPTED</span>
                <span className="text-[9px] text-tva-cream/20 font-mono uppercase">V.2.04</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 bg-tva-panel hover:bg-tva-dark border-2 border-tva-orange rounded-full shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
      >
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border border-tva-amber/50 animate-[spin_8s_linear_infinite]" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}></div>
        <div className="absolute inset-1 rounded-full border border-tva-orange/50 animate-[spin_12s_linear_infinite_reverse]" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}></div>
        
        {isOpen ? (
          <X className="text-tva-orange w-8 h-8" />
        ) : (
          <div className="relative">
             <div className="w-10 h-10 transition-transform duration-300 group-hover:scale-110">
               <MinaCharacter variant="idle" />
             </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tva-amber opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-tva-amber"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};
