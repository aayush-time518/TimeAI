import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, TrendingUp, Zap, Scan, CheckCircle, Target, Box, Database } from 'lucide-react';
import { ViewState } from '../types';
import { MinaCharacter } from './MinaCharacter';
import { playSound } from '../utils/sound';

interface HeroProps {
  setView: (view: ViewState) => void;
}

const RollingText: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words]);

  return (
    <span className="inline-grid overflow-hidden text-left align-bottom pb-1 h-[1.1em]">
      {words.map((word, i) => (
        <span
          key={i}
          className={`col-start-1 row-start-1 text-tva-orange transition-all duration-700 ease-out-expo ${
            i === index
              ? "opacity-100 transform translate-y-0"
              : i === (index - 1 + words.length) % words.length
              ? "opacity-0 transform -translate-y-full"
              : "opacity-0 transform translate-y-full"
          }`}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

/* --- 3D HOLO CUBE --- */
const HoloCube: React.FC<{ stage: number }> = ({ stage }) => {
    const isHit = stage === 2;
    const isClean = stage >= 3;

    return (
        <div className={`relative w-24 h-24 transform-style-3d transition-all duration-300 ${isHit ? 'animate-shake brightness-200 scale-90' : 'animate-float'}`}>
             <div className={`absolute inset-4 rounded-sm opacity-50 blur-md ${isClean ? 'bg-green-400' : isHit ? 'bg-white' : 'bg-red-500 animate-pulse'}`}></div>
             <div className={`absolute inset-0 border-2 rounded-lg backdrop-blur-sm transition-colors duration-200 flex items-center justify-center
                ${isClean ? 'border-green-400 bg-green-400/10' : isHit ? 'border-white bg-white' : 'border-red-500 bg-red-500/10'}
             `}>
                {isClean ? <Database className="text-green-500" size={32} /> : <Box className="text-red-500" size={32} />}
             </div>
             
             {/* Hit Flash Ring */}
             {isHit && (
                <div className="absolute inset-[-20px] border-4 border-white rounded-full animate-ping opacity-50"></div>
             )}
        </div>
    );
};

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  const phrases = ["Variance.", "Latency.", "Downtime.", "Inefficiency."];
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState<{x: number, y: number, id: number}[]>([]);

  // Animation Cycle
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const cycle = () => {
        setStage(0); // Patrol
        setParticles([]);
        
        timeout = setTimeout(() => {
            setStage(1); // Detect
            playSound('alert');
            
            timeout = setTimeout(() => {
                setStage(1.5); // Aim (Laser Sight + Charge)
                
                timeout = setTimeout(() => {
                    setStage(2); // Fire (Beam)
                    playSound('pop'); 
                    
                    // Spawn Hit Particles
                    const newParticles = Array.from({length: 8}).map((_, i) => ({
                        id: i,
                        x: (Math.random() - 0.5) * 60,
                        y: (Math.random() - 0.5) * 60
                    }));
                    setParticles(newParticles);
                    
                    timeout = setTimeout(() => {
                        setStage(3); // Clean
                        playSound('chime');
                        
                        timeout = setTimeout(() => {
                            setStage(4); // Exit
                            timeout = setTimeout(cycle, 1500);
                        }, 1000);
                    }, 300);
                }, 800); 
            }, 1000);
        }, 3000);
    };

    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: (y / rect.height) * -6, y: (x / rect.width) * 6 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const getMinaState = () => {
      switch(true) {
          case stage === 0: return { variant: 'walking', eyeTarget: null, showScanner: false };
          case stage === 1: return { variant: 'alert', eyeTarget: { x: 80, y: 50 }, showScanner: false };
          case stage === 1.5: return { variant: 'aiming', eyeTarget: { x: 80, y: 50 }, showScanner: true };
          case stage === 2: return { variant: 'firing', eyeTarget: { x: 80, y: 50 }, showScanner: false };
          case stage === 3: return { variant: 'success', eyeTarget: { x: 50, y: 20 }, showScanner: false };
          case stage === 4: return { variant: 'success', eyeTarget: { x: 0, y: 50 }, showScanner: false };
          default: return { variant: 'idle', eyeTarget: null, showScanner: false };
      }
  };

  const minaState = getMinaState();

  // Coordinates
  // Mina Box Left: 5% (30px). 
  // Gun Tip X (Absolute): ~46%. 
  // Gun Tip Y (Absolute): ~47.7%.
  // Target: 82% X, 45.6% Y.

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-white py-32 lg:py-0 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="space-y-10 flex flex-col justify-center order-2 lg:order-1 max-w-xl">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out-expo">
              <div className="inline-flex items-center gap-3 px-4 py-2 mb-8 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-900">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tva-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-tva-orange"></span>
                </span>
                Active Patrol: Sector 7G
              </div>
              <h1 className="text-5xl sm:text-7xl font-sans font-bold leading-[1.05] tracking-tight text-gray-900 mb-6">
                Eliminate <br />
                <RollingText words={phrases} />
              </h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                 Watch Mina detect and neutralize supply chain anomalies in real-time. We stop the bleeding before you even know you're cut.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out-expo delay-100">
              <button 
                onClick={() => setView('contact')}
                className="px-10 py-5 bg-gray-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-2xl hover:bg-tva-orange hover:shadow-glow-amber transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1"
              >
                Start Pilot <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => setView('solutions')}
                className="px-10 py-5 bg-white border border-gray-200 text-gray-900 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3"
              >
                <Play size={16} className="fill-current" /> Live Demo
              </button>
            </div>
          </div>

          {/* NARRATIVE STAGE */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 h-[600px] perspective-[1200px] group">
             <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
                    relative w-full max-w-[600px] aspect-[4/3] transition-all duration-100 ease-out
                    ${stage === 2 ? 'translate-x-[-15px] rotate-y-3' : ''} /* Heavy 3D Recoil */
                `}
                style={{ 
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
             >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none rounded-3xl transform translate-z-[1px]"></div>

                {/* 1. Base */}
                <div className="absolute bottom-16 left-0 right-0 h-40 transform translate-z-[-20px]">
                     <div className="w-full h-full bg-gradient-to-r from-transparent via-gray-50 to-transparent flex items-center justify-center relative overflow-hidden rounded-[100%] border-t border-gray-200/50 shadow-inner">
                         <div className={`absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.05)_50%,transparent_100%)] bg-[size:50px_100%] ${stage !== 4 ? 'animate-[shimmer_1s_linear_infinite]' : 'animate-[shimmer_0.2s_linear_infinite]'}`}></div>
                         
                         {/* Dynamic Lighting from Beam */}
                         {stage === 2 && (
                             <div className="absolute inset-0 bg-blue-400/20 animate-pulse mix-blend-overlay"></div>
                         )}
                     </div>
                </div>

                {/* 2. MINA */}
                <div className="absolute bottom-24 left-[5%] w-64 h-64 transform translate-z-[40px] transition-transform duration-500 z-20">
                    <MinaCharacter 
                        className="w-full h-full drop-shadow-2xl" 
                        variant={minaState.variant as any} 
                        eyeTarget={minaState.eyeTarget}
                        showScanner={minaState.showScanner}
                    />
                </div>

                {/* 3. TARGET (Holo Cube) */}
                <div 
                    className={`
                        absolute top-[35%] right-[10%] transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-z-[60px] z-20
                        ${stage === 0 ? 'translate-x-[250%] opacity-0 duration-0' : ''} 
                        ${stage === 1 ? 'translate-x-0 duration-700 opacity-100' : ''}
                        ${stage >= 2 && stage < 4 ? 'translate-x-0 duration-0' : ''}
                        ${stage === 4 ? 'translate-x-[-300%] opacity-0 duration-500 ease-in' : ''}
                    `}
                >
                     {/* Lock On Reticle */}
                     {stage === 1.5 && (
                         <div className="absolute inset-[-40px] border-2 border-tva-orange border-dashed rounded-full animate-spin-slow opacity-60 pointer-events-none scale-110"></div>
                     )}
                     <HoloCube stage={stage} />
                </div>

                {/* 4. BEAM, LASER SIGHT & PARTICLES */}
                <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                    <svg className="w-full h-full overflow-visible">
                         <defs>
                             <filter id="plasma" x="-50%" y="-50%" width="200%" height="200%">
                                 <feGaussianBlur stdDeviation="4" result="blur" />
                                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
                             </filter>
                             <linearGradient id="beamCore" x1="0" y1="0" x2="1" y2="0">
                                 <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                                 <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                             </linearGradient>
                         </defs>
                         
                         {/* LASER SIGHT (Stage 1.5) */}
                         {stage === 1.5 && (
                             <>
                                <line 
                                    x1="46%" y1="47.7%" 
                                    x2="82%" y2="45.6%" 
                                    stroke="#dc2626" 
                                    strokeWidth="1.5" 
                                    strokeDasharray="2 4"
                                    opacity="0.6"
                                    className="animate-[scanSweep_0.5s_linear_infinite]"
                                />
                                {/* Gathering Charge Particles */}
                                <circle cx="46%" cy="47.7%" r="20" fill="url(#beamCore)" opacity="0.1" className="animate-ping" />
                             </>
                         )}

                         {/* FIRE BEAM (Stage 2) */}
                         {stage === 2 && (
                            <>
                                 {/* Outer Glow */}
                                 <line 
                                    x1="46%" y1="47.7%" 
                                    x2="82%" y2="45.6%" 
                                    stroke="#3b82f6" 
                                    strokeWidth="16" 
                                    strokeLinecap="round"
                                    opacity="0.5"
                                    filter="url(#plasma)"
                                    className="animate-[beamFire_0.1s_ease-out_forwards]" 
                                 />
                                 
                                 {/* Core Plasma */}
                                 <line 
                                    x1="46%" y1="47.7%" 
                                    x2="82%" y2="45.6%" 
                                    stroke="url(#beamCore)" 
                                    strokeWidth="6" 
                                    strokeLinecap="round"
                                    className="animate-[beamFire_0.05s_ease-out_forwards]" 
                                 />
                                 
                                 {/* Muzzle Flash */}
                                 <circle cx="46%" cy="47.7%" r="25" fill="#fff" filter="url(#plasma)" className="animate-[shockwave_0.15s_ease-out_forwards]" />
                                 
                                 {/* Impact Debris Particles */}
                                 {particles.map((p) => (
                                     <circle 
                                        key={p.id}
                                        cx="82%" cy="45.6%" r="2" fill="#fff"
                                        className="animate-[floatBubble_0.4s_ease-out_forwards]"
                                        style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
                                     />
                                 ))}
                            </>
                         )}
                    </svg>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};