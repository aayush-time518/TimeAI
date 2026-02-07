
import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowRight, TrendingUp, Zap, Scan, CheckCircle, Target, Box, Database, BarChart3, Activity, Terminal, LineChart, Sparkles } from 'lucide-react';
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
    <span className="inline-grid overflow-hidden text-left align-bottom h-[1.3em] whitespace-nowrap">
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

/* --- DATA ANOMALY (MESSY DATA -> DASHBOARD) --- */
const EnergyAnomaly: React.FC<{ stage: number }> = ({ stage }) => {
    const isHit = stage === 2;
    const isClean = stage >= 3;

    return (
        <div className={`relative w-24 h-24 md:w-32 md:h-32 transform-style-3d transition-all duration-500 ${isHit ? 'scale-90 brightness-200' : 'animate-float'}`}>
             
             {/* 1. THE GLOW CORE */}
             <div className={`absolute inset-[-10px] rounded-full blur-2xl transition-all duration-700 ${
                 isClean ? 'bg-green-400/20' : isHit ? 'bg-white' : 'bg-red-500/10'
             }`}></div>
             
             {/* 2. THE CONTAINER */}
             <div className={`absolute inset-0 border rounded-2xl transition-all duration-700 flex flex-col items-center justify-center overflow-hidden
                ${isClean ? 'border-green-400 bg-white/95 shadow-xl' : isHit ? 'border-white bg-white scale-110' : 'border-red-500/40 bg-slate-900/90 backdrop-blur-md'}
             `}>
                
                {isClean ? (
                    /* --- PHASE: CLEAN DASHBOARD --- */
                    <div className="w-full h-full p-2.5 flex flex-col gap-1.5 animate-in zoom-in-95 duration-500">
                        <div className="flex items-center justify-between">
                            <div className="flex gap-0.5">
                                <Sparkles size={10} className="text-green-500" />
                                <span className="text-[7px] font-black text-green-600 uppercase tracking-widest">Optimized</span>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        </div>
                        {/* Beautiful Mini Chart */}
                        <div className="flex-1 flex items-end gap-1 px-0.5 pb-0.5">
                            <div className="flex-1 bg-green-100 rounded-t-[1px]" style={{ height: '30%' }}></div>
                            <div className="flex-1 bg-green-200 rounded-t-[1px]" style={{ height: '55%' }}></div>
                            <div className="flex-1 bg-green-400 rounded-t-[1px] animate-[shimmer_2s_infinite]" style={{ height: '95%' }}></div>
                            <div className="flex-1 bg-green-600 rounded-t-[1px]" style={{ height: '70%' }}></div>
                            <div className="flex-1 bg-green-300 rounded-t-[1px]" style={{ height: '85%' }}></div>
                        </div>
                        <div className="h-4 bg-green-50 rounded flex items-center px-1.5">
                             <TrendingUp size={10} className="text-green-600 mr-1" />
                             <span className="text-[6px] md:text-[7px] font-mono text-green-700 font-bold">+31.4% GROWTH</span>
                        </div>
                    </div>
                ) : (
                    /* --- PHASE: MESSY DATA --- */
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-3">
                        <div className="text-[7px] font-mono text-red-500/80 leading-tight w-full truncate text-center">
                            {["0x8F FF AA", "LAT_SPIKE", "ERR_U32", "NULL_PTR"].map((t, i) => (
                                <div key={i} className={`animate-pulse`} style={{ animationDelay: `${i*0.15}s` }}>
                                  {t}
                                </div>
                            ))}
                        </div>
                        <Activity className={`text-red-500 w-6 h-6 mt-1.5 opacity-50 animate-pulse ${isHit ? 'opacity-0' : ''}`} />
                        {/* Glitch Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/30 animate-[scanVertical_1.s_linear_infinite]"></div>
                    </div>
                )}
             </div>

             {/* Orbital Particles (Messy Phase) */}
             {!isClean && !isHit && (
                 <div className="absolute inset-[-15px] animate-spin-slow opacity-40">
                     <div className="w-1 h-1 bg-red-400 rounded-full absolute top-0 left-1/2"></div>
                     <div className="w-1 h-1 bg-red-600 rounded-full absolute bottom-0 left-1/2"></div>
                     <div className="w-1 h-1 bg-white rounded-full absolute left-0 top-1/2"></div>
                 </div>
             )}
             
             {/* Hit Flash Ring */}
             {isHit && (
                <div className="absolute inset-[-40px] border-2 border-white rounded-full animate-ping opacity-60 z-50"></div>
             )}
        </div>
    );
};

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  const phrases = ["Automation.", "Data Analysis.", "Chatbots.", "Intelligence.", "Efficiency."];
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
                    const newParticles = Array.from({length: 12}).map((_, i) => ({
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
                        }, 2500); 
                    }, 400);
                }, 800); 
            }, 1000);
        }, 2000);
    };

    cycle();
    return () => clearTimeout(timeout);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({ x: (y / rect.height) * -4, y: (x / rect.width) * 4 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  const getMinaState = () => {
      switch(true) {
          case stage === 0: return { variant: 'walking', eyeTarget: null, showScanner: false };
          case stage === 1: return { variant: 'alert', eyeTarget: { x: 85, y: 45 }, showScanner: false };
          case stage === 1.5: return { variant: 'aiming', eyeTarget: { x: 85, y: 45 }, showScanner: true };
          case stage === 2: return { variant: 'firing', eyeTarget: { x: 85, y: 45 }, showScanner: false };
          case stage === 3: return { variant: 'success', eyeTarget: { x: 60, y: 30 }, showScanner: false };
          case stage === 4: return { variant: 'success', eyeTarget: { x: 0, y: 50 }, showScanner: false };
          default: return { variant: 'idle', eyeTarget: null, showScanner: false };
      }
  };

  const minaState = getMinaState();

  return (
    <section className="relative min-h-[90vh] md:min-h-[95vh] flex items-center justify-center bg-white py-12 md:py-24 lg:py-0 overflow-hidden perspective-[2000px]">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.2]" 
           style={{ 
             backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.04) 0%, transparent 60%), radial-gradient(#000 0.5px, transparent 0.5px)', 
             backgroundSize: '100% 100%, 40px 40px' 
           }}>
      </div>
      
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-50 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-[100px] opacity-40 pointer-events-none"></div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          <div className="space-y-6 md:space-y-8 flex flex-col justify-center order-2 lg:order-1 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out-expo">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold leading-[1.1] tracking-tight text-gray-900 mb-6 drop-shadow-sm">
                <span className="block">Accelerate with</span>
                <span className="block mt-1">
                  <RollingText words={phrases} />
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                 We build and implement custom AI agents, perform deep data analysis, and architect automated workflows that turn manual processes into autonomous results.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out-expo delay-100 justify-center lg:justify-start">
              <button 
                onClick={() => setView('contact')}
                className="px-8 py-4 bg-gray-900 text-white font-bold text-sm uppercase tracking-widest rounded-xl shadow-xl shadow-gray-900/10 hover:bg-tva-orange hover:shadow-glow-amber transition-all duration-300 flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
              >
                Contact Us <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => {
                  const el = document.getElementById('live-demos');
                  if(el) el.scrollIntoView({behavior: 'smooth'});
                }}
                className="px-8 py-4 bg-white border border-gray-200 text-gray-900 font-bold text-sm uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-3 active:scale-95 hover:border-gray-300 shadow-sm hover:shadow-md"
              >
                <Play size={16} className="fill-current" /> See Solutions
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center order-1 lg:order-2 h-[300px] md:h-[500px] lg:h-[600px] perspective-[1200px] group w-full">
             <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={`
                    relative w-full max-w-[500px] aspect-[4/3] transition-all duration-150 ease-out
                    ${stage === 2 ? 'translate-x-[-15px]' : ''}
                `}
                style={{ 
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                    transformStyle: 'preserve-3d'
                }}
             >
                <div className="absolute bottom-10 md:bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-24 md:h-32 transform translate-z-[-20px] scale-95 opacity-50 blur-xl">
                     <div className="w-full h-full bg-gray-200 rounded-[100%]"></div>
                </div>

                <div className="absolute bottom-24 md:bottom-32 left-[5%] w-40 h-40 md:w-64 md:h-64 transform translate-z-[40px] transition-transform duration-500 z-20">
                    <MinaCharacter 
                        className="w-full h-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]" 
                        variant={minaState.variant as any} 
                        eyeTarget={minaState.eyeTarget}
                        showScanner={minaState.showScanner}
                    />
                </div>

                <div 
                    className={`
                        absolute top-[20%] right-[5%] transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)] transform translate-z-[100px] z-30
                        ${stage === 0 ? 'translate-x-[250%] opacity-0 duration-0' : ''} 
                        ${stage === 1 ? 'translate-x-0 duration-800 opacity-100' : ''}
                        ${stage >= 2 && stage < 4 ? 'translate-x-0 duration-0' : ''}
                        ${stage === 4 ? 'translate-x-[-300%] opacity-0 duration-700 ease-in' : ''}
                    `}
                >
                     {stage === 1.5 && (
                         <div className="absolute inset-[-30px] border border-tva-orange/30 border-dashed rounded-full animate-[spin_4s_linear_infinite] pointer-events-none"></div>
                     )}
                     <EnergyAnomaly stage={stage} />
                </div>

                <div className="absolute inset-0 pointer-events-none z-50 overflow-visible">
                    <svg className="w-full h-full overflow-visible">
                         <defs>
                             <filter id="plasma" x="-50%" y="-50%" width="200%" height="200%">
                                 <feGaussianBlur stdDeviation="6" result="blur" />
                                 <feComposite in="SourceGraphic" in2="blur" operator="over" />
                             </filter>
                             <linearGradient id="beamCore" x1="0" y1="0" x2="1" y2="0">
                                 <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
                                 <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                             </linearGradient>
                         </defs>
                         
                         {stage === 1.5 && (
                             <>
                                <line 
                                    x1="40%" y1="48%" 
                                    x2="80%" y2="38%" 
                                    stroke="#dc2626" 
                                    strokeWidth="1.5" 
                                    strokeDasharray="4 8"
                                    opacity="0.6"
                                    className="animate-[scanSweep_0.3s_linear_infinite]"
                                />
                                <circle cx="40%" cy="48%" r="20" fill="url(#beamCore)" opacity="0.1" className="animate-ping" />
                             </>
                         )}

                         {stage === 2 && (
                            <>
                                 <line 
                                    x1="40%" y1="48%" 
                                    x2="80%" y2="38%" 
                                    stroke="#3b82f6" 
                                    strokeWidth="16" 
                                    strokeLinecap="round"
                                    opacity="0.4"
                                    filter="url(#plasma)"
                                    className="animate-[beamFire_0.07s_ease-out_forwards]" 
                                 />
                                 
                                 <line 
                                    x1="40%" y1="48%" 
                                    x2="80%" y2="38%" 
                                    stroke="url(#beamCore)" 
                                    strokeWidth="6" 
                                    strokeLinecap="round"
                                    className="animate-[beamFire_0.03s_ease-out_forwards]" 
                                 />
                                 
                                 <circle cx="40%" cy="48%" r="25" fill="#fff" filter="url(#plasma)" className="animate-[shockwave_0.1s_ease-out_forwards]" />
                                 
                                 {particles.map((p) => (
                                     <circle 
                                        key={p.id}
                                        cx="80%" cy="38%" r="2" fill="#fff"
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
