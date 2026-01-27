import React, { useState, useEffect } from 'react';
import { Clock, Menu, X, Terminal, ChevronRight, Activity, Database, Users, LayoutDashboard, Shield, FileText } from 'lucide-react';
import { ViewState } from '../types';

interface HeaderProps {
  setView: (view: ViewState) => void;
  currentView: ViewState;
}

export const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const NavLink = ({ view, label }: { view: ViewState, label: string }) => (
    <button 
      onClick={() => {
        setView(view);
        setMobileMenuOpen(false);
        window.scrollTo(0,0);
      }}
      className={`font-mono text-sm tracking-wider uppercase transition-all px-4 py-2 border border-transparent hover:border-tva-orange/50 hover:bg-tva-orange/10 ${currentView === view ? 'text-tva-orange border-b-tva-orange' : 'text-tva-cream/70 hover:text-tva-amber'}`}
    >
      {label}
    </button>
  );

  const MobileNavLink = ({ view, title, desc, icon }: { view: ViewState, title: string, desc: string, icon: React.ReactNode }) => (
    <button 
        onClick={() => {
            setView(view);
            setMobileMenuOpen(false);
            window.scrollTo(0,0);
        }}
        className={`flex items-center gap-4 p-4 rounded-lg border transition-all w-full text-left group ${currentView === view ? 'bg-tva-orange/10 border-tva-orange' : 'bg-tva-panel/50 border-tva-cream/5 hover:border-tva-orange/50'}`}
    >
        <div className={`p-3 rounded-md ${currentView === view ? 'bg-tva-orange text-tva-dark' : 'bg-tva-dark text-tva-orange group-hover:bg-tva-orange group-hover:text-tva-dark'} transition-colors`}>
            {icon}
        </div>
        <div>
            <div className={`font-mono font-bold uppercase tracking-wider ${currentView === view ? 'text-tva-orange' : 'text-tva-cream group-hover:text-tva-orange'}`}>{title}</div>
            <div className="text-xs text-tva-cream/50 font-mono mt-1">{desc}</div>
        </div>
        <ChevronRight className={`ml-auto w-5 h-5 transition-transform ${currentView === view ? 'text-tva-orange' : 'text-tva-cream/20 group-hover:text-tva-orange group-hover:translate-x-1'}`} />
    </button>
  );

  return (
    <>
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-tva-dark/95 backdrop-blur-sm border-tva-orange/30 py-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)]' : 'bg-transparent border-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setView('home')} className="flex items-center gap-3 group relative z-50">
             <div className="relative w-10 h-10 bg-tva-orange rounded-full flex items-center justify-center border-2 border-tva-cream group-hover:scale-110 transition-transform">
               <Clock className="text-tva-dark w-6 h-6 animate-[spin_60s_linear_infinite]" />
             </div>
             <div className="flex flex-col items-start">
               <span className="text-tva-orange font-mono font-bold text-xl tracking-tighter leading-none text-glow">TIME AI</span>
               <span className="text-tva-cream/60 font-mono text-[10px] uppercase tracking-[0.2em] leading-none mt-1">Timeline Authority</span>
             </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavLink view="home" label="Dashboard" />
            <NavLink view="solutions" label="Protocols" />
            <NavLink view="intel" label="Intel" />
            <NavLink view="about" label="Archivists" />
            <button 
              onClick={() => setView('contact')}
              className="ml-4 px-6 py-2 bg-tva-orange text-tva-dark font-mono font-bold uppercase tracking-wide rounded-sm hover:bg-tva-amber transition-colors shadow-[0_0_10px_rgba(234,88,12,0.4)] flex items-center gap-2"
            >
              <Terminal size={14} /> Open Case
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-tva-orange p-2 border border-tva-orange/30 rounded hover:bg-tva-orange/10 transition-colors z-50" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Mega Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-tva-dark/95 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          <div className="flex-1 flex flex-col p-6 pt-24 overflow-y-auto">
              <div className="grid gap-4 max-w-md mx-auto w-full">
                  <div className="text-tva-cream/30 font-mono text-xs uppercase tracking-widest mb-2 px-1">// Navigation Mainframe</div>
                  
                  <MobileNavLink 
                    view="home" 
                    title="Dashboard" 
                    desc="Real-time Operational View" 
                    icon={<LayoutDashboard size={20} />} 
                  />
                  <MobileNavLink 
                    view="solutions" 
                    title="Protocols" 
                    desc="Available Services & Tools" 
                    icon={<Database size={20} />} 
                  />
                  <MobileNavLink 
                    view="intel" 
                    title="Intel Records" 
                    desc="Guides & Technical Briefs" 
                    icon={<FileText size={20} />} 
                  />
                  <MobileNavLink 
                    view="about" 
                    title="Archivists" 
                    desc="Personnel & Origin Story" 
                    icon={<Users size={20} />} 
                  />
                  
                  <div className="h-px bg-tva-cream/10 my-4"></div>
                  
                  <MobileNavLink 
                    view="contact" 
                    title="Open Case File" 
                    desc="Priority Signal to HQ" 
                    icon={<Terminal size={20} />} 
                  />
              </div>

              <div className="mt-auto pt-8 pb-8 max-w-md mx-auto w-full">
                  <div className="bg-tva-panel border border-tva-orange/20 p-4 rounded-lg flex items-center gap-4">
                      <div className="w-2 h-2 bg-tva-green rounded-full animate-pulse"></div>
                      <div className="font-mono text-xs text-tva-cream/60">
                          SYSTEM STATUS: <span className="text-tva-green">OPTIMIZED</span><br/>
                          SERVER TIME: {new Date().toLocaleTimeString()}
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  );
};