import React from 'react';
import { Clock, Linkedin, Twitter, Mail, MapPin, ArrowRight, Send } from 'lucide-react';
import { ViewState } from '../types';

interface FooterProps {
  setView?: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  const handleNav = (view: ViewState) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (setView) {
      setView(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-tva-dark border-t border-tva-orange/20 pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tva-orange/50 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-tva-cream font-mono font-bold text-xl uppercase tracking-wider">
              <Clock className="text-tva-orange animate-pulse-slow" /> Time AI
            </div>
            <p className="text-tva-cream/60 text-sm font-sans leading-relaxed">
              Turning data into decisions—on time.
              <br/>
              Miami-based, globally deployed.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-tva-cream/40 hover:text-tva-orange transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-tva-cream/40 hover:text-tva-orange transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-tva-cream font-mono font-bold mb-4 uppercase text-sm tracking-widest text-glow">Solutions</h4>
            <ul className="space-y-2 text-sm text-tva-cream/60 font-mono">
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Forecasting <ArrowRight size={12} className="opacity-0 hover:opacity-100" /></a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Anomaly Detection</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Chatbots</a></li>
              <li><a href="#" onClick={handleNav('solutions')} className="hover:text-tva-orange transition-colors flex items-center gap-2 hover:translate-x-1 duration-300">Consulting</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-tva-cream font-mono font-bold mb-4 uppercase text-sm tracking-widest text-glow">Agency</h4>
            <ul className="space-y-2 text-sm text-tva-cream/60 font-mono">
              <li><a href="#" onClick={handleNav('about')} className="hover:text-tva-orange transition-colors">Archivists (About)</a></li>
              <li><a href="#" onClick={handleNav('intel')} className="hover:text-tva-orange transition-colors">Intel (Blog)</a></li>
              <li><a href="#" onClick={handleNav('about')} className="hover:text-tva-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-tva-orange transition-colors">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-tva-cream font-mono font-bold mb-4 uppercase text-sm tracking-widest text-glow">Temporal Updates</h4>
            <p className="text-xs text-tva-cream/50 mb-4 font-mono">Subscribe for briefing updates from the timeline.</p>
            <div className="flex flex-col gap-2">
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="agent@timeline.net" 
                        className="w-full bg-tva-panel border border-tva-cream/10 text-tva-cream text-xs p-3 pr-10 focus:border-tva-orange focus:outline-none font-mono"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-tva-orange hover:text-tva-cream transition-colors">
                        <Send size={14} />
                    </button>
                </div>
                <div className="text-[10px] text-tva-cream/30">
                    // Encrypted Transmission
                </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-tva-cream/10 pt-8 text-center text-tva-cream/30 text-xs font-mono flex flex-col md:flex-row justify-between items-center gap-4">
          <span>&copy; {new Date().getFullYear()} Time AI Solutions. All rights reserved.</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-tva-green rounded-full animate-pulse"></span>
            VARIANCE MONITORING ACTIVE
          </span>
        </div>
      </div>
    </footer>
  );
};