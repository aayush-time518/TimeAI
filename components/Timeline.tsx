import React, { useEffect, useRef, useState } from 'react';

export const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Scroll logic to fill the timeline bar
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const triggerPoint = viewportHeight * 0.8;
        
        // Start filling when container enters trigger point
        if (rect.top < triggerPoint && rect.bottom > 0) {
            // How much of the section has passed the trigger point?
            const scrolled = triggerPoint - rect.top;
            const scrollableHeight = rect.height; // Use full height for smoother progression
            
            // Calculate percentage 0-100
            // We want it to reach 100% when the bottom of the section is still slightly visible
            const val = Math.max(0, Math.min(100, (scrolled / (scrollableHeight * 0.8)) * 100));
            setProgress(val);
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "We perform a temporal audit of your data lineage to identify operational bottlenecks and variance."
    },
    {
      num: "02",
      title: "Build",
      desc: "Our architects construct custom AI agents and predictive models tailored specifically to your topology."
    },
    {
      num: "03",
      title: "Deploy",
      desc: "Seamless injection of automation protocols into your production timeline (ERP/CRM/Slack)."
    },
    {
      num: "04",
      title: "Improve",
      desc: "Continuous, autonomous monitoring to identify and eliminate inefficiencies as they emerge."
    }
  ];

  return (
    <section ref={containerRef} className="py-24 bg-tva-dark relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-3xl font-mono font-bold text-tva-cream uppercase">Time-to-Value Timeline</h2>
          <p className="text-tva-orange font-mono mt-2 text-sm tracking-widest">// ESTIMATED DURATION: 2-6 WEEKS</p>
        </div>

        <div className="relative">
          {/* Static Background Line - Positioned at top to align with icons */}
          <div className="hidden md:block absolute top-[24px] left-0 w-full h-0.5 bg-tva-panel/30 z-0"></div>
          
          {/* Dynamic Filling Line */}
          <div 
            className="hidden md:block absolute top-[24px] left-0 h-0.5 bg-gradient-to-r from-tva-orange to-tva-amber z-0 transition-all duration-100 ease-out shadow-[0_0_10px_rgba(234,88,12,0.8)]"
            style={{ width: `${progress}%` }}
          >
             {/* Leading Spark */}
             <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-tva-cream rounded-full shadow-[0_0_15px_#fff] animate-pulse"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-12">
            {steps.map((step, idx) => {
              // Calculate activation threshold based on column index
              // Columns centers are approx at 12.5%, 37.5%, 62.5%, 87.5%
              const threshold = (idx * 25) + 5; 
              const isActive = progress > threshold;

              return (
                <div key={idx} className="relative group z-10 flex flex-col items-center md:items-start text-center md:text-left">
                  
                  {/* Step Number Circle (The Node) */}
                  <div className={`w-12 h-12 rounded-full border-2 font-mono font-bold text-lg flex items-center justify-center mb-6 transition-all duration-500 relative bg-tva-dark z-10
                    ${isActive 
                        ? 'border-tva-orange text-tva-dark bg-tva-orange shadow-[0_0_30px_rgba(234,88,12,0.6)] scale-110' 
                        : 'border-tva-panel text-tva-panel bg-tva-dark group-hover:border-tva-orange/30 group-hover:text-tva-orange/50'
                    }`}
                  >
                    {isActive && (
                        <>
                            <span className="absolute inset-0 rounded-full border border-tva-cream animate-ping opacity-50"></span>
                            <span className="absolute -inset-1 rounded-full border border-tva-orange/30 animate-[spin_3s_linear_infinite]"></span>
                        </>
                    )}
                    {step.num}
                  </div>

                  {/* Content Card */}
                  <div className={`transition-all duration-700 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4 grayscale'}`}>
                      <h3 className={`text-lg font-mono font-bold mb-3 uppercase transition-colors duration-300 ${isActive ? 'text-tva-cream' : 'text-tva-cream/40'}`}>
                          {step.title}
                      </h3>
                      <p className="text-tva-cream/60 text-sm font-sans leading-relaxed border-l-2 border-transparent pl-0 md:pl-3 md:border-tva-panel group-hover:border-tva-orange/30 transition-colors">
                          {step.desc}
                      </p>
                  </div>

                  {/* Mobile connector line (vertical) */}
                  {idx !== steps.length - 1 && (
                      <div className="md:hidden w-0.5 h-12 bg-tva-panel my-4"></div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
