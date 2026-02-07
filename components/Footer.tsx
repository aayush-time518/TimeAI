
import React, { useState } from 'react';
import { Clock, Linkedin, Twitter, Mail, MapPin, ArrowRight, Send, Terminal, AlertTriangle, Timer, ShieldCheck, Globe, Cpu } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'coming-soon'>('idle');
  const [twitterComingSoon, setTwitterComingSoon] = useState(false);

  const handleNav = (view: ViewState) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (setView) {
      setView(view);
      window.scrollTo(0, 0);
    }
  };

  const handleSubscribe = () => {
      setNewsletterStatus('coming-soon');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
  };

  const handleTwitterToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      setTwitterComingSoon(true);
      setTimeout(() => setTwitterComingSoon(false), 2000);
  };

  return (
    <footer className="bg-white pt-24 pb-12 relative overflow-hidden border-t border-gray-100">
      {/* Visual background accents */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-8">
            <div className="flex items-center gap-3 text-gray-900 font-bold text-2xl">
              <div className="p-2 bg-tva-orange rounded-xl shadow-glow-amber">
                <Clock className="text-white w-6 h-6 animate-spin-slow" /> 
              </div>
              Time AI
            </div>
            <p className="text-gray-500 text-base leading-relaxed max-w-xs font-light">
              Transforming raw enterprise data into operational velocity through specialized NLP and autonomous architectures.
            </p>
            <div className="flex gap-3 items-center">
              <a 
                href="https://www.linkedin.com/company/time-ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-tva-orange hover:bg-white hover:shadow-lg transition-all"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <div className="relative">
                <button 
                  onClick={handleTwitterToggle}
                  className={`p-3 bg-gray-50 rounded-xl transition-all ${twitterComingSoon ? 'text-amber-500 bg-white shadow-lg' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Twitter Feed"
                >
                  <Twitter size={20} />
                </button>
                {twitterComingSoon && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-2 py-1 bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest rounded whitespace-nowrap animate-in fade-in zoom-in duration-200">
                    Protocol Pending
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-4 text-sm text-gray-500 font-medium">
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors">Forecasting</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors">Anomaly Engine</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors">RAG Chatbots</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors">ML Fine-Tuning</a></li>
            </ul>
          </div>

          {/* Contact Protocol */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em]">Connect</h4>
            <ul className="space-y-4 text-sm">
              <li>
                  <a href="mailto:admin@time-ai.net" className="flex flex-col gap-1 group">
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Primary Email</span>
                      <span className="text-gray-900 font-mono font-bold group-hover:text-tva-orange transition-colors">admin@time-ai.net</span>
                  </a>
              </li>
              <li>
                  <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">HQ Location</span>
                      <span className="text-gray-900 font-bold flex items-center gap-2"><MapPin size={12} className="text-tva-orange" /> Miami, Florida</span>
                  </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-3 space-y-6">
            <h4 className="text-gray-900 font-black text-xs uppercase tracking-[0.2em]">Intelligence</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Subscribe to receive technical whitepapers and deployment briefs.</p>
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Terminal size={14} className="text-tva-orange" />
                </div>
                <input 
                    type="email" 
                    placeholder={newsletterStatus === 'coming-soon' ? "SYSTEMS_PENDING..." : "ENTER_EMAIL..."}
                    disabled={newsletterStatus === 'coming-soon'}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs py-3.5 pl-10 pr-10 rounded-xl focus:border-tva-orange focus:ring-1 focus:ring-tva-orange focus:outline-none transition-all font-mono placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
                />
                <button 
                    onClick={handleSubscribe}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-tva-orange hover:scale-110 transition-all"
                >
                    {newsletterStatus === 'coming-soon' ? <AlertTriangle size={16} className="text-amber-500" /> : <Send size={16} />}
                </button>
            </div>
          </div>
        </div>
        
        {/* Bottom Technical Bar */}
        <div className="border-t border-gray-100 pt-12 flex flex-col lg:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-8 opacity-40">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                  <ShieldCheck size={14} /> SOC2_Type_II
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                  <Globe size={14} /> Edge_Deployed
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
                  <Cpu size={14} /> H100_Cluster_Sync
              </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">&copy; 2026 Time AI Solutions // admin@time-ai.net</span>
            <div className="flex items-center gap-2 px-4 py-1.5 bg-green-50 rounded-full border border-green-100 shadow-sm">
                <div className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-[9px] font-black uppercase text-green-700 tracking-widest">Protocol_Active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
