
import React, { useState } from 'react';
import { Clock, Linkedin, Twitter, Mail, MapPin, ArrowRight, Send, Terminal, AlertTriangle, Timer } from 'lucide-react';
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
    <footer className="bg-white pt-16 pb-8 relative overflow-hidden">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-tva-orange/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-tva-cream font-bold text-xl">
              <div className="p-1.5 bg-tva-orange rounded-lg shadow-glow-blue">
                <Clock className="text-white w-5 h-5 animate-spin-slow" /> 
              </div>
              Time AI
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Turning data into decisions—on time.
              <br/>
              Miami-based, globally deployed.
            </p>
            <div className="flex gap-4 items-center">
              <a 
                href="https://www.linkedin.com/company/time-ai/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-tva-orange transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <div className="relative">
                <button 
                  onClick={handleTwitterToggle}
                  className={`transition-colors duration-300 ${twitterComingSoon ? 'text-amber-500' : 'text-gray-400 hover:text-gray-600'}`}
                  title="Twitter Feed"
                >
                  <Twitter size={20} />
                </button>
                {twitterComingSoon && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-amber-500 text-white text-[8px] font-black uppercase tracking-widest rounded whitespace-nowrap animate-in fade-in zoom-in duration-200">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-tva-cream font-bold mb-4 text-sm uppercase tracking-wide">Our Services</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Forecasting <ArrowRight size={12} className="opacity-0 hover:opacity-100" /></a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Anomaly Detection</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">AI Chatbots</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-tva-cream font-bold mb-4 text-sm uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" onClick={handleNav('about')} className="hover:text-tva-orange transition-colors">About Us</a></li>
              <li><a href="#" onClick={handleNav('intel')} className="hover:text-tva-orange transition-colors">Blog</a></li>
              <li><a href="#" onClick={handleNav('about')} className="hover:text-tva-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-tva-orange transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-tva-cream font-bold mb-4 text-sm uppercase tracking-wide">Newsletter</h4>
            <p className="text-xs text-gray-500 mb-4">Subscribe for critical intelligence updates.</p>
            <div className="flex flex-col gap-2">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Terminal size={14} className="text-tva-orange" />
                    </div>
                    <input 
                        type="email" 
                        placeholder={newsletterStatus === 'coming-soon' ? "COMING SOON..." : "ENTER_EMAIL..."}
                        disabled={newsletterStatus === 'coming-soon'}
                        className="w-full bg-gray-50 border border-gray-200 text-tva-cream text-sm py-3 pl-10 pr-10 rounded-lg focus:border-tva-orange focus:ring-1 focus:ring-tva-orange focus:outline-none transition-all font-mono placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-400"
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
        </div>
        
        <div className="border-t border-gray-100 pt-8 text-center text-gray-400 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono opacity-70">&copy; 2026 Time AI Solutions.</span>
          <span className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-bold uppercase text-green-600 tracking-wider">Systems Operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
