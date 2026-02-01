import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ScanSearch, Cpu, Network, RefreshCw, Clock, CheckCircle } from 'lucide-react';

// Moved steps definition outside to prevent recreation
const STEPS = [
    {
      id: "01",
      title: "Discovery & Audit",
      desc: "Full-spectrum audit. We map every API call and data silo to expose hidden latency bottlenecks instantly.",
      icon: <ScanSearch size={20} />,
      tag: "48h Assessment"
    },
    {
      id: "02",
      title: "Neural Architecture",
      desc: "Bespoke neural construction. We engineer AI agents fine-tuned specifically for your operational topology.",
      icon: <Cpu size={20} />,
      tag: "Blueprinting"
    },
    {
      id: "03",
      title: "Hot-Swap Integration",
      desc: "Shadow-Mode deployment. Agents run parallel to live traffic, validating performance with zero operational risk.",
      icon: <Network size={20} />,
      tag: "Risk-Free"
    },
    {
      id: "04",
      title: "Active Optimization",
      desc: "Continuous reinforcement. Self-healing feedback loops optimize velocity while detecting drift in real-time.",
      icon: <RefreshCw size={20} />,
      tag: "Continuous"
    }
];

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  
  // Only update state when step index actually changes to prevent 60fps re-renders
  const [activeStepIndex, setActiveStepIndex] = useState(-1);

  // 1. SCROLL LISTENER (Passive)
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        const startOffset = viewportHeight * 0.7;
        const endOffset = viewportHeight * 0.3;
        
        const totalDistance = rect.height - endOffset;
        const scrolledDistance = startOffset - rect.top;
        
        let pct = (scrolledDistance / totalDistance) * 100;
        pct = Math.max(0, Math.min(100, pct));
        
        targetProgress.current = pct;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Init
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. ANIMATION LOOP (Optimized)
  useEffect(() => {
    let rafId: number;
    
    const animate = () => {
        const diff = targetProgress.current - currentProgress.current;
        
        if (Math.abs(diff) > 0.05) {
            // Smooth lerp
            currentProgress.current += diff * 0.05;
            
            // Direct DOM update for smooth line (No React Render)
            if (progressLineRef.current) {
                progressLineRef.current.style.height = `${currentProgress.current}%`;
            }

            // Check Step Activation
            let newActiveIndex = -1;
            STEPS.forEach((_, idx) => {
                const stepThreshold = (idx / (STEPS.length - 0.5)) * 100;
                if (currentProgress.current > stepThreshold) {
                    newActiveIndex = idx;
                }
            });

            // Only trigger re-render if index changed
            setActiveStepIndex(prev => {
                if (prev !== newActiveIndex) return newActiveIndex;
                return prev;
            });
        }
        
        rafId = requestAnimationFrame(animate);
    };
    
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const isComplete = activeStepIndex === STEPS.length - 1 && currentProgress.current > 95;

  return (
    <section ref={containerRef} className="py-24 bg-white relative overflow-hidden">
       {/* High-Tech Background */}
       <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none"></div>
       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10"></div>
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>

       <div className="container mx-auto px-6 relative z-10">
         
         {/* Section Header */}
         <div className="max-w-3xl mx-auto text-center mb-20 md:mb-32">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full mb-8 shadow-sm">
                 <Clock size={14} className="text-tva-orange animate-spin-slow" />
                 <span className="text-xs font-bold text-tva-orange uppercase tracking-widest">Execution Protocol</span>
             </div>
             <h2 className="text-4xl md:text-5xl font-sans font-bold text-gray-900 mb-6 tracking-tight leading-tight">
                 From Chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-tva-orange to-blue-600">Clarity</span>
             </h2>
             <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                 A four-stage transformation process engineered to eliminate operational drag without disrupting your current workflow.
             </p>
         </div>

         {/* Timeline Structure */}
         <div className="relative max-w-6xl mx-auto">
             
             {/* THE SPINE (Track) */}
             <div className="absolute left-6 md:left-1/2 top-0 bottom-16 w-[2px] bg-gray-100 md:-translate-x-1/2"></div>
             
             {/* THE FILL (Progress - Ref Controlled) */}
             <div 
                ref={progressLineRef}
                className="absolute left-6 md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-tva-orange via-blue-500 to-tva-orange md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(37,99,235,0.6)] will-change-[height]"
                style={{ height: '0%', maxHeight: 'calc(100% - 4rem)' }}
             >
                 {/* Glowing Head */}
                 <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-tva-orange rounded-full shadow-[0_0_10px_rgba(37,99,235,1)] translate-y-1/2"></div>
             </div>

             <div className="space-y-16 md:space-y-0 relative pb-12">
                 {STEPS.map((step, idx) => {
                     const isEven = idx % 2 === 0;
                     const isPassed = idx <= activeStepIndex;

                     return (
                         <div key={idx} className={`relative md:flex md:items-center md:justify-between md:h-64 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                             
                             {/* 1. CONTENT CARD */}
                             <div className={`
                                ml-16 md:ml-0 md:w-[45%] relative z-20
                                transition-all duration-1000 ease-luxury
                                ${isPassed ? 'opacity-100 translate-y-0 translate-x-0 blur-0 scale-100' : `opacity-0 translate-y-12 blur-sm scale-95 ${isEven ? 'md:-translate-x-12' : 'md:translate-x-12'}`}
                             `}>
                                 <div className={`
                                     group relative bg-white rounded-2xl p-6 md:p-8 border transition-all duration-700 ease-luxury overflow-hidden
                                     ${isPassed 
                                        ? 'border-tva-orange shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] translate-x-0' 
                                        : 'border-gray-100 shadow-sm'}
                                 `}>
                                     {/* Background Pulse Effect on Active */}
                                     <div className={`absolute inset-0 bg-gradient-to-br from-tva-orange/5 to-transparent transition-opacity duration-1000 ${isPassed ? 'opacity-100' : 'opacity-0'}`}></div>

                                     {/* Step Number Watermark */}
                                     <div className={`
                                        absolute -top-4 -right-4 text-8xl font-bold transition-all duration-1000 ease-luxury select-none font-mono
                                        ${isPassed ? 'text-tva-orange/10 scale-100' : 'text-gray-50 scale-90 opacity-50'}
                                     `}>
                                         {step.id}
                                     </div>

                                     <div className="flex items-center gap-3 mb-4 relative z-10">
                                         <div className={`
                                            p-2.5 rounded-lg transition-all duration-700 flex items-center justify-center
                                            ${isPassed ? 'bg-tva-orange text-white rotate-0 scale-110 shadow-glow-blue' : 'bg-gray-100 text-gray-400'}
                                         `}>
                                            <div className={isPassed ? "animate-pulse" : ""}>
                                                {step.icon}
                                            </div>
                                         </div>
                                         <div className={`text-[10px] font-bold uppercase tracking-widest border px-2 py-1 rounded transition-colors duration-700 ${isPassed ? 'text-tva-orange border-tva-orange/20 bg-white' : 'text-gray-400 border-gray-100 bg-gray-50'}`}>
                                             {step.tag}
                                         </div>
                                     </div>

                                     <h3 className={`text-xl md:text-2xl font-bold mb-3 relative z-10 transition-colors duration-500 ${isPassed ? 'text-tva-cream' : 'text-gray-400'}`}>
                                         {step.title}
                                     </h3>

                                     <p className="text-gray-500 leading-relaxed text-sm md:text-base relative z-10 font-medium">
                                         {step.desc}
                                     </p>
                                     
                                     {/* Mobile Active Indicator Dot */}
                                     <div className={`absolute top-1/2 ${isEven ? '-right-1.5' : '-left-1.5'} w-3 h-3 bg-tva-orange rounded-full transform -translate-y-1/2 opacity-0 transition-all duration-500 delay-300 ${isPassed ? 'opacity-100 animate-pulse' : ''} md:hidden`}></div>
                                 </div>
                             </div>

                             {/* 2. CENTER NODE (The Dot) */}
                             {/* Mobile: Left fixed | Desktop: Center fixed */}
                             <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 z-30 top-0 md:top-1/2 md:-translate-y-1/2">
                                 <div className={`
                                    w-4 h-4 rounded-full border-2 transition-all duration-700 ease-luxury bg-white relative
                                    ${isPassed 
                                        ? 'border-tva-orange scale-100 shadow-[0_0_0_4px_rgba(37,99,235,0.2)]' 
                                        : 'border-gray-300 scale-75'}
                                 `}>
                                     {isPassed && (
                                         <div className="absolute inset-0 bg-tva-orange rounded-full animate-ping opacity-20"></div>
                                     )}
                                 </div>
                             </div>

                             {/* 3. CONNECTOR LINE (Desktop Only) */}
                             <div className={`
                                hidden md:block absolute top-1/2 h-[2px] w-[calc(5%_+_24px)] bg-gray-200 transition-all duration-1000 origin-center ease-luxury
                                ${isEven ? 'left-1/2 origin-left' : 'right-1/2 origin-right'}
                                ${isPassed ? 'bg-gradient-to-r from-tva-orange to-tva-orange/50 scale-x-100' : 'scale-x-0'}
                             `}></div>

                             {/* Spacer for the other side (Desktop only) */}
                             <div className="hidden md:block md:w-[45%]"></div>
                             
                         </div>
                     );
                 })}
             </div>
             
             {/* Final Success State */}
             <div className={`
                relative z-30 flex w-full md:justify-center justify-start 
                transition-all duration-1000 delay-300 ease-luxury
                ${isComplete ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}
             `}>
                 {/* Mobile Connector Node */}
                 <div className="md:hidden absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-tva-orange rounded-full -translate-x-1/2 shadow-glow-orange z-40"></div>

                 <div className="
                    ml-12 md:ml-0 
                    bg-white px-8 py-4 rounded-2xl shadow-2xl border border-blue-100 flex items-center gap-5 group cursor-default hover:border-tva-orange transition-all hover:-translate-y-1
                    relative z-40
                 ">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg text-white">
                        <CheckCircle size={24} />
                    </div>
                    <div className="text-left whitespace-nowrap">
                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</div>
                        <div className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-tva-orange transition-colors">System Operational</div>
                    </div>
                 </div>
             </div>

         </div>
       </div>
    </section>
  );
};