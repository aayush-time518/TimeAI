import React, { useState } from 'react';
import { Icons } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-6 py-3 sm:py-4 md:py-6 flex justify-center pointer-events-none">
      <div className="max-w-7xl w-full glass-card rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between pointer-events-auto shadow-xl">
        <div className="flex items-center space-x-2 sm:space-x-4 cursor-pointer group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-chrono rounded-lg flex items-center justify-center text-white shadow-lg shadow-chrono/20 group-hover:rotate-12 transition-transform">
            <Icons.Clock />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-display font-bold tracking-tight leading-none uppercase">
              Time <span className="text-chrono">AI</span>
            </span>
            <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-[0.4em] text-white/60">Solutions</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          {['Expertise', 'Platform', 'Success', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="nav-link text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-white/80 hover:text-chrono transition-all relative"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-chrono/5 rounded-full border border-chrono/10">
            <div className="w-1.5 h-1.5 rounded-full bg-chrono animate-pulse" />
            <span className="text-[9px] font-bold text-chrono uppercase tracking-wider">System Online</span>
          </div>
          <button className="px-4 lg:px-6 py-2 lg:py-2.5 bg-white text-black font-bold rounded-lg lg:rounded-xl hover:bg-chrono hover:text-white transition-all text-[10px] lg:text-xs uppercase tracking-wider shadow-lg">
            Consult
          </button>
        </div>

        {/* Mobile Consult Button */}
        <button className="md:hidden px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-chrono hover:text-white transition-all text-[10px] uppercase tracking-wider shadow-lg">
          Consult
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 md:hidden glass-card rounded-2xl p-6 pointer-events-auto shadow-2xl z-[99]"
          >
            <div className="flex flex-col space-y-6">
              {['Expertise', 'Platform', 'Success', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="nav-link text-sm font-bold uppercase tracking-widest text-white/50 hover:text-chrono transition-all py-2"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex items-center gap-2 px-3 py-2 bg-chrono/5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-chrono animate-pulse" />
                <span className="text-[9px] font-bold text-chrono uppercase tracking-wider">System Online</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;