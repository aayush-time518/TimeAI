
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ChevronDown, Linkedin, ExternalLink, Target } from 'lucide-react';
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
    { role: 'model', text: "Hi! I'm Mina. I help run the architecture side here. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [assistantState, setAssistantState] = useState<'idle' | 'talking'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || assistantState !== 'idle') return;

    playSound('pop');
    setInput('');
    setAssistantState('talking');
    
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    try {
      const stream = sendMessageToMina(textToSend);
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
             lastMsg.text = "Connection's acting up. Shoot us a message on LinkedIn: https://www.linkedin.com/company/time-ai/";
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
                    className="flex items-center justify-between gap-3 p-4 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-tva-orange transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Linkedin size={18} />
                        </div>
                        <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Human Support</div>
                            <div className="text-sm font-bold">Connect on LinkedIn</div>
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
        w-[calc(100vw-2rem)] md:w-[360px] 
        bg-white/98 backdrop-blur-xl 
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.05)] 
        rounded-2xl overflow-hidden pointer-events-auto flex flex-col 
        transition-all duration-500 ease-out-expo origin-bottom-right
        ${isOpen ? 'opacity-100 translate-y-0 scale-100 h-[520px] max-h-[70vh]' : 'opacity-0 translate-y-10 scale-95 h-0 invisible'}
      `}>
          
          <div className="bg-white p-4 shrink-0 relative flex items-center justify-between border-b border-gray-100">
            <div className="flex items-center gap-3">
                 <div className="relative w-9 h-9 shrink-0">
                    <div className="absolute inset-0 bg-slate-100 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                         <MinaCharacter className="w-full h-full scale-125 translate-y-1" variant={assistantState} />
                    </div>
                 </div>
                 <div>
                    <h3 className="font-bold text-gray-900 text-sm tracking-tight leading-none">Mina</h3>
                    <p className="text-[10px] text-gray-400 font-medium mt-1">Direct Chat</p>
                 </div>
            </div>
            <button onClick={toggleChat} className="text-gray-400 hover:text-gray-600 transition-colors">
                <ChevronDown size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white relative">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-200`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 text-white rounded-br-none shadow-sm' 
                      : 'bg-gray-100 text-gray-700 rounded-bl-none'
                  }`}
                >
                  {msg.isStreaming && !msg.text ? (
                      <div className="flex gap-1 py-1.5">
                          <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></span>
                          <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                          <span className="w-1 h-1 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      </div>
                  ) : (
                      <MessageContent text={msg.text} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-white shrink-0">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Mina..."
                disabled={assistantState !== 'idle'}
                className="w-full bg-gray-100 border-none text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-slate-300 transition-all disabled:opacity-50"
              />
              <button 
                onClick={() => handleSend()}
                disabled={assistantState !== 'idle' || !input.trim()}
                className="absolute right-2 p-2 text-slate-900 hover:text-tva-orange disabled:opacity-0 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
      </div>

      <button
        onClick={toggleChat}
        className={`
            pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300
            ${isOpen ? 'bg-white text-slate-400 scale-90' : 'bg-slate-950 text-white hover:scale-105'}
        `}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
      </button>
    </div>
  );
};
