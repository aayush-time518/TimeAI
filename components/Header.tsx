import React, { useState, useEffect } from 'react';
import { Clock, Menu, X, Terminal, ChevronRight, LayoutDashboard, Database, Users, FileText, MessageSquare, Play } from 'lucide-react';
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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleDemoClick = () => {
      setView('home');
      setMobileMenuOpen(false);
      setTimeout(() => {
          const el = document.getElementById('live-demos');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
  };

  const NavLink = ({ view, label, onClick }: { view?: ViewState, label: string, onClick?: () => void }) => (
    <button 
      onClick={() => {
        if (onClick) {
            onClick();
            return;
        }
        if (view) {
            setView(view);
            setMobileMenuOpen(false);
            window.scrollTo(0,0);
        }
      }}
      className={`
        relative font-sans font-medium text-sm tracking-wide transition-all duration-700 ease-luxury px-4 py-2 rounded-lg 
        ${view && currentView === view 
            ? 'text-tva-orange bg-tva-orange/5 font-bold' 
            : 'text-gray-500 hover:text-tva-orange hover:bg-gray-50'}
      `}
    >
      {label}
      {view && currentView === view && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-tva-orange rounded-full"></span>
      )}
    </button>
  );

  const MobileNavLink = ({ view, title, desc, icon, onClick }: { view?: ViewState, title: string, desc: string, icon: React.ReactNode, onClick?: () => void }) => (
    <button 
        onClick={() => {
            if (onClick) {
                onClick();
                return;
            }
            if (view) {
                setView(view);
                setMobileMenuOpen(false);
                window.scrollTo(0,0);
            }
        }}
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 w-full text-left group active:scale-95 ${view && currentView === view ? 'bg-tva-orange/10 border-tva-orange' : 'bg-white border-gray-100 hover:border-tva-orange/30 shadow-sm'}`}
    >
        <div className={`p-3 rounded-lg ${view && currentView === view ? 'bg-tva-orange text-white' : 'bg-gray-50 text-tva-orange group-hover:bg-tva-orange group-hover:text-white'} transition-colors duration-300`}>
            {icon}
        </div>
        <div>
            <div className={`font-sans font-bold ${view && currentView === view ? 'text-tva-orange' : 'text-gray-900 group-hover:text-tva-orange'}`}>{title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
        </div>
        <ChevronRight className={`ml-auto w-5 h-5 transition-transform duration-300 ${view && currentView === view ? 'text-tva-orange' : 'text-gray-300 group-hover:text-tva-orange group-hover:translate-x-1'}`} />
    </button>
  );

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out-expo ${isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent border-transparent py-4 md:py-6'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setView('home')} className="flex items-center gap-3 group relative z-50 select-none">
             <div className="relative w-9 h-9 md:w-10 md:h-10 bg-tva-orange rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-500 ease-luxury overflow-hidden">
               <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
               <Clock className="text-white w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
             </div>
             <div className="flex flex-col items-start">
               <span className="font-bold text-lg md:text-xl tracking-tight leading-none text-gray-900">Time AI</span>
               <span className="text-tva-orange font-medium text-[9px] md:text-[10px] uppercase tracking-widest leading-none mt-1">Enterprise Intelligence</span>
             </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink view="home" label="Home" />
            <NavLink view="solutions" label="Services" />
            <NavLink label="Demo" onClick={handleDemoClick} />
            <NavLink view="intel" label="Blog" />
            <NavLink view="about" label="About Us" />
            
            <div className="h-6 w-px bg-gray-200 mx-4"></div>
            
            <button 
              onClick={() => setView('contact')}
              className="px-6 py-2.5 bg-tva-orange text-white font-medium rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 shadow-md text-sm"
            >
              <MessageSquare size={16} /> Contact Us
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button 
              className="text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors active:scale-90" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Mega Menu Overlay */}
      <div 
        className={`fixed inset-0 z-40 bg-white transition-all duration-500 ease-out-expo lg:hidden flex flex-col ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
      >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 to-transparent pointer-events-none"></div>

          <div className="flex-1 flex flex-col p-6 pt-24 overflow-y-auto relative z-10">
              <div className="grid gap-3 max-w-md mx-auto w-full">
                  <div className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2 px-1 font-mono">System Navigation</div>
                  
                  <MobileNavLink 
                    view="home" 
                    title="Home" 
                    desc="Dashboard & Overview" 
                    icon={<LayoutDashboard size={20} />} 
                  />
                  <MobileNavLink 
                    onClick={handleDemoClick}
                    title="Live Demo" 
                    desc="See the platform in action" 
                    icon={<Play size={20} />} 
                  />
                  <MobileNavLink 
                    view="solutions" 
                    title="Services" 
                    desc="Our Solutions & Tools" 
                    icon={<Database size={20} />} 
                  />
                  <MobileNavLink 
                    view="intel" 
                    title="Blog" 
                    desc="Insights & Case Studies" 
                    icon={<FileText size={20} />} 
                  />
                  <MobileNavLink 
                    view="about" 
                    title="About Us" 
                    desc="Our Team & Mission" 
                    icon={<Users size={20} />} 
                  />
                  
                  <div className="h-px bg-gray-100 my-4 mx-2"></div>
                  
                  <MobileNavLink 
                    view="contact" 
                    title="Contact Us" 
                    desc="Start a Project" 
                    icon={<Terminal size={20} />} 
                  />
              </div>

              <div className="mt-auto text-center pt-8 pb-4">
                  <p className="text-xs text-gray-400">© 2026 Time AI Solutions</p>
              </div>
          </div>
      </div>
    </>
  );
};
