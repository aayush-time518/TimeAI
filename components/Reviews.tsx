
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const REVIEWS = [
  { name: "Alex Rivera", role: "CTO @ FluxGraph", text: "Architected our neural data pipeline with sub-millisecond latency. True specialists in high-load systems.", sync: "99%" },
  { name: "Sarah Chen", role: "ML Lead @ Quantize", text: "Trading bots delivered consistent market alpha within weeks. Phenomenal mathematical execution and reliability.", sync: "98%" },
  { name: "Julian Thorne", role: "Founder @ NeoStack", text: "Finally, a partner that understands deep NLP and enterprise RAG systems at scale. Beyond impressed.", sync: "100%" },
  { name: "Elena Volkov", role: "VP Engineering", text: "Their architectural foresight saved us months of development. The substrate is bulletproof.", sync: "99%" },
  { name: "Marcus Wright", role: "Quant Analyst", text: "Precision engineering at its finest. The latency optimization is simply unmatched in the current market.", sync: "97%" },
  { name: "Lila Banks", role: "Solutions Architect", text: "The integration process was seamless. Our data propagation throughput tripled in just two sprints.", sync: "99.4%" },
];

// Use React.FC to allow 'key' prop during mapping and fix potential TS errors
const ReviewCard: React.FC<{ review: typeof REVIEWS[0], index: number }> = ({ review, index }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-[2.5rem] lg:rounded-[3rem] flex flex-col justify-between group border-white/5 hover:border-chrono/40 transition-all duration-700 mb-8 sm:mb-10 lg:mb-12 relative overflow-hidden perspective-1000"
  >
    {/* Dynamic Background Glow */}
    <div className="absolute -inset-2 bg-gradient-to-br from-chrono/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-6 sm:mb-8 lg:mb-10">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-chrono/5 border border-chrono/20 flex items-center justify-center font-display font-black text-chrono text-xl sm:text-2xl lg:text-3xl group-hover:bg-chrono group-hover:text-white transition-all duration-500 shadow-chrono">
          {review.name.charAt(0)}
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-white/10 uppercase tracking-[0.4em] mb-2">Sync Status</span>
          <div className="px-4 py-1.5 bg-chrono/10 rounded-full border border-chrono/20 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-chrono rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-chrono tracking-widest uppercase">{review.sync}</span>
          </div>
        </div>
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-white/40 leading-relaxed font-light mb-8 sm:mb-10 lg:mb-12 group-hover:text-white/80 transition-colors">
        <span className="text-chrono font-display text-4xl leading-none opacity-40">"</span>
        {review.text}
      </p>
    </div>
    
    <div className="relative z-10 pt-6 sm:pt-8 border-t border-white/5 flex items-center justify-between">
      <div>
        <h4 className="font-display font-bold text-lg sm:text-xl lg:text-2xl tracking-tight group-hover:text-chrono transition-colors">{review.name}</h4>
        <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] text-white/10 mt-1 sm:mt-2">{review.role}</p>
      </div>
      <div className="text-white/5 group-hover:text-chrono/20 transition-colors">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H16.017C13.8079 14 12.017 15.7909 12.017 18V21H14.017ZM14.017 21H12.017V23H14.017V21ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017V14H7.017C4.80786 14 3.017 15.7909 3.017 18V21H5.017ZM5.017 21H3.017V23H5.017V21Z"/></svg>
      </div>
    </div>
  </motion.div>
);

const Reviews: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false
  });

  // Use direct transforms without spring for better performance
  const yLeft = useTransform(scrollYProgress, [0, 1], [100, -300]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const rotateLeft = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rotateRight = useTransform(scrollYProgress, [0, 1], [2, -2]);

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-6 py-40 overflow-hidden relative">
      {/* Structural Accents */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="text-center mb-40 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block px-6 py-2 rounded-full border border-chrono/20 bg-chrono/5 text-[11px] font-black text-chrono uppercase tracking-[0.5em] mb-10"
        >
          Validation Cluster
        </motion.div>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[7.5rem] font-display font-black tracking-[ -0.05em] uppercase leading-none mb-8 sm:mb-10">
          Neural <span className="gradient-text">Trust.</span>
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-white/20 max-w-3xl mx-auto font-light leading-relaxed italic px-4">
          High-frequency data validating institutional architecture across global network nodes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-start relative z-10">
        <motion.div style={{ y: yLeft, rotate: rotateLeft }} className="flex flex-col">
          {REVIEWS.slice(0, 3).map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </motion.div>
        <motion.div style={{ y: yRight, rotate: rotateRight }} className="flex flex-col md:mt-40 lg:mt-60">
          {REVIEWS.slice(3, 6).map((review, i) => (
            <ReviewCard key={i} review={review} index={i + 3} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Reviews;
