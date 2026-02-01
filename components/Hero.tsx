import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Activity, Zap, ShieldCheck, Terminal, Disc, Cpu, AlertTriangle, CheckCircle, Brain, Database, Layers } from 'lucide-react';
import { ViewState } from '../types';
import { MinaCharacter } from './MinaCharacter';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  // --- TYPEWRITER EFFECT ---
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const phrases = ["INTELLIGENT CHATBOTS", "PREDICTIVE FORECASTS", "SENTIMENT ANALYSIS", "LIVE DASHBOARDS"];
  
  useEffect(() => {
    const currentPhrase = phrases[wordIndex % phrases.length];
    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && displayText === currentPhrase) {
        typeSpeed = 2500; 
    } else if (isDeleting && displayText === '') {
        typeSpeed = 300; 
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
        return;
    } else if (isDeleting && displayText === '') {
         // safety catch
         setIsDeleting(false);
         setWordIndex((prev) => prev + 1);
    }

    const timer = setTimeout(() => {
        if (!isDeleting && displayText === currentPhrase) {
            setIsDeleting(true);
        } else {
            const nextText = isDeleting 
                ? currentPhrase.substring(0, displayText.length - 1) 
                : currentPhrase.substring(0, displayText.length + 1);
            setDisplayText(nextText);
        }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex]);

  // --- SYSTEM STATUS ---
  const [systemStatus, setSystemStatus] = useState({ label: "SYSTEM", status: "OPTIMAL", color: "text-tva-green" });
  
  useEffect(() => {
     const statuses = [
         { label: "LATENCY", status: "12ms", color: "text-tva-green" },
         { label: "AGENTS", status: "ACTIVE", color: "text-tva-orange" },
         { label: "UPTIME", status: "99.99%", color: "text-tva-green" }
     ];
     let i = 0;
     const interval = setInterval(() => {
         i = (i + 1) % statuses.length;
         setSystemStatus(statuses[i]);
     }, 4000);
     return () => clearInterval(interval);
  }, []);

  // --- MINA STORY CYCLE ---
  const stories = [
      { id: '1', variant: 'idle', text: "Analyzing Stream", subtext: "Data Flow Normal", color: "text-tva-orange", icon: <Activity size={14} /> },
      { id: '2', variant: 'alert', text: "Variance Detected", subtext: "Revenue Dip Predicted", color: "text-red-500", icon: <AlertTriangle size={14} /> },
      { id: '3', variant: 'thinking', text: "Running Agents", subtext: "Optimizing Logic...", color: "text-tva-amber", icon: <Brain size={14} /> },
      { id: '4', variant: 'success', text: "Workflow Optimized", subtext: "+15% Efficiency", color: "text-tva-green", icon: <CheckCircle size={14} /> }
  ] as const;

  const [storyIndex, setStoryIndex] = useState(0);

  useEffect(() => {
      const interval = setInterval(() => {
          setStoryIndex(prev => (prev + 1) % stories.length);
      }, 4500); 
      return () => clearInterval(interval);
  }, []);

  const currentStory = stories[storyIndex];

  // --- OPTIMIZED MOUSE PARALLAX (DIRECT DOM) ---
  const parallaxContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        if (!parallaxContainerRef.current) return;
        
        // Calculate tilt based on center of screen
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // Max 7.5 deg tilt
        const y = (e.clientY / window.innerHeight - 0.5) * 15;

        // Apply transform directly to DOM element to avoid React Re-renders
        parallaxContainerRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    
    // Add passive listener for better scroll performance
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-transparent py-20 lg:py-0">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-tva-orange/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tva-amber/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />
      
      {/* Architectural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] -z-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT: Content */}
          <div className="space-y-8 flex flex-col justify-center order-2 lg:order-1">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-luxury">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 mb-8 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm text-xs font-bold uppercase tracking-widest ring-1 ring-gray-100">
                <span className={`w-2 h-2 rounded-full animate-pulse ${systemStatus.color === 'text-tva-orange' ? 'bg-tva-orange' : 'bg-tva-green'}`}></span>
                <span className="text-gray-400 font-mono">{systemStatus.label}:</span>
                <span className={`${systemStatus.color} font-mono`}>{systemStatus.status}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-extrabold leading-tight tracking-tight text-tva-cream mb-6">
                Accelerate Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tva-orange via-blue-400 to-tva-amber inline-block min-h-[1.2em] animate-gradient-x">
                  {displayText}
                  <span className="animate-pulse text-tva-orange ml-1">_</span>
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-500 max-w-lg leading-relaxed font-sans border-l-4 border-tva-orange/20 pl-6">
                 We deploy specialized AI Agents to streamline workflows and automate complex tasks. Secure your business future with predictive intelligence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-luxury delay-200">
              <button 
                onClick={() => setView('contact')}
                className="group relative px-8 py-4 bg-tva-orange text-white font-bold text-base rounded-xl overflow-hidden shadow-glow-blue transition-all transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Shimmer Effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shimmer" />
                
                <span className="relative flex items-center justify-center gap-2">
                  Start Free Pilot
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button 
                onClick={() => setView('solutions')}
                className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold text-base rounded-xl hover:border-tva-orange hover:text-tva-orange transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md group"
              >
                <Terminal size={16} className="text-gray-400 group-hover:text-tva-orange transition-colors" />
                Explore Platform
              </button>
            </div>

            <div className="pt-8 border-t border-gray-200/60 flex items-center gap-6 text-xs text-gray-500 font-semibold uppercase tracking-wide animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-luxury delay-300">
              <span className="flex items-center gap-2">
                <Zap size={16} className="text-tva-orange" /> Instant Setup
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-tva-orange" /> SOC2 Compliant
              </span>
            </div>
          </div>

          {/* RIGHT: Floating Glass Stack Visual with Parallax */}
          <div 
             className="relative flex items-center justify-center perspective-[1000px] order-1 lg:order-2 h-[400px] lg:h-full"
             style={{ perspective: '1000px' }}
          >
             <div 
                ref={parallaxContainerRef}
                className="relative w-full max-w-md h-[400px] flex items-center justify-center will-change-transform"
                style={{ 
                    transformStyle: 'preserve-3d',
                    transition: 'transform 0.1s linear' // Slight smooth factor
                }}
             >
                
                {/* 1. Floating Glass Panes (Layers) */}
                <div className="absolute inset-0 flex items-center justify-center animate-float" style={{ transform: 'translateZ(0px)' }}>
                    {/* Bottom Pane */}
                    <div className="absolute w-64 h-64 bg-white/40 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl transform rotate-x-60 rotate-z-12 translate-y-20 z-0 scale-90 transition-transform duration-500 hover:translate-z-10"></div>
                    
                    {/* Middle Pane */}
                    <div className="absolute w-64 h-64 bg-white/60 backdrop-blur-md border border-white/60 rounded-3xl shadow-xl transform rotate-x-60 rotate-z-12 translate-y-10 z-10 scale-95 flex items-center justify-center transition-transform duration-500 hover:translate-z-20">
                        <div className="w-48 h-48 border border-tva-orange/10 rounded-full animate-spin-slow opacity-50"></div>
                    </div>

                    {/* Top Pane (Active Layer) */}
                    <div className="absolute w-64 h-64 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-white rounded-3xl shadow-2xl transform rotate-x-60 rotate-z-12 z-20 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:translate-z-30">
                        <div className="absolute inset-0 bg-gradient-to-tr from-tva-orange/5 to-transparent"></div>
                        <div className="grid grid-cols-4 gap-4 opacity-20 transform -rotate-12 scale-150">
                            {[...Array(16)].map((_, i) => (
                                <div key={i} className="w-8 h-8 rounded-lg bg-tva-orange/20"></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Character Floating Above Layers */}
                <div className="absolute z-30 animate-float" style={{ animationDelay: '-1s', transform: 'translateZ(60px)' }}>
                    <div className="w-48 h-48 lg:w-60 lg:h-60 relative filter drop-shadow-2xl">
                        <MinaCharacter className="w-full h-full" variant={currentStory.variant} />
                    </div>
                </div>

                {/* 3. Floating "Status Card" */}
                <div className="absolute top-10 -right-4 lg:right-0 z-40 animate-float" style={{ animationDelay: '-2s', transform: 'translateZ(80px)' }}>
                   <div className={`glass-card p-4 rounded-xl shadow-lg border-l-4 w-48 transition-all duration-300 ${
                       currentStory.variant === 'alert' ? 'border-l-red-500' : 'border-l-tva-orange'
                   }`}>
                      <div className="flex items-center gap-3 mb-1">
                          <div className={`p-1.5 rounded-lg ${currentStory.variant === 'alert' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-tva-orange'}`}>
                              {currentStory.icon}
                          </div>
                          <span className={`text-[10px] font-bold uppercase ${currentStory.color}`}>
                              {currentStory.text}
                          </span>
                      </div>
                      <div className="text-xs text-gray-500 font-medium pl-1">
                          {currentStory.subtext}
                      </div>
                      {currentStory.variant === 'thinking' && (
                          <div className="h-1 w-full bg-gray-100 rounded-full mt-2 overflow-hidden">
                              <div className="h-full bg-tva-amber animate-progress"></div>
                          </div>
                      )}
                   </div>
                </div>

                {/* 4. Stats Badge */}
                <div className="absolute bottom-20 left-0 z-40 animate-float" style={{ animationDelay: '-3s', transform: 'translateZ(40px)' }}>
                    <div className="glass-card px-4 py-2 rounded-lg shadow-lg flex items-center gap-3 ring-1 ring-white/50">
                        <Database size={16} className="text-tva-orange" />
                        <div className="text-[10px] font-bold uppercase text-gray-500">
                            Data Ingest <span className="text-tva-cream ml-1 font-mono">1.2TB/s</span>
                        </div>
                    </div>
                </div>

             </div>
          </div>
        </div>
      </div>
    </section>
  );
};