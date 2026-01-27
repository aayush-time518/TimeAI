import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import AIChatBot from './AIChatBot';
import Reviews from './Reviews';
import Services from './Services';
import Contact from './Contact';
import { Icons } from '../constants';
import { TabType } from '../types';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const { scrollYProgress } = useScroll({
    layoutEffect: false
  });
  // Use direct transform instead of spring for better performance
  const scaleX = scrollYProgress;

  return (
    <div className="min-h-screen bg-brand-void flex flex-col no-overflow-x selection:bg-chrono selection:text-white">
      {/* Global Storyline Sync Meter */}
      <motion.div 
        className="sync-bar" 
        style={{ scaleX }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX }}
        transition={{ type: "linear", duration: 0 }}
      />
      
      <Navbar />
      
      <main className="flex flex-col w-full relative">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none z-0" />
        
        {/* Story Part 01: Awakening */}
        <section className="relative z-10">
          <Hero />
        </section>
        
        {/* Story Part 02: The Blueprints */}
        <section id="expertise" className="relative z-10 bg-brand-void/95 border-y border-white/[0.02]">
          <Services />
        </section>

        {/* Story Part 03: Interactive Terminal */}
        <section id="platform" className="py-16 sm:py-24 md:py-32 lg:py-48 bg-brand-void relative z-10 overflow-hidden">
           {/* Cinematic Glows */}
           <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-chrono/5 blur-[120px] sm:blur-[180px] rounded-full pointer-events-none" />
           
           <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
              <div className="flex flex-col xl:flex-row gap-8 sm:gap-12 lg:gap-16 xl:gap-32 items-start">
                 {/* Main Operation Terminal */}
                 <div className="xl:w-2/3 w-full">
                    <div className="mb-8 sm:mb-12 lg:mb-16">
                       <motion.div 
                         initial={{ opacity: 0, x: -20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         viewport={{ once: true }}
                         className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6"
                       >
                         <div className="h-px w-6 sm:w-8 lg:w-12 bg-chrono/40" />
                         <span className="text-chrono font-black uppercase tracking-[0.4em] text-[8px] sm:text-[9px] lg:text-[11px]">Neural Command</span>
                       </motion.div>
                       <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black tracking-tight mb-6 sm:mb-8 lg:mb-10 uppercase leading-none">
                         Synchronize <br/> <span className="gradient-text">Nodes.</span>
                       </h2>
                       
                       <div className="flex gap-2 p-1 sm:p-1.5 glass-card rounded-xl sm:rounded-2xl w-full sm:w-fit mb-6 sm:mb-8 lg:mb-10 border-white/5">
                          {[TabType.DASHBOARD, TabType.ANALYTICS].map(tab => (
                            <button 
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`flex-1 sm:flex-none px-4 sm:px-6 lg:px-12 py-2.5 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl lg:rounded-2xl text-[8px] sm:text-[9px] lg:text-[11px] font-black uppercase tracking-widest transition-all duration-500 relative overflow-hidden ${activeTab === tab ? 'text-white' : 'text-white/30 hover:text-white'}`}
                            >
                              <span className="relative z-10">{tab}</span>
                              {activeTab === tab && (
                                <motion.div layoutId="tab-bg" className="absolute inset-0 bg-chrono z-0 shadow-chrono" />
                              )}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-[4rem] overflow-y-auto overflow-x-hidden min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] shadow-2xl relative border-white/10" style={{ position: 'relative', width: '100%', maxWidth: '100%' }}>
                       <AnimatePresence mode="wait">
                         {activeTab === TabType.DASHBOARD ? (
                           <motion.div
                             key="dashboard"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             transition={{ duration: 0.2 }}
                           >
                             <Dashboard />
                           </motion.div>
                         ) : (
                           <motion.div
                             key="analytics"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             transition={{ duration: 0.2 }}
                           >
                             <Analytics />
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                 </div>

                 {/* AI Co-Pilot / Navigator */}
                 <div className="xl:w-1/3 w-full flex flex-col pt-6 sm:pt-10 lg:pt-20">
                    <div className="mb-6 sm:mb-8 lg:mb-10 flex items-center justify-between">
                       <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-black uppercase tracking-tighter">Navigator</h3>
                       <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1 sm:py-1.5 bg-accent-emerald/5 rounded-full border border-accent-emerald/20">
                          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent-emerald rounded-full animate-pulse" />
                          <span className="text-[8px] sm:text-[9px] font-black text-accent-emerald uppercase tracking-widest">Active</span>
                       </div>
                    </div>
                    <div className="flex-1 shadow-2xl">
                      <AIChatBot />
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Story Part 04: Market Proof */}
        <section id="success" className="relative z-10 border-t border-white/[0.02]">
          <Reviews />
        </section>
        
        {/* Story Part 05: Contact Uplink */}
        <Contact />

        {/* Final Deployment CTA */}
        <section className="py-20 sm:py-32 md:py-48 lg:py-64 px-4 sm:px-6 text-center relative z-10 overflow-hidden bg-brand-void border-t border-white/[0.02]">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] lg:w-[1200px] h-[400px] sm:h-[600px] lg:h-[1200px] bg-chrono/5 blur-[100px] sm:blur-[150px] lg:blur-[200px] rounded-full pointer-events-none" />
           <div className="max-w-5xl mx-auto relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[8rem] xl:text-[10rem] font-display font-black mb-8 sm:mb-12 tracking-tighter uppercase leading-[0.85]">
                Deploy <br/> <span className="gradient-text">Eternity.</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-2xl text-white/30 mb-12 sm:mb-16 font-light max-w-2xl mx-auto leading-relaxed italic border-x-0 sm:border-x border-white/5 px-4 sm:px-6 lg:px-10 py-4">
                "The singularity is no longer a theory—it's a deployment."
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-10">
                 <button className="px-10 py-5 sm:px-16 sm:py-6 lg:px-20 lg:py-8 bg-chrono text-white font-black text-lg sm:text-xl lg:text-2xl rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] hover:bg-chrono-dark transition-all shadow-chrono-lg">Deploy Now</button>
                 <button className="px-10 py-5 sm:px-16 sm:py-6 lg:px-20 lg:py-8 glass-card text-white font-black text-lg sm:text-xl lg:text-2xl rounded-xl sm:rounded-2xl lg:rounded-[2.5rem] hover:bg-white/10 transition-all border-white/10">Architecture</button>
              </div>
           </div>
        </section>
      </main>

      <footer className="py-20 sm:py-32 px-6 sm:px-12 border-t border-white/[0.03] bg-brand-surface relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 sm:gap-24">
          <div className="flex flex-col space-y-10 md:col-span-1">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-chrono rounded-[1.5rem] flex items-center justify-center text-white shadow-chrono">
                <Icons.Clock />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-4xl font-display font-black tracking-tighter uppercase">Time <span className="text-chrono">AI</span></span>
              </div>
            </div>
            <p className="text-lg text-white/20 leading-relaxed font-light">
              Autonomous intelligence for the decentralized era.
            </p>
          </div>
          
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
             <div className="flex flex-col gap-4 sm:gap-6">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Tech</span>
                {['Neural Flux', 'Quant Hub', 'Vector Pipes'].map(l => <a key={l} href="#" className="text-sm sm:text-base text-white/30 hover:text-chrono transition-all">{l}</a>)}
             </div>
             <div className="flex flex-col gap-4 sm:gap-6">
                <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/10">Docs</span>
                {['Zero-Trust', 'Bio-Enc', 'API V9'].map(l => <a key={l} href="#" className="text-sm sm:text-base text-white/30 hover:text-chrono transition-all">{l}</a>)}
             </div>
          </div>

          <div className="flex flex-col md:items-end gap-10">
             <div className="text-right border-r-2 border-chrono/20 pr-6">
               <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.5em] mb-2">© 2025 TIME AI SOLUTIONS</p>
               <p className="text-[8px] font-bold text-white/5">V_CHRONO_FINAL</p>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;