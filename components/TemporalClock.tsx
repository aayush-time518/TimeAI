import React, { useEffect, useState, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const BlinkingEyes = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // Eyes follow the scroll slightly
  const eyeY = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  
  return (
    <div className="absolute top-[38%] left-1/2 -translate-x-1/2 flex gap-4 md:gap-6 z-30">
      {[0, 1].map((i) => (
        <div key={i} className="relative w-3 h-4 md:w-4 md:h-5">
          {/* Upper Eye Lid */}
          <motion.div 
            animate={{ height: ['80%', '10%', '80%'] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 + Math.random() * 2 }}
            className="absolute top-0 w-full bg-white rounded-full z-10"
          />
          {/* Pupil that tracks scroll */}
          <motion.div 
            style={{ y: eyeY }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 md:w-2 md:h-2 bg-chrono rounded-full blur-[0.5px]" 
          />
          {/* Glow */}
          <div className="absolute inset-0 bg-chrono/20 blur-sm rounded-full" />
        </div>
      ))}
    </div>
  );
};

const SwayingHair = () => (
  <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
    {[...Array(6)].map((_, i) => (
      <motion.svg
        key={i}
        viewBox="0 0 100 100"
        className="absolute w-[120%] h-[120%] -left-[10%]"
        initial={{ rotate: -5 }}
        animate={{ rotate: [ -2, 2, -2] }}
        transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
      >
        <path 
          d={`M ${20 + i * 12},0 Q ${30 + i * 5},50 ${20 + i * 10},100`}
          fill="none"
          stroke="rgba(92, 124, 250, 0.15)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
      </motion.svg>
    ))}
  </div>
);

const ChronoGuardian = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const rotateCharacter = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -20, 0]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div 
        style={{ rotateZ: rotateCharacter, y: floatY }}
        className="relative w-[85%] h-[85%] z-20"
      >
        <SwayingHair />
        <BlinkingEyes scrollYProgress={scrollYProgress} />
        
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(92,124,250,0.3)]">
          <path d="M90,120 Q100,130 110,120" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <path d="M70,80 Q70,120 100,135 Q130,120 130,80" fill="rgba(10,10,10,0.95)" stroke="white" strokeWidth="1" strokeLinecap="round" />
          <path d="M65,70 Q100,50 135,70 Q120,90 100,85 Q80,90 65,70" fill="#5c7cfa" stroke="#3b5bdb" strokeWidth="2" />
          <path d="M40,160 Q100,140 160,160" fill="none" stroke="white" strokeWidth="1" opacity="0.2" />
        </svg>
        
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] border-t border-chrono/30 rounded-full blur-[1px] opacity-20"
        />
      </motion.div>
    </div>
  );
};

const TemporalClock: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const { scrollYProgress } = useScroll({
    layoutEffect: false
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const h = time.getHours();
  const m = time.getMinutes();
  const s = time.getSeconds();

  const hDeg = (h % 12) * 30 + m * 0.5;
  const mDeg = m * 6 + s * 0.1;
  const sDeg = s * 6;

  return (
    <div className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-[550px] aspect-square flex items-center justify-center select-none group perspective-1000 mx-auto">
      <motion.div 
        className="relative w-full h-full flex items-center justify-center"
      >
        <ChronoGuardian scrollYProgress={scrollYProgress} />

        {/* Orbiting Elements */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `rotate(${i * 30}deg) translateY(-140px)` }}
            >
              <div className="w-1 h-2 bg-white/20 rounded-full sm:translate-y-[-20px] lg:translate-y-[-40px]" />
            </div>
          ))}

          {/* Hands with better responsive length */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div animate={{ rotate: hDeg }} className="absolute w-1.5 h-[20%] bg-white rounded-full origin-bottom" style={{ bottom: '50%' }} />
            <motion.div animate={{ rotate: mDeg }} className="absolute w-1 h-[30%] bg-white/50 rounded-full origin-bottom" style={{ bottom: '50%' }} />
            <motion.div animate={{ rotate: sDeg }} className="absolute w-0.5 h-[35%] bg-chrono origin-bottom" style={{ bottom: '50%' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-chrono rounded-full shadow-chrono shadow-[0_0_10px_#5c7cfa]" />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute top-[15%] left-0 bg-chrono/10 border border-chrono/20 px-2 py-1 rounded text-[7px] font-black text-chrono uppercase tracking-widest hidden sm:block"
        >
          TEMPORAL_LOCK
        </motion.div>
      </motion.div>

      {/* Floating Time Display */}
      <div className="absolute -bottom-12 sm:-bottom-20 flex flex-col items-center w-full">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="glass-card px-4 sm:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-chrono/20 shadow-chrono flex items-baseline gap-2 sm:gap-4"
        >
           <span className="text-2xl sm:text-4xl font-display font-black tracking-tighter tabular-nums">
            {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}
           </span>
           <span className="text-base sm:text-xl font-display font-bold text-chrono/60 tabular-nums">
            {s.toString().padStart(2, '0')}
           </span>
        </motion.div>
      </div>
    </div>
  );
};

export default TemporalClock;