import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../constants';
import { generateTemporalInsightsStream } from '../services/aiService';
import { getRuleBasedResponse, getFollowUp } from '../utils/chatbotRules';
import { ChatMessage } from '../types';

const AIChatBot: React.FC = () => {
  // Check if AI API key is available
  const checkAIAvailability = () => {
    try {
      // Check if API key exists in environment
      const apiKey = import.meta.env.VITE_API_KEY || import.meta.env.API_KEY;
      return !!apiKey;
    } catch {
      return false;
    }
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Neural uplink established. Guardian unit synchronized. How may I assist with your temporal optimization and performance analytics?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useAI, setUseAI] = useState(checkAIAvailability()); // Try AI if available
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate typing effect for rule-based responses (makes it feel more AI-like)
  const typeMessage = (text: string, callback: (fullText: string) => void, onComplete?: () => void) => {
    let index = 0;
    const typeNextChar = () => {
      if (index < text.length) {
        callback(text.substring(0, index + 1));
        index++;
        // Variable typing speed for realism (slower for punctuation)
        const char = text[index - 1];
        const delay = char === '.' || char === '?' || char === '!' ? 80 : 
                     char === ',' || char === ';' ? 50 : 
                     char === ' ' ? 20 :
                     15 + Math.random() * 10;
        setTimeout(typeNextChar, delay);
      } else {
        if (onComplete) onComplete();
      }
    };
    typeNextChar();
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    let assistantMsgContent = '';
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    // Try AI first if enabled
    if (useAI) {
      try {
        const stream = await generateTemporalInsightsStream(userInput);
        let hasContent = false;
        
        for await (const chunk of stream) {
          const text = chunk.text;
          if (text) {
            hasContent = true;
            assistantMsgContent += text;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: assistantMsgContent };
              return updated;
            });
          }
        }
        
        // If AI responded successfully, we're done
        if (hasContent) {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        // AI failed, fall back to rule-based
        console.log('AI service unavailable, using rule-based fallback');
        setUseAI(false);
      }
    }

    // Fallback to rule-based responses
    const ruleResponse = getRuleBasedResponse(userInput);
    
    // Simulate typing for more realistic feel
    typeMessage(ruleResponse, (typedText) => {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: typedText };
        return updated;
      });
    }, () => {
      // After main response is typed, check for follow-up
      setIsLoading(false);
      const followUp = getFollowUp(userInput);
      if (followUp) {
        setTimeout(() => {
          setIsLoading(true);
          setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
          typeMessage(followUp, (typedText) => {
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { role: 'assistant', content: typedText };
              return updated;
            });
          }, () => {
            setIsLoading(false);
          });
        }, 500);
      }
    });
  };

  return (
    <div className="flex flex-col h-[400px] sm:h-[500px] lg:h-[600px] glass-card rounded-2xl sm:rounded-[32px] overflow-hidden shadow-xl border-brand-border relative">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-chrono rounded-lg flex items-center justify-center text-white text-sm">
            <Icons.Brain />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm tracking-tight uppercase">Navigator</h4>
            <div className="flex items-center gap-2">
              <span className={`text-[7px] font-bold uppercase tracking-widest ${
                useAI ? 'text-emerald-500' : 'text-chrono'
              }`}>
                {useAI ? 'AI Active' : 'Rule-Based'}
              </span>
              <div className={`w-1 h-1 rounded-full ${useAI ? 'bg-emerald-500' : 'bg-chrono'} animate-pulse`} />
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-chrono text-white shadow-lg' 
              : 'bg-white/5 text-white/70 border border-white/5'
            }`}>
              {msg.content || <span className="inline-block w-1.5 h-3 bg-chrono animate-pulse" />}
            </div>
          </div>
        ))}
      </div>

      <div className="p-5 bg-white/[0.01] border-t border-white/5">
        <div className="relative">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Inquire with Navigator..."
            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3.5 text-xs focus:outline-none focus:border-chrono transition-all pr-12 placeholder:text-white/20"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
              isLoading ? 'opacity-20 cursor-not-allowed' : 'bg-chrono text-white hover:scale-105'
            }`}
          >
            <Icons.ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;