import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, CircleDot } from 'lucide-react';
import { sendMessageToMina } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MinaCharacter } from './MinaCharacter';
import { playSound } from '../utils/sound';

export const MinaAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hey y'all! I'm Mina. Ready to prune those inefficiencies from your timeline?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    if (!isOpen) {
      playSound('chime');
    } else {
      playSound('tick');
    }
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    playSound('pop');
    const userMsg = input;
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);

    // Add placeholder for streaming response
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    try {
      const stream = sendMessageToMina(userMsg);
      let fullResponse = '';

      for await (const chunk of stream) {
        if (chunk) {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-tva-panel border-2 border-tva-orange shadow-[0_0_30px_rgba(234,88,12,0.3)] rounded-xl w-[calc(100vw-3rem)] md:w-96 mb-4 overflow-hidden pointer-events-auto flex flex-col h-[500px] max-h-[70vh] animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-tva-orange p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-tva-cream/90 p-1 rounded-full border-2 border-tva-dark w-10 h-10 overflow-hidden">
                <MinaCharacter className="w-full h-full" />
              </div>
              <div>
                <h3 className="font-mono font-bold text-tva-dark text-lg uppercase tracking-wider">Mina</h3>
                <p className="text-xs text-tva-dark font-mono font-bold">Time Concierge</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-tva-dark hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-tva-dark/95 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(245,158,11,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.2)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
              >
                <div 
                  className={`max-w-[85%] rounded-lg px-4 py-3 text-sm font-mono leading-relaxed border shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-tva-orange text-tva-dark border-tva-orange' 
                      : 'bg-tva-panel text-tva-cream border-tva-amber/30'
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-2 h-4 ml-1 align-middle bg-tva-amber animate-pulse"/>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-tva-panel border-t border-tva-orange/50">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about optimizing your timeline..."
                className="w-full bg-tva-dark text-tva-amber font-mono text-sm rounded-md pl-4 pr-12 py-3 border border-tva-orange/50 focus:outline-none focus:border-tva-amber focus:ring-1 focus:ring-tva-amber placeholder:text-tva-amber/30 transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-tva-orange hover:text-tva-amber transition-colors disabled:opacity-50"
              >
                {isLoading ? <Sparkles size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="pointer-events-auto group relative flex items-center justify-center w-16 h-16 bg-tva-panel hover:bg-tva-dark border-2 border-tva-orange rounded-full shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all duration-300 hover:scale-105"
      >
        {/* Animated Rings */}
        <div className="absolute inset-0 rounded-full border border-tva-amber/50 animate-[spin_8s_linear_infinite]" style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}></div>
        <div className="absolute inset-1 rounded-full border border-tva-orange/50 animate-[spin_12s_linear_infinite_reverse]" style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}></div>
        
        {isOpen ? (
          <X className="text-tva-orange w-8 h-8" />
        ) : (
          <div className="relative">
             <div className="w-10 h-10">
               <MinaCharacter />
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