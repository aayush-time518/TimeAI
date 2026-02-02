import React, { useState, useEffect } from 'react';
import { Clock, Menu, X, Terminal, ChevronRight, LayoutDashboard, Database, Users, FileText, MessageSquare } from 'lucide-react';
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

  const NavLink = ({ view, label }: { view: ViewState, label: string }) => (
    <button 
      onClick={() => {
        setView(view);
        setMobileMenuOpen(false);
        window.scrollTo(0,0);
      }}
      className={`
        relative font-sans font-medium text-sm tracking-wide transition-all duration-700 ease-luxury px-4 py-2 rounded-lg 
        ${currentView === view 
            ? 'text-tva-orange bg-tva-orange/5 font-bold' 
            : 'text-gray-500 hover:text-tva-orange hover:bg-gray-50'}
      `}
    >
      {label}
      {currentView === view && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-tva-orange rounded-full"></span>
      )}
    </button>
  );

  const MobileNavLink = ({ view, title, desc, icon }: { view: ViewState, title: string, desc: string, icon: React.ReactNode }) => (
    <button 
        onClick={() => {
            setView(view);
            setMobileMenuOpen(false);
            window.scrollTo(0,0);
        }}
        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ease-luxury w-full text-left group ${currentView === view ? 'bg-tva-orange/10 border-tva-orange' : 'bg-white/80 border-gray-200 hover:border-tva-orange/50'}`}
    >
        <div className={`p-3 rounded-md ${currentView === view ? 'bg-tva-orange text-white' : 'bg-gray-100 text-tva-orange group-hover:bg-tva-orange group-hover:text-white'} transition-colors duration-300`}>
            {icon}
        </div>
        <div>
            <div className={`font-sans font-bold ${currentView === view ? 'text-tva-orange' : 'text-gray-900 group-hover:text-tva-orange'}`}>{title}</div>
            <div className="text-xs text-gray-400 mt-1">{desc}</div>
        </div>
        <ChevronRight className={`ml-auto w-5 h-5 transition-transform duration-300 ${currentView === view ? 'text-tva-orange' : 'text-gray-300 group-hover:text-tva-orange group-hover:translate-x-1'}`} />
    </button>
  );

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-40 transition-all duration-1000 ease-luxury ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent border-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setView('home')} className="flex items-center gap-3 group relative z-50">
             <div className="relative w-10 h-10 bg-tva-orange rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-luxury overflow-hidden">
               <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
               <Clock className="text-white w-6 h-6 group-hover:animate-pulse" />
             </div>
             <div className="flex flex-col items-start">
               <span className="font-bold text-xl tracking-tight leading-none text-gray-900">Time AI</span>
               <span className="text-tva-orange font-medium text-[10px] uppercase tracking-widest leading-none mt-1">Enterprise Intelligence</span>
             </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink view="home" label="Home" />
            <NavLink view="solutions" label="Services" />
            <NavLink view="intel" label="Blog" />
            <NavLink view="about" label="About Us" />
            
            <div className="h-6 w-px bg-gray-200 mx-4"></div>
            
            <button 
              onClick={() => setView('contact')}
              className="px-6 py-2.5 bg-tva-orange text-white font-medium rounded-lg hover:bg-red-700 hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 shadow-md"
            >
              <MessageSquare size={16} /> Contact Us
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button 
              className="text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Mega Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-700 ease-luxury lg:hidden flex flex-col ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
          <div className="flex-1 flex flex-col p-6 pt-24 overflow-y-auto">
              <div className="grid gap-4 max-w-md mx-auto w-full">
                  <div className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2 px-1 font-mono">System Navigation</div>
                  
                  <MobileNavLink 
                    view="home" 
                    title="Home" 
                    desc="Dashboard & Overview" 
                    icon={<LayoutDashboard size={20} />} 
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
                  
                  <div className="h-px bg-gray-200 my-4"></div>
                  
                  <MobileNavLink 
                    view="contact" 
                    title="Contact Us" 
                    desc="Start a Project" 
                    icon={<Terminal size={20} />} 
                  />
              </div>
          </div>
      </div>
    </>
  );
};