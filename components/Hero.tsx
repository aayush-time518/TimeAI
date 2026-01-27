import React, { useState, useEffect } from 'react';
import { ArrowRight, Activity, Zap, ShieldCheck, Terminal, Disc, Cpu, AlertTriangle, CheckCircle, Brain, Database } from 'lucide-react';
import { ViewState } from '../types';
import { MinaCharacter } from './MinaCharacter';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  // --- TYPEWRITER EFFECT FOR HEADLINE ---
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const phrases = ["REVENUE TIMELINE", "OPERATIONAL SPEED", "FUTURE GROWTH", "DATA INTEGRITY"];
  
  useEffect(() => {
    if (isPaused) return;

    const currentPhrase = phrases[wordIndex % phrases.length];
    const typeSpeed = isDeleting ? 40 : 80; 
    
    const timer = setTimeout(() => {
        if (!isDeleting && displayText === currentPhrase) {
            // Finished typing, pause then delete
            setIsPaused(true);
            setTimeout(() => {
                setIsPaused(false);
                setIsDeleting(true);
            }, 2000);
        } else if (isDeleting && displayText === '') {
            // Finished deleting, move to next
            setIsDeleting(false);
            setWordIndex((prev) => prev + 1);
        } else {
            // Typing or Deleting
            const nextText = isDeleting 
                ? currentPhrase.substring(0, displayText.length - 1) 
                : currentPhrase.substring(0, displayText.length + 1);
            setDisplayText(nextText);
        }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, isPaused]);

  // --- CYCLING SYSTEM STATUS ---
  const [systemStatus, setSystemStatus] = useState({ label: "TIMELINE", status: "STABLE", color: "text-tva-orange" });
  
  useEffect(() => {
     const statuses = [
         { label: "TIMELINE", status: "STABLE", color: "text-tva-orange" },
         { label: "VARIANCE", status: "0.00%", color: "text-tva-green" },
         { label: "AGENTS", status: "ACTIVE", color: "text-tva-amber" },
         { label: "SYNC", status: "100%", color: "text-tva-orange" }
     ];
     let i = 0;
     const interval = setInterval(() => {
         i = (i + 1) % statuses.length;
         setSystemStatus(statuses[i]);
     }, 3000);
     return () => clearInterval(interval);
  }, []);

  // --- MINA STORY CYCLE (RIGHT SIDE) ---
  const stories: { 
      id: string; 
      variant: 'idle' | 'thinking' | 'alert' | 'success'; 
      text: string; 
      subtext: string;
      color: string;
      icon: React.ReactNode;
  }[] = [
      {
          id: 'monitor',
          variant: 'idle',
          text: "Monitoring Streams",
          subtext: "14,203 events/sec",
          color: "text-tva-orange",
          icon: <Activity size={16} />
      },
      {
          id: 'alert',
          variant: 'alert',
          text: "Variance Detected",
          subtext: "Latency > 400ms",
          color: "text-red-500",
          icon: <AlertTriangle size={16} />
      },
      {
          id: 'thinking',
          variant: 'thinking',
          text: "Pruning Variance",
          subtext: "Optimizing Query...",
          color: "text-tva-amber",
          icon: <Brain size={16} />
      },
      {
          id: 'success',
          variant: 'success',
          text: "Timeline Restored",
          subtext: "Efficiency +12%",
          color: "text-tva-green",
          icon: <CheckCircle size={16} />
      }
  ];

  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setStoryIndex(prev => (prev + 1) % stories.length);
      }, 4000); // Change story every 4 seconds
      return () => clearInterval(interval);
  }, []);

  const currentStory = stories[storyIndex];

  const description = "We deploy specialized AI Agents to prune inefficiencies and automate workflows. Don't let a Nexus Event disrupt your operations.";

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-tva-dark py-20 lg:py-0">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-tva-orange/5 rounded-full blur-[100px] -z-10 animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-tva-amber/5 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content - Dynamic */}
          <div className="space-y-6 lg:space-y-8 flex flex-col justify-center order-2 lg:order-1">
            <div>
              {/* Dynamic Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 bg-tva-panel border border-tva-orange/40 text-[10px] md:text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(234,88,12,0.2)] animate-in fade-in slide-in-from-left-4 duration-700">
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${systemStatus.color === 'text-tva-orange' ? 'bg-tva-orange' : systemStatus.color === 'text-tva-green' ? 'bg-tva-green' : 'bg-tva-amber'}`}></span>
                <span className="text-tva-cream/50">{systemStatus.label}:</span>
                <span className={systemStatus.color}>{systemStatus.status}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold leading-none tracking-tighter text-tva-cream mb-4">
                PROTECT YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tva-orange to-tva-amber text-glow inline-block min-h-[1.2em]">
                  {displayText}
                  <span className="animate-pulse text-tva-orange ml-1">_</span>
                </span>
              </h1>
              
              {/* Static Description with Fade In */}
              <div className="text-lg md:text-xl text-tva-cream/70 max-w-lg leading-relaxed font-sans border-l-2 border-tva-orange/30 pl-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                 {description}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-backwards">
              <button 
                onClick={() => setView('contact')}
                className="px-8 py-4 bg-tva-orange text-tva-dark font-mono font-bold text-sm md:text-base uppercase tracking-wide rounded-sm hover:bg-tva-amber hover:shadow-[0_0_20px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2 group"
              >
                Initiate Protocol
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setView('solutions')}
                className="px-8 py-4 bg-transparent border-2 border-tva-cream/20 text-tva-cream font-mono font-bold text-sm md:text-base uppercase tracking-wide rounded-sm hover:border-tva-orange hover:text-tva-orange transition-all flex items-center justify-center gap-2"
              >
                Access Files
              </button>
            </div>

            <div className="pt-6 border-t border-tva-cream/10 flex items-center gap-4 md:gap-8 text-xs md:text-sm text-tva-cream/50 font-mono animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-700 fill-mode-backwards">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-tva-amber" /> Rapid Deployment
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-tva-amber" /> Secure Processing
              </span>
              <span className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-tva-amber" /> CLI Compatible
              </span>
            </div>
          </div>

          {/* Right Visual - HOLOGRAPHIC TIMELINE PROJECTOR (Responsive) */}
          {/* Order 1 on mobile to show graphic first or order 2? Let's keep it visible. */}
          <div className="relative group flex items-center justify-center perspective-[1000px] order-1 lg:order-2 h-[300px] lg:h-full">
             {/* 3D Container - Scaled down on mobile */}
             <div className="relative w-full max-w-md h-[300px] lg:h-[500px] flex items-center justify-center scale-75 lg:scale-100">
                
                {/* 1. Holographic Base Plate (Tilted) */}
                <div className="absolute bottom-10 w-48 h-48 lg:w-64 lg:h-64 border-2 border-tva-orange/30 rounded-full bg-tva-orange/5 shadow-[0_0_50px_rgba(234,88,12,0.2)] animate-[spin_10s_linear_infinite] [transform:rotateX(60deg)]">
                   <div className="absolute inset-4 border border-tva-orange/20 rounded-full border-dashed"></div>
                   <div className="absolute inset-12 border border-tva-orange/40 rounded-full"></div>
                </div>

                {/* 2. Vertical Data Rings (Rotating around Mina) */}
                <div className={`absolute w-[280px] h-[280px] lg:w-[350px] lg:h-[350px] rounded-full border border-tva-cream/5 transition-all duration-1000 ${currentStory.variant === 'thinking' ? 'animate-[spin_2s_linear_infinite_reverse] border-tva-amber/30' : 'animate-[spin_20s_linear_infinite_reverse]'}`}>
                   <div className="absolute top-0 left-1/2 w-2 h-2 bg-tva-cream/20 rounded-full"></div>
                </div>
                <div className={`absolute w-[240px] h-[240px] lg:w-[300px] lg:h-[300px] rounded-full border border-dashed transition-all duration-1000 ${currentStory.variant === 'alert' ? 'border-red-500/30 animate-[spin_5s_linear_infinite]' : 'border-tva-orange/10 animate-[spin_15s_linear_infinite]'}`}></div>

                {/* 3. Central Character (Floating) */}
                <div className="absolute z-20 animate-float pb-10">
                    <div className="w-40 h-40 lg:w-56 lg:h-56 relative">
                        {/* Pass the dynamic variant to Mina */}
                        <MinaCharacter 
                            className="w-full h-full drop-shadow-[0_0_30px_rgba(234,88,12,0.4)]" 
                            variant={currentStory.variant}
                        />
                        
                        {/* Hologram Scan Effect Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent animate-scan pointer-events-none rounded-full opacity-50 transition-colors duration-500 ${currentStory.variant === 'alert' ? 'via-red-500/10' : 'via-tva-orange/10'}`}></div>
                    </div>
                </div>

                {/* 4. Dynamic Thought Bubble / Story Card */}
                <div className="absolute top-0 -right-4 lg:top-10 lg:-right-4 animate-[float_4s_ease-in-out_infinite_reverse] z-30">
                   <div className={`bg-tva-panel/90 backdrop-blur-md border border-tva-cream/10 p-3 lg:p-4 rounded-sm shadow-2xl w-40 lg:w-48 transition-all duration-500 transform ${currentStory.variant === 'alert' ? 'border-red-500/50 scale-105' : ''}`}>
                      <div className="flex items-start gap-3">
                         <div className={`mt-1 ${currentStory.color}`}>{currentStory.icon}</div>
                         <div>
                             <div className={`text-[8px] lg:text-[10px] font-mono uppercase tracking-widest mb-1 ${currentStory.color}`}>
                                {currentStory.text}
                             </div>
                             <div className="text-[10px] lg:text-xs text-tva-cream font-mono leading-tight">
                                {currentStory.subtext}
                             </div>
                         </div>
                      </div>
                      
                      {/* Progress Bar for Thinking */}
                      {currentStory.variant === 'thinking' && (
                          <div className="w-full h-1 bg-tva-dark mt-2 rounded-full overflow-hidden">
                              <div className="h-full bg-tva-amber animate-[width_2s_ease-in-out_infinite]" style={{width: '60%'}}></div>
                          </div>
                      )}
                   </div>
                   
                   {/* Connector Line */}
                   <svg className="absolute top-full left-0 w-8 h-8 -ml-4 -mt-2 pointer-events-none" viewBox="0 0 50 50">
                       <path d="M50 0 L0 50" stroke={currentStory.variant === 'alert' ? '#ef4444' : '#ea580c'} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                       <circle cx="0" cy="50" r="2" fill={currentStory.variant === 'alert' ? '#ef4444' : '#ea580c'} />
                   </svg>
                </div>

                {/* 5. Floating Stats Card (Bottom Left) */}
                <div className="absolute bottom-12 lg:bottom-20 left-0 lg:-left-4 animate-[float_5s_ease-in-out_infinite]">
                   <div className="bg-tva-panel/80 backdrop-blur-sm border border-tva-cream/20 p-2 rounded-sm shadow-xl flex items-center gap-2">
                      <Cpu size={16} className="text-tva-amber" />
                      <div className="text-[10px] font-mono text-tva-cream/70">
                         <div>AI CORES: ONLINE</div>
                         <div className="text-tva-green">OPTIMIZED</div>
                      </div>
                   </div>
                </div>

                {/* 6. Back Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 rounded-full blur-[80px] -z-10 pointer-events-none transition-colors duration-1000 ${currentStory.variant === 'alert' ? 'bg-red-500/20' : 'bg-tva-orange/10'}`}></div>
             </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 text-tva-cream/20 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] font-mono uppercase tracking-widest">Scroll for Intel</span>
            <div className="w-px h-8 bg-gradient-to-b from-tva-orange to-transparent"></div>
        </div>
      </div>
    </section>
  );
};