import React from 'react';
import { Icons } from '../constants';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-brand-void relative">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto glass-card rounded-2xl sm:rounded-[3rem] lg:rounded-[4rem] border-white/5 p-6 sm:p-12 md:p-16 lg:p-24 relative overflow-hidden"
      >
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-chrono/50 to-transparent"></div>
        <div className="absolute -bottom-60 -right-60 w-[30rem] h-[30rem] bg-chrono/5 blur-[160px] rounded-full"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center relative z-10">
          <div>
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-chrono font-bold uppercase tracking-[0.6em] text-[11px] mb-8 block"
            >
              Direct Uplink
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tighter mb-8 sm:mb-10 leading-[0.9] uppercase">
              ESTABLISH <br/> <span className="gradient-text">CONNECTION.</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/30 mb-10 sm:mb-14 max-w-md font-light leading-relaxed">
              Ready to optimize your organization's continuum with high-performance intelligence.
            </p>
            
            <div className="space-y-6 sm:space-y-8 lg:space-y-10">
              {[
                { icon: <Icons.MessageSquare />, title: 'Enterprise Sales', email: 'sales@timeai.net' },
                { icon: <Icons.Activity />, title: 'System Support', email: 'nodes@timeai.net' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ x: 12 }}
                  className="flex items-center space-x-8 group cursor-pointer"
                >
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass-card rounded-xl sm:rounded-2xl flex items-center justify-center text-chrono border-white/5 group-hover:bg-chrono group-hover:text-white transition-all duration-500 shadow-chrono`}>
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-bold text-lg sm:text-xl lg:text-2xl tracking-tight group-hover:text-white transition-colors">{item.title}</h5>
                    <p className="text-xs sm:text-sm text-white/20 font-bold uppercase tracking-[0.3em] mt-1 break-all">{item.email}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 lg:p-12 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3.5rem] border-white/10 relative shadow-2xl"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Operative Name</label>
                <input type="text" placeholder="John Doe" className="w-full bg-brand-surface/50 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm focus:outline-none focus:border-chrono focus:ring-2 sm:focus:ring-4 focus:ring-chrono/5 transition-all placeholder:text-white/10" />
              </div>
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Channel ID</label>
                <input type="email" placeholder="john@company.com" className="w-full bg-brand-surface/50 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm focus:outline-none focus:border-chrono focus:ring-2 sm:focus:ring-4 focus:ring-chrono/5 transition-all placeholder:text-white/10" />
              </div>
              </div>
              
              <div className="space-y-2 sm:space-y-3">
                <label className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Mission Objectives</label>
                <textarea placeholder="Tell us about your organization's AI constraints..." rows={4} className="w-full bg-brand-surface/50 border border-white/5 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 lg:py-5 text-xs sm:text-sm focus:outline-none focus:border-chrono focus:ring-2 sm:focus:ring-4 focus:ring-chrono/5 transition-all resize-none placeholder:text-white/10"></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 sm:py-5 lg:py-6 bg-white text-black font-black text-base sm:text-lg lg:text-xl rounded-2xl sm:rounded-3xl hover:bg-chrono hover:text-white transition-all shadow-chrono-lg flex items-center justify-center space-x-3 sm:space-x-4 border-none"
              >
                 <span>Transmit Request</span>
                 <Icons.ChevronRight />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;