import React, { useRef } from 'react';
import { Icons } from '../constants';
import { motion, useScroll, useTransform } from 'framer-motion';

const EXPERTISE = [
  {
    icon: <Icons.Code />,
    title: "AI-Powered Business Applications",
    description: "Transform your operations with intelligent applications that streamline workflows and enhance productivity.",
    stats: { sync: "99.2%", load: "Low" },
    tag: "APP_01",
    color: "rgba(92, 124, 250, 0.2)"
  },
  {
    icon: <Icons.Zap />,
    title: "Generative AI Automation",
    description: "Leverage cutting-edge AI to automate routine tasks and unlock creative potential across your organization.",
    stats: { sync: "100%", load: "Nominal" },
    tag: "AUTO_02",
    color: "rgba(165, 180, 252, 0.2)"
  },
  {
    icon: <Icons.Layout />,
    title: "Cross-Platform Applications",
    description: "Engage your team and clients with seamless mobile and desktop experiences designed for modern workflows.",
    stats: { sync: "98.7%", load: "High" },
    tag: "PLAT_03",
    color: "rgba(16, 185, 129, 0.2)"
  },
  {
    icon: <Icons.TrendingUp />,
    title: "ML-Enhanced Management",
    description: "Make data-driven decisions with confidence using our advanced machine learning insights and analytics.",
    stats: { sync: "99.9%", load: "Medium" },
    tag: "MGMT_04",
    color: "rgba(245, 158, 11, 0.2)"
  },
  {
    icon: <Icons.Calendar />,
    title: "Advanced Forecasting",
    description: "Anticipate market trends and optimize your strategy with our sophisticated predictive models.",
    stats: { sync: "99.5%", load: "Optimized" },
    tag: "FORE_05",
    color: "rgba(236, 72, 153, 0.2)"
  },
  {
    icon: <Icons.Database />,
    title: "Scalable ML Infrastructure",
    description: "Build and deploy robust machine learning systems that scale with your business needs.",
    stats: { sync: "100%", load: "Passive" },
    tag: "INFRA_06",
    color: "rgba(6, 182, 212, 0.2)"
  }
];

const NeuralWeb = () => (
  <div className="absolute inset-0 pointer-events-none opacity-10">
    <svg width="100%" height="100%" className="will-change-transform">
      <pattern id="grid-pattern" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  </div>
);

const CapabilityMonolith: React.FC<{ item: typeof EXPERTISE[0], index: number, scrollYProgress: any }> = ({ item, index, scrollYProgress }) => {
  // Use a simpler transform without Spring for better performance
  // Simplified transform for better performance
  const yOffset = useTransform(scrollYProgress, [0, 0.5, 1], [0, (index % 2 === 0 ? -30 : 30), (index % 2 === 0 ? -60 : 60)]);

  return (
    <motion.div
      style={{ y: yOffset, translateZ: 0 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative group h-full will-change-transform"
    >
      <div className="relative h-full bg-brand-surface/90 p-6 sm:p-8 md:p-10 lg:p-14 rounded-2xl sm:rounded-[2rem] lg:rounded-[2.5rem] flex flex-col border border-white/5 group-hover:border-chrono/40 transition-all duration-500 overflow-hidden">
        {/* Hardware-accelerated glow */}
        <div
          className="absolute -bottom-20 -right-20 w-40 h-40 blur-[60px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none will-change-[opacity]"
          style={{ backgroundColor: item.color }}
        />

        <div className="flex justify-between items-start mb-8 sm:mb-10 lg:mb-12 relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-white/[0.03] border border-white/10 rounded-lg sm:rounded-xl flex items-center justify-center text-chrono group-hover:bg-chrono group-hover:text-white transition-all duration-300">
            <div className="scale-110">{item.icon}</div>
          </div>
          <div className="text-right">
            <div className="text-[9px] font-black text-chrono/60 uppercase tracking-[0.4em] mb-1">{item.tag}</div>
            <div className="text-[7px] font-mono text-white/10 uppercase tracking-widest">v9.0.4</div>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-display font-black mb-4 sm:mb-6 tracking-tight uppercase leading-none group-hover:text-white transition-colors relative z-10">
          {item.title}
        </h3>

        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light mb-auto group-hover:text-white transition-colors relative z-10">
          {item.description}
        </p>

        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/5 grid grid-cols-2 gap-3 sm:gap-4 relative z-10">
          <div>
            <div className="text-[8px] font-black text-white/10 uppercase tracking-widest mb-1">Uptime</div>
            <div className="text-xs font-bold text-white/60 font-mono">{item.stats.sync}</div>
          </div>
          <div>
            <div className="text-[8px] font-black text-white/10 uppercase tracking-widest mb-1">Status</div>
            <div className={`text-[10px] font-black uppercase tracking-widest ${item.stats.load === 'High' ? 'text-accent-amber' : 'text-accent-emerald'}`}>{item.stats.load}</div>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4 text-[9px] font-black text-chrono uppercase tracking-[0.3em] cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
          <span>Learn More</span>
          <Icons.ChevronRight />
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  return (
    <section ref={containerRef} id="expertise" className="relative w-full py-32 sm:py-64 overflow-hidden bg-brand-void">
      <NeuralWeb />

      {/* Optimized background glows - using fewer, larger glows for performance */}
      <div className="absolute top-0 right-[-10%] w-[60%] aspect-square bg-chrono/5 blur-[120px] rounded-full pointer-events-none will-change-[transform]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-32 lg:mb-48 gap-16">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-chrono" />
              <span className="text-chrono font-black uppercase tracking-[0.6em] text-[10px]">About Time AI</span>
            </motion.div>
            <h2 className="text-5xl sm:text-7xl lg:text-[8rem] font-display font-black tracking-[-0.04em] uppercase leading-[0.85] mb-12">
              Our <br /> <span className="gradient-text">Vision</span>
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-8">
              Born in the vibrant heart of Miami and fueled by a global network of visionary minds, we're on a mission to redefine what's possible with artificial intelligence.
            </p>
          </div>

          <div className="hidden lg:block">
            <div className="p-8 bg-brand-surface border border-white/5 rounded-3xl max-w-xs shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-chrono/10 flex items-center justify-center text-chrono">
                  <Icons.Activity />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">System Status</span>
                  <span className="text-[10px] font-bold text-accent-emerald uppercase tracking-widest">Synchronized</span>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "92%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-chrono"
                />
              </div>
              <div className="flex justify-between mt-3">
                <span className="text-[8px] font-mono text-white/20 uppercase">Processing Data...</span>
                <span className="text-[8px] font-mono text-chrono uppercase">92%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-12 lg:gap-y-24">
          {EXPERTISE.map((item, i) => (
            <CapabilityMonolith key={i} item={item} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="mt-20 sm:mt-32 lg:mt-40 pt-12 sm:pt-16 lg:pt-20 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          <div className="flex items-center gap-8 sm:gap-12 lg:gap-16">
            <div className="flex flex-col">
              <span className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-display font-black text-white/10 leading-none tabular-nums">0124</span>
              <span className="text-[8px] sm:text-[9px] font-black text-chrono uppercase tracking-[0.4em] mt-2 sm:mt-3">Active Deployments</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[2.5rem] sm:text-[3rem] lg:text-[3.5rem] font-display font-black text-white/10 leading-none tabular-nums">0.2<span className="text-[1.2rem] sm:text-[1.5rem] ml-1">ms</span></span>
              <span className="text-[8px] sm:text-[9px] font-black text-chrono uppercase tracking-[0.4em] mt-2 sm:mt-3">Median Latency</span>
            </div>
          </div>

          <button className="w-full lg:w-auto px-12 py-6 bg-white text-black font-black text-lg rounded-2xl hover:bg-chrono hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group">
            <span className="uppercase tracking-[0.2em] text-sm">View Our Technology</span>
            <Icons.ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;