
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
        relative font-sans font-semibold text-sm tracking-wide transition-all duration-700 ease-luxury px-4 py-2 rounded-lg 
        ${view && currentView === view 
            ? 'text-gray-900 bg-gray-100 font-black' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}
      `}
    >
      {label}
      {view && currentView === view && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"></span>
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
        className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 w-full text-left group active:scale-95 ${view && currentView === view ? 'bg-gray-100 border-gray-400' : 'bg-white border-gray-200 hover:border-gray-400 shadow-sm'}`}
    >
        <div className={`p-3 rounded-lg ${view && currentView === view ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-700 group-hover:bg-gray-900 group-hover:text-white'} transition-colors duration-300`}>
            {icon}
        </div>
        <div>
            <div className={`font-sans font-black ${view && currentView === view ? 'text-gray-900' : 'text-gray-900 group-hover:text-gray-700'}`}>{title}</div>
            <div className="text-xs text-gray-600 mt-0.5">{desc}</div>
        </div>
        <ChevronRight className={`ml-auto w-5 h-5 transition-transform duration-300 ${view && currentView === view ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-900 group-hover:translate-x-1'}`} />
    </button>
  );

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out-expo ${isScrolled ? 'bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 backdrop-blur-md border-b border-gray-200/50 py-3 shadow-sm' : 'bg-transparent border-transparent py-4 md:py-6'}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => setView('home')} className="flex items-center gap-3 group relative z-50 select-none">
             <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-500 ease-luxury overflow-hidden border-2 border-gray-300">
               <img src="/time_ai_img.png" alt="Time AI Logo" className="w-full h-full object-cover" style={{ filter: 'saturate(1.3) contrast(1.2) brightness(1.05)' }} />
             </div>
             <div className="flex flex-col items-start">
               <span className="font-black text-lg md:text-xl tracking-tight leading-none text-gray-900">Time AI</span>
               <span className="text-gray-700 font-black text-[9px] md:text-[10px] uppercase tracking-widest leading-none mt-1">Enterprise Intelligence</span>
             </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <NavLink view="home" label="Home" />
            <NavLink view="solutions" label="Services" />
            <NavLink view="demo" label="Demo" />
            <NavLink view="intel" label="Blog" />
            <NavLink view="about" label="About Us" />
            
            <div className="h-6 w-px bg-gray-200 mx-4"></div>
            
            <button 
              onClick={() => setView('contact')}
              className="px-6 py-2.5 bg-gray-900 text-white font-black rounded-lg hover:bg-gray-800 hover:shadow-lg transition-all duration-300 flex items-center gap-2 transform hover:-translate-y-0.5 shadow-md text-sm"
            >
              <MessageSquare size={16} /> Contact Us
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button 
              className="text-gray-900 p-2 hover:bg-gradient-to-br hover:from-white hover:via-amber-50/30 hover:to-yellow-50/40 rounded-lg transition-colors active:scale-90" 
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
        className={`fixed inset-0 z-40 bg-gradient-to-br from-white via-amber-50/15 to-yellow-50/20 transition-all duration-500 ease-out-expo lg:hidden flex flex-col ${mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}
      >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50/50 to-transparent pointer-events-none"></div>

          <div className="flex-1 flex flex-col p-6 pt-24 overflow-y-auto relative z-10">
              <div className="grid gap-3 max-w-md mx-auto w-full">
                  <div className="text-gray-600 font-bold text-xs uppercase tracking-widest mb-2 px-1 font-mono">System Navigation</div>
                  
                  <MobileNavLink 
                    view="home" 
                    title="Home" 
                    desc="Dashboard & Overview" 
                    icon={<LayoutDashboard size={20} />} 
                  />
                  <MobileNavLink 
                    view="demo"
                    title="Demo" 
                    desc="Live System Simulations" 
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
                  <p className="text-xs text-gray-600">© 2026 Time AI Solutions</p>
              </div>
          </div>
      </div>
    </>
  );
};
